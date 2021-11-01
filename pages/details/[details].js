import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head'

function details({characterDetails}) {

    const router = useRouter()
    const { details } = router.query
    const [expanded, setExpanded] = useState(false);
    console.log(characterDetails)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Marvel Character Details</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-200">
          
        {/*<div onClick={() => setExpanded(!expanded)} className="flex flex-col p-3 border-b border-2 text-gray-light cursor-pointer">
        <div className="flex flex-row items-center">
            <h1 className={`flex-auto hover:text-red-600 ${expanded ? "text-gray-dark font-black" : "font-large"}`}>Comics</h1>

            <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-5 w-5 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
    <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expanded ? "max-h-20" : "max-h-0"}`}></div>
    </div>
*/}
            
        <section className="container mx-auto p-10 md:py-20 px-5 md:p-10 md:px-0">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {
            characterDetails.data.results.map((comic) => {
              return (
                <article className="mx-auto pb-5 max-w-sm transform duration-500 rounded-t-3xl hover:-translate-y-1 cursor-pointer group">
                  <div className="max-h-125 overflow-hidden rounded-t-3xl">
                      <img className="transform duration-300 group-hover:scale-110" src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt=""/>
                  </div>

                  <div className="flex justify-between my-5 ">
                      <div className="text-red-600 text-base font-semibold">Comics</div>
                      <div className="text-base text-right group-hover:text-red-600"><span className="font-bold">Test</span></div>
                  </div>

                  <h2 className="font-bold mt-4 text-2xl group-hover:text-red-600">{comic.title}</h2>

                </article>
              )
            })
          }
          </section>
        </section>



        
        
        </main>  
          
          {/*<section className="container mx-auto p-10 md:py-20 px-5 md:p-10 md:px-0">
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
           
            </section>
          </section>
    */}
        <footer className="flex items-center justify-center w-full h-24 border-t">
            <a href="https://marvel.com">Data provided by Marvel. © 2021 MARVEL {''}
            </a>
        </footer>
      </div>
    )
}

export async function getStaticPaths() {
    // Get the paths we want to pre-render based on search
    const timeStamp = (new Date().getTime()).toString()
    const privateKey = "b9994e28247025a62bf1292bb8a6d5e60c0db974"
    const publicKey = "b680f2f78c64fca3acc49aca859fd4ed"
    var md5 = require('md5');
    const hashKey = md5(timeStamp + privateKey + publicKey)
    const response = await fetch("https://gateway.marvel.com/v1/public/characters?apikey=b680f2f78c64fca3acc49aca859fd4ed&hash=" + hashKey + "&ts=" + timeStamp)
    const characterDetails = await response.json()
   
    const paths = characterDetails.data.results.map((details) => ({
        params: { details: details.id.toString()}
    }))
   
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false}
  }

export async function getStaticProps({params}) {
    const timeStamp = (new Date().getTime()).toString()
    const privateKey = "b9994e28247025a62bf1292bb8a6d5e60c0db974"
    const publicKey = "b680f2f78c64fca3acc49aca859fd4ed"
    var md5 = require('md5');
    const hashKey = md5(timeStamp + privateKey + publicKey)
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${params.details}/comics?apikey=b680f2f78c64fca3acc49aca859fd4ed&hash=` + hashKey + `&ts=` + timeStamp)
    const characterDetails = await response.json()
  
    return {
      props: {
        characterDetails,
      }
    }
}

export default details
