import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoansService } from 'app/loans/loans.service';
import { SettingsService } from 'app/settings/settings.service';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { DatepickerBase } from 'app/shared/form-dialog/formfield/model/datepicker-base';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';

@Component({
  selector: 'mifosx-view-reschedule-request',
  templateUrl: './view-reschedule-request.component.html',
  styleUrls: ['./view-reschedule-request.component.scss']
})
export class ViewRescheduleRequestComponent implements OnInit {

  @Input() dataObject: any;
  loanId: any;
  rescheduleLoanForm: FormGroup;
  loanRescheduleDetails:any;
  loanTermVariationsData:any = [];

  changeRepaymentDate:boolean = false;
  introduceGracePeriods:boolean = false;
  extendRepaymentPeriod:boolean = false;
  adjustinterestrates:boolean =  false;

  constructor(public dialog: MatDialog,
              private datePipe: DatePipe,
              private settingsService : SettingsService,
              private loansService : LoansService,
              private router : Router,
              private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.loanRescheduleDetails = this.dataObject;
    this.loanTermVariationsData = this.dataObject.loanTermVariationsData;
    this.buildDependency();
  }

  buildDependency(){
     if(this.loanTermVariationsData){
       this.loanTermVariationsData.forEach((element:any) => {
        if(element.termType.value == "dueDate") {
          this.loanRescheduleDetails.adjustedDueDate = element.dateValue;
          this.changeRepaymentDate = true;
        }
        if(element.termType.value == "graceOnPrincipal") {
          this.loanRescheduleDetails.graceOnPrincipal = element.decimalValue
          this.introduceGracePeriods = true;
        }
        if(element.termType.value == "graceOnInterest") {
          this.loanRescheduleDetails.graceOnInterest = element.decimalValue;
          this.introduceGracePeriods = true;
        }
        if(element.termType.value == "extendRepaymentPeriod") {
          this.loanRescheduleDetails.extraTerms  = element.decimalValue;
          this.extendRepaymentPeriod = true;
        }
        if(element.termType.value == "interestRateForInstallment") {
          this.loanRescheduleDetails.interestRate  = element.decimalValue;
          this.adjustinterestrates = true;
        } 
       });
     }
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
        this.loansService.rejectLoanReschedule(this.loanRescheduleDetails.id, 'reject', dataObject).subscribe(() => {
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
        this.loansService.approveLoanReschedule(this.loanRescheduleDetails.id, 'approve', dataObject).subscribe(() => {
          this.router.navigate(['../../'], {relativeTo : this.route});
        });
      }
    });
  }

  submit(){

  }

}
