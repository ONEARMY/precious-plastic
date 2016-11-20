$(window).load(function() {
  $('#overlay').addClass('ready')

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

if ($('#player').length) {
  var player
  var vidId = $('#player').attr('data-video-id')

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: 394,
      width: 700,
      videoId: vidId,
      events: {
        onReady: function () {
          $('figure.view').fitVids()
        }
      }
    });
  }

  $('.chapters .time').click(function (event) {
    var time = $(this).html()
    var parts = time.split(':')
    var seconds = (+parts[0]) * 60 + (+parts[1])

    $('html, body').animate({
      scrollTop: $('#page article').offset().top
    }, 800, function () {
      player.seekTo(seconds, true)
    })
  })
}

function daysSince (old) {
  var date1 = new Date(old)
  var date2 = new Date()
  var timeDiff = Math.abs(date2.getTime() - date1.getTime())
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  return diffDays
}

$.urlParam = function (name, url){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url)
  return results[1] || 0
}

$(document).ready(function() {
  if (document.title.indexOf('404') > -1) {
    var location = window.location
    var engURL = location.origin + '/en' + location.pathname

    $.ajax({
      type: 'HEAD',
      url: engURL,
      success: function() {
        window.location.href = engURL
      }
    })
  }

  if ($('.city-count').length) {
    var types = [
      'country',
      'city'
    ]

    for (var index in types) {
      var type = types[index]

      $.ajax({
        url: 'http://dumpark.com/embed/ppmap/gaQuery.php?query=' + type + '&count=true',
        dataType: 'jsonp',
        success: function (data) {
          type = $.urlParam('query', this.url)
          $('.' + type + '-count').text(data.results.count)
        }
      })
    }
  }

  $('.days-count').html(daysSince('3/24/2016') - 1)

  if ($('#page').length && $(window).width() > 992) {
    $('.container > aside').stick_in_parent({
      offset_top: 30
    })
  }

  $('#menu .toggle').click(function (event) {
    $(this).closest('header').find('nav').slideToggle(300)
    $(this).toggleClass('on')

    event.preventDefault()
  })

  function PopupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    var left = ((width / 2) - (w / 2)) + dualScreenLeft
    var top = ((height / 2) - (h / 2)) + dualScreenTop
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    if (window.focus) {
      newWindow.focus()
    }
  }

  if (!$('#player').length) {
    $('#video, .video article .view, #intro .wrap').fitVids()
  }

  $('#slider .container').unslider({
    autoplay: true,
    delay: 8000
  })

  $('#page aside > span').click(function (event) {
    $(this).nextAll('nav').slideToggle(300)
    $(this).toggleClass('on')
  })

  $('#toggle-overlay, section .spread').click(function (event) {
    $('#overlay').addClass('open')
    $('body').addClass('no-scroll')

    event.preventDefault()
  })

  $('#overlay .toggle').click(function () {
    $('#overlay').removeClass('open')
    $('body').removeClass('no-scroll')
  })

  $('#overlay .social a').click(function (event) {
    var url = $(this).attr('href')

    PopupCenter(url, 'Share', '600', '600')
    event.preventDefault()
  })

  if ($('#news')) {
    $.ajax({
      type: 'GET',
      url: 'https://davehakkens.nl/category/preciousplastic/feed/',
      success: function (xml) {
        $(xml).find('item').each(function (index) {
          var article = $('<article />')

          var title = $(this).find('title').text()
          var description = $($(this).find('description').text())[1]
          var url = $(this).find('link').text()

          var preview = $($(this).find('description').text()).find('.wp-post-image')
          var figure = $('<figure></figure>')

          figure.append(preview)
          article.append(figure)
          article.append('<a href="' + url +  '" class="title" target="_blank">' + title + '</a>')

          var descText = $(description).text()

          if (descText.indexOf('-source') == -1 && descText.indexOf(title) == -1) {
            article.append('<p>' + descText + '</p>')
          }

          var news = $('#news .container:first-child')

          news.find('.loading').hide()
          news.append(article)

          if (index == 9) {
            return false
          }
        })
      }
    })
  }

  if ($().accordion) {
    $('#page dl').accordion()
  }

  var canonical = $('head link[rel="canonical"]').attr('href')
  var url = encodeURIComponent(canonical)

  var counts = [
    {
      url: 'api.facebook.com/method/links.getStats?urls=' + url + '&format=json',
      field: 'share_count'
    }
  ]

  for (var api of counts) {
    $.ajax({
      type: 'GET',
      url: 'https://' + api.url,
      success: function (response) {
        var count = parseInt(response[0][api.field])
        var previousOve = parseInt($('#overlay .total span').text())

        var previous = {
          overlay: parseInt($('#overlay .total span').text()),
          general: parseInt($('.shares-count').text())
        }

        var add = 70000

        $('#overlay .total span').html(previous.overlay + count + add)
        $('.shares-count').html(previous.general + count + add)
      }
    })
  }

  $('#ready-to-start figure').click(function() {
    var url = $(this).attr('data-url')
    window.location.href = url
  })

  $( '.overlayf .close' ).click( function( e ) {
    $( this ).closest( '.overlayf' ).fadeOut( 300 );
    e.preventDefault();
  });

  $('#copyright .by').click(function(event) {
    $('#overlayf').addClass('open')
    event.preventDefault()
  })

  $('#overlayf .close').click(function(event) {
    $(this).closest('#overlayf').removeClass('open')
    event.preventDefault()
  })

})
