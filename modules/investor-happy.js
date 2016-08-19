module.exports = function(loans) {
  // Remove potential off statistics
  loans = loans.filter(function(loan) {
    let percent  = loan.fundedAmount / loan.loanAmount;

    let isClose  = percent >= 0.5 && percent < 1;
    let isStupid = loan.pubRec !== 0 || loan.pubRecBankruptcies !== 0 || loan.mthsSinceLastMajorDerog !== null || loan.totCollAmt > 0 || loan.taxLiens !== 0;

    return isClose && !isStupid;
  });

  // Put loans investors are grabbing like candy at the top
  // to figure out why they are investing in it
  loans.sort(function(a, b) {
    a = a.fundedAmount / ((new Date()) - (new Date(a.listD)));
    b = b.fundedAmount / ((new Date()) - (new Date(b.listD)));

    if (a === b) {
      return 0;
    }

    return (a > b) ? -1 : 1;
  });

  // Only show top 20
  return loans.slice(0, 20);
};
