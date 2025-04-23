
// Add interactivity here if needed
// Example: Button click event for follow/message buttons
document.querySelectorAll('.profile-button').forEach(button => {
    button.addEventListener('click', () => {
      alert(`You clicked: ${button.textContent}`);
    });
  });