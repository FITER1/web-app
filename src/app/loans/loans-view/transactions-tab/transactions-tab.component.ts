import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'mifosx-transactions-tab',
  templateUrl: './transactions-tab.component.html',
  styleUrls: ['./transactions-tab.component.scss']
})
export class TransactionsTabComponent implements OnInit {

  /** transactions Details Data */
  transactions: any;
  /** Show Transactions Data */
  showTransactionsData: any;
  /** Temporary Transaction Data */
  tempTransaction: any;
  /** Form control to handle accural parameter */
  hideAccrualsParam: FormControl;
  /** Stores the status of the loan account */
  status: string;
  /** Columns to be displayed in original schedule table. */
  displayedColumns: string[] = ['id', 'office', 'transactionDate', 'transactionType', 'amount', 'principal', 'interest', 'fee', 'penalties', 'overpaid', 'loanBalance', 'actions'];
  /** Loan Details Data */
  loanDetails: any;
  /**
   * Retrieves the loans with associations data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.parent.parent.data.subscribe((data: { loanDetailsData: any }) => {
      this.transactions = data.loanDetailsData.transactions;
      this.tempTransaction = data.loanDetailsData.transactions;
      this.status = data.loanDetailsData.status.value;
      this.loanDetails = data.loanDetailsData;
    });
  }

  ngOnInit() {
    this.hideAccrualsParam = new FormControl(true);
    this.tempTransaction.forEach((element: any) => {
      if (element.type.accrual) {
        this.tempTransaction = this.removeItem(this.tempTransaction, element);
      }
    });
    this.showTransactionsData = this.tempTransaction;
  }

  /**
   * Checks Status of the loan account
   */
  checkStatus() {
    if (this.status === 'Active' || this.status === 'Closed (obligations met)' || this.status === 'Overpaid' ||
      this.status === 'Closed (rescheduled)' || this.status === 'Closed (written off)') {
      return true;
    }
    return false;
  }

  hideAccruals()  {
    if (!this.hideAccrualsParam.value) {
      this.showTransactionsData = this.tempTransaction;
    } else {
      this.showTransactionsData = this.transactions;
    }
  }

  removeItem(arr: any, item: any) {
    return arr.filter((f: any) => f !== item);
   }

  /**
   * Show Transactions Details
   * @param transactionsData Transactions Data
   */
  showTransactions(transactionsData: any) {
    if (transactionsData.type.id === 2 || transactionsData.type.id === 4 || transactionsData.type.id === 1) {
      this.router.navigate([transactionsData.id], { relativeTo: this.route });
    }
  }

  /**
   * Stops the propagation to view pages.
   * @param $event Mouse Event
   */
  routeEdit($event: MouseEvent, transactionId: any) {
    $event.stopPropagation();
    this.viewloantransactionjournalentries(transactionId);
  }
  /**
   * @param  {} {this.router.navigate(['/accounting'
   * @param  {} 'journal-entries']
   * @param  {{'loanId':this.loanDetails.id}} {queryParams
   * @param  {this.route}} relativeTo
   */
  viewJournalEntries(){
    this.router.navigate(['/accounting', 'journal-entries'], {queryParams: {'loanId': this.loanDetails.id, 'clientId': this.loanDetails.clientId}, relativeTo : this.route});
  }

  viewloantransactionjournalentries(transactionId: any){
    this.router.navigate(['/accounting', 'journal-entries', 'transactions', 'view', 'L'+transactionId], { relativeTo : this.route});
  }

}
