define('list', ['api', 'base', 'constants'], function({ getFilesList, deleteFile }, BaseClass, { MESSAGES }) {
  class List extends BaseClass {
    #listBody;
    #model = {};

    constructor(node) {
      super(node);
      this.#render();
      this.updateList();
    }

    #render() {
      const list = document.createElement('div');
      list.classList.add('list');
      const listTitle = document.createElement('div');
      listTitle.classList.add('list-title');
      listTitle.textContent = 'Files list';
      this.#listBody = document.createElement('ul');
      this.#listBody.classList.add('list-body');
      list.append(listTitle, this.#listBody);
      this.node.append(list);
    }

    #renderFragmentList = () => {
      this.#listBody.innerHTML = '';
      const fragment = document.createDocumentFragment();
      Object.values(this.#model).forEach((elem, index) => fragment.append(this.#createUnit(elem, index)));
      this.#listBody.append(fragment);
    }

    #createUnit = (item, index) => {
      const liElem = document.createElement('li');
      liElem.classList.add('list-body__item');
      liElem.innerHTML = `
        <span class='item__name'>${item.name}</span>
        <span class='item__btn-close'>
          <svg class='close' xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 50 50" width="20px" height="20px">
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
          </svg>
        </span>
      `;

      liElem.addEventListener('click', event => {
        if (event.target.classList.contains('close')) {
          liElem.remove();
          delete this.#model[index];
          deleteFile(`/list/${item.name}`)
            .then(() => {
              this.callbackCall('onSuccessDelete', { message: MESSAGES.successDelete });
            })
            .catch(() => {
              this.#model[index] = item;
              this.#renderFragmentList();
            });
          return;
        }

        this.callbackCall('click', item.name);
      });

      return liElem;
    }

    updateList = () => {
      getFilesList('/list')
        .then(data => {
          data.response.forEach((item, index) => {
            this.#model[index] = item;
          });
          this.#renderFragmentList();
        });
    }
  }

  return List;
});
