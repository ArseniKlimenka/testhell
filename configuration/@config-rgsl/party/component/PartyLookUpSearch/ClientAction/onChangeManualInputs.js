const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onChangeManualInputs(input, ambientProperties) {

    // init properties
    const policyHolder = input.context.Body.policyHolder;
    policyHolder.partyData = policyHolder.partyData || {};
    policyHolder.partyData.partyBody = policyHolder.partyData.partyBody || {};
    policyHolder.partyData.partyBody.partyPersonData = policyHolder.partyData.partyBody.partyPersonData || {};

    const insuredPerson = input.context.Body.insuredPerson;
    insuredPerson.partyData = insuredPerson.partyData || {};
    insuredPerson.partyData.partyBody = insuredPerson.partyData.partyBody || {};
    insuredPerson.partyData.partyBody.partyPersonData = insuredPerson.partyData.partyBody.partyPersonData || {};

    const componentContext = input.componentContext;
    componentContext.partyBody = componentContext.partyBody || {};
    componentContext.partyBody.partyPersonData = componentContext.partyBody.partyPersonData || {};

    // set values
    const dateOfBirthManual = input.componentContext.dateOfBirth;
    const personGenderManual = input.componentContext.personGender;

    setValue(input, 'componentContext.partyBody.partyPersonData.dateOfBirth', dateOfBirthManual);
    setValue(input, 'componentContext.partyBody.partyPersonData.personGender', personGenderManual);

    const isPolicyHolder = getValue(input, 'context.Body.insuredPerson.isPolicyHolder');
    if (isPolicyHolder) {
        setValue(input, 'context.Body.policyHolder.partyData.partyBody.partyPersonData.dateOfBirth', dateOfBirthManual);
        setValue(input, 'context.Body.policyHolder.partyData.partyBody.partyPersonData.personGender', personGenderManual);
        setValue(input, 'context.Body.policyHolder.partyData.dateOfBirth', dateOfBirthManual);
        setValue(input, 'context.Body.policyHolder.partyData.personGender', personGenderManual);
        setValue(input, 'context.Body.insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth', dateOfBirthManual);
        setValue(input, 'context.Body.insuredPerson.partyData.partyBody.partyPersonData.personGender', personGenderManual);
        setValue(input, 'context.Body.insuredPerson.partyData.dateOfBirth', dateOfBirthManual);
        setValue(input, 'context.Body.insuredPerson.partyData.personGender', personGenderManual);
    }

    this.view.validate();
    this.view.reevaluateRules();

};
