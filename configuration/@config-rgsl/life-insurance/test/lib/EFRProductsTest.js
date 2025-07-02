/* 'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const expect = require('chai').expect;
const _ = require('lodash');
const efrHelper = require('@config-rgsl/life-insurance/lib/efrHelper');
const client = new Client();

describe('EFR tests', function () {

    describe('GetEFRProductsFiltred', function () {

        it('Covers without duplicates', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-no-duplicates.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-no-duplicates.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsFiltred(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let actualResponse = {};

            efrHelper.getEFRProductsFiltred(efrDataSourceResponse, preparedRequest, actualResponse);
            const isEqual = _.isEqual(actualResponse.result.data, response.data.data);

            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Multiple covers', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-multi-covers.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-multi-covers.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsFiltred(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let actualResponse = {};
            efrHelper.getEFRProductsFiltred(efrDataSourceResponse, preparedRequest, actualResponse);
            const isEqual = _.isEqual(actualResponse.result.data, response.data.data);


            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Only one cover must be in request', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-only-one-cover.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsFiltred(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let vpdausmCoversInRequest = efrHelper.checkVpdausmCoversInRequestTest(efrDataSourceResponse, preparedRequest);
            const coversInRequestMoreThanOne = vpdausmCoversInRequest > 1;

            // Assert
            expect(coversInRequestMoreThanOne).to.equal(true);

        });

    });

    describe('GetEFRProductsReverseOptional', function () {

        it('With data', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-reverse-optional-full.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-reverse-optional-full.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsReverseOptional(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let actualResponse = {};
            efrHelper.getEFRProductsReverseOptional(efrDataSourceResponse, preparedRequest, actualResponse);
            const isEqual = _.isEqual(actualResponse.result.data, response.data.data);

            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Empty data', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-reverse-optional-empty.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-reverse-optional-empty.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsReverseOptional(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let actualResponse = {};
            let resultFiltered = efrHelper.getEFRProductsReverseOptional(efrDataSourceResponse, preparedRequest, actualResponse);
            const isEqual = resultFiltered?.length == 0;

        });

        it('Incorrect productCode', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-reverse-optional-incorrect-product-code.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-reverse-optional-incorrect-product-code.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsReverseOptional(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            const isEqual = efrDataSourceResponse.data?.length == 0;

            // Assert
            expect(isEqual).to.equal(true);

        });

        it('Correct productCode', async function () {

            // Arrange
            const request = require('@config-rgsl/life-insurance/test/testData/efr-request-reverse-optional-correct-product-code.json');
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-reverse-optional-correct-product-code.json');

            let requestWithoutData = request.data;
            let preparedRequest = efrHelper.prepareInputForGetEFRProductsReverseOptional(requestWithoutData);
            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : preparedRequest.input.data.criteria,
            }, client);

            // Act
            let actualResponse = {};
            efrHelper.getEFRProductsReverseOptional(efrDataSourceResponse, preparedRequest, actualResponse);
            const isEqual = _.isEqual(actualResponse.result.data, response.data.data);

            // Assert
            expect(isEqual).to.equal(true);

        });

    });

    describe('GetEFRProducts', async function () {

        it('GetEFRProducts main test', async function () {

            // Arrange
            const request = {};
            const response = require('@config-rgsl/life-insurance/test/testData/efr-response-get-products.json');

            const efrDataSourceResponse = await callDataSource('ProductRiskMappingDataSource', {
                noPaging: true,
                criteria : request,
            }, client);

            // Act
            let responseDate = "2023-09-20"; // When the response was received
            let actualResponse = efrHelper.getEFRProducts(efrDataSourceResponse, request, {}, {}, responseDate);
            delete actualResponse.data.strategies; // Delete for now (can be different)
            delete response.data.data.strategies; // Delete for now (can be different)
            const isEqual = _.isEqual(actualResponse.data, response.data.data);

            // Assert
            expect(isEqual).to.equal(true);

        });

    });

});
 */
