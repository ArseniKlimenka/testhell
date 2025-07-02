using Adacta.AdInsure.Framework.Core.Domain.Notifications.DTO;
using Adacta.AdInsure.Framework.Core.Domain.Notifications.Interfaces;
using Adacta.AdInsure.Framework.Core.Domain.Notifications.Models;
using Adacta.AdInsure.Framework.Core.Domain.Notifications.Settings;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Infrastructure.Extensions;
using Adacta.AdInsure.Framework.Core.Infrastructure.Notifications;
using Adacta.AdInsure.RGSL.Framework.Infrastructure.Utils;
using MailKit.Security;
using MimeKit;
using MimeKit.Utils;
using MimeTypes;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Notifications
{
    public class RGSLEmailClient : IEmailClient
    {

        private readonly ISmtpClientFactory _smtpClientFactory;

        public RGSLEmailClient(ISmtpClientFactory clientFactory)
        {
            _smtpClientFactory = clientFactory;
        }

        public EmailSendingResult Send(EmailMessage email, EmailChannelSettings settings)
        {
            var mailDto = PrepareEmail(email);
            var messageId = MimeUtils.GenerateMessageId();
            mailDto.MessageId = messageId;

            using var client = _smtpClientFactory.CreateClient();

            // We are using StartTls option because that is what System.Net.Mail.SmtpClient used
            var secureSocketOptions = settings.UseSSL ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto;

            client.CheckCertificateRevocation = false;

            client.Connect(settings.Host, settings.Port, secureSocketOptions);

            ICredentials credentials = null;

            // we will attempt authentication only when username and password are present otherwise we don't know
            // if we should authenticate or no
            if (!string.IsNullOrEmpty(settings.Username) && !string.IsNullOrEmpty(settings.Password))
            {
                if (!string.IsNullOrEmpty(settings.AuthenticationType))
                {
                    credentials = new NetworkCredential(settings.Username, settings.Password, settings.Domain ?? string.Empty);

                }
                else if (!string.IsNullOrEmpty(settings.Domain))
                {
                    credentials = new NetworkCredential(settings.Username, settings.Password, settings.Domain);
                }
                else if (string.IsNullOrEmpty(settings.Domain))
                {
                    credentials = new NetworkCredential(settings.Username, settings.Password);
                }

                client.Authenticate(credentials);
            }

            client.Send(mailDto);
            mailDto.Dispose();
            client.Disconnect(true);

            var result = new EmailSendingResult();
            result.MessageId = messageId;

            return result;
        }

        public MimeMessage PrepareEmail(EmailMessage email)
        {
            var emailDto = new MimeMessage();
            emailDto.From.Add(new MailboxAddress(email.Sender.Name, email.Sender.Email));

            foreach (var mail in email.ContactData)
            {
                emailDto.To.Add(new MailboxAddress("", mail.Email));
            }

            emailDto.Subject = email.SubjectBody;
            var bodyBuilder = new BodyBuilder();
            var markupBuilder = new StringBuilder(email.ContentBody);

            if (email.Attachments != null && email.Attachments.Any())
            {
                foreach (var attachmentData in email.Attachments)
                {
                    ExceptionUtils.ThrowIfNull(attachmentData?.MediaType, EmailMessageExtensions.NotificationAttachmentMissingMediaTypeErrorCode, attachmentData?.Name);

                    var mimeType = attachmentData.MediaType;

                    // we assume name already has extension included
                    var filename = attachmentData.Name;

                    // just to be sure, we check if extension is included and append it if it's missing
                    // we can't just append an extension (might happen we already have one and we would double it)
                    if (!Path.HasExtension(filename))
                    {
                        filename = string.Concat(attachmentData.Name, MimeTypeMap.GetExtension(attachmentData.MediaType));
                    }

                    var isContainedInBody = email.ContentBody.Contains(filename, StringComparison.InvariantCulture);
                    var contentType = MimeKit.ContentType.Parse(mimeType);

                    if (isContainedInBody && ImageFormatResolver.IsImageFormatSupported(attachmentData.Content))
                    {
                        PrepareBodyImageData(filename, bodyBuilder, attachmentData.Content, contentType, email, markupBuilder);
                    }
                    else
                    {
                        bodyBuilder.Attachments.Add(filename, attachmentData.Content, contentType);
                    }             
                }
            }
            
            bodyBuilder.HtmlBody = email.ContentBody;
            emailDto.Body = bodyBuilder.ToMessageBody();

            return emailDto;
        }

        private void PrepareBodyImageData(string fileName, BodyBuilder builder, byte[] content, MimeKit.ContentType contentType, EmailMessage email, StringBuilder markupBuilder)
        {
            var asd = builder.LinkedResources.Add(fileName, content, contentType);
            asd.IsAttachment = false;
            asd.ContentId = fileName;

            var formattedImageName = fileName.Replace(".", "\\.", StringComparison.InvariantCulture);

            foreach (Match item in Regex.Matches(email.ContentBody, $"<img.+?{formattedImageName}.+?>"))
            {
                var matchedString = item.Value;

                if (!matchedString.Contains("srcset", StringComparison.InvariantCulture))
                {
                    string base64ImageRepresentation = Convert.ToBase64String(content);
                    markupBuilder.Insert(item.Index + (matchedString.Length - 1), $" srcset=\"{base64ImageRepresentation}\"");
                }
            }
        }
    }
}
