document.addEventListener('DOMContentLoaded', () => {
  // Find all links to render.com
  const renderLinks = document.querySelectorAll('a[href*="onrender.com"]');
  
  renderLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the URL from the link
      const targetUrl = this.getAttribute('href');
      
      // Create the modal container
      const modal = document.createElement('div');
      modal.className = 'render-redirect-modal';
      modal.innerHTML = `
        <div class="render-redirect-content">
          <h3>Redirecting to Render.com</h3>
          <p>You'll be redirected to a live demo hosted on Render's free tier.</p>
          <p>Please note that the site may take <strong>30-60 seconds</strong> to spin up if it hasn't been accessed recently.</p>
          <div class="render-redirect-spinner"></div>
          <div class="render-redirect-actions">
            <button class="redirect-continue">Continue</button>
            <button class="redirect-cancel">Cancel</button>
          </div>
        </div>
      `;
      
      // Append modal to body
      document.body.appendChild(modal);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .render-redirect-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-in-out;
        }
        
        .render-redirect-content {
          background-color: var(--background-color, #fff);
          color: var(--text-color, #222);
          border-radius: 8px;
          padding: 1.5rem;
          max-width: 450px;
          width: 90%;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .render-redirect-content h3 {
          margin-top: 0;
          font-size: 1.25rem;
        }
        
        .render-redirect-content p {
          margin: 0.75rem 0;
          line-height: 1.5;
        }
        
        .render-redirect-spinner {
          margin: 1.25rem auto;
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-top-color: var(--accent-color, #3b82f6);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .render-redirect-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        
        .render-redirect-actions button {
          background-color: var(--accent-color, #3b82f6);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-weight: 500;
        }
        
        .render-redirect-actions button.redirect-cancel {
          background-color: transparent;
          color: var(--text-color, #222);
          border: 1px solid var(--border-color, #ddd);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Dark mode adjustments */
        .dark .render-redirect-content {
          background-color: var(--background-color, #1a1a1a);
          color: var(--text-color, #f5f5f5);
        }
        
        .dark .render-redirect-spinner {
          border-color: rgba(255, 255, 255, 0.1);
          border-top-color: var(--accent-color, #3b82f6);
        }
        
        .dark .render-redirect-actions button.redirect-cancel {
          color: var(--text-color, #f5f5f5);
          border: 1px solid var(--border-color, #444);
        }
      `;
      document.head.appendChild(style);
      
      // Handle button clicks
      document.querySelector('.redirect-continue').addEventListener('click', () => {
        window.location.href = targetUrl;
      });
      
      document.querySelector('.redirect-cancel').addEventListener('click', () => {
        modal.remove();
        style.remove();
      });
    });
  });
});