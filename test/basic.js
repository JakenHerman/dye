var tap = require('tap')
  , test = tap.test
  , set = require('subset')
  , dye = require('../');

test("codes", function (t) {
  t.equal(dye.bold('XXX'), '\x1B[1mXXX\x1B[22m', dye.bold('bold'));
  t.equal(dye.italic('XXX'), '\x1B[3mXXX\x1B[23m', dye.italic('italic'));
  t.equal(dye.underline('XXX'), '\x1B[4mXXX\x1B[24m', dye.italic('underline'));
  t.equal(dye.inverse('XXX'), '\x1B[7mXXX\x1B[27m', dye.italic('italic'));
  t.equal(dye.white('XXX'), '\x1B[37mXXX\x1B[39m', dye.white('white'));
  t.equal(dye.grey('XXX'), '\x1B[90mXXX\x1B[39m', dye.grey('grey'));
  t.equal(dye.black('XXX'), '\x1B[30mXXX\x1B[39m', dye.black('black'));
  t.equal(dye.blue('XXX'), '\x1B[34mXXX\x1B[39m', dye.blue('blue'));
  t.equal(dye.cyan('XXX'), '\x1B[36mXXX\x1B[39m', dye.cyan('cyan'));
  t.equal(dye.green('XXX'), '\x1B[32mXXX\x1B[39m', dye.green('green'));
  t.equal(dye.magenta('XXX'), '\x1B[35mXXX\x1B[39m', dye.magenta('magenta'));
  t.equal(dye.red('XXX'), '\x1B[31mXXX\x1B[39m', dye.red('red'));
  t.equal(dye.yellow('XXX'), '\x1B[33mXXX\x1B[39m', dye.yellow('yellow'));
  t.equal(dye.stripColors(dye.zebra("abcdefghijklmnop")), "abcdefghijklmnop", "strip");
  t.end();
});

test("zalgo", function (t) {
  var str = 'he comes';
  var zalgd = dye.zalgo(str, [10,10,10]);
  t.ok(zalgd, "zalgo works");
  t.ok(zalgd.length >= str.length, "zalgolizer generally expands the string");

  var diff = set.nub(set.difference(zalgd.split(''), str.split('')));
  t.ok(set.isSubsetOf(diff, dye.souls), "(zalgo(str)) \\ str) ⊆ souls");

  t.end();
});

test("rainbow", function (t) {
  var r = dye.rainbow("XXXXXXXXXX");
  t.ok(r, "rainbow works");
  var chunked = [0,1,2,3,4,5,6,7,8,9].map(function (n) {
    return r.slice(11 * n, 11*n + 11);
  })
  chunked.forEach(function (codes, i) {
    if (i % 5 === 0) {
      t.equal(codes, '\x1B[31mX\x1B[39m', "red code" + i);
    }
    if (i % 5 === 1) {
      t.equal(codes, '\x1B[33mX\x1B[39m', "yellow code" + i);
    }
    if (i % 5 === 2) {
      t.equal(codes, '\x1B[32mX\x1B[39m', "green code" + i);
    }
    if (i % 5 === 3) {
      t.equal(codes, '\x1B[34mX\x1B[39m', "blue code" + i);
    }
    if (i % 5 === 4) {
      t.equal(codes, '\x1B[35mX\x1B[39m', "magenta code" + i);
    }
  });

  t.end();
});

test("zebra", function (t) {
  var z = dye.zebra("XXXX");
  t.ok(z, "zebra works");
  t.equal(z.slice(0, 1), "X", "evens stay the same");
  t.equal(z.slice(1, 11), '\x1B[7mX\x1B[27m', "odds inverted");
  t.equal(z.slice(11, 12), 'X', "second even stays the same");
  t.equal(z.slice(12, 23), '\x1B[7mX\x1B[27m', "second odd inverted");

  t.end();
});