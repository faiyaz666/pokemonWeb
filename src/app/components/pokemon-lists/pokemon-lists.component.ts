import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-lists.component.html',
  styleUrl: './pokemon-lists.component.scss',
})
export class PokemonListsComponent implements OnInit {
  currentPageNo: number;
  pokemonDetails: any[];

  constructor(
    private pokeApiService: PokeApiService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentPageNo = 0;
    this.pokemonDetails = [];
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (params.has('pokemon')) {
        this.loadSinglePokemonDetails(params.get('pokemon'));
      } else {
        this.setCurrentPageNo(params);
        this.loadAllPokemonDetails();
      }
    });
  }

  setCurrentPageNo(params: any): void {
    this.currentPageNo = params.has('page') ? params.get('page') : 0;
  }

  loadSinglePokemonDetails(name: string) {
    this.pokeApiService.fetchIndividualPokemonDetailsByName(name).subscribe({
      next: (result) =>
        this.pokemonDetails.splice(0, this.pokemonDetails.length, result),
      error: (error) => console.error(error),
    });
  }

  loadAllPokemonDetails(): void {
    this.pokeApiService.getPokemonDetails(this.currentPageNo).subscribe({
      next: (result) => (this.pokemonDetails = result),
      error: (error) => console.error(error),
    });
  }

  loadPreviousPage(): void {
    this.router.navigate(['/pokemon-lists'], {
      queryParams: { page: --this.currentPageNo },
    });
  }

  loadNextPage(): void {
    this.router.navigate(['/pokemon-lists'], {
      queryParams: { page: ++this.currentPageNo },
    });
  }

  viewDetails(pokemon: any): void {
    this.sharedDataService.sendData(pokemon);
    this.router.navigate(['/see-details']);
    console.log(pokemon);
  }
}
