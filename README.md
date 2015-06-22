# The Vardyger publishing platform :)

A sample post rendered via Handlebars with Ghost theme support:

![Vardyger post screenshot](https://github.com/Robinyo/Vardyger/blob/master/content/assets/vardyger-post.png)

For example:

    <pre>curl http://localhost:10010/v1/posts/{id} --header "Accept: text/html"</pre>

##The RESTful API

![Swagger UI screenshot](https://github.com/Robinyo/Vardyger/blob/master/content/assets/vardyger-api.png)

Modelled using Swagger 2.0 and the Swagger Editor, built using Express.js 4.0, Swagger Tools, Mongoose and MongoDB.

##Developer Install

###Install MongoDB

1. Install MongoDB

    <pre>brew update
    brew install mongodb</pre>

###Install Node.js

1. Install Node.js

    <pre>brew install node</pre>

2. Install Swagger

    <pre>npm install -g swagger</pre>

3. Clone the repo

    <pre>https://github.com/Robinyo/Vardyger.git</pre>

4. Install the project's dependencies (as per /core/server/package.json)

    <pre>npm init</pre>

4. Run MongoDB

    <pre>ulimit -n 1024 && mongod --config /usr/local/etc/mongod.conf</pre>

6. Start the API server (in the project's /core/server directory)

    <pre>swagger project start</pre>

7. View the Swagger UI:

    <pre>http://localhost:10010/docs</pre>

**Note:** Edit the API (/core/server/api/swagger/swagger.yaml):

    swagger project edit

![Swagger Editor screenshot](https://github.com/Robinyo/Vardyger/blob/master/content/assets/swagger-editor.png)

####Copyright & License

Copyright (c) 2015 The Vardyger Foundation - Released under the MIT license.