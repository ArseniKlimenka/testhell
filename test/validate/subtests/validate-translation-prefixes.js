'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const glob = require('glob');
const logger = require('@adinsure/platform-framework/lib/log/console_logger_impl');
const sinon = require('sinon');
const { expect } = require('chai');
const readFilePromisify = util.promisify(fs.readFile);
const csvParsePromisify = util.promisify(require('csv-parse'));

module.exports = function validateTranslationPrefixes(project) {
    const projects = glob.sync(`./node_modules/@config-rgsl/*`);
    projects.forEach(project => {
        describe(`Validating ${project}`, () => {
            let cwd = process.cwd();
            let stub;

            before(() => {
                process.chdir(path.resolve(path.join(cwd, project)));

                //suppression of INFO loggin
                stub = sinon.stub(logger, 'log').callsFake((loggerName, level, message) => {
                    if (level.name === 'INFO') {
                        return () => { };
                    }
                    return logger.log.wrappedMethod(loggerName, level, message);
                });
            });

            after(() => {
                process.chdir(cwd);
                if (stub) stub.restore();
            });

            validateTranslations(project);
        });
    });

};

function validateTranslations(project) {
    describe(`Validation of translations in ${project}`, function () {
        const translationFiles = glob.sync(`${path.resolve(project)}/**/translation.csv`);

        translationFiles
            .forEach((translationFile) => {
                it(`${translationFile}`, async function () {
                    const translationFileContent = await readFilePromisify(translationFile);
                    const parsedTranslationFile = await csvParsePromisify(translationFileContent, { delimiter: '\t', quote: false, relax_column_count: true });
                    const result = checkValidationPrefix(parsedTranslationFile);

                    expect(result.valid, result.message).to.be.true;
                });
            });
    });
}

function checkValidationPrefix(parsedTranslationFile) {

    let result = {
        valid: true,
        message: ''
    };

    if (!parsedTranslationFile[0]) return result;

    let message;
    let translationKeyIndex = parsedTranslationFile[0].findIndex(v => v == 'TranslationKey');
    let translationENIndex = parsedTranslationFile[0].findIndex(v => v == 'Translation_en-US');
    let translationRUIndex = parsedTranslationFile[0].findIndex(v => v == 'Translation_ru-RU');


    parsedTranslationFile.forEach((row, i) => {

        if (row[translationKeyIndex].indexOf('validation@') != -1 && !row[translationENIndex].startsWith('E: ')) {

            let prefixMask = ':';
            let ruPrefix = row[translationRUIndex].substring(1, 2);
            let enPrefix = row[translationENIndex].substring(1, 2);
            let ruPrefixLetter = row[translationRUIndex].substring(0, 1);
            let enPrefixLetter = row[translationENIndex].substring(0, 1);

            // check if there is a prefix for validation translaiton 
            if (ruPrefix != prefixMask || enPrefix != prefixMask) {
                result.valid = false;
                message = `${result.message}Missing validation prefix for ${row[translationKeyIndex]} translation key. `;
            }
            // check if there is the prefix is allowed
            else if (!['E', 'W', 'N'].includes(ruPrefixLetter) || !['E', 'W', 'N'].includes(enPrefixLetter)) {
                result.valid = false;
                message = `${result.message}Missing validation prefix for ${row[translationKeyIndex]} translation key. `;
            }
        }
    });

    result.message = message;

    return result;
}