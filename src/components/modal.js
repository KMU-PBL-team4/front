import "../styles/components/modal.css"
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from "./button";
import img from '../../src/images/noImage.jpg'
import { useEffect, useState } from "react";
import axios from "axios";

export const handleImgError = (e) => {
    e.target.src = img;
};


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
                                <button type="submit" className="btnGreen">전송</button>
                            </form>
                        </div>
                        <div className="modal-result">
                            <div className="modal-detail-contents">
                                <div className="modal-detail minHeight100">
                                    <pre>{JSON.stringify("뭔가 넣어야 하는디", null, 2)}</pre>
                                </div>
                            </div>
                            <div className="modal-result-buttons">
                                <button>미리보기</button>
                                <button className="btnGreen">확인</button>
                            </div>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        btnColor="btnGray"
                        btnContent="닫기"
                        onHide={props.onHide}
                    >Close</Button>
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
                <span>상세정보 : {formData.shortHeading}</span><br />
                <img className="delete-img" src={''} onError={handleImgError} />
            </div>
            <Modal.Footer>
                <Button
                    btnColor="btnGray"
                    btnContent='취소'

                    onHide={props.onHide} />

                <Button
                    btnColor="btnRed"
                    btnContent='삭제'

                    onClick={handleDelete}
                    disabled={isDeleting} />
                {/* {isDeleting ? '삭제 중...' : '삭제'} */}
            </Modal.Footer>
        </Modal>
    );
};

const DetailModal = (props) => {
    const [formData, setFormData] = useState({
        category: '영상',
        title: '',
        shortHeading: '',
        startExposure: '',
        endExposure: '',
        contents: null,
        count: 500,
        regDate: "",
    });

    useEffect(() => {
        setFormData(props.propsFormData)
    }, []);

    const handleDetail = () => {
        axios.get(`/neighbor-ad/${props.id}`).then(response => {
            console.log(formData.contents)
        }).catch(error => {
            console.error('Delete Error:', error);
        });

        props.onHide();
    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    상세 정보
                </Modal.Title>
            </Modal.Header>
            <div className="modal-detail-contents">
                <div className="modal-detail">
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            </div>
            <Modal.Footer>
                <Button
                    btnColor="btnGreen"
                    btnContent="확인"
                    onHide={props.onHide}
                />
            </Modal.Footer>
        </Modal >
    );
};



export { TestModal, DeleteModal, DetailModal };