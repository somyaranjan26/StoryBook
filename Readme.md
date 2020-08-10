# StoryBook App 

## Packages Used

- mongoose: Work with database, to create models
- connect-mongo: MongoDB session store for Connect and Express
- express: HTTP servers and handling request
- express-session: Create a session middleware
- express-handlebars: View engines for Express
- dotenv: For Environment variable
- method-override: To use HTTP verbs such as PUT or DELETE
- moment: To formates Dates
- morgan: HTTP request logger middleware
- passport: For Authentication
- passport-google-oauth20: For Google Authentication

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install StoryBook.

```bash
npm install
```

## Usage
Create a config.env file inside config folder set these configurations

```
PORT = (PUT YOUR PORT NUMBER HERE)
MONGO_URI = (YOUR MONGODB URI)
GOOGLE_CLIENT_ID= (GOOGLE CLIENT ID FOR AUTHENTICATION)
GOOGLE_CLIENT_SECRET= (SECRECT KEY)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

