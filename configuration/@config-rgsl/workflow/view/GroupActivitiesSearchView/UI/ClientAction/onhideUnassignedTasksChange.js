module.exports = function onhideUnassignedTasksChange(input) {
    this.view.reevaluateRules();
    this.view.search();
};
