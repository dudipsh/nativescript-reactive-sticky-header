import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
