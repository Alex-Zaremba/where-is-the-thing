## Run
### Node.js Server
Run `npm install`
Run `node server.js` for a dev server exporting API at http://localhost:8080/.

### Angular Client
Run `npm install`
Run `ng serve --port 8081`.
Navigate to `http://localhost:8081/`.

## Momgo db restore example
**db file** - https://drive.google.com/file/d/1E5eAnKqXsEWeytqNTWwK_FCfYetq3xYt/view
.\mongorestore.exe --gzip --archive=./db.agz

## Available Users and Creds
login: **admin** pass: **password** - role admin
login: **user** pass: **password** - role user

## App description
App provide ability to register new users with "user" role, admin cannot be created by ui.
Admin has access to Administration part and can do CRUD operations on containers and things. 
Admin and users have access to "Where is the thing" app part - it's the main part of application,
Here users can put things to containers and also containers to containers.
