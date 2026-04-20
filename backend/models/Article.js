const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const Tag = require('./Tag');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  readCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'articles'
});

// 建立关联关系
Article.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Article, { foreignKey: 'categoryId' });

// 多对多关系：文章和标签
const ArticleTag = sequelize.define('ArticleTag', {
  articleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Article,
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'article_tags'
});

Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: 'articleId' });
Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: 'tagId' });

module.exports = {
  Article,
  ArticleTag
};
