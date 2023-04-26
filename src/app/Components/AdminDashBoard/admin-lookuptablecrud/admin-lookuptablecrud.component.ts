import { Component, OnInit,Renderer2 } from '@angular/core';
import { LookupTableService } from 'src/app/Services/LookupTable_Service/lookup-table.service';
import { GetLookupTable } from 'src/app/Models/LookupTable/Get-Lookupable';

@Component({
  selector: 'app-admin-lookuptablecrud',
  templateUrl: './admin-lookuptablecrud.component.html',
  styleUrls: ['./admin-lookuptablecrud.component.css'],
})
export class AdminLookuptablecrudComponent implements OnInit {
  lookupList: GetLookupTable[] = [];
  constructor(private _lookuptableService: LookupTableService) {}
  ngOnInit(): void {
    this._lookuptableService.GetAllLookupTables().subscribe({
      next: (data: any) => {
        console.log(data);
        data.forEach((element: any) => {
          this.lookupList.push(
            new GetLookupTable(element.lookupId, element.lookupName)
          );
        });
        console.log(this.lookupList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
