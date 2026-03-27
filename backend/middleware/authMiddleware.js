const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).json({message: "No token, Access denied"});
        }
        // remove bearer
        const remove = token.startsWith('Bearer') ? token.slice(7) : token;

        // verify
        const decoded = jwt.verify(remove, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
         return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;