const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = 'qwe123!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$3g5YprASrvehCgewCZGX0e8t/7YoGUivrtFwG3QdXQwhRMJgqOmTW';

bcrypt.compare("password",hashedPassword, (err,res) => {
   console.log(res); 
});

// -------------------  JWT
// var data = {
//     id:4
// }

// var token = jwt.sign(data,'qwe123')
// console.log(token)

// var decoded = jwt.verify(token,'qwe123')
// console.log(decoded)

// -------------------  HASH

// var message = 'I AM ser number 3';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`);


// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// if(resultHash === token.hash){
//     console.log('Data was not changed')
// } else{
//     console.log('Data was changed')
// }