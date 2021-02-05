import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsService } from 'app/savings/savings.service';

@Component({
  selector: 'mifosx-freeze-savings-account',
  templateUrl: './freeze-savings-account.component.html',
  styleUrls: ['./freeze-savings-account.component.scss']
})
export class FreezeSavingsAccountComponent implements OnInit {

  /** Freeze SavingsAccount Form*/
  freezeSavingsAccountForm: FormGroup;

  /** Button text for debit*/
  buttonTextDebit:any;
  
  /** Button text for credit*/
  buttonTextCredit:any;

  /**
   * Block Narration Options 
   */
  blockNarrationOptions:any=[];

  savingsDetails:any={};
  command:any;
  
  
  /**
   * @param  {FormBuilder} formBuilder
   * @param  {ActivatedRoute} route
   * @param  {Router} router
   */
  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private savingsService : SavingsService) {
       this.route.data.subscribe((data: {savingsAccountActionData: any}) => {
         this.blockNarrationOptions = data.savingsAccountActionData.blockNarrationOptions;
         this.savingsDetails = data.savingsAccountActionData;
       });
  }

   /**
    * Create the form
    */
  ngOnInit(): void {
    this.createFreezeSavingsAccountFormGroup();
  }

  /**
   * Create the freeze savings account form
   */
  createFreezeSavingsAccountFormGroup(){
    this.freezeSavingsAccountForm = this.formBuilder.group({
      'narrationId':['']
    })
  }

  blockDebitCredit(permission:any){
    if(permission === 'BLOCKDEBIT_SAVINGSACCOUNT'){
      this.command = 'blockDebit';
    }
    if(permission === 'UNBLOCKDEBIT_SAVINGSACCOUNT'){
      this.command = 'unblockDebit';
    }
    if(permission === 'BLOCKCREDIT_SAVINGSACCOUNT'){
      this.command = 'blockCredit';
    }
    if(permission === 'UNBLOCKCREDIT_SAVINGSACCOUNT'){
      this.command = 'unblockCredit';
    }
    this.savingsService.executeSavingsAccountCommand(this.savingsDetails.id, this.command, this.freezeSavingsAccountForm.value)
    .subscribe((data: any) => {
      this.router.navigate(['../../'], {relativeTo : this.route});
    });
  }

}
