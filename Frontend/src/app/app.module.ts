import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from "@angular/material/tooltip"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { TaskCreateModalComponent } from './task-create-modal/task-create-modal.component';
import { TaskService } from './services/task.service';
import { DateColorPipe } from './pipes/date-color.pipe';
import { TaskDetailModalComponent } from './task-detail-modal/task-detail-modal.component';


@NgModule({
  declarations: [AppComponent,
    AuthComponent,
    TaskListComponent,
    DashboardComponent,
    TopPanelComponent,
    TaskCreateModalComponent,
    DateColorPipe,
    TaskDetailModalComponent,],
  imports: [BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
