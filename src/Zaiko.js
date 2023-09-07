//  import required libraries
import React from "react";

import ReactFileReader from "react-file-reader";
function App() {
  const uploadFile = (files) => {
    // Creating the object of FileReader Class
    var read = new FileReader();
    // when readAsText will invoke, onload() method on the read object will execute.
    read.onload = function (e) {
      var a0 = read.result;
      for (var i = 0; i < 69; i++) {
        if (a0[i] == "米") {
          alert(a0[i]);
        }
      }
    };
    // Invoking the readAsText() method by passing the uploaded file as a parameter
    read.readAsText(files[0]);
  };

  return (
    <>
      <h3> Upload a CSV file to read</h3>

      {/* creating the file upload button to upload CSV file */}

      <ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
        <button className="btn"> Upload </button>
      </ReactFileReader>
    </>
  );
}
export default App;
