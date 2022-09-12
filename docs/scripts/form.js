var selecteditemsarray;
var host = "spenterpriselive.dkit.ie:8000";
var startdate = "08/28/2017 00:00:00 GMT";
var pagehost = "spenterpriselive.dkit.ie:8000";

function getTimetable(form, object) {
	var days = form.elements["days"].options[form.elements["days"].selectedIndex].value;
	var weeks = form.elements["weeks"].options[form.elements["weeks"].selectedIndex].value;
	var periods = form.elements["periods"].options[form.elements["periods"].selectedIndex].value;
	var idtype = "id";
	var style = form.elements["style"].options[form.elements["style"].selectedIndex].value;
	var objectstr = "";
	if (object === 'modulecode') {
		object = 'module';
	}
	if (object === 'stafftext') {
		object = 'staff';
	}
	var template = object + "+" + style;
	var inputelement = form.elements["identifier"];
	if (inputelement.type === "text" ) {
		objectstr = inputelement.value;
	} else {
		for (var i = 0; i < inputelement.options.length; i++) {
			if (inputelement.options[i].selected) {
				objectstr += inputelement.options[i].value + "%0D%0A";
			}
		}
	}
	objectstr = fixspace(objectstr);
	if (objectstr === "") {
		alert ("Error - no object requested");
		return;
    }
	document.getElementById("link").hidden = false;
	document.getElementById("link").href = ("https://timetables.dkit.ie/process.php?url=" + escape("http://" + host + "/reporting/" + style + ";" + fixspace(object) + ";" + idtype + ";" + objectstr + "?t=" + template + "&days=" + days + "&weeks=" + weeks + "&periods=" + periods + "&template=" + template));
}

function SetMenuSelections (form) {
	FilterStudentSetsByTitle(form);
}

function fixspace(str) {
  var start;
  var newstr;
  start=0;
  newstr="";

  for(var i=0; i<str.length; i++) {
    if (str.charAt(i)===" ") {
      newstr+=str.substr(start,(i-start))+"+";
      start=i+1;
    }
  }
  newstr+=str.substr(start,(i-start));
  return newstr;
}

function FilterStudentSets(form) {
	FilterStudentSetsByTitle(form);
}

function AddGenWeeks(dy,mo,yr,stwk,enwk,cbxWeeks) {
    var monday;
    var mondaystr;
    mo = mo - 1;
    monday = new Date(yr, mo, dy);
    enwk ++;
    var j=cbxWeeks.options.length;
	var MonthArray = new Array(11);
	MonthArray [0] = "Jan";
	MonthArray [1] = "Feb";
	MonthArray [2] = "Mar";
	MonthArray [3] = "Apr";
	MonthArray [4] = "May";
	MonthArray [5] = "Jun";
	MonthArray [6] = "Jul";
	MonthArray [7] = "Aug";
	MonthArray [8] = "Sep";
	MonthArray [9] = "Oct";
	MonthArray [10] = "Nov";
	MonthArray [11] = "Dec";
	var DayArray = new Array(6);
	DayArray [0] = "Sun";
	DayArray [1] = "Mon";
	DayArray [2] = "Tue";
	DayArray [3] = "Wed";
	DayArray [4] = "Thu";
	DayArray [5] = "Fri";
	DayArray [6] = "Sat";
    for(var i=stwk; i<enwk; i++) {
	    var strDay = DayArray[monday.getDay()];
	    var strMon = MonthArray[monday.getMonth()];
	    var strPad = "";
	    var intDat = monday.getDate();
	    if (intDat < 10) { strPad = "0" }
	    var strDat = strPad + intDat.toString();
	    var strYr = monday.getFullYear().toString();
	    mondaystr = "w/c " + strDay + " " + strDat + " " + strMon + " " + strYr + " (Wk " + i + ")";
        if (j === 0) {
		    cbxWeeks.options[j] = new Option("This Week", "");
		    monday.setDate(monday.getDate() - 7);
		    j++;
        } else {
		    cbxWeeks.options[j] = new Option(mondaystr, i.toString());
		    j++;
        }
        monday.setDate(monday.getDate() + 7);
    }
	cbxWeeks.options[0].selected = true;
}

function AddWeeks(strWeekRange, strWeekLabel, cbxWeeks) {
	var intLength = cbxWeeks.options.length;
	cbxWeeks.options[intLength] = new Option(strWeekLabel, strWeekRange);
}

function InsertNextWeekOption(cbxweeks) {
	var date1 = new Date(startdate);
	var date2 = new Date();
	var date1temp = date1.getTime();
	var date2temp = date2.getTime();
	var datediff = date2temp - date1temp;
	week = Math.floor(datediff / (1000 * 60 * 60 * 24 * 7));
	week += 2;
	AddWeeks(week.toString(),"Next Week",cbxweeks);
}


