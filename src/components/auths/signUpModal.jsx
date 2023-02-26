import Modal from 'react-bootstrap/Modal';
import { BACK_URL } from '../../Data/productData';

const SignUpModal = (props) => {
  const signUpUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${BACK_URL}/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
    });
    let data = await response.json();
    console.log(data);
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign Up
          <p style={{fontSize: '15px', fontWeight: 'normal'}}>It's quick and easy</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={signUpUser}>
          <div className="mb-3">
              <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
              <input type="text" className="form-control" id="exampleInputUsername1" name="username" />
          </div>

          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
          </div>
          <div className="d-grid" style={{padding: "2rem 20%"}}>
              <button type="submit" className="btn btn-outline-success">Sign Up</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;