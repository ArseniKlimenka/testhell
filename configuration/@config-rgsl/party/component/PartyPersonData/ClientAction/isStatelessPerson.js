module.exports = function isStatelessPerson(input, ambientProperties) {

    const isStatelessPerson = input.data.isStatelessPerson;

    if (isStatelessPerson == true) {

        input.data.citizenship = undefined;

    }

    this.view.reevaluateRules();
    this.view.validate();

};
