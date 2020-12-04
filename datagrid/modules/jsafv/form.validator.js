//################################################################################
//##              -= YOU MAY NOT REMOVE OR CHANGE THIS NOTICE =-                 #
//## --------------------------------------------------------------------------- #
//##  JS Auto Form Validator Basic version 3.3.3 (10.01.2014)                    #
//##  Developed by:  ApPHP <info@apphp.com>                                      #
//##  License:       GNU LGPL v.3                                                #
//##  Site:          https://www.apphp.com/js-formvalidator/                     #
//##  Copyright:     JS Auto Form Validator (c) 2006-2017. All rights reserved.  #
//##                                                                             #
//################################################################################
//
// Supported languages:
//     de - German,  en - English, es - Espanol, fr - Francais, he - Hebrew
//     ja - Japanese, nl - Dutch, ru - Russain
// Usage:
// -----
// *** copy & paste these lines between <head> and </head> tags
// <script type="text/javascript" src="lang/jsafv-en.js"></script>;
// <script type="text/javascript" src="form.validator.js"></script>
// <script type="text/javascript">
//    /* create a new instance of Validator object */ 
//	  var jsFormValidator = new FormValidator();
//    
//    jsFormValidator.setHandleAllFields(true);             /* optional - true or false (default) - handle all fields together or handle each field separately */  
//    jsFormValidator.setHandleHiddenFields(true);          /* optional - true or false (default) - handle hidden fields or not */ 
//    jsFormValidator.setDecimalPointDelimiter(".");        /* optional - "." (default) - decimal point delimiter */  
//    jsFormValidator.setOutputAlert("popup");              /* optional - "popup" (default), "outputContainer" ("div" - deprecated) or "singleError" */ 
//    jsFormValidator.setOutputContainer("divErrors");      /* optional - set ID of <DIV> for errors output container */
//    jsFormValidator.setMode("prefixes");                  /* optional - mode: "prefixes" or "attributes" */
// </script>
//
// *** copy & paste these lines before your </form> tag
// <!--
//  1st parameter (required) - form name
//  2nd parameter (optional, default - false) - handle all fields together or handle each field separately
//  3rd parameter (optional, default - false) - handle hidden fields or not
//  4th parameter (optional, default - ".") - decimal point delimiter
//  5th parameter (optional, default - "popup") - "popup", "outputContainer" or "singleError" - type of output alert
//  6th parameter (optional) - ID of <DIV> for errors container
//  7th parameter (optional, default - "errors") - highlight mode
// -->
// <input type="submit" name="button" value="Submit" onClick="return jsFormValidator.onSubmitCheck(document.forms['form_name']);">
//
////////////////////////////////////////////////////////////////////////////////

