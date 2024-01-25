import { Injectable } from '@nestjs/common';
import { HttpClient } from 'src/http/httpClient';
import {
  Pokedex,
  Pokemon,
  PokemonDTO,
  RequestPostSave,
} from 'src/types/pokedex';
import { get } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly prisma: PrismaService,
  ) {}

  async getPokemons(limit: number, offset: number): Promise<PokemonDTO[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = `pokemon?limit=${limit}&offset=${offset}`;
        const pokemons: Pokemon = await this.httpClient.get(endpoint);
        let pokemonsDto: PokemonDTO[];
        pokemonsDto = await Promise.all(
          pokemons.results.map(async (pok) => {
            const pokedex: Pokedex = await this.httpClient.get(pok.url, true);
            const pokem: PokemonDTO = {
              name: pok.name,
              sprites: pokedex.sprites,
              types: pokedex.types,
              attack: get(
                pokedex.stats.find((stat) => stat.stat.name === 'attack'),
                'base_stat',
                0,
              ),
              defense: get(
                pokedex.stats.find((stat) => stat.stat.name === 'defense'),
                'base_stat',
                0,
              ),
            };
            return pokem;
          }),
        );
        resolve(pokemonsDto);
      } catch (error) {
        reject(error);
      }
    });
  }
  async getPokemon(name: string): Promise<PokemonDTO[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = `pokemon/${name}`;
        console.log(endpoint);
        const pok: Pokedex = await this.httpClient.get(endpoint);
        const pokem: PokemonDTO = {
          name: pok.name,
          sprites: pok.sprites,
          types: pok.types,
          attack: get(
            pok.stats.find((stat) => stat.stat.name === 'attack'),
            'base_stat',
            0,
          ),
          defense: get(
            pok.stats.find((stat) => stat.stat.name === 'defense'),
            'base_stat',
            0,
          ),
        };
        resolve([pokem]);
      } catch (error) {
        console.log(error);
        resolve([]);
      }
    });
  }

  async save(data: RequestPostSave): Promise<any> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
      },
    });
    console.log(user);

    const createPokemonPromises = data.pokemons.map(({ name, img, type }) =>
      this.prisma.pokemon.create({
        data: {
          name,
          img,
          type,
          userId: user.id,
        },
      }),
    );

    return Promise.all(createPokemonPromises);
  }
}
