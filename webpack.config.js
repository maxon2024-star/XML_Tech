const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Определяем режим сборки
  mode: 'development', // Устанавливаем режим development

  // Определяем входной точку
  entry: './public/main.js', // Главный файл JavaScript

  // Определяем выходную директорию и имя файла
  output: {
    path: path.resolve(__dirname, 'dist'), // Директория для сборки
    filename: 'bundle.js', // Имя выходного файла
    publicPath: '/', // Путь к ресурсам в режиме development
  },

  // Настройки модулей
  module: {
    rules: [
      {
        test: /\.js$/, // Обрабатываем только .js файлы
        exclude: /node_modules/, // Исключаем node_modules
        use: {
          loader: 'babel-loader', // Транспиляция ES6+ кода
          options: {
            presets: ['@babel/preset-env'], // Поддержка современного JavaScript
          },
        },
      },
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ['style-loader', 'css-loader'], // Загружаем CSS в DOM
      },
    ],
  },

  // Плагины
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Шаблон HTML
      filename: 'index.html', // Имя выходного HTML файла
    }),
  ],

  // Разрешение путей
  resolve: {
    extensions: ['.js'], // Автоматическое расширение для импортов
  },

  // Настройки для development
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Директория для статических файлов
    },
    port: 4000, // Порт, выбранный автоматически
    open: true, // Открывает браузер автоматически
    hot: true, // Горячая перезагрузка
    compress: true, // Сжатие ответов
    historyApiFallback: true, // Поддержка маршрутизации на стороне клиента
  },

  // Дополнительные настройки для development
  devtool: 'inline-source-map', // Карты исходников для отладки
};