JSClass = {};

// _assign is like _.extend or the upcoming Object.assign.
// Copy src's own, enumerable properties onto tgt and return
// tgt.
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _assign = function (tgt, src) {
  for (var k in src) {
    if (_hasOwnProperty.call(src, k))
      tgt[k] = src[k];
  }
  return tgt;
};

JSClass._inherits = function (ctor, superCtor) {
  var oldProto = ctor.prototype;
  for (var k in oldProto) {
    if (Object.prototype.hasOwnProperty.call(oldProto, k))
      throw new Error("Use 'inherits' before assigning any prototype properties; found: " + k);
  }

  if (Object.create) {
    ctor.prototype = Object.create(
      superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
  } else {
    // IE 8
    var F = function () {};
    F.prototype = superCtor.prototype;
    ctor.prototype = new F;
  }

  ctor.__super__ = superCtor.prototype;
};

var def = function (props) {
  if (props)
    _assign(this.prototype, props);
};

var extend = function (optionalCtor) {
  var superCtor = this;
  var ctor = optionalCtor || function () {
    superCtor.apply(this, arguments);
  };
  JSClass._inherits(ctor, this);
  bless(ctor);
  return ctor;
};

var bless = function (ctor) {
  ctor.def = def;
  ctor.extend = extend;
};

JSClass.bless = function (ctor) {
  bless(ctor);
};
