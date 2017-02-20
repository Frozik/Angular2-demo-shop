import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ControlCaptionComponent } from './components/control-caption/control-caption.component';
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';
import { InputComponent } from './components/input/input.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ProgressComponent } from './components/progress/progress.component';
import { RadioboxComponent } from './components/radiobox/radiobox.component';
import { RangeComponent } from './components/range/range.component';
import { SelectComponent } from './components/select/select.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NumberPipe } from './pipes/number.pipe';
import { ToFixedPipe } from './pipes/to-fixed.pipe';
import { NoLeadingTrailingWhitespaceValidatorDirective } from './validators/no-lt-whitespace.directive';
import { NumberRangeValidatorDirective } from './validators/number-range.directive';
import { PriceValidatorDirective } from './validators/price.directive';
import { UrlExistsValidatorDirective } from './validators/url-exists.directive';

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
        ModalPopupComponent,
        DialogWindowComponent,
        ProgressComponent,
        SelectComponent,
        RangeComponent,
        InputComponent,
        ButtonComponent,
        ControlCaptionComponent,
        NumberRangeValidatorDirective,
        UrlExistsValidatorDirective,
        PriceValidatorDirective,
        NoLeadingTrailingWhitespaceValidatorDirective,
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
        ModalPopupComponent,
        DialogWindowComponent,
        ProgressComponent,
        SelectComponent,
        RangeComponent,
        InputComponent,
        ButtonComponent,
        NumberRangeValidatorDirective,
        UrlExistsValidatorDirective,
        PriceValidatorDirective,
        NoLeadingTrailingWhitespaceValidatorDirective,
    ],
})
export class SharedModule { }
