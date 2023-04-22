import { Injectable } from '@angular/core';

// to use all methods of http requset in our service :
import { HttpClient } from '@angular/common/http';

// to get Base url : https://localhost:7047/api/ ---> we use StaticURL Class :
import { StaticURl } from 'src/app/Models/static-url';

// to use an oject of lookup table to use it in our html and anguler :
import { CreateLookupValue } from 'src/app/Models/LookupValues/Create-LookupValue';

import { Token } from '@angular/compiler';
import { UpdateLookupTable } from 'src/app/Models/LookupTable/Update-LookupTable';
import { UpdateLookupValue } from 'src/app/Models/LookupValues/Update-LokkupValues';

@Injectable({
  providedIn: 'root',
})
export class LookupValueService {
  //#region  Some Helpers Variables :

  Token: string = ' ';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Token}`,
  };
  options = { headers: this.headers };

  Url: any = StaticURl.URL + 'LookupValues/';

  //#endregion
  constructor(private readonly myclient: HttpClient) {}

  //#region All Cruds of Lookup Values :

  // Get All Lookup Values :
  GetAllLookupalues() {
    return this.myclient.get(this.Url + 'GetAll');
  }

  // Get Lookup Value By its Id :
  GetLookupValueById(lookupValueId: Number) {
    return this.myclient.get(this.Url + 'GetValueById' + lookupValueId);
  }

  // Get All Lookupvalue By Lookup table Id:
  GetAllLookupvalueByLookuptableId(lookuptableId: Number) {
    return this.myclient.get(
      this.Url + 'GetLookupValuesByLookupId' + lookuptableId
    );
  }

  // Get All Lookupvalue By Lookup table Name:
  GetAllLookupvalueByLookuptableName(lookuptablename: string) {
    return this.myclient.get(
      this.Url + 'GetLookupValuesByLookupName' + lookuptablename
    );
  }

  // Create Lookup value :
  CreateLookupValue(newlookupvalue: CreateLookupValue) {
    return this.myclient.post(
      this.Url + 'CreateLookupValue',
      newlookupvalue,
      this.options
    );
  }

  // Update Lookup Value by its id  :
  UpdateLookupValueById(
    lookupValueId: number,
    updatedLookupValue: UpdateLookupValue
  ) {
    return this.myclient.put(
      this.Url + 'UpdateLookupValueById' + lookupValueId,
      updatedLookupValue,
      this.options
    );
  }

  // Delete Lookup value By its Id :
  DeleteLookupValue(lookupValueId: Number) {
    return this.myclient.delete(
      this.Url + 'DeleteLookupValueById' + lookupValueId,
      this.options
    );
  }

  //#endregion
}
