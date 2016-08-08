const express   = require('express');
const moment    = require('moment');
const {myNotes} = require('./my_loans.json');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

function moneyRound(num) {
  return Math.floor(num * 100) / 100;
}

app.get('/', function(req, res) {
  let notes = myNotes.filter(note => note.loanStatus !== 'Fully Paid');
  notes = notes.map((note) => {
    let ret = {
      id: note.noteId,
      orderId: note.orderId,
      accruedInterest: note.accruedInterest,
      creditTrend: note.creditTrend,
      principle: moneyRound(note.noteAmount - note.principalReceived),
      interestAccumulated: note.interestReceived,
      grade: note.grade,
      intRate: note.interestRate
    };

    if (!note.issueDate) {
      ret.age = "NA";
      ret.ageNumeric = 0;
    } else {
      ret.age = moment(note.issueDate).fromNow(true);
      ret.ageNumeric = moment(note.issueDate).diff(moment(), 'seconds');
    }

    return ret;
  });

  notes.sort((a, b) => {
    if (a.ageNumeric === b.ageNumeric) {
      return 0;
    }

    return a.ageNumeric > b.ageNumeric ? 1 : -1;
  });

  res.render('dash', {notes});
});

app.listen(8000, function() {
  console.log('Listening on port', 8000);
})