'use strict';

const pgc = require('../../lib/party/partyGenerationConstants.js');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(startYear, endYear) {
    // Generate a random year within the specified range
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

    // Generate a random month (0-11, where 0 is January and 11 is December)
    const month = Math.floor(Math.random() * 12);

    // Generate a random day within the range of days for the given month
    // Note: This does not account for months with fewer than 31 days or leap years
    const day = Math.floor(Math.random() * 31);

    // Format the date as dd.mm.YYYY
    const formattedDate = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`;

    return formattedDate;
}

function generateRandomNumber(n) {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
}

function formatPhoneNumber(phoneNumber) {
    // Ensure the phone number is a string
    phoneNumber = phoneNumber.toString();

    // Check if the phone number is long enough to be formatted
    if (phoneNumber.length < 10) {
        return "Invalid phone number";
    }

    // Format the phone number
    const formattedNumber = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;

    return formattedNumber;
}

function generateRandomEmail(domain) {
    // Define the characters to use for the email part
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let emailPart = '';
    // Generate the email part
    for (let i = 0; i < 15; i++) {
        emailPart += chars[Math.floor(Math.random() * chars.length)];
    }
    // Return the full email address
    return emailPart + '@' + domain;
}

function generateUniquePersonData() {

    const dateOfBirth = getRandomDate(1940, 1980);
    const birthPlace = getRandomElement(pgc.cities);
    const fullNumber = generateRandomNumber(10).toString();

    return {
        firstName: getRandomElement(pgc.russianFirstNames),
        lastName: getRandomElement(pgc.russianLastNames),
        middleName: getRandomElement(pgc.russianMiddleNames),
        birthPlace: birthPlace,
        dateOfBirth: dateOfBirth,
        passport: {
            docSeries: generateRandomNumber(4).toString(),
            docNumber: generateRandomNumber(6).toString(),
            issueDate: getRandomDate(2010, 2023),
            issuerName: "МВД " + birthPlace,
            issuerCode: generateRandomNumber(3) + '-' + generateRandomNumber(3)
        },
        fullNumber: fullNumber,
        fullNumberFormatted: formatPhoneNumber(fullNumber),
        email: generateRandomEmail('unique.ru')
    };
}

function updatePartyBody(partyBody, uniquePersonData) {

    partyBody.partyPersonData.lastName = uniquePersonData.lastName;
    partyBody.partyPersonData.firstName = uniquePersonData.firstName;
    partyBody.partyPersonData.middleName = uniquePersonData.middleName;
    partyBody.partyPersonData.dateOfBirth = uniquePersonData.dateOfBirth;
    partyBody.partyPersonData.birthPlace = uniquePersonData.birthPlace;
    partyBody.partyDocuments[0].docSeries = uniquePersonData.passport.docSeries;
    partyBody.partyDocuments[0].docNumber = uniquePersonData.passport.docNumber;
    partyBody.partyDocuments[0].issueDate = uniquePersonData.passport.issueDate;
    partyBody.partyDocuments[0].issuerCode = uniquePersonData.passport.issuerCode;
    partyBody.partyDocuments[0].issuerName = uniquePersonData.passport.issuerName;
    partyBody.partyPhones[0].fullNumber = uniquePersonData.fullNumber;
    partyBody.partyPhones[0].fullNumberFormatted = uniquePersonData.fullNumberFormatted;
    partyBody.partyEmails[0].email = uniquePersonData.email;
}

module.exports = {
    getRandomInt,
    getRandomElement,
    getRandomDate,
    generateRandomNumber,
    formatPhoneNumber,
    generateRandomEmail,
    generateUniquePersonData,
    updatePartyBody
};
