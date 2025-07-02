module.exports = function policyUrlMapping(input) {
    return `edit;entity=Contract;configurationCodeName=${input.context.Body.configurationCodeName};version=1;documentNumber=${input.context.Body.number}`;
};
