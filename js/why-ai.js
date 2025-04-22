document.addEventListener('DOMContentLoaded', () => {
    const topics = document.querySelectorAll('.research-topic');
    const contents = document.querySelectorAll('.research-content');
    const backButtons = document.querySelectorAll('.back-button');
  
    topics.forEach(topic => {
      topic.addEventListener('click', () => {
        const targetId = topic.getAttribute('data-target');
        contents.forEach(content => content.classList.add('hidden'));
        document.getElementById(targetId).classList.remove('hidden');
        document.querySelector('.research-list').style.display = 'none';
      });
    });
  
    backButtons.forEach(button => {
      button.addEventListener('click', () => {
        contents.forEach(content => content.classList.add('hidden'));
        document.querySelector('.research-list').style.display = 'block';
      });
    });
  });

  const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

  