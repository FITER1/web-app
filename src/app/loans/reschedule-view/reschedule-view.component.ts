import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from 'app/settings/settings.service';
import { TasksService } from 'app/tasks/tasks.service';
import { Dates } from 'app/core/utils/dates';

@Component({
  selector: 'app-reschedule-view',
  templateUrl: './reschedule-view.component.html',
  styleUrls: ['./reschedule-view.component.scss']
})
export class RescheduleViewComponent {
  rescheduleForm: FormGroup;
  repaymentScheduleRequest: any;


  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,   
    private translateService: TranslateService,    
    private settingsService: SettingsService,
    private dateUtils: Dates,
    private tasksService: TasksService) {
    this.route.data.subscribe(( data: { rescheduleRequest: any }) => {
      this.repaymentScheduleRequest = data.rescheduleRequest;
    });

    this.rescheduleForm = this.fb.group({
      comments: ['']
    });
  }



  onSubmit() {
    this.initateAction('approve'); 
  }

  initateAction(action: string){
    const rescheduleLoanDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { heading: this.translateService.instant('labels.heading.Reschedule Loan'), 
      dialogContext: this.translateService.instant('labels.dialogContext.Are you sure you want to ')+ action + this.translateService.instant('labels.dialogContext.the Reschedule Loan') }
    });
    rescheduleLoanDialogRef.afterClosed().subscribe((response: { confirm: any }) => {
      if (response && response.confirm) {
        this.approveOrRejectLoanRescheduleRequest(action);
      }
    });
  }

  approveOrRejectLoanRescheduleRequest(command: string) {
    const dateFormat = this.settingsService.dateFormat;
    const transactionDate = this.dateUtils.formatDate(this.settingsService.businessDate, dateFormat);
    const locale = this.settingsService.language.code;
    const formData = {
      dateFormat,
      locale
    };
    if (command === 'approve') {
      formData['approvedOnDate'] = transactionDate;
    } else {
      formData['rejectedOnDate'] = transactionDate;
    }

    if(this.rescheduleForm.get('comments').value) {
      formData['comments'] = this.rescheduleForm.get('comments').value;
    }

    let batchRequests = [];
    const url = 'rescheduleloans/' + this.repaymentScheduleRequest.id + '?command=' + command;
    const bodyData = JSON.stringify(formData);
    const batchData = { requestId: 1, relativeUrl: url, method: 'POST', body: bodyData };
    batchRequests.push(batchData);

    this.tasksService.submitBatchData(batchRequests).subscribe((response: any) => {
      this.cancel();
    });
  }

  cancel() {
    this.location.back();
  }

  reject() {
    this.initateAction('reject');
  }
}
