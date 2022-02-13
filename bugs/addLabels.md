# AddLabels

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Action](#action)
- [Bug Explanation](#bug-explanation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Action

- [] [Create an issue](https://github.com/renovatebot/renovate/issues/new/choose)

On high level, it should ignore empty values in arrays.

## Bug Explanation

The bug example

```js
const defaultRules = [
  {
    "matchUpdateTypes": ["major", "minor", "patch", "pin", "digest"],
    "addLabels": ["{{depType}}", "{{datasource}}", "{{updateType}}"]
  },
]
```

The `{{datasource}}` is empty. As a result, github api not able to process labels

```js
DEBUG: Adding labels 'renovate, , helm, major' to #7 (repository=ik-workshop/workshop-renovate, branch=renovate/sandbox/ex6-datadog-2.x)
DEBUG: Received invalid response - aborting (repository=ik-workshop/workshop-renovate, branch=renovate/sandbox/ex6-datadog-2.x)
       "err": {
         "name": "HTTPError",
         "code": "ERR_NON_2XX_3XX_RESPONSE",
         "timings": {
           "start": 1644788915104,
           "socket": 1644788915105,
           "lookup": 1644788915107,
           "connect": 1644788915138,
           "secureConnect": 1644788915169,
           "upload": 1644788915169,
           "response": 1644788915473,
           "end": 1644788915473,
           "phases": {
             "wait": 1,
             "dns": 2,
             "tcp": 31,
             "tls": 31,
             "request": 0,
             "firstByte": 304,
             "download": 0,
             "total": 369
           }
         },
         "message": "Response code 422 (Unprocessable Entity)",
         "stack": "HTTPError: Response code 422 (Unprocessable Entity)\n    at Request.<anonymous> (/usr/src/app/node_modules/got/dist/source/as-promise/index.js:117:42)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)",
         "options": {
           "headers": {
             "user-agent": "RenovateBot/31.72.2 (https://github.com/renovatebot/renovate)",
             "accept": "application/vnd.github.v3+json",
             "authorization": "***********",
             "content-type": "application/json",
             "content-length": "30",
             "accept-encoding": "gzip, deflate, br"
           },
           "url": "https://api.github.com/repos/ik-workshop/workshop-renovate/issues/7/labels",
           "hostType": "github",
           "username": "",
           "password": "",
           "method": "POST",
           "http2": false
         },
         "response": {
           "statusCode": 422,
           "statusMessage": "Unprocessable Entity",
           "body": {
             "message": "Validation Failed",
             "errors": [
               {
                 "value": "major",
                 "resource": "Label",
                 "field": "name",
                 "code": "invalid"
               }
             ],
             "documentation_url": "https://docs.github.com/rest/reference/issues#add-labels-to-an-issue"
           },
           "headers": {
             "server": "GitHub.com",
             "date": "Sun, 13 Feb 2022 21:48:35 GMT",
             "content-type": "application/json; charset=utf-8",
             "content-length": "202",
             "x-oauth-scopes": "repo, workflow",
             "x-accepted-oauth-scopes": "",
             "github-authentication-token-expiration": "2022-03-12 09:39:59 UTC",
             "x-github-media-type": "github.v3; format=json",
             "x-ratelimit-limit": "5000",
             "x-ratelimit-remaining": "4936",
             "x-ratelimit-reset": "1644791050",
             "x-ratelimit-used": "64",
             "x-ratelimit-resource": "core",
             "access-control-expose-headers": "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
             "access-control-allow-origin": "*",
             "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
             "x-frame-options": "deny",
             "x-content-type-options": "nosniff",
             "x-xss-protection": "0",
             "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
             "content-security-policy": "default-src 'none'",
             "vary": "Accept-Encoding, Accept, X-Requested-With",
             "x-github-request-id": "D677:DFBB:20D48F1:216B744:62097CB3",
             "connection": "close"
           },
           "httpVersion": "1.1"
         }
       }
DEBUG: Pull request creation error (repository=ik-workshop/workshop-renovate, branch=renovate/sandbox/ex6-datadog-2.x)
       "err": {
         "message": "repository-changed",
         "stack": "Error: repository-changed\n    at handleGotError (/usr/src/app/node_modules/renovate/lib/util/http/github.ts:132:14)\n    at GithubHttp.request (/usr/src/app/node_modules/renovate/lib/util/http/github.ts:329:13)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)\n    at GithubHttp.requestJson (/usr/src/app/node_modules/renovate/lib/util/http/index.ts:238:17)\n    at addLabels (/usr/src/app/node_modules/renovate/lib/platform/github/index.ts:1259:5)\n    at Proxy.createPr (/usr/src/app/node_modules/renovate/lib/platform/github/index.ts:1518:3)\n    at ensurePr (/usr/src/app/node_modules/renovate/lib/workers/pr/index.ts:441:14)\n    at processBranch (/usr/src/app/node_modules/renovate/lib/workers/branch/index.ts:620:33)\n    at writeUpdates (/usr/src/app/node_modules/renovate/lib/workers/repository/process/write.ts:38:17)\n    at update (/usr/src/app/node_modules/renovate/lib/workers/repository/process/extract-update.ts:129:11)\n    at Object.renovateRepository (/usr/src/app/node_modules/renovate/lib/workers/repository/index.ts:46:17)\n    at Object.start (/usr/src/app/node_modules/renovate/lib/workers/global/index.ts:126:7)\n    at /usr/src/app/node_modules/renovate/lib/renovate.ts:16:22"
       }
```
