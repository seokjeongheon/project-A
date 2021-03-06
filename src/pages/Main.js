
import React from 'react'
import {ProgressBar,Button} from 'react-bootstrap';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import "./Main.css";
import { FoodQuestionD } from '../data/foodQuestionD'
import { createSearchParams} from 'react-router-dom'



const choice_list = [
  {id: "A1A2", score: 0},       //spicy [A1: spicy, A2: non-spicy]
  {id: "B1B2", score: 0},       //temperature [B1: hot, B2: cold]
  {id: "C1C2", score: 0},       //soup [C1: soup, C2: non-soup]
  //{id: "D1D2", score: 0},       //fast-food [D1: fast-food, D2: slow-food]
  {id: "D1D2", score: 0}        //price [E1: expensive, E2: cheap]
]


const Main = () => {
  const [questionNo, setQuestionNo] = React.useState(0)
  const [totalScore, setTotalScore] = React.useState(choice_list)
 
  const navigate = useNavigate()
  console.log('totalScore', totalScore)
  //
  const clickHandler = (num, type) => {
    const newScore = totalScore.map((e) => 
      e.id === type ? {id: e.id, score: e.score + num} : e     //각 해당 질문에서 +num해줌
    )
    setTotalScore(newScore)
    //마지막페이지가 아니면 다음 문제로 수 증가
    if (FoodQuestionD.length != questionNo + 1) {
      setQuestionNo(questionNo + 1)
    //마지막페이지면 결론 출력해야 됨
    }else{
      //각 해당 질문에서 score가 2이상이면 n1/n2 중 n1을 선택 아니면 n2 선택 
      const food = newScore.reduce(
        (acc, now) => acc + (now.score >= 2 ? now.id.substring(0,2) : now.id.substring(2,4)), ""
      )
      console.log("food" + food)
      //결과 페이지 이동
      navigate({
        pathname: '/result',
        search: `?${createSearchParams({
          food: food
        })}`
      })
    }
  };
  return (
    <Container>
       <ProgressBar striped variant="danger" now={(questionNo / FoodQuestionD.length)} style= {{ marginTop: '50px'}}/>
        <Title>{FoodQuestionD[questionNo].title}</Title>
        <ImgButtonGroup>
          <Button className='leftbutton' variant="warning" onClick={() => clickHandler(1, FoodQuestionD[questionNo].type)} style={{width:'460px', height:'400px', margin:'0 20px'}}>
            <img src={FoodQuestionD[questionNo].foodImg1} alt='profile' style={{width:'400px', height:'300px'}}></img>
            <Desc>{FoodQuestionD[questionNo].answer1}</Desc>
          </Button>
          <Button className='rightbutton' variant="info" onClick={() => clickHandler(0, FoodQuestionD[questionNo].type)} style={{width:'460px', height:'400px', margin:'0 20px'}}>
            <img src={FoodQuestionD[questionNo].foodImg2} alt='profile' style={{width:'400px', height:'300px'}}></img>
            <Desc>{FoodQuestionD[questionNo].answer2}</Desc>
          </Button>
        </ImgButtonGroup>
    </Container>
  );
};


export default Main

const Container = styled.div`
  font-family: 'CBNUJIKJI';
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  background-color: beige;
`

const Title = styled.div`
  font-size: 30pt;
  display: flex;
  position:absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translate(-50%,-50%);
  top: 25%;
  left: 50%;
  white-space: pre-line;
`
const ImgButtonGroup = styled.div`
  /* &::hover{
    //content: "";
    border: 2px solid gray;
  } */
  display: flex;
  position:absolute;
  justify-content: center;
  align-items: center;
  transform: translate(-50%,-50%);
  top: 70%;
  left: 50%;
`

const Desc = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 11px auto 0;
  white-space: pre-line;
`