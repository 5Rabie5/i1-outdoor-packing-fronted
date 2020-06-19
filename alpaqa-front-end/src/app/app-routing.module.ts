import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackpacksComponent } from './components/backpacks/backpacks.component';

const routes: Routes = [
                        { path: '', redirectTo: '/backpacks', pathMatch: 'full' },
                        { path: 'backpacks', component:  BackpacksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
