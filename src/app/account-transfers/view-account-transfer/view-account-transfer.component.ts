/** Angular Imports */
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UndoTransactionDialogComponent } from 'app/savings/savings-account-view/custom-dialogs/undo-transaction-dialog/undo-transaction-dialog.component';
import { SettingsService } from 'app/settings/settings.service';
import { AccountTransfersService } from '../account-transfers.service';

@Component({
  selector: 'mifosx-view-account-transfer',
  templateUrl: './view-account-transfer.component.html',
  styleUrls: ['./view-account-transfer.component.scss']
})
export class ViewAccountTransferComponent {

  viewAccountTransferData: any;
  /**
   * Retrieves the view account transfer data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute,
              private transferService : AccountTransfersService,
              private datePipe : DatePipe,
              public dialog: MatDialog,
              private settingsService: SettingsService,
              private router: Router) {
    this.route.data.subscribe((data: { viewAccountTransferData: any }) => {
      this.viewAccountTransferData = data.viewAccountTransferData;
    });
  }

  undoTransaction() {

      const transferId = this.viewAccountTransferData.id;
      const undoTransactionAccountDialogRef = this.dialog.open(UndoTransactionDialogComponent);
      undoTransactionAccountDialogRef.afterClosed().subscribe((response: any) => {
        if (response.confirm) {
          const locale = this.settingsService.language.code;
          const dateFormat = this.settingsService.dateFormat;
          const data = {
            transactionDate: this.datePipe.transform(this.viewAccountTransferData.transferDate && new Date(this.viewAccountTransferData.transferDate), dateFormat),
            transactionAmount: 0,
            dateFormat,
            locale,
            ignoreAccountTransfer:true
          };
          this.transferService.reverseAccountTransfer(transferId, data).subscribe(() => {
            this.reload();
          });
        }
      });
    }

    private reload() {
      const url: string = this.router.url;
      const refreshUrl: string = this.router.url.slice(0, this.router.url.indexOf('transactions') + 'transactions'.length);
      console.log(url, refreshUrl);
      this.router.navigateByUrl(refreshUrl, {skipLocationChange: false})
        .then(() => this.router.navigate([refreshUrl]));
    }

}
