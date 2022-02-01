define('image', ['base'], function(BaseClass) {
  class Image extends BaseClass {
    #image;

    constructor(node) {
      super(node);

      this.#render();
    }

    #render() {
      this.#image = document.createElement('img');

      this.#image.classList.add('image-wrapper__my-image');
      this.node.append(this.#image);
    }


    getImage = data => {
      const url = URL.createObjectURL(data.response);
      this.#image.src = url;
    }
  }

  return Image;
});