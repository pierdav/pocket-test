# pocket-test

> A simple test for a login functionality. This script uses Express.js and Node-mailer.
Which works as the following: User enters email to our website and this information is POSTed to our server, and we sent a One-time password code to that address by using our email sending module. Then user logs into his email, finds this One-time password and copy pastes to our website and we do another POST request, which enables login if the security codes match.

## Installation
Install via NPM:

```ruby
npm install

```

## Gmail SMTP Config

#### make change in server.js at line 10

```javascript

var from = {email:'xxxxx@gmail.com', pass:'xxxxx'};

```
Alse make sure to enable less secure apps in google account : https://www.google.com/settings/security/lesssecureapps

## Launch server
```shell
node .
```

## Client test register
Open browser and connect to http://localhost:8000/register


## Client test login
Open browser and connect to http://localhost:8000/login


## Mocha test register
run 
```shell
mocha test/register.js --email=xxxx@xxx.xx
```

## Mocha test login
run 
```shell
mocha test/login.js --email=xxxx@xxx.xx --pswrd=xxxxx
```
