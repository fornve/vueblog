export default (value) => {
  if(!value) return ''

  if(value.seconds) {
    value = value.seconds * 1000
  }

  let date = new Date(value)

  if(date) return date.toLocaleString()

  return value;

}