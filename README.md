# Gardening

[![Build Status](https://travis-ci.org/jlord/gardening.svg?branch=master)](https://travis-ci.org/jlord/gardening)

Tending your open source garden?

![garden](http://f.cl.ly/items/3X0N0M1N0C0Y1S3Y0T3s/Screen%20Shot%202014-10-19%20at%2010.50.07%20PM.png)

This is a command-line module to let you know if you (or someone else) has had a public contribution today or yesterday and to what level of green they reached (green levels are different for each user and based on average).

### To install

_Requires [Node.js](http://www.nodejs.org)_

```bash
$ npm install -g gardening
```

### To use

```bash
# for today
$ garden [githubusername]
# for yesterday
$ garden [githubusername] -y
```

**Options**
- `-y` returns _yesterday's_ contributions

#### Example

`$ garden jlord` or `$ garden jlord -y`

Will return either:

```Bash
---
✔︎ Green Level 2! jlord with 14 today!
---
```
or

```Bash
---
✗ Grey! jlord with 0 today.
---
```

### Test

```Bash
$ npm test
```

Currently just checks the 0 contributions state.

---

:octocat: This is very basic, but saves me a few steps in the browser.
