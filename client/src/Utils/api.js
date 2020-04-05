/*
 * Contains functions which call the back-end
 */

import axios from "axios";

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
const postCode = async (code, redirectUrl) => {
  try {
    const response = await axios.post(
      `/api/gmail-auth/processToken?code=${code}&redirectUrl=${redirectUrl}`
    );
    return response.data;
  } catch (error) {
    console.log("Error occurred processing token:", error);
    return { tokenSaved: false };
  }
};

export { checkForGmailToken, getAuthUrl, postCode };
