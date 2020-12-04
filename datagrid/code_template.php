<?php
 
$pr_rid = isset($_REQUEST["pr_rid"]) ? $_REQUEST["pr_rid"] : "";
$pr_mode = isset($_REQUEST["pr_mode"]) ? $_REQUEST["pr_mode"] : "";
 
if(($pr_mode == "edit") || ($pr_mode == "details") || ($pr_mode == "add") || ($pr_mode == "cancel")){
    $_REQUEST["pr_mode"] = "view";
    $_REQUEST["pr_rid"] = "";
    if(($pr_mode == "cancel") && ($pr_rid == "-1")){
      $_REQUEST["pr_page_size"] = "";      
    }
}
 
## +---------------------------------------------------------------------------+
## | 1. Creating & Calling:                                                    |
## +---------------------------------------------------------------------------+
##  *** define a relative (virtual) path to datagrid.class.php file
##  *** directory (relatively to the current file)
##  *** RELATIVE PATH ONLY ***
define ("DATAGRID_DIR", "datagrid/");                    
require_once(DATAGRID_DIR."datagrid.class.php");
 
##  *** creating variables that we need for database connection    
$DB_USER = "root";
$DB_PASS = "root";      
$DB_HOST = "localhost";      
$DB_NAME = "radarcovid";      
 
##  *** put a primary key on the first place
$sql = "SELECT people.id, people.firstname, people.lastname FROM people";
 
##  *** set needed options and create a new class instance
$debug_mode = false;        /* display SQL statements while processing */    
$messaging = true;          /* display system messages on a screen */
$unique_prefix = "pr_";     /* prevent overlays - must be started with a letter */
$dgrid = new DataGrid($debug_mode, $messaging, $unique_prefix);
 
##  *** set data source with needed options
$default_order = array("id"=>"ASC");
$dgrid->DataSource("PDO", "mysql", $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS, $sql, $default_order);            
 
## +---------------------------------------------------------------------------+
## | 2. General Settings:                                                      |
## +---------------------------------------------------------------------------+
## +-- PostBack Submission Method ---------------------------------------------+
##  *** defines postback submission method for DataGrid: AJAX, POST(default) or GET
$postback_method = "post";
$dgrid->SetPostBackMethod($postback_method);
 
$modes = array(
  "add"  =>array("view"=>true, "edit"=>false, "type"=>"link", "show_add_button"=>"outside"),
  "edit"         =>array("view"=>false, "edit"=>true,  "type"=>"link", "byFieldValue"=>""),
  "details" =>array("view"=>false, "edit"=>false, "type"=>"link"),
  "delete"  =>array("view"=>true, "edit"=>true,  "type"=>"image")
);
$dgrid->SetModes($modes);
##  *** allow mulirow operations
$multirow_option = false;
$dgrid->AllowMultirowOperations($multirow_option);
 
##  *** set DataGrid caption
$dg_caption = "Presidents";
$dgrid->SetCaption($dg_caption);
 
## +---------------------------------------------------------------------------+
## | 3. Printing & Exporting Settings:                                         |
## +---------------------------------------------------------------------------+
##  *** set printing option: true(default) or false
$printing_option = false;
$dgrid->AllowPrinting($printing_option);
 
## +---------------------------------------------------------------------------+
## | 4. Sorting & Paging Settings:                                             |
## +---------------------------------------------------------------------------+
##  *** set paging option: true(default) or false
$paging_option = true;
$rows_numeration = false;
$numeration_sign = "N #";      
$dgrid->AllowPaging($paging_option, $rows_numeration, $numeration_sign);
##  *** set paging settings
$bottom_paging = array("results"=>true, "results_align"=>"left", "pages"=>true, "pages_align"=>"center", "page_size"=>true, "page_size_align"=>"right");
$top_paging = array();
$pages_array = array("10"=>"10", "25"=>"25", "50"=>"50", "100"=>"100", "250"=>"250", "500"=>"500", "1000"=>"1000");
$default_page_size = 10;
$dgrid->SetPagingSettings($bottom_paging, $top_paging, $pages_array, $default_page_size);
 
