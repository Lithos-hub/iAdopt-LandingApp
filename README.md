# iAdopt

![iAdopt](https://user-images.githubusercontent.com/57297760/245073065-da61ba7c-6dfc-43c9-982f-9e325aa09157.jpg)

iAdopt is a chatbot tool that helps animal shelters to find the best match for their animals and potential adopters using ChatGPT.

## Installation and setup

```
npm install
```

Rewrite the .env.example file to .env.local and fill in the required fields.

```
OPENAI_API_KEY=sk-...
DB_URI=mongodb://... // for Mongo ATLAS db
# DB_URI=mongodb://localhost:27017/iadoptv2 // for local db
API_URL=http://localhost:3000/api
BASE_URL=http://localhost:3000
SENDGRID_FROM_EMAIL=example@example.com // email address that will send the emails
SENDGRID_API_KEY=SG. ... // sendgrid api key
```

## Usage


```
npm run dev
```

```
npm run build
```

```
npm run start
```

