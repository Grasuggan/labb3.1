import React from 'react'
import Layout from '../../components/sharedLayout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/info'
import Date from '../../components/date'
import Head from 'next/head'
import styles from '../../styles/layout.module.css'
import Link from 'next/link'

export async function getStaticProps({ params }) {
      const studentData = await getPostData(params.student)
    
  return {
    props: {
      studentData
    }
  }
}

export async function getStaticPaths() {
   const paths = getAllPostIds()
 
 
  return {
    paths,
    fallback: false
  }
}


export default function Students({ studentData }) {
    return (
      <Layout>
        <Head>
          <title>{studentData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{studentData.title}</h1>
          <div className={utilStyles.lightText}>
            <strong>Date of birth:</strong> <Date dateString={studentData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: studentData.contentHtml }} />
        </article>
        <div className={styles.backToHome}>
          <Link href="/students/allStudents">
            <a>← Back to students</a>
          </Link>
        </div>
      </Layout>
    )
  }