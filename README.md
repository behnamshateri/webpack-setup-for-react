# webpack-setup-for-react
Webpack configuration for Reactjs

A boiler plate for creating react applications bundled by webpack (using ES6+, Babel, SASS and webpack development server)


### What were using
* React 16
* Webpack 4
* Babel 7
* Hot Module Replacement


### Features
* File bundling with webpack
* Webpack configuration for development (with hot reloading) and production (with minification).
* CSS module loading, so you can include your css by ```import styles from './path/to.css';```.
* Both js(x) and css hot loaded during development.

## Setting up
+ Clone this project to any folder on your local machine
```bash
git clone https://github.com/behnamshateri/webpack-setup-for-react.git <FOLDER_NAME_HERE>
```
+ Navigate into the folder name specified
```bash
cd <FOLDER_NAME_HERE>
```

## Runnning the bundle

```bash
 yarn build
```

or 

```bash
 npm run build
```

## Running the app in Development

Run `npm start` to intialize and run the webpack development server. Navigate to [http://localhost:8081/](http://localhost:8081). The app will automatically reload if you change any of the source files.

## Running the app in Production

To run the app in production build of the app, use either of the following.

```bash
 yarn build
```
or
```bash
 npm build
```
