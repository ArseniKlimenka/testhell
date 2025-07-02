const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text3UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 3);

};
