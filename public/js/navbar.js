var userOptionsContainer = document.getElementById('userOptionsContainer');
  var userIcon = document.getElementById('userIcon');

  // Toggle the userOptionsContainer display
  userIcon.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click event from reaching the document
    userOptionsContainer.style.display = (userOptionsContainer.style.display === 'none' || userOptionsContainer.style.display === '') ? 'block' : 'none';
  });

  // Close the userOptionsContainer when clicking anywhere outside of it
  document.addEventListener('click', function (event) {
    if (event.target !== userIcon && !userOptionsContainer.contains(event.target)) {
      userOptionsContainer.style.display = 'none';
    }
  });