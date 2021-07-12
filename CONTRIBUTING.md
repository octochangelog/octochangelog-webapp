# Contributing

Thank you for wanting to help us!
Read this document for information on how to get started.

## General overview of project

We use [Next.js](https://nextjs.org/) to generate the static website.
All our website styling is done with the [Chakra UI](https://chakra-ui.com/) framework.

## What you'll need to know to be able to help

You'll need a basic understanding of HTML/CSS to be able to help with the code.
It's even better if you know a bit of React and the basics of TypeScript.

## Software requirements

- Git
- Latest version of Node.js 14
- Yarn v1 package manager

This guide assumes you'll run the code on your workstation directly.

### Where to get Git

The [git-scm.com](https://git-scm.com/) site has links to download Git for your operating system.

### Where to get Node.js

If you use Linux, use your operating system's package manager (`dnf`, `apt` or similar) to install the latest version of Node 14.
If you use Ubuntu, you can also get a snap of the Node 14 program.

If you use Windows or macOS, you can grab binaries from the [Node.js offical website](https://nodejs.org/).

### Where to get Yarn

Once you have Node 14 installed, you can install Yarn v1 with node's `npm` package manager:

```bash
$ npm install -g yarn
```

## Make a fork

Use the GitHub web interface to create your own fork of the Octoclairvoyant repository.

Do not put your own work on your forks `main` branch.
Create a new feature branch for each bit of work!

## Installing development dependencies

We use Yarn v1 to manage our dependencies.
Run the `yarn` command in your own Octoclairvoyant directory to install all dependencies:

```bash
$ yarn
```

## Development process

You're ready to start work now.
We recommend you follow this process:

1. Create a feature branch
1. Start the development server with `yarn start`
1. Make improvements
1. Put chunks of work in a commit (the Husky program will run some checks)
1. Run `yarn smoketest` to confirm you're not breaking anything critical
1. Create pull request

## Query string to check comparator output

Use the following query string to check the comparator output:

```
?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0
```

## Working on dark mode locally

We've hidden the color mode behind a feature flag called `NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE`.
This way we can work on the dark mode without publishing the feature.

Do the following to get a ugly button to toggle between light/dark mode:

1. Create a file named `.env.local` in the root of the project (this file is on the `.gitignore` list so it won't be committed accidentally)
1. Put `NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE=true` inside the `.env.local` file.
1. Stop the development server, and run `yarn start` to restart the server
1. You can now use the button in the header to switch between light/dark mode
