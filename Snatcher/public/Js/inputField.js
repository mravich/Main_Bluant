var $field = $('input');
var $iconCC = $('#iconCC');

$field.on('focus', function() {
$(this).parent().addClass('focus');
$(this).parent().removeClass('active');
})

$field.on('blur', function() {
$(this).parent().removeClass('focus');

if ($field.val() !== "") {
$(this).parent().addClass('active');
} else {
$(this).parent().removeClass('active');
//$('.iconCheck').hide();
}
});

$field.on('keydown', function() {
var emailaddress = $field.val();

if( !isValidEmailAddress( emailaddress ) ) {
//$('#iconPassed').hide();
//$('#iconWrong').show();
} else {
//  $('#iconPassed').show();
//$('#iconWrong').hide();
}

})

function isValidEmailAddress(emailAddress) {
var pattern = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi;
return pattern.test(emailAddress);
};
