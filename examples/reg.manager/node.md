```json
{
  "extends": ["config:base"],
  "regexManagers": [
    {
      "fileMatch": ["^versions\\.yml$"],
      "matchStrings": [
        "# renovate: datasource=(?<datasource>.*?) depName=(?<depName>.*?)\n.*?: (?<currentValue>.*)"
      ],
      "versioningTemplate": "node"
    }
  ]
}
```
file


`versions.yaml`

```yaml
# renovate: datasource=github-releases depName=grafana/grafana
metrics_grafana_version: 7.1.5
# renovate: datasource=github-tags depName=nginx/nginx
metrics_nginx_version: 1.17.10
# renovate: datasource=github-releases depName=prometheus/prometheus
metrics_prometheus_version: 2.21.0
# renovate: datasource=github-releases depName=influxdata/telegraf
metrics_telegraf_version: 1.15.3
```
