/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Directives */
import { HasPermissionDirective } from './has-permission/has-permission.directive';
import { NumberFormatDirective } from './number-format/number-format.directive';
/**
 *  Directives Module
 *
 *  All custom directives should be declared and exported here.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HasPermissionDirective, NumberFormatDirective],
  exports: [HasPermissionDirective, NumberFormatDirective]
})
export class DirectivesModule { }
