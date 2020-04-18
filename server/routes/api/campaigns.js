const express = require("express");
const router = express.Router();
const passport = require("passport");

const Campaign = require("../../models/campaign");
const Prospect = require("../../models/Prospect");
const Step = require("../../models/step");
const {
  validateCampaignInput,
  validateStepInput
} = require("../../validation/campaign");
const { sendEmailsQueue } = require("../../controllers/queues/index");

// @route POST /api/campaigns
// @desc Create a Campaign object. Requires 'name' (campaign name)
// @access Authenticated Users
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateCampaignInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newCampaign = new Campaign({
        name: req.body.name,
        ownedBy: req.user.id
      });
      const campaign = await newCampaign.save();
      res.status(200).json(campaign);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error saving campaign" });
    }
  }
);

// @route GET /api/campaigns
// @desc Get all campaigns of logged in user. Requires no params
// @access Authenticated Users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const campaigns = await Campaign.find({ ownedBy: userId });
      res.status(200).json(campaigns);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting campaigns" });
    }
  }
);

// @route GET /api/campaigns/campaign
// @desc Get specified campaign of logged in user. Requires 'campaignId'
// @access Authenticated Users
router.get(
  "/campaign/:campaignId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const campaignId = req.params.campaignId;

      const campaign = await Campaign.find({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign || campaign.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        res.status(200).json(campaign);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting campaign" });
    }
  }
);

// @route DELETE /api/campaigns/campaign
// @desc Remove campaign. Requires campaignId
// @access Authenticated Users
router.delete(
  "/campaign/:campaignId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const campaignId = req.params.campaignId;

      const results = await Campaign.deleteOne({
        _id: campaignId,
        ownedBy: userId
      });

      res.status(200).json({ id: `${results} removed` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error deleting campaign" });
    }
  }
);

// @route POST /api/campaigns/prospects
// @desc Add prospects to a Campaign. Requires 'campaignId' and 'prospects' (array of Prospect ids)
// @access Authenticated Users
router.post(
  "/prospects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { campaignId, prospectIds } = req.body;

      const campaign = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign || campaign.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        // Get only prospects that are not already in the campaign to avoid duplication
        // and only prospects owned by logged in user
        const checkedProspectIds = await Promise.all(
          prospectIds.map(async prospectId => {
            const prospectOwnedByUser = await Prospect.exists({
              _id: prospectId,
              ownedBy: userId
            });

            const prospectExistsInCampaign = campaign.prospects.find(
              prospect => prospect.prospectId == prospectId
            );

            if (!prospectExistsInCampaign && prospectOwnedByUser) {
              return {
                prospectId: prospectId
              };
            }
          })
        );

        // Filter out undefined values returned from .map so only valid objects are added to db
        const finalProspectIds = checkedProspectIds.filter(
          prospect => prospect !== undefined
        );

        if (finalProspectIds.length > 0) {
          campaign.prospects.push(...finalProspectIds);
          await campaign.save();
        }
        res.status(200).json(campaign);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error saving prospects to Campaign" });
    }
  }
);

// @route GET /api/campaigns/prospects
// @desc Get all prospects in a campaign. Requires campaignId
// @access Authenticated Users
router.get(
  "/prospects/:campaignId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const campaignId = req.params.campaignId;

      const campaigns = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaigns || campaigns.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        const prospects = await Prospect.populate(campaigns.prospects, {
          path: "prospectId"
        });
        res.status(200).json(prospects);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting prospects" });
    }
  }
);

// @route DELETE /api/campaigns/prospects
// @desc Remove prospects from a campaign. Requires campaignId and an array of prospect ids
// @access Authenticated Users
router.delete(
  "/prospects/:campaignId/:prospectIds",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { campaignId, prospectIds } = req.params;
      const prospectIdArray = JSON.parse(prospectIds);

      const campaign = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign)
        throw new Error(
          `Campaign ${campaignId} owned by ${userId} cannot be found`
        );

      const skippedProspects = [];
      prospectIdArray.forEach(prospectId => {
        const prospectIndex = campaign.prospects.findIndex(
          prospect => prospect.prospectId == prospectId
        );
        if (prospectIndex > -1) {
          campaign.prospects.splice(prospectIndex, 1);
        } else {
          skippedProspects.push(prospectId);
        }
      });
      await campaign.save();

      const errorString = skippedProspects.length
        ? `${skippedProspects} could not be found`
        : "";

      res.status(200).json({
        skippedNum: skippedProspects.length,
        skippedIds: skippedProspects,
        result: `${prospectIdArray.length - skippedProspects.length} of ${
          prospectIdArray.length
        } removed. ${errorString}`
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error deleting prospects" });
    }
  }
);

