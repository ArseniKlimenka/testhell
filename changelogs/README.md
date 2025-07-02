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

## Release Notes (changelog)

Release notes are created, released and maintained using scripts and markdown files in `changelogs` directory and `CHANGELOG.md` file. Creation of new change log can be done using OPS CLI.
