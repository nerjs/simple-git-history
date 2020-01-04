const webpack = require('webpack')
const DotEnv = require('dotenv-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const { NODE_ENV } = process.env

const name = 'main'

const config = {
    context: path.join(__dirname, 'src'),
    entry: {
        [name]: './index.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/',
    },

    mode: NODE_ENV,
    watch: NODE_ENV !== 'production',
    devtool: NODE_ENV === 'production' ? false : 'inline-source-map',

    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn'],
                    },
                    ie8: false,
                    warnings: false,
                    output: {
                        comments: false,
                        webkit: true,
                        max_line_len: 200,
                    },
                },
                extractComments: {
                    condition: () => '',
                },
            }),
        ],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            browsers: 'last 3 versions',
                                        },
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                ],
            },
        ],
    },

    // resolve: {
    //     alias: alias || {},
    // },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE || process.env.NODE_ENV),
        }),
        new DotEnv(),
    ],
}

if (process.env.NODE_ENV !== 'production') {
    config.module.rules[0].use[0].options.plugins.push([
        'babel-plugin-styled-components',
        {
            // displayName: true,
            fileName: true,
        },
    ])
}

if (process.env.BUILD_TYPE === 'hot') {
    config.entry[name] = [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        config.entry.main,
    ]

    config.module.rules[0].use[0].options.plugins.push('react-hot-loader/babel')

    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

console.log(config)

module.exports = config
