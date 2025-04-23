
// Add interactivity here if needed
// Example: Expand sidebar on hover
const sidebar = document.querySelector('.sidebar');
sidebar.addEventListener('mouseenter', () => {
  sidebar.style.width = '200px';
});
sidebar.addEventListener('mouseleave', () => {
  sidebar.style.width = '80px';
});