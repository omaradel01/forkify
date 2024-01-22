import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      if (!button) return;

      const goToPage = +button.dataset.goto;
      handler(goToPage);
    });
  }

  _generatePaginationButtons(currentPage, next, prev) {
    let markup = '';
    if (!next && !prev) return markup;

    if (prev)
      markup += `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;

    if (next)
      markup += `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-right"></use>
          </svg>
        </button>
      `;

    return markup;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
        this._data.results.length / this._data.resultsPerPage
      ),
      currentPage = this._data.page;

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generatePaginationButtons(currentPage, true, false);
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generatePaginationButtons(currentPage, false, true);
    }

    // Other Page
    if (currentPage < numPages) {
      return this._generatePaginationButtons(currentPage, true, true);
    }

    // Page 1, and there are no other pages
    return this._generatePaginationButtons(currentPage, false, false);
  }
}

export default new PaginationView();
