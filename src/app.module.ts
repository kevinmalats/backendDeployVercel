// app.module.ts

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PokemonsModule } from './pokemons/pokemons.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PokemonsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
