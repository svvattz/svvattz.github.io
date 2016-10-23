function AstroMath() {}
function Projection(t, e) {
  this.PROJECTION = Projection.PROJ_TAN, this.ROT = this.tr_oR(t, e)
}
function Coo(t, e, i) {
  this.lon = t, this.lat = e, this.prec = i, this.frame = null, this.computeDirCos()
}
function Tokenizer(t, e) {
  this.string = Strings.trim(t, e), this.sep = e, this.pos = 0
}
function Strings() {}
function Numbers() {}
function relMouseCoords(t) {
  if (t.offsetX) return {
    x: t.offsetX,
    y: t.offsetY
  };
  if (!Utils.cssScale) {
    var e = window.getComputedStyle(document.body, null),
      i = e.getPropertyValue("-webkit-transform") || e.getPropertyValue("-moz-transform") || e.getPropertyValue("-ms-transform") || e.getPropertyValue("-o-transform") || e.getPropertyValue("transform"),
      o = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
      r = i.match(o);
    Utils.cssScale = r ? parseFloat(r[1]) : 1
  }
  var s = t;
  s.target;
  var a = s.target || s.srcElement,
    n = a.currentStyle || window.getComputedStyle(a, null),
    h = parseInt(n.borderLeftWidth, 10),
    l = parseInt(n.borderTopWidth, 10),
    c = a.getBoundingClientRect(),
    u = s.clientX - h - c.left,
    d = s.clientY - l - c.top;
  return {
    x: parseInt(u / Utils.cssScale),
    y: parseInt(d / Utils.cssScale)
  }
}
var cds = cds || {},
  A = A || {};
"object" != typeof JSON && (JSON = {}), function () {
  "use strict";

  function f(t) {
    return 10 > t ? "0" + t : t
  }
  function quote(t) {
    return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
      var e = meta[t];
      return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + t + '"'
  }
  function str(t, e) {
    var i, o, r, s, a, n = gap,
      h = e[t];
    switch (h && "object" == typeof h && "function" == typeof h.toJSON && (h = h.toJSON(t)), "function" == typeof rep && (h = rep.call(e, t, h)), typeof h) {
    case "string":
      return quote(h);
    case "number":
      return isFinite(h) ? h + "" : "null";
    case "boolean":
    case "null":
      return h + "";
    case "object":
      if (!h) return "null";
      if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(h)) {
        for (s = h.length, i = 0; s > i; i += 1) a[i] = str(i, h) || "null";
        return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + n + "]" : "[" + a.join(",") + "]", gap = n, r
      }
      if (rep && "object" == typeof rep) for (s = rep.length, i = 0; s > i; i += 1)"string" == typeof rep[i] && (o = rep[i], r = str(o, h), r && a.push(quote(o) + (gap ? ": " : ":") + r));
      else for (o in h) Object.prototype.hasOwnProperty.call(h, o) && (r = str(o, h), r && a.push(quote(o) + (gap ? ": " : ":") + r));
      return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + n + "}" : "{" + a.join(",") + "}", gap = n, r
    }
  }
  "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
    return this.valueOf()
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    },
    rep;
  "function" != typeof JSON.stringify && (JSON.stringify = function (t, e, i) {
    var o;
    if (gap = "", indent = "", "number" == typeof i) for (o = 0; i > o; o += 1) indent += " ";
    else "string" == typeof i && (indent = i);
    if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw Error("JSON.stringify");
    return str("", {
      "": t
    })
  }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
    function walk(t, e) {
      var i, o, r = t[e];
      if (r && "object" == typeof r) for (i in r) Object.prototype.hasOwnProperty.call(r, i) && (o = walk(r, i), void 0 !== o ? r[i] = o : delete r[i]);
      return reviver.call(t, e, r)
    }
    var j;
    if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
      return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
      "": j
    }, "") : j;
    throw new SyntaxError("JSON.parse")
  })
}(), Logger = {}, Logger.log = function (t, e) {
  try {
    var i = "http://alasky.u-strasbg.fr/cgi/AladinLiteLogger/log.py",
      o = "";
    e && (o = JSON.stringify(e)), $.ajax({
      url: i,
      data: {
        action: t,
        params: o,
        pageUrl: window.location.href,
        referer: document.referrer ? document.referrer : ""
      },
      method: "GET",
      dataType: "json"
    })
  } catch (r) {
    window.console && console.log("Exception: " + r)
  }
}, function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function (t) {
  function e(e) {
    var r, s = e || window.event,
      a = [].slice.call(arguments, 1),
      n = 0,
      h = 0,
      l = 0,
      c = 0,
      u = 0;
    return e = t.event.fix(s), e.type = "mousewheel", s.wheelDelta && (n = s.wheelDelta), s.detail && (n = -1 * s.detail), l = n, void 0 !== s.axis && s.axis === s.HORIZONTAL_AXIS && (l = 0, h = -1 * n), s.deltaY && (l = -1 * s.deltaY, n = l), s.deltaX && (h = s.deltaX, n = -1 * h), void 0 !== s.wheelDeltaY && (l = s.wheelDeltaY), void 0 !== s.wheelDeltaX && (h = -1 * s.wheelDeltaX), c = Math.abs(n), (!i || i > c) && (i = c), u = Math.max(Math.abs(l), Math.abs(h)), (!o || o > u) && (o = u), r = n > 0 ? "floor" : "ceil", n = Math[r](n / i), h = Math[r](h / o), l = Math[r](l / o), a.unshift(e, n, h, l), (t.event.dispatch || t.event.handle).apply(this, a)
  }
  var i, o, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
  if (t.event.fixHooks) for (var a = r.length; a;) t.event.fixHooks[r[--a]] = t.event.mouseHooks;
  t.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener) for (var t = s.length; t;) this.addEventListener(s[--t], e, !1);
      else this.onmousewheel = e
    },
    teardown: function () {
      if (this.removeEventListener) for (var t = s.length; t;) this.removeEventListener(s[--t], e, !1);
      else this.onmousewheel = null
    }
  }, t.fn.extend({
    mousewheel: function (t) {
      return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
    },
    unmousewheel: function (t) {
      return this.unbind("mousewheel", t)
    }
  })
}), window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function (t) {
    window.setTimeout(t, 1e3 / 60)
  }
}();
var Stats = function () {
    function t(t, e, i) {
      var o, r, s;
      for (r = 0; 30 > r; r++) for (o = 0; 73 > o; o++) s = 4 * (o + 74 * r), t[s] = t[s + 4], t[s + 1] = t[s + 5], t[s + 2] = t[s + 6];
      for (r = 0; 30 > r; r++) s = 4 * (73 + 74 * r), e > r ? (t[s] = O[i].bg.r, t[s + 1] = O[i].bg.g, t[s + 2] = O[i].bg.b) : (t[s] = O[i].fg.r, t[s + 1] = O[i].fg.g, t[s + 2] = O[i].fg.b)
    }
    var e, i, o, r, s, a, n, h, l, c, u, d, p, f, v = 0,
      g = 2,
      m = 0,
      y = (new Date).getTime(),
      w = y,
      C = y,
      x = 0,
      S = 1e3,
      M = 0,
      b = 0,
      T = 1e3,
      I = 0,
      P = 0,
      R = 1e3,
      A = 0,
      O = {
        fps: {
          bg: {
            r: 16,
            g: 16,
            b: 48
          },
          fg: {
            r: 0,
            g: 255,
            b: 255
          }
        },
        ms: {
          bg: {
            r: 16,
            g: 48,
            b: 16
          },
          fg: {
            r: 0,
            g: 255,
            b: 0
          }
        },
        mb: {
          bg: {
            r: 48,
            g: 16,
            b: 26
          },
          fg: {
            r: 255,
            g: 0,
            b: 128
          }
        }
      };
    e = document.createElement("div"), e.style.cursor = "pointer", e.style.width = "80px", e.style.opacity = "0.9", e.style.zIndex = "10001", e.addEventListener("click", function () {
      switch (v++, v == g && (v = 0), i.style.display = "none", n.style.display = "none", u.style.display = "none", v) {
      case 0:
        i.style.display = "block";
        break;
      case 1:
        n.style.display = "block";
        break;
      case 2:
        u.style.display = "block"
      }
    }, !1), i = document.createElement("div"), i.style.backgroundColor = "rgb(" + Math.floor(O.fps.bg.r / 2) + "," + Math.floor(O.fps.bg.g / 2) + "," + Math.floor(O.fps.bg.b / 2) + ")", i.style.padding = "2px 0px 3px 0px", e.appendChild(i), o = document.createElement("div"), o.style.fontFamily = "Helvetica, Arial, sans-serif", o.style.textAlign = "left", o.style.fontSize = "9px", o.style.color = "rgb(" + O.fps.fg.r + "," + O.fps.fg.g + "," + O.fps.fg.b + ")", o.style.margin = "0px 0px 1px 3px", o.innerHTML = '<span style="font-weight:bold">FPS</span>', i.appendChild(o), r = document.createElement("canvas"), r.width = 74, r.height = 30, r.style.display = "block", r.style.marginLeft = "3px", i.appendChild(r), s = r.getContext("2d"), s.fillStyle = "rgb(" + O.fps.bg.r + "," + O.fps.bg.g + "," + O.fps.bg.b + ")", s.fillRect(0, 0, r.width, r.height), a = s.getImageData(0, 0, r.width, r.height), n = document.createElement("div"), n.style.backgroundColor = "rgb(" + Math.floor(O.ms.bg.r / 2) + "," + Math.floor(O.ms.bg.g / 2) + "," + Math.floor(O.ms.bg.b / 2) + ")", n.style.padding = "2px 0px 3px 0px", n.style.display = "none", e.appendChild(n), h = document.createElement("div"), h.style.fontFamily = "Helvetica, Arial, sans-serif", h.style.textAlign = "left", h.style.fontSize = "9px", h.style.color = "rgb(" + O.ms.fg.r + "," + O.ms.fg.g + "," + O.ms.fg.b + ")", h.style.margin = "0px 0px 1px 3px", h.innerHTML = '<span style="font-weight:bold">MS</span>', n.appendChild(h), r = document.createElement("canvas"), r.width = 74, r.height = 30, r.style.display = "block", r.style.marginLeft = "3px", n.appendChild(r), l = r.getContext("2d"), l.fillStyle = "rgb(" + O.ms.bg.r + "," + O.ms.bg.g + "," + O.ms.bg.b + ")", l.fillRect(0, 0, r.width, r.height), c = l.getImageData(0, 0, r.width, r.height);
    try {
      performance && performance.memory && performance.memory.totalJSHeapSize && (g = 3)
    } catch (E) {}
    return u = document.createElement("div"), u.style.backgroundColor = "rgb(" + Math.floor(O.mb.bg.r / 2) + "," + Math.floor(O.mb.bg.g / 2) + "," + Math.floor(O.mb.bg.b / 2) + ")", u.style.padding = "2px 0px 3px 0px", u.style.display = "none", e.appendChild(u), d = document.createElement("div"), d.style.fontFamily = "Helvetica, Arial, sans-serif", d.style.textAlign = "left", d.style.fontSize = "9px", d.style.color = "rgb(" + O.mb.fg.r + "," + O.mb.fg.g + "," + O.mb.fg.b + ")", d.style.margin = "0px 0px 1px 3px", d.innerHTML = '<span style="font-weight:bold">MB</span>', u.appendChild(d), r = document.createElement("canvas"), r.width = 74, r.height = 30, r.style.display = "block", r.style.marginLeft = "3px", u.appendChild(r), p = r.getContext("2d"), p.fillStyle = "#301010", p.fillRect(0, 0, r.width, r.height), f = p.getImageData(0, 0, r.width, r.height), {
      domElement: e,
      update: function () {
        m++, y = (new Date).getTime(), b = y - w, T = Math.min(T, b), I = Math.max(I, b), t(c.data, Math.min(30, 30 - 30 * (b / 200)), "ms"), h.innerHTML = '<span style="font-weight:bold">' + b + " MS</span> (" + T + "-" + I + ")", l.putImageData(c, 0, 0), w = y, y > C + 1e3 && (x = Math.round(1e3 * m / (y - C)), S = Math.min(S, x), M = Math.max(M, x), t(a.data, Math.min(30, 30 - 30 * (x / 100)), "fps"), o.innerHTML = '<span style="font-weight:bold">' + x + " FPS</span> (" + S + "-" + M + ")", s.putImageData(a, 0, 0), 3 == g && (P = 9.54e-7 * performance.memory.usedJSHeapSize, R = Math.min(R, P), A = Math.max(A, P), t(f.data, Math.min(30, 30 - P / 2), "mb"), d.innerHTML = '<span style="font-weight:bold">' + Math.round(P) + " MB</span> (" + Math.round(R) + "-" + Math.round(A) + ")", p.putImageData(f, 0, 0)), C = y, m = 0)
      }
    }
  };
