const path = require('path');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                options: {
                    failOnWarning: true,
                    failOnerror: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebPackPlugin(['docs'], { root: path.resolve(__dirname) }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: false
        }),
        new Dotenv({
            path: './.env',
            safe: false
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'docs'),
        compress: true,
        port: 3001
    }
};
