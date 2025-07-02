'use strict';

module.exports = async function setAttachmentsLogins(input, ambientProperties) {

    const attachments = input.componentContext.Body.attachments;
    if ((attachments?.length ?? 0) == 0) {
        return;
    }

    const attachmentIds = attachments.map(item => item?.attachmentId);

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetApplicationUsernamesByAttachmentsDataSource',
        data: {
            data: {
                criteria: {
                    attachmentIds: attachmentIds
                },
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);

    if (resultData?.data?.length > 0) {
        for (const attachment of attachments) {
            const attachmentId = attachment.attachmentId;

            if (attachmentId) {
                const result = resultData.data.find(item => item?.resultData?.attachmentId === attachmentId);
                if (result?.resultData?.username) {
                    attachment.createdByLogin = result.resultData.username;
                }
            }
        }
    }

    this.rebindComponent();
};
