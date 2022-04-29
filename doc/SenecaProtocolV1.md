# Seneca Protocol (version 1) <br/> Message Templates Microservice

MessageTemplates microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'msgtemplates',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [MessageTemplateV1 class](#class1)
* [cmd: 'get_templates'](#operation1)
* [cmd: 'get_template_by_id'](#operation2)
* [cmd: 'get_template_by_id_or_name'](#operation3)
* [cmd: 'create_template'](#operation4)
* [cmd: 'update_template'](#operation5)
* [cmd: 'delete_template_by_id'](#operation6)

## Data types

### <a name="class1"></a> MessageTemplateV1 class

Represents an message template

**Properties:**
- id: string - unique template id
- name: string - template name
- from: string - sender address
- reply_to: string - sender replyto address
- subject: MultiString - message subject in different languages
- text: MultiString - message text body in different languages
- html: MultiString - message html body in different languages
- status: string - editing status of the msgtemplate: 'new', 'writing', 'translating', 'completed' (default: 'new')

## Operations

### <a name="operation1"></a> Cmd: 'get_templates'

Retrieves a collection of message templates according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - name: string - (optional) template name
  - status: string - (optional) template editing status
  - search: string - (optional) free text search
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<MessageTemplateV1> - retrieved msgtemplates in page format

### <a name="operation2"></a> Cmd: 'get\_template\_by\_id'

Retrieves a single message template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique MessageTemplateV1 object id

**Returns:**
- err: Error - occured error or null for success
- result: MessageTemplateV1 - retrieved message template, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'get\_template\_by\_id\_or\_name'

Retrieves a firdt found message template specified by its id or name

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- id\_or\_name: string - unique MessageTemplateV1 object id

**Returns:**
- err: Error - occured error or null for success
- result: MessageTemplateV1 - retrieved message template, null if object wasn't found 

### <a name="operation4"></a> Cmd: 'create_template'

Creates a new message template

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: MessageTemplateV1 - MessageTemplateV1 object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: MessageTemplateV1 - created message template object

### <a name="operation5"></a> Cmd: 'update_template'

Updates message template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: MessageTemplateV1 - template object with new values.

**Returns:**
- err: Error - occured error or null for success
- result: MessageTemplateV1 - updated message template object 
 
### <a name="operation6"></a> Cmd: 'delete\_template\_by_id'

Deletes message template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique message template id

**Returns:**
- err: Error - occured error or null for success

 