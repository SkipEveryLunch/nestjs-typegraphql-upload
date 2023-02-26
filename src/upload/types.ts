import { ObjectType, Field, ArgsType } from "type-graphql";
import { GraphQLUpload } from "graphql-upload-minimal";
import { Readable } from 'stream';

@ObjectType()
export class UploadResponse {
  @Field(() => String)
  message!: String;
}

@ArgsType()
export class UploadInputArgs{
  @Field(() => GraphQLUpload)
  file!: Promise<Upload>;
}

class Upload{
  fieldName: string;
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: ()=> Readable;
}
