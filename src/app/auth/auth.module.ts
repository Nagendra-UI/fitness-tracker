import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
        AngularFireAuthModule
    ],
    exports: []
})

export class AuthModule { }