const sequelize = require('sequelize');

const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'BlogPost',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId'
      });
    models.Category.belongsToMany(models.BlogPost,
      {
        as: 'BlogPost',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      });
  };

  return PostCategory;
}

module.exports = createPostCategory;