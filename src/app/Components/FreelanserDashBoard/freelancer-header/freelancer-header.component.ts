import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-freelancer-header',
  templateUrl: './freelancer-header.component.html',
  styleUrls: ['./freelancer-header.component.css'],
})
export class FreelancerHeaderComponent implements OnInit {
  constructor(private authServ: AuthService) {}
  ngOnInit(): void {}
  logout() {
    this.authServ.logout();
  }
}
