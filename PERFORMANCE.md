# Local API Performance Check

These numbers are a small local baseline, not a production-capacity estimate.

## Environment and dataset

- Measured: 2026-10-03 17:42:31 UTC
- OS: Windows (`win32`)
- Node.js: v24.15.0
- Database: ephemeral local MongoDB from `mongodb-memory-server` (MongoDB 8.2.6)
- Dataset: 100 artists, 100 designs, and 20 unique booking requests
- Runner: `autocannon`, launched through `npm run perf` from `backend`
- GET routes: 5 connections, 100 requests per route, capped at 50 requests/second
- Booking route: 1 connection and 20 requests, each using a distinct future date

## Results

| Endpoint | Requests | Average latency | p97.5 latency* | Error rate |
|---|---:|---:|---:|---:|
| `GET /api/artists` | 100 | 5.25 ms | 21 ms | 0% |
| `GET /api/designs` | 100 | 4.35 ms | 16 ms | 0% |
| `POST /api/bookings` | 20 | 37.05 ms | 166 ms | 0% |

`autocannon` reports a 97.5th-percentile statistic rather than p95, so p97.5 is shown without relabeling it as p95.

## Re-run

```powershell
cd backend
npm run perf
```

The script creates and stops its own in-memory MongoDB instance and seeds its own local dataset. It does not connect to the configured application database or call Unsplash.

## Limitations

- The sample sizes are intentionally small, especially the 20 booking writes.
- MongoDB runs locally in memory; network latency, disk behavior, production data volume, and cloud deployment are not represented.
- The synthetic data is simple and does not model the full variety of real artist and design records.
- Results depend on the developer machine and should only be compared on a similar setup.

## Indexes added

| Collection | Index | Existing query supported |
|---|---|---|
| Bookings | Unique `{ artistId, bookingDate, time }`, partial to `pending`/`confirmed` | Prevents concurrent active bookings for an artist's exact date/time; cancelled bookings do not reserve the slot. The API conflict check also catches legacy records without a status. |
| Bookings | `{ userId, createdAt: -1 }` | User booking history filtered by user and sorted newest first. |
| Bookings | `{ createdAt: -1 }` | Admin booking list sorted newest first. |
| Artists | `{ rating: -1 }` | Unfiltered artist browse sorted by rating. |
| Artists | `{ designTypes: 1, rating: -1 }` | Exact design-type filter while preserving rating sort. |
| Designs | `{ createdAt: -1 }` | Unfiltered design list sorted newest first. |
| Designs | `{ category: 1, createdAt: -1 }` | Category-only filter and newest-first sort. |
| Designs | `{ suitableHandSize: 1, createdAt: -1 }` | Hand-size-only filter and newest-first sort. |
| Designs | `{ category: 1, suitableHandSize: 1, createdAt: -1 }` | Combined category/hand-size filter and newest-first sort. |
| Payments | `{ createdAt: -1 }` | Admin payment list sorted newest first. |

The existing unique `Payment.bookingId` and `Payment.transactionId` indexes continue to support payment lookup and uniqueness. Artist location is an unanchored case-insensitive substring search, which these ordinary indexes cannot accelerate; no index was added for that pattern.
