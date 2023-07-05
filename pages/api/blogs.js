// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default async function handler(req, res) {
  let data = await fs.promises.readdir("blogData")
  data = data.slice(0, parseInt(req.query.count))
  let allBlogs = []
  let file;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    file = await fs.promises.readFile(('blogData/' + element), "utf-8")
    allBlogs.push(JSON.parse(file));
  }
  res.status(200).json(allBlogs)
}
