<#import "template.ftl" as layout>
<#import "password-commons.ftl" as passwordCommons>
<@layout.registrationLayout displayRequiredFields=false displayMessage=!messagesPerField.existsError('totp','userLabel'); section>

    <#if section = "header">
    <#elseif section = "form">
		<form action="${url.loginAction}" class="${properties.kcFormClass!}" id="kc-totp-settings-form" method="post">
			<img src="${url.resourcesPath}/img/adinsureLogo.png">
			<ol id="kc-totp-settings" class="authenticator">
				<li>
					<p>${msg("loginTotpStep1")}</p>

					<ul id="kc-totp-supported-apps">
						<#list totp.supportedApplications as app>
							<li>${msg(app)}</li>
						</#list>
					</ul>
				</li>

				<#if mode?? && mode = "manual">
					<li>
						<p>${msg("loginTotpManualStep2")}</p>
						<p><span id="kc-totp-secret-key">${totp.totpSecretEncoded}</span></p>
						<p><a href="${totp.qrUrl}" id="mode-barcode">${msg("loginTotpScanBarcode")}</a></p>
					</li>
					<li>
						<p>${msg("loginTotpManualStep3")}</p>
						<p>
						<ul>
							<li id="kc-totp-type">${msg("loginTotpType")}: ${msg("loginTotp." + totp.policy.type)}</li>
							<li id="kc-totp-algorithm">${msg("loginTotpAlgorithm")}: ${totp.policy.getAlgorithmKey()}</li>
							<li id="kc-totp-digits">${msg("loginTotpDigits")}: ${totp.policy.digits}</li>
							<#if totp.policy.type = "totp">
								<li id="kc-totp-period">${msg("loginTotpInterval")}: ${totp.policy.period}</li>
							<#elseif totp.policy.type = "hotp">
								<li id="kc-totp-counter">${msg("loginTotpCounter")}: ${totp.policy.initialCounter}</li>
							</#if>
						</ul>
						</p>
					</li>
				<#else>
					<li>
						<p>${msg("loginTotpStep2")}</p>
						<p class="text-center">
						<img id="kc-totp-secret-qr-code" src="data:image/png;base64, ${totp.totpSecretQrCode}" alt="Figure: Barcode" class="qr-code">
						<a href="${totp.manualUrl}" id="mode-manual">${msg("loginTotpUnableToScan")}</a>
						</p>
					</li>
				</#if>
				<li>
					<p>${msg("loginTotpStep3")}</p>
					<p>${msg("loginTotpStep3DeviceName")}</p>
				</li>
			</ol>
			<div class="${properties.kcFormGroupClass!}">
				<div class="${properties.kcInputWrapperClass!} form-group">
					<input type="text" placeholder="${msg("authenticatorCode")} *" id="totp" name="totp" autocomplete="off" class="${properties.kcInputClass!} form-control"
						aria-invalid="<#if messagesPerField.existsError('totp')>true</#if>"
						dir="ltr"
					/>

					<#if messagesPerField.existsError('totp')>
						<span id="input-error-otp-code" class="${properties.kcInputErrorMessageClass!} error-message d-block text-center" aria-live="polite">
							${kcSanitize(messagesPerField.get('totp'))?no_esc}
						</span>
					</#if>

				</div>
				<input type="hidden" id="totpSecret" name="totpSecret" value="${totp.totpSecret}" />
				<#if mode??><input type="hidden" id="mode" name="mode" value="${mode}"/></#if>
			</div>

			<div class="${properties.kcFormGroupClass!} form-group">

				<div class="${properties.kcInputWrapperClass!}">
					<input type="text" class="${properties.kcInputClass!} form-control" placeholder="${msg("loginTotpDeviceName")}" id="userLabel" name="userLabel" autocomplete="off"
						aria-invalid="<#if messagesPerField.existsError('userLabel')>true</#if>" dir="ltr"
					/>

					<#if messagesPerField.existsError('userLabel')>
						<span id="input-error-otp-label" class="${properties.kcInputErrorMessageClass!} error-message d-block text-center" aria-live="polite">
							${kcSanitize(messagesPerField.get('userLabel'))?no_esc}
						</span>
					</#if>
				</div>
			</div>

			<div class="${properties.kcFormGroupClass!}">
				<@passwordCommons.logoutOtherSessions/>
			</div>

			<#if isAppInitiatedAction??>
			<div class="${properties.kcFormButtonsClass!} buttons-form">
				<input type="submit"
					class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!} button-form"
					id="saveTOTPBtn" value="${msg("doSubmit")}"
				/>
				<button type="submit"
						class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!} ${properties.kcButtonLargeClass!} button-form"
						id="cancelTOTPBtn" name="cancel-aia" value="true" />${msg("doCancel")}
				</button>
			</div>
			<#else>
			<div class="${properties.kcFormButtonsClass!} buttons-form">
				<input type="submit"
					class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} button-form"
					id="saveTOTPBtn" value="${msg("doSubmit")}"
				/>
				</div>
			</#if>
		</form>
    </#if>
</@layout.registrationLayout>