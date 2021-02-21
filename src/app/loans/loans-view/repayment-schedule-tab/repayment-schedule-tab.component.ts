import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from 'app/reports/reports.service';

@Component({
  selector: 'mifosx-repayment-schedule-tab',
  templateUrl: './repayment-schedule-tab.component.html',
  styleUrls: ['./repayment-schedule-tab.component.scss']
})
export class RepaymentScheduleTabComponent implements OnInit {

  /** Loan Repayment Schedule Details Data */
  repaymentScheduleDetails: any;
  /** Stores if there is any waived amount */
  isWaived: boolean;
  /** Columns to be displayed in original schedule table. */
  displayedColumns: string[] = ['number', 'days', 'date', 'paiddate', 'check', 'principalDue', 'balanceOfLoan', 'interest', 'fees', 'penalties', 'due', 'paid', 'inadvance', 'late', 'waived', 'outstanding'];
  loanId: string;
  pentahoUrl: any;
  showReport: boolean  = false;

  /**
   * Retrieves the loans with associations data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private reportsService: ReportsService) {
    this.route.parent.data.subscribe((data: { loanDetailsData: any }) => {
      this.repaymentScheduleDetails = data.loanDetailsData.repaymentSchedule;
    });
    this.loanId = this.route.parent.snapshot.paramMap.get('loanId');
  }

  ngOnInit() {
    this.isWaived = this.repaymentScheduleDetails.totalWaived > 0;
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
