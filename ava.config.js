export default {
  environmentVariables: {
    TS_NODE_COMPILER: "ttypescript"
  },
  extensions: {
    ts: "module"
  },
  nonSemVerExperiments: {
    configurableModuleFormat: true
  },
  nodeArguments: [
    "--loader=ts-node/esm/transpile-only"
  ],
  files: [
    "src/**/*.test.ts"
  ]
}
