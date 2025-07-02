const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text2Visibility(input, ambientProperties) {

    return Boolean(getItemUrl(ambientProperties, 2));

};
