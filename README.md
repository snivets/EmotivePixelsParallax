# Emotive Pixels Parallax

A React and Vite site that presents Emotive Pixels podcast episodes as full-screen, scroll-snapping cards. Episode details are loaded from the podcast RSS feed; season artwork is maintained in `public/images`.

## Development

```sh
npm install
npm run dev
```

## Checks

```sh
npm test
npm run lint
npm run build
```

## Episode artwork

The episode artwork manifest is in `src/data/episode-art.ts`. When adding an episode background image to `public/images` or season-five SVG to `public/images/svgs`, add its filename there so the episode can be included in the correct card list.

The social link preview is `public/linkbg.png` (1200 × 630). Open Graph and Twitter card metadata are set in `index.html`.
