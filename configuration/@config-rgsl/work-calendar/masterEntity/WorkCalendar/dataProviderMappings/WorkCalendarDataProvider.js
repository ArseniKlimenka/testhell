module.exports = function searchDocumentApplyFunction(input, output) {
    output.name = input.body.name;
    output.timeZone = input.body.timeZone;
    output.applicationUserId = input.body.applicationUserId;
    output.isActive = input.body.isActive;
    output.isDefault = input.body.isDefault;
};
