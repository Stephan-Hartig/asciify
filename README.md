# ASCIIFY
This is a frontend for a mini-API. It converts images to ASCII art using
edge-detection and dilation algorithms. The API is so small I went ahead and
made one project for both the frontend and the API.


To use: Upload an image, preferably a cartoon image with decent contrast
and a plain background, and then let it do its magic!


Limitations: The conversion is pretty mediocre, so don't expect every image
to work. The ones bundled under assets/ should work fine. Also, because it
renders server-side, it's pretty slow, and there's a limit on the image-size.


## Why?
The sane way to have done this would've been to do everything client-side.
I wanted to experiment a bit with server-side rendering and AJAX, though,
which was the partly the point of this project.


## Thanks
I used some code from [petarjs's](https://github.com/petarjs)
[js-canny-edge-detector](https://github.com/petarjs/js-canny-edge-detector)
project, specifically from his website. It was MIT licence, but I wanted to
shout out his project either way because I  didn't end up using his module for
this project.

## License
MIT
