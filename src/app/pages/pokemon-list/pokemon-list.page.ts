import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  public pokemons: any[] = [];
  public allDataPokemons: any[] = [];
  public limit = 10;
  public offset = 0;
  public loading = false;
  public colors = [
    'success',
    'danger',
    'warning',
    'tertiary',
    'secondary',
    'primary',
  ]

  public searchPokemon: string | null | undefined = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loading = true;
    this.pokemonService.getSomePokemons(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = data.results;
        this.loadMoreData(data.results);
        console.log(this.allDataPokemons);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  async loadMoreData(pokemons: any[]) {
    for (let pokemon of pokemons) {
      this.pokemonService.getPokemonById(pokemon.name).subscribe({
        next: (data) => {
          this.allDataPokemons.push(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.loading = false;
  }

  async searchPokemonByNameOrId(pokemon: string | null | undefined) {
    if (pokemon) {
      this.pokemonService.getPokemonById(pokemon).subscribe({
        next: (data) => {
          this.allDataPokemons = [data];
          console.log(this.allDataPokemons);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  }
}
