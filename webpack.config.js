const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = {
    entry: './TempleApp.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules:
            [
                { // sass and postcss at the end
                    test: /\.(scss|css)$/,
                    exclude: /plyr\.css$/, // see above
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path.join(__dirname, './postcss.config.js')
                                }
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    quietDeps: true,
                                    includePaths: [
                                        'node_modules'
                                    ]
                                }
                            }
                        }]
                },
                {
                    // generate css files without sass-loader + postcss-loader (see below) to avoid issues with dart sass and plyr:
                    // https://github.com/sampotts/plyr/issues/2323
                    // as well as plyr and postcsss: https://github.com/sampotts/plyr/issues/2182#issuecomment-889630296
                    test: /plyr\.css$/,
                    // exclude: /node_modules\/(plyr)\/.*/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }]
                }
            ]
    },
};