const listeners = Symbol('listeners'),
	nats = Symbol('nats');

class PaulRevereNatsAdapter {
	constructor(natsClient) {
		if(!natsClient) throw new Error('NATS client required');

		this[nats] = natsClient;
		this[listeners] = {};
	}

	publish(subject, msg, exclude) {
		if(exclude) msg.__exclude = exclude;

		this[nats].publish(`paulrevere.${subject}`, msg);
	}

	subscribe(subject, cb) {
		if(!this[listeners][`paulrevere.${subject}`]) this[listeners][`paulrevere.${subject}`] = [];

		this[nats].subscribe(`paulrevere.${subject}`, msg => {
			const exclude = msg.__exclude;

			delete msg.__exclude;

			this[listeners][`paulrevere.${subject}`].forEach(cb => cb(msg, exclude));
		});

		this[listeners][`paulrevere.${subject}`].push(cb);
	}
}

module.exports = PaulRevereNatsAdapter;
