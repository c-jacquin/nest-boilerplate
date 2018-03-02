import { Pipe, PipeTransform } from '@nestjs/common';

@Pipe()
export class FindQueryPipe implements PipeTransform<any> {
  public async transform(value) {
    if (value.take) {
      try {
        value.take = parseInt(value.take, 10);
      } catch (err) {
        value.take = value.take;
      }
    }

    if (value.skip) {
      try {
        value.skip = parseInt(value.skip, 10);
      } catch (err) {
        value.skip = value.skip;
      }
    }

    if (value.select) {
      try {
        value.select = JSON.parse(value.select);
      } catch (err) {
        value.select = value.select;
      }
    }

    if (value.where) {
      try {
        value.where = JSON.parse(value.where);
      } catch (err) {
        value.where = value.where;
      }
    }

    return value;
  }
}
