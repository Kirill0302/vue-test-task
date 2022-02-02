import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
createApp(App).use(router).use(Vue3DraggableResizable).mount('#app')
