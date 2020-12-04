/***
 *  ApPHP DataGrid Pro (AJAX enabled)                                          
 *  Developed by:  ApPHP <info@apphp.com>
 *  License:       GNU LGPL v.3                                                
 *  Site:          https://www.apphp.com/php-datagrid/                          
 *  Copyright:     ApPHP DataGrid (c) 2006-2017. All rights reserved.
 *  last modified: 14.09.2012
 ***/

// textarea maxlength checking
function setTaMaxLength(){
   var x = document.getElementsByTagName('textarea');
   var counter = document.createElement('span'); //div
   counter.className = 'dg_counter';
   for(var i=0;i<x.length;i++) {
      if(x[i].getAttribute('maxlength')){
         var counterClone = counter.cloneNode(true);
         counterClone.relatedElement = x[i];
         counterClone.innerHTML = '<span>0</span>/'+x[i].getAttribute('maxlength');
         x[i].parentNode.insertBefore(counterClone,x[i].nextSibling);
         x[i].relatedElement = counterClone.getElementsByTagName('span')[0];
         x[i].onkeyup = x[i].onchange = checkMaxLength;
         x[i].onkeyup();
      }
   }
}

function checkMaxLength(){
   var maxLength = this.getAttribute('maxlength');
   var currentLength = this.value.length;
   
   if(currentLength > maxLength){
      this.value = this.value.substring(0,maxLength);
      currentLength = maxLength;   
   }
   this.relatedElement.firstChild.nodeValue = currentLength;   
}

_dgAddDgLoadEvent(setTaMaxLength);
