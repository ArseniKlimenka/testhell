const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text7Visibility(input, ambientProperties) {

    return Boolean(getItemUrl(ambientProperties, 7));

};
