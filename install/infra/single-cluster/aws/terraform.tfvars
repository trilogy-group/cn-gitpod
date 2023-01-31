# the cluster_name should be of length less than 15 characters and surrounded by double quotes
cluster_name = "gitpod-devspaces"

# a route53 zone and certificate request will be created for this domain; surround the domain name within double quotes
domain_name = "hybrid-devspaces.k8.devfactory.com"

region = "us-east-1"

# make sure the cidr do not have any conflicts and will have IP ranges enough to split into 5 subnets
vpc_cidr = "172.28.0.0/16"

# should be atleast 2 zones
vpc_availability_zones = ["us-east-1c", "us-east-1b"]

# !important!: You need to make sure the image_id below matches your region.
# You can find the list of UBUNTU AMIs here corresponding to the k8s version and your region via
# https://cloud-images.ubuntu.com/docs/aws/eks/
cluster_version = "1.23"

image_id = "ami-053a2c50bbd863e25"

create_external_database = false
create_external_storage  = true

# if you want to create a separate s3 bucket to use as registry backend,
# set the following to true. You can re-use the above bucket or incluster registry otherwise.
create_external_storage_for_registry_backend = false
