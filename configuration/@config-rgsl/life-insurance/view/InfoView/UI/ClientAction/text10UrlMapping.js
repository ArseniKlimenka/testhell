const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text10UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 10);

};
