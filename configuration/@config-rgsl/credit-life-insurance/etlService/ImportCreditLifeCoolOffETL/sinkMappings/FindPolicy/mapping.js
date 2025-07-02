module.exports = function mapping(lineInput) {

    const lineData = lineInput.data;
    const contractNumber = lineData.policySeries + '-' + lineData.policyNumber;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };

};
