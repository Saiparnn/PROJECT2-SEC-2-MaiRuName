const getGenre = async () => {
    try {
        const res = await fetch('http://localhost:3000/movies')
        if (res.status === 200) {
            const movies = await res.json()
            return movies
        } else {
            throw new Error('This is something wrong, cannot read your movies data!')
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
export { getGenre }