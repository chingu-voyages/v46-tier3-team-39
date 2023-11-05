import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema.graphql",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
    // "./src/__generated__/": {
    //   preset: "client",
    //   plugins: [],
    //   presetConfig: {
    //     gqlTagName: "gql",
    //   },
    // },
  },
  // ignoreNoDocuments: true,
};

export default config;
