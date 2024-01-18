import "../styles/components/modal.css"

import Modal from 'react-bootstrap/Modal';
import Button from "./button";
import img from '../../src/images/noImage.jpg'
import { useEffect, useState } from "react";
import axios from "axios";


export const handleImgError = (e) => {
    e.target.src = img;
};

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
        axios.delete(`/neighbor-ad/${props.id}`)
            .then(response => {
                // 서버 응답을 받은 후에 실행되는 부분
                setIsDeleting(true);
            })
            .catch(error => {
                console.error('Error in Delete:', error);
            })
            .finally(() => {
                // 성공이든 실패든 마지막에 실행되는 부분
                props.onHide();
            });
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
                {/* <img className="delete-img" src={''} onError={handleImgError} /> */}
            </div>
            <Modal.Footer>
                <Button
                    btnColor="btnGray"
                    btnContent='취소'

                    onHide={props.onHide} />

                <button
                    className="btnRed modal-ok-btn"

                    onClick={handleDelete}
                    disabled={isDeleting} > 삭제 </button>
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



export { DeleteModal, DetailModal };