jsCheckMate
===========
Not chess, checkboxes. This is a small JavaScript utility bookmarklet meant to make it easier to toggle groups of checkboxes on a web page. Instead of having to click each checkbox individually, jsCheckMate lets you drag a rectangle around the checkboxes you want to change the state of.

Installation
------------
The easiest way to do it is to drag the following link to your browser's bookmarks:

.. raw:: html
    :file: bookmarklink.html

If that doesn't work, you'll have to find the ``checkmate.js`` file in this repository, copy its contents, use your browser's bookmarks manager to create a new bookmark, then enter ``javascript:`` plus the copied contents of the file as its URL.

Usage
-----
Click the bookmark, then press and hold the mouse button. Holding the button down, drag the grey rectangle that appears around the checkboxes whose states you want toggled. Release the button to change the states of the checkboxes inside the grey rectangle.


Known Issues
------------
The browser will not scroll even if you try to pull the mouse cursor off the visible page while dragging. The workaround is to use the arrow or ``Page Up``/``Page Down`` keys to scroll the page while dragging.

Possible Future Features
------------------------
Multiple Rectangles
    Support multiple areas to define the sections in which checkboxes should be toggled, either by adding an element to the page to act as a control panel, or by allowing the use to hold down e.g. ``Shift`` in order to release the mouse without toggling state, and to then begin drawing further rectangles.
Keyboard Version
    This might simply be a separate project, but the basic idea would be to bind some key to allow cycling through checkboxes on the page, automatically toggling state when hitting each one, with a second key to toggle explicitly if needed and a third to exit this mode.

Copyright/License
-----------------
Copyright © 2012 Tadhg O’Higgins, licensed under the GPL v3; see ``license.txt`` for details.
