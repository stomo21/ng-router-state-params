import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { RouterStateParamsService } from './src/router-state-params.service';

// for manual imports
export * from './src/router-state-params.service';

@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
    ],
    providers: [
        RouterStateParamsService
    ],
    exports: [
    ]
})
export class RouterStateParamsModule {

}