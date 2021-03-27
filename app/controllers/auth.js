// import models
const { Member } = require('../models');

// imports npm
const bcrypt = require('bcrypt');
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

// import utils
const { generateTokenForMember } = require('../utils/jwt');

module.exports = {

    register: async (req, res, next) => {
        try {
            const { email, username, password, bio } = req.body;

            // check if filled all the required input fields
            if (!email || !username || !password ) {
                return res.status(400).json({
                    error: 'missing parameters'
                });
            }

            // username validation
            if (username.length >= 13 || username.length <= 4) {
                return res.status(400).json({
                    error: 'wrong username (length must be between 5 and 12 characters'
                });
            }

            // email validation
            const isEmailValid = emailValidator.validate(email);
            if(!isEmailValid) {
                return res.status(400).json({
                    error: 'please enter a valid email address'
                });
            }

            // password validation
            const schema = new passwordValidator();
            schema
            .is().min(8)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces()
            .has().symbols(1)
            .is().not().oneOf(['Passw0rd', 'Password123']);

            const isPasswordValid = schema.validate(password);
            if(!isPasswordValid) {
                return res.status(400).json({
                    error: 'please enter a valid password: min 8, upper/lowercase, min 1 digit and 1 symbol'
                });
            }

            // check if already exists
            const memberFound = await Member.findOne({
                attributes: ['email'],
                where: { email }
            })

            if (!memberFound) {
                
                // if not we create a new user with a hashed Password
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
                    const newMember = await Member.create({
                        email,
                        username,
                        bio,
                        password: hashedPassword,
                        // role
                    })

                    // new registration worked!
                    if (newMember) {
                        return res.status(201).json({
                            message: "new member created successfully",
                            memberId: newMember.id
                        });
                    }
                    next(error);
                });

            } else {
                return res.status(409).json({
                    error: "user already exists"
                })
            }

        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            // check that both values exist
            if (!email || !password ) {
                return res.status(400).json({
                    error: 'missing parameters'
                });
            }

            // check if user exists via unique email address
            const memberFound = await Member.findOne({
                where: { email }
            })
            
            if (memberFound) {
                // if email exists, check if the password matches
                bcrypt.compare(password, memberFound.password, async (error, isPassword) => {
                    if (isPassword) {
                        // if it matchs create a token
                        const token = generateTokenForMember(memberFound);
                        // send it back to the browser as a cookie NOT accesssible by Js cookie.document
                        res.cookie('token', token, { 
                            httpOnly: true,
                            maxAge: 3600 
                        });
                        res.cookie('memberId', memberFound.id, {
                            httpOnly: true,
                            maxAge: 3600
                        })
                        return res.status(200).json({
                            'memberId': memberFound.id,
                            'token': token
                        })
                    } else {
                        return res.status(403).json({
                            error: 'invalid password' // can also be 'invalid email or password' to keep privacy
                        })
                    }
                })

            } else {
                return res.status(404).json({
                    error: 'member does not exist in database' // can also be 'invalid email or password' to keep privacy
                })
            }
        } catch (error) {
            next(error);
        }
    },

    logout : (req, res, next) => {
        res.clearCookie('token').status(200).json({message: "token has been cleared"})
    },

    getProfile : async (req, res, next) => {
        try {
            const { memberId } = req.member;
            const memberFound = await Member.findOne({
                attributes: ['id', 'email', 'username', 'bio'], // only the columns we need
                where: { id: memberId }
            })

            if (memberFound) {
                res.status(201).json({
                    status: 'request authorized',
                    data: memberFound
                });
            } else {
                res.status(400).json({
                    error: 'member not found..'
                });
            }
        } catch (error) {
            next(error);
        }
    },

    createCsrfToken : (req, res, next) => {
        res.json({
            csrfToken: req.csrfToken()
        });

    },

    updateProfile : async (req, res, next) => {
        try {
            // So far we can only update the bio
            const { bio } = req.body;

            const { memberId } = req.member;
            const memberFound = await Member.findOne({
                attributes: ['id', 'bio', 'username'], // only the columns we need
                where: { id: memberId }
            })

            if (memberFound) {
                await memberFound.update({
                    // ternary if new bio exists it changes otherwise it keep the current value
                    bio: (bio ? bio : memberFound.bio)
                })
                res.status(201).json({
                    message: "profile has been modified successfully",
                    data: memberFound
                });

            } else {
                res.status(400).json({
                    error: 'member not found..'
                });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteProfile : async (req, res, next) => {
        try {
            const { memberId } = req.member;
            const memberFound = await Member.findOne({
                where: { id: memberId }
            })

            if (memberFound) {
                await memberFound.destroy({
                })
                res.status(201).json({
                    message: "profile has been deleted successfully",
                });

            } else {
                res.status(400).json({
                    error: 'member not found..'
                });
            }
        } catch (error) {
            next(error);
        }
    }
}