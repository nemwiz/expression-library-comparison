const {VM} = require('vm2');
const vm = new VM({
    eval: false,
    wasm: false,
    allowAsync: false
});

const {init, formula} = require('expressionparser')

const parser = init(formula, () => {
});

const condition = "(subject.sensitive_to_light OR subject.sensitive_to_sound) AND subject.age >= 18 AND subject.body_temperature <= 37";

const variablesAndValues = {
    'subject.sensitive_to_light': false,
    'subject.sensitive_to_sound': true,
    'subject.age': 25,
    'subject.body_temperature': 36.7
}

const tokens = parser.tokenize(condition).map(token => {
    if (token === 'AND') {
        return '&&';
    } else if (token === 'OR') {
        return '||';
    } else if (token in variablesAndValues) {
        return variablesAndValues[token];
    } else {
        return token;
    }
});

const expressionToEvaluate = tokens.join(' ');
console.log(expressionToEvaluate);
console.log(vm.run(expressionToEvaluate));

// This throws an error due to sandbox
// vm.run("eval(2 + 2)");