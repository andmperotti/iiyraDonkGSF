## Path of Exile Group Self Found Project
A full stack app that allows a group of players playing in a self found private league in the video game Path of Exile, to organize what items/gems/etc they need for their characters.

**Link to project:** https://poegsf.onrender.com//

![alt tag](https://i.ibb.co/v1x3ksY/Screenshot-2024-07-11-at-10-51-00-AM.png)
Site is on a free tier so it takes a while to load up if the server hasn't been used recently.

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node, Express, MongoDB

The project was built using Node.js with Express, which stores data from users on MongoDB, and uses EJS to create dynamic content.

## Optimizations

I didn't use partials in my ejs so there's quite a bit of redundant repetition in the ejs files. 
I also used clientside javascript to create delete buttons, I could have used forms to submit a request to delete items from MongoDB which would be quite a faster.
The images used are not using srcset, but instead I used the same size images for all devices.
I custom made the css which I'm sure has some problems, would like to later change this to using a framework to optimize and modularize across the different pages layouts/etc.
Instead of local logins I could use the Grinding Gear Games OAuth, just haven't gotten around to it yet, but that would also open the project up to be able to create a unique leaderboard, challenges leaderboard, and be able to verify that individuals using this site are actually players in the private league.



## Lessons Learned: 

This was my first node project and I learned that if you're going to update modules you might have to redo some code because syntax changes across major versions.
 
