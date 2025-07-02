const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text6UrlMapping(input, ambientProperties) {

    return getItemUrl(ambientProperties, 6);

};
