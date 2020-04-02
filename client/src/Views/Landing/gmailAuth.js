/*
 * Contains functions involved in checking and getting gmail authorisation for user
 */

const axios = require("axios");

// TO DO: Get from .env
const SERVER_ADDRESS = "http://localhost:3000";

/*
 * Check if current user has given permission for Mail Sender to access their
 * gmail account
 */
exports.checkForGmailToken = async (userId) => {
  const response = await axios
    .get(`${SERVER_ADDRESS}/api/gmail-auth/checkToken`)
    .catch((err) => {
      console.log("Error occurred checking gmail token:", err);
      return { tokenExists: false };
    });
  return response.data.tokenExists;
};

/*
 * Gets a Google URL to send user to to authorise Mail Sender to access their
 * gmail account
 */
exports.getAuthUrl = async (endRoute) => {
  const response = await axios
    .get(`${SERVER_ADDRESS}/api/gmail-auth/getAuthUrl?endRoute=${endRoute}`)
    .catch((err) => {
      console.log("Error occurred getting Google Auth URL:", err);
      return false;
    });

  return response.data.authUrl;
};

/*
 * Posts received gmail auth code to back-end, where it is exchanged
 * for a token and saved in User collection
 */
exports.postCode = async (code) => {
  const response = await axios
    .post(`${SERVER_ADDRESS}/api/gmail-auth/processToken?code=${code}`)
    .catch((err) => {
      console.log("Error occurred processing token:", err);
      return false;
    });

  return response.data;
};
