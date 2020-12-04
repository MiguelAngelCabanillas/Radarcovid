//////////////////////////////////////////////////////////////////////////////////////////////
//	Turkish Translation by Nuri AKMAN
//	Location: Ankara/TURKEY
//	e-mail	: nuriakman@hotmail.com
//	Date	: April, 9 2003
//
//	Note: if Turkish Characters does not shown on you screen
//		  please include falowing line your html code:
//
//		  <meta http-equiv="Content-Type" content="text/html; charset=windows-1254">
//
//////////////////////////////////////////////////////////////////////////////////////////////

// ** I18N
Calendar._DN = new Array
("Pazar",
 "Pazartesi",
 "Sali",
 "Çarsamba",
 "Persembe",
 "Cuma",
 "Cumartesi",
 "Pazar");

// short day names
Calendar._SDN = new Array
("Paz",
 "Pts",
 "Sal",
 "Car",
 "Per",
 "Cum",
 "Cts",
 "Paz"); 

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 1;
 
Calendar._MN = new Array
("Ocak",
 "Subat",
 "Mart",
 "Nisan",
 "Mayis",
 "Haziran",
 "Temmuz",
 "Agustos",
 "Eylul",
 "Ekim",
 "Kasim",
 "Aralik");
 
 // short month names
Calendar._SMN = new Array
("Oca",
 "Sub",
 "Mar",
 "Nis",
 "May",
 "Haz",
 "Tem",
 "Agu",
 "Eyl",
 "Eki",
 "Kas",
 "Ara");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "Hakkinda";
Calendar._TT["ABOUT"] =
"DHTML Date/Time Selector\n" +
"(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n" + // don't translate this this ;-)
"For latest version visit: http://www.dynarch.com/projects/calendar/\n" +
"Distributed under GNU LGPL.  See http://gnu.org/licenses/lgpl.html for details." +
"\n\n" +
"Date selection:\n" +
"- Use the \xab, \xbb buttons to select year\n" +
"- Use the " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " buttons to select month\n" +
"- Hold mouse button on any of the above buttons for faster selection.";

Calendar._TT["ABOUT_TIME"] = "\n\n" +
"Time selection:\n" +
"- Click on any of the time parts to increase it\n" +
"- or Shift-click to decrease it\n" +
"- or click and drag for faster selection.";

Calendar._TT["TOGGLE"] = "Haftanin ilk gununu kaydir";
Calendar._TT["PREV_YEAR"] = "Onceki Yil (Menu icin basili tutunz)";
Calendar._TT["PREV_MONTH"] = "Onceki Ay (Menu icin basili tutunz)";
Calendar._TT["GO_TODAY"] = "Bugun'e git";
Calendar._TT["NEXT_MONTH"] = "Sonraki Ay (Menu icin basili tutunz)";
Calendar._TT["NEXT_YEAR"] = "Sonraki Yil (Menu icin basili tutunz)";
Calendar._TT["SEL_DATE"] = "Tarih seciniz";
Calendar._TT["DRAG_TO_MOVE"] = "Tasimak icin surukleyiniz";
Calendar._TT["PART_TODAY"] = " (bugün)";

Calendar._TT["DAY_FIRST"] = "%s gununden baslasin";

Calendar._TT["CLOSE"] = "Kapat";
Calendar._TT["TODAY"] = "Bugun";
Calendar._TT["TIME_PART"] = "(Shift-) tiklayin ya da surukleyin";

Calendar._TT["WEEKEND"] = "0,6";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "dd-mm-y";
Calendar._TT["TT_DATE_FORMAT"] = "d MM y, DD";

Calendar._TT["WK"] = "Hafta";
Calendar._TT["TIME"] = "Saat:";