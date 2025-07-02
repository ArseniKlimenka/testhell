/**
 * Retrieves the current users username.
 * @param {Object} userProfile - Current user profile.
 * @returns {string} - Current user party code.
 */
module.exports = function getCurrentPartyCode(userProfile) {
    return userProfile.partyCode;
};
