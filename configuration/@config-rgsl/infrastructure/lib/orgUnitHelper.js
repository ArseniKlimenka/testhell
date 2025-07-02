'use strict';

function getPartnerByOrgUnitId(orgUnits, orgUnitId) {

    const parentId = orgUnits.filter(p => p.orgUnitId == orgUnitId)[0]?.parentId;
    const orgUnitByParentId = orgUnits.filter(p => p.orgUnitId == parentId)[0];
    const partnerCode = orgUnitByParentId?.partnerCode;

    if (partnerCode) {
        return orgUnitByParentId;
    }

    return getPartnerByOrgUnitId(orgUnits, parentId);
}

function getSubOrgUnitsByPartnerCode(orgUnits, partnerCode, allOrgUnitsByPartnerCode) {

    const orgUnitId = orgUnits.filter(p => p.partnerCode == partnerCode)[0]?.orgUnitId;

    if (orgUnitId) {

        const orgUnitChildren = orgUnits.filter(p => p.parentId == orgUnitId || (!p.parentId && p.partnerCode == partnerCode));
        const orgUnitChildrenIds = orgUnitChildren.map(org => org.orgUnitId);
        allOrgUnitsByPartnerCode.push(...orgUnitChildren);

        getSubOrgUnitsByParentIds(orgUnits, orgUnitChildrenIds, allOrgUnitsByPartnerCode);
    }

    return [...new Set(allOrgUnitsByPartnerCode)];
}

function getSubOrgUnitsByParentIds(orgUnits, orgUnitChildrenIds, allOrgUnitsByPartnerCode) {

    const orgUnitSubChildren = orgUnits.filter(org => orgUnitChildrenIds.includes(org.parentId));
    const orgUnitSubChildrenIds = orgUnitSubChildren.map(org => org.orgUnitId);
    allOrgUnitsByPartnerCode.push(...orgUnitSubChildren);

    if (orgUnitSubChildrenIds.length == 0) {
        return;
    }

    getSubOrgUnitsByParentIds(orgUnits, orgUnitSubChildrenIds, allOrgUnitsByPartnerCode);
}

module.exports = {
    getPartnerByOrgUnitId,
    getSubOrgUnitsByPartnerCode,
    getSubOrgUnitsByParentIds
};
