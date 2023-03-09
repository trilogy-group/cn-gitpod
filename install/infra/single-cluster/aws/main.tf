terraform {
  backend "s3" {
    bucket = "hybrid-devspaces-tf"
    key    = "aws/terraform.state"
  }
}
