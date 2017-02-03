import { NgModule } from '@angular/core';
import { NgReduxModule } from 'ng2-redux';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        CatalogModule,
        NgReduxModule,
        AppRoutingModule,
        AuthModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }
