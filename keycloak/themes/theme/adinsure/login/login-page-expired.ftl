<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("pageExpiredTitle")}
    <#elseif section = "form">
    <form id="kc-register-form" action="${url.loginAction}" method="post">
		<img src="${url.resourcesPath}/img/adinsureLogo.png">
		<div class="form-group">
			<p id="instruction1" class="instruction text-center">
				${msg("pageExpiredMsg1")} <a id="loginRestartLink" href="${url.loginRestartFlowUrl}">${msg("doClickHere")}</a> .<br/>
				${msg("pageExpiredMsg2")} <a id="loginContinueLink" href="${url.loginAction}">${msg("doClickHere")}</a> .
			</p>
		</div>
	</form>
    </#if>
</@layout.registrationLayout>