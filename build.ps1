param(
    # Actions
    [Alias("h", "?")]
    [switch]$Help = $false,

    [switch]$Clean = $false,
    [switch]$Build = $false,

    [switch]$ExecuteScripts = $false,

    [switch]$Test = $false,
    [switch]$TestUnit = $false,

    # Database parameters
    [ValidateSet("MSSQL", "Oracle")]
    [string]$DatabaseType = "MSSQL",
    [string]$DatabaseHost = "localhost",
    [string]$DatabaseName = "ADINSURE_TEST",
    [string]$DatabaseUsername = "adinsure",
    [string]$DatabasePassword = "adinsure",
    [string]$DatabaseOracleSID = "XE",
    [string]$DatabaseOracleDomain = $null,
    [string]$DatabaseOracleSysPassword = "Oradoc_db1",

    # CI parameters
    [switch]$CI = $false,

    # Dependency versions
    [string]$platformVersion = (Get-Content ./PLATFORM_VERSION)
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = "Stop"

# Solution file name
$solutionFile = "RGSL"

# Set parameters
$root = "$PSScriptRoot"
$binDir = [io.path]::combine($root, "bin")

function Help {
    Write-Host ""
    Write-Host "Example usages:" -ForegroundColor "Cyan"
    Write-Host "  Get available commands:                                                                  " -NoNewline
    Write-Host " .\build.ps1" -ForegroundColor "DarkGray"
    Write-Host "  Run the default build step: " -NoNewline
    Write-Host " .\build.ps1 -Build" -ForegroundColor "DarkGray"
    Write-Host "  Run build without restarting IIS:                                                        " -NoNewline
    Write-Host " .\build.ps1 -Build -SkipIIS" -ForegroundColor "DarkGray"
    Write-Host "  Run multiple steps:                                                                      " -NoNewline
    Write-Host " .\build.ps1 -Clean -Build -ExecuteScripts -Test" -ForegroundColor "DarkGray"

    Write-Host ""
    Write-Host "Actions:" -ForegroundColor "Cyan"
    Write-Host "  -Help                    Shows the help prompt (Aliases: -h -?)"
    Write-Host "  -Clean                   Cleans the repository binaries"
    Write-Host "  -Build                   Builds the server and identity server (Set to true if no other actions are invoked)"
    Write-Host "  -ExecuteScripts          Executes the database scripts"
    Write-Host "  -TestUnit                Runs unit tests"
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor "Cyan"
    Write-Host "  -DatabaseType            Sets the database type (Oracle or MSSQL, with MSSQL being the default)"
    Write-Host "  -DatabaseHost            Database hostname (default: localhost)"
    Write-Host "  -DatabaseName            The name of the database (default: ADINSURE_TEST)"
    Write-Host "  -DatabaseUsername        Username for connecting to the database (default: adinsure)"
    Write-Host "  -DatabasePassword        Password for connecting to the database (default: adinsure)"
    Write-Host "  -DatabaseOracleSID       Oracle's SID (default: orcl)"
    Write-Host "  -DatabaseOracleDomain    Oracle's domain name"
    Write-Host ""
    Write-Host "Advanced parameters:" -ForegroundColor "Cyan"
    Write-Host "  -CI                      Set when running on CI server"
    Write-Host ""
}

# Preflight function
function PreflightCheck {
    Write-Host "Starting preflight check" -ForegroundColor "Cyan"
    dotnet --version
    if (-Not $?) {
        Write-Host "There is an issue with dotnet." -ForegroundColor "Red"
        exit 1
    }
}

# Build functions
function Clean {
    Write-Host "Starting clean" -ForegroundColor "Cyan"

    Get-ChildItem "$root" -Recurse -Directory | Where-Object Name -match "^(dist|bin|obj|node_modules|packages)$" | Remove-Item -Recurse -Force -ErrorAction Ignore
    if (-Not $?) {
        Write-Host "Failed to clean some files" -ForegroundColor "Red"
        exit 1
    }
}

function Build {
    Write-Host "Starting build" -ForegroundColor "Cyan"
    $buildConfiguration = "Debug"
    if ($CI) {
        $buildConfiguration = "Release"
    }

    Write-Host "Using build configuration:" $buildConfiguration
    dotnet build "plugins\Adacta.AdInsure.Plugins.$solutionFile.sln" --configuration $buildConfiguration

    if (-Not $?) {
        Write-Host "Build finished with errors" -ForegroundColor "Red"
        exit 1
    }
}

function ExecuteScripts {
    param (
        [string]$scriptsLocation
    )

    Write-Host "Executing database scripts on $DatabaseType" -ForegroundColor "Cyan"

    # Run restore for specified database type
    if ($DatabaseType -eq "MSSQL") {
        $connectionString = "Data Source=$DatabaseHost;Initial Catalog=$DatabaseName;User ID=$databaseUsername;Password=$DatabasePassword;MultipleActiveResultSets=True"
        $databaseType = "sql"
    }
    elseif ($DatabaseType -eq "Oracle") {
        $DatabaseServiceName = $DatabaseName
        if($DatabaseOracleDomain)
        {
            $DatabaseServiceName = "$DatabaseName.$DatabaseOracleDomain"
        }

        $connectionString = "Data Source=$($DatabaseHost)/$DatabaseServiceName;User Id=$DatabaseUsername;Password=$DatabasePassword"
        $databaseType = "oradc"
    }
    else {
        Write-Host "Unknown database type: $DatabaseType" -ForegroundColor "Red"
        exit 1
    }

    # Apply database scripts
    $scriptsLocation = "$root/database/$databaseType/Data;$root/database/$databaseType/migration;$root/database/$databaseType/Schema"
    Write-Host "Executing database scripts from '$scriptsLocation' on '$connectionString'" -ForegroundColor Yellow
    dotnet Adacta.DbUp --dbms="$databaseType" --connectionString="$connectionString" --directory=$scriptsLocation

    if (-Not $?) {
        Write-Host "An error occoured while running Adacta DbUp." -ForegroundColor "Red"
        exit 1
    }

    #Apply non-journaled scripts
    $scriptsLocation = "$root/database/$databaseType/NonJournaled"
    Write-Host "Executing database scripts on $connectionString" -ForegroundColor Yellow
    dotnet Adacta.DbUp --dbms="$databaseType" --connectionString="$connectionString" --directory=$scriptsLocation --forget
}

# Testing functions
function Test-Unit {
    dotnet test bin/net8.0/*.Tests.dll --test-adapter-path:. --logger:"junit;LogFilePath=bin/test-results-unit.xml;MethodFormat=Class;FailureBodyFormat=Verbose"

    # In case of failed tests, output an error
    if (-Not $?) {
        Write-Host "Some Unit test(s) failed!" -ForegroundColor "Red"
        exit 1
    }
}

# Start timer
$stopwatch = New-Object -TypeName System.Diagnostics.Stopwatch
$stopwatch.Start()

# Prepare tests
if ($Test) {
    $TestUnit = $true
}

if (-Not ($Build -or $Clean -or $ExecuteScripts -or $TestUnit)) {
    Help
    exit
}

# Start pipeline
try {
    if ($Help) {
        Help
        exit 0
    }

    if ($Clean) { Clean }
    New-Item -Path $binDir -ItemType Directory -Force | Out-Null

    if ($Build -or $ExecuteScripts -or $TestUnit) {
        PreflightCheck
    }

    if ($Build) {
        Build
    }

    if ($ExecuteScripts) {
        ExecuteScripts -scriptsLocation database
    }

    if ($TestUnit) { Test-Unit }
}
catch {
    Write-Host "An unexpected error occoured:" -ForegroundColor "Red"
    Write-Host "$_" -ForegroundColor "Red"
    exit 1
}

# Finish up
Write-Host "Done in $($stopwatch.Elapsed)" -ForegroundColor "Cyan"