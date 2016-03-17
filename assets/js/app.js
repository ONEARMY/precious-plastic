$(document).ready(function() {
  $('#menu .toggle').click(function (event) {
    $(this).closest('header').find('nav').slideToggle(300)
    event.preventDefault()
  })

  $('#video').fitVids()
  $('#slider .container').unslider()

  $('#page aside > span').click(function (event) {
    $(this).nextAll('nav').slideToggle(300)
    $(this).toggleClass('on')
  })

  if ($().accordion) {
    $('#page dl').accordion()
  }

  if ($().isotope) {
    var grid = $('.extras').isotope({
      itemSelector: '.item'
    })

    $('.filter nav a').click(function (e) {
      var group = $(this).attr('href').split('#')[1]
      var isActive = $(this).hasClass('active')

      grid.isotope({
        filter: isActive ? '*' : '.' + group
      })

      if( !isActive ) {
        $(this).closest('nav').find('.active').removeClass('active')
      }

      $(this).toggleClass('active')
      e.preventDefault()
    })
  }
})
