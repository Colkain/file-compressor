import Head from "next/head";
import { useEffect, useState } from "react";
import DropZone from "../components/dom/DropZone";
import Table from "../components/dom/Table";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    resolution: 1080,
    quality: 90,
    blur: true,
  });

  const handleFiles = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      Promise.all(
        files.map(async (file, i) => {
          let f = files;
          f[i] = { ...file, status: "Loading" };
          setFiles([...f]);
          let formData = new FormData();
          formData.append("file", file.file);
          formData.append("resolution", form.resolution);
          formData.append("quality", form.quality);
          formData.append("blur", form.blur);
          const requestOptions = {
            method: "POST",
            body: formData,
          };
          const res = await fetch(
            `http://localhost:3001/api/files/`,
            requestOptions
          );
          const data = await res.json();
          f[i] = { ...file, status: data.alert };
          setFiles([...f]);
        })
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen flex flex-col justify-center items-center">
        {files.length === 0 ? (
          <DropZone files={files} setFiles={setFiles} />
        ) : (
          <Table files={files} />
        )}
        <form className="my-10" onSubmit={handleFiles}>
          <div className="w-52 flex justify-between items-center">
            <label className="capitalize">
              <b>Resolution:</b>
            </label>
            <select
              className="order rounded-md py-1 px-2 bg-black"
              value={form.resolution}
              onChange={(e) => setForm({ ...form, resolution: e.target.value })}
            >
              <option value={1080}>1080p</option>
              <option value={720}>720p</option>
              <option value={420}>420p</option>
              <option value={360}>360p</option>
            </select>
          </div>
          <div className="w-52 flex justify-between items-center">
            <label className="capitalize">
              <b>Quality:</b>
            </label>
            <input
              className="border rounded-md py-1 px-2 bg-black"
              required
              type="number"
              min={10}
              max={100}
              value={form.quality}
              onChange={(e) => setForm({ ...form, quality: e.target.value })}
            />
          </div>
          <div className="w-52 flex justify-between items-center">
            <label className="capitalize">
              <b>Create blur image:</b>
            </label>
            <input
              className="border rounded-md py-1 px-2 bg-black"
              type="checkbox"
              checked={form.blur}
              onChange={(e) => setForm({ ...form, blur: e.target.checked })}
            />
          </div>
          <button
            type="submit"
            className={`px-2 py-1 uppercase border rounded-md
          ${
            files.length === 0
              ? "border-gray-200  bg-gray-200 cursor-not-allowed text-gray-500"
              : "border-white hover:bg-white hover:text-black cursor-pointer"
          }`}
            onClick={handleFiles}
            disabled={files.length === 0}
          >
            Compress
          </button>
        </form>
      </main>
    </div>
  );
}
