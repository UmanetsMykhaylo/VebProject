define('base', [], function() {
  class BaseClass {
    #callbackList = {};

    constructor(node) {
      this.node = node;
    }

    renderCallbackList(name, callback) {
      if (!this.#callbackList[name]) {
        this.#callbackList[name] = [];
      }

      this.#callbackList[name].push(callback);
    }

    callbackCall(name, data) {
      this.#callbackList[name].forEach(cb => cb(data));
    }
  }

  return BaseClass;
});