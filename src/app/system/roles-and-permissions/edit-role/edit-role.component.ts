/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'app/settings/settings.service';

/** Custom Services */
import { SystemService } from '../../system.service';

/**
 * Edit Role Description Component.
 */
@Component({
  selector: 'mifosx-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  /** Role Form */
  roleForm: FormGroup;
  /** Role Data */
  roleData: any;
  /** Show payment details */
  showRoleBasedLimitDetails:boolean = false;

  /**
   * Retrieves the code data from `resolve`.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {SystemService} systemService System Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   */
  constructor(
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService,
  ) {
    this.route.data.subscribe((data: { role: any }) => {
      this.roleData = data.role;
    });
  }

  /**
   * Creates and sets the role form.
   */
  ngOnInit() {
    this.createRoleForm();
  }

  /**
   * Creates and sets role form.
   */
  createRoleForm() {
    this.roleForm = this.formBuilder.group({
      name: [{ value: this.roleData.name, disabled: true }, Validators.required],
      description: [this.roleData.description, Validators.required],
      
    });
  }

  /**
   * Submits the role form and updates role description,
   * if successful redirects to view updated roles and permissions.
   */
  submit() {
    const role = this.roleForm.value;
    role.locale = this.settingsService.language.code;
    this.systemService.updateRole(role, this.roleData.id).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

  showRoleBasedLimit(){
    this.showRoleBasedLimitDetails = !this.showRoleBasedLimitDetails;
    if(this.showRoleBasedLimitDetails){
      this.roleForm.addControl('maxLoanApprovalLimit', this.formBuilder.control(this.roleData.maxLoanApprovalLimit));
      this.roleForm.addControl('currency', new FormControl({value:this.roleData.currency.displayLabel, disabled: true}));
    }else{
      this.roleForm.removeControl('maxLoanApprovalLimit');
      this.roleForm.removeControl('currency');
    }

  }
}
