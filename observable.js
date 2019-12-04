const {of, from, zip, forkJoin, concat} = require('rxjs');
const {flatMap, tap, groupBy, mergeMap, toArray, reduce, buffer, combineAll, map, delay} = require('rxjs/operators');


// const getSource = (source) => {
//   if (source === 1) {
//     return of([{login: 'toto', count: 1}, {login: 'tata', count: 50}]);
//   }
//   return of([{login: 'toto', count: 10}]);
// };

// const obs = forkJoin(getSource(1), getSource(2))
//
// .pipe(
//   flatMap(sources => {
//     const users = {};
//     sources.map(repo => repo.map(user => {
//       if (!users[user.login]) {
//         users[user.login] = {
//           login: user.login,
//           contributions: 0,
//         };
//       }
//
//       users[user.login].contributions += user.count;
//       return user;
//     }));
//     return of(users);
//   }),
// );

const obs = concat(
  of(1).pipe(delay(3000)),
  of(2).pipe(delay(500)),
  of(3).pipe(delay(1500)),
);

obs
.subscribe(ev => {
  console.log('get ev');
  console.log(ev);
});