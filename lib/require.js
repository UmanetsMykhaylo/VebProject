(() => {
  const cache = {};

  function define() {
    if (arguments.length === 2) {
      const dependencies = arguments[0];
      const fn = arguments[1];

      const resultArr = [];

      dependencies.forEach(module => {
        resultArr.push(cache[module]);
      });

      fn(...resultArr);

      return;
    }

    const name = arguments[0];
    const dependencies = arguments[1];
    const fn = arguments[2];

    const resultArr = [];

    for (const module of dependencies) {
      resultArr.push(cache[module]);
    }

    cache[name] = fn(...resultArr);
  }

  window.define = define;
})();