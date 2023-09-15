import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MenuListComponent } from './menu-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

const appComponent = [MenuListComponent];
const matModules = [MatMenuModule];
const ngModules = [
  CommonModule,
  RouterModule,
  MatIconModule,
  FlexLayoutModule,
  MatButtonModule,
];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngModules, ...matModules],
  exports: [...appComponent],
})
export class MenuListModule {}
