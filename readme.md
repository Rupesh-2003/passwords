## Passwords 
Passwords is PWA for people who forget thier passwords. passwords stored in notepad or any other local software will be lost if it is not synced to cloud. 
Storing passwords in Passwords directly stores data in your **mongoDB cloud** You can access this data from any device and anywhere after the PWA is hosted.

```
Your passwords stored on your cloud DB which can only be accessed
by password created by you. No 3rd party included
```

## Tech Stack

<img align="left" width="30px" src="https://raw.githubusercontent.com/devicons/devicon/c7d326b6009e60442abc35fa45706d6f30ee4c8e/icons/html5/html5-original.svg"/>
<img align="left" width="30px" src="https://raw.githubusercontent.com/devicons/devicon/c7d326b6009e60442abc35fa45706d6f30ee4c8e/icons/css3/css3-original.svg"/>
<img align="left" width="30px" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"/>
<img align="left" width="30px" src="https://raw.githubusercontent.com/devicons/devicon/c7d326b6009e60442abc35fa45706d6f30ee4c8e/icons/nodejs/nodejs-original.svg"/>
<img align="left" width="30px" src="https://raw.githubusercontent.com/devicons/devicon/c7d326b6009e60442abc35fa45706d6f30ee4c8e/icons/express/express-original.svg"/>
<img align="left" width="30px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"/>
<img align="left" width="30px" src="https://avatars.githubusercontent.com/u/41653701?s=400&v=4"/>
<br>

## How to Create your own Passwords PWA

Fork the repo
clone the forked repo
ADD your own credentials to the .env && nodemon.json
Deploy the project

```diff
 **Environment Variables to be edited :** 
 
-Frontend
1. REACT_APP_OPENCAGE_API_KEY
	visit https://opencagedata.com , signup and get your API Key
2. REACT_APP_BACKEND_URL
	after deploying the project add the app url in .env.production

-Backend
2. DB_USER
3. DB_PASSWORD
4. DB_CLUSTER_NAME
5. DB_NAME
	visit https://www.mongodb.com , create account and under connect section get all these details
6. JWT_KEY
	generate your jwt key through terminal
7. PUBLIC_KEY (nodeRSA)
8. PRIVATE_KEY (nodeRSA)
	Create your keys and paste them in nodemon.json
	(add \n at the end of each line except last and combine it in one line)
	Eg : -----BEGIN  PUBLIC  KEY-----\n
		MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkkucYC3fCQnlkbzyBgkh3a6dg\n
		ETFaQvOiV+/CRK2yvZiT0XMM+XaPTxPo3L6p+34nrlc/6dUQXaKRRYklAXSUaLx2\n
		aWOHOymbQW+0pHj9sio/uwB35kChyIGG2mjmDmjczY+kiI/edV3OTxi7lybaHBt2\n
		+nFKvbJr674SHHpQcwIDAQAB\n
		-----END  PUBLIC  KEY-----
9. Passwords_App_Username 
	create user by hitting at create user route using api testing tools like postman. 
	You would require to pass username and password. Paste the same username here.