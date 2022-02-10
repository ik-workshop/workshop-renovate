https://docs.renovatebot.com/configuration-options/#datasourcetemplate

```example
# The image of the service <registry>/<repo>/<image>:<tag>
image: my.old.registry/aRepository/andImage:1.18-alpine
```

```regex def
{
  "regexManagers": [
    {
      "fileMatch": ["values.yaml$"],
      "matchStrings": [
        "image:\\s+(?<depName>my\\.old\\.registry\\/aRepository\\/andImage):(?<currentValue>[^\\s]+)"
      ],
      "depNameTemplate": "my.new.registry/aRepository/andImage",
      "autoReplaceStringTemplate": "image: {{{depName}}}:{{{newValue}}}",
      "datasourceTemplate": "docker"
    }
  ]
}
```

```output
# The image of the service <registry>/<repo>/<image>:<tag>
image: my.new.registry/aRepository/andImage:1.21-alpine
```
