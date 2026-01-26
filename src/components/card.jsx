import {content, inlineLinks, linkText, linksList} from './card.module.css'

import {FaBandcamp} from "react-icons/fa6"
import {FaInstagram} from "react-icons/fa6"
import {FaRedditAlien} from "react-icons/fa6"
import {FaSoundcloud} from "react-icons/fa6"
import {FaSpotify} from "react-icons/fa6"
import {FaWikipediaW} from "react-icons/fa6"
import {FaYoutube} from "react-icons/fa6"

import {FaLink} from "react-icons/fa6"

let k = 0

const makeURL = (item) => {
    return <a key={k++} href={item.u} target="_blank" rel="noreferrer">
        <span className={linkText}>{item.l || item.u.replace('https://www.reddit.com', '')}</span>
    </a>
}

const SIZE = 17

function makeInlineLinks(item, getSubLinksLabel = false) {
    const links = []

    if (item.hasOwnProperty("bc"))
        links.push(
            <a key={k++} href={item.bc} target="_blank" rel="noreferrer">
                <FaBandcamp size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("in"))
        links.push(
            <a key={k++} href={item.in} target="_blank" rel="noreferrer">
                <FaInstagram size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("re"))
        links.push(
            <a key={k++} href={item.re} target="_blank" rel="noreferrer">
                <FaRedditAlien size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("sc"))
        links.push(
            <a key={k++} href={item.sc} target="_blank" rel="noreferrer">
                <FaSoundcloud size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("sp"))
        links.push(
            <a key={k++} href={item.sp} target="_blank" rel="noreferrer">
                <FaSpotify size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("wp"))
        links.push(
            <a key={k++} href={item.wp} target="_blank" rel="noreferrer">
                <FaWikipediaW size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("yt"))
        links.push(
            <a key={k++} href={item.yt} target="_blank" rel="noreferrer">
                <FaYoutube size={SIZE}/>
            </a>
        )
    if (item.hasOwnProperty("u") && Object.keys(item).length >= 2) {
        links.unshift(
            <a key={k++} href={item.u} target="_blank" rel="noreferrer">
                <><FaLink size={SIZE}/>{getSubLinksLabel && <span className={linkText}>({item.l})</span>}</>
            </a>
        )
    }

    if (links.length > 0) return links
}

function makeListOfLinks(item) {
    let key = 0
    return <ul>{item.links.map(item => <li key={key++}>{makeURL(item)}</li>)}</ul>
}

function makeContent(c, depth) {
    const content = []

    if (c.hasOwnProperty("t")) {
        switch (depth) {
            case 1:
                content.push(<h3 key={k++}>{c.t}</h3>)
                break
            case 2:
                content.push(<h4 key={k++}>{c.t}</h4>)
                break
            case 3:
                content.push(<h5 key={k++}>{c.t}</h5>)
                break
            case 4:
                content.push(<h6 key={k++}>{c.t}</h6>)
                break
            default:
        }
    }

    if (c.hasOwnProperty("i")) {
        content.push(
            <ul key={k++}>
                {c.i.map(item => {
                    return (
                        <li key={k++}>
                            {item.l && <span>{item.l}</span>}
                            {(!(item.hasOwnProperty("u") && Object.keys(item).length === 1)) &&
                                <span key={k++} className={inlineLinks}>
                {makeInlineLinks(item)}
              </span>}
                            {(item.hasOwnProperty("u") && Object.keys(item).length === 1) && <span>
                {makeURL(item)}
              </span>}
                            {item.hasOwnProperty('links') && <div className={linksList}>
                                {makeListOfLinks(item)}
                            </div>}
                            {item.hasOwnProperty("i") && (
                                <ul key={k++}>
                                    {item.i.map(subitem => {
                                        return (
                                            <li key={k++}>
                                                <a href={subitem.u} target="_blank" rel="noreferrer">
                                                    {subitem.l || subitem.u}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        )
    }

    if (c.hasOwnProperty("s")) {
        for (const s of c.s) {
            content.push(...makeContent(s, depth + 1))
        }
    }

    return content
}

export default function ({card}) {
    return <div className={content}>{makeContent(card.data, 0)}</div>
}