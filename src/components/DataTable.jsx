import { FormControl, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectRemarkData, selectTableData } from "../reducer/selector";
import ModalBlock from "./ModalBlock";


import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const Schema = yup.object().shape({
  remark: yup.string().required()
})


const DataTable = () => {

  const isTableData = useSelector(selectTableData);

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]); 

  const [currentIndex, setCurrentIndex] = useState(undefined);
  const [remarkObj, setRemarkObj] = useState([]);


  const [approvalObj, setApprovalObj] = useState([]);
  const approval_index = []


  const [approvalData, setApprovalData] = useState([])

  let allIndex = []

  const [track, setTrack] = useState([])

  const { handleSubmit, register, errors} = useForm({
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
    setTableData(isTableData)
  },[isTableData])

  const onSubmit = (data) => {
    const obj = isTableData[currentIndex];
    let newObj = {
      remark: data.remark
    }
  
    setRemarkObj(_obj=>[..._obj,(Object.assign(newObj, obj))])

    let duTableData = [...isTableData];
    console.log(duTableData.splice(currentIndex,1))
    
    dispatch({
      type: 'SET_TABLE_DATA',
      payload: duTableData
    })

    dispatch({
      type: 'CLOSE_MODAL',
    })
    console.log(remarkObj)
  }




  const onChangeAllApproval = (e) => {
    if(e.target.checked){
      let du_ary = JSON.parse(JSON.stringify(tableData));
      du_ary.map((item, index) => {
        item['approval']= true;
        allIndex.push(index)
        console.log(allIndex)
      })

      setTrack(allIndex)

      dispatch({
        type: 'SET_TABLE_DATA',
        payload: du_ary
      })

      console.log(du_ary)
    }
    else{
      let du_ary = JSON.parse(JSON.stringify(tableData));
      du_ary.map(item => {
        item['approval']= false;
      })
      allIndex = []
      dispatch({
        type: 'SET_TABLE_DATA',
        payload: du_ary
      })
    }
  } 





  const onChangeApproval = (e, index) => {
    console.log(index)
    if(e.target.checked){
      let du_ary = JSON.parse(JSON.stringify(tableData));
      du_ary[index]['approval']= true;
      
      allIndex.push(index)
      setTrack(allIndex)
      dispatch({
        type: 'SET_TABLE_DATA',
        payload: du_ary
      })
    }else{
      let du_ary = JSON.parse(JSON.stringify(tableData));
      du_ary[index]['approval']= false;
      dispatch({
        type: 'SET_TABLE_DATA',
        payload: du_ary
      })
    }
  } 


  const onClickApproval = (e, index) => {
    const obj = isTableData[index];
   
    setApprovalObj(_obj=>[..._obj,obj])

    let duTableData = [...isTableData];
    console.log(duTableData.splice(currentIndex,1))
    
    dispatch({
      type: 'SET_TABLE_DATA',
      payload: duTableData
    })

  } 

  const onClickAllApproval = () => {
    let duTableData = JSON.parse(JSON.stringify(tableData));

    console.log(track)
    track.map(item => {
      duTableData = JSON.parse(JSON.stringify(duTableData));
      let val = duTableData.splice(item,1)
      console.log(val)
      setApprovalData(val[0])
      console.log(approvalData)
      dispatch({
        type: 'SET_TABLE_DATA',
        payload: duTableData
      })
    })

    console.log(allIndex)
  
    dispatch({
      type: 'SET_TABLE_DATA',
      payload: duTableData
    })

  }



  const handleRejectOnClick = (index) => {
    console.log(index)
    setCurrentIndex(index)
    dispatch({
      type: "OPEN_MODAL"
    })
  }



  return (
    <>
    {
      tableData.length ? 
      <>
        <div style={{float: 'right'}}>
          <button className="btn-sm" onClick={onClickAllApproval}>Approval</button>
        </div>
        <br/>
        <Table>
          <thead>
            <td>
              <input type="checkbox" onChange={onChangeAllApproval}/>
            </td>
              {
                Object.keys(tableData[0]).map(field => (
                  <td>{field}</td>
                ))
              }
            <td width="180">Action</td>
          </thead>
          <tbody>
            {
              tableData.map((item, index) => {
                return(
                  <tr key={index + Math.random()}>
                    <td>
                      <input type="checkbox" onChange={(e) => onChangeApproval(e,index)} checked={item.approval}/>
                    </td>
                    {
                      Object.keys(tableData[0]).map((element) => (
                        <td key={index + Math.random() + Math.random()}>{item[element]}</td>
                      ))
                    }
                    <td>
                      <button className="btn-sm" onClick={() => onClickApproval(index)}>Approval</button> <span></span>
                      <button className="btn-sm" onClick={() => handleRejectOnClick(index)}>Reject</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </> : null
      }


      <h1>Remark Table</h1>
      {JSON.stringify(remarkObj)}

      <h1>Approval Data</h1>
      {JSON.stringify(approvalData)}  ---{JSON.stringify(approvalObj)}


      <ModalBlock title="Add Remark">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Remark *</label>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Default"
              {...register('remark')}
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <button type="submit">Submit</button>
        </form>
      </ModalBlock>
    </>
  );
}
 
export default DataTable;