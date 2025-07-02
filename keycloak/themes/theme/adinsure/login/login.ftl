<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=false; section>
    <#if section = "title">
        ${msg("loginTitle",(realm.displayName!''))}
    <#elseif section = "form">
        <#if realm.password>
            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction?keep_after('^[^#]*?://.*?[^/]*', 'r')}" method="post">
                <img src="${url.resourcesPath}/img/adinsureLogo.png">
                <div class="form-group">
                        <#if usernameEditDisabled??>
                            <input tabindex="1" id="username" placeholder="${msg("username")}" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>"/>
                        <#else>
                            <input tabindex="1" id="username" placeholder="${msg("username")}" class="${properties.kcInputClass!} form-control" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" />
                        </#if>
                    </div>

                    <div class="form-group d-flex justify-center flex-wrap-wrap position-relative">
                        <input tabindex="2" id="password" placeholder="Password" class="${properties.kcInputClass!} form-control m-0" name="password" type="password" autocomplete="off" placeholder="${msg("password")}" aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"/>
                        <button class="${properties.kcFormPasswordVisibilityButtonClass!} button-password" type="button" aria-label="${msg('showPassword')}"
                                    aria-controls="password"  data-password-toggle
                                    data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                    data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                                <i class="fas fa-eye-slash" aria-hidden="true"></i>
                            </button>
                        <#if realm.resetPasswordAllowed>
                            <div class="reset-password">
                            <a href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                            <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                            <span class="float-right">${msg("noAccount")} <a tabindex="8"
                                                                    href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                            </#if>
                            </div>
                        </#if>
                    </div>
                    <div id="kc-form-options" class="form-group checkbox-form">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="form-check">
                            <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" class="form-check-input" name="rememberMe" type="checkbox" tabindex="3" checked>
                                    <#else>
                                        <input tabindex="3" id="rememberMe" class="form-check-input" name="rememberMe" type="checkbox" tabindex="3">
                                    </#if>
                                <label class="form-check-label" for="RememberLogin">${msg("rememberMe")}</label>
                            </div>
                        </#if>
                    </div>

                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} buttons-form">
                        <input tabindex="4" class="${properties.kcButtonClass!} button-form" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>  
                    </div>
                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} mb-0">
                        <#if realm.password && social.providers??>
                            <div class="border-top">
                                <#list social.providers as p>
                                    <div>
                                        <a href="${p.loginUrl}" id="zocial-${p.alias}" class="btn adinsureBgColor button-form">
                                            <#if p.iconClasses?has_content>
                                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${msg("doLogIn")} With ${p.displayName}</span>
                                            <#else>
                                                <i class="fas fa-cube"></i>
                                                <span class="${properties.kcFormSocialAccountNameClass!}">${msg("doLogIn")} With ${p.displayName}</span>
                                            </#if>
                                        </a>
                                    </div>
                                </#list>
                            </div>
                        </#if>
                    </div>
            </form>
            <#if message?has_content>
                <div id="login-alert" class="alert alert-danger">
                    <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                </div>
            </#if>
        </#if>
        <script type="module" src="${url.resourcesPath}/js/password-show.js"></script>
    </#if>
</@layout.registrationLayout>