import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

   /** Client data. */
   clientsData: any = [];

   selectedClients:boolean = false;
   selectedClientsDetails:any=[];
   clientIds:any=[];

  constructor(private formBuilder: FormBuilder,
              private organizationService : OrganizationService,
              private systemService: SystemService,
              private clientsService: ClientsService,
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
      'message': ['', Validators.required]
    });
  }

  buildDependency(){
    
    this.sendBulkSmsForm.get('officeId').valueChanges.subscribe((officeId:any) => {
      this.selectedOfficeId = officeId;
    })
    this.sendBulkSmsForm.get('subStatusId').valueChanges.subscribe((subStatusId:any) => {
      this.selectedSubStatusId = subStatusId;
      if(this.selectedSubStatusId === 's2'){
       this.selectedClients = true;
       this.sendBulkSmsForm.addControl('clientName', new FormControl('', [Validators.required]));
       this.getSelectedClients();
      }
    })
  }

  getAllClients(){
    this.selectedSubStatusId = 0;
  }

  getSelectedClients() {
      this.sendBulkSmsForm.get('clientName').valueChanges.subscribe((value: string) => {
        if (value.length >= 2) {
          const sqlSearch: string = ' c.id LIKE \'%' + value + '%\' OR c.external_id LIKE \'%' + value + '%\' OR display_name LIKE \'%' + value + '%\'';
          this.clientsService.getFilteredClientsByExternalIdAndOffice('displayName', 'ASC', false, sqlSearch, this.selectedOfficeId)
            .subscribe((data: any) => {
              this.clientsData = data.pageItems;
            });
        }
      });
  }

  /**
   * Displays Client name in form control input.
   * @param {any} client Client data.
   * @returns {string} Client name if valid otherwise undefined.
   */
   displayClient(client: any): string | undefined {
    return client ? client.displayName : undefined;
  }

  clientSelected(clientDetails: any) {
    this.selectedClientsDetails.push({'name': clientDetails.displayName, 'id':clientDetails.id});
    this.clientIds.push(clientDetails.id);
  }

  submit(){
    this.formData = {
      'officeId': this.selectedOfficeId,
      'message': this.sendBulkSmsForm.get('message').value
    }
    if(this.selectedSubStatusId != 0 && this.selectedSubStatusId != 'CWL' && this.selectedSubStatusId != 'LIA'
       && this.selectedSubStatusId != 's2'){
      this.formData.subStatus = this.selectedSubStatusId;
    }
    if(this.clientIds){
      this.formData.clientIds = this.clientIds;
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

  



}
