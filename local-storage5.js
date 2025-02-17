// Function to cache HTML content with embedded JavaScript
function cacheHTMLWithJS(key, htmlContent) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(key, htmlContent);
        console.log("HTML with JavaScript cached!");
    } else {
        console.log("localStorage is not supported.");
    }
}

// Function to completely replace the page with cached content
function injectCachedHTMLWithJS(key) {
    const cachedHTML = localStorage.getItem(key);
    if (cachedHTML) {
        console.log("Offline and no service worker detected. Loading cached content...");

        // Replace the entire document with the cached HTML
        document.open();
        document.write(cachedHTML);
        document.close();
    } else {
        console.log("No cached HTML with JavaScript found.");
    }
}

// The HTML content to be cached
const htmlWithJS = `
<!DOCTYPE html>
        <html>
        <head>
            <title>School Loader</title>
            <style>
                .file-label {
                    display: block;
                    width: 100%;
                    height: 5px;
                    background-color: #007BFF;
                    color: white;
                    text-align: center;
                    padding: 15px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .file-label:hover {
                    background-color: #0056b3;
                }
                #fileInput {
                    display: none;
                }
            </style>
        </head>  
        <body>

            <label for="fileInput" class="file-label">Select an HTML File</label>
            <input type="file" id="fileInput" accept=".html">

            <script>
                // MutationObserver to remove Snap&Read iframes
                const observer = new MutationObserver(() => {
                    document.querySelectorAll("dji-sru").forEach(el => el.remove());
                });

                observer.observe(document.documentElement, { childList: true, subtree: true });

                let fileContent = "";

                document.getElementById("fileInput").addEventListener("change", function(event) {
                    const file = event.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = function(e) {
                        fileContent = e.target.result;

                        // Create the iframe and append it after file is selected
                        const iframe = document.createElement('iframe');
                        iframe.style.width = '100%';
                        iframe.style.height = '100vh';
                        iframe.style.border = 'none';
                        document.body.appendChild(iframe);

                        const doc = iframe.contentWindow.document;
                        doc.open();
                        doc.write(fileContent);
                        doc.close();
                        iframe.contentWindow.focus();
                    };
                    reader.readAsText(file);
                });
            <\/script>    

        </body> 
        </html>
`;

// Cache the HTML content
cacheHTMLWithJS('offlinePageWithJS', htmlWithJS);

// Function to check if a service worker is enabled
function isServiceWorkerEnabled() {
    return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
}

// Check conditions when the page loads
window.onload = function() {
    if (!navigator.onLine && !isServiceWorkerEnabled()) { 
        injectCachedHTMLWithJS('offlinePageWithJS'); // Now replaces entire page
    } else {
        console.log("Online or service worker is enabled. No need to load cache.");
    }
};
