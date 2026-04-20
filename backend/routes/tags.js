const express = require('express');
const { Tag } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// 获取标签列表
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: require('../models').Article,
          attributes: ['id']
        }
      ]
    });
    // 计算每个标签的文章数量
    const tagsWithCount = tags.map(tag => ({
      ...tag.toJSON(),
      count: tag.Articles.length
    }));
    res.json(tagsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取标签详情
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: '标签不存在' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建标签
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新标签
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: '标签不存在' });
    }
    const { name } = req.body;
    await tag.update({ name });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除标签
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: '标签不存在' });
    }
    await tag.destroy();
    res.json({ message: '标签删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
