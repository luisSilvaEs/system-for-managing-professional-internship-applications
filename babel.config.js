module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }], // Enable automatic JSX runtime
      '@babel/preset-typescript',
    ],
  };
  