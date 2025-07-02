module.exports = function ShowInquiryGroup(input) {

    const number = input.rootContext.Number;
    const stateCode = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;

    return number && (currentActor == 'UKSP' || currentActor == 'Underwriter') && stateCode == 'OnReview';

};
