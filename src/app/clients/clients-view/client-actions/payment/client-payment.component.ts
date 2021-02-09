/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';
import {TasksService} from "../../../../tasks/tasks.service";
import {SettingsService} from "../../../../settings/settings.service";
import {DatePipe} from "@angular/common";

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
  totalColumns: String[] = ['Total Payment'];
  paymentDetailsColumns: String[] = ['Transaction Date', 'Payment Type', 'Account #', 'Cheque #', 'Routing Code', 'Reciept #', 'Bank #'];
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
              private datePipe: DatePipe) {
    this.route.data.subscribe((data: { clientActionData: any }) => {
      this.clientPaymentData = data.clientActionData;
    });
  }

  ngOnInit() {
    this.clientPaymentForm = this.formBuilder.group({
      'transactionDate': [new Date(), Validators.required],
      'transactionAmount': ['', Validators.required],
      'paymentTypeId': '',
      'note':''
    });
    this.clientId = this.clientPaymentData.clientData.id;
    this.loanAccounts = this.clientPaymentData.loanAccounts || [];
    this.savingAccounts = this.clientPaymentData.savingsAccounts || [];
    this.paymentTypeOptions = this.clientPaymentData.paymentTypeOptions || [];
    this.clientPaymentForm = this.formBuilder.group({});
    this.clientPaymentForm.addControl('repaymentAmount', new FormControl('', []));
    this.clientPaymentForm.addControl('depositAmount', new FormControl('', []));
    this.clientPaymentForm.addControl('transactionDate', new FormControl('', []));
    this.clientPaymentForm.addControl('paymentTypeId', new FormControl('', []));
    this.clientPaymentForm.addControl('accountNumber', new FormControl(''));
    this.clientPaymentForm.addControl('checkNumber', new FormControl(''));
    this.clientPaymentForm.addControl('routingCode', new FormControl(''));
    this.clientPaymentForm.addControl('receiptNumber', new FormControl(''));
    this.clientPaymentForm.addControl('bankNumber', new FormControl(''));
    this.totalPaymentArray.push(this.totalPaymentAmount);
    this.paymentDetails.push('Payment Details');
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
  submit() {

    const dateFormat = this.settingsService.dateFormat;
    const transactionDate = this.datePipe.transform(this.clientPaymentForm.value.transactionDate, dateFormat);
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
      const transactionAmount = this.savingDeposits[this.savingIds.indexOf(element)];
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
      const batchData = { requestId: reqId++, relativeUrl: url, method: 'POST', body: bodyData };
      this.batchRequests.push(batchData);
    });
    this.tasksService.submitBatchTransactionalData(this.batchRequests).subscribe((response: any) => {
      response.forEach((responseEle: any) => {
        this.errorResponse = [];
        if (responseEle.statusCode != '200') {
          this.errorResponse.push(responseEle.body);
        }
      });
      if(this.errorResponse.length === 0){
        this.reload();
      }
    });
  }
}
