import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { VisitordialogComponent } from '../visitordialog/visitordialog.component';
import { StudentdialogComponent } from '../studentdialog/studentdialog.component';
import { MenuComponent } from './menu/menu.component';
import { VisitorLogDialogComponent } from '../visitorlogdialog/visitorlogdialog.component';
import { NgxPrintModule } from 'ngx-print';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentlistdialogComponent } from '../studentlistdialog/studentlistdialog.component';
import { addstudentDialogComponent } from '../addstudentdialog/addstudentdialog.component';
import { StudentlistdetailsComponent } from '../studentdetailsdialog /studentlistdetails.component';
import { ParentsdialogComponent } from '../parentsdialog/parentsdialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { RelativesdialogComponent } from '../relativesdialog/relativesdialog.component';

@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxPrintModule,
        MatCheckboxModule,
        MatRadioModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        LayoutComponent,
        VisitordialogComponent,
        MenuComponent,
        VisitorLogDialogComponent,
        StudentlistdialogComponent,
        addstudentDialogComponent,
        StudentlistdetailsComponent,
        ParentsdialogComponent,
        RelativesdialogComponent,
        StudentdialogComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe
    ]
})
export class SharedModule { }
