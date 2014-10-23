# Gardening

[![Build Status](https://travis-ci.org/jlord/gardening.svg?branch=master)](https://travis-ci.org/jlord/gardening)

Tending your open source garden?

![garden](http://f.cl.ly/items/3X0N0M1N0C0Y1S3Y0T3s/Screen%20Shot%202014-10-19%20at%2010.50.07%20PM.png)

This is a command-line module to let you know if you (or someone else) has had a public contribution today.

### To install

_Requires Node.js_

```Bash
$ npm install -g gardening
$ garden [githubusername]
```

For example: `garden jlord`

This will return either:

```Bash
---
✔︎ Green! jlord has 2 today!
---
```
or

```Bash
---
✗ Grey! jlord has 0 today.
---
```

### Test

```Bash
$ npm test
```

Currently just checks the 0 contributions state.

---

Very basic. I'd like to also have it tell you what color/level green you're at also. 
