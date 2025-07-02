'use strict';

module.exports = function beneficiariesOnAfterGridAction(input, ambientProperties) {

    const beneficiaries = input.componentContext;

    beneficiaries.sort((a, b) => ((a.risk?.code?.toLowerCase() ?? 'none') > (b.risk?.code?.toLowerCase() ?? 'none')) ? -1 :
        (((b.risk?.code?.toLowerCase() ?? 'none') < (a.risk?.code?.toLowerCase() ?? 'none')) ? 1 : 0));

    this.rebindComponent();
};
