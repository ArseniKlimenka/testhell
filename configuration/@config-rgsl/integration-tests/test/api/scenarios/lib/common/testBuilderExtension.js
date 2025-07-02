const { addPromise, VersionedDocumentBuilder } = require('@adinsure-tools/api-test-framework');
const { Client } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

class VersionedDocumentBuilderRgsl extends VersionedDocumentBuilder {

    constructor(configurationName, version) {
        super(configurationName, version);
    }

    waitActivitiyStatusExtension(documentState, assignToMyself) {

        const createPromise = () => {
            return addPromise(
                this.waitActivitiyStatusExtensionFunction.bind(this, documentState, assignToMyself)
            );
        };

        this.promises.push(createPromise.bind(this));

        return this;
    }

    async waitActivitiyStatusExtensionFunction(documentState, assignToMyself) {

        let activity;

        await this.retryValidateDataSourceFunction({
            dataSourceName: 'ESActivitiesDataSource',
            criteria: context => ({
                paging: undefined,
                criteria: {
                    businessNumber: context.documentNumber,
                    documentState: documentState,
                },
            }),
            validation: (result, context) => {
                expect(result.data.length, 'Activity was not found!').to.be.equals(1);
                activity = result.data[0].resultData;
                expect(activity.activityStatus, 'Wrong activity status!').to.be.equals('Open');
            }
        });

        if (assignToMyself) {

            const assignRequest = ({
                activityIds: [activity.activityId],
                username: "administrator",
            });
            const client = new Client();
            const data = await client.HttpPost({
                apiPath: '/api/core/shared/activities/assignment',
                requestBody: assignRequest});
        }

        return this.context;
    }
}

module.exports = {
    VersionedDocumentBuilderRgsl,
};
