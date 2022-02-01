define('uploadForm', ['api', 'base', 'progressBar', 'constants'], function({ upload }, BaseClass, ProgressBar, { MESSAGES }) {
  class UploadForm extends BaseClass {
    #uploadForm;
    #progressBar;

    constructor(node) {
      super(node);

      this.#render();
      this.#onSubmit();
    }

    #render() {
      this.node.innerHTML = `
      <form id='uploadForm' class='form' encType="multipart/form-data">
        <label class="input-wrapper">
          <input type="file" name="sampleFile" class='input-wrapper__upload-file'/>
          <span class='input-wrapper__title-file'>Select file</span>
        </label>
        <input type='submit' value='Upload!' class='form__submit-btn'/>
      </form>
      `;
      this.#uploadForm = document.querySelector('#uploadForm');
      this.#progressBar = new ProgressBar(document.querySelector('.progress-upload'),
        { nameOfNodeClass: 'progress-upload__value', needInput: 'input-wrapper__upload-file', value: true, delayTime: 1000 });
      this.#getFileName();
    }

    #getFileName = () => {
      const fileName = document.querySelector('.input-wrapper__upload-file');
      const fileTitle = document.querySelector('.input-wrapper__title-file');


      fileName.addEventListener('change', event => {
        fileTitle.textContent = event.target.files[0].name;
      });
    }

    #onSubmit = () => {
      this.#uploadForm.addEventListener('submit', event => {
        event.preventDefault();

        const form = new FormData();
        form.append('sampleFile', event.target.sampleFile.files[0]);

        if (!event.target.sampleFile.files[0]) {
          return;
        }

        upload('/upload', form, { onUploadProgress: event => this.#progressBar.showProgress(event) })
          .then(() => {
            this.callbackCall('onSubmitUpload');
          })
          .then(() => {
            this.callbackCall('onSuccessResponse', { message: MESSAGES.successUpload });
          });
      });
    }
  }

  return UploadForm;
});