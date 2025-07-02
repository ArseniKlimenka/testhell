const { sourceFileFormatBsiDataConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {
    const translate = ambientProperties.services.translate.getSync;
    input.context.ClientViewModel.sourceFileFormatData = sourceFileFormatBsiDataConstants.map(_ => {
        return {
            fileFormat: _.fileFormat,
            formatName: translate(ambientProperties.configurationCodeName.toUpperCase(), _.formatName),
        };
    });
    input.context.ClientViewModel.sourceFileFormat = input.context.Body.sourceFileFormat;
    this.view.rebind();
};
