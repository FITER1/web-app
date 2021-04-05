import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'app/clients/clients.service';
import { SystemService } from 'app/system/system.service';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'mifosx-send-bulk-sms',
  templateUrl: './send-bulk-sms.component.html',
  styleUrls: ['./send-bulk-sms.component.scss']
})
export class SendBulkSmsComponent implements OnInit {

  sendBulkSmsForm: FormGroup;

  /** Office Options */
  officeOptions: any = [];

  /** Sub Status Options */
  subStatusOptions: any= [];

  /** Sms Provider Options */
  smsProviderOptions: any = ['Africa`s talking'];

  /** Office Options */
  clientsOptions: any = [];

  code:any;

  sqlQuery:string;

  selectedOfficeId:any;
  selectedSubStatusId:any;

  constructor(private formBuilder: FormBuilder,
              private organizationService : OrganizationService,
              private systemService: SystemService,
              private clientService: ClientsService,
              private route: ActivatedRoute,
                  private router: Router) { 
  }

  ngOnInit(): void {
    this.createSmsForm();
    this.setOptions();
    this.buildDependency();
  }

  setOptions(){
    this.organizationService.getOffices().subscribe((offices:any) => {
      this.officeOptions = offices;
    });
    this.systemService.getCodes().subscribe((codes:any) => {
      this.code = codes.filter((item: any) => item.name === 'ClientSubStatus');
      if(this.code){
        console.log(this.code);
        this.systemService.getCodeValues(this.code[0].id).subscribe((codeValues:any) => {
          this.subStatusOptions = codeValues;
        });
      }
    });
   
     
  }

  createSmsForm(){
    this.sendBulkSmsForm = this.formBuilder.group({
      'officeId': [''],
      'subStatusId': [''],
      'smsProviderId': [''],
      'clientId': ['', Validators.required],
      'message': ['', Validators.required]
    });
  }

  buildDependency(){
    
    this.sendBulkSmsForm.get('officeId').valueChanges.subscribe((officeId:any) => {
      this.selectedOfficeId = officeId;
      this.getClientsBySubstatusAndOffice(this.selectedOfficeId, this.selectedSubStatusId);
    })
    this.sendBulkSmsForm.get('subStatusId').valueChanges.subscribe((subStatusId:any) => {
      this.selectedSubStatusId = subStatusId;
      this.getClientsBySubstatusAndOffice(this.selectedOfficeId, this.selectedSubStatusId);
    })
      console.log('ggg', this.sendBulkSmsForm.value.subStatusId);
  }

  getAllClients(){
    this.selectedSubStatusId = 0;
    this.sqlQuery = '';
    if(this.sendBulkSmsForm.value.officeId){
    this.clientService.getClientsBysearchQueryAndOffice(this.sendBulkSmsForm.value.officeId, this.sqlQuery).subscribe((clients:any) => {
      this.clientsOptions = clients.pageItems.filter((data:any) => (data.mobileNo) && (data.mobileNo.length === 12));
      });
    }
  }

  getClientsBySubstatusAndOffice(selectedOfficeId:any, selectedSubStatusId:any){
    console.log(this.selectedSubStatusId, this.selectedOfficeId, selectedOfficeId, selectedSubStatusId);
    if(selectedOfficeId && selectedSubStatusId){
      if(this.selectedSubStatusId != 0){this.sqlQuery = 'c.sub_status=' + selectedSubStatusId;}
      this.clientService.getClientsBysearchQueryAndOffice(selectedOfficeId, this.sqlQuery).subscribe((clients:any) => {
      this.clientsOptions = clients.pageItems.filter((data:any) => data.mobileNo.length === 12);
      })
    }
  }

  submit(){
    
    const formdata = {
      'clientIds': this.sendBulkSmsForm.value.clientId,
      'message': this.sendBulkSmsForm.get('message').value
    }
    this.organizationService.sendBulkSms(formdata).subscribe((data: any) => {
     this.reloadCurrentRoute();
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('../', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}


}
