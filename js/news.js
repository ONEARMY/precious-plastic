
$(document).ready(function() {

    fetch('https://davehakkens.nl/wp-json/wp/v2/posts/?per_page=5&tags=609')
        .then(function (response) { return response.json() })
        .then(function (response) {
            //make a list of ids, since we need to query the media endpoint for images
            var ids = [];
            for (var i = 0; i < response.length; i++) {
                link = response[i]._links['wp:featuredmedia'][0].href;
                ids.push(link.substring(link.lastIndexOf('/') + 1));
            }
            var imageRequest = fetch('https://davehakkens.nl/wp-json/wp/v2/media/?per_page=5&include=' + ids.join(','))

            return Promise.all([ response, imageRequest ]);
        })
        .then(function (values) {
            return Promise.all([values[0], values[1].json() ]);
        })
        .then(function (values) {
            var newsList = document.getElementById('news-list');
            var posts = values[0];
            var media = values[1];

            var media = media.reduce(function (accumulator, currentValue) {
                accumulator[currentValue.post] = currentValue;
                return accumulator;
            }, {});

            newsList.innerHTML = '';
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];

                var link = createElement(
                    'a',
                    {
                        'href': post.link,
                        'target': '_blank',
                        'class': 'news-item w-inline-block' + (i == posts.length -1 ? ' last-item' : ''),
                    }
                )
                link.appendChild(createElement(
                    'div',
                    {
                        'class': 'img-news',
                        'style': 'background-image: url("' + media[post.id].media_details.sizes.thumbnail.source_url + '")'
                    },
                ));
                link.appendChild(createElement(
                    'h3',
                    { 'class': 'h3-news-header' },
                    post.title.rendered)
                );
                newsList.appendChild(link);
            }
        });

    function createElement(type, attributes, html) {
        var e = document.createElement(type);
        var attrKeys = Object.keys(attributes);
        for (var i = 0; i < attrKeys.length; i++) {
            e.setAttribute(attrKeys[i], attributes[attrKeys[i]]);
        }
        if (html) e.innerHTML = html;
        return e;
    }
});
