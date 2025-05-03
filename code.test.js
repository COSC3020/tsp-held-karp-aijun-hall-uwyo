const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

dm = [[]];
assert(tsp_hk(dm) == 0);

dm = [[0]];
assert(tsp_hk(dm) == 0);

dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
assert(tsp_hk(dm) == 0);

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
assert(tsp_hk(dm) == 3);

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
assert(tsp_hk(dm) == 13);

// All cities same distance
dm = [[0,5,5,5],
      [5,0,5,5],
      [5,5,0,5],
      [5,5,5,0]];
assert(tsp_hk(dm) == 15);

// Disconnected city/node
dm = [[0,1,99999],
      [1,0,1],
      [99999,1,0]];
assert(tsp_hk(dm) == 2);