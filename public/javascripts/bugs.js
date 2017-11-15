document.addEventListener('DOMContentLoaded', function() {
  const loadBugs = function() {
    const bugs = window.localStorage.getItem('bugs') || '{}';

    return JSON.parse(bugs);
  }

  const saveBug = function(source) {
    const bugs = loadBugs();

    bugs[source] = 1;

    window.localStorage.setItem('bugs', JSON.stringify(bugs));

    return bugs;
  }

  const uncoverBug = function(source) {
    const bugs = saveBug(source);

    setBugs(bugs);
  }

  const setBugs = function(bugs) {
    const html = Object.entries(bugs).map((bug, count) => {
      return `
      <div class="image-container">
        <img alt-text="bug-image" src="images/bug.svg">
      </div>
      `;
    });

    const trackerMeter = document.getElementById('tracker-meter');

    trackerMeter.innerHTML = html.join('');
  }

  setBugs(loadBugs());

  document.getElementById('cake-form').onsubmit = function(event) {
    const name = document.getElementById('name');
    const cakeType = document.querySelector('[name=cakeType]:checked');
    const fillings = document.querySelectorAll('[name=fillings]:checked');
    const size = document.querySelector('[name=size]');
    const pickUp = document.querySelector('[name=pickUp]');

    if (name.value == '') {
      const existingName = document.querySelector('#deliver-to span');

      if (existingName.textContent) {
        uncoverBug('name');
      }
    }

    if (cakeType && cakeType.value) {
      uncoverBug('cakeType');
    }

    if (fillings.length >= 2) {
      uncoverBug('fillings');
    }

    if (size.value === '0') {
      uncoverBug('size');
    }

    if (pickUp.value) {
      uncoverBug('pickUp');
    }
  }
});
