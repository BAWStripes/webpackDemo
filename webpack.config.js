const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'myLibrary',
        filename: '_index.js'
    },
    module: {
        rules: [
            {
                test: '/.js[x]?$/',
                exclude: [
                    'node_modules'
                ],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    }
}