import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-users-website-entry',
  templateUrl: './users-website-entry.component.html',
  styleUrls: ['./users-website-entry.component.css'],
})
export class UsersWebsiteEntryComponent {
  constructor(private _render: Renderer2) {
    const html = document.querySelector('html');
    this._render.setStyle(html, 'overflow', 'auto');
  }
}
