"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState();
  const [image, setImage] = useState()

  const handlerChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    try {
      const form = new FormData()
      form.set("file", file)

      //sending file to server
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form
      })

      if (res.ok) {
        const data = await res.json()
        setImage(data.message);
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4">Upload a file</h1>
        <form onSubmit={handlerSubmit}>

          <input className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2" type="file" onChange={handlerChangeFile} />

          <button className="bg-green-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50" disabled={!file}>
            Upload</button>
        </form>
        {
          image && (<img className="w-64 h-64 object-cover mx-auto" src={image} alt="upload file" />)

        }
      </div>
    </div>
  );
}
