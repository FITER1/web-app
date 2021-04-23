/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountingService } from '../accounting.service';

/**
 * View journal entry dialog component.
 */
@Component({
  selector: 'mifosx-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrls: ['./view-journal-entry.component.scss']
})
export class ViewJournalEntryComponent implements OnInit {

  journalentryData:any;
  paymentDetails:any;

  /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {any} data Provides journal entry.
   */
  constructor(public dialogRef: MatDialogRef<ViewJournalEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private accountingService: AccountingService) { 
                this.journalentryData = data;
              }

  ngOnInit() {
    if(this.journalentryData.journalEntry.transactionDetails){
      this.accountingService.getPaymentDetails(this.journalentryData.journalEntry.transactionDetails.paymentDetails.id).subscribe((item:any) => {
        this.paymentDetails = item;
      });    
    }
  }

}
