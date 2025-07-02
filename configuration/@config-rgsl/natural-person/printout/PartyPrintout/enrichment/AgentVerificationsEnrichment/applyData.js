'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { list } = require('@config-rgsl/life-insurance/lib/agentVerificationHelper');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    const entityCode = this.businessContext.entityCode;

    dataSourceResponse.data.forEach(_ => {
        _.resultData.isContains = _.resultData.partyCodes.split(",")?.includes(entityCode) ? 'ДА' : 'НЕТ';
    });

    const terroristsExtremists = dataSourceResponse.data.map(_ => _.resultData).filter(_ => _.listName === list.terrorist);
    const unitedNationsListPersons = dataSourceResponse.data.map(_ => _.resultData).filter(_ => _.listName === list.un);
    const MVKPersons = dataSourceResponse.data.map(_ => _.resultData).filter(_ => _.listName === list.mvk);
    const list272 = dataSourceResponse.data.map(_ => _.resultData).filter(_ => _.listName === list.fl272);
    const list281 = dataSourceResponse.data.map(_ => _.resultData).filter(_ => _.listName === list.fl281);

    terroristsExtremists.forEach(_ => {
        _.listDate = dateUtils.formatDate(_.listDate, dateUtils.DateFormats.CALENDAR);
        _.creationDate = dateUtils.formatDate(_.creationDate, dateUtils.DateFormats.CALENDAR);
    });
    input.terroristsExtremists = terroristsExtremists;

    unitedNationsListPersons.forEach(_ => {
        _.listDate = dateUtils.formatDate(_.listDate, dateUtils.DateFormats.CALENDAR);
        _.creationDate = dateUtils.formatDate(_.creationDate, dateUtils.DateFormats.CALENDAR);
    });
    input.unitedNationsListPersons = unitedNationsListPersons;

    MVKPersons.forEach(_ => {
        _.listDate = dateUtils.formatDate(_.listDate, dateUtils.DateFormats.CALENDAR);
        _.creationDate = dateUtils.formatDate(_.creationDate, dateUtils.DateFormats.CALENDAR);
    });
    input.MVKPersons = MVKPersons;

    list272.forEach(_ => {
        _.listDate = dateUtils.formatDate(_.listDate, dateUtils.DateFormats.CALENDAR);
        _.creationDate = dateUtils.formatDate(_.creationDate, dateUtils.DateFormats.CALENDAR);

    });
    input.list272 = list272;

    list281.forEach(_ => {
        _.listDate = dateUtils.formatDate(_.listDate, dateUtils.DateFormats.CALENDAR);
        _.creationDate = dateUtils.formatDate(_.creationDate, dateUtils.DateFormats.CALENDAR);
    });
    input.list281 = list281;
};
