const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text7UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 7);

};
