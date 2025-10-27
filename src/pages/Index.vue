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

      <!-- From Uiverse.io by satyamchaudharydev -->
      <div class="search">
        <div class="icon">
          <img src="@/assets/icon/baidu.svg" width="20px" alt="">
        </div>
        <input
          class="input"
          placeholder="搜一搜"
          type="text"
        />
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
    <div class="show-more">查看更多<span>→</span></div>

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
  methods: {
    openLink(url) {
      window.open(url, "_blank");
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
  margin-top: 8rem;
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
  border-radius: 12px;
  padding: 20px;
  background-color: rgba(18, 18, 18, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
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
  color: #cccccc;
  line-height: 1.4;
}

/* 友情链接样式 - 修改为普通内容块 */
.friend-links {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
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

.show-more {
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

/* 左右移动动画 */
@keyframes left-right-move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(0);
  }
}

.show-more > span {
  margin-left: 6px;
  display: inline-block;
  animation: left-right-move 1.2s ease-in-out infinite;
}

/* From Uiverse.io by satyamchaudharydev */
/* From uiverse.io by @satyamchaudharydev */
/* removing default style of button */

/* styling of whole input container */
.search {
  --timing: 0.3s;
  --width-of-input: 36rem;
  --height-of-input: 50px;
  --border-height: 2px;
  --input-bg: #000;
  --border-color: #fff;
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
  background: var(--input-bg, #fff);
  margin-bottom: 24px;
}
.search .icon {
  --size: 30px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* styling of Input */
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
/* styling of animated border */
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
/* Hover on Input */
.search:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.search:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.search img {
  margin-top: 3px;
}
</style>
