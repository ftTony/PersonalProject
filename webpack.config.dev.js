const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const SRC_PATH = path.resolve(ROOT_PATH, 'scripts');
const BUILD_PATH = path.resolve(ROOT_PATH, 'static');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development',
    entry: {
        'pagea': SRC_PATH+'/floors/indexMain.js'
    },
    devtool: 'cheap-eval-source-map',
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
    },
    devServer: {
        open:true,
        hot: true,
        inline: true,
        port:8000
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?[acl]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader', 
                    'sass-loader', 
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename: 'css-build/[name].css?v=[contenthash]'
        }),
        new HtmlWebpackPlugin({
            filename: ROOT_PATH + '/floors/index.html',
            chunks: ['pagea'],
            template: path.resolve(__dirname, './template/floors/index.html')
        }),
    ]
};