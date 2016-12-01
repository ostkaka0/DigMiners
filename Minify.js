console = require("console");
fs = require("fs");
path = require("path");
yuicompressor = require('yuicompressor');
UglifyJS = require("uglify-js");
util = require("util");
path = require("path");

var externalSourceFiles = [];
var sourceFiles = [];
var inputSrc = "";
var inputSrcExternal = "";

var reservedWords = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double",
                        "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in",
                        "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static",
                        "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield", "await",
                        "true", "false", "null", "undefined"];

var reservedObjects = ["Array", "Date", "eval", "function", "hasOwnProperty", "Infinity", "isFinite", "isNaN", "isPrototypeOf", "length", "Math", "NaN", "name", "Number",
                       "Object", "prototype", "String", "toString", "undefined"];
                       
var reservedWindowWords = ["alert", "all", "anchor", "anchors", "area", "assign", "blur", "button", "checkbox", "clearInterval", "clearTimeout", "clientInformation", "close",
                           "closed", "confirm", "constructor", "crypto", "decodeURI", "decodeURIComponent", "defaultStatus", "document", "element", "elements", "embed",
                           "embeds", "encodeURI", "encodeURIComponent", "escape", "event", "fileUploadfocus", "form", "forms", "frame", "innerHeight", "innerWidth", "layer",
                           "layers", "link", "location", "mimeTypes", "navigate", "navigator", "frames", "frameRate", "hidden", "history", "image", "images",
                           "offscreenBuffering", "open", "opener", "option", "outerHeight", "outerWidth", "packages", "pageXOffset", "pageYOffset", "parent", "parseFloat", 
                           "parseInt", "password", "pkcs11", "plugin", "prompt", "propertyIsEnum", "radio", "reset", "screenX", "screenY", "scroll", "secure", "select", "self",
                           "setInterval", "setTimeout", "status", "submit", "taint", "text", "textarea", "top", "unescape", "untaint", "window"];
                           
var reservedHtmlWords = ["onblur", "onclick", "onerror", "onfocus", "onkeydown", "onkeypress", "onkeyup", "onmouseover onload", "onmouseup", "onmousedown", "onsubmit"]

var reservedOther = ["define", "exports", "module", "call", "global", "require", "error", "Error", "code", "data"];
var reservedObjects = ["array", "Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Int64Array", "Uint64Array", "Float32Array",
                       "Map", "Set", "WeakMap" ,"WeakSet", "SIMD", "Float32x4", "Float64x2", "Int8x16", "Int16x8", "Int32x4", "Uint8x16", "Uint16x8", "Uint32x4", "Bool8x16", "Bool16x8", "Bool32x4", "Bool64x2",
                       "ArrayBuffer", "Buffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflext", "Proxy",
                       "Int1", "Collator", "DateTimeFormat", "NumberFormat", "Iterator", "ParallelArray", "StopIteration", "arguments"];
                       
var reservedMethods = ["__proto__", "constructor", "assign", "create", "defineProperties", "defineProperty", "entries", "freeze", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors",
                       "getOwnPropertyNames", "getOwnPropertySymbols", "getPrototypeof", "is", "isExtensible", "isFrozen", "isSealed", "keys", "preventExtensions", "hasOwnProperty",
                       "isPrototypeof", "toLocalString", "toSource", "toString", "unwatch", "valueof", "watch", "seal", "setPropertyof", "values", "caller", "displayName", "length",
                       "name", "apply", "bind", "call", "isGenerator", "hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive",
                       "toStringTag", "unscopables", "keyFor", "valueof"];
                       
