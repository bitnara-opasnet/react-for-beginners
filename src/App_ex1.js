import Button from "./Button";
import styles from "./App.module.css"
import { useState, useEffect } from "react";

function Hello() {
  // 방법 1: function을 따로 만들어서 삽입
  function byeFn(){
    console.log("bye");
  }; 
  function hiFn(){
    console.log("created");
    return byeFn;
  }; 
  useEffect(hiFn, []);

// 방법 2: function을 useEffect 안에 작성
  useEffect(() => {
    console.log("created");
    return function() {
      console.log("bye");
    };
  }, []);

// 방법 2: useEffect 안에 arrow function 사용
  useEffect(function() {
    console.log("created");
    return () => {
      console.log("bye");
    };
  }, []);

  return <h1>Hello</h1>;
};


function App() {
  //-------------- useEffect 사용 -----------------------
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev +1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("I run only once");
  }, []); //지켜볼 변수가 없기 때문에 한번만 실행 

  useEffect(() => {
    if (keyword !== "") {
      console.log("I run when 'keyword' changes");
    };
  }, [keyword]); //keyword가 변화할 때마다 코드를 실행함

  useEffect(() => {
    console.log("I run when 'counter' changes");
  }, [counter]); 

  useEffect(() => {
    console.log("I run when 'keyword' & 'counter' changes");
  }, [keyword, counter]); 
  //----------------------------------------------------------

  const [showing, setShowing] = useState(false);
  const onCleanup = () => setShowing((prev) => !prev);

  return (
    <div>
      {/*Button.js 및 Button.module.css 사용법*/}
      <h1 className={styles.title}>Welcome back</h1>
      <Button text="continue" />
      <hr />

      {/*useEffect 사용법*/}
      <input 
        value={keyword}
        onChange={onChange}
        type="text" 
        placeholder="Search here" 
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
      <hr/>

      {/*Cleanup 사용법*/}
      {showing ? <Hello /> : null}
      <button onClick={onCleanup}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
};

export default App;
