import Link from 'next/link';
import * as fs from 'fs';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';


const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allblogs);
  const [count, setCount] = useState(2);

  const fetchMoreData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
    setCount(count + 2)
    let data = await d.json()
    setBlogs(data)
  };
  return (
    <div>
      <main className={styles.main}>
        <h2>Latest Blog</h2>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreData}
          hasMore={props.allcount !== blogs.length}
          loader={<h4>Loading...</h4>}
        >
          {blogs.map((val) => {
            return (
              <div key={val.title}>
                <Link href={`blogpost/${val.title}`}>
                  <h3 className={styles.blogitemh3}>{val.title}</h3></Link>
                <p>{val.content}</p>
              </div>
            )
          })}
        </InfiniteScroll>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogData")
  let allblogs = []
  let allcount = data.length;
  let file;
  for (let index = 0; index < 2; index++) {
    const element = data[index];
    file = await fs.promises.readFile(('blogData/' + element), "utf-8")
    allblogs.push(JSON.parse(file));
  }
  return {
    props: { allblogs, allcount }, // will be passed to the page component as props
  }
}

// export async function getServerSideProps(context) {
//   let data = await fs.promises.readdir("blogData")
//   let allblogs = []
//   let file;
//   for (let index = 0; index < data.length; index++) {
//     const element = data[index];
//     file = await fs.promises.readFile(('blogData/' + element), "utf-8")
//     allblogs.push(JSON.parse(file));
//   }
//   // let data = await fetch('http://localhost:3000/api/blogs')
//   // let allblogs = await data.json()
//   // .then((a) => {
//   //   return a.json();
//   // }).then((parsed) => {
//   //   setBlogs(parsed);
//   // })
//   return {
//     props: { allblogs }, // will be passed to the page component as props
//   }
// }

export default Blog;