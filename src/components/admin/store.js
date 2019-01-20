import Posts from './posts/store'
import Media from './media/store'
export default  {
  modules: {
    posts: Posts,
    media: Media,
  },
  namespaced: true
}