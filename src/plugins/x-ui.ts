import type { App } from "vue";
import XButton from "@/components/XButton";
import XInput from "@/components/XInput";
import XDialog from "@/components/XDialog";


const components = [XButton, XInput, XDialog];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.__name as string, component);
    });
  },
};
