import Image from 'next/image'
import PocketBase from 'pocketbase'

export const dynamic = 'force-dynamic'

async function getNotes() {
  const pb = new PocketBase('http://127.0.0.1:8090');

  const data = await pb.collection('notes').getList();
  console.log(data)
  return data
}

export default async function Home() {
  const {items: notes} = await getNotes()

  return (
    <main className='py-5 px-10'>
      <h1 className='font-semibold text-3xl'>Notes</h1>
      <div className="grid grid-cols-5 gap-3 py-5 border">
        {notes.map((note) => (
          <div key={note.id} className='bg-yellow p-2 flex flex-col gap-5 shadow-md h-52'>
            <h3 className='font-semibold text-xl'>{note.title}</h3>
            <p className='break-words'>{note.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
