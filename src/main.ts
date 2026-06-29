import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import XUI from "./plugins/x-ui";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(XUI);

app.mount("#app");
