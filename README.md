<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>

**Users API**
A sample node js api for managing users:
1.  Create user
2.  Get user
3.  Update user
4.  Delete user

**Setup**:
### Clone the repository, install node packages and verify routes locally

```
//on local
git clone https://github.com/mohaned-hassan/Users_Api
cd Users_Api
npm install
npm start

```

Open your local browser and verify the api is working by :  

    `Add User:
    send a "POST" request to http://localhost:4000/users and including a name,password and an email in the body example:
    {
    "name":"John Doe"
    "password":"pass123"
    "email":"email1@gmail.com"}


    Get User:
    send a 'GET' request to http://localhost:4000/users/email
    example:  GET:http://127.0.0.1:4000/users/email1@gmail.com
    

    Update User:
    send a 'PATCH' request to http://localhost:4000/users/email and include the new email in the body
        example:  PATCH:http://127.0.0.1:4000/users/email1@gmail.com
        body:{
        "email":"newemail@gmail.com
        }
        

    Delete User:
    send a 'Delete' request to http://localhost:4000/users/email
        example:DELETE: http://127.0.0.1:4000/users/email1@gmail.com
