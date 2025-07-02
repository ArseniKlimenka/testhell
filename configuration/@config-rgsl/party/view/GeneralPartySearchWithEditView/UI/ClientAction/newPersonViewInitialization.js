const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function newPersonViewInitialization(input) {
    input.data.selection = []; // clear selection before creating new person

    const configurationCodeName = this.getCurrentView().getContext().ConfigurationCodeName;
    const participantType = input.context.viewContext.participantType;
    const paymentFrequencyCode = input.context.viewContext.paymentFrequencyCode;
    const body = this.getCurrentView().getContext().Body;

    if (configurationCodeName == partyConstants.viewType.NaturalPerson) {

        const lastName = beautifyName(input.context.request.data.criteria.lastName);
        const firstName = beautifyName(input.context.request.data.criteria.firstName);
        const middleName = beautifyName(input.context.request.data.criteria.middleName);

        const bodyTemplate = structuredClone(partyConstants.naturalPersonDefaultValue);
        Object.assign(body.data, bodyTemplate);
        body.data.partyPersonData.lastName = lastName;
        body.data.partyPersonData.firstName = firstName;
        body.data.partyPersonData.middleName = middleName;
        body.data.partyPersonData.personGender = input.context.request.data.criteria.personGender;
        body.data.partyPersonData.dateOfBirth = input.context.request.data.criteria.dateOfBirth;
        body.data.partyRoleOfPerson = participantType ? { partyRole: '/' + participantType } : {};
        body.data.partyRoleOfPerson.paymentFrequencyCode = paymentFrequencyCode;
    }

    if (configurationCodeName == partyConstants.viewType.LegalEntity) {
        const bodyTemplate = structuredClone(partyConstants.legalEntityDefaultValue);
        Object.assign(body.data, bodyTemplate);
    }

    this.hideButtons();
    this.getViews()[1].hideButton();
    this.getViews()[2].hideButton();

    this.getCurrentView().rebind();
    this.getCurrentView().validate();
    this.getCurrentView().reevaluateRules();


    function beautifyName(name) {
        if (!name) { return; }
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

};
