const { UserBuilder } = require('@adinsure-tools/api-test-framework');

/**
 * Return user by name
 * @param {*} user
 */
async function getUser(username) {
    let user;
    const builder = new UserBuilder();
    const data = await builder
        .getByUsername(username, (data) => {
            user = data;
        })
        .build();

    return user;
}

/**
 * Create user
 * @param {*} user
 */
async function createUser(user) {
    const builder = new UserBuilder();

    builder
        .setLoginTypeRequest("UsernamePassword")
        .setUsernameRequest(user.UserName)
        .setPasswordRequest(user.Password);

    if (Array.isArray(user.Claims)) {
        for (let c = 0; c < user.Claims.length; c++) {
            builder.setClaimRequest(user.Claims[c].Type, user.Claims[c].Value);
        }
    }

    builder.create();

    if (Array.isArray(user.Roles)) {
        for (let r = 0; r < user.Roles.length; r++) {
            builder.addRole(user.Roles[r]);
        }
    }

    if (Array.isArray(user.Groups)) {
        for (let i = 0; i < user.Groups.length; i++) {
            builder.addToGroup(user.Groups[i]);
        }
    }

    const data = await builder.build();
    return data;
}

/**
 * Update user
 * @param {*} user
 */
async function updateUser(user) {
    const userNameURI = encodeURIComponent(user.UserName);
    const builder = new UserBuilder();
    builder.getByUsername(userNameURI);

    if (Array.isArray(user.Groups)) {
        for (let i = 0; i < user.Groups.length; i++) {
            builder.addToGroup(user.Groups[i]);
        }
    }

    const data = await builder.build();
    data.Password = user.Password; // TODO: this line must be removed after LJADIRDSUP-20182
    data.UserGroups.forEach(_ => {
        _.IsGroupManager = true;
    });

    const roles = data.UserRoles.map(r => r.ApplicationRoleId);
    data.UserRoles = roles;

    if (Array.isArray(user.Claims)) {
        for (let c = 0; c < user.Claims.length; c++) {
            const claim = user.Claims[c];
            data.Claims[claim.Type] = claim.Value;
        }
    }

    const builderNew = new UserBuilder();
    builderNew
        .getByUsername(userNameURI)
        .update(data);

    const dataNew = await builderNew.build();
}

module.exports = {
    createUser,
    updateUser,
};
