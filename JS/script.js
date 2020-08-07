$(document).ready(function () {
  $nav = $(".nav-bar");
  $toggleCollapse = $(".toggle-collapse");
  $toggleCollapse.click(function () {
    $nav.toggleClass("collapse");
  });

  $(".owl-carousel").owlCarousel();
});
