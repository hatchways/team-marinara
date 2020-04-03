/*
 * Contains functions involved in checking and getting gmail authorisation for user
 */

const axios = require("axios");

/*
 * Check if current user has given permission for Mail Sender to access their
 * gmail account
 */
const checkForGmailToken = async () => {
  const response = await axios
    .get(`/api/gmail-auth/checkToken`)
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
const getAuthUrl = async (endRoute) => {
  const response = await axios
    .get(`/api/gmail-auth/getAuthUrl?endRoute=${endRoute}`)
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
const postCode = async (code) => {
  const response = await axios
    .post(`/api/gmail-auth/processToken?code=${code}`)
    .catch((err) => {
      console.log("Error occurred processing token:", err);
      return false;
    });

  return response.data;
};

export { checkForGmailToken, getAuthUrl, postCode };
