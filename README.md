# Project-Template-Vite-React_Redux

1. remove this git repository from backend before putting into main project folder:
   $ rm -rf .git

2. move into main project folder

3. install dependencies in main project folder:
   npm install

4) create a .env file in main project folder, then paste the following code:

NODE_ENV = development  
PORT = 3000  
MONGO_URI = [Your mongoDB connection string here, don't include brackets]  
JWT_SECRET = [Whatever string/number combination you want here, don't include brackets]

5. cd into Frontend and install dependencies:
   npm install
6. cd back into main folder and run 'npm run dev'
