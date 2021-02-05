import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'mifosx-view-guarantees',
  templateUrl: './view-guarantees.component.html',
  styleUrls: ['./view-guarantees.component.scss']
})
export class ViewGuaranteesComponent implements OnInit {

  /** Client Guarantors Accounts */
  clientGuaranteesAccounts : any = [];

  openLoansColumns: string[] = ['Loan Account No', 'Status', 'Principal Amount', 'Hold Amount', 'Loan Product'];

 /**
  * 
  * @param route 
  */
  constructor(private route : ActivatedRoute) {
    this.route.data.subscribe((data : {clientActionData : any}) => {
       this.clientGuaranteesAccounts = data.clientActionData.guarantorAccounts;
    });
   }

  ngOnInit(): void {
  }

}
