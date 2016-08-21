module.exports = function(loans) {
  loans = loans.filter(function(loan) {
    var year = loan.empLength >= 1;
    var type = loan.purpose == "debt_consolidation" || loan.purpose === "home_improvement";
    var notDirty = loan.accNowDelinq === 0 && loan.delinq2Yrs === 0 && loan.mthsSinceLastMajorDerog === null &&
                   loan.pubRec === 0 && loan.pubRecBankruptcies === 0 && loan.mthsSinceLastDelinq === null;
    var credit = loan.ficoRangeLow >= 650;
    var lessOpenAccounts = loan.totalAcc > loan.openAcc;

    var reasonableAmount = (loan.totCurBal <= loan.loanAmount + 5000) || (loan.totCurBal > loan.loanAmount);
    var intRate = loan.intRate >= 12 && (loan.purpose !== "home_improvement"
               || (loan.purpose === "home_improvement" && loan.intRate <= 14));

    var noCollections = loan.totCollAmt === 0 && loan.taxLiens === 0;

    return year && intRate && type && notDirty && credit && lessOpenAccounts && reasonableAmount && noCollections;
  });

  // Bitches love money
  loans = loans.sort((a, b) => {
    a = Number(a.intRate);
    b = Number(b.intRate);

    if (a === b) return 0;
    return (a > b) ? -1 : 1;
  });

  return loans;
};
