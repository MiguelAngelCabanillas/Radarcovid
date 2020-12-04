/***
 *  ApPHP DataGrid Pro (AJAX enabled)                                          
 *  Developed by:  ApPHP <info@apphp.com>                                       
 *  License:       GNU LGPL v.3                                                
 *  Site:          https://www.apphp.com/php-datagrid/                          
 *  Copyright:     ApPHP DataGrid (c) 2006-2017. All rights reserved.
 *  Last modified: 02.10.2012 11:52
 **/

function _dgSkipToAnchor(unique_prefix){
   var unique_prefix_ = (unique_prefix == null) ? '' : unique_prefix;
   var currentHref = window.location.href;
   window.location.href = currentHref.substr(0, currentHref.lastIndexOf('#')) + '#' + unique_prefix_ + 'top';
}

function _dgBlockedInDemo(){
   alert(DGVocabulary._MSG['alert_blocked_in_demo']);
   return true; 
}

function _dgIsCookieAllowed(){
   _dgSetCookie('cookie_allowed',1,10); 
   if(_dgReadCookie('cookie_allowed') != 1) { alert(DGVocabulary._MSG['cookies_required']); return false; }; 
   return true; 
}

function _dgSetCookie(name, value, days) {
   if(days){
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = '; expires='+date.toGMTString();
   }
   else var expires = '';
   document.cookie = name+'='+value+expires+'; path=/';
}

