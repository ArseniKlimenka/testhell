'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { addressType } = require('@config-rgsl/party/lib/partyConstantsImpl');

const currentDate = dateUtils.newDateAsString(dateUtils.DateFormats.ECMASCRIPT);
const oldDate = dateUtils.formatDate('1900-01-01');

// update party body and if address/bank account changed more than once per day then delete last address/bank account
module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkInput.configurationCodeName != "NaturalPerson") {

        return;
    }

    let currentBody = sinkExchange.party.body;
    const actualBody = sinkInput.body;

    currentBody = updateAddresses(actualBody, currentBody);
    currentBody = updatePhone(actualBody, currentBody);
    currentBody = updateEmail(actualBody, currentBody);
    currentBody = updateBankAccount(actualBody, currentBody);
    currentBody = updateCitizenship(actualBody, currentBody);

    return {
        body: currentBody,
        code: sinkExchange.party.partyCode
    };
};

function updateAddresses(actualBody, currentBody) {

    if (!actualBody.partyAddresses) {

        return currentBody;
    }

    const newAddresses = actualBody.partyAddresses;

    if (!currentBody.partyAddresses) {

        currentBody.partyAddresses = [];
    }

    const currentAddresses = currentBody.partyAddresses;

    for (const newAddress of newAddresses) {

        const existingAddress = currentAddresses.find(x => x.addressType.addressTypeCode === newAddress.addressType.addressTypeCode && x.actualTo === undefined);

        if (!existingAddress) {

            if (!newAddress.actualFrom) {

                newAddress.actualFrom = dateUtils.dateNow();
            }

            currentAddresses.push(newAddress);
        }
        else if (existingAddress && existingAddress.fullAddress.value != newAddress.fullAddress.value) {

            newAddress.actualFrom = dateUtils.dateNow();
            existingAddress.actualTo = dateUtils.substractDays(dateUtils.dateNow(), 1);

            if (existingAddress.actualFrom > existingAddress.actualTo) {

                existingAddress.actualTo = existingAddress.actualFrom;
            }

            if (dateUtils.periodsIntersected(
                existingAddress.actualFrom || oldDate,
                existingAddress.actualTo || currentDate,
                newAddress.actualFrom || oldDate,
                newAddress.actualTo || currentDate))
            {

                const index = currentAddresses.indexOf(existingAddress);

                if (index > -1) {

                    currentAddresses.splice(index, 1);
                    continue;
                }

            }

            if (existingAddress.isSameAsRegistration) {

                existingAddress.isSameAsRegistration = false;
            }

            if (newAddress.addressType.addressTypeCode === addressType.registration.code) {

                disableAllIsSameAsRegistrationFlagInCounterparty(currentBody);
            }

            currentAddresses.push(newAddress);
        }
    }

    return currentBody;
}

function disableAllIsSameAsRegistrationFlagInCounterparty(currentBody) {

    for (const address of currentBody.partyAddresses) {

        if (address.isSameAsRegistration) {

            address.isSameAsRegistration = false;
        }
    }
}

function updatePhone(actualBody, currentBody) {

    if (!actualBody.partyPhones) {

        return currentBody;
    }

    const newPhones = actualBody.partyPhones;

    if (!currentBody.partyPhones) {

        currentBody.partyPhones = [];
    }

    const currentPhones = currentBody.partyPhones;

    for (const phone of newPhones) {

        const existingPhone = currentPhones.find(x => (x.fullNumber === phone.fullNumber) && (x.phoneTypeCode === phone.phoneTypeCode));
        if (existingPhone) {

            currentPhones[currentPhones.indexOf(existingPhone)] = phone;
        } else {

            setIsPreferableValueInArray(currentPhones, false);
            phone.isPreferable = true;
            currentPhones.push(phone);
        }
    }

    return currentBody;
}

function updateEmail(actualBody, currentBody) {

    if (!actualBody.partyEmails) {

        return currentBody;
    }

    const newEmails = actualBody.partyEmails;

    if (!currentBody.partyEmails) {

        currentBody.partyEmails = [];
    }

    const currentEmails = currentBody.partyEmails;

    for (const email of newEmails) {

        const existingEmail = currentEmails.find(x => (x.email === email.email));

        if (existingEmail) {

            currentEmails[currentEmails.indexOf(existingEmail)] = email;
        } else {

            setIsPreferableValueInArray(currentEmails, false);
            email.isPreferable = true;
            currentEmails.push(email);
        }
    }

    return currentBody;
}

function setIsPreferableValueInArray(itemsArray, value) {

    if (itemsArray.length == 0) {

        return;
    }

    for (const item of itemsArray) {

        item.isPreferable = value;
    }
}

function updateBankAccount(actualBody, currentBody) {

    if (!actualBody.partyBankAccounts) {

        return currentBody;
    }

    const newBankAccounts = actualBody.partyBankAccounts;

    if (!currentBody.partyBankAccounts) {

        currentBody.partyBankAccounts = [];
    }

    const currentBankAccounts = currentBody.partyBankAccounts;

    for (const bankAccount of newBankAccounts) {

        const existingBankAccount = currentBankAccounts.find(x => (x.number === bankAccount.number));

        if (!existingBankAccount) {

            if (currentBankAccounts.filter(x => x.openingDate || x.closingDate).length == 0) {

                currentBankAccounts.push(bankAccount);
                return currentBody;
            }

            bankAccount.openingDate = dateUtils.dateNow();

            for (const currentBankAccouont of currentBankAccounts) {

                if (currentBankAccouont.closingDate === undefined) {

                    currentBankAccouont.closingDate = dateUtils.substractDays(dateUtils.dateNow(), 1);
                }

                if (currentBankAccouont.openingDate > currentBankAccouont.closingDate) {

                    currentBankAccouont.closingDate = currentBankAccouont.openingDate;
                }

                if (dateUtils.periodsIntersected(
                    currentBankAccouont.openingDate || oldDate,
                    currentBankAccouont.closingDate || currentDate,
                    bankAccount.openingDate || oldDate,
                    bankAccount.closingDate || currentDate))
                {

                    const index = currentBankAccounts.indexOf(currentBankAccouont);

                    if (index > -1) {

                        currentBankAccounts.splice(index, 1);
                        return currentBody;
                    }

                }
            }

            currentBankAccounts.push(bankAccount);
        }
    }

    return currentBody;
}

function updateCitizenship(actualBody, currentBody) {

    if (actualBody.partyPersonData?.citizenship) {

        const newCitizenship = actualBody.partyPersonData?.citizenship;

        if (!currentBody.partyPersonData) {

            currentBody.partyPersonData = {};
        }

        if (!currentBody.partyPersonData?.citizenship) {

            currentBody.partyPersonData.citizenship = [];
        }

        const currentCitizenship = currentBody.partyPersonData?.citizenship;

        for (const citizenship of newCitizenship) {

            const existingCitizenship = currentCitizenship.find(x => (x.countryCode === citizenship.countryCode));

            if (!existingCitizenship) {

                currentCitizenship.push(citizenship);
            }
        }
    }

    return currentBody;
}
