import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeeDetailsComponent } from './components/see-details/see-details.component';
import { PokemonListsComponent } from './components/pokemon-lists/pokemon-lists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-lists',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-lists',
    component: PokemonListsComponent,
  },
  {
    path: 'see-details',
    component: SeeDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'pokemon-lists',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
