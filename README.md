# Common API tests

## Introduction

While writing automated API Tests for Postman, we've noticed a lot of code was being repeated.
To increase the quality and simplify the creation of these tests, we've bundled the most commonly used test scripts in one JavaScript file.
This file can be imported in your Postman API Test so you don't have to write or repeat it all over again.

For readability reasons the syntax of the current scripts is based on [Postman BDD](https://github.com/JamesMessinger/postman-bdd) which in turn uses [Chai-JS assertions](http://chaijs.com/api/bdd/).

## Installation

You can check out the [Postman BDD documentation](https://github.com/JamesMessinger/postman-bdd) for its installation instructions.
Importing the Common API testscripts file is similar to installing Postman BDD.

**1. Download the Common API tests**
Create a `GET` request in Postman and point it to the following URL:<br>
[`https://raw.githubusercontent.com/digipolisantwerp/common-api-tests_js/master/common-api-tests.min.js`](https://raw.githubusercontent.com/digipolisantwerp/common-api-tests_js/master/common-api-tests.min.js)

**2. Install Postman BDD**
In the same request that you created in Step 1, go to the "Tests" tab and add the following script:

```javascript
// set response body to global variable 'commonTests'.
postman.setGlobalVariable('commonTests', responseBody);
```

## Usage

### API

| Name         | Default value | Description |
| -----------  | ------ | -------------------------- |
| `Status code: integer;` | - | The status code that should be returned in the response. |
| `Content-Type: string;` | - | The Content-Type that should be returned in the response. |
| `Response time: integer;` | - | The maximum response time in milliseconds. |
| `JsonSchema: object;` | - | The jsonSchema that should be returned in the response. |
| `Location: string;` | - | The location that should be returned in the response header. |

### Example

```javascript
// "import" Global variable 'commonTests' in your testscript
eval(globals.commonTests);

// set element to environment variable
try{
    if (responseCode.code === 201) {
        pm.environment.set("variableName", pm.response.json().id);
    }
}catch(error){
    console.log(error);
}

// define jsonschema
var jsonschema = {
    type:'array',
    items:{
        type:'object',
        required:['endpoint','parameter','alarm','type','config','status','id'],
        properties:{
            endpoint:{type:'string'},
            parameter:{type:'boolean'},
            alarm:{type:'boolean'},
            type:{type:'string'},
            config:{type:'boolean'},
            status:{type:'boolean'},
            id:{type:'number'},
        }
    }
};

// "add" the common test to your testscript
// commontest without check on response time.
  testCommon(200, "application/json", jsonschema);
// commontest with check on response time.
  testCommonAndTime(200, 500, "application/json", jsonschema);
```

## Questions

[Contact us](mailto:DA_ACPaaS_testing@digipolis.be) if you have any questions or feedback.

## Changelog

Detailed changes for each release are documented in the [changelog](./CHANGELOG.md).

## Contributing

Your contributions are most welcome as pull requests, both code changes and documentation updates.

## Support

Lieven Van Gestel (<lieven.vangestel@digipolis.be>)

## License

[MIT](./LICENSE)

Copyright (c) 2019-present, Digipolis
