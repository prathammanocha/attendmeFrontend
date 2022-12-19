import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorsRoutingModule } from './visitors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorLogComponent } from './visitor-log/visitor-log.component';

@NgModule({
    imports: [
        CommonModule,
        VisitorsRoutingModule,
        SharedModule
    ],
    declarations: [
        VisitorListComponent,
        VisitorLogComponent
    ]
})
export class VisitorsModule { }
