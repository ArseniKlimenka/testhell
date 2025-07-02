module.exports = function insuredPersonUrlMapping(input) {
    return `edit;entity=Party;configurationCodeName=NaturalPerson;version=1;code=${input.context.Body.insuredPersonCode}`;
};
