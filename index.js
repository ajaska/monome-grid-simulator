try {
 require('./lib');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  console.error('./lib not found, have you run `yarn build`?')
}
