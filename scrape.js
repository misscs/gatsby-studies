const fs = require("fs")
const request = require("request")
const { get } = require("lodash")

let posts = []

// Write local json file
const saveJSON = _ =>
  fs.writeFileSync(`./data/posts.json`, JSON.stringify(posts, "", 2))

const getPosts = () => {
  let url = `https://jsonplaceholder.typicode.com/posts`

  request(url, { encoding: `utf8` }, (err, res, body) => {
    if (err) console.log(`error: ${err}`)

    console.log('Request successful, parsing json')
    body = JSON.parse(body)

    body.map(item => {
      // Parse item to a simple object
      return {
        title: get(item, `title`),
        body: get(item, `body`),
      }
    })
    .forEach(item => {

      // Add item to posts
      posts.push(item)
      console.log(`Copied ${item.title} post`)

    })
    saveJSON()
    console.log('json file created and saved')
  })
}

getPosts()
