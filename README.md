# GetLab

GetLab is a web application that presents information about a GitLab repository. The presented data is retrieved from the [GitLab REST API](https://docs.GitLab.com/ee/api/), based on the GitLab project ID and access token. The application only supports repositories using the https://gitlab.stud.idi.ntnu.no domain.

### Get GitLab project ID

- Go to the "Project Overview" page
- The project ID can be copied from under the title of the project

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
- `npm test` to install dependencies run the test runner interactively
- `npm run build` to build the app for production to the `build` folder
- `npx prettier --write .` to run prettier formatting checks

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ☑️Requirements

### Presenting GitLab data

GetLab presents GitLab data for issues and commits for the chosen project. For commits, the user parametizing consists of filtering commits based on the author and a chosen time frame. There is also implemented a chart that displays how many commits each member has contributed to the `main` branch in the project. The chart is created with the vertical bar chart from [react-chartjs-2](https://react-chartjs-2.js.org/examples/vertical-bar-chart/). The chart displays bars based on email, such that group members that have syncronized GitLab to GitHub may appear with two separate bars.

For issues, the user can filter based on selected labels and author. For a while we had pagination, but we had some problems with it so we decided to remove it. One of the problems we met was that GitLab didn't have a endpoint to get how many commit pages / items there was in total, so therefor no way to calculate how many pages it should be. The first solution was to just get all commits, and then calculate the amount of pages. But because we then already are fetching all commits, we will not save any data trafic on using pagination. That is why we dropped it.

### React with TypeScript

The application is implemented in React with TypeScript. All components are React functional components, except for Button.tsx which is a class component. We have used the formatting tool Prettier to ensure a common coding style in the project.

### Context API

The context API is used to store the projectId and accessToken after the user connects. This helps us avoid prop-drilling. All components / pages can easly access to context and read the credentials.

We have used the React component library [Mantine](https://mantine.dev) to create some of the components for the applicatoin, such as the pagination, datepicker and dropdown menus.

### Fetching GitLab data

Data from the GitLab API is fetched with AJAX (Asynchronous JavaScript). The API requests fetch data for branches, commits, issues and members in the GitLab project with following methods:

- `getBranches` returns all branches for the given project
- `getAllCommits` returns all commits for the given project
- `getCommitsByBranch` returns all commits for a given branch in the project
- `getIssues` returns all issues for the given project
- `getIssuesByLabel` returns the issues with a set of given labels
- `getLabels` returns a list of all labels for the given project
- `getActiveMembers` returns a list of all project members that have at least one commit or have created one issue

### HTML Web Storage

Session storage is used to store information about a user's choice from the dropdown menu, so that the user stays on that page if the page is refreshed, or if the user navigates to another page and then back to the main page.

### Local Storage

Local storage is used to easly connect to the last used GitLab instance. When the user enters the site, we check if the credentials are stored in local storage, and if they are, we provide a button to use tem.

### UI and responsiveness

For screens smaller than 500px in width, the website will decrease the font-size and size of GetLab logo. This is implemented using media-queries. We have used vw (view width) for the commit/issue cards and chart to make the component scale according to screen size. If the labels of an issue card are wider than the card itself, the labels can be scrolled horizontally.

## 🧪Testing

### Jest

We have used the testing framework Jest for some unit tests, using its built-in functions. One of the tests that were performed is to check whether the app crashes on render, by testing the `App` component. The utility function `getCommitsPerAuthor` has also been tested, which is used to display the data in the bar chart. In addition, we have tested filtering of commits, by testing the ´validDate´ function, which displays correct commits between the selected start date and end date in the DatePicker. Snapshot tests are useful when wanting to make sure that the UI does not change unexpectedly. The tests generate a json version of a component, to check if this matches an earlier representation. We created snapshot tests for the `CommitCard` and `IssueCard` components with use of the react-test-renderer, to ensure that they rendered as expected with data.

### UI and responsiveness

The application has been tested on a computer screen, iPad and iPhone XR both horizontally and vertically oriented (see appendix). For each of the screen sizes, all pages and components were tested thoroughly through user interaction. Using Chrome developers tools, the application was ensured perform well when dynamically changing the screen size, as long as the screen width is bigger than 280px. The application was tested in both Chrome and Safari.

## 🚀Git guidelines

All development tasks are documented in a issue with appropriate labels. After assigning yourself to an issue, the issue should be solved in its own branch. We have disabled pushing to main branch, such that the only way to add code is though merge requests. When merging with main branch, the commits should be squashed.

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

## Appendix

### Screen recodings UI testing

#### Computer
![computer](vlc_imcqTPPC9s.gif)

#### Iphone vertical
![iPhone-vertical](/uploads/18284410be138e322dc1feb557ca4080/iPhone-vertical.mov)

#### Iphone horizontal
![computer](/uploads/224990d7262e8c3477e02aa433809947/computer.mov)

