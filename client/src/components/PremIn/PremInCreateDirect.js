import React, { useEffect, useState } from "react";
import PremInTable from "./PremInTable";
import axios from "axios";
const config = require("../../config.json");

export default function PremInCreateDirect() {
  const url = window.globalConfig.BEST_POLICY_V1_BASE_URL;
  const wht = config.wht;
  const vat = config.tax;
  const [filterData, setFilterData] = useState(
    {

      "insurerCode": null,
      "agentCode": null,
      "dueDate": null,
      "policyNoStart": null,
      "policyNoEnd": null,
      "endorseNoStart": null,
      "endorseNoEnd": null,
      "invoiceNoStart": null,
      "invoiceNoEnd": null,
      cashieramt: 0,
      netprem: 0,
      commin: 0,
      ovin: 0,
      vatcommin: 0,
      vatovin: 0,
      commout: 0,
      ovout: 0,


    })
  const [policiesData, setPoliciesData] = useState([])
  const colsData = {

    select: "select",
    insurerCode: "insurerCode",
    agentCode: "advisorCode",
    dueDate: "Duedate",
    policyNo: "Policyno",
    endorseNo: "Endorseno",
    invoiceNo: "Invoiceno",
    seqNo: "seqno",
    customerid: "customerid",
    insureename: "insuredname",
    licenseNo: "licenseno",
    // "province",
    chassisNo: "chassisno",
    netgrossprem: "grossprem",
    duty: "duty",
    tax: "tax",
    totalprem: "totalamt",
    commout_rate: "comm-out%",
    commout_amt: "comm-out-amt",
    ovout_rate: "ov-out%",
    ovout_amt: "ov-out-amt",
    netflag: "[] net",
    remainamt: "billpremium",

  };


  const handleChange = (e) => {

    setFilterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changestatementtype = (e) => {
    // e.preventDefault();
    console.log(e.target.name);
    const array = policiesData
    array[e.target.id] = { ...policiesData[e.target.id], [e.target.name]: e.target.checked }
    setPoliciesData(array)
    // const array2 = billpremiumData
    // if (e.target.checked) {
    //     array2[e.target.id] = array[e.target.id].totalprem - array[e.target.id].commout_amt - array[e.target.id].ovout_amt

    // } else {
    //     array2[e.target.id] = array[e.target.id].totalprem
    // }
    // setBillpremiumData(array2)
    // console.log(array2);

  };

  const submitFilter = (e) => {
    e.preventDefault();

    axios
      .post(url + "/araps/getartransdirect", filterData)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          alert("dont find policy");

        } else {


          console.log(res.data);
          // const data = { ...filterData, amt: res.data[0].amt }
          // setFilterData(data)

          setPoliciesData(res.data)

        }
      })
      .catch((err) => {

        alert("dont find cashierreceiveno : " + filterData.cashierreceiveno);

      });


  };
  //apis
  const createHandler = (e) => {
    e.preventDefault();
    axios.get().then(res => {
      alert("search")
      //do search api logic
    }).catch(() => {
      alert('error but created in test')
    })
  }

  const savearpremin = async (e) => {

    const master = filterData

    for (let i = 0; i < policiesData.length; i++) {
      master.cashieramt = master.cashieramt + policiesData[i].netamt;
      master.netprem = master.netprem + policiesData[i].totalprem;
      master.commin = master.commin + policiesData[i].commin_amt;
      master.ovin = master.ovin + policiesData[i].ovin_amt;
      master.vatcommin = master.vatcommin + policiesData[i].commin_amt * vat;
      master.vatovin = master.vatovin + policiesData[i].ovin_amt * vat;
      if (policiesData[i].netflag === 'N') {
        master.commout = master.commout + policiesData[i].commout_amt;
        master.ovout = master.ovout + policiesData[i].ovout_amt;
      }
    }
    // master.cashieramt = policiesData.reduce((acc, curr) => acc + curr.netamt, 0);
    master.actualvalue = master.cashieramt
    // master.netprem = policiesData.reduce((acc, curr) => acc + curr.totalprem, 0);
    // master.commin = policiesData.reduce((acc, curr) => acc + curr.commin_amt, 0);
    // master.ovin = policiesData.reduce((acc, curr) => acc + curr.ovin_amt, 0);
    // master.vatcommin = policiesData.reduce((acc, curr) => acc + curr.commin_amt*vat, 0);
    // master.vatovin = policiesData.reduce((acc, curr) => acc + curr.ovin_amt*vat, 0);
    master.whtcommin = master.commin * wht
    master.whtovin = master.ovin * wht
    master.whtcommout = master.commout * wht
    master.whtovout = master.ovout * wht
    console.log(master);
    await axios.post(url + "/araps/savearpremindirect", { master: master, trans: policiesData }).then((res) => {
      alert("save account recive successed!!!");
      // window.location.reload(false);
    });
  };

  const submitarpremin = async (e) => {
    const master = filterData
    const selecteddata = []
    for (let i = 0; i < policiesData.length; i++) {
      if (policiesData[i].select) {

        master.cashieramt = master.cashieramt + policiesData[i].netamt;
        master.netprem = master.netprem + policiesData[i].totalprem;
        master.commin = master.commin + policiesData[i].commin_amt;
        master.ovin = master.ovin + policiesData[i].ovin_amt;
        master.vatcommin = master.vatcommin + policiesData[i].commin_amt * vat;
        master.vatovin = master.vatovin + policiesData[i].ovin_amt * vat;
        if (policiesData[i].netflag === 'N') {
          master.commout = master.commout + policiesData[i].commout_amt;
          master.ovout = master.ovout + policiesData[i].ovout_amt;
        }
        selecteddata.push(policiesData[i])
      }
    }
    // master.cashieramt = policiesData.reduce((acc, curr) => acc + curr.netamt, 0);
    master.actualvalue = master.cashieramt
    // master.netprem = policiesData.reduce((acc, curr) => acc + curr.totalprem, 0);
    // master.commin = policiesData.reduce((acc, curr) => acc + curr.commin_amt, 0);
    // master.ovin = policiesData.reduce((acc, curr) => acc + curr.ovin_amt, 0);
    // master.vatcommin = policiesData.reduce((acc, curr) => acc + curr.commin_amt*vat, 0);
    // master.vatovin = policiesData.reduce((acc, curr) => acc + curr.ovin_amt*vat, 0);
    master.whtcommin = master.commin * wht
    master.whtovin = master.ovin * wht
    master.whtcommout = master.commout * wht
    master.whtovout = master.ovout * wht
    console.log({ master: master, trans: selecteddata });
    await axios.post(url + "/araps/submitarpremindirect", { master: master, trans: selecteddata }).then((res) => {
      alert("save account recive successed!!!");
      window.location.reload(false);
    });
  };

  return (
    <div className="container d-fle justify-content-center my-5">
      <form onSubmit={(e) => createHandler(e)}>
        <h1>สร้างรายการตัดหนี้ (advisor จ่ายตรงให้บริษัทประกัน)</h1>

        {/* insurerCode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="insurerCode">
            insurerCode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="insurerCode"
              id="insurerCode"
              value={filterData.insurerCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-4 ">

            <button className="btn btn-success" onClick={submitFilter}>SEARCH</button>
          </div>
        </div>
        {/* advisorCode  */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="agentCode">
            advisorCode
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="text"
              name="agentCode"
              id="agentCode"
              value={filterData.agentCode}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* policyno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billadvisorno">
            policyno
          </label>

          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="policyNoStart"
              id="policyNoStart"
              onChange={handleChange}
            />
          </div>
          <label class="col-sm-1 col-form-label" htmlFor="billadvisorno">
            to
          </label>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="policyNoEnd"
              id="policyNoEnd"
              onChange={handleChange}
            />
          </div>

        </div>
        {/* endorseno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billadvisorno">
            endorseno
          </label>

          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="endorseNoStart"
              id="endorseNoStart"
              onChange={handleChange}
            />
          </div>
          <label class="col-sm-1 col-form-label" htmlFor="billadvisorno">
            to
          </label>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="endorseNoEnd"
              id="endorseNoEnd"
              onChange={handleChange}
            />
          </div>

        </div>
        {/* invoiceno */}
        <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="billadvisorno">
            invoiceno
          </label>

          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="invoiceNoStart"
              id="invoiceNoStart"
              onChange={handleChange}
            />
          </div>
          <label class="col-sm-1 col-form-label" htmlFor="billadvisorno">
            to
          </label>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="invoiceNoEnd"
              id="invoiceNoEnd"
              onChange={handleChange}
            />
          </div>

        </div>
        {/* Amt */}
        {/* <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="amt">
            Amt
          </label>
          <div className="col-4 ">
            <input className="form-control" type="number" name="amt" id="amt" value={filterData.amt} disabled />
          </div>
        </div> */}
        {/* actualvalue */}
        {/* <div className="row my-3">
          <label class="col-sm-2 col-form-label" htmlFor="actualvalue">
            ActualValue
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="actualvalue"
              value={filterData.actualvalue}
              id="actualvalue"
              disabled
            />
          </div>
          <label class="col-sm-2 col-form-label" htmlFor="actualvalue">
            DiffAmt
          </label>
          <div className="col-4 ">
            <input
              className="form-control"
              type="number"
              name="DiffAmt"
              id="DiffAmt"
              value={filterData.actualvalue - filterData.amt}
              readOnly
            />
          </div>
        </div> */}
        <div className="row my-3">

        </div>
      </form>
      <div>
        <PremInTable cols={colsData} rows={policiesData} setPoliciesData={setPoliciesData} checknetflag={true} />
        <button className="btn btn-primary">Export To Excel</button>
        <button className="btn btn-warning" onClick={(e) => savearpremin(e)}>save</button>
        <button className="btn btn-success" onClick={(e) => submitarpremin(e)}>submit</button>
      </div>
    </div>
  );
}
