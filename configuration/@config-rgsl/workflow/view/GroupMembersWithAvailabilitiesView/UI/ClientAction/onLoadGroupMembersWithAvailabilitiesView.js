module.exports = function onLoadGroupMembersWithAvailabilitiesView(input, ambientProperties) {

    const eventArgs = {
        sender: {
            elementId: 'userGroupsSelect'
        }
    };
    ambientProperties.services.util.raiseEvent('REFRESH_GROUP_MEMBER_WITH_AVAILABILITIES_VIEW', eventArgs);

};
