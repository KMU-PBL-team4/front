import Container from 'react-bootstrap/Container';

import Modal from 'react-bootstrap/Modal';
import Button from "./button";
import img from '../../src/images/noImage.jpg'
import img2 from '../../src/images/NaverLogo.png'
import img3 from '../../src/images/mainImg.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';


const TestModal = (props) => {
    const [testExample, setTestExample] = useState({
        "category": "영상",
        "username": "",
        "searchDate": "",
    })

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setTestExample((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'searchDate') {
            const exposureTime = Date.parse(value);

            setTestExample((prevData) => ({
                ...prevData,
                [name]: exposureTime,
            }));


        } else {
            setTestExample((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

    };


    const [testResult, setTestResult] = useState({
        'api': "none",
        "userData": testExample
    })
    function setAPI() {
        setTestResult({
            'api': `/neighbor-ads/ad-list/${testExample.username}?category=${testExample.category}&searchDate=${testExample.searchDate}&quantity=5`,
            "userData": testExample
        })
    };

    const [viewModalShow, setViewModalShow] = useState(false);

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
                            <div className="modal-target-find">
                                <div className="modal-target-category">
                                    <span>유형</span>
                                    <select name='category' onChange={handleSelectChange} >
                                        <option>영상</option>
                                        <option>사진</option>
                                        <option>텍스트</option>
                                    </select>
                                </div>
                                <input type="text" name="username" placeholder="유저 ID" onChange={handleChange}></input>
                                <input type="datetime-local" name="searchDate" onChange={handleChange} Value={testExample.searchDate} />
                                <button type="submit" className="btnGreen" onClick={() => { setAPI() }}>광고 찾기</button>
                            </div>
                        </div>
                        <div className="modal-result">
                            <div className="modal-detail-contents">
                                <div className="modal-detail minHeight100">
                                    <pre>{JSON.stringify(testResult, null, 2)}</pre>
                                </div>
                            </div>
                            <div className="modal-result-buttons">
                                <button
                                    onClick={() => { setViewModalShow(true) }}
                                >미리보기</button>
                                <ViewModal
                                    api={testResult.api}
                                    onHide={() => setViewModalShow(false)}
                                    show={viewModalShow}
                                />
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

const ViewModal = (props) => {

    const testExample = {
        "status": 0,
        "errMessage": null,
        "adShowDTO": [
            {
                "title": "제품1",
                "shortHeading": "제품1 소개",
                "content": img,
                "description": "제품1에 대한 설명입니다.",
            },
            {
                "title": "서비스2",
                "shortHeading": "서비스2 소개",
                "content": img2,
                "description": "서비스2에 대한 설명입니다."
            },
            {
                "title": "제품3",
                "shortHeading": "제품3 소개",
                "content": img3,
                "description": "제품3에 대한 설명입니다."
            }
        ]
    }

    const [adList, setAdList] = useState([{
        "title": "예제1",
        "shortHeading": "예제1 소개",
        "content": null,
        "description": "예제1에 대한 설명입니다."
    }]);
    const [adIndex, setAdIndex] = useState(0);

    const handleTest = () => {
        axios.get(`${props.api}`).then(response => {
            setAdList(response)
            setAdList(testExample.adShowDTO)
            console.log('OK in TestModal')
        }).catch(error => {
            console.error('Error in Test:', error);
        });

        props.onHide();
    };

    useEffect(() => {
        handleTest()
        setAdList(testExample.adShowDTO)
    }, []);


    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        광고 미리보기
                    </Modal.Title>
                </Modal.Header>
                <div className="modal-delete-contents">
                    <div className="modal-view-contents">
                        {/* <img src={img}></img> */}
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <ViewModalImg
                                adIndex={adIndex}
                                setAdIndex={setAdIndex}
                                adList={adList}
                                setAdList={setAdList}
                            />
                        </div>
                    </div>
                    <h3>Result</h3>
                    <div className="modal-result">
                        <div className="modal-detail-contents">
                            <div className="modal-detail minHeight100">
                                <pre>{JSON.stringify(adList[adIndex], null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    )
}

const ViewModalImg = (props) => {
    const [adListImg, setAdListImg] = useState(props.adList);


    const prevImg = () => {
        if (props.adIndex === 0) {
            props.setAdIndex(adListImg.length - 1)
        } else {
            props.setAdIndex(props.adIndex - 1)
        }
    }
    const nextImg = () => {
        if (props.adIndex === adListImg.length - 1) {
            props.setAdIndex(0)
        } else {
            props.setAdIndex(props.adIndex + 1)
        }
    }
    const hitUP = () => {
        let copy = [...adListImg];
        console.log(copy[props.adIndex].hit)
        if (copy[props.adIndex].hit == undefined) {
            copy[props.adIndex].hit = 1;
        }
        else {
            copy[props.adIndex].hit = copy[props.adIndex].hit + 1
        }
        props.setAdList(copy);
    }
    return (
        <div>
            <div class="carousel-inner">
                {
                    <div class="carousel-item active">
                        <img className="d-block w-100" src={adListImg[props.adIndex].content} alt="First slide" />
                    </div>
                }
            </div>
            <button className="carousel-control-prev" onClick={prevImg} data-slide="prev">
                <FontAwesomeIcon icon={faCaretLeft} aria-hidden="true" size='4x' />
                <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" onClick={nextImg} data-slide="next">
                <FontAwesomeIcon icon={faCaretRight} aria-hidden="true" size='4x' />
                <span class="sr-only">Next</span>
            </button>
            <button className='modal-ok-btn btnRed hit-btn' onClick={hitUP}>HIT</button>
        </div>
    )
}


export default TestModal;