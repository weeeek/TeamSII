import jQuery from 'jquery'

export function post (url, data, fn) {
  jQuery.post(url, data, function (response) {
    fn(response)
  })
}

export default function get (url, data, fn) {
  jQuery.post(url, data, function (response) {
    fn(response)
  })
}

export function jsonp (url, data, fn) {
  jQuery.jsonp(url, data, function (response) {
    fn(response)
  })
}
