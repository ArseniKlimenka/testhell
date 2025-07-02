'use strict';

module.exports = function apply(sinkResult, lineInput, sinkExchange) {

    const attachmentsToSend = [];
    const attachments = sinkResult.data.map(_ => _.resultData);

    const sortedAttachments = [...attachments];

    sortedAttachments.sort(function (b, a) {

        return new Date(a.createdOn) - new Date(b.createdOn);
    });

    const passport = sortedAttachments.find((x) => x.attachmentType === 'passport');
    attachmentsToSend.push({ attachment: { id: passport?.attachmentId } });

    const contractSigned = sortedAttachments.find((x) => x.attachmentType === 'contractSigned');
    attachmentsToSend.push({ attachment: { id: contractSigned?.attachmentId } });

    sinkExchange.attachmentsToSend = attachmentsToSend;
};
