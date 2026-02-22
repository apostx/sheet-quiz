# project
name: sheet-quiz
type: static-spa
hosting: github-pages
status: deployment-configured
deploy-url: https://apostx.github.io/sheet-quiz/
storybook-url: https://apostx.github.io/sheet-quiz/storybook/

# stack
typescript
react
vite
storybook-v10
tailwind-css-v4
vitest
playwright
google-sheets-api-v4
react-router-dom-v7
dnd-kit (core, sortable, utilities)

# architecture
backend: none
database: none
auth: none
data-source: public-google-sheets-only

# folders-exists
src/components
src/hooks
src/services
src/types
src/utils
src/stories
src/assets
src/routes
.storybook
public
scripts

# features
path-based routing (/, /:spreadsheetId/, /:spreadsheetId/:sheetName/, /:spreadsheetId/:sheetName/results, /:spreadsheetId/:sheetName/search)
localstorage-based spreadsheet and sheet list management
drag-and-drop reordering with mobile touch support
share button with clipboard copy for exporting/importing lists via URL (base64-encoded JSON, auto-import on page load, silently skips duplicates)
backward compatibility with old URL param format (auto-redirects to new routes)
github pages spa support via 404.html redirect (preserves query params and hash fragments)
read questions from public google sheets (csv-export)
single-answer and multi-answer question support
radio buttons for single-answer, checkboxes for multi-answer
seeded deterministic shuffle (mulberry32 PRNG) for reproducible question/option order
quiz state preservation via URL hash fragment (#s=SEED&q=INDEX&a=ANSWERS) — survives page reloads, supports question navigation and review
max param for limiting questions with random selection (persists on restart, re-randomizes on page reload)
tooltip-based hints and notes with tap-to-toggle on mobile (supports HTML with links and images, fixed centered on mobile, absolute positioned on desktop, long URLs wrap properly)
click-outside detection for tooltip auto-close
dedicated results route with detailed review, explanation labels, and partial selection indicators
search page for browsing questions and correct answers
auto-redirect to results when question index exceeds total (safety net)
in-memory results calculation
mobile responsive design (320px-428px phones, 640px+ tablets, 1024px+ desktop)
responsive text sizing and touch-friendly UI elements
storybook documented components
tailwind styling with mobile-first approach
automated github pages deployment via github actions

# guidelines
eol: LF
language: english
approach: step-by-step
uncertainty: ask-user
context-format: flat-sections
test-before-next-step: always verify build/tests pass
scope: ask before multi-item work, default to smallest interpretation
context-update: update and optimize context file after every finished request, never add implementation-status or completion tracking sections
git-commits: use conventional commits format (feat/fix/docs/style/refactor/test/chore), do not add claude code signature or co-authored-by lines, always bump version in package.json before committing code changes
versioning: semantic versioning (MAJOR.MINOR.PATCH), bump MINOR for new features (feat:), PATCH for fixes (fix:), MAJOR for breaking changes, bump happens before commit as part of git workflow

# routing
routes:
  /: home page, list saved spreadsheet IDs
  /:spreadsheetId/: list saved sheet names for spreadsheet
  /:spreadsheetId/:sheetName/: quiz view for specific sheet
  /:spreadsheetId/:sheetName/results: results page (reconstructs answers from URL hash)
  /:spreadsheetId/:sheetName/search: search/browse questions and correct answers
query-params:
  max: optional, limit questions to random subset (e.g., ?max=10) on quiz and results routes
hash-fragment:
  format: #s=SEED&q=INDEX&a=OPT,OPT.OPT,,OPT (seed + current question index + positional answer array)
  example: #s=1330516298&q=1&a=0,2.3 (seed, viewing q1, q0→opt0, q1→opt2+opt3)
  sparse: empty positions = unanswered (e.g., a=0,,1 means q0→opt0, q1=unanswered, q2→opt1)
  used-by: QuizPage (read/write), ResultsPage (read-only)
  on-reload: shows question at q index (even if answered, for review), no auto-advance
backward-compatibility: old ?spreadsheetId=x&sheet=y format redirects to new /:spreadsheetId/:sheetName/ route

# data-structure
row-format: question, note, correctIndices, option1-response, option1-hint, option2-response, option2-hint, ...
correct-indices-syntax: "1" for single-answer, "[1,2,3]" for multi-answer (1-based, brackets determine UI type)
answer-tracking: by-object-reference using Set for multi-select
backward-compatibility: empty correctIndices defaults to "1" (first option, single-answer)
html-support: notes and hints support HTML content (links, images) via HtmlContent component with lightbox for images
localstorage-schema:
  sheet-quiz:spreadsheets: StoredSpreadsheet[] (id, order)
  sheet-quiz:sheets: StoredSheet[] (spreadsheetId, name, order)

# hooks
useQuiz: quiz state management (current question, selection, scoring)
useClickOutside: click-outside detection for tooltip auto-close
useLocalStorage: generic hook for localStorage state management with error handling
useSpreadsheets: CRUD operations for spreadsheet list (add, remove, reorder)
useSheets: CRUD operations for sheet list filtered by spreadsheetId (add, remove, reorder)
useShareLink: share link state management with clipboard operations and visual feedback

# shared-components
HtmlContent: renders HTML with link/image styling, click-to-zoom images via Lightbox
Lightbox: fullscreen image modal with escape-to-close
ListManager: reusable add/delete/drag-reorder list component with mobile touch support
ShareButton: reusable share button with clipboard copy and "Copied!" feedback
SpreadsheetList: home page component for managing spreadsheet IDs with share functionality
SheetList: spreadsheet detail page for managing sheet names with share functionality
QuizPage: quiz view with seeded shuffle, hash state sync, auto-redirect to results when complete
ResultsPage: self-contained results page, fetches data, reconstructs answers from URL hash

# next-steps
(none)

# file-index
entry-points:
  main.tsx: React entry point, renders App in StrictMode
  App.tsx: Root component, renders Router
  index.html: HTML entry with 404 redirect restoration script

routes (src/routes/):
  Router.tsx: Route configuration with basename /sheet-quiz/, defines 6 routes (/, /:spreadsheetId, /:spreadsheetId/:sheetName/search, /:spreadsheetId/:sheetName/results, /:spreadsheetId/:sheetName, *)
  RedirectLegacy.tsx: Redirects old URL param format (?spreadsheetId=x&sheet=y) to new path-based routes, shows 404 for invalid URLs

components-page (src/components/):
  SpreadsheetList.tsx: Home page (/), manages saved spreadsheet IDs with add/delete/reorder/share
  SheetList.tsx: Spreadsheet detail (/:spreadsheetId), manages sheet names for specific spreadsheet
  QuizPage.tsx: Quiz page (/:spreadsheetId/:sheetName), seeded shuffle, hash state sync, auto-redirect to results
  ResultsPage.tsx: Results page (/:spreadsheetId/:sheetName/results), reconstructs answers from hash, computes score
  SearchPage.tsx: Search page (/:spreadsheetId/:sheetName/search), browse questions and correct answers

components-quiz (src/components/):
  Quiz.tsx: Legacy quiz orchestrator (unused, kept for backward compat)
  QuestionCard.tsx: Displays single question with note tooltip and option buttons
  OptionButton.tsx: Individual answer option with hint tooltip (radio for single, checkbox for multi)
  Results.tsx: Post-quiz results page with score and detailed review

components-shared (src/components/):
  ListManager.tsx: Generic drag-and-drop list component (add/delete/reorder) with mobile touch support
  ShareButton.tsx: Export/import lists via clipboard (base64-encoded JSON in URL)
  HtmlContent.tsx: Renders HTML content with link/image styling, click-to-zoom images via Lightbox
  Lightbox.tsx: Fullscreen image modal with escape-to-close
  index.ts: Barrel export for all components

components-stories (src/components/):
  OptionButton.stories.tsx: Storybook story for OptionButton component
  QuestionCard.stories.tsx: Storybook story for QuestionCard component
  Results.stories.tsx: Storybook story for Results component

hooks (src/hooks/):
  useQuiz.ts: Quiz state management (current question, selection tracking via Set, scoring, navigation)
  useLocalStorage.ts: Generic localStorage sync hook with error handling (quota exceeded alerts)
  useSpreadsheets.ts: CRUD operations for spreadsheet list (add, remove, reorder with order field)
  useSheets.ts: CRUD operations for sheet list filtered by spreadsheetId (add, remove, reorder)
  useShareLink.ts: Share link generation with clipboard copy and visual feedback (2s "Copied!" timeout)
  useClickOutside.ts: Click-outside detection for tooltip auto-close

services (src/services/):
  sheets.ts: SheetsService class for fetching and parsing Google Sheets CSV (gviz/tq?tqx=out:csv endpoint, RFC 4180-compliant character-by-character CSV parser with multi-line quoted field support)
  index.ts: Service exports (createSheetsService factory function)

utils (src/utils/):
  storage.ts: Safe localStorage read/write with quota exceeded handling (safeGetItem, safeSetItem)
  shuffle.ts: Fisher-Yates shuffle with seeded PRNG (mulberry32), shuffleTopicWithSeed for deterministic quiz order
  quizHash.ts: URL hash encoding/decoding for quiz state (seed + question index + positional answer array)
  url.ts: URL parameter parsing (spreadsheetId, sheet, max from legacy query params)
  share.ts: Base64 encoding/decoding for shareable URLs (URL-safe format, clipboard operations with fallback)
  index.ts: Utility exports

types (src/types/):
  quiz.ts: Quiz-related types (QuizOption, QuizQuestion with correctOptions as object references, QuizTopic, SheetData)
  storage.ts: LocalStorage types (StoredSpreadsheet, StoredSheet, STORAGE_KEYS constants)
  index.ts: Type exports

# key-patterns
object-reference-tracking:
  why: Options are shuffled per question but correctness check needs stable references
  how: Set<QuizOption> tracks selected options by object reference (not index)
  benefit: Works after shuffle, O(1) has() lookup, type-safe
  location: useQuiz.ts (selectOption, correctness check)

seeded-shuffle-state:
  why: Quiz progress preserved across page reloads without server/localStorage
  how: Seed stored in URL hash, deterministic PRNG reproduces same shuffle order
  flow: QuizPage generates seed → shuffles topic → syncs answers to hash → ResultsPage reads hash + re-shuffles with same seed
  hash-format: #s=SEED&q=INDEX&a=OPT,OPT.OPT,,OPT (positional array, dots for multi-select)

path-based-routing:
  modern: /:spreadsheetId/:sheetName/ format
  legacy: ?spreadsheetId=x&sheet=y redirected via RedirectLegacy component
  why: SEO-friendly, shareable URLs, better browser history, React Router v7 best practice
  backward-compatibility: RedirectLegacy parses old format and Navigate to new path

generic-listmanager:
  pattern: Single reusable component with TypeScript generics ListManager<T>
  usage: Both SpreadsheetList and SheetList use same component
  features: dnd-kit drag-and-drop, mobile touch support (PointerSensor with 8px activation distance)
  benefit: DRY principle, consistent UX, single source of truth for list CRUD

# task-reference
adding-quiz-features:
  read-first: src/types/quiz.ts, src/services/sheets.ts, src/hooks/useQuiz.ts
  then-read: src/components/QuestionCard.tsx, src/components/OptionButton.tsx
  modify: Update types, parser, hook logic, component rendering
  test: Verify with Google Sheet, check single/multi-answer modes

modifying-lists:
  read-first: src/components/ListManager.tsx, src/hooks/useSpreadsheets.ts, src/hooks/useSheets.ts
  then-read: src/utils/storage.ts, src/types/storage.ts
  modify: Generic component pattern, CRUD operations, drag-and-drop logic
  test: Add/delete/reorder items, verify LocalStorage persistence

routing-changes:
  read-first: src/routes/Router.tsx, src/routes/RedirectLegacy.tsx, src/utils/url.ts
  modify: Route definitions, URL parsing, legacy redirect logic
  test: Navigate all routes, test backward compatibility with old URLs

storage-persistence:
  read-first: src/utils/storage.ts, src/hooks/useLocalStorage.ts, src/types/storage.ts
  then-read: src/hooks/useSpreadsheets.ts, src/hooks/useSheets.ts
  modify: Storage utilities, generic hook, CRUD hooks
  test: DevTools Application tab, verify quota exceeded handling

share-functionality:
  read-first: src/utils/share.ts, src/hooks/useShareLink.ts
  then-read: src/components/ShareButton.tsx, src/components/SpreadsheetList.tsx
  modify: Base64 encoding/decoding, clipboard operations, import logic
  test: Generate share link, import in new tab/browser, verify duplicate skipping
