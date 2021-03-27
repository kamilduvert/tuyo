// import models
const { Post, Member, Category } = require('../models');

// constants
const TITLE_LIMIT = 2;
const DESCRIPTION_LIMIT = 4;

module.exports = {

    getAll: async (req, res, next) => {
        const { fields, order } = req.query;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        try {
            const posts = await Post.findAll({
                //check input values, if none we set standard values
                order: [order ? order.split(':') : ['id', 'ASC']],
                attributes: (fields && fields !== '*') ? fields.split(',') : null,
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: Member,
                    as: "member",
                    attributes: ['username']
                },
                {
                    model: Category,
                    as: "categories",
                    attributes: ['id', 'name']
                }]
            });
            if (posts) {
                res.status(200).json({
                    status: 'request authorized',
                    data: posts
                });
            } else {
                next();
            }

        } catch (error) {
            res.status(500).json({
                error: 'invalid fields'
            })
        }
    },

    getOne: async (req, res, next) => {

        try {
            const { postId } = req.params;
            const postFound = await Post.findByPk(
                postId,
                {
                    include: [{
                        model: Member,
                        as: "member",
                        attributes: ['username']
                    }, {
                        model: Category,
                        as: "categories",
                        attributes: ['id', 'name']
                    }]
                }
            );

            if (postFound) {
                res.status(200).json({
                    data: postFound
                });
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { title, description, address, picture_url, categories } = req.body;

            // check if filled all the required input fields
            if (!title || !description || !address || !picture_url) {
                return res.status(400).json({
                    error: 'missing parameters'
                });
            }

            if (title.length <= TITLE_LIMIT || description.length <= DESCRIPTION_LIMIT) {
                return res.status(400).json({
                    error: 'invalid parameters'
                });
            }

            const { memberId } = req.member;
            const memberFound = await Member.findOne({
                attributes: ['id'], // only the columns we need
                where: { id: memberId }
            });

            if (!memberFound) {
                next();
            } else {
                const newPost = await Post.create({
                    title,
                    description,
                    address,
                    picture_url,
                    member_id: memberId,
                });

                categories.forEach(async (categoryId) => {
                    const categoryFound = await Category.findByPk(categoryId);

                    if (!categoryFound) {
                        next();
                    } else {
                        await newPost.addCategory(categoryFound);
                        await newPost.reload({
                            include: "categories",
                        });
                        res.status(201).json({
                            message: "new post created successfully",
                            data: newPost
                        });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { memberId } = req.member;
            const postFound = await Post.findByPk(postId);
            const memberFound = await Member.findByPk(memberId);

            if (!postFound || !memberFound) {
                next();
            } else {
                // check if member is the post's author
                if (postFound.member_id === memberFound.id) {
                    await postFound.destroy();
                    res.status(200).json({
                        message: 'post has been deleted successfully'
                    })
                } else {
                    res.status(401).json({
                        error: "cannot delete a post from another member"
                    });
                }

            }
        } catch (error) {
            next(error);
        }
    },

    updateOne: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { memberId } = req.member;
            const postFound = await Post.findByPk(postId);
            const memberFound = await Member.findByPk(memberId);

            if (!postFound || !memberFound) {
                next();
            } else {
                // check if member is the post's author
                if (postFound.member_id === memberFound.id) {

                    const { title, description, address, picture_url } = req.body;

                    // check if filled all the required input fields
                    if (!title || !description || !address || !picture_url) {
                        return res.status(400).json({
                            error: 'missing parameters'
                        });
                    }

                    if (title.length <= TITLE_LIMIT || description.length <= DESCRIPTION_LIMIT) {
                        return res.status(400).json({
                            error: 'invalid parameters'
                        });
                    }

                    await postFound.update({
                        title,
                        description,
                        address,
                        picture_url
                    });
                    res.status(201).json({
                        message: "your post has been updated successfully",
                        data: postFound
                    });


                } else {
                    res.status(401).json({
                        error: "cannot update a post from another member"
                    });
                }
            }

        } catch (error) {
            next(error);
        }

    },

};