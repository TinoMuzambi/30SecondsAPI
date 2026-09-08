# 30 Seconds API

Your go to API for a fun jam-packed online game of 30 seconds.
Play a 30 Seconds-like game by using this API which provides you with "cards" with items to describe to your teammates.

## API

- `GET /api/v1/card` returns a five-item card.
- `GET /api/v1/card?categories=cars,tech&difficulties=easy,medium&noItemsPerCard=3`
  filters a card. Counts must be integers from 1 to 10.
- `GET /api/v1/items` returns the catalogue and accepts the same category and
  difficulty filters.

The bundled catalogue keeps reads available when MongoDB is not configured or
temporarily unavailable. Set `MONGO_URI` to use the database-backed catalogue.
Item writes are disabled by default. To deliberately enable them, set a strong
`ITEMS_WRITE_SECRET` and send it as `Authorization: Bearer <secret>` on POST or
PUT requests.

The current runtime requires Node.js 20.19 or newer.

## Development

```bash
yarn
yarn test
yarn type-check
yarn build
```

## Roadmap

- Allow for getting a card with a set of n (default = 5) items.
- Allow for specifying a specific category for cards.
- Allow for specifying a difficulty level for cards.
- All cards should be unique.
- Need LOTS of data.
- Single endpoint with query params.
- Use DB or local file?
- Add blacklist flag.

## Categories

- Cars ™
- Celebrities ™
- General Knowledge ™
- Places ™
- Tech: Phones & Laptops and stuff. ™
- Animals ™
- Politics ™
- Occupations
- TV ™
- Music ™
- Nature (Mountains and rivers and oceans and all those stuff and famous lakes and famous rocks) ™
- Bible ™
- Diseases/Conditions
- Scientists & Science Events (Apollo 11) ™
- Kids
- Sport ™
