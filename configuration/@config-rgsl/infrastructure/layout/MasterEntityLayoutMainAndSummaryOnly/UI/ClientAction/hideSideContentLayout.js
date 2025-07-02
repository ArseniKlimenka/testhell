module.exports = function hideSideContentLayout(input, ambientProperties) {
    return input.rootContext.ConfigurationCodeName != input.context.ConfigurationCodeName;
};
