;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-search" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M953.504 908.256l-152.608-163.296c61.856-74.496 95.872-167.36 95.872-265.12 0-229.344-186.624-415.968-416.032-415.968-229.344 0-415.968 186.592-415.968 415.968s186.624 415.968 416 415.968c60.096-0.032 118.048-12.576 172.224-37.248 16.096-7.328 23.2-26.304 15.872-42.368-7.328-16.128-26.4-23.264-42.368-15.872-45.856 20.864-94.88 31.456-145.76 31.488-194.08 0-351.968-157.888-351.968-351.968 0-194.048 157.888-351.968 351.968-351.968 194.112 0 352.032 157.888 352.032 351.968 0 91.36-34.848 177.92-98.08 243.744-12.256 12.736-11.84 32.992 0.864 45.248 0.96 0.928 2.208 1.28 3.296 2.08 0.864 1.28 1.312 2.752 2.4 3.904l165.504 177.088c6.272 6.752 14.816 10.144 23.36 10.144 7.84 0 15.68-2.848 21.856-8.64C964.864 941.408 965.568 921.152 953.504 908.256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-list" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M896 256l-288 0c-17.696 0-32-14.336-32-32s14.304-32 32-32l288 0c17.696 0 32 14.336 32 32S913.696 256 896 256z"  ></path>' +
    '' +
    '<path d="M896 416l-288 0c-17.696 0-32-14.336-32-32s14.304-32 32-32l288 0c17.696 0 32 14.336 32 32S913.696 416 896 416z"  ></path>' +
    '' +
    '<path d="M896 672l-288 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l288 0c17.696 0 32 14.304 32 32S913.696 672 896 672z"  ></path>' +
    '' +
    '<path d="M896 832l-288 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l288 0c17.696 0 32 14.304 32 32S913.696 832 896 832z"  ></path>' +
    '' +
    '<path d="M384 480 192 480c-52.928 0-96-43.072-96-96L96 192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 436.928 436.928 480 384 480zM192 160C174.368 160 160 174.368 160 192l0 192c0 17.632 14.368 32 32 32l192 0c17.632 0 32-14.368 32-32L416 192c0-17.632-14.368-32-32-32L192 160z"  ></path>' +
    '' +
    '<path d="M384 928 192 928c-52.928 0-96-43.072-96-96l0-192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 884.928 436.928 928 384 928zM192 608c-17.632 0-32 14.336-32 32l0 192c0 17.664 14.368 32 32 32l192 0c17.632 0 32-14.336 32-32l0-192c0-17.664-14.368-32-32-32L192 608z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-profile" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M768 384c0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 16 6.4 35.2 25.6 38.4H128c16 0 28.8-9.6 32-25.6 28.8-150.4 160-259.2 313.6-262.4h6.4c160 0 288-128 288-288zM256 384c0-124.8 99.2-224 224-224s224 99.2 224 224c0 121.6-99.2 220.8-220.8 224H473.6C352 604.8 256 505.6 256 384zM896 704h-256c-19.2 0-32 12.8-32 32v192c0 19.2 12.8 32 32 32h256c19.2 0 32-12.8 32-32v-192c0-16-12.8-32-32-32z m-32 192h-192v-128h192v128z" fill="#666666" ></path>' +
    '' +
    '<path d="M736 864h32c19.2 0 32-12.8 32-32s-12.8-32-32-32h-32c-19.2 0-32 12.8-32 32s16 32 32 32z" fill="#666666" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)