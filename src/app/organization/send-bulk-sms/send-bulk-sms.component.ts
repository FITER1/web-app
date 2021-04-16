import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
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

  allSelected = false;

  @ViewChild('mySel') skillSel: MatSelect;

  formData:any={}

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
      //'clientId': ['', Validators.required],
      'message': ['', Validators.required]
    });
  }

  buildDependency(){
    
    this.sendBulkSmsForm.get('officeId').valueChanges.subscribe((officeId:any) => {
      this.selectedOfficeId = officeId;
    })
    this.sendBulkSmsForm.get('subStatusId').valueChanges.subscribe((subStatusId:any) => {
      this.selectedSubStatusId = subStatusId;
    })
  }

  getAllClients(){
    this.selectedSubStatusId = 0;
  }

  submit(){
    this.formData = {
      'officeId': this.selectedOfficeId,
      'message': this.sendBulkSmsForm.get('message').value
    }
    if(this.selectedSubStatusId != 0 && this.selectedSubStatusId != 'CWL' && this.selectedSubStatusId != 'LIA'){
      this.formData.subStatus = this.selectedSubStatusId;
    }
    this.organizationService.sendBulkSms(this.formData).subscribe((data: any) => {
    });
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('../', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected;  // to control select-unselect
    
    if (this.allSelected) {
      this.skillSel.options.forEach( (item : MatOption) => {item.value === 0 ? item.deselect() : item.select(); });
    } else {
      this.skillSel.options.forEach( (item : MatOption) => {item.deselect()});
    }
    this.skillSel.close();
  }


}
