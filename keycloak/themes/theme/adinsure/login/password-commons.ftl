<#macro logoutOtherSessions>
    <div id="kc-form-options" class="${properties.kcFormOptionsClass!} form-group checkbox-form">
        <div class="${properties.kcFormOptionsWrapperClass!}">
            <div class="checkbox form-check">
			<input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked class="form-check-input">
                <label class="form-check-label">
                    ${msg("logoutOtherSessions")}
                </label>
            </div>
        </div>
    </div>
</#macro>