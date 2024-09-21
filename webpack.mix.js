const mix = require("laravel-mix");
require("laravel-mix-clean");

const styles = ["admin-style", "editor-style", "login-style"];
const page_styles = require("./resources/src/config.json");

// Genetic
mix.setPublicPath("resources/dist");

// JS
mix
  .js("resources/src/js/app.js", "js")
  .autoload({
    jquery: ["$", "window.jQuery"],
  })
  .extract();

// CSS
for (let index = 0; index < styles.length; index++) {
  mix.sass(`resources/src/sass/${styles[index]}.scss`, "styles").options({
    processCssUrls: false,
    postCss: [require("autoprefixer")],
  });
}
for (let index = 0; index < page_styles.length; index++) {
  mix.sass(`resources/src/sass/pages/${page_styles[index]}.scss`, "styles").options({
    processCssUrls: false,
    postCss: [require("autoprefixer")],
  });
}

if (mix.inProduction()) {
  // Extra
  mix
    .copyDirectory("resources/src/fonts", "resources/dist/fonts")
    .copyDirectory("resources/src/img", "resources/dist/img");

  // Clean, sourcemaps and version
  mix.clean().sourceMaps().version();
}

// Mute notifications
mix.disableNotifications();
