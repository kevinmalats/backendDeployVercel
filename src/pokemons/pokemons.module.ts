import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { HttpClient } from 'src/http/httpClient';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PokemonsService, HttpClient, PrismaService],
  controllers: [PokemonsController],
})
export class PokemonsModule {}