Constants = {}, Constants.PI = Math.PI, Constants.C_PR = Math.PI / 180, Constants.VLEV = 2, Constants.EPS = 1e-7, Constants.c = .105, Constants.LN10 = Math.log(10), Constants.PIOVER2 = Math.PI / 2, Constants.TWOPI = 2 * Math.PI, Constants.TWOTHIRD = 2 / 3, Constants.ARCSECOND_RADIAN = 484813681109536e-20, SpatialVector = function () {
  function t(t, e, i) {
    "use strict";
    this.x = t, this.y = e, this.z = i, this.ra_ = 0, this.dec_ = 0, this.okRaDec_ = !1
  }
  return t.prototype.setXYZ = function (t, e, i) {
    this.x = t, this.y = e, this.z = i, this.okRaDec_ = !1
  }, t.prototype.length = function () {
    "use strict";
    return Math.sqrt(this.lengthSquared())
  }, t.prototype.lengthSquared = function () {
    "use strict";
    return this.x * this.x + this.y * this.y + this.z * this.z
  }, t.prototype.normalized = function () {
    "use strict";
    var t = this.length();
    this.x /= t, this.y /= t, this.z /= t
  }, t.prototype.set = function (t, e) {
    "use strict";
    this.ra_ = t, this.dec_ = e, this.okRaDec_ = !0, this.updateXYZ()
  }, t.prototype.angle = function (t) {
    "use strict";
    var e = this.y * t.z - this.z * t.y,
      i = this.z * t.x - this.x * t.z,
      o = this.x * t.y - this.y * t.x,
      r = Math.sqrt(e * e + i * i + o * o);
    return Math.abs(Math.atan2(r, dot(t)))
  }, t.prototype.get = function () {
    "use strict";
    return [x, y, z]
  }, t.prototype.toString = function () {
    "use strict";
    return "SpatialVector[" + this.x + ", " + this.y + ", " + this.z + "]"
  }, t.prototype.cross = function (e) {
    "use strict";
    return new t(this.y * e.z - e.y * this.z, this.z * e.x - e.z * this.x, this.x * e.y - e.x() * this.y)
  }, t.prototype.equal = function (t) {
    "use strict";
    return this.x == t.x && this.y == t.y && this.z == t.z() ? !0 : !1
  }, t.prototype.mult = function (e) {
    "use strict";
    return new t(e * this.x, e * this.y, e * this.z)
  }, t.prototype.dot = function (t) {
    "use strict";
    return this.x * t.x + this.y * t.y + this.z * t.z
  }, t.prototype.add = function (e) {
    "use strict";
    return new t(this.x + e.x, this.y + e.y, this.z + e.z)
  }, t.prototype.sub = function (e) {
    "use strict";
    return new t(this.x - e.x, this.y - e.y, this.z - e.z)
  }, t.prototype.dec = function () {
    "use strict";
    return this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.dec_
  }, t.prototype.ra = function () {
    "use strict";
    return this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.ra_
  }, t.prototype.updateXYZ = function () {
    "use strict";
    var t = Math.cos(this.dec_ * Constants.C_PR);
    this.x = Math.cos(this.ra_ * Constants.C_PR) * t, this.y = Math.sin(this.ra_ * Constants.C_PR) * t, this.z = Math.sin(this.dec_ * Constants.C_PR)
  }, t.prototype.updateRaDec = function () {
    "use strict";
    this.dec_ = Math.asin(this.z) / Constants.C_PR;
    var t = Math.cos(this.dec_ * Constants.C_PR);
    this.ra_ = t > Constants.EPS || -Constants.EPS > t ? this.y > Constants.EPS || this.y < -Constants.EPS ? 0 > this.y ? 360 - Math.acos(this.x / t) / Constants.C_PR : Math.acos(this.x / t) / Constants.C_PR : 0 > this.x ? 180 : 0 : 0, this.okRaDec_ = !0
  }, t.prototype.toRaRadians = function () {
    "use strict";
    var t = 0;
    return (0 != this.x || 0 != this.y) && (t = Math.atan2(this.y, this.x)), 0 > t && (t += 2 * Math.PI), t
  }, t.prototype.toDeRadians = function () {
    var t = z / this.length(),
      e = Math.acos(t);
    return Math.PI / 2 - e
  }, t
}(), AngularPosition = function () {
  return AngularPosition = function (t, e) {
    "use strict";
    this.theta = t, this.phi = e
  }, AngularPosition.prototype.toString = function () {
    "use strict";
    return "theta: " + this.theta + ", phi: " + this.phi
  }, AngularPosition
}(), LongRangeSetBuilder = function () {
  function t() {
    this.items = []
  }
  return t.prototype.appendRange = function (t, e) {
    for (var i = t; e >= i; i++) i in this.items || this.items.push(i)
  }, t
}(), HealpixIndex = function () {
  function t(t) {
    "use strict";
    this.nside = t
  }
  return t.NS_MAX = 8192, t.ORDER_MAX = 13, t.NSIDELIST = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192], t.JRLL = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4], t.JPLL = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7], t.XOFFSET = [-1, -1, 0, 1, 1, 1, 0, -1], t.YOFFSET = [0, 1, 1, 1, 0, -1, -1, -1], t.FACEARRAY = [
    [8, 9, 10, 11, -1, -1, -1, -1, 10, 11, 8, 9],
    [5, 6, 7, 4, 8, 9, 10, 11, 9, 10, 11, 8],
    [-1, -1, -1, -1, 5, 6, 7, 4, -1, -1, -1, -1],
    [4, 5, 6, 7, 11, 8, 9, 10, 11, 8, 9, 10],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 2, 3, 0, 0, 1, 2, 3, 5, 6, 7, 4],
    [-1, -1, -1, -1, 7, 4, 5, 6, -1, -1, -1, -1],
    [3, 0, 1, 2, 3, 0, 1, 2, 4, 5, 6, 7],
    [2, 3, 0, 1, -1, -1, -1, -1, 0, 1, 2, 3]
  ], t.SWAPARRAY = [
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0]
  ], t.Z0 = Constants.TWOTHIRD, t.prototype.init = function () {
    "use strict";
    var e = 256;
    this.ctab = Array(e), this.utab = Array(e);
    for (var i = 0; 256 > i; ++i) this.ctab[i] = 1 & i | (2 & i) << 7 | (4 & i) >> 1 | (8 & i) << 6 | (16 & i) >> 2 | (32 & i) << 5 | (64 & i) >> 3 | (128 & i) << 4, this.utab[i] = 1 & i | (2 & i) << 1 | (4 & i) << 2 | (8 & i) << 3 | (16 & i) << 4 | (32 & i) << 5 | (64 & i) << 6 | (128 & i) << 7;
    this.nl2 = 2 * this.nside, this.nl3 = 3 * this.nside, this.nl4 = 4 * this.nside, this.npface = this.nside * this.nside, this.ncap = 2 * this.nside * (this.nside - 1), this.npix = 12 * this.npface, this.fact2 = 4 / this.npix, this.fact1 = (this.nside << 1) * this.fact2, this.order = t.nside2order(this.nside)
  }, t.calculateNSide = function (e) {
    for (var i = 0, o = e * e, r = 180 / Constants.PI, s = 5184e4 * Constants.PI * r * r, a = Utils.castToInt(s / o), n = a / 12, h = Math.sqrt(n), l = t.NS_MAX, c = 0, u = 0; t.NSIDELIST.length > u; u++) if (l >= Math.abs(h - t.NSIDELIST[u]) && (l = Math.abs(h - t.NSIDELIST[u]), i = t.NSIDELIST[u], c = u), h > i && t.NS_MAX > h && (i = t.NSIDELIST[c + 1]), h > t.NS_MAX) return console.log("nside cannot be bigger than " + t.NS_MAX), t.NS_MAX;
    return i
  }, t.nside2order = function (e) {
    "use strict";
    return (e & e - 1) > 0 ? -1 : Utils.castToInt(t.log2(e))
  }, t.log2 = function (t) {
    "use strict";
    return Math.log(t) / Math.log(2)
  }, t.prototype.ang2pix_nest = function (e, i) {
    "use strict";
    var o, r, s, a, n, h, l, c, u, d, p, f, v;
    if (i >= Constants.TWOPI && (i -= Constants.TWOPI), 0 > i && (i += Constants.TWOPI), e > Constants.PI || 0 > e) throw {
      name: "Illegal argument",
      message: "theta must be between 0 and " + Constants.PI
    };
    if (i > Constants.TWOPI || 0 > i) throw {
      name: "Illegal argument",
      message: "phi must be between 0 and " + Constants.TWOPI
    };
    if (r = Math.cos(e), s = Math.abs(r), a = i / Constants.PIOVER2, t.Z0 >= s) {
      var g = this.nside * (.5 + a),
        m = .75 * this.nside * r,
        c = g - m,
        u = g + m;
      h = c >> this.order, l = u >> this.order, p = h == l ? 4 == h ? 4 : h + 4 : l > h ? h : l + 8, f = Utils.castToInt(u & this.nside - 1), v = Utils.castToInt(this.nside - (c & this.nside - 1) - 1)
    } else {
      d = Utils.castToInt(a), d >= 4 && (d = 3), n = a - d;
      var y = this.nside * Math.sqrt(3 * (1 - s));
      c = Utils.castToInt(n * y), u = Utils.castToInt((1 - n) * y), c = Math.min(t.NS_MAX - 1, c), u = Math.min(t.NS_MAX - 1, u), r >= 0 ? (p = d, f = Utils.castToInt(this.nside - u - 1), v = Utils.castToInt(this.nside - c - 1)) : (p = d + 8, f = c, v = u)
    }
    return o = this.xyf2nest(f, v, p)
  }, t.prototype.xyf2nest = function (t, e, i) {
    "use strict";
    return (i << 2 * this.order) + (this.utab[255 & t] | this.utab[255 & t >> 8] << 16 | this.utab[255 & t >> 16] << 32 | this.utab[255 & t >> 24] << 48 | this.utab[255 & e] << 1 | this.utab[255 & e >> 8] << 17 | this.utab[255 & e >> 16] << 33 | this.utab[255 & e >> 24] << 49)
  }, t.prototype.nest2xyf = function (t) {
    "use strict";
    var e = {};
    e.face_num = t >> 2 * this.order;
    var i = t & this.npface - 1,
      o = (93823560581120 & i) >> 16 | (614882086624428e4 & i) >> 31 | 21845 & i | (1431633920 & i) >> 15;
    return e.ix = this.ctab[255 & o] | this.ctab[255 & o >> 8] << 4 | this.ctab[255 & o >> 16] << 16 | this.ctab[255 & o >> 24] << 20, i >>= 1, o = (93823560581120 & i) >> 16 | (614882086624428e4 & i) >> 31 | 21845 & i | (1431633920 & i) >> 15, e.iy = this.ctab[255 & o] | this.ctab[255 & o >> 8] << 4 | this.ctab[255 & o >> 16] << 16 | this.ctab[255 & o >> 24] << 20, e
  }, t.prototype.pix2ang_nest = function (e) {
    "use strict";
    if (0 > e || e > this.npix - 1) throw {
      name: "Illegal argument",
      message: "ipix out of range"
    };
    var i, o, r, s = this.nest2xyf(e),
      a = s.ix,
      n = s.iy,
      h = s.face_num,
      l = (t.JRLL[h] << this.order) - a - n - 1;
    this.nside > l ? (i = l, o = 1 - i * i * this.fact2, r = 0) : l > this.nl3 ? (i = this.nl4 - l, o = i * i * this.fact2 - 1, r = 0) : (i = this.nside, o = (this.nl2 - l) * this.fact1, r = 1 & l - this.nside);
    var c = Math.acos(o),
      u = (t.JPLL[h] * i + a - n + 1 + r) / 2;
    u > this.nl4 && (u -= this.nl4), 1 > u && (u += this.nl4);
    var d = (u - .5 * (r + 1)) * (Constants.PIOVER2 / i);
    return {
      theta: c,
      phi: d
    }
  }, t.nside2Npix = function (e) {
    "use strict";
    if (0 > e || (e & -e) != e || e > t.NS_MAX) throw {
      name: "Illegal argument",
      message: "nside should be >0, power of 2, <" + t.NS_MAX
    };
    var i = 12 * e * e;
    return i
  }, t.prototype.xyf2ring = function (e, i, o) {
    "use strict";
    var r, s, a, n = t.JRLL[o] * this.nside - e - i - 1;
    this.nside > n ? (r = n, a = 2 * r * (r - 1), s = 0) : n > 3 * this.nside ? (r = this.nl4 - n, a = this.npix - 2 * (r + 1) * r, s = 0) : (r = this.nside, a = this.ncap + (n - this.nside) * this.nl4, s = 1 & n - this.nside);
    var h = (t.JPLL[o] * r + e - i + 1 + s) / 2;
    return h > this.nl4 ? h -= this.nl4 : 1 > h && (h += this.nl4), a + h - 1
  }, t.prototype.nest2ring = function (t) {
    "use strict";
    var e = this.nest2xyf(t),
      i = this.xyf2ring(e.ix, e.iy, e.face_num);
    return i
  }, t.prototype.corners_nest = function (t, e) {
    "use strict";
    var i = this.nest2ring(t);
    return this.corners_ring(i, e)
  }, t.prototype.pix2ang_ring = function (t) {
    "use strict";
    var e, i, o, r, s, a, n, h, l;
    if (0 > t || t > this.npix - 1) throw {
      name: "Illegal argument",
      message: "ipix out of range"
    };
    return a = t + 1, this.ncap >= a ? (h = a / 2, l = Utils.castToInt(h), o = Utils.castToInt(Math.sqrt(h - Math.sqrt(l))) + 1, r = a - 2 * o * (o - 1), e = Math.acos(1 - o * o * this.fact2), i = (r - .5) * Constants.PI / (2 * o)) : this.npix - this.ncap > t ? (s = t - this.ncap, o = s / this.nl4 + this.nside, r = s % this.nl4 + 1, n = (1 & o + this.nside) > 0 ? 1 : .5, e = Math.acos((this.nl2 - o) * this.fact1), i = (r - n) * Constants.PI / this.nl2) : (s = this.npix - t, o = Utils.castToInt(.5 * (1 + Math.sqrt(2 * s - 1))), r = 4 * o + 1 - (s - 2 * o * (o - 1)), e = Math.acos(-1 + Math.pow(o, 2) * this.fact2), i = (r - .5) * Constants.PI / (2 * o)), [e, i]
  }, t.prototype.ring = function (t) {
    "use strict";
    var e, i, o = 0,
      r = t + 1,
      s = 0;
    return this.ncap >= r ? (i = r / 2, s = Utils.castToInt(i), o = Utils.castToInt(Math.sqrt(i - Math.sqrt(s))) + 1) : this.nl2 * (5 * this.nside + 1) >= r ? (e = Utils.castToInt(r - this.ncap - 1), o = Utils.castToInt(e / this.nl4 + this.nside)) : (e = this.npix - r + 1, i = e / 2, s = Utils.castToInt(i), o = Utils.castToInt(Math.sqrt(i - Math.sqrt(s))) + 1, o = this.nl4 - o), o
  }, t.prototype.integration_limits_in_costh = function (t) {
    "use strict";
    var e, i, o, r;
    return r = 1 * this.nside, this.nside >= t ? (i = 1 - Math.pow(t, 2) / 3 / this.npface, o = 1 - Math.pow(t - 1, 2) / 3 / this.npface, e = t == this.nside ? 2 * (this.nside - 1) / 3 / r : 1 - Math.pow(t + 1, 2) / 3 / this.npface) : this.nl3 > t ? (i = 2 * (2 * this.nside - t) / 3 / r, o = 2 * (2 * this.nside - t + 1) / 3 / r, e = 2 * (2 * this.nside - t - 1) / 3 / r) : (o = t == this.nl3 ? 2 * (-this.nside + 1) / 3 / r : -1 + Math.pow(4 * this.nside - t + 1, 2) / 3 / this.npface, e = -1 + Math.pow(this.nl4 - t - 1, 2) / 3 / this.npface, i = -1 + Math.pow(this.nl4 - t, 2) / 3 / this.npface), [o, i, e]
  }, t.prototype.pixel_boundaries = function (t, e, i, o) {
    var r, s, a, n, h, l, c, u, d = 1 * this.nside;
    if (Math.abs(o) >= 1 - 1 / 3 / this.npface) return c = i * Constants.PIOVER2, u = (i + 1) * Constants.PIOVER2, [c, u];
    if (1.5 * o >= 1) r = Math.sqrt(3 * (1 - o)), s = 1 / d / r, a = e, n = a - 1, h = t - e, l = h + 1, c = Constants.PIOVER2 * (Math.max(n * s, 1 - l * s) + i), u = Constants.PIOVER2 * (Math.min(1 - h * s, a * s) + i);
    else if (1.5 * o > -1) {
      var p = .5 * (1 - 1.5 * o),
        f = p + 1,
        v = this.nside + t % 2;
      a = e - (v - t) / 2, n = a - 1, h = (v + t) / 2 - e, l = h + 1, c = Constants.PIOVER2 * (Math.max(f - l / d, -p + n / d) + i), u = Constants.PIOVER2 * (Math.min(f - h / d, -p + a / d) + i)
    } else {
      r = Math.sqrt(3 * (1 + o)), s = 1 / d / r;
      var g = 2 * this.nside;
      a = t - g + e, n = a - 1, h = g - e, l = h + 1, c = Constants.PIOVER2 * (Math.max(1 - (g - n) * s, (g - l) * s) + i), u = Constants.PIOVER2 * (Math.min(1 - (g - a) * s, (g - h) * s) + i)
    }
    return [c, u]
  }, t.vector = function (t, e) {
    "use strict";
    var i = 1 * Math.sin(t) * Math.cos(e),
      o = 1 * Math.sin(t) * Math.sin(e),
      r = 1 * Math.cos(t);
    return new SpatialVector(i, o, r)
  }, t.prototype.corners_ring = function (e, i) {
    "use strict";
    var o = 2 * i + 2,
      r = Array(o),
      s = this.pix2ang_ring(e),
      a = Math.cos(s[0]),
      n = s[0],
      h = s[1],
      l = Utils.castToInt(h / Constants.PIOVER2),
      c = this.ring(e),
      u = Math.min(c, Math.min(this.nside, this.nl4 - c)),
      d = 0,
      p = Constants.PIOVER2 / u;
    d = c >= this.nside && this.nl3 >= c ? Utils.castToInt(h / p + c % 2 / 2) + 1 : Utils.castToInt(h / p) + 1, d -= l * u;
    var f = o / 2,
      v = this.integration_limits_in_costh(c),
      g = Math.acos(v[0]),
      m = Math.acos(v[2]),
      y = this.pixel_boundaries(c, d, l, v[0]);
    if (r[0] = d > u / 2 ? t.vector(g, y[1]) : t.vector(g, y[0]), y = this.pixel_boundaries(c, d, l, v[2]), r[f] = d > u / 2 ? t.vector(m, y[1]) : t.vector(m, y[0]), 1 == i) {
      var w = Math.acos(v[1]);
      y = this.pixel_boundaries(c, d, l, v[1]), r[1] = t.vector(w, y[0]), r[3] = t.vector(w, y[1])
    } else for (var C = v[2] - v[0], x = C / (i + 1), S = 1; i >= S; S++) a = v[0] + x * S, n = Math.acos(a), y = this.pixel_boundaries(c, d, l, a), r[S] = t.vector(n, y[0]), r[o - S] = t.vector(n, y[1]);
    return r
  }, t.vec2Ang = function (t) {
    "use strict";
    var e = t.z / t.length(),
      i = Math.acos(e),
      o = 0;
    return (0 != t.x || 0 != t.y) && (o = Math.atan2(t.y, t.x)), 0 > o && (o += 2 * Math.PI), [i, o]
  }, t.prototype.queryDisc = function (e, i, o, r) {
    "use strict";
    if (0 > i || i > Constants.PI) throw {
      name: "Illegal argument",
      message: "angular radius is in RADIAN and should be in [0,pi]"
    };
    var s, a, n, h, l, c, u, d, p, f, v, g, m, y, w, C, x, S, M, b = new LongRangeSetBuilder,
      T = null,
      l = i;
    if (r && (l += Constants.PI / this.nl4), T = t.vec2Ang(e), c = T[0], u = T[1], v = this.fact2, g = this.fact1, h = Math.cos(c), M = 1 / Math.sqrt((1 - h) * (1 + h)), y = c - l, w = c + l, d = Math.cos(l), x = Math.cos(y), s = this.ringAbove(x) + 1, C = Math.cos(w), a = this.ringAbove(C), s > a && 0 == a && (a = s), 0 >= y) for (var I = 1; s > I; ++I) this.inRing(I, 0, Math.PI, b);
    for (n = s; a >= n; ++n) S = this.nside > n ? 1 - n * n * v : this.nl3 >= n ? (this.nl2 - n) * g : -1 + (this.nl4 - n) * (this.nl4 - n) * v, p = (d - S * h) * M, f = 1 - S * S - p * p, m = Math.atan2(Math.sqrt(f), p), isNaN(m) && (m = l), this.inRing(n, u, m, b);
    if (w >= Math.PI) for (var I = a + 1; this.nl4 > I; ++I) this.inRing(I, 0, Math.PI, b, !1);
    var P;
    if (o) {
      for (var R = b.items, A = [], O = 0; R.length > O; O++) {
        var E = this.ring2nest(R[O]);
        A.indexOf(E) >= 0 || A.push(E)
      }
      P = A
    } else P = b.items;
    return P
  }, t.prototype.inRing = function (t, e, i, o, r) {
    "use strict";
    var s, a, n, h, l = !1,
      c = !1,
      u = 1e-12,
      d = 0,
      p = 0,
      f = 0,
      v = 0,
      g = (e - i) % Constants.TWOPI - u,
      m = e + i + u,
      y = (e + i) % Constants.TWOPI + u;
    if (u > Math.abs(i - Constants.PI) && (l = !0), t >= this.nside && this.nl3 >= t ? (p = t - this.nside + 1, n = this.ncap + this.nl4 * (p - 1), h = n + this.nl4 - 1, s = p % 2, a = this.nl4) : (this.nside > t ? (p = t, n = 2 * p * (p - 1), h = n + 4 * p - 1) : (p = 4 * this.nside - t, n = this.npix - 2 * p * (p + 1), h = n + 4 * p - 1), a = 4 * p, s = 1), l) return o.appendRange(n, h), void 0;
    if (d = s / 2, r) f = Math.round(a * g / Constants.TWOPI - d), v = Math.round(a * m / Constants.TWOPI - d), f %= a, v > a && (v %= a);
    else {
      if (f = Math.ceil(a * g / Constants.TWOPI - d), v = Utils.castToInt(a * y / Constants.TWOPI - d), f > v && 1 == t && (v = Utils.castToInt(a * m / Constants.TWOPI - d)), f == v + 1 && (f = v), 1 == f - v && Constants.PI > i * a) return console.log("the interval is too small and avay from center"), void 0;
      f = Math.min(f, a - 1), v = Math.max(v, 0)
    }
    if (f > v && (c = !0), c) f += n, v += n, o.appendRange(n, v), o.appendRange(f, h);
    else {
      if (0 > f) return f = Math.abs(f), o.appendRange(n, n + v), o.appendRange(h - f + 1, h), void 0;
      f += n, v += n, o.appendRange(f, v)
    }
  }, t.prototype.ringAbove = function (t) {
    "use strict";
    var e = Math.abs(t);
    if (e > Constants.TWOTHIRD) {
      var i = Utils.castToInt(this.nside * Math.sqrt(3 * (1 - e)));
      return t > 0 ? i : 4 * this.nside - i - 1
    }
    return Utils.castToInt(this.nside * (2 - 1.5 * t))
  }, t.prototype.ring2nest = function (t) {
    "use strict";
    var e = this.ring2xyf(t);
    return this.xyf2nest(e.ix, e.iy, e.face_num)
  }, t.prototype.ring2xyf = function (e) {
    "use strict";
    var i, o, r, s, a = {};
    if (this.ncap > e) {
      i = Utils.castToInt(.5 * (1 + Math.sqrt(1 + 2 * e))), o = e + 1 - 2 * i * (i - 1), r = 0, s = i, a.face_num = 0;
      var n = o - 1;
      n >= 2 * i && (a.face_num = 2, n -= 2 * i), n >= i && ++a.face_num
    } else if (this.npix - this.ncap > e) {
      var h = e - this.ncap;
      this.order >= 0 ? (i = (h >> this.order + 2) + this.nside, o = (h & this.nl4 - 1) + 1) : (i = h / this.nl4 + this.nside, o = h % this.nl4 + 1), r = 1 & i + this.nside, s = this.nside;
      var l, c, u = i - this.nside + 1,
        d = this.nl2 + 2 - u;
      this.order >= 0 ? (l = o - Utils.castToInt(u / 2) + this.nside - 1 >> this.order, c = o - Utils.castToInt(d / 2) + this.nside - 1 >> this.order) : (l = (o - Utils.castToInt(u / 2) + this.nside - 1) / this.nside, c = (o - Utils.castToInt(d / 2) + this.nside - 1) / this.nside), a.face_num = c == l ? 4 == c ? 4 : Utils.castToInt(c) + 4 : l > c ? Utils.castToInt(c) : Utils.castToInt(l) + 8
    } else {
      var h = this.npix - e;
      i = Utils.castToInt(.5 * (1 + Math.sqrt(2 * h - 1))), o = 4 * i + 1 - (h - 2 * i * (i - 1)), r = 0, s = i, i = 2 * this.nl2 - i, a.face_num = 8;
      var n = o - 1;
      n >= 2 * s && (a.face_num = 10, n -= 2 * s), n >= s && ++a.face_num
    }
    var p = i - t.JRLL[a.face_num] * this.nside + 1,
      f = 2 * o - t.JPLL[a.face_num] * s - r - 1;
    return f >= this.nl2 && (f -= 8 * this.nside), a.ix = f - p >> 1, a.iy = -(f + p) >> 1, a
  }, t
}(), Utils = function () {}, Utils.radecToPolar = function (t, e) {
  return {
    theta: Math.PI / 2 - e / 180 * Math.PI,
    phi: t / 180 * Math.PI
  }
}, Utils.polarToRadec = function (t, e) {
  return {
    ra: 180 * e / Math.PI,
    dec: 180 * (Math.PI / 2 - t) / Math.PI
  }
}, Utils.castToInt = function (t) {
  return t > 0 ? Math.floor(t) : Math.ceil(t)
}, AstroMath.D2R = Math.PI / 180, AstroMath.R2D = 180 / Math.PI, AstroMath.sign = function (t) {
  return t > 0 ? 1 : 0 > t ? -1 : 0
}, AstroMath.cosd = function (t) {
  if (0 == t % 90) {
    var e = Math.abs(Math.floor(t / 90 + .5)) % 4;
    switch (e) {
    case 0:
      return 1;
    case 1:
      return 0;
    case 2:
      return -1;
    case 3:
      return 0
    }
  }
  return Math.cos(t * AstroMath.D2R)
}, AstroMath.sind = function (t) {
  if (0 === t % 90) {
    var e = Math.abs(Math.floor(t / 90 - .5)) % 4;
    switch (e) {
    case 0:
      return 1;
    case 1:
      return 0;
    case 2:
      return -1;
    case 3:
      return 0
    }
  }
  return Math.sin(t * AstroMath.D2R)
}, AstroMath.tand = function (t) {
  var e;
  return e = t % 360, 0 == e || 180 == Math.abs(e) ? 0 : 45 == e || 225 == e ? 1 : -135 == e || -315 == e ? -1 : Math.tan(t * AstroMath.D2R)
}, AstroMath.asind = function (t) {
  return Math.asin(t) * AstroMath.R2D
}, AstroMath.acosd = function (t) {
  return Math.acos(t) * AstroMath.R2D
}, AstroMath.atand = function (t) {
  return Math.atan(t) * AstroMath.R2D
}, AstroMath.atan2 = function (t, e) {
  if (0 == t) return e > 0 ? 0 : 0 > e ? Math.PI : 0 / 0;
  var i = AstroMath.sign(t);
  if (0 == e) return Math.PI / 2 * i;
  var o = Math.atan(Math.abs(t / e));
  return e > 0 ? o * i : 0 > e ? (Math.PI - o) * i : void 0
}, AstroMath.atan2d = function (t, e) {
  return AstroMath.atan2(t, e) * AstroMath.R2D
}, AstroMath.cosh = function (t) {
  return (Math.exp(t) + Math.exp(-t)) / 2
}, AstroMath.sinh = function (t) {
  return (Math.exp(t) - Math.exp(-t)) / 2
}, AstroMath.tanh = function (t) {
  return (Math.exp(t) - Math.exp(-t)) / (Math.exp(t) + Math.exp(-t))
}, AstroMath.acosh = function (t) {
  return Math.log(t + Math.sqrt(t * t - 1))
}, AstroMath.asinh = function (t) {
  return Math.log(t + Math.sqrt(t * t + 1))
}, AstroMath.atanh = function (t) {
  return .5 * Math.log((1 + t) / (1 - t))
}, AstroMath.sinc = function (t) {
  var e, i = Math.abs(t);
  return .001 >= i ? (i *= i, e = 1 - i * (1 - i / 20) / 6) : e = Math.sin(i) / i, e
}, AstroMath.asinc = function (t) {
  var e, i = Math.abs(t);
  return .001 >= i ? (i *= i, e = 1 + i * (6 + .45 * i) / 6) : e = Math.asin(i) / i, e
}, AstroMath.hypot = function (t, e) {
  return Math.sqrt(t * t + e * e)
}, AstroMath.eulerMatrix = function (t, e, i) {
  var o = Array(3);
  o[0] = Array(3), o[1] = Array(3), o[2] = Array(3);
  var r = AstroMath.cosd(t),
    s = AstroMath.sind(t),
    a = AstroMath.cosd(e),
    n = AstroMath.sind(e),
    h = AstroMath.cosd(i),
    l = AstroMath.sind(i);
  return o[0][0] = h * a * r - l * s, o[0][1] = -l * a * r - h * s, o[0][2] = -n * r, o[1][0] = h * a * s + l * r, o[1][1] = -l * a * s + h * r, o[1][2] = -n * s, o[2][0] = -n * h, o[2][1] = -n * r, o[2][2] = a, o
}, AstroMath.displayMatrix = function (t) {
  for (var e = t.length, i = 0, o = 0; e > o; o++) t[o].length > i && (i = t[o].length);
  for (var r = "<table>\n", o = 0; e > o; o++) {
    r += "<tr>";
    for (var s = 0; e > s; s++) r += "<td>", t[o].length > o && (r += "" + t[o][s]), r += "</td>";
    r += "</td>\n"
  }
  return r += "</table>\n"
}, Projection.PROJ_TAN = 1, Projection.PROJ_TAN2 = 2, Projection.PROJ_STG = 2, Projection.PROJ_SIN = 3, Projection.PROJ_SIN2 = 4, Projection.PROJ_ZEA = 4, Projection.PROJ_ARC = 5, Projection.PROJ_SCHMIDT = 5, Projection.PROJ_AITOFF = 6, Projection.PROJ_AIT = 6, Projection.PROJ_GLS = 7, Projection.PROJ_MERCATOR = 8, Projection.PROJ_MER = 8, Projection.PROJ_LAM = 9, Projection.PROJ_LAMBERT = 9, Projection.PROJ_TSC = 10, Projection.PROJ_QSC = 11, Projection.PROJ_LIST = ["Mercator", Projection.PROJ_MERCATOR, "Gnomonic", Projection.PROJ_TAN, "Stereographic", Projection.PROJ_TAN2, "Orthographic", Projection.PROJ_SIN, "Zenithal", Projection.PROJ_ZEA, "Schmidt", Projection.PROJ_SCHMIDT, "Aitoff", Projection.PROJ_AITOFF, "Lambert", Projection.PROJ_LAMBERT], Projection.PROJ_NAME = ["-", "Gnomonic", "Stereographic", "Orthographic", "Equal-area", "Schmidt plates", "Aitoff", "Global sin", "Mercator", "Lambert"], Projection.prototype = {
  setCenter: function (t, e) {
    this.ROT = this.tr_oR(t, e)
  },
  setProjection: function (t) {
    this.PROJECTION = t
  },
  project: function (t, e) {
    var i = this.tr_ou(t, e),
      o = this.tr_uu(i, this.ROT),
      r = this.tr_up(this.PROJECTION, o);
    return null == r ? null : {
      X: -r[0],
      Y: -r[1]
    }
  },
  unproject: function (t, e) {
    t = -t, e = -e;
    var i = this.tr_pu(this.PROJECTION, t, e),
      o = this.tr_uu1(i, this.ROT),
      r = this.tr_uo(o);
    return {
      ra: r[0],
      dec: r[1]
    }
  },
  tr_up: function (t, e) {
    var i, o, r, s, a, n = e[0],
      h = e[1],
      l = e[2];
    if (i = AstroMath.hypot(n, h), 0 == i && 0 == l) return null;
    switch (t) {
    default:
      r = null;
      break;
    case Projection.PROJ_AITOFF:
      o = Math.sqrt(i * (i + n) / 2), s = Math.sqrt(2 * i * (i - n)), o = Math.sqrt((1 + o) / 2), s /= o, a = l / o, 0 > h && (s = -s), r = [s, a];
      break;
    case Projection.PROJ_GLS:
      a = Math.asin(l), s = 0 != i ? Math.atan2(h, n) * i : 0, r = [s, a];
      break;
    case Projection.PROJ_MERCATOR:
      0 != i ? (s = Math.atan2(h, n), a = AstroMath.atanh(l), r = [s, a]) : r = null;
      break;
    case Projection.PROJ_TAN:
      n > 0 ? (s = h / n, a = l / n, r = [s, a]) : r = null;
      break;
    case Projection.PROJ_TAN2:
      o = (1 + n) / 2, o > 0 ? (s = h / o, a = l / o, r = [s, a]) : r = null;
      break;
    case Projection.PROJ_ARC:
      -1 >= n ? (s = Math.PI, a = 0) : (i = AstroMath.hypot(h, l), o = n > 0 ? AstroMath.asinc(i) : Math.acos(n) / i, s = h * o, a = l * o), r = [s, a];
      break;
    case Projection.PROJ_SIN:
      n >= 0 ? (s = h, a = l, r = [s, a]) : r = null;
      break;
    case Projection.PROJ_SIN2:
      o = Math.sqrt((1 + n) / 2), 0 != o ? (s = h / o, a = l / o) : (s = 2, a = 0), r = [s, a];
      break;
    case Projection.PROJ_LAMBERT:
      a = l, s = 0, 0 != i && (s = Math.atan2(h, n)), r = [s, a]
    }
    return r
  },
  tr_pu: function (t, e, i) {
    var o, r, s, a, n;
    switch (t) {
    default:
      return null;
    case Projection.PROJ_AITOFF:
      if (o = e * e / 8 + i * i / 2, o > 1) return null;
      s = 1 - o, r = Math.sqrt(1 - o / 2), a = e * r / 2, n = i * r, o = AstroMath.hypot(s, a), 0 != o && (r = s, s = (r * r - a * a) / o, a = 2 * r * a / o);
      break;
    case Projection.PROJ_GLS:
      if (n = Math.sin(i), o = 1 - n * n, 0 > o) return null;
      o = Math.sqrt(o), r = 0 != o ? e / o : 0, s = o * Math.cos(r), a = o * Math.sin(r);
      break;
    case Projection.PROJ_MERCATOR:
      n = AstroMath.tanh(i), o = 1 / AstroMath.cosh(i), s = o * Math.cos(e), a = o * Math.sin(e);
      break;
    case Projection.PROJ_LAMBERT:
      if (n = i, o = 1 - n * n, 0 > o) return null;
      o = Math.sqrt(o), s = o * Math.cos(e), a = o * Math.sin(e);
      break;
    case Projection.PROJ_TAN:
      s = 1 / Math.sqrt(1 + e * e + i * i), a = e * s, n = i * s;
      break;
    case Projection.PROJ_TAN2:
      o = (e * e + i * i) / 4, r = 1 + o, s = (1 - o) / r, a = e / r, n = i / r;
      break;
    case Projection.PROJ_ARC:
      if (o = AstroMath.hypot(e, i), o > Math.PI) return null;
      r = AstroMath.sinc(o), s = Math.cos(o), a = r * e, n = r * i;
      break;
    case Projection.PROJ_SIN:
      if (r = 1 - e * e - i * i, 0 > r) return null;
      s = Math.sqrt(r), a = e, n = i;
      break;
    case Projection.PROJ_SIN2:
      if (o = (e * e + i * i) / 4, o > 1) return null;
      r = Math.sqrt(1 - o), s = 1 - 2 * o, a = r * e, n = r * i
    }
    return [s, a, n]
  },
  tr_oR: function (t, e) {
    var i = Array(3);
    return i[0] = Array(3), i[1] = Array(3), i[2] = Array(3), i[2][2] = AstroMath.cosd(e), i[0][2] = AstroMath.sind(e), i[1][1] = AstroMath.cosd(t), i[1][0] = -AstroMath.sind(t), i[1][2] = 0, i[0][0] = i[2][2] * i[1][1], i[0][1] = -i[2][2] * i[1][0], i[2][0] = -i[0][2] * i[1][1], i[2][1] = i[0][2] * i[1][0], i
  },
  tr_ou: function (t, e) {
    var i = Array(3),
      o = AstroMath.cosd(e);
    return i[0] = o * AstroMath.cosd(t), i[1] = o * AstroMath.sind(t), i[2] = AstroMath.sind(e), i
  },
  tr_uu: function (t, e) {
    var i = Array(3),
      o = t[0],
      r = t[1],
      s = t[2];
    return i[0] = e[0][0] * o + e[0][1] * r + e[0][2] * s, i[1] = e[1][0] * o + e[1][1] * r + e[1][2] * s, i[2] = e[2][0] * o + e[2][1] * r + e[2][2] * s, i
  },
  tr_uu1: function (t, e) {
    var i = Array(3),
      o = t[0],
      r = t[1],
      s = t[2];
    return i[0] = e[0][0] * o + e[1][0] * r + e[2][0] * s, i[1] = e[0][1] * o + e[1][1] * r + e[2][1] * s, i[2] = e[0][2] * o + e[1][2] * r + e[2][2] * s, i
  },
  tr_uo: function (t) {
    var e, i, o = t[0],
      r = t[1],
      s = t[2],
      a = o * o + r * r;
    if (0 == a) {
      if (0 == s) return null;
      e = 0, i = s > 0 ? 90 : -90
    } else i = AstroMath.atand(s / Math.sqrt(a)), e = AstroMath.atan2d(r, o), 0 > e && (e += 360);
    return [e, i]
  }
}, Coo.factor = [3600, 60, 1], Coo.prototype = {
  setFrame: function (t) {
    this.frame = t
  },
  computeDirCos: function () {
    var t = AstroMath.cosd(this.lat);
    this.x = t * AstroMath.cosd(this.lon), this.y = t * AstroMath.sind(this.lon), this.z = AstroMath.sind(this.lat)
  },
  computeLonLat: function () {
    var t = this.x * this.x + this.y * this.y;
    this.lon = 0, 0 == t ? 0 == this.z ? (this.lon = 0 / 0, this.lat = 0 / 0) : this.lat = this.z > 0 ? 90 : -90 : (this.lon = AstroMath.atan2d(this.y, this.x), this.lat = AstroMath.atan2d(this.z, Math.sqrt(t)), 0 > this.lon && (this.lon += 360))
  },
  dist2: function (t) {
    var e = t.x - this.x,
      i = e * e;
    return e = t.y - this.y, i += e * e, e = t.z - this.z, i += e * e
  },
  distance: function (t) {
    return 0 == t.x && 0 == t.y && 0 == t.z ? 0 / 0 : 0 == this.x && 0 == this.y && 0 == this.z ? 0 / 0 : 2 * AstroMath.asind(.5 * Math.sqrt(this.dist2(t)))
  },
  convertTo: function (t) {
    this.frame.equals(t) || (this.frame.toICRS(this.coo), t.fromICRS(this.coo), this.frame = t, this.lon = this.lat = 0 / 0)
  },
  rotate: function (t) {
    var e, i, o;
    t != Umatrix3 && (e = t[0][0] * this.x + t[0][1] * this.y + t[0][2] * this.z, i = t[1][0] * this.x + t[1][1] * this.y + t[1][2] * this.z, o = t[2][0] * this.x + t[2][1] * this.y + t[2][2] * this.z, this.x = e, this.y = i, this.z = o, this.lon = this.lat = 0 / 0)
  },
  rotate_1: function (t) {
    var e, i, o;
    t != Umatrix3 && (e = t[0][0] * this.x + t[1][0] * this.y + t[2][0] * this.z, i = t[0][1] * this.x + t[1][1] * this.y + t[2][1] * this.z, o = t[0][2] * this.x + t[1][2] * this.y + t[2][2] * this.z, this.x = e, this.y = i, this.z = o, this.lon = this.lat = 0 / 0)
  },
  equals: function (t) {
    return this.x == t.x && this.y == t.y && this.z == t.z
  },
  parse: function (t) {
    var e = t.indexOf("+");
    if (0 > e && (e = t.indexOf("-")), 0 > e && (e = t.indexOf(" ")), 0 > e) return this.lon = 0 / 0, this.lat = 0 / 0, this.prec = 0, !1;
    var i = t.substring(0, e),
      o = t.substring(e);
    return this.lon = this.parseLon(i), this.lat = this.parseLat(o), !0
  },
  parseLon: function (t) {
    var t = t.trim();
    if (0 > t.indexOf(" ")) {
      var e = t.indexOf(".");
      return this.prec = 0 > e ? 0 : t.length - e - 1, parseFloat(t)
    }
    for (var i = new Tokenizer(t, " "), o = 0, r = 0, s = 0; i.hasMore();) {
      var a = i.nextToken(),
        n = a.indexOf(".");
      switch (r += parseFloat(a) * Coo.factor[o], o) {
      case 0:
        s = 0 > n ? 1 : 2;
        break;
      case 1:
        s = 0 > n ? 3 : 4;
        break;
      case 2:
        s = 0 > n ? 5 : 4 + a.length - n;
      default:
      }
      o++
    }
    return this.prec = s, 15 * r / 3600
  },
  parseLat: function (t) {
    var e, t = t.trim();
    if ("-" == t.charAt(0) ? (e = -1, t = t.substring(1)) : "-" == t.charAt(0) ? (e = 1, t = t.substring(1)) : e = 1, 0 > t.indexOf(" ")) {
      var i = t.indexOf(".");
      return this.prec = 0 > i ? 0 : t.length - i - 1, parseFloat(t) * e
    }
    for (var o = new Tokenizer(t, " "), r = 0, s = 0, a = 0; o.hasMore();) {
      var n = o.nextToken(),
        h = n.indexOf(".");
      switch (s += parseFloat(n) * Coo.factor[r], r) {
      case 0:
        a = 0 > h ? 1 : 2;
        break;
      case 1:
        a = 0 > h ? 3 : 4;
        break;
      case 2:
        a = 0 > h ? 5 : 4 + n.length - h;
      default:
      }
      r++
    }
    return this.prec = a, s * e / 3600
  },
  format: function (t) {
    isNaN(this.lon) && this.computeLonLat();
    var e = "",
      i = "";
    if (t.indexOf("d") >= 0) e = Numbers.format(this.lon, this.prec), i = Numbers.format(this.lat, this.prec);
    else var o = this.lon / 15,
      e = Numbers.toSexagesimal(o, this.prec + 1, !1),
      i = Numbers.toSexagesimal(this.lat, this.prec, !1);
    return this.lat > 0 && (i = "+" + i), t.indexOf("/") >= 0 ? e + " " + i : t.indexOf("2") >= 0 ? [e, i] : e + i
  }
}, Tokenizer.prototype = {
  hasMore: function () {
    return this.pos < this.string.length
  },
  nextToken: function () {
    for (var t = this.pos; this.string.length > t && this.string.charAt(t) == this.sep;) t++;
    for (var e = t; this.string.length > e && this.string.charAt(e) != this.sep;) e++;
    return this.pos = e, this.string.substring(t, e)
  }
}, Strings.trim = function (t, e) {
  for (var i = 0, o = t.length - 1; t.length > i && t.charAt(i) == e;) i++;
  if (i == t.length) return "";
  for (; o > i && t.charAt(o) == e;) o--;
  return t.substring(i, o + 1)
}, Numbers.pow10 = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14], Numbers.rndval = [.5, .05, .005, 5e-4, 5e-5, 5e-6, 5e-7, 5e-8, 5e-9, 5e-10, 5e-11, 5e-12, 5e-13, 5e-14, 5e-14], Numbers.format = function (t, e) {
  if (0 >= e) return "" + Math.round(t);
  var i = "" + t,
    o = i.indexOf("."),
    r = o >= 0 ? i.length - o - 1 : 0;
  if (e >= r) {
    0 > o && (i += ".");
    for (var s = 0; e - r > s; s++) i += "0";
    return i
  }
  return i = "" + (t + Numbers.rndval[e]), i.substr(0, o + e + 1)
}, Numbers.toSexagesimal = function (t, e, i) {
  var o = 0 > t ? "-" : i ? "+" : "",
    r = Math.abs(t);
  switch (e) {
  case 1:
    var s = Math.round(r);
    return o + ("" + s);
  case 2:
    return o + Numbers.format(r, 1);
  case 3:
    var s = Math.floor(r),
      a = Math.round(60 * (r - s));
    return o + s + " " + a;
  case 4:
    var s = Math.floor(r),
      a = 60 * (r - s);
    return o + s + " " + Numbers.format(a, 1);
  case 5:
    var s = Math.floor(r),
      a = 60 * (r - s),
      n = Math.floor(a),
      h = Math.round(60 * (a - n));
    return o + s + " " + n + " " + h;
  case 6:
  case 7:
  case 8:
    var s = Math.floor(r);
    10 > s && (s = "0" + s);
    var a = 60 * (r - s),
      n = Math.floor(a);
    10 > n && (n = "0" + n);
    var h = 60 * (a - n);
    return o + s + " " + n + " " + Numbers.format(h, e - 5);
  default:
    return o + Numbers.format(r, 1)
  }
}, CooConversion = function () {
  var t = {};
  return t.GALACTIC_TO_J2000 = [-.0548755604024359, .4941094279435681, -.867666148981161, -.8734370902479237, -.4448296299195045, -.1980763734646737, -.4838350155267381, .7469822444763707, .4559837762325372], t.J2000_TO_GALACTIC = [-.0548755604024359, -.873437090247923, -.4838350155267381, .4941094279435681, -.4448296299195045, .7469822444763707, -.867666148981161, -.1980763734646737, .4559837762325372], t.Transform = function (t, e) {
    t[0] = t[0] * Math.PI / 180, t[1] = t[1] * Math.PI / 180;
    var i = [Math.cos(t[0]) * Math.cos(t[1]), Math.sin(t[0]) * Math.cos(t[1]), Math.sin(t[1])],
      o = [i[0] * e[0] + i[1] * e[1] + i[2] * e[2], i[0] * e[3] + i[1] * e[4] + i[2] * e[5], i[0] * e[6] + i[1] * e[7] + i[2] * e[8]],
      r = Math.sqrt(o[0] * o[0] + o[1] * o[1] + o[2] * o[2]),
      s = [0, 0];
    s[1] = Math.asin(o[2] / r);
    var a = o[0] / r / Math.cos(s[1]),
      n = o[1] / r / Math.cos(s[1]);
    return s[0] = Math.atan2(n, a), 0 > s[0] && (s[0] = s[0] + 2 * Math.PI), s[0] = 180 * s[0] / Math.PI, s[1] = 180 * s[1] / Math.PI, s
  }, t.GalacticToJ2000 = function (e) {
    return t.Transform(e, t.GALACTIC_TO_J2000)
  }, t.J2000ToGalactic = function (e) {
    return t.Transform(e, t.J2000_TO_GALACTIC)
  }, t
}(), Sesame = function () {
  return Sesame = {}, Sesame.cache = {}, Sesame.resolve = function (t, e, i) {
    var o = "http://cds.u-strasbg.fr/cgi-bin/nph-sesame.jsonp?";
    $.ajax({
      url: o,
      data: {
        object: t
      },
      method: "GET",
      dataType: "jsonp",
      success: function (t) {
        t.Target && t.Target.Resolver && t.Target.Resolver ? e(t) : i(t)
      },
      error: i
    })
  }, Sesame
}(), HealpixCache = function () {
  var t = {};
  return t.staticCache = {
    corners: {
      nside8: []
    }
  }, t.dynamicCache = {}, t.lastNside = 8, t.hpxIdxCache = null, t.init = function () {
    var e = new HealpixIndex(8);
    e.init();
    for (var i = HealpixIndex.nside2Npix(8), o = 0; i > o; o++) t.staticCache.corners.nside8[o] = e.corners_nest(o, 1);
    t.hpxIdxCache = e
  }, t.corners_nest = function (e, i) {
    return 8 == i ? t.staticCache.corners.nside8[e] : (i != t.lastNside && (t.hpxIdxCache = new HealpixIndex(i), t.hpxIdxCache.init(), t.lastNside = i), t.hpxIdxCache.corners_nest(e, 1))
  }, t
}(), Utils = Utils || {}, Utils.cssScale = void 0, HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords, Function.prototype.bind || (Function.prototype.bind = function (t) {
  if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  var e = [].slice,
    i = e.call(arguments, 1),
    o = this,
    r = function () {},
    s = function () {
      return o.apply(this instanceof r ? this : t || {}, i.concat(e.call(arguments)))
    };
  return s.prototype = this.prototype, s
}), $ = $ || jQuery, $.urlParam = function (t, e) {
  return void 0 === e && (e = location.search), decodeURIComponent((RegExp("[?|&]" + t + "=" + "([^&;]+?)(&|#|;|$)").exec(e) || [, ""])[1].replace(/\+/g, "%20")) || null
}, Utils.isNumber = function (t) {
  return !isNaN(parseFloat(t)) && isFinite(t)
}, Utils.debounce = function (t, e) {
  var i = null;
  return function () {
    var o = this,
      r = arguments;
    clearTimeout(i), i = setTimeout(function () {
      t.apply(o, r)
    }, e)
  }
}, Utils.LRUCache = function (t) {
  this._keys = [], this._items = {}, this._expires = {}, this._size = 0, this._maxsize = t || 1024
}, Utils.LRUCache.prototype = {
  set: function (t, e) {
    var i = this._keys,
      o = this._items,
      r = this._expires,
      s = this._size,
      a = this._maxsize;
    s >= a && (i.sort(function (t, e) {
      return r[t] > r[e] ? -1 : r[t] < r[e] ? 1 : 0
    }), s--, delete r[i[s]], delete o[i[s]]), i[s] = t, o[t] = e, r[t] = Date.now(), s++, this._keys = i, this._items = o, this._expires = r, this._size = s
  },
  get: function (t) {
    var e = this._items[t];
    return e && (this._expires[t] = Date.now()), e
  },
  keys: function () {
    return this._keys
  }
}, Color = {}, Color.curIdx = 0, Color.colors = ["#ff0000", "#0000ff", "#99cc00", "#ffff00", "#000066", "#00ffff", "#9900cc", "#0099cc", "#cc9900", "#cc0099", "#00cc99", "#663333", "#ffcc9a", "#ff9acc", "#ccff33", "#660000", "#ffcc33", "#ff00ff", "#00ff00", "#ffffff"], Color.getNextColor = function () {
  var t = Color.colors[Color.curIdx % Color.colors.length];
  return Color.curIdx++, t
}, AladinUtils = function () {
  return {
    xyToView: function (t, e, i, o, r, s) {
      return {
        vx: AladinUtils.myRound(r / 2 * (1 + s * t) - (r - i) / 2),
        vy: AladinUtils.myRound(r / 2 * (1 + s * e) - (r - o) / 2)
      }
    },
    viewToXy: function (t, e, i, o, r, s) {
      return {
        x: ((2 * t + (r - i)) / r - 1) / s,
        y: ((2 * e + (r - o)) / r - 1) / s
      }
    },
    myRound: function (t) {
      return 0 > t ? -1 * (0 | -t) : 0 | t
    },
    isHpxPixVisible: function (t, e, i) {
      for (var o = 0; t.length > o; o++) if (t[o].vx >= -20 && e + 20 > t[o].vx && t[o].vy >= -20 && i + 20 > t[o].vy) return !0;
      return !1
    },
    ipixToIpix: function (t, e, i) {},
    getZoomFactorForAngle: function (t, e) {
      var i = {
        ra: 0,
        dec: 0
      },
        o = {
          ra: t,
          dec: 0
        },
        r = new Projection(t / 2, 0);
      r.setProjection(e);
      var s = r.project(i.ra, i.dec),
        a = r.project(o.ra, o.dec),
        n = 1 / (s.X - a.Y);
      return n
    }
  }
}(), ProjectionEnum = {
  SIN: Projection.PROJ_SIN,
  AITOFF: Projection.PROJ_AITOFF
}, CooFrameEnum = function () {
  return {
    J2000: "J2000",
    GAL: "Galactic"
  }
}(), CooFrameEnum.fromString = function (t, e) {
  return t ? (t = t.toLowerCase().replace(/^\s+|\s+$/g, ""), 0 == t.indexOf("j2000") || 0 == t.indexOf("icrs") ? CooFrameEnum.J2000 : 0 == t.indexOf("gal") ? CooFrameEnum.GAL : e ? e : null) : e ? e : null
}, Downloader = function () {
  var t = 4,
    e = !1,
    i = 700,
    o = function (t) {
      this.view = t, this.nbDownloads = 0, this.dlQueue = [], this.urlsInQueue = {}
    };
  return o.prototype.requestDownload = function (t, e, i) {
    e in this.urlsInQueue || (this.dlQueue.push({
      img: t,
      url: e,
      cors: i
    }), this.urlsInQueue[e] = 1, this.tryDownload())
  }, o.prototype.tryDownload = function () {
    for (; this.dlQueue.length > 0 && t > this.nbDownloads;) this.startDownloadNext()
  }, o.prototype.startDownloadNext = function () {
    var t = this.dlQueue.shift();
    if (t) {
      this.nbDownloads++;
      var e = this;
      t.img.onload = function () {
        e.completeDownload(this, !0)
      }, t.img.onerror = function () {
        e.completeDownload(this, !1)
      }, t.cors ? t.img.crossOrigin = "anonymous" : void 0 !== t.img.crossOrigin && delete t.img.crossOrigin, t.img.src = t.url
    }
  }, o.prototype.completeDownload = function (t, o) {
    if (delete this.urlsInQueue[t.src], t.onerror = null, t.onload = null, this.nbDownloads--, o) {
      if (e) {
        var r = (new Date).getTime();
        t.fadingStart = r, t.fadingEnd = r + i
      }
      this.view.requestRedraw()
    } else t.dlError = !0;
    this.tryDownload()
  }, o
}(), Footprint = function () {
  return Footprint = function (t) {
    this.polygons = t, this.overlay = null, this.isShowing = !0, this.isSelected = !1
  }, Footprint.prototype.setOverlay = function (t) {
    this.overlay = t
  }, Footprint.prototype.show = function () {
    this.isShowing || (this.isShowing = !0, this.overlay && this.overlay.reportChange())
  }, Footprint.prototype.hide = function () {
    this.isShowing && (this.isShowing = !1, this.overlay && this.overlay.reportChange())
  }, Footprint.prototype.select = function () {
    this.isSelected || (this.isSelected = !0, this.overlay && this.overlay.reportChange())
  }, Footprint.prototype.deselect = function () {
    this.isSelected && (this.isSelected = !1, this.overlay && this.overlay.reportChange())
  }, Footprint
}(), Popup = function () {
  return Popup = function (t) {
    this.domEl = $('<div class="aladin-popup-container"><div class="aladin-popup"><a class="aladin-closeBtn">&times;</a><div class="aladin-popupTitle"></div><div class="aladin-popupText"></div></div><div class="aladin-popup-arrow"></div></div>'), this.domEl.appendTo(t);
    var e = this;
    this.domEl.find(".aladin-closeBtn").click(function () {
      e.hide()
    })
  }, Popup.prototype.hide = function () {
    this.domEl.hide()
  }, Popup.prototype.show = function () {
    this.domEl.show()
  }, Popup.prototype.setTitle = function (t) {
    this.domEl.find(".aladin-popupTitle").html(t)
  }, Popup.prototype.setText = function (t) {
    this.domEl.find(".aladin-popupText").html(t), this.w = this.domEl.outerWidth(), this.h = this.domEl.outerHeight()
  }, Popup.prototype.setSource = function (t) {
    this.source && (this.source.popup = null), t.popup = this, this.source = t, this.setPosition(t.x, t.y)
  }, Popup.prototype.setPosition = function (t, e) {
    var i = t - this.w / 2,
      o = e - this.h + this.source.catalog.sourceSize / 2;
    this.domEl[0].style.left = i + "px", this.domEl[0].style.top = o + "px"
  }, Popup
}(), Overlay = function () {
  return Overlay = function (t) {
    t = t || {}, this.name = t.name || "overlay", this.color = t.color || Color.getNextColor(), this.overlays = [], this.isShowing = !0
  }, Overlay.parseSTCS = function (t) {
    for (var e, i = [], o = t.match(/\S+/g), r = 0, s = o.length; s > r;) {
      var a = o[r].toLowerCase();
      if ("polygon" == a && (e = [], r++, frame = o[r].toLowerCase(), "icrs" == frame || "j2000" == frame)) {
        for (; s > r + 2;) {
          var n = parseFloat(o[r + 1]);
          if (isNaN(n)) break;
          var h = parseFloat(o[r + 2]);
          e.push([n, h]), r += 2
        }
        e.push(e[0]), i.push(e)
      }
      r++
    }
    return i
  }, Overlay.prototype.addFootprints = function (t) {
    this.overlays = this.overlays.concat(t);
    for (var e = 0, i = t.length; i > e; e++) t[e].setOverlay(this);
    this.view.requestRedraw()
  }, Overlay.prototype.getFootprint = function (t) {
    return this.footprints.length > t ? this.footprints[t] : null
  }, Overlay.prototype.setView = function (t) {
    this.view = t
  }, Overlay.prototype.removeAll = function () {
    this.overlays = []
  }, Overlay.prototype.draw = function (t, e, i, o, r, s, a) {
    t.strokeStyle = this.color, t.lineWidth = 2, t.beginPath(), xyviews = [];
    for (var n = 0, h = this.overlays.length; h > n; n++) xyviews.push(this.drawFootprint(this.overlays[n], t, e, i, o, r, s, a));
    t.stroke(), t.strokeStyle = Overlay.increase_brightness(this.color, 80), t.beginPath();
    for (var n = 0, h = this.overlays.length; h > n; n++) this.overlays[n].isSelected && this.drawFootprintSelected(t, xyviews[n]);
    t.stroke()
  }, Overlay.increase_brightness = function (t, e) {
    t = t.replace(/^\s*#|\s*$/g, ""), 3 == t.length && (t = t.replace(/(.)/g, "$1$1"));
    var i = parseInt(t.substr(0, 2), 16),
      o = parseInt(t.substr(2, 2), 16),
      r = parseInt(t.substr(4, 2), 16);
    return "#" + (0 | 256 + i + (256 - i) * e / 100).toString(16).substr(1) + (0 | 256 + o + (256 - o) * e / 100).toString(16).substr(1) + (0 | 256 + r + (256 - r) * e / 100).toString(16).substr(1)
  }, Overlay.prototype.drawFootprint = function (t, e, i, o, r, s, a, n) {
    if (!t.isShowing) return null;
    for (var h = [], l = !1, c = t.polygons, u = 0, d = c.length; d > u; u++) {
      var p;
      if (o != CooFrameEnum.J2000) {
        var f = CooConversion.J2000ToGalactic([c[u][0], c[u][1]]);
        p = i.project(f[0], f[1])
      } else p = i.project(c[u][0], c[u][1]);
      if (!p) return null;
      var v = AladinUtils.xyToView(p.X, p.Y, r, s, a, n);
      h.push(v), !l && r > v.vx && v.vx >= 0 && s >= v.vy && v.vy >= 0 && (l = !0)
    }
    if (l) {
      e.moveTo(h[0].vx, h[0].vy);
      for (var u = 1, d = h.length; d > u; u++) e.lineTo(h[u].vx, h[u].vy)
    }
    return h
  }, Overlay.prototype.drawFootprintSelected = function (t, e) {
    if (e) {
      var i = e;
      t.moveTo(i[0].vx, i[0].vy);
      for (var o = 1, r = i.length; r > o; o++) t.lineTo(i[o].vx, i[o].vy)
    }
  }, Overlay.prototype.reportChange = function () {
    this.view.requestRedraw()
  }, Overlay
}(), cds.Source = function () {
  return cds.Source = function (t, e, i, o) {
    this.ra = t, this.dec = e, this.data = i, this.catalog = null, this.marker = o && o.marker || !1, this.marker && (this.popupTitle = o && o.popupTitle ? o.popupTitle : "", this.popupDesc = o && o.popupDesc ? o.popupDesc : ""), this.isShowing = !0, this.isSelected = !1
  }, cds.Source.prototype.setCatalog = function (t) {
    this.catalog = t
  }, cds.Source.prototype.show = function () {
    this.isShowing || (this.isShowing = !0, this.catalog && this.catalog.reportChange())
  }, cds.Source.prototype.hide = function () {
    this.isShowing && (this.isShowing = !1, this.catalog && this.catalog.reportChange())
  }, cds.Source.prototype.select = function () {
    this.isSelected || (this.isSelected = !0, this.catalog && this.catalog.reportChange())
  }, cds.Source.prototype.deselect = function () {
    this.isSelected && (this.isSelected = !1, this.catalog && this.catalog.reportChange())
  }, cds.Source
}(), ProgressiveCat = function () {
  function t(t, e) {
    var i = ["name", "ID", "ucd", "utype", "unit", "datatype", "arraysize", "width", "precision"],
      o = [],
      r = 0;
    return t.keyRa = t.keyDec = null, $(e).find("FIELD").each(function () {
      for (var e = {}, s = 0; i.length > s; s++) {
        var a = i[s];
        $(this).attr(a) && (e[a] = $(this).attr(a))
      }
      e.ID || (e.ID = "col_" + r), t.keyRa || !e.ucd || 0 != e.ucd.indexOf("pos.eq.ra") && 0 != e.ucd.indexOf("POS_EQ_RA") || (t.keyRa = e.name ? e.name : e.ID), t.keyDec || !e.ucd || 0 != e.ucd.indexOf("pos.eq.dec") && 0 != e.ucd.indexOf("POS_EQ_DEC") || (t.keyDec = e.name ? e.name : e.ID), o.push(e), r++
    }), o
  }
  function e(t, e, i) {
    if (!t.keyRa || !t.keyDec) return [];
    lines = e.split("\n");
    for (var o = [], r = 0; i.length > r; r++) i[r].name ? o.push(i[r].name) : o.push(i[r].ID);
    for (var s = [], a = new Coo, n = 2; lines.length > n; n++) {
      var h = {},
        l = lines[n].split("	");
      if (!(l.length < o.length)) {
        for (var c = 0; o.length > c; c++) h[o[c]] = l[c];
        var u, d;
        Utils.isNumber(h[t.keyRa]) && Utils.isNumber(h[t.keyDec]) ? (u = parseFloat(h[t.keyRa]), d = parseFloat(h[t.keyDec])) : (a.parse(h[t.keyRa] + " " + h[t.keyDec]), u = a.lon, d = a.lat), s.push(new cds.Source(u, d, h))
      }
    }
    return s
  }
  return ProgressiveCat = function (t, e, i, o) {
    o = o || {}, this.type = "progressivecat", this.rootUrl = t, this.frame = CooFrameEnum.fromString(e) || CooFrameEnum.J2000, this.maxOrder = i, this.isShowing = !0, this.name = o.name || "progressive-cat", this.color = o.color || Color.getNextColor(), this.sourceSize = o.sourceSize || 10, this.sourcesCache = new Utils.LRUCache(100), this.cacheCanvas = document.createElement("canvas"), this.cacheCanvas.width = this.sourceSize, this.cacheCanvas.height = this.sourceSize;
    var r = this.cacheCanvas.getContext("2d");
    r.beginPath(), r.strokeStyle = this.color, r.lineWidth = 2, r.moveTo(0, 0), r.lineTo(0, this.sourceSize), r.lineTo(this.sourceSize, this.sourceSize), r.lineTo(this.sourceSize, 0), r.lineTo(0, 0), r.stroke()
  }, ProgressiveCat.prototype = {
    init: function (t) {
      this.view = t, this.level3Sources || this.loadLevel2Sources()
    },
    loadLevel2Sources: function () {
      var i = this;
      $.ajax({
        url: i.rootUrl + "/" + "Norder2/Allsky.xml",
        method: "GET",
        success: function (o) {
          i.fields = t(i, o), i.level2Sources = e(i, $(o).find("CSV").text(), i.fields), i.loadLevel3Sources()
        },
        error: function (t) {
          console.log("Something went wrong: " + t)
        }
      })
    },
    loadLevel3Sources: function () {
      var t = this;
      $.ajax({
        url: t.rootUrl + "/" + "Norder3/Allsky.xml",
        method: "GET",
        success: function (i) {
          t.level3Sources = e(t, $(i).find("CSV").text(), t.fields), t.view.requestRedraw()
        },
        error: function (t) {
          console.log("Something went wrong: " + t)
        }
      })
    },
    draw: function (t, e, i, o, r, s, a) {
      if (this.isShowing && this.level3Sources && (this.drawSources(this.level2Sources, t, e, i, o, r, s, a), this.drawSources(this.level3Sources, t, e, i, o, r, s, a), this.tilesInView)) for (var n, h, l, c = 0; this.tilesInView.length > c; c++) l = this.tilesInView[c], h = l[0] + "-" + l[1], n = this.sourcesCache.get(h), n && this.drawSources(n, t, e, i, o, r, s, a)
    },
    drawSources: function (t, e, i, o, r, s, a, n) {
      for (var h = 0, l = t.length; l > h; h++) this.drawSource(t[h], e, i, o, r, s, a, n)
    },
    getSources: function () {
      var t = [];
      if (this.level2Sources && (t = t.concat(this.level2Sources)), this.level3Sources && (t = t.concat(this.level3Sources)), this.tilesInView) for (var e, i, o, r = 0; this.tilesInView.length > r; r++) o = this.tilesInView[r], i = o[0] + "-" + o[1], e = this.sourcesCache.get(i), e && (t = t.concat(e));
      return t
    },
    drawSource: function (t, e, i, o, r, s, a, n) {
      if (t.isShowing) {
        var h, l = this.sourceSize;
        if (o != CooFrameEnum.J2000) {
          var c = CooConversion.J2000ToGalactic([t.ra, t.dec]);
          h = i.project(c[0], c[1])
        } else h = i.project(t.ra, t.dec);
        if (h) {
          var u = AladinUtils.xyToView(h.X, h.Y, r, s, a, n);
          if (u) {
            if (u.vx > r + l || 0 - l > u.vx || u.vy > s + l || 0 - l > u.vy) return t.x = t.y = void 0, void 0;
            t.x = u.vx, t.y = u.vy, e.drawImage(this.cacheCanvas, t.x - l / 2, t.y - l / 2)
          }
        }
      }
    },
    deselectAll: function () {
      for (var t = 0; this.level2Sources.length > t; t++) this.level2Sources[t].deselect();
      for (var t = 0; this.level3Sources.length > t; t++) this.level3Sources[t].deselect();
      var e = this.sourcesCache.keys();
      for (key in e) if (this.sourcesCache[key]) for (var i = this.sourcesCache[key], t = 0; i.length > t; t++) i[t].deselect()
    },
    show: function () {
      this.isShowing || (this.isShowing = !0, this.reportChange())
    },
    hide: function () {
      this.isShowing && (this.isShowing = !1, this.reportChange())
    },
    reportChange: function () {
      this.view.requestRedraw()
    },
    getTileURL: function (t, e) {
      var i = 1e4 * Math.floor(e / 1e4);
      return this.rootUrl + "/" + "Norder" + t + "/Dir" + i + "/Npix" + e + ".tsv"
    },
    loadNeededTiles: function () {
      this.tilesInView = [], this.otherSources = [];
      var t = this.view.realNorder;
      if (t > this.maxOrder && (t = this.maxOrder), !(3 >= t)) {
        for (var i, o, r = this.view.getVisibleCells(t, this.frame), s = 4; t >= s; s++) {
          i = [];
          for (var a = 0; r.length > a; a++) o = Math.floor(r[a].ipix / Math.pow(4, t - s)), 0 > i.indexOf(o) && i.push(o);
          for (var n = 0; i.length > n; n++) this.tilesInView.push([s, i[n]])
        }
        for (var h, l, a = 0; this.tilesInView.length > a; a++) h = this.tilesInView[a], l = h[0] + "-" + h[1], this.sourcesCache.get(l) ||
        function (t, i, o) {
          var r = i + "-" + o;
          $.ajax({
            url: t.getTileURL(i, o),
            method: "GET",
            success: function (i) {
              t.sourcesCache.set(r, e(t, i, t.fields)), t.view.requestRedraw()
            },
            error: function () {
              t.sourcesCache.set(r, [])
            }
          })
        }(this, h[0], h[1])
      }
    }
  }, ProgressiveCat
}(), cds.Catalog = function () {
  return cds.Catalog = function (t) {
    t = t || {}, this.type = "catalog", this.name = t.name || "catalog", this.color = t.color || Color.getNextColor(), this.sourceSize = t.sourceSize || 6, this.selectSize = this.sourceSize + 2, this.isShowing = !0, this.indexationNorder = 5, this.sources = [], this.hpxIdx = new HealpixIndex(this.indexationNorder), this.hpxIdx.init(), this.selectionColor = "#00ff00", this.cacheCanvas = document.createElement("canvas"), this.cacheCanvas.width = this.sourceSize, this.cacheCanvas.height = this.sourceSize;
    var e = this.cacheCanvas.getContext("2d");
    e.beginPath(), e.strokeStyle = this.color, e.lineWidth = 2, e.moveTo(0, 0), e.lineTo(0, this.sourceSize), e.lineTo(this.sourceSize, this.sourceSize), e.lineTo(this.sourceSize, 0), e.lineTo(0, 0), e.stroke(), this.cacheMarkerCanvas = document.createElement("canvas"), this.cacheMarkerCanvas.width = this.sourceSize, this.cacheMarkerCanvas.height = this.sourceSize;
    var i = this.cacheMarkerCanvas.getContext("2d");
    i.fillStyle = this.color, i.beginPath();
    var o = this.sourceSize / 2;
    i.arc(o, o, o - 2, 0, 2 * Math.PI, !1), i.fill(), i.lineWidth = 2, i.strokeStyle = "#ccc", i.stroke(), this.cacheSelectCanvas = document.createElement("canvas"), this.cacheSelectCanvas.width = this.selectSize, this.cacheSelectCanvas.height = this.selectSize;
    var r = this.cacheSelectCanvas.getContext("2d");
    r.beginPath(), r.strokeStyle = this.selectionColor, r.lineWidth = 2, r.moveTo(0, 0), r.lineTo(0, this.selectSize), r.lineTo(this.selectSize, this.selectSize), r.lineTo(this.selectSize, 0), r.lineTo(0, 0), r.stroke()
  }, cds.Catalog.parseVOTable = function (t, e) {
    function i(t, e) {
      t = t.replace(/^\s+/g, "");
      var i = ["name", "ID", "ucd", "utype", "unit", "datatype", "arraysize", "width", "precision"],
        o = [],
        r = 0;
      $(t).find("FIELD").each(function () {
        for (var t = {}, e = 0; i.length > e; e++) {
          var s = i[e];
          $(this).attr(s) && (t[s] = $(this).attr(s))
        }
        t.ID || (t.ID = "col_" + r), o.push(t), r++
      });
      var s, a;
      s = a = null;
      for (var n = 0, h = o.length; h > n; n++) {
        var l = o[n];
        if (!s && l.ucd) {
          var c = l.ucd.toLowerCase();
          if (c.indexOf("pos.eq.ra") >= 0 || c.indexOf("pos_eq_ra") >= 0) {
            s = n;
            continue
          }
        }
        if (!a && l.ucd) {
          var c = l.ucd.toLowerCase();
          if (c.indexOf("pos.eq.dec") >= 0 || c.indexOf("pos_eq_dec") >= 0) {
            a = n;
            continue
          }
        }
      }
      var u, d, p = [],
        f = new Coo;
      $(t).find("TR").each(function () {
        var t = {},
          e = 0;
        $(this).find("TD").each(function () {
          var i = o[e].name ? o[e].name : o[e].id;
          t[i] = $(this).text(), e++
        });
        var i = o[s].name ? o[s].name : o[s].id,
          r = o[a].name ? o[a].name : o[a].id;
        Utils.isNumber(t[i]) && Utils.isNumber(t[r]) ? (u = parseFloat(t[i]), d = parseFloat(t[r])) : (f.parse(t[i] + " " + t[r]), u = f.lon, d = f.lat), p.push(new cds.Source(u, d, t))
      }), e && e(p)
    }
    $.ajax({
      url: Aladin.JSONP_PROXY,
      data: {
        url: t
      },
      method: "GET",
      dataType: "jsonp",
      success: function (t) {
        i(t, e)
      }
    })
  }, cds.Catalog.prototype.addSources = function (t) {
    this.sources = this.sources.concat(t);
    for (var e = 0, i = t.length; i > e; e++) t[e].setCatalog(this);
    this.view.requestRedraw()
  }, cds.Catalog.prototype.getSources = function () {
    return this.sources
  }, cds.Catalog.prototype.selectAll = function () {
    if (this.sources) for (var t = 0; this.sources.length > t; t++) this.sources[t].select()
  }, cds.Catalog.prototype.deselectAll = function () {
    if (this.sources) for (var t = 0; this.sources.length > t; t++) this.sources[t].deselect()
  }, cds.Catalog.prototype.getSource = function (t) {
    return this.sources.length > t ? this.sources[t] : null
  }, cds.Catalog.prototype.setView = function (t) {
    this.view = t
  }, cds.Catalog.prototype.removeAll = function () {
    this.sources = []
  }, cds.Catalog.prototype.draw = function (t, e, i, o, r, s, a) {
    if (this.isShowing) {
      for (var n = 0, h = this.sources.length; h > n; n++) this.drawSource(this.sources[n], t, e, i, o, r, s, a);
      t.strokeStyle = this.selectionColor, t.beginPath();
      for (var n = 0, h = this.sources.length; h > n; n++) this.sources[n].isSelected && this.drawSourceSelection(this.sources[n], t);
      t.stroke()
    }
  }, cds.Catalog.prototype.drawSource = function (t, e, i, o, r, s, a, n) {
    if (t.isShowing) {
      var h, l = this.sourceSize;
      if (o != CooFrameEnum.J2000) {
        var c = CooConversion.J2000ToGalactic([t.ra, t.dec]);
        h = i.project(c[0], c[1])
      } else h = i.project(t.ra, t.dec);
      if (h) {
        var u = AladinUtils.xyToView(h.X, h.Y, r, s, a, n),
          d = t.popup ? 100 : t.sourceSize;
        if (u) {
          if (u.vx > r + d || 0 - d > u.vx || u.vy > s + d || 0 - d > u.vy) return t.x = t.y = void 0, void 0;
          t.x = u.vx, t.y = u.vy, t.marker ? e.drawImage(this.cacheMarkerCanvas, t.x - l / 2, t.y - l / 2) : e.drawImage(this.cacheCanvas, t.x - l / 2, t.y - l / 2), t.popup && t.popup.setPosition(t.x, t.y)
        }
      }
    }
  }, cds.Catalog.prototype.drawSourceSelection = function (t, e) {
    if (t && t.isShowing && t.x && t.y) {
      var i = this.selectSize;
      e.drawImage(this.cacheSelectCanvas, t.x - i / 2, t.y - i / 2)
    }
  }, cds.Catalog.prototype.reportChange = function () {
    this.view.requestRedraw()
  }, cds.Catalog.prototype.show = function () {
    this.isShowing || (this.isShowing = !0, this.reportChange())
  }, cds.Catalog.prototype.hide = function () {
    this.isShowing && (this.isShowing = !1, this.view && this.view.popup && this.view.popup.source && this.view.popup.source.catalog == this && this.view.popup.hide(), this.reportChange())
  }, cds.Catalog
}(), Tile = function () {
  function t(t, e) {
    this.img = t, this.url = e
  }
  return t.isImageOk = function (t) {
    return t.allSkyTexture ? !0 : t.src ? t.complete ? t.naturalWidth !== void 0 && 0 == t.naturalWidth ? !1 : !0 : !1 : !1
  }, t
}(), TileBuffer = function () {
  function t() {
    this.pointer = 0, this.tilesMap = {}, this.tilesArray = Array(e);
    for (var t = 0; e > t; t++) this.tilesArray[t] = new Tile(new Image, null)
  }
  var e = 800;
  return t.prototype.addTile = function (t) {
    if (this.getTile(t)) return null;
    var i = this.tilesArray[this.pointer];
    return null != i.url && (i.img.src = null, delete this.tilesMap[i.url]), this.tilesArray[this.pointer].url = t, this.tilesMap[t] = this.tilesArray[this.pointer], this.pointer++, this.pointer >= e && (this.pointer = 0), this.tilesMap[t]
  }, t.prototype.getTile = function (t) {
    return this.tilesMap[t]
  }, t
}(), ColorMap = function () {
  return ColorMap = function (t) {
    this.view = t, this.reversed = !1, this.map = "native", this.sig = this.signature()
  }, ColorMap.MAPS = {}, ColorMap.MAPS.eosb = {
    name: "Eos B",
    r: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 18, 27, 36, 45, 49, 57, 72, 81, 91, 100, 109, 118, 127, 136, 131, 139, 163, 173, 182, 191, 200, 209, 218, 227, 213, 221, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 253, 251, 249, 247, 245, 243, 241, 215, 214, 235, 234, 232, 230, 228, 226, 224, 222, 198, 196, 216, 215, 213, 211, 209, 207, 205, 203, 181, 179, 197, 196, 194, 192, 190, 188, 186, 184, 164, 162, 178, 176, 175, 173, 171, 169, 167, 165, 147, 145, 159, 157, 156, 154, 152, 150, 148, 146, 130, 128, 140, 138, 137, 135, 133, 131, 129, 127, 113, 111, 121, 119, 117, 117],
    g: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 15, 23, 31, 39, 47, 55, 57, 64, 79, 87, 95, 103, 111, 119, 127, 135, 129, 136, 159, 167, 175, 183, 191, 199, 207, 215, 200, 207, 239, 247, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 255, 255, 255, 255, 255, 255, 255, 229, 229, 255, 250, 246, 242, 238, 233, 229, 225, 198, 195, 212, 208, 204, 199, 195, 191, 187, 182, 160, 156, 169, 165, 161, 157, 153, 148, 144, 140, 122, 118, 127, 125, 123, 121, 119, 116, 114, 112, 99, 97, 106, 104, 102, 99, 97, 95, 93, 91, 80, 78, 84, 82, 80, 78, 76, 74, 72, 70, 61, 59, 63, 61, 59, 57, 55, 53, 50, 48, 42, 40, 42, 40, 38, 36, 33, 31, 29, 27, 22, 21, 21, 19, 16, 14, 12, 13, 8, 6, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    b: [116, 121, 127, 131, 136, 140, 144, 148, 153, 157, 145, 149, 170, 174, 178, 182, 187, 191, 195, 199, 183, 187, 212, 216, 221, 225, 229, 233, 238, 242, 221, 225, 255, 247, 239, 231, 223, 215, 207, 199, 172, 164, 175, 167, 159, 151, 143, 135, 127, 119, 100, 93, 95, 87, 79, 71, 63, 55, 47, 39, 28, 21, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, ColorMap.MAPS.rainbow = {
    name: "Rainbow",
    r: [0, 4, 9, 13, 18, 22, 27, 31, 36, 40, 45, 50, 54, 58, 61, 64, 68, 69, 72, 74, 77, 79, 80, 82, 83, 85, 84, 86, 87, 88, 86, 87, 87, 87, 85, 84, 84, 84, 83, 79, 78, 77, 76, 71, 70, 68, 66, 60, 58, 55, 53, 46, 43, 40, 36, 33, 25, 21, 16, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 21, 25, 29, 33, 42, 46, 51, 55, 63, 67, 72, 76, 80, 89, 93, 97, 101, 110, 114, 119, 123, 131, 135, 140, 144, 153, 157, 161, 165, 169, 178, 182, 187, 191, 199, 203, 208, 212, 221, 225, 229, 233, 242, 246, 250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    g: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 16, 21, 25, 29, 38, 42, 46, 51, 55, 63, 67, 72, 76, 84, 89, 93, 97, 106, 110, 114, 119, 127, 131, 135, 140, 144, 152, 157, 161, 165, 174, 178, 182, 187, 195, 199, 203, 208, 216, 220, 225, 229, 233, 242, 246, 250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 250, 242, 238, 233, 229, 221, 216, 212, 208, 199, 195, 191, 187, 178, 174, 170, 165, 161, 153, 148, 144, 140, 131, 127, 123, 119, 110, 106, 102, 97, 89, 85, 80, 76, 72, 63, 59, 55, 51, 42, 38, 34, 29, 21, 17, 12, 8, 0],
    b: [0, 3, 7, 10, 14, 19, 23, 28, 32, 38, 43, 48, 53, 59, 63, 68, 72, 77, 81, 86, 91, 95, 100, 104, 109, 113, 118, 122, 127, 132, 136, 141, 145, 150, 154, 159, 163, 168, 173, 177, 182, 186, 191, 195, 200, 204, 209, 214, 218, 223, 227, 232, 236, 241, 245, 250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 246, 242, 238, 233, 225, 220, 216, 212, 203, 199, 195, 191, 187, 178, 174, 170, 165, 157, 152, 148, 144, 135, 131, 127, 123, 114, 110, 106, 102, 97, 89, 84, 80, 76, 67, 63, 59, 55, 46, 42, 38, 34, 25, 21, 16, 12, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, ColorMap.MAPS_CUSTOM = ["rainbow", "eosb"], ColorMap.MAPS_NAMES = ["native", "grayscale"].concat(ColorMap.MAPS_CUSTOM), ColorMap.prototype.reverse = function (t) {
    this.reversed = t ? t : !this.reversed, this.sig = this.signature(), this.view.requestRedraw()
  }, ColorMap.prototype.signature = function () {
    var t = this.map;
    return this.reversed && (t += " reversed"), t
  }, ColorMap.prototype.update = function (t) {
    this.map = t, this.sig = this.signature(), this.view.requestRedraw()
  }, ColorMap.prototype.apply = function (t) {
    if ("native" == this.sig) return t;
    if (t.cmSig == this.sig) return t.cmImg;
    var e = document.createElement("canvas");
    e.width = t.width, e.height = t.height;
    var i = e.getContext("2d");
    i.drawImage(t, 0, 0);
    var o, r, s, a = i.getImageData(0, 0, e.width, e.height),
      n = a.data,
      h = n.length,
      l = 3;
    "grayscale" == this.map ? l = 1 : ColorMap.MAPS_CUSTOM.indexOf(this.map) >= 0 && (l = 2);
    for (var c = 0; h > c; c += 4) {
      switch (l) {
      case 1:
        o = r = s = AladinUtils.myRound((n[c] + n[c + 1] + n[c + 2]) / 3);
        break;
      case 2:
        this.reversed ? (o = ColorMap.MAPS[this.map].r[255 - n[c]], r = ColorMap.MAPS[this.map].g[255 - n[c + 1]], s = ColorMap.MAPS[this.map].b[255 - n[c + 2]]) : (o = ColorMap.MAPS[this.map].r[n[c]], r = ColorMap.MAPS[this.map].g[n[c + 1]], s = ColorMap.MAPS[this.map].b[n[c + 2]]);
        break;
      default:
        o = n[c], r = n[c + 1], s = n[c + 2]
      }
      2 != l && this.reversed && (o = 255 - o, r = 255 - r, s = 255 - s), n[c] = o, n[c + 1] = r, n[c + 2] = s
    }
    return a.data = n, i.putImageData(a, 0, 0), t.cmSig = this.sig, t.cmImg = e, t.cmImg
  }, ColorMap
}(), HpxImageSurvey = function () {
  function t(t, e, i, o, r, s, a, n, h, l, c, u, d, p, f) {
    var v = (i + r + a) / 3,
      g = (o + s + n) / 3;
    t.save(), f && (t.globalAlpha = f), t.beginPath();
    var m = .05;
    t.moveTo((1 + m) * i - v * m, (1 + m) * o - g * m), t.lineTo((1 + m) * r - v * m, (1 + m) * s - g * m), t.lineTo((1 + m) * a - v * m, (1 + m) * n - g * m), t.closePath(), t.clip();
    var y = 1 / (h * (p - u) - c * p + d * u + (c - d) * l);
    t.transform(-(l * (a - r) - u * a + p * r + (u - p) * i) * y, (u * n + l * (s - n) - p * s + (p - u) * o) * y, (h * (a - r) - c * a + d * r + (c - d) * i) * y, -(c * n + h * (s - n) - d * s + (d - c) * o) * y, (h * (p * r - u * a) + l * (c * a - d * r) + (d * u - c * p) * i) * y, (h * (p * s - u * n) + l * (c * n - d * s) + (d * u - c * p) * o) * y), t.drawImage(e, 0, 0), t.restore()
  }
  var e = function (t, i, o, r, s, a) {
      this.id = t, this.name = i, this.rootUrl = "/" === o.slice(-1) ? o.substr(0, o.length - 1) : o, a = a || {}, this.imgFormat = a.imgFormat || "jpg", this.minOrder = a.minOrder || null, this.cooFrame = CooFrameEnum.fromString(r, CooFrameEnum.J2000), this.rootUrl.indexOf("/glimpse360/aladin/data") >= 0 && (this.cooFrame = CooFrameEnum.J2000), this.maxOrder = s, this.allskyTextures = [], this.alpha = 0, this.allskyTextureSize = 0, this.lastUpdateDateNeededTiles = 0;
      for (var n = !1, h = 0; e.SURVEYS.length > h; h++) e.SURVEYS[h].id == this.id && (n = !0);
      n || e.SURVEYS.push({
        id: this.id,
        url: this.rootUrl,
        name: this.name,
        maxOrder: this.maxOrder,
        frame: this.cooFrame
      }), e.SURVEYS_OBJECTS[this.id] = this
    };
  e.UPDATE_NEEDED_TILES_DELAY = 1e3, e.prototype.init = function (t, e) {
    this.view = t, this.cm || (this.cm = new ColorMap(this.view)), this.tileBuffer = this.view.tileBuffer, this.useCors = !1;
    var i = this;
    $.support.cors ? $.ajax({
      type: "GET",
      url: this.rootUrl + "/properties",
      contentType: "text/plain",
      xhrFields: {},
      headers: {},
      success: function () {
        i.useCors = !0, i.retrieveAllskyTextures(), e && e()
      },
      error: function () {
        i.retrieveAllskyTextures(), e && e()
      }
    }) : (this.retrieveAllskyTextures(), e())
  }, e.DEFAULT_SURVEY_ID = "P/DSS2/color", e.SURVEYS_OBJECTS = {}, e.SURVEYS = [{
    id: "P/2MASS/color",
    url: "http://alasky.u-strasbg.fr/2MASS/Color",
    name: "2MASS colored",
    maxOrder: 9,
    frame: "equatorial",
    format: "jpeg"
  }, {
    id: "P/DSS2/color",
    url: "http://alasky.u-strasbg.fr/DssColor",
    name: "DSS colored",
    maxOrder: 9,
    frame: "equatorial",
    format: "jpeg"
  }, {
    id: "P/DSS2/red",
    url: "http://alasky.u-strasbg.fr/DSS/DSS2Merged",
    name: "DSS2 Red (F+R)",
    maxOrder: 9,
    frame: "equatorial",
    format: "jpeg fits"
  }, {
    id: "P/Fermi/color",
    url: "http://alasky.u-strasbg.fr/Fermi/Color",
    name: "Fermi color",
    maxOrder: 3,
    frame: "equatorial",
    format: "jpeg"
  }, {
    id: "P/Finkbeiner",
    url: "http://alasky.u-strasbg.fr/FinkbeinerHalpha",
    maxOrder: 3,
    frame: "galactic",
    format: "jpeg fits",
    name: "Halpha"
  }, {
    id: "P/GALEXGR6/AIS/color",
    url: "http://alasky.u-strasbg.fr/GALEX/GR6-02-Color",
    name: "GALEX Allsky Imaging Survey colored",
    maxOrder: 8,
    frame: "equatorial",
    format: "jpeg"
  }, {
    id: "P/IRIS/color",
    url: "http://alasky.u-strasbg.fr/IRISColor",
    name: "IRIS colored",
    maxOrder: 3,
    frame: "galactic",
    format: "jpeg"
  }, {
    id: "P/Mellinger/color",
    url: "http://alasky.u-strasbg.fr/MellingerRGB",
    name: "Mellinger colored",
    maxOrder: 4,
    frame: "galactic",
    format: "jpeg"
  }, {
    id: "P/SDSS9/color",
    url: "http://alasky.u-strasbg.fr/SDSS/DR9/color",
    name: "SDSS9 colored",
    maxOrder: 10,
    frame: "equatorial",
    format: "jpeg"
  }, {
    id: "P/SPITZER/color",
    url: "http://alasky.u-strasbg.fr/SpitzerI1I2I4color",
    name: "IRAC color I1,I2,I4 - (GLIMPSE, SAGE, SAGE-SMC, SINGS)",
    maxOrder: 9,
    frame: "galactic",
    format: "jpeg"
  }, {
    id: "P/VTSS/Ha",
    url: "http://alasky.u-strasbg.fr/VTSS/Ha",
    maxOrder: 3,
    frame: "galactic",
    format: "png jpeg fits",
    name: "VTSS-Ha"
  }, {
    id: "P/XMM/EPIC",
    url: "http://saada.u-strasbg.fr/xmmallsky",
    name: "XMM-Newton stacked EPIC images (no phot. normalization)",
    maxOrder: 7,
    frame: "equatorial",
    format: "png jpeg fits"
  }, {
    id: "P/XMM/PN/color",
    url: "http://saada.unistra.fr/xmmpnsky",
    name: "XMM PN colored",
    maxOrder: 7,
    frame: "equatorial",
    format: "png jpeg"
  }], e.getAvailableSurveys = function () {
    return e.SURVEYS
  }, e.getSurveyInfoFromId = function (t) {
    for (var i = e.getAvailableSurveys(), o = 0; i.length > o; o++) if (i[o].id == t) return i[o];
    return null
  }, e.getSurveyFromId = function (t) {
    if (e.SURVEYS_OBJECTS[t]) return e.SURVEYS_OBJECTS[t];
    var i = e.getSurveyInfoFromId(t);
    return i ? new e(i.id, i.name, i.url, i.frame, i.maxOrder) : null
  }, e.prototype.getTileURL = function (t, e) {
    var i = 1e4 * Math.floor(e / 1e4);
    return this.rootUrl + "/" + "Norder" + t + "/Dir" + i + "/Npix" + e + "." + this.imgFormat
  }, e.prototype.retrieveAllskyTextures = function () {
    var t = new Image;
    this.useCors && (t.crossOrigin = "anonymous");
    var e = this;
    t.onload = function () {
      e.allskyTextureSize = t.width / 27;
      for (var i = 0; 29 > i; i++) for (var o = 0; 27 > o; o++) {
        var r = document.createElement("canvas");
        r.width = r.height = e.allskyTextureSize, r.allSkyTexture = !0;
        var s = r.getContext("2d");
        s.drawImage(t, o * e.allskyTextureSize, i * e.allskyTextureSize, e.allskyTextureSize, e.allskyTextureSize, 0, 0, r.width, r.height), e.allskyTextures.push(r)
      }
      e.view.requestRedraw()
    }, t.src = this.rootUrl + "/Norder3/Allsky." + this.imgFormat
  }, e.prototype.redrawAllsky = function (t, e, i) {
    if (!(this.view.curNorder > 6) && this.allskyTextures) for (var o, r, s, a = 0, n = 0, h = e.length; h > n; n++) if (o = e[n], s = o.ipix, this.allskyTextures[s] && Tile.isImageOk(this.allskyTextures[s])) {
      if (i > 40) {
        a = .02, r = {
          x: (o[0].vx + o[2].vx) / 2,
          y: (o[0].vy + o[2].vy) / 2
        };
        for (var l = 0; 4 > l; l++) {
          var c = {
            x: o[l].vx - r.x,
            y: o[l].vy - r.y
          };
          o[l].vx += a * c.x, o[l].vy += a * c.y
        }
      }
      this.drawOneTile(t, this.allskyTextures[s], o, this.allskyTextureSize)
    }
  }, e.prototype.getColorMap = function () {
    return this.cm
  };
  var i = !0;
  return e.prototype.redrawHighres = function (t, o, r) {
    i = !i;
    var s, a, n, h, l, c, u, d, p = (new Date).getTime(),
      f = p - this.lastUpdateDateNeededTiles > e.UPDATE_NEEDED_TILES_DELAY,
      v = r - 1,
      g = [],
      m = [],
      y = {},
      w = !1,
      C = [],
      x = [];
    if (f) {
      var S = [(o[0][0].vx + o[0][1].vx) / 2, (o[0][0].vy + o[0][1].vy) / 2],
        M = o.sort(function (t, e) {
          var i = [(t[0].vx + t[2].vx) / 2, (t[0].vy + t[2].vy) / 2],
            o = [(e[0].vx + e[2].vx) / 2, (e[0].vy + e[2].vy) / 2],
            r = (i[0] - S[0]) * (i[0] - S[0]) + (i[1] - S[1]) * (i[1] - S[1]),
            s = (o[0] - S[0]) * (o[0] - S[0]) + (o[1] - S[1]) * (o[1] - S[1]);
          return r - s
        });
      o = M
    }
    for (var b = 0, T = o.length; T > b; b++) if (l = o[b], d = l.ipix, u = ~~ (d / 4), h = this.getTileURL(v, u), f && v >= 3 && (n = this.tileBuffer.addTile(h), n && x.push({
      img: n.img,
      url: h
    })), a = this.getTileURL(r, d), s = this.tileBuffer.getTile(a)) Tile.isImageOk(s.img) ? g.push({
      img: s.img,
      corners: l
    }) : (w = !0, f && !s.img.dlError && C.push({
      img: s.img,
      url: a
    }), v >= 3 && !y[u] && (n = this.tileBuffer.getTile(h), n && Tile.isImageOk(n.img) && (c = this.view.getPositionsInView(u, v), c && m.push({
      img: n.img,
      corners: c,
      ipix: u
    })), y[u] = 1));
    else {
      if (w = !0, f) {
        var s = this.tileBuffer.addTile(a);
        s && C.push({
          img: s.img,
          url: a
        })
      }
      v >= 3 && !y[u] && (n = this.tileBuffer.getTile(h), n && Tile.isImageOk(n.img) && (c = this.view.getPositionsInView(u, v), c && m.push({
        img: n.img,
        corners: c,
        ipix: u
      })), y[u] = 1)
    }
    for (var b = 0, T = m.length; T > b; b++) this.drawOneTile(t, m[b].img, m[b].corners, m[b].img.width);
    for (var b = 0, T = g.length; T > b; b++) {
      var I = null,
        P = g[b].img;
      P.fadingStart && P.fadingEnd && P.fadingEnd > p && (I = .2 + .8 * ((p - P.fadingStart) / (P.fadingEnd - P.fadingStart))), this.drawOneTile(t, P, g[b].corners, P.width, I)
    }
    if (f) {
      for (var b = 0, T = C.length; T > b; b++) this.view.downloader.requestDownload(C[b].img, C[b].url, this.useCors);
      for (var b = 0, T = x.length; T > b; b++) this.view.downloader.requestDownload(x[b].img, x[b].url, this.useCors);
      this.lastUpdateDateNeededTiles = p
    }
    w && this.view.requestRedrawAtDate(p + e.UPDATE_NEEDED_TILES_DELAY + 10)
  }, e.prototype.drawOneTile = function (e, i, o, r, s) {
    var a = this.useCors ? this.cm.apply(i) : i;
    t(e, a, o[0].vx, o[0].vy, o[1].vx, o[1].vy, o[3].vx, o[3].vy, r - 1, r - 1, r - 1, 0, 0, r - 1, s), t(e, a, o[1].vx, o[1].vy, o[3].vx, o[3].vy, o[2].vx, o[2].vy, r - 1, 0, 0, r - 1, 0, 0, s)
  }, e.prototype.setAlpha = function (t) {
    t = +t, this.alpha = Math.max(0, Math.min(t, 1)), this.view.requestRedraw()
  }, e.prototype.getAlpha = function () {
    return this.alpha
  }, e
}(), HealpixGrid = function () {
  var t = function () {};
  return t.prototype.redraw = function (t, e, i, o) {
    t.lineWidth = 1, t.strokeStyle = "rgb(150,150,220)", t.beginPath();
    for (var r, s = 0, a = e.length; a > s; s++) r = e[s], ipix = r.ipix, t.moveTo(r[0].vx, r[0].vy), t.lineTo(r[1].vx, r[1].vy), t.lineTo(r[2].vx, r[2].vy);
    t.stroke(), t.strokeStyle = "#FFDDDD", t.beginPath();
    for (var s = 0, a = e.length; a > s; s++) r = e[s], ipix = r.ipix, t.strokeText(o + "/" + ipix, (r[0].vx + r[2].vx) / 2, (r[0].vy + r[2].vy) / 2);
    t.stroke()
  }, t
}(), Location = function () {
  return Location = function (t) {
    this.div = $(t)
  }, Location.prototype.update = function (t, e, i) {
    var o = new Coo(t, e, 7);
    i == CooFrameEnum.J2000 ? this.div.html(o.format("s/")) : this.div.html(o.format("d/"))
  }, Location
}(), View = function () {
  function t(e, i, o, r, s) {
    this.aladin = e, this.options = e.options, this.aladinDiv = this.aladin.aladinDiv, this.popup = new Popup(this.aladinDiv), this.createCanvases(), this.location = i, this.fovDiv = o, this.mustClearCatalog = !0, this.mustRedrawReticle = !0, this.mode = t.PAN, this.minFOV = this.maxFOV = null, this.healpixGrid = new HealpixGrid(this.imageCanvas), this.cooFrame = r ? r : CooFrameEnum.GAL;
    var a, n;
    a = n = 0, this.projectionMethod = ProjectionEnum.SIN, this.projection = new Projection(a, n), this.projection.setProjection(this.projectionMethod), this.zoomLevel = 0, this.zoomFactor = this.computeZoomFactor(this.zoomLevel), this.viewCenter = {
      lon: a,
      lat: n
    }, s && this.setZoom(s), this.imageSurvey = null, this.catalogs = [], this.overlays = [], this.tileBuffer = new TileBuffer, this.fixLayoutDimensions(), this.curNorder = 1, this.realNorder = 1, this.dragging = !1, this.dragx = null, this.dragy = null, this.needRedraw = !0, this.downloader = new Downloader(this), this.flagForceRedraw = !1, this.fadingLatestUpdate = null, this.dateRequestRedraw = null, init(this), this.resizeTimer = null;
    var h = this;
    $(window).resize(function () {
      clearTimeout(h.resizeTimer), h.resizeTimer = setTimeout(function () {
        h.fixLayoutDimensions(h)
      }, 100)
    })
  }
  function e(t, e, i, o) {
    if (t.projection) {
      var r, s = AladinUtils.viewToXy(e, i, t.width, t.height, t.largestDim, t.zoomFactor);
      try {
        r = t.projection.unproject(s.x, s.y)
      } catch (a) {}
      r && t.location.update(r.ra, r.dec, t.cooFrame, o)
    }
  }
  return t.PAN = 0, t.SELECT = 1, t.DRAW_SOURCES_WHILE_DRAGGING = !0, t.prototype.createCanvases = function () {
    var t = $(this.aladinDiv);
    t.find(".aladin-imageCanvas").remove(), t.find(".aladin-catalogCanvas").remove(), t.find(".aladin-reticleCanvas").remove(), this.imageCanvas = $("<canvas class='aladin-imageCanvas'></canvas>").appendTo(this.aladinDiv)[0], this.catalogCanvas = $("<canvas class='aladin-catalogCanvas'></canvas>").appendTo(this.aladinDiv)[0], this.reticleCanvas = $("<canvas class='aladin-reticleCanvas'></canvas>").appendTo(this.aladinDiv)[0]
  }, t.prototype.fixLayoutDimensions = function () {
    Utils.cssScale = void 0, this.width = $(this.aladinDiv).width(), this.height = $(this.aladinDiv).height(), this.cx = this.width / 2, this.cy = this.height / 2, this.largestDim = Math.max(this.width, this.height), this.smallestDim = Math.min(this.width, this.height), this.ratio = this.largestDim / this.smallestDim, this.mouseMoveIncrement = 160 / this.largestDim, this.imageCtx = this.imageCanvas.getContext("2d"), this.catalogCtx = this.catalogCanvas.getContext("2d"), this.reticleCtx = this.reticleCanvas.getContext("2d"), this.imageCtx.canvas.width = this.width, this.catalogCtx.canvas.width = this.width, this.reticleCtx.canvas.width = this.width, this.imageCtx.canvas.height = this.height, this.catalogCtx.canvas.height = this.height, this.reticleCtx.canvas.height = this.height, this.computeNorder(), this.requestRedraw()
  }, t.prototype.setMode = function (e) {
    this.mode = e, this.mode == t.SELECT ? this.setCursor("crosshair") : this.setCursor("default")
  }, t.prototype.setCursor = function (t) {
    this.reticleCanvas.style.cursor != t && (this.reticleCanvas.style.cursor = t)
  }, t.prototype.getCanvasDataURL = function () {
    var t = document.createElement("canvas");
    t.width = this.width, t.height = this.height;
    var e = t.getContext("2d");
    return e.drawImage(this.imageCanvas, 0, 0), e.drawImage(this.catalogCanvas, 0, 0), e.drawImage(this.reticleCanvas, 0, 0), t.toDataURL("image/png")
  }, computeFov = function (t) {
    var e = doComputeFov(t, t.zoomFactor);
    return t.mouseMoveIncrement = e / t.imageCanvas.width, e
  }, doComputeFov = function (t, e) {
    if (1 > t.zoomFactor) fov = 180;
    else {
      var i = AladinUtils.viewToXy(0, t.cy, t.width, t.height, t.largestDim, e),
        o = t.projection.unproject(i.x, i.y),
        r = AladinUtils.viewToXy(t.imageCanvas.width - 1, t.cy, t.width, t.height, t.largestDim, e),
        s = t.projection.unproject(r.x, r.y);
      fov = new Coo(o.ra, o.dec).distance(new Coo(s.ra, s.dec))
    }
    return fov
  }, updateFovDiv = function (t) {
    if (isNaN(t.fov)) return t.fovDiv.html("FoV:"), void 0;
    var e;
    e = t.fov > 1 ? Math.round(100 * t.fov) / 100 + "Â°" : 60 * t.fov > 1 ? Math.round(100 * 60 * t.fov) / 100 + "'" : Math.round(100 * 3600 * t.fov) / 100 + '"', t.fovDiv.html("FoV: " + e)
  }, createListeners = function (i) {
    var o = !1;
    "ontouchstart" in window && (o = !0), onDblClick = function (t) {
      var e = i.imageCanvas.relMouseCoords(t),
        o = AladinUtils.viewToXy(e.x, e.y, i.width, i.height, i.largestDim, i.zoomFactor);
      try {
        var r = i.projection.unproject(o.x, o.y)
      } catch (s) {
        return
      }
      radec = [], radec = i.cooFrame == CooFrameEnum.GAL ? CooConversion.GalacticToJ2000([r.ra, r.dec]) : [r.ra, r.dec], i.pointTo(radec[0], radec[1])
    }, o || $(i.reticleCanvas).dblclick(onDblClick), $(i.reticleCanvas).bind("mousedown touchstart", function (e) {
      var o = i.imageCanvas.relMouseCoords(e);
      return e.originalEvent && e.originalEvent.targetTouches ? (i.dragx = e.originalEvent.targetTouches[0].clientX, i.dragy = e.originalEvent.targetTouches[0].clientY) : (i.dragx = o.x, i.dragy = o.y), i.dragging = !0, i.mode == t.PAN ? i.setCursor("move") : i.mode == t.SELECT && (i.selectStartCoo = {
        x: i.dragx,
        y: i.dragy
      }), !1
    }), $(i.reticleCanvas).bind("mouseup mouseout touchend", function (e) {
      i.mode == t.SELECT && i.dragging && i.aladin.fire("selectend", i.getObjectsInBBox(i.selectStartCoo.x, i.selectStartCoo.y, i.dragx - i.selectStartCoo.x, i.dragy - i.selectStartCoo.y)), i.dragging && (i.setCursor("default"), i.dragging = !1), i.mustClearCatalog = !0, i.mustRedrawReticle = !0, i.dragx = i.dragy = null;
      var o = i.imageCanvas.relMouseCoords(e),
        r = i.closestObjects(o.x, o.y, 5);
      if (r) {
        var s = r[0];
        s.marker ? (i.popup.setTitle(s.popupTitle), i.popup.setText(s.popupDesc), i.popup.setSource(s), i.popup.show()) : i.aladin.objClickedFunction && i.aladin.objClickedFunction(s)
      }
      "mouseout" !== e.type && i.refreshProgressiveCats(), i.requestRedraw()
    }), $(i.reticleCanvas).bind("mousemove touchmove", function (r) {
      r.preventDefault();
      var s = i.imageCanvas.relMouseCoords(r);
      if (!i.dragging || o) {
        if (e(i, s.x, s.y, !0), !i.dragging && !i.mode == t.SELECT) {
          var a = i.closestObjects(s.x, s.y, 5);
          a ? (i.setCursor("pointer"), i.aladin.objHoveredFunction && i.aladin.objHoveredFunction(a[0])) : i.setCursor("default")
        }
        if (!o) return
      }
      var n, h, l, c;
      if (r.originalEvent && r.originalEvent.targetTouches) {
        n = r.originalEvent.targetTouches[0].clientX - i.dragx, h = r.originalEvent.targetTouches[0].clientY - i.dragy;
        var u = AladinUtils.viewToXy(r.originalEvent.targetTouches[0].clientX, r.originalEvent.targetTouches[0].clientY, i.width, i.height, i.largestDim, i.zoomFactor),
          d = AladinUtils.viewToXy(i.dragx, i.dragy, i.width, i.height, i.largestDim, i.zoomFactor);
        l = i.projection.unproject(u.x, u.y), c = i.projection.unproject(d.x, d.y)
      } else {
        n = s.x - i.dragx, h = s.y - i.dragy;
        var u = AladinUtils.viewToXy(s.x, s.y, i.width, i.height, i.largestDim, i.zoomFactor),
          d = AladinUtils.viewToXy(i.dragx, i.dragy, i.width, i.height, i.largestDim, i.zoomFactor);
        l = i.projection.unproject(u.x, u.y), c = i.projection.unproject(d.x, d.y)
      }
      return r.originalEvent && r.originalEvent.targetTouches ? (i.dragx = r.originalEvent.targetTouches[0].clientX, i.dragy = r.originalEvent.targetTouches[0].clientY) : (i.dragx = s.x, i.dragy = s.y), i.mode == t.SELECT ? (i.requestRedraw(), void 0) : (i.viewCenter.lon += c.ra - l.ra, i.viewCenter.lat += c.dec - l.dec, i.viewCenter.lat > 90 ? i.viewCenter.lat = 90 : -90 > i.viewCenter.lat && (i.viewCenter.lat = -90), 0 > i.viewCenter.lon ? i.viewCenter.lon = 360 + i.viewCenter.lon : i.viewCenter.lon > 360 && (i.viewCenter.lon = i.viewCenter.lon % 360), i.requestRedraw(), void 0)
    }), $(i.aladinDiv).onselectstart = function () {
      return !1
    }, $(i.reticleCanvas).bind("mousewheel", function (t, e) {
      t.preventDefault(), t.stopPropagation();
      var o = i.zoomLevel;
      return e > 0 ? o += 1 : o -= 1, i.setZoomLevel(o), !1
    })
  }, init = function (t) {
    var e = new Stats;
    e.domElement.style.top = "50px", $("#aladin-statsDiv").length > 0 && $("#aladin-statsDiv")[0].appendChild(e.domElement), t.stats = e, createListeners(t), t.displayHpxGrid = !1, t.displaySurvey = !0, t.displayCatalog = !1, t.displayReticle = !0, t.fov = computeFov(t), updateFovDiv(t), t.redraw()
  }, t.prototype.requestRedrawAtDate = function (t) {
    this.dateRequestDraw = t
  }, t.prototype.redraw = function () {
    var e = this.needRedraw;
    requestAnimFrame(this.redraw.bind(this));
    var i = (new Date).getTime();
    if (this.dateRequestDraw && i > this.dateRequestDraw) this.dateRequestDraw = null;
    else if (!this.needRedraw) {
      if (!this.flagForceRedraw) return;
      this.flagForceRedraw = !1
    }
    this.stats.update();
    var o = this.imageCtx;
    o.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height), this.projectionMethod == ProjectionEnum.SIN && (this.fov > 80 ? (o.fillStyle = "rgb(0,0,0)", o.beginPath(), o.arc(this.cx, this.cy, this.cx * this.zoomFactor, 0, 2 * Math.PI, !0), o.fill()) : 60 > this.fov && (o.fillStyle = "rgb(0,0,0)", o.fillRect(0, 0, this.imageCanvas.width, this.imageCanvas.height))), this.projection ? this.projection.setCenter(this.viewCenter.lon, this.viewCenter.lat) : this.projection = new Projection(this.viewCenter.lon, this.viewCenter.lat), this.projection.setProjection(this.projectionMethod);
    var r = this.getVisibleCells(3),
      s = null;
    this.curNorder >= 3 && (s = 3 == this.curNorder ? r : this.getVisibleCells(this.curNorder)), this.imageSurvey && this.imageSurvey.isReady && this.displaySurvey && (this.imageSurvey.redrawAllsky(o, r, this.fov, this.curNorder), this.curNorder >= 3 && this.imageSurvey.redrawHighres(o, s, this.curNorder)), this.overlayImageSurvey && this.overlayImageSurvey.isReady && (o.globalAlpha = this.overlayImageSurvey.getAlpha(), this.fov > 50 && this.overlayImageSurvey.redrawAllsky(o, r, this.fov, this.curNorder), this.curNorder >= 3 && this.overlayImageSurvey.redrawHighres(o, s, this.curNorder), o.globalAlpha = 1), this.displayHpxGrid && (s && this.curNorder > 3 ? this.healpixGrid.redraw(o, s, this.fov, this.curNorder) : this.healpixGrid.redraw(o, r, this.fov, 3));
    var a = this.catalogCtx,
      n = !1;
    if (this.mustClearCatalog && (a.clearRect(0, 0, this.width, this.height), n = !0, this.mustClearCatalog = !1), this.catalogs && this.catalogs.length > 0 && this.displayCatalog && (!this.dragging || t.DRAW_SOURCES_WHILE_DRAGGING)) {
      n || (a.clearRect(0, 0, this.width, this.height), n = !0);
      for (var h = 0; this.catalogs.length > h; h++) this.catalogs[h].draw(a, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor, this.cooFrame)
    }
    var l = this.catalogCtx;
    if (this.overlays && this.overlays.length > 0 && (!this.dragging || t.DRAW_SOURCES_WHILE_DRAGGING)) {
      n || (a.clearRect(0, 0, this.width, this.height), n = !0);
      for (var h = 0; this.overlays.length > h; h++) this.overlays[h].draw(l, this.projection, this.cooFrame, this.width, this.height, this.largestDim, this.zoomFactor, this.cooFrame)
    }
    this.mode == t.SELECT && (mustRedrawReticle = !0);
    var c = this.reticleCtx;
    if ((this.mustRedrawReticle || this.mode == t.SELECT) && c.clearRect(0, 0, this.width, this.height), this.displayReticle) {
      if (!this.reticleCache) {
        var u = document.createElement("canvas"),
          d = this.options.reticleSize;
        u.width = d, u.height = d;
        var p = u.getContext("2d");
        p.lineWidth = 2, p.strokeStyle = this.options.reticleColor, p.beginPath(), p.moveTo(d / 2, d / 2 + (d / 2 - 1)), p.lineTo(d / 2, d / 2 + 2), p.moveTo(d / 2, d / 2 - (d / 2 - 1)), p.lineTo(d / 2, d / 2 - 2), p.moveTo(d / 2 + (d / 2 - 1), d / 2), p.lineTo(d / 2 + 2, d / 2), p.moveTo(d / 2 - (d / 2 - 1), d / 2), p.lineTo(d / 2 - 2, d / 2), p.stroke(), this.reticleCache = u
      }
      c.drawImage(this.reticleCache, this.width / 2 - this.reticleCache.width / 2, this.height / 2 - this.reticleCache.height / 2), this.mustRedrawReticle = !1
    }
    if (this.mode == t.SELECT && this.dragging) {
      c.fillStyle = "rgba(100, 240, 110, 0.25)";
      var f = this.dragx - this.selectStartCoo.x,
        v = this.dragy - this.selectStartCoo.y;
      c.fillRect(this.selectStartCoo.x, this.selectStartCoo.y, f, v)
    }
    e == this.needRedraw && (this.needRedraw = !1), this.dragging || this.updateObjectsLookup()
  }, t.prototype.forceRedraw = function () {
    this.flagForceRedraw = !0
  }, t.prototype.refreshProgressiveCats = function () {
    if (this.catalogs) for (var t = 0; this.catalogs.length > t; t++)"progressivecat" == this.catalogs[t].type && this.catalogs[t].loadNeededTiles()
  }, t.prototype.getVisibleCells = function (t, e) {
    !e && this.imageSurvey && (e = this.imageSurvey.cooFrame);
    var i, o = [],
      r = [],
      s = new SpatialVector,
      a = Math.pow(2, t),
      n = HealpixIndex.nside2Npix(a),
      h = null;
    if (this.fov > 80) {
      i = [];
      for (var l = 0; n > l; l++) i.push(l)
    } else {
      var c = new HealpixIndex(a);
      c.init();
      var u = new SpatialVector,
        d = AladinUtils.viewToXy(this.cx, this.cy, this.width, this.height, this.largestDim, this.zoomFactor),
        p = this.projection.unproject(d.x, d.y),
        f = [];
      e && e != this.cooFrame ? e == CooFrameEnum.J2000 ? f = CooConversion.GalacticToJ2000([p.ra, p.dec]) : e == CooFrameEnum.GAL && (f = CooConversion.J2000ToGalactic([p.ra, p.dec])) : f = [p.ra, p.dec], u.set(f[0], f[1]);
      var v = .5 * this.fov * this.ratio;
      v *= this.fov > 60 ? 1.6 : this.fov > 12 ? 1.45 : 1.1, i = c.queryDisc(u, v * Math.PI / 180, !0, !0);
      var g = Utils.radecToPolar(f[0], f[1]);
      h = c.ang2pix_nest(g.theta, g.phi), i.unshift(h)
    }
    for (var l, m, y, w = 0, C = i.length; C > w; w++) if (l = i[w], !(l == h && w > 0)) {
      var x = [];
      corners = HealpixCache.corners_nest(l, a);
      for (var S = 0; 4 > S; S++) {
        if (s.setXYZ(corners[S].x, corners[S].y, corners[S].z), e && e != this.cooFrame) {
          if (e == CooFrameEnum.J2000) {
            var p = CooConversion.J2000ToGalactic([s.ra(), s.dec()]);
            m = p[0], y = p[1]
          } else if (e == CooFrameEnum.GAL) {
            var p = CooConversion.GalacticToJ2000([s.ra(), s.dec()]);
            m = p[0], y = p[1]
          }
        } else m = s.ra(), y = s.dec();
        r[S] = this.projection.project(m, y)
      }
      if (null != r[0] && null != r[1] && null != r[2] && null != r[3]) {
        for (var S = 0; 4 > S; S++) x[S] = AladinUtils.xyToView(r[S].X, r[S].Y, this.width, this.height, this.largestDim, this.zoomFactor);
        if (!(0 > x[0].vx && 0 > x[1].vx && 0 > x[2].vx && 0 > x[3].vx || 0 > x[0].vy && 0 > x[1].vy && 0 > x[2].vy && 0 > x[3].vy || x[0].vx >= this.width && x[1].vx >= this.width && x[2].vx >= this.width && x[3].vx >= this.width || x[0].vy >= this.height && x[1].vy >= this.height && x[2].vy >= this.height && x[3].vy >= this.height)) {
          if (this.projection.PROJECTION == ProjectionEnum.AITOFF) {
            var M = x[0].vx - x[2].vx,
              b = x[0].vy - x[2].vy,
              T = Math.sqrt(M * M + b * b);
            if (T > this.largestDim / 5) continue;
            if (M = x[1].vx - x[3].vx, b = x[1].vy - x[3].vy, T = Math.sqrt(M * M + b * b), T > this.largestDim / 5) continue
          }
          x.ipix = l, o.push(x)
        }
      }
    }
    return o
  }, t.prototype.getPositionsInView = function (t, e) {
    for (var i, o, r = [], s = new SpatialVector, a = Math.pow(2, e), n = [], h = HealpixCache.corners_nest(t, a), l = 0; 4 > l; l++) {
      if (s.setXYZ(h[l].x, h[l].y, h[l].z), this.imageSurvey && this.imageSurvey.cooFrame != this.cooFrame) {
        if (this.imageSurvey.cooFrame == CooFrameEnum.J2000) {
          var c = CooConversion.J2000ToGalactic([s.ra(), s.dec()]);
          i = c[0], o = c[1]
        } else if (this.imageSurvey.cooFrame == CooFrameEnum.GAL) {
          var c = CooConversion.GalacticToJ2000([s.ra(), s.dec()]);
          i = c[0], o = c[1]
        }
      } else i = s.ra(), o = s.dec();
      r[l] = this.projection.project(i, o)
    }
    if (null == r[0] || null == r[1] || null == r[2] || null == r[3]) return null;
    for (var l = 0; 4 > l; l++) n[l] = AladinUtils.xyToView(r[l].X, r[l].Y, this.width, this.height, this.largestDim, this.zoomFactor);
    return n
  }, t.prototype.computeZoomFactor = function (t) {
    return t > 0 ? AladinUtils.getZoomFactorForAngle(180 / Math.pow(1.15, t), this.projectionMethod) : 1 + .1 * t
  }, t.prototype.setZoom = function (t) {
    if (!(0 > t || t > 180)) {
      var e = Math.log(180 / t) / Math.log(1.15);
      this.setZoomLevel(e)
    }
  }, t.prototype.setZoomLevel = function (t) {
    if (this.minFOV || this.maxFOV) {
      var e = doComputeFov(this, this.computeZoomFactor(Math.max(-2, t)));
      if (this.maxFOV && e > this.maxFOV || this.minFOV && this.minFOV > e) return
    }
    if (this.zoomLevel = this.projectionMethod == ProjectionEnum.SIN ? Math.max(-2, t) : Math.max(-7, t), this.zoomFactor = this.computeZoomFactor(this.zoomLevel), this.fov = computeFov(this), updateFovDiv(this), this.computeNorder(), this.forceRedraw(), this.requestRedraw(), !this.debounceProgCatOnZoom) {
      var i = this;
      this.debounceProgCatOnZoom = Utils.debounce(function () {
        i.refreshProgressiveCats()
      }, 300)
    }
    this.debounceProgCatOnZoom()
  }, t.prototype.computeNorder = function () {
    var t = this.fov / this.largestDim,
      e = 512,
      i = HealpixIndex.calculateNSide(3600 * e * t),
      o = Math.log(i) / Math.log(2);
    o = Math.max(o, 1), this.realNorder = o, 50 >= this.fov && 2 >= o && (o = 3), this.imageSurvey && 2 >= o && this.imageSurvey.minOrder > 2 && (o = this.imageSurvey.minOrder), this.imageSurvey && o > this.imageSurvey.maxOrder && (o = this.imageSurvey.maxOrder), o > HealpixIndex.ORDER_MAX && (o = HealpixIndex.ORDER_MAX), this.curNorder = o
  }, t.prototype.untaintCanvases = function () {
    this.createCanvases(), createListeners(this), this.fixLayoutDimensions()
  }, t.prototype.setOverlayImageSurvey = function (t, e) {
    if (!t) return this.overlayImageSurvey = null, this.requestRedraw(), void 0;
    $.support.cors && this.overlayImageSurvey && !this.overlayImageSurvey.useCors && this.untaintCanvases();
    var i;
    "string" == typeof t ? (i = HpxImageSurvey.getSurveyFromId(t), i || (i = HpxImageSurvey.getSurveyFromId(HpxImageSurvey.DEFAULT_SURVEY_ID))) : i = t, i.isReady = !1, this.overlayImageSurvey = i;
    var o = this;
    i.init(this, function () {
      o.computeNorder(), i.isReady = !0, o.requestRedraw(), o.updateObjectsLookup(), e && e()
    })
  }, t.prototype.setImageSurvey = function (t, e) {
    if (t) {
      $.support.cors && this.imageSurvey && !this.imageSurvey.useCors && this.untaintCanvases();
      var i;
      "string" == typeof t ? (i = HpxImageSurvey.getSurveyFromId(t), i || (i = HpxImageSurvey.getSurveyFromId(HpxImageSurvey.DEFAULT_SURVEY_ID))) : i = t, i.isReady = !1, this.imageSurvey = i;
      var o = this;
      i.init(this, function () {
        o.computeNorder(), i.isReady = !0, o.requestRedraw(), o.updateObjectsLookup(), e && e()
      })
    }
  }, t.prototype.requestRedraw = function () {
    this.needRedraw = !0
  }, t.prototype.changeProjection = function (t) {
    this.projectionMethod = t, this.requestRedraw()
  }, t.prototype.changeFrame = function (t) {
    if (this.cooFrame = t, this.cooFrame == CooFrameEnum.GAL) {
      var e = CooConversion.J2000ToGalactic([this.viewCenter.lon, this.viewCenter.lat]);
      this.viewCenter.lon = e[0], this.viewCenter.lat = e[1]
    } else if (this.cooFrame == CooFrameEnum.J2000) {
      var i = CooConversion.GalacticToJ2000([this.viewCenter.lon, this.viewCenter.lat]);
      this.viewCenter.lon = i[0], this.viewCenter.lat = i[1]
    }
    this.requestRedraw()
  }, t.prototype.showHealpixGrid = function (t) {
    this.displayHpxGrid = t, this.requestRedraw()
  }, t.prototype.showSurvey = function (t) {
    this.displaySurvey = t, this.requestRedraw()
  }, t.prototype.showCatalog = function (t) {
    this.displayCatalog = t, this.displayCatalog || (this.mustClearCatalog = !0), this.requestRedraw()
  }, t.prototype.showReticle = function (t) {
    this.displayReticle = t, this.mustRedrawReticle = !0, this.requestRedraw()
  }, t.prototype.pointTo = function (t, e) {
    if (t = parseFloat(t), e = parseFloat(e), !isNaN(t) && !isNaN(e)) {
      if (this.cooFrame == CooFrameEnum.J2000) this.viewCenter.lon = t, this.viewCenter.lat = e;
      else if (this.cooFrame == CooFrameEnum.GAL) {
        var i = CooConversion.J2000ToGalactic([t, e]);
        this.viewCenter.lon = i[0], this.viewCenter.lat = i[1]
      }
      this.forceRedraw(), this.requestRedraw();
      var o = this;
      setTimeout(function () {
        o.refreshProgressiveCats()
      }, 1e3)
    }
  }, t.prototype.makeUniqLayerName = function (t) {
    if (!this.layerNameExists(t)) return t;
    for (var e = 1;; ++e) {
      var i = t + "_" + e;
      if (!this.layerNameExists(i)) return i
    }
  }, t.prototype.layerNameExists = function (t) {
    for (var e = this.catalogs, i = 0; e.length > i; i++) if (t == e[i].name) return !0;
    return !1
  }, t.prototype.removeLayers = function () {
    this.catalogs = [], this.overlays = [], this.requestRedraw()
  }, t.prototype.addCatalog = function (t) {
    t.name = this.makeUniqLayerName(t.name), this.catalogs.push(t), "catalog" == t.type ? t.setView(this) : "progressivecat" == t.type && t.init(this)
  }, t.prototype.addOverlay = function (t) {
    this.overlays.push(t), t.setView(this)
  }, t.prototype.getObjectsInBBox = function (t, e, i, o) {
    0 > i && (t += i, i = -i), 0 > o && (e += o, o = -o);
    var r, s, a, n = [];
    if (this.catalogs) for (var h = 0; this.catalogs.length > h; h++) if (r = this.catalogs[h], r.isShowing) {
      s = r.getSources();
      for (var l = 0; s.length > l; l++) a = s[l], a.isShowing && a.x && a.y && a.x >= t && t + i >= a.x && a.y >= e && e + o >= a.y && n.push(a)
    }
    return n
  }, t.prototype.updateObjectsLookup = function () {
    this.objLookup = [];
    var t, e, i, o, r;
    if (this.catalogs) for (var s = 0; this.catalogs.length > s; s++) if (t = this.catalogs[s], t.isShowing) {
      e = t.getSources();
      for (var a = 0; e.length > a; a++) i = e[a], i.isShowing && i.x && i.y && (o = i.x, r = i.y, this.objLookup[o] || (this.objLookup[o] = []), this.objLookup[o][r] || (this.objLookup[o][r] = []), this.objLookup[o][r].push(i))
    }
  }, t.prototype.closestObjects = function (t, e, i) {
    if (!this.objLookup) return null;
    for (var o, r, s = 0; i >= s; s++) {
      o = r = null;
      for (var a = -i; i >= a; a++) if (this.objLookup[t + a]) for (var n = -i; i >= n; n++) if (this.objLookup[t + a][e + n]) if (o) {
        var h = a * a + n * n;
        r > h && (r = h, o = this.objLookup[t + a][e + n])
      } else o = this.objLookup[t + a][e + n];
      if (o) return o
    }
    return null
  }, t
}(), /** @license CDS - Centre de DonnÃ©es astronomiques de Strasbourg , 2013*/
Aladin = function () {
  var t = function (e, i) {
      HealpixCache.init();
      var o = this;
      if ($.ajax({
        url: "http://aladin.u-strasbg.fr/java/nph-aladin.pl",
        data: {
          frame: "aladinLiteDic"
        },
        method: "GET",
        dataType: "jsonp",
        success: function (t) {
          for (var e = {}, i = 0; t.length > i; i++) e[t[i].id] = !0;
          for (var i = 0; HpxImageSurvey.SURVEYS.length > i; i++) e[HpxImageSurvey.SURVEYS[i].id] || t.push(HpxImageSurvey.SURVEYS[i]);
          HpxImageSurvey.SURVEYS = t
        },
        error: function () {}
      }), void 0 === i && (i = this.getOptionsFromQueryString()), i = i || {}, "zoom" in i) {
        var r = i.zoom;
        delete i.zoom, i.fov = r
      }
      var s = {};
      for (var a in t.DEFAULT_OPTIONS) s[a] = void 0 !== i[a] ? i[a] : t.DEFAULT_OPTIONS[a];
      for (var a in i) void 0 === t.DEFAULT_OPTIONS[a] && (s[a] = i[a]);
      this.options = s, this.aladinDiv = e, $(e).addClass("aladin-container");
      var n = CooFrameEnum.fromString(s.cooFrame, CooFrameEnum.J2000),
        h = n == CooFrameEnum.J2000,
        l = $('<div class="aladin-location">' + (s.showFrame ? '<select class="aladin-frameChoice"><option ' + (h ? 'selected="selected"' : "") + ">J2000</option><option " + (h ? "" : 'selected="selected"') + ">GAL</option></select>" : "") + '<span class="aladin-location-text"></span></div>').appendTo(e),
        c = $('<div class="aladin-fov"></div>').appendTo(e);
      s.showZoomControl && $('<div class="aladin-zoomControl"><a href="#" class="zoomPlus" title="Zoom in">+</a><a href="#" class="zoomMinus" title="Zoom out">&ndash;</a></div>').appendTo(e), s.showFullscreenControl && $('<div class="aladin-fullscreenControl aladin-maximize" title="Full screen"></div>').appendTo(e), this.fullScreenBtn = $(e).find(".aladin-fullscreenControl"), this.fullScreenBtn.click(function () {
        o.toggleFullscreen()
      }), $("<div class='aladin-logo-container'><a href='http://aladin.u-strasbg.fr/AladinLite/' title='Powered by Aladin Lite' target='_blank'><div class='aladin-logo'></div></a></div>").appendTo(e), this.boxes = [];
      var u = new Location(l.find(".aladin-location-text"));
      if (this.view = new View(this, u, c, n, s.fov), s.showLayersControl) {
        var d = $('<div class="aladin-layersControl-container" title="Manage layers"><div class="aladin-layersControl"></div></div>');
        d.appendTo(e);
        var p = $('<div class="aladin-box aladin-layerBox aladin-cb-list"></div>');
        p.appendTo(e), this.boxes.push(p), d.click(function () {
          return o.hideBoxes(), o.showLayerBox(), !1
        })
      }
      if (s.showGotoControl) {
        var d = $('<div class="aladin-gotoControl-container" title="Go to position"><div class="aladin-gotoControl"></div></div>');
        d.appendTo(e);
        var f = $('<div class="aladin-box aladin-gotoBox"><a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div><form class="aladin-target-form">Go to: <input type="text" placeholder="Object name/position" /></form></div>');
        f.appendTo(e), this.boxes.push(f);
        var v = f.find(".aladin-target-form input");
        v.on("paste keydown", function () {
          $(this).removeClass("aladin-unknownObject")
        }), d.click(function () {
          return o.hideBoxes(), v.val(""), v.removeClass("aladin-unknownObject"), f.show(), v.focus(), !1
        }), f.find(".aladin-closeBtn").click(function () {
          return o.hideBoxes(), !1
        })
      }
      if (s.showShareControl) {
        var d = $('<div class="aladin-shareControl-container" title="Share current view"><div class="aladin-shareControl"></div></div>');
        d.appendTo(e);
        var g = $('<div class="aladin-box aladin-shareBox"><a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div><b>Share</b><input type="text" class="aladin-shareInput" /></div>');
        g.appendTo(e), this.boxes.push(g), d.click(function () {
          return o.hideBoxes(), g.show(), !1
        }), g.find(".aladin-closeBtn").click(function () {
          return o.hideBoxes(), !1
        })
      }
      if (this.gotoObject(s.target), s.log) {
        var m = i;
        m.version = t.VERSION, Logger.log("startup", m)
      }
      if (this.showReticle(s.showReticle), s.catalogUrls) for (var y = 0, w = s.catalogUrls.length; w > y; y++) this.createCatalogFromVOTable(s.catalogUrls[y]);
      this.setImageSurvey(s.survey), this.view.showCatalog(s.showCatalog);
      var C = this;
      $(e).find(".aladin-frameChoice").change(function () {
        C.setFrame($(this).val())
      }), $("#projectionChoice").change(function () {
        C.setProjection($(this).val())
      }), $(e).find(".aladin-target-form").submit(function () {
        return C.gotoObject($(this).find("input").val(), function () {
          $(e).find(".aladin-target-form input").addClass("aladin-unknownObject")
        }), !1
      });
      var x = $(e).find(".zoomPlus");
      x.click(function () {
        return C.increaseZoom(), !1
      }), x.bind("mousedown", function (t) {
        t.preventDefault()
      });
      var S = $(e).find(".zoomMinus");
      S.click(function () {
        return C.decreaseZoom(), !1
      }), S.bind("mousedown", function (t) {
        t.preventDefault()
      }), s.fullScreen && window.setTimeout(function () {
        o.toggleFullscreen()
      }, 1e3)
    };
  return t.VERSION = "2014-09-03", t.JSONP_PROXY = "http://alasky.u-strasbg.fr/cgi/JSONProxy", t.DEFAULT_OPTIONS = {
    target: "0 +0",
    cooFrame: "J2000",
    survey: "P/DSS2/color",
    fov: 60,
    showReticle: !0,
    showZoomControl: !0,
    showFullscreenControl: !0,
    showLayersControl: !0,
    showGotoControl: !0,
    showShareControl: !1,
    showCatalog: !0,
    showFrame: !0,
    fullScreen: !1,
    reticleColor: "rgb(178, 50, 178)",
    reticleSize: 22,
    log: !0
  }, t.prototype.toggleFullscreen = function () {
    this.fullScreenBtn.toggleClass("aladin-maximize aladin-restore");
    var t = this.fullScreenBtn.hasClass("aladin-restore");
    this.fullScreenBtn.attr("title", t ? "Restore original size" : "Full screen"), $(this.aladinDiv).toggleClass("aladin-fullscreen"), this.view.fixLayoutDimensions()
  }, t.prototype.updateSurveysDropdownList = function (t) {
    t = t.sort(function (t, e) {
      return t.order ? t.order && t.order > e.order ? 1 : -1 : t.id > e.id
    });
    var e = $(this.aladinDiv).find(".aladin-surveySelection");
    e.empty();
    for (var i = 0; t.length > i; i++) {
      var o = this.view.imageSurvey.id == t[i].id;
      e.append($("<option />").attr("selected", o).val(t[i].id).text(t[i].name))
    }
  }, t.prototype.getOptionsFromQueryString = function () {
    var t = {},
      e = $.urlParam("target");
    e && (t.target = e);
    var i = $.urlParam("frame");
    i && CooFrameEnum[i] && (t.frame = i);
    var o = $.urlParam("survey");
    o && HpxImageSurvey.getSurveyInfoFromId(o) && (t.survey = o);
    var r = $.urlParam("zoom");
    r && r > 0 && 180 > r && (t.zoom = r);
    var s = $.urlParam("showReticle");
    s && (t.showReticle = "true" == s.toLowerCase());
    var a = $.urlParam("cooFrame");
    a && (t.cooFrame = a);
    var n = $.urlParam("fullScreen");
    return void 0 !== n && (t.fullScreen = n), t
  }, t.prototype.setZoom = function (t) {
    this.view.setZoom(t)
  }, t.prototype.setFoV = function (t) {
    this.view.setZoom(t)
  }, t.prototype.setFrame = function (t) {
    t && (t = t.toLowerCase(), 0 == t.indexOf("j2000") ? this.view.changeFrame(CooFrameEnum.J2000) : 0 == t.indexOf("gal") && this.view.changeFrame(CooFrameEnum.GAL))
  }, t.prototype.setProjection = function (t) {
    if (t) switch (t = t.toLowerCase()) {
    case "aitoff":
      this.view.changeProjection(ProjectionEnum.AITOFF);
      break;
    case "sinus":
    default:
      this.view.changeProjection(ProjectionEnum.SIN)
    }
  }, t.prototype.gotoObject = function (t, e) {
    var i = /[a-zA-Z]/.test(t);
    if (i) {
      var o = this;
      Sesame.resolve(t, function (t) {
        var e = t.Target.Resolver.jradeg,
          i = t.Target.Resolver.jdedeg;
        o.view.pointTo(e, i)
      }, function (i) {
        console && (console.log("Could not resolve object name " + t), console.log(i)), e && e()
      })
    } else {
      var r = new Coo;
      r.parse(t);
      var s = [r.lon, r.lat];
      this.view.cooFrame == CooFrameEnum.GAL && (s = CooConversion.GalacticToJ2000(s)), this.view.pointTo(s[0], s[1])
    }
  }, t.prototype.gotoPosition = function (t, e) {
    var i;
    i = this.view.cooFrame == CooFrameEnum.GAL ? CooConversion.GalacticToJ2000([t, e]) : [t, e], this.view.pointTo(i[0], i[1])
  }, t.prototype.gotoRaDec = function (t, e) {
    this.view.pointTo(t, e)
  }, t.prototype.showHealpixGrid = function (t) {
    this.view.showHealpixGrid(t)
  }, t.prototype.showSurvey = function (t) {
    this.view.showSurvey(t)
  }, t.prototype.showCatalog = function (t) {
    this.view.showCatalog(t)
  }, t.prototype.showReticle = function (t) {
    this.view.showReticle(t), $("#displayReticle").attr("checked", t)
  }, t.prototype.removeLayers = function () {
    this.view.removeLayers()
  }, t.prototype.addCatalog = function (t) {
    this.view.addCatalog(t)
  }, t.prototype.addOverlay = function (t) {
    this.view.addOverlay(t)
  }, t.prototype.createImageSurvey = function (t, e, i, o, r, s) {
    return new HpxImageSurvey(t, e, i, o, r, s)
  }, t.prototype.getBaseImageLayer = function () {
    return this.view.imageSurvey
  }, t.prototype.setImageSurvey = function (t, e) {
    if (this.view.setImageSurvey(t, e), this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys()), this.options.log) {
      var i = t;
      "string" != typeof t && (i = t.rootUrl), Logger.log("changeImageSurvey", i)
    }
  }, t.prototype.setBaseImageLayer = t.prototype.setImageSurvey, t.prototype.getOverlayImageLayer = function () {
    return this.view.overlayImageSurvey
  }, t.prototype.setOverlayImageLayer = function (t, e) {
    this.view.setOverlayImageSurvey(t, e)
  }, t.prototype.increaseZoom = function (t) {
    t || (t = 5), this.view.setZoomLevel(this.view.zoomLevel + t)
  }, t.prototype.decreaseZoom = function (t) {
    t || (t = 5), this.view.setZoomLevel(this.view.zoomLevel - t)
  }, t.prototype.createCatalog = function (t) {
    return new cds.Catalog(t)
  }, t.prototype.createProgressiveCatalog = function (t, e, i, o) {
    return new ProgressiveCat(t, e, i, o)
  }, t.prototype.createSource = function (t, e, i) {
    return new cds.Source(t, e, i)
  }, t.prototype.createMarker = function (t, e, i, o) {
    return i = i || {}, i.marker = !0, new cds.Source(t, e, o, i)
  }, t.prototype.createOverlay = function (t) {
    return new Overlay(t)
  }, t.prototype.createFootprintsFromSTCS = function (t) {
    for (var e = Overlay.parseSTCS(t), i = [], o = 0, r = e.length; r > o; o++) i.push(new Footprint(e[o]));
    return i
  }, t.prototype.createCatalogFromVOTable = function (t, e) {
    var i = this,
      o = i.createCatalog(e);
    return cds.Catalog.parseVOTable(t, function (t) {
      o.addSources(t)
    }), o
  }, t.prototype.on = function (t, e) {
    "select" === t ? this.selectFunction = e : "objectClicked" == t ? this.objClickedFunction = e : "objectHovered" == t && (this.objHoveredFunction = e)
  }, t.prototype.select = function () {
    this.fire("selectstart")
  }, t.prototype.fire = function (t, e) {
    "selectstart" === t ? this.view.setMode(View.SELECT) : "selectend" === t && (this.view.setMode(View.PAN), this.selectFunction && this.selectFunction(e))
  }, t.prototype.hideBoxes = function () {
    if (this.boxes) for (var t = 0; this.boxes.length > t; t++) this.boxes[t].hide()
  }, t.prototype.updateCM = function () {}, t.prototype.showLayerBox = function () {
    var t = this,
      e = $(this.aladinDiv).find(".aladin-layerBox");
    e.empty(), e.append('<a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div><div class="aladin-label">Base image layer</div><select class="aladin-surveySelection"></select><div class="aladin-cmap">Color map:<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div></div><div class="aladin-box-separator"></div><div class="aladin-label">Overlay layers</div>');
    for (var i = e.find(".aladin-cmap"), o = e.find(".aladin-cmSelection"), r = 0; ColorMap.MAPS_NAMES.length > r; r++) o.append($("<option />").text(ColorMap.MAPS_NAMES[r]));
    o.val(t.getBaseImageLayer().getColorMap().map);
    for (var s = this.view.catalogs, a = "<ul>", r = s.length - 1; r >= 0; r--) {
      var n = s[r].name,
        h = "";
      s[r].isShowing && (h = 'checked="checked"');
      var l = s[r].getSources().length,
        c = l + " source" + (l > 1 ? "s" : "");
      a += '<li><div class="aladin-layerIcon" style="background: ' + s[r].color + ';"></div><input type="checkbox" ' + h + ' id="aladin_lite_' + n + '"></input><label for="aladin_lite_' + n + '" title="' + c + '">' + n + "</label></li>"
    }
    a += "</ul>", e.append(a), e.append('<div class="aladin-blank-separator"></div>');
    var h = "";
    this.view.displayReticle && (h = 'checked="checked"');
    var u = $('<input type="checkbox" ' + h + ' id="displayReticle" />');
    e.append(u).append('<label for="displayReticle">Reticle</label><br/>'), u.change(function () {
      t.showReticle($(this).is(":checked"))
    }), h = "", this.view.displayHpxGrid && (h = 'checked="checked"');
    var d = $('<input type="checkbox" ' + h + ' id="displayHpxGrid"/>');
    e.append(d).append('<label for="displayHpxGrid">HEALPix grid</label><br/>'), d.change(function () {
      t.showHealpixGrid($(this).is(":checked"))
    }), e.append('<div class="aladin-box-separator"></div><div class="aladin-label">Tools</div>');
    var p = $('<button class="aladin-btn" type="button">Export view as PNG</button>');
    e.append(p), p.click(function () {
      t.exportAsPNG()
    }), e.find(".aladin-closeBtn").click(function () {
      return t.hideBoxes(), !1
    }), this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys());
    var f = $(this.aladinDiv).find(".aladin-surveySelection");
    f.change(function () {
      var e = HpxImageSurvey.getAvailableSurveys()[$(this)[0].selectedIndex];
      t.setImageSurvey(e.id, function () {
        var e = t.getBaseImageLayer();
        e.useCors ? (o.val(e.getColorMap().map), i.show(), p.show()) : (i.hide(), p.hide())
      })
    }), i.find(".aladin-cmSelection").change(function () {
      var e = $(this).find(":selected").val();
      t.getBaseImageLayer().getColorMap().update(e)
    }), i.find(".aladin-reverseCm").click(function () {
      t.getBaseImageLayer().getColorMap().reverse()
    }), this.getBaseImageLayer().useCors ? (i.show(), p.show()) : (i.hide(), p.hide()), e.find(".aladin-reverseCm").parent().attr("disabled", !0), $(this.aladinDiv).find(".aladin-layerBox ul input").change(function () {
      var e = $(this).attr("id").substr(12),
        i = t.layerByName(e);
      $(this).is(":checked") ? i.show() : i.hide()
    }), e.show()
  }, t.prototype.layerByName = function (t) {
    for (var e = this.view.catalogs, i = 0; this.view.catalogs.length > i; i++) if (t == e[i].name) return e[i];
    return null
  }, t.prototype.exportAsPNG = function () {
    var t = this.view.getCanvasDataURL();
    window.open(t, "Aladin Lite snapshot")
  }, t.prototype.setFOVRange = function (t, e) {
    if (t > e) {
      var i = t;
      t = e, e = i
    }
    this.view.minFOV = t, this.view.maxFOV = e
  }, t.prototype.pix2world = function (t, e) {
    var i, o = AladinUtils.viewToXy(t, e, this.view.width, this.view.height, this.view.largestDim, this.view.zoomFactor),
      r = this.view.projection.unproject(o.x, o.y);
    return i = this.view.cooFrame == CooFrameEnum.GAL ? CooConversion.GalacticToJ2000([r.ra, r.dec]) : [r.ra, r.dec]
  }, t.prototype.world2pix = function (t, e) {
    var i;
    if (this.view.cooFrame == CooFrameEnum.GAL) {
      var o = CooConversion.J2000ToGalactic([t, e]);
      i = this.view.projection.project(o[0], o[1])
    } else i = this.view.projection.project(t, e);
    if (i) {
      var r = AladinUtils.xyToView(i.X, i.Y, this.view.width, this.view.height, this.view.largestDim, this.view.zoomFactor);
      return [r.vx, r.vy]
    }
    return null
  }, t.prototype.getFovCorners = function (t) {
    (!t || 1 > t) && (t = 1);
    for (var e, i, o, r, s = [], a = 0; 4 > a; a++) {
      e = 0 == a || 3 == a ? 0 : this.view.width - 1, i = 2 > a ? 0 : this.view.height - 1, o = 2 > a ? this.view.width - 1 : 0, r = 1 == a || 2 == a ? this.view.height - 1 : 0;
      for (var n = 0; t > n; n++) s.push(this.pix2world(e + n / t * (o - e), i + n / t * (r - i)))
    }
    return s
  }, t.prototype.getFov = function () {
    var t = this.view.fov,
      e = this.getSize(),
      i = e[1] / e[0] * t;
    return t = Math.min(t, 180), i = Math.min(i, 180), [t, i]
  }, t.prototype.getSize = function () {
    return [this.view.width, this.view.height]
  }, t.prototype.getParentDiv = function () {
    return $(this.aladinDiv)
  }, t
}(), A.aladin = function (t, e) {
  return new Aladin($(t)[0], e)
}, A.imageLayer = function (t, e, i, o) {
  return new HpxImageSurvey(t, e, i, null, null, o)
}, A.source = function (t, e, i) {
  return new cds.Source(t, e, i)
}, A.polygon = function (t) {
  var e = t.length;
  return e > 0 && (t[0][0] != t[e - 1][0] || t[0][1] != t[e - 1][1]) && t.push([t[0][0], t[0][1]]), new Footprint(t)
}, A.graphicOverlay = function (t) {
  return new Overlay(t)
}, $ && ($.aladin = A.aladin);
