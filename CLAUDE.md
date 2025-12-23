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

# folders-planned
src/components
src/hooks
src/services
src/types
src/utils

# folders-exists
src/stories
src/assets
.storybook
public

# features
read questions and answers from public google sheets
multiple choice quiz ui
in-memory results calculation
storybook documented components
tailwind styling

# guidelines
eol: LF
language: english
approach: step-by-step
uncertainty: ask-user
context-format: flat-sections
test-before-next-step: always verify build/tests pass
scope: ask before multi-item work, default to smallest interpretation [TRIAL]
context-update: update and optimize context file after every finished request

# completed
vite + react + typescript initialized
tailwind css v4 configured and integrated
storybook v10 initialized
storybook sample components removed
app converted to tailwind classes
app.stories.tsx created
build verified passing

# next-steps
create sheets service
build quiz components
