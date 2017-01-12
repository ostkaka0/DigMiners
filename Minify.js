var console = require("console");
var fs = require("fs");
var path = require("path");
var yuicompressor = require('yuicompressor');
var UglifyJS = require("uglify-js");
var util = require("util");
var path = require("path");
var commander = require("commander");
var copydir = require('copy-dir');

var outputPath = "./html/";
var loadedFiles = {};
var externalSourceFiles = [];
var sourceFiles = [];
var inputSrc = "";
var inputSrcExternal = "";

commander.version('0.0.1')
    .usage("[options]")
    .option("-o, --output <s>", "Output directory")
    .option("-d, --debug", "Debug mode. Mangling will only add underline to names, no minification")
    .parse(process.argv)

if (commander.output) 
    outputPath = commander.output + "/";
    
if (commander.debug)
    console.log("Debug mode enabled");
    
console.log("Output directory:" + outputPath);
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

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
                           "setInterval", "setTimeout", "status", "submit", "taint", "text", "textarea", "top", "unescape", "untaint", "window", 
                           "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "borderColor", "backgroundPosition",
                           "backgroundRepeat", "backgroundSize",
                           ];
                           
var reservedHtmlWords = ["onblur", "onclick", "onerror", "onfocus", "onkeydown", "onkeypress", "onkeyup", "onmouseover", "onload", "onmouseup", "onmousedown", "onsubmit", "background", "backgroundImage"]

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
                                ["Document", "characterSet", "charset", "compatMode", "contentType", "doctype", "documentElement", "documentURI", "hidden", "implementation", "lastStyleSheetSet", "pointerLockElement", "preferredStyleSheetSet", "scrollingElement", "selectedStyleSheetSet", "styleSheets", "styleSheetSets", "timeline", "undomanager", "visibilityState", "children", "firstElementChild", "lastElementChild", "childElementCount", "activeElement", "alinkColor", "anchors", "applets", "bgColor", "body", "cookie", "defaultView", "designMode", "dir", "domain", "embeds", "fgColor", "forms", "head", "height", "images", "lastModified", "linkColor", "links", "location", "plugins", "readyState", "referrer", "scripts", "title", "URL", "vlinkColor", "width", "onafterscriptexecute", "onbeforescriptexecute", "oncopy", "oncut", "onfullscreenchange", "onfullscreenerror", "onpaste", "onpointerlockchange", "onpointerlockerror", "onreadystatechange", "onselectionchange", "onwheel", "onabort", "onanimationcancel", "onanimationend", "onanimationiteration", "onanimationstart", "onblur", "onerror", "onfocus", "onchange", "onclick", "onclose", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop", "oninput", "onkeydown", "onkeypress", "onkeyup", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onpointerdown", "onpointermove", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onreset", "onscroll", "onselect", "onsubmit", "ontouchcancel", "ontouchend", "ontouchmove", "ontouchstart", "ontransitionend", "adoptNode", "caretPositionFromPoint", "caretRangeFromPoint", "createAttribute", "createCDATASection", "createComment", "createDocumentFragment", "createElement", "createElementNS", "createEntityReference", "createEvent", "createNodeIterator", "createProcessingInstruction", "createRange", "createTexNode", "createTouch", "createTouchList", "createTreeWalker", "elementFromPoint", "elementsFromPoints", "enableStyleSheetForSet", "exitPointerLock", "getAnimations", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "importNode", "registerElement", "releaseCapture", "mozSetImageElement", "getElementById", "querySelector", "querySelectorAll", "createExpression", "createNSResolver", "evaluate", "clear", "close", "execCommand", "getElementsByName", "getSelection", "hasFocus", "open", "queryCommandEnabled", "queryCommandState", "queryCommandSupported", "write", "writeLn"]
];

var reservedGameWords = ["screen", "isServer", "window", "vars", "ip"];

var allReservedKeywords = reservedWords.concat(reservedObjects).concat(reservedWindowWords).concat(reservedHtmlWords).concat(reservedOther).concat(reservedMethods).concat(reservedGameWords);

reservedObjectPrototypes.forEach(function(array) {
    allReservedKeywords = allReservedKeywords.concat(array);
});

TokenLabel = function(value, numSpace) { this.value = value; this.numSpace = numSpace | 0; }
TokenString = function(value, numSpace) { this.value = value; this.numSpace = numSpace | 0; }
TokenSymbol = function(value, numSpace) { this.value = value; this.numSpace = numSpace | 0; }
TokenNumber = function(value, numSpace) { this.value = value; this.numSpace = numSpace | 0; }
TokenRegexp = function(value, numSpace) { this.value = value; this.numSpace = numSpace | 0; }


ExprAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprDecl = function(name) { this.name = name; }
ExprDeclAssign = function(name, symbol, value) { this.name = name; this.symbol = symbol; this.value = value; }
ExprTokenArray = function(tokens) { this.tokens = tokens; }

isspace = function(c) {
    return c == ' ' || c == '\t' || c == '\r';
}

getSpaceLength = function(c) {
    if (c == ' ') return 1;
    if (c == '\t') return 4;
    return 0;
}

isalpha = function(c) {
    return (!isspace(c) && !isnum(c) && !issymbol(c) && c != '\'' && c!= '"')//((c.toLowerCase() != c.toUpperCase() || c == '$' || c == '_');//return (c >= 'a' && c <= 'z') || (c >= 'A' || c <= 'Z');
}

