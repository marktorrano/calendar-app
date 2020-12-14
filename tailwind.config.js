module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                '1/7': '14.285%'
            }
        },
    },
    variants: {},
    plugins: [],
}