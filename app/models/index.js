/** Purpose of that file:
 * - require all the models
 * - create associations
 * - re-export all the models in one single object
 */

const Post = require('./post');
const Member = require('./member');
const Category = require('./category');
const Like = require('./like');
const Favorite = require('./favorite');

// =======  MEMBER vs POST (One To Many) ==============

// A member adds many posts (0, N)
Member.hasMany(Post, {
    // foreign key's name
    foreignKey: "member_id",
    // alias for association
    as: "posts"
});

// A post belongs to only one member (1,1)
Post.belongsTo(Member, {
    foreignKey: "member_id",
    as: "member"
});

// =======  POST vs Category (Many To Many) ===========

// A Post has many Categories (1, N)
Post.belongsToMany(Category, {
    through: "post_has_category",
    foreignKey: "post_id",
    otherKey: "category_id",
    as: "categories"
});

// A Category has many Posts (0,N)
Category.belongsToMany(Post, {
    through: "post_has_category",
    foreignKey: "category_id",
    otherKey: "post_id",
    as: "posts"
});

// ======== MEMBER vs POST LIKES (Many To Many) =======

// A member has favorites many posts (0,N)
Member.belongsToMany(Post, {
    through: "member_likes_post",
    foreignKey: "member_id",
    otherKey: "post_id",
    as: "likedPosts"
});

Post.belongsToMany(Member, {
    through: "member_likes_post",
    foreignKey: "post_id",
    otherKey: "member_id",
    as: "likedMembers"
});


// ======== MEMBER vs POST FAVORITES (Many To Many) =======

// A member has favorites many posts (0,N)
Member.belongsToMany(Post, {
    through: "member_favorites_post",
    foreignKey: "member_id",
    otherKey: "post_id",
    as: "favoritesPosts"
});

Post.belongsToMany(Member, {
    through: "member_favorites_post",
    foreignKey: "post_id",
    otherKey: "member_id",
    as: "favoriteMembers"
});


// A post has favorites many members (0,N)


module.exports = {
    Post,
    Member,
    Category,
    Like,
    Favorite
};