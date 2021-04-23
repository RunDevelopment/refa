export const CONFIG_UPDATE: boolean = process.argv.indexOf("--update") >= 0;

export const CONFIG_RUN_TRANSFORMERS: boolean = process.argv.indexOf("--run-transformers") >= 0;

export const CONFIG_RUN_STRESS_TEST: boolean = process.argv.indexOf("--run-stress-test") >= 0;
