module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                '1/7': '14.285%'
            },
            borderWidth: {
                '1': '1px'
            },
            top: {
                '2': '8px',
                '4': '16px',
            }
        },
    },
    variants: {},
    plugins: [],
}