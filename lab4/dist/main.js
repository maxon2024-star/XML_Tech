"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Включаем CORS
    app.enableCors();
    // Подключаем статику вручную
    app.use(express.static((0, path_1.join)(__dirname, '..', 'public')));
    await app.listen(3000);
    console.log(`App running at http://localhost:3000`);
}
bootstrap();
