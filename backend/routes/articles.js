const express = require('express');
const { Article, Tag } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// 获取文章列表
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: require('../models/Category'), as: 'Category' },
        { model: Tag }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取文章详情
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: require('../models/Category'), as: 'Category' },
        { model: Tag }
      ]
    });
    if (!article) {
      return res.status(404).json({ error: '文章不存在' });
    }
    // 增加阅读量
    article.readCount += 1;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建文章
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, categoryId, tagIds } = req.body;
    const article = await Article.create({
      title,
      content,
      excerpt,
      categoryId
    });
    if (tagIds && tagIds.length > 0) {
      await article.addTags(tagIds);
    }
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新文章
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: '文章不存在' });
    }
    const { title, content, excerpt, categoryId, tagIds } = req.body;
    await article.update({
      title,
      content,
      excerpt,
      categoryId
    });
    if (tagIds !== undefined) {
      await article.setTags(tagIds);
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除文章
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: '文章不存在' });
    }
    await article.destroy();
    res.json({ message: '文章删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取分类下的文章
router.get('/category/:categoryId', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { categoryId: req.params.categoryId },
      include: [
        { model: require('../models/Category'), as: 'Category' },
        { model: Tag }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取标签下的文章
router.get('/tag/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId, {
      include: [
        {
          model: Article,
          include: [
            { model: require('../models/Category'), as: 'Category' }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });
    if (!tag) {
      return res.status(404).json({ error: '标签不存在' });
    }
    res.json(tag.Articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
