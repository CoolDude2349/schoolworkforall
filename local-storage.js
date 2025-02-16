// Function to cache HTML content with js
function cacheHTMLWithJS(key, htmlContent) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(key, htmlContent);
        console.log("HTML with JavaScript cached!");
    } else {
        console.log("localStorage is not supported.");
    }
}


function injectCachedHTMLWithJS(key) {
    const cachedHTML = localStorage.getItem(key);
    if (cachedHTML) {
        console.log("HTML with JavaScript retrieved from cache.");

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cachedHTML;

        document.body.appendChild(tempDiv);

        const scripts = tempDiv.querySelectorAll("script");
        scripts.forEach(script => {
            const newScript = document.createElement("script");
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);  
        });
    } else {
        console.log("No cached HTML with JavaScript found.");
    }
}

// HTML content with embedded JavaScript to be cached
const htmlWithJS = `
    <html>
    <head>
        <title>School Loader</title>
        <style>
            .file-label { display: block; width: 100%; height: 5px; background-color: #007BFF; color: white; text-align: center; padding: 15px; font-size: 1.2rem; cursor: pointer; border-radius: 5px; }
            .file-label:hover { background-color: #0056b3; }
            #fileInput { display: none; }
        </style>
    </head>
    <body>
        <label for="fileInput" class="file-label">Select an HTML File</label>
        <input type="file" id="fileInput" accept=".html">
        <script>
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
        </script>
    </body>
    </html>
`;

// Cache the HTML with JavaScript
cacheHTMLWithJS('offlinePageWithJS', htmlWithJS);

// Check if the user is offline and inject cached HTML
window.onload = function() {
    if (!navigator.onLine) { // This checks if the user is offline
        console.log("User is offline. Loading cached content...");
        injectCachedHTMLWithJS('offlinePageWithJS');
    } else {
        console.log("User is online. No need to load cached content.");
    }
};
