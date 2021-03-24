export default {
  extensions: {
    ts: "module"
  },
  nonSemVerExperiments: {
    configurableModuleFormat: true
  },
  nodeArguments: [
    "--experimental-modules",
    "--loader=ts-node/esm/transpile-only"
  ],
  files: [
    "src/**/*.test.ts",
  ]
}
