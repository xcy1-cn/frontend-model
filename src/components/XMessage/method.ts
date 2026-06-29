import { createApp } from "vue";
import XMessage from "./XMessage.vue";

type MessageType = "success" | "error" | "warning" | "info";

type MessageOptions = {
  message: string;
  type?: MessageType;
  duration?: number;
};

function showMessage(options: MessageOptions) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const app = createApp(XMessage, {
    message: options.message,
    type: options.type || "info",
  });

  app.mount(container);

  const duration = options.duration ?? 2000;

  setTimeout(() => {
    app.unmount();
    document.body.removeChild(container);
  }, duration);
}

const XMessageMethod = {
  success(message: string, duration?: number) {
    showMessage({
      message,
      type: "success",
      duration,
    });
  },

  error(message: string, duration?: number) {
    showMessage({
      message,
      type: "error",
      duration,
    });
  },

  warning(message: string, duration?: number) {
    showMessage({
      message,
      type: "warning",
      duration,
    });
  },

  info(message: string, duration?: number) {
    showMessage({
      message,
      type: "info",
      duration,
    });
  },
};

export default XMessageMethod;
