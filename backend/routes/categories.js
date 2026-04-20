const express = require('express');
const { Category } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// 获取分类列表
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: require('../models').Article,
          attributes: ['id']
        }
      ]
    });
    // 计算每个分类的文章数量
    const categoriesWithCount = categories.map(category => ({
      ...category.toJSON(),
      count: category.Articles.length
    }));
    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取分类详情
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: '分类不存在' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建分类
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新分类
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: '分类不存在' });
    }
    const { name, description } = req.body;
    await category.update({ name, description });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除分类
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: '分类不存在' });
    }
    await category.destroy();
    res.json({ message: '分类删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
