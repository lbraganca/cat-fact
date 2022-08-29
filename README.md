# cat-fact

Simple `react` APP based on the `create-react-app` stack that displays cat facts. Implemented in order to test `PWA` technologies.

## Demo

[Check here](https://symphonious-kringle-b91fd3.netlify.app)

## Install

```
git clone git@github.com:lbraganca/cat-fact.git
npm i
```

## Development

```
npm start
```
> **Note:** Service worker won't install on production, you can either change the `src\serviceWorkerRegistration.js` to force it (you'll need to discard the caches after every page refresh) or build it and serve it (for instance with `serve` package, `serve -s build`).

## Production

```
npm run build
```
