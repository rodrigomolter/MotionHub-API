import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  #videos = new Map()

  list(search){
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data
        }
      })
      .filter(video => {
        if (search) {
          return video.title.includes(search)
        }

        return true
      })
  }

  get(videoId){
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data
        }
      })
      .filter(video => {
        if (videoId) {
          return video.id === videoId
        }

        return true
      })
  }

  create(video){
    return this.update(randomUUID(), video)
  }

  update(videoId, video){
    this.#videos.set(videoId, video)
    return this.get(videoId)
  }

  delete(videoId){
    this.#videos.delete(videoId)
  }
}