# The employee madness

## APP FEATURES

    1.  List every employee from the database
    2.  Create new employees
    3.  Add necessary equipments.
    4.  Add necessary tools
    5.  Create new divisions
    6.  Create training sessions

The app built using the MERN stack. 


## START SERVE SIDE

### .env file
Fill the missing username and password with your own mongoDB username and password

```bash
cd ./server
npm install
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.


## START CLIENT SIDE


```bash
cd ./client
npm install
npm start
```

The command will start the app on localhost:3000

### Proxy
Watch for the port of your rest api. By default it will bind on port 8000 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.