function _dgReadCookie(name) {
   var nameEQ = name + '=';
   var ca = document.cookie.split(';');
   for(var i=0; i < ca.length; i++){
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

// load new event 
function _dgAddDgLoadEvent(func) {
   var oldonload = window.onload;
   if(typeof window.onload != 'function'){
      window.onload = func;
   }else{
      window.onload = function(){
         oldonload();
         func();
      }
   }
}

// hide/unhide Filtering
function _dgHideUnHideFiltering(type, unique_prefix){
   if(!_dgIsCookieAllowed()) return false;
   var unique_prefix_ = (unique_prefix == null) ? '' : unique_prefix;
   if(type == 'hide'){
      jQuery('#'+unique_prefix_+'searchset').animate({ opacity: 0.25 }, 150, function() { jQuery('#'+unique_prefix_+'searchset').hide(); });
      jQuery('#'+unique_prefix_+'a_hide').hide();
      jQuery('#'+unique_prefix_+'a_unhide').show();
      _dgSetCookie(unique_prefix_+'hide_search',1,1); 
   }else{
      jQuery('#'+unique_prefix_+'searchset').show();
      jQuery('#'+unique_prefix_+'searchset').animate({ opacity: 1.0 }, 200, function() { /* animation complete */ });
      jQuery('#'+unique_prefix_+'a_hide').show();
      jQuery('#'+unique_prefix_+'a_unhide').hide();
      _dgSetCookie(unique_prefix_+'hide_search',0,1); 
   }
   return true;
}

// reload form with some action, saving entered data
function _dgFormAction(file_act, file_id, unique_prefix, http_url, query_string, postback_method, mode, full_field_name){
   var unique_prefix_   = (unique_prefix==null) ? '' : unique_prefix;
   var http_url        = (http_url==null) ? '' : http_url;
   var query_string    = (query_string==null) ? '' : query_string;
   var postback_method = (postback_method==null) ? 'get' : postback_method;
   var mode            = (mode==null) ? 'edit' : mode;
   var full_field_name = (full_field_name==null) ? '' : full_field_name;

   if(postback_method == 'post' || postback_method == 'ajax'){
      if(file_act == '' && file_id == ''){
         //[#0034 10.04.11] - document.getElementById(unique_prefix_+'mode').value = mode;
         document.getElementById(unique_prefix_+'frmEditRow')[unique_prefix_+'mode'].value = mode;
         document.getElementById(unique_prefix_+'frmEditRow').action=http_url+'?'+query_string;      
      }else{
         if(!_dgCheckFile(full_field_name)) return false;
         //[#0034 10.04.11] - document.getElementById(unique_prefix_+'mode').value = mode;         
         document.getElementById(unique_prefix_+'frmEditRow')[unique_prefix_+'mode'].value = mode;         
         var input = document.createElement('input'); input.setAttribute('type', 'hidden'); input.setAttribute('name', unique_prefix_+'file_act'); input.setAttribute('id', unique_prefix_+'file_act'); input.setAttribute('value', unescape(file_act));
         document.getElementById(unique_prefix_+'frmEditRow').appendChild(input);
         var input = document.createElement('input'); input.setAttribute('type', 'hidden'); input.setAttribute('name', unique_prefix_+'file_id'); input.setAttribute('id', unique_prefix_+'file_id'); input.setAttribute('value', unescape(file_id));
         document.getElementById(unique_prefix_+'frmEditRow').appendChild(input);
         document.getElementById(unique_prefix_+'frmEditRow').action=http_url+'?'+query_string;
      }
   }else{
      if(file_act == '' && file_id == ''){
         document.getElementById(unique_prefix_+'frmEditRow').action=http_url+'?'+query_string;            
      }else{
         if(!_dgCheckFile(full_field_name)) return false;
         document.getElementById(unique_prefix_+'frmEditRow').action=http_url+'?'+query_string+((query_string!='')?'&':'')+unique_prefix_+'file_act='+file_act+'&'+unique_prefix_+'file_id='+file_id;            
      }
   }

   document.getElementById(unique_prefix_+'frmEditRow').encoding='multipart/form-data';
   document.getElementById(unique_prefix_+'frmEditRow').method='POST';
   document.getElementById(unique_prefix_+'frmEditRow').submit();
}

// calendar script (popup)
function _dgOpenCalendar(directory, params, form, req_type, field, type) {
   if(type != 'time') height = '240'; else height = '100';
   window.open(directory+'modules/calendar/calendar.php?'+params, 'calendar', 'width=220, height='+height+', status=yes');
   if(req_type.length > 0){
      dateField = eval('document.' + form + '.' + req_type);
   }else{
      dateField = eval('document.' + form + '.' + field);
   }
   dateType = type;
}

// refill days according ion selected month
function _dgRefillDaysInMonth(date_field, year, month)
{
   var dayDDL = (document.getElementById(date_field+'__nc_day') != null) ? document.getElementById(date_field+'__nc_day') : false;
   var days_in_month = 32 - new Date(year, month-1, 32).getDate();
   //alert(days_in_month);
   if(dayDDL && month != ''){
      for(i = 1; i <= 31; i++){
         if(i > days_in_month) dayDDL.options[i].disabled = true;
         else dayDDL.options[i].disabled = false;
      }
      if(dayDDL.options[dayDDL.selectedIndex].disabled){
         dayDDL.selectedIndex = days_in_month;
      }
   }else if(month == ''){
      for(i = 1; i <= 31; i++){
         dayDDL.options[i].disabled = false;
      }      
   }   
}

// set calendar datetime for ddl's
function _dgSetCalendarDate(frm, date_field, datetime_format, date_value, year_start, is_default)
{
   year    = (document.getElementById(date_field+'__nc_year')   != null) ? document.getElementById(date_field+'__nc_year').value : '0000';
   month   = (document.getElementById(date_field+'__nc_month')  != null) ? document.getElementById(date_field+'__nc_month').value : '00';
   day     = (document.getElementById(date_field+'__nc_day')    != null) ? document.getElementById(date_field+'__nc_day').value : '00';
   hour    = (document.getElementById(date_field+'__nc_hour')   != null) ? document.getElementById(date_field+'__nc_hour').value : '00';
   minute  = (document.getElementById(date_field+'__nc_minute') != null) ? document.getElementById(date_field+'__nc_minute').value : '00';
   second  = (document.getElementById(date_field+'__nc_second') != null) ? document.getElementById(date_field+'__nc_second').value : '00';
   date_value = (date_value != null) ? date_value : '';
   year_start = (year_start != null) ? year_start : '0';
   is_default = (is_default != null) ? is_default : true;

   if(date_value != ''){
      // Set date if datetime link was clicked / or by default
      if(datetime_format.match('d-m-Y') && is_default){
         // nothing
      }else{
         document.getElementById(date_field).value = date_value;         
      }
      year    = date_value.substring(0,4);
      month   = date_value.substring(5,7);
      day     = date_value.substring(8,10);
      hour     = date_value.substring(11,13);
      minute   = date_value.substring(14,16);
      second   = date_value.substring(17,19);

      if(datetime_format.match('d-m-Y') && !is_default){
         day    = date_value.substring(0,2);
         month  = date_value.substring(3,5);
         year   = date_value.substring(6,10);
      }else if(datetime_format.match('m-d-Y') && !is_default){
         day    = date_value.substring(3,5);
         month  = date_value.substring(0,2);
         year   = date_value.substring(6,10);         
      }else if(datetime_format.match('d-m-Y') && is_default){
         if(year.match('-')){
            day    = date_value.substring(0,2);
            month  = date_value.substring(3,5);            
            year   = date_value.substring(6,10);                     
         }         
      }else if(datetime_format.length <= 5 && (datetime_format.match('H:i:s') || datetime_format.match('H:i'))){
         hour     = date_value.substring(0,2);
         minute   = date_value.substring(3,5);
         second   = date_value.substring(6,8);
      }
      
      if((datetime_format == 'Y-m-d') || (datetime_format == 'd-m-Y')){
         document.getElementById(date_field+'__nc_year').selectedIndex = year-year_start+1;
         document.getElementById(date_field+'__nc_month').selectedIndex = month;
         document.getElementById(date_field+'__nc_day').selectedIndex = day;
      }else if((datetime_format == 'Y-m-d H:i:s') || (datetime_format == 'm-d-Y H:i:s') || (datetime_format == 'd-m-Y H:i:s') || (datetime_format == 'd-m-Y H:i') || (datetime_format == 'Y-m-d H:i')){         
         document.getElementById(date_field+'__nc_year').selectedIndex = parseInt(year - year_start) + parseInt('1');
         document.getElementById(date_field+'__nc_month').selectedIndex = month;
         document.getElementById(date_field+'__nc_day').selectedIndex = day;
         document.getElementById(date_field+'__nc_hour').selectedIndex = parseInt(_dgTrimNumber(hour)) + parseInt('1');
         document.getElementById(date_field+'__nc_minute').selectedIndex = parseInt(_dgTrimNumber(minute)) + parseInt('1');
         if(datetime_format != 'd-m-Y H:i' && datetime_format != 'Y-m-d H:i') document.getElementById(date_field+'__nc_second').selectedIndex = parseInt(_dgTrimNumber(second)) + parseInt('1');
      }else if(datetime_format == 'm-d-Y'){
         document.getElementById(date_field+'__nc_year').selectedIndex = parseInt(year - year_start) + parseInt('1');
         document.getElementById(date_field+'__nc_month').selectedIndex = month;
         document.getElementById(date_field+'__nc_day').selectedIndex = day;
      }else if((datetime_format == 'H:i:s') || (datetime_format == 'H:i')){
         document.getElementById(date_field+'__nc_hour').selectedIndex = parseInt(_dgTrimNumber(hour)) + parseInt('1');
         document.getElementById(date_field+'__nc_minute').selectedIndex = parseInt(_dgTrimNumber(minute)) + parseInt('1');
         if(datetime_format == 'H:i:s') document.getElementById(date_field+'__nc_second').selectedIndex = parseInt(_dgTrimNumber(second)) + parseInt('1');
      }else{         
         document.getElementById(date_field+'__nc_year').selectedIndex = parseInt(year - year_start) + parseInt('1');
         document.getElementById(date_field+'__nc_month').selectedIndex = month;
         document.getElementById(date_field+'__nc_day').selectedIndex = day;
      }
   }else{
      // Fix for maximum days in month
      var max_days_in_month = 32 - new Date(year, month-1, 32).getDate();
      if(day > max_days_in_month) day = max_days_in_month;
      
      // Set date if ddl was changed                    
      if(datetime_format == 'Y-m-d'){
         document.getElementById(date_field).value = year+'-'+month+'-'+day;
      }else if(datetime_format == 'd-m-Y'){
         document.getElementById(date_field).value = day+'-'+month+'-'+year;
      }else if(datetime_format == 'm-d-Y'){
         document.getElementById(date_field).value = month+'-'+day+'-'+year;
      }else if(datetime_format == 'Y-m-d H:i:s'){
         document.getElementById(date_field).value = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
      }else if(datetime_format == 'Y-m-d H:i'){
         document.getElementById(date_field).value = year+'-'+month+'-'+day+' '+hour+':'+minute;
      }else if(datetime_format == 'd-m-Y H:i:s'){
         document.getElementById(date_field).value = day+'-'+month+'-'+year+' '+hour+':'+minute+':'+second;
      }else if(datetime_format == 'd-m-Y H:i'){
         document.getElementById(date_field).value = day+'-'+month+'-'+year+' '+hour+':'+minute;
      }else if(datetime_format == 'm-d-Y H:i:s'){
         document.getElementById(date_field).value = month+'-'+day+'-'+year+' '+hour+':'+minute+':'+second;
      }else if(datetime_format == 'm-d-Y H:i'){
         document.getElementById(date_field).value = month+'-'+day+'-'+year+' '+hour+':'+minute;
      }else if(datetime_format == 'H:i:s'){
         document.getElementById(date_field).value = hour+':'+minute+':'+second;
      }else if(datetime_format == 'H:i'){
         document.getElementById(date_field).value = hour+':'+minute;
      }else{
         document.getElementById(date_field).value = year+'-'+month+'-'+day;
      }
   }
   // Clear date field if was entered date empty
   var date_field_length = document.getElementById(date_field).value.length;
   if(date_field_length != 5 && date_field_length != 8 && date_field_length != 10 && date_field_length != 16 && date_field_length != 19){
      document.getElementById(date_field).value = '';
   }

   if((datetime_format != 'H:i') && (datetime_format != 'H:i:s')){
      _dgRefillDaysInMonth(date_field, year, month);      
   }
}

// generate password
function _dgGetRandomNum(lbound, ubound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}

function _dgGetRandomChar(number, lower, upper, other, extra) {
   var numberChars = '0123456789';
   var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
   var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\',<.>/? ";
   var charSet = extra;
   if (number == true) charSet += numberChars;
   if (lower == true) charSet += lowerChars;
   if (upper == true) charSet += upperChars;
   if (other == true) charSet += otherChars;
   return charSet.charAt(_dgGetRandomNum(0, charSet.length));
}

function _dgGeneratePassword(length) {
   extraChars = '';
   firstNumber = true; firstLower = true; firstUpper = true; firstOther = false;
   latterNumber = true; latterLower = true; latterUpper = true; latterOther = false;
   var rc = '';
   if (length > 0) rc = rc + _dgGetRandomChar(firstNumber, firstLower, firstUpper, firstOther, extraChars);
   for (var idx = 1; idx < length; ++idx) {
      rc = rc + _dgGetRandomChar(latterNumber, latterLower, latterUpper, latterOther, extraChars);
   }
   return rc;
}

// reset dropdown box
function _dgResetDDL(el, refresh){
   var refresh_ = (refresh != null) ? refresh : false;
   if(document.getElementById(el)){
      document.getElementById(el).selectedIndex = 0;
      if(refresh_){
         for(i = 1; i <= 31; i++){
            document.getElementById(el).options[i].disabled = false;
         }         
      }      
   }
}

// verify selected records
function _dgJsVerifySelected(unique_prefix, row_lower, row_upper, postback_method, random_string, param, flag_name, flag_value, operation_type, http_get_vars_part, sel_el){
   var operation_randomize_code = '';
   var sel_el_ = (sel_el != null) ? sel_el : false;
   
   // check if there is a select box + assign flag_name and flag_value
   if(sel_el_){
      for(i=0;i<sel_el_.length;i++){
         if(sel_el_[i].value == operation_type){
            flag_name = sel_el_[i].getAttribute('flag_name');
            flag_value = sel_el_[i].getAttribute('flag_value');       
            break;
         }
      }
   }
   
   if(operation_type == 'delete' || operation_type == 'clone'){
      var operation_type_name = (operation_type == 'delete' || operation_type == 'clone') ? '_'+operation_type : '';
      if(!confirm(DGVocabulary._MSG['alert_perform_operation'+operation_type_name])) { if(sel_el_) sel_el_.selectedIndex = 0; return false; }
      operation_randomize_code = '&'+unique_prefix+'_operation_randomize_code='+random_string;
   }   
   selected_rows = '&'+unique_prefix+'rid=';
   selected_rows_ids = '';
   found = 0;
   for(i=row_lower; i < row_upper; i++){
      if(document.getElementById(unique_prefix+'checkbox_'+i) && document.getElementById(unique_prefix+'checkbox_'+i).checked == true){
         if(found == 1){ selected_rows_ids += '-'; }
         selected_rows_ids += document.getElementById(unique_prefix+'checkbox_'+i).value;
         found = 1;
      }
   }
   if(found){
      document_location_href = param+selected_rows+selected_rows_ids+operation_randomize_code;
      if(flag_name != ''){                            
         found = (document_location_href.indexOf(flag_name) != -1);
         if(!found){
            if(flag_name) document_location_href += '&'+flag_name+'='+flag_value;
         }
      }
      if(postback_method == 'ajax') _dgDoSimpleRequest(unique_prefix, document_location_href.replace(/&amp;/g, '&'), http_get_vars_part, 'post');
      else if(postback_method == 'post') _dgDoSimpleRequest(unique_prefix, document_location_href.replace(/&amp;/g, '&'), http_get_vars_part, postback_method);
      else window.location.href = document_location_href.replace(/&amp;/g, '&');
   }else{            
      alert(DGVocabulary._MSG['alert_select_row']);
      if(sel_el_) sel_el_.selectedIndex = 0;
      return false;
   }
   return true;
}

// send edit mode fields
function _dgJsSendEditFields(unique_prefix, browser_name, js_validation_errors, upload_type){
   var result_value = true;
   var on_submit_my_check = true;
   var upload_type_ = (upload_type != null) ? upload_type : 'by_one';
   if(window[unique_prefix+'onSubmitMyCheck']){ if(!window[unique_prefix+'onSubmitMyCheck']()){ on_submit_my_check = false; } };
   // two different parts of code to find & save wysiwyg editor data
   
   if(browser_name == 'Firefox'){
      result_value = window['_dgUpdateWysiwygFieldsFF'](unique_prefix, true, upload_type_);
   }else{ // 'MSIE' or other
      result_value = window['_dgUpdateWysiwygFieldsIE'](unique_prefix, true, upload_type_);
   };
   var frmEditRow = document.getElementById(unique_prefix+'frmEditRow');
   if(result_value == true && on_submit_my_check == true && jsFormValidator.onSubmitCheck(document.forms[unique_prefix+'frmEditRow'], js_validation_errors)){
	  frmEditRow.submit();		
   }else{
      false;
   }
}

function _dgUpdateWysiwygFieldsIE(unique_prefix, perform_check, upload_type){
   var result_value_ie = true;
   var perform_check_ = (perform_check != null) ? perform_check : true;
   var frmEditRow = document.getElementById(unique_prefix+'frmEditRow');
   var upload_type_ = (upload_type != null) ? upload_type : 'by_one';

   for(var idx=0; idx < frmEditRow.length; idx++){
      field_name = frmEditRow.elements.item(idx).name;                    
      field_type = frmEditRow.elements.item(idx).type;
      
      // check file or image fields
      if(field_type == 'file' && perform_check_){
         if(upload_type_ == 'all'){
            frmEditRow.encoding='multipart/form-data';
         }else{
            field_type_hidden = document.getElementById(field_name).type;
            if(field_type_hidden == 'file' && document.getElementById(field_name).value != ''){
               alert(DGVocabulary._MSG['need_upload_file']);            
               return false;
            }            
         }
      }
      field_full_name = 'wysiwyg' + field_name;                    
      if(document.getElementById(field_full_name)){
         document.getElementById(field_name).value = document.getElementById(field_full_name).contentWindow.document.body.innerHTML;                        
         if((document.getElementById(field_name).value == '<br>') || (document.getElementById(field_name).value == '<P>&nbsp;</P>') || (document.getElementById(field_name).value == '&lt;P&gt;&nbsp;&lt;/P&gt;')){
            document.getElementById(field_name).value = '';
         }
      }
   }
   return result_value_ie;
}

function _dgUpdateWysiwygFieldsFF(unique_prefix, perform_check, upload_type){
   var result_value_ff = true;
   var perform_check_ = (perform_check != null) ? perform_check : true;
   var frmEditRow = document.getElementById(unique_prefix+'frmEditRow');
   var upload_type_ = (upload_type != null) ? upload_type : 'by_one';
   
   elements = document.getElementsByTagName('*');
   for(var idx = 0; idx < elements.length; idx++){
      node = elements.item(idx);
      field_name = node.getAttribute('name');
      field_type = node.getAttribute('type');
      // check file or image fields
      if(field_type == 'file' && perform_check_){
         if(upload_type_ == 'all'){
            frmEditRow.encoding='multipart/form-data';
         }else{
            field_type_hidden = document.getElementById(field_name).type;
            if(field_type_hidden == 'file' && document.getElementById(field_name).value != ''){
               alert(DGVocabulary._MSG['need_upload_file']);
               return false;
            }
         }
      }
      field_full_name = 'wysiwyg' + field_name;                        
      if(document.getElementById(field_full_name)){
         document.getElementById(field_name).value = document.getElementById(field_full_name).contentWindow.document.body.innerHTML;                            
         if((document.getElementById(field_name).value == '<br>') || (document.getElementById(field_name).value == '<p>&nbsp;</p>') || (document.getElementById(field_name).value == '<p> </p>') || (document.getElementById(field_name).value == '&lt;p&gt;&nbsp;&lt;/p&gt;')){
            document.getElementById(field_name).value = '';
         }
      }
   }
   return result_value_ff;
}

function _dgChangeColor(el, color){
   if(document.getElementById(el)){
      document.getElementById(el).style.backgroundColor = color;      
   }
}

function _dgSetCheckboxes(unique_prefix, row_lower, row_upper, row_color_5, row_color_0, row_color_1, check){
   if(check){
      for(i=row_lower; i < row_upper; i++){
         if(document.getElementById(unique_prefix+'checkbox_'+i)){
            document.getElementById(unique_prefix+'checkbox_'+i).checked = true;
            if(document.getElementById(unique_prefix+'row_'+i)){
               document.getElementById(unique_prefix+'row_'+i).style.background = row_color_5;
            }
         }
      }
   }else{
      for(i=row_lower; i < row_upper; i++){
         if(document.getElementById(unique_prefix+'checkbox_'+i)){
            document.getElementById(unique_prefix+'checkbox_'+i).checked = false;
            if((i % 2) == 0) row_color_back = row_color_0;
            else row_color_back = row_color_1;
            if(document.getElementById(unique_prefix+'row_'+i)){
               document.getElementById(unique_prefix+'row_'+i).style.background = row_color_back;
            }
         }
      }                
   }  
}

function _dgSetFocus(el){
   if(el && (el.style.display != 'none') && !el.disabled){
      el.focus();
   }   
}

function _dgStopPropagation(e){
   if(window.event){
	  e.cancelBubble = true; // IE
   }else{
      e.stopPropagation(); // others
   }
}

function _dgDoSimpleRequest(unique_prefix, url, http_get_vars_part, postback_method){
   if(postback_method == 'post'){
      var res = '';
      url = url.replace('?', '');
      var vars = url.split('&');
      var pair = '';
      for(var i=0;i<vars.length;i++){ 
         pair = vars[i].split('='); 
         var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', pair[0]);
            input.setAttribute('id', pair[0]);
            input.setAttribute('value', unescape(pair[1]));
         document.getElementById(unique_prefix+'frmMain').appendChild(input);
      }
      if(http_get_vars_part != '') document.getElementById(unique_prefix+'frmMain').action = http_get_vars_part;
      document.getElementById(unique_prefix+'frmMain').submit();      
   }else{
      window.location.href = url;   
   }
}

function _dgAutoSuggest(fp_handler, fp_maxresults, fp_shownoresults, bsn_auto_suggest){
   var options = {
      script        : fp_handler+'?json=true&limit='+fp_maxresults+'&',
      varname       : 'input',
      json          : true,
      shownoresults : fp_shownoresults,
      maxresults    : fp_maxresults
   };
   var as_json = new bsn.AutoSuggest(bsn_auto_suggest, options);
}

function _dgCheckFile(file_id){
   var size = '';
   var fileupload = '';
   var max_size = '';
   var max_size_in_kb = '';
   var allowed_extensions = '';
   var file_name = '';

   if(file_id != ''){
      max_size = document.getElementById(file_id).getAttribute('dg_file_maxsize');
      if(max_size == ''){
         // no attribute is defined - use default PHP value
         return true;
      }
      max_size_in_kb = parseFloat(max_size / 1024).toFixed(2)+' Kb';
      allowed_extensions = document.getElementById(file_id).getAttribute('dg_allowed_extensions');
      file_name = document.getElementById(file_id).value;

      if(navigator.appVersion.indexOf('MSIE') != -1){      
         try{
            var myFSO = new ActiveXObject('Scripting.FileSystemObject');
            var filepath = document.getElementById(file_id).value;
            var thefile = myFSO.getFile(filepath);
            size = thefile.size;
         }catch(err){
            //alert(err.message);
            //return true;         
         }
      }else{
         fileupload = document.getElementById(file_id);
         if(fileupload.files && fileupload.files.length > 0){
            if(navigator.userAgent.indexOf("Opera") != '-1'){ /* check for opera */               
               size = fileupload.files[0].size;
            }else if(fileupload.files.item(0).fileSize){
               size = fileupload.files.item(0).fileSize;
            }else if(fileupload.files.item(0).size){
               size = fileupload.files.item(0).size;
            }
         }
      }      
      if(file_name != '' && allowed_extensions != ''){
         var ext = file_name.substr(file_name.lastIndexOf('.') + 1).toLowerCase();
         if(allowed_extensions.indexOf(ext) == -1){
            alert(DGVocabulary._MSG['extension_not_allowed'] + '\n' + DGVocabulary._MSG['please_reenter']);
            return false;
         }
      }      
      if(size != '' && size > max_size){
         alert(DGVocabulary._MSG['upload_file_size_alert'] + max_size_in_kb + '!\n' + DGVocabulary._MSG['please_reenter']);
         return false;
      }
   }   
   return true;         
}

function _dgClearFileInputField(el){
   document.getElementById('ufd_'+el).innerHTML = document.getElementById('ufd_'+el).innerHTML;
   // works for all browsers, excluding IE
   // document.getElementById(el).value = '';   
   return true; 
}

// remove leading zero
function _dgTrimNumber(s) {
   while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1,9999); }
   return s;
}

