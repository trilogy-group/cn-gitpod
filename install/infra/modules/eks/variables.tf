variable "cluster_name" {
  type        = string
  description = "EKS cluster name."
}

variable "cluster_version" {
  type        = string
  description = "Kubernetes version to create the cluster with"
  default     = "1.23"
}

variable "kubeconfig" {
  type        = string
  description = "Path to the kubeconfig file"
  default     = "kubeconfig"
}

variable "image_id" {
  type        = string
  description = "AMI Image ID specific to the region, refer https://cloud-images.ubuntu.com/docs/aws/eks/"
}

variable "service_machine_type" {
  type        = string
  description = "Machine type for service workload node pool"
  default     = "m6i.xlarge"
}

variable "workspace_machine_type" {
  type        = string
  description = "Machine type for workspace workload node pool"
  default     = "m6i.xlarge"
}

variable "arm_workspace_machine_type" {
  type        = string
  description = "Machine type for ARM workspace workload node pool"
  default     = "m6g.xlarge"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "vpc_availability_zones" {
  type    = list(string)
  default = ["us-east-1c", "us-east-1b"]
}

variable "domain_name" {
  default     = ""
  description = "Domain name to associate with the route53 zone"
}

variable "vpc_cidr" {
  default = "10.100.0.0/16"
}

variable "create_external_database" {
  default     = false
  description = "Create a mysql RDS database"
}

variable "create_external_storage" {
  default     = true
  description = "Create an S3 bucket"
}

variable "create_external_storage_for_registry_backend" {
  default     = false
  description = "Create an S3 bucket for registry backend"
}

variable "create_external_registry" {
  default     = false
  description = "Create an EKS registry(Not officially supported)"
}

variable "use_aws_cert_manager" {
  default     = false
  description = "Create an AWS Cert manager entry for all necessary sub domains"
}
