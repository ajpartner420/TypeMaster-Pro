(function () {

    const THEME_KEY = "tm_theme";

    function applyTheme(theme) {

        const dark = theme === "dark";

        document.body.classList.toggle("dark-mode", dark);

        const btn = document.getElementById("tmThemeBtn");

        if (btn) {

            btn.textContent = dark ? "☀️" : "🌙";

            btn.title = dark
                ? "Switch to Light Mode"
                : "Switch to Dark Mode";

            btn.setAttribute(
                "aria-label",
                btn.title
            );
        }
    }


    function getSavedTheme() {

        const saved =
            localStorage.getItem(THEME_KEY);

        if (
            saved === "dark" ||
            saved === "light"
        ) {
            return saved;
        }

        return window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
            ? "dark"
            : "light";
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

        applyTheme(next);
    };


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            applyTheme(
                getSavedTheme()
            );


            const currentPage =
                location.pathname
                    .split("/")
                    .pop() ||
                "index.html";


            document
                .querySelectorAll(
                    ".tm-menu a"
                )
                .forEach(function (link) {

                    const href =
                        link.getAttribute("href") ||
                        "";

                    const page =
                        href
                            .split("/")
                            .pop()
                            .split("?")[0];

                    if (
                        page === currentPage
                    ) {
                        link.classList.add(
                            "active"
                        );
                    }

                });

        }
    );

})();
