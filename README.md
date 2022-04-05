# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## Git hub CI/CD
- [Authorize an Org Using the JWT Bearer Flow](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm#sfdx_dev_auth_jwt_scratch)
- [Reference vedio](https://www.youtube.com/watch?v=_eOXnb9pQAg)
## openssl
https://gist.github.com/olopsman/44c7866c05e65fe4c4e3e4bbd98c9d2d
- [生成key和ivkey]
openssl enc -aes-256-cbc -k MySuperSecretPassPhrase -P -md sha1

salt=BA2A126C7EDCA9E8
key=0B6F1ECB15E48EBE676C87EFDE42794D26D78EB44AAF6FCF1619583AB2F5DCCA
iv =ECDFF069275FF5B1C06CB26794AA8F52

- [利用key和ivkey加密server.key文件]
openssl enc -aes-256-cbc -in server.key -out server.key.enc -base64 -K 0B6F1ECB15E48EBE676C87EFDE42794D26D78EB44AAF6FCF1619583AB2F5DCCA -iv ECDFF069275FF5B1C06CB26794AA8F52]

- [利用key和ivkey解密server.key文件]
openssl enc -nosalt -aes-256-cbc -d -in assets/server.key.enc -out server.key -base64 -K 0B6F1ECB15E48EBE676C87EFDE42794D26D78EB44AAF6FCF1619583AB2F5DCCA -iv ECDFF069275FF5B1C06CB26794AA8F52
