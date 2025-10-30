const tags = {
  frontEnd: "前端",
  openSource: "开源项目",
  community: "社区",
};

export const mainData = [
  {
    name: "JavaScript Rising Stars",
    ico: "https://risingstars.js.org/favicon.ico",
    url: "https://risingstars.js.org/",
    description: "了解每年JS生态系统的趋势",
    tags: [tags.frontEnd],
    recommend: true
  },
  {
    name: "Can I use",
    ico: "https://caniuse.com/img/favicon-128.png",
    url: "https://caniuse.com/",
    description: "前端兼容性问题查询",
    tags: [tags.frontEnd],
  },
  {
    name: "lucaong / minisearch",
    ico: false,
    url: "https://github.com/lucaong/minisearch",
    description: "小巧而强大的 JavaScript 全文搜索引擎，适用于浏览器和 Node",
    tags: [tags.openSource],
  },
  {
    name: "稀土掘金",
    ico:
      "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/static/favicons/favicon-32x32.png",
    url: "https://juejin.cn/",
    description: "一个很好的开发者社区，可以看看大佬的各种文章",
    tags: [tags.community],
    recommend: true
  },
  {
    name: "思否",
    ico: "https://static.segmentfault.com/main_site_next/dc3490f3/favicon.ico",
    url: "https://segmentfault.com/",
    description: "技术分享",
    tags: [tags.community],
    recommend: true
  },
];
