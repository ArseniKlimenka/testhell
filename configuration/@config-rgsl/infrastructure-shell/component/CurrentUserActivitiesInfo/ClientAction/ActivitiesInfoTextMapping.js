module.exports = function ActivitiesInfoTextMapping(input, ambientProperties) {

    if (this.view.getContext().openActivitiesExist)
    // return `У вас есть незакрытые задачи (${this.view.getContext().openActivitiesCount}), см. витрину задач.`;
    { return {
        part1: 'У вас есть незакрытые задачи (',
        part2: this.view.getContext().openActivitiesCount,
        part3: '), см. витрину задач.'
    }; }

};
