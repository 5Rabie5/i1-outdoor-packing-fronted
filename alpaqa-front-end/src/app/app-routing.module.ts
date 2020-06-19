import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackpacksComponent } from './components/backpacks/backpacks.component';
import { BackpackDetailsComponent } from './components/backpack-details/backpack-details.component';

const routes: Routes = [
                        { path: '', redirectTo: '/backpacks', pathMatch: 'full' },
                        { path: 'backpacks', component:  BackpacksComponent },
                        { path: 'backpackDetailsComponent', component:  BackpackDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
