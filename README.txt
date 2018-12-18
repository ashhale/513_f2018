Description of Sources and How They Are Used
============================================

As is typical when using standard web development technologies like
HTML, CSS and JavaScript, the "Draw a Webpage" project is a combination
of original, borrowed and modified code. Many web sites exist
specifically to teach how to accomplish certain tasks or features, and
it's expected by the authors that these tutorials will be used either
as-is or with modification. There are also many libraries that are
intended to be used freely.

Major JavaScript Libraries
--------------------------

  * Konva
    - Doc and Examples: https://konvajs.github.io/
    - Library: https://cdn.rawgit.com/konvajs/konva/2.4.0/konva.min.js
    - This HTML5 2d canvas library is used unmodified. It is loaded into
      the browser via a standard "<script src..." reference. This library is
      not redistributed as part of the project itself.
    - The Konva web site includes extensive Tutorials and Demos. Many
      concepts were taken from these tutorials. Any code taken from these
      tutorials was very small and/or needed to be modified to work within the
      project.

  * Color JS
    - Doc and Examples: https://github.com/mbjordan/Colors
    - Library:
      https://cdnjs.cloudflare.com/ajax/libs/Colors.js/1.2.4/colors.min.js
    - This color manipulation library is used unmodified. It is loaded
      into the browser via a standard "<script src..." reference. This library
      is not redistributed as part of the project itself.
    - Only one function (name2hex) from this library is used, with no
      code copied from the documentation.

  * markdown-it
    - Doc and Examples: https://github.com/markdown-it/markdown-it
    - Library:
      https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.js
    - This Markdown rendering library is used unmodified. It is loaded
      into the browser via a standard "<script src..." reference. This library
      is not redistributed as part of the project itself.

Other Significant Resources
---------------------------

  * W3Schools
    - Doc and Examples: https://www.w3schools.com/
    - Terms of Use: https://www.w3schools.com/about/about_copyright.asp
    - This popular web site includes numerous examples of how to
      accomplish a huge variety of tasks in HTML, CSS, and JavaScript (and
      more). Their terms specifically allow for use of examples for non-profit
      teaching and research

    - Animated side navigation
      + https://www.w3schools.com/howto/howto_js_sidenav.asp
      + This example shows how to create an animated side navigation,
        which the project uses for the main sidebar on the left. The example
        consists of HTML (used with significant modification), CSS (used with
        minor modification) and JavaScript (used with modification).
    - Tab headers
      + https://www.w3schools.com/howto/howto_js_tab_header.asp
      + This example shows how to make tabs, which the project uses in
        combination with the animated side navigation above, for the main
        sidebar on the left. The example consists of HTML (used with
        modification), CSS (used with minor modification) and JavaScript
        (used with minor modification).
    - Modal dialog for error messages
      + https://www.w3schools.com/howto/howto_css_modals.asp
      + This example shows how to create a modal dialog with CSS, which
        the project uses to display an error message. The example consists of
        HTML (used with minor modification), CSS (used as is) and JavaScript
        (largely not used, had to do it differently in the project).
    - CSS button group
      + https://www.w3schools.com/howto/howto_css_button_group.asp
      + This example shows how to create a button group with CSS, which
        the project uses for the Toolbar tab. The example is primarily CSS,
        which is used with minor modification.

  * Stack Overflow
    - https://stackoverflow.com/
    - License: https://creativecommons.org/licenses/by-sa/4.0/
    - This popular web site includes numerous examples of how to
      accomplish a huge variety of tasks in HTML, CSS, and JavaScript (and
      more). Their terms state that content provided by subscribers is
      sharable via the "CC BY-SA" license (link above), which is sufficient
      for this project.

    - Load the content of a separate file into the current "live" HTML page
      + https://stackoverflow.com/a/6348338
      + The code snippet is used with only minor modification

  * CSS Tooltips
    - https://gist.github.com/sirodoht/0d380111ee136e72a46cbff70202ad8a
    - Shows how to display pure CSS tooltips, used as is
    
Less Significant Resources
--------------------------

The above covers all the significant uses of external resources. Beyond
those, as is typical in modern development, many concepts were learned
from web searches. The resulting web pages often provided examples, from
which very small bits (< 10 lines) may have been copied without
attribution here. However, the project source code usually provides a
reference to where help was found. For these less-significant uses, try
searching for "http" in the project code, especially in sidebar.js.

Some images from various places on the web are also used as is.
