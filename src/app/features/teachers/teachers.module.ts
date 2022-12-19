import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherLogComponent } from './teacher-log/teacher-log.component';

@NgModule({
    imports: [
        CommonModule,
        TeachersRoutingModule,
        SharedModule
    ],
    declarations: [
        TeacherListComponent,
        TeacherLogComponent
    ]
})
export class TeachersModule { }
