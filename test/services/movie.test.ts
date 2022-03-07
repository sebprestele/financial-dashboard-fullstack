import Movie from '../../src/models/Movie'
import MovieService from '../../src/services/movie'
import connect, { MongodHelper } from '../db-helper'

const nonExistingMovieId = '5e57b77b5744fa0b461c7906'

async function createMovie() {
  const movie = new Movie({
    name: 'Shrek 3',
    publishedYear: 2011,
    genres: ['Animation'],
    duration: 90,
    characters: ['Shrek', 'Fiona'],
  })
  return await MovieService.create(movie)
}

describe('movie service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a movie', async () => {
    const movie = await createMovie()
    expect(movie).toHaveProperty('_id')
    expect(movie).toHaveProperty('name', 'Shrek 3')
    expect(movie).toHaveProperty('duration', 90)
  })

  it('should get a movie with id', async () => {
    const movie = await createMovie()
    const found = await MovieService.findById(movie._id)
    expect(found.name).toEqual(movie.name)
    expect(found._id).toEqual(movie._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing movie', async () => {
    expect.assertions(1)
    return MovieService.findById(nonExistingMovieId).catch((e) => {
      expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`)
    })
  })

  it('should update an existing movie', async () => {
    const movie = await createMovie()
    const update = {
      name: 'Shrek',
      publishedYear: 2001,
    }
    const updated = await MovieService.update(movie._id, update)
    expect(updated).toHaveProperty('_id', movie._id)
    expect(updated).toHaveProperty('name', 'Shrek')
    expect(updated).toHaveProperty('publishedYear', 2001)
  })

  it('should not update a non-existing movie', async () => {
    expect.assertions(1)
    const update = {
      name: 'Shrek',
      publishedYear: 2001,
    }

    return MovieService.update(nonExistingMovieId, update).catch((e) => {
      expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`)
    })
  })

  it('should delete an existing movie', async () => {
    expect.assertions(1)
    const movie = await createMovie()
    await MovieService.deleteMovie(movie._id)
    return MovieService.findById(movie._id).catch((e) => {
      expect(e.message).toBe(`Movie ${movie._id} not found`)
    })
  })
})
