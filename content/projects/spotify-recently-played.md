---
date: '2026-09-02'
title: 'Spotify Recently Played'
github: 'https://github.com/Crushoverride007/spotify-recently-played-readme'
external: 'https://github.com/JeffreyCA/spotify-recently-played-readme/issues/51'
tech:
  - TypeScript
  - Cloudflare Workers
  - Firebase
  - Vitest
company: ''
showInProjects: true
---

Diagnosed why Spotify accounts whose user ID contains a dot could never connect to this widget: Realtime Database keys cannot hold a dot, so the OAuth callback threw before storing a token. Fixed by escaping rather than rejecting, with tests, and reported upstream.
