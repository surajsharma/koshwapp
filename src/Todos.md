## Nice To Have

- Images scale with length of message
- No filename in message if it contains only the media
- Clicking on media shows/plays media in a modal
- Search bar

## Required

- Video/Mp4 display
- Checkbox for each message

  - state update on toggle
  - CAB toggle on state change

- Context menu and buttons
  - make sticky
  - select messages
    - selectedMessages is a state array in App
    - selectedMessages is passed down as a context to messageviewer, message
    - messageviewer checks if a message is selected and renders
    - message checks if message is in selectedMessages and renders
    - message event handler toggles message in/out of selectedMessages
  - Perform Upload on message(s)
  - Perform Delete on message(s)
  - Link messages(s)
  - Unlink messages(s)
  - Tagging message(s)
