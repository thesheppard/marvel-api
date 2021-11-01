import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Home({ characters }) {

  console.log(characters);
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Marvel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-200">
        <section className="container mx-auto p-10 md:py-20 px-5 md:p-10 md:px-0">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {
            characters.data.results.map((person) => {
              return (
                <article onClick={() => router.replace({ pathname: '/details/[details]', query: { details: person.id}})} className="mx-auto pb-5 max-w-sm transform duration-500 rounded-t-3xl hover:-translate-y-1 cursor-pointer group">
                  <div className="max-h-125 overflow-hidden rounded-t-3xl">
                      <img className="transform duration-300 group-hover:scale-110" src={person.thumbnail.path + "." + person.thumbnail.extension} alt=""/>
                  </div>

                  <div className="flex justify-between my-5 ">
                      <div className="text-red-600 text-base font-semibold">Comics</div>
                      <div className="text-base text-right group-hover:text-red-600"><span className="font-bold">{person.comics.available}</span></div>
                  </div>

                  <h2 className="font-bold mt-4 text-2xl group-hover:text-red-600">{person.name}</h2>

                </article>
              )
            })
          }
          </section>
        </section>
        
        
        


        
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
          <a href="https://marvel.com">Data provided by Marvel. © 2021 MARVEL {''}
          </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const timeStamp = (new Date().getTime()).toString()
  const privateKey = "b9994e28247025a62bf1292bb8a6d5e60c0db974"
  const publicKey = "b680f2f78c64fca3acc49aca859fd4ed"
  var md5 = require('md5');
  const hashKey = md5(timeStamp + privateKey + publicKey)
  const response = await fetch("https://gateway.marvel.com/v1/public/characters?apikey=b680f2f78c64fca3acc49aca859fd4ed&hash=" + hashKey + "&ts=" + timeStamp)
  const characters = await response.json()

  return {
    props: {
      characters,
    }
  }
}
