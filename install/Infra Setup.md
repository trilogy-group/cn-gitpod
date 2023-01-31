# Infra Setup for Deploying Gitpod

## Prerequisites
1. Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables. Refer to the [Terraform documentation](https://docs.tamr.com/new/docs/terraform-iam-principal-permissions-for-aws) to know about minimum required privilege permissions
2. Install Terraform on in your environment
3. Create an S3 bucket to store terraform state
4. AWS [eksctl](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html) CLI
5. [jq](https://stedolan.github.io/jq/download/)

## Configuration
The following variables have to be configured
1. `cluster_name` in [install/infra/single-cluster/aws/terraform.tfvars](install/infra/single-cluster/aws/terraform.tfvars) for the name of the EKS cluster being provisioned
2. `domain_name` in [install/infra/single-cluster/aws/terraform.tfvars](install/infra/single-cluster/aws/terraform.tfvars) for the domain name at which you want the devspaces installation to be accessible
3. `vpc_cidr` for the vpc inside which EKS cluster should be deployed.
4. `bucket` in [install/infra/single-cluster/aws/main.tf](install/infra/single-cluster/aws/main.tf) for the bucket which is used to store terraform state


`Note: You may use the default values if they are not already under use by some other deployment`

## Deploying
cd into `install/infra/single-cluster/aws` and run the following commands

```bash
make init
make touch-kubeconfig
make plan
make apply
```

## DNS configuration
Your hosted gitpod will most likely be under a subdomain (example: hybrid.devspaces.com). The terraform in this repo will create a Route53 hosted zone for your sub domain along with required NS record values.

Create a new NS record with those values in the the hosted zone of your main/parent domain to register the sub domain

## EBS configuration
The EKS Cluster needs to the [AWS EBS CSI Driver Add-on](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html). To deploy this driver, cd into [install/infra/single-cluster/aws](install/infra/single-cluster/aws) & run the following command

```
bash ebs-driver-install.sh <cluster-name>
```
