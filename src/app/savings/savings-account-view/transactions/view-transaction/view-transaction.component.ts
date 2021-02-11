/** Angular Imports */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { SavingsService } from 'app/savings/savings.service';
import { SettingsService } from 'app/settings/settings.service';

/** Custom Dialogs */
import { UndoTransactionDialogComponent } from '../../custom-dialogs/undo-transaction-dialog/undo-transaction-dialog.component';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';

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
   * @param {SavingsService} savingsService Savings Service
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   * @param {DatePipe} datePipe DatePipe.
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private savingsService: SavingsService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              public dialog: MatDialog,
              private settingsService: SettingsService) {
    this.route.data.subscribe((data: { savingsAccountTransaction: any }) => {
      this.transactionData = data.savingsAccountTransaction;
    });
  }

  /**
   * Undo the savings transaction
   */
  undoTransaction() {
    const accountId = this.route.parent.snapshot.params['savingAccountId'];
    const undoTransactionAccountDialogRef = this.dialog.open(UndoTransactionDialogComponent);
    undoTransactionAccountDialogRef.afterClosed().subscribe((response: any) => {
      if (response.confirm) {
        const locale = this.settingsService.language.code;
        const dateFormat = this.settingsService.dateFormat;
        const data = {
          transactionDate: this.datePipe.transform(this.transactionData.date && new Date(this.transactionData.date), dateFormat),
          transactionAmount: 0,
          dateFormat,
          locale
        };
        this.savingsService.executeSavingsAccountTransactionsCommand(accountId, 'undo', data, this.transactionData.id).subscribe(() => {
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      }
    });
  }

  releaseTransaction(){
    const formfields: FormfieldBase[] =[];
    const data = {
      title: `Release Amount`,
      layout: { addButtonText: 'Confirm'},
      formfields: formfields,
      pristine: false
    };
    const accountId = this.route.parent.snapshot.params['savingAccountId'];
    const releaseTransactionAccountDialogRef = this.dialog.open(FormDialogComponent, {data});
    releaseTransactionAccountDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        const locale = this.settingsService.language.code;
        const dateFormat = this.settingsService.dateFormat;
        const dataObject = {
          transactionDate: this.datePipe.transform(new Date(), dateFormat),
          transactionAmount: 0,
          dateFormat,
          locale
        };
        this.savingsService.executeSavingsAccountTransactionsCommand(accountId, 'releaseAmount', dataObject, this.transactionData.id).subscribe(() => {
          this.reload();
        });
      }
    })
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
