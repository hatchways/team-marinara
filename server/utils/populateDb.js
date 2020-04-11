const mongoose = require("mongoose");
const User = require("../models/user.js");
const Prospect = require("../models/Prospect.js");
const Campaign = require("../models/campaign.js");
const Step = require("../models/step.js");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

async function main() {
  try {
    const mongoDB =
      config.mongoURI + ":" + config.mongoPort + "/" + config.mongoDB;
    await mongoose
      .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Connected to database...");
      });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    const userIds = await populateUsers();
    const prospectIds = await populateProspects(userIds);
    const [campaignIds, stepIds] = await populateCampaigns(
      userIds,
      prospectIds
    );
    await populateSteps(prospectIds, campaignIds, stepIds);
  } catch (error) {
    console.log(error);
  }

  console.log("Finished");
  process.exit(1);
}

/*****************************************************/
async function populateUsers() {
  const hashedPassword = await bcrypt.hash("password", 10);
  const userIds = [
    mongoose.Types.ObjectId(),
    mongoose.Types.ObjectId(),
    mongoose.Types.ObjectId()
  ];

  dummyUsers = [
    {
      _id: userIds[0],
      firstName: "Danny",
      lastName: "Ngo",
      email: "d@n.com",
      password: hashedPassword
    },
    {
      _id: userIds[1],
      firstName: "Airen",
      lastName: "Surzyn",
      email: "a@s.com",
      password: hashedPassword
    },
    {
      _id: userIds[2],
      firstName: "Darren",
      lastName: "Greenfield",
      email: "d@g.com",
      password: hashedPassword
    }
  ];

  await User.insertMany(dummyUsers);

  console.log("Dummy users added to users collection");
  return userIds;
}

/*****************************************************/
async function populateProspects(userIds) {
  const prospectIds = [];
  for (let x = 0; x < 12; x++) {
    prospectIds.push(mongoose.Types.ObjectId());
  }

  const dummyProspects = [
    //Owned By Danny
    {
      _id: prospectIds[0],
      firstName: "Danny",
      lastName: "Ngo",
      email: "d@n.com",
      status: "open",
      ownedBy: userIds[0]
    },
    {
      _id: prospectIds[1],
      firstName: "Airen",
      lastName: "Surzyn",
      email: "a@s.com",
      status: "open",
      ownedBy: userIds[0]
    },
    {
      _id: prospectIds[2],
      firstName: "Darren",
      lastName: "Greenfield",
      email: "d@g.com",
      status: "open",
      ownedBy: userIds[0]
    },
    {
      _id: prospectIds[3],
      firstName: "Shums",
      lastName: "Kassam",
      email: "s@k.com",
      status: "closed",
      ownedBy: userIds[0]
    },
    // Owned by Airen
    {
      _id: prospectIds[4],
      firstName: "Danny",
      lastName: "Ngo",
      email: "d@n.com",
      status: "open",
      ownedBy: userIds[1]
    },
    {
      _id: prospectIds[5],
      firstName: "Airen",
      lastName: "Surzyn",
      email: "a@s.com",
      status: "open",
      ownedBy: userIds[1]
    },
    {
      _id: prospectIds[6],
      firstName: "Darren",
      lastName: "Greenfield",
      email: "d@g.com",
      status: "open",
      ownedBy: userIds[1]
    },
    {
      _id: prospectIds[7],
      firstName: "Shums",
      lastName: "Kassam",
      email: "s@k.com",
      status: "closed",
      ownedBy: userIds[1]
    },
    // Owned by Darren
    {
      _id: prospectIds[8],
      firstName: "Danny",
      lastName: "Ngo",
      email: "d@n.com",
      status: "open",
      ownedBy: userIds[2]
    },
    {
      _id: prospectIds[9],
      firstName: "Airen",
      lastName: "Surzyn",
      email: "a@s.com",
      status: "open",
      ownedBy: userIds[2]
    },
    {
      _id: prospectIds[10],
      firstName: "Darren",
      lastName: "Greenfield",
      email: "d@g.com",
      status: "open",
      ownedBy: userIds[2]
    },
    {
      _id: prospectIds[11],
      firstName: "Shums",
      lastName: "Kassam",
      email: "s@k.com",
      status: "closed",
      ownedBy: userIds[2]
    }
  ];

  await Prospect.insertMany(dummyProspects);

  console.log("Dummy prospects added to prospects collection");
  return prospectIds;
}

