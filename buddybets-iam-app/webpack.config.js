const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const webpack = require('webpack'); 

module.exports = (env, argv) => {
  // Usa argv.mode o fallback a development
  const mode = argv.mode || 'development';

  // Ruta absoluta a tu carpeta env y archivo según el modo
  const envPath =  path.resolve(__dirname, 'env', `.env.${mode}`);
  // Carga el archivo .env
  const myEnv = dotenv.config({ path: envPath });
  // Expande variables como ${BASE_URL}
  dotenvExpand.expand(myEnv);

  // Usa las variables parseadas ya expandidas
  const fileEnv = myEnv.parsed || {};


  // Carga las variables de entorno desde el archivo correcto
  //const fileEnv = dotenv.config({ path: envPath }).parsed || {};

  // Convierte las variables para DefinePlugin
  const envKeys = Object.entries(fileEnv).reduce((prev, [key, val]) => {
    prev[`process.env.${key}`] = JSON.stringify(val);
    return prev;
  }, {});

  console.log('Webpack mode:', mode);
  console.log('Cargando variables de entorno desde:', envPath);
  console.log('Variables inyectadas:', envKeys);

  return {
    mode,
    entry: "./src/index.tsx",
    devServer: {
      port: 3001,
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      historyApiFallback: true,
    },
    output: {
      publicPath: "auto",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ya?ml$/,
          type: 'json', // esto es necesario para Webpack 5
          use: 'yaml-loader',
        },
       
        // CSS Modules
        {
          test: /\.module\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: { auto: true, localIdentName: "[name]__[local]__[hash:base64:5]"},
                esModule: false,
              },
            },
          ],
        },
         //CSS normal (global)
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/, // ojo: excluir módulos
          use: ["style-loader", "css-loader"],
        }, 
        
        // Assets (imágenes, fuentes, etc.)
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]", // opcional: coloca imágenes en dist/images
          },
        },

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]", 
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),  // <-- Aquí inyectas las variables de entorno
      new ModuleFederationPlugin({
        name: "iam",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./Header": "./src/Header",
          './useAuth': './src/hooks/useAuth',
          './CallbackPage': './src/pages/CallbackPage',
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
          axios: { singleton: true, eager: true },
          "@buddybets-commons-lib/http":{singleton: true, eager: true, requiredVersion: "1.0.0"}
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};