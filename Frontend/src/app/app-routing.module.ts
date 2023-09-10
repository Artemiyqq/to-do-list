import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent},
    { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}