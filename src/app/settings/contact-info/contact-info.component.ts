import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators,  UntypedFormBuilder } from '@angular/forms';
import { ContactInfoService } from './contact-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mifosx-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  /** Create Contact Info Form */
  contactInfoForm: UntypedFormGroup;

  showContactInfo: boolean = false;
  contactInfo: any = {};

  constructor(private formBuilder :  UntypedFormBuilder,
              private contactInfoService: ContactInfoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createContactInfoForm();
    this.fetchContactInfo();
  }

  /**
   * Creates the contact info form.
   */
  createContactInfoForm() {
    this.contactInfoForm = this.formBuilder.group({
       'website' : [''],
      'email': [''],
      'mobileNo': [''],
    });
  }

  submit() {
    console.log(this.contactInfoForm.value);
    const contactInfo = this.contactInfoForm.value;
    this.contactInfoService.createContactInfo(contactInfo).subscribe((response:any) => {
        this.reload();
    });
  }

  /**
   * Refetches data for the component
   * TODO: Replace by a custom reload component instead of hard-coded back-routing.
   */
  reload() {
    const url: string = this.router.url;
    this.router.navigateByUrl(`./`, {skipLocationChange: true})
      .then(() => this.router.navigate([url]));
  }


  fetchContactInfo() {
    this.contactInfoService.getContactInfo().subscribe(
      (data: any) => { 
        if (data.length > 0) {
          this.contactInfo = data[0];
          console.log(data);
          this.showContactInfo = true;  
        } 
        
      }
    );
  }

  deleteContactInfo() {
    this.contactInfoService.deleteContactInfo().subscribe((response: any) => {
      this.reload();
    });
  }
    

}
