var moment = require('moment');
var resultSet = require('../loans.json').loans;

module.exports = function() {
  resultSet.sort(function(a, b) {
    a = {
      funded: a.fundedAmount,
      time: (new Date(a.expD)) - (new Date(a.listD))
    };

    b = {
      funded: b.fundedAmount,
      time: (new Date(b.expD)) - (new Date(b.listD))
    };

    var aRate = a.funded / a.time;
    var bRate = b.funded / b.time;

    if (aRate === bRate) return 0;

    return (aRate > bRate) ? -1 : 1;
  });

  return resultSet.slice(0, 20);
};