## +---------------------------------------------------------------------------+
## | 5. Filter Settings:                                                       |
## +---------------------------------------------------------------------------+
##  *** set filtering option: true or false(default)
$filtering_option = true;
$show_search_type = false;
$dgrid->AllowFiltering($filtering_option, $show_search_type);
##  *** set aditional filtering settings
$filtering_fields = array(
  "id"=>array("table"=>"people", "field"=>"firstname", "source"=>"self", "show_operator"=>false, "default_operator"=>"like%", "order"=>"ASC", "type"=>"textbox", "case_sensitive"=>false, "comparison_type"=>"string"),
);
$dgrid->SetFieldsFiltering($filtering_fields);
 
## +---------------------------------------------------------------------------+
## | 6. View Mode Settings:                                                    |
## +---------------------------------------------------------------------------+
##  *** set view mode table properties
$vm_table_properties = array("width"=>"95%");
$dgrid->SetViewModeTableProperties($vm_table_properties);  
$vm_columns = array(
   "id" => array("header"=>"ID", "type"=>"label", "align"=>"left", "width"=>"", "wrap"=>"nowrap", "text_length"=>"-1", "tooltip"=>false, "tooltip_type"=>"simple", "case"=>"normal", "summarize"=>"false", "sort_by"=>"", "visible"=>"true", "on_js_event"=>""),
   "firstname" => array("header"=>"firstname", "type"=>"label", "align"=>"left", "width"=>"", "wrap"=>"nowrap", "text_length"=>"-1", "tooltip"=>false, "tooltip_type"=>"simple", "case"=>"normal", "summarize"=>"false", "sort_by"=>"", "visible"=>"true", "on_js_event"=>""),
   "lastname" => array("header"=>"lastname", "type"=>"label", "align"=>"left", "width"=>"", "wrap"=>"nowrap", "text_length"=>"-1", "tooltip"=>false, "tooltip_type"=>"simple", "case"=>"normal", "summarize"=>"false", "sort_by"=>"", "visible"=>"true", "on_js_event"=>""),
);
$dgrid->SetColumnsInViewMode($vm_columns);
 
 
## +---------------------------------------------------------------------------+
## | 7. Add/Edit/Details Mode Settings:                                        |
## +---------------------------------------------------------------------------+
##  *** set add/edit mode table properties
$em_table_properties = array("width"=>"95%");
$dgrid->SetEditModeTableProperties($em_table_properties);
##  *** set details mode table properties
$dm_table_properties = array("width"=>"95%");
$dgrid->SetDetailsModeTableProperties($dm_table_properties);
##  ***  set settings for add/edit/details modes
$table_name  = "demo_presidents";
$primary_key = "id";
$condition   = "";
$dgrid->SetTableEdit($table_name, $primary_key, $condition);
##  *** set columns in edit mode
$em_columns = array(
  "id" => array("header"=>"id", "type"=>"textbox",  "align"=>"left", "req_type"=>"rt", "width"=>"120px", "title"=>"Name", "readonly"=>false, "maxlength"=>"-1", "default"=>"", "unique"=>false, "unique_condition"=>"", "visible"=>"true", "on_js_event"=>""),
  "firstname" => array("header"=>"firstname", "type"=>"textbox", "align"=>"left",  "req_type"=>"rt", "width"=>"120px", "title"=>"Country", "readonly"=>false, "maxlength"=>"-1", "default"=>"", "unique"=>false, "unique_condition"=>"", "visible"=>"true", "on_js_event"=>""),
  "lastname" => array("header"=>"lastname", "type"=>"date",  "req_type"=>"st", "width"=>"187px", "title"=>"", "readonly"=>"false", "maxlength"=>"-1", "default"=>"", "unique"=>"false", "unique_condition"=>"", "visible"=>"true", "on_js_event"=>"", "calendar_type"=>"floating"),
);
$dgrid->SetColumnsInEditMode($em_columns);
 
 
## +---------------------------------------------------------------------------+
## | 8. Bind the DataGrid:                                                     |
## +---------------------------------------------------------------------------+
##  *** bind the DataGrid and draw it on the screen
$dgrid->Bind();        
 
?>