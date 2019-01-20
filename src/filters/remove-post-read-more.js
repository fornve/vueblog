export default (text) => {
  if(!text) return ''
  return text.replace('<!--more-->', '')
}