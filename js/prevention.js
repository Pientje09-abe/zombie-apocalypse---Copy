// Prevent text selection and image dragging
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});

document.addEventListener('dragstart', function(e) {
  e.preventDefault();
});

// Prevent right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});