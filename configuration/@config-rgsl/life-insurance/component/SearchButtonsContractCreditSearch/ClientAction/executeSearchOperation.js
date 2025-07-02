module.exports = function executeSearchOperation(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isWTTJ = userRoles.some(x => x.ApplicationRoleCodeName == 'WTTJ');

    const errorsToShow = [];

    if (!isWTTJ) {

        const holder = input.context.request.data.criteria.holder;
        if (!holder) {
            errorsToShow.push('Страхователь');
        }
    }

    if (errorsToShow.length > 0) {
        const errorsToShowJoint = errorsToShow.join(', ');
        throw `Необходимо указать: ${errorsToShowJoint}!`;
    }

    this.view.search();
};
