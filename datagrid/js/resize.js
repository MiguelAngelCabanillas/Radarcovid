/***
 *  ApPHP DataGrid Pro (AJAX enabled)                                          
 *  Developed by:  ApPHP <info@apphp.com>
 *  License:       GNU LGPL v.3                                                
 *  Site:          https://www.apphp.com/php-datagrid/                          
 *  Copyright:     ApPHP DataGrid (c) 2006-2017. All rights reserved.
 *  last modified: 02.08.2012
 ***/

var DataGrid = DataGrid || {};

// set the variable that indicates if javascript behaviors should be applied
DataGrid.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;

// returns the position of the mouse cursor based on the event object passed
DataGrid.mousePosition = function(e) {
  return { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
};

// global killswitch on the <html> element
if (DataGrid.jsEnabled) {
  document.documentElement.className = 'js';
}

DataGrid.textareaAttach = function() {
  jQuery('textarea.resizable:not(.processed)').each(function() {
    var textarea = jQuery(this).addClass('processed'), staticOffset = null;

    jQuery(this).wrap('<div class="resizable-textarea"></div>')
      .parent().append(jQuery('<div class="grippie"></div>').mousedown(startDrag));

    var grippie = jQuery('div.grippie', jQuery(this).parent())[0];
    grippie.style.marginRight = (grippie.offsetWidth - jQuery(this)[0].offsetWidth) +'px';

    function startDrag(e) {
      staticOffset = textarea.height() - DataGrid.mousePosition(e).y;
      textarea.css('opacity', 0.25);
      jQuery(document).mousemove(performDrag).mouseup(endDrag);
      return false;
    }

    function performDrag(e) {
      textarea.height(Math.max(32, staticOffset + DataGrid.mousePosition(e).y) + 'px');
      return false;
    }

    function endDrag(e) {
      jQuery(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
      textarea.css('opacity', 1);
    }
  });
}

if (DataGrid.jsEnabled){
  jQuery(document).ready(DataGrid.textareaAttach);
}
