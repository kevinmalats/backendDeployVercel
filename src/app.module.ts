// app.module.ts

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [PokemonsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
