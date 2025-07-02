const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text1UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 1);

};
