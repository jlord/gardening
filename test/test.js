var test = require('tape')
var exec = require('child_process').exec

// I use a test account of mine, eviljlord,
// it's very likely to have no activity

test('verify zero for today', function(t) {
  exec('node index.js eviljlord', function(error, stdout, stderr) {
    if (error) return t.notOk(error, "no error running command")
    t.equal(stdout, "---\n✗ Grey! eviljlord with 0 today!\n---\n")
    t.end()
  })
})

test('verify zero for yesterday', function(t) {
  exec('node index.js eviljlord -y', function(error, stdout, stderr) {
    if (error) return t.notOk(error, "no error running command")
    t.equal(stdout, "---\n✗ Grey! eviljlord with 0 yesterday!\n---\n")
    t.end()
  })
})
