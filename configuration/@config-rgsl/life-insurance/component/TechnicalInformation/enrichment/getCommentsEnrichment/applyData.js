module.exports = function mapping(input, dataSourceResponse) {

    input.lastCommenterUsername = undefined;

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.comments) {

        const commentsArray = JSON.parse(dataSourceResponse.data.comments);
        const notDeletedCommentsArray = commentsArray.filter(function (item) { return !item.deleted; });
        const lastCommentId = Math.max.apply(null, notDeletedCommentsArray.map(elem => elem.id));
        const lastComment = notDeletedCommentsArray.filter(function (item) { return item.id == lastCommentId; });
        const lastCommenterUsername = lastComment.length > 0 ? lastComment[0].author : undefined;

        input.lastCommenterUsername = lastCommenterUsername;
        input.lastCommentId = lastCommentId;

    }

};
