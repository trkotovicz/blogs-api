const sequelize = require('sequelize');

const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        as: 'Categories',
        through: PostCategory,
        foreignKey: 'categoryId'
      });
    models.Category.belongsToMany(models.BlogPost,
      {
        as: 'BlogPost',
        through: PostCategory,
        foreignKey: 'postId'
      });
  };

  return PostCategory;
}

module.exports = createPostCategory;