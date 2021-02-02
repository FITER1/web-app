import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'mifosx-view-guarantors',
  templateUrl: './view-guarantors.component.html',
  styleUrls: ['./view-guarantors.component.scss']
})
export class ViewGuarantorsComponent implements OnInit {

  /** Client Guarantors Accounts */
  guarantorAccounts : any = [];

  openLoansColumns: string[] = ['Loan Account No', 'Loan Product', 'Principal Amount', 'Hold Amount', 'Status'];

 /**
  * 
  * @param route 
  */
  constructor(private route : ActivatedRoute) {
    this.route.data.subscribe((data : {clientActionData : any}) => {
       this.guarantorAccounts = data.clientActionData.guarantorAccounts;
    });
   }

  ngOnInit(): void {
  }

}
