# Local environment setup instruction

## Info

Date: 12.05.2025

Implementation: RGSL

Platform version: 43.7.0

## Instructions

[Core instruction](https://docs.adinsure.com/43.x/development/getting-started/local-environment/)

[Core instruction - Ext](https://docs.adacta-fintech.ru/43.x/development/getting-started/local-environment/)

[GitLabRU instruction](https://docs.adinsure.com/rnd/implementations/infrastructure/repo-on-gitlabru/)

[GitLabRU instruction - Ext](https://docs.adacta-fintech.ru/rnd/implementations/infrastructure/repo-on-gitlabru/)

## Steps

1. Enable required Windows features (see Core instruction)

2. Install required programms

   - PowerShell. Latest version.
   - Visual Studio Code. Latest version.
   - Node.js. Latest 18 version.
   - .Net SDK 6, 8. Latest version.
   - Docker Desktop. Latest version.
   - Git. Latest version.
   - SQL Server Management Studio.

3. PowerShell (run as administrator)

    ```Set-ExecutionPolicy Unrestricted```

    ```npm install -g yarn```

    ```npm install -g @adinsure-ops/ops-cli```

4. GitLabRU SSH key and token (see GitLabRU instruction). Restart PC after setting env. variables!

    ```docker login -u ${env:ADACTA_GITLABRU_USER} -p ${env:ADACTA_GITLABRU_TOKEN} registryru.adacta-fintech.ru```

5. Install AdInsure Studio

    ```Terminal -> Run Task... -> Install AdInsure Studio```

6. Prepare local repository

    ```git clone git@gitlabru.adacta-fintech.ru:rgs-life/implementation.git```

    ```docker-compose.exe pull```

    ```docker-compose.exe up -d```

    ```yarn install```

7. Start environment

    - Select Local in AdInsure Environments Explorer
    - Build
    - Publish

8. Fill initial test data

    ```yarn run import-test-data -e local```

9. Fill name and email in git config

    ```git config --global user.name "First Second"```

    ```git config --global user.email <first.second@adacta-fintech.com>```
