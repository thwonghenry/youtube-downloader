import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const rootDir = path.resolve(__dirname);

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
    entry: {
        popup: [
            'regenerator-runtime/runtime',
            path.resolve(rootDir, 'src', 'popup', 'index.jsx')
        ],
    },
    output: {
        path: path.resolve(rootDir, 'build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: ['node_modules'],
            use: [
                'babel-loader',
                'eslint-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Youtube Downloader',
            filename: path.resolve(rootDir, 'build', 'popup.html'),
            template: path.resolve(rootDir, 'src', 'popup', 'index.ejs'),
            chunks: ['popup'],
            minify: isProd ? {
                removeComments: true,
                collapseWhitespace: true
            } : false
        })
    ]
};

if (isProd) {
    config.plugins.concat(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));
}

export default config;