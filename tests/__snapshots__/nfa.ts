/* eslint-disable */

module.exports["NFA >> union >> /()/ ∪ /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b?/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b*/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b+/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b/"] = `
(0) -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /ab/ ∪ /ba/"] = `
(0) -> (1) : 61
    -> (2) : 62

(1) -> [3] : 62

(2) -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /foo/ ∪ /bar/"] = `
(0) -> (1) : 62
    -> (2) : 66

(1) -> (3) : 61

(2) -> (4) : 6f

(3) -> [5] : 72

(4) -> [5] : 6f

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61

[1] -> none

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /a|b|c{2}/ ∪ /a{2}|b{2}|c/"] = `
(0) -> (1) : 61
    -> [2] : 61..63
    -> (3) : 62
    -> (4) : 63

(1) -> [2] : 61

[2] -> none

(3) -> [2] : 62

(4) -> [2] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /b/ ∪ /()/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b?/ ∪ /()/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b*/ ∪ /()/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /b+/ ∪ /()/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /a/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b/ ∪ /a/"] = `
(0) -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b?/ ∪ /a/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b*/ ∪ /a/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /b+/ ∪ /a/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b/ ∪ /a?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b?/ ∪ /a?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b*/ ∪ /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /b+/ ∪ /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /b/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b?/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b*/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /b+/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /a+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /b/ ∪ /a+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b?/ ∪ /a+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /b*/ ∪ /a+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /b+/ ∪ /a+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /ba/ ∪ /ab/"] = `
(0) -> (1) : 61
    -> (2) : 62

(1) -> [3] : 62

(2) -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /bar/ ∪ /foo/"] = `
(0) -> (1) : 62
    -> (2) : 66

(1) -> (3) : 61

(2) -> (4) : 6f

(3) -> [5] : 72

(4) -> [5] : 6f

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a/"] = `
[0] -> [1] : 61
    -> [2] : 61

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*b*c*/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /a{2}|b{2}|c/ ∪ /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> [2] : 61..63
    -> (3) : 62
    -> (4) : 63

(1) -> [2] : 61

[2] -> none

(3) -> [2] : 62

(4) -> [2] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b?/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b*/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b+/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /()/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b+/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /()/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b+/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /ab/ * /ba/"] = `
(0) -> (1) : 61

(1) -> (2) : 62

(2) -> (3) : 62

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /foo/ * /bar/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> (4) : 62

(4) -> (5) : 61

(5) -> [6] : 72

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /a*/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : 61..62
    -> (2) : 63

(1) -> (3) : 61
    -> (4) : 62
    -> [5] : 63

(2) -> (1) : 63

(3) -> [5] : 61

(4) -> [5] : 62

[5] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b/ * /()/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b?/ * /()/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b*/ * /()/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /b+/ * /()/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /a/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b/ * /a/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b?/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b*/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> append >> /b+/ * /a/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /b?/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b*/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /b+/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b?/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /b+/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /a+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b/ * /a+/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b?/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /b*/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> append >> /b+/ * /a+/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /ba/ * /ab/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 62

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /bar/ * /foo/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 72

(3) -> (4) : 66

(4) -> (5) : 6f

(5) -> [6] : 6f

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a/"] = `
(0) -> (1) : 61
    -> [2] : 61

(1) -> (1) : 61
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[4] -> [2] : 61
    -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> (2) : 62
    -> (3) : 63

(1) -> (3) : 61

(2) -> (3) : 62

(3) -> [4] : 61..62
    -> (5) : 63

[4] -> none

(5) -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /()/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /()/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /()/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /()/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a+/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a+/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /ba/ * /ab/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 62

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /bar/ * /foo/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 72

(3) -> (4) : 66

(4) -> (5) : 6f

(5) -> [6] : 6f

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a/"] = `
(0) -> (1) : 61
    -> [2] : 61

(1) -> (1) : 61
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[4] -> [2] : 61
    -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> (2) : 62
    -> (3) : 63

(1) -> (3) : 61

(2) -> (3) : 62

(3) -> [4] : 61..62
    -> (5) : 63

[4] -> none

(5) -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /b/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /b?/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /b*/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /b+/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /()/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /b/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /b+/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a?/ * /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a?/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a?/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a?/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a?/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a+/ * /()/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /a+/ * /b/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a+/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a+/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /a+/ * /b+/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /ab/ * /ba/"] = `
(0) -> (1) : 61

(1) -> (2) : 62

(2) -> (3) : 62

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /foo/ * /bar/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> (4) : 62

(4) -> (5) : 61

(5) -> [6] : 72

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /a*/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : 61..62
    -> (2) : 63

(1) -> (3) : 61
    -> (4) : 62
    -> [5] : 63

(2) -> (1) : 63

(3) -> [5] : 61

(4) -> [5] : 62

[5] -> none
`.slice(1, -1);
