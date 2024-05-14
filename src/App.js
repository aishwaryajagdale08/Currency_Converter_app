/* import logo from './logo.svg'; */
import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios'; 

function App() {

  let [amounts,setAmounts] = useState([]);
  let [fromCurrency,setFromCurrency] = useState('USD');
  let [toCurrency,setToCurrency] = useState("INR");
  let [exchange,setExchange] =useState({});
  let [convertedAmount,setConvertedAmount] =useState(null);
    /* MY */

    useEffect(() => {
      // Fetch exchange rates from a free API (replace with your preferred API)
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
       
      axios.get(apiUrl)
        .then(response => {
          setExchange(response.data.rates);
          console.log(response.data.rates);
        })
        .catch(error => {
          console.error('Error fetching exchange rates:', error);
        });
    }, [fromCurrency]);



    /* useEffect(()=>{
    axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/.json`)
    .then((response)=>response.json())
    .then((data)=>{
      setExchange(data.results);
      console.log(data.results);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[fromCurrency])  */
 
  /* useEffect(()=>{
      axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/q=${fromCurrency}.json`)
      .then(res => {
      setExchange(res.data[fromCurrency])
    })
    .catch(err => console.log(err))

  },[fromCurrency]) */





  useEffect(()=>{
    const conversionRate = exchange[toCurrency];
    if(conversionRate)
    {
      const converted = amounts * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  },[amounts,fromCurrency,toCurrency,exchange]);



  /* function convertcurrency(){
    setConvertedAmount(exchange);
  }
 */
  const handlechange =(event)=>{
     const {name,value} = event.target;
     switch(name){
        case 'amount':
          setAmounts(value);
          break;

        case 'fromCurrency':
          setFromCurrency(value);
          break;

        case 'toCurrency':
          setToCurrency(value);
          break;
        default:
          break;
     }
  };




  return (
    <div className="Card">
      <div className="header-part">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GPfEc4J_LYGZKTIqESmI-_IFGCcaaaoShw&s" height="100px" width="100px"></img>
        <h1><b><i><u>Currency Conerter</u></i></b></h1>
      </div>

      <section className="converter_part">
        <div className="amount_no">
          <lable><b>Amount : </b></lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input value={amounts} name='amount' type='number' className="input_field" onChange={handlechange}></input>
        </div>

        <div className="from_currency">
          <lable><b>From Currency :</b></lable>
          <select name='fromCurrency' value={fromCurrency} onChange={handlechange} className="input_field" > 
            {
              Object.keys(exchange).map(currency =>(
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            }
          </select>
        </div>

        <div className="to_currency">
          <lable><b>To Currency :</b> </lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select name='toCurrency' value={toCurrency} onChange={handlechange} className="input_field">
            {Object.keys(exchange).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
              ))
            }
          </select>
        </div>
        <br></br>
        {/* <button className='btn' onClick={convertcurrency}>Convert</button> */}
        <div className='output'>
           <h2>converted amount: <b>{convertedAmount}</b></h2>
        </div>
      </section> 
    </div>
  );
}

export default App;
