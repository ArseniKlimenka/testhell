const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const chai = require('chai');
const expect = chai.expect;

module.exports = {
    createAct,
    autoPopulate,
    setStatus,
    getAct,
    getActItem,
};

async function createAct(request, actor) {
    const builder = new VersionedDocumentBuilderRgsl('CommissionAct');
    const document = await builder
        .setExample(({ body: request }))
        .setActor(actor)
        .create()
        .retryValidateDataSource(
            'CommissionActRgslDataSource',
            context => ({
                paging: undefined,
                criteria : { actNo: context.documentNumber },
            }),
            (result, context) => {
                expect(result.data.length, 'Commission act was not found!').to.be.equals(1);
                const act = result.data[0].resultData;
                expect(act.actNo, 'Wrong commission act number!').to.be.equals(context.documentNumber);
            },
        )
        .build();

    return {
        id: document.id,
        number: document.documentNumber,
    };
}

async function autoPopulate(request) {
    const client = new Client();
    const data = await client.HttpPost({
        apiPath: '/api/core/shared/integration-services/ActAutoPopulate/1',
        requestBody: request});
    return data;
}

async function setStatus(actNo, transitionName, newState, actor) {
    const builder = new VersionedDocumentBuilderRgsl('CommissionAct');
    const document = await builder
        .getDocumentByNumber(actNo)
        .setActor(actor)
        .makeTransition(transitionName)
        .retryValidateDataSource(
            'CommissionActRgslDataSource',
            context => ({
                paging: undefined,
                criteria : { actNo: actNo },
            }),
            (result, context) => {
                expect(result.data.length, 'Commission act was not found!').to.be.equals(1);
                const act = result.data[0].resultData;
                expect(act.actNo, 'Wrong commission act number!').to.be.equals(context.documentNumber);
                expect(act.stateCode, 'Wrong commission act state!').to.be.equals(newState);
            },
        )
        .build();

    return {
        id: document.id,
        number: document.documentNumber,
    };
}

async function getAct(actNo) {

    const client = new Client();
    const acts = await callDataSource('CommissionActRgslDataSource', {
        paging: undefined,
        criteria: { actNo: actNo },
    }, client);

    if (acts.data.length === 0) {
        throw new Error('Act not found!');
    }

    if (acts.data.length !== 1) {
        throw new Error('Several acts found!');
    }

    return acts.data[0].resultData;
}

async function getActItem(actNo) {

    const client = new Client();
    const response = await callDataSource('CommissionActItemRgslDataSource', {
        paging: undefined,
        criteria: { actNo: actNo },
    }, client);
    const items = response.data.map(_ => _.resultData);
    items.sort((a, b) => {
        let c;
        c = dateTimeUtils.compareDates(a.dueDate, b.dueDate);
        if (c) { return c; }
        c = a.sourceLineId.localeCompare(b.sourceLineId);
        return c;
    });
    return items;
}

