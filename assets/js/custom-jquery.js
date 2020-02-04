---
---

$('#people-pills-tab a').on('click', function (e) {
  if ($(this).hasClass("active")) { e.preventDefault() } else {
  
    $(this).tab('show')
    console.log($(this))
    target = $( "#" + $(this).attr('aria-controls') );
    $(".tab-pane:not("+$(this).attr('aria-controls')+")").slideUp();	// hide all tab-pane
    target.slideDown();
    $(this).addClass("active");
  }
})

$( ".tab-toggle", ).click(function() {
  if (! $(this).hasClass("active")) {
    $('.tab-toggle').removeClass("active");								// remove active on all tab-toggle
    target = $( "#" + $(this).attr('aria-controls') );
    $(".tab-pane:not("+$(this).attr('aria-controls')+")").slideUp();	// hide all tab-pane
    target.slideDown();
    $(this).addClass("active")
  }
});



{% assign all_institutes = site.data._institutes | concat: site.data._institutes-novideo %}
{% for institute in all_institutes %}$('.states-menu #{{ institute.state }}').click(() => { window.location.href = "/network/{{ institute.short }}/"; })
{% endfor %}


$("[aria-controls=pills-leadership]").addClass('active')
$('#pills-leadership').show()




$(document).ready(function () {

  $(".toggleInstitute").click(function() {
    var toggle = $(this).data("toggle");
    var institute = $(this).data("institute");
    var transcript = $(this).data("transcript");
    var toggle_val = $(this).data(toggle);
    
    if ($(toggle_val + ":visible" ).length > 0 ) {
      $(toggle_val).slideUp();
    } else if ($(toggle_val + ":visible" ).length == 0 ) {
      if (toggle == "institute") { $(transcript).slideUp() } else if (toggle == "transcript") { $(institute).slideUp() }
      $(toggle_val).slideDown();
    }
  });

  /* Any element with slideOpen will slide open an ID element in the 'data-slide'="{ID}" attribute. */
  $('.slideOpen').click(function(){
    slide_to_open = $(this).data("slide");
    target_elem = "#" + slide_to_open;

    $(".state:not(#"+slide_to_open+")").removeClass('highlight');
    $('#'+slide_to_open).addClass('highlight');

    $(".instituteDetails:not("+target_elem+")").slideUp()
    // $( "#slide" ).addClass('highlight');
    $(target_elem).slideDown( "fast" );
  });

  /* expandText can be used as a class on any span that has a data-target that it will reveal (and it
      will itself be hidden). */
  $(".expandText").click(function() {
    target = $( "#" + $(this).data('target') );
    $(this).hide();
    target.show();
  });



});