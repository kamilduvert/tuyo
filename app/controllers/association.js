// import models
const { Post, Member, Category, Favorite, Like } = require('../models');

module.exports = {

    addCategory: async (req, res, next) => {
        try {
            const {postId, categoryId} = req.params;

            const postFound = await Post.findByPk(postId);
            const categoryFound = await Category.findByPk(categoryId);

            // if one of them doesn't exist => 404
            if (!postFound || !categoryFound) {
                next();
            } else {
                // Otherwise we create the association
                await postFound.addCategory(categoryFound);

                // Problem, Sequelize doesn't automatically update the post
                // So we need to make a reload
                await postFound.reload({
                    include: [
                        {
                            model: Category,
                            as: "categories",
                            attributes: ['id','name']
                        }
                    ]
                });
                res.status(200).json(postFound);
            }

        } catch (error) {
            next(error)
        }
    },

    removeCategory: async (req, res, next) => {
        try {
            const {postId, categoryId} = req.params;

            const postFound = await Post.findByPk(postId);
            const categoryFound = await Category.findByPk(categoryId);

            // if one of them doesn't exist => 404
            if (!postFound || !categoryFound) {
                next();
            } else {
                // Otherwise we removee the association
                await postFound.removeCategory(categoryFound);

                // Problem, Sequelize doesn't automatically update the post
                // So we need to make a reload
                await postFound.reload({
                    include: [
                        {
                            model: Category,
                            as: "categories",
                            attributes: ['id','name']
                        }
                    ]
                });
                res.status(200).json(postFound);
            }

        } catch (error) {
            next(error)
        }
    },

    addFavorite: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const postFound = await Post.findByPk(postId);

            const { memberId } = req.member;

            if (!postFound) {
                res.status(404).json({
                    error: 'post does not exist in database'
                })
            } else {
                const favoriteFound = await Favorite.findOne({
                    where: {
                        post_id: postId,
                        member_id: memberId
                    }
                });
                if (!favoriteFound) {
                    await Favorite.create({
                        post_id: postId,
                        member_id: memberId
                    });
                    res.status(200).json({
                        message: "post has been added to favorites!"
                    });
                } else {
                    res.status(409).json({
                        error: 'post already in member\'s favorites'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    },

    removeFavorite: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const postFound = await Post.findByPk(postId);

            const { memberId } = req.member;
            const memberFound = await Member.findByPk(memberId);

            // if one of them doesn't exist => 404
            if (!postFound || !memberFound) {
                next();
            } else {
                const favoriteFound = await Favorite.findOne({
                    where: {
                        post_id: postId,
                        member_id: memberId
                    }
                });
                if (favoriteFound) {
                    await favoriteFound.destroy();
                    res.status(200).json({
                        message: "post has been removed from favorites!"
                    });
                } else {
                    res.status(409).json({
                        error: 'post is not in favorites'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    },

    addLike: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const postFound = await Post.findByPk(postId);

            const { memberId } = req.member;
            const memberFound = await Member.findByPk(memberId);

            // if one of them doesn't exist => 404
            if (!postFound || !memberFound) {
                next();
            } else {
                const likeFound = await Like.findOne({
                    where: {
                        post_id: postId,
                        member_id: memberId
                    }
                });
                if (!likeFound) {
                    await Like.create({
                        post_id: postId,
                        member_id: memberId
                    });
                    await postFound.update({
                        likes: postFound.likes + 1
                    })
                    res.status(200).json({
                        message: "post has been liked!"
                    });
                } else {
                    res.status(409).json({
                        error: 'post already liked by member'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    },

    removeLike: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const postFound = await Post.findByPk(postId);

            const { memberId } = req.member;
            const memberFound = await Member.findByPk(memberId);

            // if one of them doesn't exist => 404
            if (!postFound || !memberFound) {
                next();
            } else {
                const likeFound = await Like.findOne({
                    where: {
                        post_id: postId,
                        member_id: memberId
                    }
                });
                if (likeFound) {
                    await likeFound.destroy();
                    await postFound.update({
                        likes: postFound.likes - 1
                    })
                    res.status(200).json({
                        message: "post has been unliked!"
                    });
                } else {
                    res.status(409).json({
                        error: 'post is not liked by member'
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    },

    
};