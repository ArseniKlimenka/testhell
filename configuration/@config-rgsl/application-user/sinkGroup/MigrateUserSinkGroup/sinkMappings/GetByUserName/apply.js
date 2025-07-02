module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const user = sinkResult;
    const federationLink = this.environmentVariables['rgsl.keycloakUserManagement.userFederationId'];
    const keycloakUser = {
        id: user.ExternalId,
        username: user.Username,
        enabled: user.Claims.IsUserActive ?? true,
        email: user.Claims.Email,
        firstName: user.Claims.DisplayName,
        federationLink: federationLink,
        attributes: {
            ...user.Claims,
        }
    };

    const password = sinkExchange.resolveContext('password');
    if (password) {
        const c = {
            type: 'password',
            value: password,
        };
        const isNewUser = !user.ExternalId;
        if (isNewUser) {
            c.temporary = true;
        }
        keycloakUser.credentials = [c];
    }

    sinkExchange.mapContext('adInsureUser', user);
    sinkExchange.mapContext('keycloakUser', keycloakUser);
};
