import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import {CallbackPipe} from './side-menu/callback.pipe'

@NgModule({
  declarations: [HeaderComponent, SideMenuComponent,CallbackPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, SideMenuComponent]
})
export class ShellModule { }
