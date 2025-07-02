module.exports = function policyHolderUrlMapping(input) {
    return `edit;entity=Party;configurationCodeName=NaturalPerson;version=1;code=${input.context.Body.policyHolderCode}`;
};
