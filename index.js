/**
 *
 * Currently only uses LendingClub. Plan to use more investment platforms in future.
 */

var fs = require('fs');

var myLoans       = require('./my_loans.json').myNotes;
var credible      = require('./modules/credible');
var investorHappy = require('./modules/investor-happy');

// The loan algorithm to use
var loans = credible();

// Remove loans already invested in
loans = loans.filter(function(loan) {
	return !myLoans.some(function(loan2) {
		return loan2.loanId === loan.id;
	});
});

loans = loans.map(function(loan) {
	return loan.id;
})

fs.writeFile('results.json', JSON.stringify(loans, null, "\t"), function(err) {
	if (err) {
		console.error(err);
	} else {
		let len = loans.length;
		console.log(`Found ${len} results, saving to results.json...`);
	}
});
