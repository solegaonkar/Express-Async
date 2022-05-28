import { AsyncHelper } from "./asynchelper.js";

const helloService = () => {
  var helper = new AsyncHelper("Hello");

  helper.log("Synchronous processing");
  var p = new Promise((resolve, reject) => {
    helper.log("Starting the Async process");
    setTimeout(() => {
      helper.log("Async Process Complete");
    }, 5000);
    helper.log("Sync thread exit");
  });
  helper.trigger(p);
  return helper.id;
};

export { helloService };
