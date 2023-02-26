import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import "./banner.css"

const Banner = () => {
  return (
      <Row>
        <Col md={6} className='heading1'>
          <div>
            <h1 className="display-4 font-weight-bold mb-4">Welcome to E-Commerce 2.0</h1>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className='btn btn-primary btn-lg btnStyle'><Link to='products'>Shop Now</Link></button>
          </div>
        </Col>
        <Col md={6} className='image1'>
          <Image src="./files/cover images/PngItem_cover.png" fluid />
        </Col>
      </Row>
  );
};

export default Banner;
