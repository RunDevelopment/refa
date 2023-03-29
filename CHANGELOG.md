# Changelog

## 0.11.0 (2023-03-29)

### Breaking changes

- Upgraded to `@eslint-community/regexpp` v4.5.0 and drop `regexpp`.
- Drop support for NodeJS 10.
- Changed default character-set-to-string function of `{DFA,ENFA,NFA}#toDot` to `CharSet#toUnicodeString`.
- Changed character-set-to-string function of `{DFA,ENFA,NFA}#toString` to `CharSet#toUnicodeString`.
- Renamed `ToDotInfo` to `NodeInfo`.
- Removed `createSimpleToDotOptions`.

### Added

- Added `toMermaid` as part of the `FAIterators` namespace and `FiniteAutomaton` interface.
- Added a unified interface for the namespaced `toDot` and `toMermaid` functions.
- Many DFA, ENFA, and NFA operations now take optional node factory arguments to control the number of nodes created. All operations that create nodes no take factory arguments.
- `{DFA,ENFA,NFA}.emptyWord` will create a new FA that makes exactly the empty word.
- Added `withInitial`, `withGetOut`, and `withIsFinal` to more easily derive new FA iterators.
- Added `assertions: "ignore"` to JS parser, `ENFA.fromRegex`, and `NFA.fromRegex`. This is mostly for convenience and performance. The same behavior could previously be achieved using transformers.
- Added `CharSet#toUnicodeString` to provide an easy way to convert a character set into a human-readable string.
- Added `CharSet#isProper{Subset,Superset}Of`.
- `CharSet#equals` now supports `CharRange`s.

### Fixed

- Fixed `ENFA#isEmpty` for non-normalized graphs.

### Changed

- `{DFA,NFA}.fromCharSet` and `{ENFA,NFA}.all` now use constructions with fewer states.
- `approximateRejectingWordSet` will now return `undefined` instead of throwing an error if the input character set is empty.
- Changed behavior of `ENFA#countNodes` to be consistent with NFA and DFA.
- Upgraded from Unicode 13.0.0 to Unicode 15.0.0.
- Generally added and improved documentation.


## 0.10.0 (2021-10-18)

### Breaking changes

- `CharSet`: The `intersect` and `without` methods now only take `CharSet`s and `CharRange`s as arguments.
- `{DFA,ENFA,NFA}#{isDisjointWith,getIntersectionWords,getIntersectionWordSets}` were removed.
- Removed `NodeList` API for all FA implements. This is a very significant change as to how FAs are implemented but doesn't affect the main FA APIs too much. This change gives users a lot more control over FA implements.
- Removed `{DFA,ENFA,NFA}.CreationOptions` interfaces. Use the new `NodeFactory` API instead.
- Removed `{DFA,ENFA,NFA}#options`. Just pass the FA as is instead.
- Removed `FACreationOptions` interface.
- `getIntersection{Iterator,Words,WordSets}`, `isDisjointWith`: Replaced optional `FACreationOptions` parameter with optional `maxNodes` parameter.
- DFA nodes can now only be linked using `CharSet`s. Linking with `Char`s and `CharRange`s is no longer supported.
- Removed `ENFA`'s `unorderedResolveEpsilon`. Use `resolveEpsilon` instead.
- `FAIterator.MapFABuilder`: Removed optional `kind` argument.

### Added

- `NodeFactory` interface. This new interface is the basis of all `FABuilder`s and FA implemented.
- `{DFA,ENFA,NFA}.nodeFactory`: This is an unlimited node factory.
- `{DFA,ENFA,NFA}.LimitedNodeFactory`: This node factory can be used to limit the number of nodes an FA operation is allowed to create.
- `CharSet#resize`
- `CharSet.fromRange`
- `FAIterator.fromWords` will create a new iterator from a list of words.
- `FAIterator.fromWordSets` will create a new iterator from a list of word sets.
- `{DFA,ENFA,NFA}.fromCharSet` will create new FAs from a given `CharSet`.
- `{DFA,ENFA,NFA}.fromWordSets` will create new FAs from a list of word sets.
- `{DFA,ENFA,NFA}#countNodes` will return the number of nodes in the FA.
- `{DFA,ENFA,NFA}#nodes` will iterate through all nodes in the FA.
- `ENFA.withoutEmptyWord`
- `ENFA#{append,prepend,union}Into` will move the nodes of the given ENFA instead of copying them. This can be used to improve performance.

### Changed

- `JS.toLiteral`: Setting `unicode: false` in the `flags` option will now always succeed.

