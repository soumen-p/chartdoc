import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderRoutingModule } from './header/header-routing.module';
import { SideMenuRoutingModule } from './side-menu/side-menu-routing.module';



@NgModule({
  declarations: [HeaderComponent, SideMenuComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    SideMenuRoutingModule
  ],
  exports: [HeaderComponent, SideMenuComponent]
})
export class ShellModule { }
