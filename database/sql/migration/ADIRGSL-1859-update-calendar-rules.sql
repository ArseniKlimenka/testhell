DECLARE @workCalendarCode INT;
DECLARE @createdBy NVARCHAR(max);
DECLARE @entityTypeID NVARCHAR(max);
DECLARE @publishedArtifactId NVARCHAR(max);
DECLARE @recentDocumentId NVARCHAR(max);
DECLARE @workCalendarId NVARCHAR(max);
DECLARE @calendarRules NVARCHAR(max);
DECLARE @sysClientID NVARCHAR(max);
DECLARE @sysVersion INT;
DECLARE @summary NVARCHAR(max);

SET @workCalendarCode = 1;
SET @createdBy = (SELECT APPLICATION_USER_ID FROM ORG.APPLICATION_USER WHERE USERNAME = 'Administrator');
SET @entityTypeID = (SELECT ENTITY_TYPE_ID FROM CFG.ENTITY_TYPE WHERE CODE_NAME = 'WorkCalendar');
SET @publishedArtifactId = (SELECT PUBLISHED_ARTIFACT_ID FROM CFX.PUBLISHED_ARTIFACT where CODE_NAME = 'WorkCalendar');
SET @recentDocumentId = (SELECT NEWID());
SET @workCalendarId = (SELECT NEWID());
SET @sysClientID = 'web-client-vnext';
SET @sysVersion = 1;

SET @summary = N'{
	"entityType": "WorkCalendar",
	"businessNumber": "' + CONVERT(nvarchar(max), @workCalendarCode) + '",
	"configuration": {
		"name": "WorkCalendar",
		"configurationVersion": "1",
		"moduleName": "Organisation"
	}
}';

