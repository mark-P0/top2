# Keyframes

> i.e. proper **animations**

## vs. Transitions

- Purpose
  - Transition: To move from one state to another
  - Animation: To loop; repeated "transitions"
- Trigger
  - Transition: Needs a trigger, e.g. class change
  - Animation: No need for trigger; will animate indefinitely

## Properties

### `animation-duration`

- How long is an animation cycle

### `animation-name`

- What is the animation called
- A reference name for the animation
- Custom; can be anything valid
- Think a _variable_ name for the animation
- Or an ID for the animation

### `animation-iteration-count`

- How many cycles will the animation perform

### `animation-direction`

- How will the animation cycles repeat

### `animation` shorthand

```css
selector {
  animation: <duration> <name> <iterations> <direction>;
}
```

It is actually a shorthand for several animation properties much more than the above

- https://developer.mozilla.org/en-US/docs/Web/CSS/animation

## `@keyframes`

- Defines what happens in the actual animation itself
- Outlines the different states that the animation will transition from and to
- Uses percentages to define properties at particular stages in the animation
  - `from` alias for `0%`
  - `to` alias for `100%`
- Think a `class` in JS

## Knowledge Check

- What are the long and short-hand notations for CSS animations?
  - `animation-duration`
  - `animation-name`
  - `animation-iteration-count`
  - `animation-direction`
  - `animation: <duration> <name> <iterations> <direction>;`
- How do you add keyframes to an animation?
  - Use the `@keyframes` rule
  - Use percentages as "selectors" for each stage / keyframe of the animation
- When would you use an animation over a transition (and vice versa)?
  - Use animation if the movement is standalone, i.e. does not require interaction
  - Use transitions if the movement is triggered
