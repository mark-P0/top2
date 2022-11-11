# Transitions

> I did not realize `transition` was a shorthand!

## Properties

### `transition-property`

- What CSS property will be transitioned

### `transition-duration`

- How long will the transition occur
- The duration over which the transition will happen

### `transition-timing-function`

- How will the transition happen
- What kind of transition will take place
- Affects behavior, appearance of transition

### `transition-delay`

- How long until the transition starts
- A buffer period before the beginning of the transition

### `transition` shorthand

```css
selector {
  transition: <property> <duration> <function> <delay>;
}
```

- Multiple transitions on different properties can be done
  - Each transition must follow the shorthand order above

```css
selector {
  transition: <transition1>, <transition2>, <transition3>;
}
```

## Performance

### Stacking context

- Transitions create a stacking context
- Other properties that create a stacking context include `z-index`
- These properties are resolved within the elements themselves
- Repainted elements lower in the stack also repaint all those above it
  - Rendering pipeline
  - JS → CSS → Layout → Paint → Composite

### Animate only `opacity` and `transform`

- For best performance

### Debug with _Paint Flashing_

- `Renderer` tab in the Chrome DevTools
  - Might not be shown by default
- https://web.dev/simplify-paint-complexity-and-reduce-paint-areas/

## Knowledge Check

- Are all CSS properties animatable?
  - No
  - But a good chunk of them are
- What are the long and short-hand notations for transitions?
  - `transition-property`
  - `transition-duration`
  - `transition-timing-function`
  - `transition-delay`
  - `transition: <property> <duration> <function> <delay>`
- What is the stacking context?
  - A pseudo-3D space in a webpage wherein elements can be made to stack on top of one another
- Why do you need to keep an eye on repaints?
  - Because, on the rendering pipeline, the _Painting_ step is typically the more expensive one
  - It is best to keep animations on the _Compositing_ step
    - Last step, after _Painting_
  - It is second best to keep repaints to the affected element only
    - Lift it up in the stacking context
      - Repainting an element lower in the stack also repaints those above it
      - If it is the topmost, no other element should be repainted
    - Create an entirely new stacking context for it (layer)
      - Fairly expensive
      - Cannot have too many layers
