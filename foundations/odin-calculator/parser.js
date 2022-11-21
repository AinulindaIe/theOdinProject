

class Parser {

    #tokens = [];
    #cursor = 0;

    #currentToken () {
        return this.#tokens[this.#cursor];
    }

    #peak (n = 1) {
        return this.#tokens[this.#cursor + n];
    }

    #consumeToken (tokenType = ""){
        if (this.#currentToken().type !== tokenType){
            console.error(`FAILED TO CONSUME TOKEN: \"${tokenType}\" expected but found \"${this.#currentToken().type}\"`)
        }
        this.#cursor++;
    }


    constructor (tokens = []){
        this.#tokens = tokens;
    }

    parse () {
        return this.#parse_expr();
    }

    #parse_expr() {

    }

    #parse_term () {

    }

    #parse_parenthesis () {
        
    }

}