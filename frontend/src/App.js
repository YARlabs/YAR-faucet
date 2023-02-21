import logo from './logo.png';
import './styles/coming-sssoon.css';
import './styles/bootstrap.css';
import { useState } from 'react';
import { useGiveCurrency } from './hooks/useGiveCurrency';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function App() {
  const [address, setAddress] = useState('');
  const [isDisable, setDisable] = useState(false);

  const hookGiveCurrency = useGiveCurrency();
  const giveCurrency = async () => {
    setDisable(true);
    if(address.trim().length !== 42) {
      toast.warn('Invalid address', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const validAddress = address.trim().substring(2, 43);
    const status = await hookGiveCurrency(validAddress);
    if(status) {
      setAddress('');
    }
    setDisable(false);
  }

  return (
    <>
      <div className="main theme">     
        <div className="cover black" data-color="black">
          <img className="logo-yar" src={logo} alt=""/>
        </div>  
        <div className="container">
          <h1 className="logo">
            Faucet
          </h1>
          <div className="content">
            <div className="subscribe">
              <div className="row">
                <div className="form-address">
                  {/* <div className="form-inline"> */}
                    <div className="form-group1">
                      <label className="sr-only">Address wallet</label>
                      <input 
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="form-control transparent"
                        placeholder="Your address here..."
                        value={address} 
                      />
                    </div>
                    <button
                      className="btn btn-danger btn-fill"
                      onClick={() => giveCurrency()}
                      disabled={isDisable}
                    >
                      Send YARs
                    </button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
