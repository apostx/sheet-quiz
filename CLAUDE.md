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
single-answer and multi-answer question support
radio buttons for single-answer, checkboxes for multi-answer
shuffled quiz options
tooltip-based hints and notes
detailed results review with partial selection indicators
in-memory results calculation
storybook documented components
tailwind styling
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
git-commits: use conventional commits format (feat/fix/docs/style/refactor/test/chore), do not add claude code signature or co-authored-by lines
versioning: semantic versioning (MAJOR.MINOR.PATCH), bump MINOR for new features, PATCH for fixes, MAJOR for breaking changes

# data-structure
spreadsheet-id: from-url-param
sheet-name: from-url-param (topic name)
row-format: question, note, correctIndices, option1-response, option1-hint, option2-response, option2-hint, ...
correct-indices-syntax: "1" for single-answer, "[1,2,3]" for multi-answer (1-based, brackets determine UI type)
answer-tracking: by-object-reference using Set for multi-select
backward-compatibility: empty correctIndices defaults to "1" (first option, single-answer)

# next-steps
add vitest unit tests
mobile responsive improvements
keyboard navigation support
