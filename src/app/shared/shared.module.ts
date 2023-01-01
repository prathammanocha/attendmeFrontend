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
import { TeacherdialogComponent } from '../teacherdialog/teacherdialog.component';
import { MenuComponent } from './menu/menu.component';
import { VisitorLogDialogComponent } from '../visitorlogdialog/visitorlogdialog.component';
import { NgxPrintModule } from 'ngx-print';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentlistdialogComponent } from '../studentlistdialog/studentlistdialog.component';

@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxPrintModule,
        MatCheckboxModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        LayoutComponent,
        TeacherdialogComponent,
        MenuComponent,
        VisitorLogDialogComponent,
        StudentlistdialogComponent,
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
