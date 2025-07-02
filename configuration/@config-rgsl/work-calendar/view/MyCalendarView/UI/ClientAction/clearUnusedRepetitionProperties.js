'use strict';

module.exports = function clearUnusedRepetitionProperties(input) {
    const { affectedRow, operationType } = input;

    if (operationType === 'Add' || operationType === 'Edit') {
        if (affectedRow.repetition.pattern === 'weekly') {
            affectedRow.repetition.eventDate = undefined;
        } else if (affectedRow.repetition.pattern === 'yearly') {
            affectedRow.repetition.dayOfWeek = undefined;
        } else {
            affectedRow.repetition.dayOfWeek = undefined;
            affectedRow.repetition.eventDate = undefined;
        }
    }
};
