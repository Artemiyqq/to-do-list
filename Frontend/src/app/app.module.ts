import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from "@angular/material/tooltip"
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopPanelComponent } from './top-panel/top-panel.component';

@NgModule({
  declarations: [AppComponent,
                 AuthComponent,
                 TaskListComponent,
                 TaskItemComponent,
                 DashboardComponent,
                 TopPanelComponent],
  imports: [BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatTooltipModule,
            ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