SET @calendarRules = N'{
    "rules": [
        {
            "ruleLevel": "general",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "monday"
            },
            "isWork": true,
            "description": "Понедельник (Рабочий)"
        },
        {
            "ruleLevel": "general",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "tuesday"
            },
			"isWork": true,
            "description": "Вторник (Рабочий)"
        },
        {
            "ruleLevel": "general",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "wednesday"
            },
			"isWork": true,
            "description": "Среда (Рабочий)"
        },
        {
            "ruleLevel": "general",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "thursday"
            },
			"isWork": true,
            "description": "Четверг (Рабочий)"
        },
        {
            "ruleLevel": "general",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "friday"
            },
			"isWork": true,
            "description": "Пятница (Рабочий)"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-02-20",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "День защитника Отечества (Рабочий) 2016 год",
            "dateTo": "2016-02-20"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-04-28",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "Праздник Весны и Труда (Рабочий) 2018 год",
            "dateTo": "2018-04-28"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-06-09",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "День России (Рабочий) 2018 год",
            "dateTo": "2018-06-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-12-29",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "Новогодние каникулы (Рабочий) 2018 год",
            "dateTo": "2018-12-29"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-02-20",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "День защитника Отечества (Рабочий) 2021 год",
            "dateTo": "2021-02-20"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-03-05",
            "repetition": {
                "pattern": "daily"
            },
			"isWork": true,
            "description": "Международный женский день (Рабочий) 2022 год",
            "dateTo": "2022-03-05"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) до 2016 года",
            "dateTo": "2015-12-31"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2016 год - 1",
            "dateTo": "2016-02-19"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-02-21",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2016 год - 2",
            "dateTo": "2016-12-31"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2017 год",
            "dateTo": "2017-12-31"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2018 год - 1",
            "dateTo": "2018-04-27"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-04-29",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2018 год - 2",
            "dateTo": "2018-06-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-06-10",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2018 год - 3",
            "dateTo": "2018-12-28"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2019 - 2021",
            "dateTo": "2021-12-31"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2022 год - 1",
            "dateTo": "2022-03-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-03-06",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) 2022 год - 2",
            "dateTo": "2022-12-31"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "saturday"
            },
            "description": "Суббота (Выходной) с 2023 года"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2000-01-01",
            "repetition": {
                "pattern": "weekly",
                "dayOfWeek": "sunday"
            },
            "description": "Воскресенье (Выходной)"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2014 год",
            "dateTo": "2014-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2014 год",
            "dateTo": "2014-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2014 год",
            "dateTo": "2014-03-10"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2014 год",
            "dateTo": "2014-05-02"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2014 год",
            "dateTo": "2014-05-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2014 год",
            "dateTo": "2014-06-13"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2014-11-03",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2014 год",
            "dateTo": "2014-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2015 год",
            "dateTo": "2015-01-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2015 год",
            "dateTo": "2015-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2015 год",
            "dateTo": "2015-03-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2015 год",
            "dateTo": "2015-05-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2015 год",
            "dateTo": "2015-05-11"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2015 год",
            "dateTo": "2015-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2015-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2015 год",
            "dateTo": "2015-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2016 год",
            "dateTo": "2016-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-02-22",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2016 год",
            "dateTo": "2016-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-03-07",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2016 год",
            "dateTo": "2016-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-05-02",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2016 год",
            "dateTo": "2016-05-03"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2016 год",
            "dateTo": "2016-05-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-06-13",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2016 год",
            "dateTo": "2016-06-13"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2016-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2016 год",
            "dateTo": "2016-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2017 год",
            "dateTo": "2017-01-06"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2017 год",
            "dateTo": "2017-02-24"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2017 год",
            "dateTo": "2017-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2017 год",
            "dateTo": "2017-05-01"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-05-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2017 год",
            "dateTo": "2017-05-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2017 год",
            "dateTo": "2017-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2017-11-06",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2017 год",
            "dateTo": "2017-11-06"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2018 год",
            "dateTo": "2018-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2018 год",
            "dateTo": "2018-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2018 год",
            "dateTo": "2018-03-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-04-30",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2018 год",
            "dateTo": "2018-05-02"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2018 год",
            "dateTo": "2018-05-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-06-11",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2018 год",
            "dateTo": "2018-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2018-11-05",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2018 год",
            "dateTo": "2018-11-05"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2019 год",
            "dateTo": "2019-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2019 год",
            "dateTo": "2019-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2019 год",
            "dateTo": "2019-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2019 год",
            "dateTo": "2019-05-03"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2019 год",
            "dateTo": "2019-05-10"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2019 год",
            "dateTo": "2019-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2019-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2019 год",
            "dateTo": "2019-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2020 год",
            "dateTo": "2020-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-02-24",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2020 год",
            "dateTo": "2020-02-24"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-03-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2020 год",
            "dateTo": "2020-03-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2020 год",
            "dateTo": "2020-05-05"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-05-11",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2020 год",
            "dateTo": "2020-05-11"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2020 год",
            "dateTo": "2020-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2020-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2020 год",
            "dateTo": "2020-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-01-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2021 год",
            "dateTo": "2021-01-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-02-22",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2021 год",
            "dateTo": "2021-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2021 год",
            "dateTo": "2021-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-05-03",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2021 год",
            "dateTo": "2021-05-03"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-05-10",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2021 год",
            "dateTo": "2021-05-10"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-06-14",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2021 год",
            "dateTo": "2021-06-14"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2021-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2021 год",
            "dateTo": "2021-11-05"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-01-03",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2022 год",
            "dateTo": "2022-01-07"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2022 год",
            "dateTo": "2022-02-23"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-03-07",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2022 год",
            "dateTo": "2022-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-05-02",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2022 год",
            "dateTo": "2022-05-03"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-05-09",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2022 год",
            "dateTo": "2022-05-10"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-06-13",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2022 год",
            "dateTo": "2022-06-13"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2022-11-04",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2022 год",
            "dateTo": "2022-11-04"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-01-02",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Новогодние каникулы (Выходные) 2023 год",
            "dateTo": "2023-01-06"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-02-23",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День защитника Отечества (Выходной) 2023 год",
            "dateTo": "2023-02-24"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-03-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Международный женский день (Выходные) 2023 год",
            "dateTo": "2023-03-08"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-05-01",
            "repetition": {
                "pattern": "daily"
            },
            "description": "Праздник Весны и Труда (Выходные) 2023 год",
            "dateTo": "2023-05-01"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-05-08",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День Победы (Выходные) 2023 год",
            "dateTo": "2023-05-09"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-06-12",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День России (Выходной) 2023 год",
            "dateTo": "2023-06-12"
        },
        {
            "ruleLevel": "exception",
            "dateFrom": "2023-11-06",
            "repetition": {
                "pattern": "daily"
            },
            "description": "День народного единства (Выходной) 2023 год",
            "dateTo": "2023-11-06"
        },
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-01-01",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Новогодние каникулы (Выходные) 2024 год",
			"dateTo": "2024-01-08"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-02-23",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День защитника Отечества (Выходной) 2024 год",
			"dateTo": "2024-02-23"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-03-08",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Международный женский день (Выходные) 2024 год",
			"dateTo": "2024-03-08"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-04-29",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Праздник Весны и Труда (Выходные) 2024 год",
			"dateTo": "2024-05-01"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-04-27",
			"repetition": {
				"pattern": "daily"
			},
			"isWork": true,
			"description": "Праздник Весны и Труда (Рабочий) 2024 год",
			"dateTo": "2024-04-27"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-05-09",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День Победы (Выходные) 2024 год",
			"dateTo": "2024-05-10"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-06-12",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День России (Выходной) 2024 год",
			"dateTo": "2024-06-12"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-11-04",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День народного единства (Выходной) 2024 год",
			"dateTo": "2024-11-04"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-11-02",
			"repetition": {
				"pattern": "daily"
			},
			"isWork": true,
			"description": "День народного единства (Рабочий) 2024 год",
			"dateTo": "2024-11-02"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-12-30",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Новогодние каникулы (Выходные) 2024 год",
			"dateTo": "2024-12-31"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-12-28",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Новогодние каникулы (Рабочий) 2024 год",
			"dateTo": "2024-12-28",
			"isWork": true,
			"capacity": 8
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-04-27",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Суббота (Рабочий) 27.04.2024",
			"isWork": true,
			"capacity": 8,
			"dateTo": "2024-04-27"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-11-02",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Суббота (Рабочий) 02.11.2024",
			"dateTo": "2024-11-02",
			"isWork": true,
			"capacity": 8
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2024-12-28",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Суббота (Рабочий) 28.12.2024",
			"dateTo": "2024-12-28",
			"isWork": true,
			"capacity": 8
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-01-01",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Новогодние каникулы (Выходные) 2025 год",
			"dateTo": "2025-01-08"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-05-01",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Праздник Весны и Труда (Выходные) 2025 год",
			"dateTo": "2025-05-02"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-05-08",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День Победы (Выходные) 2025 год",
			"dateTo": "2025-05-09"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-06-12",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День России (Выходной) 2025 год",
			"dateTo": "2025-06-13"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-11-01",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День народного единства (Рабочий) 2025 год",
			"dateTo": "2025-11-01",
			"isWork": true,
			"capacity": 8
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-11-03",
			"repetition": {
				"pattern": "daily"
			},
			"description": "День народного единства (Выходной) 2025 год",
			"dateTo": "2025-11-04"
		},
		{
			"ruleLevel": "exception",
			"dateFrom": "2025-12-31",
			"repetition": {
				"pattern": "daily"
			},
			"description": "Новогодние каникулы (Выходные) 2025 год",
			"dateTo": "2025-12-31"
		}
    ],
    "name": "Рабочие дни",
    "timeZone": "MSK"
}';

