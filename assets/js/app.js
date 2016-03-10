$(document).ready(function() {
  $('#menu .toggle').click(function (event) {
    $(this).closest('header').find('nav').slideToggle(300)
    event.preventDefault()
  })

  $('#video').fitVids()
  $('#slider .container').unslider()
})
