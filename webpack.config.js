const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');


module.exports = (env) => {
    return {
        entry: "./src/index.js",
        output: {
            path: path.join(__dirname, '/dist/'),
            filename: 'bundle.js',
            publicPath: "/"
        },
        watch: true,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '/'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader',
                    options: {
                        name(file) {
                            if (process.env.NODE_ENV === 'development') {
                                return '[path][name].[ext]';
                            }
                            return '[hash].[ext]';
                        },
                    },
                },
                {
                    test: /\.svg$/,
                    loaders: [
                        {
                            loader: 'svg-inline-loader'
                        }
                    ]
                },
                {
                    test: /\.(gif|eot|woff|woff2|ttf|svg)$/,
                    loaders: [
                        'file-loader'
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                'env': {
                    DASH_URL_WEB: JSON.stringify(env.DASH_URL_WEB),
                },
            }),
            new HtmlWebpackPlugin({
                title: 'Pixxo',
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),

        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    }
    
};