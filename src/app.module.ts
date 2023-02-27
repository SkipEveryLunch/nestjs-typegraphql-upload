import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeGraphQLModule } from "typegraphql-nestjs";
import {ApolloDriver} from '@nestjs/apollo'
import { UploadModule } from './upload/upload.module';
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { TodoModule } from './todo/todo.module';
import { Prisma, PrismaClient } from "@prisma/client";

interface Context {
  prisma: PrismaClient
}
const prisma = new PrismaClient()
@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      dateScalarMode: "timestamp",
      context: (): Context => ({
        prisma
      })
    }),
    UploadModule,
    TodoModule,
  ],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes("graphql");
  }
}