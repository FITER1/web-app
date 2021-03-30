/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe} from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';
import {TasksService} from "../../../../tasks/tasks.service";
import { ReportsService } from '../../../../reports/reports.service';
import {SettingsService} from "../../../../settings/settings.service";
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { LoansService } from 'app/loans/loans.service';
import { MatDialog } from '@angular/material/dialog';
import { SavingsService } from 'app/savings/savings.service';
import { WaiveChargeDialogComponent } from 'app/savings/savings-account-view/custom-dialogs/waive-charge-dialog/waive-charge-dialog.component';

/**
 * Clients Update Savings Account Component
 */
@Component({
  selector: 'fiter-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  /** Open Loan Accounts Columns */
  openLoansColumns: string[] = ['Account No', 'Loan Account', 'Original Loan', 'Loan Balance', 'Amount Paid', 'Type', 'Repayment Amount', 'Charges', 'Add Loan Charges'];
  /** Open Savings Accounts Columns */
  openSavingsColumns: string[] = ['Account No', 'Saving Account', 'Balance', 'Account Type', 'Type', 'Deposit Amount', 'Charges', 'Add Savings Charges'];
  totalColumns: String[] = ['Total Payment', 'More'];
  paymentDetailsColumns1: String[] = ['Transaction Date', 'Bank #', 'Payment Type', 'Reciept #'];
  paymentDetailsColumns2: String[] = ['Cheque #', 'Routing Code', 'Account #'];
  errorResponseColumns: String[] = ['Errors'];
  /** Client Update Savings Account form. */
  clientPaymentForm: FormGroup;
  /** Client Data */
  clientPaymentData: any;
  /** LoanData */
  loanAccounts: any;
  /** savingsData */
  savingAccounts: any;
  /** Show Closed Loan Accounts */
  showClosedLoanAccounts = false;
  /** Show Closed Saving Accounts */
  showClosedSavingAccounts = false;
  isSavings = true;
  /** local variables */
  totalPaymentAmount: number = 0;
  LoanPaymentAmount: number = 0;
  savingsDepositAmount: number = 0;
  loanIds: bigint[] = [];
  savingIds: bigint[] = [];
  loanRepayments: number[] = [];
  savingDeposits: number[] = [];
  existingPlace: number = -1;
  totalPaymentArray: number[] = [];
  paymentDetails: any[] = [];
  transactionDetails: any[] = [];
  batchRequests: any[];
  /** Minimum Date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum Date allowed. */
  maxDate = new Date();
  paymentTypeOptions: any[] = [];
  clientId: bigint;
  errorResponse: any[];
  pentahoUrl: any;
  showReport: boolean = false;
  transactionDate: any;
  showError: boolean = false;
  showPaymentDetails = false;
  loanCharges:any[];
  savingsCharges:any[];
  showLoanCharges:boolean=false;
  showSavingsCharges:boolean =false;
  loanId:any;
  savingsId:any;

  chargesColumns: String[] = ['Applied Charges', 'Charge Duedate', 'Amount', 'Actions'];

  /**
   * Fetches Client Action Data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {SavingsService} savingsService Savings Service
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   */
  constructor(private formBuilder: FormBuilder,
              private clientsService: ClientsService,
              private route: ActivatedRoute,
              private router: Router,
              private tasksService: TasksService,
              private settingsService: SettingsService,
              private datePipe: DatePipe,
              private reportsService: ReportsService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              public loansService: LoansService,
              public savingsService : SavingsService) {
    this.route.data.subscribe((data: { clientActionData: any }) => {
      this.clientPaymentData = data.clientActionData;
    });
  }

  ngOnInit() {
    this.clientPaymentForm = this.formBuilder.group({
      'transactionDate': [new Date(), Validators.required],
      'transactionAmount': [''],
      'paymentTypeId': '',
      'note':''
    });
    this.clientId = this.clientPaymentData.clientData.id;
    this.loanAccounts = this.clientPaymentData.loanAccounts || [];
    this.savingAccounts = this.clientPaymentData.savingsAccounts || [];
    this.paymentTypeOptions = this.clientPaymentData.paymentTypeOptions || [];
    this.clientPaymentForm.addControl('repaymentAmount', new FormControl('', []));
    this.clientPaymentForm.addControl('depositAmount', new FormControl('', []));
    this.clientPaymentForm.addControl('transactionDate', new FormControl('', []));
    this.clientPaymentForm.addControl('paymentTypeId', new FormControl('', []));
    this.clientPaymentForm.addControl('accountNumber', new FormControl('', []));
    this.clientPaymentForm.addControl('checkNumber', new FormControl('', []));
    this.clientPaymentForm.addControl('routingCode', new FormControl('', []));
    this.clientPaymentForm.addControl('receiptNumber', new FormControl('', Validators.required));
    this.clientPaymentForm.addControl('bankNumber', new FormControl('', []));
    this.totalPaymentArray.push(this.totalPaymentAmount);
    this.paymentDetails.push('Payment Details');
  }

  addPaymentDetails() {
    this.showPaymentDetails = !this.showPaymentDetails;
  }

  captureLoanAmount(loanId: bigint){
    this.totalPaymentArray = [];
    this.totalPaymentAmount = 0;
    this.LoanPaymentAmount = 0;
    this.existingPlace = -1;
    const generalDetails = this.clientPaymentForm.value;
    this.existingPlace = this.loanIds.indexOf(loanId);
    if(this.existingPlace != -1){
      this.loanRepayments.splice(this.existingPlace,1);
      this.loanIds.splice(this.existingPlace,1);
    }
    if(generalDetails.repaymentAmount != 0) {
      this.loanIds.push(loanId);
      this.loanRepayments.push(generalDetails.repaymentAmount);
    }
    for(var i=0;i<this.loanRepayments.length;i++){
      this.LoanPaymentAmount = +this.LoanPaymentAmount + +this.loanRepayments[i];
    }
    this.totalPaymentAmount = +this.savingsDepositAmount + +this.LoanPaymentAmount;
    this.totalPaymentArray.push(this.totalPaymentAmount);
  }

  captureSavingsAmount(savingId: bigint){
    this.totalPaymentArray = [];
    this.totalPaymentAmount = 0;
    this.savingsDepositAmount = 0;
    this.existingPlace = -1;
    const generalDetails = this.clientPaymentForm.value;
    this.existingPlace = this.savingIds.indexOf(savingId);
    if(this.existingPlace != -1){
      this.savingDeposits.splice(this.existingPlace,1);
      this.savingIds.splice(this.existingPlace,1);
    }
    if(generalDetails.depositAmount != 0) {
      this.savingIds.push(savingId);
      this.savingDeposits.push(generalDetails.depositAmount);
    }
    for(var i=0;i<this.savingDeposits.length;i++){
      this.savingsDepositAmount = +this.savingsDepositAmount + +this.savingDeposits[i];
    }
    this.totalPaymentAmount = +this.savingsDepositAmount + +this.LoanPaymentAmount;
    this.totalPaymentArray.push(this.totalPaymentAmount);
  }


  reload() {
    const url: string = `/clients/`+this.clientId+`/general`;
    this.router.navigateByUrl(`/clients/`+this.clientId+`/general`, { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  /**
   * Submits the form and make deposit and transactions to the loan.
   */
  submitAndReport() {

    const dateFormat = this.settingsService.dateFormat;
    this.transactionDate = this.datePipe.transform(this.clientPaymentForm.value.transactionDate, dateFormat);
    const transactionDate = this.transactionDate;
    const locale = this.settingsService.language.code;
    const paymentTypeId = this.clientPaymentForm.value.paymentTypeId;
    const accountNumber = this.clientPaymentForm.value.accountNumber;
    const checkNumber = this.clientPaymentForm.value.checkNumber;
    const routingCode = this.clientPaymentForm.value.routingCode;
    const receiptNumber = this.clientPaymentForm.value.receiptNumber;
    const bankNumber = this.clientPaymentForm.value.bankNumber;
    this.batchRequests = [];
    let reqId = 1;
    this.loanIds.forEach((element: any) => {
      const transactionAmount = this.loanRepayments[this.loanIds.indexOf(element)];
      const url = 'loans/' + element + '/transactions?command=repayment';
      const formData = {
        dateFormat,
        transactionDate,
        locale,
        transactionAmount,
        paymentTypeId,
        accountNumber,
        checkNumber,
        routingCode,
        receiptNumber,
        bankNumber
      };
      const bodyData = JSON.stringify(formData);
      const batchData = { requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData };
      this.batchRequests.push(batchData);
    });
    this.savingIds.forEach((element: any) => {
      let transactionAmount = this.savingDeposits[this.savingIds.indexOf(element)];
      const transactionDate = this.transactionDate;
      const dueDate = this.transactionDate;
      const receiptNumber = this.clientPaymentForm.value.receiptNumber;
      if(transactionAmount !== 0) {
        const url = 'savingsaccounts/' + element + '/transactions?command=deposit';
        const formData = {
          dateFormat,
          transactionDate,
          locale,
          transactionAmount,
          paymentTypeId,
          accountNumber,
          checkNumber,
          routingCode,
          receiptNumber,
          bankNumber
        };
        const bodyData = JSON.stringify(formData);
        const batchData = {requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData};
        this.batchRequests.push(batchData);
      }
      this.savingAccounts.forEach((element1: any) => {
        if(element1.id === element){
          element1.savingsCharges.forEach((element2: any) => {
            let amount = 0;
            if(transactionAmount > element2.amountOutstanding){
              amount = element2.amountOutstanding;
              transactionAmount = +transactionAmount - +element2.amountOutstanding;
            }else{
              amount = transactionAmount;
              transactionAmount = 0;
            }
            const url = 'savingsaccounts/' + element + '/charges/' + element2.id + '?command=paycharge';
            const formData = {
              dateFormat,
              dueDate,
              locale,
              amount,
              paymentTypeId,
              accountNumber,
              checkNumber,
              routingCode,
              receiptNumber,
              bankNumber
            };
            const bodyData = JSON.stringify(formData);
            const batchData = {requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData};
            this.batchRequests.push(batchData);
          });
        }
      });
    });
    this.tasksService.submitBatchTransactionalData(this.batchRequests).subscribe((response: any) => {
      response.forEach((responseEle: any) => {
        this.errorResponse = [];
        if (responseEle.statusCode != '200') {
          this.showError = true;
          this.errorResponse.push(responseEle.body);
        }
      });
      if(this.errorResponse.length === 0){
        const R_reciptNo = this.clientPaymentForm.value.receiptNumber;
        const R_clientId = this.clientId;
        const R_tDate = this.transactionDate;
        const formData = {
          R_reciptNo,
          R_clientId,
          R_tDate
        };
        formData['output-type'] = 'PDF';
        this.reportsService.getPentahoRunReportData('Payment Receipts', formData, 'default', this.settingsService.language.code, this.settingsService.dateFormat)
          .subscribe( (res: any) => {
            const contentType = 'application/pdf';
            const file = new Blob([res.body], {type: contentType});
            const filecontent = URL.createObjectURL(file);
            this.pentahoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filecontent);
            this.showReport = true;
          });
      }
    });
  }

  submit() {
    const dateFormat = this.settingsService.dateFormat;
    this.transactionDate = this.datePipe.transform(this.clientPaymentForm.value.transactionDate, dateFormat);
    const transactionDate = this.transactionDate;
    const locale = this.settingsService.language.code;
    const paymentTypeId = this.clientPaymentForm.value.paymentTypeId;
    const accountNumber = this.clientPaymentForm.value.accountNumber;
    const checkNumber = this.clientPaymentForm.value.checkNumber;
    const routingCode = this.clientPaymentForm.value.routingCode;
    const receiptNumber = this.clientPaymentForm.value.receiptNumber;
    const bankNumber = this.clientPaymentForm.value.bankNumber;
    this.batchRequests = [];
    let reqId = 1;
    this.loanIds.forEach((element: any) => {
      const transactionAmount = this.loanRepayments[this.loanIds.indexOf(element)];
      const url = 'loans/' + element + '/transactions?command=repayment';
      const formData = {
        dateFormat,
        transactionDate,
        locale,
        transactionAmount,
        paymentTypeId,
        accountNumber,
        checkNumber,
        routingCode,
        receiptNumber,
        bankNumber
      };
      const bodyData = JSON.stringify(formData);
      const batchData = { requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData };
      this.batchRequests.push(batchData);
    });
    this.savingIds.forEach((element: any) => {
      let transactionAmount = this.savingDeposits[this.savingIds.indexOf(element)];
      const transactionDate = this.transactionDate;
      const dueDate = this.transactionDate;
      const receiptNumber = this.clientPaymentForm.value.receiptNumber;
      if(transactionAmount !== 0) {
        const url = 'savingsaccounts/' + element + '/transactions?command=deposit';
        const formData = {
          dateFormat,
          transactionDate,
          locale,
          transactionAmount,
          paymentTypeId,
          accountNumber,
          checkNumber,
          routingCode,
          receiptNumber,
          bankNumber
        };
        const bodyData = JSON.stringify(formData);
        const batchData = {requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData};
        this.batchRequests.push(batchData);
      }
      this.savingAccounts.forEach((element1: any) => {
        if(element1.id === element){
          element1.savingsCharges.forEach((element2: any) => {
            let amount = 0;
            if(transactionAmount > element2.amountOutstanding){
              amount = element2.amountOutstanding;
              transactionAmount = +transactionAmount - +element2.amountOutstanding;
            }else{
              amount = transactionAmount;
              transactionAmount = 0;
            }
            const url = 'savingsaccounts/' + element + '/charges/' + element2.id + '?command=paycharge';
            const formData = {
              dateFormat,
              dueDate,
              locale,
              amount,
              paymentTypeId,
              accountNumber,
              checkNumber,
              routingCode,
              receiptNumber,
              bankNumber
            };
            const bodyData = JSON.stringify(formData);
            const batchData = {requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData};
            this.batchRequests.push(batchData);
          });
        }
      });
    });
    this.tasksService.submitBatchTransactionalData(this.batchRequests).subscribe((response: any) => {
      response.forEach((responseEle: any) => {
        this.errorResponse = [];
        if (responseEle.statusCode != '200') {
          this.showError = true;
          this.errorResponse.push(responseEle.body);
        }
      });
      if(this.errorResponse.length === 0){
        this.reload();
      }
    });
  }

   /**
   * Waive's the loan charge
   * @param {any} chargeId Charge Id
   */
  waiveLoanCharge(chargeId: any) {
      const waiveChargeDialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { heading: 'Waive Charge', dialogContext: `Are you sure you want to waive charge with id: ${chargeId}`, type: 'Basic' } });
      waiveChargeDialogRef.afterClosed().subscribe((response: any) => {
        if (response.confirm) {
          this.loansService.executeLoansAccountChargesCommand(this.loanId, 'waive', {}, chargeId)
            .subscribe(() => {
              this.refreshPage();
            });
        }
      });
    }

     /**
   * Stops the propagation to view charge page.
   * @param $event Mouse Event
   */
  routeEdit($event: MouseEvent) {
    $event.stopPropagation();
  }

  getLoanCharges(loanId: any){
    this.loanCharges = [];
    if(!this.showLoanCharges){
      this.showLoanCharges = true;
    }else{
      this.showLoanCharges = false;
    }
    this.loanId = loanId;
    this.loansService.getLoansAccountCharges(loanId).subscribe((response:any) => {
      this.loanCharges = response.filter((charge:any) => charge.amountOutstanding > 0);
    });
  }

  getSavingsCharges(savingsId: any){
    this.savingsCharges = [];
    if(!this.showSavingsCharges){
      this.showSavingsCharges = true;
    }else{
      this.showSavingsCharges = false;
    }
    this.savingsId = savingsId;
    this.savingsService.getSavingsAccountCharges(savingsId).subscribe((response:any) => {
      this.savingsCharges = response.filter((charge:any) => charge.amountOutstanding > 0);
    });
  }

  /**
   * Waive's the savings charge
   * @param {any} chargeId Charge Id
   */
   waiveSavingsCharge(chargeId: any) {
    const waiveChargeDialogRef = this.dialog.open(WaiveChargeDialogComponent, { data: { id: chargeId } });
    waiveChargeDialogRef.afterClosed().subscribe((response: any) => {
      if (response.confirm) {
        this.savingsService.executeSavingsAccountChargesCommand(this.savingsId, 'waive', {}, chargeId)
          .subscribe(() => {
            this.refreshPage();
          });
      }
    });
  }

  /**
   * Refresh the same page
   */
  refreshPage(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
