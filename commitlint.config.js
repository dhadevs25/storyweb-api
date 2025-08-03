module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type validation - REQUIRED
    'type-enum': [
      2, // Error level
      'always',
      [
        'feat',     // A new feature
        'fix',      // A bug fix
        'docs',     // Documentation only changes
        'style',    // Changes that do not affect the meaning of the code
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf',     // A code change that improves performance
        'test',     // Adding missing tests or correcting existing tests
        'build',    // Changes that affect the build system or external dependencies
        'ci',       // Changes to our CI configuration files and scripts
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Reverts a previous commit
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    
    // Scope validation
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [1, 'never'], // Warning - scope is recommended
    
    // Subject validation - STRICT
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-min-length': [2, 'always', 10], // Minimum 10 characters
    'subject-max-length': [2, 'always', 60], // Maximum 60 characters
    
    // Header validation
    'header-max-length': [2, 'always', 80], // Total header max 80 chars
    
    // Body validation
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    // Footer validation
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100]
  }
};
