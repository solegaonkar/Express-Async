import moment from "moment";
import { nanoid } from "nanoid";

class AsyncHelper {
  /**
   * A utility Log function for all the Asynchronous code,
   * Keep it at console.log for now. Can be directed elsewhere lateron
   * But the nanoid should be a part of the log statement.
   * That makes it easy to dig through the logs
   *
   * @param {*} x
   * @returns
   */
  log = (x) => console.log(`${moment()} - ${this.id} - ${x}`);

  promise = new Promise((resolve) => {
    resolve();
  });

  /**
   * This creates the Async helper object along with a nanoid.
   * Also attach a reference note that will be saved in DB.
   * This will be useful for tracking if the container is destroyed
   * while processing a transaction.
   *
   * @param {string} ref
   */
  constructor(ref) {
    this.id = nanoid();
    this.ref = ref;
  }

  /**
   * This starts processing the promise. It adds the DB
   * transaction record and then proceeds
   *
   * All the required data is available within the promise.
   * So don't plan on using this tracking DB record.
   *
   * @param {Promise} promise
   */
  trigger = (promise) => {
    this.promise = promise || this.promise;
    // Add record to a DB
    this.promise.then((x) => this.complete()).catch((e) => this.reportError(e));
  };

  /**
   * This is invoked within the helper, once the promise
   * is fulfilled without error. It clears the DB record.
   */
  complete = () => {
    // Delete the record from DB
    this.log("Complete");
  };

  /**
   * If there is an error processing the transaction, this method is invoked
   * Raise any configured alarm and save the error object in DB
   *
   * @param {Error Object} e
   */
  reportError = (e) => {};
}

export { AsyncHelper };
