import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import axios from 'axios';

const AdModal = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState({
        category: '영상',
        title: '',
        shortHeading: '',
        startExposure: '',
        endExposure: '',
        content: null,
        count: 500,
        regDate: new Date().getTime(),
    });

    const handlePreview = () => {
        if (preview == false)
            setPreview(true)
        else
            setPreview(false)
    }

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleFileChange = (event) => {
        const { name, value, files } = event.target;
        const file = files[0];
        console.log(file)

        if (file) {
            const videoUrl = URL.createObjectURL(file);
            console.log(videoUrl)

            setSelectedVideo(videoUrl);
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'content' ? files : value,
        }));

        console.log(selectedVideo)
    };


    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'startExposure' || name === 'endExposure') {
            const exposureTime = Date.parse(value)

            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'content' ? files[0] : exposureTime,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'content' ? files[0] : value,
            }));
        }

    };

    const handleTextareaChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 여기에서 서버로 데이터를 전송합니다.
        const apiEndpoint = isEditing ? `/neighbor-ad/${props.adId}` : '/neighbor-ad';
        const requestMethod = isEditing ? 'put' : 'post';

        axios[requestMethod](apiEndpoint, formData)
            .then(response => {
                console.log('Server Response in Submit:', response.data);
                // 서버 응답시 추가 처리
            })
            .catch(error => {
                console.error('Error in Submit:', error);
                // 오류 발생시 추가 처리
            });
    };

    function formatDate(epochTime) {
        console.log(epochTime)
        const today = new Date(epochTime)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const date = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${year}년 ${month}월 ${date}일 ${hours}:${minutes}`;
        return formattedDate;
    }

    function formatEpochTime(epochTime) {
        const date = new Date(epochTime);

        // 각 부분을 가져와서 조합
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // 날짜 및 시간을 조합하여 반환
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }


    useEffect(() => {
        if (props.isEdit) {
            setFormData(props.propsFormData)
            setIsEditing(true);
        }
    }, [props.isEdit]);

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {isEditing ? '광고 수정' : '광고 추가'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    {
                        preview === true &&
                        (formData.category === "영상" && selectedVideo ? (
                            <video controls width="464" height="300">
                                <source src={selectedVideo} type="video/mp4" />
                            </video>
                        ) : formData.category === "사진" && formData.content ? (
                            <div>
                                <Image src={formData.content} rounded />
                            </div>
                        ) : formData.category === "텍스트" && formData.content ? (
                            <div className='preview-text'>
                                <span>{formData.content}</span>
                            </div>
                        ) : null)
                    }
                    <button onClick={handlePreview}>미리보기</button>
                    <form className="modal-contents" onSubmit={handleSubmit}>
                        <select onChange={handleSelectChange} value={formData.category}>
                            <option>영상</option>
                            <option>사진</option>
                            <option>텍스트</option>
                        </select>
                        <input type="text" placeholder="제목" name="title" value={formData.title} onChange={handleChange}></input>
                        <input type="text" placeholder="간단한 설명" name="shortHeading" value={formData.shortHeading} onChange={handleChange}></input>
                        게시기간

                        <div className="modal-contents-date">
                            {
                                isEditing === true
                                    ? <><input type="datetime-local" placeholder="시작 날짜" name="startExposure" defaultValue={formatEpochTime(formData.startExposure)} onChange={handleChange} />
                                        <span>~</span>
                                        <input type="datetime-local" placeholder="종료 날짜" name="endExposure" defaultValue={formatEpochTime(formData.endExposure)} onChange={handleChange} />
                                    </>
                                    : <><input type="datetime-local" placeholder="시작 날짜" name="startExposure" onChange={handleChange} />
                                        <span>~</span>
                                        <input type="datetime-local" placeholder="종료 날짜" name="endExposure" onChange={handleChange} />
                                    </>
                            }
                        </div>
                        {

                            formData.category === '영상' || null
                                ? <Form.Group controlId="formFile" className="mb-3">
                                    {isEditing == true
                                        ? <Form.Label>영상 수정</Form.Label>
                                        : <Form.Label>영상 등록</Form.Label>
                                    }
                                    <Form.Control type="file" name="content" onChange={handleFileChange} accept="video/*" />
                                </Form.Group>
                                : formData.category === '사진'
                                    ? <Form.Group controlId="formFile" className="mb-3">
                                        {isEditing == true
                                            ? <Form.Label>사진 수정</Form.Label>
                                            : <Form.Label>사진 등록</Form.Label>
                                        }
                                        <Form.Control type="file" name="content" onChange={handleFileChange} accept="image/*" />
                                    </Form.Group>
                                    : <textarea
                                        type="text"
                                        placeholder="광고 텍스트 내용"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleTextareaChange}>
                                    </textarea>
                        }
                        목표 횟수
                        {
                            isEditing == true
                                ? <input className="modal-count" type="number" name="count" value={formData.count} readOnly />
                                : <input className="modal-count" type="number" name="count" step={"500"} min="500" max="5000" value={formData.count} onChange={handleChange} />
                        }
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