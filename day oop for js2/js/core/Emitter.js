export class Emitter {
  constructor() {
    this.events = {};
  }

  on(event, cb) {
    (this.events[event] ||= []).push(cb);
  }

  emit(event, payload) {
    (this.events[event] || []).forEach((cb) => cb(payload));
  }
}