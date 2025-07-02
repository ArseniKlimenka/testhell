using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Integration;
using Adacta.AdInsure.Framework.Core.Domain.Integration.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Integration.Sinks;
using Adacta.AdInsure.Framework.Core.Domain.Notifications.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Notifications.Interfaces;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.Framework.Core.Settings.GeneralSettings;
using Adacta.AdInsure.RGSL.Framework.API.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Framework.Domain.Integration.Sinks
{
    public class RGSLNotificationSinkExecutor : NotificationSinkExecutor
    {
        private readonly ILogger _logger;
        private readonly INotificationService _notificationService;

        public RGSLNotificationSinkExecutor(INotificationService notificationService, IOptionsMonitor<GeneralSettings> generalSettings)
            : base(notificationService, generalSettings)
        {
            _logger = LogManagerAccessor.GetLogger("IntegrationRouteLogger");
            _notificationService = notificationService;
        }

        protected override Task<JsonObject> ProcessMappingResultAsync(SinkExecutionRequest request, JsonObject mappingResult, ExecutionContext context)

        {
            var dto = new NotificationDataDto();

            if (mappingResult.ParsedJson.ContainsKey("dataContext"))
            {
                dto = JsonConvert.DeserializeObject<NotificationDataDto>(mappingResult.ToString());
            }
            else
            {
                var extendedMappingResult = (JObject) mappingResult.ParsedJson.DeepClone();

                if (!extendedMappingResult.ContainsKey("entityType"))
                {
                    extendedMappingResult.Add("entityType", context.ExecutionInput.ParsedJson["entityType"]);
                }

                if (!extendedMappingResult.ContainsKey("recordId"))
                {
                    extendedMappingResult.Add("recordId", context.ExecutionInput.ParsedJson["id"]);
                }

                dto = JsonConvert.DeserializeObject<NotificationDataDto>(extendedMappingResult.ToString());
            }

            var notificationRequest = ConvertDtoToRequest(request.SinkConfiguration.Notification, dto);
            _logger.LogInformation("Creating notification.");

            if (_logger.IsEnabled(LogLevel.Trace))
            {
                _logger.LogTrace("Create notification request: {0}", JsonConvert.SerializeObject(request));
            }

            JsonObject result = new JsonObject();

            bool throwOnError = false;

            if (mappingResult.ParsedJson.ContainsKey("throwOnError"))
            {
                throwOnError = mappingResult.ParsedJson.GetBool("throwOnError", false);
            }

            try
            {
                var response = _notificationService.CreateNotification(notificationRequest);
                var resultObj = new NotificationResult { ChannelResult = response.ChannelResponse.Result };
                var serializerSettings = new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                result = new JsonObject(JsonConvert.SerializeObject(resultObj, serializerSettings));

            }
            catch (BusinessException be)
            {
                if (throwOnError)
                {
                    var errorMessage = $"A terminal exception {be.Code} - {be.Message} was caught. Exception has not been handled";
                    _logger.LogError(be, errorMessage);

                    throw;
                }
                else
                {
                    var errorMessage = $"A terminal exception {be.Code} - {be.Message} was caught. Exception was handled.";
                    _logger.LogError(be, errorMessage);
                }
            }

            return Task.FromResult(result);
        }

        private CreateNotificationRequest ConvertDtoToRequest(string notificationName, NotificationDataDto dto)
        {
            var request = new CreateNotificationRequest
            {
                RecordId = dto.RecordId,
                EntityType = dto.EntityType,
                NotificationName = notificationName
            };

            if (dto.Recipients != null)
            {
                request.Recipients = new NotificationRecipient();
                request.Recipients.Users = dto.Recipients.Users;
                request.Recipients.UserIds = dto.Recipients.UserIds?.Select(id => Guid.Parse(id)).ToList();
                request.Recipients.UserGroupCodes = dto.Recipients.UserGroupCodes;
                request.Recipients.ContactInformation = dto.Recipients.ContactInformation;
            }

            if (dto.DataContext != null && !JsonObject.IsNullOrEmpty(dto.DataContext))
            {
                request.DataContext = dto.DataContext;
            }

            if (dto.Attachments != null && !JsonObject.IsNullOrEmpty(dto.Attachments))
            {
                request.Attachments = dto.Attachments.ParsedJArray.ToObject<List<AttachmentDto>>();
            }

            if (dto.Priority != null)
            {
                request.Priority = dto.Priority;
            }

            if (dto.Options != null)
            {
                request.Options = dto.Options;
            }

            if (dto.Channel != null)
            {
                request.Channel = dto.Channel;
            }

            if (dto.Sender != null)
            {
                request.Sender = dto.Sender;
            }

            return request;
        }
    }
}
