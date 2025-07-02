const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const serviceProviderExecutor = require('../lib/serviceProvider/executor.js');

async function createEmployees(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
        {
            employeeTemplate: 'Administrator',
            organisationUnitTemplate: 'PSB'
        },
        {
            employeeTemplate: 'Saler.PSB.MASS',
            organisationUnitTemplate: 'PSB-VolgaBranch-DOPuoltavski'
        },
        {
            employeeTemplate: 'Saler.PSB.Afflyent',
            organisationUnitTemplate: 'PSB-VolgaBranch-DOPuoltavski'
        },
        {
            employeeTemplate: 'OPERU',
            organisationUnitTemplate: 'RGSL'
        },
        {
            employeeTemplate: 'Underwriter',
            organisationUnitTemplate: 'RGSL'
        },
        {
            employeeTemplate: 'BFKOinitiator',
            organisationUnitTemplate: 'BFKO'
        },
        {
            employeeTemplate: 'Saler.Demo',
            organisationUnitTemplate: 'DEMO'
        },
        {
            employeeTemplate: 'AKCEPTinitiator',
            organisationUnitTemplate: 'AKCEPT'
        },
        {
            employeeTemplate: 'AKBARSinitiator',
            organisationUnitTemplate: 'AKBARS'
        },
        {
            employeeTemplate: 'ZENITinitiator',
            organisationUnitTemplate: 'ZENIT'
        },
        {
            employeeTemplate: 'BFKOAUTOinitiator',
            organisationUnitTemplate: 'BFKOAUTO'
        },
        {
            employeeTemplate: 'PSBVIPinitiator',
            organisationUnitTemplate: 'PSBVIP'
        },
        {
            employeeTemplate: 'OASinitiator',
            organisationUnitTemplate: 'OAS'
        },
        {
            employeeTemplate: 'MINBANKinitiator',
            organisationUnitTemplate: 'MINBANK'
        },
        {
            employeeTemplate: 'SMPinitiator',
            organisationUnitTemplate: 'SMP'
        },
        {
            employeeTemplate: 'SOVKOMBANKinitiator',
            organisationUnitTemplate: 'SOVKOMBANK'
        },
        {
            employeeTemplate: 'ROSBANKinitiator',
            organisationUnitTemplate: 'ROSBANK'
        },
        {
            employeeTemplate: 'REINVESTinitiator',
            organisationUnitTemplate: 'REINVEST'
        },
        {
            employeeTemplate: 'LIFEINVESTinitiator',
            organisationUnitTemplate: 'LIFEINVEST'
        },
        {
            employeeTemplate: 'VTBinitiator',
            organisationUnitTemplate: 'VTB'
        },
        {
            employeeTemplate: 'VTBMASSinitiator',
            organisationUnitTemplate: 'VTBMASS'
        },
        {
            employeeTemplate: 'POCHTABANKinitiator',
            organisationUnitTemplate: 'POCHTABANK'
        },
        {
            employeeTemplate: 'UBRRMASSinitiator',
            organisationUnitTemplate: 'UBRRMASS'
        },
    ];

    shuffle(templates);

    context.employees = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];

        const naturalPerson = context.naturalPersons.find(obj => obj.template === template.employeeTemplate);
        const organisationUnit = context.organisationUnits.find(obj => obj.template === template.organisationUnitTemplate);

        const request = stepContext.requests[template.employeeTemplate];
        request.body.employeeParty.partyData.partyBody = naturalPerson.naturalPersonBody;
        request.body.employeeParty.partyData.partyId = naturalPerson.Id;
        request.body.employeeParty.partyData.partyCode = naturalPerson.Code;
        request.body.employeeParty.partyData.partyType = 'NaturalPerson';
        request.body.employeeParty.partyData.partyFullName = naturalPerson.fullName;
        request.body.orgUnitName = organisationUnit.name;
        request.body.orgUnitCode = organisationUnit.Code;
        const result = await serviceProviderExecutor.createEmployee(request, stepContext.actor);
        context.employees.push({
            template: template.employeeTemplate,
            Number: result.code,
            Id: result.id,
        });
        console.log("Employee created: " + JSON.stringify({
            template: template.employeeTemplate,
            Number: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createEmployees,
};
