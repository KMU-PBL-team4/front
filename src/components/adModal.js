import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Button from './button';

const AdModal = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        category: '영상',
        title: '',
        subHeading: '',
        startExposure: '',
        endExposure: '',
        contents: null,
        count: 500,
        regDate: new Date().getTime(),
    });

    useEffect(() => {
        if (props.isEdit) {
            setFormData(props.propsFormData)
            setIsEditing(true);
        }
    }, [props.isEdit]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'startExposure' || name === 'endExposure') {
            const exposureTime = Date.parse(value)

            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'contents' ? files[0] : exposureTime,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'contents' ? files[0] : value,
            }));
        }

    };
    const handleSubmit = (event) => {
        event.preventDefault();

        // 여기에서 서버로 데이터를 전송합니다.
        const apiEndpoint = isEditing ? `/neighbor-ad/${props.adId}` : '/neighbor-ad';
        const requestMethod = isEditing ? 'put' : 'post';

        axios[requestMethod](apiEndpoint, formData)
            .then(response => {
                console.log('Server Response:', response.data);
                // 서버 응답시 추가 처리
            })
            .catch(error => {
                console.error('Error:', error);
                // 오류 발생시 추가 처리
            });
    };

    function formatDate(epochTime) {
        const today = new Date(epochTime)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const date = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${year}년 ${month}월 ${date}일 ${hours}:${minutes}`;
        return formattedDate;
    }

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {isEditing ? '광고 수정' : '광고 추가'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    <form className="modal-contents" onSubmit={handleSubmit}>
                        <select onChange={handleSelectChange} value={formData.category}>
                            <option>영상</option>
                            <option>사진</option>
                            <option>텍스트</option>
                        </select>
                        <input type="text" placeholder="제목" name="title" value={formData.title} onChange={handleChange}></input>
                        <input type="text" placeholder="간단한 설명" name="subHeading" value={formData.subHeading} onChange={handleChange}></input>
                        게시기간
                        <div className="modal-contents-date">

                            <input type="datetime-local" placeholder="시작 날짜" name="startExposure" onChange={handleChange} />
                            <span onClick={console.log(formData)}>~</span>
                            <input type="datetime-local" placeholder="종료 날짜" name="endExposure" onChange={handleChange} />
                        </div>
                        {
                            formData.category === '영상'
                                ? <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>영상 등록</Form.Label>
                                    <Form.Control type="file" name="contents" onChange={handleChange} />
                                </Form.Group>
                                : formData.category === '사진'
                                    ? <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>사진 등록</Form.Label>
                                        <Form.Control type="file" name="contents" onChange={handleChange} />
                                    </Form.Group>
                                    : <textarea type="text" placeholder="광고 텍스트 내용" name="contents" value={formData.contents} onChange={handleChange}></textarea>
                        }
                        목표 횟수
                        <input className="modal-count" type="number" name="count" step={"500"} min="500" max="5000" value={formData.count} onChange={handleChange} />
                        등록일자<input type="text" name="regDate" value={formatDate(formData.regDate)} readOnly />
                        <div className="modal-btns">
                            <button className="modal-post-btn" type="submit">{isEditing ? '광고 수정' : '광고 추가'}</button>
                            <div className="modal-close-btn" onClick={props.onHide}><span>닫기</span></div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    );
};

export default AdModal;