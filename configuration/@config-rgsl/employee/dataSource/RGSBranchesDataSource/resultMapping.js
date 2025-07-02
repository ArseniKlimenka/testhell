module.exports = function resultMapping(input) {

    const output = {};

    output.branchId = input.ID;
    output.branchName = input.NAME;
    output.branchKSP = input.KSP;
    output.branchRegion = input.REGION;

    return output;

};
