let Encore = require('@symfony/webpack-encore');
let path = require('path');
let fs = require('fs');

const  SpriteLoaderPlugin  =  require ('svg-sprite-loader/plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .configureBabel(function(babelConfig) {
        babelConfig.presets.push('@babel/preset-flow');
        // babelConfig.presets.push('@babel/preset-react');

        babelConfig.plugins.push('styled-jsx/babel');
        babelConfig.plugins.push("@babel/plugin-proposal-class-properties");
        // babelConfig.plugins.push("babel-preset-es2015");
        // babelConfig.plugins.push("babel-plugin-babel-preset-react");
        // babelConfig.plugins.push("babel-preset-stage-0");
    }, {
    })
    // the project directory where all compiled assets will be stored
    .setOutputPath('htdocs/assets/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/assets/build')

    //точки входа
    .addEntry('main', './assets/entries/main.js')


    // файл runtime.js
    //.disableSingleRuntimeChunk()
    .enableSingleRuntimeChunk()

    //sass/scss
    .enableSassLoader()

    //postCss
    .enablePostCssLoader()

    //генерация SourceMap
    .enableSourceMaps(!Encore.isProduction())

    // Указываем куда и как класть скомпилированные файлы
    .configureFilenames({
        js: 'js/[name]' + '.js',
        css: 'css/[name]' + '.css',
        images: '[path][name].[ext]',
        fonts: 'fonts/[name].[ext]',
    })
    //Переопределяем загрузку изображений (кроме svg)
    .disableImagesLoader()
    .addLoader(  {
        test: /\.(png|jpg|jpeg|gif|ico|webp)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]', publicPath: '/assets/build/' }
    })

    //удалять outputPath перед каждой сборкой.
    .cleanupOutputBeforeBuild()

    //Подключаем jquery
    .autoProvidejQuery()

    //разбиение js на общие части
    .splitEntryChunks()

    //Добавлять хеши в название файлов (main.abc123.js).
    //.enableVersioning()
    .addLoader(
        {
            test: /\.svg$/,
            use: [
                'svg-sprite-loader'
            ]
        })
    // .addLoader(
    //     {
    //         test: /\.js$/,
    //         use: [
    //             'babel-loader'
    //         ]
    //     })
    .addPlugin( new SpriteLoaderPlugin ())
;


const config = Encore.getWebpackConfig();

module.exports = config;

