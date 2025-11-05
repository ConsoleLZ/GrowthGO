// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import HeaderLayout from "~/layouts/Header.vue";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Tag,
  Row,
  Col,
  Statistic,
  Loading
} from "element-ui";
import '~/assets/css/index.css'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  head.htmlAttrs = { lang: "zh-CN" };
  Vue.component("Header", HeaderLayout);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Tooltip);
  Vue.use(Tag);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Statistic);
  Vue.use(Loading);
}
