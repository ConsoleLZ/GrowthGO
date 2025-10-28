<template>
  <Header>
    <!-- 推荐页面内容 -->
    <div class="recommendations-container">
      <div class="section-header">
        <h2 class="section-title">推荐内容</h2>
        <p class="section-subtitle">发现精选资源和实用工具</p>
      </div>

      <!-- 分类导航 -->
      <div class="category-nav">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-btn', { active: activeCategory === category.id }]"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- 推荐内容网格 -->
      <div class="recommendations-grid">
        <div 
          class="recommendation-card" 
          v-for="item in filteredRecommendations" 
          :key="item.id"
        >
          <div class="card-main-content" @click="openLink(item.url)">
            <div class="card-header">
              <div class="card-icon">
                <img :src="item.icon" width="24px" alt="" />
              </div>
              <div class="card-title">
                <h3>{{ item.title }}</h3>
                <span class="card-category">{{ item.category }}</span>
              </div>
            </div>
            <div class="card-content">
              <p>{{ item.description }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="card-actions">
              <button class="action-btn" @click="openLink(item.url)">访问</button>
              <button class="action-btn secondary" @click="copyLink(item.url)">复制</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more" v-if="hasMoreItems" @click="loadMore">
        加载更多<span>↓</span>
      </div>
    </div>
  </Header>
</template>

<script>
export default {
  metaInfo: {
    title: "推荐",
  },
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { id: 'all', name: '全部' },
        { id: 'tools', name: '工具' },
        { id: 'resources', name: '资源' },
        { id: 'tutorials', name: '教程' },
        { id: 'inspiration', name: '灵感' }
      ],
      recommendations: [
        {
          id: 1,
          title: 'Vue.js 官方文档',
          description: '渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。',
          url: 'https://vuejs.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tools',
          tags: ['前端', '框架', 'JavaScript']
        },
        {
          id: 2,
          title: 'Gridsome 中文指南',
          description: '基于Vue.js的静态站点生成器，为现代网站开发提供极速体验。',
          url: 'https://gridsome.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tutorials',
          tags: ['静态站点', 'Vue', 'Jamstack']
        },
        {
          id: 3,
          title: 'Unsplash 图库',
          description: '高质量免费图片库，拥有数百万张高清照片，可供个人和商业使用。',
          url: 'https://unsplash.com',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'resources',
          tags: ['图片', '免费', '设计']
        },
        {
          id: 4,
          title: 'Vue.js 官方文档',
          description: '渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。',
          url: 'https://vuejs.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tools',
          tags: ['前端', '框架', 'JavaScript']
        },
        {
          id: 5,
          title: 'Gridsome 中文指南',
          description: '基于Vue.js的静态站点生成器，为现代网站开发提供极速体验。',
          url: 'https://gridsome.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tutorials',
          tags: ['静态站点', 'Vue', 'Jamstack']
        },
        {
          id: 6,
          title: 'Unsplash 图库',
          description: '高质量免费图片库，拥有数百万张高清照片，可供个人和商业使用。',
          url: 'https://unsplash.com',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'resources',
          tags: ['图片', '免费', '设计']
        },
        {
          id: 7,
          title: 'Vue.js 官方文档',
          description: '渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。',
          url: 'https://vuejs.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tools',
          tags: ['前端', '框架', 'JavaScript']
        },
        {
          id: 8,
          title: 'Gridsome 中文指南',
          description: '基于Vue.js的静态站点生成器，为现代网站开发提供极速体验。',
          url: 'https://gridsome.org',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'tutorials',
          tags: ['静态站点', 'Vue', 'Jamstack']
        },
        {
          id: 9,
          title: 'Unsplash 图库',
          description: '高质量免费图片库，拥有数百万张高清照片，可供个人和商业使用。',
          url: 'https://unsplash.com',
          icon: require('@/assets/icon/baidu.svg'),
          category: 'resources',
          tags: ['图片', '免费', '设计']
        }
      ],
      displayedCount: 8
    };
  },
  computed: {
    filteredRecommendations() {
      if (this.activeCategory === 'all') {
        return this.recommendations.slice(0, this.displayedCount);
      }
      return this.recommendations
        .filter(item => item.category === this.activeCategory)
        .slice(0, this.displayedCount);
    },
    hasMoreItems() {
      if (this.activeCategory === 'all') {
        return this.displayedCount < this.recommendations.length;
      }
      const categoryItems = this.recommendations.filter(item => item.category === this.activeCategory);
      return this.displayedCount < categoryItems.length;
    }
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
      this.displayedCount = 8; // 重置显示数量
    },
    loadMore() {
      this.displayedCount += 8;
    },
    copyLink(url) {
      navigator.clipboard.writeText(url).then(() => {
        // 可以在这里添加复制成功的提示
        alert('链接已复制到剪贴板');
      }).catch(err => {
        console.error('复制失败:', err);
      });
    }
  },
};
</script>

<style scoped>
/* 推荐页面容器 */
.recommendations-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 15px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
}

.section-subtitle {
  font-size: 16px;
  color: #cccccc;
}

/* 分类导航 */
.category-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #cccccc;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.category-btn.active {
  background: rgba(35, 141, 247, 0.2);
  border-color: #238df7;
  color: #238df7;
}

/* 推荐内容网格 */
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.recommendation-card {
  background-color: rgba(18, 18, 18, 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 220px; /* 确保卡片有最小高度 */
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: rgba(18, 18, 18, 0.4);
}

/* 新增：卡片主要内容区域 */
.card-main-content {
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 16px;
}

.card-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 10px;
  flex-shrink: 0;
}

.card-title {
  flex: 1;
}

.card-title h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.card-category {
  font-size: 12px;
  color: #238df7;
  background: rgba(35, 141, 247, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.card-content {
  flex: 1;
  margin-bottom: 20px;
}

.card-content p {
  margin: 0;
  font-size: 14px;
  color: #cccccc;
  line-height: 1.5;
  /* 限制描述文本行数，避免内容过长 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto; /* 确保footer在底部 */
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-size: 11px;
  color: #999;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #238df7;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #1a7ad9;
}

.action-btn.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #cccccc;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* 加载更多 */
.load-more {
  text-align: center;
  font-size: 16px;
  color: #238df7;
  cursor: pointer;
  padding: 15px;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-top: 20px;
}

.load-more:hover {
  background: rgba(35, 141, 247, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .recommendations-container {
    padding: 40px 15px 40px 15px;
  }
  
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .category-nav {
    gap: 5px;
  }
  
  .category-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .card-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .recommendation-card {
    min-height: auto; /* 在移动端取消最小高度限制 */
  }
}
</style>