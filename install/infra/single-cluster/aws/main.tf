terraform {
  backend "s3" {
    bucket = "gitpod-hybrid-tf"
    key    = "aws/terraform.state"
  }
}
