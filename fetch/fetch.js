          
                const observer = new MutationObserver(() => {
                    document.querySelectorAll("dji-sru").forEach(el => el.remove());
                });

                observer.observe(document.documentElement, { childList: true, subtree: true });

                
         document.getElementById("loadFetchButton").addEventListener("click", function() {
         
        const rawGitHubURL = document.getElementById("textbox").value; 

        fetch(rawGitHubURL)
            .then(response => response.text())
            .then(html => {
                const doc = document
                doc.open();
                doc.write(html);
                doc.close();
            })
            .catch(error => console.error("Error loading HTML:", error));
            })
            
