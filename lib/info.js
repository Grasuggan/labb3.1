import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {ALL_COURSES_QUERY} from "../components/coursesList";
import { initializeApollo } from "./apolloClient";



  const postsDirectory = path.join(process.cwd(), 'info');

export function getAllPostIds() {

    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
      return {
        params: {
          student: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  export async function getPostData(student) {
    
    const fullPath = path.join(postsDirectory, `${student}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      student,
      contentHtml,
      ...matterResult.data
    }
  }


  export async function getAllCourses() {

    const apolloClient = initializeApollo();
  
    const allCoursesData = await apolloClient.query({
      query: ALL_COURSES_QUERY,
    });
  
    
    return allCoursesData.data.queryCourse.map(c => {
      return {
        params: {
          course: c.name,
        },
      } 
    })
  }