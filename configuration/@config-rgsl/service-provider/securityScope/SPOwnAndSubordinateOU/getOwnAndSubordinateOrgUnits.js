/**
 * Retrieves the codes for organisation units that are subordinate to the current user.
 * @param {Object} userProfile - Current user profile.
 * @returns {string} - Subordinate organisation unit codes of the current user.
 */
module.exports = function getOwnAndSubordinateOrgUnits(userProfile) {
    return userProfile.subordinateOrganisationUnits;
};
