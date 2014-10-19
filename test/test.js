var test = require('tape')
var exec = require('child_process').exec

// I use a test account of mine, eviljlord,
// it's very likely to have no activity

test('check zero', function(t) {
  exec('garden eviljlord', function(error, stdout, stderr) {
    t.equal(stdout, "---\n✗ Grey! eviljlord has 0 today!\n---\n" )
  })
  t.end()
})
