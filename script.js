(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const backToTop = document.querySelector('.back-to-top');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('year').textContent = new Date().getFullYear();

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navItems.forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }));

  // Reveal sections gently as they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Active navigation and back-to-top state.
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(section => sectionObserver.observe(section));

  const updateScrollControls = () => backToTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateScrollControls, { passive: true });
  updateScrollControls();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  // Expandable experience cards.
  document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      button.querySelector('span:first-child').textContent = isExpanded ? 'Explore responsibilities' : 'Hide responsibilities';
      details.hidden = isExpanded;
    });
  });

  // Image placeholders gracefully turn into photos only when a file exists.
  document.querySelectorAll('[data-image]').forEach(placeholder => {
    const imageName = placeholder.dataset.image;
    const img = new Image();
    img.onload = () => {
      img.alt = imageName.replace(/[-.]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      placeholder.appendChild(img);
      placeholder.classList.add('has-image');
    };
    img.onerror = () => {}; // Keep the designed placeholder; never show a broken image icon.
    img.src = `public/images/${encodeURIComponent(imageName)}`;
  });

  const projects = {
    fpt: {
      title: 'FPT Automotive Tech Show',
      category: 'RECRUITMENT EVENT',
      organization: 'FPT Software',
      role: 'Event support',
      description: 'Supported event preparation and logistics for FPT Automotive Tech Show.',
      images: ['fpt-event-01.jpg', 'fpt-event-02.jpg']
    },
    quest: {
      title: 'Internal Engagement Activities',
      category: 'HR & EVENT SUPPORT',
      organization: 'Quest Global',
      role: 'HR event support',
      description: 'Helped organize internal engagement activities, prepared event materials, and designed posters.',
      images: ['quest-event-01.jpg', 'quest-poster-01.jpg']
    },
    volunteer: {
      title: 'Sunday Volunteer Campaign',
      category: 'MEDIA & COMMUNICATION',
      organization: 'HCMUTE',
      role: 'Head of Media Department',
      description: 'Participated in the Sunday Volunteer Campaign as Head of Media Department.',
      images: ['volunteer-media-01.jpg']
    },
    blood: {
      title: 'Voluntary Blood Donation',
      category: 'STUDENT ACTIVITIES',
      organization: 'HCMUTE',
      role: 'Head of Documentation Department',
      description: 'Participated in the Voluntary Blood Donation activity as Head of Documentation Department.',
      images: ['blood-donation-01.jpg']
    }
  };
  const modal = document.querySelector('.project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalOrganization = document.getElementById('modal-organization');
  const modalRole = document.getElementById('modal-role');
  const modalGallery = document.getElementById('modal-gallery');

  function openProject(key) {
    const project = projects[key];
    if (!project) return;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;
    modalOrganization.textContent = project.organization;
    modalRole.textContent = project.role;
    modalGallery.replaceChildren();
    project.images.forEach(name => {
      const placeholder = document.createElement('div');
      placeholder.className = 'photo-placeholder';
      placeholder.dataset.image = name;
      placeholder.innerHTML = '<div class="placeholder-content"><span class="image-symbol" aria-hidden="true">＋</span><span>Photo Coming Soon</span><small>Additional photo</small></div>';
      modalGallery.appendChild(placeholder);
      loadImageInto(placeholder, name);
    });
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }
  function loadImageInto(placeholder, name) {
    const img = new Image();
    img.onload = () => {
      img.alt = name.replace(/[-.]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      placeholder.appendChild(img);
      placeholder.classList.add('has-image');
    };
    img.onerror = () => {};
    img.src = `public/images/${encodeURIComponent(name)}`;
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
  document.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });
})();
