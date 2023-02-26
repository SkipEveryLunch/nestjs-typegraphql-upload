import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeGraphQLModule } from "typegraphql-nestjs";
import {ApolloDriver} from '@nestjs/apollo'
import { UploadModule } from './upload/upload.module';
import { graphqlUploadExpress } from "graphql-upload-minimal";


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
export default class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes("graphql");
  }
}