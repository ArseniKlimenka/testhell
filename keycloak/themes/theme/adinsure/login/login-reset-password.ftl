<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
    <#elseif section = "form">
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post">
            <img src="${url.resourcesPath}/img/adinsureLogo.png">
                <#if realm.duplicateEmailsAllowed>
                    <div class="form-group">
                        <div class="text-center">${msg("emailInstructionUsername")}</div>
                    </div>
                <#else>
                    <div class="form-group">
                        <div class="text-center">${msg("emailInstruction")}</div>
                    </div>
                </#if>
            <div class="form-group position-relative">
                <input type="text" id="username" name="username" placeholder="${msg("usernameOrEmail")}" class="${properties.kcInputClass!} form-control" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                <#if messagesPerField.existsError('username')>
                    <span id="input-error-username" class="${properties.kcInputErrorMessageClass!} error-message d-block h-25 text-center" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                    </span>
                </#if>
                <div class="reset-password"><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></div>
            </div>
            <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} button-form" type="submit" value="${msg("doSubmit")}"/>
            </div>
            <#elseif section = "info" >
        </form>
    </#if>
</@layout.registrationLayout>
