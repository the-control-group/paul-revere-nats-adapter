# NATS Adapter for Paul Revere

## Usage

Pass a connected NATS client, then pass the adapter to Paul Revere. NATS client must be configured to use JSON.

```JavaScript
const PaulRevere = require('paul-revere'),
	PRNats = require('paul-revere-nats-adapter'),
	nats = require('nats');

const natsClient = nats.connect({json: true});

const paul = new PaulRevere(<your-schemas>, <your-server>, new PRNats(natsClient));
```
