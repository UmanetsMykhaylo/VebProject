define('downloadForm', ['api', 'base', 'constants'], function({ download }, BaseClass, { MESSAGES }) {
  class DownloadForm extends BaseClass {
    #sampleFile;
    #downloadForm;

    constructor(node) {
      super(node);

      this.#render();
      this.#addSubmitListener();
    }

    #render() {
      this.node.innerHTML = `
      <form id='downloadForm' class='form'>
        <input type="text" name="sampleFile" class="form__sample-file" placeholder='Enter filename'/>
        <input type='submit' value='Download!' class='form__submit-btn'/>
      </form>
      `;
      this.#sampleFile = document.querySelector('.form__sample-file');
      this.#downloadForm = document.querySelector('#downloadForm');
    }

    setValue = data => {
      this.#sampleFile.value = data;
    }

    #addSubmitListener = () => {
      this.#downloadForm.addEventListener('submit', event => {
        event.preventDefault();

        download(`${this.#sampleFile.value}`,
          { onDownloadProgress: event => this.callbackCall('onDownloadProgress', event) })
          .then(data => {
            this.callbackCall('onSubmitDownload', data);
          })
          .catch(() => {
            this.callbackCall('onErrorResponse', { message: MESSAGES.requireChoice });
          });
      });
    }
  }

  return DownloadForm;
});