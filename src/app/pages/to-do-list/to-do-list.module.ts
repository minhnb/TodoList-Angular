import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToDoListComponent } from './to-do-list.component';

@NgModule({
  imports: [ThemeModule, NgxPaginationModule],
  declarations: [ToDoListComponent]
})
export class ToDoListModule { }
