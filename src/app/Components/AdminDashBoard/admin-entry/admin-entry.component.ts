import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.css'],
})
export class AdminEntryComponent {
  constructor(private _render: Renderer2) {
    const html = document.querySelector('html');
    this._render.setStyle(html, 'overflow', 'hidden');
  }
}
