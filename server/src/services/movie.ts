import Movie, { MovieDocument } from '../models/Movie'
import { NotFoundError } from '../helpers/apiError'

const create = async (movie: MovieDocument): Promise<MovieDocument> => {
  return movie.save()
}

const findById = async (movieId: string): Promise<MovieDocument> => {
  const foundMovie = await Movie.findById(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

const findAll = async (): Promise<MovieDocument[]> => {
  return Movie.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  movieId: string,
  update: Partial<MovieDocument>
): Promise<MovieDocument | null> => {
  const foundMovie = await Movie.findByIdAndUpdate(movieId, update, {
    new: true,
  })

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

const deleteMovie = async (movieId: string): Promise<MovieDocument | null> => {
  const foundMovie = Movie.findByIdAndDelete(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteMovie,
}
