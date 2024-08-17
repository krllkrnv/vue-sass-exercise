import { createApp } from "vue";
import "./style/style.scss";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

createApp(App).use(store).use(router).mount("#app");
