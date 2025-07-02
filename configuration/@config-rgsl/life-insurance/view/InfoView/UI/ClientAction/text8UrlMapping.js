const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text8UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 8);

};
