// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import HeaderLayout from "~/layouts/Header.vue";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  head.htmlAttrs = { lang: "zh-CN" };
  Vue.component("Header", HeaderLayout);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
}