### Improved

- `CharMap` is now implemented using a sorted array instead of an AVL tree. This is significantly faster. Most DFA operation are now 10% faster.
- `FAIterators.iterateWordSets` will now use the natural iteration order of the given FAIterator for words of the same length. This makes `ENFA#wordSets` a lot more logical.
- `ENFA`'s `resolveEpsilon` is now implemented non-recursively.
- The docs now have a dark mode thanks to TypeDoc v0.22.0.


## 0.9.1 (2021-07-26)

### Fixed

- Fixed that some ENFA operations created unnecessary states.
- Fixed internal functions used to traverse graphs. This fixes the bug that some `FAIterators` functions had trouble with falsy state values.

### Improved

- `JS.toLiteral`: The heuristic used to decide flags has been improved to prevent unnecessary `i` flags.


## 0.9.0 (2021-07-15)

### Breaking changes

- `FAIterators.intersection` no longer accepts options.
- Removed the `IntersectionOptions` interface. Use the new `FACreationOptions` interface or any of the FA-specific interfaces instead.
- Removed custom equality functions for `CharMap`.
- The constructor of `FAIterators.MapFABuilder` changed slightly. It now accepts arguments as parameters instead of as an object.
- Some renaming:
	- `FAIterator#deterministicOut` -> `FAIterator#stableOut`
	- `FAIterators.ensureDeterministicOut` -> `FAIterators.ensureStableOut`
	- `CharMap#{delete,set}Every` -> `CharMap#{delete,set}Range`

### Added

