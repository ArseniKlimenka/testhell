<#import "template.ftl" as layout>
<#import "user-profile-commons.ftl" as userProfileCommons>
<#import "register-commons.ftl" as registerCommons>
<@layout.registrationLayout displayMessage=messagesPerField.exists('global') displayRequiredFields=true; section>
    <#if section = "header">
    <#elseif section = "form">
	<form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
			<img src="${url.resourcesPath}/img/adinsureLogo.png">
			<@userProfileCommons.userProfileFormFields; callback, attribute>
				<#if callback = "afterField">
				<#-- render password fields just under the username or email (if used as username) -->
					<#if passwordRequired?? && (attribute.name == 'username' || (attribute.name == 'email' && realm.registrationEmailAsUsername))>
						<div class="${properties.kcInputGroup!} form-group d-flex justify-center flex-wrap-wrap" dir="ltr">
									<input type="password" id="password" class="${properties.kcInputClass!} form-control m-0" name="password"
										autocomplete="new-password" placeholder="${msg("password")} *"
										aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
									/>
									<button class="${properties.kcFormPasswordVisibilityButtonClass!} button-password" type="button" aria-label="${msg('showPassword')}"
											aria-controls="password"  data-password-toggle
											data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
											data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
										<i class="fas fa-eye-slash" aria-hidden="true"></i>
									</button>
									<#if messagesPerField.existsError('password')>
									<span id="input-error-password" class="${properties.kcInputErrorMessageClass!} error-message" aria-live="polite">
										${kcSanitize(messagesPerField.get('password'))?no_esc}
									</span>
								</#if>
								</div>
								<div class="${properties.kcInputGroup!} form-group d-flex justify-center flex-wrap-wrap" dir="ltr">
									<input type="password" id="password-confirm" class="${properties.kcInputClass!} form-control m-0"
										name="password-confirm" placeholder="${msg("passwordConfirm")} *"
										aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
									/>
									<button class="${properties.kcFormPasswordVisibilityButtonClass!} button-password" type="button" aria-label="${msg('showPassword')}"
											aria-controls="password-confirm"  data-password-toggle
											data-icon-show="${properties.kcFormPasswordVisibilityIconHide!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
											data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
										<i class="fas fa-eye-slash" aria-hidden="true"></i>
									</button>
									<#if messagesPerField.existsError('password-confirm')>
										<span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!} error-message" aria-live="polite">
											${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
										</span>
									</#if>
								</div>
					</#if>
				</#if>
			</@userProfileCommons.userProfileFormFields>

			<@registerCommons.termsAcceptance/>
			<div id="kc-form-options" class="${properties.kcFormOptionsClass!} position-relative h-25">
				<div class="${properties.kcFormOptionsWrapperClass!} reset-password t-25">
					<span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
				</div>
			</div>
			<#if recaptchaRequired?? && (recaptchaVisible!false)>
				<div class="form-group">
					<div class="${properties.kcInputWrapperClass!}">
						<div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}" data-action="${recaptchaAction}"></div>
					</div>
				</div>
			</#if>

			<div class="${properties.kcFormGroupClass!}">

				<#if recaptchaRequired?? && !(recaptchaVisible!false)>
					<script>
						function onSubmitRecaptcha(token) {
							document.getElementById("kc-register-form").submit();
						}
					</script>
					<div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
						<button class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} g-recaptcha button-form" 
							data-sitekey="${recaptchaSiteKey}" data-callback='onSubmitRecaptcha' data-action='${recaptchaAction}' type="submit">
							${msg("doRegister")}
						</button>
					</div>
				<#else>
					<div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
						<input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} button-form" type="submit" value="${msg("doRegister")}"/>
					</div>
				</#if>
			</div>
		</form>
        <script type="module" src="${url.resourcesPath}/js/password-show.js"></script>
    </#if>
</@layout.registrationLayout>