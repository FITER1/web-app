/** Angular Imports */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Create Loans Account Terms Step
 */
@Component({
  selector: 'mifosx-loans-account-terms-step',
  templateUrl: './loans-account-terms-step.component.html',
  styleUrls: ['./loans-account-terms-step.component.scss']
})
export class LoansAccountTermsStepComponent implements OnInit, OnChanges {

  /** Loans Account Product Template */
  @Input() loansAccountProductTemplate: any;
  /** Loans Account Template */
  @Input() loansAccountTemplate: any;

  /** Minimum date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum date allowed. */
  maxDate = new Date();
  /** Loans Account Terms Form */
  loansAccountTermsForm: FormGroup;
  /** Term Frequency Type Data */
  termFrequencyTypeData: any;
  /** Repayment Frequency Nth Day Type Data */
  repaymentFrequencyNthDayTypeData: any;
  /** Repayment Frequency Days of Week Type Data */
  repaymentFrequencyDaysOfWeekTypeData: any;
  /** Interest Type Data */
  interestTypeData: any;
  /** Amortization Type Data */
  amortizationTypeData: any;
  /** Interest Calculation Period Type Data */
  interestCalculationPeriodTypeData: any;
  /** Transaction Processing Strategy Data */
  transactionProcessingStrategyData: any;
  /** Client Active Loan Data */
  clientActiveLoanData: any;

  /**
   * Create Loans Account Terms Form
   * @param formBuilder FormBuilder
   * @param route Route
   * @param router Router
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.createloansAccountTermsForm();
  }
  /**
   * Executes on change of input values
   */
  ngOnChanges() {
    if (this.loansAccountProductTemplate) {
      if (!this.loansAccountTemplate.id) {
        this.loansAccountTermsForm.patchValue({
          'repaymentsStartingFromDate': this.loansAccountProductTemplate.expectedFirstRepaymentOnDate && new Date(this.loansAccountTemplate.expectedFirstRepaymentOnDate),
          'principal': this.loansAccountProductTemplate.principal,
          'loanTermFrequency': this.loansAccountProductTemplate.termFrequency,
          'loanTermFrequencyType': this.loansAccountProductTemplate.termPeriodFrequencyType.id,
          'numberOfRepayments': this.loansAccountProductTemplate.numberOfRepayments,
          'repaymentEvery': this.loansAccountProductTemplate.repaymentEvery,
          'repaymentFrequencyType': this.loansAccountProductTemplate.repaymentFrequencyType.id,
          'interestRatePerPeriod': this.loansAccountProductTemplate.interestRatePerPeriod,
          'amortizationType': this.loansAccountProductTemplate.amortizationType.id,
          'isEqualAmortization': this.loansAccountProductTemplate.isEqualAmortization,
          'interestType': this.loansAccountProductTemplate.interestType.id,
          'isFloatingInterestRate': this.loansAccountProductTemplate.isLoanProductLinkedToFloatingRate ? false : '',
          'interestCalculationPeriodType': this.loansAccountProductTemplate.interestCalculationPeriodType.id,
          'allowPartialPeriodInterestCalcualtion': this.loansAccountProductTemplate.allowPartialPeriodInterestCalcualtion,
          'inArrearsTolerance': this.loansAccountProductTemplate.inArrearsTolerance,
          'graceOnPrincipalPayment': this.loansAccountProductTemplate.graceOnPrincipalPayment,
          'graceOnInterestPayment': this.loansAccountProductTemplate.graceOnInterestPayment,
          'graceOnArrearsAgeing': this.loansAccountProductTemplate.graceOnArrearsAgeing,
          'transactionProcessingStrategyId': this.loansAccountProductTemplate.transactionProcessingStrategyId,
          'graceOnInterestCharged': this.loansAccountProductTemplate.graceOnInterestCharged,
          'fixedEmiAmount': this.loansAccountProductTemplate.fixedEmiAmount,
          'maxOutstandingLoanBalance': this.loansAccountProductTemplate.maxOutstandingLoanBalance,
          'repaymentFrequencyNthDayType': this.loansAccountProductTemplate.repaymentFrequencyNthDayType ? this.loansAccountProductTemplate.repaymentFrequencyNthDayType.id : '',
          'repaymentFrequencyDayOfWeekType': this.loansAccountProductTemplate.repaymentFrequencyDayOfWeekType ? this.loansAccountProductTemplate.repaymentFrequencyDayOfWeekType.id : ''
        });
      }
      this.setOptions();
    }
  }

