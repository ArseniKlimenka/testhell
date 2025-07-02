module.exports = function setCurrentIsDirtyViewState(input) {

    input.rootContext.ClientViewModel.isViewInitiallyDirty = this.view.isDirty();
    return true;
};
