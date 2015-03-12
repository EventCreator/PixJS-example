
    // // Load them google fonts before starting...!
    WebFontConfig = {
      google: {
        families: [ 'Snippet', 'Arvo:700italic', 'Podkova:700' ]
      },

      active: function() {
        // do something
        init();
      }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();

    function init()
    {

        // create a new loader
        var loader = new PIXI.Loader();
        loader.add('desyrel',"_assets/desyrel.xml");
        // use callback
        loader.once('complete',onAssetsLoaded);
        // begin load
        loader.load();

        // create an new instance of a pixi stage
        var stage = new PIXI.Container();

        function onAssetsLoaded()
        {
            var bitmapFontText = new PIXI.BitmapText("bitmap fonts are\n now supported!", { font: "35px Desyrel", align: "right" });

            bitmapFontText.position.x = 600 - bitmapFontText.textWidth;
            bitmapFontText.position.y = 20;

            stage.addChild(bitmapFontText);
        }

        // add a shiny background...
        var background = PIXI.Sprite.fromImage("_assets/textDemoBG.jpg");
        stage.addChild(background);

        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(620, 400);
        // add the renderer view element to the DOM
        document.getElementById('example').appendChild(renderer.view);

        // create some white text using the Snippet webfont
        var textSample = new PIXI.Text("Pixi.js can has\n multiline text!", { font: "35px Snippet", fill: "white", align: "left" });
        textSample.position.set(20);

        // create a text object with a nice stroke
        var spinningText = new PIXI.Text("I'm fun!", { font: "bold 60px Arial", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6 });

        // setting the anchor point to 0.5 will center align the text... great for spinning!
        spinningText.anchor.set(0.5);
        spinningText.position.x = 310;
        spinningText.position.y = 200;

        // create a text object that will be updated...
        var countingText = new PIXI.Text("COUNT 4EVAR: 0", { font: "bold italic 60px Arvo", fill: "#3e1707", align: "center", stroke: "#a4410e", strokeThickness: 7 });

        countingText.position.x = 310;
        countingText.position.y = 320;
        countingText.anchor.x = 0.5;

        stage.addChild(textSample);
        stage.addChild(spinningText);
        stage.addChild(countingText);

        var count = 0;

        requestAnimationFrame(animate);

        function animate() {

            renderer.render(stage);

            count += 0.05;
            // update the text with a new string
            countingText.text = "COUNT 4EVAR: " + Math.floor(count);

            // let's spin the spinning text
            spinningText.rotation += 0.03;

            requestAnimationFrame(animate);
        }


    }
