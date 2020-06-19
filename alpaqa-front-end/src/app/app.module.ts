import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BackpacksComponent } from './backpacks/backpacks.component';
import { BackpackListComponent } from './backpacks/backpack-list/backpack-list.component';
import { BackpackDetailsComponent } from './backpacks/backpack-details/backpack-details.component';
import { BackpackItemComponent } from './backpacks/backpack-list/backpack-item/backpack-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BackpacksComponent,
    BackpackListComponent,
    BackpackDetailsComponent,
    BackpackItemComponent,
     ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
