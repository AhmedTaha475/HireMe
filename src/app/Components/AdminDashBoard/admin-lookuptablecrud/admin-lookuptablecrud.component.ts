import { Component, OnInit, Renderer2 } from '@angular/core';
import { LookupTableService } from 'src/app/Services/LookupTable_Service/lookup-table.service';
import { GetLookupTable } from 'src/app/Models/LookupTable/Get-Lookupable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { CreateLookupTable } from 'src/app/Models/LookupTable/Create-LookupTable';
@Component({
  selector: 'app-admin-lookuptablecrud',
  templateUrl: './admin-lookuptablecrud.component.html',
  styleUrls: ['./admin-lookuptablecrud.component.css'],
  providers: [MessageService],
})
export class AdminLookuptablecrudComponent implements OnInit {
  lookupList: GetLookupTable[] = [];
  lookupById: any;
  CreateDialogVisible: boolean = false;
  UpdateDialogVisible: boolean = false;
  DeleteDialogVisible: boolean = false;
  DetailsDialogVisible: boolean = false;
  deleteTableId: number = 0;
  //#region Create Form
  createForm = new FormGroup({
    lookupname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
  });
  //#endregion
  //#region UpdateRegion
  UpdateForm = new FormGroup({
    lookupname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lookupId: new FormControl(''),
  });
  //#endregion
  constructor(
    private _lookuptableService: LookupTableService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.GetAllData();
  }

  ShowCreateDialog() {
    this.CreateDialogVisible = true;
  }

  AddingNew() {
    if (this.createForm.valid) {
      this._lookuptableService
        .CreateLookupTable(this.createForm.get('lookupname')?.value || '')
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Created',
              detail: 'Lookup Created successfully',
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

  update(id: string, name: string) {
    this.UpdateForm.get('lookupId')?.setValue(id);
    this.UpdateForm.get('lookupname')?.setValue(name);
    this.UpdateDialogVisible = true;
  }
  ConfirmUpdate() {
    if (this.UpdateForm.valid) {
      this._lookuptableService
        .UpdateLookupTableById(
          this.UpdateForm.get('lookupname')?.value || '',
          parseInt(this.UpdateForm.get('lookupId')?.value || '0')
        )
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'info',
              summary: 'Updated',
              detail: 'Lookup Updated successfully',
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
    this.deleteTableId = parseInt(id);
    this.DeleteDialogVisible = true;
  }
  ConfirmDelete() {
    this._lookuptableService
      .DeleteLookupTableById(this.deleteTableId)
      .subscribe({
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
  private GetAllData() {
    this._lookuptableService.GetAllLookupTables().subscribe({
      next: (data: any) => {
        this.lookupList = [];
        data.forEach((element: any) => {
          this.lookupList.push(
            new GetLookupTable(element.lookupId, element.lookupName)
          );
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getDetails(id: number, name: string) {
    this.DetailsDialogVisible = true;
    this.lookupById = new GetLookupTable(id, name);
  }
}
