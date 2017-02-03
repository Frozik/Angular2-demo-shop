import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { PopupComponent } from './components/popup/popup.component';
import { ProgressComponent } from './components/progress/progress.component';
import { RadioboxComponent } from './components/radiobox/radiobox.component';
import { RangeComponent } from './components/range/range.component';
import { SelectComponent } from './components/select/select.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NumberPipe } from './pipes/number.pipe';
import { ToFixedPipe } from './pipes/to-fixed.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SpinnerComponent,
        RadioboxComponent,
        NumberPipe,
        ToFixedPipe,
        CheckboxComponent,
        PopupComponent,
        ProgressComponent,
        SelectComponent,
        RangeComponent,
        InputComponent,
    ],
    providers: [NumberPipe],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerComponent,
        RadioboxComponent,
        NumberPipe,
        ToFixedPipe,
        CheckboxComponent,
        PopupComponent,
        ProgressComponent,
        SelectComponent,
        RangeComponent,
        InputComponent,
    ],
})
export class SharedModule { }
