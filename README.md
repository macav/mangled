# Mangled - a word game

A simple word puzzle game, where users must guess as many words as they can in a time limit without any mistake.

### Install Dependencies

Install dependencies via

```
npm install
```

and

```
bower install
```

You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000`.


## Testing

You can run unit tests using
```
npm test
```

## Build

You can build minified version using
```
gulp clean-build
```

## Docs

Docs can be built using
```
gulp build-docs
```

and served via
```
gulp serve-docs
```
