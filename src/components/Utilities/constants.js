import { FaBolt, FaSearchDollar, FaMobile, FaPiggyBank, FaHamburger, FaAmbulance, FaHouseUser, FaShoppingBasket, FaSchool, FaCar, FaCoins, FaCircleNotch, FaMoneyBillWave, FaWrench, FaReceipt, FaCommentDollar } from 'react-icons/fa';
import { GiGamepad } from 'react-icons/gi'
import { BsBatteryCharging } from'react-icons/bs'

export const categoryIcons = {
    "Shopping" : <FaShoppingBasket style={{'color':'white'}}/>,
    "College Fee" : <FaSchool style={{'color':'white'}}/>,
    "Transportation" : <FaCar style={{'color':'white'}}/>,
    "Insurance" : <FaCoins style={{'color':'white'}}/>,
    "Utilities" : <FaWrench style={{'color':'white'}}/>,
    "Bills" : <FaReceipt style={{'color':'white'}}/>,
    "income" : <FaMoneyBillWave style={{'color':'white'}}/>,
    "Other" : <FaCircleNotch style={{'color':'white'}}/>,
    "undefined" : <FaCommentDollar style={{'color':'white'}}/>,
    "Miscellaneous" : <FaSearchDollar style={{'color':'white'}}/>,
    "Groceries" : <FaCoins style={{'color':'white'}}/>,
    "Housing" : <FaHouseUser style={{'color':'white'}}/>,
    "Medical and Healthcare" : <FaAmbulance style={{'color':'white'}}/>,
    "Communication and Internet" : <FaMobile style={{'color':'white'}}/>,
    "Food" : <FaHamburger style={{'color':'white'}}/>,
    "Fuel" : <BsBatteryCharging style={{'color':'white'}}/>,
    "Rentals" : <FaPiggyBank style={{'color':'white'}}/>,
    "Learning and Development" : <FaBolt style={{'color':'white'}}/>,
    "Recreational and Entertainment" : <GiGamepad style={{'color':'white'}}/>,
  };

  