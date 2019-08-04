import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePage } from './create';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    CreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePage),
    ComponentsModule
  ],
})
export class CreatePageModule {}
