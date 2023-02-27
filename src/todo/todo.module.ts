import { Module } from '@nestjs/common';
import { TodoCrudResolver } from '@generated/type-graphql'

@Module({
  providers: [TodoCrudResolver]
})
export class TodoModule {}
