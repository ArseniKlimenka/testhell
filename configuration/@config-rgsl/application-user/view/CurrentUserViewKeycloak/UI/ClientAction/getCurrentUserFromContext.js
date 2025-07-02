module.exports = function getCurrentUserFromContext(input, ambientProperties) {
    const user = input.context.Body.general;
    const currentUser = ambientProperties.applicationContext.currentUser();

    user.username = currentUser.getUserName();
    user.externalId = currentUser.getExternalId();
    user.loginType = currentUser.getLoginType();
    user.editUrl = ambientProperties.services.identityProvider.getAccountUrl();
    user.claims = currentUser.getClaims();
    user.claims.IsUserActive = user.claims?.IsUserActive === 'true';

    this.view.rebind();
};
