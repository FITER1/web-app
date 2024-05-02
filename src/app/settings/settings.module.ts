/** Angular Imports */
import { NgModule } from '@angular/core';

/** Custom Modules */
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

/** Custom Components */
import { SettingsComponent } from './settings.component';
import { AppImageComponent } from './app-image/app-image.component';

/**
 * Settings Module
 *
 * All components related to settings and web app configuration should be declared here.
 */
@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsComponent, AppImageComponent]
})
export class SettingsModule { }
