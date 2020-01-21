const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './app/client/client.ts',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.vue',
            '.json',
        ],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true,
                            sassOptions: {
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
