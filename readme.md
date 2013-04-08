### Client side image placeholder generation (through canvas, with online-service fallback)

Basically it renders placeholder of a given size for front end developement.

### How to use

Include the script into you html file and you're good to go, and then write the image tags as if you're using lorempixel.

    <img src="http://lorempixel.com/200/200/animals" alt="animal placeholder" />

This will render an image 200 pixels tall, 200 pixels wide and with an animal on it.

### Customization

I suggest you add big images named after a category in 'img/placeholders/' because the script will be using those to render the images.
I use http://lorempixel.com as a fallback but you could use any online tool you want, just remember to change it in the script