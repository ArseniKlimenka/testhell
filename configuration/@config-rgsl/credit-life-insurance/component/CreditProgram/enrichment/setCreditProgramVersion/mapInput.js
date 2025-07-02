module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const creditProgramId = body.creditProgram?.creditProgramId;

    if (!creditProgramId) {
        return;
    }

    const output = {
        data: {
            criteria: {
                code: creditProgramId,
            }
        }
    };

    return output;

};
