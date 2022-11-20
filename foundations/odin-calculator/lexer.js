const TOKEN_TYPES = {
    NUMBER : "NUMBER",
    OPERAND_PRIORI_ONE : "OPERAND_PRIORI_ONE",
    OPERAND_PRIORI_TWO : "OPERAND_PRIORI_TWO",
    OPEN_PARENTHESIS : "OPEN_PARENTHESIS",
    CLOSE_PARENTHESIS : "CLOSE_PARENTHESIS",
    EOF : "EOF"
}

class Lexer {
    
    #stream = "";
    #cursor = 0;

    constructor () {};

    #currentChar (){
        return this.#stream[this.#cursor];
    };

    #eatWhiteSpaces (){
        do {
            this.#cursor++;
        }while (this.#cursor < this.#stream.length && this.#currentChar === ' ');
        this.#cursor--;
    };

    tokenize (input = ""){
        this.#stream = input;
        this.#cursor = 0

        let tokens = []

        while (this.#cursor < this.#stream.length){
            switch (this.#currentChar()){
                case '\n':
                    tokens.push({type : TOKEN_TYPES.EOF});
                    break;
                case ' ':
                    this.#eatWhiteSpaces();
                    break;
                case '(':
                    tokens.push({type : TOKEN_TYPES.OPEN_PARENTHESIS, value : '('});
                    break;
                case ')':
                    tokens.push({type : TOKEN_TYPES.CLOSE_PARENTHESIS, value : ')'});
                    break;
                case '*':
                    tokens.push({type: TOKEN_TYPES.OPERAND_PRIORI_ONE, value : '*'});
                    break;
                case '/':
                    tokens.push({type: TOKEN_TYPES.OPERAND_PRIORI_ONE, value : '/'});
                    break;
                case '+':
                    tokens.push({type : TOKEN_TYPES.OPERAND_PRIORI_TWO, value : '+'});
                    break;
                case '-':
                    tokens.push({type : TOKEN_TYPES.OPERAND_PRIORI_TWO, value : '-'});
                    break;
                default:
                    if (isNumeric(this.#currentChar())) {
                        let numberStr = ""
                        // 10+1
                        do {
                            numberStr += this.#currentChar();
                            this.#cursor++;
                        }while (this.#cursor < this.#stream.length && isNumeric(this.#currentChar()));

                        tokens.push({type : TOKEN_TYPES.NUMBER, value : parseInt(numberStr)})
                        this.#cursor--;
                    }else {
                        console.error(`FAILED TO LEX CHAR AT: ${this.#cursor}`)
                    }
            }
            this.#cursor++;
        }

        tokens.push({type : TOKEN_TYPES.EOF, value : 'EOF'});
        return tokens;
    }
}

function isNumeric (char = '') {
    return (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57);
}

module.exports = {
    Lexer,
    TOKEN_TYPES
}