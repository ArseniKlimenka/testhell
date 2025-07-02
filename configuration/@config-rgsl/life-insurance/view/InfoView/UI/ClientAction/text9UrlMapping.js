const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text9UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 9);

};
