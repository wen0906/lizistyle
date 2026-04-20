const { Sequelize } = require('sequelize');
require('dotenv').config();

// 从环境变量获取数据库连接URL
const databaseUrl = process.env.DATABASE_URL;

// 创建Sequelize实例
let sequelize;

if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
} else {
  // 如果没有DATABASE_URL，创建一个不连接的实例（用于构建阶段）
  sequelize = new Sequelize('sqlite::memory:', {
    logging: false,
  });
}

// 测试数据库连接（仅在运行时）
const testConnection = async () => {
  if (!databaseUrl) {
    console.log('DATABASE_URL未设置，跳过数据库连接');
    return;
  }
  
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
};

module.exports = sequelize;
module.exports.testConnection = testConnection;