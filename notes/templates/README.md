# Notes Folder

This folder stores long-form study notes so content stays modular and independent from page layouts.

## Structure

- `notes/ml_midterm_notes.html`: existing midterm note migrated from pages.
- `notes/templates/note-template.html`: reusable template for new notes.

## Add a New Note

1. Copy the template:

```bash
cp notes/templates/note-template.html notes/my_new_note.html
```

2. Update:
- `<title>` and page header metadata
- `notes-cover` label, title, subtitle, topic chips, and references
- `notes-scope` section content and section ids (`#part1`, `#part2`, etc.)
- right-rail TOC links so each `href` matches a real section id
- about card metadata (course, topic, version, read time)

## Image Utility Classes

Use these classes inside `notes-scope` for image layout patterns:

- Inline image inside text: `img-inline`
- Wrapped image left/right: `img-wrap-left`, `img-wrap-right`
- Standalone centered break image: `img-break`
- Full-width image block: `img-full`
- Clear float after wrapped image: `note-clear` or `img-clear`

Optional figure wrapper classes (supports caption):

- `figure.note-figure.break`
- `figure.note-figure.full`
- `figure.note-figure.wrap-left`
- `figure.note-figure.wrap-right`
- `figure.note-figure.inline`

Example:

```html
<p>
	This is inline <img class="img-inline" src="../assets/icon.png" alt="icon" /> content.
</p>

<img class="img-wrap-right" src="../assets/diagram.png" alt="diagram" />
<p>
	Wrapped text continues around the image on desktop.
</p>
<span class="note-clear" aria-hidden="true"></span>

<figure class="note-figure break">
	<img src="../assets/architecture.png" alt="System architecture" />
	<figcaption>Figure 1. System architecture overview.</figcaption>
</figure>
```

3. Register the new note in:
- `pages/notes.html` (required)
- `pages/writings.html` (optional, if you want it featured)

## Relative Path Reminder

If a note lives in `notes/`, use:
- `../css/style.css`
- `../js/app.js`
- `../index.html`
- `../pages/*.html`
