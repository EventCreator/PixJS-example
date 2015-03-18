$(document).ready(function () {
    var baseUrl = location.href.split('?')[0],
        params,
        select = document.getElementById('version'),
        themeSelect = document.getElementById('theme'),
        editor;

    params = App.getUrlParams();

    document.title = 'pixi.js - ' + params.title;


    App.loadGithubTags('version',onTagsLoaded);

    var nav = document.getElementById('navList');
    App.loadManifest(nav);

    if (params.v) {
        console.log('loading external pixi ...')
        var url = 'https://cdn.rawgit.com/GoodBoyDigital/pixi.js/' + params.v + '/bin/pixi.js';
        App.loadPixi(url,onPixiLoaded);
    }
    else{
        console.log('Loading local pixi');
        App.loadPixi('_site/js/pixi.js',onPixiLoaded);
    }

    function onTagsLoaded (select)
    {
        console.log('tags loaded')
        //  if a specific version was required
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
            var params = App.getUrlParams();

            params.v = select.options[select.selectedIndex].dataset.version;

            console.log('hi');
            window.location.href = baseUrl + '?' + $.param(params);
        });
    }

    function onPixiLoaded()
    {
        console.log('pixi loaded');
        loadExample('examples/' + params.s + '/' + params.f);
    }

    function loadExample(url)
    {
        // load the example code and executes it
        App.loadScript(url, 'example-script');

        // load the example code
        $.ajax({ url: url, dataType: 'text' })
            .done(function (data)
            {
                exampleCodeLoaded(url, data);
            });
    }

    function exampleCodeLoaded (url, code)
    {
        var textarea = document.getElementById('sourcecode');

        var title = document.querySelector('h1');

        title.innerHTML = params.title;

        textarea.innerHTML = code;

        var editorOptions = {
            mode: 'javascript',
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true
        };

        editor = CodeMirror.fromTextArea(textarea,editorOptions);

        themeSelect.addEventListener('change',changeTheme,false);

        function changeTheme()
        {
            var theme = themeSelect.options[themeSelect.selectedIndex].innerHTML;
            editor.setOption('theme', theme);
        }
    }

    window.addEventListener('resize',resizeCanvas,false);

    var hamb = document.getElementById('hamburger');

    hamb.addEventListener('mousedown',toggleNav,false);

    hamb.addEventListener('touchstart',toggleNav,false);

    var refreshBtn = document.getElementById('refresh');


    var canReload = true;

    function reloadCode (e) {

        if(canReload)
        {
            var content = editor.getValue();
        }
    }

    refresh.addEventListener('click',reloadCode);

    var nav = document.querySelector('nav');

    var bol = true;

    function toggleNav () {

        bol = !bol;

        if(bol)
        {
            nav.className = 'show';
        }
        else{
            nav.className = 'hidden';
        }

    }

    function resizeCanvas () {

        var canvas = document.querySelector('canvas');

        // for slow connections
        if(canvas)
        {
            var ratio = canvas.width/canvas.height;

            ratio = window.innerWidth/(canvas.width) < window.innerHeight/(canvas.height) ? window.innerWidth/(canvas.width) : window.innerHeight/(canvas.height);

            var w2 = Math.min(canvas.width * ratio, window.innerWidth);
            var h2 = Math.min(canvas.height * ratio, window.innerHeight);

            w2 = Math.min(800,w2);
            h2 = Math.min(600,h2);

            canvas.style.width = w2 + "px";
            canvas.style.height = h2 + "px";
        }



    }

    resizeCanvas();


});
