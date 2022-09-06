# Default Styles

> I am very much familiar with "resetting stylesheets"
>
> Through my attempts at single-page apps / websites
>
> Mostly for the `<body>` and `<p>` margins

- Also referred to as **_user agent stylesheet_**
- Can be observed in Chrome DevTools
- Different styles for different browsers
  - e.g. Firefox' is different than Chrome's
  - Relatively minor differences, but significant nonetheless and cannot be relied upon

## Choices

<!-- cspell:disable -->

|            | Reset CSS | Normalize.css | Reboot.css | Sanitize.css |
| :--------: | :-------: | :-----------: | :--------: | :----------: |
|   Author   |   Meyer   |    Necolas    | Bootstrap  |  CSS Tools   |
|  Behavior  |  Removes  |  Normalizes   | Normalizes |  Normalizes  |
|    Age     |   Older   |     Newer     |   Newer    |    Newer     |
| Popularity |  Higher   |    Higher     |   Lower    |    Lower     |

<!-- cspell:enable -->

### Reset CSS

https://meyerweb.com/eric/tools/css/reset/

- Actually removes all default styles

### Normalize.css

https://necolas.github.io/normalize.css/

- Normalizes styles across browsers for consistency

### Reboot.css

https://getbootstrap.com/docs/4.0/content/reboot/

- From the makers of [Bootstrap](https://getbootstrap.com/), a popular CSS framework
- Built upon Normalize.css

### Sanitize.css

https://csstools.github.io/sanitize.css/

- By [CSS Tools](https://github.com/csstools), creators of [PostCSS](https://github.com/postcss/postcss)
- Built upon Normalize.css

## Knowledge Check

Why would you want to use a CSS reset?

- To truly style a website as envisioned, without silently relying on browser defaults
