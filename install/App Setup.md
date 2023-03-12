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
bash install-kots.sh <cluster-name>
```

## Architecture Comptability Issues with KOTS Admin Components
- KOTS Admin components like kots-rqlite by default only run on x86 architecture
- Since these components are part of the gitpod public helm chart, we cannot modify the yamls to add node affinity to them before hand. It has to be done after the application is installed.
- In this case, adding node affinity may not be required. If a pod fails due to exec format error (i.e. being placed on the wrong arch) one simple fix is to just keep terminating the pod until it get's scheduled on an appropriate node
- If that doesn't work you may need to add a node affinity to the appropriate statefulset/deployment
- One more corner case that can occur is due to the distribution of nodes across availability zones. It is possible that the nodes get scheduled in a manner than all x86 nodes are in a single AZ (out of min 2 required by the EKS cluster).
- rqlite and minio admin pods both have pvc which are provisioned as EBS blocks. The pods needs to be scheduled in the same AZ as the PV. In case the PV is scheduled in a AZ which has no x86 nodes the pod will refuse to run
- In such a scenario, one hacky fix would be to keep deleting the Ec2 nodes until one get's spun up in the right AZ
- Alternatively, you could add AZ restrictions to the storage class used by the PVC
- A more robust solution would be to modify the terraform code to ensure that both regions have atleast one x86 node

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
bash statefulset-path.sh <cluster-namespace>
```

## Installing ARM extension service
1. Set the value of the secrets in [components/extension-service/yamls/secret.example.yaml](components/extension-service/yamls/secret.example.yaml) to the value of actual dockerhub creds. `Note: Free user credentials will also work, but it's recommended to use docker pro account creds`
2. Run the following commands
```bash
cd components/extension-service

bash scripts/install-extension.sh <namespace>
```
