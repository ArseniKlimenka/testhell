

module.exports = function setIsDefault(input) {

    const unfulfilledObligationCB = input.componentContext.unfulfilledObligationCB;
    const licenseRevoked = input.componentContext.licenseRevoked;
    const isDebankruptcyProcedurefault = input.componentContext.bankruptcyProcedure;
    const unfulfilledObligationByGuarantee = input.componentContext.unfulfilledObligationByGuarantee;
    const anotherSign = input.componentContext.anotherSign;

    if (!unfulfilledObligationCB && !licenseRevoked && !isDebankruptcyProcedurefault && !unfulfilledObligationByGuarantee && !anotherSign) {
        input.componentContext.isDefault = false;
    } else {
        input.componentContext.isDefault = true;
    }

    this.view.rebind();

};
