const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { utils,BigNumber } = require("ethers");

describe("FileShare", function () {
  it("should add device", async () => {
     const [owner,acc1,acc2]=await ethers.getSigners();
      const contract = await ethers.getContractFactory("SupplyChain");
      const supplyChain = await contract.deploy();
      console.log(supplyChain.address);
      const orderDetails={
    containerId:"123",
    dateOfDept: "12/09/23",
    placeOfDept: "Nagpur",
    expectArrivalDate: "12/10/23",
    expArrivalLocation: "Ahemdabad",
    vessel: 12,
    voyage: 34,
      }
      const upc = [BigNumber.from("1"),BigNumber.from("2"),BigNumber.from("3"),BigNumber.from("1"),BigNumber.from("2"),BigNumber.from("3")];
      await supplyChain.generateOrder(
          Number(orderDetails.containerId),
        orderDetails.dateOfDept,
        orderDetails.placeOfDept,
        orderDetails.expectArrivalDate,
        orderDetails.expArrivalLocation,
        Number(orderDetails.vessel),
        Number(orderDetails.voyage),
        upc)
   console.log('------------------------------------');
   console.log(await supplyChain.getOrderbyContainerID(123));
    console.log('------------------------------------');
    await supplyChain.containerUnload(Number("123"), "23/09/23", "Kamptee", [BigNumber.from("1"), BigNumber.from("2"), BigNumber.from("3")]);
      console.log('------------------------------------');
   console.log(await supplyChain.getOrderbyContainerID(123));
    console.log('------------------------------------');
  });
   
  
 
});
