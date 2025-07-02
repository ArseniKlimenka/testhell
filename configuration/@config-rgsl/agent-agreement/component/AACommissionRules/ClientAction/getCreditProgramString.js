'use strict';

module.exports = function getCreditProgramString(input) {

    const programs = input.refData?.values ?? [];

    if (programs.length > 0) {

        const programsInfo = input.rootContext.ClientViewModel.creditProgramList ?? [];
        const formatedPrograms = programs.map(p => {

            const programInfo = programsInfo.find(i => i.identifier === p.code);
            const version = programInfo?.additionalData?.creditProgramVersion;
            const versionString = version ? `(${version})` : '';

            return `${p.description} ${versionString}`;
        });

        return formatedPrograms.join(', ');
    }
};
