/**
 * Retrieves the codes for organisation units the current users is presently a member of.
 * @param {Object} userProfile - Current user profile.
 * @returns {string} - Organisation unit codes the current user is presently a member of.
 */
module.exports = function getCurrentOrgUnits(userProfile) {
    return userProfile.organisationUnits;
};
