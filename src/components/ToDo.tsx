import styled from "styled-components";

const ToDoForm = styled.form`
    padding-top: 50px;
    width: 561px;
    height: 44px;
    justify-content: center;
    align-items: center;
    display: grid;
    margin: 0 auto;
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
`


function ToDo () {

    const onSubmit = (event:any) => {
        event.preventDefault();
    }
    return(
        <ToDoForm onSubmit={onSubmit}>
        <ToDoInput placeholder="Today's To Do" />
        </ToDoForm>
    )
}

export default ToDo;