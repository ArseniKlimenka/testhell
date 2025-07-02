const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showDefaultComment(input) {

    const dataProperty = input.dataProperty;
    const commentPath = 'data.' + dataProperty;
    const attributeName = dataProperty.substring(0, dataProperty.length - 7);
    const attributePath = 'data.' + attributeName;
    const attributeValue = getValue(input, attributePath);

    if (attributeValue) {
        return true;
    }

    setValue(input, commentPath, undefined);
    return false;


};
