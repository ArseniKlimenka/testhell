'use strict';

const {
    getPartnerByOrgUnitId,
    getSubOrgUnitsByPartnerCode
} = require('@config-rgsl/infrastructure/lib/orgUnitHelper');

module.exports = function applyData(input, dataSourceResponse) {

    const parentCode = input.parentCode;
    const currentOrgUnitCode = input.orgUnitCode;
    const code = input.code;
    const orgUnitsAll = dataSourceResponse.data.map(i => i.resultData) ?? [];
    const orgUnitsByCode = orgUnitsAll.filter(org => org.officeCode == code);
    let partnerCode = input.partnerCode;
    let isCodeInAnotherOrgUnit = false;
    let orgUnitName = "";

    if (parentCode) {

        const orgUnitByParentCode = orgUnitsAll.filter(p => p.orgUnitCode == parentCode)[0];
        const orgUnitId = orgUnitByParentCode?.orgUnitId;
        const partnerCodeFromOrgUnit = orgUnitByParentCode?.partnerCode;
        const orgUnitParentId = orgUnitByParentCode?.parentId;

        if (partnerCodeFromOrgUnit) {
            partnerCode = partnerCodeFromOrgUnit;
        }

        if (orgUnitId && !partnerCodeFromOrgUnit) {
            const orgUnitByParentId = getPartnerByOrgUnitId(orgUnitsAll, orgUnitId);
            partnerCode = orgUnitByParentId?.partnerCode;
        }
    }

    if (partnerCode) {

        const allOrgUnitsByPartnerCode = getSubOrgUnitsByPartnerCode(orgUnitsAll, partnerCode, []);
        const allOrgUnitsByPartnerCodeFiltered = allOrgUnitsByPartnerCode.filter(org => org.officeCode == code);
        const allOrgUnitsByPartnerCodeExceptCurrent = allOrgUnitsByPartnerCodeFiltered.filter(org => org.orgUnitCode != currentOrgUnitCode);
        isCodeInAnotherOrgUnit = allOrgUnitsByPartnerCodeExceptCurrent.length > 0;
        orgUnitName = allOrgUnitsByPartnerCodeExceptCurrent.map(org => org.orgUnitName).join(', ');
    }

    if (isCodeInAnotherOrgUnit) {

        throw new Error(`ДО (${orgUnitName}) с кодом ${code} уже существует в орг. структуре партнера! Код партнёра ${partnerCode}.`);
    }

};
