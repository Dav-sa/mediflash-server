import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './modules/pokemons/pokemons.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PokemonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
