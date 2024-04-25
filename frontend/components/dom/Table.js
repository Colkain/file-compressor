function Table({ files }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-800 bg-gray-900 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Filename
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-800 bg-gray-900 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Size
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-800 bg-gray-900 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-800 bg-gray-900 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Blur
          </th>
        </tr>
      </thead>
      <tbody className="py-2">
        {files.map((file, idx) => (
          <tr key={idx}>
            <td className="text-center px-5 py-4 border-b border-gray-800 bg-black text-sm">
              {file.filename}
            </td>
            <td className="text-center px-5 py-4 border-b border-gray-800 bg-black text-sm">
              {Math.trunc(file.size * 0.000001) === 0
                ? Math.trunc(file.size * 0.001) + " Kb"
                : Math.trunc(file.size * 0.000001) + " Mb"}
            </td>
            <td className="text-center px-5 py-4 border-b border-gray-800 bg-black text-xs text-clip">
              {file.status}
            </td>
            <td className="text-center px-5 py-4 border-b border-gray-800 bg-black text-xs text-clip">
            {file.blur&&
              <button onClick={()=>{
                 navigator.clipboard
                .writeText(file.blur)
                .then(function () {
                  alert("Text copied to clipboard");         
                 })
             }}>
               COPY
           </button>
}            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
