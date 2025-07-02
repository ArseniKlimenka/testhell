/**
 * Retrieves the current users username.
 * @param {Object} userProfile - Current user profile.
 * @returns {string} - Current users username.
 */
module.exports = function getCurrentUsername(userProfile) {
    return userProfile.username;
};
