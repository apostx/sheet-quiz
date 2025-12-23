# project
name: sheet-quiz
type: static-spa
hosting: github-pages
status: dev-environment-ready

# stack
typescript
react
vite
storybook-v10
tailwind-css-v4
vitest
playwright
google-sheets-api-v4

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
.storybook
public

# features
read questions from public google sheets (csv-export)
multiple choice quiz ui with shuffled options
tooltip-based hints and notes
detailed results review screen
in-memory results calculation
tailwind styling

# guidelines
eol: LF
language: english
approach: step-by-step
uncertainty: ask-user
context-format: flat-sections
test-before-next-step: always verify build/tests pass
scope: ask before multi-item work, default to smallest interpretation
context-update: update and optimize context file after every finished request, never add implementation-status or completion tracking sections
git-commits: use conventional commits format (feat/fix/docs/style/refactor/test/chore), do not add claude code signature or co-authored-by lines

# data-structure
spreadsheet-id: from-url-param
sheet-name: from-url-param (topic name)
row-format: question, note, option1-response, option1-hint, option2-response, option2-hint, ...
correct-answer: first-option-always
answer-tracking: by-object-reference

# next-steps
create component storybook stories
add vitest unit tests
mobile responsive improvements
keyboard navigation support
github pages deployment setup
