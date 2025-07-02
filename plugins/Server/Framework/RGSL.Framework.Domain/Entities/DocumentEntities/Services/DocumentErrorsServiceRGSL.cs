using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.AuditTrail.DTO;
using Adacta.AdInsure.Framework.Core.AuditTrail.Enums;
using Adacta.AdInsure.Framework.Core.AuditTrail.Interfaces;
using Adacta.AdInsure.Framework.Core.Authorization;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Errors;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.Services;
using Adacta.AdInsure.Framework.Core.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Entities.DocumentEntities.Services
{
    public class DocumentErrorsServiceRGSL: DocumentErrorsService, IDocumentErrors
    {
        private const string HeaderClientStateUrl = "Client-State-Url";

        private readonly IAuditLogger _auditLogger;

        protected IAuditLogger AuditLogger
        {
            get { return _auditLogger; }
        }

        public DocumentErrorsServiceRGSL(IAuditLogger auditLogger)
        {
            _auditLogger = auditLogger;
        }

        public new ForbiddenException ActorHasNoPermissionForState(string currentActorCode, DocumentState currentState)
        {
            LogAuditInfo();

            return DocumentErrorService.ActorHasNoPermissionForState(currentActorCode, currentState);
        }

        public new BusinessException UserHasNoAllowedActorsForState(string currentState)
        {
            LogAuditInfo();

            return DocumentErrorService.UserHasNoAllowedActorsForState(currentState);
        }

        public new NoDataFoundException DocumentWithIdDoesNotExist(string configurationCodeName, string version, string id)
        {
            LogAuditInfo();

            return DocumentErrorService.DocumentWithIdDoesNotExist(configurationCodeName, version, id);
        }

        public new NoDataFoundException DocumentWithNumberDoesNotExist(string number)
        {
            LogAuditInfo();

            return DocumentErrorService.DocumentWithNumberDoesNotExist(number);
        }

        public new ForbiddenException OperationNotAllowedForUser()
        {
            LogAuditInfo();

            return DocumentErrorService.OperationNotAllowedForUser();
        }

        public new BusinessException UpdateConstraintOperationNotAllowedForUser()
        {
            LogAuditInfo();

            return DocumentErrorService.UpdateConstraintOperationNotAllowedForUser();
        }

        public new ForbiddenException CurrentUserIsNotAllowedToAccessDocument(List<string> messages)
        {

            LogAuditInfo();

            if (messages?.Count > 0)
            {
                return new ForbiddenException(string.Join(", ", messages));
            }
            else
            {
                return DocumentErrorService.CurrentUserIsNotAllowedToAccessDocument();
            }
        }

        public new ForbiddenException TransitionNotAllowedForUser(string currentActorCode, string configurationCodeName, string version, string number, string transitionName)
        {
            LogAuditInfo();

            return DocumentErrorService.TransitionNotAllowedForUser(currentActorCode, configurationCodeName, version, number, transitionName);
        }

        public new ForbiddenException RelationNotAllowedForUser(string currentActorCode, string configurationCodeName, string version, string number, string relationName)
        {
            LogAuditInfo();

            return DocumentErrorService.RelationNotAllowedForUser(currentActorCode, configurationCodeName, version, number, relationName);
        }

        public new BusinessException DocumentWithGivenIdDoesNotExist(Guid id)
        {
            LogAuditInfo();

            return DocumentErrorService.DocumentWithGivenIdDoesNotExist(id);
        }

        public new BusinessException TransitionBlockedByGuards(string documentNumber, string transition, IEnumerable<ErrorDetail> errors)
        {
            LogAuditInfo();

            return DocumentErrorService.TransitionBlockedByGuards(documentNumber, transition, errors);
        }

        public new BusinessException OperationNotAllowedForUserAsActor(string user, string actor)
        {
            LogAuditInfo();

            return DocumentErrorService.OperationNotAllowedForUserAsActor(user, actor);
        }

        public new BusinessException RelationBlockedByGuards(string documentNumber, string relation, IEnumerable<ErrorDetail> errors)
        {
            LogAuditInfo();

            return DocumentErrorService.RelationBlockedByGuards(documentNumber, relation, errors);
        }

        public new BusinessException TransitionNotAllowedDueToExclusiveAssignment()
        {
            LogAuditInfo();

            return DocumentErrorService.TransitionNotAllowedDueToExclusiveAssignment();
        }

        public new BusinessException RelationNotAllowedDueToExclusiveAssignment()
        {
            LogAuditInfo();

            return DocumentErrorService.RelationNotAllowedDueToExclusiveAssignment();
        }

        private void LogAuditInfo()
        {
            var user = ApplicationContext.OriginatingUser;
            var (configurationCodeName, entityBusinessKey) = GetUrlParameters();

            _auditLogger.LogAuditInfo(new RequestAuditInfo
            {
                ConfigurationName = configurationCodeName,
                EntityBusinessKey = entityBusinessKey,
                ActionType = ActionTypeEnum.Read,
                PersonAuditInfo = new List<PersonAuditInfo>()
                {
                    new PersonAuditInfo()
                    {
                        PersonCode = user.UserProfile.PartyCode,
                        Roles = new HashSet<string>(user.UserProfile.ApplicationRoles),
                        AdditionalAttributes = new Dictionary<string, string>()
                        {
                            ["AccessDenied"] = DocumentErrorService.CurrentUserIsNotAllowedToAccessDocument().Message
                        }
                    }
                }
            });
        }

        private (string, string) GetUrlParameters()
        {
            var appContext = ApplicationContext.DataProvider.Current;
            var clientStateUrl = GetClientStateUrlFromRequestHeaders(appContext.RequestContext.Headers);

            string configurationCodeName = "";
            string entityBusinessKey = "";

            if (clientStateUrl != null)
            {
                var parameters = GetParametersFromUrl(clientStateUrl, ";");

                if (parameters.ContainsKey("configurationCodeName"))
                {
                    configurationCodeName = parameters["configurationCodeName"];
                }

                if (parameters.ContainsKey("documentNumber"))
                {
                    entityBusinessKey = parameters["documentNumber"];
                }
                else if (parameters.ContainsKey("code"))
                {
                    entityBusinessKey = parameters["code"];
                }
            }

            return (configurationCodeName, entityBusinessKey);
        }

        private string GetClientStateUrlFromRequestHeaders(IDictionary<string, string[]> headers)
        {
            if (headers != null && headers.ContainsKey(HeaderClientStateUrl))
            {
                var clientStateUrl = headers[HeaderClientStateUrl][0];

                if (!string.IsNullOrEmpty(clientStateUrl))
                {
                    return clientStateUrl;
                }
            }

            return null;
        }

        private Dictionary<string, string> GetParametersFromUrl(string url, string parametersSplitString)
        {
            if (url.Contains("?"))
            {
                url = url.Substring(0, url.IndexOf("?"));
            }

            var urlParts = url.Split(new string[] { parametersSplitString }, StringSplitOptions.RemoveEmptyEntries);

            return urlParts.Where(p => p.Contains('='))
                .Select(p =>
                {
                    var parameterParts = p.Split('=');

                    return new KeyValuePair<string, string>(parameterParts[0], UrlParameterUnescape(parameterParts[1]));
                })
                .ToDictionary(p => p.Key, p => p.Value);
        }

        private string UrlParameterUnescape(string parameterValue)
        {
            if (!string.IsNullOrEmpty(parameterValue))
            {
                return Uri.UnescapeDataString(parameterValue);
            }

            return parameterValue;
        }
    }
}
