import type { App } from "vue";
import XButton from "@/components/XButton";
import XInput from "@/components/XInput/XInput.vue";

const components = [XButton, XInput];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.__name as string, component);
    });
  },
};
