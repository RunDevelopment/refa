# Regular Expressions and Finite Automata (refa)

[![Actions Status](https://github.com/RunDevelopment/refa/workflows/Node.js%20CI/badge.svg)](https://github.com/RunDevelopment/refa/actions)

A library for finite automata (FA) and regular expressions (RE) in the context of Javascript RegExp.


## About

This is a general library for [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton), [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton), and REs of [formal regular languages](https://en.wikipedia.org/wiki/Induction_of_regular_languages).

It also supports additional methods to easily convert from JS RegExp to the internal RE ast and vice versa.

__At this point in time, the library is still in development and partially incomplete!__


## Features

- Conversions

  * RE to NFA
  * NFA to DFA
  * NFA to RE and DFA to RE

- DFA and NFA operations

  * Construction from a finite set of words
  * Print internal representation in a human-readable form
  * Test whether a word is accepted
  * Test whether the language if the FA is the empty set

- DFA specific operations

  * Intersection with other NFA (_not implemented yet_)
  * DFA Minification (_requires testing and further optimization_)
  * Complement (_not implemented yet_)
  * Equality (structurally)

- NFA specific operations

  * Union and Intersection with other NFA
  * Concatenation with other NFA
  * Quantification (this includes the Kleene Star)

- Javascript RegExp

  * RegExp to RE and RE to RegExp

### Limitations

This library will never be able to support some modern features of regex engines such as [backreferences](https://www.rexegg.com/regex-capture.html), [atomic groups](https://www.rexegg.com/regex-disambiguation.html#atomic), [possessive quantifiers](https://www.rexegg.com/regex-quantifiers.html#possessive), and [recursion](https://www.rexegg.com/regex-recursion.html) because these features, generally, cannot be be represented by a DFA or NFA.