INSERT INTO BFX.ENTITY_REF (ENTITY_REF_ID, ENTITY_ID, ENTITY_TYPE_ID, PUBLISHED_ARTIFACT_ID, BUSINESS_KEY, SUMMARY, PARENT_ID, TERMINATED, SOURCE_ID, OWNER, ORGANISATION_UNIT_CODE)
values (
	@workCalendarId,
    @workCalendarId,
	@entityTypeID,
    @publishedArtifactId,
    @workCalendarCode,
	@summary,
	NULL,
	0,
	NULL,
	NULL,
	NULL
);

INSERT INTO BFX.RECENT_DOCUMENT (RECENT_DOCUMENT_ID, ENTITY_REF_ID, URL, SYS_CREATED_ON, SYS_UPDATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
values (
	@recentDocumentId,
    @workCalendarId,
	CONCAT('/edit;entity=WorkCalendar;configurationCodeName=WorkCalendar;code=', @workCalendarCode),
    GETDATE(),
    GETDATE(),
	@createdBy,
	@createdBy,
	@sysClientID,
	@sysVersion
);

INSERT INTO ORG.WORK_CALENDAR (WORK_CALENDAR_ID, WORK_CALENDAR_CODE, PARENT_ID, BODY, COMMON_BODY, APPLICATION_USER_ID, PUBLISHED_ARTIFACT_ID, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
values (
	@workCalendarId,
    @workCalendarCode,
	NULL,
    @calendarRules,
    @calendarRules,
	NULL,
	@publishedArtifactId,
	GETDATE(),
	@createdBy,
	GETDATE(),
	@createdBy,
	@sysClientID,
	@sysVersion
);
