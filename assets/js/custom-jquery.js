---
sitemap:
  exclude: 'yes'
---
{% include people/_build.html %}

const DEBUG_OUTPUT = false;


// Set up custom function: Simple sleep function
var sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Set up custom function: Scroll to certain element
var scrollToAnchor = function(aname){
  var aTag = $("a[name='"+ aname +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};

function shuffle(array) { array.sort(() => Math.random() - 0.5); }

$(document).ready(function () {


  $('#contactform').submit(function(e) {
    var name = $('#contactform #name');
    var email = $('#contactform #email');
    var message = $('#contactform #message');

    if(name.val() == "" || email.val() == "" || message.val() == "") {
      $('.submit-fail').fadeToggle(400);
      return false;
    }
    else {
      $.ajax({
        method: 'POST',
        url: '//formspree.io/info@dhinstitutes.org',
        data: $('#contactform').serialize(),
        datatype: 'json'
      });
      e.preventDefault();
      $(this).get(0).reset();
      $('.submit-success').fadeToggle(400);
      $('#contactform').hide();
    }
  });

  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  })



  $('.more-information-form').ajaxChimp();

  $('#people-pills-tab a').on('click', function (e) {
    if ($(this).hasClass("active")) { e.preventDefault() } else {
      $(this).tab('show')
      if (DEBUG_OUTPUT) { console.log($(this)); }
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

{% assign all_institutes = site.data._institutes | concat: site.data._institutes-novideo %}
data = [{% for leader in community_leaders %}{% assign _ = all_institutes | where: "short", leader.institute-short %}{% assign p = _[0] %}{% if p.institute.from == p.institute.to %}{% capture full_date %}{{ p.institute.from | date: "%b %-d, %Y" }}{% endcapture %}{% else %}{% capture from_month %}{{ p.institute.from | date: "%b" }}{% endcapture %}{% capture to_month %}{{ p.institute.to | date: "%b" }}{% endcapture %}{% if from_month == to_month %}{% capture full_date %}{{ p.institute.from | date: "%b %-d" }}-{{ p.institute.to | date: "%-d" }}, {{ p.institute.from | date: "%Y" }}{% endcapture %}{% else %}{% capture full_date %}{{ p.institute.from | date: "%b %-d" }}-{{ p.institute.to | date: "%b %-d" }}, {{ p.institute.from | date: "%Y" }}{% endcapture %}{% endif %}{% endif %}{% assign new_bio = leader.bio | strip_html | split: " " %}{% assign short_bio = new_bio | slice: 0, 50 | join: " " %}{% capture tags %}{% for tag in p.tags %}<span class="badge badge-dark mb-1 mr-1">{{ tag }}</span>{% endfor %}{% endcapture %}{% assign new_text = p.text | strip_html | split: " " %}{% assign short_text = new_text | slice: 0, 80 | join: " " %}
      {
        "institute-short": "{{ leader.institute-short }}",
        "img": "/assets/images/people/{{ leader.img }}",
        "short": "/assets/images/people/{{ leader.short }}",
        "institute-name": "{{ p.name }}",
        "leader-name": "{{ leader.first-name }} {{ leader.last-name }}",
        "full-date": "{{ full_date }}",
        "youtube": "{{ p.youtube.shortcode }}",
        "tags": '{{ tags }}',
        "text": "{{ short_text }}... (<a class=\"text-light\" href=\"/network/{{ p.short }}\">continue reading)",
        "map": '{{ p.google-map }}',
        "short-bio": "{{ short_bio }}... (<a class=\"text-light\" href=\"/people/community-leaders/#{{ leader.short }}\">continue reading)"
      }{% if forloop.last %}{% else %},{% endif %}
      {% endfor %}
  ]
  shuffle(data);

  {% for i in (0..2) %}
  $("#leader-{{ i }} #profile-pic").css("background-image", "url('"+data[{{ i }}]['img']+"')");
  $("#leader-{{ i }} #name").html(data[{{ i }}]['leader-name']);
  $("#leader-{{ i }} #text").html(data[{{ i }}]['text']);
  $("#leader-{{ i }} #map").html(
    '<iframe src="'+data[{{ i }}]['map']+'" width="100%" height="200px" frameborder="0" style="border:0" allowfullscreen=""></iframe>'
  );
  $("#leader-{{ i }} #desc").html(data[{{ i }}]['short-bio']);
  $("#leader-{{ i }} #inst").html(
    '<h4 class="p-0 m-0"><a href="/network/'+ data[{{ i }}]['institute-short'] +'" class="text-light">' + data[{{ i }}]['institute-name'] + '</a></h4>' +
    data[{{ i }}]['tags']
  );
  $("#leader-{{ i }} #dates").html(data[{{ i }}]['full-date']);
  {% endfor %}

  $("[aria-controls=professional-development]").addClass('active')
  $('#professional-development').show()

  var quotes = [
    {
      'quote': 'Specifically, the institute has generated great interest among faculty and administrators at my institution, and I was subsequently invited to participate in a campus-wide Digital Literacy Planning Committee where we have proposed to build a center and create an interdisciplinary digital studies program.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'There has been increased awareness on campus regarding the newly offered digital scholarship services through the libraries (thanks to our own DHRI promotion); learning that there are more people interested (and hungry) for DH on campus than we originally thought; and a solid network of people who I can meet up with at conferences and share ideas with for feedback and suggestions (and vice versa).',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'Learning the foundational skills <b>helped with so many things that I was working on in the past year</b>—things that I would have tried to do, but probably just given up on after a few failed attempts. But the foundational training of the DHRI sustained my resilience and ability to figure things out (even if it took a few tries and a few Google queries).',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'The DHRI <b>demystified programming and coding</b> language for me. It has given me a <b>new confidence</b> in my ability to pursue a greater understanding of DH.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'It was valuable for me to receive more in-depth learning of certain digital tools that I do not always have the time to squeeze in to a busy work day.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'As a digital humanist, I am grateful to now be connected to a larger community of like-minded advocates.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'Though digital researchers collaborate pretty well, especially for the humanities, we needlessly duplicate efforts and miss opportunities by overlooking talented people across the university, the town, and the region. In short, I think DHRI can provide a locus for better, more connected training, research, and project development.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'With the DHRI and NEH behind me, I was able to gain <b>institutional legitimacy</b> on my campus. My previous DH advocacy efforts had always been understood as my “personal” project, or my pet interest. Now with this training under my belt, <b>I can assert more confidence and authority</b> as well.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'DHRI has <b>supported my efforts to build and expand upon my university’s recently established digital humanities program</b>.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'We are very grateful to the CUNY DHRI program for giving us the resources we need to begin to build up DH infrastructure here as well as an <b>intra-institutional network of like-minded scholars</b>.',
      'credit': 'DHRI Community Leader, 2018'
    },
    {
      'quote': 'Attending the DHRI help me push the <b>importance of community-building and outreach to my unit and the library</b> more generally.',
      'credit': 'DHRI Community Leader, 2018'
    }
  ];

  var quotes_save = [...quotes];

  function reset_quotes() {
    var quotes = [...quotes_save];
    return(quotes);
  }

  function switch_quote() {
    if (quotes.length) {
      var num = Math.floor(Math.random() * (quotes.length - 1));
      $("#quote-container").fadeOut(300, () => {
        if (DEBUG_OUTPUT) { 
          console.log(quotes);
          console.log(num);
        }
        try {
          $("#quote").html(quotes[num]['quote']);
          $("#quote_by").html(quotes[num]['credit']);
        } catch(err) {
          quotes = reset_quotes();
          switch_quote();
        }
        $("#quote-container").fadeIn(300);
      });
      quotes.splice(num, 1);
    } else {
      quotes = reset_quotes();
      switch_quote();
    }
  }

  switch_quote();

  var id = setInterval(function()
  {
    try {
      switch_quote();
    } catch(err) {
      if (DEBUG_OUTPUT) {
        console.log("Error while switching quotes:")
        console.log(err)
      }
    }
  }, 15000);

  $('.switchQuote').click(function() { switch_quote(); });


  var closeAllInstitutes = function(notThis) {
      {% for p in all_institutes %}$('#{{ p.short }}Institute').collapse('hide');
      {% endfor %}$('#'+notThis).collapse('show');
    };
  {% for p in all_institutes %}
  // Set up scrollTo-[institute] classes
  $(".scrollTo-{{ p.short }}").each(function(){
      $(this).click(async function(event) {
          event.preventDefault();
          closeAllInstitutes('{{ p.short }}Institute');
          await sleep(400); // must be here in order for scroll to work
          scrollToAnchor('{{ p.short }}');
      });
  });
  {% endfor %}

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