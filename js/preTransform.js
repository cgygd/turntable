// transform兼容
function preTransform(param) {
  var Transform =  param || 'Transform'
  var cssPrefix,
  vendors = {
    '': '',
    Webkit: 'webkit',
    Moz: '',
    O: 'o',
    ms: 'ms'
  },
  testEle = document.createElement('p'),
  cssSupport = {};
  // 嗅探特性
  Object.keys(vendors).some(function (vendor) {
    if (testEle.style[vendor + (vendor ? 'T' : 't') + 'ransform'] !==
    undefined) {
      cssPrefix = vendor ? '-' + vendor.toLowerCase() + '-' : '';
      return true;
    }
  });

  function normalizeCss(name) {
    name = name.toLowerCase();
    return cssPrefix ? cssPrefix + name : name;
  }

  cssSupport = {
    transform: normalizeCss(Transform),
  }

  return cssSupport.transform;
}