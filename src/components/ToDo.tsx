import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { IToDo, toDoSelector, toDoState } from "../atom";
import Board from "./Board";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { list } from "firebase/storage";
import { useState } from "react";

const ToDoForm = styled.form`
    width: 561px;
    height: 44px;
    justify-content: center;
    align-items: center;
    display: grid;
    position: absolute;
    left: 50%;
    top: 26%;
    transform: translate(-50%,-50%);
`


const ToDoInput = styled.input`
    width: 561px;
    height: 44px;
    text-indent: 20px;
    font-size: 16px;
    outline: none;
    border-radius: 30px;
    border: none;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    z-index: -1;
`;

const Wrapper = styled.div`
width: 80%;
max-width: 800px;
height: 50vh;
border: 1px solid white;
position: absolute;
left: 50%;
top: 35%;
transform: translate(-50%);
border-radius: 30px;
transition: .5s;
`

const ToDoWrapper = styled.div`
    width: 95%;
    height: 45vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: grid;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        background:none;
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.textColor};
        border-radius: 20px;
    }
    ::-webkit-scrollbar-track {
    }
    z-index: 1;
`;

const ToDoScroll = styled.ul`
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`

const ToDoList = styled.li`
    width: 500px;
    height: 40px;
    line-height: 40px;
    list-style: none;
    text-indent: 15px;
    color: ${(props) => props.theme.bgColor};
    margin: 10px 0;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 30px;
`
const BoardWrapper = styled.div`
    width: 100%;
    height: 35vh;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Day = styled.ul`
    width: 150px;
    min-width: 120px;
    margin: 10px;
    height: 300px;
    border-radius: 20px;
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    list-style: none;
    text-align: center;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`

const Title = styled.h1`
    font-weight: 600;
    padding: 15px;
`

const Content = styled.li`

`


interface IForm {
    toDo: string;
    text: string;
    id: string;
}

function ToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    console.log(toDos)
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDo) => [{ text: toDo, id: Date.now() }, ...oldToDo])
        setValue("toDo", "")
    }
    // const onDragEnd = ({ draggableId, destination, source }: any) => {
    //     if (!destination) return;
    //     setToDos((oldToDos) => {
    //         const toDosCopy = [...oldToDos];
    //         toDosCopy.splice(source.index, 1);
    //         toDosCopy.splice(destination.index, 0, draggableId);
    //         console.log(toDosCopy)
    //         console.log(toDos)
    //         return toDosCopy;
    //     })
    // }
    return (
        <>
            <ToDoForm onSubmit={handleSubmit(handleValid)}>
                <ToDoInput
                    {...register(
                        "toDo", {
                        required: "Please write your To Do"
                    }
                    )
                    }
                    placeholder="Today's To Do" />
            </ToDoForm>
            <Wrapper>
                <ToDoWrapper>
                    <ToDoScroll>
                        {toDos.map((toDo) => (
                            <ToDoList key={toDo.id}>
                                {toDo.text}
                            </ToDoList>
                        ))}
                    </ToDoScroll>
                </ToDoWrapper>
            </Wrapper>
        </>
    )
}

export default ToDo;