const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");

module.exports = async function arrayOperationHandler(input, ambientProperties) {

    const { affectedRow, operationType } = input;
    const dateTimeNow = new Date().toISOString();

    if (operationType == "Add") {

        const commentIdGuid = guidHelper.generate();
        const request = {

            method: 'post',
            url: `api/rgsl/common/shared/comment/add`,
            data: {
                commentId: commentIdGuid,
                author: input.rootContext.AuditInfo.CreatedBy,
                origDocumentNo: input.rootContext.OriginalDocumentNumber,
                authorApplicationUserGroup: input.rootContext.WorkUnitActor?.CurrentActor,
                comment: affectedRow.comment,
                createdOn: dateTimeNow,
                modifiedOn: dateTimeNow,
                deleted: false,
                originalCommentId: commentIdGuid
            }
        };

        let result;

        try {

            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
            insertedHistoryCommentUiUpdate(input, result, dateTimeNow);
        }
        catch (err) {

            throwResponseError(err);
        }
        finally {

            this.view.stopBlockingUI();
            this.view.rebind();
            this.view.reevaluateRules();
            this.view.validate();
        }

    } else if (operationType == "Edit") {

        if (!affectedRow.originalCommentId) {

            affectedRow.originalCommentId = affectedRow.id;
        }

        const request = {

            method: 'post',
            url: `api/rgsl/common/shared/comment/update`,
            data: {
                commentId: guidHelper.generate(),
                author: affectedRow.author,
                origDocumentNo: input.rootContext.OriginalDocumentNumber,
                authorApplicationUserGroup: input.rootContext.WorkUnitActor?.CurrentActor,
                comment: affectedRow.comment,
                createdOn: affectedRow.createdOn,
                deleted: false,
                modifiedOn: dateTimeNow,
                sequenceNumber: affectedRow.sequenceNumber,
                originalCommentId: affectedRow.originalCommentId
            }
        };

        let result;

        try {

            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);

            modifiedHistoryCommentUiUpdate(input, result, dateTimeNow);
        }
        catch (err) {

            throwResponseError(err);
        }
        finally {

            this.view.stopBlockingUI();
            this.view.rebind();
            this.view.reevaluateRules();
            this.view.validate();
        }

    } else if (operationType == "Delete") {

        const request = {
            method: 'post',
            url: `api/rgsl/common/shared/comment/delete`,
            data: {
                originalCommentId: affectedRow.originalCommentId
            }
        };

        try {

            this.view.startBlockingUI();
            await ambientProperties.services.api.call(request);
        }
        catch (err) {

            throwResponseError(err);
        }
        finally {

            this.view.stopBlockingUI();
            this.view.rebind();
            this.view.reevaluateRules();
            this.view.validate();
        }
    }
};

function insertedHistoryCommentUiUpdate(input, updateResponse, dateTimeNow) {

    const affectedRow = input.affectedRow;

    affectedRow.id = updateResponse.commentId;
    affectedRow.modifiedOn = dateTimeNow;
    affectedRow.author = input.rootContext.AuditInfo.CreatedBy;
    affectedRow.createdOn = dateTimeNow;

    input.data.Body[input.data.Body.length - 1] = affectedRow;
}

function modifiedHistoryCommentUiUpdate(input, updateResponse, dateTimeNow) {

    const affectedRow = input.affectedRow;
    const commentPrevId = affectedRow.id;

    affectedRow.id = updateResponse.commentId;
    affectedRow.modifiedOn = dateTimeNow;
    affectedRow.sequenceNumber = updateResponse.sequenceNumber;

    const index = input.data.Body.findIndex(item => item.id === commentPrevId);
    input.data.Body[index] = affectedRow;
}
