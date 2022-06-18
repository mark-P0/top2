# Links and Images

- Absolute links
  - Internet URLs
    ```
    protocol://domain/path
    ```
- Relative links
  - Within website
  - Does not need the domain name
  - File path to another webpage _relative_ to the page on which the link is

> Images also use absolute and relative links for displaying graphics on a webpage

## File Structure

```
website-folder/
├─ css/
├─ js/
├─ img/
├─ index.html
├─ ...other HTML files
```

## Four (4) Main Image Formats Used on the Web

1. JPG | JPEG
   - Used for photos
   - Large color palettes
   - Minimal file size
   - No transparency
2. GIF
   - Animated
   - Limited color palette
   - Minimal support for transparency
3. PNG
   - Great support for transparency
   - Used for anything other than photos and animations
   - Lossless; not compressed, thus file sizes may be larger
4. SVG
   - Vector-based; previous formats are pixels-based
   - Can scale without quality loss
   - Useful for responsive design
   - Similar use case with PNG
   - Has an issue with texts, causing exponential file sizes

## Knowledge Check

- What element is used to create a link?

  - Anchor `<a>` elements

  ```html
  <a href="https://www.google.com/">This should be a link to Google.</a>
  ```

- What is an attribute?

  - A property within a tag, e.g. `href`, `alt`, `lang`
  - Kind of like variables within tags

  ```html
  <!-- `href` is an attribute of `a` tags -->
  <!-- prettier-ignore -->
  <a
    href="https://www.google.com/"
  >
    This should be a link to Google.
  </a>
  ```

- What attribute tells links where to go to?

  - The `href` attribute

  ```html
  <!-- `href` refers to the Google URL -->
  <!-- prettier-ignore -->
  <a
    href="https://www.google.com/"
  >
    This should be a link to Google.
  </a>
  ```

- What is the difference between an absolute and relative link?

  - Absolute links are complete addresses to a resource. They need a protocol and domain name. Think of internet URLs.
  - Relative links are references to pages or resources within the same website or domain. The protocol or domain name need not to be included.
    - Kind of like navigating directories using the command line.

- Which element is used to display an image?

  - The `<img>` element

  ```html
  <img
    src="https://www.theodinproject.com/mstile-310x310.png"
    alt="The Odin Project Logo"
  />
  ```

- What two attributes do images always need to have?

  - The `src` and `alt` attributes.
  - `src` defines the path or address of the source image resource
  - `alt` defines an alternative text that describes the image. Useful for accessibility purposes

- How do you access a parent directory in a filepath?

  - `..`

- What are the four main image formats that you can use for images on the web?

  - JPG | JPEG
    - Joint Photographic Experts Group
  - GIF
    - Graphics Interchange Format
  - PNG
    - Portable Network Graphics
  - SVG
    - Scalable Vector Graphics
