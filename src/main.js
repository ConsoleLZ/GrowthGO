// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import HeaderLayout from '~/layouts/Header.vue'
import VueMarqueeSlider from 'vue-marquee-slider';

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Header', HeaderLayout)
  Vue.use(VueMarqueeSlider)
}
