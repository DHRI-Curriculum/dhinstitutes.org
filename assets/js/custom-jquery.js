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

$("[aria-controls=professional-development]").addClass('active')
$('#professional-development').show()

$("[aria-controls=pills-leadership]").addClass('active')
$('#pills-leadership').show()