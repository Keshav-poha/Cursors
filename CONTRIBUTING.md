# Contributing to `lite-cursor-effects`

We welcome contributions to make `lite-cursor-effects` even better! Since this is an open-source project, any help is appreciated. 

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-effect`)
3. Make your changes in the `src/` directory
4. Run the showcase locally to test (`cd showcase && npm install && npm run dev`)
5. Commit your changes (`git commit -m 'feat: Add amazing new effect'`)
6. Push to the branch (`git push origin feature/amazing-effect`)
7. Open a Pull Request

## Developing Locally

The project consists of the library (`src/`) and the documentation showcase (`showcase/`).
To start making changes:

1. Clone the repository
2. Run `npm install` in the root folder to install library dependencies.
3. Run `npm run dev` in the root folder to watch library changes (Microbundle).
4. In a separate terminal, navigate to the showcase: `cd showcase`
5. Run `npm install` and then `npm run dev` to start the Vite preview server.

Any changes made in `src/` will automatically trigger a rebuild, and the Vite server will hot-reload to display them.

Thank you for contributing!
