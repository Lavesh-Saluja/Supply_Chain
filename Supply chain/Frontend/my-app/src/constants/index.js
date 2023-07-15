export const CONTRACT_ADDRESS = "0x90066Df2c8dBe8f69bf466572491AaEc09d869ea";
export const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "containerDetail",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "container",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "dateOfDept",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "placeOfDept",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "expectArrivalDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "expArrivalLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dateUnloaded",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "locationUnloaded",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "vessel",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "voyage",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_containerID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_dateUnloaded",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_locationUnloaded",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "_recievedCartoons",
          "type": "uint256[]"
        }
      ],
      "name": "containerUnload",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_container",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_dateOfDept",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_placeOfDept",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_expDateOfArrival",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_expLocationOfArrival",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_vessel",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_voyage",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "UPC_ShippedCartons",
          "type": "uint256[]"
        }
      ],
      "name": "generateOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_containerID",
          "type": "uint256"
        }
      ],
      "name": "getOrderbyContainerID",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];