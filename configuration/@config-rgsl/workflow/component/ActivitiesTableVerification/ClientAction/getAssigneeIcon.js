module.exports = function getAssigneeIcon(input) {
    if (input.data.assigneeName) {
        return { name: 'User', size: 'Small', color: 'Primary' };
    }
    return { name: 'Users', size: 'Small', color: 'Primary' };
};
