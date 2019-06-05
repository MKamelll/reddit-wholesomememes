### A Reddit Bot To Tweet From The Subreddit r/wholesomememes 🐔

Create a `.env` using the `env-example` as a template.

If you want another subreddit change it in the `/src/reddit.js` file, maybe it'll
work 😢

It'll tweet as the `/src/schedule.js` file, tweet every hour, the other scedule is
to delete the tweeted ones every week.

1 - `npm install` in `src` folder.
2 - Create a `memes` folder in the main directory.
3 - Run `node index`.

👽 snoowrap is using an old `ws`, so if you tried to add it to GitHub, there would be
a vulnerability issue
