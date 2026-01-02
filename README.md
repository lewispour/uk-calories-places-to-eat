# Calorised - UK Restaurant Calorie Guide
**Live site:** [kcals.uk](https://kcals.uk)

## How to Add a Restaurant

### Option 1: Quick Edit on GitHub (Easiest)

1. **Open the places file:** [Click here to edit places.md](https://github.com/lewispour/uk-calories-places-to-eat/edit/main/places.md)
2. **Find the right category** (or scroll to the bottom to add a new one)
3. **Add your restaurant** using this format:
   ```
   * [restaurant name](https://link-to-calorie-info)
   ```
4. **Click "Commit changes"** and submit a pull request

That's it! We'll review and merge your contribution.



## Format Guide

The `places.md` file uses a simple format:

```markdown
category name

* [restaurant name](url-to-calorie-info)
* [another restaurant](url) \* optional note
```

### Adding to an Existing Category

Find the category and add a new line:

```markdown
fast food

* [burger king](https://www.burgerking.co.uk/nutrition-explorer)
* [mcdonald's](https://www.mcdonalds.com/gb/en-gb/menu.html)
* [your restaurant](https://link-to-nutrition-page)  👈 Add here
```

### Creating a New Category

Add a blank line, the category name (lowercase), then your entries:

```markdown
existing category

* [existing place](url)

new category name

* [new restaurant](url)
```

### Examples

| Type | Format |
|------|--------|
| Basic | `* [pret a manger](https://www.pret.co.uk/en-GB/our-menu)` |
| With note | `* [blank street](https://example.com) \* more on the app` |
| With brand | `* [bread street kitchen](https://example.com) \- gordon ramsay` |

### Guidelines

- **Lowercase** restaurant names
- **Direct links** to nutrition/calorie pages (not homepages)
- **UK restaurants** that publicly display calorie information
- **Check existing entries** to avoid duplicates

---

## What We Accept

**Yes:**
- UK restaurants, cafes, chains with public calorie info
- Links to nutrition PDFs, menu pages with calories, or official calorie guides
- Both national chains and local establishments

**No:**
- Restaurants without calorie information available
- Duplicate entries
- Non-UK establishments