  ngOnInit() {
    console.log(this.loansAccountProductTemplate, this.loansAccountTemplate);
    if (this.loansAccountTemplate) {
      if (this.loansAccountTemplate.loanProductId) {
        this.loansAccountTermsForm.patchValue({
          'repaymentsStartingFromDate': this.loansAccountTemplate.expectedFirstRepaymentOnDate && new Date(this.loansAccountTemplate.expectedFirstRepaymentOnDate),
          'principal': this.loansAccountTemplate.principal,
          'loanTermFrequency': this.loansAccountTemplate.termFrequency,
          'loanTermFrequencyType': this.loansAccountTemplate.termPeriodFrequencyType.id,
          'numberOfRepayments': this.loansAccountTemplate.numberOfRepayments,
          'repaymentEvery': this.loansAccountTemplate.repaymentEvery,
          'repaymentFrequencyType': this.loansAccountTemplate.repaymentFrequencyType.id,
          'interestRatePerPeriod': this.loansAccountTemplate.interestRatePerPeriod,
          'amortizationType': this.loansAccountTemplate.amortizationType.id,
          'isEqualAmortization': this.loansAccountTemplate.isEqualAmortization,
          'interestType': this.loansAccountTemplate.interestType.id,
          'isFloatingInterestRate': this.loansAccountTemplate.isLoanProductLinkedToFloatingRate ? false : '',
          'interestCalculationPeriodType': this.loansAccountTemplate.interestCalculationPeriodType.id,
          'allowPartialPeriodInterestCalcualtion': this.loansAccountTemplate.allowPartialPeriodInterestCalcualtion,
          'inArrearsTolerance': this.loansAccountTemplate.inArrearsTolerance,
          'graceOnPrincipalPayment': this.loansAccountTemplate.graceOnPrincipalPayment,
          'graceOnInterestPayment': this.loansAccountTemplate.graceOnInterestPayment,
          'graceOnArrearsAgeing': this.loansAccountTemplate.graceOnArrearsAgeing,
          'transactionProcessingStrategyId': this.loansAccountTemplate.transactionProcessingStrategyId,
          'graceOnInterestCharged': this.loansAccountTemplate.graceOnInterestCharged,
          'fixedEmiAmount': this.loansAccountTemplate.fixedEmiAmount,
          'maxOutstandingLoanBalance': this.loansAccountTemplate.maxOutstandingLoanBalance,
          'repaymentFrequencyNthDayType': this.loansAccountTemplate.repaymentFrequencyNthDayType ? this.loansAccountTemplate.repaymentFrequencyNthDayType.id : '',
          'repaymentFrequencyDayOfWeekType': this.loansAccountTemplate.repaymentFrequencyDayOfWeekType ? this.loansAccountTemplate.repaymentFrequencyDayOfWeekType.id : ''
        });
      }
    }
  }

  /** Create Loans Account Terms Form */
  createloansAccountTermsForm() {
    this.loansAccountTermsForm = this.formBuilder.group({
      'principal': ['', Validators.required],
      'loanTermFrequency': ['', Validators.required],
      'loanTermFrequencyType': ['', Validators.required],
      'numberOfRepayments': ['', Validators.required],
      'repaymentEvery': ['', Validators.required],
      'repaymentFrequencyType': ['', Validators.required],
      'repaymentFrequencyNthDayType': [''],
      'repaymentFrequencyDayOfWeekType': [''],
      'repaymentsStartingFromDate': [''],
      'interestChargedFromDate': [''],
      'interestRatePerPeriod': [''],
      'interestType': [''],
      // 'interestRateDifferential': [''],
      'isFloatingInterestRate': [''],
      'isEqualAmortization': [''],
      'amortizationType': ['', Validators.required],
      'interestCalculationPeriodType': [''],
      'allowPartialPeriodInterestCalcualtion': [''],
      'inArrearsTolerance': [''],
      'graceOnInterestCharged': [''],
      'transactionProcessingStrategyId': ['', Validators.required],
      'graceOnPrincipalPayment': [''],
      'graceOnInterestPayment': [''],
      'graceOnArrearsAgeing': [''],
      'loanIdToClose': [''],
      'fixedEmiAmount': [''],
      'isTopup': [''],
      'maxOutstandingLoanBalance': [''],
      'recalculationCompoundingFrequencyDate': ['']
    });
  }

  /**
   * Sets all select dropdown options.
   */
  setOptions() {
    this.termFrequencyTypeData = this.loansAccountProductTemplate.termFrequencyTypeOptions;
    this.repaymentFrequencyNthDayTypeData = this.loansAccountProductTemplate.repaymentFrequencyNthDayTypeOptions;
    this.repaymentFrequencyDaysOfWeekTypeData = this.loansAccountProductTemplate.repaymentFrequencyDaysOfWeekTypeOptions;
    this.interestTypeData = this.loansAccountProductTemplate.interestTypeOptions;
    this.amortizationTypeData = this.loansAccountProductTemplate.amortizationTypeOptions;
    this.interestCalculationPeriodTypeData = this.loansAccountProductTemplate.interestCalculationPeriodTypeOptions;
    this.transactionProcessingStrategyData = this.loansAccountProductTemplate.transactionProcessingStrategyOptions;
    this.clientActiveLoanData = this.loansAccountProductTemplate.clientActiveLoanOptions;
  }

  updateNumberOfRepayments(){
    this.loansAccountTermsForm.patchValue({
      'numberOfRepayments' : this.loansAccountTermsForm.value.loanTermFrequency * this.loansAccountTermsForm.value.repaymentEvery
    });
  }

  /**
   * Returns loans account terms form value.
   */
  get loansAccountTerms() {
    return this.loansAccountTermsForm.value;
  }

}
