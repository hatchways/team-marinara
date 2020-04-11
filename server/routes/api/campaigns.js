const express = require("express");
const router = express.Router();
const passport = require("passport");

const Campaign = require("../../models/campaign");
const Prospect = require("../../models/Prospect");
const {
  validateCampaignInput,
  validateAddProspectsInput
} = require("../../validation/campaign");

// @route POST /api/campaigns
// @desc Create a Campaign object. Requires 'name' (campaign name) and 'ownedBy' (a userId)
// @access Authenticated Users
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //Campaign field validation
      const { errors, isValid } = validateCampaignInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newCampaign = new Campaign({
        name: req.body.name,
        ownedBy: req.user.id
      });
      const campaign = await newCampaign.save();
      res.json(campaign);
    } catch (error) {
      console.log(error);
      res.json({ error: "Error saving campaign" });
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
      res.json({ error: "Error getting campaigns" });
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
        res.json(campaign);
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "Error getting campaign" });
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
      console.log();
      const campaignId = req.params.campaignId;

      const results = await Campaign.deleteOne({
        _id: campaignId,
        ownedBy: userId
      });

      res.json({ id: `${results} removed` });
    } catch (error) {
      console.log(error);
      res.json({ error: "Error deleting campaign" });
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

      // Check if any prospects being added, are already in the campaign
      const uniqueProspectIds = validateAddProspectsInput(
        campaignId,
        prospectIds
      );

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
        const arrayOfProspectObj = uniqueProspectIds.map(prospectId => {
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
      res.json({ error: "Error saving prospects to Campaign" });
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
        res.json(prospects);
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "Error getting prospects" });
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

      // Add Error checking and report them back //
      prospectIdArray.forEach(async prospectId => {
        campaign.prospects.id(prospectId).remove();
        await campaign.save();
      });

      res.json({ id: `${prospectIdArray} removed` });
    } catch (error) {
      console.log(error);
      res.json({ error: "Error deleting prospects" });
    }
  }
);

module.exports = router;
