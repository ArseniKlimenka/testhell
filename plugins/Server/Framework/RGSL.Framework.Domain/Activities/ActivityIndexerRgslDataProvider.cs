using System;
using System.Collections.Generic;
using System.Linq;
using Adacta.AdInsure.Core.Domain.Activities;
using Adacta.AdInsure.Core.Domain.Activities.Repositories;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Core;
using Adacta.AdInsure.Framework.Core.Domain.Activities;
using Adacta.AdInsure.Framework.Core.Domain.Entities.Common.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Providers;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Repositories;
using Adacta.AdInsure.Framework.Core.Domain.Entities.MasterEntities.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Entities.MasterEntities.Repository;
using Adacta.AdInsure.Framework.Core.Domain.SearchDocuments.Interfaces;
using Adacta.AdInsure.Framework.Core.Infrastructure.SearchDocuments.Converters;
using Adacta.AdInsure.Framework.Core.Ioc.Ninject;
using Adacta.AdInsure.Framework.Core.ScriptingEngine.Engine;
using Adacta.AdInsure.Framework.Core.SPI.UserProfile;
using Adacta.AdInsure.RGSL.Framework.Domain.Activities.Repositories;
using Adacta.AdInsure.RGSL.Framework.Domain.Utils;
using Newtonsoft.Json.Linq;
using Ninject;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Activities
{
    public class ActivityIndexerRgslDataProvider : IIndexerDataProvider
    {
        private readonly IActivityIndexerRgslRepository _activityIndexerRgslRepository;
        private readonly IUserProfileProvider _userProfileProvider;
        private readonly IDocumentConfigurationProvider _documentConfigurationProvider;
        private readonly IReferenceResolvingService _referenceResolvingService;
        private readonly IActivityRepository _activityRepository;

        /// <summary>
        /// Constructor.
        /// </summary>
        public ActivityIndexerRgslDataProvider
        (
            ActivityIndexerDataProvider coreActivityDataProvider,
            IActivityIndexerRgslRepository activityIndexerRgslRepository,
            IUserProfileProvider userProfileProvider,
            IDocumentConfigurationProvider documentConfigurationProvider,
            IReferenceResolvingService referenceResolvingService,
            IActivityRepository activityRepository
        )
        {
            _activityIndexerRgslRepository = activityIndexerRgslRepository;
            _userProfileProvider = userProfileProvider;
            _documentConfigurationProvider = documentConfigurationProvider;
            _referenceResolvingService = referenceResolvingService;
            _activityRepository = activityRepository;
        }

        public ICommonSearchDocumentProperties GetDataWithMetaData(Guid activityId)
        {
            var activity = _activityRepository.GetById(activityId);

            if (activity == null)
            {
                return null;
            }

            JObject commonBody = new JObject();
            MapActivity(activity, commonBody);
            JObject activityData = new JObject();
            activityData["activity"] = commonBody;

            if (activity.EntityReference == null) return ActivityWithMetadataConverter.Convert(activity, activityData);

            MapEntityData(activity, activityData);

            var entity = GetEntity(activity);
            var configurationName = GetConfigurationName(activity);

            switch (configurationName)
            {
                case nameof(EntityConfigurations.LifeInsuranceAttachmentVerification):
                    MapVerificationData(activity, commonBody, entity);
                    break;

                case nameof(EntityConfigurations.AccountingCertificate):
                    MapAccountingCertificateData(activity, commonBody, entity);
                    break;
                case nameof(EntityConfigurations.AccountingCertificateCorrection):
                    MapAccountingCertificateData(activity, commonBody, entity);
                    break;

                case nameof(EntityConfigurations.CancellationInquiry):
                    MapInquire(activity, commonBody, entity);
                    break;

                case nameof(EntityConfigurations.LifeInsuranceInquiry):
                case nameof(EntityConfigurations.LifeInsurancePolicyInquiry):
                    MapLifeInsuranceInquiry(activity, commonBody, entity);
                    break;

            }

            return ActivityWithMetadataConverter.Convert(activity, activityData);
        }

        private void MapActivity(Activity activity, JObject commonBody)
        {
            commonBody["id"] = activity.Id;
            commonBody["entityReferenceId"] = activity.EntityReference.Id;

            // body
            commonBody["activityType"] = activity.ActivityType;
            commonBody["activityStatus"] = activity.ActivityStatus;
            commonBody["parentActivityId"] = activity.ParentActivityId;
            commonBody["dueDate"] = activity.Deadline;
            commonBody["comment"] = activity.Comment;
            commonBody["lastAssignedOn"] = activity.LastAssignedOn;
            commonBody["effortCode"] = activity.EffortCode;
            commonBody["effortInMinutes"] = activity.EffortInMinutes;

            MapUserGroup(commonBody, activity.UserGroupCode);

            if (activity.ManualActivityType != null)
            {
                JObject itemObject = new JObject();
                itemObject["code"] = activity.ManualActivityType;
                commonBody["manualActivityType"] = itemObject;
            }

            MapUserProfile(commonBody, activity.AssignedUserId, "assignee");
            MapUserProfile(commonBody, activity.ActivityCreationCausedBy, "creationCausedBy");
            MapUserProfile(commonBody, activity.LastAssignedBy, "lastAssignedBy");
            MapUserProfile(commonBody, activity.ActivityClosingCausedBy, "closingCausedBy");

            MapDocumentState(commonBody, activity.EntityReference.ConfigurationName, activity.EntityReference.ConfigurationVersion, activity.DocumentState, "documentState");
            MapDocumentState(commonBody, activity.EntityReference.ConfigurationName, activity.EntityReference.ConfigurationVersion, activity.PreviousDocumentState, "previousDocumentState");

            // metadata
            commonBody["createdOn"] = activity.CreatedOn;
            commonBody["updatedOn"] = activity.UpdatedOn;
            commonBody["closedOn"] = activity.ActivityClosedOn;
            commonBody["version"] = activity.SystemVersion;
        }

        private static void MapEntityData(Activity activity, JObject activityData)
        {
            if (string.IsNullOrEmpty(activity.EntityReference.EntityType))
            {
                return;
            }
            var entityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(activity.EntityReference.EntityType);
            if (entityTypeInfo == null)
            {
                return;
            }
            var entity = activity.EntityReference;
            if (entity == null)
            {
                return;
            }

            var entityData = new JObject();
            entityData["id"] = entity.Id;
            entityData["businessIdentifier"] = entity.BusinessKey;
            entityData["entityStereotype"] = entityTypeInfo.StereoType == EntityStereotype.DocumentWithSubtypes ? "Document" : "MasterEntity";

            var configuration = new JObject();
            configuration["codeName"] = entity.ConfigurationName;
            configuration["version"] = int.TryParse(entity.ConfigurationVersion, out int version) ? version : 1;
            configuration["publishedArtifactId"] = entity.PublishedArtifactId;

            entityData["configuration"] = configuration;
            activityData["entity"] = entityData;
        }

        private void MapDocumentState(JObject parameters, string configurationName, string configurationVersion, int? stateId, string fieldName)
        {
            if (stateId == null)
            {
                return;
            }

            var configuration = _documentConfigurationProvider.GetByVersion(configurationName, configurationVersion, true);
            var state = configuration.States?.FirstOrDefault(s => s.State.Id == stateId);

            if (!string.IsNullOrWhiteSpace(state?.State?.Code))
            {
                parameters[fieldName] = state.State.Code;
            }
        }

        private void MapUserGroup(JObject data, string code)
        {
            if (code == null)
            {
                return;
            }

            var groupInput = new Dictionary<string, object>();
            groupInput.Add("code", code);
            // we had to use this solution since IApplicationUserGroupService was not possible to inject.
            var userGroup = _referenceResolvingService.Resolve("api/organisation/application-user-groups", groupInput);
            if (userGroup != null)
            {
                JObject userGroupObject = new JObject();
                userGroupObject["body"] = JObject.Parse(userGroup.ToString());
                userGroupObject["code"] = code;
                data["userGroup"] = userGroupObject;
            }
        }

        private void MapUserProfile(JObject parameters, Guid? userProfileId, string fieldName)
        {
            if (userProfileId != null)
            {
                var closedByUser = _userProfileProvider.GetUserProfileById(userProfileId.Value);

                if (closedByUser == null)
                {
                    return;
                }

                parameters[$"{fieldName}Id"] = userProfileId;
                parameters[$"{fieldName}Username"] = closedByUser.Username;
                parameters[$"{fieldName}DisplayName"] = closedByUser.DisplayName;
                parameters[$"{fieldName}PartyCode"] = closedByUser.PartyCode;
            }
        }

        private void MapVerificationData(Activity activity, JObject commonBody, IEntity entity)
        {
            if (entity?.Body == null)
            {
                return;
            }

            string verificationNumber = entity.BusinessKey;
            string contractNumber = entity.Body.ParsedJson.Value<string>("number");
            string configurationCodeName = entity.Body.ParsedJson.Value<string>("configurationCodeName");
            var evd = _activityIndexerRgslRepository.GetExtraVerificationData(verificationNumber, contractNumber);

            if (evd == null)
            {
                return;
            }

            var verificationData = new JObject();
            verificationData["body"] = entity.Body.ParsedJson;
            verificationData["extraData"] = JObject.FromObject(evd);

            var contractData = new JObject();
            contractData["number"] = contractNumber;
            contractData["configurationName"] = configurationCodeName;


            contractData["holderFullName"] = entity.Body.ParsedJson.Value<string>("policyHolderFullName");
            contractData["holderPersonCode"] = entity.Body.ParsedJson.Value<string>("policyHolderCode");
            contractData["holderPartyType"] = entity.Body.ParsedJson.Value<string>("policyHolderType");

            contractData["insuredPersonFullName"] = entity.Body.ParsedJson.Value<string>("insuredPersonFullName");
            contractData["insuredPersonPersonCode"] = entity.Body.ParsedJson.Value<string>("insuredPersonCode");

            commonBody["verificationData"] = verificationData;
            commonBody["contractData"] = contractData;
        }

        private void MapAccountingCertificateData(Activity activity, JObject commonBody, IEntity entity)
        {
            if (entity?.Body == null)
            {
                return;
            }

            var contract = entity.Body.ParsedJson["contract"];

            if (contract == null)
            {
                return;
            }

            string contractNumber = contract.Value<string>("number");
            string contractConfigurationName = contract.Value<string>("configurationName");

            var contractData = new JObject();
            contractData["number"] = contractNumber;
            contractData["configurationName"] = contractConfigurationName;

            var parties = contract["parties"];

            if (parties == null)
            {
                return;
            }

            var holder = parties["holder"];

            if (holder == null)
            {
                return;
            }

            contractData["holderFullName"] = holder.Value<string>("fullName");
            contractData["holderPersonCode"] = holder.Value<string>("personCode");
            contractData["holderPartyType"] = holder.Value<string>("partyType");

            var insuredPerson = parties["insuredPerson"];

            if (insuredPerson == null)
            {
                return;
            }

            contractData["insuredPersonFullName"] = insuredPerson.Value<string>("fullName");
            contractData["insuredPersonPersonCode"] = insuredPerson.Value<string>("personCode");
            contractData["insuredPersonPartyType"] = insuredPerson.Value<string>("partyType");

            commonBody["contractData"] = contractData;
        }

        private void MapInquire(Activity activity, JObject commonBody, IEntity entity)
        {
            if (entity.Body == null) return;

            string contractNumber = entity.Body.ParsedJson.Value<string>("contractNumber");
            string insuredPerson = entity.Body.ParsedJson.Value<string>("insuredPerson");
            string policyHolder = entity.Body.ParsedJson.Value<string>("holder");
            string configurationCodeName = entity.Body.ParsedJson.Value<string>("configurationCodeName");

            var contractData = new JObject
            {
                ["number"] = contractNumber,
                ["insuredPersonFullName"] = insuredPerson,
                ["holderFullName"] = policyHolder,
                ["configurationName"] = configurationCodeName
            };

            commonBody["contractData"] = contractData;
        }

        private void MapLifeInsuranceInquiry(Activity activity, JObject commonBody, IEntity entity)
        {
            if (entity.Body == null) return;

            var inquiry = entity.Body.ParsedJson["inquiry"];
            if (inquiry == null) return;

            var quoteNumber = inquiry.Value<string>("quoteNumber");
            var policyHolder = inquiry.Value<string>("holder");
            var insuredPerson = inquiry.Value<string>("insuredPerson");
            var configurationCodeName = inquiry.Value<string>("configurationCodeName");

            var contractData = new JObject
            {
                ["number"] = quoteNumber,
                ["insuredPersonFullName"] = insuredPerson,
                ["holderFullName"] = policyHolder,
                ["configurationName"] = configurationCodeName
            };

            commonBody["contractData"] = contractData;
        }

        private static IEntity GetEntity(Activity activity)
        {
            var entityReference = activity.EntityReference;
            string codeName = entityReference.ConfigurationName;
            IEntity entity = GetEntity(entityReference.Id, entityReference.EntityType);

            return entity;
        }

        private static string GetConfigurationName(Activity activity)
        {
            var entityReference = activity.EntityReference;
            return entityReference.ConfigurationName;
        }

        private static IEntity GetEntity(Guid entityId, string entityType)
        {
            if (entityType == null)
            {
                return null;
            }

            var entityTypeInfo = EntityTypeRegistry.Instance.GetEntityTypeByCodeName(entityType);
            if (entityTypeInfo == null)
            {
                return null;
            }

            if (entityTypeInfo.StereoType == EntityStereotype.MasterEntity ||
                    entityTypeInfo.StereoType == EntityStereotype.MasterEntityWithSubtypes)
            {
                var masterEntityRepository = (IMasterEntityRepository<IMasterEntity>) NinjectKernel.Instance.Get(entityTypeInfo.RepositoryType);
                return masterEntityRepository.GetById(entityId);
            }
            else
            {
                var documentRepository = (IDocumentRepository<IDocument>) NinjectKernel.Instance.Get(entityTypeInfo.RepositoryType);
                return documentRepository.GetById(entityId);
            }
        }
    }
}
