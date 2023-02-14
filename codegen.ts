import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.REACT_APP_SERVER,
  documents: ['src/graphql/**/*.ts'],
  ignoreNoDocuments: true,
  overwrite: true,
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        skipTypename: true,
      },
    },
  },
};

export default config;
