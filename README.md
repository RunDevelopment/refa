# Regular Expressions and Finite Automata (refa)

[![Actions Status](https://github.com/RunDevelopment/refa/workflows/Node.js%20CI/badge.svg)](https://github.com/RunDevelopment/refa/actions)
[![npm](https://img.shields.io/npm/v/refa)](https://www.npmjs.com/package/refa)

A library for regular expressions (RE) and finite automata (FA) in the context of [Javascript RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).


## About

This is a general library for [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton), [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton), and REs of [formal regular languages](https://en.wikipedia.org/wiki/Induction_of_regular_languages).

It also supports additional methods to easily convert from JS RegExp to the internal RE AST and vice versa.

__At this point in time, the library is still in development and partially incomplete!__


## Installation

Get refa from NPM:

```
npm i --save refa
```

or

```
yarn add refa
```


## Features

- Conversions

  * RE to NFA (_lookarounds are not implemented yet_)
  * NFA to DFA and DFA to NFA
  * NFA to RE and DFA to RE

- DFA and NFA operations

  * Construction from other FA, the intersection of two FA, or a finite set of words
  * Print internal representation in a human-readable form
  * Test whether a word is accepted
  * Test whether the language of an FA is the empty set/a finite set
  * Accept all prefixes of a language

- DFA specific operations

  * Minimization
  * Complement
  * Structural equality

- NFA specific operations

  * Union and Concatenation with other FA
  * Quantification
  * Reverse
  * Accept all suffixes of a language

- Javascript RegExp

  * RegExp to RE and RE to RegExp (non-trivial backreferences are not supported)

See the [API documentation](https://rundevelopment.github.io/refa/) for a complete list of all currently implemented operations.

### Limitations

This library will never be able to support some modern features of regex engines such as [backreferences](https://www.rexegg.com/regex-capture.html) and [recursion](https://www.rexegg.com/regex-recursion.html) because these features, generally, cannot be be represented by a DFA or NFA.
