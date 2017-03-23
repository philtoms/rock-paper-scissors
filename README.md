# Rock Paper Scissors

A version of the game in which the user is pitted against a very spry computer.

### Commands

- S = start a new game
- D = run a demo (computer against computer)
- R = show the rules (yes rules - we all need boundaries!)

## Playing the game

After starting a new game, wait for the count down and STRIKE!!

- B = rock
- N = paper
- M = scissors

Yes unusual key mappings, but when you play you will understand :)

After the count down the play lasts about 1 1/2 seconds. You need to strike within that time.

But the computer is foxy. It's going to play a waiting game. If it holds its nerve and 'sees' your strike before the timeout, its going to win!!

There is nothing stopping you playing the same strategy. If you have nerves of steel and whiplash reactions you can beat that computer every time! That at least explains key mappings :)

### Design rationale

- state driven (redux reducer pattern)
- modularised - eg game engine broken down into extensible components
- model / view separation

### Install

```
$ yarn install
```

from the project folder.

### Helpful commands

You'll have the following CLI commands available:

- `yarn run dev` running `webpack-dev-server` and serving the project on `localhost`
- `yarn run test -- --browsers Chrome,Safari` running unit tests via `karma` e.g. in Chrome and Safari
- `yarn run lint` running `eslint` against your source (and config) files
- `yarn run build` running `webpack` build
- `yarn run serve` serving the `build/` folder contents
