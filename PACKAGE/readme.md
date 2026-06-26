## Installation

Install compo-ui-lib using npm:

```bash
npm install compo-ui-lib
```

---

## Requirements

- React 18 or higher
- React is a peer dependency and must be installed in your project

---

## Getting Started

Import components directly from the package.

Currently available components:

- `LoadingSpinner`
- `ButtonDemo`

---

## LoadingSpinner

A lightweight animated spinner designed for loading states.

### Example

```jsx
import { LoadingSpinner } from "compo-ui-lib";

function App() {
  return (
    <div>
      <p>Please wait...</p>
      <LoadingSpinner size="md" />
    </div>
  );
}

export default App;
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `"sm" | "md" | "lg"` | `"md"` | Controls the spinner size |

---

## ButtonDemo

A demonstration component that showcases different button styles, variants, sizes, and states.

### Example

```jsx
import { ButtonDemo } from "compo-ui-lib";

function Demo() {
  return (
    <div>
      <ButtonDemo />
    </div>
  );
}

export default Demo;
```

---

## Features

### Performance Optimized

Components such as `LoadingSpinner` use `React.memo` to minimize unnecessary re-renders.

### Accessibility First

Designed with accessibility best practices to provide an inclusive user experience.

---

## Exported Components

```jsx
import {
  LoadingSpinner,
  ButtonDemo
} from "compo-ui-lib";
```

---

## License

MIT License