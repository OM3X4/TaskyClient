/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Scan all React components
    ],
    theme: {
        extend: {
            colors:{
                "primary2": "#3e3e3e3"
            }
        },
    },
    plugins: [],
};
