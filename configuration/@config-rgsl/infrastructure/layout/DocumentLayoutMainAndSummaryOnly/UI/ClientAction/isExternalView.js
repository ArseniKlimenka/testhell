module.exports = function isExternalView(input, ambientProperties) {

    return input.rootContext.ConfigurationCodeName != input.context.ConfigurationCodeName;
};
