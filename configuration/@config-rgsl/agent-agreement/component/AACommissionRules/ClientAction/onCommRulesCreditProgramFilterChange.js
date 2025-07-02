'use strict';

module.exports = function onCommRulesCreditProgramFilterChange(input) {

    const filterString = input.filterObj.creditProgram;

    if (!filterString || filterString.length === 0) {

        return true;
    }

    const currentPrograms = input.data?.creditProgram?.values ?? [];

    if (currentPrograms.length === 0) {

        return false;
    }

    const programsInfo = input.rootContext.ClientViewModel.creditProgramList ?? [];
    const formatedPrograms = currentPrograms.map(p => {

        const programInfo = programsInfo.find(i => i.identifier === p.code);
        const version = programInfo?.additionalData?.creditProgramVersion;
        const versionString = version ? `(${version})` : '';
        return `${p.description} ${versionString}`;
    });

    const programsString = formatedPrograms.join(' ').toUpperCase();

    if (programsString.indexOf(filterString.toUpperCase()) >= 0) {

        return true;
    }


    return false;

};
