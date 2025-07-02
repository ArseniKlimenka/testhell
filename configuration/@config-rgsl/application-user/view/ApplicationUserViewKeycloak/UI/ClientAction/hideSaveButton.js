module.exports = function hideSaveButton(input) {

    const currentActor = input?.context?.WorkUnitActor?.CurrentActor;
    return currentActor == 'Viewer';

};
