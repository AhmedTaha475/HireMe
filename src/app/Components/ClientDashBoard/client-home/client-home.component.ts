import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent implements OnInit {
  CurrentClient: any;
  isLoaded: boolean = false;
  constructor(private _clientServ: ClientService) {}
  ngOnInit(): void {
    this._clientServ.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.CurrentClient = data.body;
        console.log(data);
        if (this.CurrentClient) this.isLoaded = true;
      },
      error: (err: any) => console.log(err),
    });
  }
}
