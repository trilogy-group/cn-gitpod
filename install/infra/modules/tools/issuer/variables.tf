variable "kubeconfig" {
  description = "Path to the KUBECONFIG file to connect to the cluster"
  default     = "./kubeconfig"
}

variable "cert_manager_issuer" {
  default = null
}

variable "secretAccessKey" {
  default = "pwvIw6nvQNWpa59oJHBr6onf1CtfSKT82b6K0P5y"
}

variable "gcp_credentials" {
  default = null
}

variable "issuer_name" {
  default = "route53"
}

variable "cluster_issuer_name" {
  default = "gitpod-issuer"
}
