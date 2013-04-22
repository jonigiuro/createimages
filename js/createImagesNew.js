var CreateImages = {

	settings: {
		placeholdersRoot : 'img/placeholders/',
		placeholdersNumber : 4
	},

	init: function() {
		//Callect all images
		var images = $('img');
		this.processImages( images );
	},

	processImages : function( images ) {
		var self = this;

		images.each( function() {
			var $self = $(this);
			var src = $self.attr('src'); //Get the src of the current image

			if(src.indexOf('http://lorempixel.com') != -1) { //If it is lorempixel
				var attributes = self.collectAttributes( src );
				
				self.createCanvas( attributes, $self );
			}
		})
	},

	collectAttributes : function( src ) {
		var argsArr = src.split('/')

		return {
			width : argsArr[3],
			height : argsArr[4],
			category : argsArr[5]
		}
	},

	createCanvas : function( attributes, $self ) {
		var self = this;
		//Create the temporary Canvas, used to create the image
		var newCanvas = document.createElement('canvas');
		var context = newCanvas.getContext('2d');

		//shorten some variables
		var width = attributes.width;
		var height = attributes.height;
		var category = attributes.category;
		//and some settings
		var root = this.settings.placeholdersRoot;
		var imagesNumber = this.settings.placeholdersNumber;

		//set the canvas dimension the same as the original image
		newCanvas.height = height;
		newCanvas.width = width;

		//Create a gray thin border, so you're always sure to have visible boundaries
		context.fillStyle = '#dadada';  
		context.fillRect(0, 0, width, height);
		context.fillStyle = '#fafafa';  
		context.fillRect(1, 1, width - 2, height - 2);

		//If there is a category, render an actual image, otherwise just a gray box
		if ( category ) {
			//Concatenate strings to get the full path to a random image to render
			var imageSrc = root + category + '/' + Math.round(Math.random() * (imagesNumber - 1)) + '.jpg';

			//create an image wuth a subject
			this.createImage( attributes, imageSrc, context, $self, newCanvas );
		} else {
			this.createGrayBox( attributes, context, $self, newCanvas );
		}

		

	},

	createImage : function( attributes, imageSrc, context, $self, newCanvas ) {
		var self = this;

		//shorten some variables
		var width = attributes.width;
		var height = attributes.height;
		var category = attributes.category;

		//Actually create the image

		var imageObj = new Image();

		imageObj.onload = function() {
			var ratio = width / height;

			if( ratio >= 1) {
				context.drawImage(imageObj, 1, 1, width - 2 , (width * imageObj.height / imageObj.width) - 2);
			} else {
				context.drawImage(imageObj, 1, 1, (height * imageObj.width / imageObj.height) - 2 , height - 2);
			}
			

			context.fillStyle = "white";

			context.shadowColor = 'black';
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 2;

			var fontSize = width/10;
			context.font = "normal " + (fontSize  + 3) + "px Helvetica";
			context.fillText(width + " x " + height, 7, height - 7);

			var img  = newCanvas.toDataURL("image/jpg");
			$self.attr('src', img);
		}

		imageObj.src = imageSrc;
	},

	createGrayBox : function( attributes, context, $self, newCanvas ) {
		//shorten some variables
		var width = attributes.width;
		var height = attributes.height;
		var category = attributes.category;

		//Render the box
		context.fillStyle = '#bababa';  
		context.fillRect(5, 5, width - 10, height - 10);
		context.fillStyle = "#666";

		var fontSize = width/10;
		context.font = "normal " + (fontSize  + 3) + "px Helvetica";
		context.fillText(width + " x " + height, 7, height - 7);

		var img  = newCanvas.toDataURL("image/jpg");
			$self.attr('src', img);

	},

}