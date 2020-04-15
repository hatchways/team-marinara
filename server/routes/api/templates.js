const express = require("express");
const router = express.Router();
const passport = require("passport");

const Template = require("../../models/template");
const { validateTemplateInput } = require("../../validation/template");

// @route POST /api/templates
// @desc Create a Template object. Requires 'name' (template name)
// @access Authenticated Users
router.post( "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const ownedBy = req.user.id;
        try{
            const { errors, isValid } = validateTemplateInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { name, subject, content, attachments } = req.body;
            const template = new Template({ name, subject, content, ownedBy, attachments});
            const newTemplate = await template.save();
            res.status(200).send(newTemplate);
        } catch(errors) {
            console.log(errors);
            res.status(400).send({error : "Error creating template"});
        }
});

// @route GET /api/templates
// @desc Get all templates owned by user
// @access Authenticated Users
router.get("/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const ownedBy = req.user.id;
        try{
            const templates = await Template.find({ ownedBy: ownedBy });
            res.status(200).json(templates);
        } catch (errors) {
            console.log(errors);
            res.status(400).send({error : "Error retrieving templates"});
        }
});

// @route GET /api/templates/:id
// @desc Get Template by id
// @access Authenticated Users
router.get("/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        
        const templateId = req.params.id;
        const ownedBy = req.user.id;

        try {
            const template = await Template.find({
                _id: templateId,
                ownedBy: ownedBy
            });
            if (!template || template.length === 0) {
                res
                    .status(404)
                    .send({ id: `Template with id ${templateId} is not found` });
            } else {
                res.status(200).json(template[0]);
            }
        } catch (errors) {
            console.log(errors);
            res.status(400).send({error : "Error retrieving template"});
        }
        
});

// @route PUT /api/templates
// @desc Modify template by template id
// @access Authenticated Users
router.put("/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const templateId = req.params.id;
        const ownedBy = req.user.id;

        const template = await Template.find( {
            _id: templateId,
            ownedBy: ownedBy
        });
        if (!template || template.length === 0) {
            res
              .status(404)
              .send({ id: `Template with id ${templateId} is not found` });
          } else {
            const { name, subject, content, attachments } = req.body;
            const modifiedTemplate = template[0];
            modifiedTemplate.name = name;
            modifiedTemplate.subject = subject;
            modifiedTemplate.content = content;
            modifiedTemplate.attachments = attachments;

            modifiedTemplate.save()
            .then(modifiedTemplate => {
                res.status(200).json(modifiedTemplate);
              })
            .catch(err => 
                console.log(err));
                res.status(400).send({error : "Error creating template"});
            }
    });

// @route DELETE /api/templates:id
// @desc DELETE template by id
// @access Authenticated Users
router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        
        const templateId = req.params.id;
        const ownedBy = req.user.id;

        try{
            const results = await Template.deleteOne({
                _id: templateId,
                ownedBy: ownedBy
              });
              if (!results || results.length === 0) {
                res
                .status(404)
                .send({ id: `Template with id ${templateId} is not found` });
             } else {
                res.status(200).json({ id: `${results[0]._id}` });
             }
        } catch(error) {
            console.log(error);
            res.status(400).json({ error: "Error deleting template" });
        }
});

module.exports = router;
