$(document).ready(function() {
    myFunc($(".show"));


});

function myFunc(oEle)
{





	oEle.delay(3000).fadeOut('slow', function(){
		if (oEle.next().length)
		{
			oEle.next().fadeIn('3000', function(){
				myFunc(oEle.next());
			});
		}
		else
		{
			oEle.siblings(":first").fadeIn('3000', function(){
				myFunc(oEle.siblings(":first"));
			});
		}
	});
}
