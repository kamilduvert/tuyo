const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenForMember: (memberData) => {
        return jwt.sign({
            memberId: memberData.id,
            // role: userData.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        })
    },
}