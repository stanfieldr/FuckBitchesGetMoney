const salesPrice    = 40000;
const mortgageRate  = 0.05;
const mortgageYears = 30;
const taxes         = 1000;
const rent          = 850;
const downPayment   = 0.05;
const repairs       = 0.1;
const management    = 0.1;
const vacancy       = 0.1;

///////////////////////////////////////////////////////////////////////////////
const loanAmount     = salesPrice * (1 - downPayment);
const investedAmount = salesPrice * downPayment;

const annualMI       = loanAmount * 0.006;
const upfrontMI      = loanAmount * 0.0175;
const r              = mortgageRate / 12;
const tmpFactor      = Math.pow(1 + r, mortgageYears * 12);
const monthlyPayment = (loanAmount + upfrontMI) * r * tmpFactor / (tmpFactor - 1);

let annualInsurance = 1800;
let annualRent = 12 * rent;

annualRent -= annualRent * management;

let deductRepairs = annualRent * repairs;
let deductVacancy = annualRent * vacancy;
let NOI           = annualRent - annualInsurance - taxes;

NOI -= deductRepairs;
NOI -= deductVacancy;

console.log('Down Payment: ', investedAmount);
console.log('Mortgage:     ', monthlyPayment);
console.log('NOI:          ', NOI);
console.log('CAP:          ', NOI / salesPrice);
console.log('ROI:          ', (NOI - annualMI - 12 * monthlyPayment) / investedAmount);
console.log('Monthly Income:  ', (NOI - annualMI - 12 * monthlyPayment) / 12);
