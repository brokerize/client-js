/**
 * Calls the provided function `fn` at regular intervals, with a delay of `intvlMs` ms between each call.
 * Stops calling `fn` when `stop` is called or when `fn` throws an error. Note that that might lead to
 * an unhandled promise rejection, so it's recommended to handle the error in `fn` itself.
 */
export function spacedIntvl(fn: () => Promise<void>, intvlMs: number) {
  let stopped = false;
  let tout: NodeJS.Timeout | null = null;
  let currentPromise: Promise<any> | null = null;

  const scheduleNext = () => {
    console.log("scheduleNext");

    if (stopped) {
      return;
    }

    tout && clearTimeout(tout);
    tout = setTimeout(() => {
      currentPromise = fn().then(
        () => scheduleNext(),
        (err) => {
          stopped = true;
          tout && clearTimeout(tout);
          throw err;
        }
      );
    }, intvlMs);
  };

  scheduleNext();

  return {
    async stop() {
      stopped = true;
      tout && clearTimeout(tout);
      if (currentPromise) {
        /* one job might be in progress, wait for it to end*/
        await currentPromise;
      }
    },
  };
}
