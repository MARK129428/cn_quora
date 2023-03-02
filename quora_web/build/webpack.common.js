const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        alias: {
            "@component": path.resolve(__dirname, "../src/components"),
            "@page": path.resolve(__dirname, "../src/pages"),
            "@model": path.resolve(__dirname, "../src/models"),
            "@": path.resolve(__dirname, "../src")
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                exportGlobals: true,
                                localIdentName: "[local]--[hash:base64:5]",
                            },
                        }
                    },
                    {loader: "postcss-loader"},
                    {loader: "sass-loader"},
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: [
                                path.resolve(__dirname, "../src/assets/style/mixin.scss"),
                                path.resolve(__dirname,   "../src/assets/style/variables.scss")
                            ]
                        }
                    }
                ]
            },
            {
               test: /\.css$/,
               use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "postcss-loader"},
               ]
            },
            {
                test: /\.svg$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/public/index.html')
        })
    ]
}