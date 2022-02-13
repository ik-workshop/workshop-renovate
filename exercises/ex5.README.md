# Exercise 5. AWS AMI

> Experimental Feature

This datasource returns the latest [Amazon Machine Image](https://docs.aws.amazon.com/en_en/AWSEC2/latest/UserGuide/AMIs.html) via the AWS API (valid credentials required).

Because there is no general lookupName, you have to use the describe images filter as minified JSON as a lookupName.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Output](#output)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Output

Without AWS credentials following output

```sh
make run5
```

```json
"err":
{
  "message": "Region is missing",
  "stack": "Error: Region is missing\n    at default (/usr/src/app/node_modules/@aws-sdk/config-resolver/dist-cjs/regionConfig/config.js:10:15)\n    at /usr/src/app/node_modules/@aws-sdk/node-config-provider/dist-cjs/fromStatic.js:6:83\n    at /usr/src/app/node_modules/@aws-sdk/property-provider/dist-cjs/chain.js:11:28"
}

"regex": [
  {
    "packageFile": "sandbox/ex5/amifile.yml",
    "deps": [
      {
        "depName": "my_ami1",
        "lookupName": "[{\"Name\":\"owner-id\",\"Values\":[\"602401143452\"]},{\"Name\":\"name\",\"Values\":[\"amazon-eks-node-1.21-*\"]}]",
        "currentValue": "ami-02ce3d9008cab69cb",
        "currentDigest": "unknown",
        "datasource": "aws-machine-image",
        "versioning": "aws-machine-image",
        "replaceString": "# amiFilter=[{\"Name\":\"owner-id\",\"Values\":[\"602401143452\"]},{\"Name\":\"name\",\"Values\":[\"amazon-eks-node-1.21-*\"]}]\n# currentImageName=unknown\nmy_ami1: ami-02ce3d9008cab69cb",
        "depIndex": 0,
        "updates": [],
        "warnings": [
          {
            "topic": "my_ami1",
            "message": "Failed to look up dependency my_ami1"
          }
        ]
      },
      {
        "depName": "my_ami2",
        "lookupName": "[{\"Name\":\"owner-id\",\"Values\":[\"602401143452\"]},{\"Name\":\"name\",\"Values\":[\"amazon-eks-node-1.20-*\"]}]",
        "currentValue": "ami-0083e9407e275acf2",
        "currentDigest": "unknown",
        "datasource": "aws-machine-image",
        "versioning": "aws-machine-image",
        "replaceString": "# amiFilter=[{\"Name\":\"owner-id\",\"Values\":[\"602401143452\"]},{\"Name\":\"name\",\"Values\":[\"amazon-eks-node-1.20-*\"]}]\n# currentImageName=unknown\nmy_ami2: ami-0083e9407e275acf2",
        "depIndex": 1,
        "updates": [],
        "warnings": [
          {
            "topic": "my_ami2",
            "message": "Failed to look up dependency my_ami2"
          }
        ]
      }
    ],
    "matchStrings": [
      ".*amiFilter=(?<lookupName>.*?)\\n(.*currentImageName=(?<currentDigest>.*?)\\n)?(.*\\n)?.*?(?<depName>[a-zA-Z0-9-_:]*)[ ]*?[:|=][ ]*?[\"|']?(?<currentValue>ami-[a-z0-9]{17})[\"|']?.*"
    ],
    "datasourceTemplate": "aws-machine-image",
    "versioningTemplate": "aws-machine-image"
  }
]
```

## Resources

- [Renovate: Ami Machine Image Datasource](https://docs.renovatebot.com/modules/datasource/#aws-machine-image-datasource)
