/*
 * Contains functions which call the back-end
 */

import axios from "axios";

const token = window.localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

const register = fields => {
  return axios.post("/api/users/register", fields);
};

const login = fields => {
  return axios.post("/api/users/login", fields);
};

const getProspectData = () => {
  return axios.get("/api/prospects/");
};

const uploadProspectCsv = async formData => {
  try {
    const response = await axios({
      url: "/api/prospects/upload",
      method: "POST",
      headers: {},
      data: formData
    });
    return response;
  } catch (error) {
    console.log("Error occurred csv upload:", error);
    return false;
  }
};

const getTemplates = () => {
  return axios.get("/api/templates");
};

const createTemplate = template => {
  return axios.post("/api/templates/", template);
};

const editTemplate = (template, id) => {
  const url = "/api/templates/" + id;
  return axios.put(url, template);
};

/*
 * Check if current user has given permission for Mail Sender to access their
 * gmail account
 */

const checkForGmailToken = async () => {
  try {
    const response = await axios.get(`/api/gmail-auth/checkToken`);
    return response.data.tokenExists;
  } catch (error) {
    console.log("Error occurred checking gmail token:", error);
    return false;
  }
};

/*
 * Gets a Google URL to send user to to authorise Mail Sender to access their
 * gmail account.
 * New redirect routes also need to be added at: https://console.developers.google.com/apis/credentials?project=mail-sender-1
 * @param endRoute {string} - front-end route to load after 'Success/Failure' Dialog e.g. '/home'
 */
const getAuthUrl = async redirectUrl => {
  try {
    const response = await axios.get(
      `/api/gmail-auth/getAuthUrl?redirectUrl=${redirectUrl}`
    );
    return response.data.authUrl;
  } catch (error) {
    console.log("Error occurred getting Google Auth URL:", error);
    return false;
  }
};

/*
 * Posts received gmail auth code to back-end, where it is exchanged
 * for a token and saved in User collection
 * @param code {string} - authorisation code received from Google after user authorises Mail Sender
 * to access their Gmail account
 * @param endRoute {string} - front-end route to load after 'Success/Failure' Dialog e.g. '/home'
 */
const postGmailAuthCode = async (code, redirectUrl, token) => {
  try {
    // Leaving our domain resets the axios header, need to reassign
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(
      `/api/gmail-auth/processToken?code=${code}&redirectUrl=${redirectUrl}`
    );
    return response.data;
  } catch (error) {
    console.log("Error occurred processing token:", error);
    return { tokenSaved: false };
  }
};

const getUser = async () => {
  try {
    const response = await axios.get(`/api/users`);
    return response.data;
  } catch (error) {
    console.log("Error getting user data: ", error);
    return null;
  }
};

//API calls for campaigns
const createCampaign = name => {
  return axios.post("/api/campaigns", { name });
};

const getCampaigns = () => {
  return axios.get("/api/campaigns");
};

const getCampaign = campaignId => {
  return axios.get(`/api/campaigns/campaign/${campaignId}`);
};

const addProspectsToCampaign = async (campaignId, prospectIds) => {
  const response = await axios.post("/api/campaigns/prospects", {
    campaignId: campaignId,
    prospectIds: prospectIds
  });
  return response;
};

const getCampaignProspects = campaignId => {
  return axios.get(`/api/campaigns/prospects/${campaignId}`);
};

//API calls for campaign steps
const getCampaignSteps = campaignId => {
  return axios.get(`/api/campaigns/${campaignId}/steps`);
};

const addStepToCampaign = (campaignId, name) => {
  return axios.post(`/api/campaigns/${campaignId}/steps`, { name });
};

const editStepContent = (campaignId, stepId, fields) => {
  return axios.post(
    `/api/campaigns/${campaignId}/steps/${stepId}/content`,
    fields
  );
};

const moveProspectsToStep = (campaignId, stepId, prospects) => {
  return axios.post(`/api/campaigns/${campaignId}/steps/${stepId}/prospects`, {
    prospects
  });
};

export {
  register,
  login,
  checkForGmailToken,
  getAuthUrl,
  postGmailAuthCode,
  getUser,
  addStepToCampaign,
  getProspectData,
  uploadProspectCsv,
  createCampaign,
  getCampaigns,
  getCampaign,
  addProspectsToCampaign,
  getCampaignProspects,
  getCampaignSteps,
  editStepContent,
  moveProspectsToStep,
  getTemplates,
  createTemplate,
  editTemplate
};
