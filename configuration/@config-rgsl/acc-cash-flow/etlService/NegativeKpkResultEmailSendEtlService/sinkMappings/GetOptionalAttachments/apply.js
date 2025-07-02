'use strict';

module.exports = function apply(sinkResult, lineInput, sinkExchange) {

    const attachments = sinkResult.data.map(_ => _.resultData);

    const sortedAttachments = [...attachments];

    sortedAttachments.sort(function (b, a) {

        return new Date(a.createdOn) - new Date(b.createdOn);
    });

    const contractSigned = sortedAttachments.find((x) => x.attachmentType === 'contractSigned');
    sinkExchange.attachmentsToSend.push({ attachment: { id: contractSigned?.attachmentId } });
};
