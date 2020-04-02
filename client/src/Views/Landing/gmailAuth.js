/*
 * Contains functions involved in checking and getting gmail authorisation for user
 */

// TO DO: Get from .env
const SERVER_ADDRESS = "http://localhost:3001";

/*
 * Check if current user has given permission for Mail Sender to access their
 * gmail account
 */
exports.checkForGmailToken = async (userId) => {
  const response = await fetch(`${SERVER_ADDRESS}/api/gmail-auth/checkToken`)
    .then((res) => {
      if (!res.ok)
        throw new Error(`Server responded with status ${res.status}`);
      return res;
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error occurred checking gmail token:", err);
      return { tokenExists: false };
    });
  return response.tokenExists;
};

/*
 * Gets a Google URL to send user to to authorise Mail Sender to access their
 * gmail account
 */
exports.getAuthUrl = async () => {
  const response = await fetch(`${SERVER_ADDRESS}/api/gmail-auth/getAuthUrl`)
    .then((res) => {
      if (!res.ok)
        throw new Error(`Server responded with status ${res.status}`);
      return res;
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error occurred getting Google Auth URL:", err);
      return false;
    });

  return response.authUrl;
};

/*
 * Posts received gmail auth code to back-end, where it is exchanged
 * for a token and saved in User collection
 */
exports.postCode = async (query) => {
  // If user denied authorisation
  if (query.error) return false;

  const code = query.code;

  const response = await fetch(
    `${SERVER_ADDRESS}/api/gmail-auth/processToken?code=${code}`,
    { method: "POST" }
  )
    .then((res) => {
      if (!res.ok)
        throw new Error(`Server responded with status ${res.status}`);
      return res;
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error occurred processing token:", err);
      return false;
    });

  return response.tokenSaved;
};
