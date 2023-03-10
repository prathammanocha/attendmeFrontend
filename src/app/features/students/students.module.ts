import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentLogComponent } from './student-log/student-log.component';
import { ParentsComponent } from './parents/parents.component';
import { RelativesComponent } from './relatives/relatives.component';

@NgModule({
    imports: [
        CommonModule,
        StudentsRoutingModule,
        SharedModule
    ],
    declarations: [
        StudentListComponent,
        StudentLogComponent,
        ParentsComponent,
        RelativesComponent
    ]
})
export class StudentsModule { }
