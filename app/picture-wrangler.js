export default function downscaleImage (imageURL, size='-small') {
  return imageURL.replace('.jpg', `${size}.jpg`)
}