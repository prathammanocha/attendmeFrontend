import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorLogComponent } from './visitor-log/visitor-log.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'visitorlist', component: VisitorListComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'visitorlog', component: VisitorLogComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }
