import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Movie } from './movie/entity/movie.entity';
import { MovieModule } from './movie/movie.module';
import { MovieDetail } from './movie/entity/movie-detail.entity';
import { DirectorModule } from './director/director.module';
import { Director } from './director/entity/director.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'prod').required(),
        DB_TYPE: Joi.string().valid('postgres').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Movie, MovieDetail, Director, Genre], // entity 에 있는걸 나중에 넣을 예정
        synchronize: true, // 개발할때만 true, pro는 절대로 true xxxxxx, migration 으로 상태 변경을 라이브에서는 한다.
      }),
      inject: [ConfigService],
    }),
    MovieModule,
    DirectorModule,
    GenreModule,
  ], // 또다른 모듈을 import, export 도 있다
  // 스코프가 다르다. 로직을 프로세싱하는 클래스의 이름을 서비스로 하자.
  // 서비스라는 애들은 프로바이더에 넣자
  // 서비스 클래스는 프로바이더의 일종으로 쓰자.
  // 엔드포인트의 로직을 담당하는걸 서비스라고 부른다.
  // 프로바이더에 레포지토리, 가드 뭐 이런것들도 들어간다.
})
export class AppModule {}