- Added support for the new JS RegExp [`hasIndices` flag](https://github.com/tc39/proposal-regexp-match-indices).
- New `WordSet` and `ReadonlyWordSet` types.
- New `CharBase` class. This provides methods to remap alphabets.
- Added `CharMap#clear`.
- Added `CharMap#filter`.
- Added `CharMap#invert` to convert `CharMap`s to `Map`s.
- Added `CharMap#setCharSet` to more efficiently set many ranges.
- Added `CharSet#characters` to iterate over all characters in a set.
- Added `CharSet#toRangesString` to print only the ranges of a set.
- Added `CharSet.fromCharacters` to create a set from a collection of characters.
- `FAIterators.shortestAcceptingPath` returns the shortest accepting path of arbitrary iterators.
- `FAIterators.shortestWordSet` returns the shortest accepted word set of an iterator.
- `FAIterators.makeInitialFinal` and `FAIterators.makeInitialNonFinal` changes whether the initial state is also a final state.
- `FAIterators.approximateRejectingWordSet` tries to find a rejected word set.
- `FAIterators.makeDeterministic` builds a deterministic version of an iterator. This is a general DFA construction.
- `Words.wordSetsToWords` converts a collections of word sets into a collection of words.

### Changed

- refa is now allowed to assume all given `Char`s and `CharRange`s conform to the guarantees given by the interface. This includes guarantees that cannot be verified at compile time (e.g. `min <= max` for `CharRange`).
- `Words.pickMostReadableWord` will now always return a word.
- `{DFA,ENFA,NFA}#{isDisjointWith,getIntersectionWords,getIntersectionWordSets}` are now deprecated and will be removed in future releases.
- `Words.wordSetToWords` is now deprecated. Use `Words.wordSetsToWords` instead (mind the s).

### Fixed

- `ReadonlyCharMap#isEmpty` is now a readonly property.
- Fixed `JS.Parser` incorrectly caching parsed characters.
- Fixed `JS.Parser` incorrectly canonicalizing Unicode property escapes.
- Fixed `DFA.NodeList#removeUnreachable` removing reachable states sometimes.

### Improved

- Many, many minor improvements (code quality, documentation, etc.).
- 10x faster `wordSetToWords`. All methods iterating words will now be faster.
- Pretty much all DFA operations will be faster. DFA minimization is up to 20x faster.
- Faster NFA creation.


## 0.8.0 (2021-04-29)

### Breaking changes

- New RE AST node: `Unknown`. This node is used to represent parts of a regex that cannot be represented using RE AST.
- Removed `JS.ParseOptions.disableOptimizations`. Use `JS.ParseOptions.simplify` instead.
- Removed `TransitionIterableFA` interface.
- `TransitionIterable` is now generic over the state type.
- Renamed `{DFA,NFA}.intersectionWordSets` to `getIntersectionWordSets`.
- Renamed `{DFA,NFA}.intersectionWords` to `getIntersectionWords`.

### Added

- ENFA - a non-deterministic finite automaton with epsilon transitions.
- FAIterators - a new namespace containing methods can consume and produce FA iterators.
- New `toDot` method for finite automata. This will make it easier to visualize the state machines.
- New `isDisjointWith`, `getIntersectionWordSets`, and `getIntersectionWords` functions. These free functions can be used with any FA types.
- New `JS.ParseOptions.simplify` option.
- New `FAIterator.deterministicOut` property.
- New `TransitionIterator`. (This only gives an already commonly used type a name.)
- New `MaxCharacterError` for incompatible finite automata.
- New `FABuilder` interface to allow algorithms to construct FA without knowing the actual FA implementation.
- `{DFA,ENFA,NFA}.NodeList`: Added static `withLimit` method to be able to limit the number of nodes a `NodeList` is allowed to create.

### Changed

- `JS.Parser.parseElement` now accepts more parsable elements.
- `JS.toLiteral` now accepts any RE AST node.
- `NFA.fromRegex` now accepts any RE AST node.
- `{DFA,ENFA,NFA}.NodeList` now implement the `FABuilder` interface.
- Many, many internal changes that do not affect the API.

### Fixed

- `DFA.fromIntersection` now correctly computes the intersection for non-DFA arguments.
- `getBaseSets` (a util function) now guarantees _O(n*log n)_ run time. I accidentally implemented this in _O(n^2)_ before which caused some DFA operations to be extremely slow.
- `iterateWordSets` (a util function) now correctly eliminates dead states. This fixes the bug that some FA with infinite languages only yielded finitely many words when iterating over them.


## 0.7.1 (2021-03-09)

### Fixed

- Backreferences in ignore-case JS RegExps are now correctly resolved ([#25](https://github.com/RunDevelopment/refa/issues/25)).


## 0.7.0 (2021-02-25)

### Breaking changes

- `FiniteAutomaton.test` now requires a `ReadonlyArray` instead of an `Iterable`.
- `Words.wordSetToWords` now returns an `Iterable` instead of an `IterableIterator`.
- Removed `toPatternString` function.
- Removed `NFA.FromRegexOptions.disableLookarounds`. Use `NFA.FromRegexOptions.assertions` instead.
- AST format: Quantifier nodes now have a lazy property to enable non-greedy quantifiers.
- `JS.Parser` no longer implements `JS.Literal`. Use the `JS.Parser.literal` property instead.
- `JS.Parser` now resolves backreferences differently. It now supports resolving capturing groups with finite small languages. How small the language is required to be can be controlled via the new `JS.ParseOptions.maxBackreferenceWords` option (defaults to 100 words). `JS.ParseOptions.backreferences` also works differently now. See the `JS.ParseOptions` documentation for more details.
- Some renaming:
	- `JS.ParseOptions.lookarounds` -> `JS.ParseOptions.assertions`
	- `ToRegexOptions.maximumNodes` -> `ToRegexOptions.maxNodes`
	- `ToRegexOptions.maximumOptimizationPasses` -> `ToRegexOptions.maxOptimizationPasses`

### Fixed

- `Words.fromStringToUTF16` now works properly.
- `JS.toLiteral` will now properly detect predefined character sets in character classes. This didn't work properly before.

### Added

- Documentation. A lot of code documentation and a TypeDoc-generated website have been added.
- New `Char`, `Word`, and `ReadonlyWord` types replace the old plain number and iterable types.
- AST transformers. They can efficiently modify a given AST and are used to e.g. apply assertions.
- `JS.ParseOptions` now has a `maxNodes` option to limit the size of the parsed AST.
- `JS.Parser` now has a `maxCharacter` property.

### Changed

- `NFA.test` now implements [Thompson's algorithm](https://swtch.com/~rsc/regexp/regexp1.html) which guarantees efficient execution.
- The `toRegex` methods of the DFA and NFA classes now use AST transformers under the hood to produce smaller ASTs.
- The default value of `ToRegexOptions.maxOptimizationPasses` is now implementation-defined.


## 0.6.0 (2020-12-22)

### Breaking changes

- `DFA#clone` has been renamed to `DFA#copy` to be compatible with `NFA#copy`.
- The `source` property of RE AST nodes is now optional. This results in the removal/change of several types and functions. The `Simple` type has been removed; use `NoParent` instead.

### Added

- `JS.toLiteral` now has a `flags` options to force/disallow certain flags and a `fastCharacters` options for up to 10x better performance.
- `JS.toLiteral` now detects builtin assertions.

### Changed

- All DFA and NFA creation methods now have safe defaults and will throw if the FA that is being created is too large. The limit can be controlled using the `maxNodes` option.


## 0.5.0 (2020-10-26)

### Breaking changes

- Remove `NFA.fromDFA` and `DFA.fromNFA`. Use `{DFA,NFA}.fromFA` instead.
- Renamed `NFA#removeEmptyWord` to `NFA#withoutEmptyWord`.
- All `NFA`/`DFA`-specific interfaces/classes now live in the `NFA`/`DFA` namespace.

### Added

- New `FAIterator` interface.
- New options for `#toRegex` functions.
- `NFA#reverse` will reverse the accepted language.
- `CharSet#commonCharacter` can used to return any character two sets have in common.
- New `Words` methods to pick as-readable-as-possible words or characters from a set of words or characters.

### Changed

- Unified `DFA`/`NFA` API. This gives `DFA` a lot of functionality that used to be `NFA`-exclusive.
- `JS.toLiteral` will now print smaller character classes.
- New build system.

### Fixed

- A few minor bug fixes.


## 0.4.1 (2020-08-29)

### Changed

- NFA intersection performance optimizations by using lazy data structures. `NFA#disjointWith` is now a lot faster.

### Fixed

- Fixed NFA intersection always discarding the empty word. The intersection can now contain the empty word.


## 0.4.0 (2020-08-23)

### Breaking changes

- Removed `JS.toSource`. Use `JS.toLiteral` instead.

### Added

- `NFA#suffixes()` will change the NFA to accepts all suffixes of its language.
- New options for intersection operations.
- Added a method to count the number of nodes in DFA and NFA.
- `DFA#complement()` will make the DFA match the opposite language.
- New options for the DFA creation operation.
- New `ReadonlyDFA` interface.
- New `ReadonlyCharMap<T>` interface.
- `CharSet#compare(CharSet)` will compare two character sets. This can be used to sort character sets.
- Added regex stress test. This will check common operations on all 2.5K regexes of the PrismJS syntax highlighter.

### Changed

- The RE produced by the `toRegex` functions is now optimized to be as minimal as possible.
- `JS.toLiteral` will now make efficient use of flags to produce smaller literals.

### Fixed

- Fixed and improved `DFA.minimize()`.
- Fixed `CharMap`'s AVL tree implementation.
- Underlying implementation of the `toRegex` functions will now the correct AST and that much faster.
- Fixed `filterMut` in util.
- `toPatternString` now correctly handles quantified empty concatenations.


## 0.3.1 (2020-08-09)

### Fixed

- The prefix and suffix optimization removed final states from the graph but not from the set of final states.
- The intersection algorithm can now handle final states not reachable from the initial states of either NFAs.


## 0.3.0 (2020-07-11)

### Breaking changes

- New `JS.Parser` API.
- Removed `MutSimple` interface.

### Added

- `CharSet#size` returns the number of characters in the set.
- `NFA#prefixes()` will change the NFA such that it accepts all prefixes of itself.
- New `ReadonlyNFA` interface.
- New `FAIterator` interface as an abstraction over different FA representations. This is now the basis for virtually all FA operations that don't change the underlying data structure.
- New `NoParent` and `NoSource` interface for AST nodes.

### Changed

- Better `Flags` interface for JS functions.
- Some minor improvements.

### Fixed

- The prefix and suffix optimizations of the NFA construction didn't check the equivalence of states correctly.


## 0.2.2 (2020-05-04)

### Fixed

- Added a `prepublish` script to actually publish changes.


## 0.2.1 (2020-05-04)

### Fixed

- Calling `CharSet#isSubsetOf` caused a stack overflow because of infinite recursion.


## 0.2.0 (2020-05-03)

### Breaking changes

- New `CharSet` API. This renames some of `has*` methods, to instead use names based on set relations.
- `NFA#concat` is now called `append`.
- `NodeList#final` is now called `finals` for both DFA and NFA nodes lists.
- `NFANode#in` and `NFANode#out` are now of type `ReadonlyMap` instead of `Map`.

### Added

- New options for `NFA.fromRegex` to disable assertions instead of throwing an error and to simplify quantifiers with a huge maximum.
- New `NFA#prepend` method.
- Added changelog.

### Changed

- `CharSet#toString` now uses a simple hexadecimal format.

### Fixed

- `NFA#append` modified the given NFA.


## 0.1.1 (2020-04-05)

### Fixed

- Fixed repository link in `package.json`.


## 0.1.0 (2020-04-05)

Initial release
