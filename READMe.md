# Simple blockchain transaction on csv file

```git
git clone https://github.com/cpajuelodeveloper/simple-blockchains.git
```

## install dependencies

```bash
npm i
```

## run integration tests

```bash
npm run test
```

## start local server

```bash
npm run dev
```

Go to the browser and open  **localhost:3000** and the next urls.


> ### [POST]
> ## make transaction [/api/transaction]
+ Request (application/json)
    ```JSON
    {
        "message": "Hola Mundo"
    }
    ````
+ Response 201 (application/json)
    ```JSON
    {
        "payload": {
            "previusHash": "00d635c2fb2af1e39d7179c240444ee41b42392aa7a723576e83f79d4bf956dc",
            "message": "success",
            "nonce": 10,
            "hash": "00f312eed3c2a0e06905cc903aa3df4b4249dbcf7d64cfb9e9d10192ed3c02d8"
        },
        "status": {
            "success": true,
            "code": 201,
            "message": "Operation successful"
        }
    }
    ````

> ### [POST]
> ## fail transaction [/api/transaction]
+ Request (application/json)
    ```JSON
    {
        "message": ""
    }
    ````
+ Response 400 (application/json)
    ```JSON
    {
        "payload": null,
        "status": {
            "success": false,
            "message": "\"message\" is not allowed to be empty",
            "code": 400
        }
    }
    ````