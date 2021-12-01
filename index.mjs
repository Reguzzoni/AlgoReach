import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
(async () => {
  const stdlib = await loadStdlib();
  const startingBalance = stdlib.parseCurrency(100);

  const alice = await stdlib.newTestAccount(startingBalance);
  const bob = await stdlib.newTestAccount(startingBalance);

  console.log("backend : ", backend)
  const ctcAlice = alice.deploy(backend);
  const ctcBob = bob.attach(backend, ctcAlice.getInfo());
  await Promise.all([
	      backend.Alice(stdlib, ctcAlice, {
		            ...stdlib.hasRandom
		    }),
        backend.Bob(stdlib, ctcBob, {
	              ...stdlib.hasRandom
	      }),
  ]);

	console.log('Hello, Alice and Bob!');
})();
