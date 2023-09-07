import React, { useState } from "react";
import { useGPS } from "./GPS";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";

import { BsChevronDown, BsChevronUp, BsFileEarmarkFont } from "react-icons/bs";

// ------------------------csvを読み込んでリスト表示を変更するためのインポート
import ReactFileReader from "react-file-reader";
// ------------------------

// test用import
import Test from "./Test.json";
import { stringifyRequest } from "loader-utils";

const container = {
  width: "75%",
  height: "500px"
};
// お店の情報
const locations = [
  {
    id: 1,
    name: "お店01",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21697737990871,
      lng: 127.67862138356263
    }
  },
  {
    id: 2,
    name: "お店02",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21997737990871,
      lng: 127.68862138356263
    }
  },
  {
    id: 3,
    name: "お店03",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21597737990871,
      lng: 127.68862138356263
    }
  },
  {
    id: 4,
    name: "お店04",
    info: "在庫あり",
    meat: "ひき肉:◯/鶏肉:◯",
    vegetable: "キャベツ:◯/じゃがいも:◯",
    location: {
      lat: 26.21997737990871,
      lng: 127.67562138356263
    }
  }
];

function App() {
  const location = useGPS();
  const position = {
    lat: location ? location.latitude : null,
    lng: location ? location.longitude : null
  };
  const [selected, setSelected] = useState({});
  const onSelect = (item) => {
    setSelected(item);
  };

  const [isCollapsed, setIsCollapsed] = useState([true, true]);

  const toggleCollapse = (index) => {
    const updatedCollapse = [...isCollapsed];
    updatedCollapse[index] = !updatedCollapse[index];
    setIsCollapsed(updatedCollapse);
  };

  // ------------------------csvを読み込んでリスト表示を変更するプログラム
  const [tested, settested] = useState("");
  var countId = 0;
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
        if (locations[countId].id == a0[i] && "舗" == a0[i - 1]) {
          alert(`X:${a0[i]}`);
          alert(
            `Y:${a0[i]}${a0[i + 1]}${a0[i + 2]}/${a0[i + 3]}/${a0[i + 4]}/${
              a0[i + 5]
            }${a0[i + 6]}${a0[i + 7]}/${a0[i + 3]}/${a0[i + 8]}`
          );
          alert(`Z:${a0}`);
          settested(
            (locations[countId].meat = `${a0[i + 2]}: ${a0[i + 4]}${a0[i + 5]}`)
          );
          alert(countId);
          ++countId;
          if (countId == locations.length) {
            --countId;
          }
        }
      }
    };
    // Invoking the readAsText() method by passing the uploaded file as a parameter
    read.readAsText(files[0]);
  };
  // ------------------------
  var testkey = Test.key;

  return (
    <>
      alert(testkey);
      <h2>React & Google Map</h2>
      {/* マップ表示 */}
      <div className="wrap">
        <LoadScript googleMapsApiKey="AIzaSyBkVf8mvOwMcwGDWF-Ry0HoKAJ5MF6Dsws">
          <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
            {locations.map((item) => {
              return (
                // マーカーの設定
                <MarkerF
                  key={item.name}
                  position={item.location}
                  onClick={() => onSelect(item)}
                  label={item.name}
                />
              );
            })}
            {/* infoWindowの表示 */}
            {selected.location && (
              <InfoWindowF
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                {/* infoWindow内の表示情報 */}
                <div>
                  <p className="text">{selected.info}</p>
                  {/* アコーディオンメニューの為の設定 */}
                  <button onClick={() => toggleCollapse(0)}>
                    <p>お肉</p>
                    {isCollapsed[0] ? <BsChevronDown /> : <BsChevronUp />}
                  </button>
                  {isCollapsed[0] ? null : (
                    <div>
                      <p>{selected.meat}</p>
                    </div>
                  )}
                  <button onClick={() => toggleCollapse(1)}>
                    <p>お野菜</p>
                    {isCollapsed[1] ? <BsChevronDown /> : <BsChevronUp />}
                  </button>
                  {isCollapsed[1] ? null : (
                    <div>
                      <p>{selected.vegetable}</p>
                    </div>
                  )}
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
        {position.lat !== null && position.lng !== null ? (
          <></>
        ) : (
          <p>GPS情報を取得中...</p>
        )}
      </div>
      {/* ------------------------csvを読み込むためのボタン設定 */}
      <h3> Upload a CSV file to read</h3>
      <ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
        <button className="btn"> Upload </button>
      </ReactFileReader>
      {/* ------------------------ */}
    </>
  );
}

export default App;
