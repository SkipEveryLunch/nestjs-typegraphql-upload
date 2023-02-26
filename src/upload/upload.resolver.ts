import { Query, Resolver, Mutation, Args} from 'type-graphql';
import { UploadResponse, UploadInputArgs } from './types';
import { Readable } from 'stream';

@Resolver()
export class UploadResolver {
  @Query((returns)=>UploadResponse)
  getHello(): UploadResponse{
    return {
      message: 'hello'
    }
  }
  @Mutation((returns)=>UploadResponse)
  async importFile(
    @Args() args: UploadInputArgs
  ): Promise<any>{
    const file = await args.file
    const {createReadStream} = file
    const buffer = await this.streamToBuffer(createReadStream())
    return {
      message:buffer.toString()
    };
  }
  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];
    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }
}