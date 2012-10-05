var codes = {
  'bold'      : ['\x1B[1m',  '\x1B[22m'],
  'italic'    : ['\x1B[3m',  '\x1B[23m'],
  'underline' : ['\x1B[4m',  '\x1B[24m'],
  'inverse'   : ['\x1B[7m',  '\x1B[27m'],
  'white'     : ['\x1B[37m', '\x1B[39m'],
  'grey'      : ['\x1B[90m', '\x1B[39m'],
  'black'     : ['\x1B[30m', '\x1B[39m'],
  'blue'      : ['\x1B[34m', '\x1B[39m'],
  'cyan'      : ['\x1B[36m', '\x1B[39m'],
  'green'     : ['\x1B[32m', '\x1B[39m'],
  'magenta'   : ['\x1B[35m', '\x1B[39m'],
  'red'       : ['\x1B[31m', '\x1B[39m'],
  'yellow'    : ['\x1B[33m', '\x1B[39m']
};

Object.keys(codes).forEach(function (style) {
  exports[style] = function (str) {
    return codes[style].join(str);
  };
});

exports.stripColors = function (str) {
  return str.replace(/\x1B\[\d+m/g, '');
};

// special stylizers that work on each char
var map = Array.prototype.map;
var rainbow = ['red','yellow','green','blue','magenta'];
exports.rainbow = function (str) {
  return map.call(str, function (c, i) {
    return codes[rainbow[i % rainbow.length]].join(c);
  }).join('');
};

exports.zebra = function (str) {
  return map.call(str, function (c, i) {
    return (i % 2) ? codes.inverse.join(c) : c;
  }).join('');
};

var souls = [
  [ // hi
    '̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒',  '͗',
    '͑',  '̇', '̈', '̊', '͂',  '̓', '̈', '͊',  '͋',  '͌',
    '̃', '̂', '̌', '͐',  '̀', '́', '̋', '̏', '̒', '̓',
    '̔', '̽', '̉', 'ͣ',  'ͤ',  'ͥ',  'ͦ',  'ͧ',  'ͨ',  'ͩ',
    'ͪ',  'ͫ',  'ͬ',  'ͭ',  'ͮ',  'ͯ',  '̾', '͛',  '͆',  '̚'
  ],
  [ // low
    '̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤',
    '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰',
    '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ',  '͇',  '͈',
    '͉',  '͍',  '͎',  '͓',  '͔',  '͕',  '͖',  '͙',  '͚',  '̣'
  ],
  [ // mid
    '̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵',
    '̶', '͜',  '͝',  '͞',  '͟',  '͠',  '͢',  '̸', '̷', '͡', '҉'
  ]
];

var randInt = function (exclMax) {
  return Math.floor(Math.random() * exclMax);
};

// decorates a string with randInt(die) chars from each soul
exports.zalgo = function (str, dice) {
  dice = dice || [3, 3, 1];
  return map.call(str, function (c) {
    for (var t = 0; t < souls.length; t += 1) {
      for (var n = randInt(dice[t] + 1); n > 0; n -= 1) {
        c += souls[t][randInt(souls[t].length)];
      }
    }
    return c;
  }).join('');
};

// in case people want to attempt sanitize a zalgolized string
exports.souls = [].concat(souls[0], souls[1], souls[2]);