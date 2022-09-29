# GetLab
In this project we have created a web application that presents information about a Gitlab repository. Selected data is retrieved from the [Gitlab REST API](https://docs.gitlab.com/ee/api/) based on the Gitlab project ID and access token. 

### Get Gitlab project ID:
- Go to the "Project overview" page
- The project ID can be copied from under the title of the project.

### Get Gitlab access token:
- Go into your project in GitLab
- Go to "Settings" --> "Access Tokens"
- Choose a name, expiry-date and scopes
- Click "Create project access token"

# 👩‍💻Setup and development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project

In the project directory, you can run:

`npm start` to install dependencies and run the project in development mode
`npm test` to run the test runner interactively
`npm run build` to build the app for production to the `build` folder

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project requirements

### Gitlab data

## 🧪Testing

### Jest

### UI and responsiveness


## 🚀Git guidelines

All tasks should be documented in a issue. When picking a issue it should have its own branch. We have disabled pushing to main branch, the only way to add code is to use merge requests. When merging to main branch, the commits should be squashed.

### Semantic Commit Messages

We are using a simple version of the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Format: `<type>: <subject>`

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html

