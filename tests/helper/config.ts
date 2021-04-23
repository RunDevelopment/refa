export const CONFIG_UPDATE: boolean = process.argv.indexOf("--update") >= 0;

export const CONFIG_RUN_TRANSFORMERS: boolean = process.argv.indexOf("--run-transformers") >= 0;

export const CONFIG_RUN_STRESS_TEST: boolean = process.argv.indexOf("--run-stress-test") >= 0;

/**
 * Setting this to `true` will cause each regex to be parsed with all possible (interesting) parse options.
 *
 * Since there are quite a number of combinations, the test will then take minutes. Only enable this if you want to
 * verify that the parser behaves correctly.
 */
export const CONFIG_ALL_PARSE_OPTIONS: boolean = process.argv.indexOf("--all-parse-options") >= 0;
