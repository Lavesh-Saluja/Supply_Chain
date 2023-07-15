// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "hardhat/console.sol";

contract SupplyChain {
    struct Product{
        uint  upc;
        uint shippedCartons;
    }
    struct OrderDetails{
        uint256 container;
        string dateOfDept;
        string placeOfDept;
        string expectArrivalDate;
        string expArrivalLocation;
        string dateUnloaded;
        string locationUnloaded;
        uint256 vessel;
        uint256 voyage;
        uint256[] UPC_ShippedCartons;//both value are in pair of indexes For Eg:(UPC,ShippedCartons): (0,1) (2,3) ...
        uint256[] recievedCartons;
    }
    mapping(uint256 => OrderDetails) public containerDetail;
    mapping(uint256=>bool)internal container; //for checking that container id should not be duplicated 
    function generateOrder(
        uint256 _container, 
        string memory _dateOfDept, 
        string memory _placeOfDept, 
        string memory _expDateOfArrival, 
        string memory _expLocationOfArrival, 
        uint256 _vessel, 
        uint256 _voyage,  
        uint256[] memory UPC_ShippedCartons
        ) public{
            require(!container[_container],"ID Already Exist");
            OrderDetails storage newContainer = containerDetail[_container];
            newContainer.container = _container;
            newContainer.dateOfDept = _dateOfDept;
            newContainer.expArrivalLocation = _placeOfDept;
            newContainer.expectArrivalDate = _expDateOfArrival;
            newContainer.placeOfDept = _expLocationOfArrival;
            newContainer.vessel = _vessel;
            newContainer.voyage = _voyage;
            newContainer.UPC_ShippedCartons=UPC_ShippedCartons;
            container[_container]=true; 
    }

    function getOrderbyContainerID(uint256 _containerID) public view returns (string memory, string memory, string memory, string memory, uint256, uint256, uint[] memory, uint256[] memory){
        OrderDetails storage thisContainer = containerDetail[_containerID];
        return (thisContainer.dateOfDept, thisContainer.placeOfDept, thisContainer.expectArrivalDate, thisContainer.expArrivalLocation, thisContainer.vessel, thisContainer.voyage, thisContainer.UPC_ShippedCartons, thisContainer.recievedCartons);
    } 
    function containerUnload(uint256 _containerID, string memory _dateUnloaded, string memory _locationUnloaded, uint256[] memory _recievedCartons ) public {
        OrderDetails storage thisContainer = containerDetail[_containerID];
        require(thisContainer.UPC_ShippedCartons.length/2 == _recievedCartons.length,"Please recived cartoons for each");
        thisContainer.dateUnloaded = _dateUnloaded;
        thisContainer.locationUnloaded = _locationUnloaded;
        thisContainer.recievedCartons = _recievedCartons;
    }
}