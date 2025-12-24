# Sheet Quiz

An interactive quiz application that reads questions directly from public Google Sheets. Create and share quizzes without writing code - just fill out a spreadsheet!

## Live Demo

**Quiz App**: https://apostx.github.io/sheet-quiz/
**Storybook**: https://apostx.github.io/sheet-quiz/storybook/

## Try It Out

See a sample quiz in action:

```
https://apostx.github.io/sheet-quiz/?spreadsheetId=1Z1zyrsPZ6e9LF9DiWrCbE_DZy5qyNsXmPHBY-UQvcMg&sheet=1%20-%20What%20is%20Cloud%20Computing
```

Or try it locally:

```
http://localhost:5173/?spreadsheetId=1Z1zyrsPZ6e9LF9DiWrCbE_DZy5qyNsXmPHBY-UQvcMg&sheet=1%20-%20What%20is%20Cloud%20Computing
```

## Features

- ✅ **Google Sheets Integration** - Load questions from any public Google Sheet
- ✅ **Single & Multi-Answer Questions** - Radio buttons for single-select, checkboxes for multi-select
- ✅ **Shuffled Options** - Randomize answer order for each quiz session
- ✅ **Hints & Notes** - Add tooltips and context to questions and answers
- ✅ **Detailed Results** - Review all questions with correct/incorrect indicators
- ✅ **Zero Backend** - Runs entirely in the browser, no server required
- ✅ **Mobile Responsive** - Works on desktop, tablet, and mobile devices
- ✅ **TypeScript** - Fully typed for reliability

## How to Use

### 1. Create Your Google Sheet

Make a copy of the [sample spreadsheet](https://docs.google.com/spreadsheets/d/1Z1zyrsPZ6e9LF9DiWrCbE_DZy5qyNsXmPHBY-UQvcMg/) or create a new one following this format:

#### Spreadsheet Format

Each row represents one question with this column structure:

```
[question, note, correctIndices, option1-response, option1-hint, option2-response, option2-hint, ...]
```

**Column Breakdown:**
- **Column A (question)**: The question text
- **Column B (note)**: Optional note/context shown below the question
- **Column C (correctIndices)**: Correct answer indices (see syntax below)
- **Columns D onwards**: Option pairs (response, hint, response, hint, ...)

#### Correct Indices Syntax

- **Single-select**: `"1"` - First option is correct (shows radio buttons)
- **Multi-select**: `"[1,2,3]"` - Options 1, 2, and 3 are correct (shows checkboxes)
- **Brackets determine UI**: Use `[...]` for checkboxes, omit for radio buttons
- **1-based indexing**: First option is `1`, not `0`

#### Example Spreadsheet Rows

| Question | Note | Correct | Opt1 Response | Opt1 Hint | Opt2 Response | Opt2 Hint | Opt3 Response | Opt3 Hint |
|----------|------|---------|---------------|-----------|---------------|-----------|---------------|-----------|
| What is 2+2? | Basic math | 1 | 4 | | 3 | | 5 | |
| Select primary colors | Choose all | [1,2,3] | Red | | Blue | | Yellow | | Green | Not primary |

### 2. Make Your Sheet Public

1. Click **File** → **Share** → **Publish to web**
2. Select the sheet/tab you want to use
3. Choose **Comma-separated values (.csv)**
4. Click **Publish**

### 3. Get Your Spreadsheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/1Z1zyrsPZ6e9LF9DiWrCbE_DZy5qyNsXmPHBY-UQvcMg/edit
                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                    This is your spreadsheet ID
```

### 4. Build Your Quiz URL

Format:
```
https://apostx.github.io/sheet-quiz/?spreadsheetId=YOUR_SPREADSHEET_ID&sheet=YOUR_SHEET_NAME
```

Example:
```
https://apostx.github.io/sheet-quiz/?spreadsheetId=1Z1zyrsPZ6e9LF9DiWrCbE_DZy5qyNsXmPHBY-UQvcMg&sheet=1%20-%20What%20is%20Cloud%20Computing
```

**Note**: URL-encode the sheet name (spaces become `%20`)

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/apostx/sheet-quiz.git
cd sheet-quiz

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/?spreadsheetId=YOUR_ID&sheet=YOUR_SHEET` to test your quiz.

### Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run storybook        # Start Storybook
npm run build-storybook  # Build Storybook
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Storybook v10** - Component documentation
- **Vitest + Playwright** - Testing
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hosting

## Project Structure

```
sheet-quiz/
├── src/
│   ├── components/      # React components (Quiz, QuestionCard, Results, etc.)
│   ├── hooks/          # Custom hooks (useQuiz)
│   ├── services/       # Google Sheets CSV parser
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── .storybook/         # Storybook configuration
├── public/             # Static assets
└── .github/workflows/  # GitHub Actions deployment
```

## How It Works

1. **URL Parsing**: Extracts `spreadsheetId` and `sheet` from URL parameters
2. **CSV Fetch**: Fetches the published Google Sheet as CSV via public URL
3. **Parsing**: Parses CSV rows into question objects with correct answer tracking
4. **Shuffling**: Randomizes option order while maintaining correct answer references
5. **Quiz Flow**: Manages question navigation, answer selection, and scoring
6. **Results**: Shows detailed review with correct/incorrect indicators

## Deployment

This project auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

To deploy your own fork:

1. Fork this repository
2. Enable GitHub Pages in Settings → Pages
3. Set source to "Deploy from a branch" → `gh-pages` → `/ (root)`
4. Push to `main` - deployment happens automatically

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Credits

Built by [apostx](https://github.com/apostx)
