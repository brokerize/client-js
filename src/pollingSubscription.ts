/**
 * Polls the given `fetchData` function at regular intervals, with a delay of `intvlMs` ms between each call.
 * Calls `callback` with the result of `fetchData` on each call. Stops polling when `unsubscribe` is called.
 * When `fetchData` throws an error, it is passed to `callback` and polling stops (!). I.e. once the callback
 * receives an error, it should be reported back.
 *
 * @param fetchData the function to fetch data
 * @param intvlMs the delay between each call to `fetchData`
 * @param callback the function to call with the result of `fetchData`
 * @returns a subscription object to unsubscribe from
 */
export function createPollingSubscription<T>(
  fetchData: () => Promise<T>,
  intvlMs: number,
  callback: (err: Error | undefined, data: T | undefined) => void
) {
  let timeout: NodeJS.Timeout | null = null;
  let done = false;

  function doCallback(err: Error | undefined, data?: T) {
    if (done) {
      /* no more callback calls if subscription is stopped. */
      return;
    }

    try {
      callback(err, data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        "brokerize pollingSubscription: the user callback threw an error unexpectedly: ",
        err
      );
    }

    if (err) {
      /* reporting this error marks the end of this subscription. */
      done = true;
    }
  }

  function fetchAndScheduleNext() {
    if (done) {
      return;
    }

    fetchData().then(
      (data) => {
        doCallback(undefined, data);
        if (!done) {
          timeout = setTimeout(fetchAndScheduleNext, intvlMs);
        }
      },
      (err) => doCallback(err)
    );
  }

  fetchAndScheduleNext();

  return {
    unsubscribe() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      done = true;
    },
  };
}
