import "../styles/components/modal.css"

import Modal from 'react-bootstrap/Modal';
import Button from "./button";
import img from '../../src/images/noImage.jpg'
import { useEffect, useState } from "react";
import axios from "axios";


export const handleImgError = (e) => {
    e.target.src = img;
};


// const ViewModal = (props) => {

//     const testExample = {
//         "id": "123",
//         "username": "필요한가?",
//         "count": 500,
//         "hit": 0,
//     }

//     return (
//         <>
//             <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
//                 <Modal.Header>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         광고 미리보기
//                     </Modal.Title>
//                 </Modal.Header>
//                 <div className="modal-delete-contents">
//                     <div className="modal-view-contents">
//                         <img src={img}></img>
//                         <Button
//                             btnColor="btnRed"
//                             btnContent='HIT'
//                         />
//                         <div className="modal-next-btns">
//                             <div className="modal-before-btn" onClick={() => { console.log('ss') }}><FontAwesomeIcon icon={faCaretLeft} size="5x" /></div>
//                             <div className="modal-next-btn" onClick={() => { console.log('ss') }}><FontAwesomeIcon icon={faCaretRight} size="5x" /></div>

//                         </div>
//                     </div>
//                     <h3>Result</h3>
//                     <div className="modal-result">
//                         <div className="modal-detail-contents">
//                             <div className="modal-detail minHeight100">
//                                 <pre>{JSON.stringify(testExample, null, 2)}</pre>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal >
//         </>
//     )
// }



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



export { DeleteModal, DetailModal };