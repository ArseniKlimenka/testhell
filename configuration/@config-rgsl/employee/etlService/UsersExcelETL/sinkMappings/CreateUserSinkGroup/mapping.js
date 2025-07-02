const { getRoles, getUserGroupId, getPassword, AccountTypes } = require('@config-rgsl/employee/lib/exportUserHelper');

module.exports = function mapping(lineInput, sinkExchange) {

    const userRoles = getRoles(lineInput.data.roles, sinkExchange.roles);
    const userGroupId = getUserGroupId(sinkExchange.UserGroup, lineInput.data.groups);

    const password = getPassword();
    sinkExchange.password = password;

    const request = {
        Username: lineInput.data.username,
        Password: password,
        LoginType: "UsernamePassword",
        Claims: {
            PartyCode: sinkExchange.partyCode.toString(),
            DisplayName: lineInput.data.fullName.toString(),
            Email: lineInput.data.email.toString(),
            IsUserActive: true.toString(),
            ExpireDate: '2100-01-01',
            AccountType: AccountTypes.Standard
        },
        UserGroups: [
            {
                UserGroupId: userGroupId,
                isGroupManager: false,
                SubstituteUserId: ''
            }
        ],
        UserRoles: userRoles
    };
    return { adInsureUser: request };
};
