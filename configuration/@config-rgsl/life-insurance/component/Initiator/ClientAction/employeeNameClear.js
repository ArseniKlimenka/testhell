'use strict';

module.exports = function employeeNameClear(input) {

    Object.keys(input.componentContext).forEach(key => delete input.componentContext[key]);

    this.rebindComponent();

};
