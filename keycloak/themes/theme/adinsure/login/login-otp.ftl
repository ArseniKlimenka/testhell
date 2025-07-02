<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('totp'); section>
    <#if section="header">
        ${msg("doLogIn")}
    <#elseif section="form">
	<form id="kc-otp-login-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
		<img src="${url.resourcesPath}/img/adinsureLogo.png">
		<#if otpLogin.userOtpCredentials?size gt 1>
			<div class="${properties.kcFormGroupClass!}">
				<div class="${properties.kcInputWrapperClass!}">
					<#list otpLogin.userOtpCredentials as otpCredential>
						<input id="kc-otp-credential-${otpCredential?index}" class="${properties.kcLoginOTPListInputClass!}" type="radio" name="selectedCredentialId" value="${otpCredential.id}" <#if otpCredential.id == otpLogin.selectedCredentialId>checked="checked"</#if>>
						<label for="kc-otp-credential-${otpCredential?index}" class="${properties.kcLoginOTPListClass!}" tabindex="${otpCredential?index}">
							<span class="${properties.kcLoginOTPListItemHeaderClass!}">
								<span class="${properties.kcLoginOTPListItemIconBodyClass!}">
								<i class="${properties.kcLoginOTPListItemIconClass!}" aria-hidden="true"></i>
								</span>
								<span class="${properties.kcLoginOTPListItemTitleClass!}">${otpCredential.userLabel}</span>
							</span>
						</label>
					</#list>
				</div>
			</div>
		</#if>

		<div class="${properties.kcFormGroupClass!}">


		<div class="${properties.kcInputWrapperClass!} form-group">
			<input id="otp" name="otp" autocomplete="off" type="text" placeholder="${msg("loginOtpOneTime")}" class="${properties.kcInputClass!} form-control"
				autofocus aria-invalid="<#if messagesPerField.existsError('totp')>true</#if>"
				dir="ltr" />

			<#if messagesPerField.existsError('totp')>
				<span id="input-error-otp-code" class="${properties.kcInputErrorMessageClass!} error-message d-block text-center"
					aria-live="polite">
					${kcSanitize(messagesPerField.get('totp'))?no_esc}
				</span>
			</#if>
		</div>
	</div>

		<div class="${properties.kcFormGroupClass!}">
			<div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
				<div class="${properties.kcFormOptionsWrapperClass!}">
				</div>
			</div>

			<div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
				<input
					class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} button-form"
					name="login" id="kc-login" type="submit" value="${msg("doLogIn")}" />
			</div>
		</div>
	</form>
    </#if>
</@layout.registrationLayout>