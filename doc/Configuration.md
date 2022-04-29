# Configuration Guide <br/> MessageTemplates Microservice

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure.

Example **config.yml** file:

```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "service-msgtemplates"
  description: "MessageTemplates microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-msgtemplates:persistence:file:default:1.0"
  path: "./data/message_templates.json"

- descriptor: "service-msgtemplates:controller:default:default:1.0"

- descriptor: "service-msgtemplates:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```
