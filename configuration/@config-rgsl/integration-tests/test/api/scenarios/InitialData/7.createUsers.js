const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const userExecutor = require('../lib/user/executor.js');
const password = 'ptkrf123#';

async function createUsers(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
        {
            templateName: 'Administrator',
            UserName: 'Administrator',
            UserGroups: [
                'actuary',
                'underwriting',
                'accounting',
                'investment',
                'compliance',
                'podft',
                'operations',
                'partnerSalesSupport',
                'products',
                'claimDirector',
                'operationsDirector',
                'claims',
                'security',
                'agentSalesSupport',
                'legal',
                'methodology',
                'UKSP',
                'salesPSB',
                'salesBFKO',
                'salesDemo',
                'salesAKCEPT',
                'salesAKBARS',
                'salesSMP',
                'administratorAAandAVR',
                'specialistAAandAVR',
                'methodologyDirector'
            ],
            UserRoles: [],
        },
        {
            templateName: 'Saler.PSB.MASS',
            UserName: 'Saler.PSB.MASS',
            UserGroups: ['salesPSB'],
            UserRoles: [
                'AccumulatedLifePSBMass',
                'InvestmentLifePSBMass'
            ],
        },
        {
            templateName: 'Saler.PSB.Afflyent',
            UserName: 'Saler.PSB.Afflyent',
            UserGroups: ['salesPSB'],
            UserRoles: [
                'AccumulatedLifePSBAffluent',
                'InvestmentLifePSBAffluent'
            ],
        },
        {
            templateName: 'OPERU',
            UserName: 'EmployeeOPERU',
            UserGroups: ['operations'],
            UserRoles: [],
        },
        {
            templateName: 'Underwriter',
            UserName: 'EmployeeUnderwriter',
            UserGroups: ['underwriting'],
            UserRoles: [],
        },
        {
            templateName: 'BFKOinitiator',
            UserName: 'BFKOinitiator',
            UserGroups: ['salesBFKO'],
            UserRoles: [
                'CreditLifeBFKOMass',
                'AccumulatedLifeBFKOMass',
                'InvestmentLifeBFKOMass'
            ],
        },
        {
            templateName: 'Saler.Demo',
            UserName: 'Saler.Demo',
            UserGroups: ['salesDemo'],
            UserRoles: [],
        },
        {
            templateName: 'AKCEPTinitiator',
            UserName: 'AKCEPTinitiator',
            UserGroups: ['salesAKCEPT'],
            UserRoles: [
                'AccumulatedLifeAKCEPTMass',
                'InvestmentLifeAKCEPTMass'
            ],
        },
        {
            templateName: 'AKBARSinitiator',
            UserName: 'AKBARSinitiator',
            UserGroups: ['salesAKBARS'],
            UserRoles: [
                'AccumulatedLifeAKBARSMass',
                'InvestmentLifeAKBARSMass'
            ],
        },
        {
            templateName: 'ZENITinitiator',
            UserName: 'ZENITinitiator',
            UserGroups: ['salesZENIT'],
            UserRoles: [
                'AccumulatedLifeZENITMass',
                'InvestmentLifeZENITMass'
            ],
        },
        {
            templateName: 'BFKOAUTOinitiator',
            UserName: 'BFKOAUTOinitiator',
            UserGroups: ['salesBFKOAuto'],
            UserRoles: [
                'CreditLifeBFKOAuto'
            ],
        },
        {
            templateName: 'PSBVIPinitiator',
            UserName: 'PSBVIPinitiator',
            UserGroups: ['salesPSBVIP'],
            UserRoles: [
                'InvestmentLifePSBVIP'
            ],
        },
        {
            templateName: 'OASinitiator',
            UserName: 'OASinitiator',
            UserGroups: ['salesOAS'],
            UserRoles: [
                'AccumulatedLifeOASMass',
                'InvestmentLifeOASMass',
                'MedLifeOASMass',
                'RisklifeOAS'
            ],
        },
        {
            templateName: 'MINBANKinitiator',
            UserName: 'MINBANKinitiator',
            UserGroups: ['salesMINBANK'],
            UserRoles: [
                'AccumulatedLifeMINBANK'
            ],
        },
        {
            templateName: 'SMPinitiator',
            UserName: 'SMPinitiator',
            UserGroups: ['salesSMP'],
            UserRoles: [
                'AccumulatedLifeSMPMass',
                'InvestmentLifeSMPMass'
            ],
        },
        {
            templateName: 'SOVKOMBANKinitiator',
            UserName: 'SOVKOMBANKinitiator',
            UserGroups: ['salesSOVKOMVIP'],
            UserRoles: [
                'InvestmentLifeBFKOVIP'
            ],
        },
        {
            templateName: 'ROSBANKinitiator',
            UserName: 'ROSBANKinitiator',
            UserGroups: ['salesROSBANKVIP'],
            UserRoles: [
                'InvestmentLifeBFKOVIP'
            ],
        },
        {
            templateName: 'REINVESTinitiator',
            UserName: 'REINVESTinitiator',
            UserGroups: ['salesREINVEST'],
            UserRoles: [
                'AccumulatedLifeREINVESTMass',
                'InvestmentLifeREINVESTMass'
            ],
        },
        {
            templateName: 'LIFEINVESTinitiator',
            UserName: 'LIFEINVESTinitiator',
            UserGroups: ['salesLIFEINVEST'],
            UserRoles: [
                'AccumulatedLifeLIFEINVESTMass',
                'InvestmentLifeLIFEINVESTMass'
            ],
        },
        {
            templateName: 'VTBinitiator',
            UserName: 'VTBinitiator',
            UserGroups: ['salesVTB'],
            UserRoles: [
                'AccumulatedLifeVTBPremium',
                'InvestmentLifeVTBPremium',
                'AccumulatedLifeVTBVIP',
                'InvestmentLifeVTBVIP',
                'EquityLifeVTBVIP',
                'RisklifeVTBVIP'
            ],
        },
        {
            templateName: 'VTBMASSinitiator',
            UserName: 'VTBMASSinitiator',
            UserGroups: ['salesVTB'],
            UserRoles: [
                'AccumulatedLifeVTBMass',
                'InvestmentLifeVTBMass'
            ],
        },
        {
            templateName: 'POCHTABANKinitiator',
            UserName: 'POCHTABANKinitiator',
            UserGroups: ['salesPB'],
            UserRoles: [
                'AccumulatedLifePBMass',
                'InvestmentLifePBMass'
            ],
        },
        {
            templateName: 'UBRRMASSinitiator',
            UserName: "UBRRMASSinitiator",
            UserGroups: ["salesUBRR"],
            UserRoles: [
                "AccumulatedLifeUBRRMass",
                "InvestmentLifeUBRRMass"
            ],
        }
    ];

    shuffle(templates);

    context.users = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];

        const naturalPerson = context.naturalPersons.find(obj => obj.template === template.templateName);
        const currentUser = {
            UserName: template.UserName,
            Password: password,
            Roles: template.UserRoles,
            Groups: template.UserGroups,
            Claims: [
                {
                    Type: 'PartyCode',
                    Value: naturalPerson.Code,
                },
                {
                    Type: 'DisplayName',
                    Value: naturalPerson.fullName,
                },
                {
                    Type: 'AccountType',
                    Value: 'Standard',
                },
                {
                    Type: 'Email',
                    Value: naturalPerson.naturalPersonBody.partyEmails?.[0]?.email,
                },
                {
                    Type: 'IsUserActive',
                    Value: 'true',
                },
                {
                    Type: 'ExpireDate',
                    Value: '2100-01-01',
                },
            ]
        };
        if (currentUser.UserName === 'Administrator') {
            await userExecutor.updateUser(currentUser);
            console.log(`User updated. UserName: ${currentUser.UserName}`);
        } else {
            const result = await userExecutor.createUser(currentUser);
            await userExecutor.updateUser(currentUser); // to set as manager in groups
            context.users.push({
                template: template.templateName,
                Id: result.userId,
            });
            console.log(`User created. UserName: ${currentUser.UserName}, Id: ${result.userId}`);
        }
    }
}

module.exports = {
    createUsers,
};
