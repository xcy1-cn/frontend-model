import type { App } from "vue";
import XButton from "@/components/XButton";
import XInput from "@/components/XInput";
import XDialog from "@/components/XDialog";
import {XForm, XFormItem} from "@/components/XForm";
import XMessage from "@/components/XMessage";
import XTable from "@/components/XTable/XTable.vue";
import XPagination from "@/components/XPagination";


const components = [XButton, XInput, XDialog, XForm, XFormItem, XTable, XPagination];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.__name as string, component);
    });
    app.config.globalProperties.$message = XMessage;
  },
};
