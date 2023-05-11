import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-client-entry',
  templateUrl: './client-entry.component.html',
  styleUrls: ['./client-entry.component.css']
})
export class ClientEntryComponent {
constructor(private _render:Renderer2){
  const html = document.querySelector('html');
  this._render.setStyle(html, 'overflow', 'hidden');
  window.addEventListener('resize', () => {
    const mediaQuery = window.matchMedia('(min-width: 1000px)'); // adjust the screen width as needed
    if (mediaQuery.matches) {
      this._render.setStyle(html, 'overflow', 'hidden');
    } else {
      this._render.setStyle(html, 'overflow', 'auto');
    }
  });
}
}
