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
            borderRadius: {
                '50': '50%'
            },
            top: {
                '2': '8px',
                '4': '16px',
            },
            right: {
                '2': '8px',
                '4': '16px',
            }
        },
    },
    variants: {},
    plugins: [],
}