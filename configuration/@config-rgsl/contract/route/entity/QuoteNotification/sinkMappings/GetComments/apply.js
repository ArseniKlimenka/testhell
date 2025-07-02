'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.comments) {

        const commentsArray = JSON.parse(sinkResult.data.comments);
        const notDeletedCommentsArray = commentsArray?.filter(function (item) { return !item.deleted; });
        const lastCommentId = Math.max.apply(null, notDeletedCommentsArray?.map(elem => elem.id));
        const lastComment = notDeletedCommentsArray?.filter(function (item) { return item.id == lastCommentId; });

        sinkExchange.lastComment = lastComment;
    }
};
