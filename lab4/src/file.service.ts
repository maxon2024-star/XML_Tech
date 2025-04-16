// src/file.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileAccessor {
  filePath: string;
}

@Injectable()
export class FileService<I> {
  private readonly filePath = path.resolve(__dirname);
  constructor(filePath?: string) {
    if (filePath) {
      this.filePath = path.resolve(__dirname, filePath);
    }
  }
  public read<T extends I>(): T {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      if (!data.trim()) {
        return {} as T; // Возвращаем пустой объект или массив, если файл пустой
      }
      return JSON.parse(data) as T;
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`File not found: ${this.filePath}`);
        return {} as T; // Возвращаем пустой объект или массив, если файл не найден
      }
      throw error;
    }
  }
  public add<T>(newData: T): void {
    const data = this.read();
    if (Array.isArray(data)) {
      data.push(newData);
    }
    this.write(data);
  }
  public write<T extends I>(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}