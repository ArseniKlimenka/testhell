'use strict';

module.exports = function employeeOnLoad(input) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().setProtectedFields(['serviceProviderType']);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                serviceProviderType: "Employee"
            }
        }
    });

    this.getLookup().search();

};
