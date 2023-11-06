## Run
### Node.js Server
Run `npm install`<br />
Run `node server.js` for a dev server exporting API at http://localhost:8080/.

### Angular Client
Run `npm install`<br />
Run `ng serve --port 8081`.<br />
Navigate to `http://localhost:8081/`.

## Momgo db restore example
**db file** - https://drive.google.com/file/d/1E5eAnKqXsEWeytqNTWwK_FCfYetq3xYt/view<br />
.\mongorestore.exe --gzip --archive=./db.agz

## Available Users and Creds
login: **admin** pass: **password** - role admin<br />
login: **user** pass: **password** - role user

## App description
App provide ability to register new users with "user" role, admin cannot be created by ui. <br />
Admin has access to Administration part and can do CRUD operations on containers and things. <br />
Admin and users have access to "Where is the thing" app part - it's the main part of application. <br />
Here users can put things to containers and also containers to containers.
