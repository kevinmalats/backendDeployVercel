import {
  Controller,
  Get,
  Request,
  Param,
  Query,
  Post,
  Body,
} from '@nestjs/common';

import { PokemonDTO, RequestPostSave } from 'src/types/pokedex';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonService: PokemonsService) {}

  @Get()
  async getPokemonsByApi(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<PokemonDTO[]> {
    console.log(offset);
    const response = await this.pokemonService.getPokemons(limit, offset);
    return response;
  }

  @Get(':name')
  async getPokemonByName(@Param('name') name: string): Promise<PokemonDTO[]> {
    const response = await this.pokemonService.getPokemon(name);
    return response;
  }

  @Post()
  async savePokemonTeam(@Body() data: RequestPostSave): Promise<PokemonDTO[]> {
    console.log('saving');
    const response = await this.pokemonService.save(data);
    return response;
  }

  @Get('teams/:name')
  async getPokemonTeams(@Param('name') name: string): Promise<PokemonDTO[]> {
    const response = await this.pokemonService.getTeams(name);
    return response;
  }
}
