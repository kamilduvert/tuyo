const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET, (err, member) => {
      if (err) {
        res.sendStatus(403).json({
          error: "invalid token"
        })
      } else {
        req.member = member
        next()
      }
    })
}

module.exports = authenticateToken;