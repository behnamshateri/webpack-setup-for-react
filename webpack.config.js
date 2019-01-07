const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
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
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (env.ENVIRONMENT === 'development') {
                                return '[path][name].[ext]';
                            }
                            return '[path][hash].[ext]';
                        },
                    },
                },
                {
                    test: /\.(eot|woff|woff2|ttf)$/,
                    loaders: [
                        'url-loader'
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
                filename: "src/Styles/[name].css",
                chunkFilename: "src/Styles/[id].css"
            }),

        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    }
    
};