// set scrolling settings
function _dgSetScrolling(unique_prefix, height_size){
   jQuery(document).ready(function($){
      jQuery('#'+unique_prefix+'_contentTable').tableScroll({height:height_size});
   });
}

// set filtering fields
function _dgSetFiltering(unique_prefix, fields_list, field_value){
   var vars = fields_list.split('#');
   for(var i=0; i<vars.length; i++){ 
      jQuery('#'+unique_prefix+'_ff_'+vars[i]).val(field_value);
   }   
}

// draws print view 
function _dgPopupPrint(unique_prefix, css_class){
   var template_file = '';
   var div_id = '';
   var css_style = '';
   var u_prefix = (unique_prefix != null) ? unique_prefix : '';
   var c_class = (css_class != null) ? css_class : '';
   var new_window = window.open('','blank','location=0,status=0,toolbar=0,height=500,width=800,scrollbars=yes,resizable=1,screenX=100,screenY=100');
   if(window.focus) new_window.focus();
    
   var message = $("#"+u_prefix+"_contentTable").html();
   message1 = $('<table>'+message+'</table>');

   $(message1).find('*').removeAttr('onmouseover');
   $(message1).find('*').removeAttr('onmouseout');
   $(message1).find('*').removeAttr('onclick');
   $(message1).find('*').removeAttr('style');
   $(message1).find('*').removeAttr('id');
   $(message1).find('*').removeAttr('cellpadding');
   $(message1).find('*').removeAttr('cellspacing');
   $(message1).find('*').removeAttr('title');
   $(message1).find('*').removeAttr('name');
   $(message1).find('*').removeAttr('for');
   $(message1).find('a').removeAttr('class');
   $(message1).find('a').removeAttr('href');
   $(message1).find('tr').removeAttr('class');
   $(message1).find('th').removeClass(c_class+'_dg_th');
   //$(message1).find('td').removeAttr('class'); don't remove dg-no-print
   $(message1).find('img').removeAttr('class');
   $(message1).find('*').removeClass('dg_nowrap');
   $(message1).find('*').removeClass(c_class+'_dg_label');
   $(message1).find('*').removeClass(c_class+'_dg_th_normal');
   $(message1).find('*').removeClass(c_class+'_dg_td');
   $(message1).find('*').removeClass(c_class+'_dg_td_main');
   $(message1).find('*').removeClass(c_class+'_dg_td_selected');
   $(message1).find('*').removeClass('dg_left');
   $(message1).find('select').each(function(){
      $(this).after($(this).find('option:selected').text());
      $(this).remove();
   });

   message = $(message1).html();

   message = message.replace(/<img[^>]*>/g, '&nbsp;');
   message = message.replace(/<input[^>]*>/g, '&nbsp;');
   message = message.replace(/<textarea[^>]*>/g, '&nbsp;');
   message = message.replace(/<\/textarea[^>]*>/g, '&nbsp;');
   message = message.replace(/<b[^>]*>/g, '&nbsp;');
   message = message.replace(/<\/b[^>]*>/g, '&nbsp;');
   message = message.replace(/<select[^>]*>/g, '&nbsp;');

   css_style = '<style>';
   css_style += 'table, caption, tbody, tfoot, thead, tr, th, td {margin:0; padding:0; border:0; outline:0; font-weight:inherit; font-style:inherit; font-size:100%; font-family:inherit; vertical-align:baseline; }';
   css_style += 'caption {height:24px;padding:4px 5px; text-align:right; background-color:#e1e2e3;}';
   css_style += 'table { width:99%;text-align:left; border:1px solid #ddd; border-spacing:0px; margin-top:5px;  }';
   css_style += 'table table { border:0px; }';
   css_style += 'table thead th { line-height:30px; background-color:#efefef; border-top:1px solid #ccc; }';
   css_style += 'table tbody tr { }';
   css_style += 'table tbody tr td{ vertical-align:middle; border-top:1px solid #ccc; padding-left:2px; }';
   css_style += 'table tbody tr td table tr td { border:0px; }';
   css_style += 'table tbody tr:nth-child(2n+1) td{ background-color:#f9f9f9; }';
   css_style += 'table tbody tr td img{ border:0px; }';
   css_style += 'table thead tr th a{ color:#151515; }';
   css_style += 'table label { border:0px; }';
   css_style += '@media print { .non-printable { display:none; } }	';
   css_style += '.dg-no-print { display:none; } ';
   css_style += '</style>';
   message = '<html><head>'+css_style+'</head><body><table><caption class="non-printable">[ <a href=\"javascript:void(0);\" onclick=\"javascript:window.print();\">Print</a> ] [ <a href=\"javascript:void(0);\" onclick=\"javascript:window.close();\">Close</a> ]</caption>' + message + '</table></body></html>';
    
   new_window.document.open();
   new_window.document.write(message);
   new_window.document.close();
}