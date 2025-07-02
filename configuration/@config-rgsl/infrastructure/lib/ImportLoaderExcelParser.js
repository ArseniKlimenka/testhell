'use strict';

const DateTimeUtils = require("@config-rgsl/infrastructure/lib/DateTimeUtils");

module.exports = {

    parsePercentage: function (sPercentage) {
        let result;

        if (sPercentage.includes("%")) {
            let sPercentageWithoutPercentSign = sPercentage.substring(0, sPercentage.length - 1);
            sPercentageWithoutPercentSign = sPercentageWithoutPercentSign.replace(",", ".");
            result = Number(sPercentageWithoutPercentSign) / 100;
        } else {
            result = Number(sPercentage);
        }

        return result;
    },

    parseDate: function (sDate) {
        let oDate;
        if (typeof sDate === "string" || sDate instanceof String) {
            let parts;
            if (/^(0?[1-9]|[12]\d{1}|3[01])\.(0?[1-9]|1[012])\.\d{2,4}$/.test(sDate)) {
                parts = sDate.split(".");
                oDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
            }
            else if (/^\d{2,4}-(0?[1-9]|1[012])-([12]\d{1}|3[01]|0?[1-9])$/.test(sDate)) {
                parts = sDate.split("-");
                oDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
            }
            else if (/^\d+$/.test(sDate)) {
                oDate = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), sDate - 2);
            }
            else if (/^\d+[.,]\d+$/.test(sDate)) {
                // Support for different decimal separators
                sDate = sDate.replace(",", ".");
                // Trunc is made to ignore the time part
                oDate = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), Math.trunc(sDate) - 2);
            } else if (sDate === "") {
                return undefined;
            }
            else {
                throw `Unknown date format ${sDate}`;
            }
            return DateTimeUtils.formatDate(oDate);
        }
        else if (typeof sDate === "number") {
            // Trunc is made to ignore the time part
            oDate = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), Math.trunc(sDate) - 2);
            return DateTimeUtils.formatDate(oDate);
        }

        return sDate;

    },

    parseGender: function (value) {
        if (!value) { return; }

        let gender;

        value = this.trim(value);

        // check for English and Russian characters
        if (['М', 'МУЖСКОЙ', 'M', 'Male'].includes(value.toUpperCase()))
        { gender = 'Male'; }
        else if (['Ж', 'ЖЕНСКИЙ', 'F', 'Female'].includes(value.toUpperCase()))
        { gender = "Female"; }

        return gender;
    },

    trim: function (str) {
        if (!str) {
            return;
        }

        if (typeof str === "string" || str instanceof String) {
            return str.trim();
        }

        throw `Value ${str} has invalid type ${typeof str}`;
    },

    parseNumber: function (value) {
        if (!value) { return undefined; }

        return Number(value);
    },

    trimAndRemoveSpaces: function (str) {
        if (!str) {
            return;
        }

        str = this.trim(str);

        return str.replace(" ", "");
    },

    emptyToString: function (element) {
        return element ? element : '';
    },

    parseRussianToBoolean: function (value) {
        if (!value) { return undefined; }
        return value == 'Да';
    }

};
