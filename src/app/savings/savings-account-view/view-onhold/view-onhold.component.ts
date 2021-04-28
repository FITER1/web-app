import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mifosx-view-onhold',
  templateUrl: './view-onhold.component.html',
  styleUrls: ['./view-onhold.component.scss']
})
export class ViewOnholdComponent implements OnInit {

  /** Client Guarantors Accounts */
  guaranteesAccounts : any = [];
  savingsAccountData: any;

  openLoansColumns: string[] = ['Loan Product', 'Name', 'Loan Account No', 'Amount', 'Remaining Amount', 'Status', 'View Transactions'];

 /**
  * 
  * @param route 
  */
  constructor(private route : ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data : {savingsOnHold : any, savingsAccount: any}) => {
      this.guaranteesAccounts = data.savingsOnHold.guarantorAccounts;
      this.savingsAccountData = data.savingsAccount;
    });
   }

  ngOnInit(): void {
  }
}