var reservedObjectPrototypes = [["Error", "columnNumber", "filename", "lineNumber", "message", "name", "stack"],
                                ["Number", "EPSILON", "MAX_SAFE_INTERGER", "MAX_VALUE", "MIN_SAFE_INTEGER", "MIN_VALUE", "NEGATIVE_INFINITY", "NaN", "POSITIVE_INFINITY", "isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt", "toExponential", "toFixed", "toLocaleString", "toPrecision"],
                                ["Math", "abs", "acos", "acosh", "asin", "asinh", "atan", "atan2", "atanh", "cbrt", "ceil", "clz32", "cos", "cosh", "exp", "expm1", "floor", "fround", "hypot", "imul", "log", "log10", "log1p", "log2", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc"],
                                ["Date", "UTC", "now", "parse", "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimeZoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "toDateString", "toISOString", "toJSON", "toLocaleDateString", "toLocaleFormat", "toLocaleString", "toLocaleTimeString", "toTimeString", "toUTCString"],
                                ["String", "fromCharCode", "fromCodePoint", "anchor", "charAt", "charCodeAt", "codePointAt", "concat", "endsWith", "includes", "indexOf", "lastIndexOf", "link", "localeCompare", "match", "normalize", "repeat", "replace", "search", "slice", "small", "split", "startsWith", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim", "trimLeft", "raw"],
                                ["RegExp", "input", "lastMatch", "lastParen", "leftContext", "flags", "global", "ignoreCase", "multiline", "sticky", "unicode", "rightContext", "lastIndex", "compile", "exec", "test"],
                                ["Array", "from", "isArray", "of", "concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "toLocaleString", "unshift", "values"],
                                ["TypedArray", "name", "buffer", "byteLength", "byteOffset", "subarray"],
                                ["Map", "size", "clear", "delete", "enties", "keys"],
                                ["ArrayBuffer", "SharedArrayBuffer", "DataView", "isView", "transfer", "byteLength", "getFloat32", "getFloat64", "getInt16", "getInt32", "getInt8", "getUint16", "getUint32", "getUint8", "setFloat32", "setFloat64", "setInt16", "setInt32", "setInt8", "setUint16", "setUint32", "setUint8"],
                                ["Atomics", "add", "and", "compareExchange", "exchange", "isLockFree", "load", "or", "store", "sub", "wait", "wake", "xor"],
                                ["UserAgent", "NavigatorID", "userAgent", "Navigator", "WorkerNavigator", "aboort", "autocomplete", "autocompleteerror", "DOMContentLoaded", "afterprint", "afterscriptexecute", "beforesprint", "beforeunload", "blur", "cancel", "change", "click", "close", "connect", "contextmenu", "error", "focus", "hashchange", "input", "invalid", "languagechange", "load", "loadend", "loadstart", "message", "offline", "online", "open", "pagehide", "pageshow", "popstate", "progress", "readystatechange", "reset", "select", "show", "sort", "storage", "submit", "toggle", "unload", "loadeddata", "loadedmetadata", "canplay", "playing", "play", "canplaythrough", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting", "durationchange"]
];

var reservedGameWords = ["screen", "isServer", "window", "vars", "ip"];

var allReservedKeywords = reservedWords.concat(reservedObjects).concat(reservedWindowWords).concat(reservedHtmlWords).concat(reservedOther).concat(reservedMethods).concat(reservedGameWords);

reservedObjectPrototypes.forEach(function(array) {
    allReservedKeywords = allReservedKeywords.concat(array);
});

TokenLabel = function(labels) { this.value = labels; }
TokenString = function(value) { this.value = value; }
TokenSymbol = function(value) { this.value = value; }
TokenNumber = function(value) { this.value = value; }
TokenRegexp = function(value) { this.value = value; }


ExprAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprDecl = function(name) { this.name = name; }
ExprDeclAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprTokenArray = function(tokens) { this.tokens = tokens; }

isspace = function(c) {
    return c == ' ' || c == '\t' || c == '\r';
}

isalpha = function(c) {
    return (!isspace(c) && !isnum(c) && !issymbol(c) && c != '\'' && c!= '"')//((c.toLowerCase() != c.toUpperCase() || c == '$' || c == '_');//return (c >= 'a' && c <= 'z') || (c >= 'A' || c <= 'Z');
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
           c == '=' || c == '?' || c == ':' || c == ',' || c == ';' || c == '\n' || 
           c == '.' || c == "\\";
}

scan = function(source) {
    var tokens = [];
    var i = 0;
    var lastRegexp = -1;
    while (i < source.length) {
        while(isspace(source.charAt(i))) i++;
        
        // Comments:
        if (source.substring(i, i+2) == "//") {
            do i++; 
            while(source.charAt(i) != '\n' && i < source.length);
        }
        else if(source.substring(i, i+2) == "/*") {
            do i++; 
            while(source.substring(i, i+2) != '*/');
            i += 2;
        }
        
        // Label:
        else if (isalpha(source.charAt(i))) {
            var strLabel = "";
            do {
                strLabel += source.charAt(i);
                i++;
            } while(isalnum(source.charAt(i)));
            tokens.push(new TokenLabel(strLabel));
        }
        
        // String:
        else if (source.charAt(i) == '"') {
            var lastchar = ' ';
            var string = "";
            do {
                string += source.charAt(i);
                lastchar = source.charAt(i);
                if (lastchar == '\\') {
                    i++;
                    string += source.charAt(i);
                }
                i++;
            } while(source.charAt(i) != '"');
            string += source.charAt(i);
            i++;
            tokens.push(new TokenString(string));
        } else if (source.charAt(i) == '\'') {
            var lastchar = ' ';
            var string = "";
            do {
                string += source.charAt(i);
                lastchar = source.charAt(i);
                if (lastchar == '\\') {
                    i++;
                    string += source.charAt(i);
                }
                i++;
            } while(source.charAt(i) != '\'');
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
            } while(isalnum(source.charAt(i)) || source.charAt(i) == '.');
            tokens.push(new TokenNumber(parseFloat(strNumber)));
            
        }
        // Regexp
        /*else if (source.charAt(i) == '/' && lastRegexp != i) {
            lastRegex = i;
            var regexp = "";
            var len = 0;
            do { 
                regexp += source.charAt(i + len);
                console.log("regexp: " + len);
                len++;
                if (source.charAt(i+len) == '\\') len++;
                if (isspace(source.charAt(i+len)) || source.charAt(i+len) == ";") {
                    len = 0;
                    break;
                }
            } while(source.charAt(i + len) != '/')
            if (len > 0) {
                while(isalpha(source.charAt(i + len))) { 
                    regexp += source.charAt(i + len);
                    console.log("regexp:  " + len);
                    len++;
                }
                tokens.push(new TokenRegexp(regexp));
                i += len;
            }
        }*/
        // Symbol:
        else if (issymbol(source.charAt(i)) || isSymbol) {
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

parseExceptions = function(tokens) {
    var exceptions = [];
    var exceptionTable = {};
    
    tokens.forEach(function(token) {
        if (token.constructor != TokenLabel) return;
        if (exceptionTable[token.value] != undefined) return;
        exceptions.push(token.value);
        exceptionTable[token.value] = token.value;
    });
    return exceptions;
}

mangleTokens = function(tokens, except) {
    var names = {};
    var exceptions = {};
    var nameIndex = 0;
    except.forEach(function(name) { exceptions[name] = name; });
    
    lastToken = null;
    
/*    for (var i = 0; i < tokens.length; i++) {
        var failure = false;
        var tokenArray = [];
        var token = tokens[i];
        if (token.constructor == TokenLabel) {
            if (!token.value.length || token.value.length < 3) continue;
            
            tokenArray.push(token);
            lastToken = token;
            
            for (i = i+2; i < tokens.length && !failure; i+=2) {
                if (tokens[i-1].value != ".") { i-=2; break;} 
                if (tokens[i].constructor != TokenLabel) failure = true;
                if (tokens[i].value == "prototype") continue;
                if (exceptions[tokens[i].value] != undefined) failure = true;
                if (failure) { i--; break; }
                tokenArray.push(tokens[i]);
                lastToken = tokens[i];
            }
            //console.log(tokens[i]);
            if (!failure && tokens[i].value == "=" && exceptions[lastToken] == undefined && names[lastToken] == undefined) {
                var name = "_" + nameIndex.toString(36);
                process.stdout.write(lastToken.value + " -> " + name + "  \t");
                names[lastToken.value] = name;
                nameIndex++;
            }
        }
    }*/
    
    var lastToken = null;
    for (var i = 0; i < tokens.length; i++) {
        var failure = false;
        var token = tokens[i];
        if (token.constructor == TokenLabel) {
            lastToken = null;
            if (exceptions[token.value] != undefined) continue;
            if (names[lastToken] != undefined) continue;
            lastToken = token;
            //console.log(tokens[i]);
            if (!failure && tokens[i].value == "=" && exceptions[lastToken] == undefined && names[lastToken] == undefined) {
                
            }
        } else if ((token.value == "=" || token.value == ":") && lastToken != null) {
            var name = "_" + nameIndex.toString(36);
            process.stdout.write(lastToken.value + " -> " + name + "  \t");
            names[lastToken.value] = name;
            nameIndex++;
            lastToken = null;
        } else {
            lastToken = null;
        }
    }
    console.log("!!");
    
    tokens.forEach(function(token) {
        //if (token.value == "delims") console.log("delims");
        if (token.constructor != TokenLabel) return;
        if (exceptions[token.value] != undefined) return;
        if (names[token.value] != undefined) {
            token.value = names[token.value];
        }
    });
}

tokensToString = function(tokens) {
    if (tokens.length == 0) return "";
    var str = tokens[0].value;
    var lastToken = tokens[0];
    
    for(var i = 1; i < tokens.length; i++) {
        var token = tokens[i];
        if (token.value == "{" || token.value == "}")
            str += " " + token.value + " ";
        else if (token.constructor == TokenSymbol || lastToken.constructor == TokenSymbol)
            str += token.value;
        else
            str += " " + token.value;
        lastToken = token;
    }
    
    return str;
}

loadExternalScript = function(filePath) {
    console.log("Loading(external) " + filePath + "...");
    externalSourceFiles.push(filePath);
    inputSrcExternal += fs.readFileSync(filePath) + "\n";
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
    inputSrc += fs.readFileSync(filePath) + "\n";
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

copyFile = function (src, dest) {
    dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}

copyRecursive = function(dir, dest) {
    
}

loadExternalScriptsRecursive = loadRecursive.bind(null, loadExternalScript);
loadScriptRecursive = loadRecursive.bind(null, loadScript);


//loadScript("lib_front_end/apixi.js");

loadRecursive("lib", loadExternalScript);
loadRecursive("lib_front_end", loadExternalScript);
loadRecursive("engine", loadScript);
loadRecursive("game", loadScript);
loadScript("DigMiners.js");
//loadRecursive("src", loadScript);

//loadRecursive("game", loadScript);

console.log("Mangling names... (1/3)");
var tokensExternal = scan(inputSrcExternal);
var tokens = scan(inputSrc);
console.log("Mangling names... (2/3)");
var reservedKeywords = parseExceptions(tokensExternal).concat(allReservedKeywords);
mangleTokens(tokens, reservedKeywords);
console.log("Mangling names... (3/3)");
var output = inputSrcExternal + tokensToString(tokens);
//console.log(output);

console.log("Minifying...");
var result = UglifyJS.minify(output, {
    fromString: true,
    mangleProperties: true,
    mangle: true
});

console.log("Copying...");

copyFile("html_index.php", "html/index.php");
copyFile("style.css", "html/style.css");
copyRecursive("data/", "html/data");

fs.writeFile("html/src.js", result.code, function(err){
    if (err)
        console.log(err);
})


console.log("done!");



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
