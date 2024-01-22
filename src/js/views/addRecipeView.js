import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  _message = 'Recipe was successfully uploaded';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    if (
      window.innerWidth <= 780 &&
      !this._window.classList.contains('hidden')
    ) {
      this._window.style.width = '90%';
      this._window.style.position = 'absolute';
      this._window.style.top = '5%';
      this._window.style.transform = 'translateX(-50%)';
    } else {
      this._window.style = {};
    }
  }

  _addHandlerShowWindow() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
