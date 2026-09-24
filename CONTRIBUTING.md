# Contributing

Start with the [README](README.md#quick-start) to run the app. Demo mode works without API keys and is the easiest way to work on the interface.

## Make a change

1. Fork the repository and create a branch for your change.
2. Keep the change focused on one bug or improvement.
3. Run `npm run lint` and `npm run build`.
4. Check the affected flow in the browser. For visual changes, include a before-and-after screenshot using demo data.
5. Open a pull request explaining the problem, what changed, and how you checked it.

Read [AGENTS.md](AGENTS.md) before changing application code. This project uses a recent Next.js version; its installed documentation is in `node_modules/next/dist/docs/`.

## Report a bug

[Open an issue](https://github.com/micro-so/granola-ui/issues) with steps to reproduce, what you expected, and what happened. Include your Node.js version and whether you used demo or live data. Screenshots help when something looks wrong.

Keep API keys, `.env.local`, private contacts, notes, and local fixture files out of issues, screenshots, and pull requests. Replace account details with sample values when sharing errors.

## Update the README screenshot

The preview lives at `docs/images/home.jpg`. Capture the Home page using **Demo data**, with no dialogs or development overlays visible. Keep the screenshot free of live workspace data and update its alt text if the view changes.
