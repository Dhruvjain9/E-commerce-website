window.addEventListener("load", function () {
    document.getElementById("loading-screen").style.display = "none";
});

// Function to change the language of content
function changeLanguage() {
    const selectedLanguage = document.getElementById("language-select").value;
    const elementsToTranslate = document.querySelectorAll('[data-lang]');

    elementsToTranslate.forEach(element => {
        element.style.display = "none";
    });

    elementsToTranslate.forEach(element => {
        if (element.getAttribute("data-lang") === selectedLanguage) {
            element.style.display = "block";
        }
    });
}

// Function to handle language change when the dropdown selection changes
function changeLanguageOnChange() {
    changeLanguage();
}

// Add an event listener to the language dropdown
document.getElementById("language-select").addEventListener("change", changeLanguageOnChange);

// Initial call to set the language based on the dropdown selection
changeLanguage();



function openSidebar() {
    document.querySelector(".sidebar.right").style.width = "250px";
    document.querySelector(".sidebar.right").style.right = "0";
    document.getElementById("open-sidebar").style.visibility = "hidden";

}

function closeSidebar() {
    document.querySelector(".sidebar.right").style.width = "0";
    document.querySelector(".sidebar.right").style.right = "-250px";
    document.getElementById("open-sidebar").style.visibility = "visible";

}

