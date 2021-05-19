import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsService } from 'app/savings/savings.service';

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
                       private router: Router,
                       private savingService: SavingsService) {
   this.route.data.subscribe((data : {savingsOnHoldTransactions : any}) => {
      this.onHoldTransactions = data.savingsOnHoldTransactions.pageItems || [];
     console.log(data);
   });
  }

  ngOnInit(): void {
  }

  routeToSavingsAccount(savingsId:string){
    this.savingService.getSavingsAccountData(savingsId, true).subscribe((data:any) => {
      if(data){this.router.navigate(['../../../../../savings-accounts',savingsId, 'transactions'], { relativeTo: this.route });}
    });
  }

}
