const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './client.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
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
