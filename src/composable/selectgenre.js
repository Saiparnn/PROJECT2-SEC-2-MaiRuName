const selectgenreComedy = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Comedy')
    )
  }
  const selectgenreHorror = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Horror')
    )
  }
  const selectgenreThriller = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Thriller')
    )
  }
  const selectgenreMystery = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Mystery')
    )
  }
  const selectgenreDrama = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Drama')
    )
  }
  const selectgenreAction = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Action')
    )
  }
  const selectgenreSciFi = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Sci-Fi')
    )
  }
  const selectgenreAnimation = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Animation')
    )
  }
  const selectgenreAdventure = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Adventure')
    )
  }
  const selectgenreFantasy = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Fantasy')
    )
  }
  const selectgenreCrime = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Crime')
    )
  }
  const selectgenreWar = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('War')
    )
  }
  const selectgenreOthers = (genre) => {
    genre.value = genre.value.filter(
      genre.value.includes('Others')
    )
  }
  
  export {selectgenreAction,selectgenreAdventure,selectgenreAnimation,selectgenreComedy,selectgenreCrime,selectgenreDrama,selectgenreFantasy,selectgenreHorror,selectgenreMystery,selectgenreOthers,selectgenreSciFi,selectgenreThriller,selectgenreWar }
