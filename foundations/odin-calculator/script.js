const { Lexer } = require("./lexer");

const lexer = new Lexer();
const mathExpr = "10 + 5 * ( 1 + 2 )"

const tokens = lexer.tokenize(mathExpr);
console.log(mathExpr)
console.log(tokens);