console = require("console");
fs = require("fs");
path = require("path");

var outputSrc = "";

TokenLabel = function(labels) { this.value = labels; }
TokenString = function(value) { this.value = value; }
TokenSymbol = function(value) { this.value = value; }
TokenNumber = function(value) { this.value = value; }

ExprAssign = function(a, b) { this.a = a; this.b = b; }
ExprDecl = function(a) { this.a = a; }
ExprDeclAssign = function(a, b) { this.a = a; this.b = b; }
ExprScope = function(a) { this.a = a; }
ExprObject = function(array) { this.a = array; }

isspace = function(c) {
    return c == ' ' || c == '\t' || c == '\r';
}

isalpha = function(c) {
    return (c.toLowerCase() != c.toUpperCase() || c == '$' || c == '_');//return (c >= 'a' && c <= 'z') || (c >= 'A' || c <= 'Z');
}

isnum = function(c) {
    return c >= '0' && c <= '9';
}

isalnum = function(char) {
    return isalpha(char) || isnum(char);
}

issymbol = function(c) {
    return c == '(' || c == ')' || c == '[' || c == ']' || c == '{' || c == '}' ||
           c == '+' || c == '-' || c == '!' || c == '~' || c == '*' || c == '/' ||
           c == '%' || c == '<' || c == '>' || c == '&' || c == '^' || c == '|' ||
           c == '=' || c == '?' || c == ':' || c == ',' || c == ';' || c == '\n';
}

scan = function(source) {
    var tokens = [];
    var i = 0;
    while (i < source.length) {
        while(isspace(source.charAt(i))) i++;
        
        // Comments:
        if (source.substring(i, i+2) == "//") {
            do i++; 
            while(source.charAt(i) != '\n');
        }
        else if(source.substring(i, i+2) == "/*") {
            do i++; 
            while(source.substring(i, i+2) != '*/');
        }
        
        // Label:
        else if (isalpha(source.charAt(i))) {
            var labels = [];
            do {
                var strLabel = "";
                do {
                    strLabel += source.charAt(i);
                    i++;
                } while(isalnum(source.charAt(i)));
                i++;
                labels.push(strLabel);
            } while(source.charAt(i-1) == '.')
            i--;
            tokens.push(new TokenLabel(labels));
        }
        
        // String:
        else if (source.charAt(i) == '"') {
            var lastchar = ' ';
            var string = "";
            do {
                string += source.charAt(i);
                lastchar = source.charAt(i);
                i++;
            } while(source.charAt(i) != '"' || lastchar == '\\');
            string += source.charAt(i);
            i++;
            tokens.push(new TokenString(string));
        } else if (source.charAt(i) == '\'') {
            var lastchar = ' ';
            var string = "";
            do {
                string += source.charAt(i);
                lastchar = source.charAt(i);
                i++;
            } while(source.charAt(i) != '\'' || lastchar == '\\');
            string += source.charAt(i);
            i++;
            tokens.push(new TokenString(string));
        }
        
        // Number:
        else if (isnum(source.charAt(i)) || (source.charAt(i) == '.' && isnum(source[i+1]))) {
            strNumber = "";
            do {
                strNumber += source.charAt(i);
                i++;
            } while(isnum(source.charAt(i)) || source.charAt(i) == '.');
            tokens.push(new TokenNumber(parseFloat(strNumber)));
        }
        
        // Symbol:
        else if (issymbol(source.charAt(i))) {
            var char4 = source.substring(i, i+4);
            var char3 = char4.substring(0, 3);
            var char2 = char3.substring(0, 2);
            var char = source.charAt(i);
            
            if (char4 == ">>>=") {
                i += 4;
                tokens.push(new TokenSymbol(char4));
            } else if (char3 == ">>>" || char3 == "===" || char3 == "!==" || char3 == "**=" || char3 == "<<=" || char3 == ">>=" || char3 == "...") {
                i += 3;
                tokens.push(new TokenSymbol(char3));
            } else if (char2 == "++" || char2 == "--" || char2 == "**" || char2 == "<<" || char2 == ">>" || char2 == "<=" || char2 == ">=" ||
                       char2 == "==" || char2 == "!=" || char2 == "&&" || char2 == "||" || char2 == "+=" || char2 == "-=" || char2 == "*=" || 
                       char2 == "/=" || char2 == "%=" || char2 == "&=" || char2 == "^=" || char2 == "|=") {
               i += 2;
               tokens.push(new TokenSymbol(char2));
            }
            else {
               i++;
               tokens.push(new TokenSymbol(char));
            }
        }
        else {
            console.log("Unepxected charater: " + source.charAt(i));
            i++;
        }
        
        
    }
    return tokens;
}

