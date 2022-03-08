/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OrganizationService } from '../organization.service';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from 'app/settings/settings.service';
import { AlertService } from 'app/core/alert/alert.service';

@Component({
  selector: 'mifosx-surplus-distribution',
  templateUrl: './surplus-distribution.component.html',
  styleUrls: ['./surplus-distribution.component.scss']
})
export class SurplusDistributionComponent implements OnInit {

  /** Minimum date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum date allowed. */
  maxDate = new Date();
  /** Initializes new form group eportForm */
  reportForm = new FormGroup({});
  /** Office Data */
  officeData: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private organizationService : OrganizationService,
    private dialog: MatDialog, private datePipe: DatePipe,
    private router: Router,
    private alertService : AlertService) { 
      this.route.data.subscribe((data: { offices: any }) => {
        this.officeData = data.offices;
      });
    }

  ngOnInit(): void {
    this.createReportForm();
  }

  createReportForm(){
    this.reportForm = this.formBuilder.group({
      'officeId': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required]
    });
  }

  submit(){
    let startDate = this.datePipe.transform(this.reportForm.value.startDate, 'yyyy-MM-dd');
    let endDate = this.datePipe.transform(this.reportForm.value.endDate, 'yyyy-MM-dd');
      console.log(startDate);
     this.organizationService.surplusDistributionDataGeneration(this.reportForm.value.officeId, 
      startDate, endDate, false).subscribe((data) => {
        console.log(data, 'first');
        if(data){
          const cofirmDailog = this.dialog.open(ConfirmationDialogComponent, {
            data: { dialogContext: 'Are you sure you want Regenrate Data for selected Month' }
          });
          cofirmDailog.afterClosed().subscribe((response: any) => {
            if (response.confirm) {
              this.organizationService.surplusDistributionDataGeneration(this.reportForm.value.officeId, 
                startDate, endDate, true).subscribe((data) => {
                  console.log(data);
                  this.router.navigate(['../'], { relativeTo: this.route });
                });
            }
          });
        }
        if(!data){
        this.alertService.alert({ type: '', message: 'Request is processing' });
        this.router.navigate(['../'], { relativeTo: this.route });
        }
     });
  }

}
