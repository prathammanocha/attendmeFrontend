import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ParentsComponent } from './parents/parents.component';
import { RelativesComponent } from './relatives/relatives.component';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentLogComponent } from './student-log/student-log.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'studentlist', component: StudentListComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'studentlog', component: StudentLogComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'parents', component: ParentsComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'relatives', component: RelativesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
