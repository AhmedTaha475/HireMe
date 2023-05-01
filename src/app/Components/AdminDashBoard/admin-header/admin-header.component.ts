import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  constructor(private _authservices: AuthService) {}
  sidebarVisible: boolean = false;
  logout() {
    this._authservices.logout();
  }
}
