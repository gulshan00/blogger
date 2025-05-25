// bloggie-sponsor.js
(function () {
  const categoryId = document.currentScript.getAttribute('data-category-id') || 'default';

  const container = document.createElement('div');
  container.className = 'cl-bloggie-sponsor';
  container.style.cssText = `
    font-family: 'Open Sans', sans-serif;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    padding: 20px;
    margin: 16px 0;
    max-width: 500px;
  `;

  container.innerHTML = `
    <h3 style="font-family: 'Lora', serif; color: var(--primary-indigo, #3F51B5); margin-bottom: 12px;">Sponsor This Category</h3>
    <p style="margin-bottom: 16px;">Support the bloggers in this category and gain exposure for your brand. Sponsorships are $1,000.</p>
    <input id="partnerName" placeholder="Your Name" style="width:100%; padding:8px; margin-bottom:8px;" />
    <input id="contactEmail" placeholder="Your Email" style="width:100%; padding:8px; margin-bottom:12px;" />
    <button id="sponsorNowBtn" style="
      background: var(--primary-indigo, #3F51B5);
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
    ">Sponsor Now</button>
    <div id="toast" style="margin-top:12px; font-size:14px;"></div>
  `;

  document.body.appendChild(container);

  document.getElementById('sponsorNowBtn').addEventListener('click', async () => {
    const name = document.getElementById('partnerName').value;
    const email = document.getElementById('contactEmail').value;
    const toast = document.getElementById('toast');

    if (!name || !email) {
      toast.textContent = 'Please fill out all fields.';
      toast.style.color = 'red';
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/bloggie-sponsor-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, partnerName: name, contactEmail: email })
      });

      if (res.ok) {
        toast.textContent = 'Thank you! We’ll be in touch soon.';
        toast.style.color = 'green';
      } else {
        const error = await res.json();
        toast.textContent = error.error || 'Submission failed. Try again.';
        toast.style.color = 'red';
      }
    } catch (err) {
      toast.textContent = 'Network error. Please try later.';
      toast.style.color = 'red';
    }
  });
})();
