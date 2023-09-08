# Abbey Interview Test 

## Description:
This is a banking website, built on React(TypeScript), NodeJS/Express and MongoDB. It features user authentication, account creation, ability to make transactions, store these records, fetch them, add beneficiaries(relationships) etc. 

### Things to note:
- Giving the request to make something simple but functional frontend to backend, I focused more on functionality than decor.
- Also, still concerning the matter of simplicity. I realize that an actual banking web app would require more than using Local Storage for client side authentification but decided to go with that for the sake of simplicity. Hence tokens for user identification were in fact stored in the client side.

## Set Up
- To host the app on your local, clone the repo and in the root directory run (cd ../backend) to move to the backend which is the head of the app. 
- Then run (cp .env.example .env) to get the basic scaffolding of the environment variables you will need. Since this app uses MongoDB as a database, you will have to provide a MongoDB url or otherwise contact me to send over mine as it would not be safe to commit it on GitHub.