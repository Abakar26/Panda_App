import * as fs from 'fs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    let file = await fs.promises.readdir('contactdata');
    fs.promises.writeFile(`contactdata/${file.length + 1}.json`, JSON.stringify(req.body))
    res.status(200).json(req.body)
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'This is my api routes' })
  }
}