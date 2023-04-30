import { Component, Renderer2 } from '@angular/core';
import { LookupTableService } from 'src/app/Services/LookupTable_Service/lookup-table.service';
import { GetLookupTable } from 'src/app/Models/LookupTable/Get-Lookupable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { CreateLookupValue } from 'src/app/Models/LookupValues/Create-LookupValue';
@Component({
  selector: 'app-admin-lookupvalues',
  templateUrl: './admin-lookupvalues.component.html',
  styleUrls: ['./admin-lookupvalues.component.css'],
})
export class AdminLookupvaluesComponent {
  lookupList: GetLookupTable[] = [];
  lookupValueById: any;
  lookupvaluelist: any[] = [];
  lookbyValueWithLookupname: any[] = [];
  currentUpdatingObject: any;
  CreateDialogVisible: boolean = false;
  UpdateDialogVisible: boolean = false;
  DeleteDialogVisible: boolean = false;
  DetailsDialogVisible: boolean = false;
  deletevalueId: number = 0;
  //#region Create Form
  createForm = new FormGroup({
    valueName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lookupId: new FormControl(0),
  });
  //#endregion
  //#region UpdateRegion
  UpdateForm = new FormGroup({
    valueName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    valueId: new FormControl('', [Validators.required]),
  });
  //#endregion
  constructor(
    private _lookuptableService: LookupTableService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _lookupvaluesServices: LookupValueService
  ) {}
  ngOnInit(): void {
    this.GetAllData();
  }

  ShowCreateDialog() {
    this.CreateDialogVisible = true;
  }

  AddingNew() {
    if (this.createForm.valid) {
      this._lookupvaluesServices
        .CreateLookupValue(
          new CreateLookupValue(
            this.createForm.get('valueName')?.value || '',
            this.createForm.get('lookupId')?.value || 0
          )
        )
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Created',
              detail: 'Lookup value Created successfully',
              life: 1500,
              key: 'createToast',
            });
            this.GetAllData();
          },
          error: (err: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong',
              life: 1500,
              key: 'createToast',
            });
          },
        });
    }
  }

  update(valueid: string) {
    this.currentUpdatingObject = this.lookbyValueWithLookupname.find(
      (l) => l.valueId == valueid
    );
    this.UpdateForm.get('valueId')?.setValue(
      this.currentUpdatingObject.valueId
    );
    this.UpdateForm.get('valueName')?.setValue(
      this.currentUpdatingObject.valueName
    );

    this.UpdateDialogVisible = true;
  }
  ConfirmUpdate() {
    if (this.UpdateForm.valid) {
      this._lookupvaluesServices
        .UpdateLookupValueById(
          parseInt(this.UpdateForm.get('valueId')?.value || '0'),
          this.UpdateForm.get('valueName')?.value || ''
        )
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'info',
              summary: 'Updated',
              detail: 'Lookup value Updated successfully',
              life: 1500,
              key: 'updateToast',
            });
            this.GetAllData();
            this.UpdateDialogVisible = false;
          },
          error: (err: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong',
              life: 1500,
              key: 'updateToast',
            });
          },
        });
    }
  }

  delete(id: string) {
    this.deletevalueId = parseInt(id);
    this.DeleteDialogVisible = true;
  }
  ConfirmDelete() {
    this._lookupvaluesServices.DeleteLookupValue(this.deletevalueId).subscribe({
      next: (data: any) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Lookup Deleted successfully',
          life: 1500,
          key: 'deleteToast',
        });
        this.DeleteDialogVisible = false;
        this.GetAllData();
      },
      error: (err: any) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 1500,
          key: 'deleteToast',
        });
      },
    });
  }

  getDetails(id: number, value: string, name: string) {
    this.DetailsDialogVisible = true;
    console.log(name);
    this.lookupValueById = { valueId: id, valueName: value, LookupName: name };
  }
  private GetAllData() {
    this._lookuptableService.GetAllLookupTables().subscribe({
      next: (data: any) => {
        this.lookupList = [];
        data.forEach((element: any) => {
          this.lookupList.push(
            new GetLookupTable(element.lookupId, element.lookupName)
          );
        });
        this.GetAllLookupValues();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private GetAllLookupValues() {
    this._lookupvaluesServices.GetAllLookupalues().subscribe({
      next: (data: any) => {
        console.log(data);
        this.lookupvaluelist = data;
        this.lookbyValueWithLookupname = this.lookupvaluelist.map((lookup) => {
          const item = this.lookupList.find(
            (ele) => ele.lookupTableId == lookup.lookupId
          );
          return { ...lookup, lookupname: item?.lookupTableName };
        });

        console.log(this.lookbyValueWithLookupname);
      },
      error: (err) => {
        console.log(err);
        console.log('Hello from the other side');
      },
    });
  }
}
