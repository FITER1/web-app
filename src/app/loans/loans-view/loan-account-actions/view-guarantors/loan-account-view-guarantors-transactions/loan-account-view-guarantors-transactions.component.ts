import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mifosx-loan-account-view-guarantors-transactions',
  templateUrl: './loan-account-view-guarantors-transactions.component.html',
  styleUrls: ['./loan-account-view-guarantors-transactions.component.scss']
})
export class LoanAccountViewGuarantorsTransactionsComponent implements OnInit {

   /** Client Guarantors Accounts */
   onHoldTransactions : any = [];

   openLoansColumns: string[] = ['Transaction Id', 'Savings Account Number', 'Client Name', 'Transaction Type', 'Transaction Date', 'Amount'];

  constructor(private route : ActivatedRoute,
                       private router: Router) {
   this.route.data.subscribe((data : {savingsOnHoldTransactions : any}) => {
      this.onHoldTransactions = data.savingsOnHoldTransactions.pageItems || [];
     console.log(data);
   });
  }

  ngOnInit(): void {
  }

}
