resource "aws_instance" "web" {

    # Only AMI, no name mentioned
    # amiFilter=[{"Name":"owner-id","Values":["602401143452"]},{"Name":"name","Values":["amazon-eks-node-1.20-*"]}]
    # currentImageName=unknown
    ami = "ami-0083e9407e275acf2"

    count = 2
    source_dest_check = false

    connection {
        user = "root"
    }
}
