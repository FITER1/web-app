import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'app/reports/reports.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mifosx-original-schedule-tab',
  templateUrl: './original-schedule-tab.component.html',
  styleUrls: ['./original-schedule-tab.component.scss']
})
export class OriginalScheduleTabComponent implements OnInit {

  /** Loan Details Data */
  originalScheduleDetails: any;
  /** Columns to be displayed in original schedule table. */
  displayedColumns: string[] = ['date', 'principalDue', 'balanceOfLoan', 'interest', 'fees', 'penalties', 'outstanding'];
  loanId: string;
  pentahoUrl: any;
  showReport: boolean  = false;

  /**
   * Retrieves the loans with associations data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute,
              private reportsService: ReportsService,
              private sanitizer: DomSanitizer) {
    this.route.parent.data.subscribe((data: { loanDetailsData: any }) => {
      this.originalScheduleDetails = data.loanDetailsData.originalSchedule;
    });
    this.loanId = this.route.parent.snapshot.paramMap.get('loanId');
  }

  ngOnInit() {
  }

  generate() {
    const data = {
      'output-type':	'PDF',
      R_selectLoan:	this.loanId
    };
    this.reportsService.getPentahoRunReportData('Loan Repayment schedule', data, 'default', 'en', 'dd MMMM yyyy')
      .subscribe( (res: any) => {
        const contentType = res.headers.get('Content-Type');
        const file = new Blob([res.body], {type: contentType});
        const filecontent = URL.createObjectURL(file);
        this.pentahoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filecontent);
        this.showReport = true;
      });
  }

  closeReport(){
    this.showReport = false;
  }

}
