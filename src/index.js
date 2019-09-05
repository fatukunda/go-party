import app from './app'

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8000
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`)
})
