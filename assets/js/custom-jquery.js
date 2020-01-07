$('#people-pills-tab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
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

$("[aria-controls=professional-development]").addClass('active')
$('#professional-development').show()