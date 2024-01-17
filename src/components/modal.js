import "../styles/components/modal.css"
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const AddModal = (props) => {

    function nowDate() {
        let today = new Date();

        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let date = today.getDate().toString().padStart(2, '0');;
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`;
        return formattedDate

    }
    let [category, setCategory] = useState(0)

    const handleSelectChange = (event) => {
        const value = event.target.value;
        let result
        value === '영상'
            ? result = 0
            : value === '사진'
                ? result = 1
                : result = 2
        setCategory(result);
    };


    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        광고 추가
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    <form className="modal-contents" method="POST" action="/community/write">
                        <select onChange={handleSelectChange}>
                            <option>영상</option>
                            <option>사진</option>
                            <option>텍스트</option>
                        </select>
                        <input type="text" placeholder="제목" name="title"></input>
                        <input type="text" placeholder="간단한 설명" name="subheading"></input>
                        게시기간
                        <div className="modal-contents-date">
                            <input type="datetime-local" placeholder="시작 날짜" name="startExposure" ></input>
                            <span>~</span>
                            <input type="datetime-local" placeholder="종료 날짜" name="endExposure"></input>
                        </div>
                        {
                            category === 0
                                ? <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>영상 등록</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                                : category === 1
                                    ? <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>사진 등록</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                    : <textarea type="text" placeholder="상세 설명 및 광고 텍스트"></textarea>
                        }
                        목표 횟수<select type="text" placeholder="목표 횟수" name="count">
                            <option>500</option>
                            <option>1000</option>
                            <option>1500</option>
                            <option>2000</option>
                            <option>2500</option>
                            <option>3000</option>
                        </select>
                        등록일자<input type="text" className="write-note-write-date" name="writeDate" value={nowDate()} readOnly />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.onHide}>Close</button>
                    <button onClick={props.onHide}>제출</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

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

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        삭제해도 괜찮겠습니까?
                    </Modal.Title>
                </Modal.Header>
                <div className="modal-delete-contents" >
                    <h5>제목 : {props.title}</h5>
                    <span>상세정보 : {props.subheading}</span>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.onHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const EditModal = (props) => {

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) { month = '0' + String(month) };
    let date = today.getDate();
    if (date < 10) { date = '0' + String(date) };

    let [category, setCategory] = useState(0)

    const handleSelectChange = (event) => {
        const value = event.target.value;
        let result
        value === '영상'
            ? result = 0
            : value === '사진'
                ? result = 1
                : result = 2
        setCategory(result);
    };

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        광고 수정
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    <form className="modal-contents" method="POST" action="/community/write">
                        <select type="text" placeholder="유형" onClick={handleSelectChange}>
                            <option>영상</option>
                            <option>사진</option>
                            <option>텍스트</option>
                        </select>
                        <input type="text" placeholder="제목" name="title" defaultValue={props.title}></input>
                        <input type="text" placeholder="간단한 설명" name="subheading" defaultValue={props.subheading}></input>
                        게시기간
                        <div className="modal-contents-date">
                            <input type="datetime-local" placeholder="시작 날짜" name="startExposure" defaultValue={props.startExposure}></input>
                            <span>~</span>
                            <input type="datetime-local" placeholder="종료 날짜" name="endExposure" defaultValue={props.endExposure}></input>
                        </div>
                        {
                            category == 0
                                ? <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>영상 등록</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                                : category == 1
                                    ? <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>사진 등록</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                    : <textarea type="text" placeholder="상세 설명 및 광고 텍스트" defaultValue={props.detail}></textarea>
                        }
                        목표 횟수<select type="text" placeholder="목표 횟수" name="count" defaultValue={props.count}>
                            <option>500</option>
                            <option>1000</option>
                            <option>1500</option>
                            <option>2000</option>
                            <option>2500</option>
                            <option>3000</option>
                        </select>
                        등록(수정)일자<input type="text" className="write-note-write-date" name="writeDate" value={props.writeDate} readOnly />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.onHide}>Close</button>
                    <button onClick={props.onHide}>제출</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



export { AddModal, TestModal, DeleteModal, EditModal };