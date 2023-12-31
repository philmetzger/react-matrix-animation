# React Matrix Animation

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWo3NW94eDljaDUxaWlzN3F1ZzNremNiZ2Z2bzIweXJ4eW5mamdtdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g1401wFmbiuvhpRB1x/giphy.gif)

Inspired by Christian Behler's post [How to Create the Matrix Text Effect With JavaScript](https://betterprogramming.pub/how-to-create-the-matrix-text-effect-with-javascript-325c6bb7d96e).

## Install

You can install this module as a component from NPM:

```bash
yarn add react-matrix-animation
npm install react-matrix-animation
```

## Usage

```javascript
import { ReactMatrixAnimation } from 'react-matrix-animation';

export default async function Page() {
  return (
    <div className="m-auto flex h-screen w-screen items-center justify-center">
      <ReactMatrixAnimation />
    </div>
  );
}
```

### Options & Defaults

```javascript
// Size of the character elements. Number value.
tileSize = 20

// A higher fade factor will make the characters fade quicker. Number value.
fadeFactor = 0.05

// Background color. Hex value.
backgroundColor = '#030303'

// Font color. Hex value.
fontColor = '#008529'

// the values for the falling tiles. Array of strings. e.g. ["0", "1"]
tileSet = null
```

## Contribution

I appreciate any contributions to this repo! Feel free to get in touch with me [here](https://twitter.com/strange_quirks).
