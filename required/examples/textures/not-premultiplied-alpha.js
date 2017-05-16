var app = new PIXI.Application(800, 600, {backgroundColor: 0x308030});
document.body.appendChild(app.view);

//compressed textures setup

PIXI.compressedTextures.detectExtensions(app.renderer);
var loader = new PIXI.loaders.Loader();
loader.pre(PIXI.compressedTextures.imageParser());

// for PNG in videomemory, premultiplied=true, for DDS its false
// what if we upload them, but change the flag after it?
// sprites 2 and 3 are wrong

var textStyle = { fill: 0xffffff };
function createSprite(texture, text) {
	var sprite = new PIXI.Sprite(texture);
	sprite.addChild(new PIXI.Text(text, textStyle));
	sprite.anchor.set(0.5, 1);
	sprite.children[0].anchor.set(0.5, 0);
	return sprite;
}

loader.add('house_png', 'required/assets/compressed/shop_svyaznoy.png')
	.add('house_png_2', 'required/assets/compressed/shop_svyaznoy.png?v=2')
    .add('house_dds', 'required/assets/compressed/shop_svyaznoy.dds')
	.add('house_dds_2', 'required/assets/compressed/shop_svyaznoy.dds?v=2')
    .load(function(loader, resources) {
        var spr1 = createSprite(resources.house_png.texture, "PNG premultiplied=true, good");
        var spr2 = createSprite(resources.house_png_2.texture, "PNG premultiplied=false, bad");
		var spr3 = createSprite(resources.house_dds.texture, "DDS premultiplied=true, bad");
		var spr4 = createSprite(resources.house_dds_2.texture, "DDS premultiplied=false, good");
		
		resources.house_png.texture.baseTexture.premultipliedAlpha = true;
		resources.house_dds.texture.baseTexture.premultipliedAlpha = true;
		resources.house_png_2.texture.baseTexture.premultipliedAlpha = false;
		resources.house_dds_2.texture.baseTexture.premultipliedAlpha = false;
		
		
		spr1.position.set(250, 250);
		spr1.scale.set(0.8);
		
		spr2.position.set(550, 250);
		spr2.scale.set(0.8);
		
		spr3.position.set(250, 500);
		spr3.scale.set(0.8);
		
		spr4.position.set(550, 500);
		spr4.scale.set(0.8);
		
        app.stage.addChild(spr1, spr2, spr3, spr4);
    });
