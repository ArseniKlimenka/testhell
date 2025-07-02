'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onUserGroupSelected(input, ambientProperties) {
    const body = input.context.Body;

    if (input.data.selectedUserGroup) {
        const selectedUserGroupCode = input.data.selectedUserGroup.userGroupCode;

        let result;
        try {
            this.view.startBlockingUI();
            result = await getUsersInUserGroup(selectedUserGroupCode, ambientProperties);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        await loadUsers(result, body, selectedUserGroupCode, ambientProperties, this.view);
    } else {
        await loadUsers([], body, undefined, ambientProperties, this.view);
    }
};

async function loadUsers(users, body, selectedUserGroupCode, ambientProperties, view) {
    const loadPromises = [
        loadUsersFilter(users, body),
        await loadExceptionsForGroupUsers(users, body, ambientProperties),
        await loadSubstitutesForGroupUsers(users, body, selectedUserGroupCode, ambientProperties)
    ];

    await Promise.all(loadPromises);
    view.rebind();
}

function loadUsersFilter(usersResultData, body) {
    if (usersResultData && usersResultData.length > 0) {
        body.criteria.users = usersResultData.map(user => {
            return {
                userId: user.UserId,
                username: user.Username,
                displayName: getUserDisplayName(user)
            };
        });
    } else {
        body.criteria.users = [];
    }

    // If selected group doesn't include currently selected user then clear user filter
    if (body.criteria.selectedUser && !body.criteria.users.some(u => u.userId === body.criteria.selectedUser.userId)) {
        body.criteria.selectedUser = undefined;
    }
}

async function loadExceptionsForGroupUsers(usersResultData, body, ambientProperties) {
    body.groupUsersExceptions = [];

    if (usersResultData && usersResultData.length > 0) {
        const usersCalendarsPromises = usersResultData.map(async user => {
            return await getExceptionsForUser(user, ambientProperties);
        });

        const result = await Promise.all(usersCalendarsPromises);
        result.forEach(userRules => {
            body.groupUsersExceptions.push(...userRules);
        });
    }
}

async function loadSubstitutesForGroupUsers(usersResultData, body, userGroupCode, ambientProperties) {
    body.groupUsersSubstitutes = [];

    if (usersResultData && usersResultData.length > 0) {
        const usersPromises = usersResultData.map(user => {
            return getUser(user.UserId, ambientProperties);
        });

        const result = await Promise.all(usersPromises);
        result.forEach(user => {
            const userSubstitutes = getUserSubstitutes(user, userGroupCode);
            body.groupUsersSubstitutes.push(...userSubstitutes);
        });
    }
}

function getUserSubstitutes(user, userGroupCode) {
    return user.UserGroups
        .filter(g => g.UserGroupCode === userGroupCode)
        .map((userGroup) => {
            return {
                applicationUserId: user.UserId,
                applicationUserDisplayName: getUserDisplayName(user),
                userGroupId: userGroup.UserGroupId,
                userGroupCode: userGroup.UserGroupCode,
                userGroupName: userGroup.UserGroupName,
                substituteUserId: userGroup.SubstituteUserId ? userGroup.SubstituteUserId : undefined,
                substituteUserDisplayName: userGroup.SubstituteUserDisplayName ? userGroup.SubstituteUserDisplayName : undefined
            };
        });
}

async function getExceptionsForUser(user, ambientProperties) {
    const result = await getUserCalendarRules(user.UserId, ambientProperties);

    if (result) {
        return result.filter(r => r.ruleLevel === 'exception').map(r => {
            return mapCalendarRuleToExceptionItem(user, r);
        });
    }
    return [];
}

function mapCalendarRuleToExceptionItem(user, userCalendarRule) {
    userCalendarRule.applicationUserId = user.UserId;
    userCalendarRule.applicationUserDisplayName = getUserDisplayName(user);
    return userCalendarRule;
}

function getUserDisplayName(user) {
    if (user.Claims && user.Claims.DisplayName) {
        return user.Claims.DisplayName;
    }

    return user.Username;
}

function getUsersInUserGroup(userGroupCode, ambientProperties) {
    const getUsersInUserGroupRequest = {
        method: 'GET',
        url: `api/organisation/public/application-user-groups/${userGroupCode}/users`,
        returnHttpPromise: true
    };

    return ambientProperties.services.api.call(getUsersInUserGroupRequest);
}

function getUser(userId, ambientProperties) {
    const getUserRequest = {
        method: 'GET',
        url: `api/organisation/public/user-management/id/${userId}`,
        returnHttpPromise: true
    };

    return ambientProperties.services.api.call(getUserRequest);
}

function getUserCalendarRules(userId, ambientProperties) {
    const getUserCalendarRulesRequest = {
        method: 'GET',
        url: `api/organisation/public/work-calendars/user/${userId}/rules`,
        returnHttpPromise: true
    };

    return ambientProperties.services.api.call(getUserCalendarRulesRequest);
}
