'use strict';

const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function alreadyExecuted(step, context, stepContext) {

    const client = new Client();
    const party = await callDataSource('GetPartyInfoDataSource', {
        paging: undefined,
        criteria : { fullName: 'БФКО' },
    }, client);
    context.alreadyExecuted = party.data.length !== 0;
    if (context.alreadyExecuted) {
        console.log('Already executed! SKIP!');
    }
}

module.exports = {
    alreadyExecuted,
};
