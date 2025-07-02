module.exports = function userGroupArrayOperationHandler(input) {
    const { affectedRow, originalRow, operationType, context } = input;

    if (operationType === 'Delete') {
        const deletedGroupName = affectedRow.nameLocalized;
        removeApplicationRolesRelatedToUserGroup(context.Body, deletedGroupName);
    } else if (operationType === 'Add') {
        const addedGroupName = affectedRow.nameLocalized;
        const addedGroupRoles = affectedRow.roles;
        addApplicationRolesRelatedToUserGroup(context.Body, addedGroupName, addedGroupRoles);
    } else if (operationType === 'Edit') {
        const deletedGroupName = originalRow.nameLocalized;
        const addedGroupName = affectedRow.nameLocalized;
        if (deletedGroupName != addedGroupName) {
            const addedGroupRoles = affectedRow.roles;
            removeApplicationRolesRelatedToUserGroup(context.Body, deletedGroupName);
            addApplicationRolesRelatedToUserGroup(context.Body, addedGroupName, addedGroupRoles);
        }
    }
};

function removeApplicationRolesRelatedToUserGroup(body, groupName) {
    if (!body.roles) {
        return;
    }
    const rolesFromGroups = body.roles.filter(r => r.isAssignedFromGroup);
    rolesFromGroups.forEach(role => {
        const groupNames = role.userGroupNames.split(", ");
        if (groupNames.includes(groupName)) {
            if (groupNames.length === 1) {
                body.roles = body.roles.filter(r => r.codeName != role.codeName || !r.isAssignedFromGroup);
            } else {
                const roleIndex = body.roles.findIndex(r => r.codeName === role.codeName && r.isAssignedFromGroup);
                body.roles[roleIndex].userGroupNames = groupNames.filter(gn => gn != groupName).join(", ");
            }
        }
    });
}

function addApplicationRolesRelatedToUserGroup(body, groupName, groupApplicationRoles) {
    if (!groupApplicationRoles) {
        return;
    }
    groupApplicationRoles.forEach(role => {
        const roleIndex = body.roles.findIndex(r => r.codeName === role.codeName && r.isAssignedFromGroup);
        if (roleIndex >= 0) {
            const groupNames = body.roles[roleIndex].userGroupNames.split(", ");
            groupNames.push(groupName);
            groupNames.sort();
            body.roles[roleIndex].userGroupNames = groupNames.join(", ");
        } else {
            body.roles.push({
                id: role.id,
                codeName: role.codeName,
                userGroupNames: groupName,
                isAssignedFromGroup: true
            });
        }
    });
}
