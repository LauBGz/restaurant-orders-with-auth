const jwt = require('jsonwebtoken');
const fs = require('fs');
const lockUpContent = fs.readFileSync('lockUp.json');
const lockUp = JSON.parse(lockUpContent);


//Middleware
module.exports = function isLoggedIn(req, res, next) {
    if (req.cookies.stamp){//Si hay cookie que la "valide"
        jwt.verify(req.cookies.stamp, lockUp["jwt_clave"], (error, decode) => {
            if (error) throw error;

            if (decode !== undefined) {  
                //Si no hay error y la cookie no es undefined que continúe con 
                //la siguiente petición en cuestión
                next();
            }
        });
    } else {
        //Si no que devuela no autorizado
        res.send(401, "Acceso no autorizado");
    }
}



  



