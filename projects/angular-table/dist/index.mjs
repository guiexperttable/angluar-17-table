/**
 * @license Angular v17.1.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
function jy(t, e) {
  return Object.is(t, e);
}
let Ie = null, ws = !1, al = 1;
const Kt = /* @__PURE__ */ Symbol("SIGNAL");
function De(t) {
  const e = Ie;
  return Ie = t, e;
}
function B0() {
  return Ie;
}
function j0() {
  return ws;
}
const yc = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function _f(t) {
  if (ws)
    throw new Error(typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : "");
  if (Ie === null)
    return;
  Ie.consumerOnSignalRead(t);
  const e = Ie.nextProducerIndex++;
  if (ri(Ie), e < Ie.producerNode.length && Ie.producerNode[e] !== t && Ws(Ie)) {
    const n = Ie.producerNode[e];
    vc(n, Ie.producerIndexOfThis[e]);
  }
  Ie.producerNode[e] !== t && (Ie.producerNode[e] = t, Ie.producerIndexOfThis[e] = Ws(Ie) ? zy(t, Ie, e) : 0), Ie.producerLastReadVersion[e] = t.version;
}
function H0() {
  al++;
}
function Hy(t) {
  if (!(Ws(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === al)) {
    if (!t.producerMustRecompute(t) && !Of(t)) {
      t.dirty = !1, t.lastCleanEpoch = al;
      return;
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = al;
  }
}
function Vy(t) {
  if (t.liveConsumerNode === void 0)
    return;
  const e = ws;
  ws = !0;
  try {
    for (const n of t.liveConsumerNode)
      n.dirty || Gy(n);
  } finally {
    ws = e;
  }
}
function Uy() {
  return (Ie == null ? void 0 : Ie.consumerAllowSignalWrites) !== !1;
}
function Gy(t) {
  var e;
  t.dirty = !0, Vy(t), (e = t.consumerMarkedDirty) == null || e.call(t, t);
}
function Tf(t) {
  return t && (t.nextProducerIndex = 0), De(t);
}
function xf(t, e) {
  if (De(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (Ws(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        vc(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
  }
}
function Of(t) {
  ri(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    const n = t.producerNode[e], o = t.producerLastReadVersion[e];
    if (o !== n.version || (Hy(n), o !== n.version))
      return !0;
  }
  return !1;
}
function Wy(t) {
  if (ri(t), Ws(t))
    for (let e = 0; e < t.producerNode.length; e++)
      vc(t.producerNode[e], t.producerIndexOfThis[e]);
  t.producerNode.length = t.producerLastReadVersion.length = t.producerIndexOfThis.length = 0, t.liveConsumerNode && (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function zy(t, e, n) {
  if (qy(t), ri(t), t.liveConsumerNode.length === 0)
    for (let o = 0; o < t.producerNode.length; o++)
      t.producerIndexOfThis[o] = zy(t.producerNode[o], t, o);
  return t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1;
}
function vc(t, e) {
  if (qy(t), ri(t), typeof ngDevMode < "u" && ngDevMode && e >= t.liveConsumerNode.length)
    throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);
  if (t.liveConsumerNode.length === 1)
    for (let o = 0; o < t.producerNode.length; o++)
      vc(t.producerNode[o], t.producerIndexOfThis[o]);
  const n = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[n], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[n], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    const o = t.liveConsumerIndexOfThis[e], r = t.liveConsumerNode[e];
    ri(r), r.producerIndexOfThis[o] = e;
  }
}
function Ws(t) {
  var e;
  return t.consumerIsAlwaysLive || (((e = t == null ? void 0 : t.liveConsumerNode) == null ? void 0 : e.length) ?? 0) > 0;
}
function ri(t) {
  t.producerNode ?? (t.producerNode = []), t.producerIndexOfThis ?? (t.producerIndexOfThis = []), t.producerLastReadVersion ?? (t.producerLastReadVersion = []);
}
function qy(t) {
  t.liveConsumerNode ?? (t.liveConsumerNode = []), t.liveConsumerIndexOfThis ?? (t.liveConsumerIndexOfThis = []);
}
function V0(t) {
  const e = Object.create(U0);
  e.computation = t;
  const n = () => {
    if (Hy(e), _f(e), e.value === ll)
      throw e.error;
    return e.value;
  };
  return n[Kt] = e, n;
}
const Mu = /* @__PURE__ */ Symbol("UNSET"), Au = /* @__PURE__ */ Symbol("COMPUTING"), ll = /* @__PURE__ */ Symbol("ERRORED"), U0 = {
  ...yc,
  value: Mu,
  dirty: !0,
  error: null,
  equal: jy,
  producerMustRecompute(t) {
    return t.value === Mu || t.value === Au;
  },
  producerRecomputeValue(t) {
    if (t.value === Au)
      throw new Error("Detected cycle in computations.");
    const e = t.value;
    t.value = Au;
    const n = Tf(t);
    let o;
    try {
      o = t.computation();
    } catch (r) {
      o = ll, t.error = r;
    } finally {
      xf(t, n);
    }
    if (e !== Mu && e !== ll && o !== ll && t.equal(e, o)) {
      t.value = e;
      return;
    }
    t.value = o, t.version++;
  }
};
function G0() {
  throw new Error();
}
let Yy = G0;
function Zy() {
  Yy();
}
function W0(t) {
  Yy = t;
}
function z0(t) {
  const e = Object.create(Qy);
  e.value = t;
  const n = () => (_f(e), e.value);
  return n[Kt] = e, n;
}
function Ff(t, e) {
  Uy() || Zy(), t.equal(t.value, e) || (t.value = e, Y0(t));
}
function q0(t, e) {
  Uy() || Zy(), Ff(t, e(t.value));
}
const Qy = {
  ...yc,
  equal: jy,
  value: void 0
};
function Y0(t) {
  t.version++, H0(), Vy(t);
}
function Z0(t, e, n) {
  const o = Object.create(Q0);
  n && (o.consumerAllowSignalWrites = !0), o.fn = t, o.schedule = e;
  const r = (l) => {
    o.cleanupFn = l;
  };
  function i(l) {
    return l.fn === null && l.schedule === null;
  }
  function s(l) {
    i(l) || (Wy(l), l.cleanupFn(), l.fn = null, l.schedule = null, l.cleanupFn = ld);
  }
  const a = () => {
    if (o.fn === null)
      return;
    if (j0())
      throw new Error("Schedulers cannot synchronously execute watches while scheduling.");
    if (o.dirty = !1, o.hasRun && !Of(o))
      return;
    o.hasRun = !0;
    const l = Tf(o);
    try {
      o.cleanupFn(), o.cleanupFn = ld, o.fn(r);
    } finally {
      xf(o, l);
    }
  };
  return o.ref = {
    notify: () => Gy(o),
    run: a,
    cleanup: () => o.cleanupFn(),
    destroy: () => s(o),
    [Kt]: o
  }, o.ref;
}
const ld = () => {
}, Q0 = {
  ...yc,
  consumerIsAlwaysLive: !0,
  consumerAllowSignalWrites: !1,
  consumerMarkedDirty: (t) => {
    t.schedule !== null && t.schedule(t.ref);
  },
  hasRun: !1,
  cleanupFn: ld
};
var cd = function(t, e) {
  return cd = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, o) {
    n.__proto__ = o;
  } || function(n, o) {
    for (var r in o)
      Object.prototype.hasOwnProperty.call(o, r) && (n[r] = o[r]);
  }, cd(t, e);
};
function Sn(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  cd(t, e);
  function n() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (n.prototype = e.prototype, new n());
}
function K0(t, e, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(s) {
      s(i);
    });
  }
  return new (n || (n = Promise))(function(i, s) {
    function a(u) {
      try {
        c(o.next(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      try {
        c(o.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? i(u.value) : r(u.value).then(a, l);
    }
    c((o = o.apply(t, e || [])).next());
  });
}
function Ky(t, e) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, o, r, i, s;
  return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(c) {
    return function(u) {
      return l([c, u]);
    };
  }
  function l(c) {
    if (o)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (n = 0)), n; )
      try {
        if (o = 1, r && (i = c[0] & 2 ? r.return : c[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, c[1])).done)
          return i;
        switch (r = 0, i && (c = [c[0] & 2, i.value]), c[0]) {
          case 0:
          case 1:
            i = c;
            break;
          case 4:
            return n.label++, { value: c[1], done: !1 };
          case 5:
            n.label++, r = c[1], c = [0];
            continue;
          case 7:
            c = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              n = 0;
              continue;
            }
            if (c[0] === 3 && (!i || c[1] > i[0] && c[1] < i[3])) {
              n.label = c[1];
              break;
            }
            if (c[0] === 6 && n.label < i[1]) {
              n.label = i[1], i = c;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2], n.ops.push(c);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        c = e.call(t, n);
      } catch (u) {
        c = [6, u], r = 0;
      } finally {
        o = i = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function ii(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], o = 0;
  if (n)
    return n.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && o >= t.length && (t = void 0), { value: t && t[o++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Cl(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var o = n.call(t), r, i = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(r = o.next()).done; )
      i.push(r.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      r && !r.done && (n = o.return) && n.call(o);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return i;
}
function bl(t, e, n) {
  if (n || arguments.length === 2)
    for (var o = 0, r = e.length, i; o < r; o++)
      (i || !(o in e)) && (i || (i = Array.prototype.slice.call(e, 0, o)), i[o] = e[o]);
  return t.concat(i || Array.prototype.slice.call(e));
}
function Kr(t) {
  return this instanceof Kr ? (this.v = t, this) : new Kr(t);
}
function X0(t, e, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = n.apply(t, e || []), r, i = [];
  return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r;
  function s(f) {
    o[f] && (r[f] = function(h) {
      return new Promise(function(p, g) {
        i.push([f, h, p, g]) > 1 || a(f, h);
      });
    });
  }
  function a(f, h) {
    try {
      l(o[f](h));
    } catch (p) {
      d(i[0][3], p);
    }
  }
  function l(f) {
    f.value instanceof Kr ? Promise.resolve(f.value.v).then(c, u) : d(i[0][2], f);
  }
  function c(f) {
    a("next", f);
  }
  function u(f) {
    a("throw", f);
  }
  function d(f, h) {
    f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function J0(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], n;
  return e ? e.call(t) : (t = typeof ii == "function" ? ii(t) : t[Symbol.iterator](), n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function o(i) {
    n[i] = t[i] && function(s) {
      return new Promise(function(a, l) {
        s = t[i](s), r(a, l, s.done, s.value);
      });
    };
  }
  function r(i, s, a, l) {
    Promise.resolve(l).then(function(c) {
      i({ value: c, done: a });
    }, s);
  }
}
function Be(t) {
  return typeof t == "function";
}
function Rf(t) {
  var e = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, n = t(e);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var _u = Rf(function(t) {
  return function(n) {
    t(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(o, r) {
      return r + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function El(t, e) {
  if (t) {
    var n = t.indexOf(e);
    0 <= n && t.splice(n, 1);
  }
}
var cr = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, n, o, r, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = ii(s), l = a.next(); !l.done; l = a.next()) {
              var c = l.value;
              c.remove(this);
            }
          } catch (g) {
            e = { error: g };
          } finally {
            try {
              l && !l.done && (n = a.return) && n.call(a);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          s.remove(this);
      var u = this.initialTeardown;
      if (Be(u))
        try {
          u();
        } catch (g) {
          i = g instanceof _u ? g.errors : [g];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var f = ii(d), h = f.next(); !h.done; h = f.next()) {
            var p = h.value;
            try {
              Lg(p);
            } catch (g) {
              i = i ?? [], g instanceof _u ? i = bl(bl([], Cl(i)), Cl(g.errors)) : i.push(g);
            }
          }
        } catch (g) {
          o = { error: g };
        } finally {
          try {
            h && !h.done && (r = f.return) && r.call(f);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
      if (i)
        throw new _u(i);
    }
  }, t.prototype.add = function(e) {
    var n;
    if (e && e !== this)
      if (this.closed)
        Lg(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var n = this._parentage;
    return n === e || Array.isArray(n) && n.includes(e);
  }, t.prototype._addParent = function(e) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
  }, t.prototype._removeParent = function(e) {
    var n = this._parentage;
    n === e ? this._parentage = null : Array.isArray(n) && El(n, e);
  }, t.prototype.remove = function(e) {
    var n = this._finalizers;
    n && El(n, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), Xy = cr.EMPTY;
function Jy(t) {
  return t instanceof cr || t && "closed" in t && Be(t.remove) && Be(t.add) && Be(t.unsubscribe);
}
function Lg(t) {
  Be(t) ? t() : t.unsubscribe();
}
var ev = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, tv = {
  setTimeout: function(t, e) {
    for (var n = [], o = 2; o < arguments.length; o++)
      n[o - 2] = arguments[o];
    return setTimeout.apply(void 0, bl([t, e], Cl(n)));
  },
  clearTimeout: function(t) {
    var e = tv.delegate;
    return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(t);
  },
  delegate: void 0
};
function nv(t) {
  tv.setTimeout(function() {
    throw t;
  });
}
function ud() {
}
function cl(t) {
  t();
}
var kf = function(t) {
  Sn(e, t);
  function e(n) {
    var o = t.call(this) || this;
    return o.isStopped = !1, n ? (o.destination = n, Jy(n) && n.add(o)) : o.destination = ow, o;
  }
  return e.create = function(n, o, r) {
    return new dd(n, o, r);
  }, e.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, e.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(n) {
    this.destination.next(n);
  }, e.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(cr), ew = Function.prototype.bind;
function Tu(t, e) {
  return ew.call(t, e);
}
var tw = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(e);
      } catch (o) {
        Wa(o);
      }
  }, t.prototype.error = function(e) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(e);
      } catch (o) {
        Wa(o);
      }
    else
      Wa(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (n) {
        Wa(n);
      }
  }, t;
}(), dd = function(t) {
  Sn(e, t);
  function e(n, o, r) {
    var i = t.call(this) || this, s;
    if (Be(n) || !n)
      s = {
        next: n ?? void 0,
        error: o ?? void 0,
        complete: r ?? void 0
      };
    else {
      var a;
      i && ev.useDeprecatedNextContext ? (a = Object.create(n), a.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: n.next && Tu(n.next, a),
        error: n.error && Tu(n.error, a),
        complete: n.complete && Tu(n.complete, a)
      }) : s = n;
    }
    return i.destination = new tw(s), i;
  }
  return e;
}(kf);
function Wa(t) {
  nv(t);
}
function nw(t) {
  throw t;
}
var ow = {
  closed: !0,
  next: ud,
  error: nw,
  complete: ud
}, Pf = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function ov(t) {
  return t;
}
function rw(t) {
  return t.length === 0 ? ov : t.length === 1 ? t[0] : function(n) {
    return t.reduce(function(o, r) {
      return r(o);
    }, n);
  };
}
var Cn = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var n = new t();
    return n.source = this, n.operator = e, n;
  }, t.prototype.subscribe = function(e, n, o) {
    var r = this, i = sw(e) ? e : new dd(e, n, o);
    return cl(function() {
      var s = r, a = s.operator, l = s.source;
      i.add(a ? a.call(i, l) : l ? r._subscribe(i) : r._trySubscribe(i));
    }), i;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (n) {
      e.error(n);
    }
  }, t.prototype.forEach = function(e, n) {
    var o = this;
    return n = $g(n), new n(function(r, i) {
      var s = new dd({
        next: function(a) {
          try {
            e(a);
          } catch (l) {
            i(l), s.unsubscribe();
          }
        },
        error: i,
        complete: r
      });
      o.subscribe(s);
    });
  }, t.prototype._subscribe = function(e) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e);
  }, t.prototype[Pf] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], n = 0; n < arguments.length; n++)
      e[n] = arguments[n];
    return rw(e)(this);
  }, t.prototype.toPromise = function(e) {
    var n = this;
    return e = $g(e), new e(function(o, r) {
      var i;
      n.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return r(s);
      }, function() {
        return o(i);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function $g(t) {
  var e;
  return (e = t ?? ev.Promise) !== null && e !== void 0 ? e : Promise;
}
function iw(t) {
  return t && Be(t.next) && Be(t.error) && Be(t.complete);
}
function sw(t) {
  return t && t instanceof kf || iw(t) && Jy(t);
}
function aw(t) {
  return Be(t == null ? void 0 : t.lift);
}
function Kn(t) {
  return function(e) {
    if (aw(e))
      return e.lift(function(n) {
        try {
          return t(n, this);
        } catch (o) {
          this.error(o);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Xn(t, e, n, o, r) {
  return new lw(t, e, n, o, r);
}
var lw = function(t) {
  Sn(e, t);
  function e(n, o, r, i, s, a) {
    var l = t.call(this, n) || this;
    return l.onFinalize = s, l.shouldUnsubscribe = a, l._next = o ? function(c) {
      try {
        o(c);
      } catch (u) {
        n.error(u);
      }
    } : t.prototype._next, l._error = i ? function(c) {
      try {
        i(c);
      } catch (u) {
        n.error(u);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._error, l._complete = r ? function() {
      try {
        r();
      } catch (c) {
        n.error(c);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._complete, l;
  }
  return e.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      t.prototype.unsubscribe.call(this), !o && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, e;
}(kf), cw = Rf(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ze = function(t) {
  Sn(e, t);
  function e() {
    var n = t.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return e.prototype.lift = function(n) {
    var o = new Bg(this, this);
    return o.operator = n, o;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new cw();
  }, e.prototype.next = function(n) {
    var o = this;
    cl(function() {
      var r, i;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var s = ii(o.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            l.next(n);
          }
        } catch (c) {
          r = { error: c };
        } finally {
          try {
            a && !a.done && (i = s.return) && i.call(s);
          } finally {
            if (r)
              throw r.error;
          }
        }
      }
    });
  }, e.prototype.error = function(n) {
    var o = this;
    cl(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.hasError = o.isStopped = !0, o.thrownError = n;
        for (var r = o.observers; r.length; )
          r.shift().error(n);
      }
    });
  }, e.prototype.complete = function() {
    var n = this;
    cl(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var o = n.observers; o.length; )
          o.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, n);
  }, e.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, e.prototype._innerSubscribe = function(n) {
    var o = this, r = this, i = r.hasError, s = r.isStopped, a = r.observers;
    return i || s ? Xy : (this.currentObservers = null, a.push(n), new cr(function() {
      o.currentObservers = null, El(a, n);
    }));
  }, e.prototype._checkFinalizedStatuses = function(n) {
    var o = this, r = o.hasError, i = o.thrownError, s = o.isStopped;
    r ? n.error(i) : s && n.complete();
  }, e.prototype.asObservable = function() {
    var n = new Cn();
    return n.source = this, n;
  }, e.create = function(n, o) {
    return new Bg(n, o);
  }, e;
}(Cn), Bg = function(t) {
  Sn(e, t);
  function e(n, o) {
    var r = t.call(this) || this;
    return r.destination = n, r.source = o, r;
  }
  return e.prototype.next = function(n) {
    var o, r;
    (r = (o = this.destination) === null || o === void 0 ? void 0 : o.next) === null || r === void 0 || r.call(o, n);
  }, e.prototype.error = function(n) {
    var o, r;
    (r = (o = this.destination) === null || o === void 0 ? void 0 : o.error) === null || r === void 0 || r.call(o, n);
  }, e.prototype.complete = function() {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || o === void 0 || o.call(n);
  }, e.prototype._subscribe = function(n) {
    var o, r;
    return (r = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(n)) !== null && r !== void 0 ? r : Xy;
  }, e;
}(Ze), uw = function(t) {
  Sn(e, t);
  function e(n) {
    var o = t.call(this) || this;
    return o._value = n, o;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._subscribe = function(n) {
    var o = t.prototype._subscribe.call(this, n);
    return !o.closed && n.next(this._value), o;
  }, e.prototype.getValue = function() {
    var n = this, o = n.hasError, r = n.thrownError, i = n._value;
    if (o)
      throw r;
    return this._throwIfClosed(), i;
  }, e.prototype.next = function(n) {
    t.prototype.next.call(this, this._value = n);
  }, e;
}(Ze), dw = {
  now: function() {
    return Date.now();
  },
  delegate: void 0
}, fw = function(t) {
  Sn(e, t);
  function e(n, o) {
    return t.call(this) || this;
  }
  return e.prototype.schedule = function(n, o) {
    return this;
  }, e;
}(cr), fd = {
  setInterval: function(t, e) {
    for (var n = [], o = 2; o < arguments.length; o++)
      n[o - 2] = arguments[o];
    return setInterval.apply(void 0, bl([t, e], Cl(n)));
  },
  clearInterval: function(t) {
    var e = fd.delegate;
    return ((e == null ? void 0 : e.clearInterval) || clearInterval)(t);
  },
  delegate: void 0
}, hw = function(t) {
  Sn(e, t);
  function e(n, o) {
    var r = t.call(this, n, o) || this;
    return r.scheduler = n, r.work = o, r.pending = !1, r;
  }
  return e.prototype.schedule = function(n, o) {
    var r;
    if (o === void 0 && (o = 0), this.closed)
      return this;
    this.state = n;
    var i = this.id, s = this.scheduler;
    return i != null && (this.id = this.recycleAsyncId(s, i, o)), this.pending = !0, this.delay = o, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(s, this.id, o), this;
  }, e.prototype.requestAsyncId = function(n, o, r) {
    return r === void 0 && (r = 0), fd.setInterval(n.flush.bind(n, this), r);
  }, e.prototype.recycleAsyncId = function(n, o, r) {
    if (r === void 0 && (r = 0), r != null && this.delay === r && this.pending === !1)
      return o;
    o != null && fd.clearInterval(o);
  }, e.prototype.execute = function(n, o) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var r = this._execute(n, o);
    if (r)
      return r;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, e.prototype._execute = function(n, o) {
    var r = !1, i;
    try {
      this.work(n);
    } catch (s) {
      r = !0, i = s || new Error("Scheduled action threw falsy error");
    }
    if (r)
      return this.unsubscribe(), i;
  }, e.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, o = n.id, r = n.scheduler, i = r.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, El(i, this), o != null && (this.id = this.recycleAsyncId(r, o, null)), this.delay = null, t.prototype.unsubscribe.call(this);
    }
  }, e;
}(fw), jg = function() {
  function t(e, n) {
    n === void 0 && (n = t.now), this.schedulerActionCtor = e, this.now = n;
  }
  return t.prototype.schedule = function(e, n, o) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, e).schedule(o, n);
  }, t.now = dw.now, t;
}(), pw = function(t) {
  Sn(e, t);
  function e(n, o) {
    o === void 0 && (o = jg.now);
    var r = t.call(this, n, o) || this;
    return r.actions = [], r._active = !1, r;
  }
  return e.prototype.flush = function(n) {
    var o = this.actions;
    if (this._active) {
      o.push(n);
      return;
    }
    var r;
    this._active = !0;
    do
      if (r = n.execute(n.state, n.delay))
        break;
    while (n = o.shift());
    if (this._active = !1, r) {
      for (; n = o.shift(); )
        n.unsubscribe();
      throw r;
    }
  }, e;
}(jg), gw = new pw(hw), mw = new Cn(function(t) {
  return t.complete();
}), yw = function(t) {
  return t && typeof t.length == "number" && typeof t != "function";
};
function vw(t) {
  return Be(t == null ? void 0 : t.then);
}
function Dw(t) {
  return Be(t[Pf]);
}
function Cw(t) {
  return Symbol.asyncIterator && Be(t == null ? void 0 : t[Symbol.asyncIterator]);
}
function bw(t) {
  return new TypeError("You provided " + (t !== null && typeof t == "object" ? "an invalid object" : "'" + t + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Ew() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Iw = Ew();
function Sw(t) {
  return Be(t == null ? void 0 : t[Iw]);
}
function ww(t) {
  return X0(this, arguments, function() {
    var n, o, r, i;
    return Ky(this, function(s) {
      switch (s.label) {
        case 0:
          n = t.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, Kr(n.read())];
        case 3:
          return o = s.sent(), r = o.value, i = o.done, i ? [4, Kr(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, Kr(r)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Mw(t) {
  return Be(t == null ? void 0 : t.getReader);
}
function Aw(t) {
  if (t instanceof Cn)
    return t;
  if (t != null) {
    if (Dw(t))
      return _w(t);
    if (yw(t))
      return Tw(t);
    if (vw(t))
      return xw(t);
    if (Cw(t))
      return rv(t);
    if (Sw(t))
      return Ow(t);
    if (Mw(t))
      return Fw(t);
  }
  throw bw(t);
}
function _w(t) {
  return new Cn(function(e) {
    var n = t[Pf]();
    if (Be(n.subscribe))
      return n.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Tw(t) {
  return new Cn(function(e) {
    for (var n = 0; n < t.length && !e.closed; n++)
      e.next(t[n]);
    e.complete();
  });
}
function xw(t) {
  return new Cn(function(e) {
    t.then(function(n) {
      e.closed || (e.next(n), e.complete());
    }, function(n) {
      return e.error(n);
    }).then(null, nv);
  });
}
function Ow(t) {
  return new Cn(function(e) {
    var n, o;
    try {
      for (var r = ii(t), i = r.next(); !i.done; i = r.next()) {
        var s = i.value;
        if (e.next(s), e.closed)
          return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        i && !i.done && (o = r.return) && o.call(r);
      } finally {
        if (n)
          throw n.error;
      }
    }
    e.complete();
  });
}
function rv(t) {
  return new Cn(function(e) {
    Rw(t, e).catch(function(n) {
      return e.error(n);
    });
  });
}
function Fw(t) {
  return rv(ww(t));
}
function Rw(t, e) {
  var n, o, r, i;
  return K0(this, void 0, void 0, function() {
    var s, a;
    return Ky(this, function(l) {
      switch (l.label) {
        case 0:
          l.trys.push([0, 5, 6, 11]), n = J0(t), l.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (o = l.sent(), !!o.done)
            return [3, 4];
          if (s = o.value, e.next(s), e.closed)
            return [2];
          l.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = l.sent(), r = { error: a }, [3, 11];
        case 6:
          return l.trys.push([6, , 9, 10]), o && !o.done && (i = n.return) ? [4, i.call(n)] : [3, 8];
        case 7:
          l.sent(), l.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (r)
            throw r.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return e.complete(), [2];
      }
    });
  });
}
var iv = Rf(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function kw(t, e) {
  return Kn(function(n, o) {
    var r = 0;
    n.subscribe(Xn(o, function(i) {
      o.next(t.call(e, i, r++));
    }));
  });
}
function Pw(t, e) {
  return Kn(function(n, o) {
    var r = 0;
    n.subscribe(Xn(o, function(i) {
      return t.call(e, i, r++) && o.next(i);
    }));
  });
}
function Nw(t, e) {
  return e === void 0 && (e = gw), Kn(function(n, o) {
    var r = null, i = null, s = null, a = function() {
      if (r) {
        r.unsubscribe(), r = null;
        var c = i;
        i = null, o.next(c);
      }
    };
    function l() {
      var c = s + t, u = e.now();
      if (u < c) {
        r = this.schedule(void 0, c - u), o.add(r);
        return;
      }
      a();
    }
    n.subscribe(Xn(o, function(c) {
      i = c, s = e.now(), r || (r = e.schedule(l, t), o.add(r));
    }, function() {
      a(), o.complete();
    }, void 0, function() {
      i = r = null;
    }));
  });
}
function Lw(t) {
  return Kn(function(e, n) {
    var o = !1;
    e.subscribe(Xn(n, function(r) {
      o = !0, n.next(r);
    }, function() {
      o || n.next(t), n.complete();
    }));
  });
}
function $w(t) {
  return t <= 0 ? function() {
    return mw;
  } : Kn(function(e, n) {
    var o = 0;
    e.subscribe(Xn(n, function(r) {
      ++o <= t && (n.next(r), t <= o && n.complete());
    }));
  });
}
function Bw(t) {
  return t === void 0 && (t = jw), Kn(function(e, n) {
    var o = !1;
    e.subscribe(Xn(n, function(r) {
      o = !0, n.next(r);
    }, function() {
      return o ? n.complete() : n.error(t());
    }));
  });
}
function jw() {
  return new iv();
}
function Hw(t, e) {
  var n = arguments.length >= 2;
  return function(o) {
    return o.pipe(t ? Pw(function(r, i) {
      return t(r, i, o);
    }) : ov, $w(1), n ? Lw(e) : Bw(function() {
      return new iv();
    }));
  };
}
function Vw(t) {
  return Kn(function(e, n) {
    Aw(t).subscribe(Xn(n, function() {
      return n.complete();
    }, ud)), !n.closed && e.subscribe(n);
  });
}
function Uw(t, e) {
  return e === void 0 && (e = !1), Kn(function(n, o) {
    var r = 0;
    n.subscribe(Xn(o, function(i) {
      var s = t(i, r++);
      (s || e) && o.next(i), !s && o.complete();
    }));
  });
}
/**
 * @license Angular v17.1.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
const Gw = "https://angular.io/errors", ur = "https://g.co/ng/security#xss";
class b extends Error {
  constructor(e, n) {
    super(ve(e, n)), this.code = e;
  }
}
function ve(t, e) {
  const n = `NG0${Math.abs(t)}`;
  let o = `${n}${e ? ": " + e : ""}`;
  if (ngDevMode && t < 0) {
    const i = !o.match(/[.,;!?\n]$/) ? "." : "";
    o = `${o}${i} Find more at ${Gw}/${n}`;
  }
  return o;
}
const sv = /* @__PURE__ */ Symbol("InputSignalNode#UNSET"), Ww = {
  ...Qy,
  transformFn: void 0,
  applyValueToInputSignal(t, e) {
    Ff(t, e);
  }
}, zw = /* @__PURE__ */ Symbol();
function av(t, e) {
  const n = Object.create(Ww);
  n.value = t, n.transformFn = e == null ? void 0 : e.transform;
  function o() {
    if (_f(n), n.value === sv)
      throw new b(-950, ngDevMode && "Input is required but no value is available yet.");
    return n.value;
  }
  return o[Kt] = n, o;
}
function Hg(t, e) {
  return av(t, e);
}
function qw(t) {
  return av(sv, t);
}
const Yw = (Hg.required = qw, Hg);
function ee(t) {
  for (let e in t)
    if (t[e] === ee)
      return e;
  throw Error("Could not find renamed property on target object.");
}
function Zw(t, e) {
  for (const n in e)
    e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function Y(t) {
  if (typeof t == "string")
    return t;
  if (Array.isArray(t))
    return "[" + t.map(Y).join(", ") + "]";
  if (t == null)
    return "" + t;
  if (t.overriddenName)
    return `${t.overriddenName}`;
  if (t.name)
    return `${t.name}`;
  const e = t.toString();
  if (e == null)
    return "" + e;
  const n = e.indexOf(`
`);
  return n === -1 ? e : e.substring(0, n);
}
function hd(t, e) {
  return t == null || t === "" ? e === null ? "" : e : e == null || e === "" ? t : t + " " + e;
}
function Qw(t, e = 100) {
  if (!t || e < 1 || t.length <= e)
    return t;
  if (e == 1)
    return t.substring(0, 1) + "...";
  const n = Math.round(e / 2);
  return t.substring(0, n) + "..." + t.substring(t.length - n);
}
const Kw = ee({ __forward_ref__: ee });
function Dc(t) {
  return t.__forward_ref__ = Dc, t.toString = function() {
    return Y(this());
  }, t;
}
function k(t) {
  return Cc(t) ? t() : t;
}
function Cc(t) {
  return typeof t == "function" && t.hasOwnProperty(Kw) && t.__forward_ref__ === Dc;
}
function pa(t) {
  return t && !!t.ɵproviders;
}
const Wi = ee({ ɵcmp: ee }), bc = ee({ ɵdir: ee }), Ec = ee({ ɵpipe: ee }), Nf = ee({ ɵmod: ee }), bn = ee({ ɵfac: ee }), Xr = ee({ __NG_ELEMENT_ID__: ee }), Vg = ee({ __NG_ENV_ID__: ee });
function L(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function G(t) {
  return typeof t == "function" ? t.name || t.toString() : typeof t == "object" && t != null && typeof t.type == "function" ? t.type.name || t.type.toString() : L(t);
}
function Xw(t) {
  let e = t[Wi] || null;
  return e !== null && e.debugInfo ? Jw(e.debugInfo) : G(t);
}
function Jw(t) {
  return !t.filePath || !t.lineNumber ? t.className : `${t.className} (at ${t.filePath}:${t.lineNumber})`;
}
function Lf(t, e) {
  const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
  throw new b(-200, `Circular dependency in DI detected for ${t}${n}`);
}
function Ug() {
  throw new Error("Cannot mix multi providers and regular providers");
}
function pd(t, e, n) {
  if (t && e) {
    const o = e.map((r) => r == n ? "?" + n + "?" : "...");
    throw new Error(`Invalid provider for the NgModule '${Y(t)}' - only instances of Provider and Type are allowed, got: [${o.join(", ")}]`);
  } else
    throw pa(n) ? n.ɵfromNgModule ? new b(207, "Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.") : new b(207, "Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.") : new Error("Invalid provider");
}
function $f(t, e) {
  const n = ngDevMode && `No provider for ${G(t)} found${e ? ` in ${e}` : ""}`;
  throw new b(-201, n);
}
function X(t, e) {
  typeof t != "number" && _(e, typeof t, "number", "===");
}
function zs(t, e, n) {
  X(t, "Expected a number"), cv(t, n, "Expected number to be less than or equal to"), wn(t, e, "Expected number to be greater than or equal to");
}
function zi(t, e) {
  typeof t != "string" && _(e, t === null ? "null" : typeof t, "string", "===");
}
function eM(t, e) {
  typeof t != "function" && _(e, t === null ? "null" : typeof t, "function", "===");
}
function x(t, e, n) {
  t != e && _(n, t, e, "==");
}
function Lt(t, e, n) {
  t == e && _(n, t, e, "!=");
}
function lv(t, e, n) {
  t !== e && _(n, t, e, "===");
}
function dr(t, e, n) {
  t === e && _(n, t, e, "!==");
}
function $n(t, e, n) {
  t < e || _(n, t, e, "<");
}
function cv(t, e, n) {
  t <= e || _(n, t, e, "<=");
}
function Jn(t, e, n) {
  t > e || _(n, t, e, ">");
}
function wn(t, e, n) {
  t >= e || _(n, t, e, ">=");
}
function S(t, e) {
  t == null && _(e, t, null, "!=");
}
function _(t, e, n, o) {
  throw new Error(`ASSERTION ERROR: ${t}` + (o == null ? "" : ` [Expected=> ${n} ${o} ${e} <=Actual]`));
}
function Pn(t) {
  t instanceof Node || _(`The provided value must be an instance of a DOM Node but got ${Y(t)}`);
}
function tM(t) {
  t instanceof Element || _(`The provided value must be an element but got ${Y(t)}`);
}
function be(t, e) {
  S(t, "Array must be defined.");
  const n = t.length;
  (e < 0 || e >= n) && _(`Index expected to be less than ${n} but got ${e}`);
}
function nM(t, ...e) {
  if (e.indexOf(t) !== -1)
    return !0;
  _(`Expected value to be one of ${JSON.stringify(e)} but was ${JSON.stringify(t)}.`);
}
function oe(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0
  };
}
const oM = oe;
function Ic(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function ga(t) {
  return Gg(t, qs) || Gg(t, uv);
}
function rM(t) {
  return ga(t) !== null;
}
function Gg(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function iM(t) {
  const e = t && (t[qs] || t[uv]);
  return e ? (ngDevMode && console.warn(`DEPRECATED: DI is instantiating a token "${t.name}" that inherits its @Injectable decorator but does not provide one itself.
This will become an error in a future version of Angular. Please add @Injectable() to the "${t.name}" class.`), e) : null;
}
function Il(t) {
  return t && (t.hasOwnProperty(Sl) || t.hasOwnProperty(sM)) ? t[Sl] : null;
}
const qs = ee({ ɵprov: ee }), Sl = ee({ ɵinj: ee }), uv = ee({ ngInjectableDef: ee }), sM = ee({ ngInjectorDef: ee });
var z;
(function(t) {
  t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional";
})(z || (z = {}));
let wl;
function dv() {
  return wl;
}
function it(t) {
  const e = wl;
  return wl = t, e;
}
function fv(t, e, n) {
  const o = ga(t);
  if (o && o.providedIn == "root")
    return o.value === void 0 ? o.value = o.factory() : o.value;
  if (n & z.Optional)
    return null;
  if (e !== void 0)
    return e;
  $f(t, "Injector");
}
function aM(t) {
  ngDevMode && Lt(wl, t, "Calling ɵɵinject would cause infinite recursion");
}
const xe = globalThis;
function lM() {
  const t = typeof location < "u" ? location.toString() : "", e = {
    namedConstructors: t.indexOf("ngDevMode=namedConstructors") != -1,
    firstCreatePass: 0,
    tNode: 0,
    tView: 0,
    rendererCreateTextNode: 0,
    rendererSetText: 0,
    rendererCreateElement: 0,
    rendererAddEventListener: 0,
    rendererSetAttribute: 0,
    rendererRemoveAttribute: 0,
    rendererSetProperty: 0,
    rendererSetClassName: 0,
    rendererAddClass: 0,
    rendererRemoveClass: 0,
    rendererSetStyle: 0,
    rendererRemoveStyle: 0,
    rendererDestroy: 0,
    rendererDestroyNode: 0,
    rendererMoveNode: 0,
    rendererRemoveNode: 0,
    rendererAppendChild: 0,
    rendererInsertBefore: 0,
    rendererCreateComment: 0,
    hydratedNodes: 0,
    hydratedComponents: 0,
    dehydratedViewsRemoved: 0,
    dehydratedViewsCleanupRuns: 0,
    componentsSkippedHydration: 0
  }, n = t.indexOf("ngDevMode=false") === -1;
  return xe.ngDevMode = n && e, e;
}
function Bf() {
  return typeof ngDevMode > "u" || ngDevMode ? (typeof ngDevMode != "object" && lM(), typeof ngDevMode < "u" && !!ngDevMode) : !1;
}
class j {
  /**
   * @param _desc   Description for the token,
   *                used only for debugging purposes,
   *                it should but does not need to be unique
   * @param options Options for the token's usage, as described above
   */
  constructor(e, n) {
    this._desc = e, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, typeof n == "number" ? ((typeof ngDevMode > "u" || ngDevMode) && $n(n, 0, "Only negative numbers are supported here"), this.__NG_ELEMENT_ID__ = n) : n !== void 0 && (this.ɵprov = oe({
      token: this,
      providedIn: n.providedIn || "root",
      factory: n.factory
    }));
  }
  /**
   * @internal
   */
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}
let gd;
function jf() {
  return !ngDevMode && _("getInjectorProfilerContext should never be called in production mode"), gd;
}
function Qe(t) {
  !ngDevMode && _("setInjectorProfilerContext should never be called in production mode");
  const e = gd;
  return gd = t, e;
}
let md = null;
const cM = (t) => {
  !ngDevMode && _("setInjectorProfiler should never be called in production mode"), md = t;
};
function Hf(t) {
  !ngDevMode && _("Injector profiler should never be called in production mode"), md != null && md(t);
}
function yd(t, e = !1) {
  !ngDevMode && _("Injector profiler should never be called in production mode");
  let n;
  typeof t == "function" || t instanceof j ? n = t : n = k(t.provide);
  let o = t;
  t instanceof j && (o = t.ɵprov || t), Hf({
    type: 2,
    context: jf(),
    providerRecord: { token: n, provider: o, isViewProvider: e }
  });
}
function Ml(t) {
  !ngDevMode && _("Injector profiler should never be called in production mode"), Hf({
    type: 1,
    context: jf(),
    instance: { value: t }
  });
}
function hv(t, e, n) {
  !ngDevMode && _("Injector profiler should never be called in production mode"), Hf({
    type: 0,
    context: jf(),
    service: { token: t, value: e, flags: n }
  });
}
function Ms(t, e, n) {
  !ngDevMode && _("runInInjectorProfilerContext should never be called in production mode");
  const o = Qe({ injector: t, token: e });
  try {
    n();
  } finally {
    Qe(o);
  }
}
const uM = {}, Ys = uM, vd = "__NG_DI_FLAG__", Al = "ngTempTokenPath", dM = "ngTokenPath", fM = /\n/gm, hM = "ɵ", Wg = "__source";
let Jr;
function pM() {
  return Jr;
}
function pn(t) {
  const e = Jr;
  return Jr = t, e;
}
function gM(t, e = z.Default) {
  if (Jr === void 0)
    throw new b(-203, ngDevMode && "inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`.");
  if (Jr === null)
    return fv(t, void 0, e);
  {
    const n = Jr.get(t, e & z.Optional ? null : void 0, e);
    return ngDevMode && hv(t, n, e), n;
  }
}
function Re(t, e = z.Default) {
  return (dv() || gM)(k(t), e);
}
function Vf(t) {
  throw new b(202, ngDevMode && `This constructor is not compatible with Angular Dependency Injection because its dependency at index ${t} of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index ${t} is correct and 2) the correct Angular decorators are defined for this class and its ancestors.`);
}
function A(t, e = z.Default) {
  return Re(t, ma(e));
}
function ma(t) {
  return typeof t > "u" || typeof t == "number" ? t : 0 | // comment to force a line break in the formatter
  (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function Dd(t) {
  const e = [];
  for (let n = 0; n < t.length; n++) {
    const o = k(t[n]);
    if (Array.isArray(o)) {
      if (o.length === 0)
        throw new b(900, ngDevMode && "Arguments array must have arguments.");
      let r, i = z.Default;
      for (let s = 0; s < o.length; s++) {
        const a = o[s], l = mM(a);
        typeof l == "number" ? l === -1 ? r = a.token : i |= l : r = a;
      }
      e.push(Re(r, i));
    } else
      e.push(Re(o));
  }
  return e;
}
function ya(t, e) {
  return t[vd] = e, t.prototype[vd] = e, t;
}
function mM(t) {
  return t[vd];
}
function yM(t, e, n, o) {
  const r = t[Al];
  throw e[Wg] && r.unshift(e[Wg]), t.message = vM(`
` + t.message, r, n, o), t[dM] = r, t[Al] = null, t;
}
function vM(t, e, n, o = null) {
  t = t && t.charAt(0) === `
` && t.charAt(1) == hM ? t.slice(2) : t;
  let r = Y(e);
  if (Array.isArray(e))
    r = e.map(Y).join(" -> ");
  else if (typeof e == "object") {
    let i = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Y(a)));
      }
    r = `{${i.join(", ")}}`;
  }
  return `${n}${o ? "(" + o + ")" : ""}[${r}]: ${t.replace(fM, `
  `)}`;
}
function sn(t) {
  return { toString: t }.toString();
}
var Bn;
(function(t) {
  t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default";
})(Bn || (Bn = {}));
var Xt;
(function(t) {
  t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom";
})(Xt || (Xt = {}));
const kt = {}, q = [];
(typeof ngDevMode > "u" || ngDevMode) && Bf() && (Object.freeze(kt), Object.freeze(q));
var En;
(function(t) {
  t[t.None = 0] = "None", t[t.SignalBased = 1] = "SignalBased", t[t.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform";
})(En || (En = {}));
function pv(t, e, n) {
  ngDevMode && Lt(e, "", 'can not look for "" string.');
  let o = t.length;
  for (; ; ) {
    const r = t.indexOf(e, n);
    if (r === -1)
      return r;
    if (r === 0 || t.charCodeAt(r - 1) <= 32) {
      const i = e.length;
      if (r + i === o || t.charCodeAt(r + i) <= 32)
        return r;
    }
    n = r + 1;
  }
}
function Cd(t, e, n) {
  let o = 0;
  for (; o < n.length; ) {
    const r = n[o];
    if (typeof r == "number") {
      if (r !== 0)
        break;
      o++;
      const i = n[o++], s = n[o++], a = n[o++];
      ngDevMode && ngDevMode.rendererSetAttribute++, t.setAttribute(e, s, a, i);
    } else {
      const i = r, s = n[++o];
      ngDevMode && ngDevMode.rendererSetAttribute++, mv(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), o++;
    }
  }
  return o;
}
function gv(t) {
  return t === 3 || t === 4 || t === 6;
}
function mv(t) {
  return t.charCodeAt(0) === 64;
}
function Zs(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0)
      t = e.slice();
    else {
      let n = -1;
      for (let o = 0; o < e.length; o++) {
        const r = e[o];
        typeof r == "number" ? n = r : n === 0 || (n === -1 || n === 2 ? zg(t, n, r, null, e[++o]) : zg(t, n, r, null, null));
      }
    }
  return t;
}
function zg(t, e, n, o, r) {
  let i = 0, s = t.length;
  if (e === -1)
    s = -1;
  else
    for (; i < t.length; ) {
      const a = t[i++];
      if (typeof a == "number") {
        if (a === e) {
          s = -1;
          break;
        } else if (a > e) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < t.length; ) {
    const a = t[i];
    if (typeof a == "number")
      break;
    if (a === n) {
      if (o === null) {
        r !== null && (t[i + 1] = r);
        return;
      } else if (o === t[i + 1]) {
        t[i + 2] = r;
        return;
      }
    }
    i++, o !== null && i++, r !== null && i++;
  }
  s !== -1 && (t.splice(s, 0, e), i = s + 1), t.splice(i++, 0, n), o !== null && t.splice(i++, 0, o), r !== null && t.splice(i++, 0, r);
}
const yv = "ng-template";
function DM(t, e, n) {
  ngDevMode && x(e, e.toLowerCase(), "Class name expected to be lowercase.");
  let o = 0, r = !0;
  for (; o < t.length; ) {
    let i = t[o++];
    if (typeof i == "string" && r) {
      const s = t[o++];
      if (n && i === "class" && pv(s.toLowerCase(), e, 0) !== -1)
        return !0;
    } else if (i === 1) {
      for (; o < t.length && typeof (i = t[o++]) == "string"; )
        if (i.toLowerCase() === e)
          return !0;
      return !1;
    } else
      typeof i == "number" && (r = !1);
  }
  return !1;
}
function vv(t) {
  return t.type === 4 && t.value !== yv;
}
function CM(t, e, n) {
  const o = t.type === 4 && !n ? yv : t.value;
  return e === o;
}
function bM(t, e, n) {
  ngDevMode && S(e[0], "Selector should have a tag name");
  let o = 4;
  const r = t.attrs || [], i = SM(r);
  let s = !1;
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (typeof l == "number") {
      if (!s && !Ot(o) && !Ot(l))
        return !1;
      if (s && Ot(l))
        continue;
      s = !1, o = l | o & 1;
      continue;
    }
    if (!s)
      if (o & 4) {
        if (o = 2 | o & 1, l !== "" && !CM(t, l, n) || l === "" && e.length === 1) {
          if (Ot(o))
            return !1;
          s = !0;
        }
      } else {
        const c = o & 8 ? l : e[++a];
        if (o & 8 && t.attrs !== null) {
          if (!DM(t.attrs, c, n)) {
            if (Ot(o))
              return !1;
            s = !0;
          }
          continue;
        }
        const u = o & 8 ? "class" : l, d = EM(u, r, vv(t), n);
        if (d === -1) {
          if (Ot(o))
            return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let f;
          d > i ? f = "" : (ngDevMode && Lt(r[d], 0, "We do not match directives on namespaced attributes"), f = r[d + 1].toLowerCase());
          const h = o & 8 ? f : null;
          if (h && pv(h, c, 0) !== -1 || o & 2 && c !== f) {
            if (Ot(o))
              return !1;
            s = !0;
          }
        }
      }
  }
  return Ot(o) || s;
}
function Ot(t) {
  return (t & 1) === 0;
}
function EM(t, e, n, o) {
  if (e === null)
    return -1;
  let r = 0;
  if (o || !n) {
    let i = !1;
    for (; r < e.length; ) {
      const s = e[r];
      if (s === t)
        return r;
      if (s === 3 || s === 6)
        i = !0;
      else if (s === 1 || s === 2) {
        let a = e[++r];
        for (; typeof a == "string"; )
          a = e[++r];
        continue;
      } else {
        if (s === 4)
          break;
        if (s === 0) {
          r += 4;
          continue;
        }
      }
      r += i ? 1 : 2;
    }
    return -1;
  } else
    return wM(e, t);
}
function Dv(t, e, n = !1) {
  for (let o = 0; o < e.length; o++)
    if (bM(t, e[o], n))
      return !0;
  return !1;
}
function IM(t) {
  const e = t.attrs;
  if (e != null) {
    const n = e.indexOf(
      5
      /* AttributeMarker.ProjectAs */
    );
    if (!(n & 1))
      return e[n + 1];
  }
  return null;
}
function SM(t) {
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (gv(n))
      return e;
  }
  return t.length;
}
function wM(t, e) {
  let n = t.indexOf(
    4
    /* AttributeMarker.Template */
  );
  if (n > -1)
    for (n++; n < t.length; ) {
      const o = t[n];
      if (typeof o == "number")
        return -1;
      if (o === e)
        return n;
      n++;
    }
  return -1;
}
function MM(t, e) {
  e:
    for (let n = 0; n < e.length; n++) {
      const o = e[n];
      if (t.length === o.length) {
        for (let r = 0; r < t.length; r++)
          if (t[r] !== o[r])
            continue e;
        return !0;
      }
    }
  return !1;
}
function qg(t, e) {
  return t ? ":not(" + e.trim() + ")" : e;
}
function AM(t) {
  let e = t[0], n = 1, o = 2, r = "", i = !1;
  for (; n < t.length; ) {
    let s = t[n];
    if (typeof s == "string")
      if (o & 2) {
        const a = t[++n];
        r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else
        o & 8 ? r += "." + s : o & 4 && (r += " " + s);
    else
      r !== "" && !Ot(s) && (e += qg(i, r), r = ""), o = s, i = i || !Ot(o);
    n++;
  }
  return r !== "" && (e += qg(i, r)), e;
}
function Cv(t) {
  return t.map(AM).join(",");
}
function _M(t) {
  const e = [], n = [];
  let o = 1, r = 2;
  for (; o < t.length; ) {
    let i = t[o];
    if (typeof i == "string")
      r === 2 ? i !== "" && e.push(i, t[++o]) : r === 8 && n.push(i);
    else {
      if (!Ot(r))
        break;
      r = i;
    }
    o++;
  }
  return { attrs: e, classes: n };
}
function bv(t) {
  return sn(() => {
    (typeof ngDevMode > "u" || ngDevMode) && Bf();
    const e = Sv(t), n = {
      ...e,
      decls: t.decls,
      vars: t.vars,
      template: t.template,
      consts: t.consts || null,
      ngContentSelectors: t.ngContentSelectors,
      onPush: t.changeDetection === Bn.OnPush,
      directiveDefs: null,
      // assigned in noSideEffects
      pipeDefs: null,
      // assigned in noSideEffects
      dependencies: e.standalone && t.dependencies || null,
      getStandaloneInjector: null,
      signals: t.signals ?? !1,
      data: t.data || {},
      encapsulation: t.encapsulation || Xt.Emulated,
      styles: t.styles || q,
      _: null,
      schemas: t.schemas || null,
      tView: null,
      id: ""
    };
    wv(n);
    const o = t.dependencies;
    return n.directiveDefs = _l(
      o,
      /* pipeDef */
      !1
    ), n.pipeDefs = _l(
      o,
      /* pipeDef */
      !0
    ), n.id = OM(n), n;
  });
}
function TM(t) {
  return H(t) || Fe(t);
}
function xM(t) {
  return t !== null;
}
function Uf(t) {
  return sn(() => ({
    type: t.type,
    bootstrap: t.bootstrap || q,
    declarations: t.declarations || q,
    imports: t.imports || q,
    exports: t.exports || q,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null
  }));
}
function Yg(t, e) {
  if (t == null)
    return kt;
  const n = {};
  for (const o in t)
    if (t.hasOwnProperty(o)) {
      const r = t[o];
      let i, s, a = En.None;
      Array.isArray(r) ? (a = r[0], i = r[1], s = r[2] ?? i) : (i = r, s = r), e ? (n[i] = a !== En.None ? [o, a] : o, e[i] = s) : n[i] = o;
    }
  return n;
}
function Ev(t) {
  return sn(() => {
    const e = Sv(t);
    return wv(e), e;
  });
}
function Iv(t) {
  return {
    type: t.type,
    name: t.name,
    factory: null,
    pure: t.pure !== !1,
    standalone: t.standalone === !0,
    onDestroy: t.type.prototype.ngOnDestroy || null
  };
}
function H(t) {
  return t[Wi] || null;
}
function Fe(t) {
  return t[bc] || null;
}
function gt(t) {
  return t[Ec] || null;
}
function Nn(t) {
  const e = H(t) || Fe(t) || gt(t);
  return e !== null ? e.standalone : !1;
}
function yt(t, e) {
  const n = t[Nf] || null;
  if (!n && e === !0)
    throw new Error(`Type ${Y(t)} does not have 'ɵmod' property.`);
  return n;
}
function Sv(t) {
  const e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || kt,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || q,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Yg(t.inputs, e),
    outputs: Yg(t.outputs),
    debugInfo: null
  };
}
function wv(t) {
  var e;
  (e = t.features) == null || e.forEach((n) => n(t));
}
function _l(t, e) {
  if (!t)
    return null;
  const n = e ? gt : TM;
  return () => (typeof t == "function" ? t() : t).map((o) => n(o)).filter(xM);
}
const ul = /* @__PURE__ */ new Map();
function OM(t) {
  let e = 0;
  const n = [
    t.selectors,
    t.ngContentSelectors,
    t.hostVars,
    t.hostAttrs,
    t.consts,
    t.vars,
    t.decls,
    t.encapsulation,
    t.standalone,
    t.signals,
    t.exportAs,
    JSON.stringify(t.inputs),
    JSON.stringify(t.outputs),
    // We cannot use 'componentDef.type.name' as the name of the symbol will change and will not
    // match in the server and browser bundles.
    Object.getOwnPropertyNames(t.type.prototype),
    !!t.contentQueries,
    !!t.viewQuery
  ].join("|");
  for (const r of n)
    e = Math.imul(31, e) + r.charCodeAt(0) << 0;
  e += 2147483648;
  const o = "c" + e;
  if (typeof ngDevMode > "u" || ngDevMode)
    if (ul.has(o)) {
      const r = ul.get(o);
      r !== t.type && console.warn(ve(-912, `Component ID generation collision detected. Components '${r.name}' and '${t.type.name}' with selector '${Cv(t.selectors)}' generated the same component ID. To fix this, you can change the selector of one of those components or add an extra host attribute to force a different ID.`));
    } else
      ul.set(o, t.type);
  return o;
}
const pe = 0, E = 1, O = 2, Ce = 3, Rt = 4, Ue = 5, Pt = 6, si = 7, re = 8, Je = 9, Zt = 10, B = 11, Qs = 12, Zg = 13, jn = 14, ge = 15, va = 16, vr = 17, St = 18, jo = 19, Mv = 20, Ln = 21, ei = 22, Ho = 23, T = 25, Gf = 1, Ks = 6, Jt = 7, Tl = 8, Vo = 9, ue = 10;
var xl;
(function(t) {
  t[t.None = 0] = "None", t[t.HasTransplantedViews = 2] = "HasTransplantedViews";
})(xl || (xl = {}));
function je(t) {
  return Array.isArray(t) && typeof t[Gf] == "object";
}
function Pe(t) {
  return Array.isArray(t) && t[Gf] === !0;
}
function Wf(t) {
  return (t.flags & 4) !== 0;
}
function eo(t) {
  return t.componentOffset > -1;
}
function Sc(t) {
  return (t.flags & 1) === 1;
}
function wt(t) {
  return !!t.template;
}
function zf(t) {
  return (t[O] & 512) !== 0;
}
function FM(t) {
  return (t.type & 16) === 16;
}
function RM(t) {
  return (t[O] & 32) === 32;
}
function bd(t) {
  return (t[O] & 256) === 256;
}
function tt(t, e) {
  qi(t, e[E]);
}
function qi(t, e) {
  ai(t);
  const n = e.data;
  for (let o = T; o < n.length; o++)
    if (n[o] === t)
      return;
  _("This TNode does not belong to this TView.");
}
function ai(t) {
  S(t, "TNode must be defined"), t && typeof t == "object" && t.hasOwnProperty("directiveStylingLast") || _("Not of type TNode, got: " + t);
}
function qf(t) {
  S(t, "Expected TIcu to be defined"), typeof t.currentCaseLViewIndex != "number" && _("Object is not of TIcu type.");
}
function kM(t, e = "Type passed in is not ComponentType, it does not have 'ɵcmp' property.") {
  H(t) || _(e);
}
function PM(t, e = "Type passed in is not NgModuleType, it does not have 'ɵmod' property.") {
  yt(t) || _(e);
}
function Av(t) {
  S(t, "currentTNode should exist!"), S(t.parent, "currentTNode should have a parent");
}
function lt(t) {
  S(t, "LContainer must be defined"), x(Pe(t), !0, "Expecting LContainer");
}
function _v(t) {
  t && x(je(t), !0, "Expecting LView or undefined or null");
}
function an(t) {
  S(t, "LView must be defined"), x(je(t), !0, "Expecting LView");
}
function ct(t, e) {
  x(t.firstCreatePass, !0, e || "Should only be called in first create pass.");
}
function Yf(t, e) {
  x(t.firstUpdatePass, !0, e || "Should only be called in first update pass.");
}
function NM(t) {
  (t.type === void 0 || t.selectors == null || t.inputs === void 0) && _("Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.");
}
function Da(t, e) {
  Tv(T, t.bindingStartIndex, e);
}
function Ol(t, e) {
  const n = t[1];
  Tv(n.expandoStartIndex, t.length, e);
}
function Tv(t, e, n) {
  t <= n && n < e || _(`Index out of range (expecting ${t} <= ${n} < ${e})`);
}
function LM(t, e) {
  S(t[ge], "Component views should exist."), S(t[ge][Ue].projection, e || "Components with projection nodes (<ng-content>) must have projection slots defined.");
}
function xv(t, e) {
  S(t, e || "Component views should always have a parent view (component's host view)");
}
function Ov(t) {
  if (t.length < 2)
    return;
  const e = /* @__PURE__ */ new Set();
  for (const n of t) {
    if (e.has(n))
      throw new b(309, `Directive ${n.type.name} matches multiple times on the same element. Directives can only match an element once.`);
    e.add(n);
  }
}
function Fv(t, e) {
  Ol(t, e), Ol(
    t,
    e + 8
    /* NodeInjectorOffset.PARENT */
  ), X(t[e + 0], "injectorIndex should point to a bloom filter"), X(t[e + 1], "injectorIndex should point to a bloom filter"), X(t[e + 2], "injectorIndex should point to a bloom filter"), X(t[e + 3], "injectorIndex should point to a bloom filter"), X(t[e + 4], "injectorIndex should point to a bloom filter"), X(t[e + 5], "injectorIndex should point to a bloom filter"), X(t[e + 6], "injectorIndex should point to a bloom filter"), X(t[e + 7], "injectorIndex should point to a bloom filter"), X(t[
    e + 8
    /* NodeInjectorOffset.PARENT */
  ], "injectorIndex should point to parent injector");
}
function Uo(t, e) {
  const n = t.hasOwnProperty(bn);
  if (!n && e === !0 && ngDevMode)
    throw new Error(`Type ${Y(t)} does not have 'ɵfac' property.`);
  return n ? t[bn] : null;
}
class Rv {
  constructor(e, n, o) {
    this.previousValue = e, this.currentValue = n, this.firstChange = o;
  }
  /**
   * Check whether the new value is the first value assigned.
   */
  isFirstChange() {
    return this.firstChange;
  }
}
function kv(t, e, n, o) {
  e !== null ? e.applyValueToInputSignal(e, o) : t[n] = o;
}
function Zf() {
  return Pv;
}
function Pv(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = BM), $M;
}
Zf.ngInherit = !0;
function $M() {
  const t = Lv(this), e = t == null ? void 0 : t.current;
  if (e) {
    const n = t.previous;
    if (n === kt)
      t.previous = e;
    else
      for (let o in e)
        n[o] = e[o];
    t.current = null, this.ngOnChanges(e);
  }
}
function BM(t, e, n, o, r) {
  const i = this.declaredInputs[o];
  ngDevMode && zi(i, "Name of input in ngOnChanges has to be a string");
  const s = Lv(t) || jM(t, { previous: kt, current: null }), a = s.current || (s.current = {}), l = s.previous, c = l[i];
  a[i] = new Rv(c && c.currentValue, n, l === kt), kv(t, e, r, n);
}
const Nv = "__ngSimpleChanges__";
function Lv(t) {
  return t[Nv] || null;
}
function jM(t, e) {
  return t[Nv] = e;
}
let Ed = null;
const HM = (t) => {
  Ed = t;
}, Wt = function(t, e, n) {
  Ed != null && Ed(t, e, n);
}, $v = "svg", Bv = "math";
let jv = !1;
function Hv() {
  return jv;
}
function VM(t) {
  jv = t;
}
function se(t) {
  for (; Array.isArray(t); )
    t = t[pe];
  return t;
}
function Qf(t) {
  for (; Array.isArray(t); ) {
    if (typeof t[Gf] == "object")
      return t;
    t = t[pe];
  }
  return null;
}
function Ca(t, e) {
  return ngDevMode && be(e, t), ngDevMode && wn(t, T, "Expected to be past HEADER_OFFSET"), se(e[t]);
}
function Ge(t, e) {
  return ngDevMode && tt(t, e), ngDevMode && be(e, t.index), se(e[t.index]);
}
function UM(t, e) {
  const n = t === null ? -1 : t.index;
  return n !== -1 ? (ngDevMode && tt(t, e), se(e[n])) : null;
}
function ba(t, e) {
  ngDevMode && Jn(e, -1, "wrong index for TNode"), ngDevMode && $n(e, t.data.length, "wrong index for TNode");
  const n = t.data[e];
  return ngDevMode && n !== null && ai(n), n;
}
function Yi(t, e) {
  return ngDevMode && be(t, e), t[e];
}
function vt(t, e) {
  ngDevMode && be(e, t);
  const n = e[t];
  return je(n) ? n : n[pe];
}
function Ea(t) {
  return (t[O] & 4) === 4;
}
function Kf(t) {
  return (t[O] & 128) === 128;
}
function GM(t) {
  return Pe(t[Ce]);
}
function en(t, e) {
  return e == null ? null : (ngDevMode && be(t, e), t[e]);
}
function Vv(t) {
  t[vr] = 0;
}
function WM(t) {
  t[O] & 1024 || (t[O] |= 1024, Kf(t) && Xs(t));
}
function Uv(t, e) {
  for (; t > 0; )
    ngDevMode && S(e[jn], "Declaration view should be defined if nesting level is greater than 0."), e = e[jn], t--;
  return e;
}
function Gv(t) {
  var e;
  return t[O] & 9216 || ((e = t[Ho]) == null ? void 0 : e.dirty);
}
function Id(t) {
  var e;
  Gv(t) ? Xs(t) : t[O] & 64 && (Hv() ? (t[O] |= 1024, Xs(t)) : (e = t[Zt].changeDetectionScheduler) == null || e.notify());
}
function Xs(t) {
  var n;
  (n = t[Zt].changeDetectionScheduler) == null || n.notify();
  let e = Go(t);
  for (; e !== null && !(e[O] & 8192 || (e[O] |= 8192, !Kf(e))); )
    e = Go(e);
}
function wc(t, e) {
  if ((t[O] & 256) === 256)
    throw new b(911, ngDevMode && "View has already been destroyed.");
  t[Ln] === null && (t[Ln] = []), t[Ln].push(e);
}
function Xf(t, e) {
  if (t[Ln] === null)
    return;
  const n = t[Ln].indexOf(e);
  n !== -1 && t[Ln].splice(n, 1);
}
function Go(t) {
  ngDevMode && an(t);
  const e = t[Ce];
  return Pe(e) ? e[Ce] : e;
}
const R = {
  lFrame: oD(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null
};
let Wv = !1;
function zM() {
  return R.lFrame.elementDepthCount;
}
function qM() {
  R.lFrame.elementDepthCount++;
}
function YM() {
  R.lFrame.elementDepthCount--;
}
function zv() {
  return R.bindingsEnabled;
}
function Zi() {
  return R.skipHydrationRootTNode !== null;
}
function ZM(t) {
  return R.skipHydrationRootTNode === t;
}
function qv() {
  R.bindingsEnabled = !0;
}
function QM(t) {
  R.skipHydrationRootTNode = t;
}
function Yv() {
  R.bindingsEnabled = !1;
}
function KM() {
  R.skipHydrationRootTNode = null;
}
function v() {
  return R.lFrame.lView;
}
function N() {
  return R.lFrame.tView;
}
function Zv(t) {
  return R.lFrame.contextLView = t, t[re];
}
function Qv(t) {
  return R.lFrame.contextLView = null, t;
}
function K() {
  let t = Kv();
  for (; t !== null && t.type === 64; )
    t = t.parent;
  return t;
}
function Kv() {
  return R.lFrame.currentTNode;
}
function Js() {
  const t = R.lFrame, e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function tn(t, e) {
  ngDevMode && t && qi(t, R.lFrame.tView);
  const n = R.lFrame;
  n.currentTNode = t, n.isParent = e;
}
function Jf() {
  return R.lFrame.isParent;
}
function eh() {
  R.lFrame.isParent = !1;
}
function XM() {
  const t = R.lFrame.contextLView;
  return ngDevMode && S(t, "contextLView must be defined."), t;
}
function fr() {
  return !ngDevMode && _("Must never be called in production mode"), Wv;
}
function Qg(t) {
  !ngDevMode && _("Must never be called in production mode"), Wv = t;
}
function nt() {
  const t = R.lFrame;
  let e = t.bindingRootIndex;
  return e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
}
function J() {
  return R.lFrame.bindingIndex;
}
function Xv(t) {
  return R.lFrame.bindingIndex = t;
}
function ln() {
  return R.lFrame.bindingIndex++;
}
function Mn(t) {
  const e = R.lFrame, n = e.bindingIndex;
  return e.bindingIndex = e.bindingIndex + t, n;
}
function JM() {
  return R.lFrame.inI18n;
}
function Jv(t) {
  R.lFrame.inI18n = t;
}
function e1(t, e) {
  const n = R.lFrame;
  n.bindingIndex = n.bindingRootIndex = t, Sd(e);
}
function t1() {
  return R.lFrame.currentDirectiveIndex;
}
function Sd(t) {
  R.lFrame.currentDirectiveIndex = t;
}
function th(t) {
  const e = R.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function eD() {
  return R.lFrame.currentQueryIndex;
}
function nh(t) {
  R.lFrame.currentQueryIndex = t;
}
function n1(t) {
  const e = t[E];
  return e.type === 2 ? (ngDevMode && S(e.declTNode, "Embedded TNodes should have declaration parents."), e.declTNode) : e.type === 1 ? t[Ue] : null;
}
function tD(t, e, n) {
  if (ngDevMode && _v(t), n & z.SkipSelf) {
    ngDevMode && qi(e, t[E]);
    let r = e, i = t;
    for (; ngDevMode && S(r, "Parent TNode should be defined"), r = r.parent, r === null && !(n & z.Host); )
      if (r = n1(i), r === null || (ngDevMode && S(i, "Parent LView should be defined"), i = i[jn], r.type & 10))
        break;
    if (r === null)
      return !1;
    e = r, t = i;
  }
  ngDevMode && tt(e, t);
  const o = R.lFrame = nD();
  return o.currentTNode = e, o.lView = t, !0;
}
function oh(t) {
  ngDevMode && Lt(t[0], t[1], "????"), ngDevMode && _v(t);
  const e = nD();
  ngDevMode && (x(e.isParent, !0, "Expected clean LFrame"), x(e.lView, null, "Expected clean LFrame"), x(e.tView, null, "Expected clean LFrame"), x(e.selectedIndex, -1, "Expected clean LFrame"), x(e.elementDepthCount, 0, "Expected clean LFrame"), x(e.currentDirectiveIndex, -1, "Expected clean LFrame"), x(e.currentNamespace, null, "Expected clean LFrame"), x(e.bindingRootIndex, -1, "Expected clean LFrame"), x(e.currentQueryIndex, 0, "Expected clean LFrame"));
  const n = t[E];
  R.lFrame = e, ngDevMode && n.firstChild && qi(n.firstChild, n), e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1;
}
function nD() {
  const t = R.lFrame, e = t === null ? null : t.child;
  return e === null ? oD(t) : e;
}
function oD(t) {
  const e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1
  };
  return t !== null && (t.child = e), e;
}
function rD() {
  const t = R.lFrame;
  return R.lFrame = t.parent, t.currentTNode = null, t.lView = null, t;
}
const iD = rD;
function rh() {
  const t = rD();
  t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0;
}
function o1(t) {
  return (R.lFrame.contextLView = Uv(t, R.lFrame.contextLView))[re];
}
function We() {
  return R.lFrame.selectedIndex;
}
function Wo(t) {
  ngDevMode && t !== -1 && wn(t, T, "Index must be past HEADER_OFFSET (or -1)."), ngDevMode && $n(t, R.lFrame.lView.length, "Can't set index passed end of LView"), R.lFrame.selectedIndex = t;
}
function ce() {
  const t = R.lFrame;
  return ba(t.tView, t.selectedIndex);
}
function sD() {
  R.lFrame.currentNamespace = $v;
}
function aD() {
  R.lFrame.currentNamespace = Bv;
}
function lD() {
  r1();
}
function r1() {
  R.lFrame.currentNamespace = null;
}
function cD() {
  return R.lFrame.currentNamespace;
}
let uD = !0;
function Mc() {
  return uD;
}
function to(t) {
  uD = t;
}
function i1(t, e, n) {
  ngDevMode && ct(n);
  const { ngOnChanges: o, ngOnInit: r, ngDoCheck: i } = e.type.prototype;
  if (o) {
    const s = Pv(e);
    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(t, s), (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(t, s);
  }
  r && (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - t, r), i && ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(t, i), (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(t, i));
}
function Ac(t, e) {
  ngDevMode && ct(t);
  for (let n = e.directiveStart, o = e.directiveEnd; n < o; n++) {
    const r = t.data[n];
    ngDevMode && S(r, "Expecting DirectiveDef");
    const i = r.type.prototype, { ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: l, ngAfterViewChecked: c, ngOnDestroy: u } = i;
    s && (t.contentHooks ?? (t.contentHooks = [])).push(-n, s), a && ((t.contentHooks ?? (t.contentHooks = [])).push(n, a), (t.contentCheckHooks ?? (t.contentCheckHooks = [])).push(n, a)), l && (t.viewHooks ?? (t.viewHooks = [])).push(-n, l), c && ((t.viewHooks ?? (t.viewHooks = [])).push(n, c), (t.viewCheckHooks ?? (t.viewCheckHooks = [])).push(n, c)), u != null && (t.destroyHooks ?? (t.destroyHooks = [])).push(n, u);
  }
}
function dl(t, e, n) {
  dD(t, e, 3, n);
}
function fl(t, e, n, o) {
  ngDevMode && Lt(n, 3, "Init pre-order hooks should not be called more than once"), (t[O] & 3) === n && dD(t, e, n, o);
}
function xu(t, e) {
  ngDevMode && Lt(e, 3, "Init hooks phase should not be incremented after all init hooks have been run.");
  let n = t[O];
  (n & 3) === e && (n &= 16383, n += 1, t[O] = n);
}
function dD(t, e, n, o) {
  ngDevMode && x(fr(), !1, "Hooks should never be run when in check no changes mode.");
  const r = o !== void 0 ? t[vr] & 65535 : 0, i = o ?? -1, s = e.length - 1;
  let a = 0;
  for (let l = r; l < s; l++)
    if (typeof e[l + 1] == "number") {
      if (a = e[l], o != null && a >= o)
        break;
    } else
      e[l] < 0 && (t[vr] += 65536), (a < i || i == -1) && (s1(t, n, e, l), t[vr] = (t[vr] & 4294901760) + l + 2), l++;
}
function Kg(t, e) {
  Wt(4, t, e);
  const n = De(null);
  try {
    e.call(t);
  } finally {
    De(n), Wt(5, t, e);
  }
}
function s1(t, e, n, o) {
  const r = n[o] < 0, i = n[o + 1], s = r ? -n[o] : n[o], a = t[s];
  r ? t[O] >> 14 < t[vr] >> 16 && (t[O] & 3) === e && (t[O] += 16384, Kg(a, i)) : Kg(a, i);
}
const ti = -1;
class Ia {
  constructor(e, n, o) {
    this.factory = e, this.resolving = !1, ngDevMode && S(e, "Factory not specified"), ngDevMode && x(typeof e, "function", "Expected factory function."), this.canSeeViewProviders = n, this.injectImpl = o;
  }
}
function a1(t) {
  return t instanceof Ia;
}
function wd(t) {
  let e = "";
  return t & 1 && (e += "|Text"), t & 2 && (e += "|Element"), t & 4 && (e += "|Container"), t & 8 && (e += "|ElementContainer"), t & 16 && (e += "|Projection"), t & 32 && (e += "|IcuContainer"), t & 64 && (e += "|Placeholder"), e.length > 0 ? e.substring(1) : e;
}
function l1(t) {
  return t != null && typeof t == "object" && (t.insertBeforeIndex === null || typeof t.insertBeforeIndex == "number" || Array.isArray(t.insertBeforeIndex));
}
function c1(t) {
  return (t.flags & 8) !== 0;
}
function u1(t) {
  return (t.flags & 16) !== 0;
}
function He(t, e, n) {
  S(t, "should be called with a TNode"), t.type & e || _(n || `Expected [${wd(e)}] but got ${wd(t.type)}.`);
}
function d1(t) {
  t === 2 || //
  t === 1 || //
  t === 4 || //
  t === 8 || //
  t === 32 || //
  t === 16 || //
  t === 64 || _(`Expected TNodeType to have only a single type selected, but got ${wd(t)}.`);
}
function ih(t) {
  return t !== ti;
}
function ea(t) {
  if (ngDevMode) {
    X(t, "Number expected"), Lt(t, -1, "Not a valid state.");
    const e = t & 32767;
    Jn(e, T, "Parent injector must be pointing past HEADER_OFFSET.");
  }
  return t & 32767;
}
function f1(t) {
  return t >> 16;
}
function ta(t, e) {
  let n = f1(t), o = e;
  for (; n > 0; )
    o = o[jn], n--;
  return o;
}
let Md = !0;
function Fl(t) {
  const e = Md;
  return Md = t, e;
}
const h1 = 256, fD = h1 - 1, hD = 5;
let p1 = 0;
const zt = {};
function g1(t, e, n) {
  ngDevMode && x(e.firstCreatePass, !0, "expected firstCreatePass to be true");
  let o;
  typeof n == "string" ? o = n.charCodeAt(0) || 0 : n.hasOwnProperty(Xr) && (o = n[Xr]), o == null && (o = n[Xr] = p1++);
  const r = o & fD, i = 1 << r;
  e.data[t + (r >> hD)] |= i;
}
function Rl(t, e) {
  const n = pD(t, e);
  if (n !== -1)
    return n;
  const o = e[E];
  o.firstCreatePass && (t.injectorIndex = e.length, Ou(o.data, t), Ou(e, null), Ou(o.blueprint, null));
  const r = _c(t, e), i = t.injectorIndex;
  if (ih(r)) {
    const s = ea(r), a = ta(r, e), l = a[E].data;
    for (let c = 0; c < 8; c++)
      e[i + c] = a[s + c] | l[s + c];
  }
  return e[
    i + 8
    /* NodeInjectorOffset.PARENT */
  ] = r, i;
}
function Ou(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function pD(t, e) {
  return t.injectorIndex === -1 || // If the injector index is the same as its parent's injector index, then the index has been
  // copied down from the parent node. No injector has been created yet on this node.
  t.parent && t.parent.injectorIndex === t.injectorIndex || // After the first template pass, the injector index might exist but the parent values
  // might not have been calculated yet for this instance
  e[
    t.injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ] === null ? -1 : (ngDevMode && be(e, t.injectorIndex), t.injectorIndex);
}
function _c(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1)
    return t.parent.injectorIndex;
  let n = 0, o = null, r = e;
  for (; r !== null; ) {
    if (o = CD(r), o === null)
      return ti;
    if (ngDevMode && o && tt(o, r[jn]), n++, r = r[jn], o.injectorIndex !== -1)
      return o.injectorIndex | n << 16;
  }
  return ti;
}
function Ad(t, e, n) {
  g1(t, e, n);
}
function m1(t, e) {
  if (ngDevMode && He(
    t,
    15
    /* TNodeType.AnyRNode */
  ), ngDevMode && S(t, "expecting tNode"), e === "class")
    return t.classes;
  if (e === "style")
    return t.styles;
  const n = t.attrs;
  if (n) {
    const o = n.length;
    let r = 0;
    for (; r < o; ) {
      const i = n[r];
      if (gv(i))
        break;
      if (i === 0)
        r = r + 2;
      else if (typeof i == "number")
        for (r++; r < o && typeof n[r] == "string"; )
          r++;
      else {
        if (i === e)
          return n[r + 1];
        r = r + 2;
      }
    }
  }
  return null;
}
function gD(t, e, n) {
  if (n & z.Optional || t !== void 0)
    return t;
  $f(e, "NodeInjector");
}
function mD(t, e, n, o) {
  if (n & z.Optional && o === void 0 && (o = null), !(n & (z.Self | z.Host))) {
    const r = t[Je], i = it(void 0);
    try {
      return r ? r.get(e, o, n & z.Optional) : fv(e, o, n & z.Optional);
    } finally {
      it(i);
    }
  }
  return gD(o, e, n);
}
function yD(t, e, n, o = z.Default, r) {
  if (t !== null) {
    if (e[O] & 2048 && // The token must be present on the current node injector when the `Self`
    // flag is set, so the lookup on embedded view injector(s) can be skipped.
    !(o & z.Self)) {
      const s = C1(t, e, n, o, zt);
      if (s !== zt)
        return s;
    }
    const i = vD(t, e, n, o, zt);
    if (i !== zt)
      return i;
  }
  return mD(e, n, o, r);
}
function vD(t, e, n, o, r) {
  const i = v1(n);
  if (typeof i == "function") {
    if (!tD(e, t, o))
      return o & z.Host ? gD(r, n, o) : mD(e, n, o, r);
    try {
      let s;
      if (ngDevMode ? Ms(new fe(K(), v()), n, () => {
        s = i(o), s != null && Ml(s);
      }) : s = i(o), s == null && !(o & z.Optional))
        $f(n);
      else
        return s;
    } finally {
      iD();
    }
  } else if (typeof i == "number") {
    let s = null, a = pD(t, e), l = ti, c = o & z.Host ? e[ge][Ue] : null;
    for ((a === -1 || o & z.SkipSelf) && (l = a === -1 ? _c(t, e) : e[
      a + 8
      /* NodeInjectorOffset.PARENT */
    ], l === ti || !Jg(o, !1) ? a = -1 : (s = e[E], a = ea(l), e = ta(l, e))); a !== -1; ) {
      ngDevMode && Fv(e, a);
      const u = e[E];
      if (ngDevMode && tt(u.data[
        a + 8
        /* NodeInjectorOffset.TNODE */
      ], e), Xg(i, a, u.data)) {
        const d = y1(a, e, n, s, o, c);
        if (d !== zt)
          return d;
      }
      l = e[
        a + 8
        /* NodeInjectorOffset.PARENT */
      ], l !== ti && Jg(o, e[E].data[
        a + 8
        /* NodeInjectorOffset.TNODE */
      ] === c) && Xg(i, a, e) ? (s = u, a = ea(l), e = ta(l, e)) : a = -1;
    }
  }
  return r;
}
function y1(t, e, n, o, r, i) {
  const s = e[E], a = s.data[
    t + 8
    /* NodeInjectorOffset.TNODE */
  ], l = o == null ? (
    // 1) This is the first invocation `previousTView == null` which means that we are at the
    // `TNode` of where injector is starting to look. In such a case the only time we are allowed
    // to look into the ViewProviders is if:
    // - we are on a component
    // - AND the injector set `includeViewProviders` to true (implying that the token can see
    // ViewProviders because it is the Component or a Service which itself was declared in
    // ViewProviders)
    eo(a) && Md
  ) : (
    // 2) `previousTView != null` which means that we are now walking across the parent nodes.
    // In such a case we are only allowed to look into the ViewProviders if:
    // - We just crossed from child View to Parent View `previousTView != currentTView`
    // - AND the parent TNode is an Element.
    // This means that we just came from the Component's View and therefore are allowed to see
    // into the ViewProviders.
    o != s && (a.type & 3) !== 0
  ), c = r & z.Host && i === a, u = hl(a, s, n, l, c);
  return u !== null ? zo(e, s, u, a) : zt;
}
function hl(t, e, n, o, r) {
  const i = t.providerIndexes, s = e.data, a = i & 1048575, l = t.directiveStart, c = t.directiveEnd, u = i >> 20, d = o ? a : a + u, f = r ? a + u : c;
  for (let h = d; h < f; h++) {
    const p = s[h];
    if (h < l && n === p || h >= l && p.type === n)
      return h;
  }
  if (r) {
    const h = s[l];
    if (h && wt(h) && h.type === n)
      return l;
  }
  return null;
}
function zo(t, e, n, o) {
  let r = t[n];
  const i = e.data;
  if (a1(r)) {
    const s = r;
    s.resolving && Lf(G(i[n]));
    const a = Fl(s.canSeeViewProviders);
    s.resolving = !0;
    let l;
    if (ngDevMode) {
      const d = i[n].type || i[n], f = new fe(o, t);
      l = Qe({ injector: f, token: d });
    }
    const c = s.injectImpl ? it(s.injectImpl) : null, u = tD(t, o, z.Default);
    ngDevMode && x(u, !0, "Because flags do not contain `SkipSelf' we expect this to always succeed.");
    try {
      r = t[n] = s.factory(void 0, i, t, o), ngDevMode && Ml(r), e.firstCreatePass && n >= o.directiveStart && (ngDevMode && NM(i[n]), i1(n, i[n], e));
    } finally {
      ngDevMode && Qe(l), c !== null && it(c), Fl(a), s.resolving = !1, iD();
    }
  }
  return r;
}
function v1(t) {
  if (ngDevMode && S(t, "token must be defined"), typeof t == "string")
    return t.charCodeAt(0) || 0;
  const e = (
    // First check with `hasOwnProperty` so we don't get an inherited ID.
    t.hasOwnProperty(Xr) ? t[Xr] : void 0
  );
  return typeof e == "number" ? e >= 0 ? e & fD : (ngDevMode && x(e, -1, "Expecting to get Special Injector Id"), D1) : e;
}
function Xg(t, e, n) {
  const o = 1 << t;
  return !!(n[e + (t >> hD)] & o);
}
function Jg(t, e) {
  return !(t & z.Self) && !(t & z.Host && e);
}
function Qi(t) {
  return t._lView;
}
function Ki(t) {
  return t._tNode;
}
class fe {
  constructor(e, n) {
    this._tNode = e, this._lView = n;
  }
  get(e, n, o) {
    return yD(this._tNode, this._lView, e, ma(o), n);
  }
}
function D1() {
  return new fe(K(), v());
}
function DD(t) {
  return sn(() => {
    const e = t.prototype.constructor, n = e[bn] || _d(e), o = Object.prototype;
    let r = Object.getPrototypeOf(t.prototype).constructor;
    for (; r && r !== o; ) {
      const i = r[bn] || _d(r);
      if (i && i !== n)
        return i;
      r = Object.getPrototypeOf(r);
    }
    return (i) => new i();
  });
}
function _d(t) {
  return Cc(t) ? () => {
    const e = _d(k(t));
    return e && e();
  } : Uo(t);
}
function C1(t, e, n, o, r) {
  let i = t, s = e;
  for (; i !== null && s !== null && s[O] & 2048 && !(s[O] & 512); ) {
    ngDevMode && tt(i, s);
    const a = vD(i, s, n, o | z.Self, zt);
    if (a !== zt)
      return a;
    let l = i.parent;
    if (!l) {
      const c = s[Mv];
      if (c) {
        const u = c.get(n, zt, o);
        if (u !== zt)
          return u;
      }
      l = CD(s), s = s[jn];
    }
    i = l;
  }
  return r;
}
function CD(t) {
  const e = t[E], n = e.type;
  return n === 2 ? (ngDevMode && S(e.declTNode, "Embedded TNodes should have declaration parents."), e.declTNode) : n === 1 ? t[Ue] : null;
}
function sh(t) {
  return m1(K(), t);
}
const Dr = "__annotations__", Cr = "__parameters__", br = "__prop__metadata__";
function Sa(t, e, n, o, r) {
  return sn(() => {
    const i = ah(e);
    function s(...a) {
      if (this instanceof s)
        return i.call(this, ...a), this;
      const l = new s(...a);
      return function(u) {
        return r && r(u, ...a), (u.hasOwnProperty(Dr) ? u[Dr] : Object.defineProperty(u, Dr, { value: [] })[Dr]).push(l), o && o(u), u;
      };
    }
    return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = t, s.annotationCls = s, s;
  });
}
function ah(t) {
  return function(...n) {
    if (t) {
      const o = t(...n);
      for (const r in o)
        this[r] = o[r];
    }
  };
}
function Xi(t, e, n) {
  return sn(() => {
    const o = ah(e);
    function r(...i) {
      if (this instanceof r)
        return o.apply(this, i), this;
      const s = new r(...i);
      return a.annotation = s, a;
      function a(l, c, u) {
        const d = l.hasOwnProperty(Cr) ? l[Cr] : Object.defineProperty(l, Cr, { value: [] })[Cr];
        for (; d.length <= u; )
          d.push(null);
        return (d[u] = d[u] || []).push(s), l;
      }
    }
    return n && (r.prototype = Object.create(n.prototype)), r.prototype.ngMetadataName = t, r.annotationCls = r, r;
  });
}
function no(t, e, n, o) {
  return sn(() => {
    const r = ah(e);
    function i(...s) {
      if (this instanceof i)
        return r.apply(this, s), this;
      const a = new i(...s);
      function l(c, u) {
        if (c === void 0)
          throw new Error("Standard Angular field decorators are not supported in JIT mode.");
        const d = c.constructor, f = d.hasOwnProperty(br) ? d[br] : Object.defineProperty(d, br, { value: {} })[br];
        f[u] = f.hasOwnProperty(u) && f[u] || [], f[u].unshift(a), o && o(c, u, ...s);
      }
      return l;
    }
    return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = t, i.annotationCls = i, i;
  });
}
const lh = Xi("Attribute", (t) => ({ attributeName: t, __NG_ELEMENT_ID__: () => sh(t) })), bD = !0;
class wa {
}
const b1 = no("ContentChildren", (t, e = {}) => ({
  selector: t,
  first: !1,
  isViewQuery: !1,
  descendants: !1,
  emitDistinctChangesOnly: bD,
  ...e
}), wa), E1 = no("ContentChild", (t, e = {}) => ({ selector: t, first: !0, isViewQuery: !1, descendants: !0, ...e }), wa), I1 = no("ViewChildren", (t, e = {}) => ({
  selector: t,
  first: !1,
  isViewQuery: !0,
  descendants: !0,
  emitDistinctChangesOnly: bD,
  ...e
}), wa), S1 = no("ViewChild", (t, e) => ({ selector: t, first: !0, isViewQuery: !0, descendants: !0, ...e }), wa);
var $;
(function(t) {
  t[t.Directive = 0] = "Directive", t[t.Component = 1] = "Component", t[t.Injectable = 2] = "Injectable", t[t.Pipe = 3] = "Pipe", t[t.NgModule = 4] = "NgModule";
})($ || ($ = {}));
var em;
(function(t) {
  t[t.Directive = 0] = "Directive", t[t.Pipe = 1] = "Pipe", t[t.NgModule = 2] = "NgModule";
})(em || (em = {}));
var tm;
(function(t) {
  t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom";
})(tm || (tm = {}));
function Te(t) {
  const e = xe.ng;
  if (e && e.ɵcompilerFacade)
    return e.ɵcompilerFacade;
  if (typeof ngDevMode > "u" || ngDevMode) {
    console.error(`JIT compilation failed for ${t.kind}`, t.type);
    let n = `The ${t.kind} '${t.type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.

`;
    throw t.usage === 1 ? (n += `The ${t.kind} is part of a library that has been partially compiled.
`, n += `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.
`, n += `
`, n += `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.
`) : n += `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.
`, n += `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',
`, n += `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`, new Error(n);
  } else
    throw new Error("JIT compiler unavailable");
}
const ED = Function;
function Ds(t) {
  return typeof t == "function";
}
function w1(t, e, n) {
  if (t.length !== e.length)
    return !1;
  for (let o = 0; o < t.length; o++) {
    let r = t[o], i = e[o];
    if (n && (r = n(r), i = n(i)), i !== r)
      return !1;
  }
  return !0;
}
function st(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function li(t, e) {
  t.forEach((n) => Array.isArray(n) ? li(n, e) : e(n));
}
function ID(t, e, n) {
  e >= t.length ? t.push(n) : t.splice(e, 0, n);
}
function kl(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function As(t, e) {
  const n = [];
  for (let o = 0; o < t; o++)
    n.push(e);
  return n;
}
function nm(t, e, n) {
  const o = t.length - n;
  for (; e < o; )
    t[e] = t[e + n], e++;
  for (; n--; )
    t.pop();
}
function SD(t, e, n, o) {
  ngDevMode && cv(e, t.length, "Can't insert past array end.");
  let r = t.length;
  if (r == e)
    t.push(n, o);
  else if (r === 1)
    t.push(o, t[0]), t[0] = n;
  else {
    for (r--, t.push(t[r - 1], t[r]); r > e; ) {
      const i = r - 2;
      t[r] = t[i], r--;
    }
    t[e] = n, t[e + 1] = o;
  }
}
function Dt(t, e, n) {
  let o = Ma(t, e);
  return o >= 0 ? t[o | 1] = n : (o = ~o, SD(t, o, e, n)), o;
}
function Fu(t, e) {
  const n = Ma(t, e);
  if (n >= 0)
    return t[n | 1];
}
function Ma(t, e) {
  return M1(t, e, 1);
}
function M1(t, e, n) {
  ngDevMode && x(Array.isArray(t), !0, "Expecting an array");
  let o = 0, r = t.length >> n;
  for (; r !== o; ) {
    const i = o + (r - o >> 1), s = t[i << n];
    if (e === s)
      return i << n;
    s > e ? r = i : o = i + 1;
  }
  return ~(r << n);
}
const A1 = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*(arguments|(?:[^()]+\(\[\],)?[^()]+\(arguments\).*)\)/, _1 = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/, T1 = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/, x1 = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{[^}]*super\(\.\.\.arguments\)/;
function O1(t) {
  return A1.test(t) || x1.test(t) || _1.test(t) && !T1.test(t);
}
class wD {
  constructor(e) {
    this._reflect = e || xe.Reflect;
  }
  factory(e) {
    return (...n) => new e(...n);
  }
  /** @internal */
  _zipTypesAndAnnotations(e, n) {
    let o;
    typeof e > "u" ? o = As(n.length) : o = As(e.length);
    for (let r = 0; r < o.length; r++)
      typeof e > "u" ? o[r] = [] : e[r] && e[r] != Object ? o[r] = [e[r]] : o[r] = [], n && n[r] != null && (o[r] = o[r].concat(n[r]));
    return o;
  }
  _ownParameters(e, n) {
    const o = e.toString();
    if (O1(o))
      return null;
    if (e.parameters && e.parameters !== n.parameters)
      return e.parameters;
    const r = e.ctorParameters;
    if (r && r !== n.ctorParameters) {
      const a = typeof r == "function" ? r() : r, l = a.map((u) => u && u.type), c = a.map((u) => u && Ru(u.decorators));
      return this._zipTypesAndAnnotations(l, c);
    }
    const i = e.hasOwnProperty(Cr) && e[Cr], s = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", e);
    return s || i ? this._zipTypesAndAnnotations(s, i) : As(e.length);
  }
  parameters(e) {
    if (!Ds(e))
      return [];
    const n = za(e);
    let o = this._ownParameters(e, n);
    return !o && n !== Object && (o = this.parameters(n)), o || [];
  }
  _ownAnnotations(e, n) {
    if (e.annotations && e.annotations !== n.annotations) {
      let o = e.annotations;
      return typeof o == "function" && o.annotations && (o = o.annotations), o;
    }
    return e.decorators && e.decorators !== n.decorators ? Ru(e.decorators) : e.hasOwnProperty(Dr) ? e[Dr] : null;
  }
  annotations(e) {
    if (!Ds(e))
      return [];
    const n = za(e), o = this._ownAnnotations(e, n) || [];
    return (n !== Object ? this.annotations(n) : []).concat(o);
  }
  _ownPropMetadata(e, n) {
    if (e.propMetadata && e.propMetadata !== n.propMetadata) {
      let o = e.propMetadata;
      return typeof o == "function" && o.propMetadata && (o = o.propMetadata), o;
    }
    if (e.propDecorators && e.propDecorators !== n.propDecorators) {
      const o = e.propDecorators, r = {};
      return Object.keys(o).forEach((i) => {
        r[i] = Ru(o[i]);
      }), r;
    }
    return e.hasOwnProperty(br) ? e[br] : null;
  }
  propMetadata(e) {
    if (!Ds(e))
      return {};
    const n = za(e), o = {};
    if (n !== Object) {
      const i = this.propMetadata(n);
      Object.keys(i).forEach((s) => {
        o[s] = i[s];
      });
    }
    const r = this._ownPropMetadata(e, n);
    return r && Object.keys(r).forEach((i) => {
      const s = [];
      o.hasOwnProperty(i) && s.push(...o[i]), s.push(...r[i]), o[i] = s;
    }), o;
  }
  ownPropMetadata(e) {
    return Ds(e) ? this._ownPropMetadata(e, za(e)) || {} : {};
  }
  hasLifecycleHook(e, n) {
    return e instanceof ED && n in e.prototype;
  }
}
function Ru(t) {
  return t ? t.map((e) => {
    const o = e.type.annotationCls, r = e.args ? e.args : [];
    return new o(...r);
  }) : [];
}
function za(t) {
  const e = t.prototype ? Object.getPrototypeOf(t.prototype) : null;
  return (e ? e.constructor : null) || Object;
}
const mt = ya(
  // Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  Xi("Inject", (t) => ({ token: t })),
  -1
  /* DecoratorFlags.Inject */
), nn = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ya(
    Xi("Optional"),
    8
    /* InternalInjectFlags.Optional */
  )
), MD = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ya(
    Xi("Self"),
    2
    /* InternalInjectFlags.Self */
  )
), Tc = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ya(
    Xi("SkipSelf"),
    4
    /* InternalInjectFlags.SkipSelf */
  )
), Aa = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ya(
    Xi("Host"),
    1
    /* InternalInjectFlags.Host */
  )
);
let om = null;
function ch() {
  return om = om || new wD();
}
function xc(t) {
  return AD(ch().parameters(t));
}
function AD(t) {
  return t.map((e) => F1(e));
}
function F1(t) {
  const e = {
    token: null,
    attribute: null,
    host: !1,
    optional: !1,
    self: !1,
    skipSelf: !1
  };
  if (Array.isArray(t) && t.length > 0)
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      if (o === void 0)
        continue;
      const r = Object.getPrototypeOf(o);
      if (o instanceof nn || r.ngMetadataName === "Optional")
        e.optional = !0;
      else if (o instanceof Tc || r.ngMetadataName === "SkipSelf")
        e.skipSelf = !0;
      else if (o instanceof MD || r.ngMetadataName === "Self")
        e.self = !0;
      else if (o instanceof Aa || r.ngMetadataName === "Host")
        e.host = !0;
      else if (o instanceof mt)
        e.token = o.token;
      else if (o instanceof lh) {
        if (o.attributeName === void 0)
          throw new b(204, ngDevMode && "Attribute name must be defined.");
        e.attribute = o.attributeName;
      } else
        e.token = o;
    }
  else
    t === void 0 || Array.isArray(t) && t.length === 0 ? e.token = null : e.token = t;
  return e;
}
function _D(t) {
  const e = [], n = /* @__PURE__ */ new Map();
  function o(r) {
    let i = n.get(r);
    if (!i) {
      const s = t(r);
      n.set(r, i = s.then(L1));
    }
    return i;
  }
  return ci.forEach((r, i) => {
    var c, u;
    const s = [];
    r.templateUrl && s.push(o(r.templateUrl).then((d) => {
      r.template = d;
    }));
    const a = typeof r.styles == "string" ? [r.styles] : r.styles || [];
    if (r.styles = a, r.styleUrl && ((c = r.styleUrls) != null && c.length))
      throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
    if ((u = r.styleUrls) != null && u.length) {
      const d = r.styles.length, f = r.styleUrls;
      r.styleUrls.forEach((h, p) => {
        a.push(""), s.push(o(h).then((g) => {
          a[d + p] = g, f.splice(f.indexOf(h), 1), f.length == 0 && (r.styleUrls = void 0);
        }));
      });
    } else
      r.styleUrl && s.push(o(r.styleUrl).then((d) => {
        a.push(d), r.styleUrl = void 0;
      }));
    const l = Promise.all(s).then(() => $1(i));
    e.push(l);
  }), xD(), Promise.all(e).then(() => {
  });
}
let ci = /* @__PURE__ */ new Map();
const na = /* @__PURE__ */ new Set();
function R1(t, e) {
  TD(e) && (ci.set(t, e), na.add(t));
}
function k1(t) {
  return na.has(t);
}
function TD(t) {
  return !!(t.templateUrl && !t.hasOwnProperty("template") || t.styleUrls && t.styleUrls.length || t.styleUrl);
}
function xD() {
  const t = ci;
  return ci = /* @__PURE__ */ new Map(), t;
}
function P1(t) {
  na.clear(), t.forEach((e, n) => na.add(n)), ci = t;
}
function N1() {
  return ci.size === 0;
}
function L1(t) {
  return typeof t == "string" ? t : t.text();
}
function $1(t) {
  na.delete(t);
}
const qo = new j("ENVIRONMENT_INITIALIZER"), uh = new j(
  "INJECTOR",
  // Disable tslint because this is const enum which gets inlined not top level prop access.
  // tslint:disable-next-line: no-toplevel-property-access
  -1
  /* InjectorMarkers.Injector */
), dh = new j("INJECTOR_DEF_TYPES");
class Oc {
  get(e, n = Ys) {
    if (n === Ys) {
      const o = new Error(`NullInjectorError: No provider for ${Y(e)}!`);
      throw o.name = "NullInjectorError", o;
    }
    return n;
  }
}
function Fc(t) {
  return {
    ɵproviders: t
  };
}
function OD(...t) {
  return {
    ɵproviders: FD(!0, t),
    ɵfromNgModule: !0
  };
}
function FD(t, ...e) {
  const n = [], o = /* @__PURE__ */ new Set();
  let r;
  const i = (s) => {
    n.push(s);
  };
  return li(e, (s) => {
    if ((typeof ngDevMode > "u" || ngDevMode) && t) {
      const l = H(s);
      if (l != null && l.standalone)
        throw new b(800, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${G(s)}"`);
    }
    const a = s;
    Pl(a, i, [], o) && (r || (r = []), r.push(a));
  }), r !== void 0 && RD(r, i), n;
}
function RD(t, e) {
  for (let n = 0; n < t.length; n++) {
    const { ngModule: o, providers: r } = t[n];
    fh(r, (i) => {
      ngDevMode && kD(i, r || q, o), e(i, o);
    });
  }
}
function Pl(t, e, n, o) {
  if (t = k(t), !t)
    return !1;
  let r = null, i = Il(t);
  const s = !i && H(t);
  if (!i && !s) {
    const l = t.ngModule;
    if (i = Il(l), i)
      r = l;
    else
      return !1;
  } else {
    if (s && !s.standalone)
      return !1;
    r = t;
  }
  if (ngDevMode && n.indexOf(r) !== -1) {
    const l = Y(r), c = n.map(Y);
    Lf(l, c);
  }
  const a = o.has(r);
  if (s) {
    if (a)
      return !1;
    if (o.add(r), s.dependencies) {
      const l = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (const c of l)
        Pl(c, e, n, o);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      ngDevMode && n.push(r), o.add(r);
      let c;
      try {
        li(i.imports, (u) => {
          Pl(u, e, n, o) && (c || (c = []), c.push(u));
        });
      } finally {
        ngDevMode && n.pop();
      }
      c !== void 0 && RD(c, e);
    }
    if (!a) {
      const c = Uo(r) || (() => new r());
      e({ provide: r, useFactory: c, deps: q }, r), e({ provide: dh, useValue: r, multi: !0 }, r), e({ provide: qo, useValue: () => Re(r), multi: !0 }, r);
    }
    const l = i.providers;
    if (l != null && !a) {
      const c = t;
      fh(l, (u) => {
        ngDevMode && kD(u, l, c), e(u, c);
      });
    }
  } else
    return !1;
  return r !== t && t.providers !== void 0;
}
function kD(t, e, n) {
  if (Yo(t) || Rc(t) || ND(t) || PD(t))
    return;
  k(t && (t.useClass || t.provide)) || pd(n, e, t);
}
function fh(t, e) {
  for (let n of t)
    pa(n) && (n = n.ɵproviders), Array.isArray(n) ? fh(n, e) : e(n);
}
const B1 = ee({ provide: String, useValue: ee });
function Rc(t) {
  return t !== null && typeof t == "object" && B1 in t;
}
function PD(t) {
  return !!(t && t.useExisting);
}
function ND(t) {
  return !!(t && t.useFactory);
}
function Yo(t) {
  return typeof t == "function";
}
function j1(t) {
  return !!t.useClass;
}
const hh = new j("Set Injector scope."), pl = {}, rm = {};
let ku;
function kc() {
  return ku === void 0 && (ku = new Oc()), ku;
}
class on {
}
class Ji extends on {
  /**
   * Flag indicating that this injector was previously destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  constructor(e, n, o, r) {
    super(), this.parent = n, this.source = o, this.scopes = r, this.records = /* @__PURE__ */ new Map(), this._ngOnDestroyHooks = /* @__PURE__ */ new Set(), this._onDestroyHooks = [], this._destroyed = !1, xd(e, (s) => this.processProvider(s)), this.records.set(uh, Er(void 0, this)), r.has("environment") && this.records.set(on, Er(void 0, this));
    const i = this.records.get(hh);
    i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(dh, q, z.Self));
  }
  /**
   * Destroy the injector and release references to every instance or provider associated with it.
   *
   * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
   * hook was found.
   */
  destroy() {
    this.assertNotDestroyed(), this._destroyed = !0;
    try {
      for (const n of this._ngOnDestroyHooks)
        n.ngOnDestroy();
      const e = this._onDestroyHooks;
      this._onDestroyHooks = [];
      for (const n of e)
        n();
    } finally {
      this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
    }
  }
  onDestroy(e) {
    return this.assertNotDestroyed(), this._onDestroyHooks.push(e), () => this.removeOnDestroy(e);
  }
  runInContext(e) {
    this.assertNotDestroyed();
    const n = pn(this), o = it(void 0);
    let r;
    ngDevMode && (r = Qe({ injector: this, token: null }));
    try {
      return e();
    } finally {
      pn(n), it(o), ngDevMode && Qe(r);
    }
  }
  get(e, n = Ys, o = z.Default) {
    if (this.assertNotDestroyed(), e.hasOwnProperty(Vg))
      return e[Vg](this);
    o = ma(o);
    let r;
    ngDevMode && (r = Qe({ injector: this, token: e }));
    const i = pn(this), s = it(void 0);
    try {
      if (!(o & z.SkipSelf)) {
        let l = this.records.get(e);
        if (l === void 0) {
          const c = W1(e) && ga(e);
          c && this.injectableDefInScope(c) ? (ngDevMode && Ms(this, e, () => {
            yd(e);
          }), l = Er(Td(e), pl)) : l = null, this.records.set(e, l);
        }
        if (l != null)
          return this.hydrate(e, l);
      }
      const a = o & z.Self ? kc() : this.parent;
      return n = o & z.Optional && n === Ys ? null : n, a.get(e, n);
    } catch (a) {
      if (a.name === "NullInjectorError") {
        if ((a[Al] = a[Al] || []).unshift(Y(e)), i)
          throw a;
        return yM(a, e, "R3InjectorError", this.source);
      } else
        throw a;
    } finally {
      it(s), pn(i), ngDevMode && Qe(r);
    }
  }
  /** @internal */
  resolveInjectorInitializers() {
    const e = pn(this), n = it(void 0);
    let o;
    ngDevMode && (o = Qe({ injector: this, token: null }));
    try {
      const r = this.get(qo, q, z.Self);
      if (ngDevMode && !Array.isArray(r))
        throw new b(-209, `Unexpected type of the \`ENVIRONMENT_INITIALIZER\` token value (expected an array, but got ${typeof r}). Please check that the \`ENVIRONMENT_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
      for (const i of r)
        i();
    } finally {
      pn(e), it(n), ngDevMode && Qe(o);
    }
  }
  toString() {
    const e = [], n = this.records;
    for (const o of n.keys())
      e.push(Y(o));
    return `R3Injector[${e.join(", ")}]`;
  }
  assertNotDestroyed() {
    if (this._destroyed)
      throw new b(205, ngDevMode && "Injector has already been destroyed.");
  }
  /**
   * Process a `SingleProvider` and add it.
   */
  processProvider(e) {
    e = k(e);
    let n = Yo(e) ? e : k(e && e.provide);
    const o = V1(e);
    if (ngDevMode && Ms(this, n, () => {
      Rc(e) && Ml(e.useValue), yd(e);
    }), !Yo(e) && e.multi === !0) {
      let r = this.records.get(n);
      r ? ngDevMode && r.multi === void 0 && Ug() : (r = Er(void 0, pl, !0), r.factory = () => Dd(r.multi), this.records.set(n, r)), n = e, r.multi.push(e);
    } else if (ngDevMode) {
      const r = this.records.get(n);
      r && r.multi !== void 0 && Ug();
    }
    this.records.set(n, o);
  }
  hydrate(e, n) {
    return ngDevMode && n.value === rm ? Lf(Y(e)) : n.value === pl && (n.value = rm, ngDevMode ? Ms(this, e, () => {
      n.value = n.factory(), Ml(n.value);
    }) : n.value = n.factory()), typeof n.value == "object" && n.value && G1(n.value) && this._ngOnDestroyHooks.add(n.value), n.value;
  }
  injectableDefInScope(e) {
    if (!e.providedIn)
      return !1;
    const n = k(e.providedIn);
    return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n);
  }
  removeOnDestroy(e) {
    const n = this._onDestroyHooks.indexOf(e);
    n !== -1 && this._onDestroyHooks.splice(n, 1);
  }
}
function Td(t) {
  const e = ga(t), n = e !== null ? e.factory : Uo(t);
  if (n !== null)
    return n;
  if (t instanceof j)
    throw new b(204, ngDevMode && `Token ${Y(t)} is missing a ɵprov definition.`);
  if (t instanceof Function)
    return H1(t);
  throw new b(204, ngDevMode && "unreachable");
}
function H1(t) {
  const e = t.length;
  if (e > 0)
    throw new b(204, ngDevMode && `Can't resolve all parameters for ${Y(t)}: (${As(e, "?").join(", ")}).`);
  const n = iM(t);
  return n !== null ? () => n.factory(t) : () => new t();
}
function V1(t) {
  if (Rc(t))
    return Er(void 0, t.useValue);
  {
    const e = LD(t);
    return Er(e, pl);
  }
}
function LD(t, e, n) {
  let o;
  if (ngDevMode && pa(t) && pd(void 0, n, t), Yo(t)) {
    const r = k(t);
    return Uo(r) || Td(r);
  } else if (Rc(t))
    o = () => k(t.useValue);
  else if (ND(t))
    o = () => t.useFactory(...Dd(t.deps || []));
  else if (PD(t))
    o = () => Re(k(t.useExisting));
  else {
    const r = k(t && (t.useClass || t.provide));
    if (ngDevMode && !r && pd(e, n, t), U1(t))
      o = () => new r(...Dd(t.deps));
    else
      return Uo(r) || Td(r);
  }
  return o;
}
function Er(t, e, n = !1) {
  return {
    factory: t,
    value: e,
    multi: n ? [] : void 0
  };
}
function U1(t) {
  return !!t.deps;
}
function G1(t) {
  return t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function";
}
function W1(t) {
  return typeof t == "function" || typeof t == "object" && t instanceof j;
}
function xd(t, e) {
  for (const n of t)
    Array.isArray(n) ? xd(n, e) : n && pa(n) ? xd(n.ɵproviders, e) : e(n);
}
function z1(t, e) {
  t instanceof Ji && t.assertNotDestroyed();
  let n;
  ngDevMode && (n = Qe({ injector: t, token: null }));
  const o = pn(t), r = it(void 0);
  try {
    return e();
  } finally {
    pn(o), ngDevMode && Qe(n), it(r);
  }
}
function Pc(t) {
  if (!dv() && !pM())
    throw new b(-203, ngDevMode && t.name + "() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`");
}
const im = {
  ɵɵdefineInjectable: oe,
  ɵɵdefineInjector: Ic,
  ɵɵinject: Re,
  ɵɵinvalidFactoryDep: Vf,
  resolveForwardRef: k
};
function q1(t, e) {
  let n = null, o = null;
  t.hasOwnProperty(qs) || Object.defineProperty(t, qs, {
    get: () => (n === null && (n = Te({ usage: 0, kind: "injectable", type: t }).compileInjectable(im, `ng:///${t.name}/ɵprov.js`, K1(t, e))), n)
  }), t.hasOwnProperty(bn) || Object.defineProperty(t, bn, {
    get: () => {
      if (o === null) {
        const r = Te({ usage: 0, kind: "injectable", type: t });
        o = r.compileFactory(im, `ng:///${t.name}/ɵfac.js`, {
          name: t.name,
          type: t,
          typeArgumentCount: 0,
          // In JIT mode types are not available nor used.
          deps: xc(t),
          target: r.FactoryTarget.Injectable
        });
      }
      return o;
    },
    // Leave this configurable so that the factories from directives or pipes can take precedence.
    configurable: !0
  });
}
const Y1 = ee({ provide: String, useValue: ee });
function sm(t) {
  return t.useClass !== void 0;
}
function Z1(t) {
  return Y1 in t;
}
function am(t) {
  return t.useFactory !== void 0;
}
function Q1(t) {
  return t.useExisting !== void 0;
}
function K1(t, e) {
  const n = e || { providedIn: null }, o = {
    name: t.name,
    type: t,
    typeArgumentCount: 0,
    providedIn: n.providedIn
  };
  return (sm(n) || am(n)) && n.deps !== void 0 && (o.deps = AD(n.deps)), sm(n) ? o.useClass = n.useClass : Z1(n) ? o.useValue = n.useValue : am(n) ? o.useFactory = n.useFactory : Q1(n) && (o.useExisting = n.useExisting), o;
}
const le = Sa("Injectable", void 0, void 0, void 0, (t, e) => q1(t, e));
function Od(t, e = null, n = null, o) {
  const r = $D(t, e, n, o);
  return r.resolveInjectorInitializers(), r;
}
function $D(t, e = null, n = null, o, r = /* @__PURE__ */ new Set()) {
  const i = [
    n || q,
    OD(t)
  ];
  return o = o || (typeof t == "object" ? void 0 : Y(t)), new Ji(i, e || kc(), o || null, r);
}
const uo = class uo {
  static create(e, n) {
    if (Array.isArray(e))
      return Od({ name: "" }, n, e, "");
    {
      const o = e.name ?? "";
      return Od({ name: o }, e.parent, e.providers, o);
    }
  }
};
uo.THROW_IF_NOT_FOUND = Ys, uo.NULL = /* @__PURE__ */ new Oc(), uo.ɵprov = oe({
  token: uo,
  providedIn: "any",
  factory: () => Re(uh)
}), uo.__NG_ELEMENT_ID__ = -1;
let Ve = uo;
function ph(t) {
  return t.ngModule !== void 0;
}
function ao(t) {
  return !!yt(t);
}
function qa(t) {
  return !!gt(t);
}
function lm(t) {
  return !!Fe(t);
}
function _s(t) {
  return !!H(t);
}
function X1(t) {
  return H(t) ? "component" : Fe(t) ? "directive" : gt(t) ? "pipe" : "type";
}
function Fd(t, e) {
  if (Cc(t) && (t = k(t), !t))
    throw new Error(`Expected forwardRef function, imported from "${G(e)}", to return a standalone entity or NgModule but got "${G(t) || t}".`);
  if (yt(t) == null) {
    const n = H(t) || Fe(t) || gt(t);
    if (n != null) {
      if (!n.standalone)
        throw new Error(`The "${G(t)}" ${X1(t)}, imported from "${G(e)}", is not standalone. Did you forget to add the standalone: true flag?`);
    } else
      throw ph(t) ? new Error(`A module with providers was imported from "${G(e)}". Modules with providers are not supported in standalone components imports.`) : new Error(`The "${G(t)}" type, imported from "${G(e)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
  }
}
let Rd;
function J1(t) {
  Rd = t;
}
function Hn() {
  if (Rd !== void 0)
    return Rd;
  if (typeof document < "u")
    return document;
  throw new b(210, (typeof ngDevMode > "u" || ngDevMode) && "The document object is not available in this context. Make sure the DOCUMENT injection token is provided.");
}
const BD = new j("AppId", {
  providedIn: "root",
  factory: () => eA
}), eA = "ng", jD = new j("Platform Initializer"), _a = new j("Platform ID", {
  providedIn: "platform",
  factory: () => "unknown"
  // set a default platform name, when none set explicitly
}), tA = new j("Application Packages Root URL"), nA = new j("AnimationModuleType"), oA = new j("CSP nonce", {
  providedIn: "root",
  factory: () => {
    var t, e;
    return ((e = (t = Hn().body) == null ? void 0 : t.querySelector("[ngCspNonce]")) == null ? void 0 : e.getAttribute("ngCspNonce")) || null;
  }
}), gh = {
  breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  disableImageSizeWarning: !1,
  disableImageLazyLoadWarning: !1
}, mh = new j("ImageConfig", { providedIn: "root", factory: () => gh });
function HD(t) {
  return t.ownerDocument.defaultView;
}
function VD(t) {
  return t.ownerDocument;
}
function yh(t) {
  return t.ownerDocument.body;
}
const ui = "�";
function qt(t) {
  return t instanceof Function ? t() : t;
}
function kn(t) {
  return (t ?? A(Ve)).get(_a) === "browser";
}
const rA = !0;
class iA {
  constructor() {
    this.ownerNgModule = /* @__PURE__ */ new Map(), this.ngModulesWithSomeUnresolvedDecls = /* @__PURE__ */ new Set(), this.ngModulesScopeCache = /* @__PURE__ */ new Map(), this.standaloneComponentsScopeCache = /* @__PURE__ */ new Map();
  }
  /**
   * Attempts to resolve ng module's forward ref declarations as much as possible and add them to
   * the `ownerNgModule` map. This method normally should be called after the initial parsing when
   * all the forward refs are resolved (e.g., when trying to render a component)
   */
  resolveNgModulesDecls() {
    if (this.ngModulesWithSomeUnresolvedDecls.size !== 0) {
      for (const e of this.ngModulesWithSomeUnresolvedDecls) {
        const n = yt(e);
        if (n != null && n.declarations)
          for (const o of qt(n.declarations))
            _s(o) && this.ownerNgModule.set(o, e);
      }
      this.ngModulesWithSomeUnresolvedDecls.clear();
    }
  }
  /** @override */
  getComponentDependencies(e, n) {
    this.resolveNgModulesDecls();
    const o = H(e);
    if (o === null)
      throw new Error(`Attempting to get component dependencies for a type that is not a component: ${e}`);
    if (o.standalone) {
      const r = this.getStandaloneComponentScope(e, n);
      return r.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...r.compilation.directives,
          ...r.compilation.pipes,
          ...r.compilation.ngModules
        ]
      };
    } else {
      if (!this.ownerNgModule.has(e))
        return { dependencies: [] };
      const r = this.getNgModuleScope(this.ownerNgModule.get(e));
      return r.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...r.compilation.directives,
          ...r.compilation.pipes
        ]
      };
    }
  }
  /**
   * @override
   * This implementation does not make use of param scopeInfo since it assumes the scope info is
   * already added to the type itself through methods like {@link ɵɵsetNgModuleScope}
   */
  registerNgModule(e, n) {
    if (!ao(e))
      throw new Error(`Attempting to register a Type which is not NgModule as NgModule: ${e}`);
    this.ngModulesWithSomeUnresolvedDecls.add(e);
  }
  /** @override */
  clearScopeCacheFor(e) {
    this.ngModulesScopeCache.delete(e), this.standaloneComponentsScopeCache.delete(e);
  }
  /** @override */
  getNgModuleScope(e) {
    if (this.ngModulesScopeCache.has(e))
      return this.ngModulesScopeCache.get(e);
    const n = this.computeNgModuleScope(e);
    return this.ngModulesScopeCache.set(e, n), n;
  }
  /** Compute NgModule scope afresh. */
  computeNgModuleScope(e) {
    const n = yt(e, !0), o = {
      exported: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() },
      compilation: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() }
    };
    for (const r of qt(n.imports))
      if (ao(r)) {
        const i = this.getNgModuleScope(r);
        xn(i.exported.directives, o.compilation.directives), xn(i.exported.pipes, o.compilation.pipes);
      } else if (Nn(r))
        if (lm(r) || _s(r))
          o.compilation.directives.add(r);
        else if (qa(r))
          o.compilation.pipes.add(r);
        else
          throw new b(1e3, "The standalone imported type is neither a component nor a directive nor a pipe");
      else {
        o.compilation.isPoisoned = !0;
        break;
      }
    if (!o.compilation.isPoisoned)
      for (const r of qt(n.declarations)) {
        if (ao(r) || Nn(r)) {
          o.compilation.isPoisoned = !0;
          break;
        }
        qa(r) ? o.compilation.pipes.add(r) : o.compilation.directives.add(r);
      }
    for (const r of qt(n.exports))
      if (ao(r)) {
        const i = this.getNgModuleScope(r);
        xn(i.exported.directives, o.exported.directives), xn(i.exported.pipes, o.exported.pipes), xn(i.exported.directives, o.compilation.directives), xn(i.exported.pipes, o.compilation.pipes);
      } else
        qa(r) ? o.exported.pipes.add(r) : o.exported.directives.add(r);
    return o;
  }
  /** @override */
  getStandaloneComponentScope(e, n) {
    if (this.standaloneComponentsScopeCache.has(e))
      return this.standaloneComponentsScopeCache.get(e);
    const o = this.computeStandaloneComponentScope(e, n);
    return this.standaloneComponentsScopeCache.set(e, o), o;
  }
  computeStandaloneComponentScope(e, n) {
    const o = {
      compilation: {
        // Standalone components are always able to self-reference.
        directives: /* @__PURE__ */ new Set([e]),
        pipes: /* @__PURE__ */ new Set(),
        ngModules: /* @__PURE__ */ new Set()
      }
    };
    for (const r of st(n ?? [])) {
      const i = k(r);
      try {
        Fd(i, e);
      } catch {
        return o.compilation.isPoisoned = !0, o;
      }
      if (ao(i)) {
        o.compilation.ngModules.add(i);
        const s = this.getNgModuleScope(i);
        if (s.exported.isPoisoned)
          return o.compilation.isPoisoned = !0, o;
        xn(s.exported.directives, o.compilation.directives), xn(s.exported.pipes, o.compilation.pipes);
      } else if (qa(i))
        o.compilation.pipes.add(i);
      else if (lm(i) || _s(i))
        o.compilation.directives.add(i);
      else
        return o.compilation.isPoisoned = !0, o;
    }
    return o;
  }
  /** @override */
  isOrphanComponent(e) {
    const n = H(e);
    return !n || n.standalone ? !1 : (this.resolveNgModulesDecls(), !this.ownerNgModule.has(e));
  }
}
function xn(t, e) {
  for (const n of t)
    e.add(n);
}
const Zo = new iA(), kd = /* @__PURE__ */ new Map();
let UD = !0;
function sA(t, e, n) {
  if (e && e !== n && UD)
    throw new Error(`Duplicate module registered for ${t} - ${Y(e)} vs ${Y(e.name)}`);
}
function vh(t, e) {
  const n = kd.get(e) || null;
  sA(e, n, t), kd.set(e, t);
}
function GD(t) {
  return kd.get(t);
}
function aA(t) {
  UD = !t;
}
const WD = {
  name: "custom-elements"
}, zD = {
  name: "no-errors-schema"
};
let Dh = !1;
function lA(t) {
  Dh = t;
}
function cA() {
  return Dh;
}
let Ch = !1;
function uA(t) {
  Ch = t;
}
function dA() {
  return Ch;
}
function fA(t, e, n, o, r) {
  if (o !== null && !r && n !== null && // Note that we can't check for `typeof HTMLUnknownElement === 'function'` because
  // Domino doesn't expose HTMLUnknownElement globally.
  (typeof HTMLUnknownElement < "u" && HTMLUnknownElement && t instanceof HTMLUnknownElement || typeof customElements < "u" && n.indexOf("-") > -1 && !customElements.get(n)) && !bh(o, n)) {
    const s = Lc(e), a = $c(e), l = `'${s ? "@Component" : "@NgModule"}.schemas'`;
    let c = `'${n}' is not a known element${a}:
`;
    if (c += `1. If '${n}' is an Angular component, then verify that it is ${s ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared"}.
`, n && n.indexOf("-") > -1 ? c += `2. If '${n}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${l} of this component to suppress this message.` : c += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${l} of this component.`, Dh)
      throw new b(304, c);
    console.error(ve(304, c));
  }
}
function hA(t, e, n, o) {
  return o === null || bh(o, n) || e in t || mv(e) ? !0 : typeof Node > "u" || Node === null || !(t instanceof Node);
}
function cm(t, e, n, o) {
  !e && n === 4 && (e = "ng-template");
  const r = Lc(o), i = $c(o);
  let s = `Can't bind to '${t}' since it isn't a known property of '${e}'${i}.`;
  const a = `'${r ? "@Component" : "@NgModule"}.schemas'`, l = r ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared";
  if (um.has(t)) {
    const c = um.get(t);
    s += `
If the '${t}' is an Angular control flow directive, please make sure that either the '${c}' directive or the 'CommonModule' is ${l}.`;
  } else
    s += `
1. If '${e}' is an Angular component and it has the '${t}' input, then verify that it is ${l}.`, e && e.indexOf("-") > -1 ? (s += `
2. If '${e}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${a} of this component to suppress this message.`, s += `
3. To allow any property add 'NO_ERRORS_SCHEMA' to the ${a} of this component.`) : s += `
2. To allow any property add 'NO_ERRORS_SCHEMA' to the ${a} of this component.`;
  qD(s);
}
function qD(t) {
  if (Ch)
    throw new b(303, t);
  console.error(ve(303, t));
}
function Nc(t) {
  !ngDevMode && _("Must never be called in production mode");
  const n = t[ge][re];
  return n && n.constructor ? H(n.constructor) : null;
}
function Lc(t) {
  !ngDevMode && _("Must never be called in production mode");
  const e = Nc(t);
  return !!(e != null && e.standalone);
}
function $c(t) {
  var o;
  !ngDevMode && _("Must never be called in production mode");
  const e = Nc(t), n = (o = e == null ? void 0 : e.type) == null ? void 0 : o.name;
  return n ? ` (used in the '${n}' component template)` : "";
}
const um = /* @__PURE__ */ new Map([
  ["ngIf", "NgIf"],
  ["ngFor", "NgFor"],
  ["ngSwitchCase", "NgSwitchCase"],
  ["ngSwitchDefault", "NgSwitchDefault"]
]);
function bh(t, e) {
  if (t !== null)
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      if (o === zD || o === WD && e && e.indexOf("-") > -1)
        return !0;
    }
  return !1;
}
const oa = "ngSkipHydration", pA = "ngskiphydration";
function YD(t) {
  const e = t.mergedAttrs;
  if (e === null)
    return !1;
  for (let n = 0; n < e.length; n += 2) {
    const o = e[n];
    if (typeof o == "number")
      return !1;
    if (typeof o == "string" && o.toLowerCase() === pA)
      return !0;
  }
  return !1;
}
function ZD(t) {
  return t.hasAttribute(oa);
}
function Nl(t) {
  return (t.flags & 128) === 128;
}
function Ll(t) {
  if (Nl(t))
    return !0;
  let e = t.parent;
  for (; e; ) {
    if (Nl(t) || YD(e))
      return !0;
    e = e.parent;
  }
  return !1;
}
var di;
(function(t) {
  t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase";
})(di || (di = {}));
const gA = /^>|^->|<!--|-->|--!>|<!-$/g, mA = /(<|>)/g, yA = "​$1​";
function QD(t) {
  return t.replace(gA, (e) => e.replace(mA, yA));
}
const Eh = /* @__PURE__ */ new Map();
let vA = 0;
function DA() {
  return vA++;
}
function CA(t) {
  ngDevMode && X(t[jo], "LView must have an ID in order to be registered"), Eh.set(t[jo], t);
}
function KD(t) {
  return ngDevMode && X(t, "ID used for LView lookup must be a number"), Eh.get(t) || null;
}
function bA(t) {
  ngDevMode && X(t[jo], "Cannot stop tracking an LView that does not have an ID"), Eh.delete(t[jo]);
}
class XD {
  /** Component's parent view data. */
  get lView() {
    return KD(this.lViewId);
  }
  constructor(e, n, o) {
    this.lViewId = e, this.nodeIndex = n, this.native = o;
  }
}
function at(t) {
  let e = Ts(t);
  if (e) {
    if (je(e)) {
      const n = e;
      let o, r, i;
      if (tC(t)) {
        if (o = nC(n, t), o == -1)
          throw new Error("The provided component was not found in the application");
        r = t;
      } else if (EA(t)) {
        if (o = SA(n, t), o == -1)
          throw new Error("The provided directive was not found in the application");
        i = oC(o, n);
      } else if (o = dm(n, t), o == -1)
        return null;
      const s = se(n[o]), a = Ts(s), l = a && !Array.isArray(a) ? a : Pd(n, o, s);
      if (r && l.component === void 0 && (l.component = r, $e(l.component, l)), i && l.directives === void 0) {
        l.directives = i;
        for (let c = 0; c < i.length; c++)
          $e(i[c], l);
      }
      $e(l.native, l), e = l;
    }
  } else {
    const n = t;
    ngDevMode && Pn(n);
    let o = n;
    for (; o = o.parentNode; ) {
      const r = Ts(o);
      if (r) {
        const i = Array.isArray(r) ? r : r.lView;
        if (!i)
          return null;
        const s = dm(i, n);
        if (s >= 0) {
          const a = se(i[s]), l = Pd(i, s, a);
          $e(a, l), e = l;
          break;
        }
      }
    }
  }
  return e || null;
}
function Pd(t, e, n) {
  return new XD(t[jo], e, n);
}
function JD(t) {
  let e = Ts(t), n;
  if (je(e)) {
    const o = e, r = nC(o, t);
    n = vt(r, o);
    const i = Pd(o, r, n[pe]);
    i.component = t, $e(t, i), $e(i.native, i);
  } else {
    const o = e, r = o.lView;
    ngDevMode && an(r), n = vt(o.nodeIndex, r);
  }
  return n;
}
const Nd = "__ngContext__";
function $e(t, e) {
  ngDevMode && S(t, "Target expected"), je(e) ? (t[Nd] = e[jo], CA(e)) : t[Nd] = e;
}
function Ts(t) {
  ngDevMode && S(t, "Target expected");
  const e = t[Nd];
  return typeof e == "number" ? KD(e) : e || null;
}
function eC(t) {
  const e = Ts(t);
  return e ? je(e) ? e : e.lView : null;
}
function tC(t) {
  return t && t.constructor && t.constructor.ɵcmp;
}
function EA(t) {
  return t && t.constructor && t.constructor.ɵdir;
}
function dm(t, e) {
  const n = t[E];
  for (let o = T; o < n.bindingStartIndex; o++)
    if (se(t[o]) === e)
      return o;
  return -1;
}
function IA(t) {
  if (t.child)
    return t.child;
  if (t.next)
    return t.next;
  for (; t.parent && !t.parent.next; )
    t = t.parent;
  return t.parent && t.parent.next;
}
function nC(t, e) {
  const n = t[E].components;
  if (n)
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      if (vt(r, t)[re] === e)
        return r;
    }
  else if (vt(T, t)[re] === e)
    return T;
  return -1;
}
function SA(t, e) {
  let n = t[E].firstChild;
  for (; n; ) {
    const o = n.directiveStart, r = n.directiveEnd;
    for (let i = o; i < r; i++)
      if (t[i] === e)
        return n.index;
    n = IA(n);
  }
  return -1;
}
function oC(t, e) {
  const n = e[E].data[t];
  if (n.directiveStart === 0)
    return q;
  const o = [];
  for (let r = n.directiveStart; r < n.directiveEnd; r++) {
    const i = e[r];
    tC(i) || o.push(i);
  }
  return o;
}
function wA(t, e) {
  const n = e[E].data[t], { directiveStart: o, componentOffset: r } = n;
  return r > -1 ? e[o + r] : null;
}
function MA(t, e) {
  const n = t[E].data[e];
  if (n && n.localNames) {
    const o = {};
    let r = n.index + 1;
    for (let i = 0; i < n.localNames.length; i += 2)
      o[n.localNames[i]] = t[r], r++;
    return o;
  }
  return null;
}
let Ld;
function Ih(t, e) {
  return Ld(t, e);
}
function AA(t) {
  Ld === void 0 && (Ld = t());
}
function Ir(t, e, n, o, r) {
  if (o != null) {
    let i, s = !1;
    Pe(o) ? i = o : je(o) && (s = !0, ngDevMode && S(o[pe], "HOST must be defined for a component LView"), o = o[pe]);
    const a = se(o);
    t === 0 && n !== null ? r == null ? lC(e, n, a) : Qo(e, n, a, r || null, !0) : t === 1 && n !== null ? Qo(e, n, a, r || null, !0) : t === 2 ? Gc(e, a, s) : t === 3 && (ngDevMode && ngDevMode.rendererDestroyNode++, e.destroyNode(a)), i != null && $A(e, t, i, n, r);
  }
}
function Bc(t, e) {
  return ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && ngDevMode.rendererSetText++, t.createText(e);
}
function rC(t, e, n) {
  ngDevMode && ngDevMode.rendererSetText++, t.setValue(e, n);
}
function Sh(t, e) {
  return ngDevMode && ngDevMode.rendererCreateComment++, t.createComment(QD(e));
}
function jc(t, e, n) {
  return ngDevMode && ngDevMode.rendererCreateElement++, t.createElement(e, n);
}
function _A(t, e) {
  iC(t, e), e[pe] = null, e[Ue] = null;
}
function TA(t, e, n, o, r, i) {
  o[pe] = r, o[Ue] = e, Wc(t, o, n, 1, r, i);
}
function iC(t, e) {
  Wc(t, e, e[B], 2, null, null);
}
function xA(t) {
  let e = t[Qs];
  if (!e)
    return Pu(t[E], t);
  for (; e; ) {
    let n = null;
    if (je(e))
      n = e[Qs];
    else {
      ngDevMode && lt(e);
      const o = e[ue];
      o && (n = o);
    }
    if (!n) {
      for (; e && !e[Rt] && e !== t; )
        je(e) && Pu(e[E], e), e = e[Ce];
      e === null && (e = t), je(e) && Pu(e[E], e), n = e && e[Rt];
    }
    e = n;
  }
}
function OA(t, e, n, o) {
  ngDevMode && an(e), ngDevMode && lt(n);
  const r = ue + o, i = n.length;
  o > 0 && (n[r - 1][Rt] = e), o < i - ue ? (e[Rt] = n[r], ID(n, ue + o, e)) : (n.push(e), e[Rt] = null), e[Ce] = n;
  const s = e[va];
  s !== null && n !== s && FA(s, e);
  const a = e[St];
  a !== null && a.insertView(t), Id(e), e[O] |= 128;
}
function FA(t, e) {
  ngDevMode && S(e, "LView required"), ngDevMode && lt(t);
  const n = t[Vo], o = e[Ce];
  ngDevMode && lt(o);
  const r = o[Ce][ge];
  ngDevMode && S(r, "Missing insertedComponentLView");
  const i = e[ge];
  ngDevMode && S(i, "Missing declaredComponentLView"), i !== r && (t[O] |= xl.HasTransplantedViews), n === null ? t[Vo] = [e] : n.push(e);
}
function sC(t, e) {
  ngDevMode && lt(t), ngDevMode && S(t[Vo], "A projected view should belong to a non-empty projected views collection");
  const n = t[Vo], o = n.indexOf(e);
  ngDevMode && lt(e[Ce]), n.splice(o, 1);
}
function ra(t, e) {
  if (t.length <= ue)
    return;
  const n = ue + e, o = t[n];
  if (o) {
    const r = o[va];
    r !== null && r !== t && sC(r, o), e > 0 && (t[n - 1][Rt] = o[Rt]);
    const i = kl(t, ue + e);
    _A(o[E], o);
    const s = i[St];
    s !== null && s.detachView(i[E]), o[Ce] = null, o[Rt] = null, o[O] &= -129;
  }
  return o;
}
function Hc(t, e) {
  if (!(e[O] & 256)) {
    const n = e[B];
    n.destroyNode && Wc(t, e, n, 3, null, null), xA(e);
  }
}
function Pu(t, e) {
  if (!(e[O] & 256)) {
    e[O] &= -129, e[O] |= 256, e[Ho] && Wy(e[Ho]), kA(t, e), RA(t, e), e[E].type === 1 && (ngDevMode && ngDevMode.rendererDestroy++, e[B].destroy());
    const n = e[va];
    if (n !== null && Pe(e[Ce])) {
      n !== e[Ce] && sC(n, e);
      const o = e[St];
      o !== null && o.detachView(t);
    }
    bA(e);
  }
}
function RA(t, e) {
  const n = t.cleanup, o = e[si];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == "string") {
        const s = n[i + 3];
        ngDevMode && X(s, "cleanup target must be a number"), s >= 0 ? o[s]() : o[-s].unsubscribe(), i += 2;
      } else {
        const s = o[n[i + 1]];
        n[i].call(s);
      }
  o !== null && (e[si] = null);
  const r = e[Ln];
  if (r !== null) {
    e[Ln] = null;
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      ngDevMode && eM(s, "Expecting destroy hook to be a function."), s();
    }
  }
}
function kA(t, e) {
  let n;
  if (t != null && (n = t.destroyHooks) != null)
    for (let o = 0; o < n.length; o += 2) {
      const r = e[n[o]];
      if (!(r instanceof Ia)) {
        const i = n[o + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            const a = r[i[s]], l = i[s + 1];
            Wt(4, a, l);
            try {
              l.call(a);
            } finally {
              Wt(5, a, l);
            }
          }
        else {
          Wt(4, r, i);
          try {
            i.call(r);
          } finally {
            Wt(5, r, i);
          }
        }
      }
    }
}
function wh(t, e, n) {
  return aC(t, e.parent, n);
}
function aC(t, e, n) {
  let o = e;
  for (; o !== null && o.type & 40; )
    e = o, o = e.parent;
  if (o === null)
    return n[pe];
  {
    ngDevMode && He(
      o,
      7
      /* TNodeType.Container */
    );
    const { componentOffset: r } = o;
    if (r > -1) {
      ngDevMode && tt(o, n);
      const { encapsulation: i } = t.data[o.directiveStart + r];
      if (i === Xt.None || i === Xt.Emulated)
        return null;
    }
    return Ge(o, n);
  }
}
function Qo(t, e, n, o, r) {
  ngDevMode && ngDevMode.rendererInsertBefore++, t.insertBefore(e, n, o, r);
}
function lC(t, e, n) {
  ngDevMode && ngDevMode.rendererAppendChild++, ngDevMode && S(e, "parent node must be defined"), t.appendChild(e, n);
}
function fm(t, e, n, o, r) {
  o !== null ? Qo(t, e, n, o, r) : lC(t, e, n);
}
function PA(t, e, n, o) {
  t.removeChild(e, n, o);
}
function Vc(t, e) {
  return t.parentNode(e);
}
function NA(t, e) {
  return t.nextSibling(e);
}
function cC(t, e, n) {
  return dC(t, e, n);
}
function uC(t, e, n) {
  return t.type & 40 ? Ge(t, n) : null;
}
let dC = uC, $d;
function fC(t, e) {
  dC = t, $d = e;
}
function Uc(t, e, n, o) {
  const r = wh(t, o, e), i = e[B], s = o.parent || e[Ue], a = cC(s, o, e);
  if (r != null)
    if (Array.isArray(n))
      for (let l = 0; l < n.length; l++)
        fm(i, r, n[l], a, !1);
    else
      fm(i, r, n, a, !1);
  $d !== void 0 && $d(i, o, e, n, r);
}
function xs(t, e) {
  if (e !== null) {
    ngDevMode && He(
      e,
      63
      /* TNodeType.Projection */
    );
    const n = e.type;
    if (n & 3)
      return Ge(e, t);
    if (n & 4)
      return Bd(-1, t[e.index]);
    if (n & 8) {
      const o = e.child;
      if (o !== null)
        return xs(t, o);
      {
        const r = t[e.index];
        return Pe(r) ? Bd(-1, r) : se(r);
      }
    } else {
      if (n & 32)
        return Ih(e, t)() || se(t[e.index]);
      {
        const o = hC(t, e);
        if (o !== null) {
          if (Array.isArray(o))
            return o[0];
          const r = Go(t[ge]);
          return ngDevMode && xv(r), xs(r, o);
        } else
          return xs(t, e.next);
      }
    }
  }
  return null;
}
function hC(t, e) {
  if (e !== null) {
    const o = t[ge][Ue], r = e.projection;
    return ngDevMode && LM(t), o.projection[r];
  }
  return null;
}
function Bd(t, e) {
  const n = ue + t + 1;
  if (n < e.length) {
    const o = e[n], r = o[E].firstChild;
    if (r !== null)
      return xs(o, r);
  }
  return e[Jt];
}
function Gc(t, e, n) {
  ngDevMode && ngDevMode.rendererRemoveNode++;
  const o = Vc(t, e);
  o && PA(t, o, e, n);
}
function pC(t) {
  t.textContent = "";
}
function Mh(t, e, n, o, r, i, s) {
  for (; n != null; ) {
    ngDevMode && tt(n, o), ngDevMode && He(
      n,
      63
      /* TNodeType.Icu */
    );
    const a = o[n.index], l = n.type;
    if (s && e === 0 && (a && $e(se(a), o), n.flags |= 2), (n.flags & 32) !== 32)
      if (l & 8)
        Mh(t, e, n.child, o, r, i, !1), Ir(e, t, r, a, i);
      else if (l & 32) {
        const c = Ih(n, o);
        let u;
        for (; u = c(); )
          Ir(e, t, r, u, i);
        Ir(e, t, r, a, i);
      } else
        l & 16 ? gC(t, e, o, n, r, i) : (ngDevMode && He(
          n,
          7
          /* TNodeType.Container */
        ), Ir(e, t, r, a, i));
    n = s ? n.projectionNext : n.next;
  }
}
function Wc(t, e, n, o, r, i) {
  Mh(n, o, t.firstChild, e, r, i, !1);
}
function LA(t, e, n) {
  const o = e[B], r = wh(t, n, e), i = n.parent || e[Ue];
  let s = cC(i, n, e);
  gC(o, 0, e, n, r, s);
}
function gC(t, e, n, o, r, i) {
  const s = n[ge], a = s[Ue];
  ngDevMode && x(typeof o.projection, "number", "expecting projection index");
  const l = a.projection[o.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      const u = l[c];
      Ir(e, t, r, u, i);
    }
  else {
    let c = l;
    const u = s[Ce];
    Nl(o) && (c.flags |= 128), Mh(t, e, c, u, r, i, !0);
  }
}
function $A(t, e, n, o, r) {
  ngDevMode && lt(n);
  const i = n[Jt], s = se(n);
  i !== s && Ir(e, t, o, i, r);
  for (let a = ue; a < n.length; a++) {
    const l = n[a];
    Wc(l[E], l, t, e, o, i);
  }
}
function BA(t, e, n, o, r) {
  if (e)
    r ? (ngDevMode && ngDevMode.rendererAddClass++, t.addClass(n, o)) : (ngDevMode && ngDevMode.rendererRemoveClass++, t.removeClass(n, o));
  else {
    let i = o.indexOf("-") === -1 ? void 0 : di.DashCase;
    r == null ? (ngDevMode && ngDevMode.rendererRemoveStyle++, t.removeStyle(n, o, i)) : (typeof r == "string" && r.endsWith("!important") && (r = r.slice(0, -10), i |= di.Important), ngDevMode && ngDevMode.rendererSetStyle++, t.setStyle(n, o, r, i));
  }
}
function jA(t, e, n) {
  ngDevMode && zi(n, "'newValue' should be a string"), t.setAttribute(e, "style", n), ngDevMode && ngDevMode.rendererSetStyle++;
}
function mC(t, e, n) {
  ngDevMode && zi(n, "'newValue' should be a string"), n === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n), ngDevMode && ngDevMode.rendererSetClassName++;
}
function yC(t, e, n) {
  const { mergedAttrs: o, classes: r, styles: i } = n;
  o !== null && Cd(t, e, o), r !== null && mC(t, e, r), i !== null && jA(t, e, i);
}
function vC(t, e, n) {
  const o = v(), r = ce(), i = Ge(r, o);
  if (r.type === 2 && e.toLowerCase() === "iframe") {
    const s = i;
    s.src = "", s.srcdoc = "", Gc(o[B], s);
    const a = ngDevMode && `Angular has detected that the \`${n}\` was applied as a binding to an <iframe>${$c(o)}. For security reasons, the \`${n}\` can be set on an <iframe> as a static attribute only. 
To fix this, switch the \`${n}\` binding to a static attribute in a template or in host bindings section.`;
    throw new b(-910, a);
  }
  return t;
}
class hr {
  constructor(e) {
    this.changingThisBreaksApplicationSecurity = e;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${ur})`;
  }
}
class HA extends hr {
  getTypeName() {
    return "HTML";
  }
}
class VA extends hr {
  getTypeName() {
    return "Style";
  }
}
class UA extends hr {
  getTypeName() {
    return "Script";
  }
}
class GA extends hr {
  getTypeName() {
    return "URL";
  }
}
class WA extends hr {
  getTypeName() {
    return "ResourceURL";
  }
}
function cn(t) {
  return t instanceof hr ? t.changingThisBreaksApplicationSecurity : t;
}
function es(t, e) {
  const n = DC(t);
  if (n != null && n !== e) {
    if (n === "ResourceURL" && e === "URL")
      return !0;
    throw new Error(`Required a safe ${e}, got a ${n} (see ${ur})`);
  }
  return n === e;
}
function DC(t) {
  return t instanceof hr && t.getTypeName() || null;
}
function zA(t) {
  return new HA(t);
}
function qA(t) {
  return new VA(t);
}
function YA(t) {
  return new UA(t);
}
function ZA(t) {
  return new GA(t);
}
function QA(t) {
  return new WA(t);
}
function CC(t) {
  const e = new XA(t);
  return JA() ? new KA(e) : e;
}
class KA {
  constructor(e) {
    this.inertDocumentHelper = e;
  }
  getInertBodyElement(e) {
    e = "<body><remove></remove>" + e;
    try {
      const n = new window.DOMParser().parseFromString(e, "text/html").body;
      return n === null ? this.inertDocumentHelper.getInertBodyElement(e) : (n.removeChild(n.firstChild), n);
    } catch {
      return null;
    }
  }
}
class XA {
  constructor(e) {
    this.defaultDoc = e, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");
  }
  getInertBodyElement(e) {
    const n = this.inertDocument.createElement("template");
    return n.innerHTML = e, n;
  }
}
function JA() {
  try {
    return !!new window.DOMParser().parseFromString("", "text/html");
  } catch {
    return !1;
  }
}
const e_ = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function zc(t) {
  return t = String(t), t.match(e_) ? t : ((typeof ngDevMode > "u" || ngDevMode) && console.warn(`WARNING: sanitizing unsafe URL value ${t} (see ${ur})`), "unsafe:" + t);
}
function An(t) {
  const e = {};
  for (const n of t.split(","))
    e[n] = !0;
  return e;
}
function Ta(...t) {
  const e = {};
  for (const n of t)
    for (const o in n)
      n.hasOwnProperty(o) && (e[o] = !0);
  return e;
}
const bC = An("area,br,col,hr,img,wbr"), EC = An("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), IC = An("rp,rt"), t_ = Ta(IC, EC), n_ = Ta(EC, An("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), o_ = Ta(IC, An("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), jd = Ta(bC, n_, o_, t_), Ah = An("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), r_ = An("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), i_ = An("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"), SC = Ta(Ah, r_, i_), s_ = An("script,style,template");
class a_ {
  constructor() {
    this.sanitizedSomething = !1, this.buf = [];
  }
  sanitizeChildren(e) {
    let n = e.firstChild, o = !0;
    for (; n; ) {
      if (n.nodeType === Node.ELEMENT_NODE ? o = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, o && n.firstChild) {
        n = n.firstChild;
        continue;
      }
      for (; n; ) {
        n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
        let r = this.checkClobberedElement(n, n.nextSibling);
        if (r) {
          n = r;
          break;
        }
        n = this.checkClobberedElement(n, n.parentNode);
      }
    }
    return this.buf.join("");
  }
  /**
   * Sanitizes an opening element tag (if valid) and returns whether the element's contents should
   * be traversed. Element content must always be traversed (even if the element itself is not
   * valid/safe), unless the element is one of `SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS`.
   *
   * @param element The element to sanitize.
   * @return True if the element's contents should be traversed.
   */
  startElement(e) {
    const n = e.nodeName.toLowerCase();
    if (!jd.hasOwnProperty(n))
      return this.sanitizedSomething = !0, !s_.hasOwnProperty(n);
    this.buf.push("<"), this.buf.push(n);
    const o = e.attributes;
    for (let r = 0; r < o.length; r++) {
      const i = o.item(r), s = i.name, a = s.toLowerCase();
      if (!SC.hasOwnProperty(a)) {
        this.sanitizedSomething = !0;
        continue;
      }
      let l = i.value;
      Ah[a] && (l = zc(l)), this.buf.push(" ", s, '="', hm(l), '"');
    }
    return this.buf.push(">"), !0;
  }
  endElement(e) {
    const n = e.nodeName.toLowerCase();
    jd.hasOwnProperty(n) && !bC.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
  }
  chars(e) {
    this.buf.push(hm(e));
  }
  checkClobberedElement(e, n) {
    if (n && (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY)
      throw new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
    return n;
  }
}
const l_ = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c_ = /([^\#-~ |!])/g;
function hm(t) {
  return t.replace(/&/g, "&amp;").replace(l_, function(e) {
    const n = e.charCodeAt(0), o = e.charCodeAt(1);
    return "&#" + ((n - 55296) * 1024 + (o - 56320) + 65536) + ";";
  }).replace(c_, function(e) {
    return "&#" + e.charCodeAt(0) + ";";
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
let Ya;
function wC(t, e) {
  let n = null;
  try {
    Ya = Ya || CC(t);
    let o = e ? String(e) : "";
    n = Ya.getInertBodyElement(o);
    let r = 5, i = o;
    do {
      if (r === 0)
        throw new Error("Failed to sanitize html because the input is unstable");
      r--, o = i, i = n.innerHTML, n = Ya.getInertBodyElement(o);
    } while (o !== i);
    const s = new a_(), a = s.sanitizeChildren(Hd(n) || n);
    return (typeof ngDevMode > "u" || ngDevMode) && s.sanitizedSomething && console.warn(`WARNING: sanitizing HTML stripped some content, see ${ur}`), a;
  } finally {
    if (n) {
      const o = Hd(n) || n;
      for (; o.firstChild; )
        o.removeChild(o.firstChild);
    }
  }
}
function Hd(t) {
  return "content" in t && u_(t) ? t.content : null;
}
function u_(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.nodeName === "TEMPLATE";
}
var Vn;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML", t[t.STYLE = 2] = "STYLE", t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL", t[t.RESOURCE_URL = 5] = "RESOURCE_URL";
})(Vn || (Vn = {}));
function MC(t) {
  const e = xa();
  return e ? e.sanitize(Vn.HTML, t) || "" : es(
    t,
    "HTML"
    /* BypassType.Html */
  ) ? cn(t) : wC(Hn(), L(t));
}
function AC(t) {
  const e = xa();
  return e ? e.sanitize(Vn.STYLE, t) || "" : es(
    t,
    "Style"
    /* BypassType.Style */
  ) ? cn(t) : L(t);
}
function _h(t) {
  const e = xa();
  return e ? e.sanitize(Vn.URL, t) || "" : es(
    t,
    "URL"
    /* BypassType.Url */
  ) ? cn(t) : zc(L(t));
}
function Th(t) {
  const e = xa();
  if (e)
    return e.sanitize(Vn.RESOURCE_URL, t) || "";
  if (es(
    t,
    "ResourceURL"
    /* BypassType.ResourceUrl */
  ))
    return cn(t);
  throw new b(904, ngDevMode && `unsafe value used in a resource URL context (see ${ur})`);
}
function _C(t) {
  const e = xa();
  if (e)
    return e.sanitize(Vn.SCRIPT, t) || "";
  if (es(
    t,
    "Script"
    /* BypassType.Script */
  ))
    return cn(t);
  throw new b(905, ngDevMode && "unsafe value used in a script context");
}
function TC(t) {
  if (ngDevMode && (!Array.isArray(t) || !Array.isArray(t.raw) || t.length !== 1))
    throw new Error(`Unexpected interpolation in trusted HTML constant: ${t.join("?")}`);
  return t[0];
}
function xC(t) {
  if (ngDevMode && (!Array.isArray(t) || !Array.isArray(t.raw) || t.length !== 1))
    throw new Error(`Unexpected interpolation in trusted URL constant: ${t.join("?")}`);
  return t[0];
}
function d_(t, e) {
  return e === "src" && (t === "embed" || t === "frame" || t === "iframe" || t === "media" || t === "script") || e === "href" && (t === "base" || t === "link") ? Th : _h;
}
function OC(t, e, n) {
  return d_(e, n)(t);
}
function f_(t) {
  if (t.toLowerCase().startsWith("on")) {
    const e = `Binding to event property '${t}' is disallowed for security reasons, please use (${t.slice(2)})=...
If '${t}' is a directive input, make sure the directive is imported by the current module.`;
    throw new b(306, e);
  }
}
function h_(t) {
  if (t.toLowerCase().startsWith("on")) {
    const e = `Binding to event attribute '${t}' is disallowed for security reasons, please use (${t.slice(2)})=...`;
    throw new b(306, e);
  }
}
function xa() {
  const t = v();
  return t && t[Zt].sanitizer;
}
class xh {
}
function p_(t) {
  return t;
}
function g_() {
  const t = new Ko();
  return A(_a) === "browser" && (t.store = m_(Hn(), A(BD))), t;
}
const fc = class fc {
  constructor() {
    this.store = {}, this.onSerializeCallbacks = {};
  }
  /**
   * Get the value corresponding to a key. Return `defaultValue` if key is not found.
   */
  get(e, n) {
    return this.store[e] !== void 0 ? this.store[e] : n;
  }
  /**
   * Set the value corresponding to a key.
   */
  set(e, n) {
    this.store[e] = n;
  }
  /**
   * Remove a key from the store.
   */
  remove(e) {
    delete this.store[e];
  }
  /**
   * Test whether a key exists in the store.
   */
  hasKey(e) {
    return this.store.hasOwnProperty(e);
  }
  /**
   * Indicates whether the state is empty.
   */
  get isEmpty() {
    return Object.keys(this.store).length === 0;
  }
  /**
   * Register a callback to provide the value for a key when `toJson` is called.
   */
  onSerialize(e, n) {
    this.onSerializeCallbacks[e] = n;
  }
  /**
   * Serialize the current state of the store to JSON.
   */
  toJson() {
    for (const e in this.onSerializeCallbacks)
      if (this.onSerializeCallbacks.hasOwnProperty(e))
        try {
          this.store[e] = this.onSerializeCallbacks[e]();
        } catch (n) {
          console.warn("Exception in onSerialize callback: ", n);
        }
    return JSON.stringify(this.store).replace(/</g, "\\u003C");
  }
};
fc.ɵprov = /** @pureOrBreakMyCode */
oe({
  token: fc,
  providedIn: "root",
  factory: g_
});
let Ko = fc;
function m_(t, e) {
  const n = t.getElementById(e + "-state");
  if (n != null && n.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (o) {
      console.warn("Exception while restoring TransferState for app " + e, o);
    }
  return {};
}
const Oh = "h", Fh = "b";
var Xo;
(function(t) {
  t.FirstChild = "f", t.NextSibling = "n";
})(Xo || (Xo = {}));
const Cs = "e", bs = "t", Lo = "c", Sr = "x", fi = "r", Vd = "i", Es = "n", yr = "d", y_ = "__nghData__", Rh = y_, Os = "ngh", FC = "nghm";
let RC = () => null;
function v_(t, e, n = !1) {
  let o = t.getAttribute(Os);
  if (o == null)
    return null;
  const [r, i] = o.split("|");
  if (o = n ? i : r, !o)
    return null;
  const s = n ? r : i ? `|${i}` : "";
  let a = {};
  if (o !== "") {
    const c = e.get(Ko, null, { optional: !0 });
    c !== null && (a = c.get(Rh, [])[Number(o)], ngDevMode && S(a, "Unable to retrieve hydration info from the TransferState."));
  }
  const l = {
    data: a,
    firstChild: t.firstChild ?? null
  };
  return n && (l.firstChild = t, qc(l, 0, t.nextSibling)), s ? t.setAttribute(Os, s) : t.removeAttribute(Os), ngDevMode && ts(
    t,
    /* checkIfAlreadyClaimed */
    !1
  ), ngDevMode && ngDevMode.hydratedComponents++, l;
}
function D_() {
  RC = v_;
}
function kh(t, e, n = !1) {
  return RC(t, e, n);
}
function kC(t) {
  let e = t._lView;
  return e[E].type === 2 ? null : (zf(e) && (e = e[T]), e);
}
function C_(t) {
  var e;
  return (e = t.textContent) == null ? void 0 : e.replace(/\s/gm, "");
}
function b_(t) {
  const e = Hn(), n = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
    acceptNode(i) {
      const s = C_(i);
      return s === "ngetn" || s === "ngtns" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let o;
  const r = [];
  for (; o = n.nextNode(); )
    r.push(o);
  for (const i of r)
    i.textContent === "ngetn" ? i.replaceWith(e.createTextNode("")) : i.remove();
}
function ts(t, e = !0) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsClaimedByHydration` in prod mode is not supported and likely a mistake.");
  if (e && E_(t))
    throw new Error("Trying to claim a node, which was claimed already.");
  t.__claimed = !0, ngDevMode.hydratedNodes++;
}
function E_(t) {
  return !!t.__claimed;
}
function qc(t, e, n) {
  t.segmentHeads ?? (t.segmentHeads = {}), t.segmentHeads[e] = n;
}
function Ud(t, e) {
  var n;
  return ((n = t.segmentHeads) == null ? void 0 : n[e]) ?? null;
}
function I_(t, e) {
  var r, i;
  const n = t.data;
  let o = ((r = n[Cs]) == null ? void 0 : r[e]) ?? null;
  return o === null && ((i = n[Lo]) != null && i[e]) && (o = Ph(t, e)), o;
}
function PC(t, e) {
  var n;
  return ((n = t.data[Lo]) == null ? void 0 : n[e]) ?? null;
}
function Ph(t, e) {
  const n = PC(t, e) ?? [];
  let o = 0;
  for (let r of n)
    o += r[fi] * (r[Sr] ?? 1);
  return o;
}
function Yc(t, e) {
  var n;
  if (typeof t.disconnectedNodes > "u") {
    const o = t.data[yr];
    t.disconnectedNodes = o ? new Set(o) : null;
  }
  return !!((n = t.disconnectedNodes) != null && n.has(e));
}
class NC {
}
class $l {
}
function S_(t) {
  const e = Error(`No component factory found for ${Y(t)}.`);
  return e[w_] = t, e;
}
const w_ = "ngComponent";
class M_ {
  resolveComponentFactory(e) {
    throw S_(e);
  }
}
const Og = class Og {
};
Og.NULL = /* @__PURE__ */ new M_();
let Jo = Og;
function A_() {
  return ns(K(), v());
}
function ns(t, e) {
  return new Mt(Ge(t, e));
}
const Fg = class Fg {
  constructor(e) {
    this.nativeElement = e;
  }
};
Fg.__NG_ELEMENT_ID__ = A_;
let Mt = Fg;
function __(t) {
  return t instanceof Mt ? t.nativeElement : t;
}
class LC {
}
const Rg = class Rg {
  constructor() {
    this.destroyNode = null;
  }
};
Rg.__NG_ELEMENT_ID__ = () => T_();
let Un = Rg;
function T_() {
  const t = v(), e = K(), n = vt(e.index, t);
  return (je(n) ? n : t)[B];
}
const hc = class hc {
};
hc.ɵprov = oe({
  token: hc,
  providedIn: "root",
  factory: () => null
});
let Bl = hc;
const gl = {};
function $C(t) {
  return typeof t == "function" && t[Kt] !== void 0;
}
function x_(t, e) {
  const n = V0(t);
  return e != null && e.equal && (n[Kt].equal = e.equal), n;
}
function O_(t, e) {
  const n = z0(t), o = n[Kt];
  return e != null && e.equal && (o.equal = e.equal), n.set = (r) => Ff(o, r), n.update = (r) => q0(o, r), n.asReadonly = F_.bind(n), n;
}
function F_() {
  const t = this[Kt];
  if (t.readonlyFn === void 0) {
    const e = () => this();
    e[Kt] = t, t.readonlyFn = e;
  }
  return t.readonlyFn;
}
function Gd(t) {
  const e = De(null);
  try {
    return t();
  } finally {
    De(e);
  }
}
function jl(t) {
  return Nh(t) ? Array.isArray(t) || !(t instanceof Map) && // JS Map are iterables but return entries as [k, v]
  Symbol.iterator in t : !1;
}
function R_(t, e, n) {
  const o = t[Symbol.iterator](), r = e[Symbol.iterator]();
  for (; ; ) {
    const i = o.next(), s = r.next();
    if (i.done && s.done)
      return !0;
    if (i.done || s.done || !n(i.value, s.value))
      return !1;
  }
}
function k_(t, e) {
  if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      e(t[n]);
  else {
    const n = t[Symbol.iterator]();
    let o;
    for (; !(o = n.next()).done; )
      e(o.value);
  }
}
function Nh(t) {
  return t !== null && (typeof t == "function" || typeof t == "object");
}
class BC {
  constructor() {
  }
  supports(e) {
    return jl(e);
  }
  create(e) {
    return new jC(e);
  }
}
const P_ = (t, e) => e;
class jC {
  constructor(e) {
    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = e || P_;
  }
  forEachItem(e) {
    let n;
    for (n = this._itHead; n !== null; n = n._next)
      e(n);
  }
  forEachOperation(e) {
    let n = this._itHead, o = this._removalsHead, r = 0, i = null;
    for (; n || o; ) {
      const s = !o || n && n.currentIndex < gm(o, r, i) ? n : o, a = gm(s, r, i), l = s.currentIndex;
      if (s === o)
        r--, o = o._nextRemoved;
      else if (n = n._next, s.previousIndex == null)
        r++;
      else {
        i || (i = []);
        const c = a - r, u = l - r;
        if (c != u) {
          for (let f = 0; f < c; f++) {
            const h = f < i.length ? i[f] : i[f] = 0, p = h + f;
            u <= p && p < c && (i[f] = h + 1);
          }
          const d = s.previousIndex;
          i[d] = u - c;
        }
      }
      a !== l && e(s, a, l);
    }
  }
  forEachPreviousItem(e) {
    let n;
    for (n = this._previousItHead; n !== null; n = n._nextPrevious)
      e(n);
  }
  forEachAddedItem(e) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      e(n);
  }
  forEachMovedItem(e) {
    let n;
    for (n = this._movesHead; n !== null; n = n._nextMoved)
      e(n);
  }
  forEachRemovedItem(e) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      e(n);
  }
  forEachIdentityChange(e) {
    let n;
    for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
      e(n);
  }
  diff(e) {
    if (e == null && (e = []), !jl(e))
      throw new b(900, ngDevMode && `Error trying to diff '${Y(e)}'. Only arrays and iterables are allowed`);
    return this.check(e) ? this : null;
  }
  onDestroy() {
  }
  check(e) {
    this._reset();
    let n = this._itHead, o = !1, r, i, s;
    if (Array.isArray(e)) {
      this.length = e.length;
      for (let a = 0; a < this.length; a++)
        i = e[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), o = !0) : (o && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next;
    } else
      r = 0, k_(e, (a) => {
        s = this._trackByFn(r, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, r), o = !0) : (o && (n = this._verifyReinsertion(n, a, s, r)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, r++;
      }), this.length = r;
    return this._truncate(n), this.collection = e, this.isDirty;
  }
  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty() {
    return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
  }
  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      let e;
      for (e = this._previousItHead = this._itHead; e !== null; e = e._next)
        e._nextPrevious = e._next;
      for (e = this._additionsHead; e !== null; e = e._nextAdded)
        e.previousIndex = e.currentIndex;
      for (this._additionsHead = this._additionsTail = null, e = this._movesHead; e !== null; e = e._nextMoved)
        e.previousIndex = e.currentIndex;
      this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null;
    }
  }
  /**
   * This is the core function which handles differences between collections.
   *
   * - `record` is the record which we saw at this position last time. If null then it is a new
   *   item.
   * - `item` is the current item in the collection
   * - `index` is the position of the item in the collection
   *
   * @internal
   */
  _mismatch(e, n, o, r) {
    let i;
    return e === null ? i = this._itTail : (i = e._prev, this._remove(e)), e = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(o, null), e !== null ? (Object.is(e.item, n) || this._addIdentityChange(e, n), this._reinsertAfter(e, i, r)) : (e = this._linkedRecords === null ? null : this._linkedRecords.get(o, r), e !== null ? (Object.is(e.item, n) || this._addIdentityChange(e, n), this._moveAfter(e, i, r)) : e = this._addAfter(new N_(n, o), i, r)), e;
  }
  /**
   * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
   *
   * Use case: `[a, a]` => `[b, a, a]`
   *
   * If we did not have this check then the insertion of `b` would:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) leave `a` at index `1` as is. <-- this is wrong!
   *   3) reinsert `a` at index 2. <-- this is wrong!
   *
   * The correct behavior is:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) reinsert `a` at index 1.
   *   3) move `a` at from `1` to `2`.
   *
   *
   * Double check that we have not evicted a duplicate item. We need to check if the item type may
   * have already been removed:
   * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
   * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
   * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
   * at the end.
   *
   * @internal
   */
  _verifyReinsertion(e, n, o, r) {
    let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(o, null);
    return i !== null ? e = this._reinsertAfter(i, e._prev, r) : e.currentIndex != r && (e.currentIndex = r, this._addToMoves(e, r)), e;
  }
  /**
   * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
   *
   * - `record` The first excess {@link IterableChangeRecord_}.
   *
   * @internal
   */
  _truncate(e) {
    for (; e !== null; ) {
      const n = e._next;
      this._addToRemovals(this._unlink(e)), e = n;
    }
    this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null);
  }
  /** @internal */
  _reinsertAfter(e, n, o) {
    this._unlinkedRecords !== null && this._unlinkedRecords.remove(e);
    const r = e._prevRemoved, i = e._nextRemoved;
    return r === null ? this._removalsHead = i : r._nextRemoved = i, i === null ? this._removalsTail = r : i._prevRemoved = r, this._insertAfter(e, n, o), this._addToMoves(e, o), e;
  }
  /** @internal */
  _moveAfter(e, n, o) {
    return this._unlink(e), this._insertAfter(e, n, o), this._addToMoves(e, o), e;
  }
  /** @internal */
  _addAfter(e, n, o) {
    return this._insertAfter(e, n, o), this._additionsTail === null ? this._additionsTail = this._additionsHead = e : this._additionsTail = this._additionsTail._nextAdded = e, e;
  }
  /** @internal */
  _insertAfter(e, n, o) {
    const r = n === null ? this._itHead : n._next;
    return e._next = r, e._prev = n, r === null ? this._itTail = e : r._prev = e, n === null ? this._itHead = e : n._next = e, this._linkedRecords === null && (this._linkedRecords = new pm()), this._linkedRecords.put(e), e.currentIndex = o, e;
  }
  /** @internal */
  _remove(e) {
    return this._addToRemovals(this._unlink(e));
  }
  /** @internal */
  _unlink(e) {
    this._linkedRecords !== null && this._linkedRecords.remove(e);
    const n = e._prev, o = e._next;
    return n === null ? this._itHead = o : n._next = o, o === null ? this._itTail = n : o._prev = n, e;
  }
  /** @internal */
  _addToMoves(e, n) {
    return e.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = e : this._movesTail = this._movesTail._nextMoved = e), e;
  }
  _addToRemovals(e) {
    return this._unlinkedRecords === null && (this._unlinkedRecords = new pm()), this._unlinkedRecords.put(e), e.currentIndex = null, e._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = e, e._prevRemoved = null) : (e._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = e), e;
  }
  /** @internal */
  _addIdentityChange(e, n) {
    return e.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = e : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = e, e;
  }
}
class N_ {
  constructor(e, n) {
    this.item = e, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null;
  }
}
class L_ {
  constructor() {
    this._head = null, this._tail = null;
  }
  /**
   * Append the record to the list of duplicates.
   *
   * Note: by design all records in the list of duplicates hold the same value in record.item.
   */
  add(e) {
    this._head === null ? (this._head = this._tail = e, e._nextDup = null, e._prevDup = null) : (this._tail._nextDup = e, e._prevDup = this._tail, e._nextDup = null, this._tail = e);
  }
  // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
  // IterableChangeRecord_.currentIndex >= atOrAfterIndex
  get(e, n) {
    let o;
    for (o = this._head; o !== null; o = o._nextDup)
      if ((n === null || n <= o.currentIndex) && Object.is(o.trackById, e))
        return o;
    return null;
  }
  /**
   * Remove one {@link IterableChangeRecord_} from the list of duplicates.
   *
   * Returns whether the list of duplicates is empty.
   */
  remove(e) {
    const n = e._prevDup, o = e._nextDup;
    return n === null ? this._head = o : n._nextDup = o, o === null ? this._tail = n : o._prevDup = n, this._head === null;
  }
}
class pm {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  put(e) {
    const n = e.trackById;
    let o = this.map.get(n);
    o || (o = new L_(), this.map.set(n, o)), o.add(e);
  }
  /**
   * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
   * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
   *
   * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
   * have any more `a`s needs to return the second `a`.
   */
  get(e, n) {
    const o = e, r = this.map.get(o);
    return r ? r.get(e, n) : null;
  }
  /**
   * Removes a {@link IterableChangeRecord_} from the list of duplicates.
   *
   * The list of duplicates also is removed from the map if it gets empty.
   */
  remove(e) {
    const n = e.trackById;
    return this.map.get(n).remove(e) && this.map.delete(n), e;
  }
  get isEmpty() {
    return this.map.size === 0;
  }
  clear() {
    this.map.clear();
  }
}
function gm(t, e, n) {
  const o = t.previousIndex;
  if (o === null)
    return o;
  let r = 0;
  return n && o < n.length && (r = n[o]), o + e + r;
}
class HC {
  constructor() {
  }
  supports(e) {
    return e instanceof Map || Nh(e);
  }
  create() {
    return new $_();
  }
}
class $_ {
  constructor() {
    this._records = /* @__PURE__ */ new Map(), this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null;
  }
  get isDirty() {
    return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
  }
  forEachItem(e) {
    let n;
    for (n = this._mapHead; n !== null; n = n._next)
      e(n);
  }
  forEachPreviousItem(e) {
    let n;
    for (n = this._previousMapHead; n !== null; n = n._nextPrevious)
      e(n);
  }
  forEachChangedItem(e) {
    let n;
    for (n = this._changesHead; n !== null; n = n._nextChanged)
      e(n);
  }
  forEachAddedItem(e) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      e(n);
  }
  forEachRemovedItem(e) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      e(n);
  }
  diff(e) {
    if (!e)
      e = /* @__PURE__ */ new Map();
    else if (!(e instanceof Map || Nh(e)))
      throw new b(900, ngDevMode && `Error trying to diff '${Y(e)}'. Only maps and objects are allowed`);
    return this.check(e) ? this : null;
  }
  onDestroy() {
  }
  /**
   * Check the current state of the map vs the previous.
   * The algorithm is optimised for when the keys do no change.
   */
  check(e) {
    this._reset();
    let n = this._mapHead;
    if (this._appendAfter = null, this._forEach(e, (o, r) => {
      if (n && n.key === r)
        this._maybeAddToChanges(n, o), this._appendAfter = n, n = n._next;
      else {
        const i = this._getOrCreateRecordForKey(r, o);
        n = this._insertBeforeOrAppend(n, i);
      }
    }), n) {
      n._prev && (n._prev._next = null), this._removalsHead = n;
      for (let o = n; o !== null; o = o._nextRemoved)
        o === this._mapHead && (this._mapHead = null), this._records.delete(o.key), o._nextRemoved = o._next, o.previousValue = o.currentValue, o.currentValue = null, o._prev = null, o._next = null;
    }
    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty;
  }
  /**
   * Inserts a record before `before` or append at the end of the list when `before` is null.
   *
   * Notes:
   * - This method appends at `this._appendAfter`,
   * - This method updates `this._appendAfter`,
   * - The return value is the new value for the insertion pointer.
   */
  _insertBeforeOrAppend(e, n) {
    if (e) {
      const o = e._prev;
      return n._next = e, n._prev = o, e._prev = n, o && (o._next = n), e === this._mapHead && (this._mapHead = n), this._appendAfter = e, e;
    }
    return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null;
  }
  _getOrCreateRecordForKey(e, n) {
    if (this._records.has(e)) {
      const r = this._records.get(e);
      this._maybeAddToChanges(r, n);
      const i = r._prev, s = r._next;
      return i && (i._next = s), s && (s._prev = i), r._next = null, r._prev = null, r;
    }
    const o = new B_(e);
    return this._records.set(e, o), o.currentValue = n, this._addToAdditions(o), o;
  }
  /** @internal */
  _reset() {
    if (this.isDirty) {
      let e;
      for (this._previousMapHead = this._mapHead, e = this._previousMapHead; e !== null; e = e._next)
        e._nextPrevious = e._next;
      for (e = this._changesHead; e !== null; e = e._nextChanged)
        e.previousValue = e.currentValue;
      for (e = this._additionsHead; e != null; e = e._nextAdded)
        e.previousValue = e.currentValue;
      this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null;
    }
  }
  // Add the record or a given key to the list of changes only when the value has actually changed
  _maybeAddToChanges(e, n) {
    Object.is(n, e.currentValue) || (e.previousValue = e.currentValue, e.currentValue = n, this._addToChanges(e));
  }
  _addToAdditions(e) {
    this._additionsHead === null ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e, this._additionsTail = e);
  }
  _addToChanges(e) {
    this._changesHead === null ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e, this._changesTail = e);
  }
  /** @internal */
  _forEach(e, n) {
    e instanceof Map ? e.forEach(n) : Object.keys(e).forEach((o) => n(e[o], o));
  }
}
class B_ {
  constructor(e) {
    this.key = e, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null;
  }
}
function mm() {
  return new er([new BC()]);
}
const On = class On {
  constructor(e) {
    this.factories = e;
  }
  static create(e, n) {
    if (n != null) {
      const o = n.factories.slice();
      e = e.concat(o);
    }
    return new On(e);
  }
  /**
   * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
   * inherited {@link IterableDiffers} instance with the provided factories and return a new
   * {@link IterableDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link IterableDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     IterableDiffers.extend([new ImmutableListDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(e) {
    return {
      provide: On,
      useFactory: (n) => On.create(e, n || mm()),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[On, new Tc(), new nn()]]
    };
  }
  find(e) {
    const n = this.factories.find((o) => o.supports(e));
    if (n != null)
      return n;
    throw new b(901, ngDevMode && `Cannot find a differ supporting object '${e}' of type '${j_(e)}'`);
  }
};
On.ɵprov = oe({ token: On, providedIn: "root", factory: mm });
let er = On;
function j_(t) {
  return t.name || typeof t;
}
function ym() {
  return new In([new HC()]);
}
const Fn = class Fn {
  constructor(e) {
    this.factories = e;
  }
  static create(e, n) {
    if (n) {
      const o = n.factories.slice();
      e = e.concat(o);
    }
    return new Fn(e);
  }
  /**
   * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
   * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
   * {@link KeyValueDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link KeyValueDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(e) {
    return {
      provide: Fn,
      useFactory: (n) => Fn.create(e, n || ym()),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[Fn, new Tc(), new nn()]]
    };
  }
  find(e) {
    const n = this.factories.find((o) => o.supports(e));
    if (n)
      return n;
    throw new b(901, ngDevMode && `Cannot find a differ supporting object '${e}'`);
  }
};
Fn.ɵprov = oe({ token: Fn, providedIn: "root", factory: ym });
let In = Fn;
function Lh(t, e) {
  const n = jl(t), o = jl(e);
  return n && o ? R_(t, e, Lh) : !n && (t && (typeof t == "object" || typeof t == "function")) && !o && (e && (typeof e == "object" || typeof e == "function")) ? !0 : Object.is(t, e);
}
function ia(t, e, n, o, r = !1) {
  for (; n !== null; ) {
    ngDevMode && He(
      n,
      63
      /* TNodeType.Icu */
    );
    const i = e[n.index];
    i !== null && o.push(se(i)), Pe(i) && VC(i, o);
    const s = n.type;
    if (s & 8)
      ia(t, e, n.child, o);
    else if (s & 32) {
      const a = Ih(n, e);
      let l;
      for (; l = a(); )
        o.push(l);
    } else if (s & 16) {
      const a = hC(e, n);
      if (Array.isArray(a))
        o.push(...a);
      else {
        const l = Go(e[ge]);
        ngDevMode && xv(l), ia(l[E], l, a, o, !0);
      }
    }
    n = r ? n.projectionNext : n.next;
  }
  return o;
}
function VC(t, e) {
  for (let n = ue; n < t.length; n++) {
    const o = t[n], r = o[E].firstChild;
    r !== null && ia(o[E], o, r, e);
  }
  t[Jt] !== t[pe] && e.push(t[Jt]);
}
let UC = [];
function H_(t) {
  return t[Ho] ?? V_(t);
}
function V_(t) {
  const e = UC.pop() ?? Object.create(G_);
  return e.lView = t, e;
}
function U_(t) {
  t.lView[Ho] !== t && (t.lView = null, UC.push(t));
}
const G_ = {
  ...yc,
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (t) => {
    Xs(t.lView);
  },
  consumerOnSignalRead() {
    this.lView[Ho] = this;
  }
};
function W_(t) {
  ngDevMode && S(t, "component");
  let e = je(t) ? t : eC(t);
  for (; e && !(e[O] & 512); )
    e = Go(e);
  return ngDevMode && an(e), e;
}
function z_(t) {
  const e = W_(t);
  return ngDevMode && S(e[re], "Root view has no context. Perhaps it is disconnected?"), e[re];
}
function GC(t) {
  return zC(t[Qs]);
}
function WC(t) {
  return zC(t[Rt]);
}
function zC(t) {
  for (; t !== null && !Pe(t); )
    t = t[Rt];
  return t;
}
const q_ = "ngOriginalError";
function Nu(t) {
  return t[q_];
}
class oo {
  constructor() {
    this._console = console;
  }
  handleError(e) {
    const n = this._findOriginalError(e);
    this._console.error("ERROR", e), n && this._console.error("ORIGINAL ERROR", n);
  }
  /** @internal */
  _findOriginalError(e) {
    let n = e && Nu(e);
    for (; n && Nu(n); )
      n = Nu(n);
    return n || null;
  }
}
const qC = new j(typeof ngDevMode > "u" || ngDevMode ? "internal error handler" : "", {
  providedIn: "root",
  factory: () => A(oo).handleError.bind(void 0)
}), Is = new j(typeof ngDevMode > "u" || ngDevMode ? "IS_HYDRATION_DOM_REUSE_ENABLED" : ""), YC = !1, ZC = new j(typeof ngDevMode > "u" || ngDevMode ? "PRESERVE_HOST_CONTENT" : "", {
  providedIn: "root",
  factory: () => YC
});
function Y_(t) {
  return t = Q_(t.replace(/[$@]/g, "_")), `ng-reflect-${t}`;
}
const Z_ = /([A-Z])/g;
function Q_(t) {
  return t.replace(Z_, (...e) => "-" + e[1].toLowerCase());
}
function K_(t) {
  try {
    return t != null ? t.toString().slice(0, 30) : t;
  } catch {
    return "[ERROR] Exception while trying to serialize the value";
  }
}
const vm = 200;
function X_(t) {
  if (QC(t), !H(t).standalone)
    throw new b(907, `The ${G(t)} component is not marked as standalone, but Angular expects to have a standalone component here. Please make sure the ${G(t)} component has the \`standalone: true\` flag in the decorator.`);
}
function QC(t) {
  if (!H(t))
    throw new b(906, `The ${G(t)} is not an Angular component, make sure it has the \`@Component\` decorator.`);
}
function J_(t, e, n) {
  throw new b(-300, `Multiple components match node with tagname ${t.value}: ${G(e)} and ${G(n)}`);
}
function eT(t, e, n, o, r) {
  var c;
  const i = Nc(r), s = (c = i == null ? void 0 : i.type) == null ? void 0 : c.name;
  let l = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${o ? ` for '${o}'` : ""}: '${Dm(e)}'. Current value: '${Dm(n)}'.${s ? ` Expression location: ${s} component` : ""}`;
  throw t && (l += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook?"), new b(-100, l);
}
function Dm(t) {
  let e = String(t);
  try {
    (Array.isArray(t) || e === "[object Object]") && (e = JSON.stringify(t));
  } catch {
  }
  return e.length > vm ? e.substring(0, vm) + "…" : e;
}
function Cm(t, e, n, o, r) {
  const [i, s, ...a] = o.split(ui);
  let l = s, c = s;
  for (let u = 0; u < a.length; u++) {
    const d = e + u;
    l += `${t[d]}${a[u]}`, c += `${d === n ? r : t[d]}${a[u]}`;
  }
  return { propName: i, oldValue: l, newValue: c };
}
function tT(t, e, n, o) {
  const r = t[E].data, i = r[e];
  if (typeof i == "string")
    return i.indexOf(ui) > -1 ? Cm(t, e, e, i, o) : { propName: i, oldValue: n, newValue: o };
  if (i === null) {
    let s = e - 1;
    for (; typeof r[s] != "string" && r[s + 1] === null; )
      s--;
    const a = r[s];
    if (typeof a == "string") {
      const l = a.match(new RegExp(ui, "g"));
      if (l && l.length - 1 > e - s)
        return Cm(t, s, e, a, o);
    }
  }
  return { propName: void 0, oldValue: n, newValue: o };
}
const F = typeof ngDevMode > "u" || ngDevMode ? { __brand__: "NO_CHANGE" } : {};
function KC(t = 1) {
  ngDevMode && Jn(t, 0, "Can only advance forward"), XC(N(), v(), We() + t, !!ngDevMode && fr());
}
function XC(t, e, n, o) {
  if (ngDevMode && Da(e[E], n), !o)
    if ((e[O] & 3) === 3) {
      const i = t.preOrderCheckHooks;
      i !== null && dl(e, i, n);
    } else {
      const i = t.preOrderHooks;
      i !== null && fl(e, i, 0, n);
    }
  Wo(n);
}
function pr(t, e = z.Default) {
  const n = v();
  if (n === null)
    return ngDevMode && aM(pr), Re(t, e);
  const o = K(), r = yD(o, n, k(t), e);
  return ngDevMode && hv(t, r, e), r;
}
function JC() {
  const t = ngDevMode ? "This constructor was not compatible with Dependency Injection." : "invalid";
  throw new Error(t);
}
function eb(t, e, n, o, r, i) {
  const s = De(null);
  try {
    let a = null;
    r & En.SignalBased && (a = e[o][Kt]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), r & En.HasDecoratorInputTransform && (i = t.inputTransforms[o].call(e, i)), t.setInput !== null ? t.setInput(e, a, i, n, o) : kv(e, a, o, i);
  } finally {
    De(s);
  }
}
function nT(t, e) {
  const n = t.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let o = 0; o < n.length; o++) {
        const r = n[o];
        if (r < 0)
          Wo(~r);
        else {
          const i = r, s = n[++o], a = n[++o];
          e1(s, i);
          const l = e[i];
          a(2, l);
        }
      }
    } finally {
      Wo(-1);
    }
}
function Zc(t, e, n, o, r, i, s, a, l, c, u) {
  const d = e.blueprint.slice();
  return d[pe] = r, d[O] = o | 4 | 128 | 8 | 64, (c !== null || t && t[O] & 2048) && (d[O] |= 2048), Vv(d), ngDevMode && e.declTNode && t && tt(e.declTNode, t), d[Ce] = d[jn] = t, d[re] = n, d[Zt] = s || t && t[Zt], ngDevMode && S(d[Zt], "LViewEnvironment is required"), d[B] = a || t && t[B], ngDevMode && S(d[B], "Renderer is required"), d[Je] = l || t && t[Je] || null, d[Ue] = i, d[jo] = DA(), d[Pt] = u, d[Mv] = c, ngDevMode && x(e.type == 2 ? t !== null : !0, !0, "Embedded views must have parentLView"), d[ge] = e.type == 2 ? t[ge] : d, d;
}
function os(t, e, n, o, r) {
  ngDevMode && e !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  wn(e, T, "TNodes can't be in the LView header."), ngDevMode && d1(n);
  let i = t.data[e];
  if (i === null)
    i = $h(t, e, n, o, r), JM() && (i.flags |= 32);
  else if (i.type & 64) {
    i.type = n, i.value = o, i.attrs = r;
    const s = Js();
    i.injectorIndex = s === null ? -1 : s.injectorIndex, ngDevMode && qi(i, t), ngDevMode && x(e, i.index, "Expecting same index");
  }
  return tn(i, !0), i;
}
function $h(t, e, n, o, r) {
  const i = Kv(), s = Jf(), a = s ? i : i && i.parent, l = t.data[e] = cT(t, a, n, e, o, r);
  return t.firstChild === null && (t.firstChild = l), i !== null && (s ? i.child == null && l.parent !== null && (i.child = l) : i.next === null && (i.next = l, l.prev = i)), l;
}
function Oa(t, e, n, o) {
  if (n === 0)
    return -1;
  ngDevMode && (ct(t), lv(t, e[E], "`LView` must be associated with `TView`!"), x(t.data.length, e.length, "Expecting LView to be same size as TView"), x(t.data.length, t.blueprint.length, "Expecting Blueprint to be same size as TView"), Yf(t));
  const r = e.length;
  for (let i = 0; i < n; i++)
    e.push(o), t.blueprint.push(o), t.data.push(null);
  return r;
}
function tb(t, e, n, o, r) {
  const i = We(), s = o & 2;
  try {
    Wo(-1), s && e.length > T && XC(t, e, T, !!ngDevMode && fr()), Wt(s ? 2 : 0, r), n(o, r);
  } finally {
    Wo(i), Wt(s ? 3 : 1, r);
  }
}
function Bh(t, e, n) {
  if (Wf(e)) {
    const o = De(null);
    try {
      const r = e.directiveStart, i = e.directiveEnd;
      for (let s = r; s < i; s++) {
        const a = t.data[s];
        a.contentQueries && a.contentQueries(1, n[s], s);
      }
    } finally {
      De(o);
    }
  }
}
function jh(t, e, n) {
  zv() && (mT(t, e, n, Ge(n, e)), (n.flags & 64) === 64 && sb(t, e, n));
}
function Hh(t, e, n = Ge) {
  const o = e.localNames;
  if (o !== null) {
    let r = e.index + 1;
    for (let i = 0; i < o.length; i += 2) {
      const s = o[i + 1], a = s === -1 ? n(e, t) : t[s];
      t[r++] = a;
    }
  }
}
function nb(t) {
  const e = t.tView;
  return e === null || e.incompleteFirstPass ? t.tView = Vh(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts, t.id) : e;
}
function Vh(t, e, n, o, r, i, s, a, l, c, u) {
  ngDevMode && ngDevMode.tView++;
  const d = T + o, f = d + r, h = oT(d, f), p = typeof c == "function" ? c() : c, g = h[E] = {
    type: t,
    blueprint: h,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: u
  };
  return ngDevMode && Object.seal(g), g;
}
function oT(t, e) {
  const n = [];
  for (let o = 0; o < e; o++)
    n.push(o < t ? null : F);
  return n;
}
function rT(t, e, n, o) {
  const i = o.get(ZC, YC) || n === Xt.ShadowDom, s = t.selectRootElement(e, i);
  return iT(s), s;
}
function iT(t) {
  ob(t);
}
let ob = () => null;
function sT(t) {
  ZD(t) ? pC(t) : b_(t);
}
function aT() {
  ob = sT;
}
function lT(t, e, n, o) {
  const r = cb(e);
  ngDevMode && S(n, "Cleanup context is mandatory when registering framework-level destroy hooks"), r.push(n), t.firstCreatePass ? qd(t).push(o, r.length - 1) : ngDevMode && Object.freeze(qd(t));
}
function cT(t, e, n, o, r, i) {
  ngDevMode && o !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  wn(o, T, "TNodes can't be in the LView header."), ngDevMode && dr(i, void 0, "'undefined' is not valid value for 'attrs'"), ngDevMode && ngDevMode.tNode++, ngDevMode && e && qi(e, t);
  let s = e ? e.injectorIndex : -1, a = 0;
  Zi() && (a |= 128);
  const l = {
    type: n,
    index: o,
    insertBeforeIndex: null,
    injectorIndex: s,
    directiveStart: -1,
    directiveEnd: -1,
    directiveStylingLast: -1,
    componentOffset: -1,
    propertyBindings: null,
    flags: a,
    providerIndexes: 0,
    value: r,
    attrs: i,
    mergedAttrs: null,
    localNames: null,
    initialInputs: void 0,
    inputs: null,
    outputs: null,
    tView: null,
    next: null,
    prev: null,
    projectionNext: null,
    child: null,
    parent: e,
    projection: null,
    styles: null,
    stylesWithoutHost: null,
    residualStyles: void 0,
    classes: null,
    classesWithoutHost: null,
    residualClasses: void 0,
    classBindings: 0,
    styleBindings: 0
  };
  return ngDevMode && Object.seal(l), l;
}
function bm(t, e, n, o, r) {
  for (let i in e) {
    if (!e.hasOwnProperty(i))
      continue;
    const s = e[i];
    if (s === void 0)
      continue;
    o ?? (o = {});
    let a, l = En.None;
    Array.isArray(s) ? (a = s[0], l = s[1]) : a = s;
    let c = i;
    if (r !== null) {
      if (!r.hasOwnProperty(i))
        continue;
      c = r[i];
    }
    t === 0 ? Em(o, n, c, a, l) : Em(o, n, c, a);
  }
  return o;
}
function Em(t, e, n, o, r) {
  let i;
  t.hasOwnProperty(n) ? (i = t[n]).push(e, o) : i = t[n] = [e, o], r !== void 0 && i.push(r);
}
function uT(t, e, n) {
  ngDevMode && ct(t);
  const o = e.directiveStart, r = e.directiveEnd, i = t.data, s = e.attrs, a = [];
  let l = null, c = null;
  for (let u = o; u < r; u++) {
    const d = i[u], f = n ? n.get(d) : null, h = f ? f.inputs : null, p = f ? f.outputs : null;
    l = bm(0, d.inputs, u, l, h), c = bm(1, d.outputs, u, c, p);
    const g = l !== null && s !== null && !vv(e) ? wT(l, u, s) : null;
    a.push(g);
  }
  l !== null && (l.hasOwnProperty("class") && (e.flags |= 8), l.hasOwnProperty("style") && (e.flags |= 16)), e.initialInputs = a, e.inputs = l, e.outputs = c;
}
function dT(t) {
  return t === "class" ? "className" : t === "for" ? "htmlFor" : t === "formaction" ? "formAction" : t === "innerHtml" ? "innerHTML" : t === "readonly" ? "readOnly" : t === "tabindex" ? "tabIndex" : t;
}
function Ct(t, e, n, o, r, i, s, a) {
  ngDevMode && dr(r, F, "Incoming value should never be NO_CHANGE.");
  const l = Ge(e, n);
  let c = e.inputs, u;
  !a && c != null && (u = c[o]) ? (Wh(t, n, u, o, r), eo(e) && fT(n, e.index), ngDevMode && hT(n, l, e.type, u, r)) : e.type & 3 ? (o = dT(o), ngDevMode && (f_(o), hA(l, o, e.value, t.schemas) || cm(o, e.value, e.type, n), ngDevMode.rendererSetProperty++), r = s != null ? s(r, e.value || "", o) : r, i.setProperty(l, o, r)) : e.type & 12 && ngDevMode && !bh(t.schemas, e.value) && cm(o, e.value, e.type, n);
}
function fT(t, e) {
  ngDevMode && an(t);
  const n = vt(e, t);
  n[O] & 16 || (n[O] |= 64);
}
function rb(t, e, n, o, r) {
  const i = t[B];
  o = Y_(o);
  const s = K_(r);
  if (n & 3)
    r == null ? i.removeAttribute(e, o) : i.setAttribute(e, o, s);
  else {
    const a = QD(`bindings=${JSON.stringify({ [o]: s }, null, 2)}`);
    i.setValue(e, a);
  }
}
function hT(t, e, n, o, r) {
  if (n & 7)
    for (let i = 0; i < o.length; i += 3)
      rb(t, e, n, o[i + 1], r);
}
function Uh(t, e, n, o) {
  if (ngDevMode && ct(t), zv()) {
    const r = o === null ? null : { "": -1 }, i = vT(t, n);
    let s, a;
    i === null ? s = a = null : [s, a] = i, s !== null && ib(t, e, n, s, r, a), r && DT(n, o, r);
  }
  n.mergedAttrs = Zs(n.mergedAttrs, n.attrs);
}
function ib(t, e, n, o, r, i) {
  ngDevMode && ct(t);
  for (let c = 0; c < o.length; c++)
    Ad(Rl(n, e), t, o[c].type);
  bT(n, t.data.length, o.length);
  for (let c = 0; c < o.length; c++) {
    const u = o[c];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1, a = !1, l = Oa(t, e, o.length, null);
  ngDevMode && lv(l, n.directiveStart, "TNode.directiveStart should point to just allocated space");
  for (let c = 0; c < o.length; c++) {
    const u = o[c];
    n.mergedAttrs = Zs(n.mergedAttrs, u.hostAttrs), ET(t, n, e, l, u), CT(l, u, r), u.contentQueries !== null && (n.flags |= 4), (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) && (n.flags |= 64);
    const d = u.type.prototype;
    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((t.preOrderHooks ?? (t.preOrderHooks = [])).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])).push(n.index), a = !0), l++;
  }
  uT(t, n, i);
}
function pT(t, e, n, o, r) {
  ngDevMode && ct(t);
  const i = r.hostBindings;
  if (i) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    const a = ~e.index;
    gT(s) != a && s.push(a), s.push(n, o, i);
  }
}
function gT(t) {
  let e = t.length;
  for (; e > 0; ) {
    const n = t[--e];
    if (typeof n == "number" && n < 0)
      return n;
  }
  return 0;
}
function mT(t, e, n, o) {
  const r = n.directiveStart, i = n.directiveEnd;
  eo(n) && (ngDevMode && He(
    n,
    3
    /* TNodeType.AnyRNode */
  ), IT(e, n, t.data[r + n.componentOffset])), t.firstCreatePass || Rl(n, e), $e(o, e);
  const s = n.initialInputs;
  for (let a = r; a < i; a++) {
    const l = t.data[a], c = zo(e, t, a, n);
    if ($e(c, e), s !== null && ST(e, a - r, c, l, n, s), wt(l)) {
      const u = vt(n.index, e);
      u[re] = zo(e, t, a, n);
    }
  }
}
function sb(t, e, n) {
  const o = n.directiveStart, r = n.directiveEnd, i = n.index, s = t1();
  try {
    Wo(i);
    for (let a = o; a < r; a++) {
      const l = t.data[a], c = e[a];
      Sd(a), (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) && yT(l, c);
    }
  } finally {
    Wo(-1), Sd(s);
  }
}
function yT(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function vT(t, e) {
  var i;
  ngDevMode && ct(t), ngDevMode && He(
    e,
    15
    /* TNodeType.AnyContainer */
  );
  const n = t.directiveRegistry;
  let o = null, r = null;
  if (n)
    for (let s = 0; s < n.length; s++) {
      const a = n[s];
      if (Dv(
        e,
        a.selectors,
        /* isProjectionMode */
        !1
      ))
        if (o || (o = []), wt(a))
          if (ngDevMode && (He(e, 2, `"${e.value}" tags cannot be used as component hosts. Please use a different tag to activate the ${Y(a.type)} component.`), eo(e) && J_(e, o.find(wt).type, a.type)), a.findHostDirectiveDefs !== null) {
            const l = [];
            r = r || /* @__PURE__ */ new Map(), a.findHostDirectiveDefs(a, l, r), o.unshift(...l, a);
            const c = l.length;
            Wd(t, e, c);
          } else
            o.unshift(a), Wd(t, e, 0);
        else
          r = r || /* @__PURE__ */ new Map(), (i = a.findHostDirectiveDefs) == null || i.call(a, a, o, r), o.push(a);
    }
  return ngDevMode && o !== null && Ov(o), o === null ? null : [o, r];
}
function Wd(t, e, n) {
  ngDevMode && ct(t), ngDevMode && Jn(n, -1, "componentOffset must be great than -1"), e.componentOffset = n, (t.components ?? (t.components = [])).push(e.index);
}
function DT(t, e, n) {
  if (e) {
    const o = t.localNames = [];
    for (let r = 0; r < e.length; r += 2) {
      const i = n[e[r + 1]];
      if (i == null)
        throw new b(-301, ngDevMode && `Export of name '${e[r + 1]}' not found!`);
      o.push(e[r], i);
    }
  }
}
function CT(t, e, n) {
  if (n) {
    if (e.exportAs)
      for (let o = 0; o < e.exportAs.length; o++)
        n[e.exportAs[o]] = t;
    wt(e) && (n[""] = t);
  }
}
function bT(t, e, n) {
  ngDevMode && Lt(n, t.directiveEnd - t.directiveStart, "Reached the max number of directives"), t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e;
}
function ET(t, e, n, o, r) {
  ngDevMode && wn(o, T, "Must be in Expando section"), t.data[o] = r;
  const i = r.factory || (r.factory = Uo(r.type, !0)), s = new Ia(i, wt(r), pr);
  t.blueprint[o] = s, n[o] = s, pT(t, e, o, Oa(t, n, r.hostVars, F), r);
}
function IT(t, e, n) {
  const o = Ge(e, t), r = nb(n), i = t[Zt].rendererFactory;
  let s = 16;
  n.signals ? s = 4096 : n.onPush && (s = 64);
  const a = Qc(t, Zc(t, r, null, s, o, e, null, i.createRenderer(o, n), null, null, null));
  t[e.index] = a;
}
function un(t, e, n, o, r, i) {
  ngDevMode && (dr(o, F, "Incoming value should never be NO_CHANGE."), h_(n), He(t, 2, `Attempted to set attribute \`${n}\` on a container node. Host bindings are not valid on ng-container or ng-template.`));
  const s = Ge(t, e);
  Gh(e[B], s, i, t.value, n, o, r);
}
function Gh(t, e, n, o, r, i, s) {
  if (i == null)
    ngDevMode && ngDevMode.rendererRemoveAttribute++, t.removeAttribute(e, r, n);
  else {
    ngDevMode && ngDevMode.rendererSetAttribute++;
    const a = s == null ? L(i) : s(i, o || "", r);
    t.setAttribute(e, r, a, n);
  }
}
function ST(t, e, n, o, r, i) {
  const s = i[e];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      const l = s[a++], c = s[a++], u = s[a++], d = s[a++];
      if (eb(o, n, l, c, u, d), ngDevMode) {
        const f = Ge(r, t);
        rb(t, f, r.type, c, d);
      }
    }
}
function wT(t, e, n) {
  let o = null, r = 0;
  for (; r < n.length; ) {
    const i = n[r];
    if (i === 0) {
      r += 4;
      continue;
    } else if (i === 5) {
      r += 2;
      continue;
    }
    if (typeof i == "number")
      break;
    if (t.hasOwnProperty(i)) {
      o === null && (o = []);
      const s = t[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === e) {
          o.push(i, s[a + 1], s[a + 2], n[r + 1]);
          break;
        }
    }
    r += 2;
  }
  return o;
}
function ab(t, e, n, o) {
  ngDevMode && an(e);
  const r = [
    t,
    // host native
    !0,
    // Boolean `true` in this position signifies that this is an `LContainer`
    0,
    // flags
    e,
    // parent
    null,
    // next
    o,
    // t_host
    null,
    // dehydrated views
    n,
    // native,
    null,
    // view refs
    null
    // moved views
  ];
  return ngDevMode && x(r.length, ue, "Should allocate correct number of slots for LContainer header."), r;
}
function lb(t, e) {
  const n = t.contentQueries;
  if (n !== null) {
    const o = De(null);
    try {
      for (let r = 0; r < n.length; r += 2) {
        const i = n[r], s = n[r + 1];
        if (s !== -1) {
          const a = t.data[s];
          ngDevMode && S(a, "DirectiveDef not found."), ngDevMode && S(a.contentQueries, "contentQueries function should be defined"), nh(i), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      De(o);
    }
  }
}
function Qc(t, e) {
  return t[Qs] ? t[Zg][Rt] = e : t[Qs] = e, t[Zg] = e, e;
}
function zd(t, e, n) {
  ngDevMode && S(e, "View queries function to execute must be defined."), nh(0);
  const o = De(null);
  try {
    e(t, n);
  } finally {
    De(o);
  }
}
function Ee(t, e, n, o, ...r) {
  if (t[o] === null && (e.inputs == null || !e.inputs[n])) {
    (e.propertyBindings || (e.propertyBindings = [])).push(o);
    let s = n;
    r.length > 0 && (s += ui + r.join(ui)), t[o] = s;
  }
}
function cb(t) {
  return t[si] || (t[si] = []);
}
function qd(t) {
  return t.cleanup || (t.cleanup = []);
}
function ub(t, e, n) {
  return (t === null || wt(t)) && (n = Qf(n[e.index])), n[B];
}
function Kc(t, e) {
  const n = t[Je], o = n ? n.get(oo, null) : null;
  o && o.handleError(e);
}
function Wh(t, e, n, o, r) {
  for (let i = 0; i < n.length; ) {
    const s = n[i++], a = n[i++], l = n[i++], c = e[s];
    ngDevMode && be(e, s);
    const u = t.data[s];
    eb(u, c, o, a, l, r);
  }
}
function _n(t, e, n) {
  ngDevMode && zi(n, "Value should be a string"), ngDevMode && dr(n, F, "value should not be NO_CHANGE"), ngDevMode && be(t, e);
  const o = Ca(e, t);
  ngDevMode && S(o, "native element should exist"), rC(t[B], o, n);
}
const MT = 100;
function zh(t, e = !0) {
  var i, s, a;
  const n = t[Zt], o = n.rendererFactory, r = !!ngDevMode && fr();
  r || (i = o.begin) == null || i.call(o);
  try {
    AT(t);
  } catch (l) {
    throw e && Kc(t, l), l;
  } finally {
    r || ((s = o.end) == null || s.call(o), (a = n.inlineEffectRunner) == null || a.flush());
  }
}
function AT(t) {
  Yd(
    t,
    0
    /* ChangeDetectionMode.Global */
  );
  let e = 0;
  for (; Gv(t); ) {
    if (e === MT)
      throw new b(103, ngDevMode && "Infinite change detection while trying to refresh views. There may be components which each cause the other to require a refresh, causing an infinite loop.");
    e++, Yd(
      t,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
function _T(t, e = !0) {
  Qg(!0);
  try {
    zh(t, e);
  } finally {
    Qg(!1);
  }
}
function TT(t, e, n, o) {
  var l;
  ngDevMode && x(Ea(e), !1, "Should be run in update mode");
  const r = e[O];
  if ((r & 256) === 256)
    return;
  const i = ngDevMode && fr();
  !i && ((l = e[Zt].inlineEffectRunner) == null || l.flush()), oh(e);
  let s = null, a = null;
  !i && xT(t) && (a = H_(e), s = Tf(a));
  try {
    Vv(e), Xv(t.bindingStartIndex), n !== null && tb(t, e, n, 2, o);
    const c = (r & 3) === 3;
    if (!i)
      if (c) {
        const f = t.preOrderCheckHooks;
        f !== null && dl(e, f, null);
      } else {
        const f = t.preOrderHooks;
        f !== null && fl(e, f, 0, null), xu(
          e,
          0
          /* InitPhaseState.OnInitHooksToBeRun */
        );
      }
    if (OT(e), db(
      e,
      0
      /* ChangeDetectionMode.Global */
    ), t.contentQueries !== null && lb(t, e), !i)
      if (c) {
        const f = t.contentCheckHooks;
        f !== null && dl(e, f);
      } else {
        const f = t.contentHooks;
        f !== null && fl(
          e,
          f,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        ), xu(
          e,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        );
      }
    nT(t, e);
    const u = t.components;
    u !== null && hb(
      e,
      u,
      0
      /* ChangeDetectionMode.Global */
    );
    const d = t.viewQuery;
    if (d !== null && zd(2, d, o), !i)
      if (c) {
        const f = t.viewCheckHooks;
        f !== null && dl(e, f);
      } else {
        const f = t.viewHooks;
        f !== null && fl(
          e,
          f,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        ), xu(
          e,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        );
      }
    if (t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[ei]) {
      for (const f of e[ei])
        f();
      e[ei] = null;
    }
    i || (e[O] &= -73);
  } catch (c) {
    throw Xs(e), c;
  } finally {
    a !== null && (xf(a, s), U_(a)), rh();
  }
}
function xT(t) {
  return t.type !== 2;
}
function db(t, e) {
  for (let n = GC(t); n !== null; n = WC(n))
    for (let o = ue; o < n.length; o++) {
      const r = n[o];
      fb(r, e);
    }
}
function OT(t) {
  for (let e = GC(t); e !== null; e = WC(e)) {
    if (!(e[O] & xl.HasTransplantedViews))
      continue;
    const n = e[Vo];
    ngDevMode && S(n, "Transplanted View flags set but missing MOVED_VIEWS");
    for (let o = 0; o < n.length; o++) {
      const r = n[o], i = r[Ce];
      ngDevMode && lt(i), WM(r);
    }
  }
}
function FT(t, e, n) {
  ngDevMode && x(Ea(t), !1, "Should be run in update mode");
  const o = vt(e, t);
  fb(o, n);
}
function fb(t, e) {
  Kf(t) && Yd(t, e);
}
function Yd(t, e) {
  const n = ngDevMode && fr(), o = t[E], r = t[O], i = t[Ho];
  let s = !!(e === 0 && r & 16);
  if (s || (s = !!(r & 64 && e === 0 && !n)), s || (s = !!(r & 1024)), s || (s = !!(i != null && i.dirty && Of(i))), i && (i.dirty = !1), t[O] &= -9217, s)
    TT(o, t, o.template, t[re]);
  else if (r & 8192) {
    db(
      t,
      1
      /* ChangeDetectionMode.Targeted */
    );
    const a = o.components;
    a !== null && hb(
      t,
      a,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
function hb(t, e, n) {
  for (let o = 0; o < e.length; o++)
    FT(t, e[o], n);
}
function Fa(t) {
  var e;
  for ((e = t[Zt].changeDetectionScheduler) == null || e.notify(); t; ) {
    t[O] |= 64;
    const n = Go(t);
    if (zf(t) && !n)
      return t;
    t = n;
  }
  return null;
}
class hi {
  get rootNodes() {
    const e = this._lView, n = e[E];
    return ia(n, e, n.firstChild, []);
  }
  constructor(e, n, o = !0) {
    this._lView = e, this._cdRefInjectingView = n, this.notifyErrorHandler = o, this._appRef = null, this._attachedToViewContainer = !1;
  }
  get context() {
    return this._lView[re];
  }
  /**
   * @deprecated Replacing the full context object is not supported. Modify the context
   *   directly, or consider using a `Proxy` if you need to replace the full object.
   * // TODO(devversion): Remove this.
   */
  set context(e) {
    ngDevMode && console.warn("Angular: Replacing the `context` object of an `EmbeddedViewRef` is deprecated."), this._lView[re] = e;
  }
  get destroyed() {
    return (this._lView[O] & 256) === 256;
  }
  destroy() {
    if (this._appRef)
      this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      const e = this._lView[Ce];
      if (Pe(e)) {
        const n = e[Tl], o = n ? n.indexOf(this) : -1;
        o > -1 && (ngDevMode && x(o, e.indexOf(this._lView) - ue, "An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array."), ra(e, o), kl(n, o));
      }
      this._attachedToViewContainer = !1;
    }
    Hc(this._lView[E], this._lView);
  }
  onDestroy(e) {
    wc(this._lView, e);
  }
  /**
   * Marks a view and all of its ancestors dirty.
   *
   * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
   * checked when it needs to be re-rendered but the two normal triggers haven't marked it
   * dirty (i.e. inputs haven't changed and events haven't fired in the view).
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   * @usageNotes
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'app-root',
   *   template: `Number of ticks: {{numberOfTicks}}`
   *   changeDetection: ChangeDetectionStrategy.OnPush,
   * })
   * class AppComponent {
   *   numberOfTicks = 0;
   *
   *   constructor(private ref: ChangeDetectorRef) {
   *     setInterval(() => {
   *       this.numberOfTicks++;
   *       // the following is required, otherwise the view will not be updated
   *       this.ref.markForCheck();
   *     }, 1000);
   *   }
   * }
   * ```
   */
  markForCheck() {
    Fa(this._cdRefInjectingView || this._lView);
  }
  /**
   * Detaches the view from the change detection tree.
   *
   * Detached views will not be checked during change detection runs until they are
   * re-attached, even if they are dirty. `detach` can be used in combination with
   * {@link ChangeDetectorRef#detectChanges} to implement local change
   * detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds. We can do that by detaching
   * the component's change detector and doing a local check every five seconds.
   *
   * ```typescript
   * class DataProvider {
   *   // in a real application the returned data will be different every time
   *   get data() {
   *     return [1,2,3,4,5];
   *   }
   * }
   *
   * @Component({
   *   selector: 'giant-list',
   *   template: `
   *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
   *   `,
   * })
   * class GiantList {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
   *     ref.detach();
   *     setInterval(() => {
   *       this.ref.detectChanges();
   *     }, 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [DataProvider],
   *   template: `
   *     <giant-list><giant-list>
   *   `,
   * })
   * class App {
   * }
   * ```
   */
  detach() {
    this._lView[O] &= -129;
  }
  /**
   * Re-attaches a view to the change detection tree.
   *
   * This can be used to re-attach views that were previously detached from the tree
   * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example creates a component displaying `live` data. The component will detach
   * its change detector from the main change detector tree when the component's live property
   * is set to false.
   *
   * ```typescript
   * class DataProvider {
   *   data = 1;
   *
   *   constructor() {
   *     setInterval(() => {
   *       this.data = this.data * 2;
   *     }, 500);
   *   }
   * }
   *
   * @Component({
   *   selector: 'live-data',
   *   inputs: ['live'],
   *   template: 'Data: {{dataProvider.data}}'
   * })
   * class LiveData {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
   *
   *   set live(value) {
   *     if (value) {
   *       this.ref.reattach();
   *     } else {
   *       this.ref.detach();
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'app-root',
   *   providers: [DataProvider],
   *   template: `
   *     Live Update: <input type="checkbox" [(ngModel)]="live">
   *     <live-data [live]="live"><live-data>
   *   `,
   * })
   * class AppComponent {
   *   live = true;
   * }
   * ```
   */
  reattach() {
    Id(this._lView), this._lView[O] |= 128;
  }
  /**
   * Checks the view and its children.
   *
   * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
   * local change detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine, the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds.
   *
   * We can do that by detaching the component's change detector and doing a local change detection
   * check every five seconds.
   *
   * See {@link ChangeDetectorRef#detach} for more information.
   */
  detectChanges() {
    this._lView[O] |= 1024, zh(this._lView, this.notifyErrorHandler);
  }
  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * This is used in development mode to verify that running change detection doesn't
   * introduce other changes.
   */
  checkNoChanges() {
    ngDevMode && _T(this._lView, this.notifyErrorHandler);
  }
  attachToViewContainerRef() {
    if (this._appRef)
      throw new b(902, ngDevMode && "This view is already attached directly to the ApplicationRef!");
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null, iC(this._lView[E], this._lView);
  }
  attachToAppRef(e) {
    if (this._attachedToViewContainer)
      throw new b(902, ngDevMode && "This view is already attached to a ViewContainer!");
    this._appRef = e, Id(this._lView);
  }
}
const kg = class kg {
};
kg.__NG_ELEMENT_ID__ = pb;
let tr = kg;
function pb(t) {
  return RT(
    K(),
    v(),
    (t & 16) === 16
    /* InternalInjectFlags.ForPipe */
  );
}
function RT(t, e, n) {
  if (eo(t) && !n) {
    const o = vt(t.index, e);
    return new hi(o, o);
  } else if (t.type & 47) {
    const o = e[ge];
    return new hi(o, e);
  }
  return null;
}
const kT = [new HC()], PT = [new BC()], NT = new er(PT), LT = new In(kT), pc = class pc {
};
pc.__NG_ELEMENT_ID__ = BT, pc.__NG_ENV_ID__ = (e) => e;
let nr = pc;
class $T extends nr {
  constructor(e) {
    super(), this._lView = e;
  }
  onDestroy(e) {
    return wc(this._lView, e), () => Xf(this._lView, e);
  }
}
function BT() {
  return new $T(v());
}
function qh(t, e) {
  if (B0() !== null)
    throw new b(-602, ngDevMode && `${t.name}() cannot be called from within a reactive context.${e ? ` ${e}` : ""}`);
}
const jT = new j("", {
  providedIn: "root",
  factory: () => A(Hl)
}), gc = class gc {
};
gc.ɵprov = oe({
  token: gc,
  providedIn: "root",
  factory: () => new HT()
});
let Hl = gc;
class HT {
  constructor() {
    this.hasQueuedFlush = !1, this.queuedEffectCount = 0, this.queues = /* @__PURE__ */ new Map();
  }
  scheduleEffect(e) {
    this.enqueue(e), this.hasQueuedFlush || (queueMicrotask(() => this.flush()), this.hasQueuedFlush = !1);
  }
  enqueue(e) {
    const n = e.creationZone;
    this.queues.has(n) || this.queues.set(n, /* @__PURE__ */ new Set());
    const o = this.queues.get(n);
    o.has(e) || (this.queuedEffectCount++, o.add(e));
  }
  /**
   * Run all scheduled effects.
   *
   * Execution order of effects within the same zone is guaranteed to be FIFO, but there is no
   * ordering guarantee between effects scheduled in different zones.
   */
  flush() {
    for (; this.queuedEffectCount > 0; )
      for (const [e, n] of this.queues)
        e === null ? this.flushQueue(n) : e.run(() => this.flushQueue(n));
  }
  flushQueue(e) {
    for (const n of e)
      e.delete(n), this.queuedEffectCount--, n.run();
  }
}
class VT {
  constructor(e, n, o, r, i, s) {
    this.scheduler = e, this.effectFn = n, this.creationZone = o, this.injector = i, this.watcher = Z0((a) => this.runEffect(a), () => this.schedule(), s), this.unregisterOnDestroy = r == null ? void 0 : r.onDestroy(() => this.destroy());
  }
  runEffect(e) {
    try {
      this.effectFn(e);
    } catch (n) {
      const o = this.injector.get(oo, null, { optional: !0 });
      o == null || o.handleError(n);
    }
  }
  run() {
    this.watcher.run();
  }
  schedule() {
    this.scheduler.scheduleEffect(this);
  }
  destroy() {
    var e;
    this.watcher.destroy(), (e = this.unregisterOnDestroy) == null || e.call(this);
  }
}
function Zd(t, e) {
  var s;
  ngDevMode && qh(Zd, "Call `effect` outside of a reactive context. For example, schedule the effect inside the component constructor."), !(e != null && e.injector) && Pc(Zd);
  const n = (e == null ? void 0 : e.injector) ?? A(Ve), o = (e == null ? void 0 : e.manualCleanup) !== !0 ? n.get(nr) : null, r = new VT(n.get(jT), t, typeof Zone > "u" ? null : Zone.current, o, n, (e == null ? void 0 : e.allowSignalWrites) ?? !1), i = n.get(tr, null, { optional: !0 });
  return !i || !(i._lView[O] & 8) ? r.watcher.notify() : ((s = i._lView)[ei] ?? (s[ei] = [])).push(r.watcher.notify), r;
}
const Im = /* @__PURE__ */ new Set();
function Tn(t) {
  var e;
  Im.has(t) || (Im.add(t), (e = performance == null ? void 0 : performance.mark) == null || e.call(performance, "mark_feature_usage", { detail: { feature: t } }));
}
class UT extends Ze {
  constructor(e = !1) {
    super(), this.__isAsync = e;
  }
  emit(e) {
    super.next(e);
  }
  subscribe(e, n, o) {
    var l, c, u;
    let r = e, i = n || (() => null), s = o;
    if (e && typeof e == "object") {
      const d = e;
      r = (l = d.next) == null ? void 0 : l.bind(d), i = (c = d.error) == null ? void 0 : c.bind(d), s = (u = d.complete) == null ? void 0 : u.bind(d);
    }
    this.__isAsync && (i = Lu(i), r && (r = Lu(r)), s && (s = Lu(s)));
    const a = super.subscribe({ next: r, error: i, complete: s });
    return e instanceof cr && e.add(a), a;
  }
}
function Lu(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
const Et = UT;
function Sm(...t) {
}
function GT() {
  const t = typeof xe.requestAnimationFrame == "function";
  let e = xe[t ? "requestAnimationFrame" : "setTimeout"], n = xe[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && n) {
    const o = e[Zone.__symbol__("OriginalDelegate")];
    o && (e = o);
    const r = n[Zone.__symbol__("OriginalDelegate")];
    r && (n = r);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: n };
}
class WT {
  constructor(e, n = console) {
    this.name = "asyncStackTagging for " + e, this.createTask = (n == null ? void 0 : n.createTask) ?? (() => null);
  }
  onScheduleTask(e, n, o, r) {
    return r.consoleTask = this.createTask(`Zone - ${r.source || r.type}`), e.scheduleTask(o, r);
  }
  onInvokeTask(e, n, o, r, i, s) {
    let a;
    return r.consoleTask ? a = r.consoleTask.run(() => e.invokeTask(o, r, i, s)) : a = e.invokeTask(o, r, i, s), a;
  }
}
class ae {
  constructor({ enableLongStackTrace: e = !1, shouldCoalesceEventChangeDetection: n = !1, shouldCoalesceRunChangeDetection: o = !1 }) {
    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Et(!1), this.onMicrotaskEmpty = new Et(!1), this.onStable = new Et(!1), this.onError = new Et(!1), typeof Zone > "u")
      throw new b(908, ngDevMode && "In this configuration Angular requires Zone.js");
    Zone.assertZonePatched();
    const r = this;
    r._nesting = 0, r._outer = r._inner = Zone.current, ngDevMode && (r._inner = r._inner.fork(new WT("Angular"))), Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())), e && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)), r.shouldCoalesceEventChangeDetection = !o && n, r.shouldCoalesceRunChangeDetection = o, r.lastRequestAnimationFrameId = -1, r.nativeRequestAnimationFrame = GT().nativeRequestAnimationFrame, YT(r);
  }
  /**
    This method checks whether the method call happens within an Angular Zone instance.
  */
  static isInAngularZone() {
    return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
  }
  /**
    Assures that the method is called within the Angular Zone, otherwise throws an error.
  */
  static assertInAngularZone() {
    if (!ae.isInAngularZone())
      throw new b(909, ngDevMode && "Expected to be in Angular Zone, but it is not!");
  }
  /**
    Assures that the method is called outside of the Angular Zone, otherwise throws an error.
  */
  static assertNotInAngularZone() {
    if (ae.isInAngularZone())
      throw new b(909, ngDevMode && "Expected to not be in Angular Zone, but it is!");
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone and returns value returned by
   * the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  run(e, n, o) {
    return this._inner.run(e, n, o);
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone as a task and returns value
   * returned by the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  runTask(e, n, o, r) {
    const i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + r, e, zT, Sm, Sm);
    try {
      return i.runTask(s, n, o);
    } finally {
      i.cancelTask(s);
    }
  }
  /**
   * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
   * rethrown.
   */
  runGuarded(e, n, o) {
    return this._inner.runGuarded(e, n, o);
  }
  /**
   * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
   * the function.
   *
   * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
   * work that
   * doesn't trigger Angular change-detection or is subject to Angular's error handling.
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * outside of the Angular zone.
   *
   * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
   */
  runOutsideAngular(e) {
    return this._outer.run(e);
  }
}
const zT = {};
function Yh(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if (t._nesting--, !t.hasPendingMicrotasks)
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function qT(t) {
  t.isCheckStableRunning || t.lastRequestAnimationFrameId !== -1 || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(xe, () => {
    t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
      t.lastRequestAnimationFrameId = -1, Qd(t), t.isCheckStableRunning = !0, Yh(t), t.isCheckStableRunning = !1;
    }, void 0, () => {
    }, () => {
    })), t.fakeTopEventTask.invoke();
  }), Qd(t));
}
function YT(t) {
  const e = () => {
    qT(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (n, o, r, i, s, a) => {
      if (ZT(a))
        return n.invokeTask(r, i, s, a);
      try {
        return wm(t), n.invokeTask(r, i, s, a);
      } finally {
        (t.shouldCoalesceEventChangeDetection && i.type === "eventTask" || t.shouldCoalesceRunChangeDetection) && e(), Mm(t);
      }
    },
    onInvoke: (n, o, r, i, s, a, l) => {
      try {
        return wm(t), n.invoke(r, i, s, a, l);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), Mm(t);
      }
    },
    onHasTask: (n, o, r, i) => {
      n.hasTask(r, i), o === r && (i.change == "microTask" ? (t._hasPendingMicrotasks = i.microTask, Qd(t), Yh(t)) : i.change == "macroTask" && (t.hasPendingMacrotasks = i.macroTask));
    },
    onHandleError: (n, o, r, i) => (n.handleError(r, i), t.runOutsideAngular(() => t.onError.emit(i)), !1)
  });
}
function Qd(t) {
  t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && t.lastRequestAnimationFrameId !== -1 ? t.hasPendingMicrotasks = !0 : t.hasPendingMicrotasks = !1;
}
function wm(t) {
  t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null));
}
function Mm(t) {
  t._nesting--, Yh(t);
}
class Zh {
  constructor() {
    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Et(), this.onMicrotaskEmpty = new Et(), this.onStable = new Et(), this.onError = new Et();
  }
  run(e, n, o) {
    return e.apply(n, o);
  }
  runGuarded(e, n, o) {
    return e.apply(n, o);
  }
  runOutsideAngular(e) {
    return e();
  }
  runTask(e, n, o, r) {
    return e.apply(n, o);
  }
}
function ZT(t) {
  var e;
  return !Array.isArray(t) || t.length !== 1 ? !1 : ((e = t[0].data) == null ? void 0 : e.__ignore_ng_zone__) === !0;
}
function QT(t = "zone.js", e) {
  return t === "noop" ? new Zh() : t === "zone.js" ? new ae(e) : t;
}
var mn;
(function(t) {
  t[t.EarlyRead = 0] = "EarlyRead", t[t.Write = 1] = "Write", t[t.MixedReadWrite = 2] = "MixedReadWrite", t[t.Read = 3] = "Read";
})(mn || (mn = {}));
const gb = {
  destroy() {
  }
};
function Kd(t, e) {
  const n = (e == null ? void 0 : e.injector) ?? A(Ve);
  if (!kn(n))
    return;
  n.get(Gn).internalCallbacks.push(t);
}
function Xd(t, e) {
  ngDevMode && qh(Xd, "Call `afterRender` outside of a reactive context. For example, schedule the render callback inside the component constructor`."), !e && Pc(Xd);
  const n = (e == null ? void 0 : e.injector) ?? A(Ve);
  if (!kn(n))
    return gb;
  Tn("NgAfterRender");
  const o = n.get(Gn), r = o.handler ?? (o.handler = new vb()), i = (e == null ? void 0 : e.phase) ?? mn.MixedReadWrite, s = () => {
    r.unregister(l), a();
  }, a = n.get(nr).onDestroy(s), l = new yb(n, i, t);
  return r.register(l), { destroy: s };
}
function mb(t, e) {
  !e && Pc(mb);
  const n = (e == null ? void 0 : e.injector) ?? A(Ve);
  if (!kn(n))
    return gb;
  Tn("NgAfterNextRender");
  const o = n.get(Gn), r = o.handler ?? (o.handler = new vb()), i = (e == null ? void 0 : e.phase) ?? mn.MixedReadWrite, s = () => {
    r.unregister(l), a();
  }, a = n.get(nr).onDestroy(s), l = new yb(n, i, () => {
    s(), t();
  });
  return r.register(l), { destroy: s };
}
class yb {
  constructor(e, n, o) {
    this.phase = n, this.callbackFn = o, this.zone = e.get(ae), this.errorHandler = e.get(oo, null, { optional: !0 });
  }
  invoke() {
    var e;
    try {
      this.zone.runOutsideAngular(this.callbackFn);
    } catch (n) {
      (e = this.errorHandler) == null || e.handleError(n);
    }
  }
}
class vb {
  constructor() {
    this.executingCallbacks = !1, this.buckets = {
      // Note: the order of these keys controls the order the phases are run.
      [mn.EarlyRead]: /* @__PURE__ */ new Set(),
      [mn.Write]: /* @__PURE__ */ new Set(),
      [mn.MixedReadWrite]: /* @__PURE__ */ new Set(),
      [mn.Read]: /* @__PURE__ */ new Set()
    }, this.deferredCallbacks = /* @__PURE__ */ new Set();
  }
  register(e) {
    (this.executingCallbacks ? this.deferredCallbacks : this.buckets[e.phase]).add(e);
  }
  unregister(e) {
    this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
  }
  execute() {
    let e = !1;
    this.executingCallbacks = !0;
    for (const n of Object.values(this.buckets))
      for (const o of n)
        e = !0, o.invoke();
    this.executingCallbacks = !1;
    for (const n of this.deferredCallbacks)
      this.buckets[n.phase].add(n);
    return this.deferredCallbacks.clear(), e;
  }
  destroy() {
    for (const e of Object.values(this.buckets))
      e.clear();
    this.deferredCallbacks.clear();
  }
}
const Hs = class Hs {
  constructor() {
    this.handler = null, this.internalCallbacks = [];
  }
  /**
   * Executes callbacks. Returns `true` if any callbacks executed.
   */
  execute() {
    var o;
    const e = [...this.internalCallbacks];
    this.internalCallbacks.length = 0;
    for (const r of e)
      r();
    return !!((o = this.handler) == null ? void 0 : o.execute()) || e.length > 0;
  }
  ngOnDestroy() {
    var e;
    (e = this.handler) == null || e.destroy(), this.handler = null, this.internalCallbacks.length = 0;
  }
};
Hs.ɵprov = oe({
  token: Hs,
  providedIn: "root",
  factory: () => new Hs()
});
let Gn = Hs;
function KT(t, e) {
  ngDevMode && x(Ea(t), !0, "Should be run in creation mode");
  const n = vt(e, t), o = n[E];
  XT(o, n);
  const r = n[pe];
  r !== null && n[Pt] === null && (n[Pt] = kh(r, n[Je])), Qh(o, n, n[re]);
}
function XT(t, e) {
  for (let n = e.length; n < t.blueprint.length; n++)
    e.push(t.blueprint[n]);
}
function Qh(t, e, n) {
  ngDevMode && x(Ea(e), !0, "Should be run in creation mode"), oh(e);
  try {
    const o = t.viewQuery;
    o !== null && zd(1, o, n);
    const r = t.template;
    r !== null && tb(t, e, r, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && lb(t, e), t.staticViewQueries && zd(2, t.viewQuery, n);
    const i = t.components;
    i !== null && JT(e, i);
  } catch (o) {
    throw t.firstCreatePass && (t.incompleteFirstPass = !0, t.firstCreatePass = !1), o;
  } finally {
    e[O] &= -5, rh();
  }
}
function JT(t, e) {
  for (let n = 0; n < e.length; n++)
    KT(t, e[n]);
}
function Vl(t, e, n) {
  ngDevMode && ct(N(), "Expecting to be called in first template pass only");
  let o = n ? t.styles : null, r = n ? t.classes : null, i = 0;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      const a = e[s];
      if (typeof a == "number")
        i = a;
      else if (i == 1)
        r = hd(r, a);
      else if (i == 2) {
        const l = a, c = e[++s];
        o = hd(o, l + ": " + c + ";");
      }
    }
  n ? t.styles = o : t.stylesWithoutHost = o, n ? t.classes = r : t.classesWithoutHost = r;
}
class Db extends Jo {
  /**
   * @param ngModule The NgModuleRef to which all resolved factories are bound.
   */
  constructor(e) {
    super(), this.ngModule = e;
  }
  resolveComponentFactory(e) {
    ngDevMode && kM(e);
    const n = H(e);
    return new rs(n, this.ngModule);
  }
}
function Am(t) {
  const e = [];
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n];
    o !== void 0 && e.push({
      propName: Array.isArray(o) ? o[0] : o,
      templateName: n
    });
  }
  return e;
}
function ex(t) {
  const e = t.toLowerCase();
  return e === "svg" ? $v : e === "math" ? Bv : null;
}
class tx {
  constructor(e, n) {
    this.injector = e, this.parentInjector = n;
  }
  get(e, n, o) {
    o = ma(o);
    const r = this.injector.get(e, gl, o);
    return r !== gl || n === gl ? r : this.parentInjector.get(e, n, o);
  }
}
class rs extends $l {
  get inputs() {
    const e = this.componentDef, n = e.inputTransforms, o = Am(e.inputs);
    if (n !== null)
      for (const r of o)
        n.hasOwnProperty(r.propName) && (r.transform = n[r.propName]);
    return o;
  }
  get outputs() {
    return Am(this.componentDef.outputs);
  }
  /**
   * @param componentDef The component definition.
   * @param ngModule The NgModuleRef to which the factory is bound.
   */
  constructor(e, n) {
    super(), this.componentDef = e, this.ngModule = n, this.componentType = e.type, this.selector = Cv(e.selectors), this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [], this.isBoundToModule = !!n;
  }
  create(e, n, o, r) {
    var M;
    if (ngDevMode && (typeof ngJitMode > "u" || ngJitMode) && ((M = this.componentDef.debugInfo) != null && M.forbidOrphanRendering) && Zo.isOrphanComponent(this.componentType))
      throw new b(1001, `Orphan component found! Trying to render the component ${Xw(this.componentType)} without first loading the NgModule that declares it. It is recommended to make this component standalone in order to avoid this error. If this is not possible now, import the component's NgModule in the appropriate NgModule, or the standalone component in which you are trying to render this component. If this is a lazy import, load the NgModule lazily as well and use its module injector.`);
    r = r || this.ngModule;
    let i = r instanceof on ? r : r == null ? void 0 : r.injector;
    i && this.componentDef.getStandaloneInjector !== null && (i = this.componentDef.getStandaloneInjector(i) || i);
    const s = i ? new tx(e, i) : e, a = s.get(LC, null);
    if (a === null)
      throw new b(407, ngDevMode && "Angular was not able to inject a renderer (RendererFactory2). Likely this is due to a broken DI hierarchy. Make sure that any injector used to create this component has a correct parent.");
    const l = s.get(Bl, null), c = s.get(Gn, null), u = s.get(xh, null), d = {
      rendererFactory: a,
      sanitizer: l,
      // We don't use inline effects (yet).
      inlineEffectRunner: null,
      afterRenderEventManager: c,
      changeDetectionScheduler: u
    }, f = a.createRenderer(null, this.componentDef), h = this.componentDef.selectors[0][0] || "div", p = o ? rT(f, o, this.componentDef.encapsulation, s) : jc(f, h, ex(h));
    let g = 512;
    this.componentDef.signals ? g |= 4096 : this.componentDef.onPush || (g |= 16);
    let y = null;
    p !== null && (y = kh(
      p,
      s,
      !0
      /* isRootView */
    ));
    const D = Vh(0, null, null, 1, 0, null, null, null, null, null, null), m = Zc(null, D, null, g, null, null, d, f, s, null, y);
    oh(m);
    let I, w;
    try {
      const P = this.componentDef;
      let Se, Oe = null;
      P.findHostDirectiveDefs ? (Se = [], Oe = /* @__PURE__ */ new Map(), P.findHostDirectiveDefs(P, Se, Oe), Se.push(P), ngDevMode && Ov(Se)) : Se = [P];
      const pt = nx(m, p), io = ox(pt, p, P, Se, m, d, f);
      w = ba(D, T), p && sx(f, P, p, o), n !== void 0 && ax(w, this.ngContentSelectors, n), I = ix(io, P, Se, Oe, m, [bb]), Qh(D, m, null);
    } finally {
      rh();
    }
    return new Cb(this.componentType, I, ns(w, m), m, w);
  }
}
class Cb extends NC {
  constructor(e, n, o, r, i) {
    super(), this.location = o, this._rootLView = r, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new hi(
      r,
      void 0,
      /* _cdRefInjectingView */
      !1
    ), this.componentType = e;
  }
  setInput(e, n) {
    const o = this._tNode.inputs;
    let r;
    if (o !== null && (r = o[e])) {
      if (this.previousInputValues ?? (this.previousInputValues = /* @__PURE__ */ new Map()), this.previousInputValues.has(e) && Object.is(this.previousInputValues.get(e), n))
        return;
      const i = this._rootLView;
      Wh(i[E], i, r, e, n), this.previousInputValues.set(e, n);
      const s = vt(this._tNode.index, i);
      Fa(s);
    } else if (ngDevMode) {
      const i = G(this.componentType);
      let s = `Can't set value of the '${e}' input on the '${i}' component. `;
      s += `Make sure that the '${e}' property is annotated with @Input() or a mapped @Input('${e}') exists.`, qD(s);
    }
  }
  get injector() {
    return new fe(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(e) {
    this.hostView.onDestroy(e);
  }
}
function nx(t, e) {
  const n = t[E], o = T;
  return ngDevMode && be(t, o), t[o] = e, os(n, o, 2, "#host", null);
}
function ox(t, e, n, o, r, i, s) {
  const a = r[E];
  rx(o, t, e, s);
  let l = null;
  e !== null && (l = kh(e, r[Je]));
  const c = i.rendererFactory.createRenderer(e, n);
  let u = 16;
  n.signals ? u = 4096 : n.onPush && (u = 64);
  const d = Zc(r, nb(n), null, u, r[t.index], t, i, c, null, null, l);
  return a.firstCreatePass && Wd(a, t, o.length - 1), Qc(r, d), r[t.index] = d;
}
function rx(t, e, n, o) {
  for (const r of t)
    e.mergedAttrs = Zs(e.mergedAttrs, r.hostAttrs);
  e.mergedAttrs !== null && (Vl(e, e.mergedAttrs, !0), n !== null && yC(o, n, e));
}
function ix(t, e, n, o, r, i) {
  const s = K();
  ngDevMode && S(s, "tNode should have been already created");
  const a = r[E], l = Ge(s, r);
  ib(a, r, s, n, null, o);
  for (let u = 0; u < n.length; u++) {
    const d = s.directiveStart + u, f = zo(r, a, d, s);
    $e(f, r);
  }
  sb(a, r, s), l && $e(l, r), ngDevMode && Jn(s.componentOffset, -1, "componentOffset must be great than -1");
  const c = zo(r, a, s.directiveStart + s.componentOffset, s);
  if (t[re] = r[re] = c, i !== null)
    for (const u of i)
      u(c, e);
  return Bh(a, s, t), c;
}
function sx(t, e, n, o) {
  if (o)
    Cd(t, n, ["ng-version", "17.1.1"]);
  else {
    const { attrs: r, classes: i } = _M(e.selectors[0]);
    r && Cd(t, n, r), i && i.length > 0 && mC(t, n, i.join(" "));
  }
}
function ax(t, e, n) {
  const o = t.projection = [];
  for (let r = 0; r < e.length; r++) {
    const i = n[r];
    o.push(i != null ? Array.from(i) : null);
  }
}
function bb() {
  const t = K();
  ngDevMode && S(t, "TNode is required"), Ac(v()[E], t);
}
function Eb(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function Kh(t) {
  let e = Eb(t.type), n = !0;
  const o = [t];
  for (; e; ) {
    let r;
    if (wt(t))
      r = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp)
        throw new b(903, ngDevMode && `Directives cannot inherit Components. Directive ${G(t.type)} is attempting to extend component ${G(e)}`);
      r = e.ɵdir;
    }
    if (r) {
      if (n) {
        o.push(r);
        const s = t;
        s.inputs = Za(t.inputs), s.inputTransforms = Za(t.inputTransforms), s.declaredInputs = Za(t.declaredInputs), s.outputs = Za(t.outputs);
        const a = r.hostBindings;
        a && fx(t, a);
        const l = r.viewQuery, c = r.contentQueries;
        if (l && ux(t, l), c && dx(t, c), lx(t, r), Zw(t.outputs, r.outputs), wt(r) && r.data.animation) {
          const u = t.data;
          u.animation = (u.animation || []).concat(r.data.animation);
        }
      }
      const i = r.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          const a = i[s];
          a && a.ngInherit && a(t), a === Kh && (n = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  cx(o);
}
function lx(t, e) {
  for (const n in e.inputs) {
    if (!e.inputs.hasOwnProperty(n) || t.inputs.hasOwnProperty(n))
      continue;
    const o = e.inputs[n];
    if (o !== void 0 && (t.inputs[n] = o, t.declaredInputs[n] = e.declaredInputs[n], e.inputTransforms !== null)) {
      const r = Array.isArray(o) ? o[0] : o;
      if (!e.inputTransforms.hasOwnProperty(r))
        continue;
      t.inputTransforms ?? (t.inputTransforms = {}), t.inputTransforms[r] = e.inputTransforms[r];
    }
  }
}
function cx(t) {
  let e = 0, n = null;
  for (let o = t.length - 1; o >= 0; o--) {
    const r = t[o];
    r.hostVars = e += r.hostVars, r.hostAttrs = Zs(r.hostAttrs, n = Zs(n, r.hostAttrs));
  }
}
function Za(t) {
  return t === kt ? {} : t === q ? [] : t;
}
function ux(t, e) {
  const n = t.viewQuery;
  n ? t.viewQuery = (o, r) => {
    e(o, r), n(o, r);
  } : t.viewQuery = e;
}
function dx(t, e) {
  const n = t.contentQueries;
  n ? t.contentQueries = (o, r, i) => {
    e(o, r, i), n(o, r, i);
  } : t.contentQueries = e;
}
function fx(t, e) {
  const n = t.hostBindings;
  n ? t.hostBindings = (o, r) => {
    e(o, r), n(o, r);
  } : t.hostBindings = e;
}
const hx = [
  // The child class should use the providers of its parent.
  "providersResolver"
  // Not listed here are any fields which are handled by the `ɵɵInheritDefinitionFeature`, such
  // as inputs, outputs, and host binding functions.
], px = [
  // The child class should use the template function of its parent, including all template
  // semantics.
  "template",
  "decls",
  "consts",
  "vars",
  "onPush",
  "ngContentSelectors",
  // The child class should use the CSS styles of its parent, including all styling semantics.
  "styles",
  "encapsulation",
  // The child class should be checked by the runtime in the same way as its parent.
  "schemas"
];
function Ib(t) {
  let e = Eb(t.type), n;
  wt(t) ? n = e.ɵcmp : n = e.ɵdir;
  const o = t;
  for (const r of hx)
    o[r] = n[r];
  if (wt(n))
    for (const r of px)
      o[r] = n[r];
}
function Sb(t) {
  const e = (n) => {
    const o = (Array.isArray(t) ? t : t()).map((r) => typeof r == "function" ? { directive: k(r), inputs: kt, outputs: kt } : {
      directive: k(r.directive),
      inputs: _m(r.inputs),
      outputs: _m(r.outputs)
    });
    n.hostDirectives === null ? (n.findHostDirectiveDefs = wb, n.hostDirectives = o) : n.hostDirectives.unshift(...o);
  };
  return e.ngInherit = !0, e;
}
function wb(t, e, n) {
  if (t.hostDirectives !== null)
    for (const o of t.hostDirectives) {
      const r = Fe(o.directive);
      (typeof ngDevMode > "u" || ngDevMode) && mx(o, r), gx(r.declaredInputs, o.inputs), wb(r, e, n), n.set(r, o), e.push(r);
    }
}
function _m(t) {
  if (t === void 0 || t.length === 0)
    return kt;
  const e = {};
  for (let n = 0; n < t.length; n += 2)
    e[t[n]] = t[n + 1];
  return e;
}
function gx(t, e) {
  for (const n in e)
    if (e.hasOwnProperty(n)) {
      const o = e[n], r = t[n];
      (typeof ngDevMode > "u" || ngDevMode) && t.hasOwnProperty(o) && x(t[o], t[n], `Conflicting host directive input alias ${n}.`), t[o] = r;
    }
}
function mx(t, e) {
  const n = t.directive;
  if (e === null)
    throw H(n) !== null ? new b(310, `Host directive ${n.name} cannot be a component.`) : new b(307, `Could not resolve metadata for host directive ${n.name}. Make sure that the ${n.name} class is annotated with an @Directive decorator.`);
  if (!e.standalone)
    throw new b(308, `Host directive ${e.type.name} must be standalone.`);
  Tm("input", e, t.inputs), Tm("output", e, t.outputs);
}
function Tm(t, e, n) {
  const o = e.type.name, r = t === "input" ? e.inputs : e.outputs;
  for (const i in n)
    if (n.hasOwnProperty(i)) {
      if (!r.hasOwnProperty(i))
        throw new b(311, `Directive ${o} does not have an ${t} with a public name of ${i}.`);
      const s = n[i];
      if (r.hasOwnProperty(s) && s !== i)
        throw new b(312, `Cannot alias ${t} ${i} of host directive ${o} to ${s}, because it already has a different ${t} with the same public name.`);
    }
}
function Mb(t) {
  const e = t.inputConfig, n = {};
  for (const o in e)
    if (e.hasOwnProperty(o)) {
      const r = e[o];
      Array.isArray(r) && r[3] && (n[o] = r[3]);
    }
  t.inputTransforms = n;
}
const Jd = "<-- AT THIS LOCATION";
function yx(t) {
  switch (t) {
    case 4:
      return "view container";
    case 2:
      return "element";
    case 8:
      return "ng-container";
    case 32:
      return "icu";
    case 64:
      return "i18n";
    case 16:
      return "projection";
    case 1:
      return "text";
    default:
      return "<unknown>";
  }
}
function Ra(t, e, n, o, r, i = !1) {
  var s;
  if (!t || t.nodeType !== e || t.nodeType === Node.ELEMENT_NODE && t.tagName.toLowerCase() !== (n == null ? void 0 : n.toLowerCase())) {
    let l = `During hydration Angular expected ${Om(e, n, null)} but `;
    const c = Nc(o), u = (s = c == null ? void 0 : c.type) == null ? void 0 : s.name, d = `Angular expected this DOM:

${Xh(o, r, i)}

`;
    let f = "";
    if (!t)
      l += `the node was not found.

`;
    else {
      const g = Om(t.nodeType, t.tagName ?? null, t.textContent ?? null);
      l += `found ${g}.

`, f = `Actual DOM is:

${Jc(t)}

`;
    }
    const h = ka(u), p = l + d + f + _b() + h;
    throw new b(-500, p);
  }
}
function Ab(t) {
  if (Xc(t), !t.nextSibling) {
    const e = `During hydration Angular expected more sibling nodes to be present.

`, n = `Actual DOM is:

${Jc(t)}

`, o = ka(), r = e + n + o;
    throw new b(-501, r);
  }
}
function Xc(t, e = null, n = null) {
  if (!t) {
    const o = `During hydration, Angular expected an element to be present at this location.

`;
    let r = "", i = "";
    throw e !== null && n !== null && (r = `${Xh(e, n, !1)}

`, i = ka()), new b(-502, o + r + i);
  }
}
function vx(t, e) {
  const n = `During serialization, Angular was unable to find an element in the DOM:

`, o = `${Xh(t, e, !1)}

`, r = ka();
  throw new b(-502, n + o + r);
}
function xm(t, e) {
  const n = `During hydration Angular was unable to locate a node using the "${e}" path, starting from the ${Fs(t)} node.

`, o = ka();
  throw new b(-502, n + o);
}
function Dx(t) {
  const e = "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n", n = `${Jc(t)}

`, o = e + n + _b();
  return new b(-503, o);
}
function Cx(t) {
  const e = "The `ngSkipHydration` flag is applied on a node that doesn't act as a component host. Hydration can be skipped only on per-component basis.\n\n", n = `${Jc(t)}

`, r = e + n + "Please move the `ngSkipHydration` attribute to the component host element.\n\n";
  return new b(-504, r);
}
function bx(t) {
  const e = [];
  if (t.attrs)
    for (let n = 0; n < t.attrs.length; ) {
      const o = t.attrs[n++];
      if (typeof o == "number")
        break;
      const r = t.attrs[n++];
      e.push(`${o}="${sa(r)}"`);
    }
  return e.join(" ");
}
const Ex = /* @__PURE__ */ new Set(["ngh", "ng-version", "ng-server-context"]);
function Ix(t) {
  const e = [];
  for (let n = 0; n < t.attributes.length; n++) {
    const o = t.attributes[n];
    Ex.has(o.name) || e.push(`${o.name}="${sa(o.value)}"`);
  }
  return e.join(" ");
}
function $u(t, e = "…") {
  switch (t.type) {
    case 1:
      return `#text${t.value ? `(${t.value})` : ""}`;
    case 2:
      const o = bx(t), r = t.value.toLowerCase();
      return `<${r}${o ? " " + o : ""}>${e}</${r}>`;
    case 8:
      return "<!-- ng-container -->";
    case 4:
      return "<!-- container -->";
    default:
      return `#node(${yx(t.type)})`;
  }
}
function Fs(t, e = "…") {
  const n = t;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      const o = n.tagName.toLowerCase(), r = Ix(n);
      return `<${o}${r ? " " + r : ""}>${e}</${o}>`;
    case Node.TEXT_NODE:
      const i = n.textContent ? sa(n.textContent) : "";
      return `#text${i ? `(${i})` : ""}`;
    case Node.COMMENT_NODE:
      return `<!-- ${sa(n.textContent ?? "")} -->`;
    default:
      return `#node(${n.nodeType})`;
  }
}
function Xh(t, e, n) {
  const o = "  ";
  let r = "";
  e.prev ? (r += o + `…
`, r += o + $u(e.prev) + `
`) : e.type && e.type & 12 && (r += o + `…
`), n ? (r += o + $u(e) + `
`, r += o + `<!-- container -->  ${Jd}
`) : r += o + $u(e) + `  ${Jd}
`, r += o + `…
`;
  const i = e.type ? wh(t[E], e, t) : null;
  return i && (r = Fs(i, `
` + r)), r;
}
function Jc(t) {
  const e = "  ";
  let n = "";
  const o = t;
  return o.previousSibling && (n += e + `…
`, n += e + Fs(o.previousSibling) + `
`), n += e + Fs(o) + `  ${Jd}
`, t.nextSibling && (n += e + `…
`), t.parentNode && (n = Fs(o.parentNode, `
` + n)), n;
}
function Om(t, e, n) {
  switch (t) {
    case Node.ELEMENT_NODE:
      return `<${e.toLowerCase()}>`;
    case Node.TEXT_NODE:
      return `a text node${n ? ` (with the "${sa(n)}" content)` : ""}`;
    case Node.COMMENT_NODE:
      return "a comment node";
    default:
      return `#node(nodeType=${t})`;
  }
}
function ka(t) {
  return `To fix this problem:
  * check ${t ? `the "${t}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
function _b() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
function Sx(t) {
  return t.replace(/\s+/gm, "");
}
function sa(t, e = 50) {
  return t ? (t = Sx(t), t.length > e ? `${t.substring(0, e - 1)}…` : t) : "";
}
function Tb(t) {
  const e = t[Ks] ?? [], o = t[Ce][B];
  for (const r of e)
    wx(r, o), ngDevMode && ngDevMode.dehydratedViewsRemoved++;
  t[Ks] = q;
}
function wx(t, e) {
  let n = 0, o = t.firstChild;
  if (o) {
    const r = t.data[fi];
    for (; n < r; ) {
      ngDevMode && Ab(o);
      const i = o.nextSibling;
      Gc(e, o, !1), o = i, n++;
    }
  }
}
function xb(t) {
  Tb(t);
  for (let e = ue; e < t.length; e++)
    Ul(t[e]);
}
function Ul(t) {
  const e = t[E];
  for (let n = T; n < e.bindingStartIndex; n++)
    if (Pe(t[n])) {
      const o = t[n];
      xb(o);
    } else
      je(t[n]) && Ul(t[n]);
}
function Mx(t) {
  const e = t._views;
  for (const n of e) {
    const o = kC(n);
    if (o !== null && o[pe] !== null) {
      if (je(o))
        Ul(o);
      else {
        const r = o[pe];
        Ul(r), xb(o);
      }
      ngDevMode && ngDevMode.dehydratedViewsCleanupRuns++;
    }
  }
}
const Ax = new RegExp(`^(\\d+)*(${Fh}|${Oh})*(.*)`);
function _x(t, e) {
  const n = [t];
  for (const o of e) {
    const r = n.length - 1;
    if (r > 0 && n[r - 1] === o) {
      const i = n[r] || 1;
      n[r] = i + 1;
    } else
      n.push(o, "");
  }
  return n.join("");
}
function Tx(t) {
  const e = t.match(Ax), [n, o, r, i] = e, s = o ? parseInt(o, 10) : r, a = [];
  for (const [l, c, u] of i.matchAll(/(f|n)(\d*)/g)) {
    const d = parseInt(u, 10) || 1;
    a.push(c, d);
  }
  return [s, ...a];
}
function xx(t) {
  var e;
  return !t.prev && ((e = t.parent) == null ? void 0 : e.type) === 8;
}
function Bu(t) {
  return t.index - T;
}
function aa(t, e) {
  var n;
  return !(t.type & 16) && !!e[t.index] && !((n = se(e[t.index])) != null && n.isConnected);
}
function eu(t, e, n, o) {
  let r = null;
  const i = Bu(o), s = t.data[Es];
  if (s != null && s[i])
    r = Fx(s[i], n);
  else if (e.firstChild === o)
    r = t.firstChild;
  else {
    const a = o.prev === null, l = o.prev ?? o.parent;
    if (ngDevMode && S(l, "Unexpected state: current TNode does not have a connection to the previous node or a parent node."), xx(o)) {
      const c = Bu(o.parent);
      r = Ud(t, c);
    } else {
      let c = Ge(l, n);
      if (a)
        r = c.firstChild;
      else {
        const u = Bu(l), d = Ud(t, u);
        if (l.type === 2 && d) {
          const h = Ph(t, u) + 1;
          r = tu(h, d);
        } else
          r = c.nextSibling;
      }
    }
  }
  return r;
}
function tu(t, e) {
  let n = e;
  for (let o = 0; o < t; o++)
    ngDevMode && Ab(n), n = n.nextSibling;
  return n;
}
function Fm(t) {
  const e = [];
  for (let n = 0; n < t.length; n += 2) {
    const o = t[n], r = t[n + 1];
    for (let i = 0; i < r; i++)
      e.push(o === Xo.FirstChild ? "firstChild" : "nextSibling");
  }
  return e.join(".");
}
function Ox(t, e) {
  let n = t;
  for (let o = 0; o < e.length; o += 2) {
    const r = e[o], i = e[o + 1];
    for (let s = 0; s < i; s++) {
      if (ngDevMode && !n)
        throw xm(t, Fm(e));
      switch (r) {
        case Xo.FirstChild:
          n = n.firstChild;
          break;
        case Xo.NextSibling:
          n = n.nextSibling;
          break;
      }
    }
  }
  if (ngDevMode && !n)
    throw xm(t, Fm(e));
  return n;
}
function Fx(t, e) {
  const [n, ...o] = Tx(t);
  let r;
  if (n === Oh)
    r = e[ge][pe];
  else if (n === Fh)
    r = yh(e[ge][pe]);
  else {
    const i = Number(n);
    r = se(e[i + T]);
  }
  return Ox(r, o);
}
function ef(t, e) {
  if (t === e)
    return [];
  if (t.parentElement == null || e.parentElement == null)
    return null;
  if (t.parentElement === e.parentElement)
    return Rx(t, e);
  {
    const n = e.parentElement, o = ef(t, n), r = ef(n.firstChild, e);
    return !o || !r ? null : [
      // First navigate to `finish`'s parent
      ...o,
      // Then to its first child.
      Xo.FirstChild,
      // And finally from that node to `finish` (maybe a no-op if we're already there).
      ...r
    ];
  }
}
function Rx(t, e) {
  const n = [];
  let o = null;
  for (o = t; o != null && o !== e; o = o.nextSibling)
    n.push(Xo.NextSibling);
  return o == null ? null : n;
}
function Rm(t, e, n) {
  const o = ef(t, e);
  return o === null ? null : _x(n, o);
}
function kx(t, e) {
  let n = t.parent, o, r, i;
  for (; n !== null && aa(n, e); )
    n = n.parent;
  n === null || !(n.type & 3) ? (o = i = Oh, r = e[ge][pe]) : (o = n.index, r = se(e[o]), i = L(o - T));
  let s = se(e[t.index]);
  if (t.type & 12) {
    const l = xs(e, t);
    l && (s = l);
  }
  let a = Rm(r, s, i);
  if (a === null && r !== s) {
    const l = r.ownerDocument.body;
    if (a = Rm(l, s, Fh), a === null)
      throw vx(e, t);
  }
  return a;
}
function Px(t, e) {
  const n = [];
  for (const o of e)
    for (let r = 0; r < (o[Sr] ?? 1); r++) {
      const i = {
        data: o,
        firstChild: null
      };
      o[fi] > 0 && (i.firstChild = t, t = tu(o[fi], t)), n.push(i);
    }
  return [t, n];
}
let Ob = () => null;
function Nx(t, e) {
  const n = t[Ks];
  return !e || n === null || n.length === 0 ? null : n[0].data[Vd] === e ? n.shift() : (Tb(t), null);
}
function Lx() {
  Ob = Nx;
}
function pi(t, e) {
  return Ob(t, e);
}
function Pa(t, e, n, o) {
  const r = e.tView;
  ngDevMode && S(r, "TView must be defined for a template node."), ngDevMode && tt(e, t);
  const s = t[O] & 4096 ? 4096 : 16, a = Zc(t, r, n, s, null, e, null, null, null, (o == null ? void 0 : o.injector) ?? null, (o == null ? void 0 : o.dehydratedView) ?? null), l = t[e.index];
  ngDevMode && lt(l), a[va] = l;
  const c = t[St];
  return c !== null && (a[St] = c.createEmbeddedView(r)), Qh(r, a, n), a;
}
function Fb(t, e) {
  const n = ue + e;
  if (n < t.length) {
    const o = t[n];
    return ngDevMode && an(o), o;
  }
}
function gi(t, e) {
  return !e || e.firstChild === null || Nl(t);
}
function Na(t, e, n, o = !0) {
  const r = e[E];
  if (OA(r, e, t, n), o) {
    const s = Bd(n, t), a = e[B], l = Vc(a, t[Jt]);
    l !== null && TA(r, t[Ue], a, e, l, s);
  }
  const i = e[Pt];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Jh(t, e) {
  const n = ra(t, e);
  return n !== void 0 && Hc(n[E], n), n;
}
const Pg = class Pg {
};
Pg.__NG_ELEMENT_ID__ = $x;
let Me = Pg;
function $x() {
  const t = K();
  return kb(t, v());
}
const Bx = Me, Rb = class extends Bx {
  constructor(e, n, o) {
    super(), this._lContainer = e, this._hostTNode = n, this._hostLView = o;
  }
  get element() {
    return ns(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new fe(this._hostTNode, this._hostLView);
  }
  /** @deprecated No replacement */
  get parentInjector() {
    const e = _c(this._hostTNode, this._hostLView);
    if (ih(e)) {
      const n = ta(e, this._hostLView), o = ea(e);
      ngDevMode && Fv(n, o);
      const r = n[E].data[
        o + 8
        /* NodeInjectorOffset.TNODE */
      ];
      return new fe(r, n);
    } else
      return new fe(null, this._hostLView);
  }
  clear() {
    for (; this.length > 0; )
      this.remove(this.length - 1);
  }
  get(e) {
    const n = km(this._lContainer);
    return n !== null && n[e] || null;
  }
  get length() {
    return this._lContainer.length - ue;
  }
  createEmbeddedView(e, n, o) {
    let r, i;
    typeof o == "number" ? r = o : o != null && (r = o.index, i = o.injector);
    const s = pi(this._lContainer, e.ssrId), a = e.createEmbeddedViewImpl(n || {}, i, s);
    return this.insertImpl(a, r, gi(this._hostTNode, s)), a;
  }
  createComponent(e, n, o, r, i) {
    const s = e && !Ds(e);
    let a;
    if (s)
      ngDevMode && x(typeof n != "object", !0, "It looks like Component factory was provided as the first argument and an options object as the second argument. This combination of arguments is incompatible. You can either change the first argument to provide Component type or change the second argument to be a number (representing an index at which to insert the new component's host view into this container)"), a = n;
    else {
      ngDevMode && (S(H(e), "Provided Component class doesn't contain Component definition. Please check whether provided class has @Component decorator."), x(typeof n != "number", !0, "It looks like Component type was provided as the first argument and a number (representing an index at which to insert the new component's host view into this container as the second argument. This combination of arguments is incompatible. Please use an object as the second argument instead."));
      const p = n || {};
      ngDevMode && p.environmentInjector && p.ngModuleRef && _("Cannot pass both environmentInjector and ngModuleRef options to createComponent()."), a = p.index, o = p.injector, r = p.projectableNodes, i = p.environmentInjector || p.ngModuleRef;
    }
    const l = s ? e : new rs(H(e)), c = o || this.parentInjector;
    if (!i && l.ngModule == null) {
      const g = (s ? c : this.parentInjector).get(on, null);
      g && (i = g);
    }
    const u = H(l.componentType ?? {}), d = pi(this._lContainer, (u == null ? void 0 : u.id) ?? null), f = (d == null ? void 0 : d.firstChild) ?? null, h = l.create(c, r, f, i);
    return this.insertImpl(h.hostView, a, gi(this._hostTNode, d)), h;
  }
  insert(e, n) {
    return this.insertImpl(e, n, !0);
  }
  insertImpl(e, n, o) {
    const r = e._lView;
    if (ngDevMode && e.destroyed)
      throw new Error("Cannot insert a destroyed View in a ViewContainer!");
    if (GM(r)) {
      const a = this.indexOf(e);
      if (a !== -1)
        this.detach(a);
      else {
        const l = r[Ce];
        ngDevMode && x(Pe(l), !0, "An attached view should have its PARENT point to a container.");
        const c = new Rb(l, l[Ue], l[Ce]);
        c.detach(c.indexOf(e));
      }
    }
    const i = this._adjustIndex(n), s = this._lContainer;
    return Na(s, r, i, o), e.attachToViewContainerRef(), ID(ju(s), i, e), e;
  }
  move(e, n) {
    if (ngDevMode && e.destroyed)
      throw new Error("Cannot move a destroyed View in a ViewContainer!");
    return this.insert(e, n);
  }
  indexOf(e) {
    const n = km(this._lContainer);
    return n !== null ? n.indexOf(e) : -1;
  }
  remove(e) {
    const n = this._adjustIndex(e, -1), o = ra(this._lContainer, n);
    o && (kl(ju(this._lContainer), n), Hc(o[E], o));
  }
  detach(e) {
    const n = this._adjustIndex(e, -1), o = ra(this._lContainer, n);
    return o && kl(ju(this._lContainer), n) != null ? new hi(o) : null;
  }
  _adjustIndex(e, n = 0) {
    return e == null ? this.length + n : (ngDevMode && (Jn(e, -1, `ViewRef index must be positive, got ${e}`), $n(e, this.length + 1 + n, "index")), e);
  }
};
function km(t) {
  return t[Tl];
}
function ju(t) {
  return t[Tl] || (t[Tl] = []);
}
function kb(t, e) {
  ngDevMode && He(
    t,
    15
    /* TNodeType.AnyRNode */
  );
  let n;
  const o = e[t.index];
  return Pe(o) ? n = o : (n = ab(o, e, null, t), e[t.index] = n, Qc(e, n)), Pb(n, e, t, o), new Rb(n, t, e);
}
function jx(t, e) {
  const n = t[B];
  ngDevMode && ngDevMode.rendererCreateComment++;
  const o = n.createComment(ngDevMode ? "container" : ""), r = Ge(e, t), i = Vc(n, r);
  return Qo(n, i, o, NA(n, r), !1), o;
}
let Pb = Lb, ep = () => !1;
function Nb(t, e, n) {
  return ep(t, e, n);
}
function Lb(t, e, n, o) {
  if (t[Jt])
    return;
  let r;
  n.type & 8 ? r = se(o) : r = jx(e, n), t[Jt] = r;
}
function Hx(t, e, n) {
  var u;
  if (t[Jt] && t[Ks])
    return !0;
  const o = n[Pt], r = e.index - T;
  if (!o || Ll(e) || Yc(o, r))
    return !1;
  const s = Ud(o, r), a = (u = o.data[Lo]) == null ? void 0 : u[r];
  ngDevMode && S(a, "Unexpected state: no hydration info available for a given TNode, which represents a view container.");
  const [l, c] = Px(s, a);
  return ngDevMode && (Ra(l, Node.COMMENT_NODE, null, n, e, !0), ts(l, !1)), t[Jt] = l, t[Ks] = c, !0;
}
function Vx(t, e, n, o) {
  ep(t, n, e) || Lb(t, e, n, o);
}
function Ux() {
  Pb = Vx, ep = Hx;
}
function dn(t, e, n) {
  return t[e] = n;
}
function La(t, e) {
  return ngDevMode && be(t, e), ngDevMode && dr(t[e], F, "Stored value should never be NO_CHANGE."), t[e];
}
function Ae(t, e, n) {
  ngDevMode && dr(n, F, "Incoming value should never be NO_CHANGE."), ngDevMode && $n(e, t.length, "Slot should have been initialized to NO_CHANGE");
  const o = t[e];
  if (Object.is(o, n))
    return !1;
  if (ngDevMode && fr()) {
    const r = o !== F ? o : void 0;
    if (!Lh(r, n)) {
      const i = tT(t, e, r, n);
      eT(o === F, i.oldValue, i.newValue, i.propName, t);
    }
    return !1;
  }
  return t[e] = n, !0;
}
function or(t, e, n, o) {
  const r = Ae(t, e, n);
  return Ae(t, e + 1, o) || r;
}
function nu(t, e, n, o, r) {
  const i = or(t, e, n, o);
  return Ae(t, e + 2, r) || i;
}
function At(t, e, n, o, r, i) {
  const s = or(t, e, n, o);
  return or(t, e + 2, r, i) || s;
}
function Gx(t, e, n, o, r, i, s, a, l) {
  ngDevMode && ct(e), ngDevMode && ngDevMode.firstCreatePass++;
  const c = e.consts, u = os(e, t, 4, s || null, en(c, a));
  Uh(e, n, u, en(c, l)), Ac(e, u);
  const d = u.tView = Vh(
    2,
    u,
    o,
    r,
    i,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    c,
    null
    /* ssrId */
  );
  return e.queries !== null && (e.queries.template(e, u), d.queries = e.queries.embeddedTView(u)), u;
}
function mi(t, e, n, o, r, i, s, a) {
  const l = v(), c = N(), u = t + T, d = c.firstCreatePass ? Gx(u, c, l, e, n, o, r, i, s) : c.data[u];
  tn(d, !1);
  const f = $b(c, l, d, t);
  Mc() && Uc(c, l, f, d), $e(f, l);
  const h = ab(f, l, f, d);
  return l[u] = h, Qc(l, h), Nb(h, d, l), Sc(d) && jh(c, l, d), s != null && Hh(l, d, a), mi;
}
let $b = Bb;
function Bb(t, e, n, o) {
  return to(!0), e[B].createComment(ngDevMode ? "container" : "");
}
function Wx(t, e, n, o) {
  var u;
  const r = e[Pt], i = !r || Zi() || Yc(r, o);
  if (to(i), i)
    return Bb(t, e);
  const s = ((u = r.data[bs]) == null ? void 0 : u[o]) ?? null;
  s !== null && n.tView !== null && (n.tView.ssrId === null ? n.tView.ssrId = s : ngDevMode && x(n.tView.ssrId, s, "Unexpected value of the `ssrId` for this TView"));
  const a = eu(r, t, e, n);
  ngDevMode && Xc(a, e, n), qc(r, o, a);
  const l = Ph(r, o), c = tu(l, a);
  return ngDevMode && (Ra(c, Node.COMMENT_NODE, null, e, n), ts(c)), c;
}
function zx() {
  $b = Wx;
}
var me;
(function(t) {
  t[t.NOT_STARTED = 0] = "NOT_STARTED", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.COMPLETE = 2] = "COMPLETE", t[t.FAILED = 3] = "FAILED";
})(me || (me = {}));
const Pm = 0, qx = 1;
var de;
(function(t) {
  t[t.Placeholder = 0] = "Placeholder", t[t.Loading = 1] = "Loading", t[t.Complete = 2] = "Complete", t[t.Error = 3] = "Error";
})(de || (de = {}));
var yi;
(function(t) {
  t[t.Initial = -1] = "Initial";
})(yi || (yi = {}));
const ni = 0, $a = 1, Ss = 2, Qa = 3, jb = 4, Hb = 5;
var Gl;
(function(t) {
  t[t.Manual = 0] = "Manual", t[t.Playthrough = 1] = "Playthrough";
})(Gl || (Gl = {}));
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ou(t, e, n) {
  const o = t === 1 ? Hb : jb;
  e[o] === null && (e[o] = []), e[o].push(n);
}
function tf(t, e) {
  const n = t === 1 ? Hb : jb, o = e[n];
  if (o !== null) {
    for (const r of o)
      r();
    e[n] = null;
  }
}
function Vb(t) {
  tf(1, t), tf(0, t);
}
function ru(t) {
  return t + 1;
}
function ro(t, e) {
  const n = t[E], o = ru(e.index);
  return ngDevMode && Da(n, o), t[o];
}
function Yx(t, e, n) {
  const o = t[E], r = ru(e);
  ngDevMode && Da(o, r), t[r] = n;
}
function Tt(t, e) {
  const n = ru(e.index);
  return ngDevMode && Da(t, n), t.data[n];
}
function Zx(t, e, n) {
  const o = ru(e);
  ngDevMode && Da(t, o), t.data[o] = n;
}
function Qx(t, e, n) {
  const o = e[E], r = Tt(o, n);
  switch (t) {
    case de.Complete:
      return r.primaryTmplIndex;
    case de.Loading:
      return r.loadingTmplIndex;
    case de.Error:
      return r.errorTmplIndex;
    case de.Placeholder:
      return r.placeholderTmplIndex;
    default:
      return ngDevMode && _(`Unexpected defer block state: ${t}`), null;
  }
}
function nf(t, e) {
  var n, o;
  return e === de.Placeholder ? ((n = t.placeholderBlockConfig) == null ? void 0 : n[Pm]) ?? null : e === de.Loading ? ((o = t.loadingBlockConfig) == null ? void 0 : o[Pm]) ?? null : null;
}
function Ub(t) {
  var e;
  return ((e = t.loadingBlockConfig) == null ? void 0 : e[qx]) ?? null;
}
function Nm(t, e) {
  if (!t || t.length === 0)
    return e;
  const n = new Set(t);
  for (const o of e)
    n.add(o);
  return t.length === n.size ? t : Array.from(n);
}
function Kx(t, e) {
  const n = e.primaryTmplIndex + T;
  return ba(t, n);
}
function Gb(t) {
  x(t.loadingState, me.COMPLETE, "Expecting all deferred dependencies to be loaded.");
}
function Xx(t) {
  return t !== null && typeof t == "object" && typeof t.primaryTmplIndex == "number";
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Wl = {
  passive: !0,
  capture: !0
}, Hu = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), Lm = ["click", "keydown"], $m = ["mouseenter", "focusin"];
let Ut = null, Uu = 0;
class tp {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.listener = () => {
      for (const e of this.callbacks)
        e();
    };
  }
}
function Wb(t, e) {
  let n = Vu.get(t);
  if (!n) {
    n = new tp(), Vu.set(t, n);
    for (const o of Lm)
      t.addEventListener(o, n.listener, Wl);
  }
  return n.callbacks.add(e), () => {
    const { callbacks: o, listener: r } = n;
    if (o.delete(e), o.size === 0) {
      Vu.delete(t);
      for (const i of Lm)
        t.removeEventListener(i, r, Wl);
    }
  };
}
function zb(t, e) {
  let n = Hu.get(t);
  if (!n) {
    n = new tp(), Hu.set(t, n);
    for (const o of $m)
      t.addEventListener(o, n.listener, Wl);
  }
  return n.callbacks.add(e), () => {
    const { callbacks: o, listener: r } = n;
    if (o.delete(e), o.size === 0) {
      for (const i of $m)
        t.removeEventListener(i, r, Wl);
      Hu.delete(t);
    }
  };
}
function qb(t, e, n) {
  const o = n.get(ae);
  let r = gr.get(t);
  return Ut = Ut || o.runOutsideAngular(() => new IntersectionObserver((i) => {
    for (const s of i)
      s.isIntersecting && gr.has(s.target) && o.run(gr.get(s.target).listener);
  })), r || (r = new tp(), o.runOutsideAngular(() => Ut.observe(t)), gr.set(t, r), Uu++), r.callbacks.add(e), () => {
    gr.has(t) && (r.callbacks.delete(e), r.callbacks.size === 0 && (Ut == null || Ut.unobserve(t), gr.delete(t), Uu--), Uu === 0 && (Ut == null || Ut.disconnect(), Ut = null));
  };
}
function Jx(t, e, n) {
  if (n == null)
    return t;
  if (n >= 0)
    return Uv(n, t);
  const o = t[e.index];
  ngDevMode && lt(o);
  const r = o[ue] ?? null;
  if (ngDevMode && r !== null) {
    const s = ro(t, e)[$a];
    x(s, de.Placeholder, "Expected a placeholder to be rendered in this defer block."), an(r);
  }
  return r;
}
function eO(t, e) {
  const n = Ca(T + e, t);
  return ngDevMode && tM(n), n;
}
function is(t, e, n, o, r, i, s) {
  const a = t[Je];
  function l() {
    if (bd(t))
      return;
    const c = ro(t, e), u = c[$a];
    if (u !== yi.Initial && u !== de.Placeholder)
      return;
    const d = Jx(t, e, o);
    if (!d) {
      Kd(l, { injector: a });
      return;
    }
    if (bd(d))
      return;
    const f = eO(d, n), h = r(f, () => {
      t !== d && Xf(d, h), i();
    }, a);
    t !== d && wc(d, h), ou(s, c, h);
  }
  Kd(l, { injector: a });
}
function Yb(t, e) {
  const o = e[Je].get(of), r = () => o.remove(t);
  return o.add(t), r;
}
const tO = () => typeof requestIdleCallback < "u" ? requestIdleCallback : setTimeout, nO = () => typeof requestIdleCallback < "u" ? cancelIdleCallback : clearTimeout, Vs = class Vs {
  constructor() {
    this.executingCallbacks = !1, this.idleId = null, this.current = /* @__PURE__ */ new Set(), this.deferred = /* @__PURE__ */ new Set(), this.ngZone = A(ae), this.requestIdleCallbackFn = tO().bind(globalThis), this.cancelIdleCallbackFn = nO().bind(globalThis);
  }
  add(e) {
    (this.executingCallbacks ? this.deferred : this.current).add(e), this.idleId === null && this.scheduleIdleCallback();
  }
  remove(e) {
    const { current: n, deferred: o } = this;
    n.delete(e), o.delete(e), n.size === 0 && o.size === 0 && this.cancelIdleCallback();
  }
  scheduleIdleCallback() {
    const e = () => {
      this.cancelIdleCallback(), this.executingCallbacks = !0;
      for (const n of this.current)
        n();
      if (this.current.clear(), this.executingCallbacks = !1, this.deferred.size > 0) {
        for (const n of this.deferred)
          this.current.add(n);
        this.deferred.clear(), this.scheduleIdleCallback();
      }
    };
    this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(e));
  }
  cancelIdleCallback() {
    this.idleId !== null && (this.cancelIdleCallbackFn(this.idleId), this.idleId = null);
  }
  ngOnDestroy() {
    this.cancelIdleCallback(), this.current.clear(), this.deferred.clear();
  }
};
Vs.ɵprov = oe({
  token: Vs,
  providedIn: "root",
  factory: () => new Vs()
});
let of = Vs;
function Zb(t) {
  return (e, n) => Qb(t, e, n);
}
function Qb(t, e, n) {
  const r = n[Je].get(rf), i = () => r.remove(e);
  return r.add(t, e), i;
}
const Us = class Us {
  constructor() {
    this.executingCallbacks = !1, this.timeoutId = null, this.invokeTimerAt = null, this.current = [], this.deferred = [];
  }
  add(e, n) {
    const o = this.executingCallbacks ? this.deferred : this.current;
    this.addToQueue(o, Date.now() + e, n), this.scheduleTimer();
  }
  remove(e) {
    const { current: n, deferred: o } = this;
    this.removeFromQueue(n, e) === -1 && this.removeFromQueue(o, e), n.length === 0 && o.length === 0 && this.clearTimeout();
  }
  addToQueue(e, n, o) {
    let r = e.length;
    for (let i = 0; i < e.length; i += 2)
      if (e[i] > n) {
        r = i;
        break;
      }
    SD(e, r, n, o);
  }
  removeFromQueue(e, n) {
    let o = -1;
    for (let r = 0; r < e.length; r += 2)
      if (e[r + 1] === n) {
        o = r;
        break;
      }
    return o > -1 && nm(e, o, 2), o;
  }
  scheduleTimer() {
    const e = () => {
      this.clearTimeout(), this.executingCallbacks = !0;
      const o = [...this.current], r = Date.now();
      for (let s = 0; s < o.length; s += 2) {
        const a = o[s], l = o[s + 1];
        if (a <= r)
          l();
        else
          break;
      }
      let i = -1;
      for (let s = 0; s < this.current.length && this.current[s] <= r; s += 2)
        i = s + 1;
      if (i >= 0 && nm(this.current, 0, i + 1), this.executingCallbacks = !1, this.deferred.length > 0) {
        for (let s = 0; s < this.deferred.length; s += 2) {
          const a = this.deferred[s], l = this.deferred[s + 1];
          this.addToQueue(this.current, a, l);
        }
        this.deferred.length = 0;
      }
      this.scheduleTimer();
    };
    if (this.current.length > 0) {
      const o = Date.now(), r = this.current[0];
      if (this.timeoutId === null || // Reschedule a timer in case a queue contains an item with
      // an earlier timestamp and the delta is more than an average
      // frame duration.
      this.invokeTimerAt && this.invokeTimerAt - r > 16) {
        this.clearTimeout();
        const i = Math.max(r - o, 16);
        this.invokeTimerAt = r, this.timeoutId = setTimeout(e, i);
      }
    }
  }
  clearTimeout() {
    this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  ngOnDestroy() {
    this.clearTimeout(), this.current.length = 0, this.deferred.length = 0;
  }
};
Us.ɵprov = oe({
  token: Us,
  providedIn: "root",
  factory: () => new Us()
});
let rf = Us;
const Kb = new j("DEFER_BLOCK_DEPENDENCY_INTERCEPTOR"), Xb = new j(ngDevMode ? "DEFER_BLOCK_CONFIG" : "");
function Jb(t) {
  const e = t.get(Xb, null, { optional: !0 });
  return (e == null ? void 0 : e.behavior) === Gl.Manual ? !1 : kn(t);
}
let zl = null;
function eE(t, e, n, o) {
  const r = t.consts;
  n != null && (e.placeholderBlockConfig = en(r, n)), o != null && (e.loadingBlockConfig = en(r, o)), zl === null && (zl = oO);
}
function tE(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = N(), d = t + T;
  if (mi(t, null, 0, 0), u.firstCreatePass) {
    Tn("NgDefer");
    const y = {
      primaryTmplIndex: e,
      loadingTmplIndex: o ?? null,
      placeholderTmplIndex: r ?? null,
      errorTmplIndex: i ?? null,
      placeholderBlockConfig: null,
      loadingBlockConfig: null,
      dependencyResolverFn: n ?? null,
      loadingState: me.NOT_STARTED,
      loadingPromise: null
    };
    l == null || l(u, y, a, s), Zx(u, d, y);
  }
  const f = K(), h = c[d];
  Nb(h, f, c);
  const p = [
    null,
    // NEXT_DEFER_BLOCK_STATE
    yi.Initial,
    // DEFER_BLOCK_STATE
    null,
    // STATE_IS_FROZEN_UNTIL
    null,
    // LOADING_AFTER_CLEANUP_FN
    null,
    // TRIGGER_CLEANUP_FNS
    null
    // PREFETCH_TRIGGER_CLEANUP_FNS
  ];
  Yx(c, d, p);
  const g = () => Vb(p);
  ou(0, p, () => Xf(c, g)), wc(c, g);
}
function nE(t) {
  const e = v(), n = ln();
  if (Ae(e, n, t)) {
    const o = De(null);
    try {
      const r = !!t, i = ce(), a = ro(e, i)[$a];
      r === !1 && a === yi.Initial ? ss(e, i) : r === !0 && (a === yi.Initial || a === de.Placeholder) && as(e, i);
    } finally {
      De(o);
    }
  }
}
function oE(t) {
  const e = v(), n = ln();
  if (Ae(e, n, t)) {
    const o = De(null);
    try {
      const r = !!t, i = e[E], s = ce(), a = Tt(i, s);
      r === !0 && a.loadingState === me.NOT_STARTED && Ba(a, e, s);
    } finally {
      De(o);
    }
  }
}
function rE() {
  mE(Yb);
}
function iE() {
  yE(Yb);
}
function sE() {
  const t = v(), e = K(), n = t[E];
  Tt(n, e).loadingTmplIndex === null && ss(t, e), as(t, e);
}
function aE() {
  const t = v(), e = K(), n = t[E], o = Tt(n, e);
  o.loadingState === me.NOT_STARTED && iu(o, t, e);
}
function lE(t) {
  mE(Zb(t));
}
function cE(t) {
  yE(Zb(t));
}
function uE(t, e) {
  const n = v(), o = K();
  ss(n, o), is(
    n,
    o,
    t,
    e,
    zb,
    () => as(n, o),
    0
    /* TriggerType.Regular */
  );
}
function dE(t, e) {
  const n = v(), o = K(), r = n[E], i = Tt(r, o);
  i.loadingState === me.NOT_STARTED && is(
    n,
    o,
    t,
    e,
    zb,
    () => Ba(i, n, o),
    1
    /* TriggerType.Prefetch */
  );
}
function fE(t, e) {
  const n = v(), o = K();
  ss(n, o), is(
    n,
    o,
    t,
    e,
    Wb,
    () => as(n, o),
    0
    /* TriggerType.Regular */
  );
}
function hE(t, e) {
  const n = v(), o = K(), r = n[E], i = Tt(r, o);
  i.loadingState === me.NOT_STARTED && is(
    n,
    o,
    t,
    e,
    Wb,
    () => Ba(i, n, o),
    1
    /* TriggerType.Prefetch */
  );
}
function pE(t, e) {
  const n = v(), o = K();
  ss(n, o), is(
    n,
    o,
    t,
    e,
    qb,
    () => as(n, o),
    0
    /* TriggerType.Regular */
  );
}
function gE(t, e) {
  const n = v(), o = K(), r = n[E], i = Tt(r, o);
  i.loadingState === me.NOT_STARTED && is(
    n,
    o,
    t,
    e,
    qb,
    () => Ba(i, n, o),
    1
    /* TriggerType.Prefetch */
  );
}
function mE(t) {
  const e = v(), n = K();
  ss(e, n);
  const o = t(() => as(e, n), e), r = ro(e, n);
  ou(0, r, o);
}
function yE(t) {
  const e = v(), n = K(), o = e[E], r = Tt(o, n);
  if (r.loadingState === me.NOT_STARTED) {
    const i = ro(e, n), a = t(() => Ba(r, e, n), e);
    ou(1, i, a);
  }
}
function yn(t, e, n, o = !1) {
  const r = n[Ce], i = r[E];
  if (bd(r))
    return;
  ngDevMode && tt(e, r);
  const s = ro(r, e);
  ngDevMode && S(s, "Expected a defer block state defined");
  const a = s[$a];
  if (jm(a, t) && jm(s[ni] ?? -1, t)) {
    const l = Tt(i, e), c = !o && (Ub(l) !== null || nf(l, de.Loading) !== null || nf(l, de.Placeholder));
    ngDevMode && c && S(zl, "Expected scheduling function to be defined");
    const u = c ? zl : vE;
    try {
      u(t, s, n, e, r);
    } catch (d) {
      Kc(r, d);
    }
  }
}
function vE(t, e, n, o, r) {
  const i = Qx(t, r, o);
  if (i !== null) {
    e[$a] = t;
    const s = r[E], a = i + T, l = ba(s, a), c = 0;
    Jh(n, c);
    const u = pi(n, l.tView.ssrId), d = Pa(r, l, null, { dehydratedView: u });
    Na(n, d, c, gi(l, u)), Fa(d);
  }
}
function oO(t, e, n, o, r) {
  const i = Date.now(), s = r[E], a = Tt(s, o);
  if (e[Ss] === null || e[Ss] <= i) {
    e[Ss] = null;
    const l = Ub(a), c = e[Qa] !== null;
    if (t === de.Loading && l !== null && !c) {
      e[ni] = t;
      const u = Bm(l, e, o, n, r);
      e[Qa] = u;
    } else {
      t > de.Loading && c && (e[Qa](), e[Qa] = null, e[ni] = null), vE(t, e, n, o, r);
      const u = nf(a, t);
      u !== null && (e[Ss] = i + u, Bm(u, e, o, n, r));
    }
  } else
    e[ni] = t;
}
function Bm(t, e, n, o, r) {
  return Qb(t, () => {
    const s = e[ni];
    e[Ss] = null, e[ni] = null, s !== null && yn(s, n, o);
  }, r);
}
function jm(t, e) {
  return t < e;
}
function Ba(t, e, n) {
  e[Je] && Jb(e[Je]) && iu(t, e, n);
}
function iu(t, e, n) {
  const o = e[Je], r = e[E];
  if (t.loadingState !== me.NOT_STARTED)
    return;
  const i = ro(e, n), s = Kx(r, t);
  t.loadingState = me.IN_PROGRESS, tf(1, i);
  let a = t.dependencyResolverFn;
  if (ngDevMode) {
    const l = o.get(Kb, null, { optional: !0 });
    l && (a = l.intercept(a));
  }
  if (!a) {
    t.loadingPromise = Promise.resolve().then(() => {
      t.loadingPromise = null, t.loadingState = me.COMPLETE;
    });
    return;
  }
  t.loadingPromise = Promise.allSettled(a()).then((l) => {
    let c = !1;
    const u = [], d = [];
    for (const f of l)
      if (f.status === "fulfilled") {
        const h = f.value, p = H(h) || Fe(h);
        if (p)
          u.push(p);
        else {
          const g = gt(h);
          g && d.push(g);
        }
      } else {
        c = !0;
        break;
      }
    if (t.loadingPromise = null, c) {
      if (t.loadingState = me.FAILED, t.errorTmplIndex === null) {
        const f = $c(e), h = new b(750, ngDevMode && `Loading dependencies for \`@defer\` block failed, but no \`@error\` block was configured${f}. Consider using the \`@error\` block to render an error state.`);
        Kc(e, h);
      }
    } else {
      t.loadingState = me.COMPLETE;
      const f = s.tView;
      u.length > 0 && (f.directiveRegistry = Nm(f.directiveRegistry, u)), d.length > 0 && (f.pipeRegistry = Nm(f.pipeRegistry, d));
    }
  });
}
function ss(t, e) {
  const n = t[e.index];
  ngDevMode && lt(n), yn(de.Placeholder, e, n);
}
function Hm(t, e, n) {
  ngDevMode && S(t.loadingPromise, "Expected loading Promise to exist on this defer block"), t.loadingPromise.then(() => {
    t.loadingState === me.COMPLETE ? (ngDevMode && Gb(t), yn(de.Complete, e, n)) : t.loadingState === me.FAILED && yn(de.Error, e, n);
  });
}
function as(t, e) {
  const n = t[E], o = t[e.index], r = t[Je];
  if (ngDevMode && lt(o), !Jb(r))
    return;
  const i = ro(t, e), s = Tt(n, e);
  switch (Vb(i), s.loadingState) {
    case me.NOT_STARTED:
      yn(de.Loading, e, o), iu(s, t, e), s.loadingState === me.IN_PROGRESS && Hm(s, e, o);
      break;
    case me.IN_PROGRESS:
      yn(de.Loading, e, o), Hm(s, e, o);
      break;
    case me.COMPLETE:
      ngDevMode && Gb(s), yn(de.Complete, e, o);
      break;
    case me.FAILED:
      yn(de.Error, e, o);
      break;
    default:
      ngDevMode && _("Unknown defer block state");
  }
}
function np(t, e, n, o) {
  const r = v(), i = ln();
  if (Ae(r, i, e)) {
    const s = N(), a = ce();
    un(a, r, t, e, n, o), ngDevMode && Ee(s.data, a, "attr." + t, i);
  }
  return np;
}
function ls(t, e) {
  ngDevMode && $n(2, e.length, "should have at least 3 values"), ngDevMode && x(e.length % 2, 1, "should have an odd number of values");
  let n = !1, o = J();
  for (let i = 1; i < e.length; i += 2)
    n = Ae(t, o++, e[i]) || n;
  if (Xv(o), !n)
    return F;
  let r = e[0];
  for (let i = 1; i < e.length; i += 2)
    r += L(e[i]) + e[i + 1];
  return r;
}
function cs(t, e, n, o) {
  return Ae(t, ln(), n) ? e + L(n) + o : F;
}
function us(t, e, n, o, r, i) {
  const s = J(), a = or(t, s, n, r);
  return Mn(2), a ? e + L(n) + o + L(r) + i : F;
}
function ds(t, e, n, o, r, i, s, a) {
  const l = J(), c = nu(t, l, n, r, s);
  return Mn(3), c ? e + L(n) + o + L(r) + i + L(s) + a : F;
}
function fs(t, e, n, o, r, i, s, a, l, c) {
  const u = J(), d = At(t, u, n, r, s, l);
  return Mn(4), d ? e + L(n) + o + L(r) + i + L(s) + a + L(l) + c : F;
}
function hs(t, e, n, o, r, i, s, a, l, c, u, d) {
  const f = J();
  let h = At(t, f, n, r, s, l);
  return h = Ae(t, f + 4, u) || h, Mn(5), h ? e + L(n) + o + L(r) + i + L(s) + a + L(l) + c + L(u) + d : F;
}
function ps(t, e, n, o, r, i, s, a, l, c, u, d, f, h) {
  const p = J();
  let g = At(t, p, n, r, s, l);
  return g = or(t, p + 4, u, f) || g, Mn(6), g ? e + L(n) + o + L(r) + i + L(s) + a + L(l) + c + L(u) + d + L(f) + h : F;
}
function gs(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g) {
  const y = J();
  let D = At(t, y, n, r, s, l);
  return D = nu(t, y + 4, u, f, p) || D, Mn(7), D ? e + L(n) + o + L(r) + i + L(s) + a + L(l) + c + L(u) + d + L(f) + h + L(p) + g : F;
}
function ms(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D) {
  const m = J();
  let I = At(t, m, n, r, s, l);
  return I = At(t, m + 4, u, f, p, y) || I, Mn(8), I ? e + L(n) + o + L(r) + i + L(s) + a + L(l) + c + L(u) + d + L(f) + h + L(p) + g + L(y) + D : F;
}
function op(t, e, n, o, r, i) {
  const s = v(), a = cs(s, e, n, o);
  if (a !== F) {
    const l = ce();
    un(l, s, t, a, r, i), ngDevMode && Ee(N().data, l, "attr." + t, J() - 1, e, o);
  }
  return op;
}
function rp(t, e, n, o, r, i, s, a) {
  const l = v(), c = us(l, e, n, o, r, i);
  if (c !== F) {
    const u = ce();
    un(u, l, t, c, s, a), ngDevMode && Ee(N().data, u, "attr." + t, J() - 2, e, o, i);
  }
  return rp;
}
function ip(t, e, n, o, r, i, s, a, l, c) {
  const u = v(), d = ds(u, e, n, o, r, i, s, a);
  if (d !== F) {
    const f = ce();
    un(f, u, t, d, l, c), ngDevMode && Ee(N().data, f, "attr." + t, J() - 3, e, o, i, a);
  }
  return ip;
}
function sp(t, e, n, o, r, i, s, a, l, c, u, d) {
  const f = v(), h = fs(f, e, n, o, r, i, s, a, l, c);
  if (h !== F) {
    const p = ce();
    un(p, f, t, h, u, d), ngDevMode && Ee(N().data, p, "attr." + t, J() - 4, e, o, i, a, c);
  }
  return sp;
}
function ap(t, e, n, o, r, i, s, a, l, c, u, d, f, h) {
  const p = v(), g = hs(p, e, n, o, r, i, s, a, l, c, u, d);
  if (g !== F) {
    const y = ce();
    un(y, p, t, g, f, h), ngDevMode && Ee(N().data, y, "attr." + t, J() - 5, e, o, i, a, c, d);
  }
  return ap;
}
function lp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g) {
  const y = v(), D = ps(y, e, n, o, r, i, s, a, l, c, u, d, f, h);
  if (D !== F) {
    const m = ce();
    un(m, y, t, D, p, g), ngDevMode && Ee(N().data, m, "attr." + t, J() - 6, e, o, i, a, c, d, h);
  }
  return lp;
}
function cp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D) {
  const m = v(), I = gs(m, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g);
  if (I !== F) {
    const w = ce();
    un(w, m, t, I, y, D), ngDevMode && Ee(N().data, w, "attr." + t, J() - 7, e, o, i, a, c, d, h, g);
  }
  return cp;
}
function up(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D, m, I) {
  const w = v(), M = ms(w, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D);
  if (M !== F) {
    const P = ce();
    un(P, w, t, M, m, I), ngDevMode && Ee(N().data, P, "attr." + t, J() - 8, e, o, i, a, c, d, h, g, D);
  }
  return up;
}
function dp(t, e, n, o) {
  const r = v(), i = ls(r, e);
  if (i !== F) {
    const s = ce();
    if (un(s, r, t, i, n, o), ngDevMode) {
      const a = [e[0]];
      for (let l = 2; l < e.length; l += 2)
        a.push(e[l]);
      Ee(N().data, s, "attr." + t, J() - a.length + 1, ...a);
    }
  }
  return dp;
}
function Ka(t, e) {
  return ngDevMode && zs(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), ngDevMode && zs(
    e,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), t << 17 | e << 2;
}
function rr(t) {
  return ngDevMode && X(t, "expected number"), t >> 17 & 32767;
}
function rO(t) {
  return ngDevMode && X(t, "expected number"), (t & 2) == 2;
}
function iO(t, e) {
  return ngDevMode && X(t, "expected number"), ngDevMode && zs(
    e,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), t & 131071 | e << 17;
}
function sf(t) {
  return ngDevMode && X(t, "expected number"), t | 2;
}
function ir(t) {
  return ngDevMode && X(t, "expected number"), (t & 131068) >> 2;
}
function Gu(t, e) {
  return ngDevMode && X(t, "expected number"), ngDevMode && zs(
    e,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), t & -131069 | //
  e << 2;
}
function sO(t) {
  return ngDevMode && X(t, "expected number"), (t & 1) === 1;
}
function af(t) {
  return ngDevMode && X(t, "expected number"), t | 1;
}
function aO(t, e, n, o, r, i) {
  ngDevMode && Yf(N());
  let s = i ? e.classBindings : e.styleBindings, a = rr(s), l = ir(s);
  t[o] = n;
  let c = !1, u;
  if (Array.isArray(n)) {
    const d = n;
    u = d[1], (u === null || Ma(d, u) > 0) && (c = !0);
  } else
    u = n;
  if (r)
    if (l !== 0) {
      const f = rr(t[a + 1]);
      t[o + 1] = Ka(f, a), f !== 0 && (t[f + 1] = Gu(t[f + 1], o)), t[a + 1] = iO(t[a + 1], o);
    } else
      t[o + 1] = Ka(a, 0), a !== 0 && (t[a + 1] = Gu(t[a + 1], o)), a = o;
  else
    t[o + 1] = Ka(l, 0), ngDevMode && x(a !== 0 && l === 0, !1, "Adding template bindings after hostBindings is not allowed."), a === 0 ? a = o : t[l + 1] = Gu(t[l + 1], o), l = o;
  c && (t[o + 1] = sf(t[o + 1])), Vm(t, u, o, !0), Vm(t, u, o, !1), lO(e, u, t, o, i), s = Ka(a, l), i ? e.classBindings = s : e.styleBindings = s;
}
function lO(t, e, n, o, r) {
  const i = r ? t.residualClasses : t.residualStyles;
  i != null && typeof e == "string" && Ma(i, e) >= 0 && (n[o + 1] = af(n[o + 1]));
}
function Vm(t, e, n, o) {
  const r = t[n + 1], i = e === null;
  let s = o ? rr(r) : ir(r), a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    ngDevMode && be(t, s);
    const l = t[s], c = t[s + 1];
    cO(l, e) && (a = !0, t[s + 1] = o ? af(c) : sf(c)), s = o ? rr(c) : ir(c);
  }
  a && (t[n + 1] = o ? sf(r) : af(r));
}
function cO(t, e) {
  return ngDevMode && Lt(Array.isArray(e), !0, "Expected that 'tStylingKey' has been unwrapped"), t === null || // If the cursor is `null` it means that we have map at that
  // location so we must assume that we have a match.
  e == null || // If `tStylingKey` is `null` then it is a map therefor assume that it
  // contains a match.
  (Array.isArray(t) ? t[1] : t) === e ? !0 : Array.isArray(t) && typeof e == "string" ? Ma(t, e) >= 0 : !1;
}
const _e = {
  textEnd: 0,
  key: 0,
  keyEnd: 0,
  value: 0,
  valueEnd: 0
};
function DE(t) {
  return t.substring(_e.key, _e.keyEnd);
}
function uO(t) {
  return t.substring(_e.value, _e.valueEnd);
}
function dO(t) {
  return EE(t), CE(t, vi(t, 0, _e.textEnd));
}
function CE(t, e) {
  const n = _e.textEnd;
  return n === e ? -1 : (e = _e.keyEnd = hO(t, _e.key = e, n), vi(t, e, n));
}
function fO(t) {
  return EE(t), bE(t, vi(t, 0, _e.textEnd));
}
function bE(t, e) {
  const n = _e.textEnd;
  let o = _e.key = vi(t, e, n);
  return n === o ? -1 : (o = _e.keyEnd = pO(t, o, n), o = Um(
    t,
    o,
    n,
    58
    /* CharCode.COLON */
  ), o = _e.value = vi(t, o, n), o = _e.valueEnd = gO(t, o, n), Um(
    t,
    o,
    n,
    59
    /* CharCode.SEMI_COLON */
  ));
}
function EE(t) {
  _e.key = 0, _e.keyEnd = 0, _e.value = 0, _e.valueEnd = 0, _e.textEnd = t.length;
}
function vi(t, e, n) {
  for (; e < n && t.charCodeAt(e) <= 32; )
    e++;
  return e;
}
function hO(t, e, n) {
  for (; e < n && t.charCodeAt(e) > 32; )
    e++;
  return e;
}
function pO(t, e, n) {
  let o;
  for (; e < n && ((o = t.charCodeAt(e)) === 45 || o === 95 || (o & -33) >= 65 && (o & -33) <= 90 || o >= 48 && o <= 57); )
    e++;
  return e;
}
function Um(t, e, n, o) {
  return e = vi(t, e, n), e < n && (ngDevMode && t.charCodeAt(e) !== o && IE(t, String.fromCharCode(o), e), e++), e;
}
function gO(t, e, n) {
  let o = -1, r = -1, i = -1, s = e, a = s;
  for (; s < n; ) {
    const l = t.charCodeAt(s++);
    if (l === 59)
      return a;
    l === 34 || l === 39 ? a = s = Gm(t, l, s, n) : e === s - 4 && // We have seen only 4 characters so far "URL(" (Ignore "foo_URL()")
    i === 85 && r === 82 && o === 76 && l === 40 ? a = s = Gm(t, 41, s, n) : l > 32 && (a = s), i = r, r = o, o = l & -33;
  }
  return a;
}
function Gm(t, e, n, o) {
  let r = -1, i = n;
  for (; i < o; ) {
    const s = t.charCodeAt(i++);
    if (s == e && r !== 92)
      return i;
    s == 92 && r === 92 ? r = 0 : r = s;
  }
  throw ngDevMode ? IE(t, String.fromCharCode(e), o) : new Error();
}
function IE(t, e, n) {
  throw ngDevMode && x(typeof t == "string", !0, "String expected here"), _(`Malformed style at location ${n} in string '` + t.substring(0, n) + "[>>" + t.substring(n, n + 1) + "<<]" + t.slice(n + 1) + `'. Expecting '${e}'.`);
}
function fp(t, e, n) {
  const o = v(), r = ln();
  if (Ae(o, r, e)) {
    const i = N(), s = ce();
    Ct(i, s, o, t, e, o[B], n, !1), ngDevMode && Ee(i.data, s, t, r);
  }
  return fp;
}
function lf(t, e, n, o, r) {
  const i = e.inputs, s = r ? "class" : "style";
  Wh(t, n, i[s], s, o);
}
function hp(t, e, n) {
  return Bt(t, e, n, !1), hp;
}
function pp(t, e) {
  return Bt(t, e, null, !0), pp;
}
function $t(t) {
  jt(AE, mO, t, !1);
}
function mO(t, e) {
  for (let n = fO(e); n >= 0; n = bE(e, n))
    AE(t, DE(e), uO(e));
}
function SE(t) {
  jt(EO, fn, t, !0);
}
function fn(t, e) {
  for (let n = dO(e); n >= 0; n = CE(e, n))
    Dt(t, DE(e), !0);
}
function Bt(t, e, n, o) {
  const r = v(), i = N(), s = Mn(2);
  if (i.firstUpdatePass && ME(i, t, s, o), e !== F && Ae(r, s, e)) {
    const a = i.data[We()];
    _E(i, a, r, r[B], t, r[s + 1] = SO(e, n), o, s);
  }
}
function jt(t, e, n, o) {
  const r = N(), i = Mn(2);
  r.firstUpdatePass && ME(r, null, i, o);
  const s = v();
  if (n !== F && Ae(s, i, n)) {
    const a = r.data[We()];
    if (TE(a, o) && !wE(r, i)) {
      if (ngDevMode) {
        const c = r.data[i];
        x(Array.isArray(c) ? c[1] : c, !1, "Styling linked list shadow input should be marked as 'false'");
      }
      let l = o ? a.classesWithoutHost : a.stylesWithoutHost;
      ngDevMode && o === !1 && l !== null && x(l.endsWith(";"), !0, "Expecting static portion to end with ';'"), l !== null && (n = hd(l, n || "")), lf(r, a, s, n, o);
    } else
      IO(r, a, s, s[B], s[i + 1], s[i + 1] = bO(t, e, n), o, i);
  }
}
function wE(t, e) {
  return e >= t.expandoStartIndex;
}
function ME(t, e, n, o) {
  ngDevMode && Yf(t);
  const r = t.data;
  if (r[n + 1] === null) {
    const i = r[We()];
    ngDevMode && S(i, "TNode expected");
    const s = wE(t, n);
    TE(i, o) && e === null && !s && (e = !1), e = yO(r, i, e, o), aO(r, i, e, n, s, o);
  }
}
function yO(t, e, n, o) {
  const r = th(t);
  let i = o ? e.residualClasses : e.residualStyles;
  if (r === null)
    (o ? e.classBindings : e.styleBindings) === 0 && (n = Wu(null, t, e, n, o), n = la(n, e.attrs, o), i = null);
  else {
    const s = e.directiveStylingLast;
    if (s === -1 || t[s] !== r)
      if (n = Wu(r, t, e, n, o), i === null) {
        let l = vO(t, e, o);
        l !== void 0 && Array.isArray(l) && (l = Wu(null, t, e, l[1], o), l = la(l, e.attrs, o), DO(t, e, o, l));
      } else
        i = CO(t, e, o);
  }
  return i !== void 0 && (o ? e.residualClasses = i : e.residualStyles = i), n;
}
function vO(t, e, n) {
  const o = n ? e.classBindings : e.styleBindings;
  if (ir(o) !== 0)
    return t[rr(o)];
}
function DO(t, e, n, o) {
  const r = n ? e.classBindings : e.styleBindings;
  ngDevMode && Lt(ir(r), 0, "Expecting to have at least one template styling binding."), t[rr(r)] = o;
}
function CO(t, e, n) {
  let o;
  const r = e.directiveEnd;
  ngDevMode && Lt(e.directiveStylingLast, -1, "By the time this function gets called at least one hostBindings-node styling instruction must have executed.");
  for (let i = 1 + e.directiveStylingLast; i < r; i++) {
    const s = t[i].hostAttrs;
    o = la(o, s, n);
  }
  return la(o, e.attrs, n);
}
function Wu(t, e, n, o, r) {
  let i = null;
  const s = n.directiveEnd;
  let a = n.directiveStylingLast;
  for (a === -1 ? a = n.directiveStart : a++; a < s && (i = e[a], ngDevMode && S(i, "expected to be defined"), o = la(o, i.hostAttrs, r), i !== t); )
    a++;
  return t !== null && (n.directiveStylingLast = a), o;
}
function la(t, e, n) {
  const o = n ? 1 : 2;
  let r = -1;
  if (e !== null)
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      typeof s == "number" ? r = s : r === o && (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]), Dt(t, s, n ? !0 : e[++i]));
    }
  return t === void 0 ? null : t;
}
function bO(t, e, n) {
  if (n == null || n === "")
    return q;
  const o = [], r = cn(n);
  if (Array.isArray(r))
    for (let i = 0; i < r.length; i++)
      t(o, r[i], !0);
  else if (typeof r == "object")
    for (const i in r)
      r.hasOwnProperty(i) && t(o, i, r[i]);
  else
    typeof r == "string" ? e(o, r) : ngDevMode && _("Unsupported styling type " + typeof r + ": " + r);
  return o;
}
function AE(t, e, n) {
  Dt(t, e, cn(n));
}
function EO(t, e, n) {
  const o = String(e);
  o !== "" && !o.includes(" ") && Dt(t, o, n);
}
function IO(t, e, n, o, r, i, s, a) {
  r === F && (r = q);
  let l = 0, c = 0, u = 0 < r.length ? r[0] : null, d = 0 < i.length ? i[0] : null;
  for (; u !== null || d !== null; ) {
    ngDevMode && $n(l, 999, "Are we stuck in infinite loop?"), ngDevMode && $n(c, 999, "Are we stuck in infinite loop?");
    const f = l < r.length ? r[l + 1] : void 0, h = c < i.length ? i[c + 1] : void 0;
    let p = null, g;
    u === d ? (l += 2, c += 2, f !== h && (p = d, g = h)) : d === null || u !== null && u < d ? (l += 2, p = u) : (ngDevMode && S(d, "Expecting to have a valid key"), c += 2, p = d, g = h), p !== null && _E(t, e, n, o, p, g, s, a), u = l < r.length ? r[l] : null, d = c < i.length ? i[c] : null;
  }
}
function _E(t, e, n, o, r, i, s, a) {
  if (!(e.type & 3))
    return;
  const l = t.data, c = l[a + 1], u = sO(c) ? Wm(l, e, n, r, ir(c), s) : void 0;
  if (!ql(u)) {
    ql(i) || rO(c) && (i = Wm(l, null, n, r, a, s));
    const d = Ca(We(), n);
    BA(o, s, d, r, i);
  }
}
function Wm(t, e, n, o, r, i) {
  const s = e === null;
  let a;
  for (; r > 0; ) {
    const l = t[r], c = Array.isArray(l), u = c ? l[1] : l, d = u === null;
    let f = n[r + 1];
    f === F && (f = d ? q : void 0);
    let h = d ? Fu(f, o) : u === o ? f : void 0;
    if (c && !ql(h) && (h = Fu(l, o)), ql(h) && (a = h, s))
      return a;
    const p = t[r + 1];
    r = s ? rr(p) : ir(p);
  }
  if (e !== null) {
    let l = i ? e.residualClasses : e.residualStyles;
    l != null && (a = Fu(l, o));
  }
  return a;
}
function ql(t) {
  return t !== void 0;
}
function SO(t, e) {
  return t == null || t === "" || (typeof e == "string" ? t = t + e : typeof t == "object" && (t = Y(cn(t)))), t;
}
function TE(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
function xE(t, e, n) {
  const o = v(), r = cs(o, t, e, n);
  jt(Dt, fn, r, !0);
}
function OE(t, e, n, o, r) {
  const i = v(), s = us(i, t, e, n, o, r);
  jt(Dt, fn, s, !0);
}
function FE(t, e, n, o, r, i, s) {
  const a = v(), l = ds(a, t, e, n, o, r, i, s);
  jt(Dt, fn, l, !0);
}
function RE(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = fs(c, t, e, n, o, r, i, s, a, l);
  jt(Dt, fn, u, !0);
}
function kE(t, e, n, o, r, i, s, a, l, c, u) {
  const d = v(), f = hs(d, t, e, n, o, r, i, s, a, l, c, u);
  jt(Dt, fn, f, !0);
}
function PE(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  const h = v(), p = ps(h, t, e, n, o, r, i, s, a, l, c, u, d, f);
  jt(Dt, fn, p, !0);
}
function NE(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p) {
  const g = v(), y = gs(g, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p);
  jt(Dt, fn, y, !0);
}
function LE(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y) {
  const D = v(), m = ms(D, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y);
  jt(Dt, fn, m, !0);
}
function $E(t) {
  const e = v(), n = ls(e, t);
  jt(Dt, fn, n, !0);
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function BE() {
  const t = v()[ge][re];
  return ngDevMode && S(t, "Expected component instance to be defined"), t;
}
class wO {
  destroy(e) {
  }
  updateValue(e, n) {
  }
  // operations below could be implemented on top of the operations defined so far, but having
  // them explicitly allow clear expression of intent and potentially more performant
  // implementations
  swap(e, n) {
    const o = Math.min(e, n), r = Math.max(e, n), i = this.detach(r);
    if (r - o > 1) {
      const s = this.detach(o);
      this.attach(o, i), this.attach(r, s);
    } else
      this.attach(o, i);
  }
  move(e, n) {
    this.attach(n, this.detach(e));
  }
}
function zu(t, e, n, o, r) {
  return t === n && Object.is(e, o) ? 1 : Object.is(r(t, e), r(n, o)) ? -1 : 0;
}
function MO(t, e, n) {
  let o, r, i = 0, s = t.length - 1;
  if (Array.isArray(e)) {
    let a = e.length - 1;
    for (; i <= s && i <= a; ) {
      const l = t.at(i), c = e[i], u = zu(i, l, i, c, n);
      if (u !== 0) {
        u < 0 && t.updateValue(i, c), i++;
        continue;
      }
      const d = t.at(s), f = e[a], h = zu(s, d, a, f, n);
      if (h !== 0) {
        h < 0 && t.updateValue(s, f), s--, a--;
        continue;
      }
      const p = n(i, l), g = n(s, d), y = n(i, c);
      if (Object.is(y, g)) {
        const D = n(a, f);
        Object.is(D, p) ? (t.swap(i, s), t.updateValue(s, f), a--, s--) : t.move(s, i), t.updateValue(i, c), i++;
        continue;
      }
      if (o ?? (o = new Ym()), r ?? (r = qm(t, i, s, n)), cf(t, o, i, y))
        t.updateValue(i, c), i++, s++;
      else if (r.has(y))
        o.set(p, t.detach(i)), s--;
      else {
        const D = t.create(i, e[i]);
        t.attach(i, D), i++, s++;
      }
    }
    for (; i <= a; )
      zm(t, o, n, i, e[i]), i++;
  } else if (e != null) {
    const a = e[Symbol.iterator]();
    let l = a.next();
    for (; !l.done && i <= s; ) {
      const c = t.at(i), u = l.value, d = zu(i, c, i, u, n);
      if (d !== 0)
        d < 0 && t.updateValue(i, u), i++, l = a.next();
      else {
        o ?? (o = new Ym()), r ?? (r = qm(t, i, s, n));
        const f = n(i, u);
        if (cf(t, o, i, f))
          t.updateValue(i, u), i++, s++, l = a.next();
        else if (!r.has(f))
          t.attach(i, t.create(i, u)), i++, s++, l = a.next();
        else {
          const h = n(i, c);
          o.set(h, t.detach(i)), s--;
        }
      }
    }
    for (; !l.done; )
      zm(t, o, n, t.length, l.value), l = a.next();
  }
  for (; i <= s; )
    t.destroy(t.detach(s--));
  o == null || o.forEach((a) => {
    t.destroy(a);
  });
}
function cf(t, e, n, o) {
  return e !== void 0 && e.has(o) ? (t.attach(n, e.get(o)), e.delete(o), !0) : !1;
}
function zm(t, e, n, o, r) {
  if (cf(t, e, o, n(o, r)))
    t.updateValue(o, r);
  else {
    const i = t.create(o, r);
    t.attach(o, i);
  }
}
function qm(t, e, n, o) {
  const r = /* @__PURE__ */ new Set();
  for (let i = e; i <= n; i++)
    r.add(o(i, t.at(i)));
  return r;
}
class Ym {
  constructor() {
    this.kvMap = /* @__PURE__ */ new Map(), this._vMap = void 0;
  }
  has(e) {
    return this.kvMap.has(e);
  }
  delete(e) {
    if (!this.has(e))
      return !1;
    const n = this.kvMap.get(e);
    return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(e, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(e), !0;
  }
  get(e) {
    return this.kvMap.get(e);
  }
  set(e, n) {
    if (this.kvMap.has(e)) {
      let o = this.kvMap.get(e);
      ngDevMode && dr(o, n, `Detected a duplicated value ${n} for the key ${e}`), this._vMap === void 0 && (this._vMap = /* @__PURE__ */ new Map());
      const r = this._vMap;
      for (; r.has(o); )
        o = r.get(o);
      r.set(o, n);
    } else
      this.kvMap.set(e, n);
  }
  forEach(e) {
    for (let [n, o] of this.kvMap)
      if (e(o, n), this._vMap !== void 0) {
        const r = this._vMap;
        for (; r.has(o); )
          o = r.get(o), e(o, n);
      }
  }
}
function jE(t, e, n) {
  Tn("NgControlFlow");
  const o = v(), r = ln(), i = uf(o, T + t), s = 0;
  if (Ae(o, r, e)) {
    const a = De(null);
    try {
      if (Jh(i, s), e !== -1) {
        const l = df(o[E], T + e), c = pi(i, l.tView.ssrId), u = Pa(o, l, n, { dehydratedView: c });
        Na(i, u, s, gi(l, c));
      }
    } finally {
      De(a);
    }
  } else {
    const a = Fb(i, s);
    a !== void 0 && (a[re] = n);
  }
}
class AO {
  constructor(e, n, o) {
    this.lContainer = e, this.$implicit = n, this.$index = o;
  }
  get $count() {
    return this.lContainer.length - ue;
  }
}
function HE(t) {
  return t;
}
function VE(t, e) {
  return e;
}
class _O {
  constructor(e, n, o) {
    this.hasEmptyBlock = e, this.trackByFn = n, this.liveCollection = o;
  }
}
function UE(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  Tn("NgControlFlow");
  const h = l !== void 0, p = v(), g = a ? (
    // We only want to bind when necessary, because it produces a
    // new function. For pure functions it's not necessary.
    s.bind(p[ge][re])
  ) : s, y = new _O(h, g);
  p[T + t] = y, mi(t + 1, e, n, o, r, i), h && (ngDevMode && S(c, "Missing number of declarations for the empty repeater block."), ngDevMode && S(u, "Missing number of bindings for the empty repeater block."), mi(t + 2, l, c, u, d, f));
}
class TO extends wO {
  constructor(e, n, o) {
    super(), this.lContainer = e, this.hostLView = n, this.templateTNode = o, this.needsIndexUpdate = !1;
  }
  get length() {
    return this.lContainer.length - ue;
  }
  at(e) {
    return this.getLView(e)[re].$implicit;
  }
  attach(e, n) {
    const o = n[Pt];
    this.needsIndexUpdate || (this.needsIndexUpdate = e !== this.length), Na(this.lContainer, n, e, gi(this.templateTNode, o));
  }
  detach(e) {
    return this.needsIndexUpdate || (this.needsIndexUpdate = e !== this.length - 1), xO(this.lContainer, e);
  }
  create(e, n) {
    const o = pi(this.lContainer, this.templateTNode.tView.ssrId);
    return Pa(this.hostLView, this.templateTNode, new AO(this.lContainer, n, e), { dehydratedView: o });
  }
  destroy(e) {
    Hc(e[E], e);
  }
  updateValue(e, n) {
    this.getLView(e)[re].$implicit = n;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let e = 0; e < this.length; e++)
        this.getLView(e)[re].$index = e;
  }
  getLView(e) {
    return OO(this.lContainer, e);
  }
}
function GE(t) {
  const e = De(null), n = We();
  try {
    const o = v(), r = o[E], i = o[n];
    if (i.liveCollection === void 0) {
      const a = n + 1, l = uf(o, a), c = df(r, a);
      i.liveCollection = new TO(l, o, c);
    } else
      i.liveCollection.reset();
    const s = i.liveCollection;
    if (MO(s, t, i.trackByFn), s.updateIndexes(), i.hasEmptyBlock) {
      const a = ln(), l = s.length === 0;
      if (Ae(o, a, l)) {
        const c = n + 2, u = uf(o, c);
        if (l) {
          const d = df(r, c), f = pi(u, d.tView.ssrId), h = Pa(o, d, void 0, { dehydratedView: f });
          Na(u, h, 0, gi(d, f));
        } else
          Jh(u, 0);
      }
    }
  } finally {
    De(e);
  }
}
function uf(t, e) {
  const n = t[e];
  return ngDevMode && lt(n), n;
}
function xO(t, e) {
  const n = ra(t, e);
  return ngDevMode && an(n), n;
}
function OO(t, e) {
  const n = Fb(t, e);
  return ngDevMode && an(n), n;
}
function df(t, e) {
  const n = ba(t, e);
  return ngDevMode && ai(n), n;
}
function FO(t, e, n, o, r, i) {
  ngDevMode && ct(e), ngDevMode && ngDevMode.firstCreatePass++;
  const s = e.consts, a = en(s, r), l = os(e, t, 2, o, a);
  return Uh(e, n, l, en(s, i)), l.attrs !== null && Vl(l, l.attrs, !1), l.mergedAttrs !== null && Vl(l, l.mergedAttrs, !0), e.queries !== null && e.queries.elementStart(e, l), l;
}
function su(t, e, n, o) {
  const r = v(), i = N(), s = T + t;
  ngDevMode && x(J(), i.bindingStartIndex, "elements should be created before any bindings"), ngDevMode && be(r, s);
  const a = r[B], l = i.firstCreatePass ? FO(s, i, r, e, n, o) : i.data[s], c = WE(i, r, l, a, e, t);
  r[s] = c;
  const u = Sc(l);
  return ngDevMode && i.firstCreatePass && fA(c, r, l.value, i.schemas, u), tn(l, !0), yC(a, c, l), (l.flags & 32) !== 32 && Mc() && Uc(i, r, c, l), zM() === 0 && $e(c, r), qM(), u && (jh(i, r, l), Bh(i, l, r)), o !== null && Hh(r, l), su;
}
function au() {
  let t = K();
  ngDevMode && S(t, "No parent node to close."), Jf() ? eh() : (ngDevMode && Av(K()), t = t.parent, tn(t, !1));
  const e = t;
  ngDevMode && He(
    e,
    3
    /* TNodeType.AnyRNode */
  ), ZM(e) && KM(), YM();
  const n = N();
  return n.firstCreatePass && (Ac(n, t), Wf(t) && n.queries.elementEnd(t)), e.classesWithoutHost != null && c1(e) && lf(n, e, v(), e.classesWithoutHost, !0), e.stylesWithoutHost != null && u1(e) && lf(n, e, v(), e.stylesWithoutHost, !1), au;
}
function gp(t, e, n, o) {
  return su(t, e, n, o), au(), gp;
}
let WE = (t, e, n, o, r, i) => (to(!0), jc(o, r, cD()));
function RO(t, e, n, o, r, i) {
  const s = e[Pt], a = !s || Zi() || Yc(s, i);
  if (to(a), a)
    return jc(o, r, cD());
  const l = eu(s, t, e, n);
  if (ngDevMode && Ra(l, Node.ELEMENT_NODE, r, e, n), ngDevMode && ts(l), PC(s, i) && (ngDevMode && Xc(l.nextSibling, e, n), qc(s, i, l.nextSibling)), s && (YD(n) || ZD(l))) {
    if (eo(n))
      QM(n), pC(l), ngDevMode && ngDevMode.componentsSkippedHydration++;
    else if (ngDevMode)
      throw Cx(l);
  }
  return l;
}
function kO() {
  WE = RO;
}
function PO(t, e, n, o, r) {
  ngDevMode && ngDevMode.firstCreatePass++;
  const i = e.consts, s = en(i, o), a = os(e, t, 8, "ng-container", s);
  s !== null && Vl(a, s, !0);
  const l = en(i, r);
  return Uh(e, n, a, l), e.queries !== null && e.queries.elementStart(e, a), a;
}
function lu(t, e, n) {
  const o = v(), r = N(), i = t + T;
  ngDevMode && be(o, i), ngDevMode && x(J(), r.bindingStartIndex, "element containers should be created before any bindings");
  const s = r.firstCreatePass ? PO(i, r, o, e, n) : r.data[i];
  tn(s, !0);
  const a = zE(r, o, s, t);
  return o[i] = a, Mc() && Uc(r, o, a, s), $e(a, o), Sc(s) && (jh(r, o, s), Bh(r, s, o)), n != null && Hh(o, s), lu;
}
function cu() {
  let t = K();
  const e = N();
  return Jf() ? eh() : (ngDevMode && Av(t), t = t.parent, tn(t, !1)), ngDevMode && He(
    t,
    8
    /* TNodeType.ElementContainer */
  ), e.firstCreatePass && (Ac(e, t), Wf(t) && e.queries.elementEnd(t)), cu;
}
function mp(t, e, n) {
  return lu(t, e, n), cu(), mp;
}
let zE = (t, e, n, o) => (to(!0), Sh(e[B], ngDevMode ? "ng-container" : ""));
function NO(t, e, n, o) {
  let r;
  const i = e[Pt], s = !i || Zi();
  if (to(s), s)
    return Sh(e[B], ngDevMode ? "ng-container" : "");
  const a = eu(i, t, e, n);
  ngDevMode && Xc(a, e, n);
  const l = I_(i, o);
  return ngDevMode && X(l, "Unexpected state: hydrating an <ng-container>, but no hydration info is available."), qc(i, o, a), r = tu(l, a), ngDevMode && (Ra(r, Node.COMMENT_NODE, null, e, n), ts(r)), r;
}
function LO() {
  zE = NO;
}
function qE() {
  return v();
}
function yp(t, e, n) {
  const o = v(), r = ln();
  if (Ae(o, r, e)) {
    const i = N(), s = ce();
    Ct(i, s, o, t, e, o[B], n, !0), ngDevMode && Ee(i.data, s, t, r);
  }
  return yp;
}
function vp(t, e, n) {
  const o = v(), r = ln();
  if (Ae(o, r, e)) {
    const i = N(), s = ce(), a = th(i.data), l = ub(a, s, o);
    Ct(i, s, o, t, e, l, n, !0), ngDevMode && Ee(i.data, s, t, r);
  }
  return vp;
}
typeof ngI18nClosureMode > "u" && function() {
  xe.ngI18nClosureMode = // TODO(FW-1250): validate that this actually, you know, works.
  // tslint:disable-next-line:no-toplevel-property-access
  typeof goog < "u" && typeof goog.getMsg == "function";
}();
const so = void 0;
function $O(t) {
  const e = Math.floor(Math.abs(t)), n = t.toString().replace(/^[^.]*\.?/, "").length;
  return e === 1 && n === 0 ? 1 : 5;
}
var BO = ["en", [["a", "p"], ["AM", "PM"], so], [["AM", "PM"], so, so], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], so, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], so, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", so, "{1} 'at' {0}", so], [".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", $O];
let oi = {};
function jO(t, e, n) {
  typeof e != "string" && (n = e, e = t[ne.LocaleId]), e = e.toLowerCase().replace(/_/g, "-"), oi[e] = t, n && (oi[e][ne.ExtraData] = n);
}
function ze(t) {
  const e = UO(t);
  let n = Zm(e);
  if (n)
    return n;
  const o = e.split("-")[0];
  if (n = Zm(o), n)
    return n;
  if (o === "en")
    return BO;
  throw new b(701, ngDevMode && `Missing locale data for the locale "${t}".`);
}
function HO(t) {
  return ze(t)[ne.CurrencyCode] || null;
}
function Dp(t) {
  return ze(t)[ne.PluralCase];
}
function Zm(t) {
  return t in oi || (oi[t] = xe.ng && xe.ng.common && xe.ng.common.locales && xe.ng.common.locales[t]), oi[t];
}
function VO() {
  oi = {};
}
var ne;
(function(t) {
  t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData";
})(ne || (ne = {}));
function UO(t) {
  return t.toLowerCase().replace(/_/g, "-");
}
const GO = ["zero", "one", "two", "few", "many"];
function WO(t, e) {
  const n = Dp(e)(parseInt(t, 10)), o = GO[n];
  return o !== void 0 ? o : "other";
}
const sr = "en-US", zO = "USD", uu = {
  marker: "element"
}, du = {
  marker: "ICU"
};
var Ke;
(function(t) {
  t[t.SHIFT = 2] = "SHIFT", t[t.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", t[t.COMMENT = 2] = "COMMENT";
})(Ke || (Ke = {}));
let YE = sr;
function Cp(t) {
  S(t, "Expected localeId to be defined"), typeof t == "string" && (YE = t.toLowerCase().replace(/_/g, "-"));
}
function qO() {
  return YE;
}
function ZE(t, e, n) {
  const o = e.insertBeforeIndex, r = Array.isArray(o) ? o[0] : o;
  return r === null ? uC(t, e, n) : (ngDevMode && be(n, r), se(n[r]));
}
function QE(t, e, n, o, r) {
  const i = e.insertBeforeIndex;
  if (Array.isArray(i)) {
    ngDevMode && Pn(o);
    let s = o, a = null;
    if (e.type & 3 || (a = s, s = r), s !== null && e.componentOffset === -1)
      for (let l = 1; l < i.length; l++) {
        const c = n[i[l]];
        Qo(t, s, c, a, !1);
      }
  }
}
function KE(t, e) {
  if (ngDevMode && x(e.insertBeforeIndex, null, "We expect that insertBeforeIndex is not set"), t.push(e), t.length > 1)
    for (let n = t.length - 2; n >= 0; n--) {
      const o = t[n];
      XE(o) || YO(o, e) && ZO(o) === null && QO(o, e.index);
    }
}
function XE(t) {
  return !(t.type & 64);
}
function YO(t, e) {
  return XE(e) || t.index > e.index;
}
function ZO(t) {
  const e = t.insertBeforeIndex;
  return Array.isArray(e) ? e[0] : e;
}
function QO(t, e) {
  const n = t.insertBeforeIndex;
  Array.isArray(n) ? n[0] = e : (fC(ZE, QE), t.insertBeforeIndex = e);
}
function Rs(t, e) {
  const n = t.data[e];
  if (n === null || typeof n == "string")
    return null;
  ngDevMode && !(n.hasOwnProperty("tView") || n.hasOwnProperty("currentCaseLViewIndex")) && _("We expect to get 'null'|'TIcu'|'TIcuContainer', but got: " + n);
  const o = n.hasOwnProperty("currentCaseLViewIndex") ? n : n.value;
  return ngDevMode && qf(o), o;
}
function KO(t, e, n) {
  const o = t.data[e];
  ngDevMode && x(o === null || o.hasOwnProperty("tView"), !0, "We expect to get 'null'|'TIcuContainer'"), o === null ? t.data[e] = n : (ngDevMode && He(
    o,
    32
    /* TNodeType.Icu */
  ), o.value = n);
}
function XO(t, e) {
  ngDevMode && ai(t);
  let n = t.insertBeforeIndex;
  n === null ? (fC(ZE, QE), n = t.insertBeforeIndex = [null, e]) : (x(Array.isArray(n), !0, "Expecting array here"), n.push(e));
}
function JO(t, e, n) {
  const o = $h(t, n, 64, null, null);
  return KE(e, o), o;
}
function fu(t, e) {
  const n = e[t.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
function JE(t) {
  return t >>> 17;
}
function eI(t) {
  return (t & 131070) >>> 1;
}
function Qm(t) {
  return t & 1;
}
function eF(t, e, n) {
  return ngDevMode && wn(e, 0, "Missing parent index"), ngDevMode && Jn(n, 0, "Missing ref index"), t | e << 17 | n << 1;
}
let ca = 0, ks = 0;
function tF(t) {
  t && (ca = ca | 1 << Math.min(ks, 31)), ks++;
}
function nF(t, e, n) {
  if (ks > 0) {
    ngDevMode && S(t, "tView should be defined");
    const o = t.data[n], r = Array.isArray(o) ? o : o.update, i = J() - ks - 1;
    nI(t, e, r, i, ca);
  }
  ca = 0, ks = 0;
}
function oF(t, e, n, o) {
  const r = t[B];
  for (let i = 0; i < e.length; i++) {
    const s = e[i++], a = e[i], l = (s & Ke.COMMENT) === Ke.COMMENT, c = (s & Ke.APPEND_EAGERLY) === Ke.APPEND_EAGERLY, u = s >>> Ke.SHIFT;
    let d = t[u];
    d === null && (d = t[u] = l ? r.createComment(a) : Bc(r, a)), c && n !== null && Qo(r, n, d, o, !1);
  }
}
function tI(t, e, n, o) {
  ngDevMode && Pn(o);
  const r = n[B];
  let i = null, s;
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (typeof l == "string") {
      const c = e[++a];
      n[c] === null && (ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && be(n, c), n[c] = Bc(r, l));
    } else if (typeof l == "number")
      switch (l & 1) {
        case 0:
          const c = JE(l);
          i === null && (i = c, s = Vc(r, o));
          let u, d;
          if (c === i ? (u = o, d = s) : (u = null, d = se(n[c])), d !== null) {
            ngDevMode && Pn(d);
            const g = eI(l);
            ngDevMode && Jn(g, T, "Missing ref");
            const y = n[g];
            ngDevMode && Pn(y), Qo(r, d, y, u, !1);
            const D = Rs(t, g);
            if (D !== null && typeof D == "object") {
              ngDevMode && qf(D);
              const m = fu(D, n);
              m !== null && tI(t, D.create[m], n, n[D.anchorIdx]);
            }
          }
          break;
        case 1:
          const f = l >>> 1, h = e[++a], p = e[++a];
          Gh(r, Ca(f, n), null, null, h, p, null);
          break;
        default:
          if (ngDevMode)
            throw new b(700, `Unable to determine the type of mutate operation for "${l}"`);
      }
    else
      switch (l) {
        case du:
          const c = e[++a], u = e[++a];
          if (n[u] === null) {
            ngDevMode && x(typeof c, "string", `Expected "${c}" to be a comment node value`), ngDevMode && ngDevMode.rendererCreateComment++, ngDevMode && Ol(n, u);
            const h = n[u] = Sh(r, c);
            $e(h, n);
          }
          break;
        case uu:
          const d = e[++a], f = e[++a];
          if (n[f] === null) {
            ngDevMode && x(typeof d, "string", `Expected "${d}" to be an element node tag name`), ngDevMode && ngDevMode.rendererCreateElement++, ngDevMode && Ol(n, f);
            const h = n[f] = jc(r, d, null);
            $e(h, n);
          }
          break;
        default:
          ngDevMode && _(`Unable to determine the type of mutate operation for "${l}"`);
      }
  }
}
function nI(t, e, n, o, r) {
  for (let i = 0; i < n.length; i++) {
    const s = n[i], a = n[++i];
    if (s & r) {
      let l = "";
      for (let c = i + 1; c <= i + a; c++) {
        const u = n[c];
        if (typeof u == "string")
          l += u;
        else if (typeof u == "number")
          if (u < 0)
            l += L(e[o - u]);
          else {
            const d = u >>> 2;
            switch (u & 3) {
              case 1:
                const f = n[++c], h = n[++c], p = t.data[d];
                ngDevMode && S(p, "Experting TNode or string"), typeof p == "string" ? Gh(e[B], e[d], null, p, f, l, h) : Ct(t, p, e, f, l, e[B], h, !1);
                break;
              case 0:
                const g = e[d];
                g !== null && rC(e[B], g, l);
                break;
              case 2:
                rF(t, Rs(t, d), e, l);
                break;
              case 3:
                Km(t, Rs(t, d), o, e);
                break;
            }
          }
      }
    } else {
      const l = n[i + 1];
      if (l > 0 && (l & 3) === 3) {
        const c = l >>> 2, u = Rs(t, c);
        e[u.currentCaseLViewIndex] < 0 && Km(t, u, o, e);
      }
    }
    i += a;
  }
}
function Km(t, e, n, o) {
  ngDevMode && be(o, e.currentCaseLViewIndex);
  let r = o[e.currentCaseLViewIndex];
  if (r !== null) {
    let i = ca;
    r < 0 && (r = o[e.currentCaseLViewIndex] = ~r, i = -1), nI(t, o, e.update[r], n, i);
  }
}
function rF(t, e, n, o) {
  const r = iF(e, o);
  if (fu(e, n) !== r && (oI(t, e, n), n[e.currentCaseLViewIndex] = r === null ? null : ~r, r !== null)) {
    const s = n[e.anchorIdx];
    s && (ngDevMode && Pn(s), tI(t, e.create[r], n, s));
  }
}
function oI(t, e, n) {
  let o = fu(e, n);
  if (o !== null) {
    const r = e.remove[o];
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      if (s > 0) {
        const a = Ca(s, n);
        a !== null && Gc(n[B], a);
      } else
        oI(t, Rs(t, ~s), n);
    }
  }
}
function iF(t, e) {
  let n = t.cases.indexOf(e);
  if (n === -1)
    switch (t.type) {
      case 1: {
        const o = WO(e, qO());
        n = t.cases.indexOf(o), n === -1 && o !== "other" && (n = t.cases.indexOf("other"));
        break;
      }
      case 0: {
        n = t.cases.indexOf("other");
        break;
      }
    }
  return n === -1 ? null : n;
}
function sF() {
  const t = [];
  let e = -1, n, o;
  function r(a, l) {
    for (n = l; t.length; )
      t.pop();
    return ngDevMode && tt(a, l), i(a.value, l), s;
  }
  function i(a, l) {
    e = 0;
    const c = fu(a, l);
    c !== null ? (ngDevMode && zs(c, 0, a.cases.length - 1), o = a.remove[c]) : o = q;
  }
  function s() {
    if (e < o.length) {
      const a = o[e++];
      if (ngDevMode && X(a, "Expecting OpCode number"), a > 0) {
        const l = n[a];
        return ngDevMode && Pn(l), l;
      } else {
        t.push(e, o);
        const l = ~a, c = n[E].data[l];
        return ngDevMode && qf(c), i(c, n), s();
      }
    } else
      return t.length === 0 ? null : (o = t.pop(), e = t.pop(), s());
  }
  return r;
}
function aF(t) {
  const e = t || (Array.isArray(this) ? this : []);
  let n = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o++], i = e[o], s = (r & Ke.COMMENT) === Ke.COMMENT, a = (r & Ke.APPEND_EAGERLY) === Ke.APPEND_EAGERLY, l = r >>> Ke.SHIFT;
    n.push(`lView[${l}] = document.${s ? "createComment" : "createText"}(${JSON.stringify(i)});`), a && n.push(`parent.appendChild(lView[${l}]);`);
  }
  return n;
}
function hu(t) {
  const e = new rI(t || (Array.isArray(this) ? this : []));
  let n = [];
  function o(r) {
    const i = r >>> 2;
    switch (r & 3) {
      case 0:
        return `(lView[${i}] as Text).textContent = $$$`;
      case 1:
        const a = e.consumeString(), l = e.consumeFunction(), c = l ? `(${l})($$$)` : "$$$";
        return `(lView[${i}] as Element).setAttribute('${a}', ${c})`;
      case 2:
        return `icuSwitchCase(${i}, $$$)`;
      case 3:
        return `icuUpdateCase(${i})`;
    }
    throw new Error("unexpected OpCode");
  }
  for (; e.hasMore(); ) {
    let r = e.consumeNumber(), i = e.consumeNumber();
    const s = e.i + i, a = [];
    let l = "";
    for (; e.i < s; ) {
      let c = e.consumeNumberOrString();
      if (typeof c == "string")
        l += c;
      else if (c < 0)
        l += "${lView[i" + c + "]}";
      else {
        const u = o(c);
        a.push(u.replace("$$$", "`" + l + "`") + ";"), l = "";
      }
    }
    n.push(`if (mask & 0b${r.toString(2)}) { ${a.join(" ")} }`);
  }
  return n;
}
function lF(t) {
  const e = new rI(t || (Array.isArray(this) ? this : []));
  let n = [];
  function o(i) {
    const s = JE(i), a = eI(i);
    switch (Qm(i)) {
      case 0:
        return `(lView[${s}] as Element).appendChild(lView[${r}])`;
      case 1:
        return `(lView[${a}] as Element).setAttribute("${e.consumeString()}", "${e.consumeString()}")`;
    }
    throw new Error("Unexpected OpCode: " + Qm(i));
  }
  let r = -1;
  for (; e.hasMore(); ) {
    let i = e.consumeNumberStringOrMarker();
    if (i === du) {
      const s = e.consumeString();
      r = e.consumeNumber(), n.push(`lView[${r}] = document.createComment("${s}")`);
    } else if (i === uu) {
      const s = e.consumeString();
      r = e.consumeNumber(), n.push(`lView[${r}] = document.createElement("${s}")`);
    } else if (typeof i == "string")
      r = e.consumeNumber(), n.push(`lView[${r}] = document.createTextNode("${i}")`);
    else if (typeof i == "number") {
      const s = o(i);
      s && n.push(s);
    } else
      throw new Error("Unexpected value");
  }
  return n;
}
function cF(t) {
  const e = t || (Array.isArray(this) ? this : []);
  let n = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    r > 0 ? n.push(`remove(lView[${r}])`) : n.push(`removeNestedICU(${~r})`);
  }
  return n;
}
class rI {
  constructor(e) {
    this.i = 0, this.codes = e;
  }
  hasMore() {
    return this.i < this.codes.length;
  }
  consumeNumber() {
    let e = this.codes[this.i++];
    return X(e, "expecting number in OpCode"), e;
  }
  consumeString() {
    let e = this.codes[this.i++];
    return zi(e, "expecting string in OpCode"), e;
  }
  consumeFunction() {
    let e = this.codes[this.i++];
    if (e === null || typeof e == "function")
      return e;
    throw new Error("expecting function in OpCode");
  }
  consumeNumberOrString() {
    let e = this.codes[this.i++];
    return typeof e == "string" || X(e, "expecting number or string in OpCode"), e;
  }
  consumeNumberStringOrMarker() {
    let e = this.codes[this.i++];
    return typeof e == "string" || typeof e == "number" || e == du || e == uu || X(e, "expecting number, string, ICU_MARKER or ELEMENT_MARKER in OpCode"), e;
  }
}
const Yl = /�(\d+):?\d*�/gi, uF = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi, dF = /�(\d+)�/, iI = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, Ps = "�", fF = /�\/?\*(\d+:\d+)�/gi, hF = /�(\/?[#*]\d+):?\d*�/gi, pF = /\uE500/g;
function gF(t) {
  return t.replace(pF, " ");
}
function $o(t, e) {
  if (ngDevMode)
    Object.defineProperty(t, "debug", { get: e, enumerable: !1 });
  else
    throw new Error("This method should be guarded with `ngDevMode` so that it can be tree shaken in production!");
}
function mF(t, e, n, o, r, i) {
  const s = Js(), a = [], l = [], c = [[]];
  ngDevMode && ($o(a, aF), $o(l, hu)), r = bF(r, i);
  const u = gF(r).split(hF);
  for (let d = 0; d < u.length; d++) {
    let f = u[d];
    if (d & 1) {
      const h = f.charCodeAt(0) === 47, p = f.charCodeAt(h ? 1 : 0);
      ngDevMode && nM(
        p,
        42,
        35
        /* CharCode.HASH */
      );
      const g = T + Number.parseInt(f.substring(h ? 2 : 1));
      if (h)
        c.shift(), tn(Js(), !1);
      else {
        const y = JO(t, c[0], g);
        c.unshift([]), tn(y, !0);
      }
    } else {
      const h = ff(f);
      for (let p = 0; p < h.length; p++) {
        let g = h[p];
        if (p & 1) {
          const y = g;
          if (typeof y != "object")
            throw new Error(`Unable to parse ICU expression in "${r}" message.`);
          const m = sI(t, s, c[0], n, a, ngDevMode ? `ICU ${o}:${y.mainBinding}` : "", !0).index;
          ngDevMode && wn(m, T, "Index must be in absolute LView offset"), lI(t, n, l, e, y, m);
        } else {
          const y = g;
          ngDevMode && zi(y, "Parsed ICU part should be string"), y !== "" && yF(t, s, c[0], a, l, n, y);
        }
      }
    }
  }
  t.data[o] = {
    create: a,
    update: l
  };
}
function sI(t, e, n, o, r, i, s) {
  const a = Oa(t, o, 1, null);
  let l = a << Ke.SHIFT, c = Js();
  e === c && (c = null), c === null && (l |= Ke.APPEND_EAGERLY), s && (l |= Ke.COMMENT, AA(sF)), r.push(l, i === null ? "" : i);
  const u = $h(t, a, s ? 32 : 1, i === null ? ngDevMode ? "{{?}}" : "" : i, null);
  KE(n, u);
  const d = u.index;
  return tn(
    u,
    !1
    /* Text nodes are self closing */
  ), c !== null && e !== c && XO(c, d), u;
}
function yF(t, e, n, o, r, i, s) {
  const a = s.match(Yl), l = sI(t, e, n, i, o, a ? null : s, !1);
  a && Ns(r, s, l.index, null, 0, null);
}
function vF(t, e, n) {
  const r = K().index, i = [];
  if (ngDevMode && $o(i, hu), t.firstCreatePass && t.data[e] === null) {
    for (let s = 0; s < n.length; s += 2) {
      const a = n[s], l = n[s + 1];
      if (l !== "") {
        if (uF.test(l))
          throw new Error(`ICU expressions are not supported in attributes. Message: "${l}".`);
        Ns(i, l, r, a, DF(i), null);
      }
    }
    t.data[e] = i;
  }
}
function Ns(t, e, n, o, r, i) {
  ngDevMode && wn(n, T, "Index must be in absolute LView offset");
  const s = t.length, a = s + 1;
  t.push(null, null);
  const l = s + 2;
  ngDevMode && $o(t, hu);
  const c = e.split(Yl);
  let u = 0;
  for (let d = 0; d < c.length; d++) {
    const f = c[d];
    if (d & 1) {
      const h = r + parseInt(f, 10);
      t.push(-1 - h), u = u | aI(h);
    } else
      f !== "" && t.push(f);
  }
  return t.push(n << 2 | (o ? 1 : 0)), o && t.push(o, i), t[s] = u, t[a] = t.length - l, u;
}
function DF(t) {
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    typeof o == "number" && o < 0 && e++;
  }
  return e;
}
function aI(t) {
  return 1 << Math.min(t, 31);
}
function CF(t) {
  return t === -1;
}
function Xm(t) {
  let e, n = "", o = 0, r = !1, i;
  for (; (e = fF.exec(t)) !== null; )
    r ? e[0] === `${Ps}/*${i}${Ps}` && (o = e.index, r = !1) : (n += t.substring(o, e.index + e[0].length), i = e[1], r = !0);
  return ngDevMode && x(r, !1, `Tag mismatch: unable to find the end of the sub-template in the translation "${t}"`), n += t.slice(o), n;
}
function bF(t, e) {
  if (CF(e))
    return Xm(t);
  {
    const n = t.indexOf(`:${e}${Ps}`) + 2 + e.toString().length, o = t.search(new RegExp(`${Ps}\\/\\*\\d+:${e}${Ps}`));
    return Xm(t.substring(n, o));
  }
}
function lI(t, e, n, o, r, i) {
  ngDevMode && S(r, "ICU expression must be defined");
  let s = 0;
  const a = {
    type: r.type,
    currentCaseLViewIndex: Oa(t, e, 1, null),
    anchorIdx: i,
    cases: [],
    create: [],
    remove: [],
    update: []
  };
  wF(n, r, i), KO(t, i, a);
  const l = r.values;
  for (let c = 0; c < l.length; c++) {
    const u = l[c], d = [];
    for (let f = 0; f < u.length; f++) {
      const h = u[f];
      if (typeof h != "string") {
        const p = d.push(h) - 1;
        u[f] = `<!--�${p}�-->`;
      }
    }
    s = IF(t, a, e, n, o, r.cases[c], u.join(""), d) | s;
  }
  s && MF(n, s, i);
}
function EF(t) {
  const e = [], n = [];
  let o = 1, r = 0;
  t = t.replace(iI, function(s, a, l) {
    return l === "select" ? o = 0 : o = 1, r = parseInt(a.slice(1), 10), "";
  });
  const i = ff(t);
  for (let s = 0; s < i.length; ) {
    let a = i[s++].trim();
    o === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && e.push(a);
    const l = ff(i[s++]);
    e.length > n.length && n.push(l);
  }
  return { type: o, mainBinding: r, cases: e, values: n };
}
function ff(t) {
  if (!t)
    return [];
  let e = 0;
  const n = [], o = [], r = /[{}]/g;
  r.lastIndex = 0;
  let i;
  for (; i = r.exec(t); ) {
    const a = i.index;
    if (i[0] == "}") {
      if (n.pop(), n.length == 0) {
        const l = t.substring(e, a);
        iI.test(l) ? o.push(EF(l)) : o.push(l), e = a + 1;
      }
    } else {
      if (n.length == 0) {
        const l = t.substring(e, a);
        o.push(l), e = a + 1;
      }
      n.push("{");
    }
  }
  const s = t.substring(e);
  return o.push(s), o;
}
function IF(t, e, n, o, r, i, s, a) {
  const l = [], c = [], u = [];
  ngDevMode && ($o(l, lF), $o(c, cF), $o(u, hu)), e.cases.push(i), e.create.push(l), e.remove.push(c), e.update.push(u);
  const f = CC(Hn()).getInertBodyElement(s);
  ngDevMode && S(f, "Unable to generate inert body element");
  const h = Hd(f) || f;
  return h ? cI(t, e, n, o, l, c, u, h, r, a, 0) : 0;
}
function cI(t, e, n, o, r, i, s, a, l, c, u) {
  let d = 0, f = a.firstChild;
  for (; f; ) {
    const h = Oa(t, n, 1, null);
    switch (f.nodeType) {
      case Node.ELEMENT_NODE:
        const p = f, g = p.tagName.toLowerCase();
        if (jd.hasOwnProperty(g)) {
          qu(r, uu, g, l, h), t.data[h] = g;
          const I = p.attributes;
          for (let w = 0; w < I.length; w++) {
            const M = I.item(w), P = M.name.toLowerCase();
            !!M.value.match(Yl) ? SC.hasOwnProperty(P) ? Ah[P] ? Ns(s, M.value, h, M.name, 0, zc) : Ns(s, M.value, h, M.name, 0, null) : ngDevMode && console.warn(`WARNING: ignoring unsafe attribute value ${P} on element ${g} (see ${ur})`) : AF(r, h, M);
          }
          d = cI(t, e, n, o, r, i, s, f, h, c, u + 1) | d, Jm(i, h, u);
        }
        break;
      case Node.TEXT_NODE:
        const y = f.textContent || "", D = y.match(Yl);
        qu(r, null, D ? "" : y, l, h), Jm(i, h, u), D && (d = Ns(s, y, h, null, 0, null) | d);
        break;
      case Node.COMMENT_NODE:
        const m = dF.exec(f.textContent || "");
        if (m) {
          const I = parseInt(m[1], 10), w = c[I];
          qu(r, du, ngDevMode ? `nested ICU ${I}` : "", l, h), lI(t, n, o, l, w, h), SF(i, h, u);
        }
        break;
    }
    f = f.nextSibling;
  }
  return d;
}
function Jm(t, e, n) {
  n === 0 && t.push(e);
}
function SF(t, e, n) {
  n === 0 && (t.push(~e), t.push(e));
}
function wF(t, e, n) {
  t.push(
    aI(e.mainBinding),
    2,
    -1 - e.mainBinding,
    n << 2 | 2
    /* I18nUpdateOpCode.IcuSwitch */
  );
}
function MF(t, e, n) {
  t.push(
    e,
    1,
    n << 2 | 3
    /* I18nUpdateOpCode.IcuUpdate */
  );
}
function qu(t, e, n, o, r) {
  e !== null && t.push(e), t.push(n, r, eF(0, o, r));
}
function AF(t, e, n) {
  t.push(e << 1 | 1, n.name, n.value);
}
const ey = 0, _F = /\[(�.+?�?)\]/, TF = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g, xF = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g, OF = /{([A-Z0-9_]+)}/g, FF = /�I18N_EXP_(ICU(_\d+)?)�/g, RF = /\/\*/, kF = /\d+\:(\d+)/;
function PF(t, e = {}) {
  let n = t;
  if (_F.test(t)) {
    const o = {}, r = [ey];
    n = n.replace(TF, (i, s, a) => {
      const l = s || a, c = o[l] || [];
      if (c.length || (l.split("|").forEach((g) => {
        const y = g.match(kF), D = y ? parseInt(y[1], 10) : ey, m = RF.test(g);
        c.push([D, m, g]);
      }), o[l] = c), !c.length)
        throw new Error(`i18n postprocess: unmatched placeholder - ${l}`);
      const u = r[r.length - 1];
      let d = 0;
      for (let g = 0; g < c.length; g++)
        if (c[g][0] === u) {
          d = g;
          break;
        }
      const [f, h, p] = c[d];
      return h ? r.pop() : u !== f && r.push(f), c.splice(d, 1), p;
    });
  }
  return Object.keys(e).length && (n = n.replace(xF, (o, r, i, s, a, l) => e.hasOwnProperty(i) ? `${r}${e[i]}${l}` : o), n = n.replace(OF, (o, r) => e.hasOwnProperty(r) ? e[r] : o), n = n.replace(FF, (o, r) => {
    if (e.hasOwnProperty(r)) {
      const i = e[r];
      if (!i.length)
        throw new Error(`i18n postprocess: unmatched ICU - ${o} with key: ${r}`);
      return i.shift();
    }
    return o;
  })), n;
}
function bp(t, e, n = -1) {
  const o = N(), r = v(), i = T + t;
  ngDevMode && S(o, "tView should be defined");
  const s = en(o.consts, e), a = Js();
  if (o.firstCreatePass && mF(o, a === null ? 0 : a.index, r, i, s, n), o.type === 2) {
    const f = r[ge];
    f[O] |= 32;
  } else
    r[O] |= 32;
  const l = o.data[i], c = a === r[Ue] ? null : a, u = aC(o, c, r), d = a && a.type & 8 ? r[a.index] : null;
  oF(r, l.create, u, d), Jv(!0);
}
function Ep() {
  Jv(!1);
}
function uI(t, e, n) {
  bp(t, e, n), Ep();
}
function dI(t, e) {
  const n = N();
  ngDevMode && S(n, "tView should be defined");
  const o = en(n.consts, e);
  vF(n, t + T, o);
}
function Ip(t) {
  const e = v();
  return tF(Ae(e, ln(), t)), Ip;
}
function fI(t) {
  nF(N(), v(), t + T);
}
function hI(t, e = {}) {
  return PF(t, e);
}
function pu(t) {
  return !!t && typeof t.then == "function";
}
function gu(t) {
  return !!t && typeof t.subscribe == "function";
}
function Sp(t, e, n, o) {
  const r = v(), i = N(), s = K();
  return pI(i, r, r[B], s, t, e, o), Sp;
}
function wp(t, e) {
  const n = K(), o = v(), r = N(), i = th(r.data), s = ub(i, n, o);
  return pI(r, o, s, n, t, e), wp;
}
function NF(t, e, n, o) {
  const r = t.cleanup;
  if (r != null)
    for (let i = 0; i < r.length - 1; i += 2) {
      const s = r[i];
      if (s === n && r[i + 1] === o) {
        const a = e[si], l = r[i + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function pI(t, e, n, o, r, i, s) {
  const a = Sc(o), c = t.firstCreatePass && qd(t), u = e[re], d = cb(e);
  ngDevMode && He(
    o,
    15
    /* TNodeType.AnyContainer */
  );
  let f = !0;
  if (o.type & 3 || s) {
    const g = Ge(o, e), y = s ? s(g) : g, D = d.length, m = s ? (w) => s(se(w[o.index])) : o.index;
    let I = null;
    if (!s && a && (I = NF(t, e, r, o.index)), I !== null) {
      const w = I.__ngLastListenerFn__ || I;
      w.__ngNextListenerFn__ = i, I.__ngLastListenerFn__ = i, f = !1;
    } else {
      i = ny(
        o,
        e,
        u,
        i,
        !1
        /** preventDefault */
      );
      const w = n.listen(y, r, i);
      ngDevMode && ngDevMode.rendererAddEventListener++, d.push(i, w), c && c.push(r, m, D, D + 1);
    }
  } else
    i = ny(
      o,
      e,
      u,
      i,
      !1
      /** preventDefault */
    );
  const h = o.outputs;
  let p;
  if (f && h !== null && (p = h[r])) {
    const g = p.length;
    if (g)
      for (let y = 0; y < g; y += 2) {
        const D = p[y];
        ngDevMode && be(e, D);
        const m = p[y + 1], I = e[D], w = I[m];
        if (ngDevMode && !gu(w))
          throw new Error(`@Output ${m} not initialized in '${I.constructor.name}'.`);
        const M = w.subscribe(i), P = d.length;
        d.push(i, M), c && c.push(r, o.index, P, -(P + 1));
      }
  }
}
function ty(t, e, n, o) {
  try {
    return Wt(6, e, n), n(o) !== !1;
  } catch (r) {
    return Kc(t, r), !1;
  } finally {
    Wt(7, e, n);
  }
}
function ny(t, e, n, o, r) {
  return function i(s) {
    if (s === Function)
      return o;
    const a = t.componentOffset > -1 ? vt(t.index, e) : e;
    Fa(a);
    let l = ty(e, n, o, s), c = i.__ngNextListenerFn__;
    for (; c; )
      l = ty(e, n, c, s) && l, c = c.__ngNextListenerFn__;
    return r && l === !1 && s.preventDefault(), l;
  };
}
function gI(t = 1) {
  return o1(t);
}
function LF(t, e) {
  let n = null;
  const o = IM(t);
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i === "*") {
      n = r;
      continue;
    }
    if (o === null ? Dv(
      t,
      i,
      /* isProjectionMode */
      !0
    ) : MM(o, i))
      return r;
  }
  return n;
}
function mI(t) {
  const e = v()[ge][Ue];
  if (!e.projection) {
    const n = t ? t.length : 1, o = e.projection = As(n, null), r = o.slice();
    let i = e.child;
    for (; i !== null; ) {
      const s = t ? LF(i, t) : 0;
      s !== null && (r[s] ? r[s].projectionNext = i : o[s] = i, r[s] = i), i = i.next;
    }
  }
}
function yI(t, e = 0, n) {
  const o = v(), r = N(), i = os(r, T + t, 16, null, n || null);
  i.projection === null && (i.projection = e), eh(), (!o[Pt] || Zi()) && (i.flags & 32) !== 32 && LA(r, o, i);
}
function Mp(t, e, n) {
  return mu(t, "", e, "", n), Mp;
}
function mu(t, e, n, o, r) {
  const i = v(), s = cs(i, e, n, o);
  if (s !== F) {
    const a = N(), l = ce();
    Ct(a, l, i, t, s, i[B], r, !1), ngDevMode && Ee(a.data, l, t, J() - 1, e, o);
  }
  return mu;
}
function Ap(t, e, n, o, r, i, s) {
  const a = v(), l = us(a, e, n, o, r, i);
  if (l !== F) {
    const c = N(), u = ce();
    Ct(c, u, a, t, l, a[B], s, !1), ngDevMode && Ee(c.data, u, t, J() - 2, e, o, i);
  }
  return Ap;
}
function _p(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = ds(c, e, n, o, r, i, s, a);
  if (u !== F) {
    const d = N(), f = ce();
    Ct(d, f, c, t, u, c[B], l, !1), ngDevMode && Ee(d.data, f, t, J() - 3, e, o, i, a);
  }
  return _p;
}
function Tp(t, e, n, o, r, i, s, a, l, c, u) {
  const d = v(), f = fs(d, e, n, o, r, i, s, a, l, c);
  if (f !== F) {
    const h = N(), p = ce();
    Ct(h, p, d, t, f, d[B], u, !1), ngDevMode && Ee(h.data, p, t, J() - 4, e, o, i, a, c);
  }
  return Tp;
}
function xp(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  const h = v(), p = hs(h, e, n, o, r, i, s, a, l, c, u, d);
  if (p !== F) {
    const g = N(), y = ce();
    Ct(g, y, h, t, p, h[B], f, !1), ngDevMode && Ee(g.data, y, t, J() - 5, e, o, i, a, c, d);
  }
  return xp;
}
function Op(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p) {
  const g = v(), y = ps(g, e, n, o, r, i, s, a, l, c, u, d, f, h);
  if (y !== F) {
    const D = N(), m = ce();
    Ct(D, m, g, t, y, g[B], p, !1), ngDevMode && Ee(D.data, m, t, J() - 6, e, o, i, a, c, d, h);
  }
  return Op;
}
function Fp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y) {
  const D = v(), m = gs(D, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g);
  if (m !== F) {
    const I = N(), w = ce();
    Ct(I, w, D, t, m, D[B], y, !1), ngDevMode && Ee(I.data, w, t, J() - 7, e, o, i, a, c, d, h, g);
  }
  return Fp;
}
function Rp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D, m) {
  const I = v(), w = ms(I, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D);
  if (w !== F) {
    const M = N(), P = ce();
    Ct(M, P, I, t, w, I[B], m, !1), ngDevMode && Ee(M.data, P, t, J() - 8, e, o, i, a, c, d, h, g, D);
  }
  return Rp;
}
function kp(t, e, n) {
  const o = v(), r = ls(o, e);
  if (r !== F) {
    const i = N(), s = ce();
    if (Ct(i, s, o, t, r, o[B], n, !1), ngDevMode) {
      const a = [e[0]];
      for (let l = 2; l < e.length; l += 2)
        a.push(e[l]);
      Ee(i.data, s, t, J() - a.length + 1, ...a);
    }
  }
  return kp;
}
function $F() {
  return this._results[Symbol.iterator]();
}
class yu {
  /**
   * Returns `Observable` of `QueryList` notifying the subscriber of changes.
   */
  get changes() {
    return this._changes ?? (this._changes = new Et());
  }
  /**
   * @param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
   *     has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
   *     the same result)
   */
  constructor(e = !1) {
    this._emitDistinctChangesOnly = e, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
    const n = yu.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = $F);
  }
  /**
   * Returns the QueryList entry at `index`.
   */
  get(e) {
    return this._results[e];
  }
  /**
   * See
   * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
   */
  map(e) {
    return this._results.map(e);
  }
  filter(e) {
    return this._results.filter(e);
  }
  /**
   * See
   * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   */
  find(e) {
    return this._results.find(e);
  }
  /**
   * See
   * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
   */
  reduce(e, n) {
    return this._results.reduce(e, n);
  }
  /**
   * See
   * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
   */
  forEach(e) {
    this._results.forEach(e);
  }
  /**
   * See
   * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   */
  some(e) {
    return this._results.some(e);
  }
  /**
   * Returns a copy of the internal results list as an Array.
   */
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  /**
   * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
   * on change detection, it will not notify of changes to the queries, unless a new change
   * occurs.
   *
   * @param resultsTree The query results to store
   * @param identityAccessor Optional function for extracting stable object identity from a value
   *    in the array. This function is executed for each element of the query result list while
   *    comparing current query list with the new one (provided as a first argument of the `reset`
   *    function) to detect if the lists are different. If the function is not provided, elements
   *    are compared as is (without any pre-processing).
   */
  reset(e, n) {
    this.dirty = !1;
    const o = st(e);
    (this._changesDetected = !w1(this._results, o, n)) && (this._results = o, this.length = o.length, this.last = o[this.length - 1], this.first = o[0]);
  }
  /**
   * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
   */
  notifyOnChanges() {
    this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
  }
  /** internal */
  setDirty() {
    this.dirty = !0;
  }
  /** internal */
  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
  }
}
const Ng = class Ng {
};
Ng.__NG_ELEMENT_ID__ = HF;
let ke = Ng;
const BF = ke, jF = class extends BF {
  constructor(e, n, o) {
    super(), this._declarationLView = e, this._declarationTContainer = n, this.elementRef = o;
  }
  /**
   * Returns an `ssrId` associated with a TView, which was used to
   * create this instance of the `TemplateRef`.
   *
   * @internal
   */
  get ssrId() {
    var e;
    return ((e = this._declarationTContainer.tView) == null ? void 0 : e.ssrId) || null;
  }
  createEmbeddedView(e, n) {
    return this.createEmbeddedViewImpl(e, n);
  }
  /**
   * @internal
   */
  createEmbeddedViewImpl(e, n, o) {
    const r = Pa(this._declarationLView, this._declarationTContainer, e, { injector: n, dehydratedView: o });
    return new hi(r);
  }
};
function HF() {
  return vu(K(), v());
}
function vu(t, e) {
  return t.type & 4 ? (ngDevMode && S(t.tView, "TView must be allocated"), new jF(e, t, ns(t, e))) : null;
}
class Pp {
  constructor(e) {
    this.queryList = e, this.matches = null;
  }
  clone() {
    return new Pp(this.queryList);
  }
  setDirty() {
    this.queryList.setDirty();
  }
}
class Np {
  constructor(e = []) {
    this.queries = e;
  }
  createEmbeddedView(e) {
    const n = e.queries;
    if (n !== null) {
      const o = e.contentQueries !== null ? e.contentQueries[0] : n.length, r = [];
      for (let i = 0; i < o; i++) {
        const s = n.getByIndex(i), a = this.queries[s.indexInDeclarationView];
        r.push(a.clone());
      }
      return new Np(r);
    }
    return null;
  }
  insertView(e) {
    this.dirtyQueriesWithMatches(e);
  }
  detachView(e) {
    this.dirtyQueriesWithMatches(e);
  }
  dirtyQueriesWithMatches(e) {
    for (let n = 0; n < this.queries.length; n++)
      EI(e, n).matches !== null && this.queries[n].setDirty();
  }
}
class vI {
  constructor(e, n, o = null) {
    this.predicate = e, this.flags = n, this.read = o;
  }
}
class Lp {
  constructor(e = []) {
    this.queries = e;
  }
  elementStart(e, n) {
    ngDevMode && ct(e, "Queries should collect results on the first template pass only");
    for (let o = 0; o < this.queries.length; o++)
      this.queries[o].elementStart(e, n);
  }
  elementEnd(e) {
    for (let n = 0; n < this.queries.length; n++)
      this.queries[n].elementEnd(e);
  }
  embeddedTView(e) {
    let n = null;
    for (let o = 0; o < this.length; o++) {
      const r = n !== null ? n.length : 0, i = this.getByIndex(o).embeddedTView(e, r);
      i && (i.indexInDeclarationView = o, n !== null ? n.push(i) : n = [i]);
    }
    return n !== null ? new Lp(n) : null;
  }
  template(e, n) {
    ngDevMode && ct(e, "Queries should collect results on the first template pass only");
    for (let o = 0; o < this.queries.length; o++)
      this.queries[o].template(e, n);
  }
  getByIndex(e) {
    return ngDevMode && be(this.queries, e), this.queries[e];
  }
  get length() {
    return this.queries.length;
  }
  track(e) {
    this.queries.push(e);
  }
}
class $p {
  constructor(e, n = -1) {
    this.metadata = e, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n;
  }
  elementStart(e, n) {
    this.isApplyingToNode(n) && this.matchTNode(e, n);
  }
  elementEnd(e) {
    this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
  }
  template(e, n) {
    this.elementStart(e, n);
  }
  embeddedTView(e, n) {
    return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0, this.addMatch(-e.index, n), new $p(this.metadata)) : null;
  }
  isApplyingToNode(e) {
    if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
      const n = this._declarationNodeIndex;
      let o = e.parent;
      for (; o !== null && o.type & 8 && o.index !== n; )
        o = o.parent;
      return n === (o !== null ? o.index : -1);
    }
    return this._appliesToNextNode;
  }
  matchTNode(e, n) {
    const o = this.metadata.predicate;
    if (Array.isArray(o))
      for (let r = 0; r < o.length; r++) {
        const i = o[r];
        this.matchTNodeWithReadOption(e, n, VF(n, i)), this.matchTNodeWithReadOption(e, n, hl(n, e, i, !1, !1));
      }
    else
      o === ke ? n.type & 4 && this.matchTNodeWithReadOption(e, n, -1) : this.matchTNodeWithReadOption(e, n, hl(n, e, o, !1, !1));
  }
  matchTNodeWithReadOption(e, n, o) {
    if (o !== null) {
      const r = this.metadata.read;
      if (r !== null)
        if (r === Mt || r === Me || r === ke && n.type & 4)
          this.addMatch(n.index, -2);
        else {
          const i = hl(n, e, r, !1, !1);
          i !== null && this.addMatch(n.index, i);
        }
      else
        this.addMatch(n.index, o);
    }
  }
  addMatch(e, n) {
    this.matches === null ? this.matches = [e, n] : this.matches.push(e, n);
  }
}
function VF(t, e) {
  const n = t.localNames;
  if (n !== null) {
    for (let o = 0; o < n.length; o += 2)
      if (n[o] === e)
        return n[o + 1];
  }
  return null;
}
function UF(t, e) {
  return t.type & 11 ? ns(t, e) : t.type & 4 ? vu(t, e) : null;
}
function GF(t, e, n, o) {
  return n === -1 ? UF(e, t) : n === -2 ? WF(t, e, o) : zo(t, t[E], n, e);
}
function WF(t, e, n) {
  if (n === Mt)
    return ns(e, t);
  if (n === ke)
    return vu(e, t);
  if (n === Me)
    return ngDevMode && He(
      e,
      15
      /* TNodeType.AnyContainer */
    ), kb(e, t);
  ngDevMode && _(`Special token to read should be one of ElementRef, TemplateRef or ViewContainerRef but got ${Y(n)}.`);
}
function DI(t, e, n, o) {
  const r = e[St].queries[o];
  if (r.matches === null) {
    const i = t.data, s = n.matches, a = [];
    for (let l = 0; l < s.length; l += 2) {
      const c = s[l];
      if (c < 0)
        a.push(null);
      else {
        ngDevMode && be(i, c);
        const u = i[c];
        a.push(GF(e, u, s[l + 1], n.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function hf(t, e, n, o) {
  const r = t.queries.getByIndex(n), i = r.matches;
  if (i !== null) {
    const s = DI(t, e, r, n);
    for (let a = 0; a < i.length; a += 2) {
      const l = i[a];
      if (l > 0)
        o.push(s[a / 2]);
      else {
        const c = i[a + 1], u = e[-l];
        ngDevMode && lt(u);
        for (let d = ue; d < u.length; d++) {
          const f = u[d];
          f[va] === f[Ce] && hf(f[E], f, c, o);
        }
        if (u[Vo] !== null) {
          const d = u[Vo];
          for (let f = 0; f < d.length; f++) {
            const h = d[f];
            hf(h[E], h, c, o);
          }
        }
      }
    }
  }
  return o;
}
function zF(t, e) {
  return ngDevMode && S(t[St], "LQueries should be defined when trying to load a query"), ngDevMode && be(t[St].queries, e), t[St].queries[e].queryList;
}
function CI(t, e, n) {
  const o = new yu(
    (n & 4) === 4
    /* QueryFlags.emitDistinctChangesOnly */
  );
  lT(t, e, o, o.destroy), e[St] === null && (e[St] = new Np()), e[St].queries.push(new Pp(o));
}
function bI(t, e, n) {
  t.queries === null && (t.queries = new Lp()), t.queries.track(new $p(e, n));
}
function qF(t, e) {
  const n = t.contentQueries || (t.contentQueries = []), o = n.length ? n[n.length - 1] : -1;
  e !== o && n.push(t.queries.length - 1, e);
}
function EI(t, e) {
  return ngDevMode && S(t.queries, "TQueries must be defined to retrieve a TQuery"), t.queries.getByIndex(e);
}
function II(t, e, n, o) {
  ngDevMode && X(n, "Expecting flags");
  const r = N();
  if (r.firstCreatePass) {
    const i = K();
    bI(r, new vI(e, n, o), i.index), qF(r, t), (n & 2) === 2 && (r.staticContentQueries = !0);
  }
  CI(r, v(), n);
}
function SI(t, e, n) {
  ngDevMode && X(e, "Expecting flags");
  const o = N();
  o.firstCreatePass && (bI(o, new vI(t, e, n), -1), (e & 2) === 2 && (o.staticViewQueries = !0)), CI(o, v(), e);
}
function wI(t) {
  const e = v(), n = N(), o = eD();
  nh(o + 1);
  const r = EI(n, o);
  if (t.dirty && Ea(e) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null)
      t.reset([]);
    else {
      const i = r.crossesNgTemplate ? hf(n, e, o, []) : DI(n, e, r, o);
      t.reset(i, __), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function MI() {
  return zF(v(), eD());
}
function AI(t, e, n, o) {
  n >= t.data.length && (t.data[n] = null, t.blueprint[n] = null), e[n] = o;
}
function _I(t) {
  const e = XM();
  return Yi(e, T + t);
}
function TI(t, e, n) {
  const o = v(), r = cs(o, t, e, n);
  $t(r);
}
function xI(t, e, n, o, r) {
  const i = v(), s = us(i, t, e, n, o, r);
  $t(s);
}
function OI(t, e, n, o, r, i, s) {
  const a = v(), l = ds(a, t, e, n, o, r, i, s);
  $t(l);
}
function FI(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = fs(c, t, e, n, o, r, i, s, a, l);
  $t(u);
}
function RI(t, e, n, o, r, i, s, a, l, c, u) {
  const d = v(), f = hs(d, t, e, n, o, r, i, s, a, l, c, u);
  $t(f);
}
function kI(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  const h = v(), p = ps(h, t, e, n, o, r, i, s, a, l, c, u, d, f);
  $t(p);
}
function PI(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p) {
  const g = v(), y = gs(g, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p);
  $t(y);
}
function NI(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y) {
  const D = v(), m = ms(D, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y);
  $t(m);
}
function LI(t) {
  const e = v(), n = ls(e, t);
  $t(n);
}
function Bp(t, e, n, o, r) {
  const i = v(), s = cs(i, e, n, o);
  return Bt(t, s, r, !1), Bp;
}
function jp(t, e, n, o, r, i, s) {
  const a = v(), l = us(a, e, n, o, r, i);
  return Bt(t, l, s, !1), jp;
}
function Hp(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = ds(c, e, n, o, r, i, s, a);
  return Bt(t, u, l, !1), Hp;
}
function Vp(t, e, n, o, r, i, s, a, l, c, u) {
  const d = v(), f = fs(d, e, n, o, r, i, s, a, l, c);
  return Bt(t, f, u, !1), Vp;
}
function Up(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  const h = v(), p = hs(h, e, n, o, r, i, s, a, l, c, u, d);
  return Bt(t, p, f, !1), Up;
}
function Gp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p) {
  const g = v(), y = ps(g, e, n, o, r, i, s, a, l, c, u, d, f, h);
  return Bt(t, y, p, !1), Gp;
}
function Wp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y) {
  const D = v(), m = gs(D, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g);
  return Bt(t, m, y, !1), Wp;
}
function zp(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D, m) {
  const I = v(), w = ms(I, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y, D);
  return Bt(t, w, m, !1), zp;
}
function qp(t, e, n) {
  const o = v(), r = ls(o, e);
  return Bt(t, r, n, !1), qp;
}
function $I(t, e = "") {
  const n = v(), o = N(), r = t + T;
  ngDevMode && x(J(), o.bindingStartIndex, "text nodes should be created before any bindings"), ngDevMode && be(n, r);
  const i = o.firstCreatePass ? os(o, r, 1, e, null) : o.data[r], s = BI(o, n, i, e, t);
  n[r] = s, Mc() && Uc(o, n, s, i), tn(i, !1);
}
let BI = (t, e, n, o, r) => (to(!0), Bc(e[B], o));
function YF(t, e, n, o, r) {
  const i = e[Pt], s = !i || Zi() || Yc(i, r);
  if (to(s), s)
    return Bc(e[B], o);
  const a = eu(i, t, e, n);
  return ngDevMode && Ra(a, Node.TEXT_NODE, null, e, n), ngDevMode && ts(a), a;
}
function ZF() {
  BI = YF;
}
function Yp(t) {
  return Du("", t, ""), Yp;
}
function Du(t, e, n) {
  const o = v(), r = cs(o, t, e, n);
  return r !== F && _n(o, We(), r), Du;
}
function Zp(t, e, n, o, r) {
  const i = v(), s = us(i, t, e, n, o, r);
  return s !== F && _n(i, We(), s), Zp;
}
function Qp(t, e, n, o, r, i, s) {
  const a = v(), l = ds(a, t, e, n, o, r, i, s);
  return l !== F && _n(a, We(), l), Qp;
}
function Kp(t, e, n, o, r, i, s, a, l) {
  const c = v(), u = fs(c, t, e, n, o, r, i, s, a, l);
  return u !== F && _n(c, We(), u), Kp;
}
function Xp(t, e, n, o, r, i, s, a, l, c, u) {
  const d = v(), f = hs(d, t, e, n, o, r, i, s, a, l, c, u);
  return f !== F && _n(d, We(), f), Xp;
}
function Jp(t, e, n, o, r, i, s, a, l, c, u, d, f) {
  const h = v(), p = ps(h, t, e, n, o, r, i, s, a, l, c, u, d, f);
  return p !== F && _n(h, We(), p), Jp;
}
function eg(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p) {
  const g = v(), y = gs(g, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p);
  return y !== F && _n(g, We(), y), eg;
}
function tg(t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y) {
  const D = v(), m = ms(D, t, e, n, o, r, i, s, a, l, c, u, d, f, h, p, g, y);
  return m !== F && _n(D, We(), m), tg;
}
function ng(t) {
  const e = v(), n = ls(e, t);
  return n !== F && _n(e, We(), n), ng;
}
function QF(t, e, n) {
  const o = N();
  if (o.firstCreatePass) {
    const r = wt(t);
    pf(n, o.data, o.blueprint, r, !0), pf(e, o.data, o.blueprint, r, !1);
  }
}
function pf(t, e, n, o, r) {
  if (t = k(t), Array.isArray(t))
    for (let i = 0; i < t.length; i++)
      pf(t[i], e, n, o, r);
  else {
    const i = N(), s = v(), a = K();
    let l = Yo(t) ? t : k(t.provide);
    const c = LD(t);
    if (ngDevMode) {
      const h = new fe(a, s);
      Ms(h, l, () => {
        yd(t, r);
      });
    }
    const u = a.providerIndexes & 1048575, d = a.directiveStart, f = a.providerIndexes >> 20;
    if (Yo(t) || !t.multi) {
      const h = new Ia(c, r, pr), p = Zu(l, e, r ? u : u + f, d);
      p === -1 ? (Ad(Rl(a, s), i, l), Yu(i, t, e.length), e.push(l), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), n.push(h), s.push(h)) : (n[p] = h, s[p] = h);
    } else {
      const h = Zu(l, e, u + f, d), p = Zu(l, e, u, u + f), g = h >= 0 && n[h], y = p >= 0 && n[p];
      if (r && !y || !r && !g) {
        Ad(Rl(a, s), i, l);
        const D = JF(r ? XF : KF, n.length, r, o, c);
        !r && y && (n[p].providerFactory = D), Yu(i, t, e.length, 0), e.push(l), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), n.push(D), s.push(D);
      } else {
        const D = jI(n[r ? p : h], c, !r && o);
        Yu(i, t, h > -1 ? h : p, D);
      }
      !r && o && y && n[p].componentProviders++;
    }
  }
}
function Yu(t, e, n, o) {
  const r = Yo(e), i = j1(e);
  if (r || i) {
    const l = (i ? k(e.useClass) : e).prototype.ngOnDestroy;
    if (l) {
      const c = t.destroyHooks || (t.destroyHooks = []);
      if (!r && e.multi) {
        ngDevMode && S(o, "indexInFactory when registering multi factory destroy hook");
        const u = c.indexOf(n);
        u === -1 ? c.push(n, [o, l]) : c[u + 1].push(o, l);
      } else
        c.push(n, l);
    }
  }
}
function jI(t, e, n) {
  return n && t.componentProviders++, t.multi.push(e) - 1;
}
function Zu(t, e, n, o) {
  for (let r = n; r < o; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function KF(t, e, n, o) {
  return gf(this.multi, []);
}
function XF(t, e, n, o) {
  const r = this.multi;
  let i;
  if (this.providerFactory) {
    const s = this.providerFactory.componentProviders, a = zo(n, n[E], this.providerFactory.index, o);
    i = a.slice(0, s), gf(r, i);
    for (let l = s; l < a.length; l++)
      i.push(a[l]);
  } else
    i = [], gf(r, i);
  return i;
}
function gf(t, e) {
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    e.push(o());
  }
  return e;
}
function JF(t, e, n, o, r) {
  const i = new Ia(t, n, pr);
  return i.multi = [], i.index = e, i.componentProviders = 0, jI(i, r, o && !n), i;
}
function HI(t, e = []) {
  return (n) => {
    n.providersResolver = (o, r) => QF(
      o,
      //
      r ? r(t) : t,
      //
      e
    );
  };
}
class Wn {
}
class VI {
}
function og(t, e) {
  return new Cu(t, e ?? null, []);
}
const eR = og;
class Cu extends Wn {
  constructor(e, n, o) {
    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Db(this);
    const r = yt(e);
    ngDevMode && S(r, `NgModule '${Y(e)}' is not a subtype of 'NgModuleType'.`), this._bootstrapComponents = qt(r.bootstrap), this._r3Injector = $D(e, n, [
      { provide: Wn, useValue: this },
      {
        provide: Jo,
        useValue: this.componentFactoryResolver
      },
      ...o
    ], Y(e), /* @__PURE__ */ new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(e);
  }
  get injector() {
    return this._r3Injector;
  }
  destroy() {
    ngDevMode && S(this.destroyCbs, "NgModule already destroyed");
    const e = this._r3Injector;
    !e.destroyed && e.destroy(), this.destroyCbs.forEach((n) => n()), this.destroyCbs = null;
  }
  onDestroy(e) {
    ngDevMode && S(this.destroyCbs, "NgModule already destroyed"), this.destroyCbs.push(e);
  }
}
class bu extends VI {
  constructor(e) {
    super(), this.moduleType = e;
  }
  create(e) {
    return new Cu(this.moduleType, e, []);
  }
}
function tR(t, e, n) {
  return new Cu(t, e, n);
}
class UI extends Wn {
  constructor(e) {
    super(), this.componentFactoryResolver = new Db(this), this.instance = null;
    const n = new Ji([
      ...e.providers,
      { provide: Wn, useValue: this },
      { provide: Jo, useValue: this.componentFactoryResolver }
    ], e.parent || kc(), e.debugName, /* @__PURE__ */ new Set(["environment"]));
    this.injector = n, e.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
}
function GI(t, e, n = null) {
  return new UI({ providers: t, parent: e, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
const Gs = class Gs {
  constructor(e) {
    this._injector = e, this.cachedInjectors = /* @__PURE__ */ new Map();
  }
  getOrCreateStandaloneInjector(e) {
    if (!e.standalone)
      return null;
    if (!this.cachedInjectors.has(e)) {
      const n = FD(!1, e.type), o = n.length > 0 ? GI([n], this._injector, `Standalone[${e.type.name}]`) : null;
      this.cachedInjectors.set(e, o);
    }
    return this.cachedInjectors.get(e);
  }
  ngOnDestroy() {
    try {
      for (const e of this.cachedInjectors.values())
        e !== null && e.destroy();
    } finally {
      this.cachedInjectors.clear();
    }
  }
};
Gs.ɵprov = oe({
  token: Gs,
  providedIn: "environment",
  factory: () => new Gs(Re(on))
});
let mf = Gs;
function WI(t) {
  Tn("NgStandalone"), t.getStandaloneInjector = (e) => e.get(mf).getOrCreateStandaloneInjector(t);
}
function zI(t, e, n) {
  const o = t.ɵcmp;
  o.directiveDefs = _l(
    e,
    /* pipeDef */
    !1
  ), o.pipeDefs = _l(
    n,
    /* pipeDef */
    !0
  );
}
function qI(t, e) {
  return sn(() => {
    const n = yt(t, !0);
    n.declarations = Xa(e.declarations || q), n.imports = Xa(e.imports || q), n.exports = Xa(e.exports || q), e.bootstrap && (n.bootstrap = Xa(e.bootstrap)), Zo.registerNgModule(t, e);
  });
}
function Xa(t) {
  if (typeof t == "function")
    return t;
  const e = st(t);
  return e.some(Cc) ? () => e.map(k).map(oy) : e.map(oy);
}
function oy(t) {
  return ph(t) ? t.ngModule : t;
}
function yf(t) {
  ngDevMode && rg(t);
  const e = at(t);
  if (e === null)
    return null;
  if (e.component === void 0) {
    const n = e.lView;
    if (n === null)
      return null;
    e.component = wA(e.nodeIndex, n);
  }
  return e.component;
}
function YI(t) {
  rg(t);
  const e = at(t), n = e ? e.lView : null;
  return n === null ? null : n[re];
}
function ZI(t) {
  const e = at(t);
  let n = e ? e.lView : null;
  if (n === null)
    return null;
  let o;
  for (; n[E].type === 2 && (o = Go(n)); )
    n = o;
  return n[O] & 512 ? null : n[re];
}
function QI(t) {
  const e = eC(t);
  return e !== null ? [z_(e)] : [];
}
function KI(t) {
  const e = at(t), n = e ? e.lView : null;
  if (n === null)
    return Ve.NULL;
  const o = n[E].data[e.nodeIndex];
  return new fe(o, n);
}
function nR(t) {
  const e = at(t), n = e ? e.lView : null;
  if (n === null)
    return [];
  const o = n[E], r = o.data[e.nodeIndex], i = [], s = r.providerIndexes & 1048575, a = r.directiveEnd;
  for (let l = s; l < a; l++) {
    let c = o.data[l];
    sR(c) && (c = c.type), i.push(c);
  }
  return i;
}
function XI(t) {
  if (t instanceof Text)
    return [];
  const e = at(t), n = e ? e.lView : null;
  if (n === null)
    return [];
  const o = n[E], r = e.nodeIndex;
  return o != null && o.data[r] ? (e.directives === void 0 && (e.directives = oC(r, n)), e.directives === null ? [] : [...e.directives]) : [];
}
function oR(t) {
  const { constructor: e } = t;
  if (!e)
    throw new Error("Unable to find the instance constructor");
  const n = H(e);
  if (n)
    return {
      inputs: ry(n.inputs),
      outputs: n.outputs,
      encapsulation: n.encapsulation,
      changeDetection: n.onPush ? Bn.OnPush : Bn.Default
    };
  const o = Fe(e);
  return o ? { inputs: ry(o.inputs), outputs: o.outputs } : null;
}
function rR(t) {
  const e = at(t);
  if (e === null)
    return {};
  if (e.localRefs === void 0) {
    const n = e.lView;
    if (n === null)
      return {};
    e.localRefs = MA(n, e.nodeIndex);
  }
  return e.localRefs || {};
}
function JI(t) {
  return at(t).native;
}
function eS(t) {
  ngDevMode && rg(t);
  const e = at(t), n = e === null ? null : e.lView;
  if (n === null)
    return [];
  const o = n[E], r = n[si], i = o.cleanup, s = [];
  if (i && r)
    for (let a = 0; a < i.length; ) {
      const l = i[a++], c = i[a++];
      if (typeof l == "string") {
        const u = l, d = se(n[c]), f = r[i[a++]], h = i[a++], p = typeof h == "boolean" || h >= 0 ? "dom" : "output", g = typeof h == "boolean" ? h : !1;
        t == d && s.push({ element: t, name: u, callback: f, useCapture: g, type: p });
      }
    }
  return s.sort(iR), s;
}
function iR(t, e) {
  return t.name == e.name ? 0 : t.name < e.name ? -1 : 1;
}
function sR(t) {
  return t.type !== void 0 && t.declaredInputs !== void 0 && t.findHostDirectiveDefs !== void 0;
}
function rg(t) {
  if (typeof Element < "u" && !(t instanceof Element))
    throw new Error("Expecting instance of DOM Element");
}
function ry(t) {
  const e = {};
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n];
    if (o === void 0)
      continue;
    let r;
    Array.isArray(o) ? r = o[0] : r = o, e[n] = r;
  }
  return e;
}
const ml = "__ngAsyncComponentMetadataFn__";
function aR(t) {
  return t[ml] ?? null;
}
function lR(t, e, n) {
  const o = t;
  return o[ml] = () => Promise.all(e()).then((r) => (n(...r), o[ml] = null, r)), o[ml];
}
function ot(t, e, n, o) {
  return sn(() => {
    const r = t;
    e !== null && (r.hasOwnProperty("decorators") && r.decorators !== void 0 ? r.decorators.push(...e) : r.decorators = e), n !== null && (r.ctorParameters = n), o !== null && (r.hasOwnProperty("propDecorators") && r.propDecorators !== void 0 ? r.propDecorators = { ...r.propDecorators, ...o } : r.propDecorators = o);
  });
}
function tS(t, e, n) {
  const o = nt() + t, r = v();
  return r[o] === F ? dn(r, o, n ? e.call(n) : e()) : La(r, o);
}
function nS(t, e, n, o) {
  return dS(v(), nt(), t, e, n, o);
}
function oS(t, e, n, o, r) {
  return fS(v(), nt(), t, e, n, o, r);
}
function rS(t, e, n, o, r, i) {
  return hS(v(), nt(), t, e, n, o, r, i);
}
function iS(t, e, n, o, r, i, s) {
  return pS(v(), nt(), t, e, n, o, r, i, s);
}
function sS(t, e, n, o, r, i, s, a) {
  const l = nt() + t, c = v(), u = At(c, l, n, o, r, i);
  return Ae(c, l + 4, s) || u ? dn(c, l + 5, a ? e.call(a, n, o, r, i, s) : e(n, o, r, i, s)) : La(c, l + 5);
}
function aS(t, e, n, o, r, i, s, a, l) {
  const c = nt() + t, u = v(), d = At(u, c, n, o, r, i);
  return or(u, c + 4, s, a) || d ? dn(u, c + 6, l ? e.call(l, n, o, r, i, s, a) : e(n, o, r, i, s, a)) : La(u, c + 6);
}
function lS(t, e, n, o, r, i, s, a, l, c) {
  const u = nt() + t, d = v();
  let f = At(d, u, n, o, r, i);
  return nu(d, u + 4, s, a, l) || f ? dn(d, u + 7, c ? e.call(c, n, o, r, i, s, a, l) : e(n, o, r, i, s, a, l)) : La(d, u + 7);
}
function cS(t, e, n, o, r, i, s, a, l, c, u) {
  const d = nt() + t, f = v(), h = At(f, d, n, o, r, i);
  return At(f, d + 4, s, a, l, c) || h ? dn(f, d + 8, u ? e.call(u, n, o, r, i, s, a, l, c) : e(n, o, r, i, s, a, l, c)) : La(f, d + 8);
}
function uS(t, e, n, o) {
  return gS(v(), nt(), t, e, n, o);
}
function ja(t, e) {
  ngDevMode && be(t, e);
  const n = t[e];
  return n === F ? void 0 : n;
}
function dS(t, e, n, o, r, i) {
  const s = e + n;
  return Ae(t, s, r) ? dn(t, s + 1, i ? o.call(i, r) : o(r)) : ja(t, s + 1);
}
function fS(t, e, n, o, r, i, s) {
  const a = e + n;
  return or(t, a, r, i) ? dn(t, a + 2, s ? o.call(s, r, i) : o(r, i)) : ja(t, a + 2);
}
function hS(t, e, n, o, r, i, s, a) {
  const l = e + n;
  return nu(t, l, r, i, s) ? dn(t, l + 3, a ? o.call(a, r, i, s) : o(r, i, s)) : ja(t, l + 3);
}
function pS(t, e, n, o, r, i, s, a, l) {
  const c = e + n;
  return At(t, c, r, i, s, a) ? dn(t, c + 4, l ? o.call(l, r, i, s, a) : o(r, i, s, a)) : ja(t, c + 4);
}
function gS(t, e, n, o, r, i) {
  let s = e + n, a = !1;
  for (let l = 0; l < r.length; l++)
    Ae(t, s++, r[l]) && (a = !0);
  return a ? dn(t, s, o.apply(i, r)) : ja(t, s);
}
function mS(t, e) {
  const n = N();
  let o;
  const r = t + T;
  n.firstCreatePass ? (o = cR(e, n.pipeRegistry), n.data[r] = o, o.onDestroy && (n.destroyHooks ?? (n.destroyHooks = [])).push(r, o.onDestroy)) : o = n.data[r];
  const i = o.factory || (o.factory = Uo(o.type, !0));
  let s;
  ngDevMode && (s = Qe({
    injector: new fe(K(), v()),
    token: o.type
  }));
  const a = it(pr);
  try {
    const l = Fl(!1), c = i();
    return Fl(l), AI(n, v(), r, c), c;
  } finally {
    it(a), ngDevMode && Qe(s);
  }
}
function cR(t, e) {
  if (e) {
    ngDevMode && e.filter((o) => o.name === t).length > 1 && console.warn(ve(313, uR(t)));
    for (let n = e.length - 1; n >= 0; n--) {
      const o = e[n];
      if (t === o.name)
        return o;
    }
  }
  if (ngDevMode)
    throw new b(-302, dR(t));
}
function uR(t) {
  const e = v(), o = e[ge][re], r = Lc(e), i = o ? ` in the '${o.constructor.name}' component` : "";
  return `Multiple pipes match the name \`${t}\`${i}. ${`check ${r ? "'@Component.imports' of this component" : "the imports of this module"}`}`;
}
function dR(t) {
  const e = v(), o = e[ge][re], r = Lc(e), i = o ? ` in the '${o.constructor.name}' component` : "";
  return `The pipe '${t}' could not be found${i}. ${`Verify that it is ${r ? "included in the '@Component.imports' of this component" : "declared or imported in this module"}`}`;
}
function yS(t, e, n) {
  const o = t + T, r = v(), i = Yi(r, o);
  return Ha(r, o) ? dS(r, nt(), e, i.transform, n, i) : i.transform(n);
}
function vS(t, e, n, o) {
  const r = t + T, i = v(), s = Yi(i, r);
  return Ha(i, r) ? fS(i, nt(), e, s.transform, n, o, s) : s.transform(n, o);
}
function DS(t, e, n, o, r) {
  const i = t + T, s = v(), a = Yi(s, i);
  return Ha(s, i) ? hS(s, nt(), e, a.transform, n, o, r, a) : a.transform(n, o, r);
}
function CS(t, e, n, o, r, i) {
  const s = t + T, a = v(), l = Yi(a, s);
  return Ha(a, s) ? pS(a, nt(), e, l.transform, n, o, r, i, l) : l.transform(n, o, r, i);
}
function bS(t, e, n) {
  const o = t + T, r = v(), i = Yi(r, o);
  return Ha(r, o) ? gS(r, nt(), e, i.transform, n, i) : i.transform.apply(i, n);
}
function Ha(t, e) {
  return t[E].data[e].pure;
}
function ES(t, e) {
  return vu(t, e);
}
function IS(t, e) {
  return () => {
    try {
      return Zo.getComponentDependencies(t, e).dependencies;
    } catch (n) {
      throw console.error(`Computing dependencies in local compilation mode for the component "${t.name}" failed with the exception:`, n), n;
    }
  };
}
function SS(t, e) {
  const n = H(t);
  n !== null && (n.debugInfo = e);
}
const Xe = {
  ɵɵattribute: np,
  ɵɵattributeInterpolate1: op,
  ɵɵattributeInterpolate2: rp,
  ɵɵattributeInterpolate3: ip,
  ɵɵattributeInterpolate4: sp,
  ɵɵattributeInterpolate5: ap,
  ɵɵattributeInterpolate6: lp,
  ɵɵattributeInterpolate7: cp,
  ɵɵattributeInterpolate8: up,
  ɵɵattributeInterpolateV: dp,
  ɵɵdefineComponent: bv,
  ɵɵdefineDirective: Ev,
  ɵɵdefineInjectable: oe,
  ɵɵdefineInjector: Ic,
  ɵɵdefineNgModule: Uf,
  ɵɵdefinePipe: Iv,
  ɵɵdirectiveInject: pr,
  ɵɵgetInheritedFactory: DD,
  ɵɵinject: Re,
  ɵɵinjectAttribute: sh,
  ɵɵinvalidFactory: JC,
  ɵɵinvalidFactoryDep: Vf,
  ɵɵtemplateRefExtractor: ES,
  ɵɵresetView: Qv,
  ɵɵHostDirectivesFeature: Sb,
  ɵɵNgOnChangesFeature: Zf,
  ɵɵProvidersFeature: HI,
  ɵɵCopyDefinitionFeature: Ib,
  ɵɵInheritDefinitionFeature: Kh,
  ɵɵInputTransformsFeature: Mb,
  ɵɵStandaloneFeature: WI,
  ɵɵnextContext: gI,
  ɵɵnamespaceHTML: lD,
  ɵɵnamespaceMathML: aD,
  ɵɵnamespaceSVG: sD,
  ɵɵenableBindings: qv,
  ɵɵdisableBindings: Yv,
  ɵɵelementStart: su,
  ɵɵelementEnd: au,
  ɵɵelement: gp,
  ɵɵelementContainerStart: lu,
  ɵɵelementContainerEnd: cu,
  ɵɵelementContainer: mp,
  ɵɵpureFunction0: tS,
  ɵɵpureFunction1: nS,
  ɵɵpureFunction2: oS,
  ɵɵpureFunction3: rS,
  ɵɵpureFunction4: iS,
  ɵɵpureFunction5: sS,
  ɵɵpureFunction6: aS,
  ɵɵpureFunction7: lS,
  ɵɵpureFunction8: cS,
  ɵɵpureFunctionV: uS,
  ɵɵgetCurrentView: qE,
  ɵɵrestoreView: Zv,
  ɵɵlistener: Sp,
  ɵɵprojection: yI,
  ɵɵsyntheticHostProperty: vp,
  ɵɵsyntheticHostListener: wp,
  ɵɵpipeBind1: yS,
  ɵɵpipeBind2: vS,
  ɵɵpipeBind3: DS,
  ɵɵpipeBind4: CS,
  ɵɵpipeBindV: bS,
  ɵɵprojectionDef: mI,
  ɵɵhostProperty: yp,
  ɵɵproperty: fp,
  ɵɵpropertyInterpolate: Mp,
  ɵɵpropertyInterpolate1: mu,
  ɵɵpropertyInterpolate2: Ap,
  ɵɵpropertyInterpolate3: _p,
  ɵɵpropertyInterpolate4: Tp,
  ɵɵpropertyInterpolate5: xp,
  ɵɵpropertyInterpolate6: Op,
  ɵɵpropertyInterpolate7: Fp,
  ɵɵpropertyInterpolate8: Rp,
  ɵɵpropertyInterpolateV: kp,
  ɵɵpipe: mS,
  ɵɵqueryRefresh: wI,
  ɵɵviewQuery: SI,
  ɵɵloadQuery: MI,
  ɵɵcontentQuery: II,
  ɵɵreference: _I,
  ɵɵclassMap: SE,
  ɵɵclassMapInterpolate1: xE,
  ɵɵclassMapInterpolate2: OE,
  ɵɵclassMapInterpolate3: FE,
  ɵɵclassMapInterpolate4: RE,
  ɵɵclassMapInterpolate5: kE,
  ɵɵclassMapInterpolate6: PE,
  ɵɵclassMapInterpolate7: NE,
  ɵɵclassMapInterpolate8: LE,
  ɵɵclassMapInterpolateV: $E,
  ɵɵstyleMap: $t,
  ɵɵstyleMapInterpolate1: TI,
  ɵɵstyleMapInterpolate2: xI,
  ɵɵstyleMapInterpolate3: OI,
  ɵɵstyleMapInterpolate4: FI,
  ɵɵstyleMapInterpolate5: RI,
  ɵɵstyleMapInterpolate6: kI,
  ɵɵstyleMapInterpolate7: PI,
  ɵɵstyleMapInterpolate8: NI,
  ɵɵstyleMapInterpolateV: LI,
  ɵɵstyleProp: hp,
  ɵɵstylePropInterpolate1: Bp,
  ɵɵstylePropInterpolate2: jp,
  ɵɵstylePropInterpolate3: Hp,
  ɵɵstylePropInterpolate4: Vp,
  ɵɵstylePropInterpolate5: Up,
  ɵɵstylePropInterpolate6: Gp,
  ɵɵstylePropInterpolate7: Wp,
  ɵɵstylePropInterpolate8: zp,
  ɵɵstylePropInterpolateV: qp,
  ɵɵclassProp: pp,
  ɵɵadvance: KC,
  ɵɵtemplate: mi,
  ɵɵconditional: jE,
  ɵɵdefer: tE,
  ɵɵdeferWhen: nE,
  ɵɵdeferOnIdle: rE,
  ɵɵdeferOnImmediate: sE,
  ɵɵdeferOnTimer: lE,
  ɵɵdeferOnHover: uE,
  ɵɵdeferOnInteraction: fE,
  ɵɵdeferOnViewport: pE,
  ɵɵdeferPrefetchWhen: oE,
  ɵɵdeferPrefetchOnIdle: iE,
  ɵɵdeferPrefetchOnImmediate: aE,
  ɵɵdeferPrefetchOnTimer: cE,
  ɵɵdeferPrefetchOnHover: dE,
  ɵɵdeferPrefetchOnInteraction: hE,
  ɵɵdeferPrefetchOnViewport: gE,
  ɵɵdeferEnableTimerScheduling: eE,
  ɵɵrepeater: GE,
  ɵɵrepeaterCreate: UE,
  ɵɵrepeaterTrackByIndex: HE,
  ɵɵrepeaterTrackByIdentity: VE,
  ɵɵcomponentInstance: BE,
  ɵɵtext: $I,
  ɵɵtextInterpolate: Yp,
  ɵɵtextInterpolate1: Du,
  ɵɵtextInterpolate2: Zp,
  ɵɵtextInterpolate3: Qp,
  ɵɵtextInterpolate4: Kp,
  ɵɵtextInterpolate5: Xp,
  ɵɵtextInterpolate6: Jp,
  ɵɵtextInterpolate7: eg,
  ɵɵtextInterpolate8: tg,
  ɵɵtextInterpolateV: ng,
  ɵɵi18n: uI,
  ɵɵi18nAttributes: dI,
  ɵɵi18nExp: Ip,
  ɵɵi18nStart: bp,
  ɵɵi18nEnd: Ep,
  ɵɵi18nApply: fI,
  ɵɵi18nPostprocess: hI,
  ɵɵresolveWindow: HD,
  ɵɵresolveDocument: VD,
  ɵɵresolveBody: yh,
  ɵɵsetComponentScope: zI,
  ɵɵsetNgModuleScope: qI,
  ɵɵregisterNgModuleType: vh,
  ɵɵgetComponentDepsFactory: IS,
  ɵsetClassDebugInfo: SS,
  ɵɵsanitizeHtml: MC,
  ɵɵsanitizeStyle: AC,
  ɵɵsanitizeResourceUrl: Th,
  ɵɵsanitizeScript: _C,
  ɵɵsanitizeUrl: _h,
  ɵɵsanitizeUrlOrResourceUrl: OC,
  ɵɵtrustConstantHtml: TC,
  ɵɵtrustConstantResourceUrl: xC,
  ɵɵvalidateIframeAttribute: vC,
  forwardRef: Dc,
  resolveForwardRef: k,
  ɵɵInputFlags: En
};
let wr = null;
function fR(t) {
  if (wr !== null) {
    if (t.defaultEncapsulation !== wr.defaultEncapsulation) {
      ngDevMode && console.error("Provided value for `defaultEncapsulation` can not be changed once it has been set.");
      return;
    }
    if (t.preserveWhitespaces !== wr.preserveWhitespaces) {
      ngDevMode && console.error("Provided value for `preserveWhitespaces` can not be changed once it has been set.");
      return;
    }
  }
  wr = t;
}
function hR() {
  return wr;
}
function pR() {
  wr = null;
}
const Ls = [];
function gR(t, e) {
  Ls.push({ moduleType: t, ngModule: e });
}
let Qu = !1;
function wS() {
  if (!Qu) {
    Qu = !0;
    try {
      for (let t = Ls.length - 1; t >= 0; t--) {
        const { moduleType: e, ngModule: n } = Ls[t];
        n.declarations && n.declarations.every(MS) && (Ls.splice(t, 1), vR(e, n));
      }
    } finally {
      Qu = !1;
    }
  }
}
function MS(t) {
  return Array.isArray(t) ? t.every(MS) : !!k(t);
}
function AS(t, e = {}) {
  _S(t, e), e.id !== void 0 && vh(t, e.id), gR(t, e);
}
function _S(t, e, n = !1) {
  ngDevMode && S(t, "Required value moduleType"), ngDevMode && S(e, "Required value ngModule");
  const o = st(e.declarations || q);
  let r = null;
  Object.defineProperty(t, Nf, {
    configurable: !0,
    get: () => {
      if (r === null) {
        if (ngDevMode && e.imports && e.imports.indexOf(t) > -1)
          throw new Error(`'${G(t)}' module can't import itself`);
        r = Te({ usage: 0, kind: "NgModule", type: t }).compileNgModule(Xe, `ng:///${t.name}/ɵmod.js`, {
          type: t,
          bootstrap: st(e.bootstrap || q).map(k),
          declarations: o.map(k),
          imports: st(e.imports || q).map(k).map(sy),
          exports: st(e.exports || q).map(k).map(sy),
          schemas: e.schemas ? st(e.schemas) : null,
          id: e.id || null
        }), r.schemas || (r.schemas = []);
      }
      return r;
    }
  });
  let i = null;
  Object.defineProperty(t, bn, {
    get: () => {
      if (i === null) {
        const a = Te({ usage: 0, kind: "NgModule", type: t });
        i = a.compileFactory(Xe, `ng:///${t.name}/ɵfac.js`, {
          name: t.name,
          type: t,
          deps: xc(t),
          target: a.FactoryTarget.NgModule,
          typeArgumentCount: 0
        });
      }
      return i;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
  let s = null;
  Object.defineProperty(t, Sl, {
    get: () => {
      if (s === null) {
        ngDevMode && Zl(t, n);
        const a = {
          name: t.name,
          type: t,
          providers: e.providers || q,
          imports: [
            (e.imports || q).map(k),
            (e.exports || q).map(k)
          ]
        };
        s = Te({ usage: 0, kind: "NgModule", type: t }).compileInjector(Xe, `ng:///${t.name}/ɵinj.js`, a);
      }
      return s;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function TS(t, e) {
  const n = `Unexpected "${G(t)}" found in the "declarations" array of the`, o = `"${G(t)}" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`;
  return `${n} ${e}, ${o}`;
}
function Zl(t, e, n) {
  if (vf.get(t) || Nn(t))
    return;
  vf.set(t, !0), t = k(t);
  let o;
  if (n) {
    if (o = yt(t), !o)
      throw new Error(`Unexpected value '${t.name}' imported by the module '${n.name}'. Please add an @NgModule annotation.`);
  } else
    o = yt(t, !0);
  const r = [], i = qt(o.declarations), s = qt(o.imports);
  st(s).map(iy).forEach((m) => {
    D(m, t), Zl(m, !1, t);
  });
  const a = qt(o.exports);
  i.forEach(u), i.forEach(d), i.forEach((m) => f(m, t));
  const l = [
    ...i.map(k),
    ...st(s.map(xS)).map(k)
  ];
  a.forEach(h), i.forEach((m) => p(m, e));
  const c = mR(t, "NgModule");
  if (c && (c.imports && st(c.imports).map(iy).forEach((m) => {
    D(m, t), Zl(m, !1, t);
  }), c.bootstrap && li(c.bootstrap, y), c.bootstrap && li(c.bootstrap, g)), r.length)
    throw new Error(r.join(`
`));
  function u(m) {
    m = k(m), H(m) || Fe(m) || gt(m) || r.push(`Unexpected value '${G(m)}' declared by the module '${G(t)}'. Please add a @Pipe/@Directive/@Component annotation.`);
  }
  function d(m) {
    m = k(m);
    const I = Fe(m);
    !H(m) && I && I.selectors.length == 0 && r.push(`Directive ${G(m)} has no selector, please add it!`);
  }
  function f(m, I) {
    m = k(m);
    const w = H(m) || Fe(m) || gt(m);
    if (w != null && w.standalone) {
      const M = `"${G(I)}" NgModule`;
      r.push(TS(m, M));
    }
  }
  function h(m) {
    m = k(m);
    const I = H(m) && "component" || Fe(m) && "directive" || gt(m) && "pipe";
    I && l.lastIndexOf(m) === -1 && r.push(`Can't export ${I} ${G(m)} from ${G(t)} as it was neither declared nor imported!`);
  }
  function p(m, I) {
    m = k(m);
    const w = yl.get(m);
    if (w && w !== t) {
      if (!I) {
        const M = [w, t].map(G).sort();
        r.push(`Type ${G(m)} is part of the declarations of 2 modules: ${M[0]} and ${M[1]}! Please consider moving ${G(m)} to a higher module that imports ${M[0]} and ${M[1]}. You can also create a new NgModule that exports and includes ${G(m)} then import that NgModule in ${M[0]} and ${M[1]}.`);
      }
    } else
      yl.set(m, t);
  }
  function g(m) {
    m = k(m), !yl.get(m) && !Nn(m) && r.push(`Component ${G(m)} is not part of any NgModule or the module has not been imported into your module.`);
  }
  function y(m) {
    m = k(m), H(m) || r.push(`${G(m)} cannot be used as an entry component.`), Nn(m) && r.push(`The \`${G(m)}\` class is a standalone component, which can not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` function for bootstrap instead.`);
  }
  function D(m, I) {
    m = k(m);
    const w = H(m) || Fe(m);
    if (w !== null && !w.standalone)
      throw new Error(`Unexpected directive '${m.name}' imported by the module '${I.name}'. Please add an @NgModule annotation.`);
    const M = gt(m);
    if (M !== null && !M.standalone)
      throw new Error(`Unexpected pipe '${m.name}' imported by the module '${I.name}'. Please add an @NgModule annotation.`);
  }
}
function iy(t) {
  return t = k(t), t.ngModule || t;
}
function mR(t, e) {
  let n = null;
  return o(t.__annotations__), o(t.decorators), n;
  function o(i) {
    i && i.forEach(r);
  }
  function r(i) {
    n || (Object.getPrototypeOf(i).ngMetadataName == e ? n = i : i.type && Object.getPrototypeOf(i.type).ngMetadataName == e && (n = i.args[0]));
  }
}
let yl = /* @__PURE__ */ new WeakMap(), vf = /* @__PURE__ */ new WeakMap();
function yR() {
  yl = /* @__PURE__ */ new WeakMap(), vf = /* @__PURE__ */ new WeakMap(), Ls.length = 0, ul.clear();
}
function xS(t) {
  t = k(t);
  const e = yt(t);
  return e === null ? [t] : st(qt(e.exports).map((n) => yt(n) ? (Zl(n, !1), xS(n)) : n));
}
function vR(t, e) {
  const n = st(e.declarations || q), o = sg(t);
  n.forEach((r) => {
    if (r = k(r), r.hasOwnProperty(Wi)) {
      const s = H(r);
      ig(s, o);
    } else
      !r.hasOwnProperty(bc) && !r.hasOwnProperty(Ec) && (r.ngSelectorScope = t);
  });
}
function ig(t, e) {
  t.directiveDefs = () => Array.from(e.compilation.directives).map((n) => n.hasOwnProperty(Wi) ? H(n) : Fe(n)).filter((n) => !!n), t.pipeDefs = () => Array.from(e.compilation.pipes).map((n) => gt(n)), t.schemas = e.schemas, t.tView = null;
}
function sg(t) {
  if (ao(t)) {
    const e = Zo.getNgModuleScope(t);
    return {
      schemas: yt(t, !0).schemas || null,
      ...e
    };
  } else if (Nn(t)) {
    if ((H(t) || Fe(t)) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set([t]),
          pipes: /* @__PURE__ */ new Set()
        }
      };
    if (gt(t) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set([t])
        }
      };
  }
  throw new Error(`${t.name} does not have a module def (ɵmod property)`);
}
function sy(t) {
  return ph(t) ? t.ngModule : t;
}
let Ku = 0;
function OS(t, e) {
  (typeof ngDevMode > "u" || ngDevMode) && Bf();
  let n = null;
  R1(t, e), RS(t, e), Object.defineProperty(t, Wi, {
    get: () => {
      if (n === null) {
        const o = Te({ usage: 0, kind: "component", type: t });
        if (TD(e)) {
          const c = [`Component '${t.name}' is not resolved:`];
          throw e.templateUrl && c.push(` - templateUrl: ${e.templateUrl}`), e.styleUrls && e.styleUrls.length && c.push(` - styleUrls: ${JSON.stringify(e.styleUrls)}`), e.styleUrl && c.push(` - styleUrl: ${e.styleUrl}`), c.push("Did you run and wait for 'resolveComponentResources()'?"), new Error(c.join(`
`));
        }
        const r = hR();
        let i = e.preserveWhitespaces;
        i === void 0 && (r !== null && r.preserveWhitespaces !== void 0 ? i = r.preserveWhitespaces : i = !1);
        let s = e.encapsulation;
        s === void 0 && (r !== null && r.defaultEncapsulation !== void 0 ? s = r.defaultEncapsulation : s = Xt.Emulated);
        const a = e.templateUrl || `ng:///${t.name}/template.html`, l = {
          ...kS(t, e),
          typeSourceSpan: o.createParseSourceSpan("Component", t.name, a),
          template: e.template || "",
          preserveWhitespaces: i,
          styles: typeof e.styles == "string" ? [e.styles] : e.styles || q,
          animations: e.animations,
          // JIT components are always compiled against an empty set of `declarations`. Instead, the
          // `directiveDefs` and `pipeDefs` are updated at a later point:
          //  * for NgModule-based components, they're set when the NgModule which declares the
          //    component resolves in the module scoping queue
          //  * for standalone components, they're set just below, after `compileComponent`.
          declarations: [],
          changeDetection: e.changeDetection,
          encapsulation: s,
          interpolation: e.interpolation,
          viewProviders: e.viewProviders || null
        };
        Ku++;
        try {
          if (l.usesInheritance && PS(t), n = o.compileComponent(Xe, a, l), e.standalone) {
            const c = st(e.imports || q), { directiveDefs: u, pipeDefs: d } = DR(t, c);
            n.directiveDefs = u, n.pipeDefs = d, n.dependencies = () => c.map(k);
          }
        } finally {
          Ku--;
        }
        if (Ku === 0 && wS(), CR(t)) {
          const c = sg(t.ngSelectorScope);
          ig(n, c);
        }
        if (e.schemas)
          if (e.standalone)
            n.schemas = e.schemas;
          else
            throw new Error(`The 'schemas' was specified for the ${G(t)} but is only valid on a component that is standalone.`);
        else
          e.standalone && (n.schemas = []);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function DR(t, e) {
  return {
    directiveDefs: () => {
      {
        if (ngDevMode)
          for (const i of e)
            Fd(i, t);
        return _s(t) ? [...Zo.getStandaloneComponentScope(t, e).compilation.directives].map((i) => H(i) || Fe(i)).filter((i) => i !== null) : [];
      }
    },
    pipeDefs: () => {
      {
        if (ngDevMode)
          for (const i of e)
            Fd(i, t);
        return _s(t) ? [...Zo.getStandaloneComponentScope(t, e).compilation.pipes].map((i) => gt(i)).filter((i) => i !== null) : [];
      }
    }
  };
}
function CR(t) {
  return t.ngSelectorScope !== void 0;
}
function ag(t, e) {
  let n = null;
  RS(t, e || {}), Object.defineProperty(t, bc, {
    get: () => {
      if (n === null) {
        const o = FS(t, e || {});
        n = Te({ usage: 0, kind: "directive", type: t }).compileDirective(Xe, o.sourceMapUrl, o.metadata);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function FS(t, e) {
  const n = t && t.name, o = `ng:///${n}/ɵdir.js`, r = Te({ usage: 0, kind: "directive", type: t }), i = kS(t, e);
  return i.typeSourceSpan = r.createParseSourceSpan("Directive", n, o), i.usesInheritance && PS(t), { metadata: i, sourceMapUrl: o };
}
function RS(t, e) {
  let n = null;
  Object.defineProperty(t, bn, {
    get: () => {
      if (n === null) {
        const o = FS(t, e), r = Te({ usage: 0, kind: "directive", type: t });
        n = r.compileFactory(Xe, `ng:///${t.name}/ɵfac.js`, {
          name: o.metadata.name,
          type: o.metadata.type,
          typeArgumentCount: 0,
          deps: xc(t),
          target: r.FactoryTarget.Directive
        });
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function bR(t) {
  return Object.getPrototypeOf(t.prototype) === Object.prototype;
}
function kS(t, e) {
  var r;
  const n = ch(), o = n.ownPropMetadata(t);
  return {
    name: t.name,
    type: t,
    selector: e.selector !== void 0 ? e.selector : null,
    host: e.host || kt,
    propMetadata: o,
    inputs: e.inputs || q,
    outputs: e.outputs || q,
    queries: ay(t, o, NS),
    lifecycle: { usesOnChanges: n.hasLifecycleHook(t, "ngOnChanges") },
    typeSourceSpan: null,
    usesInheritance: !bR(t),
    exportAs: SR(e.exportAs),
    providers: e.providers || null,
    viewQueries: ay(t, o, LS),
    isStandalone: !!e.standalone,
    isSignal: !!e.signals,
    hostDirectives: ((r = e.hostDirectives) == null ? void 0 : r.map((i) => typeof i == "function" ? { directive: i } : i)) || null
  };
}
function PS(t) {
  const e = Object.prototype;
  let n = Object.getPrototypeOf(t.prototype).constructor;
  for (; n && n !== e; )
    !Fe(n) && !H(n) && MR(n) && ag(n, null), n = Object.getPrototypeOf(n);
}
function ER(t) {
  return typeof t == "string" ? BS(t) : k(t);
}
function IR(t, e) {
  return {
    propertyName: t,
    predicate: ER(e.selector),
    descendants: e.descendants,
    first: e.first,
    read: e.read ? e.read : null,
    static: !!e.static,
    emitDistinctChangesOnly: !!e.emitDistinctChangesOnly
  };
}
function ay(t, e, n) {
  const o = [];
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const i = e[r];
      i.forEach((s) => {
        if (n(s)) {
          if (!s.selector)
            throw new Error(`Can't construct a query for the property "${r}" of "${G(t)}" since the query selector wasn't defined.`);
          if (i.some($S))
            throw new Error("Cannot combine @Input decorators with query decorators");
          o.push(IR(r, s));
        }
      });
    }
  return o;
}
function SR(t) {
  return t === void 0 ? null : BS(t);
}
function NS(t) {
  const e = t.ngMetadataName;
  return e === "ContentChild" || e === "ContentChildren";
}
function LS(t) {
  const e = t.ngMetadataName;
  return e === "ViewChild" || e === "ViewChildren";
}
function $S(t) {
  return t.ngMetadataName === "Input";
}
function BS(t) {
  return t.split(",").map((e) => e.trim());
}
const wR = [
  "ngOnChanges",
  "ngOnInit",
  "ngOnDestroy",
  "ngDoCheck",
  "ngAfterViewInit",
  "ngAfterViewChecked",
  "ngAfterContentInit",
  "ngAfterContentChecked"
];
function MR(t) {
  const e = ch();
  if (wR.some((o) => e.hasLifecycleHook(t, o)))
    return !0;
  const n = e.propMetadata(t);
  for (const o in n) {
    const r = n[o];
    for (let i = 0; i < r.length; i++) {
      const s = r[i], a = s.ngMetadataName;
      if ($S(s) || NS(s) || LS(s) || a === "Output" || a === "HostBinding" || a === "HostListener")
        return !0;
    }
  }
  return !1;
}
function jS(t, e) {
  let n = null, o = null;
  Object.defineProperty(t, bn, {
    get: () => {
      if (o === null) {
        const r = ly(t, e), i = Te({ usage: 0, kind: "pipe", type: r.type });
        o = i.compileFactory(Xe, `ng:///${r.name}/ɵfac.js`, {
          name: r.name,
          type: r.type,
          typeArgumentCount: 0,
          deps: xc(t),
          target: i.FactoryTarget.Pipe
        });
      }
      return o;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  }), Object.defineProperty(t, Ec, {
    get: () => {
      if (n === null) {
        const r = ly(t, e);
        n = Te({ usage: 0, kind: "pipe", type: r.type }).compilePipe(Xe, `ng:///${r.name}/ɵpipe.js`, r);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function ly(t, e) {
  return {
    type: t,
    name: t.name,
    pipeName: e.name,
    pure: e.pure !== void 0 ? e.pure : !0,
    isStandalone: !!e.standalone
  };
}
const ut = Sa("Directive", (t = {}) => t, void 0, void 0, (t, e) => ag(t, e)), HS = Sa("Component", (t = {}) => ({ changeDetection: Bn.Default, ...t }), ut, void 0, (t, e) => OS(t, e)), dt = Sa("Pipe", (t) => ({ pure: !0, ...t }), void 0, void 0, (t, e) => jS(t, e)), W = no("Input", (t) => t ? typeof t == "string" ? { alias: t } : t : {}), Ht = no("Output", (t) => ({ alias: t })), AR = no("HostBinding", (t) => ({ hostPropertyName: t })), _R = no("HostListener", (t, e) => ({ eventName: t, args: e })), lg = Sa(
  "NgModule",
  (t) => t,
  void 0,
  void 0,
  /**
   * Decorator that marks the following class as an NgModule, and supplies
   * configuration metadata for it.
   *
   * * The `declarations` option configures the compiler
   * with information about what belongs to the NgModule.
   * * The `providers` options configures the NgModule's injector to provide
   * dependencies the NgModule members.
   * * The `imports` and `exports` options bring in members from other modules, and make
   * this module's members available to others.
   */
  (t, e) => AS(t, e)
);
class cg {
  constructor(e) {
    this.full = e;
    const n = e.split(".");
    this.major = n[0], this.minor = n[1], this.patch = n.slice(2).join(".");
  }
}
const TR = new cg("17.1.1"), fo = class fo {
  log(e) {
    console.log(e);
  }
  // Note: for reporting errors use `DOM.logError()` as it is platform specific
  warn(e) {
    console.warn(e);
  }
};
fo.ɵfac = function(n) {
  return new (n || fo)();
}, fo.ɵprov = /* @__PURE__ */ oe({ token: fo, factory: fo.ɵfac, providedIn: "platform" });
let zn = fo;
(typeof ngDevMode > "u" || ngDevMode) && ot(zn, [{
  type: le,
  args: [{ providedIn: "platform" }]
}], null, null);
class VS {
  constructor(e, n) {
    this.ngModuleFactory = e, this.componentFactories = n;
  }
}
const ho = class ho {
  /**
   * Compiles the given NgModule and all of its components. All templates of the components
   * have to be inlined.
   */
  compileModuleSync(e) {
    return new bu(e);
  }
  /**
   * Compiles the given NgModule and all of its components
   */
  compileModuleAsync(e) {
    return Promise.resolve(this.compileModuleSync(e));
  }
  /**
   * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsSync(e) {
    const n = this.compileModuleSync(e), o = yt(e), r = qt(o.declarations).reduce((i, s) => {
      const a = H(s);
      return a && i.push(new rs(a)), i;
    }, []);
    return new VS(n, r);
  }
  /**
   * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsAsync(e) {
    return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
  }
  /**
   * Clears all caches.
   */
  clearCache() {
  }
  /**
   * Clears the cache for the given component/ngModule.
   */
  clearCacheFor(e) {
  }
  /**
   * Returns the id for a given NgModule, if one is defined and known to the compiler.
   */
  getModuleId(e) {
  }
};
ho.ɵfac = function(n) {
  return new (n || ho)();
}, ho.ɵprov = /* @__PURE__ */ oe({ token: ho, factory: ho.ɵfac, providedIn: "root" });
let Ql = ho;
(typeof ngDevMode > "u" || ngDevMode) && ot(Ql, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
const US = new j("compilerOptions");
class xR {
}
const po = class po {
  constructor() {
    this.taskId = 0, this.pendingTasks = /* @__PURE__ */ new Set(), this.hasPendingTasks = new uw(!1);
  }
  get _hasPendingTasks() {
    return this.hasPendingTasks.value;
  }
  add() {
    this._hasPendingTasks || this.hasPendingTasks.next(!0);
    const e = this.taskId++;
    return this.pendingTasks.add(e), e;
  }
  remove(e) {
    this.pendingTasks.delete(e), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
  ngOnDestroy() {
    this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
};
po.ɵfac = function(n) {
  return new (n || po)();
}, po.ɵprov = /* @__PURE__ */ oe({ token: po, factory: po.ɵfac, providedIn: "root" });
let ar = po;
(typeof ngDevMode > "u" || ngDevMode) && ot(ar, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
class OR {
  constructor() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
  reset() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
}
let Va = new OR();
function Eu() {
  return Va;
}
function FR() {
  Va.reset(), cM((t) => RR(t));
}
function RR(t) {
  const { context: e, type: n } = t;
  n === 0 ? kR(e, t.service) : n === 1 ? NR(e, t.instance) : n === 2 && $R(e, t.providerRecord);
}
function kR(t, e) {
  const n = GS(t.injector);
  n === null && _("An Inject event must be run within an injection context.");
  const o = Va.resolverToTokenToDependencies;
  if (o.has(n) || o.set(n, /* @__PURE__ */ new WeakMap()), !BR(t.token))
    return;
  const r = o.get(n);
  r.has(t.token) || r.set(t.token, []);
  const { token: i, value: s, flags: a } = e;
  S(t.token, "Injector profiler context token is undefined.");
  const l = r.get(t.token);
  S(l, "Could not resolve dependencies for token."), t.injector instanceof fe ? l.push({ token: i, value: s, flags: a, injectedIn: PR(t.injector) }) : l.push({ token: i, value: s, flags: a });
}
function PR(t) {
  t instanceof fe || _("getNodeInjectorContext must be called with a NodeInjector");
  const e = Qi(t), n = Ki(t);
  if (n !== null)
    return tt(n, e), { lView: e, tNode: n };
}
function NR(t, e) {
  const { value: n } = e;
  GS(t.injector) === null && _("An InjectorCreatedInstance event must be run within an injection context.");
  let o;
  if (typeof n == "object" && (o = n == null ? void 0 : n.constructor), o === void 0 || !LR(o))
    return;
  const r = t.injector.get(on, null, { optional: !0 });
  if (r === null)
    return;
  const { standaloneInjectorToComponent: i } = Va;
  i.has(r) || i.set(r, o);
}
function LR(t) {
  const e = H(t);
  return !!(e != null && e.standalone);
}
function $R(t, e) {
  const { resolverToProviders: n } = Va;
  let o;
  (t == null ? void 0 : t.injector) instanceof fe ? o = Ki(t.injector) : o = t.injector, o === null && _("A ProviderConfigured event must be run within an injection context."), n.has(o) || n.set(o, []), n.get(o).push(e);
}
function GS(t) {
  let e = null;
  return t === void 0 || (t instanceof fe ? e = Qi(t) : e = t), e;
}
function BR(t) {
  return t !== null && (typeof t == "object" || typeof t == "function" || typeof t == "symbol");
}
function jR(t) {
  ngDevMode && S(t, "component"), Fa(JD(t)), QI(t).forEach((e) => HR(e));
}
function HR(t) {
  const e = JD(t);
  e[O] |= 1024, zh(e);
}
function VR(t, e) {
  const n = t.get(e, null, { self: !0, optional: !0 });
  if (n === null)
    throw new Error(`Unable to determine instance of ${e} in given injector`);
  const o = UR(e, t), r = WS(t), i = o.map((s) => {
    const a = {
      value: s.value
    }, l = s.flags;
    a.flags = {
      optional: (8 & l) === 8,
      host: (1 & l) === 1,
      self: (2 & l) === 2,
      skipSelf: (4 & l) === 4
    };
    for (let c = 0; c < r.length; c++) {
      const u = r[c];
      if (c === 0 && a.flags.skipSelf)
        continue;
      if (a.flags.host && u instanceof on)
        break;
      if (u.get(s.token, null, { self: !0, optional: !0 }) !== null) {
        if (a.flags.host) {
          r[0].get(s.token, null, { ...a.flags, optional: !0 }) !== null && (a.providedIn = u);
          break;
        }
        a.providedIn = u;
        break;
      }
      if (c === 0 && a.flags.self)
        break;
    }
    return s.token && (a.token = s.token), a;
  });
  return { instance: n, dependencies: i };
}
function UR(t, e) {
  var s, a;
  const { resolverToTokenToDependencies: n } = Eu();
  if (!(e instanceof fe))
    return ((a = (s = n.get(e)) == null ? void 0 : s.get) == null ? void 0 : a.call(s, t)) ?? [];
  const o = Qi(e), r = n.get(o);
  return ((r == null ? void 0 : r.get(t)) ?? []).filter((l) => {
    var d;
    const c = (d = l.injectedIn) == null ? void 0 : d.tNode;
    if (c === void 0)
      return !1;
    const u = Ki(e);
    return ai(c), ai(u), c === u;
  });
}
function GR(t) {
  const { standaloneInjectorToComponent: e } = Eu();
  if (e.has(t))
    return e.get(t);
  const n = t.get(Wn, null, { self: !0, optional: !0 });
  return n === null || n.instance === null ? null : n.instance.constructor;
}
function WR(t) {
  const e = Ki(t), { resolverToProviders: n } = Eu();
  return n.get(e) ?? [];
}
function zR(t) {
  const e = /* @__PURE__ */ new Map(), o = qR(e, /* @__PURE__ */ new Set());
  return Pl(t, o, [], /* @__PURE__ */ new Set()), e;
}
function qR(t, e) {
  return (n, o) => {
    if (t.has(n) || t.set(n, [o]), !e.has(o))
      for (const r of t.keys()) {
        const i = t.get(r);
        let s = Il(o);
        if (!s) {
          const c = o.ngModule;
          s = Il(c);
        }
        if (!s)
          return;
        const a = i[0];
        let l = !1;
        li(s.imports, (c) => {
          var u;
          l || (l = c.ngModule === a || c === a, l && ((u = t.get(r)) == null || u.unshift(o)));
        });
      }
    e.add(o);
  };
}
function YR(t) {
  const e = Eu().resolverToProviders.get(t) ?? [];
  if (ZR(t))
    return e;
  const n = GR(t);
  if (n === null)
    return e;
  const o = zR(n), r = [];
  for (const i of e) {
    const s = i.provider, a = s.provide;
    if (a === qo || a === dh)
      continue;
    let l = o.get(s) ?? [];
    const c = H(n);
    !!(c != null && c.standalone) && (l = [n, ...l]), r.push({ ...i, importPath: l });
  }
  return r;
}
function ZR(t) {
  return t instanceof Ji && t.scopes.has("platform");
}
function QR(t) {
  if (t instanceof fe)
    return WR(t);
  if (t instanceof on)
    return YR(t);
  _("getInjectorProviders only supports NodeInjector and EnvironmentInjector");
}
function KR(t) {
  if (t instanceof fe) {
    const e = Qi(t), n = Ki(t);
    return tt(n, e), { type: "element", source: Ge(n, e) };
  }
  return t instanceof Ji ? { type: "environment", source: t.source ?? null } : t instanceof Oc ? { type: "null", source: null } : null;
}
function WS(t) {
  const e = [t];
  return Df(t, e), e;
}
function Df(t, e) {
  const n = XR(t);
  if (n === null) {
    if (t instanceof fe) {
      const o = e[0];
      if (o instanceof fe) {
        const r = JR(o);
        r === null && _("NodeInjector must have some connection to the module injector tree"), e.push(r), Df(r, e);
      }
      return e;
    }
  } else
    e.push(n), Df(n, e);
  return e;
}
function XR(t) {
  var r;
  if (t instanceof Ji)
    return t.parent;
  let e, n;
  if (t instanceof fe)
    e = Ki(t), n = Qi(t);
  else {
    if (t instanceof Oc)
      return null;
    _("getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector");
  }
  const o = _c(e, n);
  if (ih(o)) {
    const i = ea(o), s = ta(o, n), l = s[E].data[
      i + 8
      /* NodeInjectorOffset.TNODE */
    ];
    return new fe(l, s);
  } else {
    const s = (r = n[Je].injector) == null ? void 0 : r.parent;
    if (s instanceof fe)
      return s;
  }
  return null;
}
function JR(t) {
  let e;
  t instanceof fe ? e = Qi(t) : _("getModuleInjectorOfNodeInjector must be called with a NodeInjector");
  const o = e[Je].parentInjector;
  return o || _("NodeInjector must have some connection to the module injector tree"), o;
}
const Ja = "ng", ek = {
  /**
   * Warning: functions that start with `ɵ` are considered *INTERNAL* and should not be relied upon
   * in application's code. The contract of those functions might be changed in any release and/or a
   * function can be removed completely.
   */
  ɵgetDependenciesFromInjectable: VR,
  ɵgetInjectorProviders: QR,
  ɵgetInjectorResolutionPath: WS,
  ɵgetInjectorMetadata: KR,
  ɵsetProfiler: HM,
  getDirectiveMetadata: oR,
  getComponent: yf,
  getContext: YI,
  getListeners: eS,
  getOwningComponent: ZI,
  getHostElement: JI,
  getInjector: KI,
  getRootComponents: QI,
  getDirectives: XI,
  applyChanges: jR,
  isSignal: $C
};
let cy = !1;
function tk() {
  if (!cy) {
    cy = !0, FR();
    for (const [t, e] of Object.entries(ek))
      nk(t, e);
  }
}
function nk(t, e) {
  if (typeof COMPILED > "u" || !COMPILED) {
    const n = xe;
    ngDevMode && S(e, "function not defined"), n[Ja] ?? (n[Ja] = {}), n[Ja][t] = e;
  }
}
const zS = new j(""), ug = new j(""), go = class go {
  constructor(e, n, o) {
    this._ngZone = e, this.registry = n, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, $s || (qS(o), o.addToWindow(n)), this._watchAngularEvents(), e.run(() => {
      this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
    });
  }
  _watchAngularEvents() {
    this._ngZone.onUnstable.subscribe({
      next: () => {
        this._isZoneStable = !1;
      }
    }), this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.subscribe({
        next: () => {
          ae.assertNotInAngularZone(), queueMicrotask(() => {
            this._isZoneStable = !0, this._runCallbacksIfReady();
          });
        }
      });
    });
  }
  /**
   * Increases the number of pending request
   * @deprecated pending requests are now tracked with zones.
   */
  increasePendingRequestCount() {
    return this._pendingCount += 1, this._pendingCount;
  }
  /**
   * Decreases the number of pending request
   * @deprecated pending requests are now tracked with zones
   */
  decreasePendingRequestCount() {
    if (this._pendingCount -= 1, this._pendingCount < 0)
      throw new Error("pending async requests below zero");
    return this._runCallbacksIfReady(), this._pendingCount;
  }
  /**
   * Whether an associated application is stable
   */
  isStable() {
    return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
  }
  _runCallbacksIfReady() {
    if (this.isStable())
      queueMicrotask(() => {
        for (; this._callbacks.length !== 0; ) {
          let e = this._callbacks.pop();
          clearTimeout(e.timeoutId), e.doneCb();
        }
      });
    else {
      let e = this.getPendingTasks();
      this._callbacks = this._callbacks.filter((n) => n.updateCb && n.updateCb(e) ? (clearTimeout(n.timeoutId), !1) : !0);
    }
  }
  getPendingTasks() {
    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map((e) => ({
      source: e.source,
      // From TaskTrackingZone:
      // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
      creationLocation: e.creationLocation,
      data: e.data
    })) : [];
  }
  addCallback(e, n, o) {
    let r = -1;
    n && n > 0 && (r = setTimeout(() => {
      this._callbacks = this._callbacks.filter((i) => i.timeoutId !== r), e();
    }, n)), this._callbacks.push({ doneCb: e, timeoutId: r, updateCb: o });
  }
  /**
   * Wait for the application to be stable with a timeout. If the timeout is reached before that
   * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
   *
   * @param doneCb The callback to invoke when Angular is stable or the timeout expires
   *    whichever comes first.
   * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
   *    specified, whenStable() will wait forever.
   * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
   *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
   *    and no further updates will be issued.
   */
  whenStable(e, n, o) {
    if (o && !this.taskTrackingZone)
      throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
    this.addCallback(e, n, o), this._runCallbacksIfReady();
  }
  /**
   * Get the number of pending requests
   * @deprecated pending requests are now tracked with zones
   */
  getPendingRequestCount() {
    return this._pendingCount;
  }
  /**
   * Registers an application with a testability hook so that it can be tracked.
   * @param token token of application, root element
   *
   * @internal
   */
  registerApplication(e) {
    this.registry.registerApplication(e, this);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   *
   * @internal
   */
  unregisterApplication(e) {
    this.registry.unregisterApplication(e);
  }
  /**
   * Find providers by name
   * @param using The root element to search from
   * @param provider The name of binding variable
   * @param exactMatch Whether using exactMatch
   */
  findProviders(e, n, o) {
    return [];
  }
};
go.ɵfac = function(n) {
  return new (n || go)(Re(ae), Re(Di), Re(ug));
}, go.ɵprov = /* @__PURE__ */ oe({ token: go, factory: go.ɵfac });
let Kl = go;
(typeof ngDevMode > "u" || ngDevMode) && ot(Kl, [{
  type: le
}], () => [{ type: ae }, { type: Di }, { type: void 0, decorators: [{
  type: mt,
  args: [ug]
}] }], null);
const mo = class mo {
  constructor() {
    this._applications = /* @__PURE__ */ new Map();
  }
  /**
   * Registers an application with a testability hook so that it can be tracked
   * @param token token of application, root element
   * @param testability Testability hook
   */
  registerApplication(e, n) {
    this._applications.set(e, n);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   */
  unregisterApplication(e) {
    this._applications.delete(e);
  }
  /**
   * Unregisters all applications
   */
  unregisterAllApplications() {
    this._applications.clear();
  }
  /**
   * Get a testability hook associated with the application
   * @param elem root element
   */
  getTestability(e) {
    return this._applications.get(e) || null;
  }
  /**
   * Get all registered testabilities
   */
  getAllTestabilities() {
    return Array.from(this._applications.values());
  }
  /**
   * Get all registered applications(root elements)
   */
  getAllRootElements() {
    return Array.from(this._applications.keys());
  }
  /**
   * Find testability of a node in the Tree
   * @param elem node
   * @param findInAncestors whether finding testability in ancestors if testability was not found in
   * current node
   */
  findTestabilityInTree(e, n = !0) {
    return ($s == null ? void 0 : $s.findTestabilityInTree(this, e, n)) ?? null;
  }
};
mo.ɵfac = function(n) {
  return new (n || mo)();
}, mo.ɵprov = /* @__PURE__ */ oe({ token: mo, factory: mo.ɵfac, providedIn: "platform" });
let Di = mo;
(typeof ngDevMode > "u" || ngDevMode) && ot(Di, [{
  type: le,
  args: [{ providedIn: "platform" }]
}], null, null);
function qS(t) {
  $s = t;
}
let $s;
const YS = new j("Application Initializer"), yo = class yo {
  constructor() {
    if (this.initialized = !1, this.done = !1, this.donePromise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    }), this.appInits = A(YS, { optional: !0 }) ?? [], (typeof ngDevMode > "u" || ngDevMode) && !Array.isArray(this.appInits))
      throw new b(-209, `Unexpected type of the \`APP_INITIALIZER\` token value (expected an array, but got ${typeof this.appInits}). Please check that the \`APP_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
  }
  /** @internal */
  runInitializers() {
    if (this.initialized)
      return;
    const e = [];
    for (const o of this.appInits) {
      const r = o();
      if (pu(r))
        e.push(r);
      else if (gu(r)) {
        const i = new Promise((s, a) => {
          r.subscribe({ complete: s, error: a });
        });
        e.push(i);
      }
    }
    const n = () => {
      this.done = !0, this.resolve();
    };
    Promise.all(e).then(() => {
      n();
    }).catch((o) => {
      this.reject(o);
    }), e.length === 0 && n(), this.initialized = !0;
  }
};
yo.ɵfac = function(n) {
  return new (n || yo)();
}, yo.ɵprov = /* @__PURE__ */ oe({ token: yo, factory: yo.ɵfac, providedIn: "root" });
let lr = yo;
(typeof ngDevMode > "u" || ngDevMode) && ot(lr, [{
  type: le,
  args: [{ providedIn: "root" }]
}], () => [], null);
const dg = new j("appBootstrapListener");
function ZS(t, e, n) {
  ngDevMode && PM(n);
  const o = new bu(n);
  if (typeof ngJitMode < "u" && !ngJitMode)
    return Promise.resolve(o);
  const r = t.get(US, []).concat(e);
  if (fR({
    defaultEncapsulation: uy(r.map((c) => c.defaultEncapsulation)),
    preserveWhitespaces: uy(r.map((c) => c.preserveWhitespaces))
  }), N1())
    return Promise.resolve(o);
  const i = r.flatMap((c) => c.providers ?? []);
  if (i.length === 0)
    return Promise.resolve(o);
  const s = Te({
    usage: 0,
    kind: "NgModule",
    type: n
  }), l = Ve.create({ providers: i }).get(s.ResourceLoader);
  return _D((c) => Promise.resolve(l.get(c))).then(() => o);
}
function QS() {
  ngDevMode && tk();
}
function KS() {
  W0(() => {
    throw new b(600, ngDevMode && "Writing to signals is not allowed in a `computed` or an `effect` by default. Use `allowSignalWrites` in the `CreateEffectOptions` to enable this inside effects.");
  });
}
function XS(t) {
  return t.isBoundToModule;
}
class ok {
  constructor(e, n) {
    this.name = e, this.token = n;
  }
}
function JS(t, e, n) {
  try {
    const o = n();
    return pu(o) ? o.catch((r) => {
      throw e.runOutsideAngular(() => t.handleError(r)), r;
    }) : o;
  } catch (o) {
    throw e.runOutsideAngular(() => t.handleError(o)), o;
  }
}
function e0(t, e) {
  return Array.isArray(e) ? e.reduce(e0, t) : { ...t, ...e };
}
const vo = class vo {
  constructor() {
    this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = A(qC), this.afterRenderEffectManager = A(Gn), this.componentTypes = [], this.components = [], this.isStable = A(ar).hasPendingTasks.pipe(kw((e) => !e)), this._injector = A(on);
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  /**
   * The `EnvironmentInjector` used to create this application.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Bootstrap a component onto the element identified by its selector or, optionally, to a
   * specified element.
   *
   * @usageNotes
   * ### Bootstrap process
   *
   * When bootstrapping a component, Angular mounts it onto a target DOM element
   * and kicks off automatic change detection. The target DOM element can be
   * provided using the `rootSelectorOrNode` argument.
   *
   * If the target DOM element is not provided, Angular tries to find one on a page
   * using the `selector` of the component that is being bootstrapped
   * (first matched element is used).
   *
   * ### Example
   *
   * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
   * but it requires us to know the component while writing the application code.
   *
   * Imagine a situation where we have to wait for an API call to decide about the component to
   * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
   * dynamically bootstrap a component.
   *
   * {@example core/ts/platform/platform.ts region='componentSelector'}
   *
   * Optionally, a component can be mounted onto a DOM element that does not match the
   * selector of the bootstrapped component.
   *
   * In the following example, we are providing a CSS selector to match the target element.
   *
   * {@example core/ts/platform/platform.ts region='cssSelector'}
   *
   * While in this example, we are providing reference to a DOM node.
   *
   * {@example core/ts/platform/platform.ts region='domNode'}
   */
  bootstrap(e, n) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const o = e instanceof $l;
    if (!this._injector.get(lr).done) {
      const d = !o && Nn(e), f = (typeof ngDevMode > "u" || ngDevMode) && "Cannot bootstrap as there are still asynchronous initializers running." + (d ? "" : " Bootstrap components in the `ngDoBootstrap` method of the root module.");
      throw new b(405, f);
    }
    let i;
    o ? i = e : i = this._injector.get(Jo).resolveComponentFactory(e), this.componentTypes.push(i.componentType);
    const s = XS(i) ? void 0 : this._injector.get(Wn), a = n || i.selector, l = i.create(Ve.NULL, [], a, s), c = l.location.nativeElement, u = l.injector.get(zS, null);
    return u == null || u.registerApplication(c), l.onDestroy(() => {
      this.detachView(l.hostView), vl(this.components, l), u == null || u.unregisterApplication(c);
    }), this._loadComponent(l), (typeof ngDevMode > "u" || ngDevMode) && this._injector.get(zn).log("Angular is running in development mode."), l;
  }
  /**
   * Invoke this method to explicitly process change detection and its side-effects.
   *
   * In development mode, `tick()` also performs a second change detection cycle to ensure that no
   * further changes are detected. If additional changes are picked up during this second cycle,
   * bindings in the app have side-effects that cannot be resolved in a single change detection
   * pass.
   * In this case, Angular throws an error, since an Angular application can only have one change
   * detection pass during which all change detection must complete.
   */
  tick() {
    if ((typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._runningTick)
      throw new b(101, ngDevMode && "ApplicationRef.tick is called recursively");
    try {
      this._runningTick = !0;
      for (let e of this._views)
        e.detectChanges();
      if (typeof ngDevMode > "u" || ngDevMode)
        for (let e of this._views)
          e.checkNoChanges();
    } catch (e) {
      this.internalErrorHandler(e);
    } finally {
      try {
        const e = this.afterRenderEffectManager.execute();
        if ((typeof ngDevMode > "u" || ngDevMode) && e)
          for (let n of this._views)
            n.checkNoChanges();
      } catch (e) {
        this.internalErrorHandler(e);
      }
      this._runningTick = !1;
    }
  }
  /**
   * Attaches a view so that it will be dirty checked.
   * The view will be automatically detached when it is destroyed.
   * This will throw if the view is already attached to a ViewContainer.
   */
  attachView(e) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = e;
    this._views.push(n), n.attachToAppRef(this);
  }
  /**
   * Detaches a view from dirty checking again.
   */
  detachView(e) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = e;
    vl(this._views, n), n.detachFromAppRef();
  }
  _loadComponent(e) {
    this.attachView(e.hostView), this.tick(), this.components.push(e);
    const n = this._injector.get(dg, []);
    if (ngDevMode && !Array.isArray(n))
      throw new b(-209, `Unexpected type of the \`APP_BOOTSTRAP_LISTENER\` token value (expected an array, but got ${typeof n}). Please check that the \`APP_BOOTSTRAP_LISTENER\` token is configured as a \`multi: true\` provider.`);
    [...this._bootstrapListeners, ...n].forEach((o) => o(e));
  }
  /** @internal */
  ngOnDestroy() {
    if (!this._destroyed)
      try {
        this._destroyListeners.forEach((e) => e()), this._views.slice().forEach((e) => e.destroy());
      } finally {
        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
      }
  }
  /**
   * Registers a listener to be called when an instance is destroyed.
   *
   * @param callback A callback function to add as a listener.
   * @returns A function which unregisters a listener.
   */
  onDestroy(e) {
    return (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._destroyListeners.push(e), () => vl(this._destroyListeners, e);
  }
  /**
   * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
   * will destroy the associated environment injectors as well as all the bootstrapped components
   * with their views.
   */
  destroy() {
    if (this._destroyed)
      throw new b(406, ngDevMode && "This instance of the `ApplicationRef` has already been destroyed.");
    const e = this._injector;
    e.destroy && !e.destroyed && e.destroy();
  }
  /**
   * Returns the number of attached views.
   */
  get viewCount() {
    return this._views.length;
  }
  warnIfDestroyed() {
    (typeof ngDevMode > "u" || ngDevMode) && this._destroyed && console.warn(ve(406, "This instance of the `ApplicationRef` has already been destroyed."));
  }
};
vo.ɵfac = function(n) {
  return new (n || vo)();
}, vo.ɵprov = /* @__PURE__ */ oe({ token: vo, factory: vo.ɵfac, providedIn: "root" });
let Nt = vo;
(typeof ngDevMode > "u" || ngDevMode) && ot(Nt, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
function vl(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function uy(t) {
  for (let e = t.length - 1; e >= 0; e--)
    if (t[e] !== void 0)
      return t[e];
}
let mr;
function t0(t) {
  mr ?? (mr = /* @__PURE__ */ new WeakMap());
  const e = mr.get(t);
  if (e)
    return e;
  const n = t.isStable.pipe(Hw((o) => o)).toPromise().then(() => {
  });
  return mr.set(t, n), t.onDestroy(() => mr == null ? void 0 : mr.delete(t)), n;
}
const Do = class Do {
  constructor() {
    this.zone = A(ae), this.applicationRef = A(Nt);
  }
  initialize() {
    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
      next: () => {
        this.zone.run(() => {
          this.applicationRef.tick();
        });
      }
    }));
  }
  ngOnDestroy() {
    var e;
    (e = this._onMicrotaskEmptySubscription) == null || e.unsubscribe();
  }
};
Do.ɵfac = function(n) {
  return new (n || Do)();
}, Do.ɵprov = /* @__PURE__ */ oe({ token: Do, factory: Do.ɵfac, providedIn: "root" });
let Xl = Do;
(typeof ngDevMode > "u" || ngDevMode) && ot(Xl, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
const n0 = new j(typeof ngDevMode > "u" || ngDevMode ? "provideZoneChangeDetection token" : "");
function o0(t) {
  return [
    { provide: ae, useFactory: t },
    {
      provide: qo,
      multi: !0,
      useFactory: () => {
        const e = A(Xl, { optional: !0 });
        if ((typeof ngDevMode > "u" || ngDevMode) && e === null)
          throw new b(402, "A required Injectable was not found in the dependency injection tree. If you are bootstrapping an NgModule, make sure that the `BrowserModule` is imported.");
        return () => e.initialize();
      }
    },
    {
      provide: qo,
      multi: !0,
      useFactory: () => {
        const e = A(Jl);
        return () => {
          e.initialize();
        };
      }
    },
    { provide: qC, useFactory: rk }
  ];
}
function rk() {
  const t = A(ae), e = A(oo);
  return (n) => t.runOutsideAngular(() => e.handleError(n));
}
function r0(t) {
  const e = o0(() => new ae(i0(t)));
  return Fc([
    typeof ngDevMode > "u" || ngDevMode ? { provide: n0, useValue: !0 } : [],
    e
  ]);
}
function i0(t) {
  return {
    enableLongStackTrace: typeof ngDevMode > "u" ? !1 : !!ngDevMode,
    shouldCoalesceEventChangeDetection: (t == null ? void 0 : t.eventCoalescing) ?? !1,
    shouldCoalesceRunChangeDetection: (t == null ? void 0 : t.runCoalescing) ?? !1
  };
}
const Co = class Co {
  constructor() {
    this.subscription = new cr(), this.initialized = !1, this.zone = A(ae), this.pendingTasks = A(ar);
  }
  initialize() {
    if (this.initialized)
      return;
    this.initialized = !0;
    let e = null;
    !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (e = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
      this.subscription.add(this.zone.onStable.subscribe(() => {
        ae.assertNotInAngularZone(), queueMicrotask(() => {
          e !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(e), e = null);
        });
      }));
    }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
      ae.assertInAngularZone(), e ?? (e = this.pendingTasks.add());
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
};
Co.ɵfac = function(n) {
  return new (n || Co)();
}, Co.ɵprov = /* @__PURE__ */ oe({ token: Co, factory: Co.ɵfac, providedIn: "root" });
let Jl = Co;
(typeof ngDevMode > "u" || ngDevMode) && ot(Jl, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
function ik() {
  return typeof ngI18nClosureMode < "u" && ngI18nClosureMode && typeof goog < "u" && goog.LOCALE !== "en" ? goog.LOCALE : typeof $localize < "u" && $localize.locale || sr;
}
const qe = new j("LocaleId", {
  providedIn: "root",
  factory: () => A(qe, z.Optional | z.SkipSelf) || ik()
}), fg = new j("DefaultCurrencyCode", {
  providedIn: "root",
  factory: () => zO
}), sk = new j("Translations"), ak = new j("TranslationsFormat");
var Cf;
(function(t) {
  t[t.Error = 0] = "Error", t[t.Warning = 1] = "Warning", t[t.Ignore = 2] = "Ignore";
})(Cf || (Cf = {}));
const hg = new j("PlatformDestroyListeners"), bo = class bo {
  /** @internal */
  constructor(e) {
    this._injector = e, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
  }
  /**
   * Creates an instance of an `@NgModule` for the given platform.
   *
   * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
   *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
   */
  bootstrapModuleFactory(e, n) {
    const o = QT(n == null ? void 0 : n.ngZone, i0({
      eventCoalescing: n == null ? void 0 : n.ngZoneEventCoalescing,
      runCoalescing: n == null ? void 0 : n.ngZoneRunCoalescing
    }));
    return o.run(() => {
      const r = tR(e.moduleType, this.injector, o0(() => o));
      if ((typeof ngDevMode > "u" || ngDevMode) && r.injector.get(n0, null) !== null)
        throw new b(207, "`bootstrapModule` does not support `provideZoneChangeDetection`. Use `BootstrapOptions` instead.");
      const i = r.injector.get(oo, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && i === null)
        throw new b(402, "No ErrorHandler. Is platform module (BrowserModule) included?");
      return o.runOutsideAngular(() => {
        const s = o.onError.subscribe({
          next: (a) => {
            i.handleError(a);
          }
        });
        r.onDestroy(() => {
          vl(this._modules, r), s.unsubscribe();
        });
      }), JS(i, o, () => {
        const s = r.injector.get(lr);
        return s.runInitializers(), s.donePromise.then(() => {
          const a = r.injector.get(qe, sr);
          return Cp(a || sr), this._moduleDoBootstrap(r), r;
        });
      });
    });
  }
  /**
   * Creates an instance of an `@NgModule` for a given platform.
   *
   * @usageNotes
   * ### Simple Example
   *
   * ```typescript
   * @NgModule({
   *   imports: [BrowserModule]
   * })
   * class MyModule {}
   *
   * let moduleRef = platformBrowser().bootstrapModule(MyModule);
   * ```
   *
   */
  bootstrapModule(e, n = []) {
    const o = e0({}, n);
    return ZS(this.injector, o, e).then((r) => this.bootstrapModuleFactory(r, o));
  }
  _moduleDoBootstrap(e) {
    const n = e.injector.get(Nt);
    if (e._bootstrapComponents.length > 0)
      e._bootstrapComponents.forEach((o) => n.bootstrap(o));
    else if (e.instance.ngDoBootstrap)
      e.instance.ngDoBootstrap(n);
    else
      throw new b(-403, ngDevMode && `The module ${Y(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
    this._modules.push(e);
  }
  /**
   * Registers a listener to be called when the platform is destroyed.
   */
  onDestroy(e) {
    this._destroyListeners.push(e);
  }
  /**
   * Retrieves the platform {@link Injector}, which is the parent injector for
   * every Angular application on the page and provides singleton providers.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Destroys the current Angular platform and all Angular applications on the page.
   * Destroys all modules and listeners registered with the platform.
   */
  destroy() {
    if (this._destroyed)
      throw new b(404, ngDevMode && "The platform has already been destroyed!");
    this._modules.slice().forEach((n) => n.destroy()), this._destroyListeners.forEach((n) => n());
    const e = this._injector.get(hg, null);
    e && (e.forEach((n) => n()), e.clear()), this._destroyed = !0;
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
};
bo.ɵfac = function(n) {
  return new (n || bo)(Re(Ve));
}, bo.ɵprov = /* @__PURE__ */ oe({ token: bo, factory: bo.ɵfac, providedIn: "platform" });
let Ci = bo;
(typeof ngDevMode > "u" || ngDevMode) && ot(Ci, [{
  type: le,
  args: [{ providedIn: "platform" }]
}], () => [{ type: Ve }], null);
let Qt = null;
const pg = new j("AllowMultipleToken");
function s0(t) {
  if (Qt && !Qt.get(pg, !1))
    throw new b(400, ngDevMode && "There can be only one platform. Destroy the previous one to create a new one.");
  QS(), KS(), Qt = t;
  const e = t.get(Ci);
  return u0(t), e;
}
function a0(t, e, n = []) {
  const o = `Platform: ${e}`, r = new j(o);
  return (i = []) => {
    let s = Iu();
    if (!s || s.injector.get(pg, !1)) {
      const a = [...n, ...i, { provide: r, useValue: !0 }];
      t ? t(a) : s0(l0(a, o));
    }
    return c0(r);
  };
}
function l0(t = [], e) {
  return Ve.create({
    name: e,
    providers: [
      { provide: hh, useValue: "platform" },
      { provide: hg, useValue: /* @__PURE__ */ new Set([() => Qt = null]) },
      ...t
    ]
  });
}
function c0(t) {
  const e = Iu();
  if (!e)
    throw new b(401, ngDevMode && "No platform exists!");
  if ((typeof ngDevMode > "u" || ngDevMode) && !e.injector.get(t, null))
    throw new b(400, "A platform with a different configuration has been created. Please destroy it first.");
  return e;
}
function Iu() {
  return (Qt == null ? void 0 : Qt.get(Ci)) ?? null;
}
function lk() {
  var t;
  (t = Iu()) == null || t.destroy();
}
function ck(t = []) {
  if (Qt)
    return Qt;
  QS();
  const e = l0(t);
  return Qt = e, KS(), u0(e), e;
}
function u0(t) {
  const e = t.get(jD, null);
  e == null || e.forEach((n) => n());
}
function uk() {
  return typeof ngDevMode > "u" || !!ngDevMode;
}
function dk() {
  (typeof ngDevMode > "u" || ngDevMode) && (xe.ngDevMode = !1);
}
function fk(t) {
  const e = GD(t);
  if (!e)
    throw d0(t);
  return new bu(e);
}
function hk(t) {
  const e = GD(t);
  if (!e)
    throw d0(t);
  return e;
}
function d0(t) {
  return new Error(`No module with ID ${t} loaded`);
}
class f0 extends tr {
}
class pk extends f0 {
}
class gk {
  constructor(e, n) {
    this.name = e, this.callback = n;
  }
}
function mk(t) {
  return t.map((e) => e.nativeElement);
}
class gg {
  constructor(e) {
    this.nativeNode = e;
  }
  /**
   * The `DebugElement` parent. Will be `null` if this is the root element.
   */
  get parent() {
    const e = this.nativeNode.parentNode;
    return e ? new Ua(e) : null;
  }
  /**
   * The host dependency injector. For example, the root element's component instance injector.
   */
  get injector() {
    return KI(this.nativeNode);
  }
  /**
   * The element's own component instance, if it has one.
   */
  get componentInstance() {
    const e = this.nativeNode;
    return e && (yf(e) || ZI(e));
  }
  /**
   * An object that provides parent context for this element. Often an ancestor component instance
   * that governs this element.
   *
   * When an element is repeated within *ngFor, the context is an `NgForOf` whose `$implicit`
   * property is the value of the row instance value. For example, the `hero` in `*ngFor="let hero
   * of heroes"`.
   */
  get context() {
    return yf(this.nativeNode) || YI(this.nativeNode);
  }
  /**
   * The callbacks attached to the component's @Output properties and/or the element's event
   * properties.
   */
  get listeners() {
    return eS(this.nativeNode).filter((e) => e.type === "dom");
  }
  /**
   * Dictionary of objects associated with template local variables (e.g. #foo), keyed by the local
   * variable name.
   */
  get references() {
    return rR(this.nativeNode);
  }
  /**
   * This component's injector lookup tokens. Includes the component itself plus the tokens that the
   * component lists in its providers metadata.
   */
  get providerTokens() {
    return nR(this.nativeNode);
  }
}
class Ua extends gg {
  constructor(e) {
    ngDevMode && Pn(e), super(e);
  }
  /**
   * The underlying DOM element at the root of the component.
   */
  get nativeElement() {
    return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
  }
  /**
   * The element tag name, if it is an element.
   */
  get name() {
    const e = at(this.nativeNode), n = e ? e.lView : null;
    return n !== null ? n[E].data[e.nodeIndex].value : this.nativeNode.nodeName;
  }
  /**
   *  Gets a map of property names to property values for an element.
   *
   *  This map includes:
   *  - Regular property bindings (e.g. `[id]="id"`)
   *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
   *  - Interpolated property bindings (e.g. `id="{{ value }}")
   *
   *  It does not include:
   *  - input property bindings (e.g. `[myCustomInput]="value"`)
   *  - attribute bindings (e.g. `[attr.role]="menu"`)
   */
  get properties() {
    const e = at(this.nativeNode), n = e ? e.lView : null;
    if (n === null)
      return {};
    const o = n[E].data, r = o[e.nodeIndex], i = {};
    return yk(this.nativeElement, i), Dk(i, r, n, o), i;
  }
  /**
   *  A map of attribute names to attribute values for an element.
   */
  // TODO: replace null by undefined in the return type
  get attributes() {
    const e = {}, n = this.nativeElement;
    if (!n)
      return e;
    const o = at(n), r = o ? o.lView : null;
    if (r === null)
      return {};
    const i = r[E].data[o.nodeIndex].attrs, s = [];
    if (i) {
      let a = 0;
      for (; a < i.length; ) {
        const l = i[a];
        if (typeof l != "string")
          break;
        const c = i[a + 1];
        e[l] = c, s.push(l.toLowerCase()), a += 2;
      }
    }
    for (const a of n.attributes)
      s.includes(a.name) || (e[a.name] = a.value);
    return e;
  }
  /**
   * The inline styles of the DOM element.
   */
  // TODO: replace null by undefined in the return type
  get styles() {
    const e = this.nativeElement;
    return (e == null ? void 0 : e.style) ?? {};
  }
  /**
   * A map containing the class names on the element as keys.
   *
   * This map is derived from the `className` property of the DOM element.
   *
   * Note: The values of this object will always be `true`. The class key will not appear in the KV
   * object if it does not exist on the element.
   *
   * @see [Element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)
   */
  get classes() {
    const e = {}, o = this.nativeElement.className;
    return (typeof o != "string" ? o.baseVal.split(" ") : o.split(" ")).forEach((i) => e[i] = !0), e;
  }
  /**
   * The `childNodes` of the DOM element as a `DebugNode` array.
   *
   * @see [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
   */
  get childNodes() {
    const e = this.nativeNode.childNodes, n = [];
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      n.push(bi(r));
    }
    return n;
  }
  /**
   * The immediate `DebugElement` children. Walk the tree by descending through `children`.
   */
  get children() {
    const e = this.nativeElement;
    if (!e)
      return [];
    const n = e.children, o = [];
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      o.push(bi(i));
    }
    return o;
  }
  /**
   * @returns the first `DebugElement` that matches the predicate at any depth in the subtree.
   */
  query(e) {
    return this.queryAll(e)[0] || null;
  }
  /**
   * @returns All `DebugElement` matches for the predicate at any depth in the subtree.
   */
  queryAll(e) {
    const n = [];
    return dy(this, e, n, !0), n;
  }
  /**
   * @returns All `DebugNode` matches for the predicate at any depth in the subtree.
   */
  queryAllNodes(e) {
    const n = [];
    return dy(this, e, n, !1), n;
  }
  /**
   * Triggers the event by its name if there is a corresponding listener in the element's
   * `listeners` collection.
   *
   * If the event lacks a listener or there's some other problem, consider
   * calling `nativeElement.dispatchEvent(eventObject)`.
   *
   * @param eventName The name of the event to trigger
   * @param eventObj The _event object_ expected by the handler
   *
   * @see [Testing components scenarios](guide/testing-components-scenarios#trigger-event-handler)
   */
  triggerEventHandler(e, n) {
    const o = this.nativeNode, r = [];
    this.listeners.forEach((i) => {
      if (i.name === e) {
        const s = i.callback;
        s.call(o, n), r.push(s);
      }
    }), typeof o.eventListeners == "function" && o.eventListeners(e).forEach((i) => {
      if (i.toString().indexOf("__ngUnwrap__") !== -1) {
        const s = i("__ngUnwrap__");
        return r.indexOf(s) === -1 && s.call(o, n);
      }
    });
  }
}
function yk(t, e) {
  if (t) {
    let n = Object.getPrototypeOf(t);
    const o = Node.prototype;
    for (; n !== null && n !== o; ) {
      const r = Object.getOwnPropertyDescriptors(n);
      for (let i in r)
        if (!i.startsWith("__") && !i.startsWith("on")) {
          const s = t[i];
          vk(s) && (e[i] = s);
        }
      n = Object.getPrototypeOf(n);
    }
  }
}
function vk(t) {
  return typeof t == "string" || typeof t == "boolean" || typeof t == "number" || t === null;
}
function dy(t, e, n, o) {
  const r = at(t.nativeNode), i = r ? r.lView : null;
  if (i !== null) {
    const s = i[E].data[r.nodeIndex];
    lo(s, i, e, n, o, t.nativeNode);
  } else
    mg(t.nativeNode, e, n, o);
}
function lo(t, e, n, o, r, i) {
  ngDevMode && tt(t, e);
  const s = UM(t, e);
  if (t.type & 11) {
    if (Xu(s, n, o, r, i), eo(t)) {
      const l = vt(t.index, e);
      l && l[E].firstChild && lo(l[E].firstChild, l, n, o, r, i);
    } else
      t.child && lo(t.child, e, n, o, r, i), s && mg(s, n, o, r);
    const a = e[t.index];
    Pe(a) && fy(a, n, o, r, i);
  } else if (t.type & 4) {
    const a = e[t.index];
    Xu(a[Jt], n, o, r, i), fy(a, n, o, r, i);
  } else if (t.type & 16) {
    const a = e[ge], c = a[Ue].projection[t.projection];
    if (Array.isArray(c))
      for (let u of c)
        Xu(u, n, o, r, i);
    else if (c) {
      const u = a[Ce], d = u[E].data[c.index];
      lo(d, u, n, o, r, i);
    }
  } else
    t.child && lo(t.child, e, n, o, r, i);
  if (i !== s) {
    const a = t.flags & 2 ? t.projectionNext : t.next;
    a && lo(a, e, n, o, r, i);
  }
}
function fy(t, e, n, o, r) {
  for (let i = ue; i < t.length; i++) {
    const s = t[i], a = s[E].firstChild;
    a && lo(a, s, e, n, o, r);
  }
}
function Xu(t, e, n, o, r) {
  if (r !== t) {
    const i = bi(t);
    if (!i)
      return;
    (o && i instanceof Ua && e(i) && n.indexOf(i) === -1 || !o && e(i) && n.indexOf(i) === -1) && n.push(i);
  }
}
function mg(t, e, n, o) {
  const r = t.childNodes, i = r.length;
  for (let s = 0; s < i; s++) {
    const a = r[s], l = bi(a);
    l && ((o && l instanceof Ua && e(l) && n.indexOf(l) === -1 || !o && e(l) && n.indexOf(l) === -1) && n.push(l), mg(a, e, n, o));
  }
}
function Dk(t, e, n, o) {
  let r = e.propertyBindings;
  if (r !== null)
    for (let i = 0; i < r.length; i++) {
      const s = r[i], l = o[s].split(ui), c = l[0];
      if (l.length > 1) {
        let u = l[1];
        for (let d = 1; d < l.length - 1; d++)
          u += L(n[s + d - 1]) + l[d + 1];
        t[c] = u;
      } else
        t[c] = n[s];
    }
}
const Ju = "__ng_debug__";
function bi(t) {
  return t instanceof Node ? (t.hasOwnProperty(Ju) || (t[Ju] = t.nodeType == Node.ELEMENT_NODE ? new Ua(t) : new gg(t)), t[Ju]) : null;
}
const Ck = a0(null, "core", []), Eo = class Eo {
  // Inject ApplicationRef to make it eager...
  constructor(e) {
  }
};
Eo.ɵfac = function(n) {
  return new (n || Eo)(Re(Nt));
}, Eo.ɵmod = /* @__PURE__ */ Uf({ type: Eo }), Eo.ɵinj = /* @__PURE__ */ Ic({});
let ec = Eo;
(typeof ngDevMode > "u" || ngDevMode) && ot(ec, [{
  type: lg
}], () => [{ type: Nt }], null);
function bk(t) {
}
const Ek = 200, hy = 1200, Io = class Io {
  constructor() {
    this.window = null, this.observer = null, this.options = A(mh), this.ngZone = A(ae);
  }
  start() {
    var o, r;
    if (typeof PerformanceObserver > "u" || (o = this.options) != null && o.disableImageSizeWarning && ((r = this.options) != null && r.disableImageLazyLoadWarning))
      return;
    this.observer = this.initPerformanceObserver();
    const e = Hn(), n = e.defaultView;
    if (typeof n < "u") {
      this.window = n;
      const i = () => {
        setTimeout(this.scanImages.bind(this), Ek);
      };
      this.ngZone.runOutsideAngular(() => {
        var s;
        e.readyState === "complete" ? i() : (s = this.window) == null || s.addEventListener("load", i, { once: !0 });
      });
    }
  }
  ngOnDestroy() {
    var e;
    (e = this.observer) == null || e.disconnect();
  }
  initPerformanceObserver() {
    if (typeof PerformanceObserver > "u")
      return null;
    const e = new PerformanceObserver((n) => {
      var s;
      const o = n.getEntries();
      if (o.length === 0)
        return;
      const i = ((s = o[o.length - 1].element) == null ? void 0 : s.src) ?? "";
      i.startsWith("data:") || i.startsWith("blob:") || (this.lcpImageUrl = i);
    });
    return e.observe({ type: "largest-contentful-paint", buffered: !0 }), e;
  }
  scanImages() {
    var r;
    const e = Hn().querySelectorAll("img");
    let n, o = !1;
    e.forEach((i) => {
      var s, a;
      if (!((s = this.options) != null && s.disableImageSizeWarning))
        for (const l of e)
          !l.getAttribute("ng-img") && this.isOversized(l) && Sk(l.src);
      !((a = this.options) != null && a.disableImageLazyLoadWarning) && this.lcpImageUrl && i.src === this.lcpImageUrl && (n = !0, (i.loading !== "lazy" || i.getAttribute("ng-img")) && (o = !0));
    }), n && !o && this.lcpImageUrl && !((r = this.options) != null && r.disableImageLazyLoadWarning) && Ik(this.lcpImageUrl);
  }
  isOversized(e) {
    if (!this.window)
      return !1;
    const n = this.window.getComputedStyle(e);
    let o = parseFloat(n.getPropertyValue("width")), r = parseFloat(n.getPropertyValue("height"));
    const i = n.getPropertyValue("box-sizing");
    if (n.getPropertyValue("object-fit") === "cover")
      return !1;
    if (i === "border-box") {
      const h = n.getPropertyValue("padding-top"), p = n.getPropertyValue("padding-right"), g = n.getPropertyValue("padding-bottom"), y = n.getPropertyValue("padding-left");
      o -= parseFloat(p) + parseFloat(y), r -= parseFloat(h) + parseFloat(g);
    }
    const a = e.naturalWidth, l = e.naturalHeight, c = this.window.devicePixelRatio * o, u = this.window.devicePixelRatio * r, d = a - c >= hy, f = l - u >= hy;
    return d || f;
  }
};
Io.ɵfac = function(n) {
  return new (n || Io)();
}, Io.ɵprov = /* @__PURE__ */ oe({ token: Io, factory: Io.ɵfac, providedIn: "root" });
let tc = Io;
(typeof ngDevMode > "u" || ngDevMode) && ot(tc, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
function Ik(t) {
  console.warn(ve(-913, `An image with src ${t} is the Largest Contentful Paint (LCP) element but was given a "loading" value of "lazy", which can negatively impact application loading performance. This warning can be addressed by changing the loading value of the LCP image to "eager", or by using the NgOptimizedImage directive's prioritization utilities. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
function Sk(t) {
  console.warn(ve(-913, `An image with src ${t} has intrinsic file dimensions much larger than its rendered size. This can negatively impact application loading performance. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
function wk(t) {
  try {
    const { rootComponent: e, appProviders: n, platformProviders: o } = t;
    (typeof ngDevMode > "u" || ngDevMode) && e !== void 0 && X_(e);
    const r = ck(o), i = [
      r0(),
      ...n || []
    ], a = new UI({
      providers: i,
      parent: r,
      debugName: typeof ngDevMode > "u" || ngDevMode ? "Environment Injector" : "",
      // We skip environment initializers because we need to run them inside the NgZone, which
      // happens after we get the NgZone instance from the Injector.
      runEnvironmentInitializers: !1
    }).injector, l = a.get(ae);
    return l.run(() => {
      a.resolveInjectorInitializers();
      const c = a.get(oo, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && !c)
        throw new b(402, "No `ErrorHandler` found in the Dependency Injection tree.");
      let u;
      l.runOutsideAngular(() => {
        u = l.onError.subscribe({
          next: (h) => {
            c.handleError(h);
          }
        });
      });
      const d = () => a.destroy(), f = r.get(hg);
      return f.add(d), a.onDestroy(() => {
        u.unsubscribe(), f.delete(d);
      }), JS(c, l, () => {
        const h = a.get(lr);
        return h.runInitializers(), h.donePromise.then(() => {
          const p = a.get(qe, sr);
          Cp(p || sr);
          const g = a.get(Nt);
          return e !== void 0 && g.bootstrap(e), (typeof ngDevMode > "u" || ngDevMode) && a.get(tc).start(), g;
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
const So = class So {
  constructor() {
    this.appRef = A(Nt), this.taskService = A(ar), this.pendingRenderTaskId = null;
  }
  notify() {
    this.pendingRenderTaskId === null && (this.pendingRenderTaskId = this.taskService.add(), setTimeout(() => {
      try {
        this.appRef.destroyed || this.appRef.tick();
      } finally {
        const e = this.pendingRenderTaskId;
        this.pendingRenderTaskId = null, this.taskService.remove(e);
      }
    }));
  }
};
So.ɵfac = function(n) {
  return new (n || So)();
}, So.ɵprov = /* @__PURE__ */ oe({ token: So, factory: So.ɵfac, providedIn: "root" });
let nc = So;
(typeof ngDevMode > "u" || ngDevMode) && ot(nc, [{
  type: le,
  args: [{ providedIn: "root" }]
}], null, null);
function Mk() {
  return Fc([
    { provide: xh, useExisting: nc },
    { provide: ae, useClass: Zh }
  ]);
}
function bf(t, e) {
  const n = t[E];
  for (let o = T; o < n.bindingStartIndex; o++)
    if (Pe(t[o])) {
      const r = t[o];
      if (!(o === n.bindingStartIndex - 1)) {
        const s = n.data[o], a = Tt(n, s);
        if (Xx(a)) {
          e.push({ lContainer: r, lView: t, tNode: s, tDetails: a });
          continue;
        }
      }
      for (let s = ue; s < r.length; s++)
        bf(r[s], e);
    } else
      je(t[o]) && bf(t[o], e);
}
class Ak {
  constructor() {
    this.views = [], this.indexByContent = /* @__PURE__ */ new Map();
  }
  add(e) {
    const n = JSON.stringify(e);
    if (!this.indexByContent.has(n)) {
      const o = this.views.length;
      return this.views.push(e), this.indexByContent.set(n, o), o;
    }
    return this.indexByContent.get(n);
  }
  getAll() {
    return this.views;
  }
}
let _k = 0;
function h0(t) {
  return t.ssrId || (t.ssrId = `t${_k++}`), t.ssrId;
}
function p0(t, e, n) {
  const o = [];
  return ia(t, e, n, o), o.length;
}
function Tk(t) {
  const e = [];
  return VC(t, e), e.length;
}
function g0(t, e) {
  const n = t[pe];
  return n && !n.hasAttribute(oa) ? rc(n, t, e) : null;
}
function m0(t, e) {
  const n = Qf(t[pe]), o = g0(n, e), r = se(n[pe]), i = t[Ce], s = rc(r, i, e), a = n[B], l = `${o}|${s}`;
  a.setAttribute(r, Os, l);
}
function xk(t, e) {
  const n = new Ak(), o = /* @__PURE__ */ new Map(), r = t._views;
  for (const a of r) {
    const l = kC(a);
    if (l !== null) {
      const c = {
        serializedViewCollection: n,
        corruptedTextNodes: o
      };
      Pe(l) ? m0(l, c) : g0(l, c), kk(o, e);
    }
  }
  const i = n.getAll();
  t.injector.get(Ko).set(Rh, i);
}
function Ok(t, e) {
  const n = [];
  let o = "";
  for (let r = ue; r < t.length; r++) {
    let i = t[r], s, a, l;
    if (zf(i) && (i = i[T], Pe(i))) {
      a = Tk(i) + 1, m0(i, e);
      const u = Qf(i[pe]);
      l = {
        [Vd]: u[E].ssrId,
        [fi]: a
      };
    }
    if (!l) {
      const u = i[E];
      u.type === 1 ? (s = u.ssrId, a = 1) : (s = h0(u), a = p0(u, i, u.firstChild)), l = {
        [Vd]: s,
        [fi]: a,
        ...y0(t[r], e)
      };
    }
    const c = JSON.stringify(l);
    if (n.length > 0 && c === o) {
      const u = n[n.length - 1];
      u[Sr] ?? (u[Sr] = 1), u[Sr]++;
    } else
      o = c, n.push(l);
  }
  return n;
}
function oc(t, e, n) {
  const o = e.index - T;
  t[Es] ?? (t[Es] = {}), t[Es][o] = kx(e, n);
}
function py(t, e) {
  const n = e.index - T;
  t[yr] ?? (t[yr] = []), t[yr].includes(n) || t[yr].push(n);
}
function y0(t, e) {
  var r;
  const n = {}, o = t[E];
  for (let i = T; i < o.bindingStartIndex; i++) {
    const s = o.data[i], a = i - T;
    if (l1(s)) {
      if (aa(s, t) && Pk(s)) {
        py(n, s);
        continue;
      }
      if (Array.isArray(s.projection)) {
        for (const l of s.projection)
          if (l)
            if (!Array.isArray(l))
              !FM(l) && !Ll(l) && (aa(l, t) ? py(n, l) : oc(n, l, t));
            else
              throw Dx(se(t[i]));
      }
      if (Fk(n, s, t), Pe(t[i])) {
        const l = s.tView;
        l !== null && (n[bs] ?? (n[bs] = {}), n[bs][a] = h0(l));
        const c = t[i][pe];
        if (Array.isArray(c)) {
          const u = se(c);
          u.hasAttribute(oa) || rc(u, c, e);
        }
        n[Lo] ?? (n[Lo] = {}), n[Lo][a] = Ok(t[i], e);
      } else if (Array.isArray(t[i])) {
        const l = se(t[i][pe]);
        l.hasAttribute(oa) || rc(l, t[i], e);
      } else if (s.type & 8)
        n[Cs] ?? (n[Cs] = {}), n[Cs][a] = p0(o, t, s.child);
      else if (s.type & 16) {
        let l = s.next;
        for (; l !== null && l.type & 16; )
          l = l.next;
        l && !Ll(l) && oc(n, l, t);
      } else if (s.type & 1) {
        const l = se(t[i]);
        l.textContent === "" ? e.corruptedTextNodes.set(
          l,
          "ngetn"
          /* TextNodeMarker.EmptyNode */
        ) : ((r = l.nextSibling) == null ? void 0 : r.nodeType) === Node.TEXT_NODE && e.corruptedTextNodes.set(
          l,
          "ngtns"
          /* TextNodeMarker.Separator */
        );
      }
    }
  }
  return n;
}
function Fk(t, e, n) {
  e.projectionNext && e.projectionNext !== e.next && !Ll(e.projectionNext) && oc(t, e.projectionNext, n), e.prev === null && e.parent !== null && aa(e.parent, n) && !aa(e, n) && oc(t, e, n);
}
function Rk(t) {
  var n;
  const e = t[re];
  return e != null && e.constructor ? ((n = H(e.constructor)) == null ? void 0 : n.encapsulation) === Xt.ShadowDom : !1;
}
function rc(t, e, n) {
  const o = e[B];
  if (RM(e) || Rk(e))
    return o.setAttribute(t, oa, ""), null;
  {
    const r = y0(e, n), i = n.serializedViewCollection.add(r);
    return o.setAttribute(t, Os, i.toString()), i;
  }
}
function kk(t, e) {
  for (const [n, o] of t)
    n.after(e.createComment(o));
}
function Pk(t) {
  let e = t;
  for (; e != null; ) {
    if (eo(e))
      return !0;
    e = e.parent;
  }
  return !1;
}
let gy = !1;
const Nk = 1e4;
function Lk() {
  gy || (gy = !0, D_(), kO(), ZF(), LO(), zx(), Ux(), Lx(), aT());
}
function $k(t) {
  const e = t.get(zn), n = `Angular hydrated ${ngDevMode.hydratedComponents} component(s) and ${ngDevMode.hydratedNodes} node(s), ${ngDevMode.componentsSkippedHydration} component(s) were skipped. Learn more at https://angular.io/guide/hydration.`;
  e.log(n);
}
function Bk(t, e) {
  const n = t0(t);
  if (typeof ngDevMode < "u" && ngDevMode) {
    const o = Nk, r = e.get(zn), s = e.get(ae).runOutsideAngular(() => setTimeout(() => Hk(o, r), o));
    n.finally(() => clearTimeout(s));
  }
  return n;
}
function jk() {
  return Fc([
    {
      provide: Is,
      useFactory: () => {
        let t = !0;
        if (kn()) {
          const e = A(Ko, { optional: !0 });
          if (t = !!(e != null && e.get(Rh, null)), !t && typeof ngDevMode < "u" && ngDevMode) {
            const n = A(zn), o = ve(-505, "Angular hydration was requested on the client, but there was no serialized information present in the server response, thus hydration was not enabled. Make sure the `provideClientHydration()` is included into the list of providers in the server part of the application configuration.");
            n.warn(o);
          }
        }
        return t && Tn("NgHydration"), t;
      }
    },
    {
      provide: qo,
      useValue: () => {
        kn() && A(Is) && (Vk(), Lk());
      },
      multi: !0
    },
    {
      provide: ZC,
      useFactory: () => kn() && A(Is)
    },
    {
      provide: dg,
      useFactory: () => {
        if (kn() && A(Is)) {
          const t = A(Nt), e = A(Ve);
          return () => {
            Bk(t, e).then(() => {
              ae.assertInAngularZone(), Mx(t), typeof ngDevMode < "u" && ngDevMode && $k(e);
            });
          };
        }
        return () => {
        };
      },
      multi: !0
    }
  ]);
}
function Hk(t, e) {
  const n = `Angular hydration expected the ApplicationRef.isStable() to emit \`true\`, but it didn't happen within ${t}ms. Angular hydration logic depends on the application becoming stable as a signal to complete hydration process.`;
  e.warn(ve(-506, n));
}
function Vk() {
  var n;
  const t = Hn();
  let e;
  for (const o of t.body.childNodes)
    if (o.nodeType === Node.COMMENT_NODE && ((n = o.textContent) == null ? void 0 : n.trim()) === FC) {
      e = o;
      break;
    }
  if (!e)
    throw new b(-507, typeof ngDevMode < "u" && ngDevMode && "Angular hydration logic detected that HTML content of this page was modified after it was produced during server side rendering. Make sure that there are no optimizations that remove comment nodes from HTML enabled on your CDN. Angular hydration relies on HTML produced by the server, including whitespaces and comment nodes.");
}
function Bo(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false";
}
function ua(t, e = NaN) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e;
}
function bt(t) {
  return Te({ usage: 1, kind: "directive", type: t.type }).compileDirectiveDeclaration(Xe, `ng:///${t.type.name}/ɵfac.js`, t);
}
function V(t) {
  ot(t.type, t.decorators, t.ctorParameters ?? null, t.propDecorators ?? null);
}
function Uk(t) {
  return Te({ usage: 1, kind: "component", type: t.type }).compileComponentDeclaration(Xe, `ng:///${t.type.name}/ɵcmp.js`, t);
}
function U(t) {
  return Te({
    usage: 1,
    kind: Gk(t.target),
    type: t.type
  }).compileFactoryDeclaration(Xe, `ng:///${t.type.name}/ɵfac.js`, t);
}
function Gk(t) {
  switch (t) {
    case $.Directive:
      return "directive";
    case $.Component:
      return "component";
    case $.Injectable:
      return "injectable";
    case $.Pipe:
      return "pipe";
    case $.NgModule:
      return "NgModule";
  }
}
function xt(t) {
  return Te({ usage: 1, kind: "injectable", type: t.type }).compileInjectableDeclaration(Xe, `ng:///${t.type.name}/ɵprov.js`, t);
}
function v0(t) {
  return Te({ usage: 1, kind: "NgModule", type: t.type }).compileInjectorDeclaration(Xe, `ng:///${t.type.name}/ɵinj.js`, t);
}
function D0(t) {
  return Te({ usage: 1, kind: "NgModule", type: t.type }).compileNgModuleDeclaration(Xe, `ng:///${t.type.name}/ɵmod.js`, t);
}
function ft(t) {
  return Te({ usage: 1, kind: "pipe", type: t.type }).compilePipeDeclaration(Xe, `ng:///${t.type.name}/ɵpipe.js`, t);
}
function C0(t, e) {
  ngDevMode && QC(t);
  const n = H(t), o = e.elementInjector || kc();
  return new rs(n).create(o, e.projectableNodes, e.hostElement, e.environmentInjector);
}
function Wk(t) {
  const e = H(t);
  if (!e)
    return null;
  const n = new rs(e);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return e.standalone;
    },
    get isSignal() {
      return e.signals;
    }
  };
}
function zk(...t) {
  return t.reduce((e, n) => Object.assign(e, n, { providers: [...e.providers, ...n.providers] }), { providers: [] });
}
typeof ngDevMode < "u" && ngDevMode && (xe.$localize ?? (xe.$localize = function() {
  throw new Error("It looks like your application or one of its dependencies is using i18n.\nAngular 9 introduced a global `$localize()` function that needs to be loaded.\nPlease run `ng add @angular/localize` from the Angular CLI.\n(For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file.\nFor server-side rendering applications add the import to your `main.server.ts` file.)");
}));
const C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANIMATION_MODULE_TYPE: nA,
  APP_BOOTSTRAP_LISTENER: dg,
  APP_ID: BD,
  APP_INITIALIZER: YS,
  get AfterRenderPhase() {
    return mn;
  },
  ApplicationInitStatus: lr,
  ApplicationModule: ec,
  ApplicationRef: Nt,
  Attribute: lh,
  COMPILER_OPTIONS: US,
  CSP_NONCE: oA,
  CUSTOM_ELEMENTS_SCHEMA: WD,
  get ChangeDetectionStrategy() {
    return Bn;
  },
  ChangeDetectorRef: tr,
  Compiler: Ql,
  CompilerFactory: xR,
  Component: HS,
  ComponentFactory: $l,
  ComponentFactoryResolver: Jo,
  ComponentRef: NC,
  ContentChild: E1,
  ContentChildren: b1,
  DEFAULT_CURRENCY_CODE: fg,
  DebugElement: Ua,
  DebugEventListener: gk,
  DebugNode: gg,
  DefaultIterableDiffer: jC,
  DestroyRef: nr,
  Directive: ut,
  ENVIRONMENT_INITIALIZER: qo,
  ElementRef: Mt,
  EmbeddedViewRef: pk,
  EnvironmentInjector: on,
  ErrorHandler: oo,
  EventEmitter: Et,
  Host: Aa,
  HostBinding: AR,
  HostListener: _R,
  INJECTOR: uh,
  Inject: mt,
  get InjectFlags() {
    return z;
  },
  Injectable: le,
  InjectionToken: j,
  Injector: Ve,
  Input: W,
  IterableDiffers: er,
  KeyValueDiffers: In,
  LOCALE_ID: qe,
  get MissingTranslationStrategy() {
    return Cf;
  },
  ModuleWithComponentFactories: VS,
  NO_ERRORS_SCHEMA: zD,
  NgModule: lg,
  NgModuleFactory: VI,
  NgModuleRef: Wn,
  NgProbeToken: ok,
  NgZone: ae,
  Optional: nn,
  Output: Ht,
  PACKAGE_ROOT_URL: tA,
  PLATFORM_ID: _a,
  PLATFORM_INITIALIZER: jD,
  Pipe: dt,
  PlatformRef: Ci,
  Query: wa,
  QueryList: yu,
  Renderer2: Un,
  RendererFactory2: LC,
  get RendererStyleFlags2() {
    return di;
  },
  Sanitizer: Bl,
  get SecurityContext() {
    return Vn;
  },
  Self: MD,
  SimpleChange: Rv,
  SkipSelf: Tc,
  TRANSLATIONS: sk,
  TRANSLATIONS_FORMAT: ak,
  TemplateRef: ke,
  Testability: Kl,
  TestabilityRegistry: Di,
  TransferState: Ko,
  Type: ED,
  VERSION: TR,
  Version: cg,
  ViewChild: S1,
  ViewChildren: I1,
  ViewContainerRef: Me,
  get ViewEncapsulation() {
    return Xt;
  },
  ViewRef: f0,
  afterNextRender: mb,
  afterRender: Xd,
  asNativeElements: mk,
  assertInInjectionContext: Pc,
  assertNotInReactiveContext: qh,
  assertPlatform: c0,
  booleanAttribute: Bo,
  computed: x_,
  createComponent: C0,
  createEnvironmentInjector: GI,
  createNgModule: og,
  createNgModuleRef: eR,
  createPlatform: s0,
  createPlatformFactory: a0,
  defineInjectable: oM,
  destroyPlatform: lk,
  effect: Zd,
  enableProdMode: dk,
  forwardRef: Dc,
  getDebugNode: bi,
  getModuleFactory: fk,
  getNgModuleById: hk,
  getPlatform: Iu,
  importProvidersFrom: OD,
  inject: A,
  input: Yw,
  isDevMode: uk,
  isSignal: $C,
  isStandalone: Nn,
  makeEnvironmentProviders: Fc,
  makeStateKey: p_,
  mergeApplicationConfig: zk,
  numberAttribute: ua,
  platformCore: Ck,
  provideZoneChangeDetection: r0,
  reflectComponentType: Wk,
  resolveForwardRef: k,
  runInInjectionContext: z1,
  setTestabilityGetter: qS,
  signal: O_,
  untracked: Gd,
  ɵALLOW_MULTIPLE_PLATFORMS: pg,
  ɵAfterRenderEventManager: Gn,
  ɵCONTAINER_HEADER_OFFSET: ue,
  ɵChangeDetectionScheduler: xh,
  ɵComponentFactory: $l,
  ɵConsole: zn,
  ɵDEFAULT_LOCALE_ID: sr,
  ɵDEFER_BLOCK_CONFIG: Xb,
  ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR: Kb,
  get ɵDeferBlockBehavior() {
    return Gl;
  },
  get ɵDeferBlockState() {
    return de;
  },
  ɵEffectScheduler: Hl,
  ɵIMAGE_CONFIG: mh,
  ɵIMAGE_CONFIG_DEFAULTS: gh,
  ɵINJECTOR_SCOPE: hh,
  ɵINPUT_SIGNAL_BRAND_WRITE_TYPE: zw,
  ɵIS_HYDRATION_DOM_REUSE_ENABLED: Is,
  ɵLContext: XD,
  ɵLifecycleHooksFeature: bb,
  get ɵLocaleDataIndex() {
    return ne;
  },
  ɵNG_COMP_DEF: Wi,
  ɵNG_DIR_DEF: bc,
  ɵNG_ELEMENT_ID: Xr,
  ɵNG_INJ_DEF: Sl,
  ɵNG_MOD_DEF: Nf,
  ɵNG_PIPE_DEF: Ec,
  ɵNG_PROV_DEF: qs,
  ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR: gl,
  ɵNO_CHANGE: F,
  ɵNgModuleFactory: bu,
  ɵNoopNgZone: Zh,
  ɵPendingTasks: ar,
  ɵReflectionCapabilities: wD,
  ɵRender3ComponentFactory: rs,
  ɵRender3ComponentRef: Cb,
  ɵRender3NgModuleRef: Cu,
  ɵRuntimeError: b,
  ɵSSR_CONTENT_INTEGRITY_MARKER: FC,
  ɵTESTABILITY: zS,
  ɵTESTABILITY_GETTER: ug,
  ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT: rA,
  ɵViewRef: hi,
  ɵXSS_SECURITY_URL: ur,
  ɵ_sanitizeHtml: wC,
  ɵ_sanitizeUrl: zc,
  ɵallowSanitizationBypassAndThrow: es,
  ɵannotateForHydration: xk,
  ɵbypassSanitizationTrustHtml: zA,
  ɵbypassSanitizationTrustResourceUrl: QA,
  ɵbypassSanitizationTrustScript: YA,
  ɵbypassSanitizationTrustStyle: qA,
  ɵbypassSanitizationTrustUrl: ZA,
  ɵclearResolutionOfComponentResourcesQueue: xD,
  ɵcompileComponent: OS,
  ɵcompileDirective: ag,
  ɵcompileNgModule: AS,
  ɵcompileNgModuleDefs: _S,
  ɵcompileNgModuleFactory: ZS,
  ɵcompilePipe: jS,
  ɵconvertToBitFlags: ma,
  ɵcreateInjector: Od,
  ɵdefaultIterableDiffers: NT,
  ɵdefaultKeyValueDiffers: LT,
  ɵdepsTracker: Zo,
  ɵdevModeEqual: Lh,
  ɵfindLocaleData: ze,
  ɵflushModuleScopingQueueAsMuchAsPossible: wS,
  ɵformatRuntimeError: ve,
  ɵgenerateStandaloneInDeclarationsError: TS,
  ɵgetAsyncClassMetadataFn: aR,
  ɵgetDebugNode: bi,
  ɵgetDeferBlocks: bf,
  ɵgetDirectives: XI,
  ɵgetEnsureDirtyViewsAreAlwaysReachable: Hv,
  ɵgetHostElement: JI,
  ɵgetInjectableDef: ga,
  ɵgetLContext: at,
  ɵgetLocaleCurrencyCode: HO,
  ɵgetLocalePluralCase: Dp,
  ɵgetSanitizationBypassType: DC,
  ɵgetUnknownElementStrictMode: cA,
  ɵgetUnknownPropertyStrictMode: dA,
  ɵglobal: xe,
  ɵinjectChangeDetectorRef: pb,
  ɵinternalAfterNextRender: Kd,
  ɵinternalCreateApplication: wk,
  ɵisBoundToModule: XS,
  ɵisComponentDefPendingResolution: k1,
  ɵisEnvironmentProviders: pa,
  ɵisInjectable: rM,
  ɵisNgModule: ao,
  ɵisPromise: pu,
  ɵisSubscribable: gu,
  ɵnoSideEffects: sn,
  ɵpatchComponentDefWithScope: ig,
  ɵperformanceMarkFeature: Tn,
  ɵprovideZonelessChangeDetection: Mk,
  ɵregisterLocaleData: jO,
  ɵrenderDeferBlockState: yn,
  ɵresetCompiledComponents: yR,
  ɵresetJitOptions: pR,
  ɵresolveComponentResources: _D,
  ɵrestoreComponentResolutionQueue: P1,
  ɵsetAllowDuplicateNgModuleIdsForTest: aA,
  ɵsetAlternateWeakRefImpl: bk,
  ɵsetClassDebugInfo: SS,
  ɵsetClassMetadata: ot,
  ɵsetClassMetadataAsync: lR,
  ɵsetCurrentInjector: pn,
  ɵsetDocument: J1,
  ɵsetEnsureDirtyViewsAreAlwaysReachable: VM,
  ɵsetInjectorProfilerContext: Qe,
  ɵsetLocaleId: Cp,
  ɵsetUnknownElementStrictMode: lA,
  ɵsetUnknownPropertyStrictMode: uA,
  ɵstore: AI,
  ɵstringify: Y,
  ɵtransitiveScopesFor: sg,
  ɵtriggerResourceLoading: iu,
  ɵtruncateMiddle: Qw,
  ɵunregisterLocaleData: VO,
  ɵunwrapSafeValue: cn,
  ɵwhenStable: t0,
  ɵwithDomHydration: jk,
  ɵɵCopyDefinitionFeature: Ib,
  get ɵɵFactoryTarget() {
    return $;
  },
  ɵɵHostDirectivesFeature: Sb,
  ɵɵInheritDefinitionFeature: Kh,
  get ɵɵInputFlags() {
    return En;
  },
  ɵɵInputTransformsFeature: Mb,
  ɵɵNgOnChangesFeature: Zf,
  ɵɵProvidersFeature: HI,
  ɵɵStandaloneFeature: WI,
  ɵɵadvance: KC,
  ɵɵattribute: np,
  ɵɵattributeInterpolate1: op,
  ɵɵattributeInterpolate2: rp,
  ɵɵattributeInterpolate3: ip,
  ɵɵattributeInterpolate4: sp,
  ɵɵattributeInterpolate5: ap,
  ɵɵattributeInterpolate6: lp,
  ɵɵattributeInterpolate7: cp,
  ɵɵattributeInterpolate8: up,
  ɵɵattributeInterpolateV: dp,
  ɵɵclassMap: SE,
  ɵɵclassMapInterpolate1: xE,
  ɵɵclassMapInterpolate2: OE,
  ɵɵclassMapInterpolate3: FE,
  ɵɵclassMapInterpolate4: RE,
  ɵɵclassMapInterpolate5: kE,
  ɵɵclassMapInterpolate6: PE,
  ɵɵclassMapInterpolate7: NE,
  ɵɵclassMapInterpolate8: LE,
  ɵɵclassMapInterpolateV: $E,
  ɵɵclassProp: pp,
  ɵɵcomponentInstance: BE,
  ɵɵconditional: jE,
  ɵɵcontentQuery: II,
  ɵɵdefer: tE,
  ɵɵdeferEnableTimerScheduling: eE,
  ɵɵdeferOnHover: uE,
  ɵɵdeferOnIdle: rE,
  ɵɵdeferOnImmediate: sE,
  ɵɵdeferOnInteraction: fE,
  ɵɵdeferOnTimer: lE,
  ɵɵdeferOnViewport: pE,
  ɵɵdeferPrefetchOnHover: dE,
  ɵɵdeferPrefetchOnIdle: iE,
  ɵɵdeferPrefetchOnImmediate: aE,
  ɵɵdeferPrefetchOnInteraction: hE,
  ɵɵdeferPrefetchOnTimer: cE,
  ɵɵdeferPrefetchOnViewport: gE,
  ɵɵdeferPrefetchWhen: oE,
  ɵɵdeferWhen: nE,
  ɵɵdefineComponent: bv,
  ɵɵdefineDirective: Ev,
  ɵɵdefineInjectable: oe,
  ɵɵdefineInjector: Ic,
  ɵɵdefineNgModule: Uf,
  ɵɵdefinePipe: Iv,
  ɵɵdirectiveInject: pr,
  ɵɵdisableBindings: Yv,
  ɵɵelement: gp,
  ɵɵelementContainer: mp,
  ɵɵelementContainerEnd: cu,
  ɵɵelementContainerStart: lu,
  ɵɵelementEnd: au,
  ɵɵelementStart: su,
  ɵɵenableBindings: qv,
  ɵɵgetComponentDepsFactory: IS,
  ɵɵgetCurrentView: qE,
  ɵɵgetInheritedFactory: DD,
  ɵɵhostProperty: yp,
  ɵɵi18n: uI,
  ɵɵi18nApply: fI,
  ɵɵi18nAttributes: dI,
  ɵɵi18nEnd: Ep,
  ɵɵi18nExp: Ip,
  ɵɵi18nPostprocess: hI,
  ɵɵi18nStart: bp,
  ɵɵinject: Re,
  ɵɵinjectAttribute: sh,
  ɵɵinvalidFactory: JC,
  ɵɵinvalidFactoryDep: Vf,
  ɵɵlistener: Sp,
  ɵɵloadQuery: MI,
  ɵɵnamespaceHTML: lD,
  ɵɵnamespaceMathML: aD,
  ɵɵnamespaceSVG: sD,
  ɵɵnextContext: gI,
  ɵɵngDeclareClassMetadata: V,
  ɵɵngDeclareComponent: Uk,
  ɵɵngDeclareDirective: bt,
  ɵɵngDeclareFactory: U,
  ɵɵngDeclareInjectable: xt,
  ɵɵngDeclareInjector: v0,
  ɵɵngDeclareNgModule: D0,
  ɵɵngDeclarePipe: ft,
  ɵɵpipe: mS,
  ɵɵpipeBind1: yS,
  ɵɵpipeBind2: vS,
  ɵɵpipeBind3: DS,
  ɵɵpipeBind4: CS,
  ɵɵpipeBindV: bS,
  ɵɵprojection: yI,
  ɵɵprojectionDef: mI,
  ɵɵproperty: fp,
  ɵɵpropertyInterpolate: Mp,
  ɵɵpropertyInterpolate1: mu,
  ɵɵpropertyInterpolate2: Ap,
  ɵɵpropertyInterpolate3: _p,
  ɵɵpropertyInterpolate4: Tp,
  ɵɵpropertyInterpolate5: xp,
  ɵɵpropertyInterpolate6: Op,
  ɵɵpropertyInterpolate7: Fp,
  ɵɵpropertyInterpolate8: Rp,
  ɵɵpropertyInterpolateV: kp,
  ɵɵpureFunction0: tS,
  ɵɵpureFunction1: nS,
  ɵɵpureFunction2: oS,
  ɵɵpureFunction3: rS,
  ɵɵpureFunction4: iS,
  ɵɵpureFunction5: sS,
  ɵɵpureFunction6: aS,
  ɵɵpureFunction7: lS,
  ɵɵpureFunction8: cS,
  ɵɵpureFunctionV: uS,
  ɵɵqueryRefresh: wI,
  ɵɵreference: _I,
  ɵɵregisterNgModuleType: vh,
  ɵɵrepeater: GE,
  ɵɵrepeaterCreate: UE,
  ɵɵrepeaterTrackByIdentity: VE,
  ɵɵrepeaterTrackByIndex: HE,
  ɵɵresetView: Qv,
  ɵɵresolveBody: yh,
  ɵɵresolveDocument: VD,
  ɵɵresolveWindow: HD,
  ɵɵrestoreView: Zv,
  ɵɵsanitizeHtml: MC,
  ɵɵsanitizeResourceUrl: Th,
  ɵɵsanitizeScript: _C,
  ɵɵsanitizeStyle: AC,
  ɵɵsanitizeUrl: _h,
  ɵɵsanitizeUrlOrResourceUrl: OC,
  ɵɵsetComponentScope: zI,
  ɵɵsetNgModuleScope: qI,
  ɵɵstyleMap: $t,
  ɵɵstyleMapInterpolate1: TI,
  ɵɵstyleMapInterpolate2: xI,
  ɵɵstyleMapInterpolate3: OI,
  ɵɵstyleMapInterpolate4: FI,
  ɵɵstyleMapInterpolate5: RI,
  ɵɵstyleMapInterpolate6: kI,
  ɵɵstyleMapInterpolate7: PI,
  ɵɵstyleMapInterpolate8: NI,
  ɵɵstyleMapInterpolateV: LI,
  ɵɵstyleProp: hp,
  ɵɵstylePropInterpolate1: Bp,
  ɵɵstylePropInterpolate2: jp,
  ɵɵstylePropInterpolate3: Hp,
  ɵɵstylePropInterpolate4: Vp,
  ɵɵstylePropInterpolate5: Up,
  ɵɵstylePropInterpolate6: Gp,
  ɵɵstylePropInterpolate7: Wp,
  ɵɵstylePropInterpolate8: zp,
  ɵɵstylePropInterpolateV: qp,
  ɵɵsyntheticHostListener: wp,
  ɵɵsyntheticHostProperty: vp,
  ɵɵtemplate: mi,
  ɵɵtemplateRefExtractor: ES,
  ɵɵtext: $I,
  ɵɵtextInterpolate: Yp,
  ɵɵtextInterpolate1: Du,
  ɵɵtextInterpolate2: Zp,
  ɵɵtextInterpolate3: Qp,
  ɵɵtextInterpolate4: Kp,
  ɵɵtextInterpolate5: Xp,
  ɵɵtextInterpolate6: Jp,
  ɵɵtextInterpolate7: eg,
  ɵɵtextInterpolate8: tg,
  ɵɵtextInterpolateV: ng,
  ɵɵtrustConstantHtml: TC,
  ɵɵtrustConstantResourceUrl: xC,
  ɵɵvalidateIframeAttribute: vC,
  ɵɵviewQuery: SI
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license Angular v17.1.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
let qk = null;
function ed() {
  return qk;
}
const ys = new j("DocumentToken"), _r = class _r {
  historyGo(e) {
    throw new Error("Not implemented");
  }
};
_r.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: _r, deps: [], target: $.Injectable }), _r.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: _r, providedIn: "platform", useFactory: () => A(Ei) });
let qn = _r;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: qn, decorators: [{
  type: le,
  args: [{ providedIn: "platform", useFactory: () => A(Ei) }]
}] });
new j("Location Initialized");
const wo = class wo extends qn {
  constructor() {
    super(), this._doc = A(ys), this._location = window.location, this._history = window.history;
  }
  getBaseHrefFromDOM() {
    return ed().getBaseHref(this._doc);
  }
  onPopState(e) {
    const n = ed().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("popstate", e, !1), () => n.removeEventListener("popstate", e);
  }
  onHashChange(e) {
    const n = ed().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("hashchange", e, !1), () => n.removeEventListener("hashchange", e);
  }
  get href() {
    return this._location.href;
  }
  get protocol() {
    return this._location.protocol;
  }
  get hostname() {
    return this._location.hostname;
  }
  get port() {
    return this._location.port;
  }
  get pathname() {
    return this._location.pathname;
  }
  get search() {
    return this._location.search;
  }
  get hash() {
    return this._location.hash;
  }
  set pathname(e) {
    this._location.pathname = e;
  }
  pushState(e, n, o) {
    this._history.pushState(e, n, o);
  }
  replaceState(e, n, o) {
    this._history.replaceState(e, n, o);
  }
  forward() {
    this._history.forward();
  }
  back() {
    this._history.back();
  }
  historyGo(e = 0) {
    this._history.go(e);
  }
  getState() {
    return this._history.state;
  }
};
wo.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: wo, deps: [], target: $.Injectable }), wo.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: wo, providedIn: "platform", useFactory: () => new wo() });
let Ei = wo;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ei, decorators: [{
  type: le,
  args: [{
    providedIn: "platform",
    useFactory: () => new Ei()
  }]
}], ctorParameters: () => [] });
function yg(t, e) {
  if (t.length == 0)
    return e;
  if (e.length == 0)
    return t;
  let n = 0;
  return t.endsWith("/") && n++, e.startsWith("/") && n++, n == 2 ? t + e.substring(1) : n == 1 ? t + e : t + "/" + e;
}
function my(t) {
  const e = t.match(/#|\?|$/), n = e && e.index || t.length, o = n - (t[n - 1] === "/" ? 1 : 0);
  return t.slice(0, o) + t.slice(n);
}
function vn(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
const Tr = class Tr {
  historyGo(e) {
    throw new Error("Not implemented");
  }
};
Tr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Tr, deps: [], target: $.Injectable }), Tr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Tr, providedIn: "root", useFactory: () => A(da) });
let Yn = Tr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Yn, decorators: [{
  type: le,
  args: [{ providedIn: "root", useFactory: () => A(da) }]
}] });
const Su = new j("appBaseHref"), xr = class xr extends Yn {
  constructor(e, n) {
    var o;
    super(), this._platformLocation = e, this._removeListenerFns = [], this._baseHref = n ?? this._platformLocation.getBaseHrefFromDOM() ?? ((o = A(ys).location) == null ? void 0 : o.origin) ?? "";
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(e) {
    this._removeListenerFns.push(this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e));
  }
  getBaseHref() {
    return this._baseHref;
  }
  prepareExternalUrl(e) {
    return yg(this._baseHref, e);
  }
  path(e = !1) {
    const n = this._platformLocation.pathname + vn(this._platformLocation.search), o = this._platformLocation.hash;
    return o && e ? `${n}${o}` : n;
  }
  pushState(e, n, o, r) {
    const i = this.prepareExternalUrl(o + vn(r));
    this._platformLocation.pushState(e, n, i);
  }
  replaceState(e, n, o, r) {
    const i = this.prepareExternalUrl(o + vn(r));
    this._platformLocation.replaceState(e, n, i);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(e = 0) {
    var n, o;
    (o = (n = this._platformLocation).historyGo) == null || o.call(n, e);
  }
};
xr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: xr, deps: [{ token: qn }, { token: Su, optional: !0 }], target: $.Injectable }), xr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: xr, providedIn: "root" });
let da = xr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: da, decorators: [{
  type: le,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [{ type: qn }, { type: void 0, decorators: [{
  type: nn
}, {
  type: mt,
  args: [Su]
}] }] });
const Or = class Or extends Yn {
  constructor(e, n) {
    super(), this._platformLocation = e, this._baseHref = "", this._removeListenerFns = [], n != null && (this._baseHref = n);
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(e) {
    this._removeListenerFns.push(this._platformLocation.onPopState(e), this._platformLocation.onHashChange(e));
  }
  getBaseHref() {
    return this._baseHref;
  }
  path(e = !1) {
    let n = this._platformLocation.hash;
    return n == null && (n = "#"), n.length > 0 ? n.substring(1) : n;
  }
  prepareExternalUrl(e) {
    const n = yg(this._baseHref, e);
    return n.length > 0 ? "#" + n : n;
  }
  pushState(e, n, o, r) {
    let i = this.prepareExternalUrl(o + vn(r));
    i.length == 0 && (i = this._platformLocation.pathname), this._platformLocation.pushState(e, n, i);
  }
  replaceState(e, n, o, r) {
    let i = this.prepareExternalUrl(o + vn(r));
    i.length == 0 && (i = this._platformLocation.pathname), this._platformLocation.replaceState(e, n, i);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(e = 0) {
    var n, o;
    (o = (n = this._platformLocation).historyGo) == null || o.call(n, e);
  }
};
Or.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Or, deps: [{ token: qn }, { token: Su, optional: !0 }], target: $.Injectable }), Or.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Or });
let Ef = Or;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ef, decorators: [{
  type: le
}], ctorParameters: () => [{ type: qn }, { type: void 0, decorators: [{
  type: nn
}, {
  type: mt,
  args: [Su]
}] }] });
const Gt = class Gt {
  constructor(e) {
    this._subject = new Et(), this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = e;
    const n = this._locationStrategy.getBaseHref();
    this._basePath = Zk(my(yy(n))), this._locationStrategy.onPopState((o) => {
      this._subject.emit({
        url: this.path(!0),
        pop: !0,
        state: o.state,
        type: o.type
      });
    });
  }
  /** @nodoc */
  ngOnDestroy() {
    var e;
    (e = this._urlChangeSubscription) == null || e.unsubscribe(), this._urlChangeListeners = [];
  }
  /**
   * Normalizes the URL path for this location.
   *
   * @param includeHash True to include an anchor fragment in the path.
   *
   * @returns The normalized URL path.
   */
  // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
  // removed.
  path(e = !1) {
    return this.normalize(this._locationStrategy.path(e));
  }
  /**
   * Reports the current state of the location history.
   * @returns The current value of the `history.state` object.
   */
  getState() {
    return this._locationStrategy.getState();
  }
  /**
   * Normalizes the given path and compares to the current normalized path.
   *
   * @param path The given URL path.
   * @param query Query parameters.
   *
   * @returns True if the given URL path is equal to the current normalized path, false
   * otherwise.
   */
  isCurrentPathEqualTo(e, n = "") {
    return this.path() == this.normalize(e + vn(n));
  }
  /**
   * Normalizes a URL path by stripping any trailing slashes.
   *
   * @param url String representing a URL.
   *
   * @returns The normalized URL string.
   */
  normalize(e) {
    return Gt.stripTrailingSlash(Yk(this._basePath, yy(e)));
  }
  /**
   * Normalizes an external URL path.
   * If the given URL doesn't begin with a leading slash (`'/'`), adds one
   * before normalizing. Adds a hash if `HashLocationStrategy` is
   * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
   *
   * @param url String representing a URL.
   *
   * @returns  A normalized platform-specific URL.
   */
  prepareExternalUrl(e) {
    return e && e[0] !== "/" && (e = "/" + e), this._locationStrategy.prepareExternalUrl(e);
  }
  // TODO: rename this method to pushState
  /**
   * Changes the browser's URL to a normalized version of a given URL, and pushes a
   * new item onto the platform's history.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   *
   */
  go(e, n = "", o = null) {
    this._locationStrategy.pushState(o, "", e, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + vn(n)), o);
  }
  /**
   * Changes the browser's URL to a normalized version of the given URL, and replaces
   * the top item on the platform's history stack.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   */
  replaceState(e, n = "", o = null) {
    this._locationStrategy.replaceState(o, "", e, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(e + vn(n)), o);
  }
  /**
   * Navigates forward in the platform's history.
   */
  forward() {
    this._locationStrategy.forward();
  }
  /**
   * Navigates back in the platform's history.
   */
  back() {
    this._locationStrategy.back();
  }
  /**
   * Navigate to a specific page from session history, identified by its relative position to the
   * current page.
   *
   * @param relativePosition  Position of the target page in the history relative to the current
   *     page.
   * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
   * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
   * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
   * when `relativePosition` equals 0.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
   */
  historyGo(e = 0) {
    var n, o;
    (o = (n = this._locationStrategy).historyGo) == null || o.call(n, e);
  }
  /**
   * Registers a URL change listener. Use to catch updates performed by the Angular
   * framework that are not detectible through "popstate" or "hashchange" events.
   *
   * @param fn The change handler function, which take a URL and a location history state.
   * @returns A function that, when executed, unregisters a URL change listener.
   */
  onUrlChange(e) {
    return this._urlChangeListeners.push(e), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe((n) => {
      this._notifyUrlChangeListeners(n.url, n.state);
    })), () => {
      var o;
      const n = this._urlChangeListeners.indexOf(e);
      this._urlChangeListeners.splice(n, 1), this._urlChangeListeners.length === 0 && ((o = this._urlChangeSubscription) == null || o.unsubscribe(), this._urlChangeSubscription = null);
    };
  }
  /** @internal */
  _notifyUrlChangeListeners(e = "", n) {
    this._urlChangeListeners.forEach((o) => o(e, n));
  }
  /**
   * Subscribes to the platform's `popState` events.
   *
   * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
   * `Location.onUrlChange()` to subscribe to URL changes instead.
   *
   * @param value Event that is triggered when the state history changes.
   * @param exception The exception to throw.
   *
   * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
   *
   * @returns Subscribed events.
   */
  subscribe(e, n, o) {
    return this._subject.subscribe({ next: e, error: n, complete: o });
  }
};
Gt.normalizeQueryParams = vn, Gt.joinWithSlash = yg, Gt.stripTrailingSlash = my, Gt.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Gt, deps: [{ token: Yn }], target: $.Injectable }), Gt.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Gt, providedIn: "root", useFactory: b0 });
let ic = Gt;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: ic, decorators: [{
  type: le,
  args: [{
    providedIn: "root",
    // See #23917
    useFactory: b0
  }]
}], ctorParameters: () => [{ type: Yn }] });
function b0() {
  return new ic(Re(Yn));
}
function Yk(t, e) {
  if (!t || !e.startsWith(t))
    return e;
  const n = e.substring(t.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : e;
}
function yy(t) {
  return t.replace(/\/index.html$/, "");
}
function Zk(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    const [, n] = t.split(/\/\/[^\/]+/);
    return n;
  }
  return t;
}
const E0 = { ADP: [void 0, void 0, 0], AFN: [void 0, "؋", 0], ALL: [void 0, void 0, 0], AMD: [void 0, "֏", 2], AOA: [void 0, "Kz"], ARS: [void 0, "$"], AUD: ["A$", "$"], AZN: [void 0, "₼"], BAM: [void 0, "KM"], BBD: [void 0, "$"], BDT: [void 0, "৳"], BHD: [void 0, void 0, 3], BIF: [void 0, void 0, 0], BMD: [void 0, "$"], BND: [void 0, "$"], BOB: [void 0, "Bs"], BRL: ["R$"], BSD: [void 0, "$"], BWP: [void 0, "P"], BYN: [void 0, void 0, 2], BYR: [void 0, void 0, 0], BZD: [void 0, "$"], CAD: ["CA$", "$", 2], CHF: [void 0, void 0, 2], CLF: [void 0, void 0, 4], CLP: [void 0, "$", 0], CNY: ["CN¥", "¥"], COP: [void 0, "$", 2], CRC: [void 0, "₡", 2], CUC: [void 0, "$"], CUP: [void 0, "$"], CZK: [void 0, "Kč", 2], DJF: [void 0, void 0, 0], DKK: [void 0, "kr", 2], DOP: [void 0, "$"], EGP: [void 0, "E£"], ESP: [void 0, "₧", 0], EUR: ["€"], FJD: [void 0, "$"], FKP: [void 0, "£"], GBP: ["£"], GEL: [void 0, "₾"], GHS: [void 0, "GH₵"], GIP: [void 0, "£"], GNF: [void 0, "FG", 0], GTQ: [void 0, "Q"], GYD: [void 0, "$", 2], HKD: ["HK$", "$"], HNL: [void 0, "L"], HRK: [void 0, "kn"], HUF: [void 0, "Ft", 2], IDR: [void 0, "Rp", 2], ILS: ["₪"], INR: ["₹"], IQD: [void 0, void 0, 0], IRR: [void 0, void 0, 0], ISK: [void 0, "kr", 0], ITL: [void 0, void 0, 0], JMD: [void 0, "$"], JOD: [void 0, void 0, 3], JPY: ["¥", void 0, 0], KHR: [void 0, "៛"], KMF: [void 0, "CF", 0], KPW: [void 0, "₩", 0], KRW: ["₩", void 0, 0], KWD: [void 0, void 0, 3], KYD: [void 0, "$"], KZT: [void 0, "₸"], LAK: [void 0, "₭", 0], LBP: [void 0, "L£", 0], LKR: [void 0, "Rs"], LRD: [void 0, "$"], LTL: [void 0, "Lt"], LUF: [void 0, void 0, 0], LVL: [void 0, "Ls"], LYD: [void 0, void 0, 3], MGA: [void 0, "Ar", 0], MGF: [void 0, void 0, 0], MMK: [void 0, "K", 0], MNT: [void 0, "₮", 2], MRO: [void 0, void 0, 0], MUR: [void 0, "Rs", 2], MXN: ["MX$", "$"], MYR: [void 0, "RM"], NAD: [void 0, "$"], NGN: [void 0, "₦"], NIO: [void 0, "C$"], NOK: [void 0, "kr", 2], NPR: [void 0, "Rs"], NZD: ["NZ$", "$"], OMR: [void 0, void 0, 3], PHP: ["₱"], PKR: [void 0, "Rs", 2], PLN: [void 0, "zł"], PYG: [void 0, "₲", 0], RON: [void 0, "lei"], RSD: [void 0, void 0, 0], RUB: [void 0, "₽"], RWF: [void 0, "RF", 0], SBD: [void 0, "$"], SEK: [void 0, "kr", 2], SGD: [void 0, "$"], SHP: [void 0, "£"], SLE: [void 0, void 0, 2], SLL: [void 0, void 0, 0], SOS: [void 0, void 0, 0], SRD: [void 0, "$"], SSP: [void 0, "£"], STD: [void 0, void 0, 0], STN: [void 0, "Db"], SYP: [void 0, "£", 0], THB: [void 0, "฿"], TMM: [void 0, void 0, 0], TND: [void 0, void 0, 3], TOP: [void 0, "T$"], TRL: [void 0, void 0, 0], TRY: [void 0, "₺"], TTD: [void 0, "$"], TWD: ["NT$", "$", 2], TZS: [void 0, void 0, 2], UAH: [void 0, "₴"], UGX: [void 0, void 0, 0], USD: ["$"], UYI: [void 0, void 0, 0], UYU: [void 0, "$"], UYW: [void 0, void 0, 4], UZS: [void 0, void 0, 2], VEF: [void 0, "Bs", 2], VND: ["₫", void 0, 0], VUV: [void 0, void 0, 0], XAF: ["FCFA", void 0, 0], XCD: ["EC$", "$"], XOF: ["F CFA", void 0, 0], XPF: ["CFPF", void 0, 0], XXX: ["¤"], YER: [void 0, void 0, 0], ZAR: [void 0, "R"], ZMK: [void 0, void 0, 0], ZMW: [void 0, "ZK"], ZWD: [void 0, void 0, 0] };
var fa;
(function(t) {
  t[t.Decimal = 0] = "Decimal", t[t.Percent = 1] = "Percent", t[t.Currency = 2] = "Currency", t[t.Scientific = 3] = "Scientific";
})(fa || (fa = {}));
var co;
(function(t) {
  t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other";
})(co || (co = {}));
var Ne;
(function(t) {
  t[t.Format = 0] = "Format", t[t.Standalone = 1] = "Standalone";
})(Ne || (Ne = {}));
var te;
(function(t) {
  t[t.Narrow = 0] = "Narrow", t[t.Abbreviated = 1] = "Abbreviated", t[t.Wide = 2] = "Wide", t[t.Short = 3] = "Short";
})(te || (te = {}));
var rt;
(function(t) {
  t[t.Short = 0] = "Short", t[t.Medium = 1] = "Medium", t[t.Long = 2] = "Long", t[t.Full = 3] = "Full";
})(rt || (rt = {}));
var ye;
(function(t) {
  t[t.Decimal = 0] = "Decimal", t[t.Group = 1] = "Group", t[t.List = 2] = "List", t[t.PercentSign = 3] = "PercentSign", t[t.PlusSign = 4] = "PlusSign", t[t.MinusSign = 5] = "MinusSign", t[t.Exponential = 6] = "Exponential", t[t.SuperscriptingExponent = 7] = "SuperscriptingExponent", t[t.PerMille = 8] = "PerMille", t[t.Infinity = 9] = "Infinity", t[t.NaN = 10] = "NaN", t[t.TimeSeparator = 11] = "TimeSeparator", t[t.CurrencyDecimal = 12] = "CurrencyDecimal", t[t.CurrencyGroup = 13] = "CurrencyGroup";
})(ye || (ye = {}));
var vy;
(function(t) {
  t[t.Sunday = 0] = "Sunday", t[t.Monday = 1] = "Monday", t[t.Tuesday = 2] = "Tuesday", t[t.Wednesday = 3] = "Wednesday", t[t.Thursday = 4] = "Thursday", t[t.Friday = 5] = "Friday", t[t.Saturday = 6] = "Saturday";
})(vy || (vy = {}));
function Qk(t) {
  return ze(t)[ne.LocaleId];
}
function Kk(t, e, n) {
  const o = ze(t), r = [
    o[ne.DayPeriodsFormat],
    o[ne.DayPeriodsStandalone]
  ], i = _t(r, e);
  return _t(i, n);
}
function Xk(t, e, n) {
  const o = ze(t), r = [o[ne.DaysFormat], o[ne.DaysStandalone]], i = _t(r, e);
  return _t(i, n);
}
function Jk(t, e, n) {
  const o = ze(t), r = [o[ne.MonthsFormat], o[ne.MonthsStandalone]], i = _t(r, e);
  return _t(i, n);
}
function eP(t, e) {
  const o = ze(t)[ne.Eras];
  return _t(o, e);
}
function el(t, e) {
  const n = ze(t);
  return _t(n[ne.DateFormat], e);
}
function tl(t, e) {
  const n = ze(t);
  return _t(n[ne.TimeFormat], e);
}
function nl(t, e) {
  const o = ze(t)[ne.DateTimeFormat];
  return _t(o, e);
}
function It(t, e) {
  const n = ze(t), o = n[ne.NumberSymbols][e];
  if (typeof o > "u") {
    if (e === ye.CurrencyDecimal)
      return n[ne.NumberSymbols][ye.Decimal];
    if (e === ye.CurrencyGroup)
      return n[ne.NumberSymbols][ye.Group];
  }
  return o;
}
function vg(t, e) {
  return ze(t)[ne.NumberFormats][e];
}
function tP(t) {
  return ze(t)[ne.Currencies];
}
const nP = Dp;
function I0(t) {
  if (!t[ne.ExtraData])
    throw new Error(`Missing extra locale data for the locale "${t[ne.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`);
}
function oP(t) {
  const e = ze(t);
  return I0(e), (e[ne.ExtraData][
    2
    /* ɵExtraLocaleDataIndex.ExtraDayPeriodsRules */
  ] || []).map((o) => typeof o == "string" ? td(o) : [td(o[0]), td(o[1])]);
}
function rP(t, e, n) {
  const o = ze(t);
  I0(o);
  const r = [
    o[ne.ExtraData][
      0
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodFormats */
    ],
    o[ne.ExtraData][
      1
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodStandalone */
    ]
  ], i = _t(r, e) || [];
  return _t(i, n) || [];
}
function _t(t, e) {
  for (let n = e; n > -1; n--)
    if (typeof t[n] < "u")
      return t[n];
  throw new Error("Locale data API: locale data undefined");
}
function td(t) {
  const [e, n] = t.split(":");
  return { hours: +e, minutes: +n };
}
function iP(t, e, n = "en") {
  const o = tP(n)[t] || E0[t] || [], r = o[
    1
    /* ɵCurrencyIndex.SymbolNarrow */
  ];
  return e === "narrow" && typeof r == "string" ? r : o[
    0
    /* ɵCurrencyIndex.Symbol */
  ] || t;
}
const sP = 2;
function aP(t) {
  let e;
  const n = E0[t];
  return n && (e = n[
    2
    /* ɵCurrencyIndex.NbOfDigits */
  ]), typeof e == "number" ? e : sP;
}
const lP = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/, vs = {}, cP = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
var Yt;
(function(t) {
  t[t.Short = 0] = "Short", t[t.ShortGMT = 1] = "ShortGMT", t[t.Long = 2] = "Long", t[t.Extended = 3] = "Extended";
})(Yt || (Yt = {}));
var Q;
(function(t) {
  t[t.FullYear = 0] = "FullYear", t[t.Month = 1] = "Month", t[t.Date = 2] = "Date", t[t.Hours = 3] = "Hours", t[t.Minutes = 4] = "Minutes", t[t.Seconds = 5] = "Seconds", t[t.FractionalSeconds = 6] = "FractionalSeconds", t[t.Day = 7] = "Day";
})(Q || (Q = {}));
var Z;
(function(t) {
  t[t.DayPeriods = 0] = "DayPeriods", t[t.Days = 1] = "Days", t[t.Months = 2] = "Months", t[t.Eras = 3] = "Eras";
})(Z || (Z = {}));
function uP(t, e, n, o) {
  let r = DP(t);
  e = hn(n, e) || e;
  let s = [], a;
  for (; e; )
    if (a = cP.exec(e), a) {
      s = s.concat(a.slice(1));
      const u = s.pop();
      if (!u)
        break;
      e = u;
    } else {
      s.push(e);
      break;
    }
  let l = r.getTimezoneOffset();
  o && (l = w0(o, l), r = vP(r, o, !0));
  let c = "";
  return s.forEach((u) => {
    const d = mP(u);
    c += d ? d(r, n, l) : u === "''" ? "'" : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  }), c;
}
function sc(t, e, n) {
  const o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(t, e, n), o.setHours(0, 0, 0), o;
}
function hn(t, e) {
  const n = Qk(t);
  if (vs[n] = vs[n] || {}, vs[n][e])
    return vs[n][e];
  let o = "";
  switch (e) {
    case "shortDate":
      o = el(t, rt.Short);
      break;
    case "mediumDate":
      o = el(t, rt.Medium);
      break;
    case "longDate":
      o = el(t, rt.Long);
      break;
    case "fullDate":
      o = el(t, rt.Full);
      break;
    case "shortTime":
      o = tl(t, rt.Short);
      break;
    case "mediumTime":
      o = tl(t, rt.Medium);
      break;
    case "longTime":
      o = tl(t, rt.Long);
      break;
    case "fullTime":
      o = tl(t, rt.Full);
      break;
    case "short":
      const r = hn(t, "shortTime"), i = hn(t, "shortDate");
      o = ol(nl(t, rt.Short), [r, i]);
      break;
    case "medium":
      const s = hn(t, "mediumTime"), a = hn(t, "mediumDate");
      o = ol(nl(t, rt.Medium), [s, a]);
      break;
    case "long":
      const l = hn(t, "longTime"), c = hn(t, "longDate");
      o = ol(nl(t, rt.Long), [l, c]);
      break;
    case "full":
      const u = hn(t, "fullTime"), d = hn(t, "fullDate");
      o = ol(nl(t, rt.Full), [u, d]);
      break;
  }
  return o && (vs[n][e] = o), o;
}
function ol(t, e) {
  return e && (t = t.replace(/\{([^}]+)}/g, function(n, o) {
    return e != null && o in e ? e[o] : n;
  })), t;
}
function Ft(t, e, n = "-", o, r) {
  let i = "";
  (t < 0 || r && t <= 0) && (r ? t = -t + 1 : (t = -t, i = n));
  let s = String(t);
  for (; s.length < e; )
    s = "0" + s;
  return o && (s = s.slice(s.length - e)), i + s;
}
function dP(t, e) {
  return Ft(t, 3).substring(0, e);
}
function we(t, e, n = 0, o = !1, r = !1) {
  return function(i, s) {
    let a = fP(t, i);
    if ((n > 0 || a > -n) && (a += n), t === Q.Hours)
      a === 0 && n === -12 && (a = 12);
    else if (t === Q.FractionalSeconds)
      return dP(a, e);
    const l = It(s, ye.MinusSign);
    return Ft(a, e, l, o, r);
  };
}
function fP(t, e) {
  switch (t) {
    case Q.FullYear:
      return e.getFullYear();
    case Q.Month:
      return e.getMonth();
    case Q.Date:
      return e.getDate();
    case Q.Hours:
      return e.getHours();
    case Q.Minutes:
      return e.getMinutes();
    case Q.Seconds:
      return e.getSeconds();
    case Q.FractionalSeconds:
      return e.getMilliseconds();
    case Q.Day:
      return e.getDay();
    default:
      throw new Error(`Unknown DateType value "${t}".`);
  }
}
function ie(t, e, n = Ne.Format, o = !1) {
  return function(r, i) {
    return hP(r, i, t, e, n, o);
  };
}
function hP(t, e, n, o, r, i) {
  switch (n) {
    case Z.Months:
      return Jk(e, r, o)[t.getMonth()];
    case Z.Days:
      return Xk(e, r, o)[t.getDay()];
    case Z.DayPeriods:
      const s = t.getHours(), a = t.getMinutes();
      if (i) {
        const c = oP(e), u = rP(e, r, o), d = c.findIndex((f) => {
          if (Array.isArray(f)) {
            const [h, p] = f, g = s >= h.hours && a >= h.minutes, y = s < p.hours || s === p.hours && a < p.minutes;
            if (h.hours < p.hours) {
              if (g && y)
                return !0;
            } else if (g || y)
              return !0;
          } else if (f.hours === s && f.minutes === a)
            return !0;
          return !1;
        });
        if (d !== -1)
          return u[d];
      }
      return Kk(e, r, o)[s < 12 ? 0 : 1];
    case Z.Eras:
      return eP(e, o)[t.getFullYear() <= 0 ? 0 : 1];
    default:
      const l = n;
      throw new Error(`unexpected translation type ${l}`);
  }
}
function rl(t) {
  return function(e, n, o) {
    const r = -1 * o, i = It(n, ye.MinusSign), s = r > 0 ? Math.floor(r / 60) : Math.ceil(r / 60);
    switch (t) {
      case Yt.Short:
        return (r >= 0 ? "+" : "") + Ft(s, 2, i) + Ft(Math.abs(r % 60), 2, i);
      case Yt.ShortGMT:
        return "GMT" + (r >= 0 ? "+" : "") + Ft(s, 1, i);
      case Yt.Long:
        return "GMT" + (r >= 0 ? "+" : "") + Ft(s, 2, i) + ":" + Ft(Math.abs(r % 60), 2, i);
      case Yt.Extended:
        return o === 0 ? "Z" : (r >= 0 ? "+" : "") + Ft(s, 2, i) + ":" + Ft(Math.abs(r % 60), 2, i);
      default:
        throw new Error(`Unknown zone width "${t}"`);
    }
  };
}
const pP = 0, Dl = 4;
function gP(t) {
  const e = sc(t, pP, 1).getDay();
  return sc(t, 0, 1 + (e <= Dl ? Dl : Dl + 7) - e);
}
function S0(t) {
  return sc(t.getFullYear(), t.getMonth(), t.getDate() + (Dl - t.getDay()));
}
function nd(t, e = !1) {
  return function(n, o) {
    let r;
    if (e) {
      const i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1, s = n.getDate();
      r = 1 + Math.floor((s + i) / 7);
    } else {
      const i = S0(n), s = gP(i.getFullYear()), a = i.getTime() - s.getTime();
      r = 1 + Math.round(a / 6048e5);
    }
    return Ft(r, t, It(o, ye.MinusSign));
  };
}
function il(t, e = !1) {
  return function(n, o) {
    const i = S0(n).getFullYear();
    return Ft(i, t, It(o, ye.MinusSign), e);
  };
}
const od = {};
function mP(t) {
  if (od[t])
    return od[t];
  let e;
  switch (t) {
    case "G":
    case "GG":
    case "GGG":
      e = ie(Z.Eras, te.Abbreviated);
      break;
    case "GGGG":
      e = ie(Z.Eras, te.Wide);
      break;
    case "GGGGG":
      e = ie(Z.Eras, te.Narrow);
      break;
    case "y":
      e = we(Q.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      e = we(Q.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      e = we(Q.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      e = we(Q.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      e = il(1);
      break;
    case "YY":
      e = il(2, !0);
      break;
    case "YYY":
      e = il(3);
      break;
    case "YYYY":
      e = il(4);
      break;
    case "M":
    case "L":
      e = we(Q.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      e = we(Q.Month, 2, 1);
      break;
    case "MMM":
      e = ie(Z.Months, te.Abbreviated);
      break;
    case "MMMM":
      e = ie(Z.Months, te.Wide);
      break;
    case "MMMMM":
      e = ie(Z.Months, te.Narrow);
      break;
    case "LLL":
      e = ie(Z.Months, te.Abbreviated, Ne.Standalone);
      break;
    case "LLLL":
      e = ie(Z.Months, te.Wide, Ne.Standalone);
      break;
    case "LLLLL":
      e = ie(Z.Months, te.Narrow, Ne.Standalone);
      break;
    case "w":
      e = nd(1);
      break;
    case "ww":
      e = nd(2);
      break;
    case "W":
      e = nd(1, !0);
      break;
    case "d":
      e = we(Q.Date, 1);
      break;
    case "dd":
      e = we(Q.Date, 2);
      break;
    case "c":
    case "cc":
      e = we(Q.Day, 1);
      break;
    case "ccc":
      e = ie(Z.Days, te.Abbreviated, Ne.Standalone);
      break;
    case "cccc":
      e = ie(Z.Days, te.Wide, Ne.Standalone);
      break;
    case "ccccc":
      e = ie(Z.Days, te.Narrow, Ne.Standalone);
      break;
    case "cccccc":
      e = ie(Z.Days, te.Short, Ne.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      e = ie(Z.Days, te.Abbreviated);
      break;
    case "EEEE":
      e = ie(Z.Days, te.Wide);
      break;
    case "EEEEE":
      e = ie(Z.Days, te.Narrow);
      break;
    case "EEEEEE":
      e = ie(Z.Days, te.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      e = ie(Z.DayPeriods, te.Abbreviated);
      break;
    case "aaaa":
      e = ie(Z.DayPeriods, te.Wide);
      break;
    case "aaaaa":
      e = ie(Z.DayPeriods, te.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      e = ie(Z.DayPeriods, te.Abbreviated, Ne.Standalone, !0);
      break;
    case "bbbb":
      e = ie(Z.DayPeriods, te.Wide, Ne.Standalone, !0);
      break;
    case "bbbbb":
      e = ie(Z.DayPeriods, te.Narrow, Ne.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      e = ie(Z.DayPeriods, te.Abbreviated, Ne.Format, !0);
      break;
    case "BBBB":
      e = ie(Z.DayPeriods, te.Wide, Ne.Format, !0);
      break;
    case "BBBBB":
      e = ie(Z.DayPeriods, te.Narrow, Ne.Format, !0);
      break;
    case "h":
      e = we(Q.Hours, 1, -12);
      break;
    case "hh":
      e = we(Q.Hours, 2, -12);
      break;
    case "H":
      e = we(Q.Hours, 1);
      break;
    case "HH":
      e = we(Q.Hours, 2);
      break;
    case "m":
      e = we(Q.Minutes, 1);
      break;
    case "mm":
      e = we(Q.Minutes, 2);
      break;
    case "s":
      e = we(Q.Seconds, 1);
      break;
    case "ss":
      e = we(Q.Seconds, 2);
      break;
    case "S":
      e = we(Q.FractionalSeconds, 1);
      break;
    case "SS":
      e = we(Q.FractionalSeconds, 2);
      break;
    case "SSS":
      e = we(Q.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      e = rl(Yt.Short);
      break;
    case "ZZZZZ":
      e = rl(Yt.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      e = rl(Yt.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      e = rl(Yt.Long);
      break;
    default:
      return null;
  }
  return od[t] = e, e;
}
function w0(t, e) {
  t = t.replace(/:/g, "");
  const n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
  return isNaN(n) ? e : n;
}
function yP(t, e) {
  return t = new Date(t.getTime()), t.setMinutes(t.getMinutes() + e), t;
}
function vP(t, e, n) {
  const o = n ? -1 : 1, r = t.getTimezoneOffset(), i = w0(e, r);
  return yP(t, o * (i - r));
}
function DP(t) {
  if (Dy(t))
    return t;
  if (typeof t == "number" && !isNaN(t))
    return new Date(t);
  if (typeof t == "string") {
    if (t = t.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(t)) {
      const [r, i = 1, s = 1] = t.split("-").map((a) => +a);
      return sc(r, i - 1, s);
    }
    const n = parseFloat(t);
    if (!isNaN(t - n))
      return new Date(n);
    let o;
    if (o = t.match(lP))
      return CP(o);
  }
  const e = new Date(t);
  if (!Dy(e))
    throw new Error(`Unable to convert "${t}" into a date`);
  return e;
}
function CP(t) {
  const e = /* @__PURE__ */ new Date(0);
  let n = 0, o = 0;
  const r = t[8] ? e.setUTCFullYear : e.setFullYear, i = t[8] ? e.setUTCHours : e.setHours;
  t[9] && (n = Number(t[9] + t[10]), o = Number(t[9] + t[11])), r.call(e, Number(t[1]), Number(t[2]) - 1, Number(t[3]));
  const s = Number(t[4] || 0) - n, a = Number(t[5] || 0) - o, l = Number(t[6] || 0), c = Math.floor(parseFloat("0." + (t[7] || 0)) * 1e3);
  return i.call(e, s, a, l, c), e;
}
function Dy(t) {
  return t instanceof Date && !isNaN(t.valueOf());
}
const bP = /^(\d+)?\.((\d+)(-(\d+))?)?$/, Cy = 22, ac = ".", Bs = "0", EP = ";", IP = ",", rd = "#", by = "¤", SP = "%";
function Dg(t, e, n, o, r, i, s = !1) {
  let a = "", l = !1;
  if (!isFinite(t))
    a = It(n, ye.Infinity);
  else {
    let c = TP(t);
    s && (c = _P(c));
    let u = e.minInt, d = e.minFrac, f = e.maxFrac;
    if (i) {
      const m = i.match(bP);
      if (m === null)
        throw new Error(`${i} is not a valid digit info`);
      const I = m[1], w = m[3], M = m[5];
      I != null && (u = id(I)), w != null && (d = id(w)), M != null ? f = id(M) : w != null && d > f && (f = d);
    }
    xP(c, d, f);
    let h = c.digits, p = c.integerLen;
    const g = c.exponent;
    let y = [];
    for (l = h.every((m) => !m); p < u; p++)
      h.unshift(0);
    for (; p < 0; p++)
      h.unshift(0);
    p > 0 ? y = h.splice(p, h.length) : (y = h, h = [0]);
    const D = [];
    for (h.length >= e.lgSize && D.unshift(h.splice(-e.lgSize, h.length).join("")); h.length > e.gSize; )
      D.unshift(h.splice(-e.gSize, h.length).join(""));
    h.length && D.unshift(h.join("")), a = D.join(It(n, o)), y.length && (a += It(n, r) + y.join("")), g && (a += It(n, ye.Exponential) + "+" + g);
  }
  return t < 0 && !l ? a = e.negPre + a + e.negSuf : a = e.posPre + a + e.posSuf, a;
}
function wP(t, e, n, o, r) {
  const i = vg(e, fa.Currency), s = Cg(i, It(e, ye.MinusSign));
  return s.minFrac = aP(o), s.maxFrac = s.minFrac, Dg(t, s, e, ye.CurrencyGroup, ye.CurrencyDecimal, r).replace(by, n).replace(by, "").trim();
}
function MP(t, e, n) {
  const o = vg(e, fa.Percent), r = Cg(o, It(e, ye.MinusSign));
  return Dg(t, r, e, ye.Group, ye.Decimal, n, !0).replace(new RegExp(SP, "g"), It(e, ye.PercentSign));
}
function AP(t, e, n) {
  const o = vg(e, fa.Decimal), r = Cg(o, It(e, ye.MinusSign));
  return Dg(t, r, e, ye.Group, ye.Decimal, n);
}
function Cg(t, e = "-") {
  const n = {
    minInt: 1,
    minFrac: 0,
    maxFrac: 0,
    posPre: "",
    posSuf: "",
    negPre: "",
    negSuf: "",
    gSize: 0,
    lgSize: 0
  }, o = t.split(EP), r = o[0], i = o[1], s = r.indexOf(ac) !== -1 ? r.split(ac) : [
    r.substring(0, r.lastIndexOf(Bs) + 1),
    r.substring(r.lastIndexOf(Bs) + 1)
  ], a = s[0], l = s[1] || "";
  n.posPre = a.substring(0, a.indexOf(rd));
  for (let u = 0; u < l.length; u++) {
    const d = l.charAt(u);
    d === Bs ? n.minFrac = n.maxFrac = u + 1 : d === rd ? n.maxFrac = u + 1 : n.posSuf += d;
  }
  const c = a.split(IP);
  if (n.gSize = c[1] ? c[1].length : 0, n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0, i) {
    const u = r.length - n.posPre.length - n.posSuf.length, d = i.indexOf(rd);
    n.negPre = i.substring(0, d).replace(/'/g, ""), n.negSuf = i.slice(d + u).replace(/'/g, "");
  } else
    n.negPre = e + n.posPre, n.negSuf = n.posSuf;
  return n;
}
function _P(t) {
  if (t.digits[0] === 0)
    return t;
  const e = t.digits.length - t.integerLen;
  return t.exponent ? t.exponent += 2 : (e === 0 ? t.digits.push(0, 0) : e === 1 && t.digits.push(0), t.integerLen += 2), t;
}
function TP(t) {
  let e = Math.abs(t) + "", n = 0, o, r, i, s, a;
  for ((r = e.indexOf(ac)) > -1 && (e = e.replace(ac, "")), (i = e.search(/e/i)) > 0 ? (r < 0 && (r = i), r += +e.slice(i + 1), e = e.substring(0, i)) : r < 0 && (r = e.length), i = 0; e.charAt(i) === Bs; i++)
    ;
  if (i === (a = e.length))
    o = [0], r = 1;
  else {
    for (a--; e.charAt(a) === Bs; )
      a--;
    for (r -= i, o = [], s = 0; i <= a; i++, s++)
      o[s] = Number(e.charAt(i));
  }
  return r > Cy && (o = o.splice(0, Cy - 1), n = r - 1, r = 1), { digits: o, exponent: n, integerLen: r };
}
function xP(t, e, n) {
  if (e > n)
    throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`);
  let o = t.digits, r = o.length - t.integerLen;
  const i = Math.min(Math.max(e, r), n);
  let s = i + t.integerLen, a = o[s];
  if (s > 0) {
    o.splice(Math.max(t.integerLen, s));
    for (let d = s; d < o.length; d++)
      o[d] = 0;
  } else {
    r = Math.max(0, r), t.integerLen = 1, o.length = Math.max(1, s = i + 1), o[0] = 0;
    for (let d = 1; d < s; d++)
      o[d] = 0;
  }
  if (a >= 5)
    if (s - 1 < 0) {
      for (let d = 0; d > s; d--)
        o.unshift(0), t.integerLen++;
      o.unshift(1), t.integerLen++;
    } else
      o[s - 1]++;
  for (; r < Math.max(0, i); r++)
    o.push(0);
  let l = i !== 0;
  const c = e + t.integerLen, u = o.reduceRight(function(d, f, h, p) {
    return f = f + d, p[h] = f < 10 ? f : f - 10, l && (p[h] === 0 && h >= c ? p.pop() : l = !1), f >= 10 ? 1 : 0;
  }, 0);
  u && (o.unshift(u), t.integerLen++);
}
function id(t) {
  const e = parseInt(t);
  if (isNaN(e))
    throw new Error("Invalid integer literal when parsing " + t);
  return e;
}
const Fr = class Fr {
};
Fr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Fr, deps: [], target: $.Injectable }), Fr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Fr, providedIn: "root", useFactory: (e) => new ha(e), deps: [{ token: qe }] });
let Zn = Fr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Zn, decorators: [{
  type: le,
  args: [{
    providedIn: "root",
    useFactory: (t) => new ha(t),
    deps: [qe]
  }]
}] });
function M0(t, e, n, o) {
  let r = `=${t}`;
  if (e.indexOf(r) > -1 || (r = n.getPluralCategory(t, o), e.indexOf(r) > -1))
    return r;
  if (e.indexOf("other") > -1)
    return "other";
  throw new Error(`No plural message found for value "${t}"`);
}
const Rr = class Rr extends Zn {
  constructor(e) {
    super(), this.locale = e;
  }
  getPluralCategory(e, n) {
    switch (nP(n || this.locale)(e)) {
      case co.Zero:
        return "zero";
      case co.One:
        return "one";
      case co.Two:
        return "two";
      case co.Few:
        return "few";
      case co.Many:
        return "many";
      default:
        return "other";
    }
  }
};
Rr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Rr, deps: [{ token: qe }], target: $.Injectable }), Rr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Rr });
let ha = Rr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: ha, decorators: [{
  type: le
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: mt,
  args: [qe]
}] }] });
const sd = /\s+/, Ey = [], kr = class kr {
  constructor(e, n) {
    this._ngEl = e, this._renderer = n, this.initialClasses = Ey, this.stateMap = /* @__PURE__ */ new Map();
  }
  set klass(e) {
    this.initialClasses = e != null ? e.trim().split(sd) : Ey;
  }
  set ngClass(e) {
    this.rawClass = typeof e == "string" ? e.trim().split(sd) : e;
  }
  /*
    The NgClass directive uses the custom change detection algorithm for its inputs. The custom
    algorithm is necessary since inputs are represented as complex object or arrays that need to be
    deeply-compared.
  
    This algorithm is perf-sensitive since NgClass is used very frequently and its poor performance
    might negatively impact runtime performance of the entire change detection cycle. The design of
    this algorithm is making sure that:
    - there is no unnecessary DOM manipulation (CSS classes are added / removed from the DOM only when
    needed), even if references to bound objects change;
    - there is no memory allocation if nothing changes (even relatively modest memory allocation
    during the change detection cycle can result in GC pauses for some of the CD cycles).
  
    The algorithm works by iterating over the set of bound classes, staring with [class] binding and
    then going over [ngClass] binding. For each CSS class name:
    - check if it was seen before (this information is tracked in the state map) and if its value
    changed;
    - mark it as "touched" - names that are not marked are not present in the latest set of binding
    and we can remove such class name from the internal data structures;
  
    After iteration over all the CSS class names we've got data structure with all the information
    necessary to synchronize changes to the DOM - it is enough to iterate over the state map, flush
    changes to the DOM and reset internal data structures so those are ready for the next change
    detection cycle.
     */
  ngDoCheck() {
    for (const n of this.initialClasses)
      this._updateState(n, !0);
    const e = this.rawClass;
    if (Array.isArray(e) || e instanceof Set)
      for (const n of e)
        this._updateState(n, !0);
    else if (e != null)
      for (const n of Object.keys(e))
        this._updateState(n, !!e[n]);
    this._applyStateDiff();
  }
  _updateState(e, n) {
    const o = this.stateMap.get(e);
    o !== void 0 ? (o.enabled !== n && (o.changed = !0, o.enabled = n), o.touched = !0) : this.stateMap.set(e, { enabled: n, changed: !0, touched: !0 });
  }
  _applyStateDiff() {
    for (const e of this.stateMap) {
      const n = e[0], o = e[1];
      o.changed ? (this._toggleClass(n, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(n, !1), this.stateMap.delete(n)), o.touched = !1;
    }
  }
  _toggleClass(e, n) {
    if (ngDevMode && typeof e != "string")
      throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${Y(e)}`);
    e = e.trim(), e.length > 0 && e.split(sd).forEach((o) => {
      n ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o);
    });
  }
};
kr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: kr, deps: [{ token: Mt }, { token: Un }], target: $.Directive }), kr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: kr, isStandalone: !0, selector: "[ngClass]", inputs: { klass: ["class", "klass"], ngClass: "ngClass" }, ngImport: C });
let Ii = kr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ii, decorators: [{
  type: ut,
  args: [{
    selector: "[ngClass]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Mt }, { type: Un }], propDecorators: { klass: [{
  type: W,
  args: ["class"]
}], ngClass: [{
  type: W,
  args: ["ngClass"]
}] } });
const Pr = class Pr {
  constructor(e) {
    this._viewContainerRef = e, this.ngComponentOutlet = null, this._inputsUsed = /* @__PURE__ */ new Map();
  }
  _needToReCreateNgModuleInstance(e) {
    return e.ngComponentOutletNgModule !== void 0 || e.ngComponentOutletNgModuleFactory !== void 0;
  }
  _needToReCreateComponentInstance(e) {
    return e.ngComponentOutlet !== void 0 || e.ngComponentOutletContent !== void 0 || e.ngComponentOutletInjector !== void 0 || this._needToReCreateNgModuleInstance(e);
  }
  /** @nodoc */
  ngOnChanges(e) {
    var n;
    if (this._needToReCreateComponentInstance(e) && (this._viewContainerRef.clear(), this._inputsUsed.clear(), this._componentRef = void 0, this.ngComponentOutlet)) {
      const o = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
      this._needToReCreateNgModuleInstance(e) && ((n = this._moduleRef) == null || n.destroy(), this.ngComponentOutletNgModule ? this._moduleRef = og(this.ngComponentOutletNgModule, Iy(o)) : this.ngComponentOutletNgModuleFactory ? this._moduleRef = this.ngComponentOutletNgModuleFactory.create(Iy(o)) : this._moduleRef = void 0), this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
        injector: o,
        ngModuleRef: this._moduleRef,
        projectableNodes: this.ngComponentOutletContent
      });
    }
  }
  /** @nodoc */
  ngDoCheck() {
    if (this._componentRef) {
      if (this.ngComponentOutletInputs)
        for (const e of Object.keys(this.ngComponentOutletInputs))
          this._inputsUsed.set(e, !0);
      this._applyInputStateDiff(this._componentRef);
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    var e;
    (e = this._moduleRef) == null || e.destroy();
  }
  _applyInputStateDiff(e) {
    for (const [n, o] of this._inputsUsed)
      o ? (e.setInput(n, this.ngComponentOutletInputs[n]), this._inputsUsed.set(n, !1)) : (e.setInput(n, void 0), this._inputsUsed.delete(n));
  }
};
Pr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Pr, deps: [{ token: Me }], target: $.Directive }), Pr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Pr, isStandalone: !0, selector: "[ngComponentOutlet]", inputs: { ngComponentOutlet: "ngComponentOutlet", ngComponentOutletInputs: "ngComponentOutletInputs", ngComponentOutletInjector: "ngComponentOutletInjector", ngComponentOutletContent: "ngComponentOutletContent", ngComponentOutletNgModule: "ngComponentOutletNgModule", ngComponentOutletNgModuleFactory: "ngComponentOutletNgModuleFactory" }, usesOnChanges: !0, ngImport: C });
let Si = Pr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Si, decorators: [{
  type: ut,
  args: [{
    selector: "[ngComponentOutlet]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }], propDecorators: { ngComponentOutlet: [{
  type: W
}], ngComponentOutletInputs: [{
  type: W
}], ngComponentOutletInjector: [{
  type: W
}], ngComponentOutletContent: [{
  type: W
}], ngComponentOutletNgModule: [{
  type: W
}], ngComponentOutletNgModuleFactory: [{
  type: W
}] } });
function Iy(t) {
  return t.get(Wn).injector;
}
class OP {
  constructor(e, n, o, r) {
    this.$implicit = e, this.ngForOf = n, this.index = o, this.count = r;
  }
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
}
const Nr = class Nr {
  /**
   * The value of the iterable expression, which can be used as a
   * [template input variable](guide/structural-directives#shorthand).
   */
  set ngForOf(e) {
    this._ngForOf = e, this._ngForOfDirty = !0;
  }
  /**
   * Specifies a custom `TrackByFunction` to compute the identity of items in an iterable.
   *
   * If a custom `TrackByFunction` is not provided, `NgForOf` will use the item's [object
   * identity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
   * as the key.
   *
   * `NgForOf` uses the computed key to associate items in an iterable with DOM elements
   * it produces for these items.
   *
   * A custom `TrackByFunction` is useful to provide good user experience in cases when items in an
   * iterable rendered using `NgForOf` have a natural identifier (for example, custom ID or a
   * primary key), and this iterable could be updated with new object instances that still
   * represent the same underlying entity (for example, when data is re-fetched from the server,
   * and the iterable is recreated and re-rendered, but most of the data is still the same).
   *
   * @see {@link TrackByFunction}
   */
  set ngForTrackBy(e) {
    (typeof ngDevMode > "u" || ngDevMode) && e != null && typeof e != "function" && console.warn(`trackBy must be a function, but received ${JSON.stringify(e)}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`), this._trackByFn = e;
  }
  get ngForTrackBy() {
    return this._trackByFn;
  }
  constructor(e, n, o) {
    this._viewContainer = e, this._template = n, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null;
  }
  /**
   * A reference to the template that is stamped out for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   */
  set ngForTemplate(e) {
    e && (this._template = e);
  }
  /**
   * Applies the changes when needed.
   * @nodoc
   */
  ngDoCheck() {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = !1;
      const e = this._ngForOf;
      if (!this._differ && e)
        if (typeof ngDevMode > "u" || ngDevMode)
          try {
            this._differ = this._differs.find(e).create(this.ngForTrackBy);
          } catch {
            let n = `Cannot find a differ supporting object '${e}' of type '${FP(e)}'. NgFor only supports binding to Iterables, such as Arrays.`;
            throw typeof e == "object" && (n += " Did you mean to use the keyvalue pipe?"), new b(-2200, n);
          }
        else
          this._differ = this._differs.find(e).create(this.ngForTrackBy);
    }
    if (this._differ) {
      const e = this._differ.diff(this._ngForOf);
      e && this._applyChanges(e);
    }
  }
  _applyChanges(e) {
    const n = this._viewContainer;
    e.forEachOperation((o, r, i) => {
      if (o.previousIndex == null)
        n.createEmbeddedView(this._template, new OP(o.item, this._ngForOf, -1, -1), i === null ? void 0 : i);
      else if (i == null)
        n.remove(r === null ? void 0 : r);
      else if (r !== null) {
        const s = n.get(r);
        n.move(s, i), Sy(s, o);
      }
    });
    for (let o = 0, r = n.length; o < r; o++) {
      const s = n.get(o).context;
      s.index = o, s.count = r, s.ngForOf = this._ngForOf;
    }
    e.forEachIdentityChange((o) => {
      const r = n.get(o.currentIndex);
      Sy(r, o);
    });
  }
  /**
   * Asserts the correct type of the context for the template that `NgForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(e, n) {
    return !0;
  }
};
Nr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Nr, deps: [{ token: Me }, { token: ke }, { token: er }], target: $.Directive }), Nr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Nr, isStandalone: !0, selector: "[ngFor][ngForOf]", inputs: { ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate" }, ngImport: C });
let wi = Nr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: wi, decorators: [{
  type: ut,
  args: [{
    selector: "[ngFor][ngForOf]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }, { type: ke }, { type: er }], propDecorators: { ngForOf: [{
  type: W
}], ngForTrackBy: [{
  type: W
}], ngForTemplate: [{
  type: W
}] } });
function Sy(t, e) {
  t.context.$implicit = e.item;
}
function FP(t) {
  return t.name || typeof t;
}
const Lr = class Lr {
  constructor(e, n) {
    this._viewContainer = e, this._context = new RP(), this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = n;
  }
  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  set ngIf(e) {
    this._context.$implicit = this._context.ngIf = e, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to true.
   */
  set ngIfThen(e) {
    wy("ngIfThen", e), this._thenTemplateRef = e, this._thenViewRef = null, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to false.
   */
  set ngIfElse(e) {
    wy("ngIfElse", e), this._elseTemplateRef = e, this._elseViewRef = null, this._updateView();
  }
  _updateView() {
    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
  }
  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(e, n) {
    return !0;
  }
};
Lr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Lr, deps: [{ token: Me }, { token: ke }], target: $.Directive }), Lr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Lr, isStandalone: !0, selector: "[ngIf]", inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" }, ngImport: C });
let Mi = Lr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Mi, decorators: [{
  type: ut,
  args: [{
    selector: "[ngIf]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }, { type: ke }], propDecorators: { ngIf: [{
  type: W
}], ngIfThen: [{
  type: W
}], ngIfElse: [{
  type: W
}] } });
class RP {
  constructor() {
    this.$implicit = null, this.ngIf = null;
  }
}
function wy(t, e) {
  if (!!!(!e || e.createEmbeddedView))
    throw new Error(`${t} must be a TemplateRef, but received '${Y(e)}'.`);
}
class bg {
  constructor(e, n) {
    this._viewContainerRef = e, this._templateRef = n, this._created = !1;
  }
  create() {
    this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  destroy() {
    this._created = !1, this._viewContainerRef.clear();
  }
  enforceState(e) {
    e && !this._created ? this.create() : !e && this._created && this.destroy();
  }
}
const $r = class $r {
  constructor() {
    this._defaultViews = [], this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1;
  }
  set ngSwitch(e) {
    this._ngSwitch = e, this._caseCount === 0 && this._updateDefaultCases(!0);
  }
  /** @internal */
  _addCase() {
    return this._caseCount++;
  }
  /** @internal */
  _addDefault(e) {
    this._defaultViews.push(e);
  }
  /** @internal */
  _matchCase(e) {
    const n = e === this._ngSwitch;
    return (typeof ngDevMode > "u" || ngDevMode) && n !== (e == this._ngSwitch) && console.warn(ve(2001, `As of Angular v17 the NgSwitch directive uses strict equality comparison === instead of == to match different cases. Previously the case value "${My(e)}" matched switch expression value "${My(this._ngSwitch)}", but this is no longer the case with the stricter equality check. Your comparison results return different results using === vs. == and you should adjust your ngSwitch expression and / or values to conform with the strict equality requirements.`)), this._lastCasesMatched = this._lastCasesMatched || n, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), n;
  }
  _updateDefaultCases(e) {
    if (this._defaultViews.length > 0 && e !== this._defaultUsed) {
      this._defaultUsed = e;
      for (const n of this._defaultViews)
        n.enforceState(e);
    }
  }
};
$r.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: $r, deps: [], target: $.Directive }), $r.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: $r, isStandalone: !0, selector: "[ngSwitch]", inputs: { ngSwitch: "ngSwitch" }, ngImport: C });
let rn = $r;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: rn, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitch]",
    standalone: !0
  }]
}], propDecorators: { ngSwitch: [{
  type: W
}] } });
const Br = class Br {
  constructor(e, n, o) {
    this.ngSwitch = o, (typeof ngDevMode > "u" || ngDevMode) && !o && A0("ngSwitchCase", "NgSwitchCase"), o._addCase(), this._view = new bg(e, n);
  }
  /**
   * Performs case matching. For internal use only.
   * @nodoc
   */
  ngDoCheck() {
    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
  }
};
Br.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Br, deps: [{ token: Me }, { token: ke }, { token: rn, host: !0, optional: !0 }], target: $.Directive }), Br.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Br, isStandalone: !0, selector: "[ngSwitchCase]", inputs: { ngSwitchCase: "ngSwitchCase" }, ngImport: C });
let Ai = Br;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ai, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitchCase]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }, { type: ke }, { type: rn, decorators: [{
  type: nn
}, {
  type: Aa
}] }], propDecorators: { ngSwitchCase: [{
  type: W
}] } });
const jr = class jr {
  constructor(e, n, o) {
    (typeof ngDevMode > "u" || ngDevMode) && !o && A0("ngSwitchDefault", "NgSwitchDefault"), o._addDefault(new bg(e, n));
  }
};
jr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: jr, deps: [{ token: Me }, { token: ke }, { token: rn, host: !0, optional: !0 }], target: $.Directive }), jr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: jr, isStandalone: !0, selector: "[ngSwitchDefault]", ngImport: C });
let _i = jr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: _i, decorators: [{
  type: ut,
  args: [{
    selector: "[ngSwitchDefault]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }, { type: ke }, { type: rn, decorators: [{
  type: nn
}, {
  type: Aa
}] }] });
function A0(t, e) {
  throw new b(2e3, `An element with the "${t}" attribute (matching the "${e}" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)`);
}
function My(t) {
  return typeof t == "string" ? `'${t}'` : String(t);
}
const Hr = class Hr {
  constructor(e) {
    this._localization = e, this._caseViews = {};
  }
  set ngPlural(e) {
    this._updateView(e);
  }
  addCase(e, n) {
    this._caseViews[e] = n;
  }
  _updateView(e) {
    this._clearViews();
    const n = Object.keys(this._caseViews), o = M0(e, n, this._localization);
    this._activateView(this._caseViews[o]);
  }
  _clearViews() {
    this._activeView && this._activeView.destroy();
  }
  _activateView(e) {
    e && (this._activeView = e, this._activeView.create());
  }
};
Hr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Hr, deps: [{ token: Zn }], target: $.Directive }), Hr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Hr, isStandalone: !0, selector: "[ngPlural]", inputs: { ngPlural: "ngPlural" }, ngImport: C });
let Qn = Hr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Qn, decorators: [{
  type: ut,
  args: [{
    selector: "[ngPlural]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Zn }], propDecorators: { ngPlural: [{
  type: W
}] } });
const Vr = class Vr {
  constructor(e, n, o, r) {
    this.value = e;
    const i = !isNaN(Number(e));
    r.addCase(i ? `=${e}` : e, new bg(o, n));
  }
};
Vr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Vr, deps: [{ token: "ngPluralCase", attribute: !0 }, { token: ke }, { token: Me }, { token: Qn, host: !0 }], target: $.Directive }), Vr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Vr, isStandalone: !0, selector: "[ngPluralCase]", ngImport: C });
let Ti = Vr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ti, decorators: [{
  type: ut,
  args: [{
    selector: "[ngPluralCase]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: lh,
  args: ["ngPluralCase"]
}] }, { type: ke }, { type: Me }, { type: Qn, decorators: [{
  type: Aa
}] }] });
const Ur = class Ur {
  constructor(e, n, o) {
    this._ngEl = e, this._differs = n, this._renderer = o, this._ngStyle = null, this._differ = null;
  }
  set ngStyle(e) {
    this._ngStyle = e, !this._differ && e && (this._differ = this._differs.find(e).create());
  }
  ngDoCheck() {
    if (this._differ) {
      const e = this._differ.diff(this._ngStyle);
      e && this._applyChanges(e);
    }
  }
  _setStyle(e, n) {
    const [o, r] = e.split("."), i = o.indexOf("-") === -1 ? void 0 : di.DashCase;
    n != null ? this._renderer.setStyle(this._ngEl.nativeElement, o, r ? `${n}${r}` : n, i) : this._renderer.removeStyle(this._ngEl.nativeElement, o, i);
  }
  _applyChanges(e) {
    e.forEachRemovedItem((n) => this._setStyle(n.key, null)), e.forEachAddedItem((n) => this._setStyle(n.key, n.currentValue)), e.forEachChangedItem((n) => this._setStyle(n.key, n.currentValue));
  }
};
Ur.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ur, deps: [{ token: Mt }, { token: In }, { token: Un }], target: $.Directive }), Ur.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Ur, isStandalone: !0, selector: "[ngStyle]", inputs: { ngStyle: "ngStyle" }, ngImport: C });
let xi = Ur;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: xi, decorators: [{
  type: ut,
  args: [{
    selector: "[ngStyle]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Mt }, { type: In }, { type: Un }], propDecorators: { ngStyle: [{
  type: W,
  args: ["ngStyle"]
}] } });
const Gr = class Gr {
  constructor(e) {
    this._viewContainerRef = e, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null;
  }
  ngOnChanges(e) {
    if (this._shouldRecreateView(e)) {
      const n = this._viewContainerRef;
      if (this._viewRef && n.remove(n.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
        this._viewRef = null;
        return;
      }
      const o = this._createContextForwardProxy();
      this._viewRef = n.createEmbeddedView(this.ngTemplateOutlet, o, {
        injector: this.ngTemplateOutletInjector ?? void 0
      });
    }
  }
  /**
   * We need to re-create existing embedded view if either is true:
   * - the outlet changed.
   * - the injector changed.
   */
  _shouldRecreateView(e) {
    return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
  }
  /**
   * For a given outlet instance, we create a proxy object that delegates
   * to the user-specified context. This allows changing, or swapping out
   * the context object completely without having to destroy/re-create the view.
   */
  _createContextForwardProxy() {
    return new Proxy({}, {
      set: (e, n, o) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, n, o) : !1,
      get: (e, n, o) => {
        if (this.ngTemplateOutletContext)
          return Reflect.get(this.ngTemplateOutletContext, n, o);
      }
    });
  }
};
Gr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Gr, deps: [{ token: Me }], target: $.Directive }), Gr.ɵdir = bt({ minVersion: "14.0.0", version: "17.1.1", type: Gr, isStandalone: !0, selector: "[ngTemplateOutlet]", inputs: { ngTemplateOutletContext: "ngTemplateOutletContext", ngTemplateOutlet: "ngTemplateOutlet", ngTemplateOutletInjector: "ngTemplateOutletInjector" }, usesOnChanges: !0, ngImport: C });
let Oi = Gr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Oi, decorators: [{
  type: ut,
  args: [{
    selector: "[ngTemplateOutlet]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Me }], propDecorators: { ngTemplateOutletContext: [{
  type: W
}], ngTemplateOutlet: [{
  type: W
}], ngTemplateOutletInjector: [{
  type: W
}] } });
const Ay = [
  Ii,
  Si,
  wi,
  Mi,
  Oi,
  xi,
  rn,
  Ai,
  _i,
  Qn,
  Ti
];
function Vt(t, e) {
  return new b(2100, ngDevMode && `InvalidPipeArgument: '${e}' for pipe '${Y(t)}'`);
}
class kP {
  createSubscription(e, n) {
    return Gd(() => e.subscribe({
      next: n,
      error: (o) => {
        throw o;
      }
    }));
  }
  dispose(e) {
    Gd(() => e.unsubscribe());
  }
}
class PP {
  createSubscription(e, n) {
    return e.then(n, (o) => {
      throw o;
    });
  }
  dispose(e) {
  }
}
const NP = new PP(), LP = new kP(), Mo = class Mo {
  constructor(e) {
    this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null, this._ref = e;
  }
  ngOnDestroy() {
    this._subscription && this._dispose(), this._ref = null;
  }
  transform(e) {
    return this._obj ? e !== this._obj ? (this._dispose(), this.transform(e)) : this._latestValue : (e && this._subscribe(e), this._latestValue);
  }
  _subscribe(e) {
    this._obj = e, this._strategy = this._selectStrategy(e), this._subscription = this._strategy.createSubscription(e, (n) => this._updateLatestValue(e, n));
  }
  _selectStrategy(e) {
    if (pu(e))
      return NP;
    if (gu(e))
      return LP;
    throw Vt(Mo, e);
  }
  _dispose() {
    this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null;
  }
  _updateLatestValue(e, n) {
    e === this._obj && (this._latestValue = n, this._ref.markForCheck());
  }
};
Mo.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Mo, deps: [{ token: tr }], target: $.Pipe }), Mo.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Mo, isStandalone: !0, name: "async", pure: !1 });
let Fi = Mo;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Fi, decorators: [{
  type: dt,
  args: [{
    name: "async",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: tr }] });
const Ao = class Ao {
  transform(e) {
    if (e == null)
      return null;
    if (typeof e != "string")
      throw Vt(Ao, e);
    return e.toLowerCase();
  }
};
Ao.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ao, deps: [], target: $.Pipe }), Ao.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Ao, isStandalone: !0, name: "lowercase" });
let Ri = Ao;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ri, decorators: [{
  type: dt,
  args: [{
    name: "lowercase",
    standalone: !0
  }]
}] });
const $P = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g, _o = class _o {
  transform(e) {
    if (e == null)
      return null;
    if (typeof e != "string")
      throw Vt(_o, e);
    return e.replace($P, (n) => n[0].toUpperCase() + n.slice(1).toLowerCase());
  }
};
_o.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: _o, deps: [], target: $.Pipe }), _o.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: _o, isStandalone: !0, name: "titlecase" });
let ki = _o;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: ki, decorators: [{
  type: dt,
  args: [{
    name: "titlecase",
    standalone: !0
  }]
}] });
const To = class To {
  transform(e) {
    if (e == null)
      return null;
    if (typeof e != "string")
      throw Vt(To, e);
    return e.toUpperCase();
  }
};
To.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: To, deps: [], target: $.Pipe }), To.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: To, isStandalone: !0, name: "uppercase" });
let Pi = To;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Pi, decorators: [{
  type: dt,
  args: [{
    name: "uppercase",
    standalone: !0
  }]
}] });
const BP = "mediumDate", _0 = new j("DATE_PIPE_DEFAULT_TIMEZONE"), T0 = new j("DATE_PIPE_DEFAULT_OPTIONS"), xo = class xo {
  constructor(e, n, o) {
    this.locale = e, this.defaultTimezone = n, this.defaultOptions = o;
  }
  transform(e, n, o, r) {
    var i, s;
    if (e == null || e === "" || e !== e)
      return null;
    try {
      const a = n ?? ((i = this.defaultOptions) == null ? void 0 : i.dateFormat) ?? BP, l = o ?? ((s = this.defaultOptions) == null ? void 0 : s.timezone) ?? this.defaultTimezone ?? void 0;
      return uP(e, a, r || this.locale, l);
    } catch (a) {
      throw Vt(xo, a.message);
    }
  }
};
xo.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: xo, deps: [{ token: qe }, { token: _0, optional: !0 }, { token: T0, optional: !0 }], target: $.Pipe }), xo.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: xo, isStandalone: !0, name: "date" });
let Ni = xo;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ni, decorators: [{
  type: dt,
  args: [{
    name: "date",
    pure: !0,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: mt,
  args: [qe]
}] }, { type: void 0, decorators: [{
  type: mt,
  args: [_0]
}, {
  type: nn
}] }, { type: void 0, decorators: [{
  type: mt,
  args: [T0]
}, {
  type: nn
}] }] });
const jP = /#/g, Oo = class Oo {
  constructor(e) {
    this._localization = e;
  }
  /**
   * @param value the number to be formatted
   * @param pluralMap an object that mimics the ICU format, see
   * https://unicode-org.github.io/icu/userguide/format_parse/messages/.
   * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
   * default).
   */
  transform(e, n, o) {
    if (e == null)
      return "";
    if (typeof n != "object" || n === null)
      throw Vt(Oo, n);
    const r = M0(e, Object.keys(n), this._localization, o);
    return n[r].replace(jP, e.toString());
  }
};
Oo.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Oo, deps: [{ token: Zn }], target: $.Pipe }), Oo.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Oo, isStandalone: !0, name: "i18nPlural" });
let Li = Oo;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Li, decorators: [{
  type: dt,
  args: [{
    name: "i18nPlural",
    pure: !0,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Zn }] });
const Fo = class Fo {
  /**
   * @param value a string to be internationalized.
   * @param mapping an object that indicates the text that should be displayed
   * for different values of the provided `value`.
   */
  transform(e, n) {
    if (e == null)
      return "";
    if (typeof n != "object" || typeof e != "string")
      throw Vt(Fo, n);
    return n.hasOwnProperty(e) ? n[e] : n.hasOwnProperty("other") ? n.other : "";
  }
};
Fo.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Fo, deps: [], target: $.Pipe }), Fo.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Fo, isStandalone: !0, name: "i18nSelect" });
let $i = Fo;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: $i, decorators: [{
  type: dt,
  args: [{
    name: "i18nSelect",
    pure: !0,
    standalone: !0
  }]
}] });
const Wr = class Wr {
  /**
   * @param value A value of any type to convert into a JSON-format string.
   */
  transform(e) {
    return JSON.stringify(e, null, 2);
  }
};
Wr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Wr, deps: [], target: $.Pipe }), Wr.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Wr, isStandalone: !0, name: "json", pure: !1 });
let Bi = Wr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Bi, decorators: [{
  type: dt,
  args: [{
    name: "json",
    pure: !1,
    standalone: !0
  }]
}] });
function HP(t, e) {
  return { key: t, value: e };
}
const zr = class zr {
  constructor(e) {
    this.differs = e, this.keyValues = [], this.compareFn = _y;
  }
  transform(e, n = _y) {
    if (!e || !(e instanceof Map) && typeof e != "object")
      return null;
    this.differ || (this.differ = this.differs.find(e).create());
    const o = this.differ.diff(e), r = n !== this.compareFn;
    return o && (this.keyValues = [], o.forEachItem((i) => {
      this.keyValues.push(HP(i.key, i.currentValue));
    })), (o || r) && (this.keyValues.sort(n), this.compareFn = n), this.keyValues;
  }
};
zr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: zr, deps: [{ token: In }], target: $.Pipe }), zr.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: zr, isStandalone: !0, name: "keyvalue", pure: !1 });
let ji = zr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: ji, decorators: [{
  type: dt,
  args: [{
    name: "keyvalue",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: In }] });
function _y(t, e) {
  const n = t.key, o = e.key;
  if (n === o)
    return 0;
  if (n === void 0)
    return 1;
  if (o === void 0)
    return -1;
  if (n === null)
    return 1;
  if (o === null)
    return -1;
  if (typeof n == "string" && typeof o == "string")
    return n < o ? -1 : 1;
  if (typeof n == "number" && typeof o == "number")
    return n - o;
  if (typeof n == "boolean" && typeof o == "boolean")
    return n < o ? -1 : 1;
  const r = String(n), i = String(o);
  return r == i ? 0 : r < i ? -1 : 1;
}
const Ro = class Ro {
  constructor(e) {
    this._locale = e;
  }
  /**
   * @param value The value to be formatted.
   * @param digitsInfo Sets digit and decimal representation.
   * [See more](#digitsinfo).
   * @param locale Specifies what locale format rules to use.
   * [See more](#locale).
   */
  transform(e, n, o) {
    if (!Eg(e))
      return null;
    o = o || this._locale;
    try {
      const r = Ig(e);
      return AP(r, o, n);
    } catch (r) {
      throw Vt(Ro, r.message);
    }
  }
};
Ro.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ro, deps: [{ token: qe }], target: $.Pipe }), Ro.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Ro, isStandalone: !0, name: "number" });
let Hi = Ro;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Hi, decorators: [{
  type: dt,
  args: [{
    name: "number",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: mt,
  args: [qe]
}] }] });
const ko = class ko {
  constructor(e) {
    this._locale = e;
  }
  /**
   *
   * @param value The number to be formatted as a percentage.
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `0`.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(e, n, o) {
    if (!Eg(e))
      return null;
    o = o || this._locale;
    try {
      const r = Ig(e);
      return MP(r, o, n);
    } catch (r) {
      throw Vt(ko, r.message);
    }
  }
};
ko.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: ko, deps: [{ token: qe }], target: $.Pipe }), ko.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: ko, isStandalone: !0, name: "percent" });
let Vi = ko;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Vi, decorators: [{
  type: dt,
  args: [{
    name: "percent",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: mt,
  args: [qe]
}] }] });
const Po = class Po {
  constructor(e, n = "USD") {
    this._locale = e, this._defaultCurrencyCode = n;
  }
  /**
   *
   * @param value The number to be formatted as currency.
   * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
   * such as `USD` for the US dollar and `EUR` for the euro. The default currency code can be
   * configured using the `DEFAULT_CURRENCY_CODE` injection token.
   * @param display The format for the currency indicator. One of the following:
   *   - `code`: Show the code (such as `USD`).
   *   - `symbol`(default): Show the symbol (such as `$`).
   *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
   * currency.
   * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
   * locale has no narrow symbol, uses the standard symbol for the locale.
   *   - String: Use the given string value instead of a code or a symbol.
   * For example, an empty string will suppress the currency & symbol.
   *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `2`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `2`.
   * If not provided, the number will be formatted with the proper amount of digits,
   * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
   * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(e, n = this._defaultCurrencyCode, o = "symbol", r, i) {
    if (!Eg(e))
      return null;
    i = i || this._locale, typeof o == "boolean" && ((typeof ngDevMode > "u" || ngDevMode) && console && console.warn && console.warn('Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".'), o = o ? "symbol" : "code");
    let s = n || this._defaultCurrencyCode;
    o !== "code" && (o === "symbol" || o === "symbol-narrow" ? s = iP(s, o === "symbol" ? "wide" : "narrow", i) : s = o);
    try {
      const a = Ig(e);
      return wP(a, i, s, n, r);
    } catch (a) {
      throw Vt(Po, a.message);
    }
  }
};
Po.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Po, deps: [{ token: qe }, { token: fg }], target: $.Pipe }), Po.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Po, isStandalone: !0, name: "currency" });
let Ui = Po;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Ui, decorators: [{
  type: dt,
  args: [{
    name: "currency",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: mt,
  args: [qe]
}] }, { type: void 0, decorators: [{
  type: mt,
  args: [fg]
}] }] });
function Eg(t) {
  return !(t == null || t === "" || t !== t);
}
function Ig(t) {
  if (typeof t == "string" && !isNaN(Number(t) - parseFloat(t)))
    return Number(t);
  if (typeof t != "number")
    throw new Error(`${t} is not a number`);
  return t;
}
const No = class No {
  transform(e, n, o) {
    if (e == null)
      return null;
    if (!this.supports(e))
      throw Vt(No, e);
    return e.slice(n, o);
  }
  supports(e) {
    return typeof e == "string" || Array.isArray(e);
  }
};
No.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: No, deps: [], target: $.Pipe }), No.ɵpipe = ft({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: No, isStandalone: !0, name: "slice", pure: !1 });
let Gi = No;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Gi, decorators: [{
  type: dt,
  args: [{
    name: "slice",
    pure: !1,
    standalone: !0
  }]
}] });
const Ty = [
  Fi,
  Pi,
  Ri,
  Bi,
  Gi,
  Hi,
  Vi,
  ki,
  Ui,
  Ni,
  Li,
  $i,
  ji
], Rn = class Rn {
};
Rn.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Rn, deps: [], target: $.NgModule }), Rn.ɵmod = D0({ minVersion: "14.0.0", version: "17.1.1", ngImport: C, type: Rn, imports: [Ii, Si, wi, Mi, Oi, xi, rn, Ai, _i, Qn, Ti, Fi, Pi, Ri, Bi, Gi, Hi, Vi, ki, Ui, Ni, Li, $i, ji], exports: [Ii, Si, wi, Mi, Oi, xi, rn, Ai, _i, Qn, Ti, Fi, Pi, Ri, Bi, Gi, Hi, Vi, ki, Ui, Ni, Li, $i, ji] }), Rn.ɵinj = v0({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Rn });
let lc = Rn;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: lc, decorators: [{
  type: lg,
  args: [{
    imports: [Ay, Ty],
    exports: [Ay, Ty]
  }]
}] });
const VP = "browser", UP = "server";
function GP(t) {
  return t === VP;
}
function WP(t) {
  return t === UP;
}
new cg("17.1.1");
const mc = class mc {
};
mc.ɵprov = oe({
  token: mc,
  providedIn: "root",
  factory: () => GP(A(_a)) ? new zP(A(ys), window) : new YP()
});
let xy = mc;
class zP {
  constructor(e, n) {
    this.document = e, this.window = n, this.offset = () => [0, 0];
  }
  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(e) {
    Array.isArray(e) ? this.offset = () => e : this.offset = e;
  }
  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition() {
    return [this.window.scrollX, this.window.scrollY];
  }
  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(e) {
    this.window.scrollTo(e[0], e[1]);
  }
  /**
   * Scrolls to an element and attempts to focus the element.
   *
   * Note that the function name here is misleading in that the target string may be an ID for a
   * non-anchor element.
   *
   * @param target The ID of an element or name of the anchor.
   *
   * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
   * @see https://html.spec.whatwg.org/#scroll-to-fragid
   */
  scrollToAnchor(e) {
    const n = qP(this.document, e);
    n && (this.scrollToElement(n), n.focus());
  }
  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(e) {
    this.window.history.scrollRestoration = e;
  }
  /**
   * Scrolls to an element using the native offset and the specified offset set on this scroller.
   *
   * The offset can be used when we know that there is a floating header and scrolling naively to an
   * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
   */
  scrollToElement(e) {
    const n = e.getBoundingClientRect(), o = n.left + this.window.pageXOffset, r = n.top + this.window.pageYOffset, i = this.offset();
    this.window.scrollTo(o - i[0], r - i[1]);
  }
}
function qP(t, e) {
  const n = t.getElementById(e) || t.getElementsByName(e)[0];
  if (n)
    return n;
  if (typeof t.createTreeWalker == "function" && t.body && typeof t.body.attachShadow == "function") {
    const o = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
    let r = o.currentNode;
    for (; r; ) {
      const i = r.shadowRoot;
      if (i) {
        const s = i.getElementById(e) || i.querySelector(`[name="${e}"]`);
        if (s)
          return s;
      }
      r = o.nextNode();
    }
  }
  return null;
}
class YP {
  /**
   * Empty implementation
   */
  setOffset(e) {
  }
  /**
   * Empty implementation
   */
  getScrollPosition() {
    return [0, 0];
  }
  /**
   * Empty implementation
   */
  scrollToPosition(e) {
  }
  /**
   * Empty implementation
   */
  scrollToAnchor(e) {
  }
  /**
   * Empty implementation
   */
  setHistoryScrollRestoration(e) {
  }
}
function Mr(t, e) {
  return Sg(t) ? new URL(t) : new URL(t, e.location.href);
}
function Sg(t) {
  return /^https?:\/\//.test(t);
}
function Oy(t) {
  return Sg(t) ? new URL(t).hostname : t;
}
function ZP(t) {
  if (!(typeof t == "string") || t.trim() === "")
    return !1;
  try {
    const n = new URL(t);
    return !0;
  } catch {
    return !1;
  }
}
function QP(t) {
  return t.endsWith("/") ? t.slice(0, -1) : t;
}
function KP(t) {
  return t.startsWith("/") ? t.slice(1) : t;
}
const Ga = (t) => t.src, x0 = new j("ImageLoader", {
  providedIn: "root",
  factory: () => Ga
});
function wu(t, e) {
  return function(o) {
    return ZP(o) || XP(o, e || []), o = QP(o), [{ provide: x0, useValue: (s) => (Sg(s.src) && JP(o, s.src), t(o, { ...s, src: KP(s.src) })) }];
  };
}
function XP(t, e) {
  throw new b(2959, ngDevMode && `Image loader has detected an invalid path (\`${t}\`). To fix this, supply a path using one of the following formats: ${e.join(" or ")}`);
}
function JP(t, e) {
  throw new b(2959, ngDevMode && `Image loader has detected a \`<img>\` tag with an invalid \`ngSrc\` attribute: ${e}. This image loader expects \`ngSrc\` to be a relative URL - however the provided value is an absolute URL. To fix this, provide \`ngSrc\` as a path relative to the base URL configured for this loader (\`${t}\`).`);
}
wu(eN, ngDevMode ? ["https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>"] : void 0);
function eN(t, e) {
  let n = "format=auto";
  return e.width && (n += `,width=${e.width}`), `${t}/cdn-cgi/image/${n}/${e.src}`;
}
const tN = {
  name: "Cloudinary",
  testUrl: oN
}, nN = /https?\:\/\/[^\/]+\.cloudinary\.com\/.+/;
function oN(t) {
  return nN.test(t);
}
wu(rN, ngDevMode ? [
  "https://res.cloudinary.com/mysite",
  "https://mysite.cloudinary.com",
  "https://subdomain.mysite.com"
] : void 0);
function rN(t, e) {
  let n = "f_auto,q_auto";
  return e.width && (n += `,w_${e.width}`), `${t}/image/upload/${n}/${e.src}`;
}
const iN = {
  name: "ImageKit",
  testUrl: aN
}, sN = /https?\:\/\/[^\/]+\.imagekit\.io\/.+/;
function aN(t) {
  return sN.test(t);
}
wu(lN, ngDevMode ? ["https://ik.imagekit.io/mysite", "https://subdomain.mysite.com"] : void 0);
function lN(t, e) {
  const { src: n, width: o } = e;
  let r;
  if (o) {
    const i = `tr:w-${o}`;
    r = [t, i, n];
  } else
    r = [t, n];
  return r.join("/");
}
const cN = {
  name: "Imgix",
  testUrl: dN
}, uN = /https?\:\/\/[^\/]+\.imgix\.net\/.+/;
function dN(t) {
  return uN.test(t);
}
wu(fN, ngDevMode ? ["https://somepath.imgix.net/"] : void 0);
function fN(t, e) {
  const n = new URL(`${t}/${e.src}`);
  return n.searchParams.set("auto", "format"), e.width && n.searchParams.set("w", e.width.toString()), n.href;
}
function he(t, e = !0) {
  return `The NgOptimizedImage directive ${e ? `(activated on an <img> element with the \`ngSrc="${t}"\`) ` : ""}has detected that`;
}
function O0(t) {
  if (!ngDevMode)
    throw new b(2958, `Unexpected invocation of the ${t} in the prod mode. Please make sure that the prod mode is enabled for production builds.`);
}
const qr = class qr {
  constructor() {
    this.images = /* @__PURE__ */ new Map(), this.window = null, this.observer = null, O0("LCP checker");
    const e = A(ys).defaultView;
    typeof e < "u" && typeof PerformanceObserver < "u" && (this.window = e, this.observer = this.initPerformanceObserver());
  }
  /**
   * Inits PerformanceObserver and subscribes to LCP events.
   * Based on https://web.dev/lcp/#measure-lcp-in-javascript
   */
  initPerformanceObserver() {
    const e = new PerformanceObserver((n) => {
      var a;
      const o = n.getEntries();
      if (o.length === 0)
        return;
      const i = ((a = o[o.length - 1].element) == null ? void 0 : a.src) ?? "";
      if (i.startsWith("data:") || i.startsWith("blob:"))
        return;
      const s = this.images.get(i);
      s && (!s.priority && !s.alreadyWarnedPriority && (s.alreadyWarnedPriority = !0, hN(i)), s.modified && !s.alreadyWarnedModified && (s.alreadyWarnedModified = !0, pN(i)));
    });
    return e.observe({ type: "largest-contentful-paint", buffered: !0 }), e;
  }
  registerImage(e, n, o) {
    if (!this.observer)
      return;
    const r = {
      priority: o,
      modified: !1,
      alreadyWarnedModified: !1,
      alreadyWarnedPriority: !1
    };
    this.images.set(Mr(e, this.window).href, r);
  }
  unregisterImage(e) {
    this.observer && this.images.delete(Mr(e, this.window).href);
  }
  updateImage(e, n) {
    const o = Mr(e, this.window).href, r = this.images.get(o);
    r && (r.modified = !0, this.images.set(Mr(n, this.window).href, r), this.images.delete(o));
  }
  ngOnDestroy() {
    this.observer && (this.observer.disconnect(), this.images.clear());
  }
};
qr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: qr, deps: [], target: $.Injectable }), qr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: qr, providedIn: "root" });
let cc = qr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: cc, decorators: [{
  type: le,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [] });
function hN(t) {
  const e = he(t);
  console.error(ve(2955, `${e} this image is the Largest Contentful Paint (LCP) element but was not marked "priority". This image should be marked "priority" in order to prioritize its loading. To fix this, add the "priority" attribute.`));
}
function pN(t) {
  const e = he(t);
  console.warn(ve(2964, `${e} this image is the Largest Contentful Paint (LCP) element and has had its "ngSrc" attribute modified. This can cause slower loading performance. It is recommended not to modify the "ngSrc" property on any image which could be the LCP element.`));
}
const gN = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "0.0.0.0"]), mN = new j("PRECONNECT_CHECK_BLOCKLIST"), Yr = class Yr {
  constructor() {
    this.document = A(ys), this.preconnectLinks = null, this.alreadySeen = /* @__PURE__ */ new Set(), this.window = null, this.blocklist = new Set(gN), O0("preconnect link checker");
    const e = this.document.defaultView;
    typeof e < "u" && (this.window = e);
    const n = A(mN, { optional: !0 });
    n && this.populateBlocklist(n);
  }
  populateBlocklist(e) {
    Array.isArray(e) ? F0(e, (n) => {
      this.blocklist.add(Oy(n));
    }) : this.blocklist.add(Oy(e));
  }
  /**
   * Checks that a preconnect resource hint exists in the head for the
   * given src.
   *
   * @param rewrittenSrc src formatted with loader
   * @param originalNgSrc ngSrc value
   */
  assertPreconnect(e, n) {
    if (!this.window)
      return;
    const o = Mr(e, this.window);
    this.blocklist.has(o.hostname) || this.alreadySeen.has(o.origin) || (this.alreadySeen.add(o.origin), this.preconnectLinks || (this.preconnectLinks = this.queryPreconnectLinks()), this.preconnectLinks.has(o.origin) || console.warn(ve(2956, `${he(n)} there is no preconnect tag present for this image. Preconnecting to the origin(s) that serve priority images ensures that these images are delivered as soon as possible. To fix this, please add the following element into the <head> of the document:
  <link rel="preconnect" href="${o.origin}">`)));
  }
  queryPreconnectLinks() {
    const e = /* @__PURE__ */ new Set(), o = Array.from(this.document.querySelectorAll("link[rel=preconnect]"));
    for (let r of o) {
      const i = Mr(r.href, this.window);
      e.add(i.origin);
    }
    return e;
  }
  ngOnDestroy() {
    var e;
    (e = this.preconnectLinks) == null || e.clear(), this.alreadySeen.clear();
  }
};
Yr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Yr, deps: [], target: $.Injectable }), Yr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Yr, providedIn: "root" });
let uc = Yr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: uc, decorators: [{
  type: le,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [] });
function F0(t, e) {
  for (let n of t)
    Array.isArray(n) ? F0(n, e) : e(n);
}
const Fy = 5, yN = new j("NG_OPTIMIZED_PRELOADED_IMAGES", { providedIn: "root", factory: () => /* @__PURE__ */ new Set() }), Zr = class Zr {
  constructor() {
    this.preloadedImages = A(yN), this.document = A(ys);
  }
  /**
   * @description Add a preload `<link>` to the `<head>` of the `index.html` that is served from the
   * server while using Angular Universal and SSR to kick off image loads for high priority images.
   *
   * The `sizes` (passed in from the user) and `srcset` (parsed and formatted from `ngSrcset`)
   * properties used to set the corresponding attributes, `imagesizes` and `imagesrcset`
   * respectively, on the preload `<link>` tag so that the correctly sized image is preloaded from
   * the CDN.
   *
   * {@link https://web.dev/preload-responsive-images/#imagesrcset-and-imagesizes}
   *
   * @param renderer The `Renderer2` passed in from the directive
   * @param src The original src of the image that is set on the `ngSrc` input.
   * @param srcset The parsed and formatted srcset created from the `ngSrcset` input
   * @param sizes The value of the `sizes` attribute passed in to the `<img>` tag
   */
  createPreloadLinkTag(e, n, o, r) {
    if (ngDevMode && this.preloadedImages.size >= Fy)
      throw new b(2961, ngDevMode && `The \`NgOptimizedImage\` directive has detected that more than ${Fy} images were marked as priority. This might negatively affect an overall performance of the page. To fix this, remove the "priority" attribute from images with less priority.`);
    if (this.preloadedImages.has(n))
      return;
    this.preloadedImages.add(n);
    const i = e.createElement("link");
    e.setAttribute(i, "as", "image"), e.setAttribute(i, "href", n), e.setAttribute(i, "rel", "preload"), e.setAttribute(i, "fetchpriority", "high"), r && e.setAttribute(i, "imageSizes", r), o && e.setAttribute(i, "imageSrcset", o), e.appendChild(this.document.head, i);
  }
};
Zr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Zr, deps: [], target: $.Injectable }), Zr.ɵprov = xt({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Zr, providedIn: "root" });
let dc = Zr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: dc, decorators: [{
  type: le,
  args: [{ providedIn: "root" }]
}] });
const Ry = 50, R0 = /^((\s*\d+w\s*(,|$)){1,})$/, vN = /^((\s*\d+(\.\d+)?x\s*(,|$)){1,})$/, ad = 3, js = 2, DN = [1, 2], CN = 640, ky = 0.1, Py = 1e3, bN = 1920, EN = 1080, IN = [cN, iN, tN], Qr = class Qr {
  constructor() {
    this.imageLoader = A(x0), this.config = SN(A(mh)), this.renderer = A(Un), this.imgElement = A(Mt).nativeElement, this.injector = A(Ve), this.isServer = WP(A(_a)), this.preloadLinkCreator = A(dc), this.lcpObserver = ngDevMode ? this.injector.get(cc) : null, this._renderedSrc = null, this.priority = !1, this.disableOptimizedSrcset = !1, this.fill = !1;
  }
  /** @nodoc */
  ngOnInit() {
    if (Tn("NgOptimizedImage"), ngDevMode) {
      const e = this.injector.get(ae);
      k0(this, "ngSrc", this.ngSrc), xN(this, this.ngSrcset), wN(this), this.ngSrcset && MN(this), AN(this), TN(this), this.fill ? (NN(this), e.runOutsideAngular(() => LN(this, this.imgElement, this.renderer))) : (PN(this), this.height !== void 0 && Ny(this, this.height, "height"), this.width !== void 0 && Ny(this, this.width, "width"), e.runOutsideAngular(() => kN(this, this.imgElement, this.renderer))), $N(this), this.ngSrcset || _N(this), BN(this.ngSrc, this.imageLoader), jN(this, this.imageLoader), HN(this, this.imageLoader), this.lcpObserver !== null && this.injector.get(ae).runOutsideAngular(() => {
        this.lcpObserver.registerImage(this.getRewrittenSrc(), this.ngSrc, this.priority);
      }), this.priority && this.injector.get(uc).assertPreconnect(this.getRewrittenSrc(), this.ngSrc);
    }
    this.setHostAttributes();
  }
  setHostAttributes() {
    this.fill ? this.sizes || (this.sizes = "100vw") : (this.setHostAttribute("width", this.width.toString()), this.setHostAttribute("height", this.height.toString())), this.setHostAttribute("loading", this.getLoadingBehavior()), this.setHostAttribute("fetchpriority", this.getFetchPriority()), this.setHostAttribute("ng-img", "true");
    const e = this.updateSrcAndSrcset();
    this.sizes && this.setHostAttribute("sizes", this.sizes), this.isServer && this.priority && this.preloadLinkCreator.createPreloadLinkTag(this.renderer, this.getRewrittenSrc(), e, this.sizes);
  }
  /** @nodoc */
  ngOnChanges(e) {
    if (ngDevMode && RN(this, e, [
      "ngSrcset",
      "width",
      "height",
      "priority",
      "fill",
      "loading",
      "sizes",
      "loaderParams",
      "disableOptimizedSrcset"
    ]), e.ngSrc && !e.ngSrc.isFirstChange()) {
      const n = this._renderedSrc;
      this.updateSrcAndSrcset(!0);
      const o = this._renderedSrc;
      this.lcpObserver !== null && n && o && n !== o && this.injector.get(ae).runOutsideAngular(() => {
        var i;
        (i = this.lcpObserver) == null || i.updateImage(n, o);
      });
    }
  }
  callImageLoader(e) {
    let n = e;
    return this.loaderParams && (n.loaderParams = this.loaderParams), this.imageLoader(n);
  }
  getLoadingBehavior() {
    return !this.priority && this.loading !== void 0 ? this.loading : this.priority ? "eager" : "lazy";
  }
  getFetchPriority() {
    return this.priority ? "high" : "auto";
  }
  getRewrittenSrc() {
    if (!this._renderedSrc) {
      const e = { src: this.ngSrc };
      this._renderedSrc = this.callImageLoader(e);
    }
    return this._renderedSrc;
  }
  getRewrittenSrcset() {
    const e = R0.test(this.ngSrcset);
    return this.ngSrcset.split(",").filter((o) => o !== "").map((o) => {
      o = o.trim();
      const r = e ? parseFloat(o) : parseFloat(o) * this.width;
      return `${this.callImageLoader({ src: this.ngSrc, width: r })} ${o}`;
    }).join(", ");
  }
  getAutomaticSrcset() {
    return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset();
  }
  getResponsiveSrcset() {
    var r;
    const { breakpoints: e } = this.config;
    let n = e;
    return ((r = this.sizes) == null ? void 0 : r.trim()) === "100vw" && (n = e.filter((i) => i >= CN)), n.map((i) => `${this.callImageLoader({ src: this.ngSrc, width: i })} ${i}w`).join(", ");
  }
  updateSrcAndSrcset(e = !1) {
    e && (this._renderedSrc = null);
    const n = this.getRewrittenSrc();
    this.setHostAttribute("src", n);
    let o;
    return this.ngSrcset ? o = this.getRewrittenSrcset() : this.shouldGenerateAutomaticSrcset() && (o = this.getAutomaticSrcset()), o && this.setHostAttribute("srcset", o), o;
  }
  getFixedSrcset() {
    return DN.map((n) => `${this.callImageLoader({
      src: this.ngSrc,
      width: this.width * n
    })} ${n}x`).join(", ");
  }
  shouldGenerateAutomaticSrcset() {
    let e = !1;
    return this.sizes || (e = this.width > bN || this.height > EN), !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== Ga && !e;
  }
  /** @nodoc */
  ngOnDestroy() {
    ngDevMode && !this.priority && this._renderedSrc !== null && this.lcpObserver !== null && this.lcpObserver.unregisterImage(this._renderedSrc);
  }
  setHostAttribute(e, n) {
    this.renderer.setAttribute(this.imgElement, e, n);
  }
};
Qr.ɵfac = U({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: Qr, deps: [], target: $.Directive }), Qr.ɵdir = bt({ minVersion: "16.1.0", version: "17.1.1", type: Qr, isStandalone: !0, selector: "img[ngSrc]", inputs: { ngSrc: ["ngSrc", "ngSrc", P0], ngSrcset: "ngSrcset", sizes: "sizes", width: ["width", "width", ua], height: ["height", "height", ua], loading: "loading", priority: ["priority", "priority", Bo], loaderParams: "loaderParams", disableOptimizedSrcset: ["disableOptimizedSrcset", "disableOptimizedSrcset", Bo], fill: ["fill", "fill", Bo], src: "src", srcset: "srcset" }, host: { properties: { "style.position": 'fill ? "absolute" : null', "style.width": 'fill ? "100%" : null', "style.height": 'fill ? "100%" : null', "style.inset": 'fill ? "0px" : null' } }, usesOnChanges: !0, ngImport: C });
let If = Qr;
V({ minVersion: "12.0.0", version: "17.1.1", ngImport: C, type: If, decorators: [{
  type: ut,
  args: [{
    standalone: !0,
    selector: "img[ngSrc]",
    host: {
      "[style.position]": 'fill ? "absolute" : null',
      "[style.width]": 'fill ? "100%" : null',
      "[style.height]": 'fill ? "100%" : null',
      "[style.inset]": 'fill ? "0px" : null'
    }
  }]
}], propDecorators: { ngSrc: [{
  type: W,
  args: [{ required: !0, transform: P0 }]
}], ngSrcset: [{
  type: W
}], sizes: [{
  type: W
}], width: [{
  type: W,
  args: [{ transform: ua }]
}], height: [{
  type: W,
  args: [{ transform: ua }]
}], loading: [{
  type: W
}], priority: [{
  type: W,
  args: [{ transform: Bo }]
}], loaderParams: [{
  type: W
}], disableOptimizedSrcset: [{
  type: W,
  args: [{ transform: Bo }]
}], fill: [{
  type: W,
  args: [{ transform: Bo }]
}], src: [{
  type: W
}], srcset: [{
  type: W
}] } });
function SN(t) {
  let e = {};
  return t.breakpoints && (e.breakpoints = t.breakpoints.sort((n, o) => n - o)), Object.assign({}, gh, t, e);
}
function wN(t) {
  if (t.src)
    throw new b(2950, `${he(t.ngSrc)} both \`src\` and \`ngSrc\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`src\` itself based on the value of \`ngSrc\`. To fix this, please remove the \`src\` attribute.`);
}
function MN(t) {
  if (t.srcset)
    throw new b(2951, `${he(t.ngSrc)} both \`srcset\` and \`ngSrcset\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`srcset\` itself based on the value of \`ngSrcset\`. To fix this, please remove the \`srcset\` attribute.`);
}
function AN(t) {
  let e = t.ngSrc.trim();
  if (e.startsWith("data:"))
    throw e.length > Ry && (e = e.substring(0, Ry) + "..."), new b(2952, `${he(t.ngSrc, !1)} \`ngSrc\` is a Base64-encoded string (${e}). NgOptimizedImage does not support Base64-encoded strings. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a standard \`src\` attribute instead.`);
}
function _N(t) {
  let e = t.sizes;
  if (e != null && e.match(/((\)|,)\s|^)\d+px/))
    throw new b(2952, `${he(t.ngSrc, !1)} \`sizes\` was set to a string including pixel values. For automatic \`srcset\` generation, \`sizes\` must only include responsive values, such as \`sizes="50vw"\` or \`sizes="(min-width: 768px) 50vw, 100vw"\`. To fix this, modify the \`sizes\` attribute, or provide your own \`ngSrcset\` value directly.`);
}
function TN(t) {
  const e = t.ngSrc.trim();
  if (e.startsWith("blob:"))
    throw new b(2952, `${he(t.ngSrc)} \`ngSrc\` was set to a blob URL (${e}). Blob URLs are not supported by the NgOptimizedImage directive. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a regular \`src\` attribute instead.`);
}
function k0(t, e, n) {
  const o = typeof n == "string", r = o && n.trim() === "";
  if (!o || r)
    throw new b(2952, `${he(t.ngSrc)} \`${e}\` has an invalid value (\`${n}\`). To fix this, change the value to a non-empty string.`);
}
function xN(t, e) {
  if (e == null)
    return;
  k0(t, "ngSrcset", e);
  const n = e, o = R0.test(n), r = vN.test(n);
  if (r && ON(t, n), !(o || r))
    throw new b(2952, `${he(t.ngSrc)} \`ngSrcset\` has an invalid value (\`${e}\`). To fix this, supply \`ngSrcset\` using a comma-separated list of one or more width descriptors (e.g. "100w, 200w") or density descriptors (e.g. "1x, 2x").`);
}
function ON(t, e) {
  if (!e.split(",").every((o) => o === "" || parseFloat(o) <= ad))
    throw new b(2952, `${he(t.ngSrc)} the \`ngSrcset\` contains an unsupported image density:\`${e}\`. NgOptimizedImage generally recommends a max image density of ${js}x but supports image densities up to ${ad}x. The human eye cannot distinguish between image densities greater than ${js}x - which makes them unnecessary for most use cases. Images that will be pinch-zoomed are typically the primary use case for ${ad}x images. Please remove the high density descriptor and try again.`);
}
function FN(t, e) {
  let n;
  return e === "width" || e === "height" ? n = `Changing \`${e}\` may result in different attribute value applied to the underlying image element and cause layout shifts on a page.` : n = `Changing the \`${e}\` would have no effect on the underlying image element, because the resource loading has already occurred.`, new b(2953, `${he(t.ngSrc)} \`${e}\` was updated after initialization. The NgOptimizedImage directive will not react to this input change. ${n} To fix this, either switch \`${e}\` to a static value or wrap the image element in an *ngIf that is gated on the necessary value.`);
}
function RN(t, e, n) {
  n.forEach((o) => {
    if (e.hasOwnProperty(o) && !e[o].isFirstChange())
      throw o === "ngSrc" && (t = { ngSrc: e[o].previousValue }), FN(t, o);
  });
}
function Ny(t, e, n) {
  const o = typeof e == "number" && e > 0, r = typeof e == "string" && /^\d+$/.test(e.trim()) && parseInt(e) > 0;
  if (!o && !r)
    throw new b(2952, `${he(t.ngSrc)} \`${n}\` has an invalid value. To fix this, provide \`${n}\` as a number greater than 0.`);
}
function kN(t, e, n) {
  const o = n.listen(e, "load", () => {
    o(), r();
    const i = window.getComputedStyle(e);
    let s = parseFloat(i.getPropertyValue("width")), a = parseFloat(i.getPropertyValue("height"));
    if (i.getPropertyValue("box-sizing") === "border-box") {
      const I = i.getPropertyValue("padding-top"), w = i.getPropertyValue("padding-right"), M = i.getPropertyValue("padding-bottom"), P = i.getPropertyValue("padding-left");
      s -= parseFloat(w) + parseFloat(P), a -= parseFloat(I) + parseFloat(M);
    }
    const c = s / a, u = s !== 0 && a !== 0, d = e.naturalWidth, f = e.naturalHeight, h = d / f, p = t.width, g = t.height, y = p / g, D = Math.abs(y - h) > ky, m = u && Math.abs(h - c) > ky;
    if (D)
      console.warn(ve(2952, `${he(t.ngSrc)} the aspect ratio of the image does not match the aspect ratio indicated by the width and height attributes. 
Intrinsic image size: ${d}w x ${f}h (aspect-ratio: ${sl(h)}). 
Supplied width and height attributes: ${p}w x ${g}h (aspect-ratio: ${sl(y)}). 
To fix this, update the width and height attributes.`));
    else if (m)
      console.warn(ve(2952, `${he(t.ngSrc)} the aspect ratio of the rendered image does not match the image's intrinsic aspect ratio. 
Intrinsic image size: ${d}w x ${f}h (aspect-ratio: ${sl(h)}). 
Rendered image size: ${s}w x ${a}h (aspect-ratio: ${sl(c)}). 
This issue can occur if "width" and "height" attributes are added to an image without updating the corresponding image styling. To fix this, adjust image styling. In most cases, adding "height: auto" or "width: auto" to the image styling will fix this issue.`));
    else if (!t.ngSrcset && u) {
      const I = js * s, w = js * a, M = d - I >= Py, P = f - w >= Py;
      (M || P) && console.warn(ve(2960, `${he(t.ngSrc)} the intrinsic image is significantly larger than necessary. 
Rendered image size: ${s}w x ${a}h. 
Intrinsic image size: ${d}w x ${f}h. 
Recommended intrinsic image size: ${I}w x ${w}h. 
Note: Recommended intrinsic image size is calculated assuming a maximum DPR of ${js}. To improve loading time, resize the image or consider using the "ngSrcset" and "sizes" attributes.`));
    }
  }), r = n.listen(e, "error", () => {
    o(), r();
  });
}
function PN(t) {
  let e = [];
  if (t.width === void 0 && e.push("width"), t.height === void 0 && e.push("height"), e.length > 0)
    throw new b(2954, `${he(t.ngSrc)} these required attributes are missing: ${e.map((n) => `"${n}"`).join(", ")}. Including "width" and "height" attributes will prevent image-related layout shifts. To fix this, include "width" and "height" attributes on the image tag or turn on "fill" mode with the \`fill\` attribute.`);
}
function NN(t) {
  if (t.width || t.height)
    throw new b(2952, `${he(t.ngSrc)} the attributes \`height\` and/or \`width\` are present along with the \`fill\` attribute. Because \`fill\` mode causes an image to fill its containing element, the size attributes have no effect and should be removed.`);
}
function LN(t, e, n) {
  const o = n.listen(e, "load", () => {
    o(), r();
    const i = e.clientHeight;
    t.fill && i === 0 && console.warn(ve(2952, `${he(t.ngSrc)} the height of the fill-mode image is zero. This is likely because the containing element does not have the CSS 'position' property set to one of the following: "relative", "fixed", or "absolute". To fix this problem, make sure the container element has the CSS 'position' property defined and the height of the element is not zero.`));
  }), r = n.listen(e, "error", () => {
    o(), r();
  });
}
function $N(t) {
  if (t.loading && t.priority)
    throw new b(2952, `${he(t.ngSrc)} the \`loading\` attribute was used on an image that was marked "priority". Setting \`loading\` on priority images is not allowed because these images will always be eagerly loaded. To fix this, remove the “loading” attribute from the priority image.`);
  const e = ["auto", "eager", "lazy"];
  if (typeof t.loading == "string" && !e.includes(t.loading))
    throw new b(2952, `${he(t.ngSrc)} the \`loading\` attribute has an invalid value (\`${t.loading}\`). To fix this, provide a valid value ("lazy", "eager", or "auto").`);
}
function BN(t, e) {
  if (e === Ga) {
    let n = "";
    for (const o of IN)
      if (o.testUrl(t)) {
        n = o.name;
        break;
      }
    n && console.warn(ve(2962, `NgOptimizedImage: It looks like your images may be hosted on the ${n} CDN, but your app is not using Angular's built-in loader for that CDN. We recommend switching to use the built-in by calling \`provide${n}Loader()\` in your \`providers\` and passing it your instance's base URL. If you don't want to use the built-in loader, define a custom loader function using IMAGE_LOADER to silence this warning.`));
  }
}
function jN(t, e) {
  t.ngSrcset && e === Ga && console.warn(ve(2963, `${he(t.ngSrc)} the \`ngSrcset\` attribute is present but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for all configured sizes. To fix this, provide a loader or remove the \`ngSrcset\` attribute from the image.`));
}
function HN(t, e) {
  t.loaderParams && e === Ga && console.warn(ve(2963, `${he(t.ngSrc)} the \`loaderParams\` attribute is present but no image loader is configured (i.e. the default one is being used), which means that the loaderParams data will not be consumed and will not affect the URL. To fix this, provide a custom loader or remove the \`loaderParams\` attribute from the image.`));
}
function sl(t) {
  return Number.isInteger(t) ? t : t.toFixed(2);
}
function P0(t) {
  return typeof t == "string" ? t : cn(t);
}
class Ar {
  // The constructor is private to prevent direct construction calls
  // with the `new` operator
  constructor() {
    this.alreadySet = !1;
  }
  static getInstance() {
    return Ar.instance || (Ar.instance = new Ar()), Ar.instance;
  }
  /**
   * Method to set the license key for the application.
   * A 'meta' element is created with content as 'guiexperttable=<license key>'
   * and appended into the head section of the document
   *
   * @param {string} key - The license key to set for the application.
   *
   * @return {void} - This method does not return anything
   */
  setLicenseKey(e) {
    if (e && !this.alreadySet) {
      const n = document.createElement("meta");
      n.content = "license=" + e, n.name = "guiexperttable", document.getElementsByTagName("head")[0].appendChild(n), this.alreadySet = !0;
    }
  }
}
function Sf(t) {
  return t && t.type === "TreeRow";
}
function wf(t) {
  return t && t.type === "AreaModelTree";
}
class wg {
  constructor(e = -1, n = -1, o = -1, r = -1, i, s, a, l = 0, c = 0, u = 0, d = "") {
    this.rowIndex = e, this.rowTop = n, this.columnIndex = o, this.columnLeft = r, this.areaIdent = i, this.sideIdent = s, this.originalEvent = a, this.clickCount = l, this.draggingX = c, this.draggingY = u, this.action = d;
  }
  clone() {
    return new wg(
      this.rowIndex,
      this.rowTop,
      this.columnIndex,
      this.columnLeft,
      this.areaIdent,
      this.sideIdent,
      this.originalEvent,
      this.clickCount,
      this.draggingX,
      this.draggingY,
      this.action
    );
  }
}
class Dn {
  constructor(e = ">", n = "", o = []) {
    this.content = e, this.style = n, this.classes = o;
  }
}
class N0 {
  constructor(e = new Dn(
    ">",
    "transform: rotate(90deg) translate(66%, -66%); transform-origin: 0 0;",
    ["gt-table-tree-arrow-expanded"]
  ), n = new Dn(
    ">",
    "",
    ["ge-table-tree-arrow-collapsed"]
  ), o = new Dn(
    ">",
    "color:transparent;",
    ["gt-table-tree-arrow-hidden"]
  ), r = new Dn(
    "↕",
    "",
    ["gt-table-tree-arrow-expanded-all"]
  )) {
    this.arrowExpanded = e, this.arrowCollapsed = n, this.arrowPlaceholder = o, this.arrowExpandCollapseAll = r;
  }
}
class L0 {
  constructor(e = new Dn("↑", "", ["ge-header-sorted-asc"]), n = new Dn("↓", "", ["ge-header-sorted-desc"]), o = new Dn("↑", "color:transparent;", [])) {
    this.iconAsc = e, this.iconDesc = n, this.iconPlaceholder = o;
  }
}
class VN {
  constructor(e) {
    this.domService = e;
  }
  setStyle(e, n, o) {
    return this.domService.setStyle(e, n, o), e;
  }
  applyStyle(e, n) {
    for (const o in n)
      this.domService.setStyle(e, o, n[o]);
    return e;
  }
  applyDisplayNoneStyle(e) {
    return this.domService.setStyle(e, "display", "none"), e;
  }
  applyDisplayBlockStyle(e) {
    return this.domService.setStyle(e, "display", "block"), e;
  }
  applyStyleInPx(e, n) {
    return Object.entries(n).forEach(([o, r]) => this.domService.setStyle(e, o, r + "px")), e;
  }
  applyStylePosistionRelative(e) {
    return this.domService.setStyle(e, "position", "relative"), this.domService.setStyle(e, "overflow", "clip"), e;
  }
  applyStylePosistionAbsolute(e) {
    return this.domService.setStyle(e, "position", "absolute"), e;
  }
  applyStyleFullSize(e) {
    return this.domService.setStyle(e, "width", "100%"), this.domService.setStyle(e, "height", "100%"), e;
  }
  applyStyleOverflowAuto(e = "auto", n = "auto", o) {
    return this.domService.setStyle(o, "overflow-x", e), this.domService.setStyle(o, "overflow-y", n), o;
  }
  applyStyleNoPadding(e) {
    return this.domService.setStyle(e, "padding", "0"), this.domService.setStyle(e, "margin", "0"), this.domService.setStyle(e, "border", "0"), e;
  }
  appendRelativeChildDiv(e) {
    const n = this.applyStylePosistionRelative(
      this.applyStyleFullSize(
        this.applyStyleNoPadding(
          this.domService.createElement("div")
        )
      )
    );
    return this.domService.appendChild(e, n), this.applyStylePosistionAbsolute(e), { parent: e, child: n, cache: {} };
  }
  appendText(e, n) {
    const o = this.domService.createText(n);
    return this.domService.appendChild(e, o), o;
  }
  addClass(e, n) {
    return e.includes(" ") ? e.split(" ").forEach((o) => this.domService.addClass(n, o)) : this.domService.addClass(n, e), n;
  }
  removeClass(e, n) {
    return e.includes(" ") ? e.split(" ").forEach((o) => this.domService.removeClass(n, o)) : this.domService.removeClass(n, e), n;
  }
  addClasses(e, n) {
    if (e)
      for (const o of e)
        this.domService.addClass(n, o);
    return n;
  }
  setAttribute(e, n, o) {
    return n && o && this.domService.setAttribute(e, n, o), e;
  }
  createAreaDivWithClass(e, n, o, r) {
    const i = this.domService.createElement("div");
    return this.addClass(e, i), this.domService.setAttribute(i, "data-area", o), this.domService.setAttribute(i, "data-side", r), this.domService.appendChild(n, i), i;
  }
  createDivWithClass(e, n) {
    const o = this.domService.createElement("div");
    return this.addClass(e, o), this.domService.appendChild(n, o), o;
  }
  addRowDiv(e, n, o = -1, r, i, s = "") {
    const a = n.index ?? -1, l = this.getDivOrCreateDiv(a, e);
    if (this.domService.addClass(l, "ge-table-row-div"), this.domService.addClass(l, `ge-table-row-div-${n.index}`), r === "body" && i === "center") {
      const c = ((n == null ? void 0 : n.index) ?? 0) % 2 === 0 ? "even" : "odd";
      this.domService.addClass(l, `ge-table-row-${c}`);
    }
    if (this.domService.setStyle(l, "display", "clip"), this.domService.setStyle(l, "position", "absolute"), this.domService.setStyle(l, "left", `${n.left}px`), this.domService.setStyle(l, "top", `${n.top}px`), this.domService.setStyle(l, "width", `${n.width}px`), this.domService.setStyle(l, "height", `${n.height}px`), this.domService.setAttribute(l, "data-row-index", `${o}`), this.domService.setAttribute(l, "data-area", `${r}`), s) {
      const c = this.domService.createText(s);
      this.domService.appendChild(l, c);
    }
    return this.domService.appendChild(e.child, l), l;
  }
  addColumnDiv(e) {
    const { parent: n, geo: o, rowIndex: r = -1, columnIndex: i = -1, areaIdent: s, sideIdent: a, text: l = "", treeArrow: c, tableOptions: u, checkedType: d = void 0, sortState: f } = e, h = u == null ? void 0 : u.treeOptions, p = u == null ? void 0 : u.showCheckboxWihoutExtraColumn, g = this.domService.createElement("div");
    this.domService.addClass(g, "ge-table-col-div"), this.domService.addClass(g, `ge-table-col-div-${o.index}`), this.domService.setAttribute(g, "data-col-index", `${o.index}`), this.domService.setAttribute(g, "data-row-index", `${r}`), this.domService.setAttribute(g, "data-area", `${s}`);
    const y = ((o == null ? void 0 : o.index) ?? 0) % 2 === 0 ? "even" : "odd";
    if (s === "body" && a === "center" && this.domService.addClass(g, `ge-table-column-${y}`), this.domService.setStyle(g, "display", "clip"), this.domService.setStyle(g, "position", "absolute"), this.domService.setStyle(g, "left", `${o.left}px`), this.domService.setStyle(g, "top", `${o.top}px`), this.domService.setStyle(g, "width", `${o.width}px`), this.domService.setStyle(g, "height", `${o.height}px`), c && c !== "none" && (this.domService.addClass(g, "ge-table-col-tree"), this.addArrowDiv(g, c, h, r, i, s)), p && i === 0 && d && this.addCheckboxToDiv(g, d, s, r), l) {
      const D = c !== "none" && i === 0;
      this.addLabelDiv(g, l, D, r, i, s);
    }
    return f && this.addSortedIcon(g, f, u == null ? void 0 : u.sortedOptions, i), this.domService.appendChild(n, g), g;
  }
  addCheckboxToDiv(e, n, o, r) {
    const i = this.domService.createElement("div"), s = n === "full" ? "checked" : "";
    return i.innerHTML = `
            <input
                type="checkbox"
                data-area="${o}"
                data-row-index="${r}"
                data-input-type="checkbox"
                ${s}
                class="ge-table-row-checkbox"> `, this.domService.setStyle(i, "display", "inline"), this.domService.setStyle(i, "width", "inherit"), this.domService.setAttribute(i, "data-row-index", `${r}`), this.domService.appendChild(e, i), i;
  }
  addLabelDiv(e, n = "", o = !1, r = -1, i = -1, s = "body") {
    const a = this.domService.createElement("div");
    if (this.domService.addClass(a, "ge-table-label-div"), this.domService.setStyle(a, "position", "relative"), this.domService.setStyle(a, "background", "transparent"), this.domService.setStyle(a, "width", "100%"), this.domService.setStyle(a, "height", "100%"), this.domService.setAttribute(a, "data-row-index", `${r}`), this.domService.setAttribute(a, "data-col-index", `${i}`), this.domService.setAttribute(a, "data-area", `${s}`), n)
      if (o) {
        const l = this.domService.createText(n);
        this.domService.appendChild(a, l);
      } else {
        const l = this.domService.createElement("div");
        this.domService.appendChild(a, l);
        const c = this.domService.createText(n);
        this.domService.addClass(l, "ge-table-label"), this.domService.appendChild(l, c), this.domService.setAttribute(l, "data-row-index", `${r}`), this.domService.setAttribute(l, "data-col-index", `${i}`), this.domService.setAttribute(l, "data-area", `${s}`);
      }
    return this.domService.appendChild(e, a), a;
  }
  addSortedIcon(e, n = "", o = new L0(), r = -1) {
    const i = this.domService.createElement("div");
    this.domService.addClass(i, "ge-table-sorted-icon-div"), this.domService.setStyle(i, "position", "absolute"), this.domService.setStyle(i, "top", "0"), this.domService.setStyle(i, "right", "0"), this.domService.setStyle(i, "width", "20px"), this.domService.setStyle(i, "background", "transparent"), this.domService.setStyle(i, "cursor", "pointer"), this.domService.setAttribute(i, "data-col-index", `${r}`), this.domService.setAttribute(i, "data-area", "header");
    let s;
    n === "asc" ? s = o.iconAsc : n === "desc" ? s = o.iconDesc : s = o.iconPlaceholder;
    const a = s.content, l = this.domService.createText(a);
    this.domService.appendChild(i, l), s.style && this.applyStyleString(i, s.style);
    for (const c of s.classes)
      this.domService.addClass(i, c);
    return this.domService.appendChild(e, i), i;
  }
  addArrowDiv(e, n = "none", o = new N0(), r = -1, i = -1, s = "body") {
    const a = this.domService.createElement("div");
    this.domService.addClass(a, "ge-table-tree-arrow-div"), this.domService.setStyle(a, "display", "inline-block"), this.domService.setStyle(a, "position", ""), this.domService.setStyle(a, "width", "20px"), this.domService.setStyle(a, "background", "transparent"), this.domService.setStyle(a, "cursor", "pointer"), this.domService.setAttribute(a, "data-row-index", `${r}`), this.domService.setAttribute(a, "data-col-index", `${i}`), this.domService.setAttribute(a, "data-area", `${s}`);
    let l;
    n === "expanded" ? l = o.arrowExpanded : n === "collapsed" ? l = o.arrowCollapsed : l = o.arrowPlaceholder;
    const c = l.content, u = this.domService.createText(c);
    this.domService.appendChild(a, u), l.style && this.applyStyleString(a, l.style);
    for (const d of l.classes)
      this.domService.addClass(a, d);
    return this.domService.appendChild(e, a), a;
  }
  addColumnBorderDivs(e, n, o, r, i) {
    if (e.verticalBorderVisible) {
      const s = `ge-table-${r}-${i}-vertical-border`;
      this.addVerticalBorder(o, n, s);
    }
    if (e.horizontalBorderVisible) {
      const s = `ge-table-${r}-${i}-horizontal-border`;
      this.addHorizontalBorder(o, n, s);
    }
    return n;
  }
  addHorizontalBorder(e, n, o = "ge-table-body-center-horizontal-border") {
    const r = this.domService.createElement("div");
    return this.domService.addClass(r, o), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${e.left}px`), this.domService.setStyle(r, "top", `${e.top}px`), this.domService.setStyle(r, "width", `${e.width}px`), this.domService.setStyle(r, "height", "1px"), this.domService.appendChild(n, r), r;
  }
  addFocusBorderDivs(e, n, o) {
    n = { ...n, width: n.width + 1, height: n.height + 1 };
    let r = this.domService.createElement("div");
    return this.domService.addClass(r, "ge-table-focus-border"), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${n.left}px`), this.domService.setStyle(r, "top", `${n.top}px`), this.domService.setStyle(r, "width", "1px"), this.domService.setStyle(r, "height", `${n.height}px`), this.domService.setStyle(r, "z-index", "9999"), this.applyStyle(r, o), this.domService.appendChild(e, r), r = this.domService.createElement("div"), this.domService.addClass(r, "ge-table-focus-border"), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${n.left + n.width - 1}px`), this.domService.setStyle(r, "top", `${n.top}px`), this.domService.setStyle(r, "width", "1px"), this.domService.setStyle(r, "height", `${n.height}px`), this.domService.setStyle(r, "z-index", "9999"), this.applyStyle(r, o), this.domService.appendChild(e, r), r = this.domService.createElement("div"), this.domService.addClass(r, "ge-table-focus-border"), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${n.left}px`), this.domService.setStyle(r, "top", `${n.top}px`), this.domService.setStyle(r, "width", `${n.width}px`), this.domService.setStyle(r, "height", "1px"), this.domService.setStyle(r, "z-index", "9999"), this.applyStyle(r, o), this.domService.appendChild(e, r), r = this.domService.createElement("div"), this.domService.addClass(r, "ge-table-focus-border"), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${n.left}px`), this.domService.setStyle(r, "top", `${n.top + n.height - 1}px`), this.domService.setStyle(r, "width", `${n.width}px`), this.domService.setStyle(r, "height", "1px"), this.domService.setStyle(r, "z-index", "9999"), this.applyStyle(r, o), this.domService.appendChild(e, r), e;
  }
  addVerticalBorder(e, n, o = "ge-table-body-center-vertical-border") {
    const r = this.domService.createElement("div");
    return this.domService.addClass(r, o), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${e.left}px`), this.domService.setStyle(r, "top", `${e.top}px`), this.domService.setStyle(r, "width", "1px"), this.domService.setStyle(r, "height", `${e.height}px`), this.domService.appendChild(n, r), r;
  }
  addDiv(e, n, o = "") {
    const r = this.domService.createElement("div");
    return o && this.domService.addClass(r, o), this.domService.setStyle(r, "display", "clip"), this.domService.setStyle(r, "position", "absolute"), this.domService.setStyle(r, "left", `${n.left}px`), this.domService.setStyle(r, "top", `${n.top}px`), this.domService.setStyle(r, "width", `${n.width}px`), this.domService.setStyle(r, "height", `${n.height}px`), this.domService.appendChild(e, r), r;
  }
  applyStyleString(e, n) {
    const o = n.split(";").map((r) => r.trim()).filter((r) => r);
    for (const r of o) {
      const [i, s] = r.split(":");
      this.domService.setStyle(e, i.trim(), s.trim());
    }
  }
  getDivOrCreateDiv(e, n) {
    let o = n.cache[e];
    return o ? (o.innerText = "", o) : (o = this.domService.createElement("div"), n.cache[e] = o, o);
  }
}
const Mg = (t) => t === "header" ? "header" : t === "footer" ? "footer" : "body";
class UN {
  constructor(e, n) {
    if (this.rowIdx = -1, this.colIdx = -1, this.action = null, this.inputType = null, this.className = "", e !== null && (e instanceof HTMLDivElement || e instanceof HTMLSpanElement || e instanceof HTMLInputElement)) {
      this.className = e.className, this.action = e.getAttribute("data-ge-action"), this.inputType = e.getAttribute("data-input-type"), this.rowIdx = Number(e.getAttribute("data-row-index")), this.colIdx = Number(e.getAttribute("data-col-index"));
      const o = e.getAttribute("data-area");
      if (o && (this.areaIdent = Mg(o), this.areaModel = n.tableModel.getAreaModel(this.areaIdent), this.row = this.areaModel.getRowByIndex(this.rowIdx)), e instanceof HTMLInputElement) {
        const r = e;
        this.value = r.value;
      }
    }
  }
}
class GN {
  constructor(e) {
    this.tableScope = e, this.doubleClickDelay = 500, this.expandedAll = !0, this.mouseDown = !1, this.dragging = !1, this.lastClicked = 0, this.tableScope.hostElement.addEventListener("click", this.onHostElementClicked.bind(this)), this.tableScope.hostElement.addEventListener("dblclick", this.onHostElementDblClicked.bind(this)), this.tableScope.hostElement.addEventListener("mousedown", this.onMouseDown.bind(this)), this.tableScope.hostElement.addEventListener("mousemove", this.onMouseMove.bind(this)), this.tableScope.hostElement.addEventListener("mouseup", this.onMouseUp.bind(this)), this.tableScope.hostElement.addEventListener("contextmenu", this.onContextmenu.bind(this)), this.tableScope.hostElement._MouseHandler = "true", this.tableScope.scrollViewport.addEventListener("scroll", this.tableScope.adjustAfterScrolling.bind(this.tableScope)), [window, this.tableScope.hostElement].forEach(
      (n) => n.addEventListener("resize", this.tableScope.adjustContainersAndRows.bind(this.tableScope))
    );
  }
  /**
   * Handles the "contextmenu" event.
   *
   * @private
   * @param {MouseEvent} evt - The mouse event object.
   * @return {void}
   */
  onContextmenu(e) {
    this.mouseEvent = e;
    const n = this.tableScope.createGeMouseEvent(this.mouseEvent);
    this.tableScope.contextmenu(n);
  }
  /**
   * Handles the click event on the host element.
   *
   * @param {MouseEvent} event - The click event.
   *
   * @return {void}
   */
  onHostElementClicked(e) {
    const n = Date.now();
    if (n - this.lastClicked < this.doubleClickDelay)
      return;
    this.lastClicked = n;
    const o = new UN(e.target, this.tableScope);
    if (o.action === "toggleExpandCollapseAll")
      this.expandedAll = !this.expandedAll, this.tableScope.toggleExpandCollapseAll(this.expandedAll), e.preventDefault(), e.stopPropagation();
    else if (o.action === "toggleHeaderGroup")
      this.tableScope.toggleHeaderGroup(o), e.preventDefault(), e.stopPropagation();
    else if (o.inputType === "checkbox" && o.areaIdent)
      this.tableScope.toggleRowCheckbox(o.rowIdx, o.colIdx, o.areaIdent), e.preventDefault(), e.stopPropagation();
    else if (Sf(o.row) && o.areaModel) {
      const r = o.colIdx === this.getArrowColumnIndex() && e.altKey, i = o.className.includes("ge-table-tree-arrow-div");
      if (console.info(i, r), r || i) {
        e.preventDefault(), e.stopPropagation();
        const s = o.row;
        s.expanded = !s.expanded, "recalcVisibleTreeRows" in o.areaModel && o.areaModel.recalcVisibleTreeRows(), this.tableScope.tableModel.recalcSize(this.tableScope.hostElement.clientWidth), this.tableScope.adjustContainersAndRows(), this.updateCollapsedExpandedState(s);
      }
    }
    if (o.areaIdent === "body" && this.tableScope.tableOptions.getFocusModel) {
      const r = this.tableScope.tableOptions.getFocusModel();
      r == null || r.clear(), r == null || r.setFocus(o.rowIdx, o.colIdx);
    }
    this.publishGeMouseEvent(e, 1);
  }
  /**
   * Handles the double click event on the host element.
   * This method is private.
   *
   * @param {MouseEvent} event - The double click event.
   */
  onHostElementDblClicked(e) {
    if (this.lastClicked = Date.now(), e.target instanceof HTMLElement) {
      const n = e.target, o = n.getAttribute("data-area"), r = Mg(o), i = Number(n.getAttribute("data-row-index")), s = Number(n.getAttribute("data-col-index")), a = this.tableScope.tableModel.getAreaModel(r);
      if (o && r === "header")
        this.tableScope.tableModel.isSortable(s) && (this.tableScope.clearSelection(), this.tableScope.onHeaderDblClicked(e, i, s));
      else if (n.getAttribute("data-row-index")) {
        const l = a.getRowByIndex(i);
        if (o && r === "body" && a.isEditable(i, s) && (this.tableScope.clearSelection(), this.tableScope.initRenderEditor(i, s)), Sf(l) && s === this.getArrowColumnIndex()) {
          e.preventDefault(), e.stopPropagation();
          const c = l;
          c.expanded = !c.expanded, "recalcVisibleTreeRows" in a && a.recalcVisibleTreeRows(), this.tableScope.tableModel.recalcSize(this.tableScope.hostElement.clientWidth), this.tableScope.adjustContainersAndRows(), this.updateCollapsedExpandedState(c);
        }
      }
    }
    this.publishGeMouseEvent(e, 2);
  }
  /**
   * Publishes a GeMouseEvent.
   *
   * @param {MouseEvent} event - The MouseEvent to publish.
   * @param {number} clickCount - The number of clicks for the GeMouseEvent.
   *
   * @return {void}
   */
  publishGeMouseEvent(e, n) {
    var o;
    this.mouseEvent = e, this.geMouseEventOld = (o = this.geMouseEvent) == null ? void 0 : o.clone(), this.geMouseEvent = this.tableScope.createGeMouseEvent(e), this.geMouseEvent && (this.geMouseEvent.clickCount = n), this.tableScope.onMouseClicked(this.geMouseEvent, this.geMouseEventOld), this.tableScope.publishGeMouseEvent(this.geMouseEvent), n === 1 && this.tableScope.debounceRepaint();
  }
  /**
   * Update the collapsed/expanded state of a tree row.
   *
   * @param {TreeRowIf<any>} tr - The tree row object.
   * @returns {void}
   */
  updateCollapsedExpandedState(e) {
    var n, o, r, i, s;
    const a = (o = (n = this.tableScope.tableOptions) == null ? void 0 : n.autoRestoreOptions) == null ? void 0 : o.getRowId;
    if (a) {
      const l = (r = this.tableScope.storeStateCollapsedExpandService) == null ? void 0 : r.collapsedExpandedStateGet().mode, c = l === "collapsed" && !e.expanded || l === "expanded" && e.expanded, u = l === "collapsed" && e.expanded || l === "expanded" && !e.expanded, d = a(e.data);
      c ? (i = this.tableScope.storeStateCollapsedExpandService) == null || i.collapsedStateIdsPush(d) : u && ((s = this.tableScope.storeStateCollapsedExpandService) == null || s.collapsedStateIdsRemove(d));
    }
  }
  getArrowColumnIndex() {
    return this.tableScope.tableModel.isRowCheckboxVisible() ? 1 : 0;
  }
  onMouseDown(e) {
    this.dragging || (this.mouseEvent = e, this.startMouseEvent = this.tableScope.createGeMouseEvent(this.mouseEvent), this.tableScope.onMouseDown(this.startMouseEvent), this.mouseDown = !0);
  }
  onMouseMove(e) {
    this.mouseEvent = e, this.mouseDown ? (this.dragging || (this.dragging = !0, this.tableScope.setDragging(!0)), requestAnimationFrame(this.mouseDraggingOnFrame.bind(this))) : requestAnimationFrame(this.mouseMoveOnFrame.bind(this));
  }
  onMouseUp(e) {
    this.mouseEvent = e, this.dragging && requestAnimationFrame(this.mouseDraggingEndOnFrame.bind(this)), this.mouseDown = !1, this.dragging = !1, this.tableScope.setDragging(!1);
  }
  mouseDraggingOnFrame() {
    var e;
    if (this.mouseEvent) {
      const n = this.tableScope.createGeMouseEvent(this.mouseEvent);
      (e = this.startMouseEvent) != null && e.originalEvent && (n.draggingX = this.mouseEvent.clientX - this.startMouseEvent.originalEvent.clientX, n.draggingY = this.mouseEvent.clientY - this.startMouseEvent.originalEvent.clientY), this.tableScope.mouseDraggingOnFrame(n, this.startMouseEvent);
    }
  }
  mouseDraggingEndOnFrame() {
    var e;
    if (this.mouseEvent) {
      const n = this.tableScope.createGeMouseEvent(this.mouseEvent);
      (e = this.startMouseEvent) != null && e.originalEvent && (n.draggingX = this.mouseEvent.clientX - this.startMouseEvent.originalEvent.clientX, n.draggingY = this.mouseEvent.clientY - this.startMouseEvent.originalEvent.clientY), this.tableScope.mouseDraggingEndOnFrame(n);
    }
  }
  mouseMoveOnFrame() {
    if (this.mouseEvent) {
      const e = this.tableScope.createGeMouseEvent(this.mouseEvent);
      this.tableScope.mouseMove(e);
    }
  }
}
class WN {
  constructor(e) {
    this.tableScope = e;
  }
  /**
   * Updates the cells in the table based on the provided events.
   *
   * @param {TableCellUpdateEventIf[]} events - The array of events representing the updates to perform on the cells.
   * @param {boolean} [repaintAll=false] - Optional parameter indicating whether to repaint all cells or not. Default value is false. If true, the full table will be rendered. If false, the table cell will be rendered immediately.
   *
   * @return {void} - This method doesn't return anything.
   */
  updateCells(e, n = !1) {
    this.tableScope.updateCells(e, n);
  }
  /**
   * Notifies that the external filter has changed.
   *
   * @return {void}
   */
  externalFilterChanged() {
    this.tableScope.externalFilterChanged();
  }
  /**
   * Scrolls the table body to the specified pixel coordinates.
   *
   * @param {number} px - The horizontal pixel coordinate to scroll to. Defaults to 0.
   * @param {number} py - The vertical pixel coordinate to scroll to. Defaults to 0.
   * @return {void}
   */
  scrollToPixel(e = 0, n = 0) {
    this.tableScope.scrollToPixel(e, n);
  }
  /**
   * Scrolls to the specified index in both horizontal and vertical directions.
   *
   * @param {number} indexX - The index of the column to scroll to in the horizontal direction. Default is 0.
   * @param {number} indexY - The index of the row to scroll to in the vertical direction. Default is 0.
   *
   * @return undefined
   */
  scrollToIndex(e = 0, n = 0) {
    this.tableScope.scrollToIndex(e, n);
  }
  /**
   * Sets whether the header is visible or not.
   *
   * @param _visible - A boolean value indicating whether the header should be visible. Default value is true.
   *
   * @return undefined
   */
  setHeaderVisible(e = !0) {
  }
  /**
   * Sets the visibility of a column in the table.
   *
   * @param {_column} - The column index or column definition to set visibility for.
   * @param {_visible=true} - The flag to set visibility to. true for visible, false for hidden.
   *
   * @return {void} - There is no return value.
   */
  setColumnVisible(e, n = !0) {
  }
  /**
   * Returns whether a column is visible or not.
   *
   * @param {number | ColumnDefIf} _column - The column index or the column definition.
   * @return {boolean} - True if the column is visible, false otherwise.
   */
  isColumnVisible(e) {
    return !0;
  }
  /**
   * Checks if the header is visible.
   *
   * @return {boolean} - Returns true if the header is visible, otherwise returns false.
   */
  isHeaderVisible() {
    return !0;
  }
  /**
   * Sets the visibility of the footer.
   *
   * @param {boolean} _visible - Indicates whether the footer should be visible or not. Default value is true.
   *
   * @return {void} - This method does not return any value.
   */
  setFooterVisible(e = !0) {
  }
  /**
   * Determines if the footer is visible.
   *
   * @returns {boolean} True if the footer is visible, false otherwise.
   */
  isFooterVisible() {
    return !0;
  }
  /**
   * Repaints the table.
   *
   * This method calls the repaint method of the tableScope object
   * to update and redraw the table based on the latest data.
   */
  repaint() {
    this.tableScope.repaint();
  }
  /**
   * Repaints the table scope with hard repaint.
   * Repaints the UI by resetting the size of the wrapper div,
   * adjusting the containers and rows, and performing additional adjustments
   * after scrolling.
   *
   * @return {void}
   */
  repaintHard() {
    this.tableScope.repaintHard();
  }
  /**
   * Clears the current selection of the table.
   * The table will be rendered automatically.
   *
   * @returns {void}
   */
  clearSelection() {
    this.tableScope.clearSelection(!0);
  }
  /**
   * Sets the selection model for the table scope.
   *
   * @param {SelectionModel} sm - The selection model to be set.
   * @param {boolean} [repaint=true] - Indicates whether the table should be repainted after setting the selection model. Default value is true.
   *
   * @return {void}
   */
  setSelectionModel(e, n = !0) {
    this.tableScope.setSelectionModel(e, n);
  }
  /**
   * Triggers the action with the given action ID.
   * This function can be invoked programmatically.
   *
   * @param {ActionId} actionId - The ID of the action to trigger.
   * @return {void}
   */
  triggerAction(e) {
    this.tableScope.onActionTriggered(e);
  }
  /**
   * Retrieves the mapping of shortcuts to corresponding action in the current table scope.
   *
   * @return {ShortcutActionIdMapping} The mapping of shortcuts to corresponding action.
   */
  getShortcutActionMapping() {
    return this.tableScope.shortcutService.getShortcutActionMapping();
  }
  /**
   * Copies the selected data from the table to the clipboard.
   *
   * @return {Promise<string>} - A promise that resolves with the copied data as a string.
   */
  copyToClipboard() {
    return this.tableScope.copyService.copyToClipboard(
      this.tableScope.tableModel,
      this.tableScope.selectionModel(),
      this.tableScope.focusModel()
    );
  }
  /**
   * Retrieves the current scope of the table.
   *
   * @returns {TableScope} The current scope of the table.
   */
  getTableScope() {
    return this.tableScope;
  }
  /**
   * Retrieves the selection model of the table.
   *
   * @return {SelectionModelIf | undefined} The selection model of the table,
   * or undefined if no selection model is available.
   */
  getSelectionModel() {
    return this.tableScope.selectionModel();
  }
}
class Ag {
  constructor(e) {
    this.getStorageKeyFn = e;
  }
  autoConvertMapToObject(e) {
    const n = {};
    if (e instanceof Map) {
      const o = e;
      for (const r of [...o]) {
        const [
          i,
          s
        ] = r;
        n[i] = s;
      }
    }
    return n;
  }
  checkAndPersistItem(e, n) {
    const o = this.getStorageKeyFn;
    if (o) {
      const r = o();
      if (r) {
        const i = r + e;
        if ((n + "").includes("Map")) {
          const s = this.autoConvertMapToObject(n);
          this.persistItem(i, s);
        } else
          this.persistItem(i, n);
      }
    }
  }
  persistItem(e, n) {
    n ? localStorage.setItem(e, JSON.stringify(n)) : localStorage.removeItem(e);
  }
  loadFromLocalStorage(e) {
    const n = localStorage.getItem(e);
    return n ? JSON.parse(n) : null;
  }
  // private loadItems() {
  //   const fn = this.getStorageKeyFn;
  //   if (fn) {
  //     const key = fn();
  //     if (key) {
  //       // A main key is given by function from options
  //       const subKey = key + this.CHECKED_STATE;
  //       const arr = this.loadFromLocalStorage<Array<string | number>>(subKey);
  //       if (arr) {
  //         this.checkedStateIds.length = 0;
  //         arr.forEach(a => this.checkedStateIds.push(a));
  //       }
  //
  //       const subKey2 = key + this.COLLAPSED_EXPANDED_STATE;
  //       const data = this.loadFromLocalStorage<CollapsedExpandedData>(subKey2);
  //       if (data) {
  //         this.collapsedExpandedState = data;
  //       }
  //
  //       const subKey3 = key + this.SELECTED_STATE;
  //       const arr3 = this.loadFromLocalStorage<object>(subKey3);
  //       if (arr3) {
  //         const map: Map<string | number, string[]> = new Map(Object.entries(arr3));
  //         if (map) {
  //           this.selectedStateIds.clear();
  //           map.forEach((col, k) => this.selectedStateIds.set(k, col));
  //         }
  //       }
  //
  //       const subKey4 = key + this.SCROLL_STATE;
  //       let scrollOffset = this.loadFromLocalStorage<[number, number]>(subKey4);
  //       this.scrollOffset = scrollOffset ? scrollOffset : [0, 0];
  //     }
  //   }
  // }
}
class zN extends Ag {
  constructor(e) {
    super(e), this.SCROLL_STATE = "scrollState", this.scrollOffset = [0, 0], this.load();
  }
  getScrollOffset() {
    return this.scrollOffset;
  }
  updateScrollOffset(e) {
    this.scrollOffset = e, this.checkAndPersistItem(this.SCROLL_STATE, this.scrollOffset);
  }
  load() {
    const e = this.getStorageKeyFn;
    if (e) {
      const n = e();
      if (n) {
        const o = n + this.SCROLL_STATE;
        let r = this.loadFromLocalStorage(o);
        this.scrollOffset = r || [0, 0];
      }
    }
  }
}
class qN {
  constructor(e = "collapsed", n = [], o = !1, r = !1) {
    this.mode = e, this.rowIds = n, this.allCollapsed = o, this.allExpanded = r;
  }
}
class YN extends Ag {
  constructor(e) {
    super(e), this.COLLAPSED_EXPANDED_STATE = "collapsedExpandedState", this.collapsedExpandedState = new qN(), this.load();
  }
  collapsedExpandedStateGet() {
    return this.collapsedExpandedState;
  }
  collapsedExpandedStateIncludes(e) {
    return this.collapsedExpandedState.rowIds.includes(e);
  }
  collapsedStateIdsPush(e) {
    this.collapsedExpandedState.rowIds.includes(e) || (this.collapsedExpandedState.rowIds.push(e), this.collapsedExpandedState.allCollapsed = !1, this.collapsedExpandedState.allExpanded = !1, this.persist());
  }
  collapsedStateIdsRemove(e) {
    const n = this.collapsedExpandedState.rowIds.indexOf(e);
    n !== -1 && (this.collapsedExpandedState.rowIds.splice(n, 1), this.collapsedExpandedState.allCollapsed = !1, this.collapsedExpandedState.allExpanded = !1, this.persist());
  }
  collapsedStateAll(e) {
    this.collapsedExpandedState.rowIds = [], this.collapsedExpandedState.mode = e ? "collapsed" : "expanded", this.collapsedExpandedState.allCollapsed = !e, this.collapsedExpandedState.allExpanded = e, this.persist();
  }
  load() {
    const e = this.getStorageKeyFn;
    if (e) {
      const n = e();
      if (n) {
        const o = n + this.COLLAPSED_EXPANDED_STATE, r = this.loadFromLocalStorage(o);
        r && (this.collapsedExpandedState = r);
      }
    }
  }
  persist() {
    this.checkAndPersistItem(this.COLLAPSED_EXPANDED_STATE, this.collapsedExpandedState);
  }
}
class ZN extends Ag {
  constructor(e) {
    super(e), this.SORTING_STATE = "sortingState", this.sortItems = [], this.load();
  }
  getSortItems() {
    return this.sortItems;
  }
  setSortItems(e) {
    this.sortItems = e, this.checkAndPersistItem(this.SORTING_STATE, this.sortItems);
  }
  load() {
    const e = this.getStorageKeyFn;
    if (e) {
      const n = e();
      if (n) {
        const o = n + this.SORTING_STATE, r = this.loadFromLocalStorage(o);
        this.sortItems = r || [];
      }
    }
  }
}
class gn {
  constructor(e = 0, n = 0, o = 0, r = 0, i) {
    this.left = e, this.width = n, this.height = o, this.top = r, this.index = i;
  }
}
class QN {
  constructor(e, n, o, r) {
    this.hostElement = e, this.tableModel = n, this.dom = o, this.tableOptions = r, this.scrollTop = 0, this.areaBodyWestGeo = new gn(), this.areaBodyCenterGeo = new gn(), this.areaBodyEastGeo = new gn();
    const i = this.hostElement;
    i.innerText = "", this.dom.setAttribute(i, "tabindex", "0"), this.dom.setStyle(
      this.dom.addClass("ge-table", i),
      "position",
      "relative"
    ), this.hoverRow = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-hover-row", i)
    ), this.hoverColumn = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-hover-column", i)
    ), this.draggingColumn = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-dragging-column", i)
    ), this.areaHeaderWest = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-header ge-table-header-west", i, "header", "west")
      )
    ), this.areaHeaderCenter = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-header ge-table-header-center", i, "header", "center")
      )
    ), this.areaHeaderEast = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-header ge-table-header-east", i, "body", "east")
      )
    ), this.areaBodyWest = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-body ge-table-body-west", i, "body", "west")
      )
    ), this.areaBodyEast = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-body ge-table-body-east", i, "body", "east")
      )
    ), this.areaFooterWest = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-footer ge-table-footer-west", i, "footer", "west")
      )
    ), this.areaFooterCenter = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-footer ge-table-footer-center", i, "footer", "center")
      )
    ), this.areaFooterEast = o.appendRelativeChildDiv(
      o.applyStylePosistionAbsolute(
        o.createAreaDivWithClass("ge-table-footer ge-table-footer-east", i, "footer", "east")
      )
    ), this.scrollViewport = o.applyStyleOverflowAuto(
      this.tableOptions.overflowX ?? "auto",
      this.tableOptions.overflowY ?? "auto",
      o.applyStyleNoPadding(
        o.applyStylePosistionAbsolute(
          o.createAreaDivWithClass("ge-table-scroll-viewport", i, "body", "center")
        )
      )
    ), this.contentWrapperDiv = o.applyStyleNoPadding(
      o.applyStylePosistionRelative(
        o.createDivWithClass("ge-table-scroll-content-wrapper", this.scrollViewport)
      )
    ), this.contentDiv = o.applyStyleNoPadding(
      o.applyStylePosistionRelative(
        o.createDivWithClass("ge-table-scroll-content", this.contentWrapperDiv)
      )
    ), this.areaBodyCenter = o.appendRelativeChildDiv(
      o.createDivWithClass("ge-table-body-center", this.contentDiv)
    ), this.borderHeaderBottom = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-header-border", i)
    ), this.borderFixedWest = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-west-fixed-column-border", i)
    ), this.borderFixedEast = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-east-fixed-column-border", i)
    ), this.borderFooterTop = o.applyStylePosistionAbsolute(
      o.createDivWithClass("ge-table-footer-border", i)
    );
  }
  /**
   * Adjusts the containers and rows of the table based on the current state.
   *
   * @return {void}
   */
  adjustContainersAndRows() {
    const e = this.tableModel.getPadding(), n = this.hostElement.clientWidth, o = this.hostElement.clientHeight;
    this.dom.applyStyle(this.scrollViewport, {
      width: `${n - e.left}px`,
      height: `${o - e.top}px`,
      top: `${e.top}px`,
      left: `${e.left}px`
    }), this.scrollTop = this.scrollViewport.scrollTop, this.dom.applyStyle(this.contentDiv, {
      width: `${this.scrollViewport.clientWidth}px`,
      height: `${this.scrollViewport.clientHeight}px`,
      top: `${this.scrollTop}px`,
      left: `${this.scrollViewport.scrollLeft}px`
    }), this.areaBodyWestGeo.width = e.left, this.areaBodyWestGeo.height = o - e.top - e.bottom, this.areaBodyWestGeo.top = e.top, this.areaBodyWestGeo.left = 0, this.dom.applyStyleInPx(this.areaBodyWest.parent, this.areaBodyWestGeo), this.tableOptions.fixedWestSeparatorBorderVisible && this.tableModel.getFixedLeftColumnCount() ? this.dom.applyDisplayBlockStyle(
      this.dom.applyStyle(this.borderFixedWest, {
        width: "1px",
        height: `${this.areaBodyWestGeo.height}px`,
        top: `${this.areaBodyWestGeo.top}px`,
        left: `${this.areaBodyWestGeo.width}px`
      })
    ) : this.dom.applyDisplayNoneStyle(this.borderFixedWest), this.areaBodyEastGeo.width = e.right, this.areaBodyEastGeo.height = o - e.top - e.bottom, this.areaBodyEastGeo.top = e.top, this.areaBodyEastGeo.left = n - e.right, this.dom.applyStyleInPx(this.areaBodyEast.parent, this.areaBodyEastGeo), this.tableOptions.fixedEastSeparatorBorderVisible && this.tableModel.getFixedLeftColumnCount() ? this.dom.applyDisplayBlockStyle(
      this.dom.applyStyle(this.borderFixedEast, {
        width: "1px",
        height: `${this.areaBodyEastGeo.height}px`,
        top: `${this.areaBodyEastGeo.top}px`,
        left: `${this.areaBodyEastGeo.left}px`
      })
    ) : this.dom.applyDisplayNoneStyle(this.borderFixedEast), this.areaBodyCenterGeo.width = n - e.left - e.right, this.areaBodyCenterGeo.height = o - e.top - e.bottom, this.areaBodyCenterGeo.top = 0, this.areaBodyCenterGeo.left = 0, this.dom.applyStyleInPx(this.areaBodyCenter.parent, this.areaBodyCenterGeo), this.dom.applyStyle(this.areaHeaderCenter.parent, {
      width: `${n - e.left - e.right}px`,
      height: `${e.top}px`,
      top: "0",
      left: `${e.left}px`
    }), this.dom.applyStyle(this.areaHeaderWest.parent, {
      width: `${e.left}px`,
      height: `${e.top}px`,
      top: "0",
      left: "0"
    }), this.dom.applyStyle(this.areaHeaderEast.parent, {
      width: `${e.right}px`,
      height: `${e.top}px`,
      top: "0",
      left: `${n - e.right}px`
    }), this.tableOptions.headerSeparatorBorderVisible && this.tableModel.isHeaderVisibe() ? this.dom.applyDisplayBlockStyle(
      this.dom.applyStyle(this.borderHeaderBottom, {
        width: `${n}px`,
        height: "1px",
        top: `${e.top}px`,
        left: "0px"
      })
    ) : this.dom.applyDisplayNoneStyle(this.borderHeaderBottom), this.dom.applyStyle(this.areaFooterWest.parent, {
      width: `${e.left}px`,
      height: `${e.bottom}px`,
      top: `${o - e.bottom}px`,
      left: "0"
    }), this.dom.applyStyle(this.areaFooterCenter.parent, {
      width: `${n - e.left - e.right}px`,
      height: `${e.bottom}px`,
      top: `${o - e.bottom}px`,
      left: `${e.left}px`
    }), this.dom.applyStyle(this.areaFooterEast.parent, {
      width: `${e.right}px`,
      height: `${e.bottom}px`,
      top: `${o - e.bottom}px`,
      left: `${n - e.right}px`
    }), this.tableOptions.footerSeparatorBorderVisible && this.tableModel.isFooterVisibe() ? this.dom.applyDisplayBlockStyle(
      this.dom.applyStyle(this.borderFooterTop, {
        width: `${n}px`,
        height: "1px",
        top: `${o - e.bottom}px`,
        left: "0px"
      })
    ) : this.dom.applyDisplayNoneStyle(this.borderFooterTop), this.adjustAfterScrolling();
  }
  /**
   * Adjusts the position or appearance of elements after scrolling.
   * This method must be overwritten in child classes.
   *
   * @return {void}
   */
  adjustAfterScrolling() {
  }
  /**
   * Resets the size of the wrapper div based on the content dimensions.
   *
   * @protected
   *
   * @returns {void} Returns nothing.
   */
  resetSizeOfWrapperDiv() {
    const e = `${this.tableModel.getContentWidthInPixel()}px`, n = `${this.tableModel.getContentHeightInPixel() + 1}px`;
    this.dom.setStyle(this.contentWrapperDiv, "width", e), this.dom.setStyle(this.contentWrapperDiv, "height", n);
  }
}
class Le {
  /**
   * Represents a constructor for a class.
   * @constructor
   * @param {number} r1 - The value for r1.
   * @param {number} c1 - The value for c1.
   * @param {number} r2 - The value for r2.
   * @param {number} c2 - The value for c2.
   * @param {boolean} [gammaRange=false] - The value for gammaRange. Defaults to false. gammaRange will be used for AreaModelCellGroups, but it's not implemented yet!
   */
  constructor(e, n, o, r, i = !1) {
    this.r1 = e, this.c1 = n, this.r2 = o, this.c2 = r, this.gammaRange = i;
  }
  static create(e) {
    return e.gammaRange === void 0 && (e.gammaRange = !1), new Le(
      e.rowIndex1,
      e.columnIndex1,
      e.rowIndex2,
      e.columnIndex2,
      e.gammaRange
    );
  }
  static singleCell(e, n) {
    return new Le(e, n, e, n);
  }
  static singleRow(e) {
    return new Le(e, 0, e, Number.MAX_SAFE_INTEGER);
  }
  static singleColumn(e) {
    return new Le(0, e, Number.MAX_SAFE_INTEGER, e);
  }
  isInRange(e, n) {
    return e >= this.r1 && e <= this.r2 && n >= this.c1 && n <= this.c2;
  }
}
class KN {
  constructor(e, n) {
    this.tableModel = e, this.areaModel = n, this.colAndRowspanRanges = void 0;
  }
  init() {
    if (this.areaModel.getMaxColspan() < 2 && this.areaModel.getMaxRowspan() < 2)
      return;
    this.colAndRowspanRanges = [];
    const e = this.areaModel.getRowCount(), n = this.tableModel.getColumnCount();
    for (let o = 0; o < e; o++)
      for (let r = 0; r < n; r++) {
        let i = this.areaModel.getColspanAt(o, r), s = this.areaModel.getRowspanAt(o, r);
        if (i > 1 || s > 1) {
          i === 0 && (i = 1), s === 0 && (s = 1);
          const a = "gammaCells" in this.areaModel;
          this.colAndRowspanRanges.push(
            new Le(o, r, o + s - 1, r + i - 1, a)
          );
        }
      }
  }
  getRanges() {
    return this.colAndRowspanRanges ? this.colAndRowspanRanges : [];
  }
  isInRange(e, n) {
    if (this.colAndRowspanRanges) {
      for (const o of this.colAndRowspanRanges)
        if (o.isInRange(e, n))
          return !0;
    }
    return !1;
  }
}
class XN {
  constructor(e, n, o) {
    this.header = e, this.body = n, this.footer = o;
  }
}
class JN extends QN {
  constructor(e, n, o, r) {
    var i, s;
    super(e, n, o, r), this.dragging = !1, this.editing = !1, this.storedColumnWidths = [], this.scrollLeft = 0, this.scrollViewportLeft = 0, this.scrollFactorY = 0, this.scrollFactorX = 0, this.cleanupFunctions = {
      header: [],
      body: [],
      footer: []
    }, this.tree = !1, this.colAndRowspanModels = new XN(), this.firstVisibleRowIndex = -1, this.draggingTargetColumnIndex = -1, this.removables = [], this.tableModel.getSelectionModel ? this.getSelectionModel = this.tableModel.getSelectionModel : (i = this.tableOptions) != null && i.getSelectionModel && (this.getSelectionModel = this.tableOptions.getSelectionModel), (s = this.tableOptions) != null && s.getFocusModel && (this.getFocusModel = this.tableOptions.getFocusModel), wf(n.getAreaModel("body")) && (this.tree = !0), ["header", "body", "footer"].forEach(
      (a) => {
        var l;
        this.colAndRowspanModels[a] = new KN(n, n.getAreaModel(a)), (l = this.colAndRowspanModels[a]) == null || l.init();
      }
    );
  }
  isEditing() {
    return this.editing;
  }
  /**
   * Resets the editor renderer by clearing its values and state.
   *
   * @function resetEditorRenderer
   * @memberof ClassName
   *
   * @returns {void}
   */
  resetEditorRenderer() {
    this.editorRenderer = void 0, this.editorRendererRow = -1, this.editorRendererColumn = -1, this.editing = !1;
  }
  /**
   * Clears the selection in the component.
   *
   * @param {boolean} rerender - Indicates whether to rerender the component after clearing the selection. Default value is false.
   *
   * @return {void}
   */
  clearSelection(e = !1) {
    if (this.getSelectionModel) {
      const n = this.getSelectionModel();
      n == null || n.clear(), e && this.repaint();
    }
  }
  /**
   * Initializes and renders the editor for a specified row and column index.
   *
   * @param {number} rowIdx - The index of the row.
   * @param {number} colIdx - The index of the column.
   */
  initRenderEditor(e, n) {
    var o;
    let r = (o = this.tableModel.getColumnDef(n)) == null ? void 0 : o.getEditRenderer;
    if (r || (r = this.tableOptions.getEditRenderer), r)
      if (this.editorRenderer = r(e, n), this.editorRenderer) {
        this.editorRendererRow = e, this.editorRendererColumn = n, this.editing = !0, this.repaint();
        const i = document.querySelector("input.ge-table-cell-editor-input");
        i && i.focus();
      } else
        this.resetEditorRenderer();
  }
  /**
   * Adjusts the content after scrolling and initiates a repaint of the component.
   *
   * @return {void}
   */
  repaint() {
    this.adjustAfterScrolling();
  }
  /**
   * Repaints the UI by resetting the size of the wrapper div,
   * adjusting the containers and rows, and performing additional adjustments
   * after scrolling.
   *
   * @return {void} This method does not return any value.
   */
  repaintHard() {
    this.resetSizeOfWrapperDiv(), this.adjustContainersAndRows(), this.adjustAfterScrolling();
  }
  /**
   * Adjusts the table after scrolling. This method performs various adjustments
   * to the table's appearance and behavior after a scroll event occurs.
   */
  adjustAfterScrolling() {
    var e;
    for (const n of this.removables)
      n.remove();
    this.hideHoverRow(), this.hideHoverColumn(), this.scrollTop = this.scrollViewport.scrollTop, this.scrollLeft = this.scrollViewport.scrollLeft, this.debounce(this.checkForScrollPosSaving.bind(this)), this.scrollFactorY = this.scrollTop / (this.scrollViewport.scrollHeight - this.scrollViewport.clientHeight), this.scrollFactorX = this.scrollLeft / (this.scrollViewport.scrollWidth - this.scrollViewport.clientWidth), isNaN(this.scrollFactorY) && (this.scrollFactorY = 0), isNaN(this.scrollFactorX) && (this.scrollFactorX = 0), this.adjustBody(), this.adjustArea("footer"), this.adjustArea("header"), this.tableOptions.tableTopBorderVisible && this.removables.push(this.dom.addHorizontalBorder(
      new gn(0, this.hostElement.clientWidth, 1, 0),
      this.hostElement,
      "ge-table-border"
    )), this.tableOptions.tableBottomBorderVisible && this.removables.push(this.dom.addHorizontalBorder(
      new gn(0, this.hostElement.clientWidth, 1, this.hostElement.clientHeight - 1),
      this.hostElement,
      "ge-table-border"
    )), this.tableModel.getFixedLeftColumnCount() > 0 && this.removables.push(this.dom.addVerticalBorder(
      new gn(this.areaBodyWest.child.clientWidth, 1, this.hostElement.clientHeight, 0),
      this.hostElement,
      "ge-table-body-west-vertical-border"
    )), ((e = this.tableModel.getAreaModel("header")) == null ? void 0 : e.getRowCount()) > 0 && this.removables.push(this.dom.addHorizontalBorder(
      new gn(0, this.hostElement.clientWidth, 1, this.areaHeaderCenter.child.clientHeight),
      this.hostElement,
      "ge-table-body-west-vertical-border"
    ));
  }
  /**
   * Checks if the scroll position should be saved and saves it.
   *
   * @return {void}
   */
  checkForScrollPosSaving() {
    var e, n;
    this.storeScrollPosStateService && (n = (e = this.tableOptions) == null ? void 0 : e.autoRestoreOptions) != null && n.autoRestoreScrollPosition && this.storeScrollPosStateService.updateScrollOffset([this.scrollLeft, this.scrollTop]);
  }
  /**
   * Updates the cells in the table with the provided values and optionally repaints all cells.
   *
   * @param {TableCellUpdateEventIf[]} events - The array of events containing information about the cells to update.
   * @param {boolean} repaintAll - Optional. If true, repaints all cells after updating. Defaults to false.
   *
   * @returns {void}
   */
  updateCells(e, n = !1) {
    e.forEach(
      (o) => {
        this.tableModel.getAreaModel(o.area).setValue(o.rowIndex, o.columnIndex, o.value), n || this.rerenderCellContent(o);
      }
    ), n && this.repaint();
  }
  /**
   * Rerenders the content of a table cell based on the given parameters.
   *
   * @param {TableCellUpdateEventIf} area - The area of the table.
   * @param {number} rowIndex - The index of the row.
   * @param {number} columnIndex - The index of the column.
   * @param {any} value - The new value to be displayed in the cell.
   * @param {string[]} cssClasses - An array of CSS classes to be applied to the cell.
   */
  rerenderCellContent({ area: e, rowIndex: n, columnIndex: o, value: r, cssClasses: i }) {
    const s = this.tableModel.getAreaModel(e), a = 'div[data-col-index="' + o + '"][data-row-index="' + n + '"][data-area="' + e + '"]', l = document.querySelector(a);
    if (l) {
      let c;
      const u = this.editorRenderer && this.editorRendererRow === n && this.editorRendererColumn === o ? this.editorRenderer : s.getCellRenderer(n, o);
      if (l.innerText = "", this.applyCssClasses(l, i), u)
        c = u.render(l, n, o, e, s, r, this.dom.domService), c && this.cleanupFunctions[e].push(c);
      else {
        const h = `${r}`;
        this.dom.addLabelDiv(l, h, !1, n, o, e);
      }
      const d = s.getCustomClassesAt(n, o);
      d.length && this.dom.addClasses(d, l);
      const f = s.getCustomStyleAt(n, o);
      if (f)
        for (const h in f)
          this.dom.setStyle(l, h, f[h]);
    }
  }
  /**
   * Stores the widths of all columns in the table.
   *
   * @protected
   * @function storeColumnWidths
   * @returns {void}
   */
  storeColumnWidths() {
    const e = this.tableModel.getColumnDefs();
    e != null && e.length && (this.storedColumnWidths = e.map((n, o) => this.tableModel.getColumnWidth(o)));
  }
  getAreaAndSideIdentByAttr(e) {
    if (e) {
      const n = this.getStringByAttr(e, "data-area"), o = this.getStringByAttr(e, "data-side");
      if (o && n)
        return [n, o];
    }
    return [void 0, void 0];
  }
  /**
   * Retrieves the specified area from the grid layout.
   *
   * @param {string} areaIdent - The identifier for the area ('header', 'body', or 'footer').
   * @param {string} sideIdent - The identifier for the side of the area ('west', 'center', or 'east').
   * @protected
   * @returns {HTMLElement} - The requested area element.
   * @throws {Error} - If the area identifier or side identifier is incorrect.
   */
  getArea(e, n) {
    if (e === "header") {
      if (n === "west")
        return this.areaHeaderWest;
      if (n === "center")
        return this.areaHeaderCenter;
      if (n === "east")
        return this.areaHeaderEast;
    } else if (e === "body") {
      if (n === "west")
        return this.areaBodyWest;
      if (n === "center")
        return this.areaBodyCenter;
      if (n === "east")
        return this.areaBodyEast;
    } else if (e === "footer") {
      if (n === "west")
        return this.areaFooterWest;
      if (n === "center")
        return this.areaFooterCenter;
      if (n === "east")
        return this.areaFooterEast;
    }
    throw Error(`Wrong area identifier: row:${e}, col:${n}`);
  }
  /**
   * Adjusts the body of the table.
   *
   * @protected
   * @return {void}
   */
  adjustBody() {
    const e = this.areaBodyCenterGeo.height - this.tableModel.getContentHeightInPixel(), n = this.scrollFactorY * e;
    this.dom.setStyle(this.contentDiv, "top", `${this.scrollTop}px`), this.dom.setStyle(this.contentDiv, "left", `${this.scrollViewport.scrollLeft}px`), this.adjustArea("body", n);
  }
  /**
   * Returns a number value extracted from the specified attribute of the source element.
   *
   * @param {HTMLElement} srcElement - The source element from which to extract the attribute value.
   * @param {string} key - The attribute key to extract the value from.
   * @returns {number} - The extracted number value, or -1 if the attribute was not found or not a valid number.
   * @protected
   */
  getNumberByAttr(e, n) {
    var o;
    if (e) {
      const r = (o = e.closest("[" + n + "]")) == null ? void 0 : o.getAttribute(n);
      if (r)
        return Number(r);
    }
    return -1;
  }
  /**
   * Retrieves the value of the specified attribute from the nearest ancestor element that has the attribute.
   *
   * @param {HTMLElement} srcElement - The source element from which to start searching for the nearest ancestor element.
   * @param {string} key - The name of the attribute to retrieve.
   * @returns {string} The value of the specified attribute, or an empty string if the attribute is not found.
   * @protected
   */
  getStringByAttr(e, n) {
    var o;
    if (e) {
      const r = (o = e.closest("[" + n + "]")) == null ? void 0 : o.getAttribute(n);
      if (r)
        return r;
    }
    return "";
  }
  /**
   * Adjusts the layout and positioning of the specified area in the table.
   * This method is used internally and should not be called directly.
   *
   * @param {AreaIdent} areaIdent - The identifier of the area to adjust (e.g. header, body, footer).
   * @param {number} [yStart=0] - The starting y-position for the layout adjustments.
   * @protected
   */
  adjustArea(e, n = 0) {
    var o;
    const r = this.getArea(e, "west"), i = this.getArea(e, "center"), s = this.getArea(e, "east"), a = i.child.clientHeight;
    r.child.innerText = "", i.child.innerText = "", s.child.innerText = "";
    const l = 0, c = this.areaBodyCenterGeo.width, u = this.tableModel.getPadding(), d = this.tableModel.getAreaModel(e), f = d.getRowCount();
    for (; this.cleanupFunctions[e].length; ) {
      const D = this.cleanupFunctions[e].shift();
      D && D();
    }
    let h = n;
    const p = this.tableModel.getColumnCount(), g = this.tableModel.getFixedRightColumnCount(), y = this.tableModel.getFixedLeftColumnCount();
    for (let D = 0; D < f; D++) {
      const m = h, I = D === f - 1, w = this.tableModel.getRowHeight(e, D);
      if (m + w > 0) {
        this.firstVisibleRowIndex = D;
        let M = { left: l, width: c, height: w, top: m, index: D }, P = this.dom.addRowDiv(i, M, D, e, "center");
        const Se = y;
        if (this.adjustColumnsToRowParent({
          areaIdent: e,
          sideIdent: "center",
          areaModel: d,
          geo: M,
          parent: P,
          rowIndex: D,
          columnIndexStart: Se,
          columnIndexEnd: p - g - 1,
          verticalFixed: !1,
          lastRowOfModel: I
        }), u.left > 0 && (M = { left: l, width: this.areaBodyWestGeo.width, height: w, top: m, index: D }, P = this.dom.addRowDiv(r, M, D, e, "west"), this.adjustColumnsToRowParent({
          areaIdent: e,
          sideIdent: "west",
          areaModel: d,
          geo: M,
          parent: P,
          rowIndex: D,
          columnIndexStart: 0,
          columnIndexEnd: Se - 1,
          verticalFixed: !0,
          lastRowOfModel: I
        })), u.right > 0 && (M = { left: l, width: this.areaBodyEastGeo.width, height: w, top: m, index: D }, P = this.dom.addRowDiv(s, M, D, e, "east"), this.adjustColumnsToRowParent({
          areaIdent: e,
          sideIdent: "east",
          areaModel: d,
          geo: M,
          parent: P,
          rowIndex: D,
          columnIndexStart: p - g,
          columnIndexEnd: p - 1,
          verticalFixed: !0,
          lastRowOfModel: I
        })), e === "header" && this.tree && D === f - 1) {
          const Oe = this.dom.applyStyle(
            this.dom.setAttribute(
              this.dom.addDiv(P, new gn(16, 20, 20, 8)),
              "data-ge-action",
              "toggleExpandCollapseAll"
            ),
            { cursor: "pointer" }
          ), pt = this.tableOptions.treeOptions.arrowExpandCollapseAll;
          if (pt) {
            const io = this.dom.domService.createText(pt.content);
            this.dom.domService.appendChild(Oe, io), pt.style && this.dom.applyStyleString(Oe, pt.style);
          }
        }
      }
      if (h = h + w, h > a)
        break;
    }
    if (this.colAndRowspanModels && this.colAndRowspanModels[e]) {
      const D = ((o = this.colAndRowspanModels[e]) == null ? void 0 : o.getRanges()) ?? [];
      if (D.length)
        for (const m of D) {
          let I = 0, w = i.child, M = "center";
          if (m.c1 < y)
            w = r.child, M = "west";
          else if (g > 0 && m.c1 >= p - g)
            w = s.child, M = "east";
          else {
            const P = this.areaBodyCenterGeo.width - this.tableModel.getContentWidthInPixel();
            I = this.scrollFactorX * P - this.areaBodyWestGeo.width, M = "center";
          }
          this.drawBigCell(m, I, n, d, w, M);
        }
    }
  }
  /**
   * Draws big cells (rowspan and or colspan) in body/center
   * @param range CellRange
   * @param xStart X position in pixel for top left corner
   * @param yStart Y position in pixel for top left corner
   * @param areaModel AreaModelIf
   * @param parentDiv Parent div as HTMLDivElement
   * @param sideIdent SideIdent (west,center,east)
   * @protected
   */
  drawBigCell(e, n, o, r, i, s) {
    const a = o + this.getRowHeights(0, e.r1 - 1, r).reduce((y, D) => y + D, 0), l = this.tableModel.getColumnCount(), c = this.tableModel.getFixedRightColumnCount();
    let u = 0;
    c > 0 && e.c1 >= l - c && (u = l - c);
    const d = n + this.getColumnWidths(u, e.c1 - 1).reduce((y, D) => y + D, 0), f = this.getRowHeights(e.r1, e.r2, r).reduce((y, D) => y + D, 0), h = this.getColumnWidths(e.c1, e.c2).reduce((y, D) => y + D, 0);
    let p = !1;
    const g = this.getSelectionModel ? this.getSelectionModel() : void 0;
    g && (p = g.getSelectionCount(e.r1, e.c1) > 0), e.gammaRange ? this.renderCell({
      areaModel: r,
      areaIdent: r.areaIdent,
      sideIdent: s,
      rowIndex: e.r1,
      columnIndex: e.c1,
      left: d,
      top: a,
      width: h,
      height: f,
      parent: i,
      cellSelected: p,
      lastRowOfModel: !0,
      gammaRange: e.gammaRange
    }) : this.renderCell({
      areaModel: r,
      areaIdent: r.areaIdent,
      sideIdent: s,
      rowIndex: e.r1,
      columnIndex: e.c1,
      left: d,
      top: a,
      width: h,
      height: f,
      parent: i,
      cellSelected: p,
      lastRowOfModel: !0,
      gammaRange: e.gammaRange
    }), r.areaIdent === "header" && this.tableOptions.columnsResizable && this.renderHeaderCellResizeHandle({
      rowIndex: e.r1,
      columnIndex: e.c1,
      cellLeft: d,
      cellTop: a,
      cellWidth: h,
      cellHeight: f,
      parent: i
    });
  }
  /**
   * Finds the row index of an important rowspan cell in a given area model.
   *
   * @param {AreaModelIf} areaModel - The area model to search in.
   * @param {number} rowIndex - The current row index.
   * @param {number} colIndex - The current column index.
   * @returns {number} - The row index of the important rowspan cell, or -1 if not found.
   * @protected
   */
  findRowOfImportantRowspanCell(e, n, o) {
    const r = e.getMaxRowspan();
    for (let i = n - 1; i > -1; i--) {
      const s = e.getRowspanAt(i, o);
      if (s > 1 && i + s + 1 >= n)
        return i;
      if (n - i > r)
        return -1;
    }
    return -1;
  }
  /**
   * Adjusts the columns to fit the width of the row's parent element.
   *
   * @param {ArgsAdjustColumnsToRowParentParams} params - The parameters for adjusting the columns.
   * @protected
   * @return {void}
   */
  adjustColumnsToRowParent({
    areaIdent: e,
    sideIdent: n,
    areaModel: o,
    geo: r,
    parent: i,
    rowIndex: s,
    columnIndexStart: a,
    columnIndexEnd: l,
    verticalFixed: c = !1,
    lastRowOfModel: u = !1
  }) {
    var d;
    this.scrollViewportLeft = this.scrollViewport.scrollLeft;
    let f = 0;
    if (!c) {
      const y = this.areaBodyCenterGeo.width - this.tableModel.getContentWidthInPixel();
      f = this.scrollFactorX * y;
    }
    const h = 0, p = !!(e === "body" && n);
    let g = f;
    for (let y = a; y <= l; y++) {
      const D = g, m = this.tableModel.getColumnWidth(y);
      if (m > 0 && D + m > 0) {
        let I = r.height;
        const w = o.getRowspanAt(s, y), M = o.getColspanAt(s, y);
        w > 1 && (I = this.getRowHeights(s, s + w - 1, o).reduce((Oe, pt) => Oe + pt, 0));
        let P = m;
        M > 1 && (P = this.getColumnWidths(y, y + M - 1).reduce((Oe, pt) => Oe + pt, 0));
        let Se = !1;
        if (this.colAndRowspanModels && this.colAndRowspanModels[e] && (d = this.colAndRowspanModels[e]) != null && d.isInRange(s, y) && (Se = !0), this.draggingTargetColumnIndex === y && e !== "header") {
          this.renderDragTargetDiv(i, D, h, P, I);
          const Oe = { left: D, top: h, width: P, height: I };
          this.dom.addColumnBorderDivs(this.tableOptions, i, Oe, e, n);
        } else {
          const Oe = this.renderSelectedBackgroundDiv(Se, p, n, o, s, y, i, D, h, P, I);
          "gammaCells" in o && o.getValueAt(s, y) && (Se = !1), Se || this.renderCell({
            areaModel: o,
            areaIdent: e,
            sideIdent: n,
            rowIndex: s,
            columnIndex: y,
            left: D,
            top: h,
            width: P,
            height: I,
            parent: i,
            cellSelected: Oe,
            lastRowOfModel: u,
            gammaRange: !0
          }), e === "header" && this.tableOptions.columnsResizable && this.renderHeaderCellResizeHandle({
            rowIndex: s,
            columnIndex: y,
            cellLeft: D,
            cellTop: h,
            cellWidth: P,
            cellHeight: I,
            parent: i
          });
        }
      }
      if (g = g + m, g > this.areaBodyCenterGeo.width)
        break;
    }
    this.tableOptions.verticalBorderVisible && this.dom.addVerticalBorder(new gn(g - 1, 1, r.height, 0), i);
  }
  /**
   * Retrieves the column index of the tree arrow column in the table.
   *
   * @protected
   *
   * @returns {0 | 1} The column index of the tree arrow column.
   *                Returns 0 if the checkbox is not visible,
   *                otherwise returns 1.
   */
  getTreeArrowColumnIndex() {
    return this.tableOptions.showCheckboxWihoutExtraColumn ? 0 : this.tableModel.isRowCheckboxVisible() ? 1 : 0;
  }
  addAndRenderCellDiv({
    areaModel: e,
    areaIdent: n,
    sideIdent: o,
    rowIndex: r,
    index: i,
    left: s,
    width: a,
    height: l,
    top: c,
    parent: u,
    lastRowOfModel: d
  }) {
    var f;
    const h = this.editorRenderer && this.editorRendererRow === r && this.editorRendererColumn === i ? this.editorRenderer : e.getCellRenderer(r, i), p = { left: s, width: a, height: l, top: c, index: i }, g = e.getRowByIndex(r);
    let y = "none";
    if (i === this.getTreeArrowColumnIndex() && Sf(g)) {
      const Ye = g;
      (f = Ye.children) != null && f.length ? Ye.expanded ? y = "expanded" : y = "collapsed" : y = "hidden";
    }
    let D;
    if (n === "header") {
      const Ye = this.tableModel.getColumnDef(i);
      (!(Ye != null && Ye.sortIconVisible) || Ye != null && Ye.sortIconVisible()) && (D = Ye == null ? void 0 : Ye.sortState);
    }
    const m = e.getValueAt(r, i), I = h ? "" : `${m}`, w = e.isRowChecked(r), M = this.dom.addColumnDiv(
      {
        parent: u,
        geo: p,
        rowIndex: r,
        columnIndex: i,
        areaIdent: n,
        sideIdent: o,
        text: I,
        treeArrow: y,
        tableOptions: this.tableOptions,
        checkedType: w,
        sortState: D
      }
    ), P = e.getTooltipAt(r, i);
    P && this.dom.setAttribute(M, "title", P);
    const Se = this.tableModel.getColumnDef(i);
    Se && Se.classes[n] && this.dom.addClasses(Se.classes[n], M);
    let Oe;
    h && (Oe = h.render(M, r, i, n, e, m, this.dom.domService));
    const pt = e.getCustomClassesAt(r, i);
    if (pt.length && this.dom.addClasses(pt, M), this.dom.addColumnBorderDivs(this.tableOptions, u, p, n, o), d && this.dom.addHorizontalBorder({ left: s, width: a, height: l, top: c + l }, u), this.getFocusModel && n === "body") {
      const Ye = this.getFocusModel();
      Ye != null && Ye.hasFocus(r, i) && this.dom.addFocusBorderDivs(u, p, {});
    }
    n === "header" && this.dom.setAttribute(M, "data-ge-action", "drag-column");
    const io = e.getCustomStyleAt(r, i);
    if (io)
      for (const Ye in io)
        this.dom.setStyle(M, Ye, io[Ye]);
    return [M, Oe];
  }
  /**
   * Applies CSS classes to an HTML element.
   *
   * @param {HTMLDivElement} ele - The HTML element to which CSS classes will be applied.
   * @param {Object.<string, boolean>} cssClasses - An object containing CSS class names as keys and boolean values indicating whether to apply or remove the class.
   * @protected
   */
  applyCssClasses(e, n = {}) {
    e && Object.entries(n).forEach(([o, r]) => {
      r ? this.dom.addClass(o, e) : this.dom.removeClass(o, e);
    });
  }
  /**
   * Retrieves the column widths of a table within a specified range.
   *
   * @param {number} startIndex - The index of the first column to retrieve the width of.
   * @param {number} endIndex - The index of the last column to retrieve the width of.
   *
   * @return {number[]} An array containing the widths of the columns within the specified range.
   */
  getColumnWidths(e, n) {
    const o = [];
    for (let r = e; r <= n; r++)
      o.push(this.tableModel.getColumnWidth(r));
    return o;
  }
  /**
   * Retrieves the heights of rows within a specified range.
   *
   * @param {number} startIndex - The index of the first row in the range.
   * @param {number} endIndex - The index of the last row in the range.
   * @param {AreaModelIf} areaModel - The area model.
   * @return {number[]} - An array containing the heights of the rows within the specified range.
   */
  getRowHeights(e, n, o) {
    const r = [];
    for (let i = e; i <= n; i++)
      r.push(o.getRowHeight(i));
    return r;
  }
  /**
   * Adjusts the position and size of the hover row based on the mouse move event.
   *
   * @param {GeMouseEvent} mouseMoveEvent - The mouse move event.
   *
   * @return {void}
   */
  adjustHoverRows(e) {
    if (this.tableOptions.hoverRowVisible && e.rowIndex > -1) {
      const n = this.hostElement.clientWidth, o = this.tableModel.getAreaModel("body").getRowHeight(e.rowIndex), r = e.rowTop + this.areaHeaderCenter.parent.clientHeight - this.scrollTop;
      this.dom.applyStyle(this.hoverRow, {
        left: "0",
        top: r + "px",
        width: n + "px",
        height: o + "px",
        display: "block"
      });
    } else
      this.hideHoverRow();
  }
  /**
   * Hides the hover row by applying 'display: none' style to it.
   *
   * @protected
   * @function
   * @name hideHoverRow
   * @memberof ClassName
   *
   * @returns {void}
   */
  hideHoverRow() {
    this.dom.applyStyle(this.hoverRow, {
      display: "none"
    });
  }
  /**
   * Adjusts the position and size of the hover column based on the mouse move event.
   *
   * @param {GeMouseEvent} mouseMoveEvent - The mouse move event object.
   */
  adjustHoverColumns(e) {
    if (this.tableOptions.hoverColumnVisible && e.rowIndex > -1) {
      const n = this.hostElement.clientHeight, o = this.tableModel.getColumnWidth(e.columnIndex), r = this.areaBodyWestGeo.width, i = e.columnLeft + this.tableModel.getPadding().left - this.scrollLeft - r;
      this.dom.applyStyle(this.hoverColumn, {
        left: i + "px",
        top: "0px",
        width: o + "px",
        height: n + "px",
        display: "block"
      });
    } else
      this.hideHoverColumn();
  }
  /**
   * Hide hover column.
   *
   * This method hides the hover column by applying a style of 'display: none'
   * to the element representing the hover column.
   *
   * @protected
   * @memberof ClassName
   */
  hideHoverColumn() {
    this.dom.applyStyle(this.hoverColumn, {
      display: "none"
    });
  }
  /**
   * Executes a function after a specified delay, ensuring that the function is called only once within that delay period.
   *
   * @param {() => void} fn - The function to be executed.
   * @param {number} [delay=1000] - The delay in milliseconds before executing the function.
   *
   * @return {undefined}
   */
  debounce(e, n = 1e3) {
    this.debounceTimeout && clearTimeout(this.debounceTimeout), this.debounceTimeout = setTimeout(e.bind(this), n);
  }
  /**
   * Adjusts the dragging column during a mouse move event.
   *
   * @param {GeMouseEvent} mouseMoveEvent - The mouse move event.
   * @param {number} sourceColumnIndex - The index of the source column.
   * @param {boolean} firstDraggingRendering - Indicates if it's the first rendering of the dragging column.
   */
  adjustDraggingColumn(e, n, o) {
    var r, i;
    if (this.dragging) {
      const s = this.hostElement.clientHeight, a = this.storedColumnWidths[n];
      if ((r = e.originalEvent) != null && r.clientX) {
        const l = { left: ((i = e.originalEvent) == null ? void 0 : i.clientX) - a / 2, width: a, height: s, top: 0, index: n };
        this.dom.applyStyle(this.draggingColumn, {
          background: "rgba(128,128,128,0.2)",
          display: "block",
          overfllow: "clip"
        }), this.dom.applyStyleInPx(this.draggingColumn, l), o && this.renderContentOfDraggingColumn(l);
      }
    } else
      this.hideDraggingColumn();
  }
  /**
   * Renders the content of a dragging column.
   *
   * @param {GeoData} columnGeo - The geographic data of the column.
   *
   * @returns {number} The y-coordinate of the rendered content.
   */
  renderContentOfDraggingColumn(e) {
    const n = this.renderContentOfDraggingColumnForArea(e, "header", 0);
    this.renderContentOfDraggingColumnForArea(e, "body", n);
  }
  /**
   * Renders the content of the dragging column for a specific area.
   *
   * @param {GeoData} columnGeo - The geometry data of the dragging column.
   * @param {AreaIdent} areaIdent - The identifier of the area.
   * @param {number} [y=0] - The starting y-position.
   * @return {number} The final y-position after rendering all the content.
   */
  renderContentOfDraggingColumnForArea(e, n, o = 0) {
    const r = "center", i = this.tableModel.getAreaModel(n), s = i == null ? void 0 : i.getRowCount();
    if (s) {
      const a = e.index ?? 0, l = this.draggingColumn;
      for (let c = 0; c < s; c++) {
        const u = o, d = i.getRowHeight(c), f = { left: 0, width: e.width, height: d, top: u, index: c }, h = i.getValueAt(c, a), p = i.getCellRenderer(c, a), g = p ? "" : `${h}`, y = {
          parent: l,
          geo: f,
          rowIndex: c,
          columnIndex: a,
          areaIdent: n,
          sideIdent: r,
          text: g
        }, D = this.dom.addColumnDiv(y);
        let m;
        p && (m = p.render(D, c, a, n, i, h, this.dom.domService), m && this.cleanupFunctions[n].push(m));
        const I = i.getCustomClassesAt(c, a);
        I.length && this.dom.addClasses(I, D);
        const w = this.tableModel.getColumnDef(a);
        w && w.classes[n] && this.dom.addClasses(w.classes[n], D), this.dom.addColumnBorderDivs(this.tableOptions, l, f, n, r);
        const M = i.getCustomStyleAt(c, a);
        if (M)
          for (const P in M)
            this.dom.setStyle(D, P, M[P]);
        o = o + d;
      }
    }
    return o;
  }
  /**
   * Hides the dragging column by applying a 'display: none' style to it.
   * This method is protected and can only be accessed within the class.
   *
   * @return {void}
   */
  hideDraggingColumn() {
    this.dom.applyStyle(this.draggingColumn, {
      display: "none"
    });
  }
  /**
   * Renders a draggable target div element.
   *
   * @param {HTMLDivElement} parent - The parent element where the target div will be appended to.
   * @param {number} left - The left position of the target div in pixels.
   * @param {number} top - The top position of the target div in pixels.
   * @param {number} width - The width of the target div in pixels.
   * @param {number} height - The height of the target div in pixels.
   * @return {HTMLDivElement} - The rendered draggable target div element.
   */
  renderDragTargetDiv(e, n, o, r, i) {
    const s = this.dom.applyStylePosistionAbsolute(
      this.dom.createDivWithClass("ge-table-drop-zone", e)
    );
    return this.dom.setStyle(s, "left", `${n}px`), this.dom.setStyle(s, "top", `${o}px`), this.dom.setStyle(s, "width", `${r}px`), this.dom.setStyle(s, "height", `${i}px`), s;
  }
  /**
   * Render selected background div.
   *
   * @private
   * @param {boolean} skip - Whether to skip rendering.
   * @param {boolean} renderSelection - Whether to render the selection.
   * @param {SideIdent} sideIdent - The side identifier.
   * @param {AreaModelIf} areaModel - The area model.
   * @param {number} rowIndex - The row index.
   * @param {number} index - The index.
   * @param {HTMLDivElement} parent - The parent div element.
   * @param {number} left - The left position.
   * @param {number} top - The top position.
   * @param {number} width - The width of the div.
   * @param {number} height - The height of the div.
   * @returns {boolean} - Whether the cell is selected.
   */
  renderSelectedBackgroundDiv(e, n, o, r, i, s, a, l, c, u, d) {
    let f = !1;
    if (!e && n && r.isSelectable(i, s) && this.getSelectionModel) {
      const h = this.getSelectionModel();
      if (h) {
        const p = h.getSelectionCount(i, s);
        f = p > 0;
        for (let g = 0; g < p; g++) {
          const y = this.dom.applyStylePosistionAbsolute(
            // ge-table-body-west-selected-range
            this.dom.createDivWithClass(`ge-table-${r.areaIdent}-${o}-selected-range`, a)
          );
          this.dom.setStyle(y, "left", `${l}px`), this.dom.setStyle(y, "top", `${c}px`), this.dom.setStyle(y, "width", `${u}px`), this.dom.setStyle(y, "height", `${d}px`);
        }
      }
    }
    return f;
  }
  /**
   * Renders a cell in the grid.
   *
   * @param {ArgsRenderCell} args - The arguments for rendering the cell.
   * @param {AreaModel} args.areaModel - The area model of the grid.
   * @param {string} args.areaIdent - The identifier of the area.
   * @param {string} args.sideIdent - The identifier of the side.
   * @param {number} args.rowIndex - The index of the row.
   * @param {number} args.columnIndex - The index of the column.
   * @param {number} args.left - The left position of the cell.
   * @param {number} args.top - The top position of the cell.
   * @param {number} args.width - The width of the cell.
   * @param {number} args.height - The height of the cell.
   * @param {HTMLElement} args.parent - The parent element of the cell.
   * @param {boolean} args.cellSelected - Indicates if the cell is selected.
   * @param {boolean} args.lastRowOfModel - Indicates if the cell is in the last row of the model.
   *
   * @returns {void}
   */
  renderCell({
    areaModel: e,
    areaIdent: n,
    sideIdent: o,
    rowIndex: r,
    columnIndex: i,
    left: s,
    top: a,
    width: l,
    height: c,
    parent: u,
    cellSelected: d,
    lastRowOfModel: f
  }) {
    const [h, p] = this.addAndRenderCellDiv({
      areaModel: e,
      areaIdent: n,
      sideIdent: o,
      rowIndex: r,
      index: i,
      left: s,
      width: l,
      height: c,
      top: a,
      parent: u,
      lastRowOfModel: f
    });
    d && this.dom.addClass(`ge-table-${n}-${o}-selected-range`, h), p && this.cleanupFunctions[n].push(p);
  }
  /**
   * Render the header cell resize handle.
   *
   * @param {ArgsRenderHeaderCellResizeHandle} args - The arguments for rendering the handle.
   * @param {number} args.rowIndex - The index of the row.
   * @param {number} args.columnIndex - The index of the column.
   * @param {number} args.cellLeft - The left position of the cell.
   * @param {number} args.cellTop - The top position of the cell.
   * @param {number} args.cellWidth - The width of the cell.
   * @param {number} args.cellHeight - The height of the cell.
   * @param {HTMLElement} args.parent - The parent element to append the handle to.
   *
   * @return {void}
   */
  renderHeaderCellResizeHandle({ rowIndex: e, columnIndex: n, cellLeft: o, cellTop: r, cellWidth: i, cellHeight: s, parent: a }) {
    const l = this.dom.domService, c = this.tableOptions.columnResizeHandleWidthInPx ?? 2, u = l.createElement("div");
    l.setAttribute(u, "data-col-index", `${n}`), l.setAttribute(u, "data-row-index", `${e}`), l.setAttribute(u, "data-area", "header"), l.setAttribute(u, "data-ge-action", "resize-column"), l.addClass(u, "ge-table-column-resize-handle"), l.setStyle(u, "display", "clip"), l.setStyle(u, "position", "absolute"), l.setStyle(u, "cursor", "col-resize"), l.setStyle(u, "left", `${o + i - c}px`), l.setStyle(u, "top", `${r}px`), l.setStyle(u, "width", `${c}px`), l.setStyle(u, "height", `${s}px`), l.appendChild(a, u);
  }
}
class eL {
  constructor(e, n) {
    this.columnIndex = e, this.sortState = n;
  }
}
class tL {
  constructor(e) {
    this.tableScope = e, this.tableScope.hostElement.addEventListener("change", this.onHostElementChanged.bind(this));
  }
  /**
   * Handles the onHostElementChanged event.
   * In case that the element is an input field, the tableScope.updateModelValueAfterEdit() method is triggered.
   *
   * @param {Event} event - The event object.
   *
   * @return {void}
   */
  onHostElementChanged(e) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement) {
      const n = e.target, o = n.getAttribute("data-area"), r = n.getAttribute("data-row-index"), i = n.getAttribute("data-col-index");
      if (o && r && i) {
        const s = Mg(o), a = Number(r), l = Number(i);
        this.tableScope.updateModelValueAfterEdit(s, a, l, n.value);
      }
    }
  }
}
class nL {
  constructor(e = -1, n = -1) {
    this.rowIndex = e, this.columnIndex = n;
  }
}
class _g {
  constructor(e) {
    this.cells = e;
  }
  static createSingle(e, n) {
    return new _g([new nL(e, n)]);
  }
}
class oL {
  constructor(e) {
    var n, o;
    this.tableScope = e, (n = this.tableScope.tableOptions) != null && n.getSelectionModel && (this.getSelectionModel = this.tableScope.tableOptions.getSelectionModel), (o = this.tableScope.tableOptions) != null && o.getFocusModel && (this.getFocusModel = this.tableScope.tableOptions.getFocusModel);
  }
  onMouseClicked(e, n) {
    var o, r, i, s, a, l, c;
    let u = !1, d = !1;
    if (this.getSelectionModel && this.getFocusModel) {
      const f = this.getSelectionModel(), h = this.getFocusModel();
      f && h && (h.hasFocus(e.rowIndex, e.columnIndex) || (h.setFocus(e.rowIndex, e.columnIndex), this.tableScope.onFocusChanged(h), u = !0), (o = e.originalEvent) != null && o.shiftKey || f.hasSelection() && (f.clear(), u = !0), (r = e.originalEvent) != null && r.shiftKey && this.previousEvt ? (f.addSelection(this.createRangeByEvents(e, this.previousEvt)), d = !0, u = !0) : (i = e.originalEvent) != null && i.altKey && ((s = e.originalEvent) != null && s.ctrlKey || (a = e.originalEvent) != null && a.metaKey) ? (f.removeSelection(Le.singleCell(e.rowIndex, e.columnIndex)), d = !0, u = !0) : (l = e.originalEvent) != null && l.ctrlKey || (c = e.originalEvent) != null && c.metaKey ? (f.addSelection(Le.singleCell(e.rowIndex, e.columnIndex)), d = !0, u = !0) : (f.firstClick(e.rowIndex, e.columnIndex), u = !0), this.tableScope.onSelectionChanged(f));
    }
    return d ? this.previousEvt = void 0 : this.previousEvt = e == null ? void 0 : e.clone(), u;
  }
  onActionTriggered(e) {
    if (this.getSelectionModel && this.getFocusModel) {
      const n = this.getSelectionModel(), o = this.getFocusModel();
      if (n && o) {
        if (e === "SELECT_ALL")
          return n.selectAll(), this.tableScope.repaint(), !0;
        if (e === "DESELECT_ALL")
          return n.clear(), this.tableScope.repaint(), !0;
        if (e === "TOGGLE_SELECTION") {
          const [r, i] = o.getFocus();
          return n.togglePoint(r, i), this.tableScope.repaint(), !0;
        }
      }
    }
    return !1;
  }
  createRangeByEvents(e, n) {
    n || (n = e);
    const o = Math.min(e.rowIndex, n == null ? void 0 : n.rowIndex), r = Math.max(e.rowIndex, n == null ? void 0 : n.rowIndex), i = Math.min(e.columnIndex, n == null ? void 0 : n.columnIndex), s = Math.max(e.columnIndex, n == null ? void 0 : n.columnIndex);
    return Le.create({
      rowIndex1: o,
      columnIndex1: i,
      rowIndex2: r,
      columnIndex2: s
    });
  }
}
class rL {
  get() {
    return {
      f2: "START_EDITING",
      space: "TOGGLE_SELECTION",
      "ctrl+num_add": "SELECT_ALL",
      "ctrl+a": "SELECT_ALL",
      "ctrl+shift+a": "DESELECT_ALL",
      "ctrl+x": "DESELECT_ALL",
      "ctrl+num_subtract": "DESELECT_ALL",
      "meta -": "DESELECT_ALL",
      arrowup: "NAVIGATE_UP",
      arrowdown: "NAVIGATE_DOWN",
      arrowleft: "NAVIGATE_LEFT",
      arrowright: "NAVIGATE_RIGHT",
      "meta+c": "COPY_2_CLIPBOARD",
      "ctrl+c": "COPY_2_CLIPBOARD"
    };
  }
}
class iL {
  get() {
    return {
      f2: "START_EDITING",
      space: "TOGGLE_SELECTION",
      "ctrl+num_add": "SELECT_ALL",
      "meta+a": "SELECT_ALL",
      "ctrl+a": "SELECT_ALL",
      "meta+x": "DESELECT_ALL",
      "meta+shift+a": "DESELECT_ALL",
      "ctrl+shift+a": "DESELECT_ALL",
      "ctrl+num_subtract": "DESELECT_ALL",
      "ctrl -": "DESELECT_ALL",
      arrowup: "NAVIGATE_UP",
      arrowdown: "NAVIGATE_DOWN",
      arrowleft: "NAVIGATE_LEFT",
      arrowright: "NAVIGATE_RIGHT",
      "meta+c": "COPY_2_CLIPBOARD",
      "ctrl+c": "COPY_2_CLIPBOARD"
    };
  }
}
class sL {
  constructor(e) {
    this.tableScope = e, this.shortcutActionIdMapping = {}, this.listener = [], this.listener.push(e), this.init();
  }
  /**
   * Adds a listener to the list of listeners.
   *
   * @param {OnActionTriggeredIf} listener - The listener to be added.
   * @returns {void}
   */
  addListener(e) {
    this.listener.includes(e) || this.listener.push(e);
  }
  /**
   * Initializes the ShortcutService by assigning shortcut action id mappings based on the current operating system.
   * Also adds key down event listener to the table host element.
   */
  init() {
    this.assignPredefinedSystemShortcutMappings(), Object.assign(this.shortcutActionIdMapping, this.tableScope.tableOptions.shortcutActionIdMapping), this.isDebug() && console.debug("ShortcutService", this.shortcutActionIdMapping), this.tableScope.hostElement.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  assignPredefinedSystemShortcutMappings() {
    this.isMacintosh() ? Object.assign(this.shortcutActionIdMapping, new iL().get()) : Object.assign(this.shortcutActionIdMapping, new rL().get());
  }
  isMacintosh() {
    return navigator.platform.indexOf("Mac") > -1;
  }
  isDebug() {
    return this.isLocalhost();
  }
  isLocalhost() {
    return location.hostname === "localhost" || location.hostname === "127.0.0.1";
  }
  onKeyDown(e) {
    const n = this.findEntity(e);
    n && this.emit(n) && (e.preventDefault(), e.stopPropagation());
  }
  emit(e) {
    this.isDebug() && console.debug("ShortcutService emit      :", e);
    let n = !1;
    for (const o of this.listener)
      o.onActionTriggered(e) && (n = !0);
    return n;
  }
  findEntity(e) {
    const n = this.getTokenByEvent(e);
    this.isDebug() && console.debug("ShortcutService tokens    :", n);
    for (const o in this.shortcutActionIdMapping) {
      const r = o.replace(/opt/g, "alt").replace(/cmd/g, "meta").split(/[+ ]/g).sort();
      if (this.areTokensEquals(n, r))
        return this.shortcutActionIdMapping[o];
    }
  }
  areTokensEquals(e, n) {
    if (e.length !== n.length || e.length === 0)
      return !1;
    for (let o = 0; o < e.length; o++)
      if (e[o] !== n[o])
        return !1;
    return !0;
  }
  getTokenByEvent(e) {
    const n = [];
    return e.altKey && n.push("alt"), e.shiftKey && n.push("shift"), e.ctrlKey && n.push("ctrl"), e.metaKey && n.push("meta"), e.code && n.push(e.code.toLowerCase().replace(/key/g, "")), n.sort();
  }
  /**
   * Retrieves the shortcut action mapping object.
   *
   * @returns {ShortcutActionIdMapping} - The shortcut action mapping object.
   */
  getShortcutActionMapping() {
    return this.shortcutActionIdMapping;
  }
}
class Ly {
  onCheckboxChanged(e) {
  }
  onContextmenu(e) {
  }
  onModelChanged(e) {
  }
  onMouseClicked(e) {
  }
  onMouseDragging(e) {
  }
  onMouseDraggingEnd(e) {
  }
  onMouseMoved(e) {
  }
  onSelectionChanged(e) {
  }
  onFocusChanged(e) {
  }
}
class aL {
  setStyle(e, n, o) {
    return e.style[n] = o, e;
  }
  appendText(e, n) {
    const o = this.createText(n);
    return this.appendChild(e, o), o;
  }
  addClass(e, n) {
    return n.includes(" ") ? n.split(" ").forEach((o) => e.classList.add(o)) : e.classList.add(n), e;
  }
  removeClass(e, n) {
    return n.includes(" ") ? n.split(" ").forEach((o) => e.classList.remove(o)) : e.classList.remove(n), e;
  }
  appendChild(e, n) {
    e.appendChild(n);
  }
  createElement(e) {
    return document.createElement(e);
  }
  createText(e) {
    return document.createTextNode(e);
  }
  setAttribute(e, n, o) {
    e.setAttribute(n, o);
  }
}
class lL {
  render(e, n, o, r, i, s, a) {
    if (i.isEditable(n, o)) {
      a.addClass(e, "ge-table-row-input-div");
      const l = i.getValueAt(n, o);
      e.innerHTML = `
            <input
                type="text"
                value="${l}"
                autofocus
                onfocus="this.setSelectionRange(0, this.value.length)"
                data-listen="change"
                data-area="${r}"
                data-row-index="${n}"
                data-col-index="${o}"
                data-input-type="text"
                style="width:calc(100% - 8px);height:100%;border:0;padding:0 0 0 8px;"
                class="ge-table-cell-editor-input">`;
    }
  }
}
class cL {
  constructor(e = "none", n = "single") {
    this.selectionType = e, this.selectionMode = n, this.ranges = [], this.negativeRanges = [], this.allSelected = !1;
  }
  firstClick(e, n) {
    this.selectionType === "row" ? this.addRange(Le.singleRow(e)) : this.selectionType === "column" && this.addRange(Le.singleColumn(n));
  }
  getSelectionCount(e, n) {
    let o = 0;
    for (const r of this.ranges)
      r.isInRange(e, n) && o++;
    return this.allSelected && o++, this.isInNegativeRange(e, n) && (o = 0), o;
  }
  isInNegativeRange(e, n) {
    for (const o of this.negativeRanges)
      if (o.isInRange(e, n))
        return !0;
    return !1;
  }
  getRanges() {
    return this.ranges;
  }
  clear() {
    this.ranges = [], this.negativeRanges = [], this.allSelected = !1;
  }
  hasSelection() {
    return this.allSelected || !!this.ranges.length;
  }
  hasNoSelection() {
    return !this.hasSelection();
  }
  /**
   * Retrieves the merged row indices from the given range selection.
   *
   * @returns {number[]} Array of merged row indices
   */
  getMergedRowIndices() {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.ranges)
      for (let o = n.r1; o <= n.r2; o++)
        !e.has(o) && !this.isInNegativeRange(o, 0) && e.add(o);
    return Array.from(e);
  }
  selectAll() {
    this.allSelected = !0;
  }
  isAllSelected() {
    return this.allSelected;
  }
  addSelection(e) {
    this.addRange(e);
  }
  removeSelection(e) {
    if (this.selectionType === "none")
      return;
    let n = e;
    this.selectionType === "row" ? n = Le.singleRow(e.r1) : this.selectionType === "column" && (n = Le.singleColumn(e.c1)), this.negativeRanges.push(n);
  }
  togglePoint(e, n) {
    this.getSelectionCount(e, n) > 0 ? this.removeSelection(Le.singleCell(e, n)) : this.addSelection(Le.singleCell(e, n));
  }
  isSelected(e, n) {
    return this.getSelectionCount(e, n) > 0;
  }
  addRange(e) {
    this.selectionType !== "none" && (this.allSelected = !1, this.selectionMode === "single" && (this.ranges = []), this.selectionType === "row" ? (e.c1 = 0, e.c2 = Number.MAX_SAFE_INTEGER) : this.selectionType === "column" ? (e.r1 = 0, e.r2 = Number.MAX_SAFE_INTEGER) : this.selectionType === "cell" ? (e.r2 = e.r1, e.c2 = e.c1) : this.selectionType, this.ranges.push(e));
  }
}
class uL {
  constructor(e = "none") {
    this.selectionType = e, this.rowIndex = -1, this.columnIndex = -1, this.changed = !1;
  }
  clearChanged() {
    this.changed = !1;
  }
  hasChanged() {
    return this.changed;
  }
  clear() {
    this.rowIndex = -1, this.columnIndex = -1;
  }
  setFocus(e, n) {
    (this.rowIndex !== e || this.columnIndex !== n) && (this.rowIndex = e, this.columnIndex = n, this.changed = !0);
  }
  hasFocus(e, n) {
    return this.rowIndex === e && this.columnIndex === n;
  }
  getFocus() {
    return [this.rowIndex, this.columnIndex];
  }
}
class dL {
  constructor(e = new Dn(
    "❯",
    "",
    ["gt-table-icon-expanded"]
  ), n = new Dn(
    "❯",
    "transform: rotate(180deg) translate(-100%, -100%); transform-origin: 0 0;",
    ["ge-table-icon-collapsed"]
  )) {
    this.iconExpanded = e, this.iconCollapsed = n;
  }
  // `⊖ `,  `⊕ `;
}
const fL = new cL(), hL = new uL("cell");
class $0 {
  constructor() {
    this.overflowX = "auto", this.overflowY = "auto", this.horizontalBorderVisible = !0, this.verticalBorderVisible = !0, this.footerSeparatorBorderVisible = !0, this.headerSeparatorBorderVisible = !0, this.fixedEastSeparatorBorderVisible = !0, this.fixedWestSeparatorBorderVisible = !0, this.tableTopBorderVisible = !0, this.tableBottomBorderVisible = !0, this.hoverRowVisible = !0, this.hoverColumnVisible = !0, this.columnsResizable = !0, this.columnsDraggable = !0, this.columnResizeHandleWidthInPx = 4, this.defaultRowHeights = {
      header: 34,
      body: 34,
      footer: 34
    }, this.footerVerticalSeparator = !1, this.headerToggleExpandCollapseIcons = !1, this.headerVerticalSeparator = !1, this.treeOptions = new N0(), this.headerGroupOptions = new dL(), this.showCheckboxWihoutExtraColumn = !1, this.externalFilterFunction = void 0, this.sortedOptions = new L0(), this.sortOrder = ["asc", "desc"], this.getEditRenderer = (e, n) => new lL(), this.getSelectionModel = () => fL, this.getFocusModel = () => hL;
  }
}
const Tg = class Mf {
  /**
   * Returns the content to be copied based on the provided table model, selection model, and focus model.
   *
   * @param {TableModelIf} tableModel - The table model for data retrieval.
   * @param {SelectionModelIf} selectionModel - The selection model to determine the selected range.
   * @param {FocusModelIf} focusModel - The focus model to determine the focused cell.
   * @return {Promise<string>} A promise that resolves to the copied content as a string.
   * @throws {string} Throws an error if neither selection nor focus is defined.
   */
  createContent(e, n, o) {
    return new Promise((r, i) => {
      if (n != null && n.hasSelection()) {
        const s = this.mergeRanges(n.getRanges());
        if (s) {
          s.c2 = Math.min(s.c2, e.getColumnCount() - 1), s.r2 = Math.min(s.r2, e.getBodyModel().getRowCount() - 1);
          const a = [];
          for (let l = s.r1; l <= s.r2; l++) {
            const c = [];
            for (let u = s.c1; u <= s.c2; u++) {
              const d = n.isSelected(l, u) ? e.getBodyModel().getTextValueAt(l, u) : "";
              c.push(d);
            }
            a.push(c.join(Mf.columnSeparatorChar));
          }
          return r(a.join(Mf.rowSeparatorChar));
        }
      }
      if (o) {
        const [s, a] = o.getFocus(), l = e.getBodyModel().getTextValueAt(s, a);
        return r(l);
      }
      i("Cannot copy, neither selection nor focus defined.");
    });
  }
  /**
   * Copy the provided content to the clipboard.
   *
   * @param {string} content - The content to be copied.
   * @return {Promise<void>} A promise that resolves when the content has been successfully copied to the clipboard.
   */
  copyContent(e) {
    return navigator.clipboard.writeText(e);
  }
  /**
   * Asynchronously copies the content of a table to the clipboard.
   *
   * @param {TableModelIf} tableModel - The table model to copy from.
   * @param {SelectionModelIf} selectionModel - The selection model of the table.
   * @param {FocusModelIf} focusModel - The focus model of the table.
   * @returns {Promise<string>} A promise that resolves with the copied text if successful, or rejects if an error occurs.
   */
  copyToClipboard(e, n, o) {
    return new Promise((r, i) => {
      this.createContent(
        e,
        n,
        o
      ).then((s) => {
        s && this.copyContent(s).then((a) => {
          r(s);
        }).catch((a) => {
          i();
        });
      }).catch((s) => {
        i();
      });
    });
  }
  /**
   * Merges an array of CellRanges into a single merged CellRange.
   *
   * @param {CellRange[]} ranges - The array of CellRanges to be merged.
   * @return {CellRange | undefined} - The merged CellRange, or undefined if the ranges array is empty.
   */
  mergeRanges(e) {
    let n;
    for (const o of e)
      n ? (n.r1 = Math.min(n.r1, o.r1), n.c1 = Math.min(n.c1, o.c1), n.r2 = Math.max(n.r2, o.r2), n.c2 = Math.max(n.c2, o.c2)) : n = new Le(o.r1, o.c1, o.r2, o.c2);
    return n;
  }
};
Tg.columnSeparatorChar = "	";
Tg.rowSeparatorChar = `
`;
let $y = Tg;
class xg extends JN {
  constructor(e, n, o, r, i, s = new $y()) {
    var a;
    if (super(
      e,
      n,
      new VN(o),
      r
    ), this.eventListener = i, this.copyService = s, this.licenseManager = Ar.getInstance(), this.selectionService = new oL(this), this.api = new WN(this), this.mouseStartAction = "", this.mouseStartWidth = -1, this.mouseStartColumnIndex = -1, this.dragFrom = -1, this.dragTo = -1, this.lastDragFrom = -1, this.lastDragTo = -1, this.firstDraggingRendering = !0, i || (this.eventListener = new Ly()), (a = this.tableOptions) != null && a.autoRestoreOptions) {
      const l = this.tableOptions.autoRestoreOptions, c = l.getStorageKeyFn;
      c && (l.autoRestoreScrollPosition && (this.storeScrollPosStateService = new zN(c)), l.autoRestoreCollapsedExpandedState && (this.storeStateCollapsedExpandService = new YN(c)), l.autoRestoreSortingState && (this.storeSortingService = new ZN(c)));
    }
    this.mouseHandler = new GN(this), this.inputHandler = new tL(this), this.shortcutService = new sL(this), this.shortcutService.addListener(this.selectionService);
  }
  /**
   * Creates a TableScope instance.
   *
   * @param {HTMLDivElement} hostElement - The HTML div element that will contain the table.
   * @param {TableModelIf} tableModel - The table model object.
   * @param {TableOptionsIf} [tableOptions=new TableOptions()] - The optional table options object.
   * @param {EventListenerIf} [eventListener=new EventAdapter()] - The optional event listener object.
   * @param {DomServiceIf} [domService=new SimpleDomService()] - The optional DOM service object.
   * @param {CopyServiceIf} [copyService=new CopyService()] - The optional copy service object.
   *
   * @return {TableScope} - The newly created TableScope instance.
   */
  static create(e, n, o = new $0(), r = new Ly(), i = new aL(), s = new $y()) {
    return new xg(
      e,
      n,
      i,
      o,
      r,
      s
    );
  }
  /**
   * Triggers an action based on the provided actionId.
   *
   * This function can be invoked manually via the table API or by keyboard shortcuts.
   *
   * @param {ActionId} actionId - The identifier of the action to be triggered.
   * @return {boolean} - Returns true if the action was triggered successfully, false otherwise.
   */
  onActionTriggered(e) {
    if (e === "NAVIGATE_DOWN" && this.changeFocusCell(0, 1) || e === "NAVIGATE_UP" && this.changeFocusCell(0, -1) || e === "NAVIGATE_LEFT" && this.changeFocusCell(-1, 0) || e === "NAVIGATE_RIGHT" && this.changeFocusCell(1, 0))
      return !0;
    if (e === "START_EDITING" && this.getFocusModel) {
      const n = this.getFocusModel();
      if (n) {
        const [o, r] = n.getFocus();
        this.tableModel.getBodyModel().isEditable(o, r) && (this.clearSelection(), this.initRenderEditor(o, r));
      }
      return !0;
    }
    if (e === "COPY_2_CLIPBOARD") {
      const n = this.getSelectionModel ? this.getSelectionModel() : void 0, o = this.getFocusModel ? this.getFocusModel() : void 0;
      this.copyService.createContent(this.tableModel, n, o).then((r) => this.copyService.copyContent(r));
    }
    return !1;
  }
  updateModelValueAfterEdit(e, n, o, r) {
    e === "body" && this.tableModel.getAreaModel(e).setValue(n, o, r) && (this.resetEditorRenderer(), this.repaint(), this.eventListener.onModelChanged(_g.createSingle(n, o)), this.hostElement.focus());
  }
  /**
   * Retrieves the TableApi object.
   *
   * @return {TableApi} The TableApi object.
   */
  getApi() {
    return this.api;
  }
  /**
   * Initializes the table. Called by the table component.
   *
   * @function firstInit
   * @memberof TableScope
   *
   * @returns {TableScope} This instance of the table scope.
   */
  firstInit() {
    var e;
    return this.tableModel.init(), (e = this.tableOptions) != null && e.externalFilterFunction && this.externalFilterChanged(!1), this.autoRestoreCollapsedExpandedState(), this.autoRestoreSortingState(), this.resetSizeOfWrapperDiv(), this.adjustContainersAndRows(), this.autoRestoreScrollPosition(), this;
  }
  /**
   * Creates a GeMouseEvent object based on a MouseEvent.
   *
   * @param {MouseEvent} mouseEvent - The MouseEvent object to create the GeMouseEvent from.
   * @return {GeMouseEvent} - The created GeMouseEvent object.
   */
  createGeMouseEvent(e) {
    const n = new wg();
    if (n.originalEvent = e, e) {
      const o = e.target;
      if ([n.areaIdent, n.sideIdent] = this.getAreaAndSideIdentByAttr(o), n.rowIndex = this.getNumberByAttr(o, "data-row-index"), n.columnIndex = this.getNumberByAttr(o, "data-col-index"), n.action = this.getStringByAttr(o, "data-ge-action"), n.areaIdent) {
        const r = this.tableModel.getAreaModel(n.areaIdent);
        n.rowTop = r.getYPosByRowIndex(n.rowIndex);
      }
      if (n.columnLeft = this.tableModel.getXPosByColumnIndex(n.columnIndex), e.ctrlKey && e.altKey) {
        const r = e.clientY - this.hostElement.offsetTop - this.areaHeaderCenter.parent.clientHeight, i = e.clientX - this.hostElement.offsetLeft - this.areaBodyWestGeo.width;
        this.debugOnce(i, r);
      }
    }
    return n;
  }
  /**
   * Handles the mouse down event.
   *
   * @param {GeMouseEvent} mouseEvent - The mouse event object.
   * @return {void}
   */
  onMouseDown(e) {
    e.columnIndex > -1 && e.action && ["resize-column", "drag-column"].includes(e.action) && (this.mouseStartWidth = this.tableModel.getColumnWidth(e.columnIndex), this.mouseStartAction = e.action, this.mouseStartColumnIndex = e.columnIndex, this.mouseStartAction === "drag-column" && (this.firstDraggingRendering = !0, this.dragFrom = this.mouseStartColumnIndex));
  }
  /**
   * Handles mouse dragging on the frame.
   *
   * @param {GeMouseEvent} mouseEvent - The mouse event object.
   * @param startMouseEvent
   */
  mouseDraggingOnFrame(e, n) {
    this.eventListener.onMouseDragging(e), this.mouseEvent = e, this.mouseStartColumnIndex > -1 && this.mouseStartAction === "resize-column" && this.tableOptions.columnsResizable ? this.resizeColumn(e) : this.mouseStartAction === "drag-column" && e.columnIndex > -1 && this.tableOptions.columnsDraggable && (this.draggingTargetColumnIndex = e.columnIndex, this.dragTo = this.draggingTargetColumnIndex, this.dragFrom > -1 && this.dragTo > -1 && this.dragFrom !== this.dragTo && (this.lastDragFrom === this.dragTo && this.lastDragTo === this.dragFrom || (this.tableModel.changeColumnOrder(this.dragFrom, this.dragTo), this.lastDragFrom = this.dragFrom, this.lastDragTo = this.dragTo, this.dragFrom = this.dragTo, this.resetSizeOfWrapperDiv(), this.adjustContainersAndRows())), n && (this.adjustDraggingColumn(e, n.columnIndex, this.firstDraggingRendering), this.firstDraggingRendering = !1), this.repaint());
  }
  /**
   * Handles the end of mouse dragging event on a frame.
   *
   * @param {GeMouseEvent} mouseEvent - The mouse event object.
   *
   * @returns {void}
   */
  mouseDraggingEndOnFrame(e) {
    this.eventListener.onMouseDraggingEnd(e), this.draggingTargetColumnIndex = -1, this.mouseStartAction === "resize-column" ? this.resizeColumn(e) : this.mouseStartAction === "drag-column" && (this.hideDraggingColumn(), this.repaint()), this.mouseStartWidth = -1, this.mouseStartColumnIndex = -1, this.dragFrom = -1, this.dragTo = -1, this.firstDraggingRendering = !0, this.mouseStartAction = "";
  }
  /**
   * Handles the mouse move event.
   *
   * @param {GeMouseEvent} mouseMoveEvent - The mouse move event object.
   * @return {void}
   */
  mouseMove(e) {
    this.eventListener.onMouseMoved(e), this.adjustHoverRows(e), this.adjustHoverColumns(e);
  }
  /**
   * Triggers the context menu event based on the mouse move event.
   *
   * @param {GeMouseEvent} mouseMoveEvent - The mouse move event object.
   * @return {void}
   */
  contextmenu(e) {
    this.eventListener.onContextmenu(e);
  }
  /**
   * Toggles the expand or collapse state of all items in the body area model.
   *
   * @param {boolean} [expand=true] - Whether to expand or collapse all items. Default is true.
   *
   * @return {void}
   */
  toggleExpandCollapseAll(e = !0) {
    var n;
    const o = this.tableModel.getBodyModel();
    wf(o) && (o.toggleExpandCollapseAll(e), this.repaint(), (n = this.storeStateCollapsedExpandService) == null || n.collapsedStateAll(e));
  }
  /**
   * Toggles the checkbox state of a specific row in a table.
   *
   * @param {number} rowIdx - The index of the row to toggle the checkbox state.
   * @param {number} _colIdx - The index of the column. This parameter is unused.
   * @param {AreaIdent} areaIdent - The identifier of the table area.
   *
   * @return {void} - This method does not return anything.
   */
  toggleRowCheckbox(e, n, o) {
    var r;
    const i = this.tableModel.getAreaModel(o), s = i.isRowChecked(e), a = s === void 0 || s === "semi" || s === "none";
    i.setRowChecked(e, a), this.repaint();
    const l = (r = i.rowSelectionModel) == null ? void 0 : r.getCheckedRows();
    this.eventListener.onCheckboxChanged(l || []);
  }
  /**
   * Handle mouse click events.
   *
   * @param {GeMouseEvent} evt - The mouse click event.
   * @param {GeMouseEvent | undefined} previousEvt - The previous mouse click event, if any.
   * @returns {void}
   */
  onMouseClicked(e, n) {
    let o = this.selectionService.onMouseClicked(e, n);
    if (!o && this.getFocusModel) {
      this.resetEditorRenderer();
      const r = this.getFocusModel();
      r && (o = r.hasChanged(), r.clearChanged());
    }
    return o;
  }
  debounceRepaint() {
    this.debounce(this.repaint.bind(this), 1);
  }
  publishGeMouseEvent(e) {
    this.eventListener.onMouseClicked(e);
  }
  onFocusChanged(e) {
    this.eventListener.onFocusChanged(e);
  }
  onSelectionChanged(e) {
    this.eventListener.onSelectionChanged(e);
  }
  /**
   * Updates the table (repaint) when an external filter is changed.
   *
   * @param {boolean} clearSelection - Indicates whether to clear the selection model or not. Default value is true.
   * @return {void}
   */
  externalFilterChanged(e = !0) {
    const n = this.tableOptions.externalFilterFunction;
    n && (e && this.clearSelectionModel(), this.tableModel.externalFilterChanged(n), this.scrollViewport.scrollTo(0, 0), this.tableModel.recalcHeightAndPadding(), this.resetSizeOfWrapperDiv(), this.repaint());
  }
  /**
   * Handle the double click event on the table header.
   *
   * @param {MouseEvent} event - The mouse event that triggered the double click.
   * @param {number} _rowIdx - The row index of the header.
   * @param {number} colIdx - The column index of the header.
   *
   * @return {void}
   */
  onHeaderDblClicked(e, n, o) {
    var r, i;
    const s = this.tableModel.getColumnDef(o);
    if (s != null && s.sortable && s.sortable()) {
      e.preventDefault(), e.stopPropagation();
      const a = s.sortStatesOrder ? s.sortStatesOrder : this.tableOptions.sortOrder, l = s.sortState ?? "", c = a[(a.indexOf(l) + 1) % a.length], u = new eL(o, c);
      this.tableModel.doSort([u]) && ((r = this.tableModel.getColumnDefs()) == null || r.forEach((d) => d.sortState = ""), s.sortState = c), this.repaint(), (i = this.storeSortingService) == null || i.setSortItems([u]);
    }
  }
  /**
   * Scrolls the viewport to the specified pixel coordinates.
   *
   * @param {number} px - The horizontal pixel coordinate to scroll to.
   * @param {number} py - The vertical pixel coordinate to scroll to.
   *
   * @return {void}
   */
  scrollToPixel(e, n) {
    this.scrollViewport.scrollTo(e, n);
  }
  /**
   * Scrolls to the specified index in the table.
   *
   * @param {number} _indexX - The horizontal index of the table where scrolling is needed.
   * @param {number} indexY - The vertical index of the table where scrolling is needed.
   * @return {void}
   */
  scrollToIndex(e, n) {
    const o = this.tableModel.getAreaModel("body").getYPosByRowIndex(n);
    this.scrollToPixel(0, o);
  }
  /**
   * Sets the selection model for the table.
   *
   * @param {SelectionModel} sm - The selection model to be set.
   * @param {boolean} rerender - Optional parameter indicating whether to rerender the table after setting the selection model. Default value is false.
   *
   * @return {void} - This method does not return any value.
   */
  setSelectionModel(e, n = !1) {
    const o = () => e;
    this.tableOptions.getSelectionModel = o, this.getSelectionModel = o, this.selectionService.getSelectionModel = o, n && this.repaint();
  }
  toggleHeaderGroup(e) {
    const n = this.tableModel.getAreaModel("header");
    "columnDefs" in this.tableModel && (this.tableModel.columnDefs = n.toggleHeaderGroup(e), console.info("####### !!!!!! *******, this.tableModel.columnDefs")), this.firstInit();
  }
  /**
   * Retrieves the selection model.
   * @returns {SelectionModelIf | undefined} The selection model if available, otherwise undefined.
   */
  selectionModel() {
    if (this != null && this.getSelectionModel)
      return this.getSelectionModel();
  }
  /**
   * Retrieves the focus model.
   *
   * @returns {FocusModelIf | undefined} The focus model if it exists, or undefined otherwise.
   */
  focusModel() {
    if (this != null && this.getFocusModel)
      return this.getFocusModel();
  }
  setDragging(e) {
    this.dragging = e, this.dragging ? (this.storeColumnWidths(), this.lastDragFrom = -1, this.lastDragTo = -1) : this.storedColumnWidths = [];
  }
  /**
   * Changes the focus cell using the specified deltas.
   *
   * @param {number} dx - The delta for the column index.
   * @param {number} dy - The delta for the row index.
   * @return {boolean} - True if the focus cell was changed, false otherwise.
   */
  changeFocusCell(e, n) {
    if (!this.isEditing() && this.getFocusModel) {
      const o = this.getFocusModel();
      if (o) {
        const [r, i] = o.getFocus();
        return o.setFocus(r + n, i + e), this.repaint(), !0;
      }
    }
    return !1;
  }
  /**
   * Resizes the column based on the mouse event.
   *
   * @param {GeMouseEvent} mouseEvent - The mouse event that triggered the resize.
   */
  resizeColumn(e) {
    this.tableModel.setColumnWidth(this.mouseStartColumnIndex, this.mouseStartWidth + e.draggingX), this.tableModel.recalcPadding(), this.resetSizeOfWrapperDiv(), this.adjustContainersAndRows();
  }
  /**
   * Clears the selection model, if available.
   *
   * @return {void}
   */
  clearSelectionModel() {
    var e;
    this.getSelectionModel && ((e = this.getSelectionModel()) == null || e.clear());
  }
  debugOnce(e, n) {
    var o;
    console.clear(), console.info("this.hostElement.offsetTop", this.hostElement.offsetTop), console.info("this.hostElement.scrollHeight", this.hostElement.scrollHeight), console.info("this.scrollViewportTop", this.scrollTop), console.info("this.areaHeaderCenter.parent.clientHeight", this.areaHeaderCenter.parent.clientHeight), console.info("bodyY", n), console.info("bodyX", e), console.info("rows", this.firstVisibleRowIndex), console.info(""), console.info("this.tableModel", this.tableModel), console.info(""), console.info("this.mouseMoveEvent.clientX", (o = this.mouseHandler.mouseEvent) == null ? void 0 : o.clientX), console.info("this.hostElement.offsetLeft", this.hostElement.offsetLeft), console.info("this.areaBodyWestGeo.width", this.areaBodyWestGeo.width);
  }
  /**
   * Restores the scroll position of the table if auto restore options are enabled.
   *
   *
   * @returns {void}
   */
  autoRestoreScrollPosition() {
    var e;
    if ((e = this.tableOptions) != null && e.autoRestoreOptions && this.storeScrollPosStateService && this.tableOptions.autoRestoreOptions.autoRestoreScrollPosition) {
      const n = this.storeScrollPosStateService.getScrollOffset();
      n && this.scrollViewport.scrollTo(...n);
    }
  }
  /**
   * Automatically restores the sorting state of the table.
   *
   * @private
   * @function autoRestoreSortingState
   * @memberof ClassName
   *
   * @description
   * This method checks if the autoRestoreSortingState option is enabled in the tableOptions.
   * If enabled, it uses the storeSortingService to retrieve the sort items array.
   * If there are sort items present, it applies them to the table's body model using the doSort method.
   *
   * @returns {void}
   */
  autoRestoreSortingState() {
    var e, n;
    if ((n = (e = this.tableOptions) == null ? void 0 : e.autoRestoreOptions) != null && n.autoRestoreSortingState && this.storeSortingService) {
      const o = this.storeSortingService.getSortItems();
      o != null && o.length && this.tableModel.getBodyModel().doSort(o);
    }
  }
  /**
   * Restores the collapsed/expanded state of the rows in the table based on the autoRestoreOptions
   * specified in the tableOptions. This method is private and should not be called directly.
   *
   * @private
   */
  autoRestoreCollapsedExpandedState() {
    var e, n;
    if ((n = (e = this.tableOptions) == null ? void 0 : e.autoRestoreOptions) != null && n.getRowId && this.storeStateCollapsedExpandService) {
      const o = this.tableOptions.autoRestoreOptions, r = o.getRowId;
      if (o.autoRestoreCollapsedExpandedState && r) {
        const i = this.storeStateCollapsedExpandService.collapsedExpandedStateGet(), s = this.tableModel.getAreaModel("body");
        if (wf(s)) {
          const a = s, l = s.getRowCount();
          for (let c = 0; c < l; c++) {
            const u = s.getRowByIndex(c);
            if (u)
              if (i.allExpanded)
                u.expanded = !0;
              else if (i.allCollapsed)
                u.expanded = !1;
              else {
                const d = r(u.data);
                i.mode === "expanded" ? u.expanded = this.storeStateCollapsedExpandService.collapsedExpandedStateIncludes(d) : i.mode === "collapsed" && (u.expanded = !this.storeStateCollapsedExpandService.collapsedExpandedStateIncludes(d));
              }
          }
          a.recalcVisibleTreeRows();
        }
      }
    }
  }
}
var pL = Object.defineProperty, gL = Object.getOwnPropertyDescriptor, mL = (t, e, n, o) => {
  for (var r = o > 1 ? void 0 : o ? gL(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (r = (o ? s(e, n, r) : s(r)) || r);
  return o && r && pL(e, n, r), r;
};
let Af = class {
  constructor(t) {
    this.renderer = t;
  }
  setStyle(t, e, n) {
    return this.renderer.setStyle(t, e, n), t;
  }
  appendText(t, e) {
    const n = this.renderer.createText(e);
    return this.renderer.appendChild(t, n), n;
  }
  addClass(t, e) {
    return e.includes(" ") ? e.split(" ").forEach((n) => this.renderer.addClass(t, n)) : this.renderer.addClass(t, e), t;
  }
  removeClass(t, e) {
    return e.includes(" ") ? e.split(" ").forEach((n) => t.classList.remove(n)) : t.classList.remove(e), t;
  }
  appendChild(t, e) {
    this.renderer.appendChild(t, e);
  }
  createElement(t) {
    return this.renderer.createElement(t);
  }
  createText(t) {
    return this.renderer.createText(t);
  }
  setAttribute(t, e, n) {
    this.renderer.setAttribute(t, e, n);
  }
};
Af = mL([
  le({
    providedIn: "root"
  })
], Af);
var yL = Object.defineProperty, vL = Object.getOwnPropertyDescriptor, ht = (t, e, n, o) => {
  for (var r = o > 1 ? void 0 : o ? vL(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (r = (o ? s(e, n, r) : s(r)) || r);
  return o && r && yL(e, n, r), r;
};
let et = class {
  constructor(t, e, n, o) {
    this.renderer = t, this.elementRef = e, this.zone = n, this.domService = o, this.tableReady = new Ze(), this.mouseMoved = new Ze(), this.mouseDragging = new Ze(), this.mouseDraggingEnded = new Ze(), this.contextmenu = new Ze(), this.mouseClicked = new Ze(), this.modelChanged = new Ze(), this.selectionChanged = new Ze(), this.focusChanged = new Ze(), this.checkboxChanged = new Ze(), this.tableOptions = new $0(), this.debounceMouseClickDelay = 150, this.debounceMouseClick = new Ze(), this.alive = !0;
  }
  onSelectionChanged(t) {
    this.selectionChanged.next(t);
  }
  onFocusChanged(t) {
    this.focusChanged.next(t);
  }
  onContextmenu(t) {
    this.contextmenu.next(t);
  }
  onMouseMoved(t) {
    this.mouseMoved.next(t);
  }
  // will be called by table-scope:
  onMouseClicked(t) {
    this.debounceMouseClick.next(t);
  }
  onCheckboxChanged(t) {
    this.checkboxChanged.next(t);
  }
  onModelChanged(t) {
    this.modelChanged.next(t);
  }
  ngOnInit() {
    this.initModel(), this.debounceMouseClick.pipe(
      Nw(this.debounceMouseClickDelay),
      Uw(() => this.alive)
    ).subscribe((t) => {
      this.zone.run(() => {
        this.mouseClicked.next(t);
      });
    });
  }
  ngOnDestroy() {
    this.alive = !1;
  }
  onMouseDragging(t) {
    this.mouseDragging.next(t);
  }
  onMouseDraggingEnd(t) {
    this.mouseDraggingEnded.next(t);
  }
  initModel() {
    this.zone.runOutsideAngular(this.init.bind(this));
  }
  init() {
    this.tableModel && (this.tableScope = new xg(
      this.elementRef.nativeElement,
      this.tableModel,
      this.domService,
      this.tableOptions,
      this
    ), this.tableScope.firstInit(), this.tableReady.next(this.tableScope.getApi()));
  }
};
ht([
  Ht()
], et.prototype, "tableReady", 2);
ht([
  Ht()
], et.prototype, "mouseMoved", 2);
ht([
  Ht()
], et.prototype, "mouseDragging", 2);
ht([
  Ht()
], et.prototype, "mouseDraggingEnded", 2);
ht([
  Ht()
], et.prototype, "contextmenu", 2);
ht([
  Ht()
], et.prototype, "mouseClicked", 2);
ht([
  Ht()
], et.prototype, "modelChanged", 2);
ht([
  Ht()
], et.prototype, "selectionChanged", 2);
ht([
  Ht()
], et.prototype, "focusChanged", 2);
ht([
  Ht()
], et.prototype, "checkboxChanged", 2);
ht([
  W()
], et.prototype, "tableModel", 2);
ht([
  W()
], et.prototype, "tableOptions", 2);
ht([
  W()
], et.prototype, "debounceMouseClickDelay", 2);
et = ht([
  HS({
    selector: "guiexpert-table",
    standalone: !0,
    imports: [lc],
    providers: [Af],
    template: "",
    styleUrls: [
      "./table.component.css"
    ],
    encapsulation: Xt.None,
    changeDetection: Bn.OnPush
  })
], et);
class DL {
  constructor(e, n, o, r, i) {
    this.componentType = e, this.appRef = n, this.injector = o, this.cdr = r, this.zone = i, this.event$ = new Et(), this.closed$ = new Ze();
  }
  render(e, n, o, r, i, s, a) {
    const l = C0(this.componentType, {
      environmentInjector: this.injector
    });
    return l.instance.setData(
      n,
      o,
      r,
      i,
      s
    ), Object.keys(l.instance).filter((d) => l.instance[d].subscribe).map((d) => l.instance[d]).forEach(
      (d) => d.pipe(
        Vw(this.closed$)
      ).subscribe((f) => {
        console.info("RendererWrapper event >", f), this.event$.next(f);
      })
    ), e.appendChild(l.location.nativeElement), this.appRef.attachView(l.hostView), this.zone.run(() => {
      this.cdr.detectChanges();
    }), () => {
      this.appRef.detachView(l.hostView), this.closed$.next(Date.now());
    };
  }
}
var CL = Object.defineProperty, bL = Object.getOwnPropertyDescriptor, EL = (t, e, n, o) => {
  for (var r = o > 1 ? void 0 : o ? bL(e, n) : e, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (r = (o ? s(e, n, r) : s(r)) || r);
  return o && r && CL(e, n, r), r;
};
let By = class {
  constructor(t, e, n) {
    this.appRef = t, this.injector = e, this.zone = n;
  }
  create(t, e) {
    return new DL(t, this.appRef, this.injector, e, this.zone);
  }
};
By = EL([
  le({
    providedIn: "root"
  })
], By);
export {
  Af as DomService,
  By as RenderWrapperFactory,
  DL as RendererWrapper,
  et as TableComponent
};
