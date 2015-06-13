# The Vardyger publishing platform :)

##The RESTful API

![Swagger UI screenshot](https://github.com/Robinyo/Vardyger/blob/master/content/assets/vardyger-api.png)

###Developer Install

1. Install Node.js

    <pre>brew install node</pre>

2. Install Swagger

    <pre>npm install -g swagger</pre>

3. Clone the repo

    <pre>https://github.com/Robinyo/Vardyger.git</pre>

4. Start the API server (in the project's /core/server directory)

    <pre>swagger project start</pre>

5. View the Swagger UI:

    <pre>http://localhost:10010/docs</pre>

**Note:** Edit the API (/core/server/api/swagger/swagger.yaml):

    swagger project edit