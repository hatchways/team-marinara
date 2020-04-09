const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

const Campaign = require("../../models/campaign");

// @route POST /api/campaigns
// @desc Create a Campaign object. Requires 'name' (campaign name) and 'ownedBy' (a userId)
// @access Authenticated Users
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //*********** TO DO *****************
      //Campaign field validation
      //const { errors, isValid } = validateCampaignInput(req.body);

      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }

      const { name, ownedBy } = req.body;
      const newCampaign = new Campaign({
        name,
        ownedBy
      });
      const campaign = await newCampaign.save();
      res.json(campaign);
    } catch (error) {
      console.log(error);
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
      res.json(campaigns);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route GET /api/campaigns/campaign
// @desc Get specified campaign of logged in user. Requires 'campaignId'
// @access Authenticated Users
router.get(
  "/campaign",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { campaignId } = req.body;

      const campaign = await Campaign.find({
        _id: campaignId,
        ownedBy: userId
      });
      console.log(campaign);
      if (!campaign || campaign.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        res.json(campaign);
      }
    } catch (error) {
      console.log(error);
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
      const { campaignId, prospects } = req.body;

      const prospectsArray = JSON.parse(prospects);

      /****************** TODO: Check prospects are valid ***************/

      const campaign = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign || campaign.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        // turn array of ids into array of objects for adding to campaign.prospects
        const arrayOfProspectObj = prospectsArray.map(prospectId => {
          return {
            prospectId: prospectId
          };
        });

        campaign.prospects.push(...arrayOfProspectObj);
        await campaign.save();
        res.json(campaign);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// @route GET /api/campaigns/prospects
// @desc Get all prospects in a campaign. Requires campaignId
// @access Authenticated Users
router.get(
  "/prospects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { campaignId } = req.body;

      const campaigns = await Campaign.findOne({
        _id: campaignId,
        ownedBy: userId
      });

      if (!campaign || campaign.length === 0) {
        res
          .status(404)
          .send({ id: `Campaign with id ${campaignId} is not found` });
      } else {
        res.json(campaigns.prospects);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// @route DELETE /api/campaigns/prospects
// @desc Remove prospects from a campaign. Requires campaignId and an array of prospect ids
// @access Authenticated Users
router.delete(
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

      prospectIds.forEach(async prospectId => {
        campaign.prospects.pull({ prospectId: prospectId });
      });
      await Campaign.save();

      res.json({ id: `Prospects removed` });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
