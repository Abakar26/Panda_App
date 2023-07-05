import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as fs from 'fs'
import styles from '../../styles/Blog.module.css'

const slug = (props) => {
  // const router = useRouter();
  // const { slug } = router.query;
  const [blog, setBlog] = useState(props.blog);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/getblogs?slug=${slug}`).then((a) => {
  //     return a.json();
  //   }).then((parsed) => {
  //     setBlog(parsed);
  //   })
  // }, [])
  return (
    <div className={styles.container}>
      <h1>Title of page :{blog && blog.title}</h1>
      <hr />
      <p>{blog && blog.content}</p>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'data' } }, { params: { slug: 'data2' } }],
    fallback: true
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  let blog = await fs.promises.readFile(`blogData/${slug}.json`, "utf-8")
  return {
    props: {
      blog: JSON.parse(blog)
    }
  }
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   console.log(slug)
//   let data = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`)
//   let blog = await data.json()
//   return {
//     props: { blog }, // will be passed to the page component as props
//   }
// }
export default slug;