/* tokens - Array of Token___
 * ast - Output array of Expr___
 * i(optional) - index
 * singleExpr(optional) - if true, return at ';'
 * singleLine(optional) - if true, return at '\n'
 * return value - index
 */
parse = function(tokens, ast, i, singleExpr, isRvalue) {
    var i = i || 0;
    while(i < tokens.length) {
        switch(tokens[i].constructor) {
        case TokenLabel:
            if (tokens[i].value == "var"){
                var expr = [];
                i = -1+parse(tokens, expr, i+1, true, true);
                console.log(expr);
                if (expr[0].constructor == TokenLabel)
                    ast.push(new ExprDecl(expr[0].value));
                else
                    ast.push(new ExprDeclAssign(expr[0].a, expr[0].b));
            }
            else
                ast.push(tokens[i]);
            break;
        case TokenString:
            ast.push(tokens[i]);
            break;
        case TokenNumber:
            ast.push(tokens[i]);
            break;
        case TokenSymbol:
            switch(tokens[i].value) {
            case ")":
            case "]":
            case "}":
                return i;
            case ";":
                console.log(";");
                if (singleExpr) return i;
                break;
            case "\n":
                if (isRvalue) return i;
                break;
            case "{":
                if (isRvalue) {
                    var object = [];
                    i++;
                    while(tokens[i] != "}")
                        object.push(tokens[i++]);
                    i++;
                    ast.push(ExprObject(object));
                } else {
                    var scope = [];
                    i = parse(tokens, scope, i+1);
                    ast.push(new ExprScope(scope));
                }
                break;
            case "=":
                var rvalue = [];
                i = -1+parse(tokens, rvalue, i+1, true, true);
                var expr = new ExprAssign(ast.pop().value, rvalue);
                ast.push(expr);
                break;
            default:
                console.log("Unexpected symbol: '" + tokens[i].value.toString() + "'");
                break;
            }
            break;
        default:
            console.log("Unexpected token: " + tokens[i].constructor.name + ":" + tokens[i].value.toString());
            break;
        }
        i++;
    }
    return i;
}

astToJs = function(ast) {
    var output = "";
    
    exprToJs = function(expr) {
        switch(expr.constructor) {
        case TokenLabel:
            for (label of expr.value)
                output += label + ".";
            output.substring(output.length - 1);
            break;
        case TokenNumber:
            output += expr.value.toString();
            break;
        case TokenString:
            output += "\"" + expr.value + "\"";
            break;
        case TokenSymbol:
            output += expr.value;
            break;
        }
    }
    
    for(expr of ast)
        exprToJs(expr);
}

loadExternalScript = function(filePath) {
    console.log("Loading(external) " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    outputSrc = outputSrc.concat(content);
}

loadRecursive = function(dir, load) {
    var files = fs.readdirSync(dir);
    for(var i = 0; i < files.length; ++i) {
        var filePath = dir + "/" + files[i];
        var stat = fs.statSync(filePath);

        if(stat.isDirectory())
            loadRecursive(filePath, load);
        else if(stat.isFile() && path.extname(filePath) == ".js")
            load(filePath)
    }
}

loadScript = function(filePath) {
    console.log("Loading " + filePath + "...");
    var content = fs.readFileSync(filePath, "utf8");
    var tokens = scan(content);
    //for (var token of tokens) {
    //    process.stdout.write(token.value.toString() + " ");
    //var ast = parse(tokens);
    //for (var expr of ast)
    //    console.log(expr);
    /*var names = getGlobalNames(ast);
    mangle(names);
    replaceNames(ast, names);
    outputSrc = astToString(ast);
    outputSrc = outputSrc.concat(content);*/
}

loadExternalScriptsRecursive = loadRecursive.bind(null, loadExternalScript);
loadScriptRecursive = loadRecursive.bind(null, loadScript);

var tokens = scan("var a = 1; var b = a; { var c = b; var d = 4; }");
//for (var token of tokens)
//    process.stdout.write(token.value.toString() + " ");
console.log();
var ast = [];
parse(tokens, ast);
console.log(ast.length);
for (var expr of ast) {
    console.log(expr);
}

//loadRecursive("lib", loadExternalScript);
//loadRecursive("src", loadScript);
//loadRecursive("game", loadScript);

//console.log(outputSrc);
