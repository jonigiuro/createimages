var CreateImages = {
	init: function() {
		$('img').each(function() {
			var shakka = $(this);
			var src = $(this).attr('src');
			if(src.indexOf('http://lorempixel.com') != -1) {
				var argsArr = src.split('/');
				var width = argsArr[3];
				var height = argsArr[4];
				var category = argsArr[5];
				var catArray = [];
				var placeholdersRoot = 'img/placeholders/';

				var newCanvas = document.createElement('canvas');

				var context = newCanvas.getContext('2d');

				newCanvas.height= height;
				newCanvas.width= width;

				context.fillStyle = '#dadada';  
				context.fillRect(0, 0, width, height);
				context.fillStyle = '#fafafa';  
				context.fillRect(1, 1, width - 2, height - 2);

				if(category) {
					if (category == 'animals') {

						catArray = [
						'animals00.jpg',
						'animals01.jpg',
						'animals02.jpg',
						'animals03.jpg',
						'animals04.jpg',
						'animals05.jpg',
						'animals06.jpg',
						'animals07.jpg',
						'animals08.jpg',
						'animals09.jpg'];

					} else if (category == 'people') {
						catArray = ['animals00.jpg']; // change to people
					} else {
						catArray = ['animals00.jpg']; //change to random
					}
					var imageSrc = placeholdersRoot + catArray[Math.floor(Math.random() * catArray.length)];

					var imageObj = new Image();

					imageObj.onload = function() {
						context.drawImage(imageObj, 1, 1, width - 2 , (width * imageObj.height / imageObj.width) - 2);

						context.fillStyle = "white";

						context.shadowColor = 'black';
						context.shadowOffsetX = 0;
						context.shadowOffsetY = 0;
						context.shadowBlur = 2;

						var fontSize = width/10;
						context.font = "normal " + (fontSize  + 3) + "px Helvetica";
						context.fillText(width + " x " + height, 7, height - 7);

						var img  = newCanvas.toDataURL("image/jpg");

						shakka.attr('src', img);
					}

					imageObj.src = imageSrc;

				} else {
					context.fillStyle = '#bababa';  
					context.fillRect(5, 5, width - 10, height - 10);
					context.fillStyle = "#666";

					var fontSize = width/10;
					context.font = "normal " + (fontSize  + 3) + "px Helvetica";
					context.fillText(width + " x " + height, 7, height - 7);

					var img  = newCanvas.toDataURL("image/jpg");
					shakka.attr('src', img);
				}
				
			}
		})
	}
}
