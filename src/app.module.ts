import { Module } from "@nestjs/common";
import { TypeGraphQLModule } from "typegraphql-nestjs";
import {ApolloDriver} from '@nestjs/apollo'
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      dateScalarMode: "timestamp"
    }),
    UploadModule,
  ],
})
export default class AppModule {}