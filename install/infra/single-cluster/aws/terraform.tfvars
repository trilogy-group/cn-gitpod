# the cluster_name should be of length less than 15 characters and surrounded by double quotes
cluster_name = "gitpod-infra-hybrid"

# a route53 zone and certificate request will be created for this domain; surround the domain name within double quotes
domain_name = "gitpod-infra-hybrid.k8.devfactory.com"

region = "us-east-1"

# make sure the cidr do not have any conflicts and will have IP ranges enough to split into 5 subnets
vpc_cidr = "10.100.0.0/16"

# should be atleast 2 zones
vpc_availability_zones = ["us-east-1a", "us-east-1b"]

# !important!: You need to make sure the image_id below matches your region.
# You can find the list of UBUNTU AMIs here corresponding to the k8s version and your region via
# https://cloud-images.ubuntu.com/docs/aws/eks/
cluster_version = "1.23"

image_id = "ami-0f89411984ff168ca"

create_external_database = false
create_external_storage  = true

# if you want to create a separate s3 bucket to use as registry backend,
# set the following to true. You can re-use the above bucket or incluster registry otherwise.
create_external_storage_for_registry_backend = false
