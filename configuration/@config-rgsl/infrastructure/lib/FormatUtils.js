module.exports = {

    formatDateTimeToString: function (sourceDateTime) {

        if (!sourceDateTime) {
            return undefined;
        }

        const mapped = new Date(sourceDateTime);
        let days = mapped.getDate();
        let months = mapped.getMonth() + 1;
        const years = mapped.getFullYear();
        if (days < 10) {
            days = '0' + days;
        }
        if (months < 10) {
            months = '0' + months;
        }
        return days + '.' + months + '.' + years;
    },

    dateToStringDocumentationFormat: function (date, format = '«dd» month year') {
        if (!date) {
            return undefined;
        }

        const mapped = new Date(date);
        const day = mapped.getDate().toString().padStart(2, '0');
        const month = mapped.getMonth();
        const year = mapped.getFullYear();

        const monthTranslations = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        return format.replace('dd', day).replace('month', monthTranslations[month]).replace('year', year);
    },

    formatNumberToMoney: function (number, currency, decimalSpaces, decimalSeparator, digitSeparator, emprtyDigitSeparator) {
        const c = decimalSpaces ? decimalSpaces : 2,
            d = decimalSeparator ? decimalSeparator : ",",
            t = digitSeparator ? digitSeparator : emprtyDigitSeparator ? "" : " ";
        const s = number < 0 ? "-" : "";
        const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(c)));
        let j = i.length;
        j = j > 3 ? j % 3 : 0;

        switch (currency) {
            case 'RUB':
                currency = ' руб.';
                break;
            case 'USD':
                currency = ' долл.США';
                break;
            case 'EUR':
                currency = ' евро';
                break;
            default:
                currency = '';
                break;
        }

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(number - i).toFixed(c).slice(2) + currency : "");
    },

    formatFloatingSeparator: function (n, ord) {
        if (ord) {
            return n.toFixed(ord).replace('.', ',');
        }
        return n.toString().replace('.', ',');
    },

    changeEmptyValueToNull(value, changeFrom = '', changeTo = null) {
        return changeValue(value, changeFrom, changeTo);
    },

    formatMoneyToNumber: function (str) {
        return parseFloat(str.replace(/\s/g, '').replace(',', '.'));
    },

    formatNumberToString: function (fAmount, currencyCode) {
        if (!fAmount && fAmount !== 0)
        { return ''; }

        const isNegative = fAmount < 0;
        fAmount = Math.abs(fAmount);

        currencyCode = !currencyCode ? 'RUB' : currencyCode.toUpperCase();
        if (!['RUB', 'USD', 'EUR', 'NUMERAL'].includes(currencyCode))
        { return 'Валюта ' + currencyCode + ' не поддерживается'; }
        const mapNumbers = {
            0: [2, 1, "ноль"],
            1: [0, 2, "один", "одна"],
            2: [1, 2, "два", "две"],
            3: [1, 1, "три"],
            4: [1, 1, "четыре"],
            5: [2, 1, "пять"],
            6: [2, 1, "шесть"],
            7: [2, 1, "семь"],
            8: [2, 1, "восемь"],
            9: [2, 1, "девять"],
            10: [2, 1, "десять"],
            11: [2, 1, "одиннадцать"],
            12: [2, 1, "двенадцать"],
            13: [2, 1, "тринадцать"],
            14: [2, 1, "четырнадцать"],
            15: [2, 1, "пятнадцать"],
            16: [2, 1, "шестнадцать"],
            17: [2, 1, "семнадцать"],
            18: [2, 1, "восемнадцать"],
            19: [2, 1, "девятнадцать"],
            20: [2, 1, "двадцать"],
            30: [2, 1, "тридцать"],
            40: [2, 1, "сорок"],
            50: [2, 1, "пятьдесят"],
            60: [2, 1, "шестьдесят"],
            70: [2, 1, "семьдесят"],
            80: [2, 1, "восемьдесят"],
            90: [2, 1, "девяносто"],
            100: [2, 1, "сто"],
            200: [2, 1, "двести"],
            300: [2, 1, "триста"],
            400: [2, 1, "четыреста"],
            500: [2, 1, "пятьсот"],
            600: [2, 1, "шестьсот"],
            700: [2, 1, "семьсот"],
            800: [2, 1, "восемьсот"],
            900: [2, 1, "девятьсот"]
        };
        const mapOrders = {
            RUB: [
                {
                    _Gender: true,
                    _arrStates: ["рубль", "рубля", "рублей"]
                }
            ],
            USD: [
                {
                    _Gender: true,
                    _arrStates: ["доллар", "доллара", "долларов"]
                }
            ],
            EUR: [
                {
                    _Gender: true,
                    _arrStates: ["евро", "евро", "евро"]
                }
            ],
            NUMERAL: [
                {
                    _Gender: true,
                    _arrStates: ["целых", "целых", "целых"]
                }
            ]
        };
        const objFractional = {
            RUB: {
                _Gender: false,
                _arrStates: ["копейка", "копейки", "копеек"]
            },
            USD: {
                _Gender: false,
                _arrStates: ["цент", "цента", "центов"]
            },
            EUR: {
                _Gender: false,
                _arrStates: ["цент", "цента", "центов"]
            },
            NUMERAL: {
                _Gender: true,
                _arrStates: ["сотых", "сотых", "сотых"]
            }
        };
        const ordinals = [
            {
                _Gender: false,
                _arrStates: ["тысяча", "тысячи", "тысяч"]
            },
            {
                _Gender: true,
                _arrStates: ["миллион", "миллиона", "миллионов"]
            },
            {
                _Gender: true,
                _arrStates: ["миллиард", "миллиарда", "миллиардов"]
            },
            {
                _Gender: true,
                _arrStates: ["триллион", "триллиона", "триллионов"]
            }
        ];

        for (const currency in mapOrders) {
            mapOrders[currency] = mapOrders[currency].concat(ordinals);
        }

        function Value(dVal, bGender) {
            const xVal = mapNumbers[dVal];
            if (xVal[1] == 1) {
                return xVal[2];
            }
            return xVal[2 + (bGender ? 0 : 1)];

        }
        function From0To999(fValue, oObjDesc, fnAddNum, fnAddDesc) {
            let nCurrState = 2;
            if (Math.floor(fValue / 100) > 0) {
                const fCurr = Math.floor(fValue / 100) * 100;
                fnAddNum(Value(fCurr, oObjDesc._Gender));
                nCurrState = mapNumbers[fCurr][0];
                fValue -= fCurr;
            }
            if (fValue < 20) {
                if (Math.floor(fValue) > 0) {
                    fnAddNum(Value(fValue, oObjDesc._Gender));
                    nCurrState = mapNumbers[fValue][0];
                }
            } else {
                const fCurr = Math.floor(fValue / 10) * 10;
                fnAddNum(Value(fCurr, oObjDesc._Gender));
                nCurrState = mapNumbers[fCurr][0];
                fValue -= fCurr;
                if (Math.floor(fValue) > 0) {
                    fnAddNum(Value(fValue, oObjDesc._Gender));
                    nCurrState = mapNumbers[fValue][0];
                }
            }
            fnAddDesc(oObjDesc._arrStates[nCurrState]);
        }
        if (typeof fAmount == "string") { fAmount = parseFloat(fAmount.replace(',', '.').replace(/\s/g, '')); }
        let fInt = Math.floor(fAmount + 0.005);
        const fDec = Math.floor(((fAmount - fInt) * 100) + 0.5);
        const arrRet = [];
        const arrThousands = [];
        for (; fInt > 0.9999; fInt /= 1000) {
            arrThousands.push(Math.floor(fInt % 1000));
        }
        if (arrThousands.length == 0) {
            arrThousands.push(0);
        }
        function PushToRes(strVal) {
            arrRet.push(strVal);
        }
        for (let iSouth = arrThousands.length - 1; iSouth >= 0; --iSouth) {
            if (arrThousands[iSouth] == 0) {
                continue;
            }
            if (arrThousands.length > 5)
            { return 'Невозможно перевести число в Сумма прописью больше 999 999 999 999 999,99'; }
            From0To999(arrThousands[iSouth], mapOrders[currencyCode][iSouth], PushToRes, PushToRes);
        }
        if (arrThousands[0] == 0) {
            //  Handle zero amount
            if (arrThousands.length == 1) {
                PushToRes(Value(0, mapOrders[currencyCode][0]._Gender));
            }
            const nCurrState = 2;
            PushToRes(mapOrders[currencyCode][0]._arrStates[nCurrState]);
        }
        arrRet.push((fDec < 10) ? ("0" + fDec) : ("" + fDec));
        From0To999(fDec, objFractional[currencyCode], ()=>{ return; }, PushToRes);

        return (isNegative ? 'минус ' : '') + arrRet.join(" ");
    },

    capitalizeString: function (string) {
        const capitalizedString = string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
        return capitalizedString;
    },

    upperCaseFirst: function (str) {
        if (!str) { return str; }

        return str[0].toUpperCase() + str.slice(1);
    },

    lowerCaseFirst: function (str) {
        if (!str) { return str; }

        return str[0].toLowerCase() + str.slice(1);
    },

    getCaseStringFromNumber: function (number, someCase) {
        let rez = "";
        const mapNumbers = {
            subjective: {
                0: "",
                1: "один",
                2: "два",
                3: "три",
                4: "четыре",
                5: "пять",
                6: "шесть",
                7: "семь",
                8: "восемь",
                9: "девять",
                10: "десять",
                11: "одиннадцать",
                12: "двенадцать",
                13: "тринадцать",
                14: "четырнадцать",
                15: "пятнадцать",
                16: "шестнадцать",
                17: "семнадцать",
                18: "восемнадцать",
                19: "девятнадцать",
                20: "двадцать",
                30: "тридцать",
                40: "сорок",
                50: "пятьдесят",
                60: "шестьдесят",
                70: "семьдесят",
                80: "восемьдесят",
                90: "девяносто",
                100: "сто",
                200: "двести",
                300: "триста",
                400: "четыреста",
                500: "пятьсот",
                600: "шестьсот",
                700: "семьсот",
                800: "восемьсот",
                900: "девятьсот"
            },
            genitive: {
                0: "",
                1: "одного",
                2: "двух",
                3: "трёх",
                4: "четырех",
                5: "пяти",
                6: "шести",
                7: "семи",
                8: "восеми",
                9: "девяти",
                10: "десяти",
                11: "одиннадцати",
                12: "двенадцати",
                13: "тринадцати",
                14: "четырнадцати",
                15: "пятнадцати",
                16: "шестнадцати",
                17: "семнадцати",
                18: "восемнадцати",
                19: "девятнадцати",
                20: "двадцати",
                30: "тридцати",
                40: "сорока",
                50: "пятьдесяти",
                60: "шестьдесяти",
                70: "семьдесяти",
                80: "восемьдесяти",
                90: "девяноста",
                100: "ста",
                200: "двухсот",
                300: "трёхсот",
                400: "четырехсот",
                500: "пятисот",
                600: "шестисот",
                700: "семисот",
                800: "восемисот",
                900: "девятисот"
            }
        };

        if (number >= 100 && number < 999) {
            rez += mapNumbers[someCase][Math.floor(number / 100) * 100];
            number = number % 100;

            if (number != 0) {
                rez += " ";
            }

        }

        if (number >= 20 && number < 100) {

            rez += mapNumbers[someCase][Math.floor(number / 10) * 10];
            number = number % 10;

            if (number != 0) {
                rez += " ";
            }

        }

        if (number < 20) {
            rez += mapNumbers[someCase][number];
        }

        return rez;

    },

    getTextDeclinationByYear: function (year) {
        let txt, count = year % 100;
        count >= 5 && count <= 20 ? txt = 'лет' : count = count % 10, count == 1 ? txt = 'год' : (count >= 2 && count <= 4) ? txt = 'года' : txt = 'лет';
        return txt;
    }

};

function changeValue(value, changeFrom, changeTo) {
    if (value == changeFrom) {
        return changeTo;
    }
    return value;

}
