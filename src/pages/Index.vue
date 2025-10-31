<template>
  <Header>
    <div class="site-info">
      <div
        style="display: flex;align-items: center;gap: 15px;margin-bottom: 20px;"
      >
        <div
          class="avatar"
          :style="'background-image: url(' + $static.metadata.avatar + ')'"
        ></div>
        <div class="title">{{ $static.metadata.title }}</div>
      </div>

      <!-- 搜索框和下拉菜单 -->
      <div class="search-container">
        <div class="search">
          <div class="icon" @click="toggleDropdown">
            <img :src="currentEngine.icon" width="20px" alt="" />
          </div>
          <input
            class="input"
            :placeholder="currentEngine.placeholder"
            type="text"
            @keyup.enter="performSearch"
          />
        </div>
        <!-- 下拉菜单放在搜索容器外部 -->
        <div class="dropdown" v-show="showDropdown">
          <div
            class="dropdown-item"
            v-for="engine in searchEngines"
            :key="engine.name"
            @click="selectEngine(engine)"
          >
            <img :src="engine.icon" width="16px" alt="" />
            <span>{{ engine.name }}</span>
          </div>
        </div>
      </div>
      <div class="sub-title">{{ $static.metadata.subTitle }}</div>
    </div>

    <div class="main-content">
      <div class="quick-access">
        <div class="card-grid">
          <div
            class="nav-card"
            v-for="item in JSON.parse($static.metadata.quickAccess)"
            :key="item.url"
            @click="openLink(item.url)"
          >
            <div class="card-icon">
              <img :src="item.icon" width="36px" alt="" />
            </div>
            <div class="card-content">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="friend-links">
      <a
        :href="item.url"
        target="_blank"
        v-for="(item, index) in JSON.parse($static.metadata.friendLink)"
        :key="index"
        class="friend-link"
        >{{ item.name }}</a
      >
    </div>
  </Header>
</template>

<static-query>
query {
  metadata {
    title,
    subTitle,
    avatar,
    friendLink,
    quickAccess
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: "首页",
  },
  data() {
    return {
      showDropdown: false,
      searchEngines: [
        {
          name: "百度",
          value: "baidu",
          icon: require("@/assets/icon/baidu.svg"),
          placeholder: "用百度搜一搜，按回车键确认",
          searchUrl: "https://www.baidu.com/s?wd=",
        },
        {
          name: "Bing",
          value: "bing",
          icon: require("@/assets/icon/bing.svg"),
          placeholder: "用Bing搜一搜，按回车键确认",
          searchUrl: "https://www.bing.com/search?q=",
        },
      ],
      currentEngine: {},
    };
  },
  mounted() {
    // 尝试从localStorage获取保存的搜索引擎
    this.loadSavedEngine();

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    // 移除事件监听
    document.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
    toggleDropdown(event) {
      // 阻止事件冒泡，防止触发document的点击事件
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    selectEngine(engine) {
      this.currentEngine = engine;
      this.showDropdown = false;

      // 保存选择到localStorage
      this.saveEngine(engine);
    },
    closeDropdown(event) {
      // 如果点击的不是搜索容器区域，则关闭下拉菜单
      if (!event.target.closest(".search-container")) {
        this.showDropdown = false;
      }
    },
    performSearch(event) {
      const query = event.target.value.trim();
      if (query) {
        window.open(
          this.currentEngine.searchUrl + encodeURIComponent(query),
          "_blank"
        );
      }
    },
    // 保存搜索引擎到localStorage
    saveEngine(engine) {
      try {
        localStorage.setItem("preferredSearchEngine", JSON.stringify(engine));
      } catch (e) {
        console.warn("无法保存搜索引擎偏好:", e);
      }
    },
    // 从localStorage加载保存的搜索引擎
    loadSavedEngine() {
      try {
        const savedEngine = localStorage.getItem("preferredSearchEngine");
        if (savedEngine) {
          const parsedEngine = JSON.parse(savedEngine);
          // 确保保存的引擎在可用引擎列表中
          const foundEngine = this.searchEngines.find(
            (engine) => engine.value === parsedEngine.value
          );
          if (foundEngine) {
            this.currentEngine = foundEngine;
            return;
          }
        }
      } catch (e) {
        console.warn("无法加载保存的搜索引擎:", e);
      }

      // 如果没有保存的引擎或加载失败，使用默认引擎
      this.currentEngine = this.searchEngines[0];
    },
  },
};
</script>

<style scoped>
.site-info {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 70px 0 40px 0;
}

.avatar {
  --size: 4rem;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center center;
  background-color: #ffffff;
}

.title {
  font-weight: 700;
  font-size: 28px;
}

.sub-title {
  font-size: 14px;
  text-align: center;
  margin: 0 20px;
}

/* 新增内容样式 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
  margin-top: 4rem;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 20px 0;
  text-align: center;
}

/* 快速访问卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.nav-card {
  /* background: white; */
  border-radius: 10px;
  padding: 20px;
  background-color: #fcfcfc;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #000;
}

.nav-card:hover {
  transform: translateY(-2px);
}

.card-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
}

.card-content p {
  margin: 0;
  font-size: 12px;
  color: #777777;
  line-height: 1.4;
}

/* 友情链接样式 - 修改为普通内容块 */
.friend-links {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.friend-link {
  font-size: 12px;
  color: #cccccc;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 4px;
}

.friend-link:hover {
  color: #238df7;
}

/* 移除原来的footer样式 */
.footer {
  display: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 0 15px 40px 15px;
  }

  .site-info {
    margin: 50px 0 30px 0;
  }

  .friend-link {
    font-size: 11px;
  }
}

/* 搜索容器 */
.search-container {
  position: relative;
  margin-bottom: 24px;
}

.search {
  --timing: 0.3s;
  --width-of-input: 36rem;
  --height-of-input: 50px;
  --border-height: 2px;
  --border-color: #409EFF;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: #ffffff
}

.search .icon {
  --size: 30px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}

.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  color: #fff;
}

.search:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}

.search:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}

.search:focus-within:before {
  transform: scale(1);
}

.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}

input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}

.search img {
  margin-top: 3px;
}

/* 下拉菜单样式 */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item img {
  margin-top: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .search {
    --width-of-input: 90vw;
  }

  .dropdown {
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
