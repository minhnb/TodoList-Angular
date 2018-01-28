import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToDoListComponent } from './to-do-list.component';

@NgModule({
  imports: [ThemeModule],
  declarations: [ToDoListComponent]
})
export class ToDoListModule { }
