/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/** Custom Services */
import { AccountingService } from '../../accounting.service';

/**
 * Edit gl account component.
 */
@Component({
  selector: 'mifosx-edit-gl-account',
  templateUrl: './edit-gl-account.component.html',
  styleUrls: ['./edit-gl-account.component.scss']
})
export class EditGlAccountComponent implements OnInit {

  /** GL account form. */
  glAccountForm: FormGroup;
  /** GL account and chart of accounts data. */
  glAccount: any;
  /** Account type data. */
  accountTypeData: any;
  /** Account usage data. */
  accountUsageData: any;
  /** Parent data. */
  parentData: any;
  /** Tag data. */
  tagData: any;
  /** Cancel route. (depending on creation of gl account or sub-ledger account) */
  cancelRoute = '../../';

  /** filters */
  filteredParentData:any;
  filteredTagData: any;
  filteredAccountUsageData: any;
  filteredAccountTypeData: any;

  /**
   * Retrieves the chart of accounts data from `resolve`.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {AccountingService} accountingService Accounting Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   */
  constructor(private formBuilder: FormBuilder,
              private accountingService: AccountingService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: { glAccountAndChartOfAccountsTemplate: any }) => {
      this.glAccount = data.glAccountAndChartOfAccountsTemplate;
    });
  }

  /**
   * Creates and sets gl account form.
   */
  ngOnInit() {
    this.createGlAccountForm();
    this.setGLAccountForm();
    this.setFilteredOptions();
  }

  /**
   * Creates gl account form.
   */
  createGlAccountForm() {
    this.glAccountForm = this.formBuilder.group({
      'type': ['', Validators.required],
      'name': [this.glAccount.name, Validators.required],
      'usage': [this.glAccount.usage.id, Validators.required],
      'glCode': [this.glAccount.glCode, Validators.required],
      'parentId': [this.glAccount.parentId],
      'tagId': [this.glAccount.tagId.id],
      'manualEntriesAllowed': [this.glAccount.manualEntriesAllowed],
      'description': [this.glAccount.description],
      'disabled': [this.glAccount.disabled]
    });
  }

  /**
   * Sets gl account form for selected account type.
   */
  setGLAccountForm() {
    this.accountTypeData = this.glAccount.accountTypeOptions;
    this.accountUsageData = this.glAccount.usageOptions;
    this.glAccountForm.get('type').valueChanges.subscribe(accountTypeId => {
      switch (accountTypeId) {
        case 1: this.parentData = this.glAccount.assetHeaderAccountOptions;
                this.tagData = this.glAccount.allowedAssetsTagOptions;
                this.filteredParentData = this.parentData ? this.parentData.slice() : this.parentData;
                this.filteredTagData = this.tagData ? this.tagData.slice() : this.tagData;
        break;
        case 2: this.parentData = this.glAccount.liabilityHeaderAccountOptions;
                this.tagData = this.glAccount.allowedLiabilitiesTagOptions;
                this.filteredParentData = this.parentData ? this.parentData.slice() : this.parentData;
                this.filteredTagData = this.tagData ? this.tagData.slice() : this.tagData;
        break;
        case 3: this.parentData = this.glAccount.equityHeaderAccountOptions;
                this.tagData = this.glAccount.allowedEquityTagOptions;
                this.filteredParentData = this.parentData ? this.parentData.slice() : this.parentData;
                this.filteredTagData = this.tagData ? this.tagData.slice() : this.tagData;
        break;
        case 4: this.parentData = this.glAccount.incomeHeaderAccountOptions;
                this.tagData = this.glAccount.allowedIncomeTagOptions;
                this.filteredParentData = this.parentData ? this.parentData.slice() : this.parentData;
                this.filteredTagData = this.tagData ? this.tagData.slice() : this.tagData;
        break;
        case 5: this.parentData = this.glAccount.expenseHeaderAccountOptions;
                this.tagData = this.glAccount.allowedExpensesTagOptions;
                this.filteredParentData = this.parentData ? this.parentData.slice() : this.parentData;
                this.filteredTagData = this.tagData ? this.tagData.slice() : this.tagData;
        break;
      }
    });

    this.glAccountForm.get('type').setValue(this.glAccount.type.id);
  }

  /**
   * Submits the gl account form and updates gl account,
   * if successful redirects to view updated account.
   */
  submit() {
    this.accountingService.updateGlAccount(this.glAccount.id, this.glAccountForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['../../', response.resourceId], { relativeTo: this.route });
      });
  }

  setFilteredOptions(){
    this.filteredAccountTypeData =  this.accountTypeData ? this.accountTypeData.slice() : this.accountTypeData;
    this.filteredAccountUsageData = this.accountUsageData ? this.accountUsageData.slice() : this.accountUsageData;
  }

}
