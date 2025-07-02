const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text2UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 2);

};
