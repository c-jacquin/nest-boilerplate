import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Pipe,
  PipeTransform,
} from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Pipe()
export class ObjectIDPipe implements PipeTransform<string> {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return ObjectID(value);
    } catch (err) {
      throw new BadRequestException('invalid id');
    }
  }
}
