const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const enviroment =
	process.env.NODE_ENV === "development" ? "development" : "production";

const apiUrls = {
	production: "https://courseproject-back.herokuapp.com/",
	development: "http://localhost:9090/",
};

module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "index.bundle.js",
		publicPath: process.env.PUBLIC_URL,
	},
	devtool: enviroment === "production" ? false : "inline-source-map",
	mode: process.env.NODE_ENV || "development",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "src"),
		},
		compress: true,
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index.html"),
		}),
		new webpack.DefinePlugin({
			API_URL: JSON.stringify(apiUrls[enviroment]),
		}),
	],
};
