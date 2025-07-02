'use strict';

module.exports = function organisationUnitMapping({
    code,
    parentCode,
    body,
    commonBody
}) {

    const organisation = {};

    organisation['ORG_IMPL.ORGANISATION_UNIT_HUB'] = [
        {
            ORGANISATION_UNIT_CODE: code
        }
    ];

    organisation['ORG_IMPL.ORGANISATION_UNIT_INFO_SAT'] = [
        {
            ORGANISATION_UNIT_CODE: code,
            NAME: body.name ? body.name : null,
            FULL_NAME: body.fullName ? body.fullName : null,
            CODE: body.code ? body.code : null,
            PARTNER_CODE: body.partnerCode ? body.partnerCode : null,
            COACH_CODE: (body.coach && body.coach.employeeCode) ? body.coach.employeeCode : null,
            TERRITORIAL_CHIEF_CODE: (body.territorialChief && body.territorialChief.employeeCode) ? body.territorialChief.employeeCode : null,
            REGIONAL_CHIEF_CODE: (body.regionalChief && body.regionalChief.employeeCode) ? body.regionalChief.employeeCode : null
        }
    ];

    if (parentCode) {
        organisation['ORG_IMPL.ORGANISATION_LINK'] = [
            {
                PARENT: parentCode,
                CHILD: code
            }
        ];
    }

    return organisation;

};
