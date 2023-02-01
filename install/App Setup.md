# Install KOTS Application

## Prerequisites
1. Install [Replicated CLI](https://docs.replicated.com/reference/replicated-cli-installing#installing-the-replicated-cli-1)
2. export REPLICATED_API_TOKEN in environment variables
3. Install helm
4. Setup AWS credentials in environment variables

## Install KOTS application
1.
```bash
cd install/kots
bash install-kots.sh \<cluster-name\>
```

## Configure KOTS applications
- After the app installation is completed, you will see a message on the CLI that says admin console available at localhost:8800
- Open the admin console on http://localhost:8800 and enter password `12345678`
- Configure the domain name of the installation to be the same as the domain name set during provisioning the EKS cluster
- Scroll down over to advanced configurations, enable advanced configurations and set installer timeout to 2 hours
- Save config and deploy the application

## Fixing the Statefulsets
Due to an as yet unidentified bug, the statefulsets installed by the KOTS application have an incorrect reference image.
After you have deployed the application, wait until admin dashboard goes to the main page which shows you a status of the deployment
Then, run
```bash
bash statefulset-path.sh \<cluster-namespace\>
```
