module.exports = function executeSearchOperation(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isWTTJ = userRoles.some(x => x.ApplicationRoleCodeName == 'WTTJ');

    const errorsToShow = [];

    if (!isWTTJ) {
        const partyType = input.context.request.data.criteria.partyType;
        if (!partyType) {
            throw 'Необходимо указать Тип!';
        }
        if (partyType == 'NaturalPerson') {

            const firstName = input.context.request.data.criteria.firstName;
            if (!firstName) {
                errorsToShow.push('Имя');
            }

            const lastName = input.context.request.data.criteria.lastName;
            if (!lastName) {
                errorsToShow.push('Фамилия');
            }

            const dateOfBirth = input.context.request.data.criteria.dateOfBirth;
            if (!dateOfBirth) {
                errorsToShow.push('Дата рождения');
            }

            // If we open this search in view CreditContractReportsView
            if (input.rootContext?.ConfigurationCodeName == "CreditContractReportsView") {

                const docNumber = input.context.request.data.criteria.docNumber;
                if (!docNumber) {
                    errorsToShow.push('Номер документа');
                }

                const docSeries = input.context.request.data.criteria.docSeries;
                if (!docSeries) {
                    errorsToShow.push('Серия документа');
                }
            }
        }
    }

    if (errorsToShow.length > 0) {
        const errorsToShowJoint = errorsToShow.join(', ');
        throw `Необходимо указать: ${errorsToShowJoint}!`;
    }

    this.view.search();
};
