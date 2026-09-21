# Frontend React Developer Coding Challenge

## Introduction

Thank you for taking the time to complete our technical challenge.

We’re interested in how you approach problems, structure your solution, and make sensible engineering decisions. Where requirements are intentionally unspecified, use your judgement.

You’re welcome to go beyond the requirements if you feel an addition meaningfully improves the application or demonstrates your skills. Anything you add will be considered as part of your submission.

### JavaScript or TypeScript

You may use either **JavaScript or TypeScript**. There is no preferred choice, and this will not affect how your submission is evaluated.

Choose whichever allows you to best demonstrate your frontend development skills.

### Use of AI

We use AI-assisted development tools in our day-to-day work. For this challenge, however, we want to evaluate **your own coding ability directly**.

You may use AI tools for supporting activities such as:

- Reviewing code you have written
- Explaining concepts or APIs
- Discussing possible approaches
- Helping you understand unfamiliar technologies
- Identifying potential issues in your solution
- Improving comments or documentation

Please **do not use AI to generate or write the implementation for you**, including individual components, functions, substantial code snippets, or the application as a whole.

For example, if Canvas is unfamiliar to you, using AI to explain the API or discuss possible approaches is fine. Asking it to implement the chart is not.

## The Challenge

Build a React application that displays a chart using data retrieved from the provided API.

The visual design and layout are up to you. We’ll consider both the quality of the implementation and how effectively the design supports usability.

### Key Requirements

- **two pages**:

- `/chart` – Displays your chart as described below.
- `/settings` – Contains application-wide settings. Choose settings that you feel are meaningful, such as theme or language.
- Use `react-router` for routing.
- Use `redux` for essential application state that needs to be accessible globally.
- Include at least **one custom data hook**.
- Add **JSDoc documentation** to components or functions where useful.
- Use either **JavaScript or TypeScript**.
- Do **not** modify the `dependencies` or `devDependencies` in `package.json`.
- Follow the provided **Prettier** and **ESLint** configuration.

### Chart Requirements

The chart must be rendered using a **canvas**.

The API returns an array of lines. Each line contains:

- a name
- a colour
- a collection of data points in the form `[x, y]`

At minimum, your chart should display a line graph connecting the supplied data points.

How you structure and render the chart is up to you. Axes, labels, scaling, legends, responsiveness, and interactivity are optional, but feel free to add them if they improve the solution or demonstrate your skills.

### Additional Notes

The provided API returns a fixed dataset, but we will also test your chart with a different endpoint containing the same data structure and different values. Avoid making assumptions specific to the supplied dataset.

We’ll consider the quality, readability, maintainability, and structure of your code, as well as whether the application works as expected.

### Your notes

We strongly encourage you to keep a simple text or Markdown document containing notes about your work. This is optional, but valuable when reviewing submissions.

You might include:

- Decisions you made and why
- Approaches you considered and rejected
- Things you changed or removed
- Problems or unfamiliar areas you encountered
- Bugs and how you investigated them
- Trade-offs you made due to time or complexity
- What you would improve with more time
- Where documentation, AI, or other resources helped you

This doesn’t need to be polished or lengthy. A running log or short list (a simple .txt or .md file) of observations is enough. We’re interested in your thought process, not the presentation.

## Resources

- API: `https://brainx.sk/api/chart-data` — supports the **GET** method.
