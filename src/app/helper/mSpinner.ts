import { Injectable } from '@angular/core';

@Injectable()
export class MSpinner {
  selector = 'nb-global-spinner';
  constructor() { }

  getSpinnerElement() {
      return document.getElementById(this.selector);
  }

  showSpinner() {
      let el = this.getSpinnerElement();
      if (el) {
          el.style['display'] = 'block';
          el.style['background'] = 'none';
      }
  }

  hideSpinner() {
      let el = this.getSpinnerElement();
      if (el) {
          el.style['display'] = 'none';
      }
  }
}
