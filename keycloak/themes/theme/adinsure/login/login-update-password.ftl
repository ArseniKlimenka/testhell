<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
    <#elseif section = "form">
    <form id="kc-passwd-update-form" class="${properties.kcFormClass!} reset-password-form" action="${url.loginAction}" method="post">
        <img src="${url.resourcesPath}/img/adinsureLogo.png">
        <div>
            <p>${msg('passwordRequrements')}</p>
            <ul>
                <li>${msg('passwordRequrement1')};</li>
                <li>${msg('passwordRequrement2')};</li>
                <li>${msg('passwordRequrement3')};</li>
                <li>${msg('passwordRequrement4')}.</li>
            </ul>
            <p>${msg('passwordAddRequrements')}</p>
            <ul>
                <li>${msg('passwordAddRequrement1')};</li>
                <li>${msg('passwordAddRequrement2')};</li>
                <li>${msg('passwordAddRequrement3')}.</li>
            </ul>
        </div>

        <div class="${properties.kcInputWrapperClass!} form-group d-flex justify-center flex-wrap-wrap">
            <input type="password" id="password" name="password-new" class="${properties.kcInputClass!} form-control m-0"
                autofocus autocomplete="new-password" placeholder="${msg("updatePasswordTitle")}"
                aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
            />
            <button class="${properties.kcFormPasswordVisibilityButtonClass!} button-password" type="button" aria-label="${msg('showPassword')}"
                                    aria-controls="password"  data-password-toggle
                                    data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                    data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                                <i class="fas fa-eye-slash" aria-hidden="true"></i>
                            </button>
        </div>

        <div class="${properties.kcInputWrapperClass!} form-group d-flex justify-center flex-wrap-wrap">
            <input type="password" id="password-confirm" name="password-confirm"
                class="${properties.kcInputClass!} form-control m-0"
                autocomplete="new-password" placeholder="${msg("passwordConfirm")}"
                aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
            />
            <button class="${properties.kcFormPasswordVisibilityButtonClass!} button-password" type="button" aria-label="${msg('showPassword')}"
                                    aria-controls="password-confirm"  data-password-toggle
                                    data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                    data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                                <i class="fas fa-eye-slash" aria-hidden="true"></i>
                            </button>
        </div>

        <div class="${properties.kcFormOptionsWrapperClass!} form-group checkbox-form">
            <#if isAppInitiatedAction??>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked>
                    <label class="form-check-label"> ${msg("logoutOtherSessions")}</label>
                </div>
            </#if>
        </div>

        <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
            <#if isAppInitiatedAction??>
                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!} button-form" type="submit" value="${msg("doSubmit")}" />
                <button class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!} button-form" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
            <#else>
                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} button-form" type="submit" value="${msg("doSubmit")}" />
            </#if>
        </div>
    </form>
        <#if messagesPerField.existsError('password')>
            <div id="input-error-password" class="alert alert-danger" aria-live="polite">
                <span>${kcSanitize(messagesPerField.get('password'))?no_esc}</span>
            </div>
        </#if>
        <#if messagesPerField.existsError('password-confirm')>
            <div id="input-error-password-confirm" class="alert alert-danger" aria-live="polite">
                <span>${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}</span>
            </div>
        </#if>
        <script type="module" src="${url.resourcesPath}/js/password-show.js"></script>
        </#if>
</@layout.registrationLayout>