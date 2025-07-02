
#Provide SQLServerName
$SQLServer = "localhost"
#Provide Database Name
$DatabaseName = "ADINSURE_TEST"
$Username = "adinsure"
$Password = "adinsure"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\DELETE_UNIT_LINKED_TABLES.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\DELETE_UNIT_LINKED_TABLES.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_OBSERVATION_BARRIER.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_OBSERVATION_BARRIER.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_BARRIER_TYPE.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_BARRIER_TYPE.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_PAY_OFF.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_PAY_OFF.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_STOCKS.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_STOCKS.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_TOOLS.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_TOOLS.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_BASIC_ASSETS_GROUP.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_BASIC_ASSETS_GROUP.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_BASIC_ASSETS.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_BASIC_ASSETS.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_PIP_RF.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_PIP_RF.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_CASH.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_CASH.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_RISK_FUND_GROUP.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_RISK_FUND_GROUP.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_RISK_FUND.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_RISK_FUND.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_INVESTMENT_OBSERVATION_DATES.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_INVESTMENT_OBSERVATION_DATES.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_PRODUCTS.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_PRODUCTS.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_RATES.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_RATES.sql"
invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_RATE_MIX.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_RATE_MIX.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_PIP_GF.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_PIP_GF.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_GUARANTEE_FUND.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_GUARANTEE_FUND.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_GUARANTEE_DATES.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_GUARANTEE_DATES.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_GUARANTEES.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_GUARANTEES.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_HISTORICAL_PROFITABILITY.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_HISTORICAL_PROFITABILITY.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\UL_PRODUCT_VERSION.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\UL_PRODUCT_VERSION.sql"

invoke-sqlcmd –ServerInstance $SQLServer -Database $DatabaseName -Username $Username -Password $Password -TrustServerCertificate -InputFile "$PSScriptRoot\scripts\INSERT_TEST_DATA.sql"
#Print file name which is executed
"$PSScriptRoot\scripts\INSERT_TEST_DATA.sql"