import { Injectable } from '@angular/core';

// to use all methods of http requset in our service :
import { HttpClient } from '@angular/common/http';

// to get Base url : https://localhost:7047/api/ ---> we use StaticURL Class :
import { StaticURl } from 'src/app/Models/static-url';

// to use an oject of lookup table to use it in our html and anguler :
import { GetLookupTable } from 'src/app/Models/LookupTable/Get-Lookupable';
import { CreateLookupTable } from 'src/app/Models/LookupTable/Create-LookupTable';
import { UpdateLookupTable } from 'src/app/Models/LookupTable/Update-LookupTable';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LookupTableService {
  //#region  Some Helpers Variables :
  Url: any = StaticURl.URL + 'LookupTables/';

  //#endregion

  constructor(private readonly myclient: HttpClient) {}

  //#region All Cruds of Lookup Table :

  // Get All Lookup Tables :
  GetAllLookupTables() {
    return this.myclient.get(this.Url + 'GetAllLookupTables');
  }

  // Get Lookup Table By Id :
  GetLookupTableById(lookuptableId: Number) {
    return this.myclient.get(this.Url + 'GetLookupTableById/' + lookuptableId);
  }

  // Create Lookup Table :
  CreateLookupTable(NewLookupTable: CreateLookupTable) {
    return this.myclient.post(
      this.Url + 'CreateNewLookupTable',
      NewLookupTable
    );
  }

  // Update Lookup Table :
  UpdateLookupTableById(
    UpdateLookupTable: UpdateLookupTable,
    lookuptableId: Number
  ) {
    return this.myclient.put(
      this.Url + 'UpdateLookupTableById/' + lookuptableId,
      UpdateLookupTable
    );
  }

  // Delete Lookup Table By Id :
  DeleteLookupTableById(lookuptableId: Number) {
    return this.myclient.delete(
      this.Url + 'DeleteLookupTableById/' + lookuptableId
    );
  }
  //#endregion
}