// @route POST /api/campaigns/:campaignId/steps/:stepId/sendEmails
// @desc Send email in step to all prospects in that step
// @access Authenticated Users
router.post(
  "/:campaignId/steps/:stepId/sendEmails",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { campaignId, stepId } = req.params;
      const userId = req.user.id;

      const campaign = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign)
        throw new Error(
          `Campaign ${campaignId} owned by ${userId} cannot be found`
        );

      await sendEmailsQueue(stepId, req.user.id, req.user.gmailToken);

      res.status(200).json({
        result: "Emails being sent"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error sending emails" });
    }
  }
);

// @route GET /api/campaigns/:campaignId/steps
// @desc Get all the steps of a campaign
// @access Authenticated Users
router.get(
  "/:campaignId/steps",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const campaignId = req.params.campaignId;

    try {
      const campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res
          .status(404)
          .json({ error: `Campaign with id ${campaignId} not found` });
      }

      const userId = req.user._id;

      if (campaign.ownedBy.toString() !== userId.toString()) {
        return res.status(403).json({
          error: `Campaign ${campaignId} not owned by user ${userId}`
        });
      }

      const steps = await Promise.all(
        campaign.steps.map(curr => Step.findById(curr))
      );
      res.json(steps);
    } catch (error) {
      res.status(500).json({ error: "Error getting steps " });
      console.log(error);
    }
  }
);

// @route POST /api/campaigns/:campaignId/steps
// @desc Add a step to a campaign. Requires step name in request body.
// @access Authenticated Users
router.post(
  "/:campaignId/steps",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateStepInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const campaignId = req.params.campaignId;
    const { name } = req.body;

    try {
      const campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res
          .status(404)
          .json({ error: `Campaign with id ${campaignId} not found` });
      }

      const userId = req.user._id;

      if (campaign.ownedBy.toString() !== userId.toString()) {
        return res.status(403).json({
          error: `Campaign ${campaignId} not owned by user ${userId}`
        });
      }

      const newStep = new Step({ name });
      await newStep.save();

      campaign.steps.push(newStep._id);
      await campaign.save();

      res.json(newStep);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error adding step" });
    }
  }
);

// @route POST /api/campaigns/:campaignId/steps/:stepId/content
// @desc Edit the subject and content of a step.
//       Requires subject and content (stringified editorState) in request body.
// @access Authenticated Users
router.post(
  "/:campaignId/steps/:stepId/content",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { campaignId, stepId } = req.params;
    const { subject, content } = req.body;

    try {
      const campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res
          .status(404)
          .json({ error: `Campaign ${campaignId} not found` });
      }

      const userId = req.user._id;

      if (campaign.ownedBy.toString() !== userId.toString()) {
        return res.status(403).json({
          error: `Campaign ${campaignId} not owned by user ${userId}`
        });
      }

      const step = await Step.findById(stepId);

      if (!step) {
        return res.status(404).json({ error: `Step ${stepId} not found` });
      }

      const stepInCampaign = campaign.steps.some(curr => curr == stepId);

      if (!stepInCampaign) {
        return res.status(404).json({
          error: `Step ${stepId} not found in Campaign ${campaignId}`
        });
      }

      step.name = subject;
      step.subject = subject;
      step.content = content;
      await step.save();

      res.json(step);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating step content" });
    }
  }
);

// @route POST /api/campaigns/:campaignId/steps/:stepId/prospects
// @desc Move a selection of prospects in a campaign to one of its steps
//       Requires prospects (array of prospectIds) in request body.
// @access Authenticated Users
router.post(
  "/:campaignId/steps/:stepId/prospects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { campaignId, stepId } = req.params;
    const { prospects } = req.body;

    try {
      const campaign = await Campaign.findById(campaignId);

      if (!campaign) {
        return res
          .status(404)
          .json({ error: `Campaign ${campaignId} not found` });
      }

      const userId = req.user._id;

      if (campaign.ownedBy.toString() !== userId.toString()) {
        return res.status(403).json({
          error: `Campaign ${campaignId} not owned by user ${userId}`
        });
      }

      const targetStep = await Step.findById(stepId);

      if (!targetStep) {
        return res.status(404).json({ error: `Step ${stepId} not found` });
      }

      const stepInCampaign = campaign.steps.some(curr => curr == stepId);

      if (!stepInCampaign) {
        return res.status(404).json({
          error: `Step ${stepId} not found in Campaign ${campaignId}`
        });
      }

      for (let i = 0; i < prospects.length; i++) {
        const prospectObject = campaign.prospects.find(
          curr => curr.prospectId == prospects[i]
        );

        if (!prospectObject) {
          continue;
        }

        //Add the prospect to the target step
        targetStep.prospects.push({
          prospectId: prospects[i]
        });

        //Update the prospect object from the campaign
        prospectObject.step = targetStep._id;
      }

      await targetStep.save();
      await campaign.save();

      res.status(200).json(campaign);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error moving prospects" });
    }
  }
);

module.exports = router;
