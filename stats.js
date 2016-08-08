let myLoans = require('./my_loans.json').myNotes;
let sum = 0;

myLoans.forEach(l => {
  sum += l.accruedInterest;
});

console.log('Interest Earned: ', sum);
