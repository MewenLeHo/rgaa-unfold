(function () {
  // Remove existing elements and styles from previous executions
  function cleanup() {
    const existingStyle = document.querySelector('#unfold-styles');
    if (existingStyle) existingStyle.remove();
  }
  cleanup();

  // Initialize core variables
  // Create DocumentFragment for better performance
  const fragment = document.createDocumentFragment();

  // Messages configuration
  const messages = {
    ui: {
      openAll: 'Open All',
      closeAll: 'Close All',
    },
  };

  // Styles
  const style = document.createElement('style');
  style.id = 'unfold-styles';
  style.textContent = `
    .unfold-toggle {
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      background: #0d6efd;
      color: #fff;
      font-size: 1em;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
    }
    .unfold-toggle:hover {
      background: #1e1e1e !important;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .unfold-toggle {
        animation: fadeIn 0.5s ease-out;
      }
    }
    @media (prefers-color-scheme: dark) {
      .unfold-toggle {
        background: #1e1e1e;
        color: #f0f0f0
      }
    }
  `;
  fragment.appendChild(style);

  //Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.textContent = `${messages.ui.openAll}`;
  toggleButton.className = 'unfold-toggle';
  fragment.appendChild(toggleButton);

  function toggleAccordions() {
    // Get all accordions
    const accordions = document.querySelectorAll('.fr-accordion__title');

    // Get all accordions state
    const isOpen = Array.from(accordions).some(
      (accordion) => accordion.getAttribute('aria-expanded') === 'true'
    );

    // Toggle accordions
    accordions.forEach((accordion) => {
      accordion.click();
    });

    // Update toggle button after each click
    const allOpen = !isOpen;
    toggleButton.textContent = allOpen
      ? messages.ui.closeAll
      : messages.ui.openAll;
  }

  // Add event to toggle button
  toggleButton.addEventListener('click', toggleAccordions);

  // Add complete fragment to DOM
  requestAnimationFrame(() => {
    document.body.insertBefore(fragment, document.body.firstChild);
  });
})();
