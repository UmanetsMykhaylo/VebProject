define('progressBar', ['constants'], function(constants) {
  const { DISPLAY_STYLE, DEFAULT_ELEM, EMPTY_STRING, PERCENT } = constants;
  class UploadProgress {
    #config;
    #input;
    #nodeElement;

    constructor(node, config = {}) {
      this.node = node;
      this.#config = config;

      this.#render();
    }

    #render() {
      this.node.innerHTML = `
        <div class="${this.#config.nameOfNodeClass || DEFAULT_ELEM.defaultBar}"></div>
      `;
      this.#input = document.querySelector(`.${this.#config.needInput || DEFAULT_ELEM.defaultInput}`);
      this.#nodeElement = document.querySelector(`.${this.#config.nameOfNodeClass || DEFAULT_ELEM.defaultBar}`);
    }

    showProgress = event => {
      const progressPercent = Math.round(event.loaded / event.total * 100);

      this.node.style.display = DISPLAY_STYLE.styleFlex;

      this.#nodeElement.style.width = `${progressPercent}%`;

      if (this.#config.value) {
        this.#nodeElement.innerHTML = `${progressPercent}%`;
      }

      if (this.#input.value === EMPTY_STRING) {
        this.node.style.display = DISPLAY_STYLE.styleNone;
      }

      if (progressPercent === 100) {
        setTimeout(() => {
          this.node.style.display = DISPLAY_STYLE.styleNone;
          this.#nodeElement.style.width = PERCENT;

          if (this.#config.value) {
            this.#nodeElement.innerHTML = PERCENT;
          }
        }, this.#config.delayTime || 5000);
      }
    }
  }

  return UploadProgress;
});