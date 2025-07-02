const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text4UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 4);

};
