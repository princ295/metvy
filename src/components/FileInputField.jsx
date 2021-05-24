import { useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";


import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import DataTable from "./DataTable";


const Schema = yup.object().shape({
  _file: yup.string().required()
})


const FileInputField = () => {

  const [file, setFile] = useState('');
  const dispatch = useDispatch();

  const [jsonData, setJsonData] = useState([])
  const { handleSubmit, register, errors} = useForm({
    resolver: yupResolver(Schema)
  });

  const filePathset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    setFile(file)
    console.log(file);
  }

  const readFile = () => {
    var f = file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data);// shows that excel data is read
      console.log(convertToJson(data)); // shows data in json format
    };
    reader.readAsBinaryString(f);
  }

  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      obj.approval = false;
      result.push(obj);
    }

    setJsonData(result)
    dispatch({
      type: 'SET_TABLE_DATA',
      payload: result
    })
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }


  return (
    <div className="file">
      <h1>Upload Excel File</h1>

        <input className="btn-sm" onChange={filePathset} type="file"/>
        <button className="btn-sm" onClick={readFile}>Click here To Show Data in Form of Table</button>
    <hr/>
  
    </div>
  );
}
 
export default FileInputField;