FormValidator = function(){
    
/*
    METHODS
    
    VALIDATION                       AUXILIARY                          MAIN                             CAPTCHA
    -------------------              --------------------               --------------------             --------------------  
    isEmpty                          daysInFebruary                     setFocus                         captchaSettings
    isShorter                        getProValidateFieldValue           setSelect                        captchaDraw
    isValid                          getValidateField                   setOutputAlert                   captchaValidate 
    isLower                          equalValidateField                 setOutputContainer
    isSubmitReqType                  highlightCancel                    setMode    
    isSubmitVarType                  highlightError                     setHandleAllFields
    isSubmitVarTypeAttr
    isSubmitSubVarType               highlightSuccess                   setHandleHiddenFields
    isSubmitSubVarTypeAttr
    isNumeric                        resetAllFields                     setDecimalPointDelimiter
    isUpper                          getFieldTitle                      setHighlightMode
    isAlpha                          getFieldAttribute                  outputAlert 
    isDigit                          removeSpaces                       onReqAlert
    isLetterOrDigit                  onSubmit                           onMinAlert
    isText                           getRandomNum                       onInclusionAlert
    isAny                            getRandomChar                      onExclusionAlert
    isLetter                         getRandomSign                      onInvalidAlert
    isInteger                        stripTagsByInd                     onNotEqualAlert 
    isSignedInteger                  pluginsImport                      onSubmitCheck
    isPositiveInteger                                                   onSubmitCheckPrefixes
    isNegativeInteger                                                   onSubmitCheckAttributes 
    isIntegerInRange                                                    handleRequiredField
    isFloat                                                             handleOptionalField
    isSignedFloat                                                       handleDataType
    isPositiveFloat                                                     setPlugins 
    isNegativeFloat
    isAlphabetic
    isAlphanumeric
    isZipCode
    isEmail
    isPassword
    isLogin
    isPhoneNumber
    isMobPhoneNumber
    isFixPhoneNumber
    isInternationalPhoneNumber
    isYear
    isMonth
    isDay
    isDate
    isChecked
    isURL
    isIpAddress
    isSSN
    isRegExpression
    isTemplate
    isButtons
    isValidateField
    isInclusion
    isExclusion
*/    

    /******************************************************************************
     * CLASS PROPERTIES (private)
     *****************************************************************************/
    var _digits = "0123456789";
    var _digits1 = "0123456789.";
    var _digits2 = "0123456789,";
    var _digits3 = "0123456789.,";
    var _textChars = "/'\"[]{}()*&^%$#@!~?<>-_+=|\\ \r\t\n.,:;`";
    var _lwr = "abcdefghijklmnopqrstuvwxyz";
    var _upr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var _loginChars = "_";

    ///var _diacLwr="�����������������������������";
    ///var _diacUpr="�����������������������������";
    //var _diacLwr = "\xE0\xE1\xE2\xE3\xE4\xE5\xE6\xE7\xE8\xE9\xEA\xEB\xEC\xED\xEE\xEF\xF0\xF1\xF2\xF3\xF4\xF5\xF6\xF7\xF8\xF9\xFA\xFB\xFC\xFD\xFE\xFF\xA1\x40\xBF\xB0\xBA"; 
    //var _diacUpr = "\xC0\xC1\xC2\xC3\xC4\xC5\xC6\xC7\xC8\xC9\xCA\xCB\xCC\xCD\xCE\xCF\xD0\xD1\xD2\xD3\xD4\xD5\xD6\xD7\xD8\xD9\xDA\xDB\xDC\xDD\xDE\xDF\xA1\x40\xBF\xB0\xBA"; 
    var _diacLwr = diac_lwr !== undefined ? diac_lwr : ''; 
    var _diacUpr = diac_upr !== undefined ? diac_upr : ''; 
    
    // --- for mode prefixes ---    
    // r - required, s - simple
    var _rTypes = "rs";
    // n - numeric,     i - integer,      f - float,
    // a - alphabetic,  t - text,         e - email,
    // p - password,    l - login,        y - any (generally used for non-english text and symbols),       
    // z - zipcode,     v - verified,     c - checked (for checkboxes),
    // u - url,         s - SSN number,   m - telephone
    // x - template     b - alphanumeric, r - checked (for radiobuttons)
    // d - IP address   g - regular expression
    // (for example - name="rxTemplate" template="(ddd)-ddd-dd-dd", where d - digit, c - character)
    // (for example - name="rtUsername" minlength="5", where minlength - minimum length of entered text)
    // (for example - name="stDomain" inclusion="http://", where inclusion is a string that must present in the entered text)
    // (for example - name="stDomain" exclusion="www.", where exclusion is a string that must not present in the entered text)
    // (for example - name="rgRegExpression" reg_expression="^([0-9])+$", where reg_expression is a regular expression string)
    var _vTypes = "nifabtepylzvcusmxrdg";  
    // for numbers:   s - signed, u - unsigned, p - positive, n - negative
    // for strings:   u - upper, l - lower, n - normal, y - any
    // for telephone: m - mobile, f - fixed (stationary), i - international, y - any
    var _svTypes = "supnlymfi";

    // --- for mode attributes ---    
    // ip-address    alphanumeric        verified        c-checked       alpha|alphabetic 
    // float         int|integer         login|username  phone           regexp|regular-expression
    // numeric       password            ssn             text            radio|radiobutton
    // url           template            any                             zipcode|postcode
    var _dataTypes = "alpha|alphabetic|alphanumeric|verified|c-checked|ip-address|float|regexp|regular-expression|int|integer|login|username|phone|numeric|password|radio|radiobutton|ssn|text|url|template|any|zipcode|postcode";
    // for numbers:   signed, unsigned, positive, negative
    // for strings:   upper, lower , normal, any
    // for telephone: mobile, fixed, international, any
    var _dataSubTypes = "upper|lower|normal|any|signed|unsigned|positive|negative|mobile|fixed|international|any";

    var _vForm = "";
    var _checkAllFields = false;
    var _checkHiddenFields = false;
    var _dInM = {"1":"31","2":"29","3":"31","4":"30","5":"31","6":"30","7":"31","8":"31","9":"30","10":"31","11":"30","12":"31"};
    var _passLength = 6;
    var _loginLength = 6;
    var _isFound = false;
    var _pluginInd = -1;
    var _plugins = new Array();
    var _pluginsList = new Object();
    var _arrRaduoButtoms = new Array();
    
    var _collorError = "#b9403d"; 
    var _bgColorError = "#f6e5e5"; // old "#ff8822";
    var _bgColorSuccess = "#dff0d8"; 
    var _bgColorNormal1 = "#ffffff";
    var _bgColorNormal2 = "#fcfaf6";
    var _borderColorError = "1px solid #eed3d7";
    var _borderColorSuccess = "1px solid #d6e9c6";
    var _borderColorNormal = "1px solid #cccccc";
    
    var _decimalPointDelimiter = ".";
    var _phoneNumberDelimiters = "()- ";  
    var _validPhoneChars = _digits+_phoneNumberDelimiters;
    
    var _digitsInPhoneNumber = 12;
    var _digitsInMinPhoneNumber = 5;
    var _allowLeadingZerosInZipcode = false;
    var _digitsInZIPCode1 = 5;
    var _digitsInZIPCode2 = 9;
    var _ZIPCodeDelimiters = "-";
    var _validZIPCodeChars = _digits+_ZIPCodeDelimiters;
    var _DEOK = false;
    var _alertOutputType = "popup"; /* popup, outputContainer (old syntax - div) or singleError */
    var _alertOutputId = "";
    var _msgPrefix = "&#8226; ";
    var _stripHtmlTags = false;
    var _mode = "prefixes"; /* "prefixes" - default or "attributes" */
    var _highlightMode = "errors"; /* "errors" - default, "all" or "off" */
    var _highlightFieldName = true; 

    var _captchaType = "random"; /* random or math */
    var _captchaText = "";
    var _captchaInput = "";
    var _captchaCaseSensitive = false;
    
    
    /******************************************************************************
     * PROTOTYPES
     *****************************************************************************/
    /* extend array functionality */
    Array.prototype.has = function(value){
        var i;
        for(var i=0, loopCnt=this.length; i<loopCnt; i++){
            if(this[i].toLowerCase() == value.toLowerCase()){
                return true;
            }
        }    
        return false;    
    };    
    
    /******************************************************************************
     * CLASS VALIDATION METHODS
     *****************************************************************************/
    this.isEmpty = function(s){return((s==null)||(s.length==0))};
    this.isShorter = function(strText, strLength){var sLength=(strLength==null) ? "1" : strLength;if(strText.length < sLength) return true;else return false;};
    this.isValid = function(prm,val){if(prm=="")return true;for(i=0;i<prm.length;i++){if(val.indexOf(prm.charAt(i),0)==-1)return false;}return true;};
    this.isLower = function(prm){return this.isValid(prm,_lwr+_textChars+_digits+_diacLwr);};
    this.isSubmitReqType = function(prm){return this.isLower(prm) && this.isValid(prm,_rTypes);};
    this.isSubmitVarType = function(prm){return this.isLower(prm) && this.isValid(prm,_vTypes);};
    this.isSubmitVarTypeAttr = function(prm){return ((prm==null) ? false : (_dataTypes.indexOf(prm) != -1));};
    this.isSubmitSubVarType = function(prm){return this.isLower(prm) && this.isValid(prm,_svTypes);};
    this.isSubmitSubVarTypeAttr = function(prm){return ((prm==null) ? false : (_dataSubTypes.indexOf(prm) != -1));};
    this.isNumeric = function(prm,type){ptype=(type==null)?"0":type; pdigits=-1;switch(ptype){case 0:pdigits=_digits;break;case1:pdigits=_digits1;break;case 2:pdigits=_digits2;break;case 3:pdigits=_digits3;break;default:pdigits=_digits;break;}return this.isValid(prm,pdigits);};
    this.isUpper = function(prm){return this.isValid(prm,_upr+_textChars+_digits+_diacUpr);};
    this.isAlpha = function(prm){return this.isValid(prm,_lwr+_upr);};
    this.isDigit = function(c){return ((c>="0")&&(c<="9"))};
    this.isLetterOrDigit = function(c){return (this.isLetter(c) || this.isDigit(c))};

    this.isText = function(prm){return this.isValid(prm,_lwr+_upr+_digits3+_textChars+_diacLwr+_diacUpr);};
    this.isAny = function(prm){return true;};
    this.isLetter = function(c){return (((c>="a")&&(c<="z"))||((c>="A")&&(c<="Z")))};
    
    // integer checking
    this.isInteger = function(s){var i; if(this.isEmpty(s)) if(this.isInteger.arguments.length==1) return _DEOK; else return (this.isInteger.arguments[1]==true); for(i=0;i< s.length;i++){c=s.charAt(i); if(!this.isDigit(c)) return false;} return true;};
    this.isSignedInteger = function(s){if(this.isEmpty(s)){if(this.isSignedInteger.arguments.length==1) return _DEOK; else return (this.isSignedInteger.arguments[1]==true);}else{startPos=0; secondArg=_DEOK; if(this.isSignedInteger.arguments.length>1) secondArg=this.isSignedInteger.arguments[1]; if((s.charAt(0)=="-") || (s.charAt(0)=="+")) startPos=1; return (this.isInteger(s.substring(startPos,s.length),secondArg));}};
    this.isPositiveInteger = function(s){secondArg=_DEOK;if(this.isPositiveInteger.arguments.length > 1) secondArg=this.isPositiveInteger.arguments[1];return (this.isSignedInteger(s,secondArg) && ((this.isEmpty(s) && secondArg) || (parseInt(s) > 0)));};
    this.isNegativeInteger = function(s){secondArg=_DEOK;if(this.isNegativeInteger.arguments.length > 1) secondArg=this.isNegativeInteger.arguments[1]; return (this.isSignedInteger(s,secondArg) && ((this.isEmpty(s) && secondArg) || (parseInt(s) < 0)));};
    this.isIntegerInRange = function(s,a,b){if(this.isEmpty(s))if(this.isIntegerInRange.arguments.length==1) return _DEOK;else return (this.isIntegerInRange.arguments[1]==true);if(!this.isInteger(s, false)) return false;num=parseInt(s);return ((num >=a) && (num <=b));};

    // float checking
    this.isFloat = function(s){i=0; seenDecimalPoint=false; if(this.isEmpty(s)){if (this.isFloat.arguments.length==1) return _DEOK; else return (this.isFloat.arguments[1]==true);} if(s==_decimalPointDelimiter) return false; for(i=0; i < s.length; i++){c=s.charAt(i); if((c==_decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint=true; else if(!this.isDigit(c)) return false;} return true;};
    this.isSignedFloat = function(s){if(this.isEmpty(s)) if(this.isSignedFloat.arguments.length==1) return _DEOK; else return (this.isSignedFloat.arguments[1]==true); else{startPos=0;secondArg=!_DEOK; if(this.isSignedFloat.arguments.length > 1) secondArg=this.isSignedFloat.arguments[1]; if((s.charAt(0)=="-") || (s.charAt(0)=="+")) startPos=1; return (this.isFloat(s.substring(startPos, s.length), secondArg))}};
    this.isPositiveFloat = function(s){secondArg=_DEOK;if(this.isPositiveFloat.arguments.length > 1) secondArg=this.isPositiveFloat.arguments[1];return (this.isSignedFloat(s,secondArg) && ((this.isEmpty(s) && secondArg) || (parseInt(s) > 0)));};
    this.isNegativeFloat = function(s){secondArg=_DEOK;if(this.isNegativeFloat.arguments.length > 1) secondArg=this.isNegativeFloat.arguments[1];return (this.isSignedFloat(s,secondArg) && ((this.isEmpty(s) && secondArg) || (parseInt(s) < 0)));};
    
    this.isAlphabetic = function(s){i=0;if(this.isEmpty(s))if(this.isAlphabetic.arguments.length==1) return _DEOK;else return (this.isAlphabetic.arguments[1]==true);for(i=0;i<s.length;i++){c=s.charAt(i);if(!this.isLetter(c)) return false;}return true;};
    this.isAlphanumeric = function(s){i=0; if(this.isEmpty(s)) if(this.isAlphanumeric.arguments.length==1) return _DEOK; else return (this.isAlphanumeric.arguments[1]==true);for(i=0;i<s.length;i++){c=s.charAt(i);if(!this.isLetter(c) && !this.isDigit(c)) return false;}return true;};
    this.isZipCode = function(s){if(!_allowLeadingZerosInZipcode && s.charAt(0) == 0) return false; return (!this.isShorter(s,_digitsInZIPCode1) && this.isValid(s,_validZIPCodeChars));};
    
    this.isEmail = function(s){if(this.isEmpty(s)) if(this.isEmail.arguments.length==1) return _DEOK; else return(this.isEmail.arguments[1]==true); var regexpr = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/; if(regexpr.test(s)){return true;}else{return false;}};
    this.isPassword = function(s){return !this.isShorter(s,_passLength) && this.isValid(s,_lwr+_upr+_digits+_textChars);};
    this.isLogin = function(s){return (!this.isShorter(s,_loginLength) && this.isValid(s.charAt(0),_lwr+_upr) && this.isValid(s,_lwr+_upr+_digits+_loginChars));};
    
    // phones checking
    this.isPhoneNumber = function(s){return (this.isValid(s,_validPhoneChars) && (s.length >= _digitsInMinPhoneNumber && s.length <= _digitsInPhoneNumber));};
    this.isMobPhoneNumber = function(s){return (this.isValid(s,_validPhoneChars) && (s.length >= _digitsInMinPhoneNumber && s.length <= _digitsInPhoneNumber));};
    this.isFixPhoneNumber = function(s){return (this.isInteger(s) && (s.length >= _digitsInMinPhoneNumber && s.length <= _digitsInPhoneNumber));};
    this.isInternationalPhoneNumber = function(s){return (this.isPositiveInteger(s));};

    // datetime checking    
    this.isYear = function(s){if(this.isEmpty(s))if(this.isYear.arguments.length==1)return _DEOK; else return (this.isYear.arguments[1]==true); if (!isNonnegativeInteger(s)) return false; return (s.length==4);};
    this.isMonth = function(s){if(this.isEmpty(s))if(this.isMonth.arguments.length==1)return _DEOK;else return (this.isMonth.arguments[1]==true);return this.isIntegerInRange(s,1,12);};
    this.isDay = function(s){if(this.isEmpty(s))if(this.isDay.arguments.length==1)return _DEOK;else return (this.isDay.arguments[1]==true);return this.isIntegerInRange(s, 1, 31);};
    this.isDate = function(year,month,day){if(!(this.isYear(year,false) && this.isMonth(month, false) && this.isDay(day, false))) return false; intYear=parseInt(year); intMonth=parseInt(month); intDay=parseInt(day); if (intDay > _dInM[intMonth]) return false; if ((intMonth==2) && (intDay > this.daysInFebruary(intYear))) return false; return true;};
    
    this.isChecked = function(ind){return _vForm.elements[ind].checked;};
    this.isURL = function(url){var regExpr = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,7}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/; if(regExpr.test(url)) return true;  return false;};
    this.isIpAddress = function(ipaddr){ipaddr = ipaddr.replace(/\s/g, ""); var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; if(re.test(ipaddr)){var parts = ipaddr.split("."); if(parseInt(parseFloat(parts[0])) == 0) return false; if (parseInt(parseFloat(parts[3])) == 0) return false; for(var i=0; i<parts.length; i++){if(parseInt(parseFloat(parts[i])) > 255) return false;} return true;}else{return false;}};
    this.isSSN = function(s){var matchNum = s.match(/^(\d{3})-?\d{2}-?\d{4}$/); var dashes = s.split("-").length - 1;if(matchNum == null || dashes == 1){return false;}return true;};
    this.isRegExpression = function(regexpr,s){return s.match(regexpr) ? true : false;};
    
    this.isTemplate = function(t,s){if(t){if(t.length != s.length) return false; for(var i=0; i < t.length; i++){if((t.charAt(i) == "d" || t.charAt(i) == "D") && this.isDigit(s.charAt(i))){}else if((t.charAt(i) == "c" || t.charAt(i) == "C") && this.isAlpha(s.charAt(i))){}else if(t.charAt(i) == s.charAt(i)){}else{return false;}} return true;}return true;};    
    this.isButtons = function(el){return (el.type && ((el.type.substring(0,6) == "submit") || (el.type.substring(0,6) == "button") || (el.type.substring(0,5) == "reset"))) ? true : false;};    
    this.isValidateField = function(pInd){
        var vResult=false;
        var curFieldName=_vForm.elements[pInd].name.substring(2,_vForm.elements[pInd].name.length);
        var curFieldType=_vForm.elements[pInd].name.charAt(1);
        var dataVerifiedField = this.getFieldAttribute(ind,"data-verified-field");
        var foundFieldInd=-1;
        for(vind=0;((vind<_vForm.elements.length)&&(foundFieldInd==-1));vind++){
            if(_mode == "attributes"){
                if(_vForm.elements[vind].name != undefined && _vForm.elements[vind].name == dataVerifiedField)foundFieldInd=vind;                   
            }else{
                if((_vForm.elements[vind].name != undefined) && (curFieldType != _vForm.elements[vind].name.charAt(1)) && (curFieldName==_vForm.elements[vind].name.substring(2, _vForm.elements[vind].name.length)))foundFieldInd=vind;
            }
        }
        if(foundFieldInd !=-1){
            var verifiedFieldtype = (_mode == "attributes") ? this.getFieldAttribute(foundFieldInd,"data-type") : "";
            if(_vForm.elements[foundFieldInd].name.charAt(1)=="e" || verifiedFieldtype=="email"){
                vResult=this.isEmail(_vForm.elements[pInd].value);
            }else if(_vForm.elements[foundFieldInd].name.charAt(1)=="p" || verifiedFieldtype=="password"){
                vResult=this.isPassword(_vForm.elements[pInd].value);
            }                
        }
        return vResult;
    };
    
    this.isInclusion = function(val,inc){return (val.indexOf(inc) > -1) ? true : false;};
    this.isExclusion = function(val,inc){return (val.indexOf(inc) > -1) ? false : true;};

    
    /******************************************************************************
     * CLASS AUXILIARY METHODS
     *****************************************************************************/
    this.daysInFebruary = function(year){return(((year % 4==0) && ((!(year % 100==0)) || (year % 400==0) ) ) ? 29 : 28 );};
    this.getProValidateFieldValue = function(pInd){var curFieldName=_vForm.elements[pInd].name.substring(2,_vForm.elements[pInd].name.length);var curFieldPrefix = _vForm.elements[pInd].name.substring(0,2);var foundFieldInd=-1;for(gvind=0;((gvind<_vForm.elements.length) && (foundFieldInd==-1));gvind++){if((_vForm.elements[gvind].name != undefined) && (curFieldName==_vForm.elements[gvind].name.substring(2, _vForm.elements[gvind].name.length)) && (curFieldPrefix != _vForm.elements[gvind].name.substring(0,2))){foundFieldInd=gvind; break;}}if(foundFieldInd !=-1) return _vForm.elements[foundFieldInd].value;else return -1;};
    this.getValidateField = function(pInd,retType){
        var curFieldName=_vForm.elements[pInd].name.substring(2,_vForm.elements[pInd].name.length);
        var foundFieldInd=-1;
        for(gvind=0;((gvind<_vForm.elements.length) && (foundFieldInd==-1));gvind++){
            if((_vForm.elements[gvind].name != undefined) && curFieldName==_vForm.elements[gvind].name.substring(2, _vForm.elements[gvind].name.length))
                foundFieldInd=gvind;
            }
            if(foundFieldInd !=-1){
                if(retType=="type") return _vForm.elements[foundFieldInd].name.charAt(1);
                else return _vForm.elements[foundFieldInd].title;
            }else{
                return 0;
            }
    };
    this.equalValidateField = function(pInd){var vResult=false; var curFieldName=_vForm.elements[pInd].name.substring(2,_vForm.elements[pInd].name.length);var curFieldType=_vForm.elements[pInd].name.charAt(0);var foundFieldInd=-1;for(evind=0;((evind<_vForm.elements.length) && (foundFieldInd==-1)); evind++){if((_vForm.elements[evind].name != undefined) && (curFieldType != _vForm.elements[evind].name.charAt(1)) && (curFieldName==_vForm.elements[evind].name.substring(2, _vForm.elements[evind].name.length))) foundFieldInd=evind;}if(foundFieldInd !=-1){vResult=(_vForm.elements[pInd].value==_vForm.elements[foundFieldInd].value);}else{vResult=false;}return vResult;};
    this.highlightCancel = function(ind){if((_vForm.elements[ind].type) && _vForm.elements[ind].type.substring(0,6) != "select"){_vForm.elements[ind].style.background = _bgColorNormal1;}else{_vForm.elements[ind].style.background = _bgColorNormal2;};_vForm.elements[ind].style.border = _borderColorNormal;};
    this.highlightError = function(ind){_vForm.elements[ind].style.background = _bgColorError;_vForm.elements[ind].style.border = _borderColorError;};
    this.singleErrorReset = function(){
        var divs = document.getElementsByTagName('div');
        for(var i=divs.length-1;i>=0;i--){
            if(divs[i].id.match(/errorfor\_/g)){
                divs[i].parentNode.removeChild(divs[i]);
            }
        }
    }
    this.outputContainerReset = function(){
        if(_alertOutputId != '' && document.getElementById(_alertOutputId)) document.getElementById(_alertOutputId).style.display = "none";
    }
    this.resetAllFields = function(frm){
        if(_vForm == "" || _vForm == undefined) _vForm = frm;
        for(ind=0;ind<frm.elements.length;ind++){
            if((frm.elements[ind].type == undefined) || this.isButtons(frm.elements[ind]) || (!_checkHiddenFields && frm.elements[ind].type && frm.elements[ind].type.substring(0,6) == "hidden")){
                continue;
            }
            if(_highlightMode == "errors" || _highlightMode == "all") this.highlightCancel(ind);
        }
        this.singleErrorReset();
        this.outputContainerReset();
    }

    this.highlightSuccess = function(ind){
        _vForm.elements[ind].style.background = _bgColorSuccess;
        _vForm.elements[ind].style.border = _borderColorSuccess;
    };
    
    this.getFieldTitle = function(ind){
        var titleField=_vForm.elements[ind].title;if(titleField=="")titleField=_vForm.elements[ind].name.substring(3,_vForm.elements[ind].name.length);
        if(_highlightFieldName && _alertOutputType != "popup") titleField = "<b>"+titleField+"</b>";
        return titleField;
    };
    this.removeSpaces = function(s){return s.split(" ").join("");};
    this.getFieldAttribute = function(ind,attr){
        var output = "";
        var parts = attr.split("|");
        for(var i=0; i<parts.length; i++){
            if(window.all) output = (_vForm.elements[ind].attributes.item(parts[i])) ? _vForm.elements[ind].attributes.item(parts[i]).value : "";
            else output = _vForm.elements[ind].getAttribute(parts[i]);
            if(output != "" && output != null) break;
        }
        return output;
    };
    this.onSubmit = function(){return true;};    
    this.getRandomNum = function(lbound,ubound){return (Math.floor(Math.random() * (ubound - lbound)) + lbound);};
    this.getRandomChar = function(number,lower,upper,other,extra){var numberChars = "0123456789"; var lowerChars = "abcdefghijklmnopqrstuvwxyz"; var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; var otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? "; var charSet = extra; if(number == true) charSet += numberChars; if(lower == true) charSet += lowerChars; if(upper == true) charSet += upperChars; if(other == true) charSet += otherChars; return charSet.charAt(this.getRandomNum(0, charSet.length));};
    this.getRandomSign = function(){var charSet = "+-*"; return charSet.charAt(this.getRandomNum(0, charSet.length));};
    this.stripTagsByInd = function(ind){_vForm.elements[ind].value = _vForm.elements[ind].value.replace(/(<([^>]+)>)/ig,"");};
    this.pluginsImport = function(plugName, jsFile){
        if(_pluginsList[plugName] != null) return false;
        var scriptElt = document.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.src = jsFile;
        document.getElementsByTagName("head")[0].appendChild(scriptElt);
        _pluginsList[plugName] = jsFile; /* or whatever value your prefer */
        return true;
    }

    /**
     * Set focus for selected tag
     * @param ind
     */
    var private_setFocus = function(ind){
        if((!_isFound) && _vForm.elements[ind] && (_vForm.elements[ind].style.display != "none") && !_vForm.elements[ind].disabled) {
            try{
                _vForm.elements[ind].focus();
            }catch(e){
                /* cannot set focus */
            }            
        }
    };

    /**
     * Set select for <SELECT> tag
     * @param ind
     */
    var private_setSelect = function(ind){
        if(_vForm.elements[ind].type){
            if(_vForm.elements[ind].type.substring(0,6) != "select" && _vForm.elements[ind].type != "textarea"){
                _vForm.elements[ind].select();
            }
        }
    };

    
    /******************************************************************************
     * CLASS MAIN METHODS
     *****************************************************************************/    
    /**
     * Defines output alert type
     * @param otype
     */
    this.setOutputAlert = function(otype){
        if(otype != null) otype = otype.toLowerCase();
        _alertOutputType = (otype != null && (otype == "div" || otype == "outputcontainer" || otype == "singleerror")) ? otype : "popup";
    };

    /**
     * Defines output container
     * @param ocontainer
     */
    this.setOutputContainer = function(ocontainer){
        _alertOutputId = (ocontainer != null) ? ocontainer : "";
    };
    
    /**
     * Defines mode to class
     * @param omode
     */
    this.setMode = function(omode){
        _mode = (omode != null && omode == "attributes") ? "attributes" : "prefixes";
    };
    
    /**
     * Defines highlight mode to class
     * @param hmode
     */
    this.setHighlightMode = function(hmode){
        if(hmode == "off"){
            _highlightMode = "off";
        }else if(hmode == "all"){
            _highlightMode = "all";
        }else{
            _highlightMode = "errors";
        }
    };
    
    /**
     * Sets (load) plugins
     * @param params
     */
    this.setPlugins = function(params){
        // get plugins
        for(i=0;i<params.length;i++){
            if(params[i][0] != null && params[i][1] != null){
                _plugins[i] = new Array();
                _plugins[i]["name"] = params[i][0];
                _plugins[i]["path"] = params[i][1];
                this.pluginsImport(_plugins[i]["name"], _plugins[i]["path"]);         
            }            
        }    
    };
            
    /**
     * Set type of fields handling: all or separatelly
     * @param handleAllFields
     */
    this.setHandleAllFields = function(handleAllFields){
        _checkAllFields = (handleAllFields != null && handleAllFields == true) ? handleAllFields : false;
    };

    /**
     * Set type of hidden fields handling: yes or no
     * @param handleHiddenFields
     */
    this.setHandleHiddenFields = function(handleHiddenFields){
        _checkHiddenFields = (handleHiddenFields != null && handleHiddenFields == true) ? handleHiddenFields : false;
    };
    
    /**
     * Set decimal point delimiter
     * @param decimalPointDelimiter
     */
    this.setDecimalPointDelimiter = function(decimalPointDelimiter){
        if(decimalPointDelimiter == "." || decimalPointDelimiter == ",") _decimalPointDelimiter = decimalPointDelimiter;
    };

    /**
     * Draws alert
     * @param output
     * @param ind
     */
    this.outputAlert = function(output, ind){
        if(_alertOutputType == "singleerror"){
            // reset all previous error messages
            this.singleErrorReset();
            var output_parts = output.split("|");
            for(var i = 0; i < output_parts.length; i++){
                var param = output_parts[i].split("=");
                output = param[0];
                var fInd = (param[1] != null) ? param[1] : ((ind != null) ? ind : 0);                
                if(_vForm.elements[fInd]){
                    if(!document.getElementById('errorfor_'+fInd)){
                        var newErrorDiv = document.createElement('div');
                        newErrorDiv.setAttribute('id','errorfor_'+fInd);
                        newErrorDiv.setAttribute('style','color:'+_collorError);
                        newErrorDiv.innerHTML = output;
                        _vForm.elements[fInd].parentNode.appendChild(newErrorDiv);                
                    }
                }
            }            
        }else if(_alertOutputType == "outputcontainer" || _alertOutputType == "div"){
            output = output.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            output = output.replace(/&lt;b&gt;/g, "<b>").replace(/&lt;\/b&gt;/g, "</b>");
            if(_checkAllFields) output = output.replace(/\n/g, "<br>");
            if(document.getElementById(_alertOutputId)){
                document.getElementById(_alertOutputId).style.display = "block";
                document.getElementById(_alertOutputId).innerHTML = output;
            }
        }else{
            alert(output);
        }
    };    

    /**
     * Returns alert on "required field" event
     * @param ind
     */
    this.onReqAlert = function(ind){
        var titleOfField = this.getFieldTitle(ind);
        var msg = _msgPrefix+fvVocabulary._MSG[((_checkAllFields)?"MSG_REQURED":"MSG_REQURED_VALUE")].replace(/%TITLE_OF_FIELD%/gi, titleOfField);
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        if(_checkAllFields){
            return msg+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");    
        }else{
            this.outputAlert(msg+"\n", ind);
            private_setSelect(ind);
            return false;        
        }
    };

    /**
     * Returns alert on "minlength" event
     * @param ind
     * @param minlength
     */
    this.onMinAlert = function(ind, minlength){
        var titleOfField = this.getFieldTitle(ind);
        var msg = _msgPrefix+fvVocabulary._MSG["MSG_MINIMUM_ALERT"].replace(/%TITLE_OF_FIELD%/gi, titleOfField).replace(/%X%/gi, minlength);
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        if(_checkAllFields){
            return msg+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");    
        }else{
            this.outputAlert(msg+"\n", ind);
            private_setSelect(ind);
            return false;        
        }
    };

    /**
     * Returns alert on "inclusion" event
     * @param ind
     * @param inclusionText
     */
    this.onInclusionAlert = function(ind, inclusionText){
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        var alertMsg = _msgPrefix+fvVocabulary._MSG["MSG_INCLUSION_ALERT"].replace(/%SEARCH_STR%/g, inclusionText);
        if(_checkAllFields){
            return alertMsg+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");    
        }else{
            this.outputAlert(alertMsg+"\n", ind);
            private_setSelect(ind);
            return false;        
        }        
    };
    
    /**
     * Returns alert on "exclusion" event
     * @param ind
     * @param exclusionText
     */
    this.onExclusionAlert = function(ind, exclusionText){
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        var alertMsg = _msgPrefix+fvVocabulary._MSG["MSG_EXCLUSION_ALERT"].replace(/%SEARCH_STR%/g, exclusionText);
        if(_checkAllFields){
            return alertMsg+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");    
        }else{
            this.outputAlert(alertMsg+"\n", ind);
            private_setSelect(ind);
            return false;        
        }        
    };    
   
    /**
     * Returns alert if the field has wrong format
     * @param ind
     * @param ftype
     * @param fstype
     */
    this.onInvalidAlert = function(ind, ftype, fstype){
        var titleOfField = this.getFieldTitle(ind);
        var fieldTemplate = this.getFieldAttribute(ind,"template|data-template");
        var fieldRegExpression = this.getFieldAttribute(ind,"reg_expression|data-pattern");
        var subTypeOfField, subTypeOfField2;
        var outputMessage = "";
        var returnResult = "";
    
        switch(fstype){ //supnly mfi
            case "s":
            case "signed":
                subTypeOfField=fvVocabulary._MSG["SNT_2"]; break;
            case "u":
            case "upper":
            case "unsigned":
                subTypeOfField=fvVocabulary._MSG["SNT_3"]; subTypeOfField2=fvVocabulary._MSG["SNT_4"]; break;
            case "p":
            case "positive":
                subTypeOfField=fvVocabulary._MSG["SNT_5"]; break;
            case "n":
            case "normal":
            case "negative":
                subTypeOfField=fvVocabulary._MSG["SNT_6"]; subTypeOfField2=fvVocabulary._MSG["SNT_7"]; break;
            case "l":
            case "lower":    
                subTypeOfField=fvVocabulary._MSG["SNT_8"]; subTypeOfField2=fvVocabulary._MSG["SNT_8"]; break;
            default:
                subTypeOfField=fvVocabulary._MSG["SNT_9"]; subTypeOfField2=fvVocabulary._MSG["SNT_9"]; break; 
        }
    
        switch(ftype){
            case "n":
            case "numeric":
                outputMessage = fvVocabulary._MSG["MSG_NUM"].replace(/%SUB_TYPE_OF_FIELD%/gi, subTypeOfField); break;
            case "i":
            case "int":
            case "integer":    
                outputMessage = fvVocabulary._MSG["MSG_INT"].replace(/%SUB_TYPE_OF_FIELD%/gi, subTypeOfField); break;
            case "f":
            case "float":    
                outputMessage = fvVocabulary._MSG["MSG_FLOAT"].replace(/%SUB_TYPE_OF_FIELD%/gi, subTypeOfField); break;
            case "a":
            case "alpha":
            case "alphabetic":
                outputMessage = fvVocabulary._MSG["MSG_ALPHABETIC"].replace(/%SUB_TYPE_OF_FIELD%/gi, subTypeOfField2); break;
            case "b":
            case "alphanumeric":    
                outputMessage = fvVocabulary._MSG["MSG_ALPHANUMERIC"]; break;    
            case "t":
            case "text":
                outputMessage = fvVocabulary._MSG["MSG_TEXT_EN"].replace(/%SUB_TYPE_OF_FIELD%/gi, subTypeOfField2); break;
            case "p":
            case "password":        
                outputMessage = fvVocabulary._MSG["MSG_PASSWORD_LENGTH"].replace(/%PASS_LENGTH%/gi, _passLength); break;
            case "l":
            case "login":
            case "username":                    
                outputMessage = fvVocabulary._MSG["MSG_LOGIN"].replace(/%LOGIN_LENGTH%/gi, _loginLength); break;
            case "z":
            case "zipcode":
            case "postcode":                
                if(!_allowLeadingZerosInZipcode) outputMessage = fvVocabulary._MSG["MSG_ZIPCODE_WLZ_ALERT"]; 
                else outputMessage = fvVocabulary._MSG["MSG_ZIPCODE_ALERT"];
                break;
            case "e":
            case "email":    
                outputMessage = fvVocabulary._MSG["MSG_EMAIL"]; break;
            case "v":
            case "verified":
                var valFieldType = this.getValidateField(ind, "type");
                if(valFieldType=="e" || valFieldType=="email") outputMessage = fvVocabulary._MSG["MSG_EMAIL"]; 
                else if(valFieldType=="p" || valFieldType=="password") outputMessage = fvVocabulary._MSG["MSG_PASSWORD_LENGTH"].replace(/%PASS_LENGTH%/gi, _passLength); 
                else outputMessage = fvVocabulary._MSG["MSG_CONFIRM_FIELD"];
                break;
            case "c":
            case "c-checked":    
                outputMessage = ""; break;                
            case "u":
            case "url":
                outputMessage = fvVocabulary._MSG["MSG_URL"]; break;
            case "s":
            case "ssn":
                outputMessage = fvVocabulary._MSG["MSG_SSN"]; break;                
            case "x":
            case "template":
                outputMessage = fvVocabulary._MSG["MSG_TEMPLATE"].replace(/%TEMPLATE%/gi, fieldTemplate); break;
            case "m":
            case "phone":
                if(fstype == "m" || fstype == "mobile"){
                    outputMessage = fvVocabulary._MSG["MSG_MOBILE_PHONE_NUMBER"]; 
                }else if(fstype == "f" || fstype == "fixed"){
                    outputMessage = fvVocabulary._MSG["MSG_FIXED_PHONE_NUMBER"]; 
                }else if(fstype == "i" || fstype == "international"){
                    outputMessage = fvVocabulary._MSG["MSG_INTER_PHONE_NUMBER"]; 
                }else{
                    outputMessage = fvVocabulary._MSG["MSG_PHONE_NUMBER"]; 
                }
                break;
            case "r":
            case "radio":    
            case "radiobutton":
                outputMessage = ""; break;
            case "d":
            case "ip-address":     
                outputMessage = fvVocabulary._MSG["MSG_IP_ADDRESS"]; break;
            case "g":
            case "regexp":    
            case "regular-expression":    
                outputMessage = fvVocabulary._MSG["MSG_REG_EXSPRESSION"].replace(/%REG_EXSPRESSION%/gi, fieldRegExpression); break;
            default:
                if(ftype != null) outputMessage = (_pluginInd != -1) ? _plugins[_pluginInd]["obj"].errorMessage() : ""; break; 
        }
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        outputMessage = outputMessage.replace(/%TITLE_OF_FIELD%/gi, titleOfField);
        if(_checkAllFields){
            if(ftype == "c" || ftype == "c-checked"){
                returnResult = _msgPrefix+fvVocabulary._MSG["MSG_CHECKBOX"].replace(/%TITLE_OF_FIELD%/gi, titleOfField);
            }else if(ftype == "r" || ftype == "radio" || ftype == "radiobutton"){                
                returnResult = _msgPrefix+fvVocabulary._MSG["MSG_RADIOBUTTON_ALERT"].replace(/%TITLE_OF_FIELD%/gi, titleOfField);
            }else{
                returnResult = _msgPrefix+outputMessage;                    
            }
            return returnResult+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");
        }else{
            if(ftype == "c" || ftype == "c-checked"){
                this.outputAlert(_msgPrefix+fvVocabulary._MSG["MSG_CHECKBOX"].replace(/%TITLE_OF_FIELD%/gi, titleOfField)+"\n", ind);
            }else if(ftype == "r" || ftype == "radio" || ftype == "radiobutton"){
                this.outputAlert(_msgPrefix+fvVocabulary._MSG["MSG_RADIOBUTTON_ALERT"].replace(/%TITLE_OF_FIELD%/gi, titleOfField)+"\n", ind);
            }else{
                this.outputAlert(_msgPrefix+outputMessage+"\n", ind);                    
            }
            private_setSelect(ind);
            return false;            
        }
    };
    
    /**
     * Returns alert if fields were not equal
     * @param ind
     */
    this.onNotEqualAlert = function(ind){
        var typeOfField=this.getValidateField(ind, "name");
        var titleOfField=this.getFieldTitle(ind);
        var msg = _msgPrefix+fvVocabulary._MSG["MSG_MATCH_REENTER_ALERT"].replace(/%TITLE_OF_FIELD%/gi, titleOfField).replace(/%TYPE_OF_FIELD%/gi, typeOfField);
        ///if(typeOfField==0) typeOfField="required field";
        if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind);
        private_setFocus(ind);
        if(_checkAllFields){
            return msg+((_alertOutputType == "singleerror") ? "="+ind+"|" : "\n");
        }else{
            this.outputAlert(msg+"\n", ind);        
            private_setSelect(ind);
            return false;
        }
    };
    
    /**
     * Perform form validation
     * @param frm
     * @param handleAllFields
     * @param handleHiddenFields check hidden fields+check "display:none;" fields 
     * @param decimalPointDelimiter
     * @param alertOutputType
     * @param alertOutputId
     * @param highlightMode
     */
    this.onSubmitCheck = function(frm, handleAllFields, handleHiddenFields, decimalPointDelimiter, alertOutputType, alertOutputId, highlightMode){
        _vForm = frm;
        _isFound = false;
        _arrRaduoButtoms.length = 0;
        _msgPrefix = "";
        if(handleAllFields != null) this.setHandleAllFields(handleAllFields);       
        if(handleHiddenFields != null) this.setHandleHiddenFields(handleHiddenFields);        
        if(decimalPointDelimiter != null) this.setDecimalPointDelimiter(decimalPointDelimiter);
        if(alertOutputType != null) this.setOutputAlert(alertOutputType);
        if(alertOutputId != null) this.setOutputContainer(alertOutputId);
        if(highlightMode != null) this.setHighlightMode(highlightMode);
        
        if(_alertOutputType == "popup"){
            this.outputContainerReset();
        }else if(_alertOutputType == "singleerror"){
            this.outputContainerReset();
        }else{
            _msgPrefix = "&#8226; ";
        }

        if(_mode == "attributes") return this.onSubmitCheckAttributes();
        else return this.onSubmitCheckPrefixes();
    }    
   
    /**
     * Perform form validation by prefixes
     */
    this.onSubmitCheckAttributes = function(){
        var isRequired = "";
        var dataType = "";
        var dataSubType = "";
        var msg = "";
        var msgi = "";
        var fieldTemplate;
        var fieldRegExpression;
        var fieldValue = "";
        var result = "";
        
        for(ind=0;ind<_vForm.elements.length;ind++){
            if((_vForm.elements[ind].type == undefined) ||
                this.isButtons(_vForm.elements[ind]) ||
               (!_checkHiddenFields && _vForm.elements[ind].type && _vForm.elements[ind].type.substring(0,6) == "hidden")){
                continue;
            }            

            if(_highlightMode == "errors" || _highlightMode == "all") this.highlightCancel(ind);
            if(_stripHtmlTags == true) this.stripTagsByInd(ind); 
            
            isRequired=this.getFieldAttribute(ind,"required");
            dataType=this.getFieldAttribute(ind,"data-type");
            dataSubType=this.getFieldAttribute(ind,"data-subtype");
            if(!this.isSubmitSubVarTypeAttr(dataSubType)) dataSubType = "";
            msgi = "";
            
            //if(this.isSubmitVarTypeAttr(dataType) &&
            //   (((_vForm.elements[ind].style.display != "none") && (_vForm.elements[ind].type != "textarea")) || (_vForm.elements[ind].type == "textarea"))
            //  )
            //{
                fieldValue=_vForm.elements[ind].value; //trim            
                if(isRequired != null && isRequired != ""){
                    // handle required field
                    result = this.handleRequiredField(ind, fieldValue);                    
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["continue"] === true) continue;
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                }else{
                    // handle optional field
                    result = this.handleOptionalField(ind, fieldValue);                    
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["continue"] === true) continue;
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                }
                
                if((isRequired != null && isRequired != "") || 
                   (isRequired == null && !this.isEmpty(fieldValue)) || 
                   (dataType=="verified" && !this.isEmpty(this.getProValidateFieldValue(ind)))
                ){
                    // handle subtype
                    result = this.handleDataType(ind, fieldValue, dataType, dataSubType, isRequired);
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                }            
                if(_highlightMode == "all" && fieldValue != "" && msgi == "") this.highlightSuccess(ind);
            //}
        } // for
        if(_checkAllFields){
            if(msg != ""){
                this.outputAlert(msg);  
                return false;
            }            
        }    
        return true;    
    }
    
    /**
     * Perform form validation by prefixes
     */
    this.onSubmitCheckPrefixes = function(){
        var isRequired = "";
        var dataType = "";
        var dataSubType = "";
        var msg = "";
        var msgi = "";
        var fieldTemplate;
        var fieldRegExpression;
        var fieldValue = "";
        var result = "";
        
        for(ind=0;ind<_vForm.elements.length;ind++){
            if((_vForm.elements[ind].type == undefined) ||
                this.isButtons(_vForm.elements[ind]) ||
               (!_checkHiddenFields && _vForm.elements[ind].type && _vForm.elements[ind].type.substring(0,6) == "hidden")){
                continue;
            }            

            if(_highlightMode == "errors" || _highlightMode == "all") this.highlightCancel(ind);
            if(_stripHtmlTags == true) this.stripTagsByInd(ind); 
            
            isRequired=_vForm.elements[ind].name.charAt(0);
            dataType=_vForm.elements[ind].name.charAt(1);
            dataSubType=_vForm.elements[ind].name.charAt(2);            
            if(!this.isSubmitSubVarType(dataSubType)) dataSubType = "";
            msgi = "";
            
            if(this.isSubmitReqType(isRequired) &&
               this.isSubmitVarType(dataType) &&
               (((_vForm.elements[ind].style.display != "none") && (_vForm.elements[ind].type != "textarea")) || (_vForm.elements[ind].type == "textarea"))
              )
            {
                fieldValue=_vForm.elements[ind].value; //trim
                if(isRequired=="r"){
                    // handle required field
                    result = this.handleRequiredField(ind, fieldValue);                    
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["continue"] === true) continue;
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                }else{
                    // handle optional field
                    result = this.handleOptionalField(ind, fieldValue);
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["continue"] === true) continue;
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                };
                
                if(isRequired=="r" ||
                  (isRequired=="s" && !this.isEmpty(fieldValue)) ||
                  (dataType=="v" && !this.isEmpty(this.getProValidateFieldValue(ind)))
                ){
                    // handle subtype
                    result = this.handleDataType(ind, fieldValue, dataType, dataSubType, isRequired);
                    if(result["message"] != "") msg += msgi = result["message"];
                    if(result["return"] === false) return false;
                    else if(result["return"] !== "") return result["return"];
                }
                if(_highlightMode == "all" && fieldValue != "" && msgi == "") this.highlightSuccess(ind);
            }            
        } // for
        if(_checkAllFields){
            if(msg != ""){
                this.outputAlert(msg);
                return false;
            }            
        }    
        return true;    
    };      
    
    /**
     * Handle required field
     * @param ind
     * @param fieldValue
     */
    this.handleRequiredField = function(ind, fieldValue){
        var result = {"message":"", "continue":false, "return":""};
        
        var fieldMinLength = this.getFieldAttribute(ind,"minlength");
        var fieldInclusion = this.getFieldAttribute(ind,"inclusion");
        var fieldExclusion = this.getFieldAttribute(ind,"exclusion");
        if(this.isEmpty(fieldValue)){
            if(_checkAllFields) result["message"] = this.onReqAlert(ind); 
            result["return"] = this.onReqAlert(ind);
        }else if(fieldMinLength != "" && this.isShorter(fieldValue,fieldMinLength)){
            if(_checkAllFields) result["message"] = this.onMinAlert(ind,fieldMinLength);
            result["return"] = this.onMinAlert(ind,fieldMinLength);
        }else if(fieldInclusion != null && !this.isInclusion(fieldValue,fieldInclusion)){
            if(_checkAllFields) result["message"] = this.onInclusionAlert(ind,fieldInclusion);
            result["return"] = this.onInclusionAlert(ind,fieldInclusion);
        }else if(fieldExclusion != null && !this.isExclusion(fieldValue,fieldExclusion)){
            if(_checkAllFields) result["message"] = this.onExclusionAlert(ind,fieldExclusion);
            result["return"] = this.onExclusionAlert(ind,fieldExclusion);
        }else{
            if(_highlightMode == "errors" || _highlightMode == "all") this.highlightCancel(ind);
        }
        
        if(result["message"] != ""){
            _isFound = true;
            result["continue"] = true;            
        }
        
        return result;        
    }

    /**
     * Handle optional field
     * @param ind
     * @param fieldValue
     */
    this.handleOptionalField = function(ind, fieldValue){
        var result = {"message":"", "continue":false, "return":""};
        
        var fieldInclusion = this.getFieldAttribute(ind,"inclusion");
        var fieldExclusion = this.getFieldAttribute(ind,"exclusion");
        if(!this.isEmpty(fieldValue)){
            if(fieldInclusion != null && !this.isInclusion(fieldValue,fieldInclusion)){
                if(_checkAllFields) result["message"] = this.onInclusionAlert(ind,fieldInclusion);
                else result["return"] = this.onInclusionAlert(ind,fieldInclusion);
            }else if(fieldExclusion != null && !this.isExclusion(fieldValue,fieldExclusion)){
                if(_checkAllFields) result["message"] = this.onExclusionAlert(ind,fieldExclusion);
                else result["return"] = this.onExclusionAlert(ind,fieldExclusion);
            }                        
        }
        
        if(result["message"] != ""){
            _isFound = true;
            result["continue"] = true;            
        }
        
        return result;        
    }

    /**
     * Handle data type
     * @param ind
     * @param fieldValue
     * @param dataType
     * @param dataSubType
     */
    this.handleDataType = function(ind, fieldValue, dataType, dataSubType, isRequired){
        var trueValue = true;
        var result = {"message":"", "return":""};
        
        switch(dataType){
            case "a":
            case "alpha":
            case "alphabetic":
                // Alphabetic
                switch(dataSubType){
                    case "u":
                    case "upper":
                            if(!this.isAlphabetic(fieldValue) || !this.isUpper(fieldValue)) trueValue=false; break;
                    case "l":
                    case "lower":
                            if(!this.isAlphabetic(fieldValue) || !this.isLower(fieldValue)) trueValue=false; break;
                    case "n":
                    case "normal":
                    case "y":
                    case "any":
                    default:
                        if(!this.isAlphabetic(fieldValue)) trueValue=false;
                        break;
                }
                break;                        
            case "b":
            case "alphanumeric":                
                // Alphanumeric
                switch(dataSubType){
                    default: if(!this.isAlphanumeric(fieldValue)) trueValue=false; break;
                }
                break;                        
            case "c":
            case "c-checked":    
                // Checkboxes
                if((isRequired=="r" || (isRequired != "" && isRequired != null)) && !this.isChecked(ind)) trueValue=false; break;
            case "d":
            case "ip-address":    
                // IP address
                if(!this.isIpAddress(fieldValue)) trueValue=false;
                break;
            case "e":
            case "email":
                // Email
                switch(dataSubType){
                    case "u":
                    case "upper":
                        if(!this.isEmail(fieldValue) || !this.isUpper(fieldValue)) trueValue=false;
                        break;
                    case "l":
                    case "lower":
                        if(!this.isEmail(fieldValue) || !this.isLower(fieldValue)) trueValue=false; break;
                    case "n":
                    case "normal":
                    case "y":
                    case "any":
                    default:
                        if(!this.isEmail(fieldValue)) trueValue=false;
                        break;
                }
                break;                        
            case "f":
            case "float":    
                // Float  
                switch(dataSubType){
                    case "s":
                    case "signed":
                        if(!this.isSignedFloat(fieldValue)) trueValue=false; break;
                    case "u":
                    case "unsigned":
                        if(!this.isFloat(fieldValue)) trueValue=false; break;
                    case "p":
                    case "positive":
                        if(!this.isPositiveFloat(fieldValue)) trueValue=false; break;
                    case "n":
                    case "negative":
                        if(!this.isNegativeFloat(fieldValue)) trueValue=false; break;
                    default: if(!this.isSignedFloat(fieldValue)) trueValue=false; break;
                }
                break;                        
            case "g":
            case "regexp":    
            case "regular-expression":    
                // Regular expression
                fieldRegExpression = this.getFieldAttribute(ind,"reg_expression|data-pattern");
                if(!this.isRegExpression(fieldRegExpression, fieldValue)) trueValue=false; break;
            case "i":
            case "int":
            case "integer":        
                // Integer
                switch(dataSubType){
                    case "s":
                    case "signed":
                        if(!this.isSignedInteger(fieldValue)) trueValue=false; break;
                    case "u":
                    case "unsigned":
                        if(!this.isInteger(fieldValue)) trueValue=false; break;
                    case "p":
                    case "positive":
                        if(!this.isPositiveInteger(fieldValue)) trueValue=false; break;
                    case "n":
                    case "negative":
                        if(!this.isNegativeInteger(fieldValue)) trueValue=false; break;
                    default:  if(!this.isSignedInteger(fieldValue)) trueValue=false; break;
                }
                break;
            case "l":
            case "login":
            case "username":    
                // Login
                if(!this.isLogin(fieldValue)) trueValue=false; break;
            case "m":
            case "phone":    
                // Phones
                switch(dataSubType){
                    case "m":
                    case "mobile":
                        if(!this.isMobPhoneNumber(fieldValue)) trueValue=false; break;
                    case "f":
                    case "fixed":
                        if(!this.isFixPhoneNumber(fieldValue)) trueValue=false; break;
                    case "i":
                    case "international":
                        if(!this.isInternationalPhoneNumber(fieldValue)) trueValue=false; break;
                    case "y":
                    case "any": 
                    default:
                        if(!this.isPhoneNumber(fieldValue)) trueValue=false; break;
                }
                break;                        
            case "n":
            case "numeric":    
                // Numeric
                if(!this.isNumeric(fieldValue, 3)) trueValue=false; break;
            case "p":
            case "password":    
                // Password
                if(!this.isPassword(fieldValue)) trueValue=false; break;                        
            case "r":
            case "radio":
            case "radiobutton":
                // Radio buttons
                if(isRequired=="r" || (isRequired != "" && isRequired != null)){
                    trueValue=false;
                    for(jnd=0; jnd < _vForm.elements.length; jnd++){
                        if(_vForm.elements[jnd].name == _vForm.elements[ind].name){
                            if(_vForm.elements[jnd].checked){
                                trueValue=true;
                                break; 
                            }
                        }
                    }                                
                }
                break;                        
            case "s":
            case "ssn":    
                // SSN 
                if(!this.isSSN(fieldValue)) trueValue=false; break;
            case "t":
            case "text":
                // Text
                switch(dataSubType){
                    case "u":
                    case "upper":
                        if(!this.isText(fieldValue) || !this.isUpper(fieldValue)) trueValue=false; break;
                    case "l":
                    case "lower":
                        if(!this.isText(fieldValue) || !this.isLower(fieldValue)) trueValue=false; break;
                    case "n":
                    case "normal":    
                    case "y":
                    case "any":
                    default:
                        if(!this.isText(fieldValue)) trueValue=false; break;
                }
                break;                        
            case "u":
            case "url":
                // URL
                if(!this.isURL(fieldValue)) trueValue=false; break;
            case "v":
            case "verified":
                // Validators
                if(!this.isValidateField(ind)){
                    trueValue=false;
                }else if(!this.equalValidateField(ind)){
                    if(_checkAllFields){
                        result["message"] = this.onNotEqualAlert(ind);
                    }else{
                        result["return"] = this.onNotEqualAlert(ind);
                    }
                    _isFound = true;
                }                              
                break;
            case "x":
            case "template":
                // Templates
                fieldTemplate = this.getFieldAttribute(ind,"template|data-template");
                if(!this.isTemplate(fieldTemplate, fieldValue)) trueValue=false; break;
            case "y":
            case "any":    
                // Any
                if(!this.isAny(fieldValue)) trueValue=false; break;
            case "z":
            case "zipcode":
            case "postcode":
                // Post (zip) code
                if(!this.isZipCode(fieldValue)) trueValue=false; break;
            default:
                if(dataType != null){
                    // dataType not found - search in plugins
                    for(var i=0;i<_plugins.length;i++){
                        if(_plugins[i]["name"] && dataType == _plugins[i]["name"]){
                            _pluginInd = i;
                            // create object reference                    
                            var pluginClass = window["Plugin_"+dataType];
                            _plugins[i]["obj"] = new pluginClass();
                            var params = '';
                            
                            // prepare parameters
                            var settings = _plugins[i]["obj"].getParams();
                            for(var j = 0; j < settings.length; j++){
                                if(params != "") params += "&";
                                params = settings[j]+"="+this.getFieldAttribute(ind,settings[j]);    
                            }
                           
                            // call validation method and pass field value and parameters
                            if(!_plugins[i]["obj"].validate(fieldValue, params)) trueValue=false;
                            break;
                        }
                    }
                }
                break;                     
        }

        if(!trueValue){
            if(dataType != "r" && dataType != "radio" && dataType != "radiobutton"){
                if(_checkAllFields){
                    result["message"] = this.onInvalidAlert(ind, dataType, dataSubType);    
                }else{
                    result["return"] = this.onInvalidAlert(ind, dataType, dataSubType);                
                }                                
            }else if(dataType == "r" || dataType == "radio" || dataType == "radiobutton"){
                // handle radiobuttons
                if(!_arrRaduoButtoms.has(_vForm.elements[ind].name)){
                    if(_checkAllFields){
                        result["message"] = this.onInvalidAlert(ind, dataType, dataSubType);                                            
                    }else{
                        result["return"] = this.onInvalidAlert(ind, dataType, dataSubType);                
                    }
                    _arrRaduoButtoms.push(_vForm.elements[ind].name);    
                }else{
                    if(_highlightMode == "errors" || _highlightMode == "all") this.highlightError(ind); 
                }
            }
            _isFound = true;
        }
        return result;        
    }


    /******************************************************************************
     * CAPTCHA METHODS
     *****************************************************************************/            
    /** 
     * Define captcha settings
     * @param captchaText
     * @param captchaInput
     * @param captchaCaseSensitive
     * @param captchaType
     */
    this.captchaSettings = function(captchaText, captchaInput, captchaCaseSensitive, captchaType){
        _captchaType = (captchaType != null && captchaType == "math") ? "math" : "random";
        _captchaText = (captchaText != null) ? captchaText : "";
        _captchaInput = (captchaInput != null) ? captchaInput : "";
        _captchaCaseSensitive = (captchaCaseSensitive != null) ? captchaCaseSensitive : false;
    };

    /** 
     * Draw Captcha
     */
    this.captchaDraw = function(focus){
        var code = "";
        var setFocus = (focus != null) ? focus : false;
        if(_captchaType == "math"){
            code = this.getRandomNum(0, 20)+" "+this.getRandomSign()+" "+this.getRandomNum(0, 20)+" = ?";            
        }else{
            for(var idx = 0; idx < 6; ++idx){
                code = code + this.getRandomChar(true, true, true, false, ((idx == 0) ? " " : ""));
            }
        }

        document.getElementById(_captchaText).innerHTML = code;
        document.getElementById(_captchaText).style.fontFamily  = "Georgia";
        document.getElementById(_captchaText).style.fontSize    = "14px";
        document.getElementById(_captchaText).style.fontStyle   = "italic";
        document.getElementById(_captchaText).style.fontWeight  = "bold";
        document.getElementById(_captchaText).style.backgroundColor = "#e1e2e3";
        document.getElementById(_captchaText).style.backgroundImage = "url(../formvalidator/images/captcha_bg.png)";
        document.getElementById(_captchaText).style.textAlign   = "center";
        document.getElementById(_captchaText).style.display     = "block";
        document.getElementById(_captchaText).style.width       = "117px";
        document.getElementById(_captchaText).style.height      = (document.all) ? "23px" : "19px";        
        document.getElementById(_captchaText).style.border      = "1px solid #d1d2d3";
        document.getElementById(_captchaText).style.paddingTop  = (document.all) ? "2px" : "1px";
        if(setFocus){
            document.getElementById(_captchaInput).focus();
            document.getElementById(_captchaInput).select();
        }
        
        if(document.all){ /* IE */
            document.getElementById(_captchaText).attachEvent("onselectstart", function(){return false;});    
        }else if(typeof document.getElementById(_captchaText).style.MozUserSelect != "undefined"){ /* FF */
            document.getElementById(_captchaText).style.MozUserSelect="none";
        }else{ /* other */
            document.getElementById(_captchaText).onmousedown=function(){return false};
        }
    };
    
    /**
     * Validate the entered value aganist the generated code 
     */ 
    this.captchaValidate = function(){
        var str1 = this.removeSpaces(document.getElementById(_captchaText).innerHTML);
        var str2 = this.removeSpaces(document.getElementById(_captchaInput).value);
        var sign = "";
        var parts = "";
        if(_captchaType == "math"){
            if(str1.indexOf("+") > 0){
                parts = str1.split("+");
                str1 = parseInt(parts[0]) + parseInt(parts[1]);
            }else if(str1.indexOf("-") > 0){
                parts = str1.split("-");
                str1 = parseInt(parts[0]) - parseInt(parts[1]);
            }else if(str1.indexOf("*") > 0){
                parts = str1.split("*");
                str1 = parseInt(parts[0]) * parseInt(parts[1]);                
            }            
            if(str1 == str2){
                return true;        
            }                    
        }else{
            if(_captchaCaseSensitive && str1 == str2){
                return true;        
            }else if(!_captchaCaseSensitive && str1.toLowerCase() == str2.toLowerCase()){
                return true;        
            }                    
        }
        document.getElementById(_captchaInput).focus();
        document.getElementById(_captchaInput).select();

        // find index of captcha field
        ind = 0;
        if(_alertOutputType == "singleerror"){
            for(i=0;i<_vForm.elements.length;i++){
                if(_vForm.elements[i].id == _captchaInput){
                    ind = i;
                    break;
                }
            }
        }

        if(_captchaType == "math"){
            this.outputAlert(fvVocabulary._MSG["MSG_WRONG_CAPTCHA_MATH"]+"\n", ind);
        }else{
            this.outputAlert(fvVocabulary._MSG["MSG_WRONG_CAPTCHA"]+"\n", ind);
        }
        return false;
    };
    
}
