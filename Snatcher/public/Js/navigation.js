if($( window ).width()<800){
$("#navigationBar").removeClass("nav-desktop").addClass("nav-mobile");
$(".footer").css("position", "static");
}
else{
if($("table").height()>0 || $(.login-html).height()>0 || $(#fdw-pricing-table).height()>0){
$(".footer").css("position", "static");
}
else{
$("#navigationBar").removeClass("nav-mobile").addClass("nav-desktop");
$(".footer").css("position", "absolute");
}

}


(function($) {
    $(document).ready(function() {

    $(window).on('load, resize', function mobileViewUpdate() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 800) {
    $("#navigationBar").removeClass("nav-desktop").addClass("nav-mobile");
    $(".footer").css("position", "static");

      }
      else{
      $("#navigationBar").removeClass("nav-mobile").addClass("nav-desktop");
      $(".footer").css("position", "absolute");
      }

});
    });
})(jQuery);
