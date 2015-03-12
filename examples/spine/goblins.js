
    // create a new loader
    var loader = new PIXI.Loader();
    // load spine data
    loader.add('goblins',"_assets/spine/goblins.json");
    // use callback
    loader.once('complete',onAssetsLoaded);

    //begin load
    loader.load();


    // create a new instance of a pixi stage
    var stage = new PIXI.Container();

    stage.interactive = true;

    // create a renderer instance
    var renderer = new PIXI.autoDetectRenderer(800, 600);

    // add render view to DOM
    document.getElementById('example').appendChild(renderer.view);

    function onAssetsLoaded(loader,res)
    {
        var goblin = new PIXI.Spine(res.goblins.spineData);

        // set current skin
        goblin.skeleton.setSkinByName('goblin');
        goblin.skeleton.setSlotsToSetupPose();

        // set the position
        goblin.position.x = 400;
        goblin.position.y = 600;

        goblin.scale.set(1.5);

        // play animation
        goblin.state.setAnimationByName(0, "walk", true);

        stage.addChild(goblin);

        stage.click = function()
        {
            // change current skin
            var currentSkinName = goblin.skeleton.skin.name;
            var newSkinName = (currentSkinName === 'goblin' ? 'goblingirl' : 'goblin');
            goblin.skeleton.setSkinByName(newSkinName);
            goblin.skeleton.setSlotsToSetupPose();
        };

        var logo = PIXI.Sprite.fromImage("pixi.png")
        stage.addChild(logo);

        logo.anchor.x = 1;
        logo.scale.set(0.5);

        logo.position.x = window.innerWidth
        logo.position.y = window.innerHeight - 70;

        logo.interactive = true;
        logo.buttonMode = true;

        logo.click = logo.tap = function()
        {
            window.open("https://github.com/GoodBoyDigital/pixi.js", "_blank")
        }
    }



    requestAnimationFrame(animate);

    function animate() {

        requestAnimationFrame( animate );
        renderer.render(stage);
    }
