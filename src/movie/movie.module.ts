import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieDetail, Director])], // typeorm에서 movie repository 를 만들어서 쓰고 싶은곳에 ioc container inject 해준다.
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
