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

> Before proceeding you will need to install OPS CLI globally from Adacta NPM registry.

OPS CLI command `sql`creates new `.sql` files in correct location and sets a unique name for each script. Script supports creating both Schema (e.g.:`database\[dbms]\Schema`) and Data (e.g: `database\[dbms]\Data\[module]`) scripts but not both at the same time. If you choose Data script, `module` also needs to be specified.

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
## Creating custom base db-migrate for possibility to generate scripts

> Example for platform version 6.20.7

Build a new image from [mono repository](https://git.adacta-fintech.com/AdInsure/mono/-/tree/platform-v6.20.7/database) with the following command:

```
docker build --build-arg="dbup_version=0.15.4" -t db-migrate:6.20.7_dbup-0.15.4 -f ./Dockerfile.PLATFORM .
```

and push it as `registryru.adacta-fintech.ru/rgs-life/implementation/db-migrate:6.20.7_dbup-0.15.4`
