<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        ${kcSanitize(msg("errorTitle"))?no_esc}
    <#elseif section = "form">
	<form>
		<img src="${url.resourcesPath}/img/adinsureLogo.png">
		<div id="kc-error-message" class="form-group position-relative">
			<p class="instruction paragraph text-center">${kcSanitize(message.summary)?no_esc}</p>
			<#if skipLink??>
			<#else>
				<#if client?? && client.baseUrl?has_content>
					<div class="reset-password text-center b-25">
						<a id="backToApplication" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a>
					</div>
				</#if>
			</#if>
		</div>
	</form>
    </#if>
</@layout.registrationLayout>