/*****************************************************/
async function populateCampaigns(userIds, prospectIds) {
  const campaignIds = [];
  for (let x = 0; x < 3; x++) {
    campaignIds.push(mongoose.Types.ObjectId());
  }

  const stepIds = [];
  for (let x = 0; x < 6; x++) {
    stepIds.push(mongoose.Types.ObjectId());
  }

  const dummyCampaigns = [
    {
      _id: campaignIds[0],
      name: "Campaign 1",
      ownedBy: userIds[0],
      prospects: [
        { _id: prospectIds[0] },
        { _id: prospectIds[1] },
        { _id: prospectIds[2] },
        { _id: prospectIds[3] }
      ],
      steps: [stepIds[0], stepIds[3]]
    },
    {
      _id: campaignIds[1],
      name: "Campaign 2",
      ownedBy: userIds[1],
      prospects: [
        { _id: prospectIds[4] },
        { _id: prospectIds[5] },
        { _id: prospectIds[6] },
        { _id: prospectIds[7] }
      ],
      steps: [stepIds[1], stepIds[4]]
    },
    {
      _id: campaignIds[2],
      name: "Campaign 3",
      ownedBy: userIds[2],
      prospects: [
        { _id: prospectIds[8] },
        { _id: prospectIds[9] },
        { _id: prospectIds[10] },
        { _id: prospectIds[11] }
      ],
      steps: [stepIds[2], stepIds[5]]
    }
  ];

  await Campaign.insertMany(dummyCampaigns);

  console.log("Dummy campaigns added to campaigns collection");
  return [campaignIds, stepIds];
}

/*****************************************************/
async function populateSteps(prospectIds, campaignIds, stepIds) {
  dummySteps = [
    {
      _id: stepIds[0],
      campaignId: campaignIds[0],
      name: "Step 1",
      subject: "Buy this product",
      content:
        "Hi {{prospect_first_name}},\n\nYou gotta buy this product. It'll sell faster than tp in a pandemic!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[0]
        },
        {
          _id: prospectIds[1]
        },
        {
          _id: prospectIds[2]
        }
      ]
    },
    {
      _id: stepIds[1],
      campaignId: campaignIds[1],
      name: "Step 1",
      subject: "Buy this product",
      content:
        "Hi {{prospect_first_name}},\n\nYou gotta buy this product. It'll sell faster than tp in a pandemic!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[6]
        },
        {
          _id: prospectIds[4]
        },
        {
          _id: prospectIds[5]
        }
      ]
    },
    {
      _id: stepIds[2],
      campaignId: campaignIds[2],
      name: "Step 1",
      subject: "Buy this product",
      content:
        "Hi {{prospect_first_name}},\n\nYou gotta buy this product. It'll sell faster than tp in a pandemic!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[9]
        },
        {
          _id: prospectIds[10]
        },
        {
          _id: prospectIds[8]
        }
      ]
    },
    {
      _id: stepIds[3],
      campaignId: campaignIds[0],
      name: "Step 2",
      subject: "Buy this product again",
      content:
        "Hi {{prospect_first_name}},\n\nWhy no reply? Seriously, you gotta buy this product. It'll sell faster than sports scholorships to an Ivy league college!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[0]
        },
        {
          _id: prospectIds[1]
        },
        {
          _id: prospectIds[2]
        }
      ]
    },
    {
      _id: stepIds[4],
      campaignId: campaignIds[1],
      name: "Step 2",
      subject: "Buy this product",
      content:
        "Hi {{prospect_first_name}},\n\nWhy no reply? Seriously, you gotta buy this product. It'll sell faster than sports scholorships to an Ivy league college!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[6]
        },
        {
          _id: prospectIds[4]
        },
        {
          _id: prospectIds[5]
        }
      ]
    },
    {
      _id: stepIds[5],
      campaignId: campaignIds[2],
      name: "Step 2",
      subject: "Buy this product",
      content:
        "Hi {{prospect_first_name}},\n\nWhy no reply? Seriously, you gotta buy this product. It'll sell faster than sports scholorships to an Ivy league college!\n\nCall me,\n{{your_first_name}}",
      prospects: [
        {
          _id: prospectIds[9]
        },
        {
          _id: prospectIds[10]
        },
        {
          _id: prospectIds[8]
        }
      ]
    }
  ];

  await Step.insertMany(dummySteps);

  console.log("Dummy steps added to steps collection");
}

main();
