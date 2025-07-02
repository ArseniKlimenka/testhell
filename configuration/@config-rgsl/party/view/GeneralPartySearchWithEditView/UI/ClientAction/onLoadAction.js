module.exports = function onLoadAction(input) {
    // isRebound must be reseted to fix problem where context is not rebinded next time lookup is shown.
    input.context.viewContext.isRebound = false;
};
