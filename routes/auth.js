//Importar librerias
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//Importar archivo lockUp
const lockUpContent = fs.readFileSync('lockup.json');
const lockUp = JSON.parse(lockUpContent);

console.log('lockUp')

// Endpoint /register. Se realizará una llamada POST a este endpoint enviando la información 
//de un cliente nuevo: username, email, password.
//Endpoint /login. Se realizará una llamada POST a este endpoint enviando el username y la password. El servidor comprobará la password 
//y, si es correcta, enviará al cliente un token de sesión en una cookie. 
module.exports = function(servidor) {
    servidor.post('/register',[
        // username must be at least 2 chars long
        check('username').isLength({ min: 2 }),
        // email must be an email
        check('email').isEmail(),
        // password must be at least 8 chars long
        check('password').isLength({ min: 8 })
      ] , (req, res) =>{
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "Invalid data or missing information." });
        }

        fs.readFile('users.json', (error, fileContents) => {
            if(error) throw error;      

            const data = JSON.parse(fileContents);

            for (let i = 0; i < data.length; i++) {
                if(data[i]["username"] === req.body['username']){
                    res.send({"error": "Ese usuario ya existe"});
                    return;
                }    
            }

            bcrypt.hash(req.body["password"], 14, (error, hash) => {
                if (error) throw error;
                
                let idUsuario = 0;
                for (const user of data) {
                    if (user["id"] > idUsuario){
                        idUsuario = user["id"]
                }
                    idUsuario++;
                } 

                const userData = {
                    "username": req.body["username"], 
                    "password": hash, 
                    "email": req.body["email"], 
                    "id": `${idUsuario}`
                }
           
                //Añado al array de usuarios, el nuevo usuario
                data.push(userData);

                fs.writeFile('users.json', JSON.stringify(data), (error) => {
                    if (error) throw error

                    res.send({"message": "Usuario creado con éxito!"});
                    return;
                })
            })
        })
  
    })

 servidor.post('/login', [
    // username must be an email
    check('username').isLength({ min: 2 }),
    // password must be at least 8 chars long
    check('password').isLength({ min: 8 })
    ], (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ "error": "Invalid data or missing information." });
        }

        const userData = {
            "username": req.body["username"],
            "password": req.body["password"]
        }

        fs.readFile('users.json', (error, fileContents) => {
            if (error) throw error;

            const data = JSON.parse(fileContents);

            //Buscar el usuario por su nombre
            for (let i = 0; i < data.length; i++) {
                if (data[i]["username"] === req.body["username"]) {
                    bcrypt.compare(userData["password"], data[i]["password"],(error, result) => {
                        if (error) throw error;

                        if (userData["username"] === data[i]["username"] && result){
                            jwt.sign({ "username": userData["username"] }, 
                                lockUp["jwt_clave"], (error, token) => {
                                if (error) throw error;

                                res.cookie('stamp', token);
                                res.send({ "message": "Usuario loggeado",
                                            "token": token})  
                                //TODO: quitar token antes de deployar 
                            });
                        } else {
                            res.send({ "error": "usuario o contraseña incorrectos" })
                        }
                    })
                    return
                } else {
                    if (i === data.length -1){
                        res.send({"error": "usuario no existente"})
                        return;
                    }
                }
            }
        })
      
    })
};