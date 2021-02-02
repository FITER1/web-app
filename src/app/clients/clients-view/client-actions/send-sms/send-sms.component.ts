import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {ClientsService} from 'app/clients/clients.service'

@Component({
  selector: 'mifosx-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit {

  /**Client SMS form. */
  clientSMSForm: FormGroup;
  /**ClientData */
  clientViewdata: any;
  /**ClientId */
  clientId: any;

  constructor(private formBuilder : FormBuilder,
                  private route: ActivatedRoute,
                  private router: Router, private clientService : ClientsService) {
      this.route.data.subscribe((data: {clientActionData : any}) => {
         this.clientViewdata = data.clientActionData;
      });
      this.clientId =  this.route.parent.snapshot.params['clientId'];              
  }

  ngOnInit(): void {
    this.createClientSmsForm();
    this.clientSMSForm.patchValue({
      'toClient' : this.clientViewdata.displayName +'('+ this.clientViewdata.accountNo + ')'
    })
    this.clientSMSForm.controls['toClient'].disable();
  }


  createClientSmsForm(){
    this.clientSMSForm = this.formBuilder.group({
      'toClient': ['', Validators.required],
      'message': ['', Validators.required]
    })
  }

  submit(){
    const formdata = {
      'clientId': this.clientId,
      'message': this.clientSMSForm.get('message').value
    }
    this.clientService.sendSms(formdata).subscribe((data: any) => {
     this.router.navigate(['../../', 'general'], {relativeTo: this.route});
    });
  }

}
