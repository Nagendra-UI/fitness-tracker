import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MaterialShareModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        MaterialShareModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialShareModule,
        FlexLayoutModule
    ]
})

export class SharedModule { }