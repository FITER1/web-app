import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mifosx-view-saving-account-onholdtransactions',
  templateUrl: './view-saving-account-onholdtransactions.component.html',
  styleUrls: ['./view-saving-account-onholdtransactions.component.scss']
})
export class ViewSavingAccountOnholdtransactionsComponent implements OnInit {

   /** Client Guarantors Accounts */
   onHoldTransactions : any = [];

   openLoansColumns: string[] = ['Transaction Id', 'Loan Account No', 'Amount', 'Transaction Type'];

  constructor(private route : ActivatedRoute,
                       private router: Router) {
   this.route.data.subscribe((data : {savingsOnHoldTransactions : any}) => {
      this.onHoldTransactions = data.savingsOnHoldTransactions.pageItems;
     console.log(data);
   });
  }

  ngOnInit(): void {
  }


}
