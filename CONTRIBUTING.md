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
- pnpm package manager (version specified in "engines" property within `package.json`)
- Latest version of Node.js 16 (optional)

This guide assumes you'll run the code on your workstation directly.

### Where to get Git

The [git-scm.com](https://git-scm.com/) site has links to download Git for your operating system.

### Where to get pnpm

In case you didn't get pnpm setup in your environment, [there are different ways of installing/updating it](https://pnpm.io/installation).

### Where to get Node.js (optional)

You can install Node.js through a [Node.js version manager](https://docs.npmjs.com/cli/v7/configuring-npm/install#using-a-node-version-manager-to-install-nodejs-and-npm).
However, [pnpm can manage the Node.js version automatically for you](https://pnpm.io/blog/2021/12/29/yearly-update#managing-nodejs-versions-since-v6120), so you can run it even with no Node.js preinstalled on the system.

## Make a fork

Use the GitHub web interface to create your own fork of the Octoclairvoyant repository.

Do not put your own work on your forks `main` branch.
Create a new feature branch for each bit of work!

## Installing development dependencies

We use Yarn v1 to manage our dependencies.
Run the `pnpm install` command in your own Octoclairvoyant directory to install all dependencies:

```bash
$ pnpm install
```

## Development process

You're ready to start work now.
We recommend you follow this process:

1. Create a feature branch
1. Start the development server with `pnpm start`
1. Make improvements
1. Put chunks of work in a commit (the Husky program will run some checks)
1. Write/adjust tests to check the functionality of the new code
1. Run `pnpm run e2e` to confirm you're not breaking anything critical
1. Run `pnpm run smoketest` to confirm other code validations are still fine
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
1. Stop the development server, and run `pnpm start` to restart the server
1. You can now use the button in the header to switch between light/dark mode

### Setting colors for light/dark mode

You only need to pass 2 values to `useColorModeValue`:

- the first one is the variant for light mode
- the second one is the variant for dark mode

Save the values in a `const` that will _automagically_ get the corresponding value based on the current color mode.
You can use this `const` anywhere, but most of the time it will be passed to a Chakra component prop.

You can use `useColorModeValue` as many times you need/want inside a component to generate several variables based on color mode.

### Example in code

Here's an example of how to colorize a component.

1. Create/edit a `const` that contains the colors.
1. Ue the `const` within a Chakra property.

```typescript
const Footer = () => {
	const boxBgColor = useColorModeValue('gray.50', 'gray.900')

	return (
		<Box as="footer" bg={boxBgColor}>
			<Container></Container>
		</Box>
	)
}

export default Footer
```

### Running E2E

Our E2E tests are implemented with Cypress.

For now, they always perform real requests to GitHub API.
If you want to add an access token to extend the API rate limit, follow these steps:

1. [Create a personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
2. Create a file named `cypress.env.json` in the root of the project (this file is on the `.gitignore` list, so it won't be committed accidentally)
3. Create a key-value pair `GITHUB_TESTING_ACCESS_TOKEN` and copy/paste the personal access token into it, like this:

```json
{
	"GITHUB_TESTING_ACCESS_TOKEN": "token-created-in-step-1"
}
```
