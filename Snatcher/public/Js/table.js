$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

window.onresize = function() {
    if (window.innerWidth > 300) {
        document.getElementById("table").style.width = "100%";
    }
    else {
        document.getElementById("table").style.width = "300px";
    }
}
