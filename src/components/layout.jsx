import * as React from 'react'
import { Link } from 'gatsby'
import {
  allTagsTable,
  body,
  left,
  pageTaggedWith,
  right,
  siteTitle,
  allTagsTagTotalCount,
  pageSubtitle as pageSubtitleStyle
} from './layout.module.css'
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTags } from "../hooks/use-tags"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faLink)

const Layout = ({ children, pageTitle, pageSubtitle, taggedWith }) => {
  const { title } = useSiteMetadata()
  const allTags = useTags()

  return (
    <div className={body}>
      <div className={left}>
        <h1 className={siteTitle}>{title}</h1>
        <table className={allTagsTable}>
          <tbody>
            {allTags.map(_ => <tr key={_.fieldValue}>
              <td><Link to={"/tag/" + _.fieldValue}>{_.fieldValue}</Link>{" "}</td>
              <td className={allTagsTagTotalCount}>{_.totalCount}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div className={right}>
        <header>
          <h2>{pageTitle}</h2>
          {pageSubtitle && <h3 className={pageSubtitleStyle}>————&nbsp;{pageSubtitle}</h3>}
          {taggedWith && <div className={pageTaggedWith}>tags: {taggedWith.sort().join(", ")}</div>}
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout