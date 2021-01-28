/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';

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
  openLoansColumns: string[] = ['Account No', 'Loan Account', 'Original Loan', 'Loan Balance', 'Amount Paid', 'Type', 'Repayment Amount', 'Charges'];
  /** Open Savings Accounts Columns */
  openSavingsColumns: string[] = ['Account No', 'Saving Account', 'Balance', 'Type', 'Account Type', 'Deposit Amount', 'Charges'];
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
              private router: Router) {
    this.route.data.subscribe((data: { clientActionData: any }) => {
      this.clientPaymentData = data.clientActionData;
    });
  }

  ngOnInit() {
    this.loanAccounts = this.clientPaymentData.loanAccounts || [];
    this.savingAccounts = this.clientPaymentData.savingsAccounts || [];
    this.clientPaymentForm = this.formBuilder.group({});
    this.clientPaymentForm.addControl('repaymentAmount', new FormControl('', []));
    this.clientPaymentForm.addControl('depositAmount', new FormControl('', []));
  }

  /**
   * Submits the form and update savings account for the client.
   */
  submit() {
  }

}
