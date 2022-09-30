# GetLab
GetLab is a web application that presents information about a GitLab repository. The selected data is retrieved from the [GitLab REST API](https://docs.GitLab.com/ee/api/) based on the GitLab project ID and access token. 

### Get GitLab project ID
- Go to the "Project Overview" page
- The project ID can be copied from under the title of the project.

### Get GitLab access token
- Go into your project in GitLab
- Go to "Settings" --> "Access Tokens"
- Choose a name, expiry-date and scopes
- Click "Create project access token"

## 💻Project setup 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Running the project

In the project directory, you can run:

- `npm start` to install dependencies and run the project in development mode
- `npm test` to run the test runner interactively
- `npm run build` to build the app for production to the `build` folder
- `npx prettier --write ` to run prettier formatting checks

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ☑️Requirements

### Presenting GitLab data
The application presents GitLab data for issues and commits for the chosen project.
User parametizing for commits consists of filtering based on the author of an issue and selected labels. 
For commits, the user can filter commits by branch and a chosen time frame. 

There is also implemented a chart that displays the number of commits that each user has commited in the project. The chart is created with the vertical bar chart from [react-chartjs-2](https://react-chartjs-2.js.org/examples/vertical-bar-chart/). 

### React with TypeScript
The application is implemented in React with TypeScript. 
All components are React functional components, except for Button.tsx which is a class component. 
I think Ole has used the Context API. 
We have used the formatting tool Prettier to ensure a common coding style in the project. 

### Fetching GitLab data
Data from the GitLab API is fetched with AJAX (Asynchronous JavaScript)

### HTML Web Storage
Localstorage and sessionstorage.

### UI and responsiveness
For screens with a width smaller than 500px, the website will decrease the font-size and size of GetLab logo. Used media-queries to achieve this. Vw and vh? The application does not support devices with a screen size smaller than 200px, as this is very unusual. If the labels of an issue cards are wider than the card itself, these can be scrolled horizontally. 

We have used the React component library [Mantine](https://mantine.dev) to create some of the components for the applicatoin, such as the pagination, datepicker and dropdown menus. 


## 🧪Testing

### Jest

### UI and responsiveness


## 🚀Git guidelines 

All tasks should be documented in a issue. When picking a issue it should have its own branch. We have disabled pushing to main branch, the only way to add code is to use merge requests. When merging to main branch, the commits should be squashed.

### Semantic Commit Messages

We have used a simple version of the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

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

