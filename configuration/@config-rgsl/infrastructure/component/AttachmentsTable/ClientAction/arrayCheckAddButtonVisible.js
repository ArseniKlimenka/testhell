module.exports = function arrayCheckAddButtonVisible(input) {

    const parentContext = this.view.getParentView()?.getContext()?.ConfigurationCodeName ?? input.rootContext.ConfigurationCodeName;
    const isExternalView = input.rootContext.ConfigurationCodeName !== parentContext;
    const shouldDisableExternalFileAdd = input.rootContext?.ClientViewModel?.shouldDisableExternalFileAdd ?? false;

    if (isExternalView) {

        return !shouldDisableExternalFileAdd;
    }

    return true;
};
