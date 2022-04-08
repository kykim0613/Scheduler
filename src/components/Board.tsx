import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { DateState, IToDo, toDoSelector } from "../atom";
import ToDo from "./ToDo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import moment from "moment";
import { FaAngleLeft, FaAngleRight, FaTimes } from 'react-icons/fa'
import MemoBtn from "./MemoBtn";
import { dbService, storageService } from "../fireB";
import { addDoc, collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Wrapper = styled.div`
    width: 800px;
    min-width: 800px;
    height: 100vh;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%);
    border-radius: 30px;
    transition: .5s;
    background-color: ${(props) => props.theme.textColor};
`

const CalendarWrapper = styled.div`
    height: 100px;
    display: grid;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

const Title = styled.h1`
    font-weight: 600;
    padding: 15px;
    font-size: 25px;
    color: ${(props) => props.theme.bgColor};
    text-align: center;
`;
const TitleBtn = styled.button`
    width: 100px;
    height: auto;
    font-size: 20px;
    padding: 0;
    color: black;
    z-index: 2;
`;
const AngleBtn = styled.button`
    width: 50px;
`
const UtilBtn = styled.div`
    display: flex;
    margin: 0 auto;
`
const UpBtn = styled.button`
    width: 180px;
    height: 50px;
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 0;
    z-index: 2;
    transition: .5s;
    cursor: pointer;
`
const Day = styled.div`
    width: 90%;
    display: flex;
    text-align: center;
    padding: 30px;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    border-bottom: 1px solid ${(props) => props.theme.bgColor};
    p {
        width: 100px;
        color: ${(props) => props.theme.bgColor};
        font-weight: 800;
    }
`
const CalendarBox = styled.ul`
    width: 90%;
    height: 480px;
    margin: 40px auto;
    overflow: hidden;
    transition: .5s;
`
const CalendarDate = styled.li`
    width: 700px;
    height: 90%;
    font-size: 20px;
    background: ${(props) => props.theme.textColor};
    text-align: center;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    transition: .5s;
    div.box {
        font-size: 20px;
        width: 100px;
        height: 80px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        span{
            color: ${(props) => props.theme.bgColor};
        }
    }
    div.box.selected {
        background: #723034;
        span {
            color: ${(props) => props.theme.textColor};
            font-weight: 500;
        }
    }
`
const MemoWrapper = styled.div`
    width: 500px;
    height: 500px;
    z-index: 3;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
const Option = styled.div`
    width: 100%;
    height: 40px;
    background-color: white;
    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const MemoArea = styled.textarea`
    width: 500px;
    height: 493px;
    outline: none;
    background-attachment: local;
  background-image:
    linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(white, white 40px, #ccc 40px, #ccc 41px, white 41px);
  padding: 8px 10px;
  line-height: 41px;
  font-size: 16px;
`

function Board( {userObj}:any ) {
    const [memo, setMemo] = useState("");
    const [states, setStates] = useState([]);
    const [memoText, setMemoText] = useState("");
    const [on, setOn] = useState<boolean>(true);
    const [memos, setMemos] = useState<boolean>(false);
    const [weight, setWeight] = useState<boolean>(true);
    const [date, setDate] = useState<moment.Moment>(() => moment());
    const handleDayClick = (current: moment.Moment) => setDate(current);
    const returnToday = () => setDate(moment());
    const jumpToMonth = (num: number) => (num ? setDate(date.clone().add(30, 'day')) : setDate(date.clone().subtract(30, 'day')));
    const onClick = () => {
        setOn(!on)
        setMemos(false)
    }
    const onDoubleClick = () => {
        setMemos(!memos)
        console.log(memos)
    }
    const onClose = () => {
        setMemos(false)
    }
    const fontWeight = () => {
        setWeight(!weight)
    }
    const generate = () => {
        const day = date;
        const startWeek = day.clone().startOf('month').week();
        const endWeek = day.clone().endOf('month').week() === 1 ? 53 : day.clone().endOf('month').week();
        let calendar = []
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                <div key={week}>
                    {Array(7).fill(0).map((n, i) => {
                        let current = day.clone().week(week).startOf('week').add(n + i, 'day');
                        let isSelected = day.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
                        let isGrayed = current.format('MM') !== day.format('MM') ? 'grayed' : '';
                        return (
                            <div className={`box ${isSelected} ${isGrayed}`} key={i} onClick={() => handleDayClick(current)} onDoubleClick={onDoubleClick}>
                                <span className="text">{current.format('D')}</span>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return calendar;
    }
    const onSubmit = async (event: any) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (memo !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${v4()}`)
            const response = await uploadString(fileRef, memoText, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const memoPosting = {
            text: memo,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await addDoc(collection(dbService, "states"), memoPosting);
        setMemo("");
        setMemoText("");
    }
    const onChange = (event: any) => {
        const {
            target: {value},
        } = event;
        setMemo(value)
    }
    return (
        <>
            <Wrapper style={on ? { top: "100%" } : { top: "10%" }}>
                <UpBtn onClick={onClick} >Calendar</UpBtn>
                <CalendarWrapper className="head">
                    <Title className="title">{date.format('MMMM YYYY')}</Title>
                    <UtilBtn className="util-button">
                        <AngleBtn onClick={() => jumpToMonth(0)}>
                            <FaAngleLeft className="icon" size="30" color="black" />
                        </AngleBtn>
                        <TitleBtn onClick={returnToday}>Today</TitleBtn>
                        <AngleBtn onClick={() => jumpToMonth(1)}>
                            <FaAngleRight className="icon" size="30" color="black" />
                        </AngleBtn>
                    </UtilBtn>
                </CalendarWrapper>
                <CalendarBox>
                    <Day className="row">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((el) => (
                            <div className="box" key={el}>
                                <p className="text">{el}</p>
                            </div>
                        ))}
                    </Day>
                    <CalendarDate>
                        {generate()}
                    </CalendarDate>
                </CalendarBox>
            </Wrapper>
            {memos ? (
                <MemoWrapper>
                    <Option>
                        <FaTimes className="icon" size="30" color="black" style={{ position: "absolute", right: "20px", cursor: "pointer" }} onClick={onClose} />
                    </Option>
                    <MemoArea maxLength={1000} value={memo} onChange={onChange} ></MemoArea>
                    <MemoBtn onClose={onClose} onSubmit={onSubmit} />
                </MemoWrapper>
            ) : (
                null
            )}
        </>
    )
}

export default Board;