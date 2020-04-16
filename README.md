# restaurant-orders-with-auth
 `Restaurant orders management (CRUD) previous register & authentication.`
 `Technologies: Node.js & Express`

**User register**
----
 `Get basic data from users in order to create an account.`

* **URL**

  `/register`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
    {
    "username": "RogerAbbit",
    "password": "abcd12345",
    "email": "rogerabbit@apirestaurante.com"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Usuario creado con éxito!"
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    > Example
     ```json
    {
    "error": "Invalid input or missing information."
    }
    ```

* **Sample Call:**

```Javascript
    servidor.post('/register', (req, res) => {}
```
//
**User login**
----
 `User access to their account.`

* **URL**

  `/login`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
    {
        "username": "RogerAbbit",
        "password": "abcd12345"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Usuario creado con éxito!"
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    > Example
     ```json
    {
    "error": "Invalid input or missing information."
    }
    ```

* **Sample Call:**

```Javascript
    servidor.post('/login', (req, res) => {}
```
//
**Get orders**
----
 `Obtain all the order created by the user once the login is done.`

* **URL**

  `/pedidos`

* **Method:**

    `GET`

*  **URL Params**

   `None`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `All data`


* **Sample Call:**

```Javascript
    servidor.get('/pedidos', isLoggedIn, (req, res) =>{}
```

//
**Get order**
----
 `Obtain data from a single order once the login is done.`

* **URL**

  `/pedido/:id`

* **Method:**

    `GET`

*  **URL Params**

   `Order "id"`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `Single data`

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 

     ```json
    {
    "message": "Pedido no existe."
    }
    ```

* **Sample Call:**

```Javascript
    servidor.get('/pedido/:id', isLoggedIn, (req, res) => {}
```

//
**Delete order**
----
 `Delete a single order once the login is done.`

* **URL**

  `/eliminarPedido/:id`

* **Method:**

    `DELETE`

*  **URL Params**

   `Order "id"`

* **Data Params**

     `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `Single data`

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 

     ```json
    {
    "message": "Pedido no existe."
    }
    ```

* **Sample Call:**

```Javascript
    servidor.get('/pedido/:id', isLoggedIn, (req, res) => {}
```
//
**Create order**
----
 `Make a new order once the login is done.`

* **URL**

  `/crearPedido`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
      {
        "productos": [
            "hamburguesa",
            "cerveza"
        ],
        "fecha": "29/02/2020",
        "direccion": "Av Diagonal 666",
        "precio": "15"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Pedido creado con éxito!"
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    
     ```json
    {
    "error": "Invalid input or missing information."
    }
    ```

* **Sample Call:**

```Javascript
      servidor.post('/crearPedido', isLoggedIn, (req, res) =>{}
```
//
**Update order**
----
 `Edit a order already created once login is done.`

* **URL**

  `/editarPedido`

* **Method:**

    `POST`

*  **URL Params**

   `None`

* **Data Params**

    ```json
      {
        "productos": [
            "hamburguesa",
            "cerveza"
        ],
        "fecha": "29/02/2020",
        "direccion": "Av Diagonal 666",
        "precio": "15",
        "id": "19"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Pedido modificado con éxito!"
    }
    ```

* **Error Response:**

  * **Code:** 422 <br />
    **Content:** 
    
     ```json
    {
    "error": "Invalid input or missing information."
    }
    ```

* **Sample Call:**

```Javascript
      servidor.post('/editarPedido', isLoggedIn, (req, res) =>{}
```