isnum = function(c) {
    return c >= '0' && c <= '9';
}
ishex = function(c) {
    return isnum(c) || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F');
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
    var numSpacePrevious = 0;
    var numSpace = 0;
    while (i < source.length) {
        numSpacePrevious = numSpace;
        numSpace = 0;
        if (isspace(source.charAt(i))) {
            numSpace = numSpacePrevious;
            do {
                numSpace += getSpaceLength(source.charAt(i));
                if (source.charAt(i) == '\n')
                    numSpace = 0;
                i++;
            } while(isspace(source.charAt(i)));
        }
        
        // Comments:
        else if (source.substring(i, i+2) == "//") {
            do i++
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
            tokens.push(new TokenLabel(strLabel, numSpacePrevious));
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
            tokens.push(new TokenString(string, numSpacePrevious));
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
            tokens.push(new TokenString(string, numSpacePrevious));
        }
        
        // Number:
        else if (isnum(source.charAt(i)) || (source.charAt(i) == '.' && isnum(source[i+1]))) {
            strNumber = "";
            do {
                strNumber += source.charAt(i);
                i++;
            } while(isalnum(source.charAt(i)) || source.charAt(i) == '.' || source.charAt(i) == 'x' || source.charAt(i) == 'X');
            tokens.push(new TokenNumber(strNumber, numSpacePrevious));//new TokenNumber(parseFloat(strNumber)));
            
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
                tokens.push(new TokenSymbol(char4, numSpacePrevious));
            } else if (char3 == ">>>" || char3 == "===" || char3 == "!==" || char3 == "**=" || char3 == "<<=" || char3 == ">>=" || char3 == "...") {
                i += 3;
                tokens.push(new TokenSymbol(char3, numSpacePrevious));
            } else if (char2 == "++" || char2 == "--" || char2 == "**" || char2 == "<<" || char2 == ">>" || char2 == "<=" || char2 == ">=" ||
                       char2 == "==" || char2 == "!=" || char2 == "&&" || char2 == "||" || char2 == "+=" || char2 == "-=" || char2 == "*=" || 
                       char2 == "/=" || char2 == "%=" || char2 == "&=" || char2 == "^=" || char2 == "|=") {
               i += 2;
               tokens.push(new TokenSymbol(char2, numSpacePrevious));
            }
            else {
               i++;
               tokens.push(new TokenSymbol(char, numSpacePrevious));
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

mangleTokens = function(tokens, except, debug) {
    var names = {};
    var exceptions = {};
    var nameIndex = 0;
    except.forEach(function(name) { exceptions[name] = name; });
    
    lastToken = null;
    
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
            var name =  "_" + (debug? lastToken.value : nameIndex.toString(36));
            //process.stdout.write(lastToken.value + " -> " + name + "  \t");
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
    
    for(var i = 1; i < tokens.length; i++) {
        var token = tokens[i];
        for (var j = 0; token.numSpace && j < token.numSpace; j++)
            str += " ";
        str += token.value;
    }
    
    /*var lastToken = tokens[0];
    
    for(var i = 1; i < tokens.length; i++) {
        var token = tokens[i];
        if (token.value == "{" || token.value == "}")
            str += " " + token.value + " ";
        else if (token.constructor == TokenSymbol || lastToken.constructor == TokenSymbol)
            str += token.value;
        else
            str += " " + token.value;
        lastToken = token;
    }*/
    
    return str;
}

loadExternalScript = function(filePath) {
    if (loadedFiles[filePath]) return;
    loadedFiles[filePath] = true;
    process.stdout.write(".");//console.log("Loading(external) " + filePath + "...");
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
    if (loadedFiles[filePath]) return;
    loadedFiles[filePath] = true;
    process.stdout.write("."); //console.log("Loading " + filePath + "...");
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
    copydir(dir, dest, function(error) {
        if (error) console.log("Copy error: " + error);
    });
}

loadExternalScriptsRecursive = loadRecursive.bind(null, loadExternalScript);
loadScriptRecursive = loadRecursive.bind(null, loadScript);

// Libraries to mangle:
//loadScript("lib_front_end/apixi.js");
loadExternalScript("lib_front_end/ajquery-3.1.1.min.js");
loadExternalScript("lib_front_end/atether.min.js");
loadExternalScript("lib_front_end/bootstrap.min.js");
loadRecursive("lib", loadExternalScript);
loadRecursive("lib_front_end", loadExternalScript);

loadScript("lib/perlin.js");
loadScript("lib_front_end/bpixi-particles.min.js");
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
mangleTokens(tokens, reservedKeywords, commander.debug);
console.log("Mangling names... (3/3)");
var output = inputSrcExternal + tokensToString(tokens);
//console.log(output);

if (!commander.debug) {
    console.log("Minifying...");
    var result = UglifyJS.minify(output, {
        fromString: true,
        mangleProperties: true,
        mangle: true
    });
    output = result.code;
}

console.log("Copying...");

copyFile("html_index.php", outputPath + "index.php");
copyFile("style.css", outputPath + "style.css");
copyRecursive("data/", outputPath + "data");

fs.writeFile(outputPath + "src.js", output, function(err){
    if (err)
        console.log(err);
})

console.log("done!");
