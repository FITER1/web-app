import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsService } from 'app/savings/savings.service';
import { SettingsService } from 'app/settings/settings.service';

@Component({
  selector: 'mifosx-hold-amount-on-savings-account',
  templateUrl: './hold-amount-on-savings-account.component.html',
  styleUrls: ['./hold-amount-on-savings-account.component.scss']
})
export class HoldAmountOnSavingsAccountComponent implements OnInit {

  /** Minimum Due Date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum Due Date allowed. */
  maxDate = new Date();
  /** Savings account hold amount form. */
  savingAccountHoldAmountForm: FormGroup;
  /** saving account's Id */
  savingAccountId: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private savingsService: SavingsService,
    private settingsService: SettingsService) {
this.savingAccountId = this.route.parent.snapshot.params['savingAccountId'];
}

  ngOnInit(): void {
    this.createSavingAccountHoldAmountForm();
  }

  /**
   * Method to create the Saving Account Transaction Form.
   */
  createSavingAccountHoldAmountForm() {
    this.savingAccountHoldAmountForm = this.formBuilder.group({
      'transactionDate': ['', Validators.required],
      'transactionAmount': ['', Validators.required],
    });
  }

  /**
   * Method to submit the transaction details.
   */
  submit() {
    const prevTransactionDate: Date = this.savingAccountHoldAmountForm.value.transactionDate;
    // TODO: Update once language and date settings are setup
    const dateFormat = this.settingsService.dateFormat;
    const locale = this.settingsService.language.code;
    const transactionData = {
      ...this.savingAccountHoldAmountForm.value,
      transactionDate: this.datePipe.transform(prevTransactionDate, dateFormat),
      locale,
      dateFormat,
    }
    this.savingsService.executeSavingsAccountTransactionsCommand(this.savingAccountId, 'holdAmount', transactionData).subscribe(res => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

}
