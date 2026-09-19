(function () {

    const THEME_KEY = "tm_theme";

    function applyTheme(theme) {

        const dark = theme === "dark";

        document.body.classList.toggle("dark-mode", dark);

        const btn =
            document.getElementById("tmThemeBtn") ||
            document.getElementById("themeBtn");

        if (btn) {
            btn.textContent = dark ? "☀️" : "🌙";

            btn.title = dark
                ? "Switch to Light Mode"
                : "Switch to Dark Mode";
        }
    }

    function getSavedTheme() {

        let saved =
            localStorage.getItem(THEME_KEY);

        /* Old TypeMaster Pro dark mode */
        if (!saved) {

            const old =
                localStorage.getItem("darkMode");

            if (old === "1") {
                saved = "dark";
            }
            else if (old === "0") {
                saved = "light";
            }
        }

        if (
            saved === "dark" ||
            saved === "light"
        ) {
            return saved;
        }

        return "light";
    }

    window.toggleTMTheme = function () {

        const next =
            document.body.classList.contains("dark-mode")
                ? "light"
                : "dark";

        localStorage.setItem(
            THEME_KEY,
            next
        );

        /* Keep old setting synchronized */
        localStorage.setItem(
            "darkMode",
            next === "dark" ? "1" : "0"
        );

        applyTheme(next);
    };

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            applyTheme(getSavedTheme());

            const currentPage =
                location.pathname
                    .split("/")
                    .pop() ||
                "index.html";

            document
                .querySelectorAll(".tm-menu a")
                .forEach(function (link) {

                    const href =
                        link.getAttribute("href") || "";

                    const page =
                        href
                            .split("/")
                            .pop()
                            .split("?")[0];

                    if (page === currentPage) {
                        link.classList.add("active");
                    }

                });

        }
    );

})();
