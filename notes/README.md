# Notes Folder

This folder stores long-form notes in standalone files so content stays modular.

## Structure

- notes/ml_midterm_notes.html: IF3270 machine learning midterm note.
- notes/mobile_midterm_notes.html: IF3210 mobile app development midterm note.
- notes/if3210_uts_answer_key.html: IF3210 UTS true/false answer key note.
- notes/midterm_compbio.html: IF3211 computational biology midterm note.
- notes/templates/note-template.html: reusable template for new notes.

## Add a New Note

1. Copy the template:

```bash
cp notes/templates/note-template.html notes/my_new_note.html
```

2. Update title, metadata, and sections.
3. Add a new entry in pages/notes.html.
4. Optionally feature it in pages/writings.html.

## Paths for Notes Files

From notes/*.html use:
- ../css/style.css
- ../js/app.js
- ../index.html
- ../pages/*.html
