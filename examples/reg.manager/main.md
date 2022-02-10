
location https://docs.renovatebot.com/configuration-options/#hosttype
```json
{
  "regexManagers": [
    {
      "fileMatch": ["^main.yml$"],
      "matchStringsStrategy": "combination",
      "matchStrings": [
        "prometheus_image:\\s*\"(?<depName>.*)\"\\s*//",
        "prometheus_version:\\s*\"(?<currentValue>.*)\"\\s*//"
      ],
      "datasourceTemplate": "docker"
    },
    {
      "fileMatch": ["^main.yml$"],
      "matchStringsStrategy": "combination",
      "matchStrings": [
        "thanos_image:\\s*\"(?<depName>.*)\"\\s*//",
        "thanos_version:\\s*\"(?<currentValue>.*)\"\\s*//"
      ],
      "datasourceTemplate": "docker"
    }
  ]
}
```
````
prometheus_image: "prom/prometheus"  // a comment
prometheus_version: "v2.21.0" // a comment
------
thanos_image: "prom/prometheus"  // a comment
thanos_version: "0.15.0" // a comment
```
