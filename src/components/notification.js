define('notify', ['constants'], function({ DISPLAY_STYLE, NOTIFY_STATUS }) {
  class Notification {
    #toastTitle;
    #toastBody;
    #toastContainer;
    constructor(node) {
      this.node = node;
      this.#render();
    }

    #render() {
      this.node.innerHTML = `
      <div class="toast-container">
      <div class="toast">
        <div class="toast-header">
          <strong class="toast-title">Success</strong>
          <small class="text-muted">just now</small>
        </div>
        <p class="toast-body">You have successfully added the file</p>
      </div>
      `;
      this.#toastContainer = document.querySelector('.toast-container');
      this.#toastTitle = document.querySelector('.toast-title');
      this.#toastBody = document.querySelector('.toast-body');
    }

    #createNotify = config => {
      const { color = '#00FF00', status = NOTIFY_STATUS.success, message, delay = 4000 } = config;
      this.#toastContainer.style.display = DISPLAY_STYLE.styleFlex;
      this.#toastContainer.style.background = color;
      this.#toastTitle.textContent = status;
      this.#toastBody.textContent = message;

      setTimeout(() => {
        this.#toastContainer.style.display = DISPLAY_STYLE.styleNone;
      }, delay);
    }

    successNotify = config => this.#createNotify({ ...config });

    errorNotify = config => this.#createNotify({ ...config });
  }

  return Notification;
});
