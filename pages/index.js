import React from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/sharedLayout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/layout.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          This is a catalogue of courses and students
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Education catalogue</h2>
        <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.blue}>
            <Link href="/courses/courses">
              <a>Show all courses</a>
              </Link>
              </div>
              <div className={styles.link}>
              <Link href="/students/allStudents">
              <a>Show all students</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}