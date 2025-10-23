const widgets = {};

const modules = {
  leadForm: {
    init: () => {
      console.log("HCPDudaWidgets - leadForm init");
    },
    openChat: () => {
      console.log("HCPDudaWidgets - leadForm openChat");
    },
  },
  customerPortal: {
    init: () => {
      console.log("HCPDudaWidgets - customerPortal init");
    },
  },
};

const leadForm = {
  init: () => {
    console.log("HCPDudaWidgets - leadForm init");
  },
  customClickAction: () => {
    console.log("HCPDudaWidgets - leadForm customClickAction");
  },
};

const customerPortal = {
  init: () => {
    console.log("HCPDudaWidgets - customerPortal init");
  },
};

const initWidget = (id) => {
  const widget = widgets[id];
  const module = modules[widget.name];
  module.init();
  console.log("HCPDudaWidgets - init");

  Array.from(widget.element.querySelectorAll("*")).forEach((c) => {
    Array.from(c.attributes)
      .filter((attr) => attr.name.startsWith("data-hcp-duda-widget-listener-"))
      .forEach((attr) => {
        const lastHyphen = attr.name.lastIndexOf("-");
        const eventType = attr.name.substring(lastHyphen + 1);

        c.addEventListener(eventType, () => {
          const action = attr.value;
          console.log(
            "HCPDudaWidgets - event triggered:",
            eventType,
            "->",
            action
          );
          if (action && typeof module[action] === "function") {
            module[action]();
          }
        });
      });
  });
};

const registerWidget = (name, element, data) => {
  const id = element.id;
  widgets[id] = { name, element, data };
  initWidget(id);
  console.log("HCPDudaWidgets - widget registered with id and name:", id, name);
};

window.HCPDudaWidgets = {
  registerWidget,
};
