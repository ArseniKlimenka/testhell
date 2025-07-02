const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text1Visibility(input, ambientProperties) {

    return Boolean(getItemUrl(ambientProperties, 1));

};
