# Regular Expressions and Finite Automata (refa)

[![Actions Status](https://github.com/RunDevelopment/refa/workflows/Node.js%20CI/badge.svg)](https://github.com/RunDevelopment/refa/actions)

A library for regular expressions (RE) and finite automata (FA) in the context of Javascript RegExp.


## About

This is a general library for [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton), [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton), and REs of [formal regular languages](https://en.wikipedia.org/wiki/Induction_of_regular_languages).

It also supports additional methods to easily convert from JS RegExp to the internal RE ast and vice versa.

__At this point in time, the library is still in development and partially incomplete!__


## Features

- Conversions

  * RE to NFA (_lookarounds are not implemented yet_)
  * NFA to DFA and DFA to NFA
  * NFA to RE and DFA to RE

- DFA and NFA operations

  * Construction from a finite set of words
  * Print internal representation in a human-readable form
  * Test whether a word is accepted
  * Test whether the language of an FA is the empty set
  * Test whether the language of an FA is a finite set

- DFA specific operations

  * Intersection with other DFA (_not implemented yet_)
  * DFA minimization
  * Complement (_not implemented yet_)
  * Structural equality

- NFA specific operations

  * Union and Intersection with other NFA
  * Concatenation with other NFA
  * Quantification

- Javascript RegExp

  * RegExp to RE and RE to RegExp

### Limitations

This library will never be able to support some modern features of regex engines such as [backreferences](https://www.rexegg.com/regex-capture.html) and [recursion](https://www.rexegg.com/regex-recursion.html) because these features, generally, cannot be be represented by a DFA or NFA.
