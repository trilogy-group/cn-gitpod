terraform {
  backend "s3" {
    bucket = "gitpod-devspaces-tf"
    key    = "aws/terraform.state"
  }
}
