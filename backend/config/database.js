const { Sequelize } = require('sequelize');
require('dotenv').config();

// 从环境变量获取数据库连接URL
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/blog_db';

// 创建Sequelize实例
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
};

testConnection();

module.exports = sequelize;
