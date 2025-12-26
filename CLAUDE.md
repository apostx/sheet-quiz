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

# features
path-based routing (/, /:spreadsheetId/, /:spreadsheetId/:sheetName/)
localstorage-based spreadsheet and sheet list management
drag-and-drop reordering with mobile touch support
share button with clipboard copy for exporting/importing lists via URL (base64-encoded JSON, auto-import on page load, silently skips duplicates)
backward compatibility with old URL param format (auto-redirects to new routes)
github pages spa support via 404.html redirect
read questions from public google sheets (csv-export)
single-answer and multi-answer question support
radio buttons for single-answer, checkboxes for multi-answer
shuffled quiz options (per question)
max param for limiting questions with random selection (persists on restart, re-randomizes on page reload)
tooltip-based hints and notes with tap-to-toggle on mobile (supports HTML with links and images, fixed centered on mobile, absolute positioned on desktop, long URLs wrap properly)
click-outside detection for tooltip auto-close
detailed results review with partial selection indicators
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
query-params:
  max: optional, limit questions to random subset (e.g., ?max=10) on quiz route
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
QuizPage: quiz view component (renamed from Quiz, uses route params instead of URL params)

# next-steps
add vitest unit tests (priority: storage.ts, useLocalStorage.ts, useSpreadsheets.ts, useSheets.ts, shuffle.ts, url.ts, sheets.ts parsing, share.ts)
keyboard navigation support (escape to close tooltips, arrow keys for options)
storybook stories for ListManager, SpreadsheetList, SheetList, ShareButton components
