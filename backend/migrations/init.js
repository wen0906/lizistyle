const sequelize = require('../config/database');
const { Category, Tag, Article, User } = require('../models');
const bcrypt = require('bcrypt');

// 运行数据库迁移
const runMigrations = async () => {
  try {
    console.log('开始数据库迁移...');
    
    // 自动创建表结构
    await sequelize.sync({ force: true });
    console.log('表结构创建成功');
    
    // 插入初始数据
    await seedData();
    console.log('初始数据插入成功');
    
  } catch (error) {
    console.error('数据库迁移失败:', error);
  } finally {
    // 关闭数据库连接
    await sequelize.close();
  }
};

// 插入初始数据
const seedData = async () => {
  // 创建用户
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.bulkCreate([
    {
      name: '管理员',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    },
    {
      name: '测试用户',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user'
    }
  ]);
  
  // 创建分类
  const categories = await Category.bulkCreate([
    { name: '前端技术', description: '前端开发相关技术文章' },
    { name: '个人成长', description: '个人成长和学习方法' },
    { name: '生活感悟', description: '生活中的感悟和思考' }
  ]);
  
  // 创建标签
  const tags = await Tag.bulkCreate([
    { name: 'Vue' },
    { name: 'TypeScript' },
    { name: '性能优化' },
    { name: '学习方法' },
    { name: '前端' },
    { name: 'React' },
    { name: '趋势' }
  ]);
  
  // 创建文章
  const articles = await Article.bulkCreate([
    {
      title: 'Vue 3 组合式 API 入门指南',
      content: `<h2>什么是组合式 API？</h2>
<p>组合式 API 是 Vue 3 引入的新特性，它允许我们使用函数式的方式组织组件逻辑，而不是通过选项式 API 的方式。</p>
<h2>为什么使用组合式 API？</h2>
<ul>
  <li>更好的代码组织</li>
  <li>更灵活的逻辑复用</li>
  <li>更好的类型推导</li>
  <li>更小的打包体积</li>
</ul>
<h2>基本使用</h2>
<pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件挂载')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
<h2>组合式 API 的优势</h2>
<p>组合式 API 最大的优势是可以将相关的逻辑组织在一起，而不是分散在不同的选项中。这使得代码更易于理解和维护，特别是对于大型组件。</p>`,
      excerpt: 'Vue 3 的组合式 API 为我们提供了一种更灵活、更可维护的代码组织方式。本文将带你快速入门组合式 API 的核心概念和使用方法。',
      categoryId: categories[0].id
    },
    {
      title: '如何优化前端性能',
      content: `<h2>前端性能优化的重要性</h2>
<p>在当今快节奏的互联网环境中，网站性能直接影响用户体验和转化率。研究表明，页面加载时间每增加1秒，转化率可能下降7%。</p>
<h2>性能优化策略</h2>
<h3>1. 减少 HTTP 请求</h3>
<ul>
  <li>合并 CSS 和 JavaScript 文件</li>
  <li>使用 CSS sprites</li>
  <li>使用字体图标替代图片图标</li>
</ul>
<h3>2. 优化资源加载</h3>
<ul>
  <li>启用浏览器缓存</li>
  <li>使用 CDN</li>
  <li>压缩文件</li>
  <li>使用懒加载</li>
</ul>
<h3>3. 代码优化</h3>
<ul>
  <li>减少 DOM 操作</li>
  <li>使用事件委托</li>
  <li>优化 JavaScript 执行</li>
  <li>使用 Web Workers 处理复杂计算</li>
</ul>`,
      excerpt: '前端性能优化是一个永恒的话题。本文将从多个角度探讨如何提升前端应用的性能，包括代码分割、懒加载、缓存策略等。',
      categoryId: categories[0].id
    },
    {
      title: 'TypeScript 高级类型技巧',
      content: `<h2>TypeScript 高级类型</h2>
<p>TypeScript 提供了强大的类型系统，除了基本类型外，还有许多高级类型特性可以帮助我们写出更安全、更可维护的代码。</p>
<h2>高级类型技巧</h2>
<h3>1. 交叉类型 (Intersection Types)</h3>
<pre><code>type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type EmployeePerson = Person & Employee;</code></pre>
<h3>2. 联合类型 (Union Types)</h3>
<pre><code>type Result = string | number | boolean;</code></pre>
<h3>3. 类型守卫 (Type Guards)</h3>
<pre><code>function isString(value: unknown): value is string {
  return typeof value === 'string';
}</code></pre>
<h3>4. 泛型 (Generics)</h3>
<pre><code>function identity<T>(value: T): T {
  return value;
}</code></pre>
<h3>5. 条件类型 (Conditional Types)</h3>
<pre><code>type NonNullable<T> = T extends null | undefined ? never : T;</code></pre>`,
      excerpt: 'TypeScript 提供了强大的类型系统，本文将介绍一些高级类型技巧，帮助你写出更安全、更可维护的代码。',
      categoryId: categories[0].id
    },
    {
      title: '个人成长：如何持续学习',
      content: `<h2>持续学习的重要性</h2>
<p>在快速发展的技术领域，持续学习是保持竞争力的关键。技术更新换代速度之快，要求我们必须不断学习新知识、新技能。</p>
<h2>有效的学习方法</h2>
<h3>1. 制定学习计划</h3>
<ul>
  <li>设定明确的学习目标</li>
  <li>制定合理的学习时间表</li>
  <li>分解大目标为小任务</li>
</ul>
<h3>2. 实践出真知</h3>
<ul>
  <li>动手做项目</li>
  <li>解决实际问题</li>
  <li>参与开源项目</li>
</ul>
<h3>3. 建立学习社区</h3>
<ul>
  <li>加入技术社区</li>
  <li>参加技术会议</li>
  <li>与同行交流</li>
</ul>
<h3>4. 保持好奇心</h3>
<ul>
  <li>探索新技术</li>
  <li>阅读技术博客</li>
  <li>尝试不同的解决方案</li>
</ul>`,
      excerpt: '在快速发展的技术领域，持续学习是保持竞争力的关键。本文分享一些个人学习方法和习惯，希望能对你有所帮助。',
      categoryId: categories[1].id
    }
  ]);
  
  // 关联文章和标签
  await articles[0].addTags([tags[0], tags[4]]); // Vue 3 文章关联 Vue 和 前端标签
  await articles[1].addTags([tags[2], tags[4]]); // 性能优化文章关联 性能优化和 前端标签
  await articles[2].addTags([tags[1], tags[4]]); // TypeScript 文章关联 TypeScript 和 前端标签
  await articles[3].addTags([tags[3]]); // 个人成长文章关联 学习方法标签
};

// 运行迁移
if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
