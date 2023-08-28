/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(/(\\*)(`|\$\{|\\$)/g, (m, backslashes: string, c: string) => {
		return "\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};

module.exports[n`Transformers >> merge-with-quantifier >> Prism regex snapshot `] = lit`
/<!--[^]*?-->/
/<\?[^]+?\?>/
/<!\[CDATA\[[^]*?\]\]>/i
/<!DOCTYPE(?:[^"'>[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^"'<\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i
/<\/?(?!\d)[^\s$%/<=>]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/
/&#X?[\dA-F]{1,8};/i
/^<!|>$|[[\]]/
/^DOCTYPE/
/[^\s"'<>]+/
/\/?>/
/&[\dA-Z]{1,8};/i
/\[[^]+(?=\]>$)/
/"[^"]*"|'[^']*'/
/^<\/?[^\s/>]+/
/=\s*(?:"[^"]*"|'[^']*'|[^\s"'=>]+)/
/[^\s/>]+/
/^<\/?/
/^[^\s/:>]+:/
/"|'/
/^=/
/\/\*[^]*?\*\//
/[^\s{}](?:[^"';{}]|"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*')*?(?=\s*\{)/
/[-A-Z_a-z\xa0-\uffff][-\w\xa0-\uffff]*(?=\s*:)/
/!IMPORTANT\b/i
/[-\dA-Z]+(?=\()/i
/[(),:;{}]/
/@[-\w]+[^]*?(?:;|(?=\s*\{))/
/\bURL\((?:"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*'|(?:[^\n\r"'()\\]|\\[^])*)\)/i
/"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*'/
/^@[-\w]+/
/^URL/i
/^\(|\)$/
/\bselector\s*\((?!\s*\))\s*(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/
/(?:^|[^-\w])(?:and|not|only|or)(?![-\w])/
/^(?:"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*')$/
/<STYLE[^]*?>(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[^])*?(?=<\/STYLE>)/i
/<!\[CDATA\[[^]*?\]\]>/i
/[^]+/
/\s*STYLE=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*')/i
/^<!\[CDATA\[|\]\]>$/i
/^\s*=\s*["']|["']\s*$/
/^<!\[CDATA\[[^]+?(?=\]\]>$)/i
/^\s*STYLE/i
/.+/
/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/
/\b(?:true|false)\b/
/\w+(?=\()/
/\b0X[\dA-F]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?/i
/[<>]=?|[!=]=?=?|-{1,2}|\+{1,2}|&{1,2}|\|{1,2}|[%*/?~^]/
/[(),.:;[\]{}]/
/"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*'/
/(?:\b(?:CLASS|INTERFACE|EXTENDS|IMPLEMENTS|TRAIT|INSTANCEOF|NEW)\s+|\bCATCH\s+\()[\w.\\]+/i
/(?:^|[^\\])\/\*[^]*?(?:\*\/|$)/
/(?:^|[^:\\])\/\/.*/
/[.\\]/
/\b[A-Z](?:[A-Z_]|\dx?)*\b/
/#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/
/\b(?:(?:0[Xx](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[Bb](?:[01](?:_[01])?)+|0[Oo](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][-+]?(?:\d(?:_\d)?)+)?/
/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>{2,3}=?|[-!%&*+/<=>|^]=?|\.{3}|\?\?=?|\?\.?|[:~]/
/\b(?:class|interface|extends|implements|instanceof|new)\s+[\w.\\]+/
/\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/(?:^|[^\x09-\x0d "$').0-9A-Z\]_a-z\xa0-\uffff]|\b(?:return|yield))\s*\/(?:\[(?:[^\n\r\\\]]|\\.)*\]|\\.|[^\n\r/[\\])+\/[gimsuy]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\n\r),.:;\]}]|\/\/))/
/#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*[:=]\s*(?:async\s*)?(?:\bfunction(?:(?<!\w)\w|(?<=\w)(?!\w))|(?:\((?:[^()]|\([^()]*\))*\)|[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*)\s*=>))/
/(?:^|[^\w$\xa0-\uffff])[$A-Z_\xa0-\uffff][\w$\xa0-\uffff]*(?=\.(?:prototype|constructor))/
/function(?:\s+[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*)?\s*\(\s*(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/
/[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*=>)/
/\(\s*(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/
/(?:(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![\w$\xa0-\uffff]))[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*\s*\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/
/(?:^|\})\s*(?:catch|finally)\b/
/(?:^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function(?:(?<!\w)\w|(?<=\w)(?!\w))|\(|[\w$\xa0-\uffff]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\w$[\xa0-\uffff])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/
/^\`|\`$/
/(?:^|[^\\])(?:\\{2})*\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/
/^\$\{|\}$/
/<SCRIPT[^]*?>(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[^])*?(?=<\/SCRIPT>)/i
/^\*.*/m
/\`(?:\\.|(?!\`)[^\n\r\\])*\`|'(?:\\.|(?!')[^\n\r\\])*'/
/\b\d+\b/
/[(),.:]/
/[|}](?:\\.|[^\n\r\\{|])*(?=[{|])/
/(?:^|\s)".*/m
/(?:\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|SELECTOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i
/\s(?:\*{1,2}|<[=>]?|>=?|\?=|[-+/=])(?=\s)/
/\s&{1,2}(?=\s)/
/\w(?:->?|=>|[{|}~])(?=\w)/
/[{|}]/
/;.*/
/=\/?|\//
/[()[\]]/
/(?:%[is])?"[^\n\r"]*"/
/%(?:B[01]+-[01]+|D\d+-\d+|X[\dA-F]+-[\dA-F]+)/i
/%(?:B[01]+(?:\.[01]+)*|D\d+(?:\.\d+)*|X[\dA-F]+(?:\.[\dA-F]+)*)/i
/(?:^|[^-\w])(?:\d*\*\d*|\d+)/
/^[\t ]*(?:[a-z][-\w]*|<[^\n\r>]*>)(?=\s*=)/m
/(?:(?:^|[^-\w<])(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OCTET|SP|VCHAR|WSP)|<(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OCTET|SP|VCHAR|WSP)>)(?![-\w])/i
/(?:^|[^-\w<])[A-Z][-\w]*|<[^\n\r>]*>/i
/^%[is]/
/<|>/
/\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/
/\+\+|--|(?:[-%*+/^]|&{1,2}|\|{1,2}|<{1,2}|>{1,2}>?|[!=]=?)=?|[?@~]/
/(?:^|[^.])<\/?\w+(?:\s+[^\s/=>]+=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'))*\s*\/?>/
/--.*/
/"(?:""|[^\n\f\r"])*"/
/\b'\w+/
/\b(?:ABORT|ABS|ABSTRACT|ACCEPT|ACCESS|ALIASED|ALL|AND|ARRAY|AT|BEGIN|BODY|CASE|CONSTANT|DECLARE|DELAY|DELTA|DIGITS|DO|ELSE|NEW|RETURN|ELSIF|END|ENTRY|EXCEPTION|EXIT|FOR|FUNCTION|GENERIC|GOTO|IF|IN|INTERFACE|IS|LIMITED|LOOP|MOD|NOT|NULL|OF|OTHERS|OUT|OVERRIDING|PACKAGE|PRAGMA|PRIVATE|PROCEDURE|PROTECTED|RAISE|RANGE|RECORD|REM|RENAMES|REQUEUE|REVERSE|SELECT|SEPARATE|SOME|SUBTYPE|SYNCHRONIZED|TAGGED|TASK|TERMINATE|THEN|TYPE|UNTIL|USE|WHEN|WHILE|WITH|XOR)\b/i
/\b(?:TRUE|FALSE)\b/i
/<[=>]?|>=?|=>?|:=|\/=?|\*{1,2}|[-&+]/
/\.{1,2}|[(),:;]/
/'.'/
/\b[A-Z]\w*\b/i
/\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[-+]?\d(?:_?\d)*)?/i
/\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[-+]?\d(?:_?\d)*)?\b/i
/\{-[^]*?(?:-\}|$)|--.*/
/[().;@{}\u2983\u2984]/
/\b(?:Set|abstract|constructor|data|eta-equality|field|forall|forall|hiding|import|in|inductive|infix|infixl|infixr|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
/"(?:\\(?:\r\n|[^])|[^\n\r"\\])*"/
/(?:data|record) +\S+/
/^[\t ]*[^\n\r:]+?(?=:)/m
/(?:^\s*|\s)(?:[:=?\\_|\u03bb\u2192\u2200]|->)(?=\s)/
/\/\/.*|\/\*[^]*?\*\//
/\b(?:0X[\dA-F]+|(?:\d+\.?\d*|\.\d+)(?:E[-+]?\d+)?)(?:F|U(?:L{1,2})?|L{1,2})?\b/i
/\b(?:FALSE|TRUE)\b/i
/\b(?:Curr(?:FieldNo|Page|Report)|RequestOptionsPage|x?Rec)\b/
/\b(?:AUTOMATION|BIGINTEGER|BIGTEXT|BLOB|BOOLEAN|BYTE|CHAR|CLIENTTYPE|CODE|COMPLETIONTRIGGERERRORLEVEL|CONNECTIONTYPE|DATABASE|DATACLASSIFICATION|DATASCOPE|DATE|DATEFORMULA|DATETIME|DECIMAL|DEFAULTLAYOUT|DIALOG|DICTIONARY|DOTNETASSEMBLY|DOTNETTYPEDECLARATION|DURATION|ERRORINFO|ERRORTYPE|EXECUTIONCONTEXT|EXECUTIONMODE|FIELDCLASS|FIELDREF|FIELDTYPE|FILE|FILTERPAGEBUILDER|GUID|HTTPCLIENT|HTTPCONTENT|HTTPHEADERS|HTTPREQUESTMESSAGE|HTTPRESPONSEMESSAGE|INSTREAM|INTEGER|JOKER|JSONARRAY|JSONOBJECT|JSONTOKEN|JSONVALUE|KEYREF|LIST|MODULEDEPENDENCYINFO|MODULEINFO|NONE|NOTIFICATION|NOTIFICATIONSCOPE|OBJECTTYPE|OPTION|OUTSTREAM|PAGERESULT|RECORD|RECORDID|RECORDREF|REPORTFORMAT|SECURITYFILTER|SESSIONSETTINGS|TABLECONNECTIONTYPE|TABLEFILTER|TESTACTION|TESTFIELD|TESTFILTERFIELD|TESTPAGE|TESTPERMISSIONS|TESTREQUESTPAGE|TEXT|TEXTBUILDER|TEXTCONST|TEXTENCODING|TIME|TRANSACTIONMODEL|TRANSACTIONTYPE|VARIANT|VERBOSITY|VERSION|VIEW|VIEWS|WEBSERVICEACTIONCONTEXT|WEBSERVICEACTIONRESULTCODE|XMLATTRIBUTE|XMLATTRIBUTECOLLECTION|XMLCDATA|XMLCOMMENT|XMLDECLARATION|XMLDOCUMENT|XMLDOCUMENTTYPE|XMLELEMENT|XMLNAMESPACEMANAGER|XMLNAMETABLE|XMLNODE|XMLNODELIST|XMLPROCESSINGINSTRUCTION|XMLREADOPTIONS|XMLTEXT|XMLWRITEOPTIONS)\b/i
/\.\.|:[:=]|[-*+/]=?|<>|[<>]=?|=|\b(?:AND|DIV|MOD|NOT|OR|XOR)\b/i
/[(),.:;[\]{}]/
/'(?:''|[^\n\r'])*'(?!')|"(?:""|[^\n\r"])*"(?!")/
/(?:\b(?:EVENT|PROCEDURE|TRIGGER)\s+|(?:^|[^.])\.\s*)[A-Z_]\w*(?=\s*\()/i
/\b(?:ARRAY|ASSERTERROR|BEGIN|BREAK|CASE|DO|DOWNTO|ELSE|END|EVENT|EXIT|FOR|FOREACH|FUNCTION|IF|IMPLEMENTS|IN|INDATASET|INTERFACE|INTERNAL|LOCAL|OF|PROCEDURE|PROGRAM|PROTECTED|REPEAT|RUNONCLIENT|SECURITYFILTERING|SUPPRESSDISPOSE|TEMPORARY|THEN|TO|TRIGGER|UNTIL|VAR|WHILE|WITH|WITHEVENTS)\b/i
/\b(?:ACTION|ACTIONS|ADDAFTER|ADDBEFORE|ADDFIRST|ADDLAST|AREA|ASSEMBLY|CHARTPART|CODEUNIT|COLUMN|CONTROLADDIN|CUEGROUP|CUSTOMIZES|DATAITEM|DATASET|DOTNET|ELEMENTS|ENUM|ENUMEXTENSION|EXTENDS|FIELD|FIELDATTRIBUTE|FIELDELEMENT|FIELDGROUP|FIELDGROUPS|FIELDS|FILTER|FIXED|GRID|GROUP|KEY|KEYS|LABEL|LABELS|LAYOUT|MODIFY|MOVEAFTER|MOVEBEFORE|MOVEFIRST|MOVELAST|PAGE|PAGECUSTOMIZATION|PAGEEXTENSION|PART|PROFILE|QUERY|REPEATER|REPORT|REQUESTPAGE|SCHEMA|SEPARATOR|SYSTEMPART|TABLE|TABLEELEMENT|TABLEEXTENSION|TEXTATTRIBUTE|TEXTELEMENT|TYPE|USERCONTROL|VALUE|XMLPORT)\b/i
/\/\/.*|\/\*[^]*?(?:\*\/|$)/
/\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|parser|returns|throws|tokens)\b/
/\b[A-Z][A-Z_]*\b/
/\.\.|->|[|~]|[*+?]\??/
/[():;=]/
/'(?:\\.|[^\n\r'\\])*'/
/\[(?:\\.|[^\n\r\\\]])*\]/
/\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\}/
/->\s*(?:\s*(?:,\s*)?\b[A-Z]\w*(?:\s*\([^\n\r()]*\))?)+(?=\s*;)/i
/@\w+(?:::\w+)*/
/#[\t ]*\w+/
/\\(?:u(?:[\dA-Fa-f]{4}|\{[\dA-Fa-f]+\})|[Pp]\{[-\w=]+\}|[^\n\rPpu])/
/[[\]]/
/[{}]/
/\b\w+(?=\s*(?:[(,]|$))/
/[(),]/
/\b[a-z]\w*(?=\s*:)/
/\b[A-Z]\w*(?=\s*:)/
/(?:[^[]|(?:^|[^\\])(?:\\\\)*\\\[)-(?!\])/
/\{[^]+(?=\})/
/#.*/
/[$%]\{?(?:\w\.?[-+:]?)+\}?/
/\^?.*\$|\^.*\$?/
/^\s*\b(?:ACCEPTFILTER|ACCEPTPATHINFO|ACCESSFILENAME|ACTION|ADD(?:ALT|ALTBYENCODING|ALTBYTYPE|CHARSET|DEFAULTCHARSET|DESCRIPTION|ENCODING|HANDLER|ICON|ICONBYENCODING|ICONBYTYPE|INPUTFILTER|LANGUAGE|MODULEINFO|OUTPUTFILTER|OUTPUTFILTERBYTYPE|TYPE)|ALIAS|ALIASMATCH|ALLOW(?:CONNECT|ENCODEDSLASHES|METHODS|OVERRIDE|OVERRIDELIST)?|ANONYMOUS(?:_LOGEMAIL|_MUSTGIVEEMAIL|_NOUSERID|_VERIFYEMAIL)?|ASYNCREQUESTWORKERFACTOR|AUTH(?:BASICAUTHORITATIVE|BASICFAKE|BASICPROVIDER|BASICUSEDIGESTALGORITHM|DBDUSERPWQUERY|DBDUSERREALMQUERY|DBMGROUPFILE|DBMTYPE|DBMUSERFILE|DIGEST(?:ALGORITHM|DOMAIN|NONCELIFETIME|PROVIDER|QOP|SHMEMSIZE)|FORM(?:AUTHORITATIVE|BODY|DISABLENOSTORE|FAKEBASICAUTH|LOCATION|LOGINREQUIREDLOCATION|LOGINSUCCESSLOCATION|LOGOUTLOCATION|METHOD|MIMETYPE|PASSWORD|PROVIDER|SITEPASSPHRASE|SIZE|USERNAME)|GROUPFILE|LDAP(?:AUTHORIZEPREFIX|BINDAUTHORITATIVE|BINDDN|BINDPASSWORD|CHARSETCONFIG|COMPAREASUSER|COMPAREDNONSERVER|DEREFERENCEALIASES|GROUPATTRIBUTE|GROUPATTRIBUTEISDN|INITIALBINDASUSER|INITIALBINDPATTERN|MAXSUBGROUPDEPTH|REMOTEUSERATTRIBUTE|REMOTEUSERISDN|SEARCHASUSER|SUBGROUPATTRIBUTE|SUBGROUPCLASS|URL)|MERGING|NAME|TYPE|USERFILE|NCACHE(?:CONTEXT|ENABLE|PROVIDEFOR|SOCACHE|TIMEOUT)|NZFCGICHECKAUTHNPROVIDER|NZFCGIDEFINEPROVIDER|ZDBDLOGINTOREFERER|ZDBDQUERY|ZDBDREDIRECTQUERY|ZDBMTYPE|ZSENDFORBIDDENONFAILURE)|BALANCERGROWTH|BALANCERINHERIT|BALANCERMEMBER|BALANCERPERSIST|BROWSERMATCH|BROWSERMATCHNOCASE|BUFFERSIZE|BUFFEREDLOGS|CGIDSCRIPTTIMEOUT|CGIMAPEXTENSION|CACHE(?:DEFAULTEXPIRE|DETAILHEADER|DIRLENGTH|DIRLEVELS|DISABLE|ENABLE|FILE|HEADER|IGNORECACHECONTROL|IGNOREHEADERS|IGNORENOLASTMOD|IGNOREQUERYSTRING|IGNOREURLSESSIONIDENTIFIERS|KEYBASEURL|LASTMODIFIEDFACTOR|LOCK|LOCKMAXAGE|LOCKPATH|MAXEXPIRE|MAXFILESIZE|MINEXPIRE|MINFILESIZE|NEGOTIATEDDOCS|QUICKHANDLER|READSIZE|READTIME|ROOT|SOCACHE(?:MAXSIZE|MAXTIME|MINTIME|READSIZE|READTIME)?|STALEONERROR|STOREEXPIRED|STORENOSTORE|STOREPRIVATE)|CHARSETDEFAULT|CHARSETOPTIONS|CHARSETSOURCEENC|CHECKCASEONLY|CHECKSPELLING|CHROOTDIR|CONTENTDIGEST|COOKIEDOMAIN|COOKIEEXPIRES|COOKIENAME|COOKIESTYLE|COOKIETRACKING|COREDUMPDIRECTORY|CUSTOMLOG|DBDEXPTIME|DBDINITSQL|DBDKEEP|DBDMAX|DBDMIN|DBDPARAMS|DBDPERSIST|DBDPREPARESQL|DBDRIVER|DTRACEPRIVILEGES|DAV|DAVDEPTHINFINITY|DAVGENERICLOCKDB|DAVLOCKDB|DAVMINTIMEOUT|DEFAULTICON|DEFAULTLANGUAGE|DEFAULTRUNTIMEDIR|DEFAULTTYPE|DEFINE|DEFLATE(?:BUFFERSIZE|COMPRESSIONLEVEL|FILTERNOTE|INFLATELIMITREQUESTBODY|INFLATERATIO(?:BURST|LIMIT)|MEMLEVEL|WINDOWSIZE)|DENY|DIRECTORYCHECKHANDLER|DIRECTORYINDEX|DIRECTORYINDEXREDIRECT|DIRECTORYSLASH|DOCUMENTROOT|DUMPIOINPUT|DUMPIOOUTPUT|ENABLEEXCEPTIONHOOK|ENABLEMMAP|ENABLESENDFILE|ERROR|ERRORDOCUMENT|ERRORLOG|ERRORLOGFORMAT|EXAMPLE|EXPIRESACTIVE|EXPIRESBYTYPE|EXPIRESDEFAULT|EXTFILTERDEFINE|EXTFILTEROPTIONS|EXTENDEDSTATUS|FALLBACKRESOURCE|FILEETAG|FILTERCHAIN|FILTERDECLARE|FILTERPROTOCOL|FILTERPROVIDER|FILTERTRACE|FORCELANGUAGEPRIORITY|FORCETYPE|FORENSICLOG|GPROFDIR|GRACEFULSHUTDOWNTIMEOUT|GROUP|HEADER|HEADERNAME|HEARTBEAT(?:ADDRESS|LISTEN|MAXSERVERS|STORAGE)|HOSTNAMELOOKUPS|ISAPI(?:APPENDLOGTOERRORS|APPENDLOGTOQUERY|CACHEFILE|FAKEASYNC|LOGNOTSUPPORTED|READAHEADBUFFER)|IDENTITYCHECK|IDENTITYCHECKTIMEOUT|IMAPBASE|IMAPDEFAULT|IMAPMENU|INCLUDE|INCLUDEOPTIONAL|INDEX(?:HEADINSERT|IGNORE|IGNORERESET|OPTIONS|ORDERDEFAULT|STYLESHEET)|INPUTSED|KEEPALIVE|KEEPALIVETIMEOUT|KEPTBODYSIZE|LDAP(?:CACHEENTRIES|CACHETTL|CONNECTIONPOOLTTL|CONNECTIONTIMEOUT|LIBRARYDEBUG|OPCACHEENTRIES|OPCACHETTL|REFERRALHOPLIMIT|REFERRALS|RETRIES|RETRYDELAY|SHAREDCACHEFILE|SHAREDCACHESIZE|TIMEOUT|TRUSTEDCLIENTCERT|TRUSTEDGLOBALCERT|TRUSTEDMODE|VERIFYSERVERCERT)|LANGUAGEPRIORITY|LIMIT(?:INTERNALRECURSION|REQUEST(?:BODY|FIELDSIZE|FIELDS|LINE)|XMLREQUESTBODY)|LISTEN|LISTENBACKLOG|LOADFILE|LOADMODULE|LOGFORMAT|LOGLEVEL|LOGMESSAGE|LUAAUTHZPROVIDER|LUACODECACHE|LUA(?:HOOK(?:ACCESSCHECKER|AUTHCHECKER|CHECKUSERID|FIXUPS|INSERTFILTER|LOG|MAPTOSTORAGE|TRANSLATENAME|TYPECHECKER)|INHERIT|INPUTFILTER|MAPHANDLER|OUTPUTFILTER|PACKAGECPATH|PACKAGEPATH|QUICKHANDLER|ROOT|SCOPE)|MMAPFILE|MAX(?:CONNECTIONSPERCHILD|KEEPALIVEREQUESTS|MEMFREE|RANGEOVERLAPS|RANGEREVERSALS|RANGES|REQUESTWORKERS|SPARESERVERS|SPARETHREADS|THREADS)|MERGETRAILERS|METADIR|METAFILES|METASUFFIX|MIMEMAGICFILE|MINSPARESERVERS|MINSPARETHREADS|MODMIMEUSEPATHINFO|MODEMSTANDARD|MULTIVIEWSMATCH|MUTEX|NWSSLTRUSTEDCERTS|NWSSLUPGRADEABLE|NAMEVIRTUALHOST|NOPROXY|OPTIONS|ORDER|OUTPUTSED|PASSENV|PIDFILE|PRIVILEGESMODE|PROTOCOL|PROTOCOLECHO|PROXY(?:ADDHEADERS|BADHEADER|BLOCK|DOMAIN|ERROROVERRIDE|EXPRESSDBMFILE|EXPRESSDBMTYPE|EXPRESSENABLE|FTPDIRCHARSET|FTPESCAPEWILDCARDS|FTPLISTONWILDCARD|HTML(?:BUFSIZE|CHARSETOUT|DOCTYPE|ENABLE|EVENTS|EXTENDED|FIXUPS|INTERP|LINKS|META|STRIPCOMMENTS|URLMAP)|IOBUFFERSIZE|MAXFORWARDS|PASS(?:INHERIT|INTERPOLATEENV|MATCH|REVERSE|REVERSECOOKIEDOMAIN|REVERSECOOKIEPATH)?|PRESERVEHOST|RECEIVEBUFFERSIZE|REMOTE|REMOTEMATCH|REQUESTS|SCGIINTERNALREDIRECT|SCGISENDFILE|SET|SOURCEADDRESS|STATUS|TIMEOUT|VIA)|RLIMITCPU|RLIMITMEM|RLIMITNPROC|READMENAME|RECEIVEBUFFERSIZE|REDIRECT|REDIRECTMATCH|REDIRECTPERMANENT|REDIRECTTEMP|REFLECTORHEADER|REMOTEIP(?:HEADER|INTERNALPROXY|INTERNALPROXYLIST|PROXIESHEADER|TRUSTEDPROXY|TRUSTEDPROXYLIST)|REMOVECHARSET|REMOVEENCODING|REMOVEHANDLER|REMOVEINPUTFILTER|REMOVELANGUAGE|REMOVEOUTPUTFILTER|REMOVETYPE|REQUESTHEADER|REQUESTREADTIMEOUT|REQUIRE|REWRITE(?:BASE|COND|ENGINE|MAP|OPTIONS|RULE)|SSIETAG|SSIENDTAG|SSIERRORMSG|SSILASTMODIFIED|SSILEGACYEXPRPARSER|SSISTARTTAG|SSITIMEFORMAT|SSIUNDEFINEDECHO|SSL(?:CACERTIFICATEFILE|CACERTIFICATEPATH|CADNREQUESTFILE|CADNREQUESTPATH|CAREVOCATIONCHECK|CAREVOCATIONFILE|CAREVOCATIONPATH|CERTIFICATECHAINFILE|CERTIFICATEFILE|CERTIFICATEKEYFILE|CIPHERSUITE|COMPRESSION|CRYPTODEVICE|ENGINE|FIPS|HONORCIPHERORDER|INSECURERENEGOTIATION|OCSP(?:DEFAULTRESPONDER|ENABLE|OVERRIDERESPONDER|RESPONDERTIMEOUT|RESPONSEMAXAGE|RESPONSETIMESKEW|USEREQUESTNONCE)|OPENSSLCONFCMD|OPTIONS|PASSPHRASEDIALOG|PROTOCOL|PROXY(?:CACERTIFICATEFILE|CACERTIFICATEPATH|CAREVOCATION(?:CHECK|FILE|PATH)|CHECKPEER(?:CN|EXPIRE|NAME)|CIPHERSUITE|ENGINE|MACHINECERTIFICATE(?:CHAINFILE|FILE|PATH)|PROTOCOL|VERIFY|VERIFYDEPTH)|RANDOMSEED|RENEGBUFFERSIZE|REQUIRE|REQUIRESSL|SRPUNKNOWNUSERSEED|SRPVERIFIERFILE|SESSION(?:CACHE|CACHETIMEOUT|TICKETKEYFILE|TICKETS)|STAPLING(?:CACHE|ERRORCACHETIMEOUT|FAKETRYLATER|FORCEURL|RESPONDERTIMEOUT|RESPONSEMAXAGE|RESPONSETIMESKEW|RETURNRESPONDERERRORS|STANDARDCACHETIMEOUT)|STRICTSNIVHOSTCHECK|USESTAPLING|USERNAME|VERIFYCLIENT|VERIFYDEPTH)|SATISFY|SCOREBOARDFILE|SCRIPT(?:ALIAS|ALIASMATCH|INTERPRETERSOURCE|LOG|LOGBUFFER|LOGLENGTH|SOCK)?|SECURELISTEN|SEEREQUESTTAIL|SENDBUFFERSIZE|SERVER(?:ADMIN|ALIAS|LIMIT|NAME|PATH|ROOT|SIGNATURE|TOKENS)|SESSION(?:COOKIE(?:NAME|NAME2|REMOVE)|CRYPTO(?:CIPHER|DRIVER|PASSPHRASE|PASSPHRASEFILE)|DBD(?:COOKIENAME|COOKIENAME2|COOKIEREMOVE|DELETELABEL|INSERTLABEL|PERUSER|SELECTLABEL|UPDATELABEL)|ENV|EXCLUDE|HEADER|INCLUDE|MAXAGE)?|SETENV|SETENVIF|SETENVIFEXPR|SETENVIFNOCASE|SETHANDLER|SETINPUTFILTER|SETOUTPUTFILTER|STARTSERVERS|STARTTHREADS|SUBSTITUTE|SUEXEC|SUEXECUSERGROUP|THREADLIMIT|THREADSTACKSIZE|THREADSPERCHILD|TIMEOUT|TRACEENABLE|TRANSFERLOG|TYPESCONFIG|UNDEFINE|UNDEFMACRO|UNSETENV|USE|USECANONICALNAME|USECANONICALPHYSICALPORT|USER|USERDIR|VHOSTCGIMODE|VHOSTCGIPRIVS|VHOSTGROUP|VHOSTPRIVS|VHOSTSECURE|VHOSTUSER|VIRTUAL(?:DOCUMENTROOT|SCRIPTALIAS)(?:IP)?|WATCHDOGINTERVAL|XBITHACK|XML2ENCALIAS|XML2ENCDEFAULT|XML2STARTPARSE)\b/im
/<\/?\b(?:AUTH[NZ]PROVIDERALIAS|DIRECTORY|DIRECTORYMATCH|ELSE|ELSEIF|FILES|FILESMATCH|IF|IFDEFINE|IFMODULE|IFVERSION|LIMIT|LIMITEXCEPT|LOCATION|LOCATIONMATCH|MACRO|PROXY|REQUIRE(?:ALL|ANY|NONE)|VIRTUALHOST)\b *.*>/i
/\[(?:\w,?)+\]/
/".*"|'.*'/
/>/
/^<\/?\w+/
/.*[^>]/
/:/
/(?:\u235d|#[ !]).*$/m
/\xaf?(?:\d*\.?\b\d+(?:E[+\xaf]?\d+)?|\xaf|\u221e)(?:J\xaf?(?:\d*\.?\d+(?:E[+\xaf]?\d+)?|\xaf|\u221e))?/i
/:[A-Z][a-z][A-Za-z]*\b/
/[#\u233e\u235e\u236c\u2395]/
/[-!*+,<=>?|~\xa4\xd7\xf7\u2191-\u2193\u2197\u220a\u2223\u2227-\u222a\u2248\u2260-\u2262\u2264\u2265\u2282\u2283\u2286\u2287\u2296\u22a2-\u22a5\u2308\u230a\u2337\u2339\u233d\u2341\u2342\u2349\u234b\u234e\u2352\u2355\u235f\u236a\u236f\u2371-\u2374\u2377\u2378\u25cb]/
/[();[\]\u22c4\u25c7]/
/'(?:[^\n\r']|'')*'/
/\u2395[A-Z]+/i
/[&/\\\xa8\u2225\u2336\u233f\u2340\u2368]/
/[.@\u2218\u2338\u233a\u2360\u2363-\u2365]/
/\u2190/
/[:{}\u2207\u236b\u2375\u2376\u2379\u237a]/
/"(?:\\.|[^\n\r"\\])*"/
/(?:\b\d+\.?\d*|\B\.\d+)(?:E-?\d+)?\b/i
/\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/
/[(),:{}\xab\xac\xbb\u300a\u300b]/
/\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[^])*?\*\)/
/--.+/
/#.+/
/[-&*+/=\xf7\u2260\u2264\u2265^]|[<>]=?/
/\b(?:(?:start|begin|end)s? with|(?:does not|doesn't) contain|contains?|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:does not|doesn't) equal|equals|equal to|isn't|is not|(?:a )?(?:ref(?: to)?|reference to)|and|or|div|mod|as|not)\b/
/\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/
/@{1,2}\w+/
/(?!\d)\w+(?=\s*\()/
/TRUE|FALSE/i
/(?:\B\.\d+|\b(?:0|[1-9]\d*)(?:\.\d+)?)(?:E[-+]?\d+)?/i
/\*{2,}|[!=]~|[!<=>]=?|&&|\|\||[-%*+/]/
/::|[(),.:;?[\]{}]/
/[,{]\s*(?:(?!\d)\w+|"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'|\`(?:(?!\`)[^\n\r\\]|\\.)*\`|\xb4(?:(?!\xb4)[^\n\r\\]|\\.)*\xb4)(?=\s*:)/
/"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'|\`(?:(?!\`)[^\n\r\\]|\\.)*\`|\xb4(?:(?!\xb4)[^\n\r\\]|\\.)*\xb4/
/\b(?:AGGREGATE|ALL|AND|ANY|ASC|COLLECT|DESC|DISTINCT|FILTER|FOR|GRAPH|IN|INBOUND|INSERT|INTO|K_SHORTEST_PATHS|LET|LIKE|LIMIT|NONE|NOT|NULL|OR|OUTBOUND|REMOVE|REPLACE|RETURN|SHORTEST_PATH|SORT|UPDATE|UPSERT|WITH)\b/i
/\.\./
/\bWITH\s+COUNT(?=\s+INTO(?:(?<!\w)\w|(?<=\w)(?!\w)))/i
/(?:^|[^\w.[])(?:KEEP|PRUNE|SEARCH|TO)\b/i
/(?:^|[^\w.[])(?:CURRENT|NEW|OLD)\b/
/\bOPTIONS(?=\s*\{)/i
/\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
/\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/
/[A-Z_]\w*(?=\s*\()/i
/(?:\b0X(?:[\dA-F]+\.?[\dA-F]*|\.[\dA-F]+)(?:P[-+]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?)[FLU]*/i
/>>=?|<<=?|->|&&|\+\+|--|::|\|\||[:?~]|[-!%&*+/<=>|^]=?/
/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
/>>=?|<<=?|->|&&|\+\+|--|::|\|\||[:?~]|<=>|[-!%&*+/<=>|^]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
/\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/
/\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto|switch|case|new|try|throw|catch|finally|null|break|continue|boolean|bool|void|byte|word|string|String|array|int|long|integer|double)\b/
/\b(?:KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|LiquidCrystal_I2C|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD|runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer|disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/
/\/\/(?:[^\n\r\\]|\\(?:\r\n?|\n|(?![\n\r])))*|\/\*[^]*?(?:\*\/|$)/
/^\s*#\s*[A-Z]+(?:[^\n\r/\\]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[^]))*/im
/\b(?:enum|struct)\s+(?:__attribute__\s*\(\([^]*?\)\)\s*)?\w+/
/R"[^ ()\\]{0,16}\([^]*?\)[]Unknown:\\1[]"/
/\b(?:class|struct)\s+\w+\s*:\s*[^"';{}]+?(?=\s*[;{])/
/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/
/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i
/\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
/(?:\b0B['01]+|\b0X(?:[\d'A-F]+\.?[\d'A-F]*|\.[\d'A-F]+)(?:P[-+]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:E[-+]?[\d']+)?)[FLU]*/i
/^#/
/##|\\(?=[\n\r])/
/\b[A-Z_]\w*\b(?!\s*::)/i
/\b(?:class|concept|enum|struct|typename)\s+(?!\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))\w+/
/^#\s*[a-z]+/
/\S[^]*/
/^#\s*include\s*<[^>]+>/
/%.*/
/@(?:ATTRIBUTE|DATA|END|RELATION)\b/i
/\b\d+(?:\.\d+)?\b/
/[,{}]/
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'/
/^\/\/.*/m
/&#?[\dA-Z]{1,8};/i
/^\/{4,}(?:\r?\n|\r)(?:[^]*(?:\r?\n|\r))??[]Unknown:\\1[]/m
/^\|={3,}(?:(?:\r?\n|\r).*)*?(?:\r?\n|\r)\|={3,}$/m
/^\+{4,}(?:\r?\n|\r)(?:[^]*(?:\r?\n|\r))??[]Unknown:\\1[]$/m
/^(?:-{4,}|\.{4,})(?:\r?\n|\r)(?:[^]*(?:\r?\n|\r))??[]Unknown:\\1[]$/m
/^(?:--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[^]*(?:\r?\n|\r))??[]Unknown:\\1[]$/m
/^[\t ]*(?:-|\*{1,5}|\.{1,5}|(?:[A-Z]|\d+)\.|[IVX]+\))(?= )/im
/^[\t ]*[\dA-Z].+(?::{2,4}|;;)(?=\s)/im
/(?:\r\n\r\n|\n\n|\r\r)[\t ]+\S.*(?:(?:\r?\n|\r)[]Unknown:\\3[].+)*(?=(?:[]Unknown:\\2[]){2}|$)/
/^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} +.+|^\.(?![\s.]).*/m
/^:[^\n\r:]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m
/^[\t ]*\[(?!\[)(?:"(?:(?!")[^\\]|\\.)*"|\$(?:(?!\$)[^\\]|\\.)*\$|'(?:(?!')[^\\]|\\.)*'|\`(?:(?!\`)[^\\]|\\.)*\`|\[(?:[^\\\]]|\\.)*\]|[^\\\]]|\\.)*\]/m
/^'{3,}$/m
/^<{3,}$/m
/^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m
/\b[\da-z][-\da-z]*:{1,2}(?:\S+)??\[(?:[^"\\\]]|"(?:(?!")[^\\]|\\.)*"|'(?:(?!')[^\\]|\\.)*'|\\.)*\]/
/(?:^|[^\\])(?:(?:\B\[(?:[^"\\\]]|"(?:(?!")[^\\]|\\.)*"|'(?:(?!')[^\\]|\\.)*'|\\.)*\])?(?:\b_(?!\s)(?: _|[^\n\r\\_]|\\.)+(?:(?:\r?\n|\r)(?: _|[^\n\r\\_]|\\.)+)*_\b|\B\`\`(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B\`(?!\s)(?:[^\s'\`]|\s+\S)+['\`]\B|\B(?:#(?!\s)(?: #|(?!#)[^\n\r\\]|\\.)+(?:(?:\r?\n|\r)(?: #|(?!#)[^\n\r\\]|\\.)+)*#|'(?!\s)(?: '|(?!')[^\n\r\\]|\\.)+(?:(?:\r?\n|\r)(?: '|(?!')[^\n\r\\]|\\.)+)*'|\*(?!\s)(?: \*|(?!\*)[^\n\r\\]|\\.)+(?:(?:\r?\n|\r)(?: \*|(?!\*)[^\n\r\\]|\\.)+)*\*|\+(?!\s)(?: \+|(?!\+)[^\n\r\\]|\\.)+(?:(?:\r?\n|\r)(?: \+|(?!\+)[^\n\r\\]|\\.)+)*\+)\B)|(?:\[(?:[^"\\\]]|"(?:(?!")[^\\]|\\.)*"|'(?:(?!')[^\\]|\\.)*'|\\.)*\])?(?:__.+?(?:(?:\r?\n|\r).+?)*__|\*\*.+?(?:(?:\r?\n|\r).+?)*\*\*|\+\+\+.+?(?:(?:\r?\n|\r).+?)*\+\+\+|\+\+.+?(?:(?:\r?\n|\r).+?)*\+\+|##.+?(?:(?:\r?\n|\r).+?)*##|\$\$.+?(?:(?:\r?\n|\r).+?)*\$\$|\^.+?(?:(?:\r?\n|\r).+?)*\^|~.+?(?:(?:\r?\n|\r).+?)*~|\{[^\n\r}]+\}|\[{2,3}.+?(?:(?:\r?\n|\r).+?)*\]{2,3}|<<.+?(?:(?:\r?\n|\r).+?)*>>|\({2,3}.+?(?:(?:\r?\n|\r).+?)*\){2,3}))/m
/\((?:C|TM|R)\)/
/(?:^| )\+$/m
/^\++|\++$/
/^(?:-+|\.+)|(?:-+|\.+)$/
/^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
/^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
/"(?:[^"\\]|\\.)*"/
/\w+(?==)/
/^\[|\]$|,/
/=/
/(?!^\s+$).+/
/^[\t ]*<?\d*>/m
/<\d+>/
/^[-\da-z]+(?=:)/
/^:{1,2}/
/^(?:\`{1,2}|\+{1,3}|#{1,2}|\$\$|[~^]|\({2,3})|(?:'{1,2}|\+{1,3}|#{1,2}|\$\$|[\`~^]|\){2,3})$/
/(?!\|)(?:(?:\d+(?:\.\d+)?|\.\d+)[*+])?(?:[<>^](?:\.[<>^])?|\.[<>^])?[a-z]*(?=\|)/
/(?:^|[^\\])[!|]=*/
/\$(?:(?!\$)[^\\]|\\.)*\$|\`(?:(?!\`)[^\\]|\\.)*\`/
/'(?:[^'\\]|\\.)*'/
/\[(?:[^"\\\]]|"(?:(?!")[^\\]|\\.)*"|'(?:(?!')[^\\]|\\.)*'|\\.)*\]/
/^(?:\[{2,3}.+?\]{2,3}|<<.+?>>)$/
/^\{.+\}$/
/^(?:'[^]+'|_[^]+_)$/
/^\*[^]+\*$/
/^[$\`]|[$\`]$/
/^'|'$/
/^(?:\[{2,3}|<<)|(?:\]{2,3}|>>)$/
/^[!#$%=?@]|!(?=[:}])/
/^\{|\}$|:{1,2}/
/^(?:'{1,2}|_{1,2})|(?:'{1,2}|_{1,2})$/
/^\*{1,2}|\*{1,2}$/
/^\{[-\d+,_a-z]+/
/\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|string|uint|ulong|ushort|var|void|class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)\b/
/(?:\b0(?:X[\dA-F_]*[\dA-F]|B[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:E[-+]?\d+(?:_+\d+)*)?)(?:UL|LU|[DFLMU])?\b/i
/>>=?|<<=?|[-=]>|&&|\+\+|--|\|\||~|\?\?=?|[-!%&*+/<=>|^]=?/
/\?\.?|::|[(),.:;[\]{}]/
/\b(?:namespace|using)\s+@?\b[A-Z_a-z]\w*\b(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b)*(?=\s*[;{])/
/\b(?:default|typeof|sizeof)\s*\(\s*(?:[^\s()]|\s(?!\s*\))|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\))*(?=\s*\))/
/(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?(?=\s+(?:(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/
/\bnew\s+(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?(?=\s*[([{])/
/@?\b[A-Z_]\w*\b\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>(?=\s*\()/i
/\b(?:\b(?:class|enum|interface|struct)\b\s+@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?|where\s+@?\b[A-Z_a-z]\w*\b)\s*:\s*(?:(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?|\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|string|uint|ulong|ushort|var|void|class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)\b)(?:\s*,\s*(?:(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?|\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|string|uint|ulong|ushort|var|void|class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)\b))*(?=\s*(?:where|[;{]|=>|$))/
/^\s*#.*/m
/(?:^|[^\s\w)>?])\s*\[\s*(?:\b(?:assembly|event|field|method|module|param|property|return|type)\b\s*:\s*)?(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*(?:\s*\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\))*\))?(?:\s*,\s*(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*(?:\s*\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\))*\))?)*(?=\s*\])/
/[(,]\s*@?\b[A-Z_]\w*\b(?=\s*:)/i
/<%--[^]*?--%>/
/<SCRIPT(?=.*RUNAT=["']?SERVER["']?)[^]*?>[^]*?(?=<\/SCRIPT>)/i
/<(?!%)\/?[^\s/>]+(?:\s+[^\s/=>]+(?:=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|[^\s"'=>]+))?)*\s*\/?>/
/<%\s*@.*%>/
/<%.*%>/
/(?:^|[^\\])(?:\$@|@\$)"(?:""|\\[^]|\{\{|\{(?!\{)(?:(?![:}])(?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*(?::[^\n\r}]+)?\}|[^"\\{])*"/
/(?:^|[^@\\])\$"(?:\\.|\{\{|\{(?!\{)(?:(?![:}])(?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*(?::[^\n\r}]+)?\}|[^"\\{])*"/
/(?:^|[^$\\])@"(?:""|\\[^]|[^"\\])*"(?!")/
/(?:^|[^$@\\])"(?:\\.|[^\n\r"\\])*"/
/'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'/
/\./
/[(),.:<>?[\]]/
/^@?\b[A-Z_]\w*\b/i
/,/
/[,:]/
/\busing\s+static\s+(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*(?=\s*;)/
/\busing\s+@?\b[A-Z_a-z]\w*\b\s*=\s*(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?(?=\s*;)/
/\busing\s+@?\b[A-Z_a-z]\w*\b(?=\s*=)/
/\b\b(?:class|enum|interface|struct)\b\s+@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?/
/\bcatch\s*\(\s*(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*/
/\bwhere\s+@?\b[A-Z_a-z]\w*\b/
/\b(?:is(?:\s+not)?|as)\s+(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?/
/\b(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?(?=\s+(?!\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|string|uint|ulong|ushort|var|void|class|enum|interface|struct|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*[),:;=\]{]|\s+(?:in|when)(?:(?<!\w)\w|(?<=\w)(?!\w))))/
/<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>/
/(?:\((?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+(?:,(?:[^-%&()*+,/;<=>[\]\^|]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\)|\[\s*(?:,\s*)*\])+)+\)|(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*)(?:\s*(?:\?\s*)?\[\s*(?:,\s*)*\])*(?:\s*\?)?/
/\s*#\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/
/^\b(?:assembly|event|field|method|module|param|property|return|type)\b(?=\s*:)/
/\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\))*\)/
/(?!\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|descending|from|get|global|group|into|join|let|nameof|not|notnull|on|or|orderby|partial|remove|select|set|unmanaged|value|when|where|where|abstract|as|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?(?:\s*\.\s*@?\b[A-Z_a-z]\w*\b(?:\s*<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<(?:[^-%&*+/;<=>|^]|<[^-%&*+/;<=>|^]*>)*>)*>)*>)?)*/
/<%\s*@\s*(?:ASSEMBLY|CONTROL|IMPLEMENTS|IMPORT|MASTER(?:TYPE)?|OUTPUTCACHE|PAGE|PREVIOUSPAGETYPE|REFERENCE|REGISTER)?|%>/i
/<%\s*?[#$%:=]{0,2}|%>/
/(?:^|[^{])(?:\{\{)*\{(?!\{)(?:(?![:}])(?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*(?::[^\n\r}]+)?\}/
/(?:^|[^{])(?:\{\{)*\{(?!\{)(?:(?![:}])(?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*(?::[^\n\r}]+)?\}/
/^\{|\}$/
/^\{(?:(?![:}])(?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?![*/])|\/\/[^\n\r]*[\n\r]|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*:[^\n\r}]+(?=\}$)/
/^\{(?:(?![:}])(?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\((?:[^"'()/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\.|[^\n\r"\\])*"|'(?:[^\n\r'\\]|\\.|\\[Uux][\dA-Fa-f]{1,8})'|\(\))*\))*\))*\)))*:[^\n\r}]+(?=\}$)/
/^:/
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'|\`(?:\\.|(?!\`)[^\n\r\\])*\`/
/\.\w+(?= )/
/\b(?:adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cpx|cpy|dec|dex|dey|eor|inc|inx|iny|jmp|jsr|lda|ldx|ldy|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|sec|sed|sei|sta|stx|sty|tax|tay|tsx|txa|txs|tya|ADC|AND|ASL|BCC|BCS|BEQ|BIT|BMI|BNE|BPL|BRK|BVC|BVS|CLC|CLD|CLI|CLV|CMP|CPX|CPY|DEC|DEX|DEY|EOR|INC|INX|INY|JMP|JSR|LDA|LDX|LDY|LSR|NOP|ORA|PHA|PHP|PLA|PLP|ROL|ROR|RTI|RTS|SBC|SEC|SED|SEI|STA|STX|STY|TAX|TAY|TSX|TXA|TXS|TYA)\b/
/#?\$[\dA-F]{2,4}\b/i
/#?%[01]+\b/
/#?\b\d+\b/
/\b[AXY]\b/i
/"(?:[^\n\r"]|"")*"/
/^[\t ]*[^\s:]+?(?=:(?:[^:]|$))/m
/%\w+%/
/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/
/\?|\/{1,2}=?|:=|\|[=|]?|&[&=]?|\+[+=]?|-[-=]?|\*[*=]?|<(?:<=?|>|=)?|>{1,2}=?|[!.=~^]=?|\b(?:AND|NOT|OR)\b/
/\b(?:AUTOTRIM|BLOCKINPUT|BREAK|CLICK|CLIPWAIT|CONTINUE|CONTROL|CONTROLCLICK|CONTROLFOCUS|CONTROLGET|CONTROLGETFOCUS|CONTROLGETPOS|CONTROLGETTEXT|CONTROLMOVE|CONTROLSEND|CONTROLSENDRAW|CONTROLSETTEXT|COORDMODE|CRITICAL|DETECTHIDDENTEXT|DETECTHIDDENWINDOWS|DRIVE|DRIVEGET|DRIVESPACEFREE|ENVADD|ENVDIV|ENVGET|ENVMULT|ENVSET|ENVSUB|ENVUPDATE|EXIT|EXITAPP|FILEAPPEND|FILECOPY|FILECOPYDIR|FILECREATEDIR|FILECREATESHORTCUT|FILEDELETE|FILEENCODING|FILEGETATTRIB|FILEGETSHORTCUT|FILEGETSIZE|FILEGETTIME|FILEGETVERSION|FILEINSTALL|FILEMOVE|FILEMOVEDIR|FILEREAD|FILEREADLINE|FILERECYCLE|FILERECYCLEEMPTY|FILEREMOVEDIR|FILESELECTFILE|FILESELECTFOLDER|FILESETATTRIB|FILESETTIME|FORMATTIME|GETKEYSTATE|GOSUB|GOTO|GROUPACTIVATE|GROUPADD|GROUPCLOSE|GROUPDEACTIVATE|GUI|GUICONTROL|GUICONTROLGET|HOTKEY|IMAGESEARCH|INIDELETE|INIREAD|INIWRITE|INPUT|INPUTBOX|KEYWAIT|LISTHOTKEYS|LISTLINES|LISTVARS|LOOP|MENU|MOUSECLICK|MOUSECLICKDRAG|MOUSEGETPOS|MOUSEMOVE|MSGBOX|ONEXIT|OUTPUTDEBUG|PAUSE|PIXELGETCOLOR|PIXELSEARCH|POSTMESSAGE|PROCESS|PROGRESS|RANDOM|REGDELETE|REGREAD|REGWRITE|RELOAD|REPEAT|RETURN|RUN|RUNAS|RUNWAIT|SEND|SENDEVENT|SENDINPUT|SENDMESSAGE|SENDMODE|SENDPLAY|SENDRAW|SETBATCHLINES|SETCAPSLOCKSTATE|SETCONTROLDELAY|SETDEFAULTMOUSESPEED|SETENV|SETFORMAT|SETKEYDELAY|SETMOUSEDELAY|SETNUMLOCKSTATE|SETREGVIEW|SETSCROLLLOCKSTATE|SETSTORECAPSLOCKMODE|SETTIMER|SETTITLEMATCHMODE|SETWINDELAY|SETWORKINGDIR|SHUTDOWN|SLEEP|SORT|SOUNDBEEP|SOUNDGET|SOUNDGETWAVEVOLUME|SOUNDPLAY|SOUNDSET|SOUNDSETWAVEVOLUME|SPLASHIMAGE|SPLASHTEXTOFF|SPLASHTEXTON|SPLITPATH|STATUSBARGETTEXT|STATUSBARWAIT|STRINGCASESENSE|STRINGGETPOS|STRINGLEFT|STRINGLEN|STRINGLOWER|STRINGMID|STRINGREPLACE|STRINGRIGHT|STRINGSPLIT|STRINGTRIMLEFT|STRINGTRIMRIGHT|STRINGUPPER|SUSPEND|SYSGET|THREAD|TOOLTIP|TRANSFORM|TRAYTIP|URLDOWNLOADTOFILE|WINACTIVATE|WINACTIVATEBOTTOM|WINCLOSE|WINGET|WINGETACTIVESTATS|WINGETACTIVETITLE|WINGETCLASS|WINGETPOS|WINGETTEXT|WINGETTITLE|WINHIDE|WINKILL|WINMAXIMIZE|WINMENUSELECTITEM|WINMINIMIZE|WINMINIMIZEALL|WINMINIMIZEALLUNDO|WINMOVE|WINRESTORE|WINSET|WINSETTITLE|WINSHOW|WINWAIT|WINWAITACTIVE|WINWAITCLOSE|WINWAITNOTACTIVE)\b/i
/\b(?:A_AHKPATH|A_AHKVERSION|A_APPDATA|A_APPDATACOMMON|A_AUTOTRIM|A_BATCHLINES|A_CARETX|A_CARETY|A_COMPUTERNAME|A_CONTROLDELAY|A_CURSOR|A_DD|A_DDD|A_DDDD|A_DEFAULTMOUSESPEED|A_DESKTOP|A_DESKTOPCOMMON|A_DETECTHIDDENTEXT|A_DETECTHIDDENWINDOWS|A_ENDCHAR|A_EVENTINFO|A_EXITREASON|A_FILEENCODING|A_FORMATFLOAT|A_FORMATINTEGER|A_GUI|A_GUIEVENT|A_GUICONTROL|A_GUICONTROLEVENT|A_GUIHEIGHT|A_GUIWIDTH|A_GUIX|A_GUIY|A_HOUR|A_ICONFILE|A_ICONHIDDEN|A_ICONNUMBER|A_ICONTIP|A_INDEX|A_IPADDRESS1|A_IPADDRESS2|A_IPADDRESS3|A_IPADDRESS4|A_IS64BITOS|A_ISADMIN|A_ISCOMPILED|A_ISCRITICAL|A_ISPAUSED|A_ISSUSPENDED|A_ISUNICODE|A_KEYDELAY|A_LANGUAGE|A_LASTERROR|A_LINEFILE|A_LINENUMBER|A_LOOPFIELD|A_LOOPFILEATTRIB|A_LOOPFILEDIR|A_LOOPFILEEXT|A_LOOPFILEFULLPATH|A_LOOPFILELONGPATH|A_LOOPFILENAME|A_LOOPFILESHORTNAME|A_LOOPFILESHORTPATH|A_LOOPFILESIZE|A_LOOPFILESIZEKB|A_LOOPFILESIZEMB|A_LOOPFILETIMEACCESSED|A_LOOPFILETIMECREATED|A_LOOPFILETIMEMODIFIED|A_LOOPREADLINE|A_LOOPREGKEY|A_LOOPREGNAME|A_LOOPREGSUBKEY|A_LOOPREGTIMEMODIFIED|A_LOOPREGTYPE|A_MDAY|A_MIN|A_MM|A_MMM|A_MMMM|A_MON|A_MOUSEDELAY|A_MSEC|A_MYDOCUMENTS|A_NOW|A_NOWUTC|A_NUMBATCHLINES|A_OSTYPE|A_OSVERSION|A_PRIORHOTKEY|A_PRIORKEY|PROGRAMFILES|A_PROGRAMFILES|A_PROGRAMS|A_PROGRAMSCOMMON|A_PTRSIZE|A_REGVIEW|A_SCREENDPI|A_SCREENHEIGHT|A_SCREENWIDTH|A_SCRIPTDIR|A_SCRIPTFULLPATH|A_SCRIPTHWND|A_SCRIPTNAME|A_SEC|A_SPACE|A_STARTMENU|A_STARTMENUCOMMON|A_STARTUP|A_STARTUPCOMMON|A_STRINGCASESENSE|A_TAB|A_TEMP|A_THISFUNC|A_THISHOTKEY|A_THISLABEL|A_THISMENU|A_THISMENUITEM|A_THISMENUITEMPOS|A_TICKCOUNT|A_TIMEIDLE|A_TIMEIDLEPHYSICAL|A_TIMESINCEPRIORHOTKEY|A_TIMESINCETHISHOTKEY|A_TITLEMATCHMODE|A_TITLEMATCHMODESPEED|A_USERNAME|A_WDAY|A_WINDELAY|A_WINDIR|A_WORKINGDIR|A_YDAY|A_YEAR|A_YWEEK|A_YYYY|CLIPBOARD|CLIPBOARDALL|COMSPEC|ERRORLEVEL)\b/i
/\b(?:ABS|ACOS|ASC|ASIN|ATAN|CEIL|CHR|CLASS|COMOBJACTIVE|COMOBJARRAY|COMOBJCONNECT|COMOBJCREATE|COMOBJERROR|COMOBJFLAGS|COMOBJGET|COMOBJQUERY|COMOBJTYPE|COMOBJVALUE|COS|DLLCALL|EXP|FILEEXIST|FILEOPEN|FLOOR|FORMAT|IL_ADD|IL_CREATE|IL_DESTROY|INSTR|SUBSTR|ISFUNC|ISLABEL|ISOBJECT|LN|LOG|LV_ADD|LV_DELETE|LV_DELETECOL|LV_GETCOUNT|LV_GETNEXT|LV_GETTEXT|LV_INSERT|LV_INSERTCOL|LV_MODIFY|LV_MODIFYCOL|LV_SETIMAGELIST|LTRIM|RTRIM|MOD|ONMESSAGE|NUMGET|NUMPUT|REGISTERCALLBACK|REGEXMATCH|REGEXREPLACE|ROUND|SIN|TAN|SQRT|STRLEN|STRREPLACE|SB_SETICON|SB_SETPARTS|SB_SETTEXT|STRSPLIT|TV_ADD|TV_DELETE|TV_GETCHILD|TV_GETCOUNT|TV_GETNEXT|TV_GET|TV_GETPARENT|TV_GETPREV|TV_GETSELECTION|TV_GETTEXT|TV_MODIFY|VARSETCAPACITY|WINACTIVE|WINEXIST|__NEW|__CALL|__GET|__SET)\b/i
/\b(?:ALT|ALTDOWN|ALTUP|APPSKEY|BACKSPACE|BROWSER_BACK|BROWSER_FAVORITES|BROWSER_FORWARD|BROWSER_HOME|BROWSER_REFRESH|BROWSER_SEARCH|BROWSER_STOP|BS|CAPSLOCK|CTRL|CTRLBREAK|CTRLDOWN|CTRLUP|DEL|DELETE|DOWN|END|ENTER|ESC|ESCAPE|F1|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F2|F20|F21|F22|F23|F24|F3|F4|F5|F6|F7|F8|F9|HOME|INS|INSERT|JOY1|JOY10|JOY11|JOY12|JOY13|JOY14|JOY15|JOY16|JOY17|JOY18|JOY19|JOY2|JOY20|JOY21|JOY22|JOY23|JOY24|JOY25|JOY26|JOY27|JOY28|JOY29|JOY3|JOY30|JOY31|JOY32|JOY4|JOY5|JOY6|JOY7|JOY8|JOY9|JOYAXES|JOYBUTTONS|JOYINFO|JOYNAME|JOYPOV|JOYR|JOYU|JOYV|JOYX|JOYY|JOYZ|LALT|LAUNCH_APP1|LAUNCH_APP2|LAUNCH_MAIL|LAUNCH_MEDIA|LBUTTON|LCONTROL|LCTRL|LEFT|LSHIFT|LWIN|LWINDOWN|LWINUP|MBUTTON|MEDIA_NEXT|MEDIA_PLAY_PAUSE|MEDIA_PREV|MEDIA_STOP|NUMLOCK|NUMPAD0|NUMPAD1|NUMPAD2|NUMPAD3|NUMPAD4|NUMPAD5|NUMPAD6|NUMPAD7|NUMPAD8|NUMPAD9|NUMPADADD|NUMPADCLEAR|NUMPADDEL|NUMPADDIV|NUMPADDOT|NUMPADDOWN|NUMPADEND|NUMPADENTER|NUMPADHOME|NUMPADINS|NUMPADLEFT|NUMPADMULT|NUMPADPGDN|NUMPADPGUP|NUMPADRIGHT|NUMPADSUB|NUMPADUP|PGDN|PGUP|PRINTSCREEN|RALT|RBUTTON|RCONTROL|RCTRL|RIGHT|RSHIFT|RWIN|RWINDOWN|RWINUP|SCROLLLOCK|SHIFT|SHIFTDOWN|SHIFTUP|SPACE|TAB|UP|VOLUME_DOWN|VOLUME_MUTE|VOLUME_UP|WHEELDOWN|WHEELLEFT|WHEELRIGHT|WHEELUP|XBUTTON1|XBUTTON2)\b/i
/#\b(?:ALLOWSAMELINECOMMENTS|CLIPBOARDTIMEOUT|COMMENTFLAG|DEREFCHAR|ERRORSTDOUT|ESCAPECHAR|HOTKEYINTERVAL|HOTKEYMODIFIERTIMEOUT|HOTSTRING|IF|IFTIMEOUT|IFWINACTIVE|IFWINEXIST|IFWINNOTACTIVE|IFWINNOTEXIST|INCLUDE|INCLUDEAGAIN|INPUTLEVEL|INSTALLKEYBDHOOK|INSTALLMOUSEHOOK|KEYHISTORY|MAXHOTKEYSPERINTERVAL|MAXMEM|MAXTHREADS|MAXTHREADSBUFFER|MAXTHREADSPERHOTKEY|MENUMASKKEY|NOENV|NOTRAYICON|PERSISTENT|SINGLEINSTANCE|USEHOOK|WARN|WINACTIVATEFORCE)\b/i
/\b(?:ABORT|ABOVENORMAL|ADD|AHK_CLASS|AHK_EXE|AHK_GROUP|AHK_ID|AHK_PID|ALL|ALNUM|ALPHA|ALTSUBMIT|ALTTAB|ALTTABANDMENU|ALTTABMENU|ALTTABMENUDISMISS|ALWAYSONTOP|AUTOSIZE|BACKGROUND|BACKGROUNDTRANS|BELOWNORMAL|BETWEEN|BITAND|BITNOT|BITOR|BITSHIFTLEFT|BITSHIFTRIGHT|BITXOR|BOLD|BORDER|BUTTON|BYREF|CHECKBOX|CHECKED|CHECKEDGRAY|CHOOSE|CHOOSESTRING|CLOSE|COLOR|COMBOBOX|CONTAINS|CONTROLLIST|COUNT|DATE|DATETIME|DAYS|DDL|DEFAULT|DELETEALL|DELIMITER|DEREF|DESTROY|DIGIT|DISABLE|DISABLED|DROPDOWNLIST|EDIT|EJECT|ELSE|ENABLE|ENABLED|ERROR|EXIST|EXPAND|EXSTYLE|FILESYSTEM|FIRST|FLASH|FLOAT|FLOATFAST|FOCUS|FONT|FOR|GLOBAL|GRID|GROUP|GROUPBOX|GUICLOSE|GUICONTEXTMENU|GUIDROPFILES|GUIESCAPE|GUISIZE|HDR|HIDDEN|HIDE|HIGH|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|HOURS|HSCROLL|ICON|ICONSMALL|ID|IDLAST|IF|IFEQUAL|IFEXIST|IFGREATER|IFGREATEROREQUAL|IFINSTRING|IFLESS|IFLESSOREQUAL|IFMSGBOX|IFNOTEQUAL|IFNOTEXIST|IFNOTINSTRING|IFWINACTIVE|IFWINEXIST|IFWINNOTACTIVE|IFWINNOTEXIST|IGNORE|IMAGELIST|IN|INTEGER|INTEGERFAST|INTERRUPT|IS|ITALIC|JOIN|LABEL|LASTFOUND|LASTFOUNDEXIST|LIMIT|LINES|LIST|LISTBOX|LISTVIEW|LOCAL|LOCK|LOGOFF|LOW|LOWER|LOWERCASE|MAINWINDOW|MARGIN|MAXIMIZE|MAXIMIZEBOX|MAXSIZE|MINIMIZE|MINIMIZEBOX|MINMAX|MINSIZE|MINUTES|MONTHCAL|MOUSE|MOVE|MULTI|NA|NO|NOACTIVATE|NODEFAULT|NOHIDE|NOICON|NOMAINWINDOW|NORM|NORMAL|NOSORT|NOSORTHDR|NOSTANDARD|NOT|NOTAB|NOTIMERS|NUMBER|OFF|OK|ON|OWNDIALOGS|OWNER|PARSE|PASSWORD|PICTURE|PIXEL|POS|POW|PRIORITY|PROCESSNAME|RADIO|RANGE|READ|READONLY|REALTIME|REDRAW|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|REGION|RELATIVE|RENAME|REPORT|RESIZE|RESTORE|RETRY|RGB|SCREEN|SECONDS|SECTION|SERIAL|SETLABEL|SHIFTALTTAB|SHOW|SINGLE|SLIDER|SORTDESC|STANDARD|STATIC|STATUS|STATUSBAR|STATUSCD|STRIKE|STYLE|SUBMIT|SYSMENU|TAB2|TABSTOP|TEXT|THEME|TILE|TOGGLECHECK|TOGGLEENABLE|TOOLWINDOW|TOP|TOPMOST|TRANSCOLOR|TRANSPARENT|TRAY|TREEVIEW|TRYAGAIN|THROW|TRY|CATCH|FINALLY|TYPE|UNCHECK|UNDERLINE|UNICODE|UNLOCK|UNTIL|UPDOWN|UPPER|UPPERCASE|USEERRORLEVEL|VIS|VISFIRST|VISIBLE|VSCROLL|WAIT|WAITCLOSE|WANTCTRLA|WANTF2|WANTRETURN|WHILE|WRAP|XDIGIT|XM|XP|XS|YES|YM|YP|YS)\b/i
/[^-\t\n %&()*+,/:;<=>?[\\\]]+?(?=\()/
/[(),:[\]{}]/
/(?:^|\s);.*/
/^\s*\/\*[^\n\r]*(?:[\n\r](?![\t ]*\*\/)|[^\n\r])*(?:[\n\r][\t ]*\*\/)?/m
/\b\w+(?=\()/
/[$@]\w+/
/\b(?:CASE|CONST|CONTINUE(?:CASE|LOOP)|DEFAULT|DIM|DO|ELSE(?:IF)?|END(?:FUNC|IF|SELECT|SWITCH|WITH)|ENUM|EXIT(?:LOOP)?|FOR|FUNC|GLOBAL|IF|IN|LOCAL|NEXT|NULL|REDIM|SELECT|STATIC|STEP|SWITCH|THEN|TO|UNTIL|VOLATILE|WEND|WHILE|WITH)\b/i
/\b(?:0X[\dA-F]+|\d+(?:\.\d+)?(?:E[-+]?\d+)?)\b/i
/\b(?:TRUE|FALSE)\b/i
/<[=>]?|[-&*+/=>]=?|[?^]|\b(?:AND|OR|NOT)\b/i
/[(),.:[\]]/
/^\s*#include\s+(?:<[^\n\r>]+>|"[^\n\r"]+")/m
/"(?:""|(?!")[^\n\r])*"|'(?:''|(?!')[^\n\r])*'/
/^\s*#\w+/m
/^\s*#(?:comments-start|cs)[^]*?^\s*#(?:comments-end|ce)/m
/\$\w+\$|%\w+%|@\w+@/
/\$?\({1,2}|\){1,2}|\.\.|[;[\\\]{}]/
/^#!\s*\/.*/
/(?:^|[^"$\\{])#.*/
/\b(?:for|select)\s+\w+(?=\s+in\s)/
/(?:^|[\s&;|]|[<>]\()\w+(?=\+?=)/
/\$?\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/
/\$(?:\w+|[!#$*?@])/
/(?:^|[\s&;|]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[\s&);|])/
/(?:^|[\s&;|]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[\s&);|])/
/(?:^|[\s&;|]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[\s&);|])/
/(?:^|[\s&;|]|[<>]\()(?:true|false)(?=$|[\s&);|])/
/\B&\d\b/
/\d?<>|>\||\+=|={1,2}|!=?|=~|<<[-<]?|[\d&]?>>|\d?[<>]&?|&[&>]?|\|[&|]?|<=?|>=?/
/(?:^|\s)(?:[1-9]\d*|0)(?:[,.]\d+)?\b/
/\bfunction\s+\w+(?=(?:\s*\(?:\s*\))?\s*\{)/
/\b\w+(?=\s*\(\s*\)\s*\{)/
/(?:^|[^<])<<-?\s*\w+?\s*(?:\r?\n|\r)[^]*?(?:\r?\n|\r)[]Unknown:\\2[]/
/(?:^|[^<])<<-?\s*(?:"\w+"\s*(?:\r?\n|\r)[^]*?(?:\r?\n|\r)[]Unknown:\\3[]|'\w+'\s*(?:\r?\n|\r)[^]*?(?:\r?\n|\r)[]Unknown:\\3[])/
/(?:^|[^\\](?:\\\\)*)(?:"(?:\\[^]|\$\([^)]+\)|\`[^\`]+\`|(?!")[^\\])*"|'(?:\\[^]|\$\([^)]+\)|\`[^\`]+\`|(?!')[^\\])*')/
/\$?\(\([^]+?\)\)/
/\$\((?:\([^)]+\)|[^()])+\)|\`[^\`]+\`/
/\$\{[^}]+\}/
/(?:^|[\s&;|]|[<>]\()\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/
/\\(?:["E\\abcefnrtv]|O?[0-7]{1,3}|x[\dA-Fa-f]{1,2}|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/
/-{1,2}|-=|\+{1,2}|\+=|!=?|~|\*{1,2}|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|={1,2}|&{1,2}|&=|\^=?|\|{1,2}|\|=|\?|:/
/\({1,2}|\){1,2}|,|;/
/^\$\(|^\`|\)$|\`$/
/:[-+=?]?|[!/]|#{1,2}|%{1,2}|\^{1,2}|,{1,2}/
/^\d/
/\$\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/
/^\$\(\(/
/\{\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\b/
/^\$\(\([^]+\)\)/
/(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?/i
/\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/<[=>]?|>=?|[-&*+/=^]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i
/[(),:;]/
/(?:!|REM\b).+/i
/"(?:""|[ !\x23-\x3fA-Z_a-z^])*"/
/^REM/i
/[&@]/
/['()]/
/^::.*/m
/^:.*/m
/(?:^|[&(])[\t ]*REM\b(?:[^\n\r&)^]|\^(?:\r\n|[^]))*/im
/(?:^|[&(])[\t ]*FOR(?: ?\/[?A-Z](?:[ :](?:"[^"]*"|\S+))?)* \S+ IN \([^)]+\) DO/im
/(?:^|[&(])[\t ]*IF(?: ?\/[?A-Z](?:[ :](?:"[^"]*"|\S+))?)* (?:NOT )?(?:CMDEXTVERSION \d+|DEFINED \w+|ERRORLEVEL \d+|EXIST \S+|(?:"[^"]*"|\S+)?(?:==| (?:EQU|NEQ|LSS|LEQ|GTR|GEQ) )(?:"[^"]*"|\S+))/im
/(?:^|[&()])[\t ]*ELSE\b/im
/(?:^|[&(])[\t ]*SET(?: ?\/[A-Z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^\n\r&)^]|\^(?:\r\n|[^]))*/im
/(?:^|[&(])[\t ]*@?\w+\b(?:"(?:["\\]"|[^"])*"(?!")|[^\n\r"&)^]|\^(?:\r\n|[^]))*/m
/^FOR\b|\b(?:IN|DO)\b/i
/"(?:["\\]"|[^"])*"(?!")/
/%{1,2}[\w:~]+%?|!\S+!/
/(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|-)\d+\b/
/['(),]/
/^IF\b|\b(?:NOT|CMDEXTVERSION|DEFINED|ERRORLEVEL|EXIST)\b/i
/\^|==|\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\b/i
/^ELSE\b/i
/^SET\b/i
/[-%&*+/|^]=?|<<=?|>>=?|[!=_~]/
/^\w+\b/
/\^/
/\/[?A-Z]+(?=[ :]|$):?|-[A-Z]\b|--[-A-Z]+\b/im
/\w+(?=(?:[-%&*+/|^]|<<|>>)?=)/
/^\s*:\S+/m
/\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=\]]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=\]]+))*\s*\]/
/\]/
/[^\s=\]]+/
/^\[\/?[^\s=\]]+/
/=\s*(?:"[^"]*"|'[^']*'|[^\s"'=\]]+)/
/^\[\/?/
/^\s*["']|["']$/
/^[^]*?%%[^]*?%%/
/\S+(?=:)/
/%\w+/
/%[%?]|[:;<>[\]|]/
/%\{[^]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/
/(?:^|[^@])\b(?:0X[\dA-F]+|\d+)/i
/^%?\{|%?\}$/
/[$@](?:<[^\s>]+>)?[\w$]+/
/::=|[()*+?[\]{|}]|\.{3}/
/"[^\n\r"]*"|'[^\n\r']*'/
/<[^\t\n\r<>]+>(?=\s*::=)/
/<[^\t\n\r<>]+>/
/^<|>$/
/[,.]/
/\S+/
/\+/
/-/
/\[|\]/
/(?:\bREM|').*/i
/\b(?:AS|DIM|EACH|ELSE|ELSEIF|END|EXIT|FOR|FUNCTION|GOTO|IF|IN|PRINT|RETURN|STEP|STOP|SUB|THEN|TO|WHILE)\b/i
/\b(?!\d)\w+(?=[\t ]*\()/
/(?:\b\d+(?:\.\d+)?(?:[DE][-+]\d+)?|&H[\dA-F]+)\b[!#%&]?/i
/--|\+\+|>>=?|<<=?|<>|[-*+/<>\\]=?|[:=?^]|\b(?:AND|MOD|NOT|OR)\b/i
/[(),.;[\]{}]/
/\bLINE_NUM\b/i
/^[\t ]*#(?:CONST|ELSE(?:[\t ]+IF)?|END[\t ]+IF|ERROR|IF).*/im
/[\n\r,{][\t ]*(?:(?!\d)\w+|"(?:[^\n\r"]|"")*"(?!"))(?=[\t ]*:)/
/"(?:[^\n\r"]|"")*"(?!")/
/\bAS[\t ]+\w+/i
/^#error.+/
/^#(?:const|else(?:[\t ]+if)?|end[\t ]+if|error|if)/
/\b[FT]\b/
/@(?:load(?:-(?:sigs|plugin))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME)|&?(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|group|error_handler|type_column)/
/\b(?:break|next|continue|alarm|using|of|add|delete|export|print|return|schedule|when|timeout|addr|any|bool|count|double|enum|file|int|interval|pattern|opaque|port|record|set|string|subnet|table|time|vector|for|if|else|in|module|function)\b/
/-{1,2}|\+{1,2}|!=?=?|<=?|>=?|={1,2}=?|&&|\|{1,2}|\?|\*|\/|~|\^|%/
/(?:^|[^$\\])#.*/
/(?:function|hook|event) \w+(?:::\w+)?/
/(?:GLOBAL|LOCAL) \w+/i
/CONST \w+/i
/\b(?:TODO|FIXME|XXX)\b/
/^(?:function|hook|event)/
/global|local/
/const/
/\/\/.*/
/\[[\w.]+\]/
/\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|catch|char|cil|class|currency|date|decimal|default|enum|error|explicit|extends|extern|famandassem|family|famorassem|final(?:ly)?|float32|float64|hidebysig|iant|idispatch|implements|import|initonly|instance|u?int(?:8|16|32|64)?|interface|iunknown|literal|lpstr|lpstruct|lptstr|lpwstr|managed|method|native(?:Type)?|nested|newslot|object(?:ref)?|pinvokeimpl|private|privatescope|public|reqsecobj|rtspecialname|runtime|sealed|sequential|serializable|specialname|static|string|struct|syschar|tbstr|unicode|unmanagedexp|unsigned|value(?:type)?|variant|virtual|void)\b/
/\b(?:(?:constrained|unaligned|volatile|readonly|tail|no)\.)?(?:conv\.(?:[iu][1248]?|ovf\.[iu][1248]?(?:\.un)?|r\.un|r4|r8)|ldc\.(?:i4(?:\.\d+|\.[Mm]1|\.s)?|i8|r4|r8)|ldelem(?:\.[iu][1248]?|\.r[48]|\.ref|a)?|ldind\.(?:[iu][1248]?|r[48]|ref)|stelem\.?(?:i[1248]?|r[48]|ref)?|stind\.(?:i[1248]?|r[48]|ref)?|end(?:fault|filter|finally)|ldarg(?:\.[0-3s]|a(?:\.s)?)?|ldloc(?:\.\d+|\.s)?|sub(?:\.ovf(?:\.un)?)?|mul(?:\.ovf(?:\.un)?)?|add(?:\.ovf(?:\.un)?)?|stloc(?:\.[0-3s])?|refany(?:type|val)|blt(?:\.un)?(?:\.s)?|ble(?:\.un)?(?:\.s)?|bgt(?:\.un)?(?:\.s)?|bge(?:\.un)?(?:\.s)?|unbox(?:\.any)?|init(?:blk|obj)|call(?:i|virt)?|brfalse(?:\.s)?|bne\.un(?:\.s)?|ldloca(?:\.s)?|brzero(?:\.s)?|brtrue(?:\.s)?|brnull(?:\.s)?|brinst(?:\.s)?|starg(?:\.s)?|leave(?:\.s)?|shr(?:\.un)?|rem(?:\.un)?|div(?:\.un)?|clt(?:\.un)?|alignment|ldvirtftn|castclass|beq(?:\.s)?|mkrefany|localloc|ckfinite|rethrow|ldtoken|ldsflda|cgt\.un|arglist|switch|stsfld|sizeof|newobj|newarr|ldsfld|ldnull|ldflda|isinst|throw|stobj|stloc|stfld|ldstr|ldobj|ldlen|ldftn|ldfld|cpobj|cpblk|break|br\.s|xor|shl|ret|pop|not|nop|neg|jmp|dup|clt|cgt|ceq|box|and|or|br)\b/
/\b-?(?:0X[\dA-F]+|\d+)(?:\.[\dA-F]+)?\b/i
/[(),:;=[\]{}]|IL_[\dA-Za-z]+/
/(?:^|\W)\.[a-z]+(?=\s)/
/(?:::|[':|])\b[A-Z][-\w!*+?]*\b/i
/\b(?:true|false|nil)\b/
/\b[\dA-F]+\b/i
/[(),[\]{}]/
/[^-\w'*+?](?:def|if|do|let|\.\.|quote|var|->>|->|fn|loop|recur|throw|try|monitor-enter|\.|new|set!|def-|defn|defn-|defmacro|defmulti|defmethod|defstruct|defonce|declare|definline|definterface|defprotocol|==|defrecord|>=|deftype|<=|defproject|ns|\*|\+|-|\/|<|=|>|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|conj|cons|constantly|cond|if-not|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|deref|difference|disj|dissoc|distinct|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|for|fnseq|frest|gensym|get-proxy-class|get|hash-map|hash-set|identical\?|identity|if-let|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|line-seq|list\*|list|load|load-file|locking|long|loop|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|name|namespace|neg\?|new|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|time|to-array|to-array-2d|tree-seq|true\?|union|up|update-proxy|val|vals|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[^-\w'*+?])/
/\b(?:CMAKE_\w+|\w+_(?:VERSION(?:_MAJOR|_MINOR|_PATCH|_TWEAK)?|(?:BINARY|SOURCE)_DIR|DESCRIPTION|HOMEPAGE_URL|ROOT)|CTEST_CUSTOM_(?:MAXIMUM_(?:(?:FAIL|PASS)ED_TEST_OUTPUT_SIZE|NUMBER_OF_(?:ERROR|WARNING)S)|ERROR_(?:P(?:OST|RE)_CONTEXT|EXCEPTION|MATCH)|P(?:OST|RE)_MEMCHECK|WARNING_(?:EXCEPTION|MATCH)|(?:MEMCHECK|TESTS)_IGNORE|P(?:OST|RE)_TEST|COVERAGE_EXCLUDE)|ANDROID|APPLE|BORLAND|BUILD_SHARED_LIBS|CACHE|CPACK_(?:ABSOLUTE_DESTINATION_FILES|COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY|ERROR_ON_ABSOLUTE_INSTALL_DESTINATION|INCLUDE_TOPLEVEL_DIRECTORY|INSTALL_DEFAULT_DIRECTORY_PERMISSIONS|INSTALL_SCRIPT|PACKAGING_INSTALL_PREFIX|SET_DESTDIR|WARN_ON_ABSOLUTE_INSTALL_DESTINATION)|CTEST_(?:BINARY_DIRECTORY|BUILD_COMMAND|BUILD_NAME|BZR_COMMAND|BZR_UPDATE_OPTIONS|CHANGE_ID|CHECKOUT_COMMAND|CONFIGURATION_TYPE|CONFIGURE_COMMAND|COVERAGE_COMMAND|COVERAGE_EXTRA_FLAGS|CURL_OPTIONS|CUSTOM_(?:COVERAGE_EXCLUDE|ERROR_EXCEPTION|ERROR_MATCH|ERROR_POST_CONTEXT|ERROR_PRE_CONTEXT|MAXIMUM_FAILED_TEST_OUTPUT_SIZE|MAXIMUM_NUMBER_OF_(?:ERRORS|WARNINGS)|MAXIMUM_PASSED_TEST_OUTPUT_SIZE|MEMCHECK_IGNORE|POST_MEMCHECK|POST_TEST|PRE_MEMCHECK|PRE_TEST|TESTS_IGNORE|WARNING_EXCEPTION|WARNING_MATCH)|CVS_CHECKOUT|CVS_COMMAND|CVS_UPDATE_OPTIONS|DROP_LOCATION|DROP_METHOD|DROP_SITE|DROP_SITE_CDASH|DROP_SITE_PASSWORD|DROP_SITE_USER|EXTRA_COVERAGE_GLOB|GIT_COMMAND|GIT_INIT_SUBMODULES|GIT_UPDATE_CUSTOM|GIT_UPDATE_OPTIONS|HG_COMMAND|HG_UPDATE_OPTIONS|LABELS_FOR_SUBPROJECTS|MEMORYCHECK_(?:COMMAND|COMMAND_OPTIONS|SANITIZER_OPTIONS|SUPPRESSIONS_FILE|TYPE)|NIGHTLY_START_TIME|P4_CLIENT|P4_COMMAND|P4_OPTIONS|P4_UPDATE_OPTIONS|RUN_CURRENT_SCRIPT|SCP_COMMAND|SITE|SOURCE_DIRECTORY|SUBMIT_URL|SVN_COMMAND|SVN_OPTIONS|SVN_UPDATE_OPTIONS|TEST_LOAD|TEST_TIMEOUT|TRIGGER_SITE|UPDATE_COMMAND|UPDATE_OPTIONS|UPDATE_VERSION_ONLY|USE_LAUNCHERS)|CYGWIN|ENV|EXECUTABLE_OUTPUT_PATH|GHS-MULTI|IOS|LIBRARY_OUTPUT_PATH|MINGW|MSVC(?:10|11|12|14|60|70|71|80|90|_IDE|_TOOLSET_VERSION|_VERSION)?|MSYS|PROJECT_(?:BINARY_DIR|DESCRIPTION|HOMEPAGE_URL|NAME|SOURCE_DIR|VERSION|VERSION_(?:MAJOR|MINOR|PATCH|TWEAK))|UNIX|WIN32|WINCE|WINDOWS_PHONE|WINDOWS_STORE|XCODE|XCODE_VERSION)\b/
/\b(?:cxx_\w+|(?:ARCHIVE_OUTPUT_(?:DIRECTORY|NAME)|COMPILE_DEFINITIONS|COMPILE_PDB_NAME|COMPILE_PDB_OUTPUT_DIRECTORY|EXCLUDE_FROM_DEFAULT_BUILD|IMPORTED_(?:IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_LANGUAGES|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|NO_SONAME|OBJECTS|SONAME)|INTERPROCEDURAL_OPTIMIZATION|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|MAP_IMPORTED_CONFIG|OSX_ARCHITECTURES|OUTPUT_NAME|PDB_NAME|PDB_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|STATIC_LIBRARY_FLAGS|VS_CSHARP|VS_DOTNET_REFERENCEPROP|VS_DOTNET_REFERENCE|VS_GLOBAL_SECTION_POST|VS_GLOBAL_SECTION_PRE|VS_GLOBAL|XCODE_ATTRIBUTE)_\w+|\w+_(?:CLANG_TIDY|COMPILER_LAUNCHER|CPPCHECK|CPPLINT|INCLUDE_WHAT_YOU_USE|OUTPUT_NAME|POSTFIX|VISIBILITY_PRESET)|ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALIASED_TARGET|ALLOW_DUPLICATE_CUSTOM_TARGETS|ANDROID_(?:ANT_ADDITIONAL_OPTIONS|API|API_MIN|ARCH|ASSETS_DIRECTORIES|GUI|JAR_DEPENDENCIES|NATIVE_LIB_DEPENDENCIES|NATIVE_LIB_DIRECTORIES|PROCESS_MAX|PROGUARD|PROGUARD_CONFIG_PATH|SECURE_PROPS_PATH|SKIP_ANT_STEP|STL_TYPE)|ARCHIVE_OUTPUT_DIRECTORY|ARCHIVE_OUTPUT_NAME|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|AUTOGEN_(?:BUILD_DIR|ORIGIN_DEPENDS|PARALLEL|SOURCE_GROUP|TARGETS_FOLDER|TARGET_DEPENDS)|AUTOMOC|AUTOMOC_(?:COMPILER_PREDEFINES|DEPEND_FILTERS|EXECUTABLE|MACRO_NAMES|MOC_OPTIONS|SOURCE_GROUP|TARGETS_FOLDER)|AUTORCC|AUTORCC_EXECUTABLE|AUTORCC_OPTIONS|AUTORCC_SOURCE_GROUP|AUTOUIC|AUTOUIC_EXECUTABLE|AUTOUIC_OPTIONS|AUTOUIC_SEARCH_PATHS|BINARY_DIR|BUILDSYSTEM_TARGETS|BUILD_RPATH|BUILD_RPATH_USE_ORIGIN|BUILD_WITH_INSTALL_NAME_DIR|BUILD_WITH_INSTALL_RPATH|BUNDLE|BUNDLE_EXTENSION|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMMON_LANGUAGE_RUNTIME|COMPATIBLE_INTERFACE_(?:BOOL|NUMBER_MAX|NUMBER_MIN|STRING)|COMPILE_(?:DEFINITIONS|FEATURES|FLAGS|OPTIONS|PDB_NAME|PDB_OUTPUT_DIRECTORY)|COST|CPACK_DESKTOP_SHORTCUTS|CPACK_NEVER_OVERWRITE|CPACK_PERMANENT|CPACK_STARTUP_SHORTCUTS|CPACK_START_MENU_SHORTCUTS|CPACK_WIX_ACL|CROSSCOMPILING_EMULATOR|CUDA_EXTENSIONS|CUDA_PTX_COMPILATION|CUDA_RESOLVE_DEVICE_SYMBOLS|CUDA_SEPARABLE_COMPILATION|CUDA_STANDARD|CUDA_STANDARD_REQUIRED|CXX_EXTENSIONS|CXX_STANDARD|CXX_STANDARD_REQUIRED|C_EXTENSIONS|C_STANDARD|C_STANDARD_REQUIRED|DEBUG_CONFIGURATIONS|DEBUG_POSTFIX|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DEPLOYMENT_ADDITIONAL_FILES|DEPLOYMENT_REMOTE_DIRECTORY|DISABLED|DISABLED_FEATURES|ECLIPSE_EXTRA_CPROJECT_CONTENTS|ECLIPSE_EXTRA_NATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXCLUDE_FROM_DEFAULT_BUILD|EXPORT_NAME|EXPORT_PROPERTIES|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB32_PATHS|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_LIBX32_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FIXTURES_CLEANUP|FIXTURES_REQUIRED|FIXTURES_SETUP|FOLDER|FRAMEWORK|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GENERATOR_IS_MULTI_CONFIG|GHS_INTEGRITY_APP|GHS_NO_SOURCE_GROUP_FILE|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|GNUtoMS|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(?:COMMON_LANGUAGE_RUNTIME|CONFIGURATIONS|GLOBAL|IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_(?:LANGUAGES|LIBRARIES|MULTIPLICITY)|LOCATION|NO_SONAME|OBJECTS|SONAME)|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE_(?:AUTOUIC_OPTIONS|COMPILE_DEFINITIONS|COMPILE_FEATURES|COMPILE_OPTIONS|INCLUDE_DIRECTORIES|LINK_DEPENDS|LINK_DIRECTORIES|LINK_LIBRARIES|LINK_OPTIONS|POSITION_INDEPENDENT_CODE|SOURCES|SYSTEM_INCLUDE_DIRECTORIES)|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|IOS_INSTALL_COMBINED|JOB_POOLS|JOB_POOL_COMPILE|JOB_POOL_LINK|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINKER_LANGUAGE|LINK_(?:DEPENDS|DEPENDS_NO_SHARED|DIRECTORIES|FLAGS|INTERFACE_LIBRARIES|INTERFACE_MULTIPLICITY|LIBRARIES|OPTIONS|SEARCH_END_STATIC|SEARCH_START_STATIC|WHAT_YOU_USE)|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACOSX_RPATH|MACROS|MANUALLY_ADDED_DEPENDENCIES|MEASUREMENT|MODIFIED|NAME|NO_SONAME|NO_SYSTEM_FROM_IMPORTED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|PDB_NAME|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|POST_INSTALL_SCRIPT|PREDEFINED_TARGETS_FOLDER|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROCESSOR_AFFINITY|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RESOURCE_LOCK|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|RUN_SERIAL|SKIP_AUTOGEN|SKIP_AUTOMOC|SKIP_AUTORCC|SKIP_AUTOUIC|SKIP_BUILD_RPATH|SKIP_RETURN_CODE|SOURCES|SOURCE_DIR|SOVERSION|STATIC_LIBRARY_FLAGS|STATIC_LIBRARY_OPTIONS|STRINGS|SUBDIRECTORIES|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_MESSAGES|TARGET_SUPPORTS_SHARED_LIBS|TESTS|TEST_INCLUDE_FILE|TEST_INCLUDE_FILES|TIMEOUT|TIMEOUT_AFTER_MATCH|TYPE|USE_FOLDERS|VALUE|VARIABLES|VERSION|VISIBILITY_INLINES_HIDDEN|VS_(?:CONFIGURATION_TYPE|COPY_TO_OUT_DIR|DEBUGGER_(?:COMMAND|COMMAND_ARGUMENTS|ENVIRONMENT|WORKING_DIRECTORY)|DEPLOYMENT_CONTENT|DEPLOYMENT_LOCATION|DOTNET_REFERENCES|DOTNET_REFERENCES_COPY_LOCAL|GLOBAL_KEYWORD|GLOBAL_PROJECT_TYPES|GLOBAL_ROOTNAMESPACE|INCLUDE_IN_VSIX|IOT_STARTUP_TASK|KEYWORD|RESOURCE_GENERATOR|SCC_AUXPATH|SCC_LOCALPATH|SCC_PROJECTNAME|SCC_PROVIDER|SDK_REFERENCES|SHADER_(?:DISABLE_OPTIMIZATIONS|ENABLE_DEBUG|ENTRYPOINT|FLAGS|MODEL|OBJECT_FILE_NAME|OUTPUT_HEADER_FILE|TYPE|VARIABLE_NAME)|STARTUP_PROJECT|TOOL_OVERRIDE|USER_PROPS|WINRT_COMPONENT|WINRT_EXTENSIONS|WINRT_REFERENCES|XAML_TYPE)|WILL_FAIL|WIN32_EXECUTABLE|WINDOWS_EXPORT_ALL_SYMBOLS|WORKING_DIRECTORY|WRAP_EXCLUDE|XCODE_(?:EMIT_EFFECTIVE_PLATFORM_NAME|EXPLICIT_FILE_TYPE|FILE_ATTRIBUTES|LAST_KNOWN_FILE_TYPE|PRODUCT_TYPE|SCHEME_(?:ADDRESS_SANITIZER|ADDRESS_SANITIZER_USE_AFTER_RETURN|ARGUMENTS|DISABLE_MAIN_THREAD_CHECKER|DYNAMIC_LIBRARY_LOADS|DYNAMIC_LINKER_API_USAGE|ENVIRONMENT|EXECUTABLE|GUARD_MALLOC|MAIN_THREAD_CHECKER_STOP|MALLOC_GUARD_EDGES|MALLOC_SCRIBBLE|MALLOC_STACK|THREAD_SANITIZER(?:_STOP)?|UNDEFINED_BEHAVIOUR_SANITIZER(?:_STOP)?|ZOMBIE_OBJECTS))|XCTEST)\b/
/\b(?:add_compile_definitions|add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_link_options|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_parse_arguments|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_build|ctest_configure|ctest_coverage|ctest_empty_binary_directory|ctest_memcheck|ctest_read_custom_files|ctest_run_script|ctest_sleep|ctest_start|ctest_submit|ctest_test|ctest_update|ctest_upload|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_guard|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_compile_definitions|target_compile_features|target_compile_options|target_include_directories|target_link_directories|target_link_libraries|target_link_options|target_sources|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)(?=\s*\()\b/
/\b(?:ON|OFF|TRUE|FALSE)\b/
/\b(?:PROPERTIES|SHARED|PRIVATE|STATIC|PUBLIC|INTERFACE|TARGET_OBJECTS)\b/
/\b(?:NOT|AND|OR|MATCHES|LESS|GREATER|EQUAL|STRLESS|STRGREATER|STREQUAL|VERSION_LESS|VERSION_EQUAL|VERSION_GREATER|DEFINED)\b/
/\b\d+(?:\.\d+)*\b/
/\b[A-Z_]\w*(?=\s*\()\b/i
/[()>}]|\$[<{]/
/"(?:[^"\\]|\\.)*"/
/\b\w+::\w+\b/
/\$\{(?:[^\${}]|\$\{[^\${}]*\})*\}/
/\$\{|\}/
/\w+/
/#(?!\{).+/
/(?!\d)\w+(?=\s*:(?!:))/
/\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/
/###[^]+?###/
/\/{3}[^]*?\/{3}/
/\`(?:\\[^]|[^\\\\\`])*\`/
/@(?!\d)\w+/
/'''[^]*?'''/
/"""[^]*?"""/
/'(?:\\[^]|[^'\\])*'/
/"(?:\\[^]|[^"\\])*"/
/#\{[^}]+\}/
/\b(?:abstract|actor|also|annotation|assert|async|await|bool|boolean|break|byte|case|catch|changed|char|class|closed|constant|continue|def|default|del|double|elif|else|enum|every|extends|false|finally|float|for|from|global|gpudef|gpukernel|if|import|in|init|inject|int|lambda|local|long|loop|match|new|nodefault|null|of|onchange|open|out|override|package|parfor|parforsync|post|pre|private|protected|provide|provider|public|return|shared|short|single|size_t|sizeof|super|sync|this|throw|trait|trans|transient|true|try|typedef|unchecked|using|val|var|void|while|with)\b/
/\b(?:false|true)\b/
/\b0B[01][01_]*L?\b|\b0X[\dA-F_]*\.?[-\d+A-FP_]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:E[-+]?\d[\d_]*)?[DFLS]?/i
/<==|>==|=>|->|<-|<>|\^|&==|&<>|!|\?|\?:|\.\?|\+\+|--|[-*+/<=>]=?|\b(?:and|as|band|bor|bxor|comp|is|isnot|mod|or)\b=?/
/[rs]?(?:"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*')/
/\w+\s*\|\|[^]+?\|\|/
/(?:^|\s)def[\t ]+[A-Z_a-z]\w*(?=\s*\()/
/@(?:\w+:)?(?:\w*|\[[^\]]+\])/
/(?:^|[^\\])(?:\\{2})*\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/
/\b(?:BASE-URI|BLOCK-ALL-MIXED-CONTENT|(?:CHILD|CONNECT|DEFAULT|FONT|FRAME|IMG|MANIFEST|MEDIA|OBJECT|SCRIPT|STYLE|WORKER)-SRC|DISOWN-OPENER|FORM-ACTION|FRAME-ANCESTORS|PLUGIN-TYPES|REFERRER|REFLECTED-XSS|REPORT-TO|REPORT-URI|REQUIRE-SRI-FOR|SANDBOX|UPGRADE-INSECURE-REQUESTS)\b/i
/'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[\d+/=A-Za-z]+)'/
/'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*/
/[$@]+[A-Z_]\w*(?:[!?]|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/
/\b[A-Z]\w*(?:[!?]|(?<!\w)(?=\w)|(?<=\w)(?!\w))/
/\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\dA-F_a-f]*[\dA-Fa-f]|\d(?:[\d_]*\d)?(?:\.[\d_]*\d)?(?:[Ee][-+]?[\d_]*\d)?)(?:_(?:[fiu](?:8|16|32|64))?)?\b/
/(?:\bCLASS\s+|\bCATCH\s+\()[\w.\\]+/i
/(?:^|[^:]):[A-Z_]\w*(?:[!?]|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/\bdef\s+[\w.]+/
/@\[.+?\]/
/\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|rescue|return|require|select|self|sizeof|struct|super|then|type|typeof|uninitialized|union|unless|until|when|while|with|yield|__DIR__|__END_LINE__|__FILE__|__LINE__)\b/
/^=begin\s[^]*?^=end/m
/%[IQWiqswx]?(?:[^\s\d(<\x41-\x5b\x61-\x7b](?:(?![]Unknown:\\1[])[^\\]|\\[^])*[]Unknown:\\1[]|\((?:[^()\\]|\\[^])*\)|\{(?:[^#\\{}]|#(?:\{[^}]+\})?|\\[^])*\}|\[(?:[^[\\\]]|\\[^])*\]|<(?:[^<>\\]|\\[^])*>)/
/"(?:#\{[^}]+\}|\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:#\{[^}]+\}|\\(?:\r\n|[^])|(?!')[^\n\r\\])*'/
/%r(?:[^\s\d(<\x41-\x5b\x61-\x7b](?:(?![]Unknown:\\1[])[^\\]|\\[^])*[]Unknown:\\1[][gim]{0,3}|\((?:[^()\\]|\\[^])*\)[gim]{0,3}|\{(?:[^#\\{}]|#(?:\{[^}]+\})?|\\[^])*\}[gim]{0,3}|\[(?:[^[\\\]]|\\[^])*\][gim]{0,3}|<(?:[^<>\\]|\\[^])*>[gim]{0,3})/
/(?:^|[^/])\/(?!\/)(?:\[[^\n\r\]]+\]|\\.|[^\n\r/[\\])+\/[gim]{0,3}(?=\s*(?:$|[\n\r),.;}]))/
/\w+$/
/\{\{.+?\}\}/
/\{%.+?%\}/
/\.\s*(?:is_a|responds_to)\?/
/^@\[|\]$/
/^\{\{|\}\}$/
/^\{%|%\}$/
/^#\{|\}$/
/\\[\dA-F]{1,8}/i
/(?:^|[^-\w\xa0-\uffff])--[-A-Z_a-z\xa0-\uffff][-\w\xa0-\uffff]*/
/\s[-*+/](?=\s)/
/\B#(?:[\dA-F]{1,2}){3,4}\b/i
/\b(?:ALICEBLUE|ANTIQUEWHITE|AQUA|AQUAMARINE|AZURE|BEIGE|BISQUE|BLACK|BLANCHEDALMOND|BLUE|BLUEVIOLET|BROWN|BURLYWOOD|CADETBLUE|CHARTREUSE|CHOCOLATE|CORAL|CORNFLOWERBLUE|CORNSILK|CRIMSON|CYAN|DARKBLUE|DARKCYAN|DARKGOLDENROD|DARKGR[AE]Y|DARKGREEN|DARKKHAKI|DARKMAGENTA|DARKOLIVEGREEN|DARKORANGE|DARKORCHID|DARKRED|DARKSALMON|DARKSEAGREEN|DARKSLATEBLUE|DARKSLATEGR[AE]Y|DARKTURQUOISE|DARKVIOLET|DEEPPINK|DEEPSKYBLUE|DIMGR[AE]Y|DODGERBLUE|FIREBRICK|FLORALWHITE|FORESTGREEN|FUCHSIA|GAINSBORO|GHOSTWHITE|GOLD|GOLDENROD|GR[AE]Y|GREEN|GREENYELLOW|HONEYDEW|HOTPINK|INDIANRED|INDIGO|IVORY|KHAKI|LAVENDER|LAVENDERBLUSH|LAWNGREEN|LEMONCHIFFON|LIGHTBLUE|LIGHTCORAL|LIGHTCYAN|LIGHTGOLDENRODYELLOW|LIGHTGR[AE]Y|LIGHTGREEN|LIGHTPINK|LIGHTSALMON|LIGHTSEAGREEN|LIGHTSKYBLUE|LIGHTSLATEGR[AE]Y|LIGHTSTEELBLUE|LIGHTYELLOW|LIME|LIMEGREEN|LINEN|MAGENTA|MAROON|MEDIUMAQUAMARINE|MEDIUMBLUE|MEDIUMORCHID|MEDIUMPURPLE|MEDIUMSEAGREEN|MEDIUMSLATEBLUE|MEDIUMSPRINGGREEN|MEDIUMTURQUOISE|MEDIUMVIOLETRED|MIDNIGHTBLUE|MINTCREAM|MISTYROSE|MOCCASIN|NAVAJOWHITE|NAVY|OLDLACE|OLIVE|OLIVEDRAB|ORANGE|ORANGERED|ORCHID|PALEGOLDENROD|PALEGREEN|PALETURQUOISE|PALEVIOLETRED|PAPAYAWHIP|PEACHPUFF|PERU|PINK|PLUM|POWDERBLUE|PURPLE|RED|ROSYBROWN|ROYALBLUE|SADDLEBROWN|SALMON|SANDYBROWN|SEAGREEN|SEASHELL|SIENNA|SILVER|SKYBLUE|SLATEBLUE|SLATEGR[AE]Y|SNOW|SPRINGGREEN|STEELBLUE|TAN|TEAL|THISTLE|TOMATO|TRANSPARENT|TURQUOISE|VIOLET|WHEAT|WHITE|WHITESMOKE|YELLOW|YELLOWGREEN)\b/i
/\b\d+(?:%|[a-z]+\b)/
/(?:^|[^\w\-.])-?\d*\.?\d+/
/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/
/:[-\w]+/
/\.[-\w]+/
/#[-\w]+/
/>|\+|~|\|\|/
/[(),]/
/\b(?:RGB|HSL)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:RGB|HSL)A\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i
/\[(?:[^"'[\]]|"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*')*\]/
/[-\w]+(?=\()/
/^\[|\]$/
/[$*|~^]?=/
/\(\s*[-+]?\d*[\dn](?:\s*[-+]\s*\d+)?(?=\s*\))/
/\(\s*(?:EVEN|ODD)(?=\s*\))/i
/\s[IS]$/i
/^\s*[-\w*\xa0-\uffff]*\|(?!=)/
/^\s*[-\w\xa0-\uffff]+/
/[\dn]+/
/[-+]/
/\|$/
/=\s*[-\w\xa0-\uffff]+(?=\s*$)/
/\$\w+/
/\b(?:ADD|ALL|AND|AS|ASC|ASCENDING|ASSERT|BY|CALL|CASE|COMMIT|CONSTRAINT|CONTAINS|CREATE|CSV|DELETE|DESC|DESCENDING|DETACH|DISTINCT|DO|DROP|ELSE|END|ENDS|EXISTS|FOR|FOREACH|IN|INDEX|IS|JOIN|KEY|LIMIT|LOAD|MANDATORY|MATCH|MERGE|NODE|NOT|OF|ON|OPTIONAL|OR|ORDER(?=\s+BY)|PERIODIC|REMOVE|REQUIRE|RETURN|SCALAR|SCAN|SET|SKIP|START|STARTS|THEN|UNION|UNIQUE|UNWIND|USING|WHEN|WHERE|WITH|XOR|YIELD)\b/i
/\b\w+\b(?=\s*\()/
/\b(?:TRUE|FALSE|NULL)\b/i
/\b(?:0x[\dA-Fa-f]+|\d+(?:\.\d+)?(?:[Ee][-+]?\d+)?)\b/
/:|<-{1,2}|-{1,2}>?|<>|=~?|[<>]=?|[%*+/|^]|\.{2,3}/
/[(),.;[\]{}]/
/"(?:[^\n\r"\\]|\\.)*"|'(?:[^\n\r'\\]|\\.)*'/
/:\s*(?:\w+|\`[^\n\r\\\\\`]*\`)(?=\s*[):{])/
/(?:-\[\s*(?:\w+\s*|\`[^\n\r\\\\\`]*\`\s*)?:\s*|\|\s*:\s*)(?:\w+|\`[^\n\r\\\\\`]*\`)/
/\`[^\n\r\\\\\`]*\`/
/\B@\w*/
/\$|\b(?:abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|public|pure|real|ref|return|scope|shared|short|static|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|__(?:(?:FILE|MODULE|LINE|FUNCTION|PRETTY_FUNCTION|DATE|EOF|TIME|TIMESTAMP|VENDOR|VERSION)__|gshared|traits|vector|parameters)|string|wstring|dstring|size_t|ptrdiff_t)\b/
/\|[=|]?|&[&=]?|\+[+=]?|-[-=]?|\.{2,3}|=[=>]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>{1,2}>?|\^\^|[%*/~^])=?/
/\b(?:[A-D][HLX]|E[A-D]X|E?(?:BP|SP|DI|SI)|[C-GS]S|CR[0234]|DR[0-367]|TR[3-7]|X?MM[0-7]|R[A-D]X|[BS]PL|R[BS]P|[DS]IL|R[DS]I|R(?:[89]|1[0-5])[BDW]?|XMM(?:[89]|1[0-5])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|(?<!\w)(?=\w)|(?<=\w)(?!\w))/
/\b0X\.?[\dA-F_]+(?:(?!\.\.)\.[\dA-F_]*)?(?:P[-+]?[\dA-F_]+)?[FILU]*/i
/^\s*#!.+/
/(?:^|[^\\])(?:\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[^])*?\+\/|\/\/.*|\/\*[^]*?\*\/)/
/\b[rx]"(?:\\[^]|[^"\\])*"[cdw]?|\bq"(?:\[[^]*?\]|\([^]*?\)|<[^]*?>|\{[^]*?\})"|\bq"(?!\d)\w+$[^]*?^[]Unknown:\\1[]"|\bq".[^]*?[]Unknown:\\2[]"|'(?:\\(?:\W|\w+)|[^\\])'|(?:"(?:\\[^]|(?!")[^\\])*"|\`(?:\\[^]|(?!\`)[^\\])*\`)[cdw]?/m
/\bq\{(?:\{[^{}]*\}|[^{}])*\}/
/(?:\.\.)?(?:\b0B\.?|(?<!\w)(?=\w)|(?<=\w)(?!\w)|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:E[-+]?\d[\d_]*)?[FILU]*/i
/\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[-!%&*+/<=>|^]=?|\?/
/\b(?:async|sync|yield)\*/
/\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|Function|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
/@\w+/
/r?(?:"""[^]*?"""|'''[^]*?''')/
/r?(?:"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*')/
/\b(?:ABS|ACOS|ACOSH|ACOT|ACOTH|ADDCOLUMNS|ADDMISSINGITEMS|ALL|ALLCROSSFILTERED|ALLEXCEPT|ALLNOBLANKROW|ALLSELECTED|AND|APPROXIMATEDISTINCTCOUNT|ASIN|ASINH|ATAN|ATANH|AVERAGE|AVERAGEA|AVERAGEX|BETA\.DIST|BETA\.INV|BLANK|CALCULATE|CALCULATETABLE|CALENDAR|CALENDARAUTO|CEILING|CHISQ\.DIST|CHISQ\.DIST\.RT|CHISQ\.INV|CHISQ\.INV\.RT|CLOSINGBALANCEMONTH|CLOSINGBALANCEQUARTER|CLOSINGBALANCEYEAR|COALESCE|COMBIN|COMBINA|COMBINEVALUES|CONCATENATE|CONCATENATEX|CONFIDENCE\.NORM|CONFIDENCE\.T|CONTAINS|CONTAINSROW|CONTAINSSTRING|CONTAINSSTRINGEXACT|CONVERT|COS|COSH|COT|COTH|COUNT|COUNTA|COUNTAX|COUNTBLANK|COUNTROWS|COUNTX|CROSSFILTER|CROSSJOIN|CURRENCY|CURRENTGROUP|CUSTOMDATA|DATATABLE|DATE|DATEADD|DATEDIFF|DATESBETWEEN|DATESINPERIOD|DATESMTD|DATESQTD|DATESYTD|DATEVALUE|DAY|DEGREES|DETAILROWS|DISTINCT|DISTINCTCOUNT|DISTINCTCOUNTNOBLANK|DIVIDE|EARLIER|EARLIEST|EDATE|ENDOFMONTH|ENDOFQUARTER|ENDOFYEAR|EOMONTH|ERROR|EVEN|EXACT|EXCEPT|EXP|EXPON\.DIST|FACT|FALSE|FILTER|FILTERS|FIND|FIRSTDATE|FIRSTNONBLANK|FIRSTNONBLANKVALUE|FIXED|FLOOR|FORMAT|GCD|GENERATE|GENERATEALL|GENERATESERIES|GEOMEAN|GEOMEANX|GROUPBY|HASONEFILTER|HASONEVALUE|HOUR|IF|IF\.EAGER|IFERROR|IGNORE|INT|INTERSECT|ISBLANK|ISCROSSFILTERED|ISEMPTY|ISERROR|ISEVEN|ISFILTERED|ISINSCOPE|ISLOGICAL|ISNONTEXT|ISNUMBER|ISO\.CEILING|ISODD|ISONORAFTER|ISSELECTEDMEASURE|ISSUBTOTAL|ISTEXT|KEEPFILTERS|KEYWORDMATCH|LASTDATE|LASTNONBLANK|LASTNONBLANKVALUE|LCM|LEFT|LEN|LN|LOG|LOG10|LOOKUPVALUE|LOWER|MAX|MAXA|MAXX|MEDIAN|MEDIANX|MID|MIN|MINA|MINUTE|MINX|MOD|MONTH|MROUND|NATURALINNERJOIN|NATURALLEFTOUTERJOIN|NEXTDAY|NEXTMONTH|NEXTQUARTER|NEXTYEAR|NONVISUAL|NORM\.DIST|NORM\.INV|NORM\.S\.DIST|NORM\.S\.INV|NOT|NOW|ODD|OPENINGBALANCEMONTH|OPENINGBALANCEQUARTER|OPENINGBALANCEYEAR|OR|PARALLELPERIOD|PATH|PATHCONTAINS|PATHITEM|PATHITEMREVERSE|PATHLENGTH|PERCENTILE\.EXC|PERCENTILE\.INC|PERCENTILEX\.EXC|PERCENTILEX\.INC|PERMUT|PI|POISSON\.DIST|POWER|PREVIOUSDAY|PREVIOUSMONTH|PREVIOUSQUARTER|PREVIOUSYEAR|PRODUCT|PRODUCTX|QUARTER|QUOTIENT|RADIANS|RAND|RANDBETWEEN|RANK\.EQ|RANKX|RELATED|RELATEDTABLE|REMOVEFILTERS|REPLACE|REPT|RIGHT|ROLLUP|ROLLUPADDISSUBTOTAL|ROLLUPGROUP|ROLLUPISSUBTOTAL|ROUND|ROUNDDOWN|ROUNDUP|ROW|SAMEPERIODLASTYEAR|SAMPLE|SEARCH|SECOND|SELECTCOLUMNS|SELECTEDMEASURE|SELECTEDMEASUREFORMATSTRING|SELECTEDMEASURENAME|SELECTEDVALUE|SIGN|SIN|SINH|SQRT|SQRTPI|STARTOFMONTH|STARTOFQUARTER|STARTOFYEAR|STDEV\.P|STDEV\.S|STDEVX\.P|STDEVX\.S|SUBSTITUTE|SUBSTITUTEWITHINDEX|SUM|SUMMARIZE|SUMMARIZECOLUMNS|SUMX|SWITCH|T\.DIST|T\.DIST\.2T|T\.DIST\.RT|T\.INV|T\.INV\.2T|TAN|TANH|TIME|TIMEVALUE|TODAY|TOPN|TOPNPERLEVEL|TOPNSKIP|TOTALMTD|TOTALQTD|TOTALYTD|TREATAS|TRIM|TRUE|TRUNC|UNICHAR|UNICODE|UNION|UPPER|USERELATIONSHIP|USERNAME|USEROBJECTID|USERPRINCIPALNAME|UTCNOW|UTCTODAY|VALUE|VALUES|VAR\.P|VAR\.S|VARX\.P|VARX\.S|WEEKDAY|WEEKNUM|XIRR|XNPV|YEAR|YEARFRAC)(?=\s*\()/i
/\b(?:DEFINE|MEASURE|EVALUATE|ORDER\s+BY|RETURN|VAR|START\s+AT|ASC|DESC)\b/i
/\b\d+\.?\d*|\B\.\d+\b/
/:=|[-*+/=^]|&{1,2}|\|\||<(?:=>?|<|>)?|>[=>]?|\b(?:IN|NOT)\b/i
/[(),.;[\]\`{}]/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|(?:--|\/\/).*)/
/'(?:[^']|'')*'(?!')(?:\[[\w \xa0-\uffff]+\])?|\w+\[[\w \xa0-\uffff]+\]/
/\[[\w \xa0-\uffff]+\]/
/"(?:[^"]|"")*"(?!")/
/\b(?:TRUE|FALSE|NULL)\b/i
/--.*|\{-(?:[^-{]|-(?!\})|\{(?!-)|\{-(?:[^-{]|-(?!\})|\{(?!-))*-\})*-\}/
/\b(?:as|assert|else|forall|if|in|let|merge|missing|then|toMap|using|with)\b|\u2200/
/\b(?:Some|None)\b/
/\b(?:False|True)\b/
/\bNaN\b|-?\bInfinity\b|[-+]?\b(?:0x[\dA-Fa-f]+|\d+(?:\.\d+)?(?:e[-+]?\d+)?)\b/
/\/\\|\/\/\\\\|&&|\|\||[!=]=|===|\/\/|->|\+\+|::|[#*+:<=>?@\\|\u03bb\u2192\u2227\u2261\u2a53\u2afd]/
/\.\.|[(),./[\]{}]/
/\b[A-Z]\w*\b/
/"(?:[^"\\]|\\.)*"|''(?:[^']|'(?!')|'''|''\$\{)*''(?!'|\$)/
/\`[^\`]*\`/
/\bhttps?:\/\/[\w!$%&'*+\-.:;=@~]+(?:\/[\w!$%&'*+\-.:;=@~]*)*(?:\?[\w!$%&'*+\-./:;=?@~]*)?/
/\benv:(?:(?!\d)\w+|"(?:[^"=\\]|\\.)*")/
/\bsha256:[\dA-Fa-f]{64}\b/
/^env/
/sha256/
/[\dA-F]{64}/i
/\$\{[^{}]*\}/
/\$\{|\}/
/^\$\{[^]+(?=\}$)/
/^(?:\*{3}|-{3}|\+{3}).*$/m
/^@@.*@@$/m
/^\d+.*$/m
/^(?:-.*(?:\r\n?|\n|(?![^])))+/m
/^(?:<.*(?:\r\n?|\n|(?![^])))+/m
/^(?:\+.*(?:\r\n?|\n|(?![^])))+/m
/^(?:>.*(?:\r\n?|\n|(?![^])))+/m
/^(?: .*(?:\r\n?|\n|(?![^])))+/m
/^(?:!.*(?:\r\n?|\n|(?![^])))+/m
/.(?=[^]).*(?:\r\n?|\n)?/
/[^]/
/^\{#[^]*?#\}$/
/\b[A-Z_]\w+(?=\s*\()/i
/\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/
/[-%*+/=]=?|!=|\*{1,2}=?|\/{1,2}=?|<[<=>]?|>[=>]?|[&|~^]/
/[Tt]rue|[Ff]alse|[Nn]one/
/\b\w+?\b/
/[(),.:;[\]{}]/
/^\{%[-+]?\s*\w+/
/^\{[%{][-+]?|[-+]?[%}]\}$/
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'/
/\|\w+/
/\bis\s+(?:not\s+)?(?!not(?:(?<!\w)\w|(?<=\w)(?!\w)))\w+/
/^\$(?:ORIGIN|INCLUDE|TTL)(?=\s|$)/m
/[()]/
/(?:^|\s)(?:IN|CH|CS|HS)(?=\s|$)/
/(?:^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/
/^\$ORIGIN[\t ]+\S+/m
/(?:^|\s)@(?=\s|$)/
/"(?:(?!")[^\n\r\\]|\\(?:\r\n|[^]))*"|'(?:(?!')[^\n\r\\]|\\(?:\r\n|[^]))*'/
/---|\.\.\.|[-,:>?[\]{|}]/
/^\s*(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im
/\(\*[^]*?\*\)/
/\b[A-Z]\w*(?:[\t ]+[A-Z]\w*)*\b/i
/\([/:]|[/:]\)|[(),.;[\]{}]/
/[-!*/=|]/
/"[^\n\r"]*"|'[^\n\r']*'/
/\?[^\n\r?]*\?/
/^\s*[A-Z]\w*(?:[\t ]+[A-Z]\w*)*(?=\s*=)/im
/[#;].*/
/^[\t ]*\[.+\]/m
/^[\t ]*[^\s=]+(?=[\t ]*=)/m
/=.*/
/\\\\[!*,.?[\]{}]/
/[!?]|\.\.|\*{1,2}/
/[,[\]{}]/
/'(?:%.|[^\n\r%'])+'/
/\b(?:ACROSS|AGENT|ALIAS|ALL|AND|ATTACHED|AS|ASSIGN|ATTRIBUTE|CHECK|CLASS|CONVERT|CREATE|CURRENT|DEBUG|DEFERRED|DETACHABLE|DO|ELSE|ELSEIF|END|ENSURE|EXPANDED|EXPORT|EXTERNAL|FEATURE|FROM|FROZEN|IF|IMPLIES|INHERIT|INSPECT|INVARIANT|LIKE|LOCAL|LOOP|NOT|NOTE|OBSOLETE|OLD|ONCE|OR|PRECURSOR|REDEFINE|RENAME|REQUIRE|RESCUE|RESULT|RETRY|SELECT|SEPARATE|SOME|THEN|UNDEFINE|UNTIL|VARIANT|VOID|WHEN|XOR)\b/i
/:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[(),:;?[\]{}]/
/\\\\|\|\.\.\||\.\.|\/[/=~]?|[<>]=?|[-*+=~^]/
/\b[A-Z][\dA-Z_]*\b/
/\b0[BCX][\dA-F](?:_*[\dA-F])*\b/i
/(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?E[-+]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?/i
/"[^[]*\[[^]*?\][]Unknown:\\1[]"/
/"[^{]*\{[^]*?\}[]Unknown:\\1[]"/
/"(?:%\s*\n\s*%|%.|[^\n\r"%])*"/
/^#[^]*/
/^<%[-=_]?|[-_]?%>$/
/#.*/
/\w+\??:(?!:)/
/\b(?:0[BOX][\dA-F_]+|\d[\d_]*)(?:\.[\d_]+)?(?:E[-+]?[\d_]+)?\b/i
/\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/
/<<|>>|[%(),.[\]{}]/
/~[Rr](?:"""(?:\\[^]|(?!""")[^\\])+"""|'''(?:\\[^]|(?!''')[^\\])+'''|"(?:\\.|(?!")[^\n\r\\])+"|'(?:\\.|(?!')[^\n\r\\])+'|\/(?:\\.|(?!\/)[^\n\r\\])+\/|\|(?:\\.|(?!\|)[^\n\r\\])+\||\((?:\\.|[^\n\r)\\])+\)|\[(?:\\.|[^\n\r\\\]])+\]|\{(?:\\.|[^\n\r\\}])+\}|<(?:\\.|[^\n\r>\\])+>)[fimrsux]*/
/(?:^|[^:]):\w+/
/(?:^|[^&])&(?:[^\s\d&()][^\s()]*|(?=\())/
/(?:^|[^&])&\d+/
/\bin\b|&{1,2}|\|[>|]?|\\\\|::|\.{2,3}|\+{1,2}|-[->]?|<[-=>]|>=|!={1,2}|\B!|=(?:={1,2}|[>~])?|[*/^]/
/~[CSWcsw](?:"""(?:\\[^]|(?!""")[^\\])+"""|'''(?:\\[^]|(?!''')[^\\])+'''|"(?:\\.|(?!")[^\n\r\\])+"|'(?:\\.|(?!')[^\n\r\\])+'|\/(?:\\.|(?!\/)[^\n\r\\])+\/|\|(?:\\.|(?!\|)[^\n\r\\])+\||\((?:\\.|[^\n\r)\\])+\)|\[(?:\\.|[^\n\r\\\]])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^\n\r#\\}])+\}|<(?:\\.|[^\n\r>\\])+>)[acs]?/
/"""[^]*?"""|'''[^]*?'''/
/[^<]<(?!<)/
/[^>]>(?!>)/
/--.*|\{-[^]*?-\}/
/\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/
/\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/
/\b(?:\d+(?:\.\d+)?(?:E[-+]?\d+)?|0X[\dA-F]+)\b/i
/\s\.\s|[!#$%&*+\-./:<=>?@|~^]{2,}|[-!#$%&*+/:<=>?@|~^]/
/\b(?:[A-Z]\w*\.)*[a-z]\w*\b/
/\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/
/[(),.:[\]{|}]/
/'(?:[^\n\r'\\]|\\(?:['\\abfnrtv]|\d+|x[\dA-Fa-f]+))'/
/^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+[A-Z]\w*(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m
/"(?:[^\n\r"\\]|\\(?:["\\abfnrtv]|\d+|x[\dA-Fa-f]+))*"/
/\b(?:import|as|exposing)\b/
/^#!.+|--(?:\[=*\[[^]*?\][]Unknown:\\1[]\]|.*)/m
/\b0X[\dA-F]+\.?[\dA-F]*(?:P[-+]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:E[-+]?\d+)?\b)|\B\.\d+(?:E[-+]?\d+)?\b/i
/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/
/(?!\d)\w+(?=\s*[({])/
/[(),;[\]{}]|\.+|:+/
/"(?:(?!")[^\n\r\\]|\\z(?:\r\n|\s)|\\(?:\r\n|[^]))*"|'(?:(?!')[^\n\r\\]|\\z(?:\r\n|\s)|\\(?:\r\n|[^]))*'|\[=*\[[^]*?\][]Unknown:\\2[]\]/
/[-#%&*+|^]|\/{1,2}|<[<=]?|>[=>]?|[=~]=?/
/^<%[-=]?|-?%>$/
/(?:^|[^.])\.\.(?!\.)/
/^<%=?|%>$/
/%.+/
/\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/
/\b[a-z][\w@]*(?=\()/
/\b[a-z][\w@]*/
/[#(),.:;[\]{|}]|<<|>>/
/"(?:\\.|[^\n\r"\\])*"/
/'(?:\\.|[^\n\r'\\])+'(?=\()/
/'(?:\\.|[^\n\r'\\])+'/
/\$\\?./
/\d+#[\dA-Z]+/i
/(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?/i
/(?:^|[^@])(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|\?)[A-Z_][\w@]*/
/[/:<=>]=|=[/:]=|\+{1,2}|-{1,2}|[!*/=]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/
/(?:^|[^<])<(?!<)/
/(?:^|[^>])>(?!>)/
/(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:E[-+]?\d+)?\b/i
/\b(?:TRUE|FALSE)\b/i
/[-%&*+,/=^]|<[=>]?|>=?/
/[();[\]{|}]/
/\bN\(\s*"(?:[^"]|"")*"(?=\s*\))/i
/(?:'[^']*'|(?:[^\s"$&'()*,;<>?[\]{}]*\[[^\s"'()*<>?[\]\^{}]+\])?\w+)!/
/\b[A-Z]\w*(?=\()/i
/\$?\b(?:[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+|[A-Z]+:\$?[A-Z]+|\d+:\$?\d+)\b/i
/\b[A-Z]+\d+\b|\$[A-Za-z]+\$?\d+\b|\b[A-Za-z]+\$\d+\b/
/!$/
/'/
/\$?[A-Z]+\$?\d+/i
/\$?[A-Z]+/i
/\$?\d+/
/[^[\]]+$/
/\[[^[\]]+\]$/
/[[\]]/
/\b(?:let|return|use|yield)(?:!\B|(?<!\w)(?=\w)|(?<=\w)(?!\w))|\b(?:abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/
/&&&|<<<|>>>|\^\^\^|~~~|&&|\*\*|\.\.|::|<<|>>|<-|->|[!:=]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-%*+/<=>])\??|[!&?^]|~[-+~]|:>|:\?>?/
/\[<.+?>\]/
/(?:"""[^]*?"""|@"(?:""|[^"])*"|"(?:\\[^]|[^"\\])*")B?|'(?:[^'\\]|\\(?:.|\d{3}|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8}))'B?/
/(?:\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[\w.]+\b(?:\s*(?:->|\*)\s*[\w.]+\b)*(?!\s*[.:])/
/^[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*#.*/m
/\b0x[\dA-Fa-f]+(?:un|lf|LF)?\b/
/\b0b[01]+(?:y|uy)?\b/
/(?:\b\d+\.?\d*|\B\.\d+)(?:[FM]|E[-+]?\d+)?\b/i
/\b\d+(?:[ILlsy]|u[lsy]?|UL)?\b/
/[A-Z_]\w*(?=\s*\{)/i
/(?:^|[^\\])\(\*[^]*?\*\)/
/^\[<|>\]$/
/->|\*/
/^\w+$|(?:^|;\s*)[A-Z]\w*(?=\()/
/\s*#\b(?:else|endif|if|light|line|nowarn)\b/
/(?:^|\s)R\/\s+(?:\\\S|[^/\\])*\/(?:[dimrs]*|[dimrs]+-[dimrs]+)(?=\s|$)/
/(?:^|\s)[ft](?=\s|$)/
/(?:^|\s)[-\dA-Z]+"\s(?:\\\S|[^"\\])*"/
/(?:^|\s)USING:(?:\s\S+)*(?=\s+;(?:\s|$))/
/(?:^|\s)(?:2bi|while|2tri|bi\*|4dip|both\?|same\?|tri@|curry|prepose|3bi|\?if|tri\*|2keep|3keep|curried|2keepd|when|2bi\*|2tri\*|4keep|bi@|keepdd|do|unless\*|tri-curry|if\*|loop|bi-curry\*|when\*|2bi@|2tri@|with|2with|either\?|bi|until|3dip|3curry|tri-curry\*|tri-curry@|bi-curry|keepd|compose|2dip|if|3tri|unless|tuple|keep|2curry|tri|most|while\*|dip|composed|bi-curry@|find-last-from|trim-head-slice|map-as|each-from|none\?|trim-tail|partition|if-empty|accumulate\*|reject!|find-from|accumulate-as|collector-for-as|reject|map|map-sum|accumulate!|2each-from|follow|supremum-by|map!|unless-empty|collector|padding|reduce-index|replicate-as|infimum-by|trim-tail-slice|count|find-index|filter|accumulate\*!|reject-as|map-integers|map-find|reduce|selector|interleave|2map|filter-as|binary-reduce|map-index-as|find|produce|filter!|replicate|cartesian-map|cartesian-each|find-index-from|map-find-last|3map-as|3map|find-last|selector-as|2map-as|2map-reduce|accumulate|each|each-index|accumulate\*-as|when-empty|all\?|collector-as|push-either|new-like|collector-for|2selector|push-if|2all\?|map-reduce|3each|any\?|trim-slice|2reduce|change-nth|produce-as|2each|trim|trim-head|cartesian-find|map-index|if-zero|each-integer|unless-zero|\(find-integer\)|when-zero|find-last-integer|\(all-integers\?\)|times|\(each-integer\)|find-integer|all-integers\?|unless-negative|if-positive|when-positive|when-negative|unless-positive|if-negative|case|2cleave|cond>quot|case>quot|3cleave|wrong-values|to-fixed-point|alist>quot|cond|cleave|call-effect|recursive-hashcode|spread|deep-spread>quot|2\|\||0\|\||n\|\||0&&|2&&|3\|\||1\|\||1&&|n&&|3&&|smart-unless\*|keep-inputs|reduce-outputs|smart-when\*|cleave>array|smart-with|smart-apply|smart-if|inputs\/outputs|output>sequence-n|map-outputs|map-reduce-outputs|dropping|output>array|smart-map-reduce|smart-2map-reduce|output>array-n|nullary|input<sequence|append-outputs|drop-inputs|inputs|smart-2reduce|drop-outputs|smart-reduce|preserving|smart-when|outputs|append-outputs-as|smart-unless|smart-if\*|sum-outputs|input<sequence-unsafe|output>sequence)(?=\s|$)/
/(?:^|\s)(?:or|2nipd|4drop|tuck|wrapper|nip|wrapper\?|callstack>array|die|dupd|callstack|callstack\?|3dup|hashcode|pick|4nip|build|>boolean|nipd|clone|5nip|eq\?|\?|=|swapd|2over|clear|2dup|get-retainstack|not|tuple\?|dup|3nipd|call|-rotd|object|drop|assert=|assert\?|-rot|execute|boa|get-callstack|curried\?|3drop|pickd|overd|over|roll|3nip|swap|and|2nip|rotd|throw|\(clone\)|hashcode\*|spin|reach|4dup|equal\?|get-datastack|assert|2drop|<wrapper>|boolean\?|identity-hashcode|identity-tuple\?|null|composed\?|new|5drop|rot|-roll|xor|identity-tuple|boolean)(?=\s|$)/
/(?:^|\s)(?:member-eq\?|mismatch|append|assert-sequence=|longer|repetition|clone-like|3sequence|assert-sequence\?|last-index-from|reversed|index-from|cut\*|pad-tail|join-as|remove-eq!|concat-as|but-last|snip|nths|nth|sequence|longest|slice\?|<slice>|remove-nth|tail-slice|empty\?|tail\*|member\?|virtual-sequence\?|set-length|drop-prefix|iota|unclip|bounds-error\?|unclip-last-slice|non-negative-integer-expected|non-negative-integer-expected\?|midpoint@|longer\?|\?set-nth|\?first|rest-slice|prepend-as|prepend|fourth|sift|subseq-start|new-sequence|\?last|like|first4|1sequence|reverse|slice|virtual@|repetition\?|set-last|index|4sequence|max-length|set-second|immutable-sequence|first2|first3|supremum|unclip-slice|suffix!|insert-nth|tail|3append|short|suffix|concat|flip|immutable\?|reverse!|2sequence|sum|delete-all|indices|snip-slice|<iota>|check-slice|sequence\?|head|append-as|halves|sequence=|collapse-slice|\?second|slice-error\?|product|bounds-check\?|bounds-check|immutable|virtual-exemplar|harvest|remove|pad-head|last|set-fourth|cartesian-product|remove-eq|shorten|shorter|reversed\?|shorter\?|shortest|head-slice|pop\*|tail-slice\*|but-last-slice|iota\?|append!|cut-slice|new-resizable|head-slice\*|sequence-hashcode|pop|set-nth|\?nth|second|join|immutable-sequence\?|<reversed>|3append-as|virtual-sequence|subseq\?|remove-nth!|length|last-index|lengthen|assert-sequence|copy|move|third|first|tail\?|set-first|prefix|bounds-error|<repetition>|exchange|surround|cut|min-length|set-third|push-all|head\?|subseq-start-from|delete-slice|rest|sum-lengths|head\*|infimum|remove!|glue|slice-error|subseq|push|replace-slice|subseq-as|unclip-last)(?=\s|$)/
/(?:^|\s)(?:number=|next-power-of-2|\?1\+|fp-special\?|imaginary-part|float>bits|number\?|fp-infinity\?|bignum\?|fp-snan\?|denominator|gcd|\*|\+|fp-bitwise=|-|u>=|\/|>=|bitand|power-of-2\?|log2-expects-positive|neg\?|<|log2|>|integer\?|number|bits>double|2\/|zero\?|bits>float|float\?|shift|ratio\?|rect>|even\?|ratio|fp-sign|bitnot|>fixnum|complex\?|\/i|integer>fixnum|\/f|sgn|>bignum|next-float|u<|u>|mod|recip|rational|>float|2\^|integer|fixnum\?|neg|fixnum|sq|bignum|>rect|bit\?|fp-qnan\?|simple-gcd|complex|<fp-nan>|real|>fraction|double>bits|bitor|rem|fp-nan-payload|real-part|log2-expects-positive\?|prev-float|align|unordered\?|float|fp-nan\?|abs|bitxor|integer>fixnum-strict|u<=|odd\?|<=|\/mod|>integer|real\?|rational\?|numerator)(?=\s|$)/
/(?:^|\s)<(?!=+>|-+>)\S+>(?=\s|$)/
/(?:^|\s)(?:=======|recursive|flushable|>>|<<<<<<|M\\|B|PRIVATE>|\\|======|final|inline|delimiter|deprecated|<PRIVATE|>>>>>>|<<<<<<<|parse-complex|malformed-complex|read-only|>>>>>>>|call-next-method|<<|foldable|\$|\$\[|\$\{)(?=\s|$)/
/(?:^|\s)(?!")(?:(?:set|change|with|new)-\S+|\$\S+|>[^\s>]+|[^\s:>]+>|[^\s>]+>[^\s>]+|\+[^\s+]+\+|[^\s?]+\?|\?[^\s?]+|[^\s>]+>>|>>[^\s>]+|[^\s<]+<<|\([^\s()]+\)|[^\s!]+!|[^\s*]\S*\*|[^\s.]\S*\.)(?=\s|$)/
/(?:^|\s)(?:[-\dA-Z]+#?)?:{1,2}\s+(?:;\S+|(?!;)\S+)(?=\s|$)/
/\s(?:;|:>)(?=\s|$)/
/(?:^|\s)[^\s"]\S*(?=\s|$)/
/"(?:\\\S|[^"\\])*"/
/(?:^|\s)(?:! .*|!$)/
/(?:^|\s)\/\*\s[^]*?\*\/(?=\s|$)/
/(?:^|\s)!\[(?:======\[\s[^]*?\]======|=====\[\s[^]*?\]=====|====\[\s[^]*?\]====|===\[\s[^]*?\]===|==\[\s[^]*?\]==|=\[\s[^]*?\]=|\[\s[^]*?\])\](?=\s|$)/
/(?:^|\s)[-+]?\d+(?=\s|$)/
/(?:^|\s)[-+]?0(?:B[01]+|O[0-7]+|D\d+|X[\dA-F]+)(?=\s|$)/i
/(?:^|\s)[-+]?\d+\/\d+\.?(?=\s|$)/
/(?:^|\s)\+?\d+\+\d+\/\d+(?=\s|$)/
/(?:^|\s)-\d+-\d+\/\d+(?=\s|$)/
/(?:^|\s)[-+]?(?:\d*\.\d+|\d+\.\d*|\d+)(?:E[-+]?\d+)?(?=\s|$)/i
/(?:^|\s)NAN:\s+[\dA-Fa-f]+(?=\s|$)/
/(?:^|\s)[-+]?0(?:B1\.[01]*|O1\.[0-7]*|D1\.\d*|X1\.[\dA-F]*)P\d+(?=\s|$)/i
/\\\S/
/[$()*+.?[\]\^{|}]/
/\\\S|%\w|\//
/(?:^|\s)STRING:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*;(?=\s|$)/
/(?:^|\s)HEREDOC:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*\S+(?=\s|$)/
/(?:^|\s)\[(?:======\[\s[^]*?\]======|=====\[\s[^]*?\]=====|====\[\s[^]*?\]====|===\[\s[^]*?\]===|==\[\s[^]*?\]==|=\[\s[^]*?\]=|\[\s[^]*?\])\](?=\s|$)/
/(?:^|\s)(?:call|execute|eval)?\((?=\s)/
/\s--(?=\s)/
/\s\)(?=\s|$)/
/(?:^|\s)[A-Z]*\{(?=\s)/i
/\s\}(?=\s|$)/
/(?:^|\s)\[(?=\s)/
/\s\](?=\s|$)/
/\\[^\s']|%\w/
/\b(?:TODOS?|FIX(?:MES?)?|NOTES?|BUGS?|X{2,}|HACKS?|WARN(?:ING)?|\?{2,}|!{2,})\b/
/\/[dimrs]+(?:-[dimrs]+)?/
/\s[^\s:]+/
/(?:\n|\r\n)\s*;(?=\s|$)/
/\b(?:allow|function|if|match|null|return|rules_version|service)\b/
/&&|\|\||[!<=>]=?|[-%*+/=]|\b(?:in|is)\b/
/(?:^|[\s(),])(?:\/(?:[\w\xa0-\uffff]+|\{[\w\xa0-\uffff]+(?:=\*\*)?\}|\$\([\w.\xa0-\uffff]+\)))+/
/\ballow\s+[a-z]+(?:\s*,\s*[a-z]+)*(?=\s*[:;])/
/\//
/\{[\w\xa0-\uffff]+(?:=\*\*)?\}|\$\([\w.\xa0-\uffff]+\)/
/\*\*/
/[$().{}]/
/[$A-Z_\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*=\s*(?:FUNCTION(?:(?<!\w)\w|(?<=\w)(?!\w))|(?:\([^()]*\)(?:\s*:\s*\w+)?|[$A-Z_\xa0-\uffff][\w$\xa0-\uffff]*)\s*=>))/i
/\{\||\|\}/
/\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/
/(?:^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/
/(?:^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/
/\.(?:TRUE|FALSE)\.(?:_\w+)?/i
/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[DE][-+]?\d+)?(?:_\w+)?/i
/\(\/|\/\)|[&(),:;]/
/[BOZ](?:"[\dA-F]+"|'[\dA-F]+')/i
/(?:\w+_)?(?:"(?:""|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!").)*(?:"|&)|'(?:''|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!').)*(?:'|&))/
/!.*/
/\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i
/\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i
/\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i
/\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i
/\*\*|\/\/|=>|[/=]=|[<>]=?|::|[-%*+=]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i
/(?:^|(?!\().)\/(?!\))/
/&(?:\r\n?|\n)\s*!.*/
/^<#--[^]*/
/^<[^]+>$/
/^\$\{[^]*\}$/
/^<\/?|\/?>$/
/^\$\{|\}$/
/^<\/?[#@][A-Z]\w*/i
/[^]*\S[^]*/
/<#--[^]*?-->/
/\bas\b/
/\w+(?=\s*\()/
/\d+(?:\.\d+)?/
/\.\.[!*<]?|->|--|\+\+|&&|\|\||\?{1,2}|[-!%*+/<=>]=?|\b(?:gt|gte|lt|lte)\b/
/[(),.:;[\]{}]/
/(?:^|[^?])\?\s*\w+/
/\br(?:"(?:(?!")[^\\]|\\.)*"|'(?:(?!')[^\\]|\\.)*')/
/"(?:(?!"|\$\{)[^\\]|\\.|\$\{(?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\(\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*?\})*"|'(?:(?!'|\$\{)[^\\]|\\.|\$\{(?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\(\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*?\})*'/
/(?:^|[^\\])(?:\\\\)*\$\{(?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\((?:[^"'()<]|\(\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*?\}/
/\b(?:if|else|switch|case|default|break|for|repeat|while|do|until|continue|exit|return|globalvar|var|enum)\b/
/(?:\b0X[\dA-F]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?)[FLU]*/i
/[-%+=]=?|!=|\*{1,2}=?|\/{1,2}=?|<[<=>]?|>[=>]?|[&|~^]|\b(?:or|and|not|with|at|xor|not)\b/
/\b(?:self|other|all|noone|global|local|undefined|pointer_(?:invalid|null)|action_(?:stop|restart|continue|reverse)|pi|GM_build_date|GM_version|timezone_(?:local|utc)|gamespeed_(?:fps|microseconds)|ev_(?:create|destroy|step|alarm|keyboard|mouse|collision|other|draw|draw_(?:begin|end|pre|post)|keypress|keyrelease|trigger|(?:left|right|middle|no)_button|(?:left|right|middle)_press|(?:left|right|middle)_release|mouse_(?:enter|leave|wheel_up|wheel_down)|global_(?:left|right|middle)_button|global_(?:left|right|middle)_press|global_(?:left|right|middle)_release|joystick(?:1|2)_(?:left|right|up|down|button1|button2|button3|button4|button5|button6|button7|button8)|outside|boundary|game_start|game_end|room_start|room_end|no_more_lives|animation_end|end_of_path|no_more_health|user\d|step_(?:normal|begin|end)|gui|gui_begin|gui_end)|vk_(?:nokey|anykey|enter|return|shift|control|alt|escape|space|backspace|tab|pause|printscreen|left|right|up|down|home|end|delete|insert|pageup|pagedown|f\d|numpad\d|divide|multiply|subtract|add|decimal|lshift|lcontrol|lalt|rshift|rcontrol|ralt)|mb_(?:any|none|left|right|middle)|c_(?:aqua|black|blue|dkgray|fuchsia|gray|green|lime|ltgray|maroon|navy|olive|purple|red|silver|teal|white|yellow|orange)|fa_(?:left|center|right|top|middle|bottom|readonly|hidden|sysfile|volumeid|directory|archive)|pr_(?:pointlist|linelist|linestrip|trianglelist|trianglestrip|trianglefan)|bm_(?:complex|normal|add|max|subtract|zero|one|src_colour|inv_src_colour|src_color|inv_src_color|src_alpha|inv_src_alpha|dest_alpha|inv_dest_alpha|dest_colour|inv_dest_colour|dest_color|inv_dest_color|src_alpha_sat)|audio_(?:falloff_(?:none|inverse_distance|inverse_distance_clamped|linear_distance|linear_distance_clamped|exponent_distance|exponent_distance_clamped)|old_system|new_system|mono|stereo|3d)|cr_(?:default|none|arrow|cross|beam|size_nesw|size_ns|size_nwse|size_we|uparrow|hourglass|drag|appstart|handpoint|size_all)|spritespeed_framesper(?:second|gameframe)|asset_(?:object|unknown|sprite|sound|room|path|script|font|timeline|tiles|shader)|ds_type_(?:map|list|stack|queue|grid|priority)|ef_(?:explosion|ring|ellipse|firework|smoke|smokeup|star|spark|flare|cloud|rain|snow)|pt_shape_(?:pixel|disk|square|line|star|circle|ring|sphere|flare|spark|explosion|cloud|smoke|snow)|ps_(?:distr|shape)_(?:linear|gaussian|invgaussian|rectangle|ellipse|diamond|line)|ty_(?:real|string)|dll_(?:cdel|cdecl|stdcall)|matrix_(?:view|projection|world)|os_(?:win32|windows|macosx|ios|android|linux|unknown|winphone|win8native|psvita|ps4|xboxone|ps3|uwp)|browser_(?:not_a_browser|unknown|ie|firefox|chrome|safari|safari_mobile|opera|tizen|windows_store|ie_mobile)|device_ios_(?:unknown|iphone|iphone_retina|ipad|ipad_retina|iphone5|iphone6|iphone6plus)|device_(?:emulator|tablet)|display_(?:landscape|landscape_flipped|portrait|portrait_flipped)|of_challenge_(?:win|lose|tie)|leaderboard_type_(?:number|time_mins_secs)|cmpfunc_(?:never|less|equal|lessequal|greater|notequal|greaterequal|always)|cull_(?:noculling|clockwise|counterclockwise)|lighttype_(?:dir|point)|iap_(?:ev_storeload|ev_product|ev_purchase|ev_consume|ev_restore|storeload_ok|storeload_failed|status_uninitialised|status_unavailable|status_loading|status_available|status_processing|status_restoring|failed|unavailable|available|purchased|canceled|refunded)|fb_login_(?:default|fallback_to_webview|no_fallback_to_webview|forcing_webview|use_system_account|forcing_safari)|phy_joint_(?:anchor_1_x|anchor_1_y|anchor_2_x|anchor_2_y|reaction_force_x|reaction_force_y|reaction_torque|motor_speed|angle|motor_torque|max_motor_torque|translation|speed|motor_force|max_motor_force|length_1|length_2|damping_ratio|frequency|lower_angle_limit|upper_angle_limit|angle_limits|max_length|max_torque|max_force)|phy_debug_render_(?:aabb|collision_pairs|coms|core_shapes|joints|obb|shapes)|phy_particle_flag_(?:water|zombie|wall|spring|elastic|viscous|powder|tensile|colourmixing|colormixing)|phy_particle_group_flag_(?:solid|rigid)|phy_particle_data_flag_(?:typeflags|position|velocity|colour|color|category)|achievement_(?:our_info|friends_info|leaderboard_info|info|filter_(?:all_players|friends_only|favorites_only)|type_challenge|type_score_challenge|pic_loaded|show_(?:ui|profile|leaderboard|achievement|bank|friend_picker|purchase_prompt))|network_(?:socket_(?:tcp|udp|bluetooth)|type_(?:connect|disconnect|data|non_blocking_connect)|config_(?:connect_timeout|use_non_blocking_socket|enable_reliable_udp|disable_reliable_udp))|buffer_(?:fixed|grow|wrap|fast|vbuffer|network|u8|s8|u16|s16|u32|s32|u64|f16|f32|f64|bool|text|string|seek_start|seek_relative|seek_end|generalerror|outofspace|outofbounds|invalidtype)|gp_(?:face\d|shoulderl|shoulderr|shoulderlb|shoulderrb|select|start|stickl|stickr|padu|padd|padl|padr|axislh|axislv|axisrh|axisrv)|ov_(?:friends|community|players|settings|gamegroup|achievements)|lb_sort_(?:none|ascending|descending)|lb_disp_(?:none|numeric|time_sec|time_ms)|ugc_(?:result_success|filetype_(?:community|microtrans)|visibility_(?:public|friends_only|private)|query_RankedBy(?:Vote|PublicationDate|Trend|NumTimesReported|TotalVotesAsc|VotesUp|TextSearch)|query_(?:AcceptedForGameRankedByAcceptanceDate|FavoritedByFriendsRankedByPublicationDate|CreatedByFriendsRankedByPublicationDate|NotYetRated)|sortorder_CreationOrder(?:Desc|Asc)|sortorder_(?:TitleAsc|LastUpdatedDesc|SubscriptionDateDesc|VoteScoreDesc|ForModeration)|list_(?:Published|VotedOn|VotedUp|VotedDown|WillVoteLater|Favorited|Subscribed|UsedOrPlayed|Followed)|match_(?:Items|Items_Mtx|Items_ReadyToUse|Collections|Artwork|Videos|Screenshots|AllGuides|WebGuides|IntegratedGuides|UsableInGame|ControllerBindings))|vertex_usage_(?:position|colour|color|normal|texcoord|textcoord|blendweight|blendindices|psize|tangent|binormal|fog|depth|sample)|vertex_type_(?:float\d|colour|color|ubyte4)|layerelementtype_(?:undefined|background|instance|oldtilemap|sprite|tilemap|particlesystem|tile)|tile_(?:rotate|flip|mirror|index_mask)|input_type|se_(?:chorus|compressor|echo|equalizer|flanger|gargle|none|reverb)|text_type|(?:obj|scr|spr|rm)\w+)\b/
/\b(?:x|y|(?:x|y)(?:previous|start)|(?:h|v)speed|direction|speed|friction|gravity|gravity_direction|path_(?:index|position|positionprevious|speed|scale|orientation|endaction)|object_index|id|solid|persistent|mask_index|instance_(?:count|id)|alarm|timeline_(?:index|position|speed|running|loop)|visible|sprite_(?:index|width|height|xoffset|yoffset)|image_(?:number|index|speed|depth|xscale|yscale|angle|alpha|blend)|bbox_(?:left|right|top|bottom)|layer|phy_(?:rotation|(?:position|linear_velocity|speed|com|collision|col_normal)_(?:x|y)|angular_(?:velocity|damping)|position_(?:x|y)previous|speed|linear_damping|bullet|fixed_rotation|active|mass|inertia|dynamic|kinematic|sleeping|collision_points)|working_directory|webgl_enabled|view_(?:(?:y|x|w|h)view|(?:y|x|w|h)port|(?:v|h)(?:speed|border)|visible|surface_id|object|enabled|current|angle)|undefined|transition_(?:steps|kind|color)|temp_directory|show_(?:score|lives|health)|secure_mode|score|room_(?:width|speed|persistent|last|height|first|caption)|room|pointer_(?:null|invalid)|os_(?:version|type|device|browser)|mouse_(?:y|x|lastbutton|button)|lives|keyboard_(?:string|lastkey|lastchar|key)|iap_data|health|gamemaker_(?:version|registered|pro)|game_(?:save|project|display)_(?:id|name)|fps_real|fps|event_(?:type|object|number|action)|error_(?:occurred|last)|display_aa|delta_time|debug_mode|cursor_sprite|current_(?:year|weekday|time|second|month|minute|hour|day)|caption_(?:score|lives|health)|browser_(?:width|height)|background_(?:yscale|y|xscale|x|width|vtiled|vspeed|visible|showcolour|showcolor|index|htiled|hspeed|height|foreground|colour|color|blend|alpha)|async_load|application_surface|argument(?:_relitive|_count|\d)|argument|global|local|self|other)\b/
/;.*|\B\(.*?\)\B/
/\b[GM]\d+(?:\.\d+)?\b/
/\b[A-Z]/
/"(?:""|[^"])*"/
/\*\d+/
/\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|for|func|if|in|is|master|mastersync|match|not|null|onready|or|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\b/
/[A-Z_]\w*(?=[\t ]*\()/i
/\b[A-Z][\dA-Z_]*\b/
/->|:=|&&|\|\||<<|>>|[-!%&*+/<=>|]=?|[~^]/
/[(),.:;[\]{}]/
/@?(?:(?:"(?:(?!")[^\n\\]|\\[^])*"|'(?:(?!')[^\n\\]|\\[^])*')(?!"|')|"""(?:[^\\]|\\[^])*?""")/
/(?:^(?:class_name|class|extends)[\t ]+|^export\([\t ]*|\bas[\t ]+|(?:\b(?:const|var)[\t ]|[(,])[\t ]*\w+[\t ]*:[\t ]*|->[\t ]*)[A-Z_a-z]\w*/m
/\b0b[01_]+\b|\b0x[\dA-F_a-f]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[-+]?[\d_]+)?\b/
/\b(?:INF|NAN|PI|TAU)\b/
/^\s*\d+ +(?:@\w[^\0-\x1f@\x7f\xff-\uffff]*@ +)?\w+ +.+/m
/^\s*\d+ +(?:@\w[^\0-\x1f@\x7f\xff-\uffff]*@ +)?\w+/m
/^\s*\d+/m
/@\w[^\0-\x1f@\x7f\xff-\uffff]*@/
/^@\w[^\0-\x1f@\x7f\xff-\uffff]*@$/
/"""[^]+?"""|'''[^]+?'''/
/^[\t ]*#.*/m
/^[\t ]*@\S*/m
/(?:^|\r?\n|\r)[\t ]*(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Caracter\xedstica|Egenskab|Egenskap|Eiginleiki|Feature|F\u012b\u010da|Fitur|Fonctionnalit\xe9|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Func\u0163ionalitate|Func\u021bionalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalit\u0101te|Funkcionalnost|Funkcja|Funksie|Funktionalit\xe4t|Funktionalit\xe9it|Funzionalit\xe0|Hwaet|Hw\xe6t|Jellemz\u0151|Karakteristik|laH|Lastnost|Mak|Mogucnost|Mogu\u0107nost|Moznosti|Mo\u017enosti|OH HAI|Omadus|Ominaisuus|Osobina|\xd6zellik|perbogh|poQbogh malja'|Potrzeba biznesowa|Po\u017eadavek|Po\u017eiadavka|Pretty much|Qap|Qu'meH 'ut|Savyb\u0117|T\xednh n\u0103ng|Trajto|Vermo\xeb|Vlastnos\u0165|W\u0142a\u015bciwo\u015b\u0107|Zna\u010dilnost|\u0394\u03c5\u03bd\u03b1\u03c4\u03cc\u03c4\u03b7\u03c4\u03b1|\u039b\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b1|\u041c\u043e\u0433\u0443\u045b\u043d\u043e\u0441\u0442|\u041c\u04e9\u043c\u043a\u0438\u043d\u043b\u0435\u043a|\u041e\u0441\u043e\u0431\u0438\u043d\u0430|\u0421\u0432\u043e\u0439\u0441\u0442\u0432\u043e|\u04ae\u0437\u0435\u043d\u0447\u04d9\u043b\u0435\u043a\u043b\u0435\u043b\u0435\u043a|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b|\u0424\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u043d\u043e\u0441\u0442|\u0424\u0443\u043d\u043a\u0446\u0438\u044f|\u0424\u0443\u043d\u043a\u0446\u0456\u043e\u043d\u0430\u043b|\u05ea\u05db\u05d5\u05e0\u05d4|\u062e\u0627\u0635\u064a\u0629|\u062e\u0635\u0648\u0635\u06cc\u062a|\u0635\u0644\u0627\u062d\u06cc\u062a|\u06a9\u0627\u0631\u0648\u0628\u0627\u0631 \u06a9\u06cc \u0636\u0631\u0648\u0631\u062a|\u0648\u0650\u06cc\u0698\u06af\u06cc|\u0930\u0942\u092a \u0932\u0947\u0916|\u0a16\u0a3e\u0a38\u0a40\u0a05\u0a24|\u0a28\u0a15\u0a36 \u0a28\u0a41\u0a39\u0a3e\u0a30|\u0a2e\u0a41\u0a39\u0a3e\u0a02\u0a26\u0a30\u0a3e|\u0c17\u0c41\u0c23\u0c2e\u0c41|\u0cb9\u0cc6\u0c9a\u0ccd\u0c9a\u0cb3|\u0e04\u0e27\u0e32\u0e21\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e18\u0e38\u0e23\u0e01\u0e34\u0e08|\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16|\u0e42\u0e04\u0e23\u0e07\u0e2b\u0e25\u0e31\u0e01|\uae30\ub2a5|\u30d5\u30a3\u30fc\u30c1\u30e3|\u529f\u80fd|\u6a5f\u80fd):(?:[^:]+(?:\r?\n|\r|$))*/
/^[\t ]*(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|\xc6r|Agtergrond|All y'all|Antecedentes|Antecedents|Atbur\xf0ar\xe1s|Atbur\xf0ar\xe1sir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|B\u1ed1i c\u1ea3nh|Cefndir|Cenario|Cen\xe1rio|Cenario de Fundo|Cen\xe1rio de Fundo|Cenarios|Cen\xe1rios|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|D\xe6mi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delinea\xe7\xe3o do Cen\xe1rio|Dis is what went down|D\u1eef li\u1ec7u|Dyagram senaryo|Dyagram Senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cen\xe1rio|Examples|EXAMPLZ|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgat\xf3k\xf6nyv|Forgat\xf3k\xf6nyv v\xe1zlat|Fundo|Ge\xe7mi\u015f|ghantoH|Grundlage|Hannergrond|H\xe1tt\xe9r|Heave to|Istorik|Juhtumid|Keadaan|Khung k\u1ecbch b\u1ea3n|Khung t\xecnh hu\u1ed1ng|K\u1ecbch b\u1ea3n|Koncept|Konsep skenario|Kont\xe8ks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut|lut chovnatlh|lutmey|L\xfdsing Atbur\xf0ar\xe1sar|L\xfdsing D\xe6ma|Menggariskan Senario|MISHUN|MISHUN SRSLY|mo'|N\xe1\u010drt Scen\xe1ra|N\xe1\u010drt Sc\xe9n\xe1\u0159e|N\xe1\u010drt Scen\xe1ru|Oris scenarija|\xd6rnekler|Osnova|Osnova Scen\xe1ra|Osnova sc\xe9n\xe1\u0159e|Osnutek|Ozadje|Paraugs|Pavyzd\u017eiai|P\xe9ld\xe1k|Piem\u0113ri|Plan du sc\xe9nario|Plan du Sc\xe9nario|Plan senaryo|Plan Senaryo|Plang vum Szenario|Pozad\xed|Pozadie|Pozadina|Pr\xedklady|P\u0159\xedklady|Primer|Primeri|Primjeri|Przyk\u0142ady|Raamstsenaarium|Reckon it's like|Rerefons|Scen\xe1r|Sc\xe9n\xe1\u0159|Scenarie|Scenarij|Scenarijai|Scenarijaus \u0161ablonas|Scenariji|Scen\u0101rijs|Scen\u0101rijs p\u0113c parauga|Scenarijus|Scenario|Sc\xe9nario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se \xf0e|Se the|Se \xfee|Senario|Senaryo|Senaryo deskripsyon|Senaryo Deskripsyon|Senaryo tasla\u011f\u0131|Shiver me timbers|Situ\u0101cija|Situai|Situasie|Situasie Uiteensetting|Skenario|Skenario konsep|Skica|Structura scenariu|Structur\u0103 scenariu|Struktura scenarija|Stsenaarium|Swa|Swa hwaer swa|Swa hw\xe6r swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|T\xecnh hu\u1ed1ng|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo-ho-ho|You'll wanna|Za\u0142o\u017cenia|\u03a0\u03b1\u03c1\u03b1\u03b4\u03b5\u03af\u03b3\u03bc\u03b1\u03c4\u03b1|\u03a0\u03b5\u03c1\u03b9\u03b3\u03c1\u03b1\u03c6\u03ae \u03a3\u03b5\u03bd\u03b1\u03c1\u03af\u03bf\u03c5|\u03a3\u03b5\u03bd\u03ac\u03c1\u03b9\u03b1|\u03a3\u03b5\u03bd\u03ac\u03c1\u03b9\u03bf|\u03a5\u03c0\u03cc\u03b2\u03b1\u03b8\u03c1\u03bf|\u041a\u0435\u0440\u0435\u0448|\u041a\u043e\u043d\u0442\u0435\u043a\u0441\u0442|\u041a\u043e\u043d\u0446\u0435\u043f\u0442|\u041c\u0438\u0441\u0430\u043b\u043b\u0430\u0440|\u041c\u0438\u0441\u043e\u043b\u043b\u0430\u0440|\u041e\u0441\u043d\u043e\u0432\u0430|\u041f\u0435\u0440\u0435\u0434\u0443\u043c\u043e\u0432\u0430|\u041f\u043e\u0437\u0430\u0434\u0438\u043d\u0430|\u041f\u0440\u0435\u0434\u0438\u0441\u0442\u043e\u0440\u0438\u044f|\u041f\u0440\u0435\u0434\u044b\u0441\u0442\u043e\u0440\u0438\u044f|\u041f\u0440\u0438\u043a\u043b\u0430\u0434\u0438|\u041f\u0440\u0438\u043c\u0435\u0440|\u041f\u0440\u0438\u043c\u0435\u0440\u0438|\u041f\u0440\u0438\u043c\u0435\u0440\u044b|\u0420\u0430\u043c\u043a\u0430 \u043d\u0430 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u0421\u043a\u0438\u0446\u0430|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0458\u0430|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u044f|\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043d\u0430\u0440\u0456\u044e|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\u0441\u0438|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439\u043d\u044b\u04a3 \u0442\u04e9\u0437\u0435\u043b\u0435\u0448\u0435|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0458\u0438|\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u043e|\u0421\u0446\u0435\u043d\u0430\u0440\u0456\u0439|\u0422\u0430\u0440\u0438\u0445|\u04ae\u0440\u043d\u04d9\u043a\u043b\u04d9\u0440|\u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea|\u05e8\u05e7\u05e2|\u05ea\u05d1\u05e0\u05d9\u05ea \u05ea\u05e8\u05d7\u05d9\u05e9|\u05ea\u05e8\u05d7\u05d9\u05e9|\u0627\u0644\u062e\u0644\u0641\u064a\u0629|\u0627\u0644\u06af\u0648\u06cc \u0633\u0646\u0627\u0631\u06cc\u0648|\u0627\u0645\u062b\u0644\u0629|\u067e\u0633 \u0645\u0646\u0638\u0631|\u0632\u0645\u06cc\u0646\u0647|\u0633\u0646\u0627\u0631\u06cc\u0648|\u0633\u064a\u0646\u0627\u0631\u064a\u0648|\u0633\u064a\u0646\u0627\u0631\u064a\u0648 \u0645\u062e\u0637\u0637|\u0645\u062b\u0627\u0644\u06cc\u06ba|\u0645\u0646\u0638\u0631 \u0646\u0627\u0645\u06d2 \u06a9\u0627 \u062e\u0627\u06a9\u06c1|\u0645\u0646\u0638\u0631\u0646\u0627\u0645\u06c1|\u0646\u0645\u0648\u0646\u0647 \u0647\u0627|\u0909\u0926\u093e\u0939\u0930\u0923|\u092a\u0930\u093f\u0926\u0943\u0936\u094d\u092f|\u092a\u0930\u093f\u0926\u0943\u0936\u094d\u092f \u0930\u0942\u092a\u0930\u0947\u0916\u093e|\u092a\u0943\u0937\u094d\u0920\u092d\u0942\u092e\u093f|\u0a09\u0a26\u0a3e\u0a39\u0a30\u0a28\u0a3e\u0a02|\u0a2a\u0a1f\u0a15\u0a25\u0a3e|\u0a2a\u0a1f\u0a15\u0a25\u0a3e \u0a22\u0a3e\u0a02\u0a1a\u0a3e|\u0a2a\u0a1f\u0a15\u0a25\u0a3e \u0a30\u0a42\u0a2a \u0a30\u0a47\u0a16\u0a3e|\u0a2a\u0a3f\u0a1b\u0a4b\u0a15\u0a5c|\u0c09\u0c26\u0c3e\u0c39\u0c30\u0c23\u0c32\u0c41|\u0c15\u0c25\u0c28\u0c02|\u0c28\u0c47\u0c2a\u0c25\u0c4d\u0c2f\u0c02|\u0c38\u0c28\u0c4d\u0c28\u0c3f\u0c35\u0c47\u0c36\u0c02|\u0c89\u0ca6\u0cbe\u0cb9\u0cb0\u0ca3\u0cc6\u0c97\u0cb3\u0cc1|\u0c95\u0ca5\u0cbe\u0cb8\u0cbe\u0cb0\u0cbe\u0c82\u0cb6|\u0cb5\u0cbf\u0cb5\u0cb0\u0ca3\u0cc6|\u0cb9\u0cbf\u0ca8\u0ccd\u0ca8\u0cc6\u0cb2\u0cc6|\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e02\u0e2d\u0e07\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c|\u0e0a\u0e38\u0e14\u0e02\u0e2d\u0e07\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07|\u0e0a\u0e38\u0e14\u0e02\u0e2d\u0e07\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c|\u0e41\u0e19\u0e27\u0e04\u0e34\u0e14|\u0e2a\u0e23\u0e38\u0e1b\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c|\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c|\ubc30\uacbd|\uc2dc\ub098\ub9ac\uc624|\uc2dc\ub098\ub9ac\uc624 \uac1c\uc694|\uc608|\u30b5\u30f3\u30d7\u30eb|\u30b7\u30ca\u30ea\u30aa|\u30b7\u30ca\u30ea\u30aa\u30a2\u30a6\u30c8\u30e9\u30a4\u30f3|\u30b7\u30ca\u30ea\u30aa\u30c6\u30f3\u30d7\u30ec|\u30b7\u30ca\u30ea\u30aa\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8|\u30c6\u30f3\u30d7\u30ec|\u4f8b|\u4f8b\u5b50|\u5267\u672c|\u5267\u672c\u5927\u7eb2|\u5287\u672c|\u5287\u672c\u5927\u7db1|\u573a\u666f|\u573a\u666f\u5927\u7eb2|\u5834\u666f|\u5834\u666f\u5927\u7db1|\u80cc\u666f):[^\n\r:]*/m
/(?:\r?\n|\r)[\t ]*\|.+\|.*(?:(?:\r?\n|\r)[\t ]*\|.+\|.*)+/
/(?:\r?\n|\r)[\t ]*\|.+\|.*/
/^[\t ]+(?:'ach|'a|'ej|7|a|A tak\xe9|A taktie\u017e|A tie\u017e|A z\xe1rove\u0148|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|At\xe8s|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Bi\u1ebft|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|C\xe2nd|Cando|Cand|Ce|Cuando|\u010ce|\xd0a \xf0e|\xd0a|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Da\u0163i fiind|Da\u021bi fiind|Dato|DEN|Den youse gotta|Dengan|De|Diberi|Diyelim ki|Donada|Donat|Donita\u0135o|Do|Dun|Duota|\xd0urh|Eeldades|Ef|E\u011fer ki|Entao|Ent\xe3o|Ent\xf3n|Entonces|En|Epi|E|\xc9s|Etant donn\xe9e|Etant donn\xe9|Et|\xc9tant donn\xe9es|\xc9tant donn\xe9e|\xc9tant donn\xe9|Etant donn\xe9es|Etant donn\xe9s|\xc9tant donn\xe9s|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Je\u015bli|Je\u017celi|Kadar|Kada|Kad|Kai|Kaj|Kdy\u017e|Ke\u010f|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|L\xe8 sa a|L\xe8|Logo|Lorsqu'<|Lorsque|m\xe4|Maar|Mais|Maj\u0105c|Majd|Maka|Manawa|Mas|Ma|Menawa|Men|Mutta|Nalikaning|Nalika|Nanging|N\xe5r|N\xe4r|Nato|Nh\u01b0ng|Niin|Njuk|O zaman|Og|Och|Oletetaan|Onda|Ond|Oraz|Pak|Pero|Per\xf2|Podano|Pokia\u013e|Pokud|Potem|Potom|Privzeto|Pryd|qaSDI'|Quando|Quand|Quan|S\xe5|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|\u015ei|\u0218i|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Th\xec|Thurh|Toda|Too right|ugeholl|Und|Un|V\xe0|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za p\u0159edpokladu|Zadani|Zadano|Zadan|Zadate|Zadato|Zak\u0142adaj\u0105c|Zaradi|Zatati|\xdea \xfee|\xdea|\xde\xe1|\xdeegar|\xdeurh|\u0391\u03bb\u03bb\u03ac|\u0394\u03b5\u03b4\u03bf\u03bc\u03ad\u03bd\u03bf\u03c5|\u039a\u03b1\u03b9|\u038c\u03c4\u03b1\u03bd|\u03a4\u03cc\u03c4\u03b5|\u0410 \u0442\u0430\u043a\u043e\u0436|\u0410\u0433\u0430\u0440|\u0410\u043b\u0435|\u0410\u043b\u0438|\u0410\u043c\u043c\u043e|\u0410|\u04d8\u0433\u04d9\u0440|\u04d8\u0439\u0442\u0438\u043a|\u04d8\u043c\u043c\u0430|\u0411\u0438\u0440\u043e\u043a|\u0412\u0430|\u0412\u04d9|\u0414\u0430\u0434\u0435\u043d\u043e|\u0414\u0430\u043d\u043e|\u0414\u043e\u043f\u0443\u0441\u0442\u0438\u043c|\u0415\u0441\u043b\u0438|\u0417\u0430\u0434\u0430\u0442\u0435|\u0417\u0430\u0434\u0430\u0442\u0438|\u0417\u0430\u0434\u0430\u0442\u043e|\u0418|\u0406|\u041a \u0442\u043e\u043c\u0443 \u0436\u0435|\u041a\u0430\u0434\u0430|\u041a\u0430\u0434|\u041a\u043e\u0433\u0430\u0442\u043e|\u041a\u043e\u0433\u0434\u0430|\u041a\u043e\u043b\u0438|\u041b\u04d9\u043a\u0438\u043d|\u041b\u0435\u043a\u0438\u043d|\u041d\u04d9\u0442\u0438\u0497\u04d9\u0434\u04d9|\u041d\u0435\u0445\u0430\u0439|\u041d\u043e|\u041e\u043d\u0434\u0430|\u041f\u0440\u0438\u043f\u0443\u0441\u0442\u0438\u043c\u043e, \u0449\u043e|\u041f\u0440\u0438\u043f\u0443\u0441\u0442\u0438\u043c\u043e|\u041f\u0443\u0441\u0442\u044c|\u0422\u0430\u043a\u0436\u0435|\u0422\u0430|\u0422\u043e\u0433\u0434\u0430|\u0422\u043e\u0434\u0456|\u0422\u043e|\u0423\u043d\u0434\u0430|\u04ba\u04d9\u043c|\u042f\u043a\u0449\u043e|\u05d0\u05d1\u05dc|\u05d0\u05d6\u05d9|\u05d0\u05d6|\u05d1\u05d4\u05d9\u05e0\u05ea\u05df|\u05d5\u05d2\u05dd|\u05db\u05d0\u05e9\u05e8|\u0622\u0646\u06af\u0627\u0647|\u0627\u0630\u0627\u064b|\u0627\u06af\u0631|\u0627\u0645\u0627|\u0627\u0648\u0631|\u0628\u0627 \u0641\u0631\u0636|\u0628\u0627\u0644\u0641\u0631\u0636|\u0628\u0641\u0631\u0636|\u067e\u06be\u0631|\u062a\u0628|\u062b\u0645|\u062c\u0628|\u0639\u0646\u062f\u0645\u0627|\u0641\u0631\u0636 \u06a9\u06cc\u0627|\u0644\u0643\u0646|\u0644\u06cc\u06a9\u0646|\u0645\u062a\u0649|\u0647\u0646\u06af\u0627\u0645\u06cc|\u0648|\u0905\u0917\u0930|\u0914\u0930|\u0915\u0926\u093e|\u0915\u093f\u0928\u094d\u0924\u0941|\u091a\u0942\u0902\u0915\u093f|\u091c\u092c|\u0924\u0925\u093e|\u0924\u0926\u093e|\u0924\u092c|\u092a\u0930\u0928\u094d\u0924\u0941|\u092a\u0930|\u092f\u0926\u093f|\u0a05\u0a24\u0a47|\u0a1c\u0a26\u0a4b\u0a02|\u0a1c\u0a3f\u0a35\u0a47\u0a02 \u0a15\u0a3f|\u0a1c\u0a47\u0a15\u0a30|\u0a24\u0a26|\u0a2a\u0a30|\u0c05\u0c2a\u0c4d\u0c2a\u0c41\u0c21\u0c41|\u0c08 \u0c2a\u0c30\u0c3f\u0c38\u0c4d\u0c25\u0c3f\u0c24\u0c3f\u0c32\u0c4b|\u0c15\u0c3e\u0c28\u0c3f|\u0c1a\u0c46\u0c2a\u0c4d\u0c2a\u0c2c\u0c21\u0c3f\u0c28\u0c26\u0c3f|\u0c2e\u0c30\u0c3f\u0c2f\u0c41|\u0c86\u0ca6\u0cb0\u0cc6|\u0ca8\u0c82\u0ca4\u0cb0|\u0ca8\u0cbf\u0cd5\u0ca1\u0cbf\u0ca6|\u0cae\u0ca4\u0ccd\u0ca4\u0cc1|\u0cb8\u0ccd\u0ca5\u0cbf\u0ca4\u0cbf\u0caf\u0ca8\u0ccd\u0ca8\u0cc1|\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e43\u0e2b\u0e49|\u0e14\u0e31\u0e07\u0e19\u0e31\u0e49\u0e19|\u0e41\u0e15\u0e48|\u0e40\u0e21\u0e37\u0e48\u0e2d|\u0e41\u0e25\u0e30|\uadf8\ub7ec\uba74<|\uadf8\ub9ac\uace0<|\ub2e8<|\ub9cc\uc57d<|\ub9cc\uc77c<|\uba3c\uc800<|\uc870\uac74<|\ud558\uc9c0\ub9cc<|\u304b\u3064<|\u3057\u304b\u3057<|\u305f\u3060\u3057<|\u306a\u3089\u3070<|\u3082\u3057<|\u4e26\u4e14<|\u4f46\u3057<|\u4f46\u662f<|\u5047\u5982<|\u5047\u5b9a<|\u5047\u8a2d<|\u5047\u8bbe<|\u524d\u63d0<|\u540c\u65f6<|\u540c\u6642<|\u5e76\u4e14<|\u5f53<|\u7576<|\u800c\u4e14<|\u90a3\u4e48<|\u90a3\u9ebc<)(?=[\t ])/m
/"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'/
/<[^>]+?>/
/[^\n\r:]+:/
/\|/
/:[^\n\r]+/
/:[^\n\r]*/
/\s*[^\s|][^|]*/
/^#.*/m
/^[-\u2013].*/m
/^\+.*/m
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'/
/^commit \w{40}$/m
/^.*\$ git .*$/m
/\s-{1,2}\w+/
/\b(?:attribute|const|uniform|varying|buffer|shared|coherent|volatile|restrict|readonly|writeonly|atomic_uint|layout|centroid|flat|smooth|noperspective|patch|sample|break|continue|do|for|while|switch|case|default|if|else|subroutine|in|out|inout|float|double|int|void|bool|true|false|invariant|precise|discard|return|d?mat[234](?:x[234])?|[bdiu]?vec[234]|uint|lowp|mediump|highp|precision|[iu]?sampler[123]D|[iu]?samplerCube|sampler[12]DShadow|samplerCubeShadow|[iu]?sampler[12]DArray|sampler[12]DArrayShadow|[iu]?sampler2DRect|sampler2DRectShadow|[iu]?samplerBuffer|[iu]?sampler2DMS(?:Array)?|[iu]?samplerCubeArray|samplerCubeArrayShadow|[iu]?image[123]D|[iu]?image2DRect|[iu]?imageCube|[iu]?imageBuffer|[iu]?image[12]DArray|[iu]?imageCubeArray|[iu]?image2DMS(?:Array)?|struct|common|partition|active|asm|class|union|enum|typedef|template|this|resource|goto|inline|noinline|public|static|extern|external|interface|long|short|half|fixed|unsigned|superp|input|output|hvec[234]|fvec[234]|sampler3DRect|filter|sizeof|cast|namespace|using)\b/
/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/
/\b(?:_|iota|nil|true|false)\b/
/(?:\b0X[\dA-F]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?)I?/i
/[!%*/=^]=?|\+[+=]?|-[-=]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./
/\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/
/"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|\`(?:\\[^]|(?!\`)[^\\])*\`/
/(?:\B-|(?<!\w)(?=\w)|(?<=\w)(?!\w))\d+(?:\.\d+)?(?:E[-+]?\d+)?\b/i
/\$[A-Z_]\w*/i
/\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/
/[!&=|]|\.{3}/
/[!(),:=[\]{}]/
/\b(?!ID(?:(?<!\w)\w|(?<=\w)(?!\w)))[A-Z][\dA-Z_]*\b/
/(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\n\r"\\])*")(?=\s*[A-Z_])/i
/"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\n\r"\\])*"/
/@[A-Z_]\w*/i
/[A-Z_]\w*(?=\s*(?:\((?:[^"()]|"(?:\\.|[^\n\r"\\])*")*\))?:)/i
/(?:\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[A-Z_a-z]\w*/
/(?:\bfragment\s+|\.{3}\s*(?!on(?:(?<!\w)\w|(?<=\w)(?!\w))))[A-Z_a-z]\w*/
/^"(?:"")?(?![]Unknown:\\1[])[^]+(?=[]Unknown:\\1[]$)/
/^>(?:[\t ]*>)*/m
/^\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$)\|?[\t ]*:?-{3,}:?[\t ]*(?:\|[\t ]*:?-{3,}:?[\t ]*)+\|?(?:\n|\r\n?)(?:\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$))*/m
/^\s*(?:\*(?:[\t ]*\*){2,}|-(?:[\t ]*-){2,})(?=\s*$)/m
/^\s*(?:[-*+]|\d+\.)(?=[\t ].)/m
/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/
/(?:^|[^\\])(?:\\{2})*(?:\b__(?:(?!_)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?))|_(?:(?!_)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+_)+__\b|\*\*(?:(?!\*)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?))|\*(?:(?!\*)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+\*)+\*\*)/
/(?:^|[^\\])(?:\\{2})*(?:\b_(?:(?!_)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?))|__(?:(?!_)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+__)+_\b|\*(?:(?!\*)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?))|\*\*(?:(?!\*)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+\*\*)+\*)/
/(?:^|[^\\])(?:\\{2})*(?:~~(?:(?!~)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+?~~|~(?:(?!~)(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+?~)/
/(?:^|[^\\])(?:\\{2})*!?\[(?:(?!\])(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])(?:\\.|[^\n\r\\]|(?:\n|\r\n?)(?!\n|\r\n?)))+\])/
/(?:(?:^|\n)[\t ]*\n|(?:^|\r\n?)[\t ]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/
/\`\`.+?\`\`|\`[^\n\r\`]+\`/
/^\`\`\`[^]*?^\`\`\`$/m
/\S.*(?:\n|\r\n?)(?:={2,}|-{2,})(?=[\t ]*$)/m
/^\s*#+.+/m
/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/
/^[!:[\]]|[<>]/
/\*\*|__/
/[*_]/
/~{1,2}/
/^\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$)\|?[\t ]*:?-{3,}:?[\t ]*(?:\|[\t ]*:?-{3,}:?[\t ]*)+\|?(?:\n|\r\n?)(?:\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$))*$/
/^\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$)\|?[\t ]*:?-{3,}:?[\t ]*(?:\|[\t ]*:?-{3,}:?[\t ]*)+\|?(?:\n|\r\n?)$/
/^\|?(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+(?:\|(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+)+\|?(?:\n|\r\n?|$)$/
/\`\`\`/
/={2,}$|-{2,}$/
/^#+|#+$/
/^!?\[[^\]]+/
/^..[^]+(?=..$)/
/^.[^]+(?=.$)/
/^~{1,2}[^]+(?=[]Unknown:\\1[]$)/
/\[[^\]]+(?=\]$)/
/^!?\[[^\]]+(?=\])/
/"(?:\\.|[^"\\])*"(?=\)$)/
/\||:?-{3,}:?/
/^\`\`\`.*(?:\n|\r\n?)[^]+?(?=(?:\n|\r\n?)^\`\`\`$)/m
/^\`\`\`.+/
/(?:\\.|\`\`(?:[^\n\r\`]|\`(?!\`))+\`\`|\`[^\n\r\`]+\`|[^\n\r\\\\\`|])+/
/\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/
/\b(?:0B[01_]+|0X[\dA-F_]+(?:\.[-\dA-FP_]+)?|[\d_]+(?:\.[\d_]+)?(?:E[-+]?\d+)?)[DFGIL]?\b/i
/\b(?:setup|given|when|then|and|cleanup|expect|where):/
/\.+|[$(),.:;[\]{}]/
/#!.+/
/(?:^|[^.])@\w+/
/(?:^|[^.])(?:~|={1,2}~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[&@]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>{1,2}=?|=)?|&[&=]?|\|[=|]?|\/=?|\^=?|%=?)/
/"""(?:[^\\]|\\[^])*?"""|'''(?:[^\\]|\\[^])*?'''|\$\/(?:[^$/]|\$(?:[$/]|(?![$/]))|\/(?!\$))*\/\$/
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'|\/(?:\\.|(?!\/)[^\n\r\\])*\//
/(?:^|\r?\n|\r)[\t ]*(?:\/|-#).*(?:(?:\r?\n|\r)[]Unknown:\\2[][\t ]+.+)*/
/(?:^|\r?\n|\r)[\t ]*:ruby(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:[-\w]+(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*<.+/
/(?:^|\r?\n|\r)[\t ]*!!!(?: .+)?/
/(?:^|\r?\n|\r)[\t ]*[#%.][\w#\-.]*[-\w](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[/<>]*/
/(?:^|\r?\n|\r)[\t ]*(?:[-~]|[!&]?=).+/
/(?:^|\r?\n|\r)[\t ]*[-!&=~]+/
/(?:^|\r?\n|\r)[\t ]*(?:[-~]|[!&]?=).*,[\t ]*(?:(?:\r?\n|\r)[]Unknown:\\2[][\t ]+.*,[\t ]*)*(?:\r?\n|\r)[]Unknown:\\2[][\t ]+.+/
/(?:^|\r?\n|\r)[\t ]*(?:[-~]|[!&]?=).*\|[\t ]*(?:(?:\r?\n|\r)[]Unknown:\\2[][\t ]+.*\|[\t ]*)*/
/[<>]/
/^:[-\w]+/
/(?:^|[^#])\{(?:\{[^}]+\}|[^}])+\}/
/\([^)]+\)/
/\[[^\]]+\]/
/[-\w:]+(?=\s*!?=|\s*[),])/
/[(),=]/
/=\s*(?:"(?:\\.|[^\n\r"\\])*"|[^\s)]+)/
/(?:@\{[-\w]+\}|[-\w])+(?:\+_?)?(?=\s*:)/
/[-*+/]/
/(?:[-A-Z]+-)?URL(?=\()/i
/\$[-\w]+|#\{\$[-\w]+\}/
/@[-\w]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^();{}])*?(?=\s*\{)/
/(?:@\{[-\w]+\}|[^\s;@{}])(?:@\{[-\w]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^();@{}])*?(?=\s*\{)/
/@{1,2}[-\w]+/
/[;{]\s*[#.](?!\d)[-\w]+.*?(?=[(;])/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|\/\/.*)/
/@(?:IF|ELSE(?: IF)?|FOR|EACH|WHILE|IMPORT|EXTEND|DEBUG|WARN|MIXIN|INCLUDE|FUNCTION|RETURN|CONTENT)/i
/@[-\w]+(?:\([^()]+\)|[^(])*?(?=\s+[;{])/
/(?=\S)[^();@{}]?(?:[^();@{}]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/
/(?:[-\w]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/
/%[-\w]+/
/\B!(?:DEFAULT|OPTIONAL)\b/i
/\bnull\b/
/\s(?:[-%*+/]|[!=]=|<=?|>=?|and|or|not)(?=\s)/
/<\/?(?!\d)[\dA-Z]+(?:\s+[^\s/=>]+(?:=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|[^\s"'=>]+))?)*\s*\/?>/i
/(?:^|\r|\n)\S[^]*?(?=$|\r?\n\r?\n|\r\r)/
/(?:^|\r?\n|\r)[\t ]*:css(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:coffee(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:erb(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:javascript(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:less(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:markdown(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:scss(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|\r?\n|\r)[\t ]*:textile(?:(?:\r?\n|\r)(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/
/(?:^|[^\\])\/\/.*/
/[():]/
/@+[-\w]+/
/@[-\w]+\s*:/
/ +(?:from|through)(?= )/
/@[-\w]+/
/&/
/^[a-z]\w*(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>])*\./
/^[#*]+(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*\s+.+/m
/^(?:(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>~^])+\.\s*)?(?:\|(?:(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>_~^]|[/\\]\d+)+\.)?[^|]*)+\|/m
/(?:^|[^\dA-Z])(?:\*\*(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?\*\*|__(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?__|\?\?(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?\?\?|%(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?%|\*(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?\*|\+(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?\+|-(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?-|@(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?@|\^(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?\^|_(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?_|~(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?~)(?![\dA-Z])/i
/^\[[^\]]+\]\S+$/m
/"(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*[^"]+":.+?(?=[^\w/]?(?:\s|$))/
/!(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>])*[^\s!()]+(?:\([^)]+\))?!(?::.+?(?=[^\w/]?(?:\s|$)))?/
/\b\[\d+\]/
/\b[\dA-Z]+\([^)]+\)/
/\b\((?:TM|R|C)\)/
/^[a-z]\w*/
/\.$/
/^[#*]+/
/\||^\./
/[-%*+?@_~^]+/
/[":]/
/[!:]/
/^[a-z]\w*(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>])+(?=\.)/
/^[#*]+(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})+/
/(?:^|\|(?:\r?\n|\r)?)(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>_~^]|[/\\]\d+)+(?=\.)/
/^\*{1,2}(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=[]Unknown:\\2[])/
/^_{1,2}(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=[]Unknown:\\2[])/
/^\?\?(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=\?\?)/
/^@(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=@)/
/^\+(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=\+)/
/^-(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=-)/
/^%(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*.+?(?=%)/
/(?:^\*\*|__|\?\?|[-%*+@_~^])(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})+/
/\[[^\]]+(?=\])/
/\]\S+$/
/^"(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})*[^"]+(?=")/
/^"(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\})+/
/:.+/
/^!(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>])*[^\s!()]+(?:\([^)]+\))?(?=!)/
/^!(?:\([^\n()|]+\)|\[[^\n\]]+\]|\{[^\n}]+\}|\)|\((?![^\n()|]+\))|[<=>])+/
/\([^)]+(?=\))/
/[/\\]\d+|\S/
/\{[^}]+\}/
/\{\{![^]*?\}\}/
/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/
/[^-\0-\x20$0-9?A-Z_a-z\x7f-\uffff]/
/[^\s!"#\x25-\x2c/;<=>@[\\\]\^\`{|}~]+/
/^\{{2,3}|\}{2,3}$/
/^\s*~?\s*[#/]\S+?(?=\s*~?\s*$|\s)/
/'(?:[^'\\]|\\(?:["&'\\abfnrtv]|\^[\x40-\x5b\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[\dA-Fa-f]+))'/
/\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/
/\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/
/\b(?:\d+(?:\.\d+)?(?:E[-+]?\d+)?|0O[0-7]+|0X[\dA-F]+)\b/i
/\s\.\s|[!#$%&*+\-./:<=>?@\\|~^]*\.[!#$%&*+\-./:<=>?@\\|~^]+|[!#$%&*+\-./:<=>?@\\|~^]+\.[!#$%&*+\-./:<=>?@\\|~^]*|[-!#$%&*+/:<=>?@\\|~^]+|\`(?:[A-Z][\w']*\.)*[_a-z][\w']*\`/
/\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/
/\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/
/(?:^|[^!#$%&*+\-./:<=>?@\\|~^])(?:--[^!#$%&*+\-./:<=>?@\\|~^].*|\{-[^]*?-\})/m
/"(?:[^"\\]|\\(?:["&'\\abfnrtv]|\^[\x40-\x5b\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[\dA-Fa-f]+)|\\\s+\\)*"/
/(?:\r?\n|\r|^)\s*import\s+(?:qualified\s+)?[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m
/\b(?:import|qualified|as|hiding)\b/
/\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|from|for|function|if|implements|import|in|inline|interface|macro|new|null|override|public|private|return|static|super|switch|throw|to|try|typedef|using|var|while)(?!\.)\b/
/\.{3}|\+{1,2}|-[->]?|[!=]=?|&{1,2}|\|{1,2}|<[<=]?|>[=>]?|[%*/~^]/
/"(?:(?!")[^\\]|\\[^])*"|'(?:(?!')[^\\]|\\[^])*'/
/~\/(?:[^\n\r/\\]|\\.)+\/[gimsu]*/
/#\w+/
/@:?\w+/
/\$(?:\w+|(?=\{))/
/(?:^|[^\\])\$(?:\w+|\{[^}]+\})/
/^\$\w*/
/(?:\/\/|#).*|\/\*[^]*?(?:\*\/|$)/
/\b0X[\dA-F]+\b|\b\d+\.?\d*(?:E[-+]?\d+)?/i
/[=[\]{}]/
/<<-?\w+[^]*?^\s*[]Unknown:\\1[]/m
/[-\w]+(?=\s+\{)/
/[\w\-.]+(?=\s*=(?!=))/
/"(?:\\[^]|[^"\\])+"(?=\s*[:=])/
/"(?:[^"$\\]|\\[^]|\$(?:(?=")|\$+|[^"\${])|\$\{(?:[^"{}]|"(?:[^"\\]|\\[^])*")*\})*"/
/(?:RESOURCE|DATA)\s+"(?:\\[^]|[^"\\])*"(?=\s+"[-\w]+"\s+\{)/i
/(?:PROVIDER|PROVISIONER|VARIABLE|OUTPUT|MODULE|BACKEND)\s+(?:[-\w]+|"(?:\\[^]|[^"\\])*")\s+(?=\{)/i
/(?:^|[^$])\$\{(?:[^"{}]|"(?:[^"\\]|\\[^])*")*\}/
/(?:RESOURCE|DATA|\s+)"(?:\\[^]|[^"\\])*"/i
/(?:PROVIDER|PROVISIONER|VARIABLE|OUTPUT|MODULE|BACKEND)\s+(?:[-\w]+|"(?:\\[^]|[^"\\])*")\s+/i
/\b(?:TERRAFORM|VAR|SELF|COUNT|MODULE|PATH|DATA|LOCAL)\b/i
/[^-\0-\x20"0-9A-Z_a-z\x7f-\uffff]/
/\b(?:TERRAFORM|VAR|SELF|COUNT|MODULE|PATH|DATA|LOCAL)\b\.[\w*]+/i
/(?:(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?|\b0x[\dA-Fa-f]+)[FHLUfhlu]?\b/
/\b(?:AppendStructuredBuffer|BlendState|Buffer|ByteAddressBuffer|CompileShader|ComputeShader|ConsumeStructuredBuffer|DepthStencilState|DepthStencilView|DomainShader|GeometryShader|Hullshader|InputPatch|LineStream|OutputPatch|PixelShader|PointStream|RasterizerState|RenderTargetView|RWBuffer|RWByteAddressBuffer|RWStructuredBuffer|RWTexture(?:1D|1DArray|2D|2DArray|3D)|SamplerComparisonState|SamplerState|StructuredBuffer|Texture(?:1D|1DArray|2D|2DArray|2DMS|2DMSArray|3D|Cube|CubeArray)|TriangleStream|VertexShader)\b/
/\b(?:asm|asm_fragment|auto|break|case|catch|cbuffer|centroid|char|class|column_major|compile|compile_fragment|const|const_cast|continue|default|delete|discard|do|dynamic_cast|else|enum|explicit|export|extern|for|friend|fxgroup|goto|groupshared|if|in|inline|inout|interface|line|lineadj|linear|long|matrix|mutable|namespace|new|nointerpolation|noperspective|operator|out|packoffset|pass|pixelfragment|point|precise|private|protected|public|register|reinterpret_cast|return|row_major|sample|sampler|shared|short|signed|sizeof|snorm|stateblock|stateblock_state|static|static_cast|string|struct|switch|tbuffer|technique|technique10|technique11|template|texture|this|throw|triangle|triangleadj|try|typedef|typename|uniform|union|unorm|unsigned|using|vector|vertexfragment|virtual|void|volatile|while)\b/
/\b(?:bool|double|dword|float|half|int|min(?:10float|12int|16(?:float|int|uint))|uint)(?:[1-4](?:x[1-4])?)?\b/
/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[\d.]+/m
/^HTTP\/1.[01] \d+.*/m
/^[-\w]+:(?=.)/m
/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/
/:\w+/
/^HTTP\/1.[01] \d+.*/i
/-?\b\d+(?:\.\d+)?(?:E[-+]?\d+)?\b/i
/[,[\]{}]/
/"(?:\\.|[^\n\r"\\])*"(?=\s*:)/
/"(?:\\.|[^\n\r"\\])*"(?!\s*:)/
/CONTENT-TYPE:\s*APPLICATION\/JAVASCRIPT[^]*?(?:\r?\n|\r){2}[^]*/i
/CONTENT-TYPE:\s*(?:APPLICATION\/JSON|\w+\/(?:[\w\-.]+\+)+JSON(?![\w+\-.]))[^]*?(?:\r?\n|\r){2}[^]*/i
/CONTENT-TYPE:\s*(?:APPLICATION\/XML|\w+\/(?:[\w\-.]+\+)+XML(?![\w+\-.]))[^]*?(?:\r?\n|\r){2}[^]*/i
/CONTENT-TYPE:\s*TEXT\/XML[^]*?(?:\r?\n|\r){2}[^]*/i
/CONTENT-TYPE:\s*TEXT\/HTML[^]*?(?:\r?\n|\r){2}[^]*/i
/CONTENT-TYPE:\s*TEXT\/CSS[^]*?(?:\r?\n|\r){2}[^]*/i
/\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[\d+/=A-Za-z]+"|(?:max-age|report-uri)=|report-to )/
/\b\d{7,}\b/
/\b\d{1,6}\b/
/\b(?:max-age=|includeSubDomains|preload)/
/\b\d{8,}\b/
/\b\d{1,7}\b/
/(?:\B'|REM)[^\n\r]*/i
/\B#[\dA-F]+|\B\`[01]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?/i
/\b(?:BEEP|BPS|CASE|CLEAR|CLK|CLO|CLP|CLS|CLT|CLV|CONT|COPY|ELSE|END|FILE|FILES|FOR|GOSUB|GSB|GOTO|IF|INPUT|KBD|LED|LET|LIST|LOAD|LOCATE|LRUN|NEW|NEXT|OUT|RIGHT|PLAY|POKE|PRINT|PWM|REM|RENUM|RESET|RETURN|RTN|RUN|SAVE|SCROLL|SLEEP|SRND|STEP|STOP|SUB|TEMPO|THEN|TO|UART|VIDEO|WAIT)(?:\$|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/\b(?:ABS|ANA|ASC|BIN|BTN|DEC|END|FREE|HELP|HEX|I2CR|I2CW|IN|INKEY|LEN|LINE|PEEK|RND|SCR|SOUND|STR|TICK|USR|VER|VPEEK|ZER)(?:\$|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/\B@\S+/
/<[=>]?|>=?|\|\||&&|[-!&*+/=|~^]|\b(?:AND|NOT|OR)\b/i
/[(),:;[\]]/
/\b(?:\d+R[\dA-Z]+|\d+(?:\.\d+)?(?:E[-+]?\d+)?)\b|\.\d+\b/i
/\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/
/(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/
/[-+]:(?!=)|(?:[%&/?@^]|\+{1,2}|-{1,2}|={1,2}=?|~={1,2}=?|\*{1,2}|\|{2,3}|<(?:->?|<?=?)|>{1,2}=?)(?::=)?|:(?:=:?)?|[!.\\|~]/
/[(),;[\]{}]/
/"(?:(?!")[^\n\r\\_]|\\.|_(?!")(?:\r\n|[^]))*"|'(?:(?!')[^\n\r\\_]|\\.|_(?!')(?:\r\n|[^]))*'/
/&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/
/\S(?:.*(?:\\ |\S))?/
/^!|\*{1,2}|\?/
/\//
/(?:^|[^\\])\[[^[\]]*\]/
/[(),.:;{}]/
/"[^"]*"/
/^[\t ]*(?:VOLUME|BOOK|PART(?! OF)|CHAPTER|SECTION|TABLE)\b.+/im
/(?:^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?\w*|\b(?:ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|ELEVEN|TWELVE))\b(?!-)/i
/(?:^|[^-])\b(?:APPLYING TO|ARE|ATTACKING|ANSWERING|ASKING|BE(?:ING)?|BURNING|BUYING|CALLED|CARRIES|CARRY(?! OUT)|CARRYING|CLIMBING|CLOSING|CONCEAL(?:S|ING)?|CONSULTING|CONTAIN(?:S|ING)?|CUTTING|DRINKING|DROPPING|EATING|ENCLOS(?:ES?|ING)|ENTERING|EXAMINING|EXITING|GETTING|GIVING|GOING|HA(?:VE|S|VING)|HOLD(?:S|ING)?|IMPL(?:Y|IES)|INCORPORAT(?:ES?|ING)|INSERTING|IS|JUMPING|KISSING|LISTENING|LOCKING|LOOKING|MEAN(?:S|ING)?|OPENING|PROVID(?:ES?|ING)|PULLING|PUSHING|PUTTING|RELAT(?:ES?|ING)|REMOVING|SEARCHING|SEE(?:S|ING)?|SETTING|SHOWING|SINGING|SLEEPING|SMELLING|SQUEEZING|SWITCHING|SUPPORT(?:S|ING)?|SWEARING|TAKING|TASTING|TELLING|THINKING|THROWING|TOUCHING|TURNING|TYING|UNLOCK(?:S|ING)?|VAR(?:Y|IES|YING)|WAITING|WAKING|WAVING|WEAR(?:S|ING)?)\b(?!-)/i
/(?:^|[^-])\b(?:AFTER|BEFORE|CARRY OUT|CHECK|CONTINUE THE ACTION|DEFINITION(?= *:)|DO NOTHING|ELSE|END (?:IF|UNLESS|THE STORY)|EVERY TURN|IF|INCLUDE|INSTEAD(?: OF)?|LET|MOVE|NO|NOW|OTHERWISE|REPEAT|REPORT|RESUME THE STORY|RULE FOR|RUNNING THROUGH|SAY(?:ING)?|STOP THE ACTION|TEST|TRY(?:ING)?|UNDERSTAND|UNLESS|USE|WHEN|WHILE|YES)\b(?!-)/i
/(?:^|[^-])\b(?:ADJACENT(?! TO)|CARRIED|CLOSED|CONCEALED|CONTAINED|DARK|DESCRIBED|EDIBLE|EMPTY|ENCLOSED|ENTERABLE|EVEN|FEMALE|FIXED IN PLACE|FULL|HANDLED|HELD|IMPROPER-NAMED|INCORPORATED|INEDIBLE|INVISIBLE|LIGHTED|LIT|LOCK(?:ABLE|ED)|MALE|MARKED FOR LISTING|MENTIONED|NEGATIVE|NEUTER|NON-(?:EMPTY|FULL|RECURRING)|ODD|OPAQUE|OPEN(?:ABLE)?|PLURAL-NAMED|PORTABLE|POSITIVE|PRIVATELY-NAMED|PROPER-NAMED|PROVIDED|PUBLICALLY-NAMED|PUSHABLE BETWEEN ROOMS|RECURRING|RELATED|RUBBING|SCENERY|SEEN|SINGULAR-NAMED|SUPPORTED|SWINGING|SWITCH(?:ABLE|ED(?: ON| OFF)?)|TOUCH(?:ABLE|ED)|TRANSPARENT|UNCONCEALED|UNDESCRIBED|UNLIT|UNLOCKED|UNMARKED FOR LISTING|UNMENTIONED|UNOPENABLE|UNTOUCHABLE|UNVISITED|VARIABLE|VISIBLE|VISITED|WEARABLE|WORN)\b(?!-)/i
/(?:^|[^-])\b(?:ABOVE|ADJACENT TO|BACK SIDE OF|BELOW|BETWEEN|DOWN|EAST|EVERYWHERE|FRONT SIDE|HERE|IN|INSIDE(?: FROM)?|NORTH(?:EAST|WEST)?|NOWHERE|ON(?: TOP OF)?|OTHER SIDE|OUTSIDE(?: FROM)?|PARTS? OF|REGIONALLY IN|SOUTH(?:EAST|WEST)?|THROUGH|UP|WEST|WITHIN)\b(?!-)/i
/(?:^|[^-])\b(?:ACTIONS?|ACTIVIT(?:Y|IES)|ACTORS?|ANIMALS?|BACKDROPS?|CONTAINERS?|DEVICES?|DIRECTIONS?|DOORS?|HOLDERS?|KINDS?|LISTS?|M[AE]N|NOBODY|NOTHING|NOUNS?|NUMBERS?|OBJECTS?|PEOPLE|PERSONS?|PLAYER(?:'S HOLDALL)?|REGIONS?|RELATIONS?|ROOMS?|RULE(?:BOOK)?S?|SCENES?|SOMEONE|SOMETHING|SUPPORTERS?|TABLES?|TEXTS?|THINGS?|TIME|VEHICLES?|WOM[AE]N)\b(?!-)/i
/\S(?:\s*\S)*/
/^[\t ]*[#;].*$/m
/^[\t ]*\[.*?\]/m
/^[\t ]*[^\s=]+?(?=[\t ]*=)/m
/^=/
/\b(?:activate|activeCoroCount|asString|block|break|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getSlot|getEnvironmentVariable|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|setSlot|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|call|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/
/\b(?:Array|AudioDevice|AudioMixer|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GL|GLE|GLScissor|GLU|GLUCylinder|GLUQuadric|GLUSphere|GLUT|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Regex|SGML|SGMLElement|SGMLParser|SQLite|Server|Sequence|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink|Random|BigNum|Sequence)\b/
/\b0X[\dA-F]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:E-?\d+)?/i
/[-!%&*+/=|^]=|>{1,2}=?|<{1,2}=?|:?:?=|\+{1,2}|-{1,2}|\*{1,2}|\/{1,2}|%|\|{1,2}|&{1,2}|\b(?:return|and|or|not)\b|@{1,2}|\?{1,2}|\.\./
/"""(?:\\[^]|(?!""")[^\\])*"""/
/"(?:\\.|[^\n\r"\\])*"/
/(?:^|[^\\])#.*/
/\bNB\..*/
/\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/
/\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_\b(?!\.))/
/[=a][.:]|_\./
/'(?:''|[^\n\r'])*'/
/(?!\^:|;\.|[!=][.:])(?:\{(?:\.|:{1,2})?|p(?:\.{1,2}|:)|[!=\]]|[-#$%*+,<>|][.:]?|[?^]\.?|[;[]:?|["i}~][.:]|[ACEILejor]\.|(?:[/\\_qsux]|_?\d):)/
/[}~]|[/\\]\.?|[Mbf]\.|t[.:]/
/&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;HTd]\.|\`:?|[LS^]:|"/
/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/
/\b0B[01][01_]*L?\b|\b0X[\dA-F_]*\.?[-\d+A-FP_]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:E[-+]?\d[\d_]*)?[DFL]?/i
/"""[\t ]*[\n\r](?:(?:"|"")?(?:\\.|[^"\\]))*"""/
/\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+(?!\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)(?:(?<!\w)\w|(?<=\w)(?!\w)))[a-z]\w*(?:\.[a-z]\w*)*\.?/
/<(?:[\s\w&,.?]|<(?:[\s\w&,.?]|<(?:[\s\w&,.?]|<[\s\w&,.?]*>)*>)*>)*>/
/\b[A-Z](?:\w*[a-z]\w*)?\b/
/\b[A-Z]\w*(?=\s+\w+\s*[(),;=])/
/(?:^|[^.])(?:<<=?|>{2,3}=?|->|--|\+\+|&&|\|\||::|[:?~]|[-!%&*+/<=>|^]=?)/m
/[(),.:<>]/
/[&?|]/
/::[_a-z]\w*/
/(?:^|[^\\])\/\*\*[^/][^]*?(?:\*\/|$)/
/^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+\w+/m
/(?:^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][-A-Za-z]+\b/m
/@(?:exception|throws|see|link|linkplain|value)\s+(?:\*\s*)?(?:(?:[A-Za-z]\w+\s*\.\s*)*[A-Z]\w*(?:\s*#\s*\w+(?:\s*\([^()]*\))?)?|#\s*\w+(?:\s*\([^()]*\))?)/
/@param\s+<[A-Z]\w*>/
/\b[A-Z]\w*/
/[#(),.[\]]/
/[.<>]/
/\{@code\s+(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+?(?=\s*\})/
/<(?:code|pre|tt)>(?!<code>)\s*[^]+?(?=\s*<\/[]Unknown:\\2[]>)/
/#\s*\w+(?=\s*\()/
/#\s*\w+/
/\b(?:[a-z]\w*\s*\.\s*)+/
/^\s*(?:\*\s*)*.*[^\s*].*$/m
/.+/
/<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/
/\b0X[\dA-F]*\.?[\dA-F]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E\d+)?[DFL]?/i
/\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/
/'[^\s\d\\]\w*/
/\$+(?:\w+\b|(?=\{))/
/\b(?:__HALT_COMPILER|ABSTRACT|AND|ARRAY|AS|BREAK|CALLABLE|CASE|CATCH|CLASS|CLONE|CONST|CONTINUE|DECLARE|DEFAULT|DIE|DO|ECHO|ELSE|ELSEIF|EMPTY|ENDDECLARE|ENDFOR|ENDFOREACH|ENDIF|ENDSWITCH|ENDWHILE|EVAL|EXIT|EXTENDS|FINAL|FINALLY|FOR|FOREACH|FUNCTION|GLOBAL|GOTO|IF|IMPLEMENTS|INCLUDE|INCLUDE_ONCE|INSTANCEOF|INSTEADOF|INTERFACE|ISSET|LIST|NAMESPACE|NEW|OR|PARENT|PRINT|PRIVATE|PROTECTED|PUBLIC|REQUIRE|REQUIRE_ONCE|RETURN|STATIC|SWITCH|THROW|TRAIT|TRY|UNSET|USE|VAR|WHILE|XOR|YIELD)\b/i
/\?>$|^<\?(?:PHP(?=\s)|=)?/i
/<<<'[^']+'[\n\r](?:.*[\n\r])*?[]Unknown:\\1[];/
/<<<(?:"[^"]+"[\n\r](?:.*[\n\r])*?[]Unknown:\\1[];|[A-Z_]\w*[\n\r](?:.*[\n\r])*?[]Unknown:\\2[];)/i
/(?:\\|namespace\s+|use\s+)[\w\\]+/
/->\w+/
/\b[A-Z_][\dA-Z_]*\b/
/\bNULL\b/i
/\\/
/^<<<'[^']+'|[A-Z_]\w*;$/i
/^<<<(?:"[^"]+"|[A-Z_]\w*)|[A-Z_]\w*;$/i
/\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(?:^|[^\\{])\$+\w+(?:\[[^\n\r[\]]+\]|->\w+)*/
/^<<<'?|[';]$/
/^<<<"?|[";]$/
/^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?::.*)?$/m
/^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m
/^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m
/:/
/[\w$]+(?=\.(?:<init>|[\w$]+)\()/
/(?:<init>|[\w$]+)(?=\()/
/[a-z]\w*/
/[().]/
/\.{3}/
/\d+/
/\b[a-z]+(?: [a-z]+)*\b/
/^\s*(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m
/^\s*"[^"]*"/
/^:?\s*[\w$.]+(?=:|$)/
/:\s*\S.*/
/^\s*at/
/[\w$]+(?=$|:)/
/[.:]/
/\(\w+.\w+:\d+(?=\))/
/\([^()]*(?=\))/
/^\w+\.\w+/
/^(?:Unknown Source|Native Method)$/
/\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/
/(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?L?/i
/-[-=>]?|\+[+=]?|<[<=]?|[!*=>]=?|&&|\|\||[%/:?^]/
/[,.]/
/\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/
/[;@|]/
/(?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*\w+/
/\bAggregates\s*:\s*(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/
/\bRedirects\s*:\s*(?:\w+\s*=>\s*\w+\s*,\s*)*\w+\s*=>\s*\w+/
/\bwith\s+\w+/
/=>/
/\bwith\b/
/\B\$\w+/
/\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/
/(?:\b\d+\.|\B\.)?\b\d+(?:E[-+]?\d+)?\b/i
/::|[(),:;[\]{}]|\.(?=\s*[\w$[])/
/"(?:[^\n\r"\\]|\\[^\n\r(]|\\\((?:[^()]|\([^()]*\))*\))*"(?=\s*:(?!:))/
/"(?:[^\n\r"\\]|\\[^\n\r(]|\\\((?:[^()]|\([^()]*\))*\))*"/
/\bDEF\s+[A-Z_]\w+/i
/\b[A-Z_]\w*(?=\s*:(?!:))/i
/\.\.|[!<=>]?=|\?\/\/|\/\/=?|[-%*+/]=?|[<>?]|\b(?:and|or|not)\b/
/\b[A-Z_]\w*(?=\s*\()/i
/\|=?/
/(?:^|[^\\])(?:\\{2})*\\\((?:[^()]|\([^()]*\))*\)/
/^\\\(|\)$/
/^\\\([^]+(?=\)$)/
/\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/
/\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
/\b(?:class|extends|implements|instanceof|interface|new|type)\s+(?!keyof(?:(?<!\w)\w|(?<=\w)(?!\w)))[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/
/#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/
/@(?:param|arg|argument|property)\s+(?:\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}\s+)?[\w$.\xa0-\uffff]+(?=\s|$)/
/@(?:param|arg|argument|property)\s+(?:\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}\s+)?\[[\w$.\xa0-\uffff]+(?:=[^[\]]+)?\](?=\s|$)/
/@example\s+[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/
/^#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*/
/[=[\]]/
/@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\s+(?:\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}\s+)?[A-Z]\w*(?:\.[A-Z]\w*)*/
/@[a-z]+\s+\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/
/<[^]+/
/^\[[\w$.\xa0-\uffff]+/
/=[^]*(?=\]$)/
/=>|\.\.\.|[&*:?|]/
/[(),.;<=>[\]{}]/
/^\s*(?:\*\s*)?.+$/m
/\.\s*#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*[:=]\s*(?:async\s*)?(?:\bfunction(?:(?<!\w)\w|(?<=\w)(?!\w))|(?:\((?:[^()]|\([^()]*\))*\)|[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*)\s*=>))/
/\.\s*#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/
/\.\s*#?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*/
/(?:^|[^\w$\xa0-\uffff])[A-Z][\w$\xa0-\uffff]+/
/\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/
/\bconsole(?=\s*\.)/
/^[A-Z][^]*/
/\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/
/\b[A-Z]\w*Error\b/
/\b(?:as|default|export|from|import)\b/
/\bundefined\b/
/\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/
/@+\w+/
/[-+]?\b(?:NaN|Infinity|0x[\dA-Fa-f]+)\b|[-+]?(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+\b)?/
/"(?:\\(?:\r\n?|\n|.)|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n?|\n|.)|(?!')[^\n\r\\])*'/
/(?:"(?:\\(?:\r\n?|\n|.)|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n?|\n|.)|(?!')[^\n\r\\])*')(?=\s*:)/
/[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*:)/
/[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*(?=\s*\()/
/[(),.;[\]{}]/
/^\S.*/m
/^[\t ]+at[\t ]+.*/m
/\b(?:at|new)\b/
/[\t ]+at[\t ]+(?:node\.js|<unknown>|.*(?:node_modules|\(<anonymous>\)|\(<unknown>|<anonymous>$|\(internal\/|\(node\.js)).*/m
/(?:\bat\s+|\()(?:[A-Za-z]:)?[^():]+(?=:)/
/at\s+(?:new\s+)?[$<A-Z_a-z\xa0-\uffff][\w$.<>\xa0-\uffff]*/
/\[(?:as\s+)?[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*\]/
/:\d+(?::\d+)?\b/
/\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)\s*\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/(?:\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=)\s*\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/\bsvg\s*\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/\b(?:md|markdown)\s*\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/\b(?:gql|graphql(?:\s*\.\s*experimental)?)\s*\`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\\\\`])*\`/
/\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/
/(?:\b(?=\d)|\B(?=\.))(?:0[BOX])?(?:[\dA-F]+(?:_[\dA-F]+)*\.?(?:\d+(?:_\d+)*)?|\.\d+(?:_\d+)*)(?:[EFP][-+]?\d+(?:_\d+)*)?J?/i
/&&|\|\||[-$%&*+\\\xf7\u22bb^]=?|\/[/=]?|!=?=?|\|[=>]?|<(?:<=?|[:=|])?|>(?:=|>{1,2}=?)?|={1,2}=?|['~\u221a\u221b\u2260\u2264\u2265]/
/:{1,2}|[(),.;?[\]{}]/
/\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi|e|catalan|eulergamma|golden)\b|[\u03b3\u03c0\u03c6\u212f]/
/(?:^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/
/r"(?:\\.|[^\n\r"\\])*"[imsx]{0,4}/
/"""[^]+?"""|\w*"(?:\\.|[^\n\r"\\])*"|(?:^|[^\w'])'(?:\\[^\n\r][^\n\r']*|[^\n\r\\])'|\`(?:[^\n\r\\\\\`]|\\.)*\`/
/\bC\s.*/i
/\[\s*(?:(?:CTRL|SHIFT|ALT|LCTRL|RCTRL|LALT|RALT|CAPS|NCAPS)\s+)*(?:[KTU]_[\w?]+|".+?"|'.+?')\s*\]/i
/".*?"|'.*?'/
/\b(?:ANY|BASELAYOUT|BEEP|CALL|CONTEXT|DEADKEY|DK|IF|INDEX|LAYER|NOTANY|NUL|OUTS|PLATFORM|RETURN|RESET|SAVE|SET|STORE|USE)\b/i
/\b(?:ANSI|BEGIN|UNICODE|GROUP|USING KEYS|MATCH|NOMATCH)\b/i
/\b(?:U\+[\dA-F]+|D\d+|X[\dA-F]+|\d+)\b/i
/[()+,>\\]/
/\$(?:KEYMAN|KMFL|WEAVER|KEYMANWEB|KEYMANONLY):/i
/&(?:BASELAYOUT|BITMAP|CAPSONONLY|CAPSALWAYSOFF|SHIFTFREESCAPS|COPYRIGHT|ETHNOLOGUECODE|HOTKEY|INCLUDECODES|KEYBOARDVERSION|KMW_EMBEDCSS|KMW_EMBEDJS|KMW_HELPFILE|KMW_HELPTEXT|KMW_RTL|LANGUAGE|LAYER|LAYOUTFILE|MESSAGE|MNEMONICLAYOUT|NAME|OLDCHARPOSMATCHING|PLATFORM|TARGETS|VERSION|VISUALKEYBOARD|WINDOWSLANGUAGES)\b/i
/\b(?:BITMAP|BITMAPS|CAPS ON ONLY|CAPS ALWAYS OFF|SHIFT FREES CAPS|COPYRIGHT|HOTKEY|LANGUAGE|LAYOUT|MESSAGE|NAME|VERSION)\b/i
/\b(?:0[Xx][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*|0[Bb][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[Ee][-+]?\d+(?:_\d+)*)?[FLf]?)\b/
/\+[+=]?|-[-=>]?|={1,2}=?|!(?:!|={1,2})?|[%*/<>]=?|[:?]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
/\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/
/(?:^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/
/\w+@|@\w+/
/\.\w+(?=\s*\{)/
/%.*/
/[&[\]{}]/
/\\begin\{(?:verbatim|lstlisting)\*?\}[^]*?(?=\\end\{[]Unknown:\\2[]\})/
/\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{[^}]+(?=\})/
/\\url\{[^}]+(?=\})/
/\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{[^}]+(?=\}(?:\[[^\]]+\])?)/
/\\(?:[^()\x41-\x5b\]]|[*A-Z]+)/i
/\$\$(?:\\[^]|[^$\\])+\$\$|\$(?:\\[^]|[^$\\])+\$|\\\([^]*?\\\)|\\\[[^]*?\\\]/
/\\begin\{(?:equation|math|eqnarray|align|multline|gather)\*?\}[^]*?(?=\\end\{[]Unknown:\\2[]\})/
/^\{\*[^]*/
/^\{(?:[=_]|\/?(?!\d|\w+\()\w+|)/
/\}$/
/\S(?:[^]*\S)?/
/^\{\/?/
/%(?:(?!\{).*|\{[^]*?%\})/
/[=|]|<<|>>/
/\b\d+(?:\/\d+)?\b/
/'[^\s#'()]+/
/#\\(?:[ux][\dA-Fa-f]+|[-A-Za-z]+|\S)/
/\((?:define(?:-library|-macro|-syntax|-values)?|defmacro|(?:case-)?lambda|let(?:(?:\*|rec)?(?:-values)?|-syntax|rec-syntax)|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-(?:case|rules))(?=[\s()]|$)/
/\((?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[\s()]|$)/
/(?:^|[\s()])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[-+]?(?:(?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)(?:[-+](?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)i)?|(?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)i)|(?:#[box](?:#[ei])?|#[ei](?:#[box])?)[-+]?(?:[\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?(?:[-+][\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?i)?|[\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?i))(?=[\s()]|$)/
/(?:^|[\s()])#[ft](?=[\s()]|$)/
/\((?:[-%*+/]|[<>]=?|=>?)(?=[\s()]|$)/
/\([^\s'()]+(?=[\s()]|$)/
/(?:^|[\s=])#(?:"(?:[^"\\]|\\.)*"|[^\s"()]*(?:[^\s()]|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{])|\((?:[^"#();\\]|\\[^]|;.*$|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[^])*#\}|[^{]))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\))*\)))/m
/\\new\s+[-\w]+/
/\\[A-Z][-\w]*/i
/(?:^|[\da-z])(?:'+|,+|[\^_]?-[\^_]?(?:[!+\-.>_^]|(?=\d))|[\^_]\.?|[!.])|[()<>[\]\^{}~]|\\[!()<>[\\\]]|--|__/
/\(lambda\s+[^\s'()]+/
/\(lambda\s+\([^'()]+/
/#/
/^\\/
/^#[^]+$/
/#\{[^]*?#\}/
/^#\{|#\}$/
/\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/
/\b0B[01]+\b|\b0X[\dA-F]*\.?[-\dA-FP]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?[DF]?/i
/(?:^|[^.])(?:\+[+=]?|-[-=]?|!=?|<{1,2}=?|>{1,2}>?=?|={1,2}|&[&=]?|\|[=|]?|\*=?|\/=?|%=?|\^=?|[:?~])/m
/(?:^|[\s&;|])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s&;|])/
/;;;.*/
/#?'[-\w!$%*+/<=>@{}~^]+/
/:[-\w!$%*+/<=>@{}~^]+/
/,@?[-\w!$%*+/<=>@{}~^]+/
/\(declare(?=[\s)])/
/\(interactive(?=[\s)])/
/[\s([](?:t|nil)(?=[\s)])/
/[\s([][-+]?\d+(?:\.\d*)?(?=[\s)])/
/\(def(?:var|const|custom|group)\s+[-\w!$%*+/<=>@{}~^]+/
/\((?:cl-)?(?:defun\*?|defmacro)\s+[-\w!$%*+/<=>@{}~^]+\s+\([^]*?\)/
/\(lambda\s+\((?:&?[-\w!$%*+/<=>@{}~^]+\s*)*\)/
/\([-\w!$%*+/<=>@{}~^]+/
/[',\`]?\(|[)[\]]/
/[-A-Z]+(?=[\s,.])/
/\`[-\w!$%*+/<=>@{}~^]+'/
/\((?:(?:lexical-)?let\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)(?=\s)/
/\((?:for|do|collect|return|finally|append|concat|in|by)(?=\s)/
/^def[a-z]+/
/[-\w!$%*+/<=>@{}~^]+/
/^(?:cl-)?def\S+/
/^lambda/
/\s\.(?=\s)/
/\([^]*(?=\))/
/^\s[-\w!$%*+/<=>@{}~^]+/
/&(?:rest|body)\s+\S+(?:\s+\S+)*/
/&(?:optional|aux)\s+\S+(?:\s+\S+)*/
/&key\s+\S+(?:\s+\S+)*(?:\s+&allow-other-keys)?/
/&[-\w!$%*+/<=>@{}~^]+/
/\([-\w!$%*+/<=>@{}~^]+\s+\S[^]*(?=\))/
/\b(?:\d+~[\dA-Z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[A-Z]\w*)?)/i
/[A-Z_](?:-?[A-Z]|[\d_])*/i
/[(),.:;[\]\`{|}]/
/(?:^|[^"])(?:"""(?:\\[^]|(?!""")[^\\])*"""|"(?:\\[^]|(?!")[^\\])*")(?!")/
/\\[^\s),;\]}]+/
/(?:^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m
/(?:^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m
/(?:^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m
/(?:^|(?!\.&\.)[^&])&(?!&)\d*/m
/\.(?:[=~]|\.{1,2})|\.(?:[&|^]|<<|>{2,3})\.|:(?:=|:=?)|&&|\|[>|]|<(?:<{1,2}<?|-{1,2}!?|~{1,2}!?|[=?|])?|>[=>?]?|-(?:->?|>)?|\+{1,2}|@{1,2}|%{1,2}|\*{1,2}|!(?:~?=|-{1,2}>|~{1,2}>)?|~(?:~?>|=)?|={1,2}|\^{1,2}|[/?]/
/(?:^|[^\\])\/\*[^]*?\*\//
/'''(?:\\[^]|(?!''')[^\\])*'''|'(?:\\[^]|(?!')[^\\])*'/
/<\[[^]*?\]>/
/\/\/(?:\[[^\n\r\]]*\]|\\.|(?!\/\/)[^[\\])+\/\/[gimuy]{0,5}/
/\/(?:\[[^\n\r\]]*\]|\\.|[^\n\r/[\\])+\/[gimuy]{0,5}/
/ \.(?= )/
/(?:^|[^\\])#[_a-z](?:-?[a-z]|[\d_])*/m
/(?:^|[^\\])#\{[^}]+\}/m
/[!#%@](?:(?!\d)(?:[\w$\-.]|\\[\dA-F]{2})+|\d+)/i
/(?!\d)(?:[\w$\-.]|\\[\dA-F]{2})+:/i
/\b[_a-z][\d_a-z]*\b/
/[-+]?\b\d+(?:\.\d+)?(?:[Ee][-+]?\d+)?\b|\b0x[\dA-Fa-f]+\b|\b0xK[\dA-Fa-f]{20}\b|\b0x[LM][\dA-Fa-f]{32}\b|\b0xH[\dA-Fa-f]{4}\b/
/[!()*,.;<=>[\]{}]/
/\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\b/
/(?:\B-)?(?:\b\d+\.?\d*|\B\.\d+)/
/\.{3}|\u2026|,|!/
/\bOBTW\s+[^]*?\s+TLDR\b/
/\bBTW.+/
/"(?::.|[^":])*"/
/(?:^|\s)(?:A )?(?:YARN|NUMBR|NUMBAR|TROOF|BUKKIT|NOOB)(?=\s|,|$)/
/(?:^|\s)(?:IM IN YR|IM OUTTA YR) [A-Za-z]\w*/
/(?:^|\s)(?:I IZ|HOW IZ I|IZ) [A-Za-z]\w*/
/'Z(?=\s|,|$)/
/(?:^|\s)(?:WIN|FAIL)(?=\s|,|$)/
/(?:^|\s)IT(?=\s|,|$)/
/(?:^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:SUM|DIFF|PRODUKT|QUOSHUNT|MOD|BIGGR|SMALLR|BOTH|EITHER|WON|ALL|ANY) OF)(?=\s|,|$)/
/:\{[^}]+\}/
/A(?=\s)/
/(?:^|\s)(?:O HAI IM|KTHX|HAI|KTHXBYE|I HAS A|ITZ(?: A)?|R|AN|MKAY|SMOOSH|MAEK|IS NOW(?: A)?|VISIBLE|GIMMEH|O RLY\?|YA RLY|NO WAI|OIC|MEBBE|WTF\?|OMG|OMGWTF|GTFO|IM IN YR|IM OUTTA YR|FOUND YR|YR|TIL|WILE|UPPIN|NERFIN|I IZ|HOW IZ I|IF U SAY SO|SRS|HAS A|LIEK(?: A)?|IZ)(?=\s|,|$)/
/:\([\dA-F]+\)/i
/:\[[^\]]+\]/
/:["):>o]/
/\.[A-Z][^\s#:=]+(?=\s*:(?!=))/
/\$+(?:[^\s#():={}]+|\([%*+<?@^][DF]\)|(?=[({]))/
/(?:::|[!+:?])?=|[@|]/
/[():;{}]/
/(?:^|[^\\])#(?:\\(?:\r\n|[^])|[^\n\r\\])*/
/^[^\n\r:=]+(?=\s*:(?!=))/m
/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/
/\$+(?:[^\s#():={}]+|(?=[({]))/
/\((?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[\t ])/
/(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?[ij]?|\b[ij]\b/
/\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/
/\.?['*/\\^]|[-+:@]|[<=>~]=?|&{1,2}|\|{1,2}/
/\.{3}|[!(),.;[\]{}]/
/%\{[^]*?\}%/
/\B'(?:''|[^\n\r'])*'/
/\b0x[\dA-Fa-f]+\b|\b\d+\.?\d*|\B\.\d+/
/\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc|return|string|switch|vector|while)\b/
TooManyNodesError
/<<|>>|[(),.:;?[\]{}]/
/\`(?:\\.|[^\n\r\\\\\`])*\`/
/-[A-Z_]\w*/i
/\+[+=]?|-[-=]?|&&|\|\||[<>]=|[!*/=]=?|[%^]/
/::.+/
/@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|equals|end|environ|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|if{1,2}|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:y|ies)|when|where|with|wrt)\b/
/\w+(?=:)/
/\.\.\.|->|&|\.?=/
/\(#|#\)|[(),:;[\]{}]/
/\$(?:10|\d)/
/"[^\n\r"]*"/
/\b(?:VOID|STRICT|PUBLIC|PRIVATE|PROPERTY|BOOL|INT|FLOAT|STRING|ARRAY|OBJECT|CONTINUE|EXIT|IMPORT|EXTERN|NEW|SELF|SUPER|TRY|CATCH|EACHIN|TRUE|FALSE|EXTENDS|ABSTRACT|FINAL|SELECT|CASE|DEFAULT|CONST|LOCAL|GLOBAL|FIELD|METHOD|FUNCTION|CLASS|END|IF|THEN|ELSE|ELSEIF|ENDIF|WHILE|WEND|REPEAT|UNTIL|FOREVER|FOR|TO|STEP|NEXT|RETURN|MODULE|INTERFACE|IMPLEMENTS|INLINE|THROW|NULL)\b/i
/\.\.|<[=>]?|>=?|:?=|(?:[-&*+/|~]|\b(?:MOD|SHL|SHR)\b)=?|\b(?:AND|NOT|OR)\b/i
/[(),.:;[\]]/
/^[\t ]*#.+/m
/\w[#$%?]/
/(?:\.\.)?(?:(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\dA-F]+)/i
/^#REM\s+[^]*?^#END/im
/'.+/
/\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|then|unless|using|when|while|with)\b/
/@{1,2}\w*/
/(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[Ee]))(?:[Ee][-+]?\d+)?\b|\b(?:0x[\dA-Fa-f]+|\d+)(?:U?LL)?\b/
/\.{3}|[-=]>|~=|(?:[-!%*+/<=>]|\.\.)=?|[#:^]|\b(?:and|or)\b=?|\bnot\b/
/[(),.[\\\]{}]/
/\b(?!\d)\w+(?=:)|:(?!\d)\w+/
/\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:running|create|resume|status|wrap|yield)|debug\.(?:debug|gethook|getinfo|getlocal|getupvalue|setlocal|setupvalue|sethook|traceback|getfenv|getmetatable|getregistry|setfenv|setmetatable)|dofile|error|getfenv|getmetatable|io\.(?:stdin|stdout|stderr|close|flush|input|lines|open|output|popen|read|tmpfile|type|write)|ipairs|load|loadfile|loadstring|math\.(?:abs|acos|asin|atan|atan2|ceil|sin|cos|tan|deg|exp|floor|log|log10|max|min|fmod|modf|cosh|sinh|tanh|pow|rad|sqrt|frexp|ldexp|random|randomseed|pi)|module|next|os\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\.(?:cpath|loaded|loadlib|path|preload|seeall)|pairs|pcall|print|rawequal|rawget|rawset|require|select|setfenv|setmetatable|string\.(?:byte|char|dump|find|len|lower|rep|sub|upper|format|gsub|gmatch|match|reverse)|table\.(?:maxn|concat|sort|insert|remove)|tonumber|tostring|type|unpack|xpcall)\b/
/'[^']*'|\[=*\[[^]*?\][]Unknown:\\1[]\]/
/\b(?:class|extends)[\t ]+\w+/
/#\{[^{}]*\}/
/^#\{[^]+(?=\})/
/#\{|\}/
/\/\*[^]*?(?:$|\*\/)/
/\$[\w.]+/
/\b(?:ABS|ACOS|ARRAY_AGG|ARRAY_APPEND|ARRAY_AVG|ARRAY_CONCAT|ARRAY_CONTAINS|ARRAY_COUNT|ARRAY_DISTINCT|ARRAY_FLATTEN|ARRAY_IFNULL|ARRAY_INSERT|ARRAY_INTERSECT|ARRAY_LENGTH|ARRAY_MAX|ARRAY_MIN|ARRAY_POSITION|ARRAY_PREPEND|ARRAY_PUT|ARRAY_RANGE|ARRAY_REMOVE|ARRAY_REPEAT|ARRAY_REPLACE|ARRAY_REVERSE|ARRAY_SORT|ARRAY_STAR|ARRAY_SUM|ARRAY_SYMDIFF|ARRAY_SYMDIFFN|ARRAY_UNION|ASIN|ATAN|ATAN2|AVG|BASE64|BASE64_DECODE|BASE64_ENCODE|BITAND|BITCLEAR|BITNOT|BITOR|BITSET|BITSHIFT|BITTEST|BITXOR|CEIL|CLOCK_LOCAL|CLOCK_MILLIS|CLOCK_STR|CLOCK_TZ|CLOCK_UTC|CONTAINS|CONTAINS_TOKEN|CONTAINS_TOKEN_LIKE|CONTAINS_TOKEN_REGEXP|COS|COUNT|CURL|DATE_ADD_MILLIS|DATE_ADD_STR|DATE_DIFF_MILLIS|DATE_DIFF_STR|DATE_FORMAT_STR|DATE_PART_MILLIS|DATE_PART_STR|DATE_RANGE_MILLIS|DATE_RANGE_STR|DATE_TRUNC_MILLIS|DATE_TRUNC_STR|DECODE_JSON|DEGREES|DURATION_TO_STR|E|ENCODED_SIZE|ENCODE_JSON|EXP|FLOOR|GREATEST|HAS_TOKEN|IFINF|IFMISSING|IFMISSINGORNULL|IFNAN|IFNANORINF|IFNULL|INITCAP|ISARRAY|ISATOM|ISBOOLEAN|ISNUMBER|ISOBJECT|ISSTRING|ISBITSET|LEAST|LENGTH|LN|LOG|LOWER|LTRIM|MAX|META|MILLIS|MILLIS_TO_LOCAL|MILLIS_TO_STR|MILLIS_TO_TZ|MILLIS_TO_UTC|MILLIS_TO_ZONE_NAME|MIN|MISSINGIF|NANIF|NEGINFIF|NOW_LOCAL|NOW_MILLIS|NOW_STR|NOW_TZ|NOW_UTC|NULLIF|OBJECT_ADD|OBJECT_CONCAT|OBJECT_INNER_PAIRS|OBJECT_INNER_VALUES|OBJECT_LENGTH|OBJECT_NAMES|OBJECT_PAIRS|OBJECT_PUT|OBJECT_REMOVE|OBJECT_RENAME|OBJECT_REPLACE|OBJECT_UNWRAP|OBJECT_VALUES|PAIRS|PI|POLY_LENGTH|POSINFIF|POSITION|POWER|RADIANS|RANDOM|REGEXP_CONTAINS|REGEXP_LIKE|REGEXP_POSITION|REGEXP_REPLACE|REPEAT|REPLACE|REVERSE|ROUND|RTRIM|SIGN|SIN|SPLIT|SQRT|STR_TO_DURATION|STR_TO_MILLIS|STR_TO_TZ|STR_TO_UTC|STR_TO_ZONE_NAME|SUBSTR|SUFFIXES|SUM|TAN|TITLE|TOARRAY|TOATOM|TOBOOLEAN|TOKENS|TOKENS|TONUMBER|TOOBJECT|TOSTRING|TRIM|TRUNC|TYPE|UPPER|WEEKDAY_MILLIS|WEEKDAY_STR)(?=\s*\()/i
/\b(?:ALL|ALTER|ANALYZE|AS|ASC|BEGIN|BINARY|BOOLEAN|BREAK|BUCKET|BUILD|BY|CALL|CAST|CLUSTER|COLLATE|COLLECTION|COMMIT|CONNECT|CONTINUE|CORRELATE|COVER|CREATE|DATABASE|DATASET|DATASTORE|DECLARE|DECREMENT|DELETE|DERIVED|DESC|DESCRIBE|DISTINCT|DO|DROP|EACH|ELEMENT|EXCEPT|EXCLUDE|EXECUTE|EXPLAIN|FETCH|FLATTEN|FOR|FORCE|FROM|FUNCTION|GRANT|GROUP|GSI|HAVING|IF|IGNORE|ILIKE|INCLUDE|INCREMENT|INDEX|INFER|INLINE|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KEYS|KEYSPACE|KNOWN|LAST|LEFT|LET|LETTING|LIMIT|LSM|MAP|MAPPING|MATCHED|MATERIALIZED|MERGE|MINUS|MISSING|NAMESPACE|NEST|NULL|NUMBER|OBJECT|OFFSET|ON|OPTION|ORDER|OUTER|OVER|PARSE|PARTITION|PASSWORD|PATH|POOL|PREPARE|PRIMARY|PRIVATE|PRIVILEGE|PROCEDURE|PUBLIC|RAW|REALM|REDUCE|RENAME|RETURN|RETURNING|REVOKE|RIGHT|ROLE|ROLLBACK|SATISFIES|SCHEMA|SELECT|SELF|SEMI|SET|SHOW|SOME|START|STATISTICS|STRING|SYSTEM|TO|TRANSACTION|TRIGGER|TRUNCATE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNSET|UPDATE|UPSERT|USE|USER|USING|VALIDATE|VALUE|VALUES|VIA|VIEW|WHERE|WHILE|WITH|WORK|XOR)\b/i
/(?:\b\d+\.|\B\.)\d+E[-+]?\d+\b|\b\d+\.?\d*|\B\.\d+\b/i
/[-%*+/=]|!=|={1,2}|\|\||<[=>]?|>=?|\b(?:AND|ANY|ARRAY|BETWEEN|CASE|ELSE|END|EVERY|EXISTS|FIRST|IN|LIKE|NOT|OR|THEN|VALUED|WHEN|WITHIN)\b/i
/[(),.:;[\]{}]/
/"(?:\\[^]|(?!")[^\\]|"")*"|'(?:\\[^]|(?!')[^\\]|'')*'/
/\`(?:\\[^]|[^\\\\\`]|\`\`)*\`/
/\b(?:CHIP|IN|OUT|PARTS|BUILTIN|CLOCKED)\b/
/[A-Z][\dA-Z]*(?=\()/i
/=|\.\./
/[(),:;[\]{}]/
/^[\t ]*;.*/m
/^>.+/m
/^[\t ]*#[\t ]*\w+[\t ]*$/m
/^[\t ]*@\w+(?=[\t ]|$).*/m
/^[\t ]*[^\s#;>@].*/m
/^@\w+/
/\\["[\]{}]/
/^>\w+[\t ]+(?!\s)[^\n\r{}]+/
/^>\w+/
/\{[^\n\r[\]{}]*\}/
/\[[\t ]*\w+[^\n\r[\]]*\]/
/\s\w+:/
/^\[[\t ]*\w+\b[^]+(?=\]$)/
/^\[[\t ]*\w+/
/[\t ]\S+/
/\S(?:.*\S)?/
/;.*$/m
/(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|(?=\$))(?:0[HX][\dA-F]*\.?[\dA-F]+(?:P[-+]?\d+)?|\d[\dA-F]+[HX]|\$\d[\dA-F]*|0[OQ][0-7]+|[0-7]+[OQ]|0[BY][01]+|[01]+[BY]|0[DT]\d+|\d*\.?\d+(?:\.?E[-+]?\d+)?[DT]?)\b/i
/[-!$%&*+/<=>[\]|]/
/^\s*[$.?A-Z_][\w#$.?@~]*:/im
/\[?BITS (?:16|32|64)\]?/
/(?:EXTERN|GLOBAL)[^\n\r;]*/i
/(?:CPU|FLOAT|DEFAULT).*$/m
/\b(?:ST\d|[XYZ]MM\d{1,2}|[CDT]R\d|R\d{1,2}[BDW]?|[ER]?[A-D]X|[A-D][HL]|[ER]?(?:BP|SP|SI|DI)|[C-GS]S)\b/i
/^\s*SECTION\s*[.A-Z]+:?/im
/[-(),:=[\]{}]/
/(?:^|[\s(,:=[{])\d\d\d\d-\d{1,2}-\d{1,2}(?:(?:[Tt]| +)\d{1,2}:\d\d:\d\d(?:\.\d*)? *(?:Z|[-+]\d{1,2}(?::?\d\d)?)?)?(?=$|[\s),\]}])/
/(?:^|[\s(,[{])[^\s"'(),:=[\]{}]+(?=\s*:(?:$|[\s),\]}])|\s*=)/
/(?:^|[\s(,:=[{])[-+]?(?:0x[\dA-Fa-f]+|0o[0-7]+|0b[01]+|(?:\d+\.?\d*|\.?\d+)(?:[Ee][-+]?\d+)?)(?=$|[\s),:=\]}])/
/(?:^|[\s(,:=[{])(?:TRUE|FALSE|YES|NO)(?=$|[\s),:=\]}])/i
/(?:^|[\s(,:=[{])NULL(?=$|[\s),:=\]}])/i
/(?:^|[\s(,:=[{])(?:'''\r?\n(?:(?:[^\n\r]|\r?\n(?![\t ]*'''))*\r?\n)?[\t ]*'''|"""\r?\n(?:(?:[^\n\r]|\r?\n(?![\t ]*"""))*\r?\n)?[\t ]*"""|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*")/
/(?:^|[\s(,:=[{])(?:[^-\s"#'(),:=[\]\`{}]|[-:][^\s"'(),=[\]{}])(?:[^\s(),:=\]}]+|:(?![\s),\]}]|$)|[\t ]+[^\s#(),:=\]}])*/
/\$[A-Z_]+/i
/\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|IF_NOT_EMPTY|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|HTTP|EVENTS|ACCEPT_MUTEX|ACCEPT_MUTEX_DELAY|ACCESS_LOG|ADD_AFTER_BODY|ADD_BEFORE_BODY|ADD_HEADER|ADDITION_TYPES|AIO|ALIAS|ALLOW|ANCIENT_BROWSER|ANCIENT_BROWSER_VALUE|AUTH|AUTH_BASIC|AUTH_BASIC_USER_FILE|AUTH_HTTP|AUTH_HTTP_HEADER|AUTH_HTTP_TIMEOUT|AUTOINDEX|AUTOINDEX_EXACT_SIZE|AUTOINDEX_LOCALTIME|BREAK|CHARSET|CHARSET_MAP|CHARSET_TYPES|CHUNKED_TRANSFER_ENCODING|CLIENT_BODY_BUFFER_SIZE|CLIENT_BODY_IN_FILE_ONLY|CLIENT_BODY_IN_SINGLE_BUFFER|CLIENT_BODY_TEMP_PATH|CLIENT_BODY_TIMEOUT|CLIENT_HEADER_BUFFER_SIZE|CLIENT_HEADER_TIMEOUT|CLIENT_MAX_BODY_SIZE|CONNECTION_POOL_SIZE|CREATE_FULL_PUT_PATH|DAEMON|DAV_ACCESS|DAV_METHODS|DEBUG_CONNECTION|DEBUG_POINTS|DEFAULT_TYPE|DENY|DEVPOLL_CHANGES|DEVPOLL_EVENTS|DIRECTIO|DIRECTIO_ALIGNMENT|DISABLE_SYMLINKS|EMPTY_GIF|ENV|EPOLL_EVENTS|ERROR_LOG|ERROR_PAGE|EXPIRES|FASTCGI_BUFFER_SIZE|FASTCGI_BUFFERS|FASTCGI_BUSY_BUFFERS_SIZE|FASTCGI_CACHE|FASTCGI_CACHE_BYPASS|FASTCGI_CACHE_KEY|FASTCGI_CACHE_LOCK|FASTCGI_CACHE_LOCK_TIMEOUT|FASTCGI_CACHE_METHODS|FASTCGI_CACHE_MIN_USES|FASTCGI_CACHE_PATH|FASTCGI_CACHE_PURGE|FASTCGI_CACHE_USE_STALE|FASTCGI_CACHE_VALID|FASTCGI_CONNECT_TIMEOUT|FASTCGI_HIDE_HEADER|FASTCGI_IGNORE_CLIENT_ABORT|FASTCGI_IGNORE_HEADERS|FASTCGI_INDEX|FASTCGI_INTERCEPT_ERRORS|FASTCGI_KEEP_CONN|FASTCGI_MAX_TEMP_FILE_SIZE|FASTCGI_NEXT_UPSTREAM|FASTCGI_NO_CACHE|FASTCGI_PARAM|FASTCGI_PASS|FASTCGI_PASS_HEADER|FASTCGI_READ_TIMEOUT|FASTCGI_REDIRECT_ERRORS|FASTCGI_SEND_TIMEOUT|FASTCGI_SPLIT_PATH_INFO|FASTCGI_STORE|FASTCGI_STORE_ACCESS|FASTCGI_TEMP_FILE_WRITE_SIZE|FASTCGI_TEMP_PATH|FLV|GEO|GEOIP_CITY|GEOIP_COUNTRY|GOOGLE_PERFTOOLS_PROFILES|GZIP|GZIP_BUFFERS|GZIP_COMP_LEVEL|GZIP_DISABLE|GZIP_HTTP_VERSION|GZIP_MIN_LENGTH|GZIP_PROXIED|GZIP_STATIC|GZIP_TYPES|GZIP_VARY|IF|IF_MODIFIED_SINCE|IGNORE_INVALID_HEADERS|IMAGE_FILTER|IMAGE_FILTER_BUFFER|IMAGE_FILTER_JPEG_QUALITY|IMAGE_FILTER_SHARPEN|IMAGE_FILTER_TRANSPARENCY|IMAP_CAPABILITIES|IMAP_CLIENT_BUFFER|INCLUDE|INDEX|INTERNAL|IP_HASH|KEEPALIVE|KEEPALIVE_DISABLE|KEEPALIVE_REQUESTS|KEEPALIVE_TIMEOUT|KQUEUE_CHANGES|KQUEUE_EVENTS|LARGE_CLIENT_HEADER_BUFFERS|LIMIT_CONN|LIMIT_CONN_LOG_LEVEL|LIMIT_CONN_ZONE|LIMIT_EXCEPT|LIMIT_RATE|LIMIT_RATE_AFTER|LIMIT_REQ|LIMIT_REQ_LOG_LEVEL|LIMIT_REQ_ZONE|LIMIT_ZONE|LINGERING_CLOSE|LINGERING_TIME|LINGERING_TIMEOUT|LISTEN|LOCATION|LOCK_FILE|LOG_FORMAT|LOG_FORMAT_COMBINED|LOG_NOT_FOUND|LOG_SUBREQUEST|MAP|MAP_HASH_BUCKET_SIZE|MAP_HASH_MAX_SIZE|MASTER_PROCESS|MAX_RANGES|MEMCACHED_BUFFER_SIZE|MEMCACHED_CONNECT_TIMEOUT|MEMCACHED_NEXT_UPSTREAM|MEMCACHED_PASS|MEMCACHED_READ_TIMEOUT|MEMCACHED_SEND_TIMEOUT|MERGE_SLASHES|MIN_DELETE_DEPTH|MODERN_BROWSER|MODERN_BROWSER_VALUE|MP4|MP4_BUFFER_SIZE|MP4_MAX_BUFFER_SIZE|MSIE_PADDING|MSIE_REFRESH|MULTI_ACCEPT|OPEN_FILE_CACHE|OPEN_FILE_CACHE_ERRORS|OPEN_FILE_CACHE_MIN_USES|OPEN_FILE_CACHE_VALID|OPEN_LOG_FILE_CACHE|OPTIMIZE_SERVER_NAMES|OVERRIDE_CHARSET|PCRE_JIT|PERL|PERL_MODULES|PERL_REQUIRE|PERL_SET|PID|POP3_AUTH|POP3_CAPABILITIES|PORT_IN_REDIRECT|POST_ACTION|POSTPONE_OUTPUT|PROTOCOL|PROXY|PROXY_BUFFER|PROXY_BUFFER_SIZE|PROXY_BUFFERING|PROXY_BUFFERS|PROXY_BUSY_BUFFERS_SIZE|PROXY_CACHE|PROXY_CACHE_BYPASS|PROXY_CACHE_KEY|PROXY_CACHE_LOCK|PROXY_CACHE_LOCK_TIMEOUT|PROXY_CACHE_METHODS|PROXY_CACHE_MIN_USES|PROXY_CACHE_PATH|PROXY_CACHE_USE_STALE|PROXY_CACHE_VALID|PROXY_CONNECT_TIMEOUT|PROXY_COOKIE_DOMAIN|PROXY_COOKIE_PATH|PROXY_HEADERS_HASH_BUCKET_SIZE|PROXY_HEADERS_HASH_MAX_SIZE|PROXY_HIDE_HEADER|PROXY_HTTP_VERSION|PROXY_IGNORE_CLIENT_ABORT|PROXY_IGNORE_HEADERS|PROXY_INTERCEPT_ERRORS|PROXY_MAX_TEMP_FILE_SIZE|PROXY_METHOD|PROXY_NEXT_UPSTREAM|PROXY_NO_CACHE|PROXY_PASS|PROXY_PASS_ERROR_MESSAGE|PROXY_PASS_HEADER|PROXY_PASS_REQUEST_BODY|PROXY_PASS_REQUEST_HEADERS|PROXY_READ_TIMEOUT|PROXY_REDIRECT|PROXY_REDIRECT_ERRORS|PROXY_SEND_LOWAT|PROXY_SEND_TIMEOUT|PROXY_SET_BODY|PROXY_SET_HEADER|PROXY_SSL_SESSION_REUSE|PROXY_STORE|PROXY_STORE_ACCESS|PROXY_TEMP_FILE_WRITE_SIZE|PROXY_TEMP_PATH|PROXY_TIMEOUT|PROXY_UPSTREAM_FAIL_TIMEOUT|PROXY_UPSTREAM_MAX_FAILS|RANDOM_INDEX|READ_AHEAD|REAL_IP_HEADER|RECURSIVE_ERROR_PAGES|REQUEST_POOL_SIZE|RESET_TIMEDOUT_CONNECTION|RESOLVER|RESOLVER_TIMEOUT|RETURN|REWRITE|ROOT|RTSIG_OVERFLOW_EVENTS|RTSIG_OVERFLOW_TEST|RTSIG_OVERFLOW_THRESHOLD|RTSIG_SIGNO|SATISFY|SATISFY_ANY|SECURE_LINK_SECRET|SEND_LOWAT|SEND_TIMEOUT|SENDFILE|SENDFILE_MAX_CHUNK|SERVER|SERVER_NAME|SERVER_NAME_IN_REDIRECT|SERVER_NAMES_HASH_BUCKET_SIZE|SERVER_NAMES_HASH_MAX_SIZE|SERVER_TOKENS|SET|SET_REAL_IP_FROM|SMTP_AUTH|SMTP_CAPABILITIES|SO_KEEPALIVE|SOURCE_CHARSET|SPLIT_CLIENTS|SSI|SSI_SILENT_ERRORS|SSI_TYPES|SSI_VALUE_LENGTH|SSL|SSL_CERTIFICATE|SSL_CERTIFICATE_KEY|SSL_CIPHERS|SSL_CLIENT_CERTIFICATE|SSL_CRL|SSL_DHPARAM|SSL_ENGINE|SSL_PREFER_SERVER_CIPHERS|SSL_PROTOCOLS|SSL_SESSION_CACHE|SSL_SESSION_TIMEOUT|SSL_VERIFY_CLIENT|SSL_VERIFY_DEPTH|STARTTLS|STUB_STATUS|SUB_FILTER|SUB_FILTER_ONCE|SUB_FILTER_TYPES|TCP_NODELAY|TCP_NOPUSH|TIMEOUT|TIMER_RESOLUTION|TRY_FILES|TYPES|TYPES_HASH_BUCKET_SIZE|TYPES_HASH_MAX_SIZE|UNDERSCORES_IN_HEADERS|UNINITIALIZED_VARIABLE_WARN|UPSTREAM|USE|USER|USERID|USERID_DOMAIN|USERID_EXPIRES|USERID_NAME|USERID_P3P|USERID_PATH|USERID_SERVICE|VALID_REFERERS|VARIABLES_HASH_BUCKET_SIZE|VARIABLES_HASH_MAX_SIZE|WORKER_CONNECTIONS|WORKER_CPU_AFFINITY|WORKER_PRIORITY|WORKER_PROCESSES|WORKER_RLIMIT_CORE|WORKER_RLIMIT_NOFILE|WORKER_RLIMIT_SIGPENDING|WORKING_DIRECTORY|XCLIENT|XML_ENTITIES|XSLT_ENTITIES|XSLT_STYLESHEET|XSLT_TYPES|SSL_SESSION_TICKETS|SSL_STAPLING|SSL_STAPLING_VERIFY|SSL_ECDH_CURVE|SSL_TRUSTED_CERTIFICATE|MORE_SET_HEADERS|SSL_EARLY_DATA)\b/i
/(?:^|[^"\\{])#.*/
/\b(?:0[BOXbox][\dA-F_a-f]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[Ee][-+]?\d[\d_]*)?)(?:'?[fiu]\d*)?/
/\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/
/[([{]\.|\.[)\]}]|[(),:[\]\`{}]/
/(?:\b(?!\d)(?:\w|\\x[89A-Fa-f][\dA-Fa-f])+)?(?:"""[^]*?"""(?!")|"(?:\\[^]|""|[^"\\])*")|'(?:\\(?:\d+|x[\dA-Fa-f]{2}|.)|[^'])'/
/(?:(?!\d)(?:\w|\\x[89A-Fa-f][\dA-Fa-f])+|\`[^\n\r\`]+\`)\*?(?:\[[^\]]+\])?(?=\s*\()/
/\`[^\n\r\`]+\`/
/(?:^|[([{](?=\.\.)|(?![([{]\.).)(?:(?:[-!$%&*+/:<=>?@\\|~^]|\.\.|\.(?![)\]}]))+|\b(?:and|div|of|or|in|is|isnot|mod|not|notin|shl|shr|xor)\b)/m
/\*$/
/\`/
/\/\*[^]*?\*\/|#.*/
/\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/
/\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:url|Tarball)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/
/[!<=>]=?|\+{1,2}|\|\||&&|\/\/|->?|[?@]/
/[(),.:;[\]{}]/
/"(?:[^"\\]|\\[^])*"|''(?:(?!'')[^]|''(?:'|\\|\$\{))*''/
/\b[a-z]{3,7}:\/\/[\w#%&+\-./:=?~]+/
/\$(?=\{)/
/[^/](?:[\w#%&+\-.:=?~]*(?!\/\/)[\w#%&+\-./:=?~])?(?!\/\/)\/[\w#%&+\-./:=?~]*/
/(?:^|(?:^|(?!'').)[^\\])\$\{(?:[^}]|\{[^}]*\})*\}/
/^\$(?=\{)/
/\b(?:admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user|ARCHIVE|FILE_(?:ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK(?:(?:CR|CU|LM)(?:32|64)?|DD|PD|U)|HKEY_(?:CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(?:ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(?:ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)\b/
/\$\{[\w\-.:^]+\}|\$\([\w\-.:^]+\)/
/\$\w+/
/-{1,2}|\+{1,2}|<=?|>=?|={1,2}=?|&{1,2}|\|{1,2}|[%*/?~^]/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|[#;].*)/
/^\s*(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|Banner|BG(?:Font|Gradient|Image)|BrandingText|BringToFront|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|WriteUTF16LE|Seek|Write|WriteByte|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DlgItem|DLLVersion(?:Local)?|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|InstProgressFlags|InstType(?:GetText|SetText)?|Int(?:64|Ptr)?CmpU?|Int(?:64)?Fmt|Int(?:Ptr)?Op|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|Name|Nop|ns(?:Dialogs|Exec)|NSISdl|OutFile|Page(?:Callbacks)?|PE(?:DllCharacteristics|SubsysVer)|Pop|Push|Quit|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(?:End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|Unicode|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UninstPage|UnRegDLL|UserInfo|Var|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle)\b/m
/^\s*!(?:ADDINCLUDEDIR|ADDPLUGINDIR|APPENDFILE|CD|DEFINE|DELFILE|ECHO|ELSE|ENDIF|ERROR|EXECUTE|FINALIZE|GETDLLVERSION|GETTLBVERSION|IFDEF|IFMACRODEF|IFMACRONDEF|IFNDEF|IF|INCLUDE|INSERTMACRO|MACROEND|MACRO|MAKENSIS|PACKHDR|PRAGMA|SEARCHPARSE|SEARCHREPLACE|SYSTEM|TEMPFILE|UNDEF|VERBOSE|WARNING)\b/im
/"(?:\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\r\n|[^])|(?!')[^\n\r\\])*'|@"(?:\\(?:\r\n|[^])|[^\n\r"\\])*"/
/\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/
/-[->]?|\+{1,2}|!=?|<{1,2}=?|>{1,2}=?|={1,2}|&{1,2}|\|{1,2}|[%*/?@~^]/
/\b(?:0X[\dA-F][\dA-F_]+|(?:0[BO])?\d[\d_]*\.?[\d_]*(?:E[-+]?[\d_]+)?)/i
/\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/
/:=|[-!$%&*+/<=>?@|~^][!$%&*+\-./:<=>?@|~^]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/
/[(),.:;[\]{|}]|\b_\b/
/\B#\w+/
/\B~\w+/
/\B'\w+/
/\`\w+/
/\b[A-Z]\w+/
/'(?:\\(?:\d+|X[\dA-F]+|.)|(?!')[^\n\r\\])'|\`(?:\\(?:\d+|X[\dA-F]+|.)|(?!\`)[^\n\r\\])\`/i
/\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|auto|break|case|cl_(?:image_format|mem_fence_flags)|clk_event_t|complex|const|continue|default|do|(?:float|double)(?:16(?:x(?:1|16|2|4|8))?|1x(?:1|16|2|4|8)|2(?:x(?:1|16|2|4|8))?|3|4(?:x(?:1|16|2|4|8))?|8(?:x(?:1|16|2|4|8))?)?|else|enum|event_t|extern|for|goto|(?:u?(?:char|short|int|long)|half|quad|bool)(?:2|3|4|8|16)?|if|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|imaginary|inline|intptr_t|ndrange_t|packed|pipe|ptrdiff_t|queue_t|register|reserve_id_t|restrict|return|sampler_t|signed|size_t|sizeof|static|struct|switch|typedef|uintptr_t|uniform|union|unsigned|void|volatile|while)\b/
/(?:\b0X(?:[\dA-F]+\.?[\dA-F]*|\.[\dA-F]+)(?:P[-+]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?)[FHLU]*/i
/\bcl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|short|int|long)|float|double)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?)\b/
/\bCL_(?:TRUE|FALSE)\b/
/\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:16|24|8|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/
/\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|Kernel|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/
/\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:LOCAL|GLOBAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[SU]NORM)_INT(?:8|16|32)|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT|HALF)_(?:DIG|EPSILON|MANT_DIG|(?:MIN|MAX)(?:(?:_10)?_EXP)?)|FLT_RADIX|HUGE_VALF?|INFINITY|(?:INT|LONG|SCHAR|SHRT)_(?:MAX|MIN)|(?:UCHAR|USHRT|UINT|ULONG)_MAX|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:10|2)E?|PI(?:_[24])?|SQRT(?:1_2|2))(?:_F|_H)?|NAN)\b/
/\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|Sampler|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|UserEvent)\b/
/\/\*[^]*?\*\/|%.*/
/\$|\[\]|\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/
/\b(?:0[BX][\dA-F]+|\d+\.?\d*(?:E~?\d+)?)\b|&(?:[^\\]|\\(?:\d{3}|.))/i
/\b[A-Z][\dA-Za-z]*|\`(?:[^\\\\\`]|\\.)+\`/
/:(?:=|:{1,2})|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!{1,2}|[-#*+,/@|~^]|\b(?:andthen|div|mod|orelse)\b/
/[().:;?[\]{}]/
/"(?:[^"\\]|\\[^])*"/
/'(?:[^'\\]|\\[^])*'/
/\b[a-z][\dA-Za-z]*(?=\()/
/\{[A-Z][\dA-Za-z]*\b/
/\/\*[^]*?\*\/|\\\\.*/
/\b(?:b *r *e *a *k *p *o *i *n *t|b *r *e *a *k|d *b *g *_ *d *o *w *n|d *b *g *_ *e *r *r|d *b *g *_ *u *p|d *b *g *_ *x|f *o *r *c *o *m *p *o *s *i *t *e|f *o *r *d *i *v|f *o *r *e *l *l|f *o *r *p *a *r *t|f *o *r *p *r *i *m *e|f *o *r *s *t *e *p|f *o *r *s *u *b *g *r *o *u *p|f *o *r *v *e *c|f *o *r|i *f *e *r *r|i *f|l *o *c *a *l|m *y|n *e *x *t|r *e *t *u *r *n|u *n *t *i *l|w *h *i *l *e)\b/
/\w[\w ]*?(?= *\()/
/\. *\.|[!*/](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?:(?: *<)?(?: *=)?| *>)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||[#'~^]/
/[(),.:;[\]{|}]/
/"(?:[^\n\r"\\]|\\.)*"/
/(?:\. *\. *)?(?:\b\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *E *[-+]? *\d(?: *\d)*)?/i
/[();[\]{}]/
/\s#.*/
/(?:^|[^\^])\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/
/(?:^|[^\^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/
/(?:^|[^\^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|:{1,2})\w+)*(?:\.|:{1,2})?/
/(?:^|[^\^])\B[@^]\w+(?:(?:\.|:{1,2})\w+)*(?:\.|:{1,2})?/
/\^(?:["$'():;@[\]\^{}]|#[\dA-F]*)/i
/\b(?:0X[\dA-F]+|\d+\.?\d*(?:E[-+]?\d+)?)\b/i
/[%*+/\\~]|!(?:\|{1,2}|=)?|&{1,2}|\|{1,2}|==|<[<=]?|>[=>]?|-[df]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/
/\.|:+/
/(?:^|[^\^])(?:"(?:(?!")[^\^]|\^[^])*"|'(?:(?!')[^\^]|\^[^])*')/
/^@(?:GET_|SET_)/
/\(\.|\.\)|[(),.:;[\]]/
/\(\*[^]+?\*\)/
/\{[^]+?\}/
/(?:'(?:''|[^\n\r'])*'(?!')|#[$%&]?[\dA-F]+)+|\^[A-Z]/i
/[%&]\d+|\$[\dA-F]+/i
/\b\d+(?:\.\d+)?(?:E[-+]?\d+)?/i
/\.\.|\*\*|:=|<[<=>]?|>[=>]?|[-*+/]=?|[=@^]/
/(?:^|[^&])\b(?:ABSOLUTE|ARRAY|ASM|BEGIN|CASE|CONST|CONSTRUCTOR|DESTRUCTOR|DO|DOWNTO|ELSE|END|FILE|FOR|FUNCTION|GOTO|IF|IMPLEMENTATION|INHERITED|INLINE|INTERFACE|LABEL|NIL|OBJECT|OF|OPERATOR|PACKED|PROCEDURE|PROGRAM|RECORD|REINTRODUCE|REPEAT|SELF|SET|STRING|THEN|TO|TYPE|UNIT|UNTIL|USES|VAR|WHILE|WITH)\b/i
/(?:^|[^&])\b(?:DISPOSE|EXIT|FALSE|NEW|TRUE)\b/i
/(?:^|[^&])\b(?:CLASS|DISPINTERFACE|EXCEPT|EXPORTS|FINALIZATION|FINALLY|INITIALIZATION|INLINE|LIBRARY|ON|OUT|PACKED|PROPERTY|RAISE|RESOURCESTRING|THREADVAR|TRY)\b/i
/(?:^|[^&])\b(?:ABSOLUTE|ABSTRACT|ALIAS|ASSEMBLER|BITPACKED|BREAK|CDECL|CONTINUE|CPPDECL|CVAR|DEFAULT|DEPRECATED|DYNAMIC|ENUMERATOR|EXPERIMENTAL|EXPORT|EXTERNAL|FAR|FAR16|FORWARD|GENERIC|HELPER|IMPLEMENTS|INDEX|INTERRUPT|IOCHECKS|LOCAL|MESSAGE|NAME|NEAR|NODEFAULT|NORETURN|NOSTACKFRAME|OLDFPCCALL|OTHERWISE|OVERLOAD|OVERRIDE|PASCAL|PLATFORM|PRIVATE|PROTECTED|PUBLIC|PUBLISHED|READ|REGISTER|REINTRODUCE|RESULT|SAFECALL|SAVEREGISTERS|SOFTFLOAT|SPECIALIZE|STATIC|STDCALL|STORED|STRICT|UNALIGNED|UNIMPLEMENTED|VARARGS|VIRTUAL|WRITE)\b/i
/(?:^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/
/\(\*[^]+?\*\)|\/\/.*/
/\w+(?=\s*\()/
/->|=\/=|\.\.|\*\*|:=|<[<=>]?|>[=>]?|[-*+/]=?|[=@|^]|\b(?:and|mod|or)\b/
/\(\.|\.\)|[(),.:;[\]{}]/
/"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|\`(?:\\[^]|(?!\`)[^\\])*\`|\^[A-Z]/i
/(?:^|[^&])\b(?:BEGIN|BLOCK|CASE|CONST|ELSE|END|FAIL|FOR|FROM|FUNCTION|IF|IS|NIL|OF|REMOVE|RETURN|SKIP|THEN|TYPE|VAR|WHILE|WITH)\b/i
/(?:^|[^&])\b(?:TRUE|FALSE)\b/i
/(?:^|[^&])\b(?:BOOL|INT|LIST|MAP|NAT|RECORD|STRING|UNIT)\b/i
/%[01]+|&[0-7]+|\$[\dA-F]+/i
/\b\d+(?:\.\d+)?(?:E[-+]?\d+)?(?:MTZ|N)?/i
/\bTYPE\s+\w+\s+IS\s+(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))/i
/(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))(?=\s+IS(?:(?<!\w)\w|(?<=\w)(?!\w)))/i
/:\s*(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))/
/[,;]/
/YES|NO/
/(?:^|;)\s*[-\dA-Z]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s*=)/
/TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/
/(?:^|\s)\d+(?:\.\d+)?(?!\S)/
/^[-\dA-Z]+/
/^TLIST/
/^\s*\[[-\w]+\]/
/^\s*[^]+/
/^\s*\(\s*\w+/
/[-\w]+/
/^\(|\)$|,/
/\/\*[^]*?\*\/|\bREM[^;]*;|<\*(?:[^*<]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[^])*\*>)*\*>|\/\+[^]*?\+\//
/\b(?:ABSTRACT|ALIAS|AS|CATCH|CLASS|COMPONENT|CONSTANT|CREATE|DECLARE|ELSE|END-(?:CLASS|EVALUATE|FOR|FUNCTION|GET|IF|METHOD|SET|TRY|WHILE)|EVALUATE|EXTENDS|FOR|FUNCTION|GET|GLOBAL|IMPLEMENTS|IMPORT|INSTANCE|IF|LIBRARY|LOCAL|METHOD|NULL|OF|OUT|PEOPLECODE|PRIVATE|PROGRAM|PROPERTY|PROTECTED|READONLY|REF|REPEAT|RETURNS?|SET|STEP|THEN|THROW|TO|TRY|UNTIL|VALUE|WHEN(?:-OTHER)?|WHILE)\b/i
/[A-Z_]\w*(?=\s*\()/i
/<>|[<>]=?|!=|\*\*|[-*+/=@|]/
/[(),.:;[\]]/
/(?:^|[^-\w])(?:FUNCTION|METHOD)\s+\w+/i
/(?:^|[^-\w])(?:AS|CATCH|CLASS|COMPONENT|CREATE|EXTENDS|GLOBAL|IMPLEMENTS|INSTANCE|LOCAL|OF|PROPERTY|RETURNS)\s+\w+(?::\w+)*/i
/\b(?:AND|NOT|OR)\b/i
/\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/
/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][-+]?\d+)?)\b/
/-[ABCMORSTWXb-gklopr-uwxz]\b|\+[+=]?|-[-=>]?|\*{1,2}=?|\/{1,2}=?|=[=>~]?|~[=~]?|\|{1,2}=?|&{1,2}=?|<(?:=>?|<=?)?|>{1,2}=?|![=~]?|[%^]=?|\.(?:=|\.{1,2})?|[?\\]|\bx(?:=|(?<!\w)(?=\w)|(?<=\w)(?!\w))|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/
/[$%&*@]\{\^[A-Z]+\}/
/[$%&*@]\^[A-Z_]/
/[$%&*@]#?(?=\{)/
/[$%&*@]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/
/[$%&*@]\d+/
/(?!%=)[$%@][^\0-\x200-9A-Za-z\x7f-\uffff]/
/<(?![<=])\S*>|\b_\b/
/v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/
/SUB \w+/i
/^\s*=\w+[^]*?=cut.*/m
/\b(?:q|qq|qx|qw)\s*[^\s\d(<\x41-\x5b\x61-\x7b](?:(?![]Unknown:\\1[])[^\\]|\\[^])*[]Unknown:\\1[]/
/\b(?:q|qq|qx|qw)\s+(?:0(?:(?!0)[^\\]|\\[^])*0|1(?:(?!1)[^\\]|\\[^])*1|2(?:(?!2)[^\\]|\\[^])*2|3(?:(?!3)[^\\]|\\[^])*3|4(?:(?!4)[^\\]|\\[^])*4|5(?:(?!5)[^\\]|\\[^])*5|6(?:(?!6)[^\\]|\\[^])*6|7(?:(?!7)[^\\]|\\[^])*7|8(?:(?!8)[^\\]|\\[^])*8|9(?:(?!9)[^\\]|\\[^])*9|A(?:(?!A)[^\\]|\\[^])*A|B(?:(?!B)[^\\]|\\[^])*B|C(?:(?!C)[^\\]|\\[^])*C|D(?:(?!D)[^\\]|\\[^])*D|E(?:(?!E)[^\\]|\\[^])*E|F(?:(?!F)[^\\]|\\[^])*F|G(?:(?!G)[^\\]|\\[^])*G|H(?:(?!H)[^\\]|\\[^])*H|I(?:(?!I)[^\\]|\\[^])*I|J(?:(?!J)[^\\]|\\[^])*J|K(?:(?!K)[^\\]|\\[^])*K|L(?:(?!L)[^\\]|\\[^])*L|M(?:(?!M)[^\\]|\\[^])*M|N(?:(?!N)[^\\]|\\[^])*N|O(?:(?!O)[^\\]|\\[^])*O|P(?:(?!P)[^\\]|\\[^])*P|Q(?:(?!Q)[^\\]|\\[^])*Q|R(?:(?!R)[^\\]|\\[^])*R|S(?:(?!S)[^\\]|\\[^])*S|T(?:(?!T)[^\\]|\\[^])*T|U(?:(?!U)[^\\]|\\[^])*U|V(?:(?!V)[^\\]|\\[^])*V|W(?:(?!W)[^\\]|\\[^])*W|X(?:(?!X)[^\\]|\\[^])*X|Y(?:(?!Y)[^\\]|\\[^])*Y|Z(?:(?!Z)[^\\]|\\[^])*Z|a(?:(?!a)[^\\]|\\[^])*a|b(?:(?!b)[^\\]|\\[^])*b|c(?:(?!c)[^\\]|\\[^])*c|d(?:(?!d)[^\\]|\\[^])*d|e(?:(?!e)[^\\]|\\[^])*e|f(?:(?!f)[^\\]|\\[^])*f|g(?:(?!g)[^\\]|\\[^])*g|h(?:(?!h)[^\\]|\\[^])*h|i(?:(?!i)[^\\]|\\[^])*i|j(?:(?!j)[^\\]|\\[^])*j|k(?:(?!k)[^\\]|\\[^])*k|l(?:(?!l)[^\\]|\\[^])*l|m(?:(?!m)[^\\]|\\[^])*m|n(?:(?!n)[^\\]|\\[^])*n|o(?:(?!o)[^\\]|\\[^])*o|p(?:(?!p)[^\\]|\\[^])*p|q(?:(?!q)[^\\]|\\[^])*q|r(?:(?!r)[^\\]|\\[^])*r|s(?:(?!s)[^\\]|\\[^])*s|t(?:(?!t)[^\\]|\\[^])*t|u(?:(?!u)[^\\]|\\[^])*u|v(?:(?!v)[^\\]|\\[^])*v|w(?:(?!w)[^\\]|\\[^])*w|x(?:(?!x)[^\\]|\\[^])*x|y(?:(?!y)[^\\]|\\[^])*y|z(?:(?!z)[^\\]|\\[^])*z)/
/\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[^])*\)/
/\b(?:q|qq|qx|qw)\s*\{(?:[^\\{}]|\\[^])*\}/
/\b(?:q|qq|qx|qw)\s*\[(?:[^[\\\]]|\\[^])*\]/
/\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[^])*>/
/"(?:(?!")[^\\]|\\[^])*"|\`(?:(?!\`)[^\\]|\\[^])*\`/
/'(?:[^\n\r'\\]|\\.)*'/
/\b(?:m|qr)\s*[^\s\d(<\x41-\x5b\x61-\x7b](?:(?![]Unknown:\\1[])[^\\]|\\[^])*[]Unknown:\\1[][acdgil-psux]*/
/\b(?:m|qr)\s+(?:0(?:(?!0)[^\\]|\\[^])*0|1(?:(?!1)[^\\]|\\[^])*1|2(?:(?!2)[^\\]|\\[^])*2|3(?:(?!3)[^\\]|\\[^])*3|4(?:(?!4)[^\\]|\\[^])*4|5(?:(?!5)[^\\]|\\[^])*5|6(?:(?!6)[^\\]|\\[^])*6|7(?:(?!7)[^\\]|\\[^])*7|8(?:(?!8)[^\\]|\\[^])*8|9(?:(?!9)[^\\]|\\[^])*9|A(?:(?!A)[^\\]|\\[^])*A|B(?:(?!B)[^\\]|\\[^])*B|C(?:(?!C)[^\\]|\\[^])*C|D(?:(?!D)[^\\]|\\[^])*D|E(?:(?!E)[^\\]|\\[^])*E|F(?:(?!F)[^\\]|\\[^])*F|G(?:(?!G)[^\\]|\\[^])*G|H(?:(?!H)[^\\]|\\[^])*H|I(?:(?!I)[^\\]|\\[^])*I|J(?:(?!J)[^\\]|\\[^])*J|K(?:(?!K)[^\\]|\\[^])*K|L(?:(?!L)[^\\]|\\[^])*L|M(?:(?!M)[^\\]|\\[^])*M|N(?:(?!N)[^\\]|\\[^])*N|O(?:(?!O)[^\\]|\\[^])*O|P(?:(?!P)[^\\]|\\[^])*P|Q(?:(?!Q)[^\\]|\\[^])*Q|R(?:(?!R)[^\\]|\\[^])*R|S(?:(?!S)[^\\]|\\[^])*S|T(?:(?!T)[^\\]|\\[^])*T|U(?:(?!U)[^\\]|\\[^])*U|V(?:(?!V)[^\\]|\\[^])*V|W(?:(?!W)[^\\]|\\[^])*W|X(?:(?!X)[^\\]|\\[^])*X|Y(?:(?!Y)[^\\]|\\[^])*Y|Z(?:(?!Z)[^\\]|\\[^])*Z|a(?:(?!a)[^\\]|\\[^])*a|b(?:(?!b)[^\\]|\\[^])*b|c(?:(?!c)[^\\]|\\[^])*c|d(?:(?!d)[^\\]|\\[^])*d|e(?:(?!e)[^\\]|\\[^])*e|f(?:(?!f)[^\\]|\\[^])*f|g(?:(?!g)[^\\]|\\[^])*g|h(?:(?!h)[^\\]|\\[^])*h|i(?:(?!i)[^\\]|\\[^])*i|j(?:(?!j)[^\\]|\\[^])*j|k(?:(?!k)[^\\]|\\[^])*k|l(?:(?!l)[^\\]|\\[^])*l|m(?:(?!m)[^\\]|\\[^])*m|n(?:(?!n)[^\\]|\\[^])*n|o(?:(?!o)[^\\]|\\[^])*o|p(?:(?!p)[^\\]|\\[^])*p|q(?:(?!q)[^\\]|\\[^])*q|r(?:(?!r)[^\\]|\\[^])*r|s(?:(?!s)[^\\]|\\[^])*s|t(?:(?!t)[^\\]|\\[^])*t|u(?:(?!u)[^\\]|\\[^])*u|v(?:(?!v)[^\\]|\\[^])*v|w(?:(?!w)[^\\]|\\[^])*w|x(?:(?!x)[^\\]|\\[^])*x|y(?:(?!y)[^\\]|\\[^])*y|z(?:(?!z)[^\\]|\\[^])*z)[acdgil-psux]*/
/\b(?:m|qr)\s*\((?:[^()\\]|\\[^])*\)[acdgil-psux]*/
/\b(?:m|qr)\s*\{(?:[^\\{}]|\\[^])*\}[acdgil-psux]*/
/\b(?:m|qr)\s*\[(?:[^[\\\]]|\\[^])*\][acdgil-psux]*/
/\b(?:m|qr)\s*<(?:[^<>\\]|\\[^])*>[acdgil-psux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s*[^\s\d(<\x41-\x5b\x61-\x7b](?:(?![]Unknown:\\2[])[^\\]|\\[^])*[]Unknown:\\2[](?:(?![]Unknown:\\2[])[^\\]|\\[^])*[]Unknown:\\2[][acdegil-prsux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s+(?:0(?:(?!0)[^\\]|\\[^])*0(?:(?!0)[^\\]|\\[^])*0|1(?:(?!1)[^\\]|\\[^])*1(?:(?!1)[^\\]|\\[^])*1|2(?:(?!2)[^\\]|\\[^])*2(?:(?!2)[^\\]|\\[^])*2|3(?:(?!3)[^\\]|\\[^])*3(?:(?!3)[^\\]|\\[^])*3|4(?:(?!4)[^\\]|\\[^])*4(?:(?!4)[^\\]|\\[^])*4|5(?:(?!5)[^\\]|\\[^])*5(?:(?!5)[^\\]|\\[^])*5|6(?:(?!6)[^\\]|\\[^])*6(?:(?!6)[^\\]|\\[^])*6|7(?:(?!7)[^\\]|\\[^])*7(?:(?!7)[^\\]|\\[^])*7|8(?:(?!8)[^\\]|\\[^])*8(?:(?!8)[^\\]|\\[^])*8|9(?:(?!9)[^\\]|\\[^])*9(?:(?!9)[^\\]|\\[^])*9|A(?:(?!A)[^\\]|\\[^])*A(?:(?!A)[^\\]|\\[^])*A|B(?:(?!B)[^\\]|\\[^])*B(?:(?!B)[^\\]|\\[^])*B|C(?:(?!C)[^\\]|\\[^])*C(?:(?!C)[^\\]|\\[^])*C|D(?:(?!D)[^\\]|\\[^])*D(?:(?!D)[^\\]|\\[^])*D|E(?:(?!E)[^\\]|\\[^])*E(?:(?!E)[^\\]|\\[^])*E|F(?:(?!F)[^\\]|\\[^])*F(?:(?!F)[^\\]|\\[^])*F|G(?:(?!G)[^\\]|\\[^])*G(?:(?!G)[^\\]|\\[^])*G|H(?:(?!H)[^\\]|\\[^])*H(?:(?!H)[^\\]|\\[^])*H|I(?:(?!I)[^\\]|\\[^])*I(?:(?!I)[^\\]|\\[^])*I|J(?:(?!J)[^\\]|\\[^])*J(?:(?!J)[^\\]|\\[^])*J|K(?:(?!K)[^\\]|\\[^])*K(?:(?!K)[^\\]|\\[^])*K|L(?:(?!L)[^\\]|\\[^])*L(?:(?!L)[^\\]|\\[^])*L|M(?:(?!M)[^\\]|\\[^])*M(?:(?!M)[^\\]|\\[^])*M|N(?:(?!N)[^\\]|\\[^])*N(?:(?!N)[^\\]|\\[^])*N|O(?:(?!O)[^\\]|\\[^])*O(?:(?!O)[^\\]|\\[^])*O|P(?:(?!P)[^\\]|\\[^])*P(?:(?!P)[^\\]|\\[^])*P|Q(?:(?!Q)[^\\]|\\[^])*Q(?:(?!Q)[^\\]|\\[^])*Q|R(?:(?!R)[^\\]|\\[^])*R(?:(?!R)[^\\]|\\[^])*R|S(?:(?!S)[^\\]|\\[^])*S(?:(?!S)[^\\]|\\[^])*S|T(?:(?!T)[^\\]|\\[^])*T(?:(?!T)[^\\]|\\[^])*T|U(?:(?!U)[^\\]|\\[^])*U(?:(?!U)[^\\]|\\[^])*U|V(?:(?!V)[^\\]|\\[^])*V(?:(?!V)[^\\]|\\[^])*V|W(?:(?!W)[^\\]|\\[^])*W(?:(?!W)[^\\]|\\[^])*W|X(?:(?!X)[^\\]|\\[^])*X(?:(?!X)[^\\]|\\[^])*X|Y(?:(?!Y)[^\\]|\\[^])*Y(?:(?!Y)[^\\]|\\[^])*Y|Z(?:(?!Z)[^\\]|\\[^])*Z(?:(?!Z)[^\\]|\\[^])*Z|a(?:(?!a)[^\\]|\\[^])*a(?:(?!a)[^\\]|\\[^])*a|b(?:(?!b)[^\\]|\\[^])*b(?:(?!b)[^\\]|\\[^])*b|c(?:(?!c)[^\\]|\\[^])*c(?:(?!c)[^\\]|\\[^])*c|d(?:(?!d)[^\\]|\\[^])*d(?:(?!d)[^\\]|\\[^])*d|e(?:(?!e)[^\\]|\\[^])*e(?:(?!e)[^\\]|\\[^])*e|f(?:(?!f)[^\\]|\\[^])*f(?:(?!f)[^\\]|\\[^])*f|g(?:(?!g)[^\\]|\\[^])*g(?:(?!g)[^\\]|\\[^])*g|h(?:(?!h)[^\\]|\\[^])*h(?:(?!h)[^\\]|\\[^])*h|i(?:(?!i)[^\\]|\\[^])*i(?:(?!i)[^\\]|\\[^])*i|j(?:(?!j)[^\\]|\\[^])*j(?:(?!j)[^\\]|\\[^])*j|k(?:(?!k)[^\\]|\\[^])*k(?:(?!k)[^\\]|\\[^])*k|l(?:(?!l)[^\\]|\\[^])*l(?:(?!l)[^\\]|\\[^])*l|m(?:(?!m)[^\\]|\\[^])*m(?:(?!m)[^\\]|\\[^])*m|n(?:(?!n)[^\\]|\\[^])*n(?:(?!n)[^\\]|\\[^])*n|o(?:(?!o)[^\\]|\\[^])*o(?:(?!o)[^\\]|\\[^])*o|p(?:(?!p)[^\\]|\\[^])*p(?:(?!p)[^\\]|\\[^])*p|q(?:(?!q)[^\\]|\\[^])*q(?:(?!q)[^\\]|\\[^])*q|r(?:(?!r)[^\\]|\\[^])*r(?:(?!r)[^\\]|\\[^])*r|s(?:(?!s)[^\\]|\\[^])*s(?:(?!s)[^\\]|\\[^])*s|t(?:(?!t)[^\\]|\\[^])*t(?:(?!t)[^\\]|\\[^])*t|u(?:(?!u)[^\\]|\\[^])*u(?:(?!u)[^\\]|\\[^])*u|v(?:(?!v)[^\\]|\\[^])*v(?:(?!v)[^\\]|\\[^])*v|w(?:(?!w)[^\\]|\\[^])*w(?:(?!w)[^\\]|\\[^])*w|x(?:(?!x)[^\\]|\\[^])*x(?:(?!x)[^\\]|\\[^])*x|y(?:(?!y)[^\\]|\\[^])*y(?:(?!y)[^\\]|\\[^])*y|z(?:(?!z)[^\\]|\\[^])*z(?:(?!z)[^\\]|\\[^])*z)[acdegil-prsux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[^])*\)\s*\((?:[^()\\]|\\[^])*\)[acdegil-prsux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s*\{(?:[^\\{}]|\\[^])*\}\s*\{(?:[^\\{}]|\\[^])*\}[acdegil-prsux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\\\]]|\\[^])*\]\s*\[(?:[^[\\\]]|\\[^])*\][acdegil-prsux]*/
/(?:^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[^])*>\s*<(?:[^<>\\]|\\[^])*>[acdegil-prsux]*/
/\/(?:[^\n\r/\\]|\\.)*\/[acdgil-psux]*(?=\s*(?:$|[\n\r!&)*+,\-.;<>?|}~^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)(?:(?<!\w)\w|(?<=\w)(?!\w))))/
/sub/
/@(?:global|param|property(?:-read|-write)?|var)\s+(?:(?:\b[A-Za-z]\w*|[[\\\]|])+\s+)?\$\w+/
/@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\s+(?:\b[A-Za-z]\w*|[[\\\]|])+/
/\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/
/[()[\\\]|]/
/\$this\b/
/\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/
/\b[\w\\]+::/
/static|self|parent/
/::|\\/
/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i
/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OF{1,2}|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i
/\b0X[\dA-F]+\b|\b\d+\.?\d*|\B\.\d+\b/i
/[-%*+/=~^]|&{1,2}|\|{1,2}|!=?|<(?:=>?|<|>)?|>[=>]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i
/[(),.;[\]\`]/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|(?:--|\/\/|#).*)/
/@[\w$.]+/
/(?:^|[^@\\])(?:"(?:\\[^]|(?!")[^\\]|"")*"|'(?:\\[^]|(?!')[^\\]|'')*')/
/\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
/:=/
/@(?:"(?:\\[^]|(?!")[^\\])+"|'(?:\\[^]|(?!')[^\\])+'|\`(?:\\[^]|(?!\`)[^\\])+\`)/
/\b(?:and|as|each|else|error|if|in|is|let|meta|not|nullable|optional|or|otherwise|section|shared|then|try|type)\b|#(?:binary|date|datetime|datetimezone|duration|infinity|nan|sections|shared|table|time)\b/
/[-&*+/?@^]|<(?:=>?|>)?|>=?|=>?|\.{2,3}/
/[(),;[\]{}]/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|\/\/.*)/
/#"(?:[^\n\r"]|"")*"(?!")/
/\bDay\.(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/
/\bTraceLevel\.(?:Critical|Error|Information|Verbose|Warning)\b/
/\bOccurrence\.(?:First|Last|All)\b/
/\bOrder\.(?:Ascending|Descending)\b/
/\bRoundingMode\.(?:AwayFromZero|Down|ToEven|TowardZero|Up)\b/
/\bMissingField\.(?:Error|Ignore|UseNull)\b/
/\bQuoteStyle\.(?:Csv|None)\b/
/\bJoinKind\.(?:Inner|LeftOuter|RightOuter|FullOuter|LeftAnti|RightAnti)\b/
/\bGroupKind\.(?:Global|Local)\b/
/\bExtraValues\.(?:List|Ignore|Error)\b/
/\bJoinAlgorithm\.(?:Dynamic|PairwiseHash|SortMerge|LeftHash|RightHash|LeftIndex|RightIndex)\b/
/\bJoinSide\.(?:Left|Right)\b/
/\bPrecision\.(?:Double|Decimal)\b/
/\bRelativePosition\.From(?:End|Start)\b/
/\bTextEncoding\.(?:Ascii|BigEndianUnicode|Unicode|Utf8|Utf16|Windows)\b/
/\b(?:Any|Binary|Date|DateTime|DateTimeZone|Duration|Int8|Int16|Int32|Int64|Function|List|Logical|None|Number|Record|Table|Text|Time)\.Type\b/
/(?:^|[^\w#.])(?!\d)[\w.]+(?=\s*\()/
/\b(?:any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|logical|none|number|record|table|text|time|type)\b/
/\b0X[\dA-F]+\b|(?:[-+]?(?:\b\d+\.)?\b\d+|[-+]\.\d+|(?:^|[^.])\B\.\d+)(?:E[-+]?\d+)?\b/i
/\[[A-Z](?:\[(?:\[[^\]]*\]|[^[\]])*\]|[^[\]])*\]/i
/\$(?:TRUE|FALSE)\b/i
/\$\w+\b/
/\b(?:BEGIN|BREAK|CATCH|CLASS|CONTINUE|DATA|DEFINE|DO|DYNAMICPARAM|ELSE|ELSEIF|END|EXIT|FILTER|FINALLY|FOR|FOREACH|FROM|FUNCTION|IF|INLINESCRIPT|PARALLEL|PARAM|PROCESS|RETURN|SEQUENCE|SWITCH|THROW|TRAP|TRY|UNTIL|USING|VAR|WHILE|WORKFLOW)\b/i
/[(),.;[\]{|}]/
/\b(?:ADD|APPROVE|ASSERT|BACKUP|BLOCK|CHECKPOINT|CLEAR|CLOSE|COMPARE|COMPLETE|COMPRESS|CONFIRM|CONNECT|CONVERT|CONVERTFROM|CONVERTTO|COPY|DEBUG|DENY|DISABLE|DISCONNECT|DISMOUNT|EDIT|ENABLE|ENTER|EXIT|EXPAND|EXPORT|FIND|FOREACH|FORMAT|GET|GRANT|GROUP|HIDE|IMPORT|INITIALIZE|INSTALL|INVOKE|JOIN|LIMIT|LOCK|MEASURE|MERGE|MOVE|NEW|NEW|OPEN|OPTIMIZE|OUT|PING|POP|PROTECT|PUBLISH|PUSH|READ|RECEIVE|REDO|REGISTER|REMOVE|RENAME|REPAIR|REQUEST|RESET|RESIZE|RESOLVE|RESTART|RESTORE|RESUME|REVOKE|SAVE|SEARCH|SELECT|SEND|SET|SHOW|SKIP|SORT|SPLIT|START|STEP|STOP|SUBMIT|SUSPEND|SWITCH|SYNC|TEE|TEST|TRACE|UNBLOCK|UNDO|UNINSTALL|UNLOCK|UNPROTECT|UNPUBLISH|UNREGISTER|UPDATE|USE|WAIT|WATCH|WHERE|WRITE)-[A-Z]+\b/i
/\b(?:AC|CAT|CHDIR|CLC|CLI|CLP|CLV|COMPARE|COPY|CP|CPI|CPP|CVPA|DBP|DEL|DIFF|DIR|EBP|ECHO|EPAL|EPCSV|EPSN|ERASE|FC|FL|FT|FW|GAL|GBP|GC|GCI|GCS|GDR|GI|GL|GM|GP|GPS|GROUP|GSV|GU|GV|GWMI|IEX|II|IPAL|IPCSV|IPSN|IRM|IWMI|IWR|KILL|LP|LS|MEASURE|MI|MOUNT|MOVE|MP|MV|NAL|NDR|NI|NV|OGV|POPD|PS|PUSHD|PWD|RBP|RD|RDR|REN|RI|RM|RMDIR|RNI|RNP|RP|RV|RVPA|RWMI|SAL|SAPS|SASV|SBP|SC|SELECT|SET|SHCM|SI|SL|SLEEP|SLS|SORT|SP|SPPS|SPSV|START|SV|SWMI|TEE|TRCM|TYPE|WRITE)\b/i
/\W?(?:!|-(?:EQ|NE|GT|GE|LT|LE|SH[LR]|NOT|B?(?:AND|X?OR)|(?:NOT)?(?:LIKE|MATCH|CONTAINS|IN)|REPLACE|JOIN|IS(?:NOT)?|AS)\b|-[-=]?|\+[+=]?|[%*/]=?)/i
/(?:^|[^\`])<#[^]*?#>/
/(?:^|[^\`])#.*/
/"(?:\`[^]|[^"\`])*"/
/'(?:[^']|'')*'/
/(?:^|[^\`])\$\((?:\$\([^\n\r()]*\)|(?!\$\()[^\n\r)])*\)/
/\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/
/\b(?!XML(?:(?<!\w)\w|(?<=\w)(?!\w)))[A-Z][\dA-Z_]+\b/
/<[<=]?|>[=>]?|&{1,2}|\|{1,2}|[%?]|[-!*+/=]=?/
/\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/
/\b(?:fx|fy|xf[xy]?|yfx?)\b/
/\b[A-Z_]\w*/
/\b[a-z]\w*(?:(?=\()|\/\d+)/
/\b\d+\.?\d*/
/[!$*+\-./\x3a-\x40\\|^]+|\b(?:is|mod|not|xor)\b/
/[(),[\]{}]/
/"(?:""|\\(?:\r\n|[^])|(?!")[^\n\r\\])*"|'(?:''|\\(?:\r\n|[^])|(?!')[^\n\r\\])*'/
/^[\t ]*[!#].*$/m
/^[\t ]*(?:\\(?:\r\n|[^])|[^\s:=\\])+?(?= *[:=] *| )/m
/[:=]/
/^[\t ]*(?:\\(?:\r\n|[^])|[^\s:=\\])+?(?: *[:=] *| )(?:\\(?:\r\n|[^])|[^\n\r\\])+/m
/\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/
/\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/
/\bMAP<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[A-Z_]\w*\s*[;=])/i
/(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|\B\.)[A-Z_]\w*(?:\.[A-Z_]\w*)*(?=\s+[A-Z_]\w*\s*[;=])/i
/\[\s*[A-Z_]\w*(?=\s*=)/i
/\b(?:enum|extend|message|service)\s+[A-Z_a-z]\w*(?=\s*\{)/
/\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?\.?[A-Z_a-z]\w*(?:\.[A-Z_a-z]\w*)*(?=\s*\))/
/[,.<>]/
/[!\-.=|]+/
/^[\t ]*\/\/.*(?:(?:\r?\n|\r)[]Unknown:\\2[][\t ]+.+)*/m
/^[\t ]*script\b.*\.[\t ]*(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:.+(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*[\w#\-.]+\.[\t ]*(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*<.+/m
/(?:^|\n)[\t ]*doctype(?: .+)?/
/^[\t ]*(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m
/^[\t ]*(?:block|extends|include|append|prepend)\b.+/m
/^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+.+/m
/^[\t ]*(?!-)[\w#\-.]*[-\w](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+.+/m
/^[\t ]*(?!-)[\w#\-.]*[-\w](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m
/^[\t ]*mixin .+/m
/^[\t ]*\+.+/m
/#[-\w]+/
/\.[-\w]+/
/^[\t ]*(?:-|!?=).+/m
/^each .+? in\b/
/^(?:if|unless|else|case|when|default|while)\b/
/^mixin/
/\w+(?=\s*\(|\s*$)/
/[(),.]/
/\b(?:each|in)\b/
/^\+\w+/
/&[^(]+\([^)]+\)/
/[-\w]+(?=\s*!?=|\s*[),])/
/[!(),=]+/
/=\s*(?:\{[^}]*\}|[^\n\r),]+)/
/[().:;[\]{}]/
/\{#[^]*?#\}/
/^\s*@.+/m
/^[\t ]*[-\w$]+\s*.?=[\t ]*(?:\{[^}]*\}|.+|$)/m
/^[\t ]*(?:if|else|for|return|unless)[\t ]+.+/m
/(?:^|\{)[\t ]*(?:[-\w]|\{[^\n\r}]+\})+(?:\s*:\s*|[\t ]+)[^\n\r{]*(?:;|[^\n\r,{]$(?!(?:\r?\n|\r)(?:\{|[]Unknown:\\2[][\t ]+)))/m
/^[\t ]*(?=\S)(?:[^\n\r():{}]|:{1,2}[-\w]+(?:\([^\n\r)]*\))?|\{[^\n\r}]+\})+(?:(?:\r?\n|\r)[]Unknown:\\1[](?=\S)(?:[^\n\r():{}]|:{1,2}[-\w]+(?:\([^\n\r)]*\))?|\{[^\n\r}]+\})+)*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|[]Unknown:\\1[][\t ]+)))/m
/[-\w]+\([^)]*\).*/
/\{[^\n\r:}]+\}/
/\{\{[^]*?\}\}|\{%[^]*?%\}/
/^[\t ]*:atpl(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:coffee(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:ejs(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:handlebars(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:less(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:livescript(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:markdown(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:sass(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^[\t ]*:stylus(?:(?:\r?\n|\r(?!\n))(?:[]Unknown:\\2[][\t ]+.+|\s*?(?=\r?\n|\r)))+/m
/^\S+/
/^[^(]+/
/\b(?:even|if|odd)\b/
/\b(?:true|false|null)\b/
/\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/
/\b[A-Z_]\w*\b/i
/[(),.:[\]{}]/
/\B!(?:IMPORTANT|OPTIONAL)\b/i
/#[\dA-F]{3,6}/i
/[(),:;[\]{}]/
/^[^\s:]+/
/^\{|\}$/
/^(?:\{\{-?|\{%-?\s*\w+)/
/-?(?:%\}|\}\})$/
/[<=>]=?|!=|\*{1,2}|\/{1,2}|\?:?|[-%+|~]/
/URL\((?:".*?"|'.*?'|.*?)\)/i
/(?:^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[-\w]+)/
/\b\d+(?:%|[a-z]+)/
/~|[!%+/<=>?]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
/^(?:\{\{|\{%)-?/
/^["']|["']$/
/\s(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/
/(?:\w+|\*)(?=\s*=>)/
/\b(?:0X[\dA-F]+|\d+(?:\.\d+)?(?:E-?\d+)?)\b/i
/\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/
/=[=>~]?|![=~]?|<(?:<\|?|[-=|~])?|>[=>]?|->?|~>|\|>?>?|[%*+/?]|\b(?:and|in|or)\b/
/[(),.;[\]{}]|:+/
/(?:\bnode\s+|[(,=[{~]\s*|[+=]>\s*|^\s*)\/(?:[^/\\]|\\[^])+\/(?:[imx]+\b|(?<=\w)(?=\w)|(?<!\w)(?!\w))/
/"(?:\$\{(?:[^"'}]|"(?:(?!")[^\\]|\\[^])*"|'(?:(?!')[^\\]|\\[^])*')+\}|(?!")[^\\]|\\[^])*"|'(?:\$\{(?:[^"'}]|"(?:(?!")[^\\]|\\[^])*"|'(?:(?!')[^\\]|\\[^])*')+\}|(?!')[^\\]|\\[^])*'/
/\$(?:::)?\w+(?:::\w+)*/
/\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/
/\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/
/@\("[^\n\r")/:]+"(?:\/[$Lnr-u]*)?\).*(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?[\t ]*\|?[\t ]*-?[\t ]*[]Unknown:\\2[]/
/@\([^\n\r")/:]+(?:\/[$Lnr-u]*)?\).*(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?[\t ]*\|?[\t ]*-?[\t ]*[]Unknown:\\2[]/
/@\("?[^\n\r")/:]+"?(?:\/[$Lnr-u]*)?\)/
/::/
/\.(?!\d)\w+/
/(?=\S).*\S(?= *$)/
/^\/(?:[^/\\]|\\[^])+\/[im]*x[im]*$/
/^"[^]*"$/
/\(.+?(?=\))/
/(?:^|[^\\])\$\{(?:[^"'{}]|\{[^}]*\}|"(?:(?!")[^\\]|\\[^])*"|'(?:(?!')[^\\]|\\[^])*')+\}/
/(?:^|[^\\])\$(?:::)?\w+(?:::\w+)*/
/^\$\{(?!\w+\()(?:::)?\w+(?:::\w+)*/
/^\$/
/\b(?:ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|false|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|NULL|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|then|throw|trace|true|type|underride|using|when|with)\b/
/\b(?:abs|add_(?:(?:fundef|interface|macdef|typedef)(?:_at)?|addr|constdef|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_(?:matrix|pointer)|byte_c?string(?:_pointer)?|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|short|sentry|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix(?:_view)?|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:err(?:pos)?)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|matrixp?|max|member|min|nanp|nargs|nmatrixp?|null|numberp?|ord|pack(?:ed)?|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int(?:64)?|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce(?:_with)?|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcat(?:map)?|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|subdiag(?:mat)?|submat|subseq2?|substr|succ|supdiag(?:mat)?|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vector(?:p|seq)?|void|zip3?|zipwith3?)\b/
/(?:[\x21-\x27*+,\-./:<=>?@\\\\\`|~\xa1-\xbf\xd7-\xf7\u20d0-\u2bff^]|\b_+\b)+|\b(?:and|div|mod|not|or)\b/
/[(),;[\]{|}]/
/%<[^]+?%>/
/(?:\.\.)?(?:\b(?:INF|NAN)\b|\b0X[\dA-F]+|(?:\b(?:0B)?\d+(?:\.\d)?|\B\.\d)\d*(?:E[-+]?\d+)?L?)/i
/\b__[A-Z]+__\b/i
/^%< *-\*-.+?-\*-/
/^%<.*|%>$/
/%< *-\*- *C\d* *-\*-[^]+?%>/i
/%< *-\*- *C\+\+\d* *-\*-[^]+?%>/i
/%< *-\*- *FORTRAN\d* *-\*-[^]+?%>/i
/\b(?:DECLARECDLL|DECLAREDLL|COMPILERSELECT|COMPILERCASE|COMPILERDEFAULT|COMPILERENDSELECT|COMPILERERROR|ENABLEEXPLICIT|DISABLEEXPLICIT|NOT|AND|OR|XOR|CALLDEBUGGER|DEBUGLEVEL|ENABLEDEBUGGER|DISABLEDEBUGGER|RESTORE|READ|INCLUDEPATH|INCLUDEBINARY|THREADED|RUNTIME|WITH|ENDWITH|STRUCTUREUNION|ENDSTRUCTUREUNION|ALIGN|NEWLIST|NEWMAP|INTERFACE|ENDINTERFACE|EXTENDS|ENUMERATION|ENDENUMERATION|SWAP|FOREACH|CONTINUE|FAKERETURN|GOTO|GOSUB|RETURN|BREAK|MODULE|ENDMODULE|DECLAREMODULE|ENDDECLAREMODULE|DECLARE|DECLAREC|PROTOTYPE|PROTOTYPEC|ENABLEASM|DISABLEASM|DIM|REDIM|DATA|DATASECTION|ENDDATASECTION|TO|PROCEDURERETURN|DEBUG|DEFAULT|CASE|SELECT|ENDSELECT|AS|IMPORT|ENDIMPORT|IMPORTC|COMPILERIF|COMPILERELSE|COMPILERENDIF|COMPILERELSEIF|END|STRUCTURE|ENDSTRUCTURE|WHILE|WEND|FOR|NEXT|STEP|IF|ELSE|ELSEIF|ENDIF|REPEAT|UNTIL|PROCEDURE|PROCEDUREDLL|PROCEDUREC|PROCEDURECDLL|ENDPROCEDURE|PROTECTED|SHARED|STATIC|GLOBAL|DEFINE|INCLUDEFILE|XINCLUDEFILE|MACRO|ENDMACRO)\b/i
/\b\w+(?:\.\w+)?\s*(?=\()/
/(?:\$[\dA-F]+|\b-?\d*\.?\d+(?:E[-+]?\d+)?)\b/i
/(?:@\*?|\?|\*)\w+|-[->]?|\+{1,2}|!=?|<{1,2}=?|>{1,2}=?|={1,2}|&{1,2}|\|{1,2}|[%*/?@~^]/
/^\s*!.*/m
/\b(?:ST\d|[XYZ]MM\d{1,2}|[CDT]R\d|R\d{1,2}[BDW]?|[ER]?[A-D]X|[A-D][HL]|[ER]?(?:BP|SP|SI|DI)|[C-GS]S|MM\d+)\b/i
/(?:(?<!\w)(?=\w)|(?<=\w)(?!\w)|-|(?=\$))(?:0[HX][\dA-F]*\.?[\dA-F]+(?:P[-+]?\d+)?|\d[\dA-F]+[HX]|\$\d[\dA-F]*|0[OQ][0-7]+|[0-7]+[OQ]|0[BY][01]+|[01]+[BY]|0[DT]\d+|\d*\.?\d+(?:\.?E[-+]?\d+)?[DT]?)\b/i
/[!$%&*+,\-./:<=>[\]|]/
/\s*!\s*J[A-Z]+\s+@[BF]/i
/\s*!\s*J[A-Z]+\s+[$.\x3f-\x5a_][\w#$.?@~]*/i
/^\s*!\s*[\dA-Z]+(?=\s|$)/im
/\s*:\s*[\dA-Z]+(?=\s)/i
/^\s*!\s*[$.\x3f-\x5a_][\w#$.?@~]*(?=:)/im
/(?:EXTERN|EXTERN|GLOBAL)[^\n\r;]*/i
/(?:CPU|FLOAT|DEFAULT).*/
/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/
/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/
/\b(?:True|False|None)\b/
/(?:\b(?=\d)|\B(?=\.))(?:0[BO])?(?:(?:\d|0X[\dA-F])[\dA-F]*\.?\d*|\.\d+)(?:E[-+]?\d+)?J?\b/i
/[-%+=]=?|!=|\*{1,2}=?|\/{1,2}=?|<[<=>]?|>[=>]?|[&|~^]/
/(?:F|RF|FR)(?:"""[^]*?"""|'''[^]*?'''|"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*')/i
/(?:[BRU]|RB|BR)?(?:"""[^]*?"""|'''[^]*?''')/i
/(?:[BRU]|RB|BR)?(?:"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*')/i
/(?:^|\s)def[\t ]+[A-Z_a-z]\w*(?=\s*\()/
/\bCLASS\s+\w+/i
/^\s*@\w+(?:\.\w+)*/m
/(?:^|[^{])(?:\{\{)*\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)[^{}]+\})+\})+\}/
/:[^():{}]+(?=\}$)/
/![ars](?=[:}]$)/
/\`(?::\S+|[\w.]*)/
/\b(?![01]:)(?:0[nw]|0W[hj]?|0N[ehj]?|0x[\dA-Fa-f]+|\d+\.?\d*(?:e[-+]?\d+)?[befhj]?)/
/\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|ceiling|cols|cor|cos|count|cov|cross|csv|cut|delete|deltas|desc|dev|differ|distinct|div|do|dsave|ej|enlist|eval|except|exec|exit|exp|fby|fills|first|fkeys|flip|floor|from|get|getenv|group|gtime|hclose|hcount|hdel|hopen|hsym|iasc|identity|idesc|if|ij|in|insert|inter|inv|keys?|last|like|list|ljf?|load|log|lower|lsq|ltime|ltrim|mavg|maxs?|mcount|md5|mdev|med|meta|mins?|mmax|mmin|mmu|mod|msum|neg|next|not|null|or|over|parse|peach|pj|plist|prds?|prev|prior|rand|rank|ratios|raze|read0|read1|reciprocal|reval|reverse|rload|rotate|rsave|rtrim|save|scan|scov|sdev|select|set|setenv|show|signum|sin|sqrt|ssr?|string|sublist|sums?|sv|svar|system|tables|tan|til|trim|txf|type|uj|ungroup|union|update|upper|upsert|value|var|views?|vs|wavg|where|while|within|wj1?|wsum|ww|xasc|xbar|xcols?|xdesc|xexp|xgroup|xkey|xlog|xprev|xrank)\b/
/[().;[\]{}]/
/0N[dmtuvz]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[tuv]?/
/['/\\]:?|\beach\b/
/(?:\B\.\B|\b[01]:|<[=>]?|>=?|[-!#$%&*+,:=?@|~^]):?|\b_\b:?/
/[\t )\]}]\/.*/
/(?:^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?(?:\\(?=[\t ]*(?:\r?\n|\r))|$)|\S.*)/
/^\\[\t ]*(?:\r?\n|\r)[^]+/m
/^#!.+/m
/\b(?:as|import|on)\b/
/[,:;[\]{}]/
/(?:^|;)[\t ]*function\s+[$A-Z_a-z\xa0-\uffff][\w$\xa0-\uffff]*\s*\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\}|\\[^])*\)\s*\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\}|\\[^])*\}/m
/(?:^|[:;])[\t ]*(?!\d)\w+(?=[\t ]*\{|[\t ]+on(?:(?<!\w)\w|(?<=\w)(?!\w)))/m
/:[\t ]*(?![\s;[}])(?:(?!$|[;}])(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\((?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\)|\[(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\]|\{(?:[^"'()/[\\\]{}]|"(?:\\.|[^\n\r"\\])*"|'(?:\\.|[^\n\r'\\])*'|\/(?![*/])|\/\/.*$|\/\*(?:[^*]|\*(?!\/))*\*\/|\(\)|\[\]|\{\}|\\[^])*\}|\\[^])*\}|\\[^])*\}|\\[^]))+/m
/(?:^|[;{])[\t ]*(?!\d)\w+(?:\.\w+)*(?=[\t ]*:)/m
/(?:^|[;{])[\t ]*property[\t ]+(?!\d)\w+(?:\.\w+)*[\t ]+(?!\d)\w+(?:\.\w+)*(?=[\t ]*:)/m
/^property/
/\w+(?:\.\w+)*/
/\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:int|float|number|bool|string|date|list)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/
/\$?\b(?!\d)\w+(?=\()/
/\b(?:0B[01]+|0X[\dA-F]*\.?[-\dA-FP]+|\d*\.?\d+E?\d*[DF]|\d*\.?\d+)\b/i
/\$(?!\d)\w+\b/
/(?:^|[^\\])(?:\/\*[^]*?\*\/|(?:\/\/|#).*)/
/"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'/
/(?:^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:={1,2}|~)?|>{1,2}=?|<(?:=>?|<=?)?|&[&=]?|\|[=|]?|[%*/^]=?|[?~])/
/\b(?:TRUE|FALSE)\b/
/\.\.(?:\.|\d+)/
/\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/
/->?>?|<(?:=|<?-)?|[!=>]=?|:{1,2}|&{1,2}|\|{1,2}|[$*+/@~^]/
/[(),;[\]{}]/
/"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'/
/%[^\s%]*%/
/\b(?:NaN|Inf)\b/
/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EPep][-+]?\d+)?[Li]?/
/['()[\]]/
/^#lang.+/m
/'[^\s#'()[\]]+/
/[([]lambda\s+[([][^\s'()[\]]+/
/[([](?:define(?:-library|-macro|-syntax|-values)?|defmacro|(?:case-)?lambda|let(?:(?:\*|rec)?(?:-values)?|-syntax|rec-syntax)|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-(?:case|rules))(?=[\s()[\]]|$)/
/[([](?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[\s()[\]]|$)/
/(?:^|[\s()[\]])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[-+]?(?:(?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)(?:[-+](?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)i)?|(?:\d*\.?\d+(?:[Ee][-+]?\d+)?|\d+\/\d+)i)|(?:#[box](?:#[ei])?|#[ei](?:#[box])?)[-+]?(?:[\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?(?:[-+][\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?i)?|[\dA-Fa-f]+(?:\/[\dA-Fa-f]+)?i))(?=[\s()[\]]|$)/
/(?:^|[\s()[\]])#[ft](?=[\s()[\]]|$)/
/[([](?:[-%*+/]|[<>]=?|=>?)(?=[\s()[\]]|$)/
/[([][^\s'()[\]]+(?=[\s()[\]]|$)/
/<\/?(?:[\w\-.:]+\s*(?:\s+(?:[\w$\-.:]+(?:=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|[^\s"'=>{]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[$A-Z_][\w$]*(?:\.[$A-Z_][\w$]*)*\s*\}))*\s*\/?)?>/i
/^<\/?[^\s/>]*/
/=\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}/
/=(?!\{)(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|[^\s"'>]+)/
/\{\s*\.{3}\s*[$_a-z][\w$]*(?:\.[$_a-z][\w$]*)*\s*\}/
/^[A-Z]\w*(?:\.[A-Z]\w*)*$/
/\.{3}|[.{}]/
/^=(?=\{)/
/\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/
/\.{3}|:[:=]|\|>|->|=(?:={1,2}|>)?|<=?|>=?|[!#'?\`|~^]|[-*+/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
/'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^\n\r'\\])'/
/\b[A-Z]\w*\b(?!\s*\.)/
/\b[a-z]\w*(?=::)/
/\\(?:x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|u\{[\dA-Fa-f]+\}|c[A-Za-z]|0[0-7]{0,2}|[123][0-7]{2}|.)/
/(?:^|[^\\])(?:\\\\)*\[(?:[^\\\]]|\\[^])*\]/
/\\[$()*+.?[\\\]\^{|}]/
/\.|\\[DSW]|\\P\{[^{}]+\}/i
/[$^]|\\[ABGZbz]/
/(?:[*+?]|\{\d+,?\d*\})[+?]?/
/\\(?![123][0-7]{2})[1-9]/
/\\k<[^'<>]+>/
/\((?:\?(?:<[^'<>]+>|'[^'<>]+'|[:>]|<?[!=]|[Udimnsux]+(?:-[Udimnsux]+)?:?))?/
/\)/
/^\[\^/
/(?:[^-\\]|\\(?:x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|u\{[\dA-Fa-f]+\}|c[A-Za-z]|0[0-7]{0,2}|[123][0-7]{2}|.))-(?:[^-\\]|\\(?:x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|u\{[\dA-Fa-f]+\}|c[A-Za-z]|0[0-7]{0,2}|[123][0-7]{2}|.))/
/\\[DSW]|\\P\{[^{}]+\}/i
/(?:<|')[^'<>]+(?=['>]$)/
/\b(?:BOOL|CHAR|DOUBLE|FLOAT|NULL|SIZE_T|SSIZE_T|STRING|UNICHAR|VOID|INT|INT8|INT16|INT32|INT64|LONG|SHORT|UCHAR|UINT|UINT8|UINT16|UINT32|UINT64|ULONG|USHORT|CLASS|DELEGATE|ENUM|ERRORDOMAIN|INTERFACE|NAMESPACE|STRUCT|BREAK|CONTINUE|DO|FOR|FOREACH|RETURN|WHILE|ELSE|IF|SWITCH|ASSERT|CASE|DEFAULT|ABSTRACT|CONST|DYNAMIC|ENSURES|EXTERN|INLINE|INTERNAL|OVERRIDE|PRIVATE|PROTECTED|PUBLIC|REQUIRES|SIGNAL|STATIC|VIRTUAL|VOLATILE|WEAK|ASYNC|OWNED|UNOWNED|TRY|CATCH|FINALLY|THROW|AS|BASE|CONSTRUCT|DELETE|GET|IN|IS|LOCK|NEW|OUT|PARAMS|REF|SIZEOF|SET|THIS|THROWS|TYPEOF|USING|VALUE|VAR|YIELD)\b/i
/(?:\b0X[\dA-F]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?)(?:F|U?L?)?/i
/\+\+|--|&&|\|\||<<=?|>>=?|=>|->|~|[-!%&*+/<=>|^]=?|\?{1,2}|\.\.\./
/\b[\dA-Z_]+\b/
/@"[^]*?"/
/\/(?:\[(?:[^\n\r\\\]]|\\.)*\]|\\.|[^\n\r/[\\])+\/[imsx]{0,4}(?=\s*(?:$|[\n\r),.;\]}]))/
/[A-Z]+$/i
/^\/|\/$/
/\b[A-Z]\w*(?:\.\w+)*\b(?=(?:\?\s+|\*?\s+\*?)\w+)/
/\[[A-Z]\w*(?:\.\w+)*\b/
/\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*[A-Z]\w*(?:\.\w+)*\b/
/(?:\b(?:class|interface|new|struct|enum)\s+|catch\s+\()[A-Z]\w*(?:\.\w+)*\b/
/^\/[^]+(?=\/[A-Z]*$)/i
/\$(?:\([^)]*\)|[A-Z]\w*)/i
/^\$\(?|\)$/
/[A-Z_]\w*(?=\()/i
/\b(?:insensitive|idle|hover|selected_idle|selected_hover|background|position|alt|xpos|ypos|pos|xanchor|yanchor|anchor|xalign|yalign|align|xcenter|ycenter|xofsset|yoffset|ymaximum|maximum|xmaximum|xminimum|yminimum|minimum|xsize|ysizexysize|xfill|yfill|area|antialias|black_color|bold|caret|color|first_indent|font|size|italic|justify|kerning|language|layout|line_leading|line_overlap_split|line_spacing|min_width|newline_indent|outlines|rest_indent|ruby_style|slow_cps|slow_cps_multiplier|strikethrough|text_align|underline|hyperlink_functions|vertical|hinting|foreground|left_margin|xmargin|top_margin|bottom_margin|ymargin|left_padding|right_padding|xpadding|top_padding|bottom_padding|ypadding|size_group|child|hover_sound|activate_sound|mouse|focus_mask|keyboard_focus|bar_vertical|bar_invert|bar_resizing|left_gutter|right_gutter|top_gutter|bottom_gutter|left_bar|right_bar|top_bar|bottom_bar|thumb|thumb_shadow|thumb_offset|unscrollable|spacing|first_spacing|box_reverse|box_wrap|order_reverse|fit_first|ysize|thumbnail_width|thumbnail_height|help|text_ypos|text_xpos|idle_color|hover_color|selected_idle_color|selected_hover_color|insensitive_color|alpha|insensitive_background|hover_background|zorder|value|width|xadjustment|xanchoraround|xaround|xinitial|xoffset|xzoom|yadjustment|yanchoraround|yaround|yinitial|yzoom|zoom|ground|height|text_style|text_y_fudge|selected_insensitive|has_sound|has_music|has_voice|focus|hovered|image_style|length|minwidth|mousewheel|offset|prefix|radius|range|right_margin|rotate|rotate_pad|developer|screen_width|screen_height|window_title|name|version|windows_icon|default_fullscreen|default_text_cps|default_afm_time|main_menu_music|sample_sound|enter_sound|exit_sound|save_directory|enter_transition|exit_transition|intra_transition|main_game_transition|game_main_transition|end_splash_transition|end_game_transition|after_load_transition|window_show_transition|window_hide_transition|adv_nvl_transition|nvl_adv_transition|enter_yesno_transition|exit_yesno_transition|enter_replay_transition|exit_replay_transition|say_attribute_transition|directory_name|executable_name|include_update|window_icon|modal|google_play_key|google_play_salt|drag_name|drag_handle|draggable|dragged|droppable|dropped|narrator_menu|action|default_afm_enable|version_name|version_tuple|inside|fadeout|fadein|layers|layer_clipping|linear|scrollbars|side_xpos|side_ypos|side_spacing|edgescroll|drag_joined|drag_raise|drop_shadow|drop_shadow_color|subpixel|easein|easeout|time|crop|auto|update|get_installed_packages|can_update|UpdateVersion|Update|overlay_functions|translations|window_left_padding|show_side_image|show_two_window)\b/
/\b(?:label|image|menu|[hv]box|frame|text|imagemap|imagebutton|bar|vbar|screen|textbutton|buttoscreenn|fixed|grid|input|key|mousearea|side|timer|viewport|window|hotspot|hotbar|self|button|drag|draggroup|tag|mm_menu_frame|nvl|block|parallel)\b|\$/
/\b(?:as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|yield|adjustment|alignaround|allow|angle|around|box_layout|cache|changed|child_size|clicked|clipping|corner1|corner2|default|delay|exclude|scope|slow|slow_abortable|slow_done|sound|style_group|substitute|suffix|transform_anchor|transpose|unhovered|config|theme|mm_root|gm_root|rounded_window|build|disabled_text|disabled|widget_selected|widget_text|widget_hover|widget|updater|behind|call|expression|hide|init|jump|onlayer|python|renpy|scene|set|show|transform|play|queue|stop|pause|define|window|repeat|contains|choice|on|function|event|animation|clockwise|counterclockwise|circles|knot|null|None|random|has|add|use|fade|dissolve|style|store|id|voice|center|left|right|less_rounded|music|movie|clear|persistent|ui)\b/
/\b(?:[Tt]rue|[Ff]alse)\b/
/(?:\b(?:0[BO])?(?:\d|0X[\dA-F])[\dA-F]*\.?\d*|\B\.\d+)(?:E[-+]?\d+)?J?/i
/[-%+=]=?|!=|\*{1,2}=?|\/{1,2}=?|<[<=>]?|>[=>]?|[&|~^]|\b(?:or|and|not|with|at)\b/
/(?:^|[^\\])#.+/
/"""[^]+?"""|'''[^]+?'''|"(?:\\.|(?!")[^\n\r\\])*"|'(?:\\.|(?!')[^\n\r\\])*'|^#?(?:(?:[\dA-F]{2}){3}|[\dA-F]{3})$/im
/^\s*\.\. \|[^\s|](?:[^|]*[^\s|])?\| [^:]+::/m
/^\s*\.\. [^:]+::/m
/^\s*\.\.(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m
/(?:\r?\n|\r){2}(?:!{4,}|"{4,}|#{4,}|\\\${4,}|%{4,}|&{4,}|'{4,}|\({4,}|\){4,}|\*{4,}|\+{4,}|,{4,}|-{4,}|\.{4,}|\/{4,}|:{4,}|;{4,}|<{4,}|={4,}|>{4,}|\?{4,}|@{4,}|\[{4,}|\\{4,}|\]{4,}|\^{4,}|_{4,}|\`{4,}|\{{4,}|\|{4,}|\}{4,}|~{4,})(?=(?:\r?\n|\r){2})/
/^\s*:[^\n\r:]+:(?= )/m
/^\s*(?:[-+][\dA-Z]|(?:--|\/)[-\dA-Z]+)(?:[ =](?:[A-Z][-\w]*|<[^<>]+>))?(?:, (?:[-+][\dA-Z]|(?:--|\/)[-\dA-Z]+)(?:[ =](?:[A-Z][-\w]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im
/::(?:\r?\n|\r){2}[\t ]+.+(?:(?:\r?\n|\r)[]Unknown:\\1[].+)*/
/::(?:\r?\n|\r){2}(?:!.*(?:(?:\r?\n|\r)!.*)*|".*(?:(?:\r?\n|\r)".*)*|#.*(?:(?:\r?\n|\r)#.*)*|\$.*(?:(?:\r?\n|\r)\$.*)*|%.*(?:(?:\r?\n|\r)%.*)*|&.*(?:(?:\r?\n|\r)&.*)*|'.*(?:(?:\r?\n|\r)'.*)*|\(.*(?:(?:\r?\n|\r)\(.*)*|\).*(?:(?:\r?\n|\r)\).*)*|\*.*(?:(?:\r?\n|\r)\*.*)*|\+.*(?:(?:\r?\n|\r)\+.*)*|,.*(?:(?:\r?\n|\r),.*)*|-.*(?:(?:\r?\n|\r)-.*)*|\..*(?:(?:\r?\n|\r)\..*)*|\/.*(?:(?:\r?\n|\r)\/.*)*|:.*(?:(?:\r?\n|\r):.*)*|;.*(?:(?:\r?\n|\r);.*)*|<.*(?:(?:\r?\n|\r)<.*)*|=.*(?:(?:\r?\n|\r)=.*)*|>.*(?:(?:\r?\n|\r)>.*)*|\?.*(?:(?:\r?\n|\r)\?.*)*|@.*(?:(?:\r?\n|\r)@.*)*|\[.*(?:(?:\r?\n|\r)\[.*)*|\\.*(?:(?:\r?\n|\r)\\.*)*|\].*(?:(?:\r?\n|\r)\].*)*|\^.*(?:(?:\r?\n|\r)\^.*)*|_.*(?:(?:\r?\n|\r)_.*)*|\`.*(?:(?:\r?\n|\r)\`.*)*|\{.*(?:(?:\r?\n|\r)\{.*)*|\|.*(?:(?:\r?\n|\r)\|.*)*|\}.*(?:(?:\r?\n|\r)\}.*)*|~.*(?:(?:\r?\n|\r)~.*)*)/
/^\s*(?:[-*+\u2022\u2023\u2043]|\(?(?:\d+|[A-Z]|[CDILMVX]+)\)|(?:\d+|[A-Z]|[CDILMVX]+)\.)(?= )/im
/^\s*>>> .+(?:(?:\r?\n|\r).+)*/m
/^\s*(?:\|(?= |$)|(?:-{2,3}|\u2014|\.\.|__)(?= )|\.\.$)/m
/\s*(?:\+[-=]+)+\+(?:\r?\n|\r)(?:[]Unknown:\\1[](?:[+|].+)+[+|](?:\r?\n|\r))+[]Unknown:\\1[](?:\+[-=]+)+\+/
/\s*(?:=+ +)+=+(?:(?:\r?\n|\r)[]Unknown:\\1[].+)+(?:\r?\n|\r)[]Unknown:\\1[](?:=+ +)+=+(?=(?:\r?\n|\r){2}|\s*$)/
/^\s*\.\. \[[^\]]+\]/m
/^\s*\.\. _(?:\`[^\`]+\`|(?:[^:\\]|\\.)+):/m
/::$/
/^(?:!{2,}|"{2,}|#{2,}|\\\${2,}|%{2,}|&{2,}|'{2,}|\({2,}|\){2,}|\*{2,}|\+{2,}|,{2,}|-{2,}|\.{2,}|\/{2,}|:{2,}|;{2,}|<{2,}|={2,}|>{2,}|\?{2,}|@{2,}|\[{2,}|\\{2,}|\]{2,}|\^{2,}|_{2,}|\`{2,}|\{{2,}|\|{2,}|\}{2,}|~{2,})(?:\r?\n|\r).+(?:\r?\n|\r)[]Unknown:\\1[]$/m
/(?:^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)(?:!{2,}|"{2,}|#{2,}|\\\${2,}|%{2,}|&{2,}|'{2,}|\({2,}|\){2,}|\*{2,}|\+{2,}|,{2,}|-{2,}|\.{2,}|\/{2,}|:{2,}|;{2,}|<{2,}|={2,}|>{2,}|\?{2,}|@{2,}|\[{2,}|\\{2,}|\]{2,}|\^{2,}|_{2,}|\`{2,}|\{{2,}|\|{2,}|\}{2,}|~{2,})(?=\r?\n|\r|$)/
/^>>>/
/(?:^|[-\s"'(/:<[{])(?::[^:]+:\`.*?\`|\`.*?\`:[^:]+:|(?:\*\*(?!\s).*?\S\*\*|\*(?!\s).*?\S\*|\`\`(?!\s).*?\S\`\`|\`(?!\s).*?\S\`|\|(?!\s).*?\S\|)(?=[\s!"'),\-./:;?\\\]}]|$))/m
/\[[^\]]+\]_(?=[\s!"'),\-./:;?\\\]}]|$)/
/(?:\b[\dA-Z]+(?:[+.:_][\dA-Z]+)*_{1,2}|\`[^\`]+\`_{1,2}|_\`[^\`]+\`)(?=[\s!"'),\-./:;?\\\]}]|$)/i
/\||(?:\+[-=]+)+\+/
/[-=]+/
/^\|(?:[^\s|]|[^\s|][^|]*[^\s|])\|/
/ +[^:]+::/
/^_|:$/
/^[^\0-\x200-9A-Za-z\x7f-\uffff]+|[^\0-\x200-9A-Za-z\x7f-\uffff]+$/
/[^\0-\x200-9A-Za-z\x7f-\uffff]+$/
/^::/
/^(?:::|!+|"+|#+|\$+|%+|&+|'+|\(+|\)+|\*+|\++|,+|-+|\.+|\/+|:+|;+|<+|=+|>+|\?+|@+|\[+|\\+|\]+|\^+|_+|\`+|\{+|\|+|\}+|~+)/m
/\*{1,2}|\`{1,2}|\|/
/^\[|\]_$/
/^_?\`|\`$|\`?_{1,2}$/
/^\||\|$/
/^\*\*.+(?=\*\*$)/
/^\*.+(?=\*$)/
/^\`\`.+(?=\`\`$)/
/^:[^:]+:|:[^:]+:$/
/^\`.+(?=\`$)/
/^\|.+(?=\|$)/
/^:|:$/
/=>|->|\b(?:class|if|else|switch|case|return|exit|try|catch|finally|raise)\b/
/@|\bSystem\b/
/\b\d{4}-\d{2}-\d{2}\b/
/\b\d{2}:\d{2}:\d{2}\b/
/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/
/\B\`[^\s"#'(),./:;<>[\\\]\`{}]\b/
/:[^\s\d"#'(),./:;<>[\\\]\`{}][^\s"#'(),./:;<>[\\\]\`{}]*/
/[-+]?\b(?:\d+\.\d+|\d+)\b/
/\.{2,3}|[(),./:;<=>[\\\]\`{}]/
/[^\s\d"#'(),./:;<>[\\\]\`{}][^\s"#'(),./:;<>[\\\]\`{}]*/
/(?:^|[^/])\/(?!\/)(?:\[[^\n\r\]]*\]|\\.|[^\n\r/[\\])+\/(?=\s*(?:$|[\n\r),.;}]))/
/[\w\-.]+(?=[\t ]*:)/
/[,.:;={}]/
/(?:^|\s)(?:(?:facet|instance of)(?=[\t ]+[-\w]+[\t ]*\{)|(?:external|import)\b)/
/[-\w]+(?=[\t ]*\{)/
/=[\t ]*[^,;]+/
/\(optional\)/
/\.\*/
/^ ?\*{3}[\t ]*SETTINGS[\t ]*\*{3}(?:.|[\n\r](?!\*{3}))*/im
/^ ?\*{3}[\t ]*VARIABLES[\t ]*\*{3}(?:.|[\n\r](?!\*{3}))*/im
/^ ?\*{3}[\t ]*TEST CASES[\t ]*\*{3}(?:.|[\n\r](?!\*{3}))*/im
/^ ?\*{3}[\t ]*KEYWORDS[\t ]*\*{3}(?:.|[\n\r](?!\*{3}))*/im
/^ ?\*{3}[\t ]*TASKS[\t ]*\*{3}(?:.|[\n\r](?!\*{3}))*/im
/(?:^[\t ]*| {2}|\t)#.*/m
/^ ?\*{3}.+?\*{3}/
/[\n\r] ?Documentation(?: {2}|\t)[\t ]*(?![\t ]|#)(?:.|(?:\r\n?|\n)[\t ]*\.{3})+/
/[\n\r] ?(?!\.{3}|#)(?:\S(?:[\t ]\S)*)+/
/[\n\r](?: {2}|\t)[\t ]*\[[-\w]+\]/
/(?:^|[^\\])(?:\\{2})*[$%&@]\{(?:[^\n\r{}]|\{[^\n\r{}]*\})*\}/
/[\n\r] ?(?!#)(?:\S(?:[\t ]\S)*)+/
/\[Documentation\](?: {2}|\t)[\t ]*(?![\t ]|#)(?:.|(?:\r\n?|\n)[\t ]*\.{3})+/
/[\n\r](?: {2}|\t)[\t ]*(?!\[|\.{3}|#)(?:\S(?:[\t ]\S)*)+/
/^[$%&@]\{|\}$/
/\b[_a-z]\w*(?=\s*(?:::\s*<|\())/
/\b[A-Z_][\dA-Z_]+\b/
/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][-+]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/
/->|\.\.=|\.{1,3}|::|[(),:;[\]{}]/
/[-!%*+/^]=?|=[=>]?|&[&=]?|\|[=|]?|<{1,2}=?|>{1,2}=?|[?@]/
/b?"(?:\\[^]|[^"\\])*"|b?r#*"(?:[^"]|"(?![]Unknown:\\1[]))*"[]Unknown:\\1[]/
/b?'(?:\\(?:x[0-7][\dA-Fa-f]|u\{(?:[\dA-Fa-f]_*){1,6}|.)|[^\t\n\r'\\])'/
/#!?\[(?:[^"[\]]|"(?:\\[^]|[^"\\])*")*\]/
/(?:[(,:=]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/
/'\w+/
/\$\w+:[a-z]+/
/\bfn\s+\w+/
/\b(?:enum|struct|union)\s+\w+/
/\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/
/\b(?:[iu](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/
/\w+!/
/(?:\b[a-z][\d_a-z]*\s*::\s*)*\b[a-z][\d_a-z]*\s*::(?!\s*<)/
/(?:^|[^\\])\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*))*\*\/)*\*\/)*\*\/)*\*\//
/\b(?:crate|mod)\s+[a-z][\d_a-z]*/
/\b(?:crate|self|super)\s*::\s*[a-z][\d_a-z]*\b(?:\s*::(?:\s*[a-z][\d_a-z]*\s*::)*)?/
/\b(?:\d[\dA-F]*X|\d+(?:\.\d+)?(?:E[-+]?\d+)?)\b/i
/\*{1,2}|\|{1,2}|!{1,2}|\xa6{1,2}|<[=>]?|>[<=]?|[-&+/=]|[~\xac^]=?/
/[$%(),.;@[\\\]{}]/
/^\s*(?:(?:DATA)?LINES|CARDS);[^]+?^\s*;/im
/^PROC\s+(?:FED)?SQL(?:\s+[\w=|]+)?;[^]+?(?=^(?:PROC\s+\w+|QUIT|RUN|DATA);|(?![^]))/im
/^PROC\s+GROOVY(?:\s+[\w=|]+)?;[^]+?(?=^(?:PROC\s+\w+|QUIT|RUN|DATA);|(?![^]))/im
/^PROC\s+LUA(?:\s+[\w=|]+)?;[^]+?(?=^(?:PROC\s+\w+|QUIT|RUN|DATA);|(?![^]))/im
/^PROC\s+CAS(?:\s+[\w=|]+)?;[^]+?(?=^(?:PROC\s+\w+|QUIT|DATA);|(?![^]))/im
/^PROC\s+\w+\s+(?!\s)(?:[^"';]|"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))+;/im
/(?:^|\s|=|\()%(?:ABORT|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF|INC|INCLUDE|INDEX|INPUT|KTRIM|LENGTH|LET|LIST|LOCAL|PUT|QKTRIM|QSCAN|QSUBSTR|QSYSFUNC|QUPCASE|RETURN|RUN|SCAN|SUBSTR|SUPERQ|SYMDEL|SYMGLOBL|SYMLOCAL|SYMEXIST|SYSCALL|SYSEVALF|SYSEXEC|SYSFUNC|SYSGET|SYSRPUT|THEN|TO|TSO|UNQUOTE|UNTIL|UPCASE|WHILE|WINDOW)\b/i
/&[A-Z_]\w*/i
/(?:^|\s|=)%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)\(.*?[^%]\)/i
/^%MACRO[^;]+(?=;)/im
/^%MEND[^;]+(?=;)/im
/%_\w+(?=\()/
/\bINPUT\s+[\s\w$&*\-./]+;/i
/^OPTIONS[-\s\w"'()*+/:<=>\\|]*(?=;)/im
/(?:^|\s)(?:ACTION\s+)?(?:ACCESSCONTROL|CDM|AGGREGATION|ASTORE|RULEMINING|AUDIO|AUTOTUNE|BAYESIANNETCLASSIFIER|BIOMEDIMAGE|BOOLRULE|BUILTINS|CARDINALITY|SCCASL|CLUSTERING|COPULA|COUNTREG|DATADISCOVERY|DATAPREPROCESS|DATASCIENCEPILOT|DATASTEP|DECISIONTREE|DEEPLEARN|DEEPNEURAL|VARREDUCE|SIMSYSTEM|DS2|DEDUPLICATION|ECM|ENTITYRES|ESPCLUSTER|EXPLAINMODEL|FACTMAC|FASTKNN|FCMPACT|FEDSQL|FREQTAB|GAM|GLEAM|GRAPHSEMISUPLEARN|GVARCLUSTER|HIDDENMARKOVMODEL|HYPERGROUP|IMAGE|IML|ICA|KERNALPCA|LANGMODEL|LDATOPIC|SPARSEML|MLTOOLS|MIXED|MODELPUBLISHING|MBC|NETWORK|OPTNETWORK|NEURALNET|NONLINEAR|NMF|NONPARAMETRICBAYES|OPTIMIZATION|PANEL|PLS|PERCENTILE|PCA|PHREG|QKB|QLIM|QUANTREG|RECOMMEND|TSRECONCILE|DEEPRNN|REGRESSION|REINFORCEMENTLEARN|ROBUSTPCA|SAMPLING|SPARKEMBEDDEDPROCESS|SEARCH(?:ANALYTICS)?|SENTIMENTANALYSIS|SEQUENCE|CONFIGURATION|SESSION(?:PROP)?|SEVERITY|SIMPLE|SMARTDATA|SANDWICH|SPATIALREG|STABILITYMONITORING|SPC|LOADSTREAMS|SVDATADESCRIPTION|SVM|TABLE|CONDITIONALRANDOMFIELDS|TEXT(?:RULE(?:DEVELOP|SCORE)|MINING|PARSE|TOPIC|UTIL|FILTERS|FREQUENCY)|TSINFO|TIMEDATA|TRANSPOSE|UNITIMESERIES)\.[A-Z]+\b[^;]+/i
/%?\w+(?=\()/
/\b(?:FORMAT|PUT)\b=?[\w$'.]+/i
/\b(?:FORMAT|PUT)\s+[\w']+(?:\s+[\w$.]+)+(?=;)/i
/(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))[bx]/
/(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))(?:dt?|t)/
/"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!')/
/(?:^|\s+)(?:PROC\s+\w+|QUIT|RUN|DATA(?!=))\b/i
/(?:^|\s)=?(?:AFTER|ANALYSIS|AND|ARRAY|BARCHART|BARWIDTH|BEGINGRAPH|BY|CALL|CAS|CBARLINE|CFILL|CLASS(?:LEV)?|CLOSE|COLUMN|COMPUTED?|CONTAINS|CONTINUE|DATA(?==)|DEFINE|DELETE|DESCRIBE|DOCUMENT|DO\s+OVER|DO|DOL|DROP|DUL|END(?:SOURCE|COMP)?|ENTRYTITLE|ELSE|EVAL(?:UATE)?|EXEC(?:UTE)?|EXIT|FILL(?:ATTRS)?|FILE(?:NAME)?|FLIST|FNC|FUNCTION(?:LIST)?|GOTO|GLOBAL|GROUP(?:BY)?|HEADLINE|HEADSKIP|HISTOGRAM|IF|INFILE|KEEP|KEYLABEL|KEYWORD|LABEL|LAYOUT|LEAVE|LEGENDLABEL|LENGTH|LIBNAME|LOADACTIONSET|MERGE|MIDPOINTS|NAME|NOOBS|NOWD|_?NULL_|ODS|OPTIONS|OR|OTHERWISE|OUT(?:PUT)?|OVER(?:LAY)?|PLOT|PUT|PRINT|RAISE|RANEXP|RANNOR|RBREAK|RETAIN|RETURN|SELECT|SET|SESSION|SESSREF|SOURCE|STATGRAPH|SUM|SUMMARIZE|TABLE|TEMP|TERMINATE|THEN\s+DO|THEN|TITLE\d?|TO|VAR|WHEN|WHERE|XAXISOPTS|YAXISOPTS|Y2AXISOPTS)\b/i
/\b(?:EQ|NE|GT|LT|GE|LE|IN|NOT)\b/i
/;/
/%MACRO/i
/%MEND/i
/(?:ACCESSCONTROL|CDM|AGGREGATION|ASTORE|RULEMINING|AUDIO|AUTOTUNE|BAYESIANNETCLASSIFIER|BIOMEDIMAGE|BOOLRULE|BUILTINS|CARDINALITY|SCCASL|CLUSTERING|COPULA|COUNTREG|DATADISCOVERY|DATAPREPROCESS|DATASCIENCEPILOT|DATASTEP|DECISIONTREE|DEEPLEARN|DEEPNEURAL|VARREDUCE|SIMSYSTEM|DS2|DEDUPLICATION|ECM|ENTITYRES|ESPCLUSTER|EXPLAINMODEL|FACTMAC|FASTKNN|FCMPACT|FEDSQL|FREQTAB|GAM|GLEAM|GRAPHSEMISUPLEARN|GVARCLUSTER|HIDDENMARKOVMODEL|HYPERGROUP|IMAGE|IML|ICA|KERNALPCA|LANGMODEL|LDATOPIC|SPARSEML|MLTOOLS|MIXED|MODELPUBLISHING|MBC|NETWORK|OPTNETWORK|NEURALNET|NONLINEAR|NMF|NONPARAMETRICBAYES|OPTIMIZATION|PANEL|PLS|PERCENTILE|PCA|PHREG|QKB|QLIM|QUANTREG|RECOMMEND|TSRECONCILE|DEEPRNN|REGRESSION|REINFORCEMENTLEARN|ROBUSTPCA|SAMPLING|SPARKEMBEDDEDPROCESS|SEARCH(?:ANALYTICS)?|SENTIMENTANALYSIS|SEQUENCE|CONFIGURATION|SESSION(?:PROP)?|SEVERITY|SIMPLE|SMARTDATA|SANDWICH|SPATIALREG|STABILITYMONITORING|SPC|LOADSTREAMS|SVDATADESCRIPTION|SVM|TABLE|CONDITIONALRANDOMFIELDS|TEXT(?:RULE(?:DEVELOP|SCORE)|MINING|PARSE|TOPIC|UTIL|FILTERS|FREQUENCY)|TSINFO|TIMEDATA|TRANSPOSE|UNITIMESERIES)\.[A-Z]+\b/i
/(?:^\s*|;\s*)\*[^;]*;/m
/^(?:FORMAT|PUT)(?==)/i
/^(?:FORMAT|PUT)/i
/^(?:(?:DATA)?LINES|CARDS)/i
/^[\t ]*(?:SELECT|ALTER\s+TABLE|(?:CREATE|DESCRIBE|DROP)\s+(?:INDEX|TABLE(?:\s+CONSTRAINTS)?|VIEW)|CREATE\s+UNIQUE\s+INDEX|INSERT\s+INTO|UPDATE)(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!')|[^"';])+;/im
/(?:^|\s)=?(?:CATNAME|CHECKPOINT EXECUTE_ALWAYS|DM|ENDSAS|FILENAME|FOOTNOTE|%INCLUDE|LIBNAME|%LIST|LOCK|MISSING|OPTIONS|PAGE|RESETLINE|%RUN|SASFILE|SKIP|SYSECHO|TITLE\d?)\b/i
/(?:^|\s)(?:DISCONNECT\s+FROM|EXEC(?:UTE)?|BEGIN|COMMIT|ROLLBACK|RESET|VALIDATE)\b/i
/^[\t ]*SUBMIT(?:\s+(?:LOAD|PARSEONLY|NORUN))?(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!')|[^"'])+?(?=ENDSUBMIT;)/im
/(?:^|\s)(?:SUBMIT(?:\s+(?:LOAD|PARSEONLY|NORUN))?|ENDSUBMIT)\b/i
/(?:^|\s)=?SAVERESULT\s+[^;]+/im
/(?:^|\s)=?(?:DEFAULT|(?:UN)?SET|ON|OUTPUT|UPLOAD)[^;]+/im
/\s*=\s*[.A-Z]+/i
/[A-Z]+/i
/%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)/i
/%["#'(),;<=>~\xac^]/
/^INPUT/i
/ACTION/i
/(?:\w|\$\d)+\.\d?/
/[\w$]+\.\d?/
/^SAVERESULT\s+\S+/i
/^SAVERESULT/i
/^[\t ]*\/[*/].*(?:(?:\r?\n|\r)[]Unknown:\\1[][\t ]+.+)*/m
/^[\t ]*[+=@].+/m
/^[\t ]*\$.+/m
/^[\t ]*(?:[^\s:]+ *:.*|:[^\s:]+.*)/m
/[\t ]*\S(?:,?[^\n\r,]+)*(?:,(?:\r?\n|\r)[]Unknown:\\1[][\t ]+\S(?:,?[^\n\r,]+)*)*/
/@[-\w]+|[+=]/
/[%*+/]|[!=]=|<=?|>=?|\b(?:and|or|not)\b/
/[^\s:]+(?=\s*:)/
/\s+-(?=\s)/
/:[^\s:]+/
/.(?:.*(?:[\n\r]|.$))*/
/^[^\n\r!#$*]+(?=[#$])/m
/[#$](?:[^\n\r"'<\\]|\\.|"(?:\\[^]|\$\([^)]+\)|\`[^\`]+\`|(?!")[^\\])*"|'(?:\\[^]|\$\([^)]+\)|\`[^\`]+\`|(?!')[^\\])*'|<<-?\s*\w+?[\t ]*$[^]*?[\n\r][]Unknown:\\2[]|<<-?\s*(?:"\w+"[\t ]*$[^]*?[\n\r][]Unknown:\\4[]|'\w+'[\t ]*$[^]*?[\n\r][]Unknown:\\4[]))+/m
/^[^\s!#$*/:@\\]+@[^\s!#$*/:@\\]+(?=:|$)/
/:[^]+/
/^[#$]\s*[^]+/
/^[#$]/
/->|\.\.|[=[]/
/[(),:;{}]/
/"(?:[^\n\r"\\]|\\.)*"|'(?:[^\n\r'\\]|\\(?:.|u[\dA-Fa-f]{4}))'/
/L(?:(?:\w+|\`[^\n\r\`]*\`)\/)*(?:[\w$]+|\`[^\n\r\`]*\`)(?=\s*;)/
/(?:^|[^\w\-.])(?:\w+|<[-\w$]+>)(?=\()/
/[\w$]+(?=:)/
/(?:^|[^\w\-.])[pv]\d(?![\w\-.])/
/(?:^|[^\w\-.])(?:true|false)(?![\w\-.])/
/(?:^|[^\w\-./])-?(?:NAN|INFINITY|0X(?:[\dA-F]+(?:\.[\dA-F]*)?|\.[\dA-F]+)(?:P[-+]?[\dA-F]+)?|(?:\d+(?:\.\d*)?|\.\d+)(?:E[-+]?\d+)?)[DFLST]?(?![\w\-.])/i
/:\w+/
/^L/
/[();[][BCDFIJSVZ]+/
/[\w$>]:[BCDFIJSVZ]/
/\.end\s+[-\w]+/
/(?:^|[^\w\-.])\.(?!\d)[-\w]+/
/(?:^|[^\w\-.])(?:abstract|annotation|bridge|constructor|enum|final|interface|private|protected|public|runtime|static|synthetic|system|transient)(?![\w\-.])/
/(?:^L|\/)(?:[\w$]+|\`[^\n\r\`]*\`)$/
/^L(?:(?:\w+|\`[^\n\r\`]*\`)\/)+/
/'(?:''|[^'])*'/
/#[\dA-Z]+|#(?:-|!{1,2}|%{1,2}|&{1,2}|\*{1,2}|\+{1,2}|\/{1,2}|<{1,2}|={1,2}|>{1,2}|\?{1,2}|@{1,2}|\\{1,2}|\|{1,2}|~{1,2})|#(?=\()/i
/\b(?:nil|true|false|self|super|new)\b/
/[<=]=?|:=|~[=~]|\/{1,2}|\\\\|>[=>]?|[-!&*+,@|^]/
/[().:;?[\]{}]/
/\$./
/\[\s*:[^[|]*\|/
/\|[^|]+\|/
/\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/
/\b\d+(?:\.\d+)?(?:e-?\d+)?/
/:[\dA-Z]+/i
/[\dA-Z]+/i
/\{\*[^]*?\*\}/
/\b(?:false|off|on|no|true|yes)\b/
/^\{|\}$/
/\$(?!\d)\w+/
/#(?!\d)\w+#/
/^\/?(?!\d)\w+/
/(?!\d)\w+(?=\()/
/\w+\s*=\s*(?:(?!\d)\w+)?/
/[(),.:[\]\`]|->/
/[-%*+/]|={1,2}=?|[!<>]=?|&&|\|{1,2}/
/\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/
/\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/
/(?:\.|->)(?!\d)\w+/
/\[(?!\d)\w+(?=\])/
/\|\s*@?(?!\d)\w+/
/=\s*(?!\d)\w+/
/\b(?:address|bool|string|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|byte|bytes(?:[1-9]|[12]\d|3[012])?)\b/
/\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\b/
/=>|->|:=|=:|\*\*|\+\+|--|\|\||&&|<<=?|>>=?|[-!%&*+/<=>|^]=?|[?~]/
/\b(?:contract|enum|interface|library|new|struct|using)\s+(?!\d)[\w$]+/
/(?:[<>]=?|\^)\d+\.\d+\.\d+\b/
/\b(?:FALSE|TRUE)\b/
/^[\t ]*(?:[A-Z]\w*\b(?=.*(?:\r\n?|\n)(?:[]Unknown:\\1[][\t ].*(?:\r\n?|\n))*[]Unknown:\\1[]End[]Unknown:\\2[][\t ]*$)|End[A-Z]\w*(?=[\t ]*$))/m
/^[\t ]*[^\n\r"#()=]*[^\s"#()=](?=\s*=)/m
/\{[\dA-F]{8}-[\dA-F]{4}-[\dA-F]{4}-[\dA-F]{4}-[\dA-F]{12}\}/i
/\b\d+(?:\.\d+)?(?:[Ee][-+]?\d+)?\b|\b0x[\dA-F]+\b/
/\?:?|<=?|>=?|={1,2}|!=|[-%*+/]|\b(?:and|not|or)\b/
/[(),.:[\]{|}]/
/\{+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+\.?[\w.]+/
/\{+\/?\s*@?param\??\s+\.?[\w.]+/
/\b(?:any|as|attributes|bool|css|float|in|int|js|html|list|map|null|number|string|uri)\b/
/^\{+\/?|\/?\}+$/
/\$[A-Z_]\w*(?:\??(?:\.\w+|\[[^\]]+\]))*/i
/\s\/\/.*/
/\{+\/?[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/
/[.?[\]]/
/\|[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*\w+/
/[-+]?\b\d+\.?\d*(?:E[-+]?\d+)?/i
/[(),.;[\]{}]|\^\^/
/"""(?:(?:"{1,2})?(?:[^"\\]|\\.))*"""|'''(?:(?:'{1,2})?(?:[^'\\]|\\.))*'''/
/"(?:[^\n\r"\\]|\\.)*"|'(?:[^\n\r'\\]|\\.)*'/
/<(?:[^\0-\x20"<>\\\\\`{|}^]|\\(?:u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8}))*>/
/(?:(?![\d\-.\xb7])[\w\-.\xb5\xb7\xc0-\ufffd]+)?:(?:(?![\-.])(?:[\w\-.:\xb5\xc0-\ufffd]|%[\dA-F]{2}|\\.)+)?/i
/(?:\ba|@prefix|@base)\b|=/
/\b(?:GRAPH|BASE|PREFIX)\b/i
/@[A-Z]+(?:-[\dA-Z]+)*/i
/\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\b/i
/\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|ISBLANK|ISIRI|ISLITERAL|ISNUMERIC|ISURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|ROUND|REGEX|REPLACE|SAMETERM|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\b(?=\s*\()/i
/\b(?:GRAPH|BASE|PREFIX)\b/i
/[$?]\w+/
/@/
/[^:]*:[^]+/
/\`comment\("(?:\\.|[^"\\])*"\)\`/
/\b(?:ABSTRACT|ACCUM|ADDCOLTOTALS|ADDINFO|ADDTOTALS|ANALYZEFIELDS|ANOMALIES|ANOMALOUSVALUE|ANOMALYDETECTION|APPEND|APPENDCOLS|APPENDCSV|APPENDLOOKUP|APPENDPIPE|ARULES|ASSOCIATE|AUDIT|AUTOREGRESS|BIN|BUCKET|BUCKETDIR|CHART|CLUSTER|COFILTER|COLLECT|CONCURRENCY|CONTINGENCY|CONVERT|CORRELATE|DATAMODEL|DBINSPECT|DEDUP|DELETE|DELTA|DIFF|EREX|EVAL|EVENTCOUNT|EVENTSTATS|EXTRACT|FIELDFORMAT|FIELDS|FIELDSUMMARY|FILLDOWN|FILLNULL|FINDTYPES|FOLDERIZE|FOREACH|FORMAT|FROM|GAUGE|GENTIMES|GEOM|GEOMFILTER|GEOSTATS|HEAD|HIGHLIGHT|HISTORY|ICONIFY|INPUT|INPUTCSV|INPUTLOOKUP|IPLOCATION|JOIN|KMEANS|KV|KVFORM|LOADJOB|LOCALIZE|LOCALOP|LOOKUP|MAKECONTINUOUS|MAKEMV|MAKERESULTS|MAP|MCOLLECT|METADATA|METASEARCH|MEVENTCOLLECT|MSTATS|MULTIKV|MULTISEARCH|MVCOMBINE|MVEXPAND|NOMV|OUTLIER|OUTPUTCSV|OUTPUTLOOKUP|OUTPUTTEXT|OVERLAP|PIVOT|PREDICT|RANGEMAP|RARE|REGEX|RELEVANCY|RELTIME|RENAME|REPLACE|REST|RETURN|REVERSE|REX|RTORDER|RUN|SAVEDSEARCH|SCRIPT|SCRUB|SEARCH|SEARCHTXN|SELFJOIN|SENDEMAIL|SET|SETFIELDS|SICHART|SIRARE|SISTATS|SITIMECHART|SITOP|SORT|SPATH|STATS|STRCAT|STREAMSTATS|TABLE|TAGS|TAIL|TIMECHART|TIMEWRAP|TOP|TRANSACTION|TRANSPOSE|TRENDLINE|TSCOLLECT|TSTATS|TYPEAHEAD|TYPELEARNER|TYPER|UNION|UNIQ|UNTABLE|WHERE|X11|XMLKV|XMLUNESCAPE|XPATH|XYSERIES)\b/i
/\w+(?=\s*=(?!=))/
/\b(?:F|FALSE|T|TRUE)\b/i
/[<=>]=?|[-%*+/|]/
/[(),[\]]/
/"(?:\\.|[^"\\])*"/
/\b(?:AND|AS|BY|NOT|OR|XOR)\b/i
/\b\d{1,2}\/\d{1,2}\/\d{1,4}(?:(?::\d{1,2}){3})?\b/
/\b(?:BREAKOUT|BREAKTO|CALL|CASE|CATCH|DEFAULT|DO|ECHO|ELSE|EXECVM|EXECFSM|EXITWITH|FOR|FOREACH|FOREACHMEMBER|FOREACHMEMBERAGENT|FOREACHMEMBERTEAM|FROM|GOTO|IF|NIL|PREPROCESSFILE|PREPROCESSFILELINENUMBERS|PRIVATE|SCOPENAME|SPAWN|STEP|SWITCH|THEN|THROW|TO|TRY|WHILE|WITH)\b/i
TooManyNodesError
/(?:\$|\b0X)[\dA-F]+\b|(?:\B\.\d+|\b\d+(?:\.\d+)?)(?:E[-+]?\d+)?\b/i
/##|>>|&&|\|\||[!<=>]=?|[-#%*+/^]|\b(?:AND|MOD|NOT|OR)\b/i
/\bDIK(?:_[\dA-Z]+)+\b/i
/^\s*#[A-Z]+(?:[^\n\r\\]|\\(?:\r\n|[^]))*/im
/"(?:(?:"")?[^"])*"(?!")|'[^']*'/
/\b(?:_EXCEPTION|_FNC_SCRIPTNAME|_FNC_SCRIPTNAMEPARENT|_FOREACHINDEX|_THIS|_THISEVENTHANDLER|_THISFSM|_THISSCRIPT|_X|THIS|THISLIST|THISTRIGGER)\b/i
/#[A-Z]+\b/i
/\b(?:END_)?(?:PROGRAM|CONFIGURATION|INTERFACE|FUNCTION_BLOCK|FUNCTION|ACTION|TRANSITION|TYPE|STRUCT|(?:INITIAL_)?STEP|NAMESPACE|LIBRARY|CHANNEL|FOLDER|RESOURCE|VAR_(?:GLOBAL|INPUT|PUTPUT|IN_OUT|ACCESS|TEMP|EXTERNAL|CONFIG)|VAR|METHOD|PROPERTY)\b/i
/\b(?:(?:END_)?(?:IF|WHILE|REPEAT|CASE|FOR)|ELSE|FROM|THEN|ELSIF|DO|TO|BY|PRIVATE|PUBLIC|PROTECTED|CONSTANT|RETURN|EXIT|CONTINUE|GOTO|JMP|AT|RETAIN|NON_RETAIN|TASK|WITH|UNTIL|USING|EXTENDS|IMPLEMENTS|GET|SET|__TRY|__CATCH|__FINALLY|__ENDTRY)\b/
/\b(?:AT|BOOL|BYTE|(?:D|L)?WORD|U?(?:S|D|L)?INT|L?REAL|TIME(?:_OF_DAY)?|TOD|DT|DATE(?:_AND_TIME)?|STRING|ARRAY|ANY|POINTER)\b/
/%[IMQ][BDLWX][\d.]*|%[IQ][\d.]*/
/\b(?:16#[\dA-F]+|2#[01_]+|0X[\dA-F]+)\b|\b(?:T|D|DT|TOD)#[\d:DHMS_]*|\b[A-Z]*#[\d,._]*|(?:\b\d+\.?\d*|\B\.\d+)(?:E[-+]?\d+)?/i
/\b(?:TRUE|FALSE|NULL)\b/
/S?R?:?=>?|&{1,2}|\*{1,2}|<=?|>=?|[-+/:^]|\b(?:OR|AND|MOD|NOT|XOR|LE|GE|EQ|NE|GE|LT)\b/
/[();]/
/(?:^|[^\\])(?:\/\*[^]*?(?:\*\/|$)|\(\*[^]*?(?:\*\)|$)|\{[^]*?(?:\}|$))/
/\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/
/\b(?:[\d_]+(?:\.[\dE_]+)?|0X[\dA-F_]+(?:\.[\dA-FP_]+)?|0B[01_]+|0O[0-7_]+)\b/i
/\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Z_a-z]+)\b/
/@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/
/\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
/"(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[^])|(?!")[^\n\r\\])*"|'(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[^])|(?!')[^\n\r\\])*'/
/\\\((?:[^()]|\([^)]+\))+\)/
/<#[^]+?#>/
/<#@[^]*?#>/
/<#=[^]*?#>/
/<#\+[^]*?#>/
/<#[^]*?#>/
/^<#@|#>$/
/^<#=|#>$/
/^<#\+|#>$/
/^<#|#>$/
/\w+(?=\s)/
/=(?:"(?:\\[^]|(?!")[^\\])*"|'(?:\\[^]|(?!')[^\\])*'|[^\s"'=>]+)/
/^=|^["']|["']$/
/(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|(?<!\w)(?=\w)|(?<=\w)(?!\w))/i
/(?:^|[^:\\])'.*/
/!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?/i
/[&*][^\s,[\]{}]+/
/---|[-,:>?[\]{|}]|\.\.\./
/not ok[^\n\r#{]*/
/ok[^\n\r#{]*/
/pragma [-+][a-z]+/
/BAIL OUT!.*/i
/TAP VERSION \d+/i
/\d+\.\.\d+(?: +#.*)?/
/[-:]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?[>|][\t ]*(?:\r?\n|\r)[\t ]+[^\n\r]+(?:[]Unknown:\\2[][^\n\r]+)*/i
/(?:^|[-\n\r,:?[{])[\t ]*(?:(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?[^\s#,[\]{}]+?(?=\s*:\s)/i
/^[\t ]*%.+/m
/[-,:[{]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Za-z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Za-z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?(?:\d{4}-\d{1,2}-\d{1,2}(?:[Tt]|[\t ]+)\d{1,2}:\d{2}:\d{2}(?:\.\d*)?[\t ]*(?:Z|[-+]\d{1,2}(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d{1,2}:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[\t ]*(?:$|,|\]|\}|\s*#))/m
/[-,:[{]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?(?:TRUE|FALSE)(?=[\t ]*(?:$|,|\]|\}|\s*#))/im
/[-,:[{]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?(?:NULL|~)(?=[\t ]*(?:$|,|\]|\}|\s*#))/im
/[-,:[{]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?(?:"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*')(?=[\t ]*(?:$|,|\]|\}|\s*#))/im
/[-,:[{]\s*(?:\s(?:!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?(?:[\t ]+[&*][^\s,[\]{}]+)?|[&*][^\s,[\]{}]+(?:[\t ]+!(?:<[\w!\x23-\x2f:;=?@[\]~]+>|(?:[-\dA-Z]*!)?[\w\x23-\x2b\-./:;=?@~]+)?)?)[\t ]+)?[-+]?(?:0X[\dA-F]+|0O[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:E[-+]?\d+)?|\.INF|\.NAN)(?=[\t ]*(?:$|,|\]|\}|\s*#))/im
/# Subtest(?:: .*)?/
/^[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*---(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*\.\.\.$/m
/!=?|\*{1,2}|==|&{1,2}|\|{1,2}|<[<=]?|>[=>]?|[-%+/?~^]|\b(?:eq|ne|in|ni)\b/
/[()[\]{}]/
/"(?:[^\n\r"\\]|\\(?:\r\n|[^]))*"/
/^\s*proc[\t ]+\S+/m
/\b(?:elseif|else)\b/
/^\s*(?:global|upvar|variable)\b/m
/(?:^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|Safe_Base|scan|seek|set|socket|source|split|string|subst|Tcl|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|wordBreak(?:After|Before)|test|vars)|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m
/\$(?:::)?(?:[\dA-Z]+::)*\w+/i
/\$\{[^}]+\}/
/^\s*set[\t ]+(?:::)?(?:[\dA-Za-z]+::)*\w+/m
/^\s*(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|continue)\b/m
/#.*|\[%#[^]*?%\]/
/\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|TAGS|THROW|TRY|SWITCH|UNLESS|USE|WHILE|WRAPPER)\b/
/=[=>]?|!=?|<=?|>=?|&&|\|{1,2}|\b(?:and|or|not)\b/
/[(),[\]{}]/
/'[^'\\]*(?:\\[^][^'\\]*)*'/
/"[^"\\]*(?:\\[^][^"\\]*)*"/
/^(?:\[%|%%)-?|-?%\]$/
/\b[A-Z]\w*(?:\s*\.\s*(?:\d+|\$?[A-Z]\w*))*\b/i
/\$[A-Z]\w*(?:\.(?:\d+|\$?[A-Z]\w*))*/i
/\b0(?:x[\dA-Za-z]+(?:_[\dA-Za-z]+)*|o[0-7]+(?:_[0-7]+)*|b[01]+(?:_[01]+)*)\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[Ee][-+]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/
/[,.=[\]{}]/
/^\s*\[\s*(?:\[\s*)?(?:[-\w]+|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*")(?:\s*\.\s*(?:[-\w]+|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*"))*(?=\s*\])/m
/(?:^\s*|[,{]\s*)(?:[-\w]+|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*")(?:\s*\.\s*(?:[-\w]+|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*"))*(?=\s*=)/m
/"""(?:\\[^]|[^\\])*?"""|'''[^]*?'''|'[^\n\r']*'|"(?:\\.|[^\n\r"\\])*"/
/\b\d{4}-\d{2}-\d{2}(?:[\sT]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[-+]\d{2}:\d{2})?)?\b/i
/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/
/\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|classgroup|client|coerce|collapsecategories|config|const|continue|default|defaultproperties|delegate|dependson|deprecated|do|dontcollapsecategories|editconst|editinlinenew|else|enum|event|exec|export|extends|final|float|for|forcescriptorder|foreach|function|goto|guid|hidecategories|hidedropdown|if|ignores|implements|inherits|input|int|interface|iterator|latent|local|material|name|native|nativereplication|noexport|nontransient|noteditinlinenew|notplaceable|operator|optional|out|pawn|perobjectconfig|perobjectlocalized|placeable|postoperator|preoperator|private|protected|reliable|replication|return|server|showcategories|simulated|singular|state|static|string|struct|structdefault|structdefaultproperties|switch|texture|transient|travel|unreliable|until|var|vector|while|within)\b/
/>>|<<|--|\+\+|\*\*|[-!$*+/<=>@~]=?|&{1,2}|\|{1,2}|\^{1,2}|[%:?]|\b(?:Cross|Dot|ClockwiseFrom)\b/
/[(),.;[\]{}]/
/\b(?:(?:autoexpand|hide|show)categories|var)\s*\([^()]+(?=\))/
/\w\s*<\s*\w+\s*=[^\n\r<=>|]+(?:\|\s*\w+\s*=[^\n\r<=>|]+)*>/
/\b(?:class|enum|extends|interface|state(?:\(\))?|struct|within)\s+\w+/
/\w+(?=\s*=)/
/[<>|]/
/(?:^|[^\\])#\[\[[^]*?\]\]#/
/(?:^|[^\\](?:\\\\)*)#@?(?:[A-Z][-\w]*|\{[A-Z][-\w]*\})(?:\s*\((?:[^()]|\([^()]*\))*\))?/i
/(?:^|[^\\](?:\\\\)*)\$!?(?:[A-Z][-\w]*(?:\([^)]*\))?(?:\.[A-Z][-\w]*(?:\([^)]*\))?|\[[^\]]+\])*|\{[^}]+\})/i
/^#\[\[|\]\]#$/
/(?:^|[^\\])#\*[^]*?\*#/
/(?:^|[^\\])##.*/
/[(),.:[\]{}]/
/^#@?(?:[a-z][-\w]*|\{[a-z][-\w]*\})|\bin\b/
/[!<=>]=?|[-%*+/]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/
/[^-\w][a-z][-\w]*(?=\()/
/\B\$\w+\b/
/\B\`\w+\b/
/\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/
/\b(?:always_latch|always_comb|always_ff|always)\b ?@?/
/\B#{1,2}\d+|(?:\b\d+)?'[BDHO] ?[\d?A-FXZ_]+|\b\d*[._]?\d+(?:E[-+]?\d+)?/i
/[-!%&*+/<=>?{|}~^]+/
/[(),.:;[\]]/
/"(?:\\(?:\r\n|[^])|[^\n\r"\\])*"/
/"(?:[^\n\r"\\]|\\(?:\r\n|[^]))*"/
/\b(?:USE|LIBRARY)\b/i
/\b(?:'ACTIVE|'ASCENDING|'BASE|'DELAYED|'DRIVING|'DRIVING_VALUE|'EVENT|'HIGH|'IMAGE|'INSTANCE_NAME|'LAST_ACTIVE|'LAST_EVENT|'LAST_VALUE|'LEFT|'LEFTOF|'LENGTH|'LOW|'PATH_NAME|'POS|'PRED|'QUIET|'RANGE|'REVERSE_RANGE|'RIGHT|'RIGHTOF|'SIMPLE_NAME|'STABLE|'SUCC|'TRANSACTION|'VAL|'VALUE|ACCESS|AFTER|ALIAS|ALL|ARCHITECTURE|ARRAY|ASSERT|ATTRIBUTE|BEGIN|BLOCK|BODY|BUFFER|BUS|CASE|COMPONENT|CONFIGURATION|CONSTANT|DISCONNECT|DOWNTO|ELSE|ELSIF|END|ENTITY|EXIT|FILE|FOR|FUNCTION|GENERATE|GENERIC|GROUP|GUARDED|IF|IMPURE|IN|INERTIAL|INOUT|IS|LABEL|LIBRARY|LINKAGE|LITERAL|LOOP|MAP|NEW|NEXT|NULL|OF|ON|OPEN|OTHERS|OUT|PACKAGE|PORT|POSTPONED|PROCEDURE|PROCESS|PURE|RANGE|RECORD|REGISTER|REJECT|REPORT|RETURN|SELECT|SEVERITY|SHARED|SIGNAL|SUBTYPE|THEN|TO|TRANSPORT|TYPE|UNAFFECTED|UNITS|UNTIL|USE|VARIABLE|WAIT|WHEN|WHILE|WITH)\b/i
/'[-01HLUWXZ]'|\b(?:\d+#[\d.A-F_]+#|\d[\d._]*)(?:E[-+]?\d+)?/i
/[<>]=?|:=|[-&*+/=]|\b(?:ABS|NOT|MOD|REM|SLL|SRL|SLA|SRA|ROL|ROR|AND|OR|NAND|XNOR|XOR|NOR)\b/i
/\b[BOX]"[\dA-F_]+"|"[-01HLUWXZ]+"/i
/"\S+?"(?=\()/
/"(?:[^\n\r"\\]|\\.)*"|'(?:[^\n\r']|'')*'/
/".*/
/\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/
/\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/
/\b(?:0X[\dA-F]+|\d+(?:\.\d+)?)\b/i
/\|\||&&|[+\-.]=?|[!=](?:[=~][#?]?)?|[<>]=?[#?]?|[%*/?]|\bis(?:not)?\b/
/[(),:;[\]{}]/
/(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[-+]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[DFR])?/i
/\b(?:TRUE|FALSE|NOTHING)\b/i
/\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND(?:ALSO)?|AS|BOOLEAN|BYREF|BYTE|BYVAL|CALL|CASE|CATCH|C(?:BOOL|BYTE|CHAR|DATE|DBL|DEC|INT|LNG|OBJ|SBYTE|SHORT|SNG|STR|TYPE|UINT|ULNG|USHORT)|CHAR|CLASS|CONST|CONTINUE|CURRENCY|DATE|DECIMAL|DECLARE|DEFAULT|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|EACH|ELSE(?:IF)?|END(?:IF)?|ENUM|ERASE|ERROR|EVENT|EXIT|FINALLY|FOR|FRIEND|FUNCTION|GET(?:TYPE|XMLNAMESPACE)?|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INTEGER|INTERFACE|IS|ISNOT|LET|LIB|LIKE|LONG|LOOP|ME|MOD|MODULE|MUST(?:INHERIT|OVERRIDE)|MY(?:BASE|CLASS)|NAMESPACE|NARROWING|NEW|NEXT|NOT(?:INHERITABLE|OVERRIDABLE)?|OBJECT|OF|ON|OPERATOR|OPTION(?:AL)?|OR(?:ELSE)?|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|PRIVATE|PROPERTY|PROTECTED|PUBLIC|RAISEEVENT|READONLY|REDIM|REMOVEHANDLER|RESUME|RETURN|SBYTE|SELECT|SET|SHADOWS|SHARED|SHORT|SINGLE|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|THEN|THROW|TO|TRY|TRYCAST|TYPE|TYPEOF|U(?:INTEGER|LONG|SHORT)|USING|VARIANT|WEND|WHEN|WHILE|WIDENING|WITH(?:EVENTS)?|WRITEONLY|UNTIL|XOR)\b/i
/[(),.:?{}]/
/(?:['\u2018\u2019]|REM\b)(?:[^\n\r_]|_(?:\r\n?|\n)?)*/i
/#(?:CONST|ELSE|ELSEIF|END|EXTERNALCHECKSUM|EXTERNALSOURCE|IF|REGION)(?:[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]_[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:\r\n?|\n)|.)+/i
/\$?["\u201c\u201d](?:["\u201c\u201d]{2}|[^"\u201c\u201d])*["\u201c\u201d]C?/i
/#[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:\d+(?:-\d+-|\/\d+\/)\d+(?:[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+(?:\d+[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:AM|PM))?))?|\d+[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*(?:AM|PM))?)[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*#/i
/[-!#$%&*+/<=>@\\^]/
/[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]_(?=[\t\x0b\f \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*[\n\r])/
/#.*|\/\/.*|\/\*[^]*?\*\//
/\$\S+/
/\b(?:BREAK|CHECKMACRO|CONTINUE|CUDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFT|IFTE|MSGFAIL|NRETURN|RETHROW|RETURN|SWITCH|TRY|UDF|UNTIL|WHILE)\b/
/[-+]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][-+]?\d+)?|0x[\dA-Fa-f]+|0b[01]+)\b/
/\b(?:false|true|F|T)\b/
/<%|%>|[()[\]{}]/
/==|&{1,2}|\|{1,2}|\*{1,2}|>{2,3}|<<|==|[!<>~]=?|[-%/^]|\+!?|\b(?:AND|NOT|OR)\b/
/"(?:[^\n\r"\\]|\\.)*"|'(?:[^\n\r'\\]|\\.)*'|<'(?:[^'\\]|'(?!>)|\\.)*'>/
/@\S+/
/\$[\w!#$%&'*+\-./:<=>?@\\\\\`|~^]+/
/[-+]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[Ee][-+]?\d(?:_?\d)*)?|0x[\dA-Fa-f](?:_?[\dA-Fa-f])*(?:\.[\dA-Fa-f](?:_?[\dA-Da-f])*)?(?:[Pp][-+]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\dA-Fa-f](?:_?[\dA-Da-f])*)?\b/
/\(;[^]*?;\)/
/"(?:\\[^]|[^"\\])*"/
/\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
/;;.*/
/\b(?:align|offset)=/
/\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/
/^(?:\{\||\|\}|\|-|[!#*:;|])|\|\||!!/m
/<(?:NOWIKI\b[^]*?>[^]*?<\/NOWIKI|PRE\b[^]*?>[^]*?<\/PRE|SOURCE\b[^]*?>[^]*?<\/SOURCE)>/i
/^=+.+?[]Unknown:\\1[]/m
/'''''.+?'''''|''''.+?''''|'''.+?'''|''.+?''/
/^-{4,}/m
/ISBN +(?:97[89][- ]?)?(?:\d[- ]?){9}[\dX]\b|(?:RFC|PMID) +\d+/i
/\[\[.+?\]\]|\[.+?\]/
/__[A-Z]+__/
/\{{3}.+?\}{3}/
/^#REDIRECT/im
/~{3,5}/
/(?:^|[!|])[!|][^\n\r|]+\|(?!\|)/m
/^=+|=+$/
/^'{2,}|'{2,}$/
/<(?:NOWIKI|PRE|SOURCE)\b[^]*?>|<\/(?:NOWIKI|PRE|SOURCE)>/i
/'''''.+?(?=''''')/
/'''[^'](?:.*?[^'])?(?=''')/
/''[^'](?:.*?[^'])?(?='')/
/\$(?:DomainContents|PageRenderDuration)\$/
/\$@?(?:#+|[-*+=~^])?[\w.]+\$/
/\$F:[\w\-.]+\?[\w\-.]+(?:,(?:\|?(?:[#*+\-.~^]*[\w+][^$]*|=\S[^$]*|@[-#]*\w+.[\w+.]+)?)*)?\$/
/\$XF:\{[\w\-.]+\?[\w\-.]+(?:,(?:\|?(?:[#*+\-.~^]*[\w+][^$]*|=\S[^$]*|@[-#]*\w+.[\w+.]+)?)*)?\}:XF\$/
/\$\w(?:#\d+\+?)?(?:\[[\w\-.]+\])?:[\w\-./]+\$/
/\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[\w\-.]+\])?:[\w\-.]+:\{(?:![A-Z]+)?/
/\}:[\w\-.]+:\{/
/\}:[\w\-.]+\$/
/\$/
/[$.]/
/#+|[-*+=@~^]/
/[,|]@?(?:#+|[-*+=~^])?[\w.]+/
/\$\w:|[$,.:?|]/
/[$,.:?{|}]/
/\$(?:\w:|C(?:\[|#\d))?|[:[\]{]/
/![A-Z]+$/
/[:{}]/
/[$:{}]/
/[,.|]/
/#\d/
/!/
/\/\/\/.*/
/'''.*/
/#(?:IF|ELSE|ELSEIF|ENDIF|PRAGMA)\b/i
/\b(?:ADDHANDLER|APP|ARRAY|AS(?:SIGNS)?|BY(?:REF|VAL)|BREAK|CALL|CASE|CATCH|CONST|CONTINUE|CURRENTMETHODNAME|DECLARE|DIM|DO(?:WNTO)?|EACH|ELSE(?:IF)?|END|EXIT|EXTENDS|FALSE|FINALLY|FOR|GLOBAL|IF|IN|LIB|LOOP|ME|NEXT|NIL|OPTIONAL|PARAMARRAY|RAISE(?:EVENT)?|REDIM|REM|REMOVEHANDLER|RETURN|SELECT|SELF|SOFT|STATIC|STEP|SUPER|THEN|TO|TRUE|TRY|UBOUND|UNTIL|USING|WEND|WHILE)\b/i
/<[=>]?|>=?|[-*+/=\\^]|\b(?:ADDRESSOF|AND|CTYPE|ISA?|MOD|NEW|NOT|OR|XOR|WEAKADDRESSOF)\b/i
/[(),.:;]/
/(?:'|\/\/|REM\b).+/i
/&[BCHOU][\dA-Z]+/i
/^REM/i
/\$[-\w:]+/
/[-\w]+(?::[-\w]+)*(?=\s*\()/
/\b\d+(?:\.\d+)?(?:E[-+]?\d+)?/
/[(),/:;[\]{}]/
/<\/?(?!\d)[^\s$%/<=>]+(?:\s+[^\s/=>]+(?:=(?:"(?:\\[^]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!")[^\\])*"|'(?:\\[^]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!')[^\\])*'|[^\s"'=>]+))?)*\s*\/?>/
/\(:[^]*?:\)/
/"(?:""|(?!")[^])*"|'(?:''|(?!')[^])*'/
/\(#.+?#\)/
/(?:^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/
/(?:^|[^-:])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^-:])/
/(?:^|[^-:])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^-:])/
/element\s+[-\w]+(?::[-\w]+)*/
/attribute\s+[-\w]+(?::[-\w]+)*/
/(?:^|[^-:])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|ENTITIES|ENTITY|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|ID|IDREFS?|int|integer|language|long|Name|NCName|negativeInteger|NMTOKENS?|nonNegativeInteger|nonPositiveInteger|normalizedString|NOTATION|positiveInteger|QName|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^-:])/
/[*+=?@|]|\.{1,2}|:=|!=|<[<=]?|>[=>]?/
/\s-(?=\s)/
/=(?:"(?:\\[^]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!")[^\\])*"|'(?:\\[^]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!')[^\\])*'|[^\s"'=>]+)/
/^="|"$/
/\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}/
/\/\*[^]*?\*\/|\/\/.*/
/[:;{}]/
/"(?:[^"\\]|\\.)*"|'[^']*'/
/(?:^|[\n\r;{}][\t ]*)[A-Z_][\w\-.]*/i
/\s[A-Z_][\w\-.]*(?=:)/i
/\B@(?!\d)\w+(?=\s*\()/
/\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)\b/
/\b(?!\d)\w+(?=\s*\()/
/\b(?:0b[01]+|0o[0-7]+|0x[\dA-Fa-f]+\.?[\dA-Fa-f]*(?:[Pp][-+]?[\dA-Fa-f]+)?|\d+\.?\d*(?:[Ee][-+]?\d+)?)\b/
/\.[*?]|\.{2,3}|[-=]>|\*\*|\+\+|\|\||(?:<<|>>|[-*+]%|[-!%&*+/<=>|^])=?|[?~]/
/[(),.:;[\]{}]/
/\/{2}.*/
/\b(?:break|continue)\s*:\s*\w+\b|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while(?:(?<!\w)\w|(?<=\w)(?!\w))))/
/\b(?!\d)\w+(?=\s*=\s*(?:(?:extern|packed)\s+)?(?:enum|struct|union)\s*[({])/
/\b(?:anyerror|bool|c_u?(?:short|int|long|longlong)|c_longdouble|c_void|comptime_(?:float|int)|[iu](?:8|16|32|64|128|size)|f(?:16|32|64|128)|noreturn|type|void)\b/
/\/{3}.*/
/(?:^|[^@\\])c?"(?:[^\n\r"\\]|\\.)*"/
/[\n\r][\t ]+c?\\{2}.*(?:(?:\r\n?|\n)[]Unknown:\\2[].*)*/
/(?:^|[^\\])'(?:[^\n\r'\\]|\\(?:.|x[\dA-Fa-f]{2}|u\{[\dA-Fa-f]{1,6}\}))'/
/:\s*(?!\s)(?:!?\s*(?:(?:\?|\bpromise->|(?:\[[^[\]]*\]|\*(?!\*)|\*\*)(?:\s*align\s*\((?:[^()]|\([^()]*\))*\)|\s*const\b|\s*volatile\b|\s*allowzero\b)*)\s*)*(?:\bpromise\b|(?:\berror\.)?\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b(?:\.\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b)*(?!\s+\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+(?:(?<!\w)\w|(?<=\w)(?!\w)))))+(?=\s*(?:align\s*\((?:[^()]|\([^()]*\))*\)\s*)?[),;=])|(?!\s)(?:!?\s*(?:(?:\?|\bpromise->|(?:\[[^[\]]*\]|\*(?!\*)|\*\*)(?:\s*align\s*\((?:[^()]|\([^()]*\))*\)|\s*const\b|\s*volatile\b|\s*allowzero\b)*)\s*)*(?:\bpromise\b|(?:\berror\.)?\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b(?:\.\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b)*(?!\s+\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+(?:(?<!\w)\w|(?<=\w)(?!\w)))))+(?=\s*(?:align\s*\((?:[^()]|\([^()]*\))*\)\s*)?\{)/
/\)\s*(?!\s)(?:!?\s*(?:(?:\?|\bpromise->|(?:\[[^[\]]*\]|\*(?!\*)|\*\*)(?:\s*align\s*\((?:[^()]|\([^()]*\))*\)|\s*const\b|\s*volatile\b|\s*allowzero\b)*)\s*)*(?:\bpromise\b|(?:\berror\.)?\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b(?:\.\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+\b)*(?!\s+\b(?!\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)(?:(?<!\w)\w|(?<=\w)(?!\w)))(?!\d)\w+(?:(?<!\w)\w|(?<=\w)(?!\w)))))+(?=\s*(?:align\s*\((?:[^()]|\([^()]*\))*\)\s*)?;)/
`;
