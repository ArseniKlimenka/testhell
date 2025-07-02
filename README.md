# Rgsl repository

rgsl repository is a template that accelerates the creation of a new AdInsure implementation repository. It describes and guides how to prepare and structure implementation repository from scratch. It includes basic components and scripts that are enough to start working with new implementation repository.

## Staging that we are using

- Staging is accessible at https://rgsl-dev.adacta-fintech.com/dashboard
- ES at http://10.55.80.44:9200/
- DB at Server=tcp:adinsure-ace.database.windows.net;Database=rgsldev_adinsure;User ID=rgsldev;Password=Rf0tydkLTDjzvE7F;Trusted_Connection=False;Encrypt=True;

For local environment use [docker-compose](docker-compose.yml) and select `local` environment in Studio.

### Staging Environments

[staging-environments](./docs/general/staging-environments.md)

## Contents of a template

rgsl repository is ready to work out of the box with some basic CI/CD and docker support. It consists out of a simple template file and scripts that needs to modified with actual implementation. Template contents:

* **.build** - Contains scripts and tools

* **configuration** - Contains business configurations for implementation of AdInsure

* **database** - Contains all implementation database scripts to be executed on AdInsure database (both Schema and Data scripts)

* **docker** - defines build files for building docker images for AdInsure (web application)

* **docs** - documentation related to this implementation of AdInsure

* **extensions** - Collection of JavaScript extensions for server-side, printout assets and queries

* **plugins** - Contains back-end Visual studio solution for extending platform with implementation-specific functionality

* **changelogs** - Contains unreleased changelog .md files
## Required components - Platform configuration

Before you getting started to work with implementation repository first follow the instructions on configuring [AdInsure](https://git.adacta-fintech.com/AdInsure/mono/tree/master)

After your environment is configured you can clone mono repository and build platform environment:

1. Open PowerShell as Administrator, clone mono repository `git clone https://git.adacta-fintech.com/AdInsure/mono.git` and then go to you checkout directory (ex. `cd C:\Git\AdInsure\Core`)
1. Build AdInsure with `.\build.ps1 -Build` (This will setup IIS Web Server)

## Getting Started - Implementation

Make sure you have everything installed and configured before starting with development.

1. Open PowerShell as Administrator, clone implementation repository and then navigate to your checkout directory (ex. `cd D:\Git\AdInsure\Implementation`)
1. Restore database with implementation scripts `.\build.ps1 -Restore -ExecuteScripts -DatabaseType MSSQL` or `.\build.ps1 -Restore -ExecuteScripts -DatabaseType Oracle`
1. Build plugins with `.\build.ps1 -Build`
1. Build configurations with:
    * `yarn install --update-checksums`
    * `yarn run lint`
1. Set configuration:
    * change `AdInsure:Settings:Extensions:FileSystemRootFolder` in server `ImplementationConfiguration.config` to point to your extensions folder (ex. `D:\Git\AdInsure\Implementation\extensions`)
1. Publish **configuration** command line with:
    * `yarn run publish-workspace`

## Docker

### Before you begin

In order to pull docker images from azure container register you need to login into azure container registry using `Azure CLI`. If you don't have command line tool, you can download it from [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

First login into Azure using your company email (name.surname@adacta-fintech.com)

```code
    az login
```

Then you can login into `adinsure azure container registry`

```code
    az acr login -n adinsure
```

### Next steps

Docker containers that are based on platform images enables easy bootstrap of local environment for developing configurations or testing functionality. This repository provides `docker-compose.yml` so you can setup the whole environment with single call to `docker-compose.exe`.

> You can modify `docker-compose.yml` locally to conform with your needs (defaults should cover 99% of all cases) but please make sure you don't accidentally commit the changes.

For starting your local environment run `docker-compose.exe up -d`. When you don't need the environment any more you can destroy it with `docker-compose.exe down [--rmi all] [-v]`. The additional switches enable you to also delete all images that were pulled by `docker-compose` (`--rmi` switch) and to delete all created volumes (`-v` switch).

If you have a running environment and just want to update to latest version, first shutdown the environment with `docker-compose.exe down` and then execute `docker-compose.exe pull`.

> Note that `pull` will not override existing image. It will pull the new one and leave the old one dangling. If you execute this often (instead of `down --rmi all`) make sure you also execute `docker image prune` regularly to clear all dangling images.

You can read more about `docker-compose` CLI on their [official page](https://docs.docker.com/compose/reference/overview/). If you need to use more advanced features of AdInsure Docker containers please consult with our [Sandbox environment](https://docs.adinsure.com/administration/using-docker/) documentation.

## OPS CLI

The OPS command-line interface (OPS CLI) is a in-house command line development tool for working with AdInsure. It provides variety of actions and command to help you work with AdInsure in development time (generating release notes, generating unique database script names, etc.). Installation package of OPS CLI is done by [MSI](https://adinsure.blob.core.windows.net/ops-cli/win/ops-v2.0.2-x64.exe). This will add new record into your PATH so you will be required to re-open your shell sessions (or VS Code). Once installation is complete update OPS CLI to latest version by using command:

```powershell
ops update
```

For complete list of actions you can open the help for OPS CLI.

```powershell
ops help
```

More information about OPS CLI can be found on [NPM registry](https://dev.azure.com/adacta-fintech/adinsure/_packaging?_a=package&feed=adacta-fintech&package=adinsure-ops-cli&protocolType=Npm&version=2.0.2)

## Generating database scripts

OPS CLI command `sql` creates new `.sql` files in correct location and sets a unique name for each script. Script supports creating both Schema (e.g.: `database\[dbms]\Schema`) and Data (e.g: `database\[dbms]\Data\[module]`) scripts but not both at the same time. If you choose Data script, `module` also needs to be specified.

### Examples

Following example will create Data shared SQL script for basic:

```powershell
C:\_git\adinsure> ops sql data shared -b
```

#### Example 1: Create a schema script

```powershell
C:\_git\adinsure> ops sql schema
```

#### Example 2: Create a Data script for Core module

```powershell
C:\_git\adinsure> ops sql data core
```

#### Example 3: Create a Data script for Core module on Basic

```powershell
C:\_git\adinsure> ops sql data core -b
```

## Release Notes (changelog)

Release notes are created, released and maintained using scripts and markdown files in `changelogs` directory and `CHANGELOG.md` file. Creation of new change log can be done using OPS CLI.

### Example 1: Create a new feature change log for your implementation

```powershell
C:\_git\adinsure> ops log app LJADIRD-1 -t feature
```

### Release flow

Release procedures and versionsing is not enforced and it is up to implementation to decide on its own approach. For releases of AdInsure platform we are following GitLab Flow. For more information about GitLab flow please address to [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
