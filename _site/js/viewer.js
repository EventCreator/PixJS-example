$(function () {
    var baseUrl = location.href.split('?')[0],
        params = location.href.split('?')[1],
        select = document.getElementById('version');

    params = params.split('&').reduce(function (obj, val) {
        val = val.split('=');

        obj[val[0]] = decodeURIComponent(val[1]);

        return obj;
    }, {});

    document.title = 'pixi.js - ' + params.t;

    $.getJSON('https://api.github.com/repos/GoodBoyDigital/pixi.js/git/refs/tags')
        .done(function (data) {
            data = data
                .filter(function (tag) {
                    return tag.ref.indexOf('refs/tags/v3') === 0;
                })
                .map(function (tag) {
                    return tag.ref.replace('refs/tags/', '');
                });

            for (var i = 0; i < data.length; ++i) {
                var option = document.createElement('option');

                option.value = 'https://cdn.rawgit.com/GoodBoyDigital/pixi.js/' + data[i] + '/bin/pixi.js';
                option.textContent = data[i];
                option.dataset.version = data[i];
                select.appendChild(option);
            }

            if (params.v) {
                for (var i = 0; i < select.options.length; ++i) {
                    if (select.options[i].dataset.version === params.v) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            } else {
                select.selectedIndex = 1;
            }

            select.addEventListener('change', function () {
                params.v = select.options[select.selectedIndex].dataset.version;

                location.href = baseUrl + '?' + $.param(params);
            });

            loadPixi(select.value);
        });

    function loadPixi(url) {
        // get the pixi lib
        $.getScript(url)
            .done(function () {
                loadExample('examples/' + params.s + '/' + params.f);
            });
    }

    function loadExample(url) {
        // load the example code
        $.getScript(url)
            .done(function () {
                // load the example code
                $.ajax({ url: url, dataType: 'text' })
                    .done(function (script) {
                        console.log(arguments);
                        document.getElementById('sourcecode').innerHTML = script;
                    });
            });
    }
});
