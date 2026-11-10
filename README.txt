RETRO FOOTBALL — SEPARATE FRONTEND + BACKEND

1. Upload every file in this archive to a static web host (e.g. Cloudflare Pages).
   Keep index.html, engine.html, config.js, bridge.js and rosters.json at the root,
   with the html5game folder beside them. Do not upload just the html5game folder.
2. Deploy the separate worker.js using the configuration in its opening comment.
   The Worker serves only backend API routes and JSON data.
3. Set FRONTEND_ORIGIN on the Worker to your frontend origin, for example
   https://my-football.pages.dev (no trailing slash; no path).
4. Edit config.js: replace apiBase with your deployed Worker origin, for example
   https://retro-football-backend.account.workers.dev (no trailing slash).
5. Visit the frontend index.html over HTTP/HTTPS. Do not open it through file://.
   The engine and assets load from your static host. Saves, accounts, collection,
   management progression and head-to-head rooms use the backend Worker.

The API key is the account recovery key, retained in this site's browser storage.
Use Account to copy your key privately or restore an account on another device.
Cloud engine saves are manual via SAVE CLOUD. Restore per mode before continuing
on a different device. The original engine and management progression are separate.

Included modes: Career, Ultimate Team collection, Dynasty management simulation,
Road athlete management simulation, and online simultaneous play-call head-to-head.
Online does not synchronize the old engine's real-time on-field gameplay.
Real names are imported by position into existing engine star slots; the engine's
attributes and future generated drafts remain. No official player ratings claimed.
Roster snapshot: 2,562 player records across 32 teams, fetched 2026-11-10.
Community modification, not an official NFL or New Star Games product.
