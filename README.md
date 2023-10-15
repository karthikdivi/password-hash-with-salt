# password-hash-with-salt
NodeJS library for hash the passwords with salt

## Usage 

### Generate a salt and hash a password

```javascript
const phws = require('password-hash-with-salt');

let password = '123456'; // password from user input
let result = phws.generate(password);

console.log(result.salt); // store the salt to database
consle.log(result.hash); // store the hash as password in database
```

### Verify a password

```javascript
const phws = require('password-hash-with-salt');

let password = '123456'; // password from user input
let salt = 'salt from database';

let result = phws.verify(password, salt); // returns true or false
if (result) {
    // password is correct
} else {
    // password is incorrect
}
```

## Modes

The default mode is `secure`. You can change the mode by passing the mode as a last parameter to the `generate` and `verify` functions.

| Mode | Description |
| ---- | ----------- |
| secure | 10000 iterations |
| fast | 1000 iterations |
| fastest | 100 iterations |

## Tests    

```sh
npm test
```