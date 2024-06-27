const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: { static: './dist' },
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: './src/img/', /* Copies only content */
                    to: './dist/img/', /* it's already in dist */ 
                },
            ],
        }),
    ],
};
