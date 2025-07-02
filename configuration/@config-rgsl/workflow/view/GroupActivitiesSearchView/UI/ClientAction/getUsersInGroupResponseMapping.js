module.exports = function getUsersInGroupResponseMapping(input, ambientProperties) {
    if (input.response.data && input.response.data.length > 0) {
        return input.response.data
            .map(member => {
                return {
                    userId: member.resultData.userId,
                    username: member.resultData.username,
                    displayName: member.resultData.claims && member.resultData.claims.DisplayName ? member.resultData.claims.DisplayName : member.resultData.username
                };
            });
    }
};
