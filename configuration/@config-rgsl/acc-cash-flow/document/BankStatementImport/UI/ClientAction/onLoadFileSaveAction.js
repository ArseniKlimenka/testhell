module.exports = function onLoadFileSaveAction(input, ambientProperties) {
    input.context.Body.sourceFileFormat = input.context.ClientViewModel.sourceFileFormat;
};
