console = require("console");
fs = require("fs");
path = require("path");
yuicompressor = require('yuicompressor');
UglifyJS = require("uglify-js");
util = require("util");

var externalSourceFiles = [];
var sourceFiles = [];

TokenLabel = function(labels) { this.value = labels; }
TokenString = function(value) { this.value = value; }
TokenSymbol = function(value) { this.value = value; }
TokenNumber = function(value) { this.value = value; }

ExprAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprDecl = function(name) { this.name = name; }
ExprDeclAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprTokenArray = function(tokens) { this.tokens = tokens; }

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
                console.log("ExprDecl? + " + astToJs(expr));
                if (expr[0].constructor == TokenLabel)
                    ast.push(new ExprDecl(expr[0].value));
                else
                    ast.push(new ExprDeclAssign(expr[0].name, expr[0].symbol, expr[0].value));
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
                    ast.push(new ExprTokenArray(object));
                } else {
                    var scope = [];
                    i = parse(tokens, scope, i+1);
                    ast.push(new ExprTokenArray(scope));
                }
                break;
            case "=":
            case "+=":
            case "-=":
            case "*=":
            case "/=":
            case "%=":
            case "|=":
            case "&=":
            case "^=":
                var rvalue = [];
                var symbol = tokens[i].value;
                i = -1+parse(tokens, rvalue, i+1, true, true);
                var expr = new ExprAssign(ast.pop(), symbol, rvalue);
                ast.push(expr);
                break;
            default:
                ast.push(tokens[i]);
                console.log("Unexpected symbol: '" + tokens[i].value.toString() + "'");
                break;
            }
            break;
        default:
            ast.push(tokens[i]);
        
            console.log("Unexpected token: " + tokens[i].constructor.name + ":" + tokens[i].value.toString());
            break;
        }
        i++;
    }
    return i;
}

astToJs = function(ast, output) {
    output = output || "/*code:*/ ";
    
    exprToJs = function(expr) {
        switch(expr.constructor) {
        case TokenLabel:
            for (var i = 0; i < expr.value.length; i++) {
                if (i != 0) output += ".";
                output += expr.value[i];
            }
            break;
        case TokenNumber:
            output += expr.value.toString();
            break;
        case TokenString:
            output += expr.value;
            break;
        case TokenSymbol:
            output += expr.value;
            break;
        case ExprAssign:
            output += " /*ExprAssign:*/";
            exprToJs(expr.name);
            output += expr.symbol;
            output += astToJs(expr.value)
            output += ";";
            break;
        case ExprDeclAssign:
            console.log("ExprDeclAssign");
            output += " /*ExprAssign:*/ var";
            exprToJs(expr.name);
            output += expr.symbol;
            output += astToJs(expr.value)
            output += ";";
            break;
        case ExprTokenArray:
            output += "{" + expr.tokens + "}";
            break;
        }
    }
    
    console.log("ast");
    for(expr of ast) {
        exprToJs(expr);
    }
        
    return output;
}

loadExternalScript = function(filePath) {
    console.log("Loading(external) " + filePath + "...");
    externalSourceFiles.push(filePath);
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
    sourceFiles.push(filePath);
    
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

var tokens = scan("var a = 5; var c = 3;");// c = 1+2+3.14; d = 'hel\"\\'lo'; e = \"hel'\\\"lo2\"");
//for (var token of tokens)
//    process.stdout.write(token.value.toString() + " ");
console.log();
var ast = [];
parse(tokens, ast);
for(var token of tokens)
    console.log(token);
console.log(ast.length);
for (var expr of ast) {
    console.log(expr);
}
var jsOutput = astToJs(ast);
console.log("Final output:\n" + jsOutput);


loadRecursive("lib", loadScript);
loadRecursive("lib_front_end", loadScript);
loadRecursive("src", loadScript);
loadRecursive("game", loadScript);
loadScript("DigMiners.js");
//loadRecursive("src", loadScript);

//loadRecursive("game", loadScript);

var result = UglifyJS.minify(externalSourceFiles.concat(sourceFiles), {
    mangleProperties: true,
    mangle: {toplevel:true},
    compress: {
        dead_code: true,
    }
});
console.log(result.code);
console.log("done!");

fs.writeFile("html/src.js", result.code, function(err){
    if (err)
        console.log(err);
})

/*yuicompressor.compress(outputSrc, {
    charset: "utf8",
    type: "js",
    //nomunge: false,
    "line-break": 80,
}, function(err, data, extra) {
    console.log(err);
    console.log(data);
    console.log(extra);
});*/

//console.log(outputSrc);
