# **Upgrade/Deploy Scheduler**

1. Download Scheduler installation archive from release notes.

2. Create a backup of folder where Scheduler is currently installed. We will need it to set configs.

3. Extract archive and run in terminal `setup.ps1`. Proceed when asked for confirmation.

4. Result of installation:
    * Scheduler will be installed to the same folder where AdInsure, in folder `scheduler` for example: `D:\AdInsure\scheduler`.
    * New IIS Website `AdInsure.Scheduler` and default http binding on port `60005`.
    * New application pool named `AdInsure.SchedulerAppPool` if it doesn't exist yet.<br><br>

5. In IIS open website `AdInsure.Scheduler` and open `Advanced settings`. Set property `Preload enabled` to `True`.

6. Configure Scheduler website bindings:
    * Before, Scheduler should be accessible on `localhost:60005`.
    * If `localhost:60005` is enough, we will refer to it as `[SCHEDULER_URL]`. If additional bindings are required and Scheduler should be available under separate URL, configure additional bindings as we have done for AdInsure Server, Client and IdentityServer.<br><br>

7. In IIS open website `AdInsure.Scheduler` and link it to old application pool which was already there. If new application pool `AdInsure.SchedulerAppPool` is not in use, delete it.

8. Modify AdInsure Server config.
    * Open `server/conf/environmentVariables`. In key `schedulerBaseUrl` enter `[SCHEDULER_URL]`, e.g. `localhost:60005`<br><br>

9. Modify AdInsure IdentityServer config.
    * Open `identityServer/appsettings.json`. In `clients` section find client `scheduler-admin` and modify:
        * `RedirectUris` to `[SCHEDULER_URL]`, e.g. `localhost:60005`<br><br>

10. Modify Scheduler configs. Open folder `conf` where Scheduler is installed.
    1. Open file `databaseConfiguration.json` and check that connection string to AdInsure DB is correct.
    2. Open file `implSettings.json` and replace contents with:

```json
{
    "AdInsure": {
    "Api": {
        "Url": "[SERVER_URL]"
    },
    "Scheduler": {
        "OAuthIdentity": {
            "IdentityEndpointUrl": "[IDENTITY_URL]"
            }
        }
    },
    "Scheduler": {
        "Url": "[SCHEDULER_URL]"
    }
}
```

Insert 3 appropriate to the environment URLs instead of placeholders:

* `SERVER_URL` should be New AdInsure Server URL
* `IDENTITY_URL` should be new AdInsure IdentityServer URL
* `SCHEDULER_URL` should be new Scheduler URL
  
11.   Open file `NLog-impl.config` and copy contents inside:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<!-- This file will be included in ../NLog.config -->
<!--  Note: Attributes on the "nlog" element are ignored for this file, the ones of the main config will be used. -->
<extensions>
    <!--Will be used for importing directly to ES, and application insights-->
    <!--<add assembly="NLog.Targets.ElasticSearch"/>-->
    <!--<add assembly="Microsoft.ApplicationInsights.NLogTarget" />-->
</extensions>
<variable name="logRoot" value="D:\AdInsure\Logs\Scheduler" />
<variable name="logRootWithDate" value="${var:logRoot}\${date:format=yyyyMMdd}" />
<variable name="maxSize" value="104857600"/>
<variable name="maxFiles" value="20"/>
    
<targets>
    <target name="logfile" xsi:type="File" fileName="${logRootWithDate}/scheduler.log" />
    <target name="logconsole" xsi:type="Console" />
</targets>
    
<rules>
    <logger name="*" minlevel="Error" writeTo="logconsole" />
    <logger name="*" minlevel="Error" writeTo="logfile" />
</rules>
</nlog>
```

Set value of `logRoot` to the value from the old config file `ImplementationConfiguration.config` which was set in `Scheduler:Log:LogRoot`.

12.   After all config files are configured, start IIS application pool of AdInsure Scheduler and open the quartz website (for example `http://localhost:60005/quartz`) to see if Scheduler is up and running.
