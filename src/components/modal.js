import "../styles/components/modal.css"
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";

const TestModal = (props) => {
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        광고 테스트
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    <Container>
                        <div className="modal-target">
                            <form className="modal-contents" method="POST" action="/">
                                <select>
                                    <option>영상</option>
                                    <option>사진</option>
                                    <option>텍스트</option>
                                </select>
                                <input type="text" defaultValue={'Test Member Id'}></input>
                                <input type="text" defaultValue={20230623}></input>
                                <button type="submit">전송</button>
                            </form>
                        </div>
                        <div className="modal-result">
                            <textarea>

                            </textarea>
                            <div className="modal-result-buttons">
                                <button>Web View</button>
                                <button>확인</button>
                            </div>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const DeleteModal = (props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        category: '영상',
        title: '',
        shortHeading: '',
        startExposure: '',
        endExposure: '',
        contents: null,
        count: 500,
        // regDate: formatDate(),
    });

    useEffect(() => {
        setFormData(props.propsFormData)
    }, []);

    const handleDelete = () => {
        axios.delete(`/neighbor-ad/${props.id}`).then(response => {
            setIsDeleting(true);
        }).catch(error => {
            console.error('Delete Error:', error);
        });

        props.onHide();
    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    삭제해도 괜찮겠습니까?
                </Modal.Title>
            </Modal.Header>
            <div className="modal-delete-contents">
                <h5>제목 : {formData.title}</h5>
                <span>상세정보 : {formData.shortHeading}</span>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? '삭제 중...' : '삭제'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};



export { TestModal, DeleteModal };