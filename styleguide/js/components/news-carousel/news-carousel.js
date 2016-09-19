$(document).ready(function(){
  $('#myCarousel').on('slid.bs.carousel', function () {
    var currentIndex = $('#myCarousel .carousel-inner .active').index('#myCarousel .item');
    $('#myCarousel .list-group-item.active').removeClass('active');
    $("#myCarousel .list-group-item[data-slide-to='" + currentIndex + "']").addClass('active');
  })
})
