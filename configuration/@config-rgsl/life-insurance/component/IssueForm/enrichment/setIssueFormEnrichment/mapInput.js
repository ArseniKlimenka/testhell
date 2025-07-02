module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    if (body.issueForm?.code?.issueFormCode) {
        return;
    }

    const output = {
        data: {
            criteria: {
            }
        }
    };

    return output;

};
