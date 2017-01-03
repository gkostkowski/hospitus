window.addEventListener("load", onLoad, false);

function onLoad() 
{
	alignSelect() ;
	$(function () {
	$('#datetimepicker1').datepicker({
	   language: "pl", viewMode: 'years', endDate: "Now()", clearBtn: true
	});
	$('#datetimepicker3').datepicker({
	   language: "pl", viewMode: 'years', endDate: "Now()", clearBtn: true
	});
  });
}

function clearInput(form)
{
	if (form !== null) 
	{
		var children = form.children;
		if (children !== undefined && children !== null)
		{
			//console.log(children);
			Array.from(children).forEach(function(el){
			if (!(el.type == 'text' || el.tagName=='SELECT' || el.tagName=='TEXTAREA'))
				clearInput(el);
			else 
			{
				if (el.getAttribute('placeholder') != "")
					el.value=el.getAttribute('placeholder');
				else 
				{
					//console.log(el);
					el.value=' ';
				}
				
			}
			
			});
		}
	}	
};

function clearForm(formName)
{
	clearInput(document.getElementById(formName));
}

function showSnackbar(snackbar) {
	snackbar.className = "show";
	setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
};

function proceedRequest(isSuccess, form, isCompleted) {
	var extra = isCompleted == undefined ? " ":" Plan przekazany do rozpatrzenia.";
	var snackbar = document.getElementById('snackbar');
	if (isSuccess) 
	{
		snackbar.innerHTML = "Wpis dodany pomyślnie."+extra;
		snackbar.style="background-color:green;";
		clearForm(form);
	}
	else 
	{
		snackbar.innerHTML = "Wpis nie został dodany - popraw dane i spróbuj ponownie."+extra;
		snackbar.style="background-color:red;";
	}							
	showSnackbar(snackbar);
}
function alignSelect() 
{
	var spacesToAdd = 5;
	var biggestLength = 0;

	$("#workers option").each(function(){
	var len = $(this).text().length;

		if(len > biggestLength){
			biggestLength = len;
		}
	});
	var padLength = biggestLength + spacesToAdd;
	$("#workers option").each(function(){
		var parts = $(this).text().split(' ');
		var strLength = parts[0].length;
		var resText = '';
		parts.forEach(function(item, index){
			var l = item.length;
			for(var x=0; x<(padLength-l); x++){
				item = item+' '; 
				
			}
			resText += item;
			
		});
		$(this).text(resText.replace(/ /g, '\u00a0'));
	});
}
