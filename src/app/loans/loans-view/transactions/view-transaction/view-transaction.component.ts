/** Angular Imports */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { LoansService } from 'app/loans/loans.service';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { SettingsService } from 'app/settings/settings.service';
import { AccountTransfersService } from 'app/account-transfers/account-transfers.service';

/** Custom Dialogs */

/**
 * View Transaction Component.
 * TODO: Add support for account transfers.
 */
@Component({
  selector: 'mifosx-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent {

  /** Transaction data. */
  transactionData: any;

  /**
   * Retrieves the Transaction data from `resolve`.
   * @param {LoansService} loansService Loans Service
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   * @param {DatePipe} datePipe DatePipe.
   * @param {SettingsService} settingsService Settings Service
   */
  constructor(private loansService: LoansService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              public dialog: MatDialog,
              private settingsService: SettingsService,
              private transferService : AccountTransfersService) {
    this.route.data.subscribe((data: { loansAccountTransaction: any }) => {
      this.transactionData = data.loansAccountTransaction;
    });
  }

  /**
   * Undo the loans transaction
   */
  undoTransaction() {
    this.route = this.route;
    const accountId = this.route.parent.parent.parent.snapshot.params['loanId'];
    const undoTransactionAccountDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { heading: 'Undo Transaction', dialogContext: `Are you sure you want undo the transaction ${this.transactionData.id}` }
    });
    undoTransactionAccountDialogRef.afterClosed().subscribe((response: { confirm: any }) => {
      if (response.confirm) {
        const locale = this.settingsService.language.code;
        const dateFormat = this.settingsService.dateFormat;
        let ignoreAccountTransfer = false;
        
        let data = {
          transactionDate: this.datePipe.transform(this.transactionData.date && new Date(this.transactionData.date), dateFormat),
          transactionAmount: 0,
          dateFormat,
          locale,
          ignoreAccountTransfer
        };
        if(!this.transactionData.transfer){
          this.loansService.executeLoansAccountTransactionsCommand(accountId, 'undo', data, this.transactionData.id).subscribe(() => {
            this.reload();
          });
        } else {
           data.ignoreAccountTransfer = true;
           this.transferService.reverseAccountTransfer(this.transactionData.transfer.id, data).subscribe(() => {
            this.reload();
          });
        }
      }
    });
  }

  /**
   * Refetches data fot the component
   * TODO: Replace by a custom reload component instead of hard-coded back-routing.
   */
  private reload() {
    const url: string = this.router.url;
    const refreshUrl: string = this.router.url.slice(0, this.router.url.indexOf('transactions') + 'transactions'.length);
    console.log(url, refreshUrl);
    this.router.navigateByUrl(refreshUrl, {skipLocationChange: false})
      .then(() => this.router.navigate([refreshUrl]));
  }

}
