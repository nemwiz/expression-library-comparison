const {VM} = require('vm2');
const vm = new VM();

const { init, formula , ExpressionParser} = require('expressionparser')

const parser = init(formula, (term) => {
  if (term === "MY_VARIABLE") {
    return 42;
  } else {
    throw new Error(`Invalid term: ${term}`);
  }
});

// const arithmeticLanguage = {
//     INFIX_OPS: {
//         'AND': function () {
//             return '==='
//         }
//     }
// }
//
// const result = new ExpressionParser({...formula(), INFIX_OPS: {'AND': function () {return '==='}}}).expressionToThunk('1 AND 1');

const expression = "(10 > 11 OR 5 < 6) AND MY_VARIABLE >= 20";
console.log(parser.expressionToValue(expression))

const parserList = parser.expressionToRpn(expression)
console.log(parserList)


const replacedExpression = parser.rpnToExpression(parserList).replaceAll('OR', '||').replaceAll('AND', '&&').replaceAll('MY_VARIABLE', '42');
console.log('replaced', replacedExpression)
console.log(vm.run(replacedExpression))
// console.log(vm.run('1 < 2 && 2 > 1'))