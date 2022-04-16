# Backend api for a blog-app
```bash
# Clone this repository
$ git clone https://github.com/Ian-Balijawa/blog-server-api.git

# Go into the repository
$ cd backend

# Install dependencies in backend by using 
$ npm install 

# Setup environment variables
$ In backend folder, create a file called '.env' 
$ Declare the following variables as env vars : 
  ACCESS_TOKEN, 
  REFRESH_TOKEN_SECRET, 
  JWT_SECRET='your secret Key',API_VERSION=v1 or v1.0.2 or v2 (required), 
  DB_URI_LOCAL=mongodb://localhost/dbname (if db doesn't exist, it'll create one.), 
  DB_URI_ATLAS='the url from mongo cloud atlas' (optional) 

# Run the backend
$cd backend
$ npm start

# Run the frontend by setting proxy to frontend in package.json
$ add this line at line 2 in frontend/package.json >> "proxy" : "https://localhost:3001"

```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following open source packages:

- [NodeJS](http://nodejs.org)
- [ReactJS](http://reactjs.org)
- [ExpressJS](http://expressjs.com)
- [MongoDB](http://mongodb.com)

## License

MIT