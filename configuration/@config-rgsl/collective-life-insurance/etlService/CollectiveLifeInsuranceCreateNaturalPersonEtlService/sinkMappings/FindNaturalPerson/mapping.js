module.exports = function mapping(lineInput) {

    return {
        input: {
            data: {
                criteria: {
                    partyType: 'NaturalPerson',
                    lastName: lineInput.surName,
                    firstName: lineInput.firstName,
                    middleName: lineInput.middleName,
                    dateOfBirth: lineInput.birthDay
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
