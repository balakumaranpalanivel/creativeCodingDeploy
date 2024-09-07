const path = require('path');

module.exports = {
  entry: './sketch-03.js', // Your main JavaScript file (entry point)
  output: {
    filename: 'bundle.js', // The name of the output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // Use 'production' when you're ready to deploy
};
