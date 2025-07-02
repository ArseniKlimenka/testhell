const { getValue, setValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

module.exports = function onChangeOrganisationalForm(input) {

    let organisationalForm = getValue(input, 'data.organisationalForm');
    if (organisationalForm && !organisationalForm.organisationalFormCode) {

        organisationalForm = {
            organisationalFormCode: '00000',
            organisationalFormDesc: organisationalForm
        };

        setValue(input, 'data.organisationalForm', organisationalForm);

        this.view.rebind();
    }
};
