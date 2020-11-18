const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

__webpack_public_path__: '/public'

module.exports = env => {
    
    const currentPath = path.join(__dirname);
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + env.ENVIRONMENT;
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    const fileEnv = dotenv.config({ path: finalPath }).parsed;
    console.log('-------------------------------------------------------')
    console.log(currentPath, basePath, envPath, finalPath, fileEnv)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    const optimization = {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    reuseExistingChunk: true
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    };

    return {
        entry: './src/index.js',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js',
            publicPath : '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(jpg|png|ico)$/,
                    use: ['file-loader', 'url-loader'],
                },
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            hot: true
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html'
            }),
            // new CopyWebpackPlugin([
            //     { from: './public/assets', to: './assets' }
            // ]),
            new webpack.DefinePlugin(envKeys)
        ],
        optimization: optimization,
    }
}