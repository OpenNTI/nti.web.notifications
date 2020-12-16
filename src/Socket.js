import EventEmitter from 'events';

const Bus = new EventEmitter();
const IncomingEvent = 'incoming-event';

export function subscribeToIncoming (fn) {
	Bus.addListener(IncomingEvent, fn);
	return () => Bus.removeListener(IncomingEvent, fn);
}

export function emitIncoming (data) {
	Bus.emit(IncomingEvent, data);
}