import { Component } from '@nestjs/common';
import { Connection } from 'typeorm';

@Component()
export class DatabaseService {
  constructor(private connection: Connection) {}

  public closeConnection() {
    return this.connection.close();
  }

  public drop() {
    return this.connection.dropDatabase();
  }
}
