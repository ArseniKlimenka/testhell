const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text5Visibility(input, ambientProperties) {

    return Boolean(getItemUrl(ambientProperties, 5));

};
