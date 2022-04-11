import '../styles/addQuestion.scss';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const AddQuestion = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
        <button className='addBtn' onClick={handleShow}>Add New Question</button>

        <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header>
            {/* <Modal.Title>Ovo je naslov</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <p>Zahtjev za rezervaciju je uspješno poslan salonu.</p> 
          <p>Kada neko iz salona prihvati ili odbije rezervaciju</p>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={handleClose}>OK</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddQuestion