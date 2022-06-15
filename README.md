# Milon-API
This is an english hebrew light dictionary REST-API for your LAN 

!To use this program first you need to have mongodb installed on your machine!

Setup guide:
1.create a folder where you will run your database and run in terminal mongodb using the command: (path to mongodb folder)\bin\mongod.exe --dbpath=(folder path)
2.go to the project root folder and run: npm run createdb. it will create the whole database of words for the api.
3.start the api service by using the command in the terminal: npm start
You are now good to go!

Using the API:
As a user you will need to create a user or login have access to the API services.
After you are logged in just fetch any word you want in english or hebrew and get it counterpart translation.

Note: each request is validated with jwt token so you must be using an existing user for it to work!
Note2: each request returns the data in its body as JSON!

API commands:
  Create user:
    POST {address}/user
    body: {"email": "youremail@mail.com", "password": "mypassword"}
    //Also gives you an API key
  
  Login:
    POST {address}/user/login:
    body: {"email": "youremail@mail.com", "password": "mypassword"}
    
  Logout:
    POST {address}/user/logout:
    body: {"email": "youremail@mail.com", "password": "mypassword"}
    
  Delete user:
    DELETE {address}/user
    //Delete the user which sends this.
    
  Fetch word translation:
    GET {address}/words?apikey=mykey&word=targetword
    //Returns both english and hebrew translations of the word.
    
  Generate new api key:
    GET {address}/user/newkey
