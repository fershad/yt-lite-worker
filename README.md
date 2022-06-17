# Lite YouTube Worker 👷

A Cloudflare Worker that looks for YouTube embeds on a page, and replaces them with the Lite YouTube Embed facade.

## Why would you want to do this?

- It's better for performance 🚀
- It makes your page greener 🌏️

### Better performance

Rather than loading the YouTube player, and all the JavaScript that comes with it. This Worker replaces it with a facade. YouTube's JS code gets downloaded when the user wants to use the player.

See the [performance comparison](https://github.com/paulirish/lite-youtube-embed#comparison) of the original web component.

### Better for the planet

By default the YouTube player downloads just over 1MB of data when it is loaded on a page. Using this Worker can reduce the initial size of your page by about 1MB (about 0.305 grams of CO2).

## Options

This Worker uses [justinribeiro/lite-youtube](https://github.com/justinribeiro/lite-youtube). You can adjust the script to use any of options available in that web component.