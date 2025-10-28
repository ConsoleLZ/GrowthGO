<template>
  <Header>
    <!-- 推荐页面内容 -->
    <div class="recommendations-container">
      <div class="section-header">
        <h2 class="section-title">推荐</h2>
        <p class="section-subtitle">发现精选资源和实用工具</p>
      </div>

      <!-- 分类导航 -->
      <div class="category-nav">
        <button
          v-for="item in Object.keys(tagList)"
          :key="item"
          :class="['category-btn', { active: activeTag === item }]"
          @click="setActiveCategory(item)"
        >
          {{ tagList[item] }}
        </button>
      </div>

      <!-- 推荐内容网格 -->
      <div class="recommendations-grid">
        <div
          class="recommendation-card"
          v-for="item in filteredRecommendations"
          :key="item.url"
          @click="openLink(item.url)"
        >
          <div class="card-header">
            <div class="card-icon">
              <img :src="item.icon" width="20px" alt="" />
            </div>
            <div class="card-title">
              <h3>{{ item.name }}</h3>
              <div style="display: flex;align-items: center;gap: 5px;">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{
                  tag
                }}</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <p class="description" :title="item.description">
              {{ item.description }}
            </p>
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
      activeTag: "all",
      tagList: {
        all: "全部",
        icon: "图标",
        css: "css",
        animation: "动画",
        openSource: "开源项目",
        web: "前端",
        development: "项目开发",
        componentLibrary: "组件库",
        docs: "文档",
        docsTools: "文档工具",
        template: "模板",
        tools: "工具",
        scaffolding: "脚手架",
        software: "软件",
        devise: "UI设计",
        resource: "资源素材",
        depend: "项目管理",
        learn: "学习",
        ai: "智能AI",
        mcp: "MCP",
        hardware: "有关硬件",
        community: "社区",
        cloudPlatform: "云平台",
        safe: "网络安全",
        game: "游戏",
        plugin: "插件",
        blender: "blender插件",
        model: "3D建模",
        vscode: "vscode",
        other: "其它",
      },
      recommendations: [
        {
          name: "Vue.js 官方文档",
          description:
            "渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。渐进式JavaScript框架，易学易用，性能出色，适用于构建用户界面。",
          url: "https://vuejs.org",
          icon: require("@/assets/icon/baidu.svg"),
          tags: ['前端', '开源项目'],
        },
      ],
      displayedCount: 8,
    };
  },
  computed: {
    filteredRecommendations() {
      if (this.activeTag === "all") {
        return this.recommendations.slice(0, this.displayedCount);
      }
      return this.recommendations
        .filter((item) => item === this.activeTag)
        .slice(0, this.displayedCount);
    },
    hasMoreItems() {
      if (this.activeTag === "all") {
        return this.displayedCount < this.recommendations.length;
      }
      const categoryItems = this.recommendations.filter(
        (item) => item === this.activeTag
      );
      return this.displayedCount < categoryItems.length;
    },
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : categoryId;
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    setActiveCategory(tagName) {
      this.activeTag = tagName;
      this.displayedCount = 8;
    },
    loadMore() {
      this.displayedCount += 8;
    },
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.recommendation-card {
  width: 280px;
  background-color: rgba(18, 18, 18, 0.3);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.recommendation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background-color: rgba(18, 18, 18, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.card-icon {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  flex-shrink: 0;
  padding: 8px;
}

.card-title {
  flex: 1;
  min-width: 0;
}

.card-title h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-category {
  font-size: 11px;
  color: #238df7;
  background: rgba(35, 141, 247, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.card-content {
  margin-bottom: 12px;
  flex: 1;
}

.description {
  margin: 0;
  font-size: 13px;
  color: #cccccc;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 10px;
  color: #999;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
}

/* 加载更多 */
.load-more {
  text-align: center;
  font-size: 14px;
  color: #fff;
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
    padding: 40px 15px;
  }

  .recommendations-grid {
    grid-template-columns: 1fr;
    gap: 16px;
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

  .recommendation-card {
    padding: 16px;
    min-height: 140px;
  }

  .card-header {
    gap: 10px;
    margin-bottom: 10px;
  }

  .card-icon {
    width: 36px;
    height: 36px;
  }

  .card-title h3 {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .recommendations-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-card {
    min-height: auto;
  }

  .card-header {
    align-items: center;
  }
}
</style>
