import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoansService } from 'app/loans/loans.service';
import { SettingsService } from 'app/settings/settings.service';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { DatepickerBase } from 'app/shared/form-dialog/formfield/model/datepicker-base';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';

@Component({
  selector: 'mifosx-preview-loan-repayment-schedule',
  templateUrl: './preview-loan-repayment-schedule.component.html',
  styleUrls: ['./preview-loan-repayment-schedule.component.scss']
})
export class PreviewLoanRepaymentScheduleComponent implements OnInit {

  @Input() dataObject:any;
  /** Loan Details Data */
  originalScheduleDetails: any;
  /** Columns to be displayed in original schedule table. */
  displayedColumns: string[] = ['date', 'principalDue', 'balanceOfLoan', 'interest', 'fees', 'penalties', 'outstanding'];
  scheduleId: string;
  

  /**
   * Retrieves the loans with associations data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(public dialog: MatDialog,
              private datePipe: DatePipe,
              private settingsService : SettingsService,
              private loansService : LoansService,
              private router : Router,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe((data:any) => {
      console.log(data);
      this.scheduleId = data.scheduleId;
    });
  }


  ngOnInit(): void {
    this.originalScheduleDetails = this.dataObject;
  }

   /**
   * Recover from guarantor action
   */
    reject(){
      const formfields: FormfieldBase[] = [ new DatepickerBase({
        controlName: 'rejectedOnDate',
        label: 'Reject On Date',
        value: '',
        type: 'date',
        required: true
      })]
      const rejectLoanRescheduleDialogRef = this.dialog.open(FormDialogComponent, {
        data: { title: 'Reject Loan Reschedule',  layout: { addButtonText: 'Submit' }, formfields: formfields}
      });
      rejectLoanRescheduleDialogRef.afterClosed().subscribe((response: any) => {
        if (response.data) {
          const locale = this.settingsService.language.code;
          const dateFormat = 'dd MMMM yyyy';
          const dataObject = {
            ...response.data.value,
            rejectedOnDate: this.datePipe.transform(response.data.value.rejectedOnDate, dateFormat),
            dateFormat,
            locale
          };
          this.loansService.rejectLoanReschedule(this.scheduleId, 'reject', dataObject).subscribe(() => {
            this.router.navigate(['../../'], {relativeTo : this.route});
          });
        }
      });
    
    }
  
    approve(){
      const formfields: FormfieldBase[] = [ new DatepickerBase({
        controlName: 'approvedOnDate',
        label: 'Apporve On Date',
        value: '',
        type: 'date',
        required: true
      })]
      const approveLoanRescheduleDialogRef = this.dialog.open(FormDialogComponent, {
        data: { title: 'Approve Loan Reschedule',  layout: { addButtonText: 'Submit' }, formfields: formfields}
      });
      approveLoanRescheduleDialogRef.afterClosed().subscribe((response: any) => {
        if (response.data) {
          const locale = this.settingsService.language.code;
          const dateFormat = 'dd MMMM yyyy';
          const dataObject = {
            ...response.data.value,
            approvedOnDate: this.datePipe.transform(response.data.value.approvedOnDate, dateFormat),
            dateFormat,
            locale
          };
          this.loansService.approveLoanReschedule(this.scheduleId, 'approve', dataObject).subscribe(() => {
            this.router.navigate(['../../'], {relativeTo : this.route});
          });
        }
      });
    }

}
