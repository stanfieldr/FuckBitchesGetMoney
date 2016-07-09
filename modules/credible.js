module.exports = function(loans) {
  return loans.filter(function(loan) {
    var year = loan.empLength >= 1;
  	var type = loan.purpose == "debt_consolidation";
  	var notDirty = loan.accNowDelinq === 0 && loan.delinq2Yrs === 0 && loan.mthsSinceLastMajorDerog === null &&
                   loan.pubRec === 0 && loan.pubRecBankruptcies === 0 && loan.mthsSinceLastDelinq === null;
  	var credit = loan.ficoRangeLow >= 650;
  	var lessOpenAccounts = loan.totalAcc > loan.openAcc;

  	var reasonableAmount = (loan.totCurBal <= loan.loanAmount + 5000) || (loan.totCurBal > loan.loanAmount);
  	var intRate = loan.intRate >= 9;

  	return year && intRate && type && notDirty && credit && lessOpenAccounts && reasonableAmount;
  });
};
