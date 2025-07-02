'use strict';

function checkShouldShowAttachments(input, confToShowAttachments) {

    const configurationName = input.context.Body.mainAttributes?.contract?.configurationName;

    return configurationName === confToShowAttachments &&
        input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
}

module.exports = {
    checkShouldShowAttachments,
};
