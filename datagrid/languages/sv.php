<?php
//------------------------------------------------------------------------------ 		
//*** Swedish (sv)
//------------------------------------------------------------------------------ 		
function setLanguageSv(){ 
    $lang['='] = "=";  // "equal";
    $lang['!='] = "!="; // "not equal"; 
    $lang['>'] = ">";  // "bigger";
    $lang['>='] = ">=";  // "bigger or equal";
    $lang['<'] = "<";  // "smaller";
    $lang['<='] = "<=";  // "smaller or equal";            
    $lang['add'] = "Ny"; 
    $lang['add_new'] = "+ Lägg till ny"; 
    $lang['add_new_record'] = "Lägg till ny post";
    $lang['add_new_record_blocked'] = "Säkerhetskontroll: försök att lägga till ett nytt rekord! Kontrollera dina inställningar, är åtgärden inte tillåtet!";    
    $lang['adding_operation_completed'] = "Lägga operation slutförts!";
    $lang['adding_operation_uncompleted'] = "Lägga operation ofullbordade!";
    $lang['alert_perform_operation'] = "Är du säker på att du vill göra detta?";
    $lang['alert_select_row'] = "Du måste välja en eller flera rader för att genomföra denna operation!";
	$lang['alert_field_cannot_be_empty'] = 'Field {title} cannot be empty! Please re-enter.';
	$lang['alert_field_must_be_alphabetic'] = 'Field {title} must have alphabetic value! Please re-enter.';
	$lang['alert_field_must_be_float'] = 'Field {title} must be a float value! Please re-enter.';
	$lang['alert_field_must_be_integer'] = 'Field {title} must be an integer value! Please re-enter.';
    $lang['and'] = "och";
    $lang['any'] = "valfri";
    $lang['ascending'] = "Stigande"; 
    $lang['back'] = "Tillbaka";
    $lang['cancel'] = "Avbryt";
    $lang['cancel_creating_new_record'] = "Är du säker på att du vill avbryta skapa nya rekord?";
    $lang['check_all'] = "Markera alla";
    $lang['clear'] = "Klart";
    $lang['click_to_download'] = "Klicka för att ladda ner";
    $lang['clone_selected'] = "Klon vald";    
    $lang['cloning_record_blocked'] = "Säkerhetskontroll: försök att klona ett rekord! Kontrollera dina inställningar är operationen inte tillåtet!";
    $lang['cloning_operation_completed'] = "Kloning operationen lyckades!";
    $lang['cloning_operation_uncompleted'] = "Kloning drift ofullbordade!";
    $lang['create'] = "Skapa"; 
    $lang['create_new_record'] = "Skapa ny post"; 
    $lang['current'] = "aktuell"; 
    $lang['delete'] = "Ta bort"; 
    $lang['delete_record'] = "Ta bort post";
    $lang['delete_record_blocked'] = "Säkerhetskontroll: försök att stryka en post! Kontrollera dina inställningar, är åtgärden inte tillåtet!";    
    $lang['delete_selected'] = "Ta bort valda";
    $lang['delete_selected_records'] = "Är du säker på att du vill ta bort den valda poster?";
    $lang['delete_this_record'] = "Är du säker på att du vill ta bort denna post?";         
    $lang['deleting_operation_completed'] = "Den stryka operation slutförts!";
    $lang['deleting_operation_uncompleted'] = "Den stryka operation ofullbordade!";
    $lang['descending'] = "Fallande";
    $lang['details'] = "Detaljer";    
    $lang['details_selected'] = "Visa valda";
    $lang['download'] = "Hämta";    
    $lang['edit'] = "Editera";
    $lang['edit_selected'] = "Editera valda";
    $lang['edit_record'] = "Editera post";
    $lang['edit_selected_records'] = "Är du säker på att du vill redigera den valda poster?";   
    $lang['errors'] = "Fel";
	$lang['exchange_operation_completed'] = "The exchange columns operation on selected rows completed successfully!";
	$lang['exchange_operation_uncompleted'] = "The exchange columns operation on selected rows uncompleted!";
	$lang['exchange_selected'] = "Exchange columns in selected rows";
    $lang['export_to_excel'] = "Exportera till Excel";
    $lang['export_to_pdf'] = "Exportera till PDF";
    $lang['export_to_word'] = "Exportera till Word";
    $lang['export_to_xml'] = "Exportera till XML";
    $lang['export_message'] = "<label class=\"default_dg_label\">Filen _FILE_ är klar. När du är klar hämtar,</label> <a class=\"default_dg_error_message\" href=\"javascript: window.close();\">close this window</a>.";
    $lang['field'] = "Fält"; 
    $lang['field_value'] = "Fältvärde";
    $lang['file_find_error'] = "Kan inte hitta filen: <b>_FILE_</b>. <br>Kontrollera om den filen finns och du använder en korrekt sökväg!";
    $lang['file_opening_error'] = "Kan inte öppna en fil. Kontrollera din behörighet.";
    $lang['file_extension_error'] = "Filuppladdning fel: filtillägget inte tillåtet för uppladdning. Välj en annan fil.";
    $lang['file_writing_error'] = "Kan inte skriva till fil. Kontrollera skriftligt tillstånd!";
    $lang['file_invalid_file_size'] = "Ogiltig filstorlek";
    $lang['file_uploading_error'] = "Det uppstod ett fel vid uppladdning, försök igen!";
    $lang['file_deleting_error'] = "Det uppstod ett fel vid radering!";
    $lang['first'] = "första";
    $lang['format'] = "Format";
    $lang['generate'] = "Generera";    
    $lang['handle_selected_records'] = "Är du säker på att du vill hantera utvalda poster?";
    $lang['hide_search'] = "Dölj sök";
    $lang['item'] = "post";
    $lang['items'] = "objekt";
    $lang['last'] = "sista"; 
    $lang['like'] = "gilla";
    $lang['like%'] = "gilla%";  // "begins with"; 
    $lang['%like'] = "%gilla";  // "ends with";
    $lang['%like%'] = "%gilla%";  
    $lang['loading_data'] = "laddning av data...";
    $lang['max'] = "max";
    $lang['max_number_of_records'] = "Du har överskridit det maximala antalet tillåtna skivor!";
    $lang['move_operation_completed'] = "Den rörliga raden operationen lyckades!";
    $lang['move_operation_uncompleted'] = "Den rörliga raden drift ofullbordade!";    
    $lang['move_down'] = "Flytta ned";
    $lang['move_up'] = "Flytta upp";
    $lang['next'] = "nästa"; 
    $lang['no'] = "Nej";        
    $lang['no_data_found'] = "Det finns ingen data"; 
    $lang['no_data_found_error'] = "Det finns ingen data! Vänligen kontrollera er kod noggrant!<br>Den kanske innehåller stora/små tecken eller otillåtna tecken.";        
    $lang['no_image'] = "Ingen bild";
    $lang['not_like'] = "inte gillar";
    $lang['of'] = "av";
    $lang['operation_was_already_done'] = "Operationen avslutades redan! Du kan inte försöka om igen.";            
    $lang['or'] = "eller";
    $lang['pages'] = "Sidor";        
    $lang['page_size'] = "Sidstorlek"; 
    $lang['previous'] = "föregående";    
    $lang['printable_view'] = "Vy för utskrift";    
    $lang['print_now'] = "Skriv ut nu";
    $lang['print_now_title'] = "Klicka här för att skriva ut denna sida";    
    $lang['record_n'] = "Spela in #";
    $lang['refresh_page'] = "Uppdatera sida";    
    $lang['remove'] = "Flytta";
    $lang['reset'] = "Återställ";
    $lang['results'] = "Resultat"; 
    $lang['required_fields_msg'] = "<span style='color:#cd0000'>*</span> Fält märkta med asterisk är obligatoriska";
    $lang['search'] = "Sök"; 
    $lang['search_d'] = "Sök"; // (description) 
    $lang['search_type'] = "Soktyp"; 
    $lang['select'] = "välj"; 
    $lang['set_date'] = "Ställ in datum";
    $lang['sort'] = "Ordna";    
    $lang['test'] = "Prova";
    $lang['total'] = "Totalt";    
    $lang['turn_on_debug_mode'] = "För mer information, slå på debug-läge.";
    $lang['uncheck_all'] = "Avmarkera alla";
    $lang['unhide_search'] = "Ta fram Search";
    $lang['unique_field_error'] = "Fältet _FIELD_ tillåter endast unika värden - please inträda!";
    $lang['update'] = "Updatera"; 
    $lang['update_record'] = "Updatera post";
    $lang['update_record_blocked'] = "Säkerhetskontroll: försök att uppdatera en rekord! Kontrollera dina inställningar, är åtgärden inte tillåtet!";    
    $lang['updating_operation_completed'] = "Aktualisering operation slutförts!";
    $lang['updating_operation_uncompleted'] = "Aktualisering operation ofullbordade!";    
    $lang['upload'] = "Ladda upp";
    $lang['uploaded_file_not_image'] = "Filen verkar inte vara en bild.";    
    $lang['view'] = "Visa"; 
    $lang['view_details'] = "Visa detaljer";
    $lang['warnings'] = "Varningar";
    $lang['with_selected'] = "Med utvalda";
    $lang['wrong_field_name'] = "Fel fältnamn";
    $lang['wrong_parameter_error'] = "Fel parameter i [<b>_FIELD_</b>]: _VALUE_";
    $lang['yes'] = "Ja";    

    // date-time
    $lang['day'] = "dag";
    $lang['month'] = "månad";
    $lang['year'] = "år";
    $lang['hour'] = "timme";
    $lang['min'] = "min";
    $lang['sec'] = "sec";
    $lang['months'][1] = "Januari";
    $lang['months'][2] = "Februari";
    $lang['months'][3] = "Mars";
    $lang['months'][4] = "April";
    $lang['months'][5] = "Maj";
    $lang['months'][6] = "Juni";
    $lang['months'][7] = "Juli";
    $lang['months'][8] = "Augusti";
    $lang['months'][9] = "September";
    $lang['months'][10] = "Oktober";
    $lang['months'][11] = "November";
    $lang['months'][12] = "December";
        
    return $lang; 
}
