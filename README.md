Publicly Accessible API:
The following methods are publicly accessible to set snippet properties on the editor. You can see a working example of this by checking out the SnippetEditorDemo project.

    setReadOnly()
Displays all snippet properties but makes their fields un-editable.

    disableEditorFields(editorFields, disable)
Accepts an array of the following strings- Label, Abbreviation, AbbreviationCase, ContentText, ContentType and a bool to disable/endable.

    setFocusOnEditor()
Moves cursor and sets focus on snippet content.

    setFocusOnAbbreviation()
Moves cursor and sets focus on snippet abbreviation text field.

    setFontList(arrayOfFontNames)
Accepts an array of supported font names. An example would be 'Arial'.

    setDefaultFontStyleForSnippetContentMode(defaultFontStyle, contentMode);
Accepts a string with the style size and font name, some examples would be '12px Arial' or 'italic bold 20px Courier New'. The string passed must format and order the text style like this. If no default is given for a particular content type the editor will default to Arial 12. When switching the editor between content modes this will only change the default font styles for a snippet, not attributes that were explicitly set by the user.

    disableSpecialCharacterDropdown()
Will remove the dropdown containing buttons that insert tab and non-breaking space characters. This should be disabled on iOS as there's not room for another toolbar button. It's particularly important that this is not used on Windows and TextExpander.com as there are no tab + modifiers available for us to use for tab access in the editor.

----------------------- Setting Snippet Properties on the Editor -----------------------

Passing a nil String from objective-c will resolve to '(null)'. Because it resolves to a string with that text we don't know if that's what the user typed or just a null object being converted from obj-c. On the client side you will want to check for nil before passing an snipet properties to the editor

    setSnippet(snippetDictionary)

Accepts a dictionary with the following keys- Label, Abbreviation, AbbreviationCase, ContentText. Must fill out all keys. AbbreviationCaseNumber must represent a numerical value between 0-2. ContentText must be between 0-5 but not 1 which was used for rich text.

    setSnippetLabelText(labelText)

Accepts a string as an argument.

    setSnippetAbbreviationText abbreviationText()

Accepts a string as an argument.

    setSnippetAbbreviationCase(abbreviationCaseNumber)

Must represent a numerical value between 0-2.

    setSnippetContentText(contentText)

Accepts a string as an argument.

    setSnippetContentType(contentType)

Must be a numerical value between 0 and 5. 1 is reserved for rich text snippets which the editor does not currently support. Will log an error if 1 is passed.

    setSnippetContentTextWithEscaping(contentText)

Handles the conversion of text into HTML. Note, setSnippet does not currently call into this method so if you use it you'll have to do your own escaping.

----------------------- Getting changes to snippet properties-----------------------

    getSnippet()
Returns a dicitonary of snippet properties with the following key values- Label, Abbreviation, AbbreviationCase, ContentText, ContentType.

    setEditorDelegate(delegate)

The editor implements a delegate protocol to broadcast changes. Use this method to give the editor a delegate object capable of responding to it's messages.

    snippetLabelChanged(newLabelText)
    snippetAbbreviationChanged(newAbbreviationText)
    snippetAbbreviationCaseChanged(newAbbreviationCase)
    snippetContentTextChanged(newSnippetTextContent)
    setSnippetContentTypeChanged(newSnippetContentType)
    snippetFillinStatusChanged(snippetContent);

Have your delegate object respond to the above JS methods. There is an example of what that might look like in the Snippet Editor Demo project's setEditorDelegate.js file.

----------------------- Handling image import-----------------------

    setImageImportDelegate(delegate)

If you've set an image import delegate when the file import button in the editor is tapped it will send a message to the delegate.

    promptUserToSelectPhoto()

Image import delegate should respond to to the above method to handle image import.

    insertImageHTML(imageHTML)

When your image selection process is complete pass the image back to the editor in the form of an HTML string. This will be inserted into the snippet content where the cursor is located.

----------------------- Groups ------------------------------------

    setGroups(personalGroupNames, sharedGroupNames, organizationGroupNames, selectedIndex)

Makes the group selector visible and populates it with the names of the provided groups, in that order. the selectedIndex can either be undefined/null (representing no selection) or a valid index as if the group names arrays were appended together.

    setGroupDelegate

Setting a delegate notifies that delegate when the selected group is changed.

    selectedGroupIndex

The delegate object should respond to this, the selected index is either undefined (if no selection) or the index into the concatenation of the personal, shared and organisation name arrays (in that order)

----------------------- Getting Console Logs -----------------------

    setEditorLogDelegate(delegate)

To listen for console logs from the editor you'll want to set an Editor Log Delegate object. That object will need to respond to the following method -

    editorLog(message)
The message paramter is what the editor printed to it's console. Using this delegate forwards console messages but does not prevent them from still printing locally the the WebKit console. 

----------------------- Handling Tab focus cycle-----------------------

When tabbing from the abbreviation case matching popup, which is the visually and logically "last" item for tabbing, a delegate can be invoked with a tabFocusOut message.

    setTabFocusOutDelegate(delegate)

Sets the delegate

    tabFocusOut(direction)

Have your delegate object respond to tabFocusOut by manipulating the focus within the window or application.
Direction will be either "forward" or "backward", depending if the Shift key is used with Tab.

