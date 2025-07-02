const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text5UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 5);

};
