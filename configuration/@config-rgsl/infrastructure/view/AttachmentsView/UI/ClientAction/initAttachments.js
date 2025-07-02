const { refreshAttachments } = require('@config-rgsl/infrastructure/lib/AttachmentsViewHelperImpl');
const attachmentsViewConst = require('@config-rgsl/infrastructure/lib/AttachmentsViewConst');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function initAttachments(input, ambientProperties) {

    // Check if called from eventHandler for correct view
    if (input.actionData && input.actionData.viewId !== this.view.getParentView().viewId) { return; }

    // Initialize data:
    input.context.Body = {
        isEntitySaved: input.rootContext.IsSaved,
        currentSequenceNumber: undefined,
        attachments: [],
        attachmentTypes: [],
        filteringData: {
            availableVersions: [],
            selectedVersion: undefined
        },
        showFilters: false,
        attachmentsVerification: []
    };

    // Initialize filters
    const parentView = this.view.getParentView();
    const filtersContext = parentView ? parentView.getContext() : input.rootContext;
    _initFilters(input, ambientProperties, filtersContext);

    // Get available attachment types and attachments for view
    if (input.rootContext.IsSaved) {
        const response = await this.view.getParentView().attachmentManager.getAvailableAttachmentTypes();
        fillAvailableAttachmentTypes(this, input, ambientProperties, response);
        refreshAttachments(this.view, input);
    }

    if (![productCode.CreditLifeInsurancePolicy, productCode.CreditLifeInsuranceQuote].includes(ambientProperties.ConfigurationCodeName)) {
        await fillAttachmentsVerification(input, ambientProperties);
    }

    this.view.rebind();
    this.view.reevaluateRules('#');
    this.view.disableValidation();
};


async function fillAttachmentsVerification(input, ambientProperties) {

    const contractNumber = input.rootContext.Number;
    const partyCode = input.rootContext.Code;
    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AttachmentsVerificationsDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    partyCode: partyCode
                }
            }
        }
    };

    let attachmentsVerification = [];
    if (contractNumber || partyCode) {

        let result;
        try {
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }

        const data = result.data;
        attachmentsVerification = data.map(item => {
            return {
                verificationDocumentNumber: item.resultData.verificationDocumentNumber,
                verificationState: item.resultData.verificationState,
                verificationDate: item.resultData.verificationDate
            };
        });
    }

    input.context.Body.attachmentsVerification = attachmentsVerification;

}

/**
 * Initialize filters and enable / disable them.
 *
 * @param {object} input The view's data
 * @param {object} ambientProperties Client actions ambient properties
 * @param {object} entityData The containing entity's data (view model data)
 */
function _initFilters(input, ambientProperties, entityData) {
    /**
     * Prepares display text for the individual version in the drop down menu.
     * @param {string} versionState - Version state (e.g. applied, discarded, null)
     * @param {object} ambientProperties - Client actions ambient properties Needed for accessing translation service
     */
    function _translateVersionState(versionState, ambientProperties) {
        if (versionState) {
            versionState = versionState.toUpperCase();
        } else {
            versionState = 'NULL';
        }

        const versionStateTranslationKey = '##VERSION_STATE_' + versionState;

        return ambientProperties.services.translate.getSync('UI_BOOTSTRAP', versionStateTranslationKey);
    }

    // If all data is available, we initialize the filter.
    // If anything is missing, we do not display the filter at all.
    if ((entityData.SequenceNumber || entityData.SequenceNumber === 0) && entityData.Versions && !entityData.IsAmendment) {
        input.context.Body.currentSequenceNumber = entityData.SequenceNumber;
        const versions = entityData.Versions;

        // Only versions up to the currently viewed version can be selected.
        // Select component does not support templates, so we need to pretranslate each versions display name.
        const individualOptions = versions
            .filter(version => version.SequenceNumber <= input.context.Body.currentSequenceNumber)
            .map((version) => {
                return {
                    sequenceNumber: version.SequenceNumber,
                    versionName: version.SequenceNumber + ' (' + _translateVersionState(version.VersionState, ambientProperties) + ')',
                };
            });

        // If the user wants to see all attachments up to the current version, he can select 'All'.
        const allOption = {
            sequenceNumber: '',
            versionName: ambientProperties.services.translate.getSync('UI_BASE', '##ALL')
        };

        // When the control loads, we initialize to display 'All'.
        input.context.Body.filteringData.availableVersions = [allOption, ...individualOptions];
        input.context.Body.filteringData.selectedVersion = allOption.sequenceNumber;
        input.context.Body.showFilters = individualOptions.length > 1;
    }
}

/**
 * Maps returned attachment types.
 *
 * @param {*} view - Current view
 * @param {*} input - The view's data
 * @param {*} ambientProperties - Client action ambient properties
 * @param {*} response - Response containing attachment types
 */
function fillAvailableAttachmentTypes(that, input, ambientProperties, response) {

    let availableAttachmentTypes = response?.incoming;

    if (!availableAttachmentTypes) {

        return;
    }

    let body = input.rootContext.Body;

    if (!attachmentsViewConst.polcyAttachmentsConfnames.includes(input.rootContext.ConfigurationCodeName)) {

        body = that.view.getParentView().getContext().Body;
    }

    const isSystemActor = input.rootContext.WorkUnitActor?.CurrentActor === 'System';
    const view = that.view;

    if (body.issueForm?.code?.issueFormCode === 'ePolicy') {

        availableAttachmentTypes = availableAttachmentTypes.filter(element => element.attachmentType !== 'contractSigned' && element.attachmentType !== 'contractProject');

        if (!isSystemActor) {

            availableAttachmentTypes = availableAttachmentTypes.filter(element => !attachmentsViewConst.ePolicyIncomingAttachmentsExclusion.includes(element.attachmentType));
        }
    }
    else if (body.issueForm?.code?.issueFormCode === 'paper') {

        availableAttachmentTypes = availableAttachmentTypes.filter(element => !attachmentsViewConst.paperIncomingAttachmentsExclusion.includes(element.attachmentType));
    }
    else if (body.issueForm?.code?.issueFormCode === 'offer') {

        availableAttachmentTypes = availableAttachmentTypes.filter(element => !attachmentsViewConst.offerIncomingAttachmentsExclusion.includes(element.attachmentType));
    }

    const entityConfigurationCodeName =
        (view.getParentView() && view.getParentView().getContext()) ? // for inline views like in LifeInsuranceAttachmentVerification
            view.getParentView().getContext().ConfigurationCodeName :
            input.rootContext.ConfigurationCodeName;

    // Clear previous attachment types without overriding the array:
    input.context.Body.attachmentTypes.length = 0;


    // Translate each attachment type, because we do not have enums nor does select support templates.
    availableAttachmentTypes.forEach(attachmentType => {
        input.context.Body.attachmentTypes.push({
            type: attachmentType.attachmentType,
            typeName: attachmentType.displayName
        });
    });
    input.context.Body.attachmentTypes.sort((a, b) => (a.typeName > b.typeName) ? 1 : ((b.typeName > a.typeName) ? -1 : 0));
}
