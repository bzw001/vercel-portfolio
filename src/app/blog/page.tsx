import React from "react";
import { Image, Divider } from "@nextui-org/react";
import Link from 'next/link'
import './page.css'
import listJson from './list.json'

// clip-path
const RADICAL_3 = 1.7320508;
export default function App() {
  const width = 200;
  const height = 2 * Math.ceil(width / RADICAL_3);
  const style = { width, height }

  const list = (listJson as any[]).reduce((r, item, index) => {
    if (index === 0 || index % 4 === 0) r.push([])
    const lIdx = Math.floor(index / 4)
    r[lIdx].push((
      <Link href={`/blog/detail/${item.index}`}>
        <div className="w-comb relative m-[10px] opacity-60 hover:opacity-100 cursor-pointer" style={style}>
          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[230px]"
            src={item.imgSrc}
            width={width}
            height={height}
          />
          <div className="absolute top-20 z-50">
            <h4 className="font-bold text-large text-center text-white">{item.title}</h4>
          </div>
          <div className="w-comb-border"></div>
        </div>
      </Link>
    )
    )
    return r
  }, [])
  return (
    <div className="h-screen bg-[#282C33] flex justify-center">
      <div>
        <div><span className="text-[#C778DD]">#</span><span className="text-white font-bold">Blog</span></div>
        <div className="list" >
          {
            list.map(i => (
              <div className="flex">{...i}</div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
