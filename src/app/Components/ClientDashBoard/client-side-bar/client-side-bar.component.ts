import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-client-side-bar',
  templateUrl: './client-side-bar.component.html',
  styleUrls: ['./client-side-bar.component.css'],
})
export class ClientSideBarComponent {
  constructor(private authServ: AuthService) {}

  logout() {
    this.authServ.logout();
  }
}
