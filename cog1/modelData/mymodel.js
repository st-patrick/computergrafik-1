/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *
 * @namespace cog1.data
 * @module mymodel
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {

		var building_length = 7;
		var building_width = 3;
		var building_base_height = 3;
		var tower_base_height = 4;
		var tower_top_height = 2;
		var dome_height = 1;
		var roof_height = 1;
		var dome_inset = 0.2;





		
		if(parameter) {
			var scale = parameter.scale;
			var textureURL = parameter.textureURL;
			// Each face shows a different area of the given texture (e.g, a dice).
			var sixFacesTexture = parameter.sixFacesTexture;
		}
		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		if(textureURL == undefined){
			textureURL = "";
		}
		if(sixFacesTexture == undefined){
			sixFacesTexture = false;
		}

		// Instance of the model to be returned.
		var instance = {};


		instance.vertices = [
			// bottom/foundation (y=0)
			[0,					0,											0], 				// 0 left bottom corner
			[building_width,	0,											0], 				// 1 right bottom corner
			[building_width,	0,											building_length], 	// 2 right bottom far corner
			[0,					0,											building_length], 	// 3 left bottom far corner
			// main building roof start (y=building_height)
			[0,					building_base_height,						0], 				// 4 left closer corner
			[building_width,	building_base_height,						0], 				// 5 right closer corner
			[building_width,	building_base_height,						building_length], 	// 6 right bottom far corner
			[0,					building_base_height,						building_length], 	// 7 left bottom far corner
			// dome foundation and intersection with roof start
			[0,					building_base_height + roof_height,			0], 				// 8 left closer corner
			[building_width,	building_base_height + roof_height,			0], 				// 9 right closer corner
			[building_width,	building_base_height + roof_height,			building_width], 	// 10 right  far corner
			[0,					building_base_height + roof_height,			building_width], 	// 11 left  far corner
			[building_width,	building_base_height,						building_width], 	// 12 right intersection
			[0,					building_base_height,						building_width], 	// 13 left intersection
			// basic roof
			[building_width / 2,building_base_height + roof_height, 		building_width], 	// 14 closer rooftop corner
			[building_width / 2,building_base_height + roof_height, 		building_length], 	// 15 far rooftop corner
			// the tower (additional base corners)
			[building_width,	building_base_height,						building_length - building_width / 2], // 16 closer bottom right corner
			[building_width / 2,building_base_height + roof_height,			building_length - building_width / 2], // 17 closer bottom left corner
			// the tower (roof base corners)
			[building_width / 2,building_base_height + tower_base_height,	building_length - building_width / 2], // 18 closer bottom left corner
			[building_width,	building_base_height + tower_base_height,	building_length - building_width / 2], // 19 closer bottom right corner
			[building_width,	building_base_height + tower_base_height,	building_length], // 20 closer bottom right corner
			[building_width / 2,building_base_height + tower_base_height,	building_length], // 21 closer bottom left corner
			// the tower top point
			[building_width*3/4,building_base_height + tower_base_height + tower_top_height, building_length - building_width / 4], // 22 top of the tower
			// the dome base points, in order of top view, starting with the point that intersects other roof, clockwise
			[building_width / 2,building_base_height + roof_height, 						building_width], // 23 "north"
			[building_width*7/8,building_base_height + roof_height, 						building_width*7/8], // 24 "northeast"
			[building_width,	building_base_height + roof_height, 						building_width / 2], // 25 "east"
			[building_width*7/8,building_base_height + roof_height, 						building_width*1/8], // 26 "southeast"
			[building_width / 2,building_base_height + roof_height, 						0], // 27 "south"
			[building_width*1/8,building_base_height + roof_height, 						building_width*1/8], // 28 "southwest"
			[0,					building_base_height + roof_height, 						building_width / 2], // 29 "west"
			[building_width*1/8,building_base_height + roof_height, 						building_width*7/8], // 30 "northwest"
			// the dome top
			[building_width / 2,building_base_height + roof_height + dome_height, 			building_width / 2], // 31 dome pointy top
		];
		// Use default colors, implicitly.
		// instance.colors = data.colors;

		// Corners of the faces have to fit the texture coordinates.			
		// Faces: bottom/down, top/up, front, right, back, left. 
		instance.polygonVertices = [
			// main building cuboid
			[0,1,5,4], // 0 front
			[0,1,2,3], // 1 bottom / foundation
			[1,2,6,5], // 2 right side
			[0,3,7,4], // 3 left side
			[2,3,7,6], // 4 far side
			// we could add a roof face but it will not be visible from the outside, so let's leave out [4,5,6,7]

			// dome foundation
			[4,5,9,8], // 5 front
			[5,9,10,12], // 6 right side
			[4,8,11,13], // 7 left side
			[10,11,13,12], // 8 far side
			[8,9,10,11], // 9 top

			// roof faces
			[6,12,14,15], // 10 right side
			[7,13,14,15], // 11 left side
			[6,7,15], // 12 back side / far side

			// tower base
			[17,16,19,18], // 13 tower front side
			[15,17,18,21], // 14 tower left side
			[6,15,21,20], // 15 tower back side / far side
			[6,16,19,20], // 16 tower right side

			// tower top
			[18,19,22], // 17 front facing
			[19,20,22], // 18 right side
			[20,21,22], // 19 back facing
			[18,21,22], // 20 left side

			// dome, clockwise from top view with back of the building facing up
			[23,24,31], // 21 "northnortheast"
			[24,25,31], // 22 "eastnortheast"
			[25,26,31], // 23 "eastsoutheast"
			[26,27,31], // 24 "southsoutheast"
			[27,28,31], // 25 "southsouthwest"
			[28,29,31], // 26 "westsouthwest"
			[29,30,31], // 27 "westnorthwest"
			[30,23,31], // 28 "northnorthwest"
		];

		instance.polygonColors = [0,1,2,3,4,5,6,7,8,9,10,0,1,2,3,4,5,6,7,8,9,10,0,1,2,3,4,5,6];
		
		//instance.vertexNormals = [];
		//instance.polygonNormals = [];

		if( ! sixFacesTexture){
	        // Use default texture coordinates.
			// instance.textureCoord = [];
			// For order of corners of faces, see polygonVertices.
			instance.polygonTextureCoord = [
				[1,2,3,0],
				[1,2,3,0],
				[1,0,3,2],
				[3,0,1,2],
				[3,0,1,2],
				[3,0,1,2]
			];
		} else {
			// BEGIN exercise Cube-Dice-Texture

			// Order 0 to 16 form bottom-left to top-right
			// line by line, indices in spatial order:
			instance.textureCoord = [];
			// ...

			// Use textureCoord in order given for textureCoord.
			// The order of corners of faces must fit the one given in polygonVertices.
			// Match orientation of face given for polygonVertices.
			// D=bottom/down, U=top/up, F=front, R=right, B=back, L=left
			// The mapping is explained on the texture image.
			// instance.polygonTextureCoord = [ ....];

			// END exercise Cube-Dice-Texture
		}

		instance.textureURL = textureURL;

		data.applyScale.call(instance, scale);

		return instance;		
	};
});
