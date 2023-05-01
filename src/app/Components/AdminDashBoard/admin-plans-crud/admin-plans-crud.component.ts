import { Component, OnInit, Renderer2 } from '@angular/core';
import { LookupTableService } from 'src/app/Services/LookupTable_Service/lookup-table.service';
import { GetLookupTable } from 'src/app/Models/LookupTable/Get-Lookupable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { CreateLookupTable } from 'src/app/Models/LookupTable/Create-LookupTable';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';
import { GetPlan } from 'src/app/Models/Plan/Get_Plan';
import { CreatePlan } from 'src/app/Models/Plan/Create-Plan';
import { UpdatePlan } from 'src/app/Models/Plan/Update-Plan';
@Component({
  selector: 'app-admin-plans-crud',
  templateUrl: './admin-plans-crud.component.html',
  styleUrls: ['./admin-plans-crud.component.css'],
})
export class AdminPlansCrudComponent implements OnInit {
  allPlans: GetPlan[] = [];
  currentPlan: GetPlan | null = null;
  CreateDialogVisible: boolean = false;
  UpdateDialogVisible: boolean = false;
  DeleteDialogVisible: boolean = false;
  DetailsDialogVisible: boolean = false;
  deleteTableId: number = 0;
  //#region Create Form
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    bids: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  //#endregion
  //#region UpdateRegion
  UpdateForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    bids: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  //#endregion
  constructor(
    private _PlanService: PlanService,
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
      this._PlanService
        .CreatePlan(
          new CreatePlan(
            this.createForm.get('name')?.value || '',
            this.createForm.get('description')?.value || '',
            this.createForm.get('price')?.value || 0,
            this.createForm.get('bids')?.value || 0
          )
        )
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Created',
              detail: 'Plan Created successfully',
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

  update(id: number) {
    this._PlanService.GetPlanById(id).subscribe({
      next: (data: any) => {
        for (let controlname in this.UpdateForm.controls) {
          this.UpdateForm.get(controlname)?.setValue(data[controlname]);
          this.UpdateDialogVisible = true;
        }
      },
      error: (err: any) => {
        console.log('error');
      },
    });
  }
  ConfirmUpdate() {
    if (this.UpdateForm.valid) {
      var PlanToBeUpdated = new UpdatePlan(
        this.UpdateForm.get('id')?.value || 0,
        this.UpdateForm.get('name')?.value || '',
        this.UpdateForm.get('description')?.value || '',
        this.UpdateForm.get('price')?.value || 0,
        this.UpdateForm.get('bids')?.value || 0
      );
      this._PlanService
        .UpdatePlanById(PlanToBeUpdated.id, PlanToBeUpdated)
        .subscribe({
          next: (data: any) => {
            this.messageService.clear();
            this.messageService.add({
              severity: 'info',
              summary: 'Updated',
              detail: 'Plan Updated successfully',
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

  delete(id: number) {
    this.deleteTableId = id;
    this.DeleteDialogVisible = true;
  }
  ConfirmDelete() {
    this._PlanService.DeletePlan(this.deleteTableId).subscribe({
      next: (data: any) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Plan Deleted successfully',
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
    this._PlanService.GetAllPlans().subscribe({
      next: (data: any) => {
        this.allPlans = [];
        data.forEach((el: any) => {
          this.allPlans.push(
            new GetPlan(el.id, el.name, el.description, el.price, el.bids)
          );
        });
      },
    });
  }
  getDetails(id: number) {
    this.DetailsDialogVisible = true;
    this._PlanService.GetPlanById(id).subscribe({
      next: (data: any) => {
        this.currentPlan = new GetPlan(
          data.id,
          data.name,
          data.description,
          data.price,
          data.bids
        );
      },
    });
  }
}
