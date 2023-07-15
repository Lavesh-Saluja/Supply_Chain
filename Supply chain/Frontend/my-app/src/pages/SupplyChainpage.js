import '../App.css';
import { Contract, providers, utils,BigNumber } from "ethers";

import React, { useEffect, useRef, useState } from "react";
import { CONTRACT_ADDRESS, abi} from "../constants";
import DetailCard from '../components/DetailCard';
import Web3Modal from "web3modal";
import RequestDetails from "../components/RequestDetails";
function SupplyChainpage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [UPCvalue, setUPCvalue] = useState(0);
  const [cartonsValue, setCartonsValue] = useState(0);
  const [upc_cartonsValue, setUPC_CartonsValue] = useState([]);
  const [containerID, setContainerID] = useState("");
  const [popupDetails, setPopupDetails] = useState(false);
  const [receivedValue, setReceivedValue] = useState("");
  const [receivedCartons, setReceivedCartons] = useState([]);
  const dataRef=useRef();
  const [orderDetails, setOrderDetails] = useState({
    containerId:0,
    dateOfDept: "",
    placeOfDept: "",
    expectArrivalDate: "",
    expArrivalLocation: "",
    dateUnloaded: "",
    locationUnloaded: "",
    vessel: 0,
    voyage: 0,
  });
  function setDetails(e) {

    if (e.target.name == "product")
    {
      setUPC_CartonsValue([...upc_cartonsValue, BigNumber.from(UPCvalue), BigNumber.from(cartonsValue)]);
      console.log(upc_cartonsValue);
      var element = document.getElementById("upc");
      element.value = "";
      element = document.getElementById("cartonsValue");
       element.value = "";
      console.log(element)
    }
    else if (e.target.name == "receivedCartons") {
      setReceivedCartons([...receivedCartons, BigNumber.from(receivedValue)]);
      console.log(receivedCartons);
    }
    else {
         setOrderDetails({
      ...orderDetails,
      [e.target.name]:e.target.value,
    });
    console.log(orderDetails)
    }
 
  }
  //  uint256 container;
  //       string dateOfDept;
  //       string placeOfDept;
  //       string expectArrivalDate;
  //       string expArrivalLocation;
  //       string dateUnloaded;
  //       string locationUnloaded;
  //       uint256 vessel;
  //       uint256 voyage;
  //       uint256[] upc;
  //       uint256[] shippedCartoons;
  const  web3ModalRef= useRef();
  
  async function generateOrder() {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      console.log(contract.address)

      const tx = await contract.generateOrder(
       BigNumber.from( orderDetails.containerId),
        orderDetails.dateOfDept,
        orderDetails.placeOfDept,
        orderDetails.expectArrivalDate,
        orderDetails.expArrivalLocation,
        Number(orderDetails.vessel),
        Number(orderDetails.voyage),
        upc_cartonsValue,
        );
      await tx.wait();
    } catch (e) {
      console.error(e);
      const message = e.message.toString();
      const reason = message.slice(message.indexOf("\""),message.indexOf(","));
      window.alert(reason);
    }
  }



  const getOrderbyContainerID = async () => {
    setPopupDetails(false);
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
      console.log(Number(containerID));
      const data = await contract.getOrderbyContainerID(Number(containerID));
      dataRef.current = (data);
      setPopupDetails(true);
      console.log(dataRef)
    } catch (e) {
      console.error(e)
       const message = e.message.toString();
      const reason = message.slice(message.indexOf("\""),message.indexOf(","));
      window.alert(reason);
    }
  }

  const containerUnload = async () => {
     const signer = await getProviderOrSigner(true);
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    const tx = await contract.containerUnload(Number(containerID), orderDetails.dateUnloaded, orderDetails.locationUnloaded,receivedCartons);
    await tx.wait();
  }
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      // If user is not connected to the Goerli network, let them know and throw an error
      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 80001) {
        window.alert("Change the network Polygon");
        throw new Error("Change network to Polygon");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (e) {
      console.log('------------------------------------');
      console.log(e);
      console.log('------------------------------------');
    }
  };
  

  
    useEffect(() => {
      if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
          network: "goerli",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();

      }
    
    }, [walletConnected]);
  
  const OrderCard = () => {  
      return (<>
        <p>
          <b>Date of Departure</b>: {dataRef.current[0]}
        </p>
         <p>
         <b>place of Departure</b>:  {dataRef.current[1]}
        </p>
         <p>
          <b>expected Arrival Date</b>: {dataRef.current[2]}
        </p>
         <p>
          <b>expected Arrival</b>: Location {dataRef.current[3]}
        </p>
         <p>
          <b>vessel</b>: {dataRef.current[4].toString()}
        </p>
         <p>
          <b>voyage</b>: {dataRef.current[5].toString()}
        </p>
        {
          dataRef.current[6].map((e, i) => {
            if(i%2==0)
            return (<>
              <p>
                <b>UPC</b>:{dataRef.current[6][i].toString()} <b>cartons value</b>:{dataRef.current[6][i + 1].toString()}{dataRef.current[7][i / 2]!=undefined?<span><b>Received value:</b>{dataRef.current[7][i / 2].toString()}</span>:<></>}
            </p>
            </>)
          })
          }
       
      </>);
    
  }
  


    return (
      <div className="container">
     
        <div class="left-side">
    
          <div class="details">
        
             <div class="detail-item">
              <button class="get-button" onClick={getOrderbyContainerID}>Get Container detail</button>
                          <input placeholder="container ID" onChange={(e)=>{setContainerID(e.target.value)}}></input>
              {/* <div class="detail">{deviceDetail}</div> */}

              
            </div>
                   {popupDetails?<OrderCard />:<></>}

          </div>
        
        </div>
        <div class="right-side">
          <h2></h2>
          <div>
            <div class="input-bar">
              <label>Generate Order</label>
              <input type="text" placeholder="Container ID" className="clear" name="containerId" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="date of Departure" className="clear" name="dateOfDept" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="place of Departure" className="clear" name="placeOfDept" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="Expected Arrival Date" className="clear" name="expectArrivalDate" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="Expected Arrival Location" className="clear" name="expArrivalLocation" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="vessel" className="clear" name="vessel" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="voyage" className="clear" name="voyage" onChange={(e) => setDetails(e)} />
              <div className="product">
              <input type="text" placeholder="UPC" id="upc" onChange={(e) => setUPCvalue(e.target.value)} />
                <input type="text" placeholder="shipped Cartoons Value" id="cartonsValue" name="shippedCartoons" onChange={(e) => setCartonsValue(e.target.value)} />
                <button name="product" onClick={(e) => setDetails(e)} className="button">+</button>
              </div>
              
              <br />
              <button type="submit" onClick={generateOrder}>Generate Order</button>
            </div>

                <div class="input-bar">
              <label>Unload Container</label>
              <input type="text" placeholder="Container ID" className="clear" name="containerId" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="date of Unload" className="clear" name="dateUnloaded" onChange={(e) => setDetails(e)} />
              <input type="text" placeholder="location of Unload" className="clear" name="locationUnloaded" onChange={(e) => setDetails(e)} />
              <div className="product">
              <input type="text" placeholder="Received Value" className="clear" name="locationUnloaded" onChange={(e) => setReceivedValue(e.target.value)} />
              <button type="submit" name="receivedCartons" onClick={(e) => setDetails(e)}>+</button>
              </div>
              
              <button type="submit" onClick={containerUnload}>Unload Container</button>
            </div>
           
            
               
             
           
             
            
              
      
            
          </div>
        </div>
      </div>
    );
  }

export default SupplyChainpage;
